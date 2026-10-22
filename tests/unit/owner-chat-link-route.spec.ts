import { describe, it, expect, beforeEach, vi } from 'vitest'
import { makeFakeSupabase, type FakeSupabase } from './helpers/fake-supabase'

process.env.TELEGRAM_WEBHOOK_SECRET = 'test-webhook-signing-secret'

let fake: FakeSupabase
vi.mock('@/lib/supabase/server', () => ({ createClient: async () => fake }))
const botInfo = vi.fn()
const viberInfo = vi.fn()
vi.mock('@/lib/telegram', async (importOriginal) => ({ ...(await importOriginal<typeof import('@/lib/telegram')>()), getTelegramBotInfo: (...a: unknown[]) => botInfo(...a) }))
vi.mock('@/lib/viber', async (importOriginal) => ({ ...(await importOriginal<typeof import('@/lib/viber')>()), getViberBotInfo: (...a: unknown[]) => viberInfo(...a) }))

import { POST } from '@/app/api/business/owner-chat-link/route'
import { verifyOwnerLinkToken } from '@/lib/owner-chat-link'

const OWNER = { id: 'owner-1' }
const BIZ = 'biz-1'

function setup(user: { id: string } | null = OWNER, biz: Record<string, unknown> = {}) {
  fake = makeFakeSupabase({
    user,
    tables: { businesses: [{ id: BIZ, owner_id: OWNER.id, created_at: '2026-01-01', telegram_bot_token: 'tg', telegram_chat_id: null, viber_bot_token: 'vb', viber_chat_id: null, ...biz }] },
  })
  botInfo.mockReset(); botInfo.mockResolvedValue({ ok: true, result: { username: 'glow_bot', first_name: 'Glow' } })
  viberInfo.mockReset(); viberInfo.mockResolvedValue({ ok: true, name: 'Glow', uri: 'glowviber' })
}
const post = (body: unknown) => POST(new Request('http://localhost/api/business/owner-chat-link', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }) as never)
beforeEach(() => setup())

describe('POST /api/business/owner-chat-link', () => {
  it('401 without a session, 403 for a user who owns no business (Staff)', async () => {
    setup(null)
    expect((await post({ channel: 'telegram' })).status).toBe(401)
    setup({ id: 'staff-1' })
    expect((await post({ channel: 'telegram' })).status).toBe(403)
  })

  it('400 for a missing / unknown channel and for broken JSON', async () => {
    for (const body of [{}, { channel: 'whatsapp' }, '{nope']) {
      const res = await post(body)
      expect(res.status).toBe(400)
      expect((await res.json()).code).toBe('invalid_channel')
    }
  })

  it('400 no_token when the bot token is not saved yet; 400 invalid_token when Telegram does not know it', async () => {
    setup(OWNER, { telegram_bot_token: null })
    const res = await post({ channel: 'telegram' })
    expect(res.status).toBe(400)
    expect((await res.json()).code).toBe('no_token')
    setup()
    botInfo.mockResolvedValue({ ok: false })
    expect((await (await post({ channel: 'telegram' })).json()).code).toBe('invalid_token')
  })

  it('Telegram: a t.me deep link whose token verifies for this business and chat, valid for 15 minutes', async () => {
    const res = await post({ channel: 'telegram' })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(json.expiresIn).toBe(900)
    const m = /^https:\/\/t\.me\/glow_bot\?start=(own_[A-Za-z0-9_-]+)$/.exec(json.url)!
    expect(m).toBeTruthy()
    expect(verifyOwnerLinkToken(m[1], { channel: 'telegram', businessId: BIZ, currentChatId: null })).toBe('ok')
    expect(verifyOwnerLinkToken(m[1], { channel: 'viber', businessId: BIZ, currentChatId: null })).toBe('invalid')
  })

  it('Viber: a viber://pa link with the token in context', async () => {
    const json = await (await post({ channel: 'viber' })).json()
    const m = /^viber:\/\/pa\?chatURI=glowviber&context=(own_[A-Za-z0-9_-]+)$/.exec(json.url)!
    expect(m).toBeTruthy()
    expect(verifyOwnerLinkToken(m[1], { channel: 'viber', businessId: BIZ, currentChatId: null })).toBe('ok')
  })

  it('the token is issued against the chat stored now: after a re-connect it no longer verifies for the old state', async () => {
    setup(OWNER, { telegram_chat_id: 'old-chat' })
    const json = await (await post({ channel: 'telegram' })).json()
    const token = /start=(own_[A-Za-z0-9_-]+)/.exec(json.url)![1]
    expect(verifyOwnerLinkToken(token, { channel: 'telegram', businessId: BIZ, currentChatId: 'old-chat' })).toBe('ok')
    expect(verifyOwnerLinkToken(token, { channel: 'telegram', businessId: BIZ, currentChatId: null })).toBe('invalid')
  })

  it('500 server_misconfigured without the server secret, nothing issued', async () => {
    const saved = process.env.TELEGRAM_WEBHOOK_SECRET
    delete process.env.TELEGRAM_WEBHOOK_SECRET
    try {
      const res = await post({ channel: 'telegram' })
      expect(res.status).toBe(500)
      expect((await res.json()).code).toBe('server_misconfigured')
    } finally {
      process.env.TELEGRAM_WEBHOOK_SECRET = saved
    }
  })
})
