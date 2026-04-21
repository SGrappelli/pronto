/**
 * lib/whatsapp.ts
 * Meta WhatsApp Cloud API — отправка сообщений клиентам.
 *
 * Requires env vars:
 *   META_WHATSAPP_PHONE_NUMBER_ID  — ID номера отправителя в Meta Dashboard
 *   META_WHATSAPP_ACCESS_TOKEN     — постоянный или временный токен доступа
 */

const BASE = 'https://graph.facebook.com/v20.0'

// ─── Нормализация номера ──────────────────────────────────────────────────────
// WhatsApp требует E.164 без '+': "79001234567", "12025551234" и т.д.

function normalizePhone(phone: string): string {
  return phone.replace(/^\+/, '').replace(/[\s\-().]/g, '')
}

// ─── Отправить текстовое сообщение ────────────────────────────────────────────

export async function sendWhatsAppMessage(
  to: string,
  message: string,
  credentials?: { phoneNumberId: string; accessToken: string }
): Promise<boolean> {
  const phoneNumberId = credentials?.phoneNumberId ?? process.env.META_WHATSAPP_PHONE_NUMBER_ID
  const accessToken = credentials?.accessToken ?? process.env.META_WHATSAPP_ACCESS_TOKEN

  if (!phoneNumberId || !accessToken) return false

  const normalizedTo = normalizePhone(to)
  if (!normalizedTo) return false

  try {
    const res = await fetch(`${BASE}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: normalizedTo,
        type: 'text',
        text: { body: message },
      }),
    })
    const json = await res.json()
    if (!res.ok) {
      console.error('[whatsapp] sendMessage error:', json?.error?.message ?? json)
      return false
    }
    return true
  } catch (err) {
    console.error('[whatsapp] sendMessage exception:', err)
    return false
  }
}

// ─── Шаблоны сообщений (plain text, без HTML) ────────────────────────────────

export function tplBookingConfirmation(opts: {
  clientName: string
  serviceName: string
  date: string
  time: string
  businessName: string
  employeeName?: string
  address?: string
}): string {
  const lines = [
    `✅ Booking confirmed!`,
    ``,
    `Hi ${opts.clientName},`,
    `Your appointment has been booked:`,
    ``,
    `Service: ${opts.serviceName}`,
    `Date: ${opts.date} at ${opts.time}`,
  ]
  if (opts.employeeName) lines.push(`Specialist: ${opts.employeeName}`)
  if (opts.address) lines.push(`Address: ${opts.address}`)
  lines.push(``, `See you soon — ${opts.businessName}`)
  return lines.join('\n')
}

export function tplReminder(opts: {
  clientName: string
  serviceName: string
  date: string
  time: string
  businessName: string
  isOneHour?: boolean
}): string {
  const when = opts.isOneHour ? 'in 1 hour ⏰' : 'tomorrow 📅'
  return [
    `🔔 Appointment reminder`,
    ``,
    `Hi ${opts.clientName},`,
    `Your appointment is ${when}:`,
    ``,
    `Service: ${opts.serviceName}`,
    `Date: ${opts.date} at ${opts.time}`,
    ``,
    `See you soon — ${opts.businessName}`,
  ].join('\n')
}

export function tplThankYou(opts: {
  clientName: string
  serviceName: string
  businessName: string
  bookingUrl?: string
}): string {
  const lines = [
    `✅ Thank you for your visit!`,
    ``,
    `Hi ${opts.clientName},`,
    `It was a pleasure seeing you for ${opts.serviceName}.`,
    ``,
    `We look forward to your next visit!`,
  ]
  if (opts.bookingUrl) {
    lines.push(``, `Book your next appointment:`, opts.bookingUrl)
  }
  lines.push(``, `— ${opts.businessName}`)
  return lines.join('\n')
}

export function tplReactivation(opts: {
  clientName: string
  businessName: string
  bookingUrl?: string
}): string {
  const lines = [
    `👋 We miss you, ${opts.clientName}!`,
    ``,
    `It's been a while since your last visit at ${opts.businessName}.`,
    `We'd love to see you again!`,
  ]
  if (opts.bookingUrl) {
    lines.push(``, `Book your appointment:`, opts.bookingUrl)
  }
  return lines.join('\n')
}

export function tplBirthday(opts: {
  clientName: string
  businessName: string
  bookingUrl?: string
}): string {
  const lines = [
    `🎂 Happy Birthday, ${opts.clientName}!`,
    ``,
    `Wishing you a wonderful day from all of us at ${opts.businessName}.`,
    `Treat yourself — you deserve it!`,
  ]
  if (opts.bookingUrl) {
    lines.push(``, `Book a special treat:`, opts.bookingUrl)
  }
  return lines.join('\n')
}

export function tplLowStock(opts: {
  itemName: string
  quantity: number
  unit: string
  threshold: number
}): string {
  return [
    `⚠️ Low stock alert`,
    ``,
    `📦 ${opts.itemName}`,
    `Current: ${opts.quantity} ${opts.unit} (threshold: ${opts.threshold})`,
    ``,
    `Please restock soon.`,
  ].join('\n')
}
