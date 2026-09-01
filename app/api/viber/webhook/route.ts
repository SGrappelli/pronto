/**
 * POST /api/viber/webhook?bid={businessId}
 *
 * Viber присылает сюда все события бота.
 *
 * Flows:
 *  conversation_started (context=client_{uuid}) → client opt-in
 *  conversation_started (no context, first time) → owner connects
 *  /start               → owner re-connect
 *  /link {phone}        → fallback: client links by phone number
 *  /today               → owner: appointments today
 *  /help                → command list
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, forBusiness } from '@/lib/db'
import { sendViberMessage } from '@/lib/viber'

export async function POST(req: NextRequest) {
  try {
    const businessId = req.nextUrl.searchParams.get('bid')
    if (!businessId) return NextResponse.json({ status: 0 })

    const body = await req.json()
    const event: string = body?.event ?? ''

    if (!event) return NextResponse.json({ status: 0 })

    // businessId arrives as the ?bid= query parameter Viber calls back with.
    // Every query below is scoped to it via tdb.
    const biz = await db.businesses.findUnique({
      select: { id: true, name: true, viber_bot_token: true, viber_chat_id: true },
      where: { id: businessId },
    })

    const tdb = forBusiness(businessId)

    if (!biz?.viber_bot_token) return NextResponse.json({ status: 0 })

    const senderId: string = body?.sender?.id ?? body?.user?.id ?? ''
    const senderName: string = body?.sender?.name ?? body?.user?.name ?? 'there'

    // ── conversation_started ───────────────────────────────────────────────────
    if (event === 'conversation_started') {
      const context: string = body?.context ?? ''

      // Client opt-in: context = "client_{uuid}"
      if (context.startsWith('client_') && senderId) {
        const clientId = context.replace('client_', '')

        if (/^[0-9a-f-]{36}$/i.test(clientId)) {
          const client = await tdb.clients.findFirst({
            select: { id: true, name: true },
            where: { id: clientId },
          })

          if (client) {
            // Filtered on id alone before, with RLS doing the tenant check.
            await tdb.clients.updateMany({
              where: { id: clientId },
              data: { viber_user_id: senderId },
            })

            await sendViberMessage(
              biz.viber_bot_token,
              senderId,
              [
                `✅ Hi ${client.name}!`,
                ``,
                `You're now connected to ${biz.name}.`,
                `You'll receive appointment reminders here automatically.`,
                ``,
                `See you soon! 👋`,
              ].join('\n')
            )
          } else {
            await sendViberMessage(
              biz.viber_bot_token,
              senderId,
              `❌ Link not found. Please use the link from your booking confirmation.`
            )
          }
          return NextResponse.json({ status: 0 })
        }
      }

      // Owner connect — first time (no viber_chat_id yet)
      if (!biz.viber_chat_id && senderId) {
        await db.businesses.update({
          where: { id: businessId },
          data: { viber_chat_id: senderId },
        })

        await sendViberMessage(
          biz.viber_bot_token,
          senderId,
          [
            `👋 Hi ${senderName}!`,
            ``,
            `You are now connected to ${biz.name} on Pronto.`,
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
      }
      return NextResponse.json({ status: 0 })
    }

    // ── message ───────────────────────────────────────────────────────────────
    if (event === 'message') {
      const text: string = body?.message?.text ?? ''

      // /start — owner re-connect
      if (text.startsWith('/start') && senderId) {
        await db.businesses.update({
          where: { id: businessId },
          data: { viber_chat_id: senderId },
        })

        await sendViberMessage(
          biz.viber_bot_token,
          senderId,
          `✅ Connected to ${biz.name}! You will receive notifications here.`
        )
        return NextResponse.json({ status: 0 })
      }

      // /link {phone} — fallback client opt-in by phone
      if (text.startsWith('/link') && senderId) {
        const phone = text.replace('/link', '').trim()
        if (phone) {
          const client = await tdb.clients.findFirst({
            select: { id: true, name: true },
            where: { phone },
          })

          if (client) {
            await tdb.clients.updateMany({
              where: { id: client.id },
              data: { viber_user_id: senderId },
            })

            await sendViberMessage(
              biz.viber_bot_token,
              senderId,
              `✅ Hi ${client.name}! Your Viber is now linked. You'll receive appointment reminders here.`
            )
          } else {
            await sendViberMessage(
              biz.viber_bot_token,
              senderId,
              `❌ Phone number not found. Make sure it matches the number you used when booking.`
            )
          }
        }
        return NextResponse.json({ status: 0 })
      }

      // /today — owner only
      if (text.startsWith('/today') && senderId === biz.viber_chat_id) {
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

        if (!appts || appts.length === 0) {
          await sendViberMessage(biz.viber_bot_token, senderId, '📅 No appointments today.')
        } else {
          const lines = appts.map((a) => {
            const time = new Date(a.starts_at).toLocaleTimeString('en-US', {
              hour: '2-digit', minute: '2-digit', hour12: false,
            })
            const client = (a.clients as unknown as { name: string } | null)?.name ?? 'Walk-in'
            const service = (a.services as unknown as { name: string } | null)?.name ?? '—'
            const statusEmoji: Record<string, string> = {
              confirmed: '🔵', pending: '🟡', completed: '🟢', cancelled: '⛔', no_show: '❌',
            }
            return `${statusEmoji[a.status] ?? '⚪'} ${time} — ${client} (${service})`
          })
          await sendViberMessage(
            biz.viber_bot_token,
            senderId,
            `📅 Today's appointments (${appts.length})\n\n${lines.join('\n')}`
          )
        }
        return NextResponse.json({ status: 0 })
      }

      // /help
      if (text.startsWith('/help')) {
        await sendViberMessage(
          biz.viber_bot_token,
          senderId,
          [
            `Pronto Bot — available commands:`,
            ``,
            `/today — today's appointments (owner only)`,
            `/link {phone} — link your Viber to your client profile`,
            `  Example: /link +79001234567`,
            `/help — this message`,
          ].join('\n')
        )
        return NextResponse.json({ status: 0 })
      }

      // Fallback
      if (senderId) {
        await sendViberMessage(biz.viber_bot_token, senderId, 'Send /help to see available commands.')
      }
    }

    return NextResponse.json({ status: 0 })
  } catch (err) {
    console.error('[viber/webhook]', err)
    return NextResponse.json({ status: 0 })
  }
}
