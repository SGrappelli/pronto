import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendBookingConfirmation, formatEmailDate, formatEmailTime } from '@/lib/email'
import { sendTelegramMessage, tplNewBooking, tplReminderClient as tgTplConfirmClient } from '@/lib/telegram'
import { sendViberMessage, tplNewBooking as viberTplNewBooking } from '@/lib/viber'
import { sendWhatsAppTemplate, tplBookingConfirmation as waTplBookingConfirmation } from '@/lib/whatsapp'

// Telegram confirmation template for client
function tplConfirmClient(opts: {
  clientName: string
  serviceName: string
  date: string
  time: string
  businessName: string
  address?: string
}): string {
  const lines = [
    `✅ <b>Booking confirmed!</b>`,
    ``,
    `👤 ${opts.clientName}`,
    `📋 ${opts.serviceName}`,
    `🕐 ${opts.date} at ${opts.time}`,
    `🏠 ${opts.businessName}`,
  ]
  if (opts.address) lines.push(`📍 ${opts.address}`)
  lines.push(``, `We'll remind you before the appointment.`)
  return lines.join('\n')
}

function viberTplConfirmClient(opts: {
  clientName: string
  serviceName: string
  date: string
  time: string
  businessName: string
  address?: string
}): string {
  const lines = [
    `✅ Booking confirmed!`,
    ``,
    `👤 ${opts.clientName}`,
    `📋 ${opts.serviceName}`,
    `🕐 ${opts.date} at ${opts.time}`,
    `🏠 ${opts.businessName}`,
  ]
  if (opts.address) lines.push(`📍 ${opts.address}`)
  lines.push(``, `We'll remind you before the appointment.`)
  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const expectedSecret = process.env.INTERNAL_API_SECRET
    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
    if (!expectedSecret) {
      console.warn('[email/confirm] INTERNAL_API_SECRET is not set — endpoint is unprotected. Set it in .env for production.')
    }

    const { appointmentId, formEmail } = await req.json()
    if (!appointmentId) return NextResponse.json({ error: 'missing appointmentId' }, { status: 400 })

    // Используем service role — этот роут вызывается server-to-server (из /api/book),
    // без cookies пользователя, поэтому анонимный клиент блокировался бы RLS.
    const supabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: appt, error: apptErr } = await supabase
      .from('appointments')
      .select('id, starts_at, business_id, source, services(name), employees(name), clients(name, email, whatsapp_number, telegram_id, viber_user_id)')
      .eq('id', appointmentId)
      .single()

    if (apptErr) console.error('[email/confirm] appointment fetch error:', apptErr.message)
    if (!appt) return NextResponse.json({ error: 'not found' }, { status: 404 })

    const client = appt.clients as unknown as {
      name: string
      email: string | null
      whatsapp_number: string | null
      telegram_id: string | null
      viber_user_id: string | null
    } | null
    const service = appt.services as unknown as { name: string } | null
    const employee = appt.employees as unknown as { name: string } | null

    const { data: biz } = await supabase
      .from('businesses')
      .select('name, address, slug, timezone, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id, meta_whatsapp_phone_number_id, meta_whatsapp_access_token, wa_template_confirmation, wa_template_language')
      .eq('id', appt.business_id)
      .single()

    const tz = biz?.timezone ?? 'UTC'
    const date = formatEmailDate(appt.starts_at, tz)
    const time = formatEmailTime(appt.starts_at, tz)

    // ── Telegram → владельцу ────────────────────────────────────────────────
    if (biz?.telegram_bot_token && biz?.telegram_chat_id) {
      await sendTelegramMessage(
        biz.telegram_bot_token,
        biz.telegram_chat_id,
        tplNewBooking({
          clientName: client?.name ?? 'Walk-in',
          serviceName: service?.name ?? '—',
          date,
          time,
          employeeName: employee?.name,
          source: appt.source ?? undefined,
        })
      )
    }

    // ── Telegram → клиенту (если уже подключён) ─────────────────────────────
    if (biz?.telegram_bot_token && client?.telegram_id) {
      await sendTelegramMessage(
        biz.telegram_bot_token,
        client.telegram_id,
        tplConfirmClient({
          clientName: client.name,
          serviceName: service?.name ?? '—',
          date,
          time,
          businessName: biz.name,
          address: biz.address ?? undefined,
        })
      )
    }

    // ── Viber → владельцу ───────────────────────────────────────────────────
    if (biz?.viber_bot_token && biz?.viber_chat_id) {
      await sendViberMessage(
        biz.viber_bot_token,
        biz.viber_chat_id,
        viberTplNewBooking({
          clientName: client?.name ?? 'Walk-in',
          serviceName: service?.name ?? '—',
          date,
          time,
          employeeName: employee?.name,
          source: appt.source ?? undefined,
        })
      )
    }

    // ── Viber → клиенту (если уже подключён) ────────────────────────────────
    if (biz?.viber_bot_token && client?.viber_user_id) {
      await sendViberMessage(
        biz.viber_bot_token,
        client.viber_user_id,
        viberTplConfirmClient({
          clientName: client.name,
          serviceName: service?.name ?? '—',
          date,
          time,
          businessName: biz.name,
          address: biz.address ?? undefined,
        })
      )
    }

    // ── WhatsApp → клиенту (HSM template) ──────────────────────────────────
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined
    if (client?.whatsapp_number && biz?.wa_template_confirmation) {
      const msgText = waTplBookingConfirmation({
        clientName: client.name,
        serviceName: service?.name ?? '—',
        date,
        time,
        businessName: biz?.name ?? '',
        employeeName: employee?.name,
        address: biz?.address ?? undefined,
      })
      await sendWhatsAppTemplate(
        client.whatsapp_number,
        biz.wa_template_confirmation,
        biz.wa_template_language ?? 'en',
        [{ type: 'body', parameters: [{ type: 'text', text: msgText }] }],
        waCredentials
      )
    }

    // ── Email → клиенту ─────────────────────────────────────────────────────
    // Prefer the email submitted in the booking form (formEmail) over the one stored in DB,
    // since the DB record may belong to an existing client found by phone who has a different email.
    const recipientEmail = formEmail || client?.email
    if (!recipientEmail) {
      return NextResponse.json({ sent: true, email: 'skipped: no client email' })
    }

    // Check dedup BEFORE sending — log record is written only after a successful send,
    // so a failed send leaves no trace and can be retried freely.
    const { data: alreadySent } = await supabase
      .from('notification_log')
      .select('id')
      .eq('business_id', appt.business_id)
      .eq('ref_id', appt.id)
      .eq('type', 'confirm')
      .eq('channel', 'email')
      .maybeSingle()

    if (alreadySent) {
      return NextResponse.json({ sent: true, email: 'skipped: already sent' })
    }

    await sendBookingConfirmation({
      to: recipientEmail,
      clientName: client?.name ?? 'Guest',
      businessName: biz?.name ?? 'Your appointment',
      serviceName: service?.name ?? '—',
      date,
      time,
      employeeName: employee?.name ?? undefined,
      address: biz?.address ?? undefined,
    })

    // Record only after a confirmed successful send
    const { error: logErr } = await supabase.from('notification_log').insert({
      business_id: appt.business_id,
      ref_id: appt.id,
      type: 'confirm',
      channel: 'email',
    })
    if (logErr && logErr.code !== '23505') {
      console.error('[email/confirm] notification_log insert error:', logErr.message)
    }

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('[email/confirm]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
