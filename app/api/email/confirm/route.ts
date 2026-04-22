import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { sendBookingConfirmation, formatEmailDate, formatEmailTime } from '@/lib/email'
import { sendTelegramMessage, tplNewBooking, tplReminderClient as tgTplConfirmClient } from '@/lib/telegram'
import { sendViberMessage, tplNewBooking as viberTplNewBooking } from '@/lib/viber'
import { sendWhatsAppMessage, tplBookingConfirmation as waTplBookingConfirmation } from '@/lib/whatsapp'

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
    `✂️ ${opts.serviceName}`,
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
    `✂️ ${opts.serviceName}`,
    `🕐 ${opts.date} at ${opts.time}`,
    `🏠 ${opts.businessName}`,
  ]
  if (opts.address) lines.push(`📍 ${opts.address}`)
  lines.push(``, `We'll remind you before the appointment.`)
  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req)
    if (!rateLimit(ip, { limit: 10, windowMs: 60 * 60 * 1000 })) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
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
      .select('name, address, slug, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id')
      .eq('id', appt.business_id)
      .single()

    const date = formatEmailDate(appt.starts_at)
    const time = formatEmailTime(appt.starts_at)

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

    // ── WhatsApp → клиенту ──────────────────────────────────────────────────
    if (client?.whatsapp_number) {
      await sendWhatsAppMessage(
        client.whatsapp_number,
        waTplBookingConfirmation({
          clientName: client.name,
          serviceName: service?.name ?? '—',
          date,
          time,
          businessName: biz?.name ?? '',
          employeeName: employee?.name,
          address: biz?.address ?? undefined,
        })
      )
    }

    // ── Email → клиенту ─────────────────────────────────────────────────────
    // Prefer the email submitted in the booking form (formEmail) over the one stored in DB,
    // since the DB record may belong to an existing client found by phone who has a different email.
    const recipientEmail = formEmail || client?.email
    if (!recipientEmail) {
      return NextResponse.json({ sent: true, email: 'skipped: no client email' })
    }

    const { error: logErr } = await supabase.from('notification_log').insert({
      business_id: appt.business_id,
      ref_id: appt.id,
      type: 'confirm',
      channel: 'email',
    })
    if (logErr) {
      // 23505 = unique_violation — письмо уже было отправлено ранее, пропускаем
      if (logErr.code === '23505') {
        return NextResponse.json({ sent: true, email: 'skipped: already sent' })
      }
      // Любая другая ошибка — логируем, но письмо всё равно отправляем
      console.error('[email/confirm] notification_log insert error:', logErr.message)
    }

    await sendBookingConfirmation({
      to: recipientEmail,
      clientName: client.name,
      businessName: biz?.name ?? 'Your appointment',
      serviceName: service?.name ?? '—',
      date,
      time,
      employeeName: employee?.name ?? undefined,
      address: biz?.address ?? undefined,
    })

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('[email/confirm]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
