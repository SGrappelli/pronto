/**
 * lib/owner-chat-link.ts
 *
 * The one way a Telegram / Viber chat becomes the salon OWNER's chat: a short-lived token from the dashboard
 * (deep link `start=own_<expiry>_<signature>`, or the same text typed as `/start own_…`). A bare `/start`, a client
 * link (`client_…`) or anything else NEVER binds the owner slot — before this, any chat that pressed Start in the
 * salon's bot became the owner chat and received the owner's notifications (client names, services, times).
 *
 * Token = `own_` + expiry (unix seconds, base36) + `_` + base64url(HMAC-SHA256). The HMAC covers the channel, the
 * business, the expiry and the chat id stored AT THE TIME OF ISSUE (empty when none). Consequences:
 *  - it cannot be forged or moved to another business / channel (signature),
 *  - it expires 15 minutes after issue,
 *  - it is single-use: once the stored chat id changes the signature no longer matches, and the write itself is a
 *    compare-and-set on that same stored value (see claimOwnerChat), so two chats racing for one token cannot both win.
 * No table, no migration. Key: TELEGRAM_WEBHOOK_SECRET (the same server secret the webhook secret_token derives from;
 * the signed string carries its own prefix, so a secret_token can never double as an owner token or the reverse); when it is
 * not set (a Viber-only self-hosted install) a key derived from SUPABASE_SERVICE_ROLE_KEY is used instead.
 * 43 + 12 characters: inside Telegram's 64-character start-parameter limit and its A-Z a-z 0-9 _ - alphabet.
 */

import { createHmac, timingSafeEqual } from 'node:crypto'

export type OwnerChatChannel = 'telegram' | 'viber'

export const OWNER_LINK_PREFIX = 'own_'
export const OWNER_LINK_TTL_SECONDS = 15 * 60

function signingKey(): string {
  const key = process.env.TELEGRAM_WEBHOOK_SECRET
  if (key) return key
  // Self-hosted: TELEGRAM_WEBHOOK_SECRET is required only for a Telegram bot, so a Viber-only install may not have it.
  // SUPABASE_SERVICE_ROLE_KEY exists on every server (the webhooks themselves need it): derive a separate signing key
  // from it. The key never leaves the server, and the derivation carries its own label.
  const root = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!root) throw new Error('Neither TELEGRAM_WEBHOOK_SECRET nor SUPABASE_SERVICE_ROLE_KEY is set')
  return createHmac('sha256', root).update('owner-chat-link-signing-key').digest('hex')
}

function mac(channel: OwnerChatChannel, businessId: string, expiry: string, currentChatId: string | null | undefined): string {
  return createHmac('sha256', signingKey())
    .update(`owner-chat-link\n${channel}\n${businessId}\n${expiry}\n${currentChatId ?? ''}`)
    .digest('base64url')
}

/** `own_…` token for one business and channel; `currentChatId` is the owner chat stored right now (null when none). */
export function createOwnerLinkToken(opts: {
  channel: OwnerChatChannel
  businessId: string
  currentChatId: string | null | undefined
  now?: number // ms, injectable for tests
  ttlSeconds?: number
}): { token: string; expiresAt: number } {
  const now = opts.now ?? Date.now()
  const expirySeconds = Math.floor(now / 1000) + (opts.ttlSeconds ?? OWNER_LINK_TTL_SECONDS)
  const expiry = expirySeconds.toString(36)
  return { token: `${OWNER_LINK_PREFIX}${expiry}_${mac(opts.channel, opts.businessId, expiry, opts.currentChatId)}`, expiresAt: expirySeconds * 1000 }
}

export type OwnerLinkCheck = 'ok' | 'expired' | 'invalid'

/**
 * Signature first, expiry second: a token that was never ours is 'invalid'; one that is ours but late is 'expired'.
 * A token already used (the stored chat id changed since issue) fails the signature → 'invalid'.
 */
export function verifyOwnerLinkToken(
  token: string,
  opts: { channel: OwnerChatChannel; businessId: string; currentChatId: string | null | undefined; now?: number },
): OwnerLinkCheck {
  const m = /^own_([0-9a-z]{1,10})_([A-Za-z0-9_-]{43})$/.exec(token)
  if (!m) return 'invalid'
  const [, expiry, signature] = m
  let expected: string
  try {
    expected = mac(opts.channel, opts.businessId, expiry, opts.currentChatId)
  } catch {
    return 'invalid' // no server secret: nothing can be verified, so nothing binds
  }
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return 'invalid'
  const now = opts.now ?? Date.now()
  return parseInt(expiry, 36) * 1000 > now ? 'ok' : 'expired'
}

/**
 * What a `/start` message asks for. `/start`, `/start@MyBot` and `/start <param>` are the command; `/startfoo` is not
 * (it is some other, unknown command). Returns null for anything that is not the start command.
 */
export function parseStartCommand(text: string): { param: string } | null {
  const m = /^\/start(?:@[A-Za-z0-9_]+)?(?:\s+([\s\S]*))?$/.exec(text.trim())
  if (!m) return null
  return { param: (m[1] ?? '').trim() }
}

export type StartIntent =
  | { kind: 'client'; clientId: string }
  | { kind: 'client_invalid' }
  | { kind: 'owner'; token: string }
  | { kind: 'bare' } // no parameter, or one we do not know: never binds anything

export function classifyStartParam(param: string): StartIntent {
  if (param.startsWith('client_')) {
    const id = param.slice('client_'.length)
    return /^[0-9a-f-]{36}$/i.test(id) ? { kind: 'client', clientId: id } : { kind: 'client_invalid' }
  }
  if (param.startsWith(OWNER_LINK_PREFIX)) return { kind: 'owner', token: param.split(/\s+/)[0] }
  return { kind: 'bare' }
}

/** Minimal shape of the Supabase client the claim needs (the real one and the test fake both fit). */
interface ClaimDb {
  from(table: string): {
    update(patch: Record<string, unknown>): {
      eq(col: string, val: unknown): unknown
    }
  }
}

/**
 * Compare-and-set: writes the new owner chat only if the stored value is still the one the token was issued
 * against. Returns true when this call changed the row. `supabase` must be a service-role client.
 */
export async function claimOwnerChat(
  supabase: unknown,
  opts: { businessId: string; column: 'telegram_chat_id' | 'viber_chat_id'; expected: string | null; chatId: string },
): Promise<boolean> {
  type Chain = {
    eq(col: string, val: unknown): Chain
    is(col: string, val: null): Chain
    select(cols: string): PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>
  }
  let q = ((supabase as ClaimDb).from('businesses').update({ [opts.column]: opts.chatId }).eq('id', opts.businessId)) as Chain
  q = opts.expected === null ? q.is(opts.column, null) : q.eq(opts.column, opts.expected)
  const { data, error } = await q.select('id')
  if (error) {
    console.error('[owner-chat-link] claim failed:', error.message)
    return false
  }
  return Array.isArray(data) && data.length === 1
}
