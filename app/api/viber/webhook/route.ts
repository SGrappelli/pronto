/**
 * POST /api/viber/webhook?bid={businessId}
 *
 * Viber присылает сюда все события бота.
 *
 * Flows:
 *  conversation_started (context=client_{uuid}) → client opt-in
 *  conversation_started (context=own_{token}) → owner connects: one-time token from Settings → Notifications
 *  conversation_started (no context) → ignored — opening the bot never claims the owner slot
 *  /start own_{token}   → owner connect (typed fallback of the same token); a bare /start changes nothing
 *  /link {phone}        → fallback: client links by phone number
 *  /today               → owner: appointments today
 *  /help                → command list
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendViberMessage, verifyViberSignature } from '@/lib/viber'
import { OWNER_LINK_PREFIX, parseStartCommand, classifyStartParam, verifyOwnerLinkToken, claimOwnerChat } from '@/lib/owner-chat-link'
import { botStrings, fillBotText, resolveBotLocale, settingsNotificationsPath } from '@/lib/owner-link-strings'

export async function POST(req: NextRequest) {
  try {
    const businessId = req.nextUrl.searchParams.get('bid')
    if (!businessId) return NextResponse.json({ status: 0 })

    // Signature check needs the exact raw bytes Viber signed — must read as
    // text before any JSON.parse.
    const rawBody = await req.text()
    let body: any
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ status: 0 }, { status: 400 })
    }
    const event: string = body?.event ?? ''

    if (!event) return NextResponse.json({ status: 0 })

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data: biz } = await supabase
      .from('businesses')
      .select('id, name, notification_language, viber_bot_token, viber_chat_id')
      .eq('id', businessId)
      .single()

    if (!biz?.viber_bot_token) return NextResponse.json({ status: 0 })

    // businessId is public (embedded in the booking-page URL) — without this,
    // anyone on the internet could POST a forged event straight to this
    // endpoint impersonating any sender, no Viber account required.
    const signatureHeader = req.headers.get('x-viber-content-signature')
    if (!verifyViberSignature(biz.viber_bot_token, rawBody, signatureHeader)) {
      return NextResponse.json({ status: 0 }, { status: 401 })
    }

    const senderId: string = body?.sender?.id ?? body?.user?.id ?? ''
    const senderName: string = body?.sender?.name ?? body?.user?.name ?? 'there'

    const currentOwnerChat = biz.viber_chat_id || null
    const lang = resolveBotLocale(biz.notification_language)
    const ownerConnectedMessage = () =>
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

    // The only way a chat becomes the owner chat: a valid one-time own_ token from Settings → Notifications
    // (lib/owner-chat-link.ts). Valid = our signature, not expired, still the chat id it was issued against; the write
    // is a compare-and-set on that value. Anything else gets the "expired or already used" reply and changes nothing.
    const connectOwnerChat = async (token: string, sender: string) => {
      const check = verifyOwnerLinkToken(token, { channel: 'viber', businessId, currentChatId: currentOwnerChat })
      const claimed =
        check === 'ok' &&
        (await claimOwnerChat(supabase, { businessId, column: 'viber_chat_id', expected: currentOwnerChat, chatId: sender }))
      await sendViberMessage(
        biz.viber_bot_token!,
        sender,
        claimed ? ownerConnectedMessage() : fillBotText(botStrings[lang].ownerLinkExpired, { settingsPath: await settingsNotificationsPath(lang) })
      )
    }

    // ── conversation_started ───────────────────────────────────────────────────
    if (event === 'conversation_started') {
      const context: string = body?.context ?? ''

      // Client opt-in: context = "client_{uuid}"
      if (context.startsWith('client_') && senderId) {
        const clientId = context.replace('client_', '')

        if (/^[0-9a-f-]{36}$/i.test(clientId)) {
          const { data: client } = await supabase
            .from('clients')
            .select('id, name')
            .eq('id', clientId)
            .eq('business_id', businessId)
            .maybeSingle()

          if (client) {
            await supabase
              .from('clients')
              .update({ viber_user_id: senderId })
              .eq('id', clientId)

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

      // Owner connect by the deep link from Settings → Notifications (context = own_<token>): the same one-time token
      // as the typed `/start own_<token>` below. Opening the bot (no context) NEVER claims the owner slot — before,
      // the first person to open an unconnected bot became its owner.
      if (context.startsWith(OWNER_LINK_PREFIX) && senderId) {
        await connectOwnerChat(context.split(/\s+/)[0], senderId)
      }
      return NextResponse.json({ status: 0 })
    }

    // ── message ───────────────────────────────────────────────────────────────
    if (event === 'message') {
      const text: string = body?.message?.text ?? ''

      // /start — the owner connects ONLY with a valid one-time token (`/start own_<token>`, the typed fallback of the
      // Settings link). A bare /start, `/start@Bot` or `/start <anything else>` changes nothing: the connected owner chat
      // gets the connection summary back, anyone else is told what this bot is. (`/startfoo` is not the command.)
      const start = parseStartCommand(text)
      if (start && senderId) {
        const intent = classifyStartParam(start.param)
        if (intent.kind === 'owner') {
          await connectOwnerChat(intent.token, senderId)
        } else if (currentOwnerChat && senderId === currentOwnerChat) {
          await sendViberMessage(biz.viber_bot_token, senderId, ownerConnectedMessage())
        } else {
          await sendViberMessage(
            biz.viber_bot_token,
            senderId,
            fillBotText(botStrings[lang].startBare, { business: biz.name, settingsPath: await settingsNotificationsPath(lang) })
          )
        }
        return NextResponse.json({ status: 0 })
      }

      // /link {phone} — fallback client opt-in by phone
      if (text.startsWith('/link') && senderId) {
        const phone = text.replace('/link', '').trim()
        if (phone) {
          const { data: client } = await supabase
            .from('clients')
            .select('id, name')
            .eq('business_id', businessId)
            .eq('phone', phone)
            .maybeSingle()

          if (client) {
            await supabase
              .from('clients')
              .update({ viber_user_id: senderId })
              .eq('id', client.id)

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

        const { data: appts } = await supabase
          .from('appointments')
          .select('starts_at, status, clients(name), services(name)')
          .eq('business_id', businessId)
          .gte('starts_at', start)
          .lte('starts_at', end)
          .order('starts_at')

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
