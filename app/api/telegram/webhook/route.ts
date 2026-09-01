/**
 * POST /api/telegram/webhook?bid={businessId}
 *
 * Telegram присылает сюда все сообщения боту.
 *
 * Flows:
 *  /start               → owner connects, saves chat_id to businesses
 *  /start client_{uuid} → client opt-in, saves chat_id to clients.telegram_id
 *  /link {phone}        → fallback: client links by phone number
 *  /today               → owner: appointments today
 *  /help                → command list
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, forBusiness } from '@/lib/db'
import { sendTelegramMessage } from '@/lib/telegram'

function toTitleCase(name: string): string {
  return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function POST(req: NextRequest) {
  try {
    const businessId = req.nextUrl.searchParams.get('bid')
    if (!businessId) return NextResponse.json({ ok: false }, { status: 400 })

    const body = await req.json()
    const message = body?.message
    if (!message) return NextResponse.json({ ok: true })

    const chatId = String(message.chat?.id)
    const text: string = message.text ?? ''
    const firstName: string = message.from?.first_name ?? 'there'

    // businessId arrives as the ?bid= query parameter Telegram calls back with.
    // Every query below is scoped to it via tdb, so a wrong bid can only ever
    // touch that business's own rows — and without its bot token nothing is
    // sent at all.
    const biz = await db.businesses.findUnique({
      select: { id: true, name: true, telegram_bot_token: true, telegram_chat_id: true },
      where: { id: businessId },
    })

    if (!biz?.telegram_bot_token) return NextResponse.json({ ok: true })

    const tdb = forBusiness(businessId)

    // ── /start ────────────────────────────────────────────────────────────────
    if (text.startsWith('/start')) {
      const param = text.replace('/start', '').trim()

      // Client opt-in: /start client_{uuid}
      if (param.startsWith('client_')) {
        const clientId = param.replace('client_', '')
        // Basic UUID format check
        if (/^[0-9a-f-]{36}$/i.test(clientId)) {
          const client = await tdb.clients.findFirst({
            select: { id: true, name: true, phone: true, email: true },
            where: { id: clientId },
          })

          if (client) {
            // Update this client and any duplicate records with the same phone/email
            // so one /start press covers all bookings made with the same contact info
            // The last branch filtered on id alone and relied on RLS for the
            // tenant check; tdb supplies it now.
            const match = client.phone
              ? { phone: client.phone }
              : client.email
                ? { email: client.email }
                : { id: clientId }

            await tdb.clients.updateMany({ where: match, data: { telegram_id: chatId } })

            await sendTelegramMessage(
              biz.telegram_bot_token,
              chatId,
              [
                `✅ Hi ${toTitleCase(client.name)}!`,
                ``,
                `You're now connected to <b>${biz.name}</b>.`,
                `You'll receive appointment reminders here automatically.`,
                ``,
                `See you soon! 👋`,
              ].join('\n')
            )
          } else {
            await sendTelegramMessage(
              biz.telegram_bot_token,
              chatId,
              `❌ Link not found. Please use the link from your booking confirmation.`
            )
          }
          return NextResponse.json({ ok: true })
        }
      }

      // Owner /start — connect business to this chat
      await db.businesses.update({
        where: { id: businessId },
        data: { telegram_chat_id: chatId },
      })

      await sendTelegramMessage(
        biz.telegram_bot_token,
        chatId,
        [
          `👋 Hi ${firstName}!`,
          ``,
          `You are now connected to <b>${biz.name}</b> on Pronto.`,
          ``,
          `You'll receive notifications here:`,
          `• 📅 New bookings`,
          `• 🔔 Appointment reminders`,
          `• ⚠️ Low-stock alerts`,
          `• ✅ Visit completions`,
          ``,
          `Send /help to see available commands.`,
        ].join('\n')
      )

      return NextResponse.json({ ok: true })
    }

    // ── /link {phone} — fallback client opt-in by phone number ────────────────
    if (text.startsWith('/link')) {
      const phone = text.replace('/link', '').trim()
      if (!phone) {
        await sendTelegramMessage(
          biz.telegram_bot_token,
          chatId,
          `Please include your phone number.\nExample: /link +79001234567`
        )
        return NextResponse.json({ ok: true })
      }

      const clients = await tdb.clients.findMany({
        select: { id: true, name: true },
        where: { phone },
      })

      if (clients.length > 0) {
        // Update all records with this phone (covers duplicate client entries)
        await tdb.clients.updateMany({ where: { phone }, data: { telegram_id: chatId } })

        await sendTelegramMessage(
          biz.telegram_bot_token,
          chatId,
          `✅ Hi ${toTitleCase(clients[0].name)}! Your Telegram is linked. You'll receive appointment reminders here.`
        )
      } else {
        await sendTelegramMessage(
          biz.telegram_bot_token,
          chatId,
          `❌ Phone number not found. Make sure it matches the number you used when booking.`
        )
      }
      return NextResponse.json({ ok: true })
    }

    // ── /today — appointments today (owner only) ───────────────────────────────
    if (text.startsWith('/today')) {
      const today = new Date()
      const start = new Date(today.setHours(0, 0, 0, 0)).toISOString()
      const end = new Date(today.setHours(23, 59, 59, 999)).toISOString()

      const appts = await tdb.appointments.findMany({
        select: {
          starts_at: true,
          status: true,
          clients: { select: { name: true } },
          services: { select: { name: true } },
        },
        where: { starts_at: { gte: new Date(start), lte: new Date(end) } },
        orderBy: { starts_at: 'asc' },
      })

      if (appts.length === 0) {
        await sendTelegramMessage(biz.telegram_bot_token, chatId, '📅 No appointments today.')
      } else {
        const statusEmoji: Record<string, string> = {
          confirmed: '🔵', pending: '🟡', completed: '🟢', cancelled: '🔴', no_show: '❌',
        }
        const lines = appts.map((a) => {
          const time = new Date(a.starts_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
          const rawName = (a.clients as unknown as { name: string } | null)?.name ?? 'Walk-in'
          const client = toTitleCase(rawName)
          const service = (a.services as unknown as { name: string } | null)?.name ?? '—'
          return `${statusEmoji[a.status] ?? '⚪'} ${time} — ${client} (${service})`
        })
        const statuses = new Set(appts.map((a) => a.status))
        const legend = [
          '🔵 Confirmed',
          '🟢 Completed',
          ...(statuses.has('cancelled') ? ['🔴 Cancelled'] : []),
        ].join('  ')
        await sendTelegramMessage(
          biz.telegram_bot_token,
          chatId,
          `📅 <b>Today's appointments (${appts.length})</b>\n\n${lines.join('\n')}\n\n${legend}`
        )
      }
      return NextResponse.json({ ok: true })
    }

    // ── /help ─────────────────────────────────────────────────────────────────
    if (text.startsWith('/help')) {
      await sendTelegramMessage(
        biz.telegram_bot_token,
        chatId,
        [
          `<b>Pronto Bot — available commands:</b>`,
          ``,
          `/today — today's appointments (owner only)`,
          `/link {phone} — link your Telegram to your client profile`,
          `  Example: /link +79001234567`,
          `/help — this message`,
        ].join('\n')
      )
      return NextResponse.json({ ok: true })
    }

    // Fallback
    if (biz.telegram_chat_id === chatId) {
      await sendTelegramMessage(biz.telegram_bot_token, chatId, 'Use /help to see available commands.')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[telegram/webhook]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
