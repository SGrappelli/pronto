import { NextRequest, NextResponse } from 'next/server'
import { db, forBusiness, Prisma } from '@/lib/db'
import { sendBookingConfirmation, formatEmailDate, formatEmailTime } from '@/lib/email'
import { buildGCalUrlFromISO } from '@/lib/gcal'
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
  lang?: string
}): string {
  if (opts.lang === 'nl') {
    const lines = [
      `✅ <b>Boeking bevestigd!</b>`,
      ``,
      `👤 ${opts.clientName}`,
      `📋 ${opts.serviceName}`,
      `🕐 ${opts.date} om ${opts.time}`,
      `🏠 ${opts.businessName}`,
    ]
    if (opts.address) lines.push(`📍 ${opts.address}`)
    lines.push(``, `We sturen je vooraf een herinnering.`)
    return lines.join('\n')
  }
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

    // This route is called server-to-server (from /api/book), without a user
    // session and without knowing the business up front — resolve it from the
    // appointment row first, then scope everything else with forBusiness().
    const appt = await db.appointments.findUnique({
      where: { id: appointmentId },
      select: {
        id: true, starts_at: true, business_id: true, source: true,
        services: { select: { name: true, duration_min: true } },
        employees: { select: { name: true } },
        clients: { select: { name: true, email: true, whatsapp_number: true, telegram_id: true, viber_user_id: true } },
      },
    })

    if (!appt) return NextResponse.json({ error: 'not found' }, { status: 404 })

    const tdb = forBusiness(appt.business_id)
    const client = appt.clients
    const service = appt.services
    const employee = appt.employees

    const biz = await db.businesses.findUnique({
      select: { name: true, address: true, slug: true, timezone: true, notification_language: true, telegram_bot_token: true, telegram_chat_id: true, viber_bot_token: true, viber_chat_id: true, meta_whatsapp_phone_number_id: true, meta_whatsapp_access_token: true },
      where: { id: appt.business_id },
    })

    const tz = biz?.timezone ?? 'Europe/Brussels'
    const notifLang = biz?.notification_language ?? 'nl'
    const startsAtIso = appt.starts_at.toISOString()
    const date = formatEmailDate(startsAtIso, tz, notifLang === 'nl' ? 'nl-BE' : 'en-US')
    const time = formatEmailTime(startsAtIso, tz, notifLang === 'nl' ? 'nl-BE' : 'en-US')

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
          lang: notifLang,
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
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined
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
        }),
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
    const alreadySent = await tdb.notification_log.findFirst({
      where: { ref_id: appt.id, type: 'confirm', channel: 'email' },
    })

    if (alreadySent) {
      return NextResponse.json({ sent: true, email: 'skipped: already sent' })
    }

    const calendarUrl = buildGCalUrlFromISO({
      businessName: biz?.name ?? '',
      serviceName: service?.name ?? '',
      employeeName: employee?.name ?? null,
      startsAt: startsAtIso,
      durationMin: service?.duration_min ?? 60,
      timezone: tz,
      address: biz?.address ?? null,
    })

    await sendBookingConfirmation({
      to: recipientEmail,
      clientName: client?.name ?? 'Guest',
      businessName: biz?.name ?? 'Your appointment',
      serviceName: service?.name ?? '—',
      date,
      time,
      employeeName: employee?.name ?? undefined,
      address: biz?.address ?? undefined,
      calendarUrl,
      lang: notifLang,
    })

    // Record only after a confirmed successful send
    try {
      await tdb.notification_log.create({
        data: { business_id: appt.business_id, ref_id: appt.id, type: 'confirm', channel: 'email' },
      })
    } catch (err) {
      const isDuplicate = err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002'
      if (!isDuplicate) {
        console.error('[email/confirm] notification_log insert error:', (err as Error).message)
      }
    }

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('[email/confirm]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
