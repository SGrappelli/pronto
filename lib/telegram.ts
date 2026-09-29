/**
 * lib/telegram.ts
 * Telegram Bot API — отправка сообщений и регистрация вебхука.
 */

import { createHmac, timingSafeEqual } from 'node:crypto'

const BASE = 'https://api.telegram.org/bot'

// ─── Подпись вебхука ───────────────────────────────────────────────────────────
// Telegram сам не подписывает апдейты, но setWebhook принимает secret_token —
// значение, которое Telegram затем кладёт в заголовок
// X-Telegram-Bot-Api-Secret-Token каждого запроса на этот URL. Без сверки этого
// значения /api/telegram/webhook?bid=<businessId> принимает POST от кого угодно
// в интернете (businessId — публичный, уходит на страницу записи), а не только
// от настоящего Telegram. Секрет выводится детерминированно из businessId +
// серверного ключа — так set-webhook (при подключении) и webhook (при приёме)
// всегда согласны, без отдельной колонки в БД.
function webhookSigningKey(): string {
  const key = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!key) throw new Error('TELEGRAM_WEBHOOK_SECRET is not set')
  return key
}

/** secret_token для конкретного бизнеса, передаётся в setWebhook. */
export function telegramWebhookSecretToken(businessId: string): string {
  // hex — гарантированно укладывается в разрешённый Telegram алфавит A-Z a-z 0-9 _ -
  return createHmac('sha256', webhookSigningKey()).update(businessId).digest('hex')
}

/** Сверяет заголовок X-Telegram-Bot-Api-Secret-Token входящего запроса. */
export function verifyTelegramWebhookSecret(businessId: string, headerValue: string | null): boolean {
  if (!headerValue) return false
  try {
    const expected = Buffer.from(telegramWebhookSecretToken(businessId))
    const actual = Buffer.from(headerValue)
    return expected.length === actual.length && timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}

// ─── Отправить текстовое сообщение ────────────────────────────────────────────

export async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
  parseMode: 'HTML' | 'Markdown' = 'HTML'
): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    })
    const json = await res.json()
    if (!json.ok) {
      console.error('[telegram] sendMessage error:', json.description)
      return false
    }
    return true
  } catch (err) {
    console.error('[telegram] sendMessage exception:', err)
    return false
  }
}

// ─── Зарегистрировать вебхук ───────────────────────────────────────────────────

export async function setTelegramWebhook(
  token: string,
  webhookUrl: string,
  secretToken: string
): Promise<{ ok: boolean; description?: string }> {
  try {
    const res = await fetch(`${BASE}${token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: webhookUrl, secret_token: secretToken }),
    })
    return await res.json()
  } catch (err) {
    return { ok: false, description: String(err) }
  }
}

// ─── Получить информацию о боте ───────────────────────────────────────────────

export async function getTelegramBotInfo(
  token: string
): Promise<{ ok: boolean; result?: { username: string; first_name: string } }> {
  try {
    const res = await fetch(`${BASE}${token}/getMe`)
    return await res.json()
  } catch {
    return { ok: false }
  }
}

// ─── Шаблоны сообщений ────────────────────────────────────────────────────────

export function tplNewBooking(opts: {
  clientName: string
  serviceName: string
  date: string
  time: string
  employeeName?: string
  source?: string
}): string {
  const source = opts.source === 'online' ? ' 🌐 online' : ''
  return [
    `📅 <b>New booking${source}</b>`,
    ``,
    `👤 Client: ${opts.clientName}`,
    `✂️ Service: ${opts.serviceName}`,
    `🕐 ${opts.date} at ${opts.time}`,
    opts.employeeName ? `👷 Employee: ${opts.employeeName}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export function tplReminder(opts: {
  clientName: string
  serviceName: string
  date: string
  time: string
  isOneHour?: boolean
}): string {
  const when = opts.isOneHour ? 'in 1 hour ⏰' : 'tomorrow 📅'
  return [
    `🔔 <b>Appointment ${when}</b>`,
    ``,
    `👤 ${opts.clientName}`,
    `✂️ ${opts.serviceName}`,
    `🕐 ${opts.date} at ${opts.time}`,
  ].join('\n')
}

export function tplLowStock(opts: {
  itemName: string
  quantity: number
  unit: string
  threshold: number
}): string {
  return [
    `⚠️ <b>Low stock alert</b>`,
    ``,
    `📦 ${opts.itemName}`,
    `Current: <b>${opts.quantity} ${opts.unit}</b> (threshold: ${opts.threshold})`,
  ].join('\n')
}

export function tplThankYou(opts: {
  clientName: string
  serviceName: string
}): string {
  return [
    `✅ <b>Visit completed</b>`,
    ``,
    `👤 ${opts.clientName}`,
    `✂️ ${opts.serviceName}`,
    `Thank-you message sent to client.`,
  ].join('\n')
}

export function tplReactivation(opts: {
  clientName: string
}): string {
  return [
    `📤 <b>Reactivation sent</b>`,
    ``,
    `👤 ${opts.clientName}`,
    `We invited this client to return after 30 days of inactivity.`,
  ].join('\n')
}

export function tplBirthday(opts: {
  clientName: string
}): string {
  return [
    `🎂 <b>Birthday message sent</b>`,
    ``,
    `👤 ${opts.clientName}`,
    `We sent them birthday wishes today.`,
  ].join('\n')
}

// ─── Шаблоны для клиентов ─────────────────────────────────────────────────────

export function tplReminderClient(opts: {
  clientName: string
  serviceName: string
  date: string
  time: string
  businessName: string
  address?: string
  isOneHour?: boolean
}): string {
  const when = opts.isOneHour ? 'in 1 hour ⏰' : 'tomorrow 📅'
  const lines = [
    `🔔 <b>Appointment reminder ${when}</b>`,
    ``,
    `👤 ${opts.clientName}`,
    `✂️ ${opts.serviceName}`,
    `🕐 ${opts.date} at ${opts.time}`,
    `🏠 ${opts.businessName}`,
  ]
  if (opts.address) lines.push(`📍 ${opts.address}`)
  return lines.join('\n')
}

export function tplThankYouClient(opts: {
  clientName: string
  serviceName: string
  businessName: string
  bookingUrl?: string
}): string {
  const lines = [
    `✅ <b>Thank you for your visit, ${opts.clientName}!</b>`,
    ``,
    `✂️ ${opts.serviceName}`,
    `🏠 ${opts.businessName}`,
    ``,
    `We'd love to see you again!`,
  ]
  if (opts.bookingUrl) lines.push(``, `📅 Book again: ${opts.bookingUrl}`)
  return lines.join('\n')
}

export function tplReactivationClient(opts: {
  clientName: string
  businessName: string
  bookingUrl?: string
}): string {
  const lines = [
    `👋 <b>${opts.clientName}, it's been a while!</b>`,
    ``,
    `Come back to ${opts.businessName} — we'd love to see you!`,
  ]
  if (opts.bookingUrl) lines.push(``, `📅 Book now: ${opts.bookingUrl}`)
  return lines.join('\n')
}

export function tplBirthdayClient(opts: {
  clientName: string
  businessName: string
  bookingUrl?: string
}): string {
  const lines = [
    `🎂 <b>Happy Birthday, ${opts.clientName}!</b>`,
    ``,
    `The team at ${opts.businessName} wishes you all the best! 🎉`,
  ]
  if (opts.bookingUrl) lines.push(``, `🎁 Treat yourself: ${opts.bookingUrl}`)
  return lines.join('\n')
}
