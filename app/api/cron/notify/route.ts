/**
 * GET /api/cron/notify?secret=YOUR_SECRET
 *
 * Запускать каждый час через внешний планировщик (cron-job.org, Vercel Cron и т.д.)
 *
 * Что делает каждый запуск:
 *  1. 24h reminders — appointments starting in 23-25h
 *  2. 1h  reminders — appointments starting in 55-65min
 *  3. Thank-you     — appointments completed in the last 2h
 *  4. Re-activation — clients with last_visit_at exactly 30 days ago
 *  5. Birthday      — clients whose birthday is today
 *
 * Каждое событие отправляется через все доступные каналы:
 *  - Email     → клиенту
 *  - Telegram  → владельцу (если настроен) и клиенту (если привязан)
 *  - Viber     → владельцу (если настроен) и клиенту (если привязан viber_user_id)
 *  - WhatsApp  → клиенту (если заполнен whatsapp_number; требует approved templates для продакшена)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, forBusiness } from '@/lib/db'
import {
  sendReminder,
  sendThankYou,
  sendReactivation,
  sendBirthday,
  formatEmailDate,
  formatEmailTime,
} from '@/lib/email'
import {
  sendTelegramMessage,
  tplThankYou,
  tplReactivation as tgTplReactivation,
  tplBirthday as tgTplBirthday,
  tplReminderClient as tgTplReminderClient,
  tplThankYouClient as tgTplThankYouClient,
  tplReactivationClient as tgTplReactivationClient,
  tplBirthdayClient as tgTplBirthdayClient,
} from '@/lib/telegram'
import {
  sendViberMessage,
  tplThankYou as viberTplThankYou,
  tplReminderClient as viberTplReminderClient,
  tplThankYouClient as viberTplThankYouClient,
  tplReactivation as viberTplReactivation,
  tplBirthday as viberTplBirthday,
} from '@/lib/viber'
import {
  sendWhatsAppMessage,
  tplReminder as waTplReminder,
  tplThankYou as waTplThankYou,
  tplReactivation as waTplReactivation,
  tplBirthday as waTplBirthday,
} from '@/lib/whatsapp'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function GET(req: NextRequest) {
  // Принимаем секрет только через заголовок Authorization: Bearer {secret}
  // Query-параметр ?secret= намеренно убран — он виден в логах серверов и прокси.
  // Используйте pg_cron или cron-job.org с заголовком Authorization.
  const authHeader = req.headers.get('authorization') ?? ''
  const secret = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // This job deliberately sweeps EVERY business — it runs without a user
  // session and has no single tenant. That is why the reads below use the
  // unscoped `db` rather than forBusiness(); writes still go through
  // forBusiness() with the business_id of the row being processed.
  const now = new Date()
  const results: string[] = []
  const debug: Record<string, unknown> = { now: now.toISOString() }

  // ── helper: dedup через notification_log ────────────────────────────────────
  async function logged(businessId: string, refId: string, type: string): Promise<boolean> {
    // A duplicate row means this notification already went out: the insert
    // fails and we skip, exactly as the Supabase version did on error.
    try {
      await forBusiness(businessId).notification_log.create({
        data: { business_id: businessId, ref_id: refId, type, channel: 'email' },
      })
      return true
    } catch {
      return false
    }
  }

  // ── 1. 24h reminders ────────────────────────────────────────────────────────
  const from24 = new Date(now.getTime() + 23 * 3600_000).toISOString()
  const to24   = new Date(now.getTime() + 25 * 3600_000).toISOString()
  debug.window_24h = { from: from24, to: to24 }

  const appts24 = await db.appointments.findMany({
    select: {
      id: true,
      starts_at: true,
      business_id: true,
      services: { select: { name: true } },
      employees: { select: { name: true } },
      clients: {
        select: {
          name: true, email: true, whatsapp_number: true,
          viber_user_id: true, telegram_id: true,
        },
      },
    },
    where: {
      status: 'confirmed',
      starts_at: { gte: new Date(from24), lte: new Date(to24) },
    },
  })
  debug.appts24 = { count: appts24.length, error: null }

  for (const a of appts24) {
    const client = a.clients as unknown as { name: string; email: string | null; whatsapp_number: string | null; viber_user_id: string | null; telegram_id: string | null } | null
    // Skip without logging if client has no contact channels at all.
    // This prevents burning a notification_log entry for a booking that can never
    // be delivered — which would permanently block retries once contact info is added.
    if (!client?.telegram_id && !client?.email && !client?.viber_user_id && !client?.whatsapp_number) continue
    if (!await logged(a.business_id, a.id, 'reminder_24h')) continue

    const biz = await db.businesses.findUnique({
      select: { name: true, address: true, timezone: true, telegram_bot_token: true, telegram_chat_id: true, viber_bot_token: true, viber_chat_id: true, meta_whatsapp_phone_number_id: true, meta_whatsapp_access_token: true },
      where: { id: a.business_id },
    })

    const service  = a.services  as unknown as { name: string } | null
    const employee = a.employees as unknown as { name: string } | null
    const tz = biz?.timezone ?? 'UTC'
    const date = formatEmailDate(a.starts_at.toISOString(), tz)
    const time = formatEmailTime(a.starts_at.toISOString(), tz)
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined

    // Telegram → клиенту (владельцу reminder не нужен — он уже получил уведомление при создании записи)
    if (biz?.telegram_bot_token && client?.telegram_id) {
      await sendTelegramMessage(biz.telegram_bot_token, client.telegram_id,
        tgTplReminderClient({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name, address: biz.address ?? undefined })
      )
    }
    // Viber → клиенту
    if (biz?.viber_bot_token && client?.viber_user_id) {
      await sendViberMessage(biz.viber_bot_token, client.viber_user_id,
        viberTplReminderClient({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name, address: biz.address ?? undefined })
      )
    }
    // WhatsApp → клиенту
    if (client?.whatsapp_number) {
      await sendWhatsAppMessage(client.whatsapp_number,
        waTplReminder({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz?.name ?? '' }),
        waCredentials
      )
    }
    // Email → клиенту
    if (client?.email) {
      try {
        await sendReminder({
          to: client.email, clientName: client.name,
          businessName: biz?.name ?? '', serviceName: service?.name ?? '—',
          date, time,
          employeeName: employee?.name ?? undefined,
          address: biz?.address ?? undefined,
        })
      } catch (err) {
        console.error('[cron/notify] sendReminder 24h error:', err)
      }
    }
    results.push(`reminder_24h:${a.id}`)
  }

  // ── 2. 1h reminders ─────────────────────────────────────────────────────────
  const from1h = new Date(now.getTime() + 45 * 60_000).toISOString()
  const to1h   = new Date(now.getTime() + 75 * 60_000).toISOString()
  debug.window_1h = { from: from1h, to: to1h }

  const appts1h = await db.appointments.findMany({
    select: {
      id: true,
      starts_at: true,
      business_id: true,
      services: { select: { name: true } },
      employees: { select: { name: true } },
      clients: {
        select: {
          name: true, email: true, whatsapp_number: true,
          viber_user_id: true, telegram_id: true,
        },
      },
    },
    where: {
      status: 'confirmed',
      starts_at: { gte: new Date(from1h), lte: new Date(to1h) },
    },
  })
  debug.appts1h = { count: appts1h.length, error: null }

  for (const a of appts1h) {
    const client = a.clients as unknown as { name: string; email: string | null; whatsapp_number: string | null; viber_user_id: string | null; telegram_id: string | null } | null
    // Skip without logging if client has no contact channels at all.
    // This prevents burning a notification_log entry for a booking that can never
    // be delivered — which would permanently block retries once contact info is added.
    if (!client?.telegram_id && !client?.email && !client?.viber_user_id && !client?.whatsapp_number) continue
    if (!await logged(a.business_id, a.id, 'reminder_1h')) continue

    const biz = await db.businesses.findUnique({
      select: { name: true, address: true, timezone: true, telegram_bot_token: true, telegram_chat_id: true, viber_bot_token: true, viber_chat_id: true, meta_whatsapp_phone_number_id: true, meta_whatsapp_access_token: true },
      where: { id: a.business_id },
    })

    const service  = a.services  as unknown as { name: string } | null
    const employee = a.employees as unknown as { name: string } | null
    const tz = biz?.timezone ?? 'UTC'
    const date = formatEmailDate(a.starts_at.toISOString(), tz)
    const time = formatEmailTime(a.starts_at.toISOString(), tz)
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined

    // Telegram → клиенту (владельцу reminder не нужен — он уже получил уведомление при создании записи)
    if (biz?.telegram_bot_token && client?.telegram_id) {
      await sendTelegramMessage(biz.telegram_bot_token, client.telegram_id,
        tgTplReminderClient({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name, address: biz.address ?? undefined, isOneHour: true })
      )
    }
    // Viber → клиенту
    if (biz?.viber_bot_token && client?.viber_user_id) {
      await sendViberMessage(biz.viber_bot_token, client.viber_user_id,
        viberTplReminderClient({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name, address: biz.address ?? undefined, isOneHour: true })
      )
    }
    // WhatsApp → клиенту
    if (client?.whatsapp_number) {
      await sendWhatsAppMessage(client.whatsapp_number,
        waTplReminder({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz?.name ?? '', isOneHour: true }),
        waCredentials
      )
    }
    // Email → клиенту
    if (client?.email) {
      try {
        await sendReminder({
          to: client.email, clientName: client.name,
          businessName: biz?.name ?? '', serviceName: service?.name ?? '—',
          date, time,
          employeeName: employee?.name ?? undefined,
          address: biz?.address ?? undefined,
          isOneHour: true,
        })
      } catch (err) {
        console.error('[cron/notify] sendReminder 1h error:', err)
      }
    }
    results.push(`reminder_1h:${a.id}`)
  }

  // ── 3. Thank-you ─────────────────────────────────────────────────────────────
  const twoHoursAgo = new Date(now.getTime() - 2 * 3600_000).toISOString()
  debug.window_thankyou = { from: twoHoursAgo, to: now.toISOString() }

  const completed = await db.appointments.findMany({
    select: {
      id: true,
      business_id: true,
      services: { select: { name: true } },
      clients: {
        select: {
          name: true, email: true, whatsapp_number: true,
          viber_user_id: true, telegram_id: true,
        },
      },
    },
    where: {
      status: 'completed',
      ends_at: { gte: new Date(twoHoursAgo), lte: now },
    },
  })
  debug.thankyou = { count: completed.length, error: null }

  for (const a of completed) {
    if (!await logged(a.business_id, a.id, 'thankyou')) continue

    const biz = await db.businesses.findUnique({
      select: { name: true, slug: true, telegram_bot_token: true, telegram_chat_id: true, viber_bot_token: true, viber_chat_id: true, meta_whatsapp_phone_number_id: true, meta_whatsapp_access_token: true },
      where: { id: a.business_id },
    })

    const client  = a.clients  as unknown as { name: string; email: string | null; whatsapp_number: string | null; viber_user_id: string | null; telegram_id: string | null } | null
    const service = a.services as unknown as { name: string } | null
    const bookingUrl = biz?.slug ? `${APP_URL}/book/${biz.slug}` : undefined
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined

    // Telegram → владельцу
    if (biz?.telegram_bot_token && biz?.telegram_chat_id) {
      await sendTelegramMessage(biz.telegram_bot_token, biz.telegram_chat_id,
        tplThankYou({ clientName: client?.name ?? 'Walk-in', serviceName: service?.name ?? '—' })
      )
    }
    // Telegram → клиенту
    if (biz?.telegram_bot_token && client?.telegram_id) {
      await sendTelegramMessage(biz.telegram_bot_token, client.telegram_id,
        tgTplThankYouClient({ clientName: client.name, serviceName: service?.name ?? '—', businessName: biz.name, bookingUrl })
      )
    }
    // Viber → владельцу
    if (biz?.viber_bot_token && biz?.viber_chat_id) {
      await sendViberMessage(biz.viber_bot_token, biz.viber_chat_id,
        viberTplThankYou({ clientName: client?.name ?? 'Walk-in', serviceName: service?.name ?? '—' })
      )
    }
    // Viber → клиенту
    if (biz?.viber_bot_token && client?.viber_user_id) {
      await sendViberMessage(biz.viber_bot_token, client.viber_user_id,
        viberTplThankYouClient({ clientName: client.name, serviceName: service?.name ?? '—', businessName: biz.name, bookingUrl })
      )
    }
    // WhatsApp → клиенту
    if (client?.whatsapp_number) {
      await sendWhatsAppMessage(client.whatsapp_number,
        waTplThankYou({ clientName: client.name, serviceName: service?.name ?? '—', businessName: biz?.name ?? '', bookingUrl }),
        waCredentials
      )
    }
    // Email → клиенту
    if (client?.email) {
      await sendThankYou({
        to: client.email, clientName: client.name,
        businessName: biz?.name ?? '',
        serviceName: service?.name ?? '—',
        bookingUrl,
      })
    }
    results.push(`thankyou:${a.id}`)
  }

  // ── 4. Re-activation ─────────────────────────────────────────────────────────
  const reactivStart = new Date(now)
  reactivStart.setDate(reactivStart.getDate() - 30)
  reactivStart.setHours(0, 0, 0, 0)
  const reactivEnd = new Date(reactivStart)
  reactivEnd.setHours(23, 59, 59, 999)

  debug.window_reactivation = { from: reactivStart.toISOString(), to: reactivEnd.toISOString() }

  const dormant = await db.clients.findMany({
    select: {
      id: true, name: true, email: true, whatsapp_number: true,
      viber_user_id: true, telegram_id: true, business_id: true,
    },
    where: { last_visit_at: { gte: reactivStart, lte: reactivEnd } },
  })
  debug.reactivation = { count: dormant.length, error: null }

  for (const c of dormant) {
    if (!c.email && !c.whatsapp_number && !c.viber_user_id && !c.telegram_id) continue
    if (!await logged(c.business_id, c.id, 'reactivation')) continue

    const biz = await db.businesses.findUnique({ select: { name: true, slug: true, telegram_bot_token: true, telegram_chat_id: true, viber_bot_token: true, meta_whatsapp_phone_number_id: true, meta_whatsapp_access_token: true }, where: { id: c.business_id } })
    const bookingUrl = biz?.slug ? `${APP_URL}/book/${biz.slug}` : undefined
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined

    // Telegram → владельцу
    if (biz?.telegram_bot_token && biz?.telegram_chat_id) {
      await sendTelegramMessage(biz.telegram_bot_token, biz.telegram_chat_id,
        tgTplReactivation({ clientName: c.name })
      )
    }
    // Telegram → клиенту
    if (biz?.telegram_bot_token && c.telegram_id) {
      await sendTelegramMessage(biz.telegram_bot_token, c.telegram_id,
        tgTplReactivationClient({ clientName: c.name, businessName: biz.name, bookingUrl })
      )
    }
    // Viber → клиенту
    if (biz?.viber_bot_token && c.viber_user_id) {
      await sendViberMessage(biz.viber_bot_token, c.viber_user_id,
        viberTplReactivation({ clientName: c.name, businessName: biz.name, bookingUrl })
      )
    }
    // WhatsApp → клиенту
    if (c.whatsapp_number) {
      await sendWhatsAppMessage(c.whatsapp_number,
        waTplReactivation({ clientName: c.name, businessName: biz?.name ?? '', bookingUrl }),
        waCredentials
      )
    }
    // Email → клиенту
    if (c.email) {
      await sendReactivation({
        to: c.email, clientName: c.name,
        businessName: biz?.name ?? '',
        bookingUrl,
      })
    }
    results.push(`reactivation:${c.id}`)
  }

  // ── 5. Birthday ───────────────────────────────────────────────────────────────
  // .like() не работает на колонке типа date в PostgREST — фильтруем в JS
  const todayMD = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const allClientsWithBday = await db.clients.findMany({
    select: {
      id: true, name: true, email: true, whatsapp_number: true,
      viber_user_id: true, telegram_id: true, birthday: true, business_id: true,
    },
    where: { birthday: { not: null } },
  })

  // birthday is a `date` column, so Prisma hands back a Date at UTC midnight —
  // the month/day must be read in UTC, not local time, or a client born on the
  // 1st gets greeted on the 31st in a negative-offset timezone.
  const bdays = allClientsWithBday.filter((c) => {
    if (!c.birthday) return false
    const md = `${String(c.birthday.getUTCMonth() + 1).padStart(2, '0')}-${String(c.birthday.getUTCDate()).padStart(2, '0')}`
    return md === todayMD
  })

  for (const c of bdays) {
    if (!c.email && !c.whatsapp_number && !c.viber_user_id && !c.telegram_id) continue
    const year = now.getFullYear()
    if (!await logged(c.business_id, `${c.id}_bday_${year}`, 'birthday')) continue

    const biz = await db.businesses.findUnique({ select: { name: true, slug: true, telegram_bot_token: true, telegram_chat_id: true, viber_bot_token: true, meta_whatsapp_phone_number_id: true, meta_whatsapp_access_token: true }, where: { id: c.business_id } })
    const bookingUrl = biz?.slug ? `${APP_URL}/book/${biz.slug}` : undefined
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined

    // Telegram → владельцу
    if (biz?.telegram_bot_token && biz?.telegram_chat_id) {
      await sendTelegramMessage(biz.telegram_bot_token, biz.telegram_chat_id,
        tgTplBirthday({ clientName: c.name })
      )
    }
    // Telegram → клиенту
    if (biz?.telegram_bot_token && c.telegram_id) {
      await sendTelegramMessage(biz.telegram_bot_token, c.telegram_id,
        tgTplBirthdayClient({ clientName: c.name, businessName: biz.name, bookingUrl })
      )
    }
    // Viber → клиенту
    if (biz?.viber_bot_token && c.viber_user_id) {
      await sendViberMessage(biz.viber_bot_token, c.viber_user_id,
        viberTplBirthday({ clientName: c.name, businessName: biz.name, bookingUrl })
      )
    }
    // WhatsApp → клиенту
    if (c.whatsapp_number) {
      await sendWhatsAppMessage(c.whatsapp_number,
        waTplBirthday({ clientName: c.name, businessName: biz?.name ?? '', bookingUrl }),
        waCredentials
      )
    }
    // Email → клиенту
    if (c.email) {
      await sendBirthday({
        to: c.email, clientName: c.name,
        businessName: biz?.name ?? '',
        bookingUrl,
      })
    }
    results.push(`birthday:${c.id}`)
  }

  return NextResponse.json({ ok: true, sent: results.length, results, debug })
}
