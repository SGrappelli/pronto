import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { createHmac } from 'node:crypto'
import fs from 'node:fs'
import { makeFakeSupabase, type FakeSupabase } from './helpers/fake-supabase'

process.env.TELEGRAM_WEBHOOK_SECRET = 'test-webhook-signing-secret'

let fake: FakeSupabase
const sendTelegram = vi.fn()
const sendViber = vi.fn()
const BOT_TOKEN = 'viber-tok'

vi.mock('@supabase/supabase-js', () => ({ createClient: () => fake }))
vi.mock('@/lib/telegram', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/telegram')>()
  return { ...actual, sendTelegramMessage: (...a: unknown[]) => sendTelegram(...a) }
})
vi.mock('@/lib/viber', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/viber')>()
  return { ...actual, sendViberMessage: (...a: unknown[]) => sendViber(...a) }
})

import { POST as telegramPOST } from '@/app/api/telegram/webhook/route'
import { POST as viberPOST } from '@/app/api/viber/webhook/route'
import { telegramWebhookSecretToken } from '@/lib/telegram'
import {
  createOwnerLinkToken, verifyOwnerLinkToken, parseStartCommand, classifyStartParam, claimOwnerChat,
  OWNER_LINK_TTL_SECONDS,
} from '@/lib/owner-chat-link'
import { botStrings, settingsNotificationsPath } from '@/lib/owner-link-strings'
import pt from '@/messages/pt.json'

const BIZ = '11111111-1111-1111-1111-111111111111'
const OTHER_BIZ = '33333333-3333-3333-3333-333333333333'
const CLIENT = '22222222-2222-2222-2222-222222222222'
const CONNECTED = 'You are now connected to'

function setup(bizOver: Record<string, unknown> = {}) {
  fake = makeFakeSupabase({
    tables: {
      businesses: [{
        id: BIZ, name: 'Glow', telegram_bot_token: 'tg-tok', telegram_chat_id: null,
        viber_bot_token: BOT_TOKEN, viber_chat_id: null, notification_language: 'en',
        ...bizOver,
      }],
      clients: [{ id: CLIENT, business_id: BIZ, name: 'Jo', telegram_id: null, viber_user_id: null, phone: '+15551234', email: null }],
      appointments: [],
    },
  })
  sendTelegram.mockReset(); sendTelegram.mockResolvedValue(true)
  sendViber.mockReset(); sendViber.mockResolvedValue(undefined)
}
beforeEach(() => setup())

const biz = () => fake._tables.businesses[0]
const tgToken = (current: string | null = null, over: Partial<Parameters<typeof createOwnerLinkToken>[0]> = {}) =>
  createOwnerLinkToken({ channel: 'telegram', businessId: BIZ, currentChatId: current, ...over }).token
const viToken = (current: string | null = null, over: Partial<Parameters<typeof createOwnerLinkToken>[0]> = {}) =>
  createOwnerLinkToken({ channel: 'viber', businessId: BIZ, currentChatId: current, ...over }).token

function tg(text: string, chat = 'chat-1') {
  return telegramPOST(new NextRequest(`http://localhost/api/telegram/webhook?bid=${BIZ}`, {
    method: 'POST',
    body: JSON.stringify({ message: { chat: { id: chat }, text, from: { first_name: 'Sam' } } }),
    headers: { 'content-type': 'application/json', 'x-telegram-bot-api-secret-token': telegramWebhookSecretToken(BIZ) },
  }))
}
function vb(body: Record<string, unknown>) {
  const raw = JSON.stringify(body)
  return viberPOST(new NextRequest(`http://localhost/api/viber/webhook?bid=${BIZ}`, {
    method: 'POST', body: raw,
    headers: { 'content-type': 'application/json', 'x-viber-content-signature': createHmac('sha256', BOT_TOKEN).update(raw).digest('hex') },
  }))
}
const vbMsg = (text: string, sender = 'v-1') => vb({ event: 'message', message: { text }, sender: { id: sender, name: 'Sam' } })
const vbOpen = (context: string | undefined, sender = 'v-1') => vb({ event: 'conversation_started', ...(context ? { context } : {}), user: { id: sender, name: 'Sam' }, sender: { id: sender, name: 'Sam' } })
const lastTg = () => String(sendTelegram.mock.calls.at(-1)?.[2] ?? '')
const lastVb = () => String(sendViber.mock.calls.at(-1)?.[2] ?? '')
const ownerWrites = () => fake._updates.filter((u) => u.table === 'businesses')

describe('owner link token (lib/owner-chat-link.ts)', () => {
  it('fits a Telegram start parameter: ≤ 64 characters of A-Z a-z 0-9 _ -', () => {
    const t = tgToken()
    expect(t.length).toBeLessThanOrEqual(64)
    expect(t).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(t.startsWith('own_')).toBe(true)
  })

  it('verifies for the business, channel and stored chat it was issued against, for 15 minutes', () => {
    const now = 1_800_000_000_000
    const { token, expiresAt } = createOwnerLinkToken({ channel: 'telegram', businessId: BIZ, currentChatId: null, now })
    expect(expiresAt - now).toBe(OWNER_LINK_TTL_SECONDS * 1000)
    expect(OWNER_LINK_TTL_SECONDS).toBe(900)
    const check = (at: number) => verifyOwnerLinkToken(token, { channel: 'telegram', businessId: BIZ, currentChatId: null, now: at })
    expect(check(now)).toBe('ok')
    expect(check(now + 14 * 60_000)).toBe('ok')
    expect(check(now + 16 * 60_000)).toBe('expired')
  })

  it('rejects another signature, business, channel, stored chat, tampering and garbage', () => {
    const t = tgToken()
    const v = (token: string, o: Partial<Parameters<typeof verifyOwnerLinkToken>[1]> = {}) =>
      verifyOwnerLinkToken(token, { channel: 'telegram', businessId: BIZ, currentChatId: null, ...o })
    expect(v(t)).toBe('ok')
    expect(v(t, { businessId: OTHER_BIZ })).toBe('invalid')
    expect(v(t, { channel: 'viber' })).toBe('invalid')
    expect(v(t, { currentChatId: 'someone' })).toBe('invalid') // already used: the stored chat changed since issue
    expect(v(t.slice(0, -1) + (t.endsWith('A') ? 'B' : 'A'))).toBe('invalid')
    const [, exp] = /^own_([0-9a-z]+)_/.exec(t)!
    const forged = `own_${exp}_${createHmac('sha256', 'attacker-key').update(`owner-chat-link\ntelegram\n${BIZ}\n${exp}\n`).digest('base64url')}`
    expect(v(forged)).toBe('invalid')
    // the webhook secret_token of the same business is not an owner token
    expect(v(telegramWebhookSecretToken(BIZ))).toBe('invalid')
    for (const junk of ['', 'own_', 'own_zz_x', 'client_' + CLIENT, 'own_' + 'a'.repeat(60)]) expect(v(junk)).toBe('invalid')
  })

  it('self-hosted key: TELEGRAM_WEBHOOK_SECRET when set, else a key derived from SUPABASE_SERVICE_ROLE_KEY, else nothing binds', () => {
    const savedTg = process.env.TELEGRAM_WEBHOOK_SECRET
    const savedRoot = process.env.SUPABASE_SERVICE_ROLE_KEY
    const verify = (t: string) => verifyOwnerLinkToken(t, { channel: 'viber', businessId: BIZ, currentChatId: null })
    try {
      // Viber-only install: no Telegram secret, the service role key exists on every server
      delete process.env.TELEGRAM_WEBHOOK_SECRET
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key-of-this-server'
      const viberOnly = viToken()
      expect(verify(viberOnly)).toBe('ok')
      // a token signed with the Telegram secret is not valid under the derived key, and the reverse
      process.env.TELEGRAM_WEBHOOK_SECRET = 'test-webhook-signing-secret'
      expect(verify(viberOnly)).toBe('invalid')
      const withSecret = viToken()
      expect(verify(withSecret)).toBe('ok')
      // another server (other service role key) cannot produce a token this one accepts
      delete process.env.TELEGRAM_WEBHOOK_SECRET
      expect(verify(withSecret)).toBe('invalid')
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'another-servers-key'
      expect(verify(viberOnly)).toBe('invalid')
      // neither secret: nothing can be verified, nothing issued
      delete process.env.SUPABASE_SERVICE_ROLE_KEY
      expect(verify(viberOnly)).toBe('invalid')
      expect(() => viToken()).toThrow()
    } finally {
      process.env.TELEGRAM_WEBHOOK_SECRET = savedTg
      if (savedRoot === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY
      else process.env.SUPABASE_SERVICE_ROLE_KEY = savedRoot
    }
  })

  it('/start parsing: the command, the command to this bot, the command with a parameter — not /startfoo', () => {
    expect(parseStartCommand('/start')).toEqual({ param: '' })
    expect(parseStartCommand('/start@GlowBot')).toEqual({ param: '' })
    expect(parseStartCommand('/start foo')).toEqual({ param: 'foo' })
    expect(parseStartCommand('/start@GlowBot own_x')).toEqual({ param: 'own_x' })
    expect(parseStartCommand('/startfoo')).toBeNull()
    expect(parseStartCommand('start')).toBeNull()
    expect(parseStartCommand('hello /start')).toBeNull()
  })

  it('a start parameter is classified: client link, bad client link, owner token, everything else is "bare"', () => {
    expect(classifyStartParam(`client_${CLIENT}`)).toEqual({ kind: 'client', clientId: CLIENT })
    expect(classifyStartParam('client_123')).toEqual({ kind: 'client_invalid' })
    expect(classifyStartParam('own_abc_def')).toEqual({ kind: 'owner', token: 'own_abc_def' })
    expect(classifyStartParam('')).toEqual({ kind: 'bare' })
    expect(classifyStartParam('whatever')).toEqual({ kind: 'bare' })
  })

  it('claimOwnerChat is a compare-and-set: it wins once, then the stored value no longer matches', async () => {
    expect(await claimOwnerChat(fake, { businessId: BIZ, column: 'telegram_chat_id', expected: null, chatId: 'a' })).toBe(true)
    expect(biz().telegram_chat_id).toBe('a')
    expect(await claimOwnerChat(fake, { businessId: BIZ, column: 'telegram_chat_id', expected: null, chatId: 'b' })).toBe(false)
    expect(await claimOwnerChat(fake, { businessId: BIZ, column: 'telegram_chat_id', expected: 'wrong', chatId: 'b' })).toBe(false)
    expect(biz().telegram_chat_id).toBe('a')
    expect(await claimOwnerChat(fake, { businessId: BIZ, column: 'telegram_chat_id', expected: 'a', chatId: 'c' })).toBe(true)
    expect(biz().telegram_chat_id).toBe('c')
  })
})

describe('Telegram: what can and cannot bind the owner chat', () => {
  it.each([
    ['a bare /start', '/start'],
    ['/start@bot', '/start@GlowBot'],
    ['/startfoo', '/startfoo'],
    ['/start with an unknown parameter', '/start whatever'],
    ['/start with a mangled client link', '/start client_123'],
    ['/start with a client link', `/start client_${CLIENT}`],
    ['/start with a token of another business', `/start ${tgToken(null, { businessId: OTHER_BIZ })}`],
    ['/start with a Viber token', `/start ${viToken()}`],
  ])('%s never binds the chat as the owner', async (_name, text) => {
    const res = await tg(text, 'stranger')
    expect(res.status).toBe(200)
    expect(biz().telegram_chat_id).toBeNull()
    expect(ownerWrites()).toHaveLength(0)
  })

  it('a stranger\'s bare /start gets the bot explanation in the salon\'s language, with the real section path', async () => {
    setup({ notification_language: 'pt' })
    await tg('/start', 'stranger')
    const text = lastTg()
    expect(text).toContain('Olá! Este bot envia notificações de agendamentos de Glow')
    expect(text).toContain(`${pt.sidebar.settings} → ${pt.settings.tabs.notifications}`)
    expect(text).toBe(botStrings.pt.startBare.replace('{business}', 'Glow').replace('{settingsPath}', await settingsNotificationsPath('pt')))
  })

  it('the business name in that reply is escaped for Telegram HTML', async () => {
    setup({ name: 'R&D <i>' })
    await tg('/start', 'stranger')
    expect(lastTg()).toContain('R&amp;D &lt;i&gt;')
    expect(lastTg()).not.toContain('<i>')
  })

  it('the client link still links the CLIENT (and not the owner)', async () => {
    await tg(`/start client_${CLIENT}`, 'client-chat')
    expect(fake._tables.clients[0].telegram_id).toBe('client-chat')
    expect(biz().telegram_chat_id).toBeNull()
  })

  it('a valid own_ token binds the owner chat and confirms', async () => {
    const res = await tg(`/start ${tgToken()}`, 'owner-chat')
    expect(res.status).toBe(200)
    expect(biz().telegram_chat_id).toBe('owner-chat')
    expect(lastTg()).toContain(CONNECTED)
  })

  it('/start@bot with a valid token binds too (the same command)', async () => {
    await tg(`/start@GlowBot ${tgToken()}`, 'owner-chat')
    expect(biz().telegram_chat_id).toBe('owner-chat')
  })

  it('the same token a second time is rejected, from the same chat and from another one', async () => {
    const token = tgToken()
    await tg(`/start ${token}`, 'owner-chat')
    expect(biz().telegram_chat_id).toBe('owner-chat')
    for (const chat of ['owner-chat', 'intruder']) {
      await tg(`/start ${token}`, chat)
      expect(biz().telegram_chat_id).toBe('owner-chat')
      expect(lastTg()).toBe(botStrings.en.ownerLinkExpired.replace('{settingsPath}', await settingsNotificationsPath('en')))
    }
  })

  it('an expired token is rejected with the "expired or already used" reply (real section names of the language)', async () => {
    setup({ notification_language: 'es' })
    const old = createOwnerLinkToken({ channel: 'telegram', businessId: BIZ, currentChatId: null, now: Date.now() - 16 * 60_000 }).token
    await tg(`/start ${old}`, 'owner-chat')
    expect(biz().telegram_chat_id).toBeNull()
    expect(lastTg()).toBe(botStrings.es.ownerLinkExpired.replace('{settingsPath}', await settingsNotificationsPath('es')))
    expect(lastTg()).toContain('Configuración → Notificaciones')
  })

  it('a forged signature is rejected', async () => {
    const t = tgToken()
    await tg(`/start ${t.slice(0, -2)}xx`, 'intruder')
    expect(biz().telegram_chat_id).toBeNull()
  })

  it('an already connected chat is not touched by a bare /start from anyone; the owner chat just gets the summary', async () => {
    setup({ telegram_chat_id: 'owner-chat' })
    await tg('/start', 'stranger')
    expect(biz().telegram_chat_id).toBe('owner-chat')
    await tg('/start', 'owner-chat')
    expect(biz().telegram_chat_id).toBe('owner-chat')
    expect(lastTg()).toContain(CONNECTED)
    expect(ownerWrites()).toHaveLength(0)
  })

  it('re-connecting needs a token issued against the CURRENT chat: a stale token does not move the slot', async () => {
    setup({ telegram_chat_id: 'owner-chat' })
    await tg(`/start ${tgToken(null)}`, 'intruder') // issued when nothing was connected
    expect(biz().telegram_chat_id).toBe('owner-chat')
    await tg(`/start ${tgToken('owner-chat')}`, 'new-phone')
    expect(biz().telegram_chat_id).toBe('new-phone')
  })

  it('two chats racing for one token: exactly one wins', async () => {
    const token = tgToken()
    await Promise.all([tg(`/start ${token}`, 'chat-a'), tg(`/start ${token}`, 'chat-b')])
    expect(['chat-a', 'chat-b']).toContain(biz().telegram_chat_id)
    const replies = sendTelegram.mock.calls.map((c) => String(c[2]))
    expect(replies.filter((r) => r.includes(CONNECTED))).toHaveLength(1) // one connected…
    expect(replies.filter((r) => r.startsWith('This link has expired'))).toHaveLength(1) // …the other turned away
  })
})

describe('Viber: what can and cannot bind the owner chat', () => {
  it.each([
    ['a bare /start', '/start'],
    ['/start@bot', '/start@GlowBot'],
    ['/start with an unknown parameter', '/start whatever'],
    ['/start with a client link', `/start client_${CLIENT}`],
    ['/start with a token of another business', `/start ${viToken(null, { businessId: OTHER_BIZ })}`],
    ['/start with a Telegram token', `/start ${tgToken()}`],
  ])('%s never binds the chat as the owner', async (_n, text) => {
    const res = await vbMsg(text, 'stranger')
    expect(res.status).toBe(200)
    expect(biz().viber_chat_id).toBeNull()
    expect(ownerWrites()).toHaveLength(0)
  })

  it('/startfoo is not the command: nothing is bound', async () => {
    await vbMsg('/startfoo', 'stranger')
    expect(biz().viber_chat_id).toBeNull()
  })

  it('a stranger\'s bare /start gets the bot explanation (salon language) with the real section path', async () => {
    setup({ notification_language: 'es' })
    await vbMsg('/start', 'stranger')
    expect(lastVb()).toBe(botStrings.es.startBare.replace('{business}', 'Glow').replace('{settingsPath}', await settingsNotificationsPath('es')))
  })

  it('opening the bot (conversation_started) with no context or a client context never binds — even when no owner is connected yet', async () => {
    // Before: the first person to open an unconnected bot became its owner.
    expect(biz().viber_chat_id).toBeNull()
    await vbOpen(undefined, 'stranger')
    await vbOpen(`client_${CLIENT}`, 'stranger')
    expect(biz().viber_chat_id).toBeNull()
    expect(ownerWrites()).toHaveLength(0)
  })

  it('the Settings deep link (conversation_started, context = own_ token) binds the owner chat', async () => {
    await vbOpen(viToken(), 'owner-viber')
    expect(biz().viber_chat_id).toBe('owner-viber')
    expect(lastVb()).toContain(CONNECTED)
  })

  it('the typed fallback (/start own_…) binds too', async () => {
    await vbMsg(`/start ${viToken()}`, 'owner-viber')
    expect(biz().viber_chat_id).toBe('owner-viber')
  })

  it('a second use (link or typed), an expired token and a forged signature are rejected', async () => {
    const token = viToken()
    await vbOpen(token, 'owner-viber')
    await vbMsg(`/start ${token}`, 'intruder')
    await vbOpen(token, 'intruder')
    expect(biz().viber_chat_id).toBe('owner-viber')
    expect(lastVb()).toBe(botStrings.en.ownerLinkExpired.replace('{settingsPath}', await settingsNotificationsPath('en')))

    setup()
    const old = createOwnerLinkToken({ channel: 'viber', businessId: BIZ, currentChatId: null, now: Date.now() - 16 * 60_000 }).token
    await vbOpen(old, 'late-owner')
    expect(biz().viber_chat_id).toBeNull()
    const t = viToken()
    await vbMsg(`/start ${t.slice(0, -2)}xx`, 'intruder')
    expect(biz().viber_chat_id).toBeNull()
  })

  it('an already connected chat is not touched by a bare /start; re-connect needs a token for the current chat', async () => {
    setup({ viber_chat_id: 'owner-viber' })
    await vbMsg('/start', 'stranger')
    expect(biz().viber_chat_id).toBe('owner-viber')
    await vbMsg(`/start ${viToken(null)}`, 'intruder')
    expect(biz().viber_chat_id).toBe('owner-viber')
    await vbMsg(`/start ${viToken('owner-viber')}`, 'new-phone')
    expect(biz().viber_chat_id).toBe('new-phone')
  })

  it('a request with a bad Viber signature is still rejected before anything else', async () => {
    const raw = JSON.stringify({ event: 'message', message: { text: `/start ${viToken()}` }, sender: { id: 'x', name: 'x' } })
    const res = await viberPOST(new NextRequest(`http://localhost/api/viber/webhook?bid=${BIZ}`, {
      method: 'POST', body: raw, headers: { 'content-type': 'application/json', 'x-viber-content-signature': 'nope' },
    }))
    expect(res.status).toBe(401)
    expect(biz().viber_chat_id).toBeNull()
  })
})

describe('dictionaries', () => {
  const read = (l: string) => JSON.parse(fs.readFileSync(`messages/${l}.json`, 'utf8')) as {
    settings: { notifications: { telegram: Record<string, string>; viber: Record<string, string> } }
  }
  it('Settings → Notifications: step 3 names the 15-minute limit and no longer says "send /start", in all four languages', () => {
    for (const l of ['en', 'es', 'pt', 'it']) {
      const n = read(l).settings.notifications
      for (const ch of ['telegram', 'viber'] as const) {
        expect(n[ch].step3, `${l}.${ch}`).toContain('15')
        expect(n[ch].step3, `${l}.${ch}`).not.toMatch(/\/start/)
        expect(typeof n[ch].newLink, `${l}.${ch}.newLink`).toBe('string')
      }
      expect(typeof n.viber.openButton, `${l}.viber.openButton`).toBe('string')
    }
    expect(read('pt').settings.notifications.telegram.step3).toBe('Toque no botão para abrir seu bot. Toque em Start e as notificações de agendamentos chegarão neste chat. O link vale por 15 minutos.')
    expect(read('es').settings.notifications.viber.openButton).toBe('Abrir en Viber')
    expect(read('en').settings.notifications.telegram.newLink).toBe('Get a new link')
  })

  it('bot texts exist in en / es / pt with their placeholders; the section path comes from the dictionaries, never typed', async () => {
    for (const l of ['en', 'es', 'pt'] as const) {
      expect(botStrings[l].startBare, l).toContain('{business}')
      expect(botStrings[l].startBare, l).toContain('{settingsPath}')
      expect(botStrings[l].ownerLinkExpired, l).toContain('{settingsPath}')
    }
    expect(await settingsNotificationsPath('pt')).toBe('Configurações → Notificações')
    expect(await settingsNotificationsPath('es')).toBe('Configuración → Notificaciones')
    expect(await settingsNotificationsPath('en')).toBe('Settings → Notifications')
  })
})
