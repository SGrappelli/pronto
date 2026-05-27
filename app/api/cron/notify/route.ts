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
import { createClient } from '@supabase/supabase-js'
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
  sendWhatsAppTemplate,
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

  // Service role — cron запускается без сессии пользователя, RLS должен быть обойдён
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const now = new Date()
  const results: string[] = []
  const debug: Record<string, unknown> = { now: now.toISOString() }

  // ── helper: dedup через notification_log ────────────────────────────────────
  async function logged(businessId: string, refId: string, type: string): Promise<boolean> {
    const { error } = await supabase.from('notification_log').insert({
      business_id: businessId,
      ref_id: refId,
      type,
      channel: 'email',
    })
    return !error
  }

  // ── 1. 24h reminders ────────────────────────────────────────────────────────
  const from24 = new Date(now.getTime() + 23 * 3600_000).toISOString()
  const to24   = new Date(now.getTime() + 25 * 3600_000).toISOString()
  debug.window_24h = { from: from24, to: to24 }

  const { data: appts24, error: err24 } = await supabase
    .from('appointments')
    .select('id, starts_at, business_id, services(name), employees(name), clients(name, email, whatsapp_number, viber_user_id, telegram_id)')
    .gte('starts_at', from24)
    .lte('starts_at', to24)
    .eq('status', 'confirmed')
  debug.appts24 = { count: appts24?.length ?? 0, error: err24?.message ?? null }

  for (const a of appts24 ?? []) {
    if (!await logged(a.business_id, a.id, 'reminder_24h')) continue

    const { data: biz } = await supabase
      .from('businesses')
      .select('name, address, timezone, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id, meta_whatsapp_phone_number_id, meta_whatsapp_access_token, wa_template_reminder, wa_template_language')
      .eq('id', a.business_id).single()

    const client   = a.clients   as unknown as { name: string; email: string | null; whatsapp_number: string | null; viber_user_id: string | null; telegram_id: string | null } | null
    const service  = a.services  as unknown as { name: string } | null
    const employee = a.employees as unknown as { name: string } | null
    const tz = biz?.timezone ?? 'UTC'
    const date = formatEmailDate(a.starts_at, tz)
    const time = formatEmailTime(a.starts_at, tz)
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
    // WhatsApp → клиенту (HSM template; skipped if template name not configured)
    if (client?.whatsapp_number && biz?.wa_template_reminder) {
      const msgText = waTplReminder({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name })
      await sendWhatsAppTemplate(
        client.whatsapp_number,
        biz.wa_template_reminder,
        biz.wa_template_language ?? 'en',
        [{ type: 'body', parameters: [{ type: 'text', text: msgText }] }],
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
  const from1h = new Date(now.getTime() + 55 * 60_000).toISOString()
  const to1h   = new Date(now.getTime() + 65 * 60_000).toISOString()
  debug.window_1h = { from: from1h, to: to1h }

  const { data: appts1h, error: err1h } = await supabase
    .from('appointments')
    .select('id, starts_at, business_id, services(name), employees(name), clients(name, email, whatsapp_number, viber_user_id, telegram_id)')
    .gte('starts_at', from1h)
    .lte('starts_at', to1h)
    .eq('status', 'confirmed')
  debug.appts1h = { count: appts1h?.length ?? 0, error: err1h?.message ?? null }

  // DEBUG: log 1h booking count
  console.log(`[cron/notify] 1h window: from=${from1h} to=${to1h} found=${appts1h?.length ?? 0} bookings`)
  if (err1h) console.error('[cron/notify] 1h query error:', err1h.message)

  const debug1hBookings: unknown[] = []
  debug.bookings_1h = debug1hBookings

  for (const a of appts1h ?? []) {
    if (!await logged(a.business_id, a.id, 'reminder_1h')) {
      console.log(`[cron/notify] 1h SKIP (already logged): booking=${a.id}`)
      continue
    }

    const { data: biz } = await supabase
      .from('businesses')
      .select('name, address, timezone, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id, meta_whatsapp_phone_number_id, meta_whatsapp_access_token, wa_template_reminder, wa_template_language')
      .eq('id', a.business_id).single()

    const client   = a.clients   as unknown as { name: string; email: string | null; whatsapp_number: string | null; viber_user_id: string | null; telegram_id: string | null } | null
    const service  = a.services  as unknown as { name: string } | null
    const employee = a.employees as unknown as { name: string } | null
    const tz = biz?.timezone ?? 'UTC'
    const date = formatEmailDate(a.starts_at, tz)
    const time = formatEmailTime(a.starts_at, tz)
    const waCredentials = biz?.meta_whatsapp_phone_number_id && biz?.meta_whatsapp_access_token
      ? { phoneNumberId: biz.meta_whatsapp_phone_number_id, accessToken: biz.meta_whatsapp_access_token }
      : undefined

    // DEBUG: log booking details
    const bookingDebug: Record<string, unknown> = {
      booking_id: a.id,
      starts_at: a.starts_at,
      client_telegram_id: client?.telegram_id ?? null,
      biz_has_bot_token: !!biz?.telegram_bot_token,
      tg_client_will_send: !!(biz?.telegram_bot_token && client?.telegram_id),
    }
    console.log('[cron/notify] 1h booking details:', JSON.stringify(bookingDebug))
    debug1hBookings.push(bookingDebug)

    // Telegram → клиенту (владельцу reminder не нужен — он уже получил уведомление при создании записи)
    if (biz?.telegram_bot_token && client?.telegram_id) {
      const tgClientOk = await sendTelegramMessage(biz.telegram_bot_token, client.telegram_id,
        tgTplReminderClient({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name, address: biz.address ?? undefined, isOneHour: true })
      )
      console.log(`[cron/notify] TG→client booking=${a.id} result=${tgClientOk}`)
      bookingDebug.tg_client_result = tgClientOk
    }
    // Viber → клиенту
    if (biz?.viber_bot_token && client?.viber_user_id) {
      await sendViberMessage(biz.viber_bot_token, client.viber_user_id,
        viberTplReminderClient({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name, address: biz.address ?? undefined, isOneHour: true })
      )
    }
    // WhatsApp → клиенту (HSM template; skipped if template name not configured)
    if (client?.whatsapp_number && biz?.wa_template_reminder) {
      const msgText = waTplReminder({ clientName: client.name, serviceName: service?.name ?? '—', date, time, businessName: biz.name, isOneHour: true })
      await sendWhatsAppTemplate(
        client.whatsapp_number,
        biz.wa_template_reminder,
        biz.wa_template_language ?? 'en',
        [{ type: 'body', parameters: [{ type: 'text', text: msgText }] }],
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

  const { data: completed, error: errTy } = await supabase
    .from('appointments')
    .select('id, business_id, services(name), clients(name, email, whatsapp_number, viber_user_id, telegram_id)')
    .eq('status', 'completed')
    .gte('ends_at', twoHoursAgo)
    .lte('ends_at', now.toISOString())
  debug.thankyou = { count: completed?.length ?? 0, error: errTy?.message ?? null }

  for (const a of completed ?? []) {
    if (!await logged(a.business_id, a.id, 'thankyou')) continue

    const { data: biz } = await supabase
      .from('businesses')
      .select('name, slug, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id, meta_whatsapp_phone_number_id, meta_whatsapp_access_token, wa_template_thankyou, wa_template_language')
      .eq('id', a.business_id).single()

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
    // WhatsApp → клиенту (HSM template; skipped if template name not configured)
    if (client?.whatsapp_number && biz?.wa_template_thankyou) {
      const msgText = waTplThankYou({ clientName: client.name, serviceName: service?.name ?? '—', businessName: biz.name, bookingUrl })
      await sendWhatsAppTemplate(
        client.whatsapp_number,
        biz.wa_template_thankyou,
        biz.wa_template_language ?? 'en',
        [{ type: 'body', parameters: [{ type: 'text', text: msgText }] }],
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

  const { data: dormant, error: errRe } = await supabase
    .from('clients')
    .select('id, name, email, whatsapp_number, viber_user_id, telegram_id, business_id')
    .gte('last_visit_at', reactivStart.toISOString())
    .lte('last_visit_at', reactivEnd.toISOString())
  debug.reactivation = { count: dormant?.length ?? 0, error: errRe?.message ?? null }

  for (const c of dormant ?? []) {
    if (!c.email && !c.whatsapp_number && !c.viber_user_id && !c.telegram_id) continue
    if (!await logged(c.business_id, c.id, 'reactivation')) continue

    const { data: biz } = await supabase.from('businesses').select('name, slug, telegram_bot_token, telegram_chat_id, viber_bot_token, meta_whatsapp_phone_number_id, meta_whatsapp_access_token, wa_template_reactivation, wa_template_language').eq('id', c.business_id).single()
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
    // WhatsApp → клиенту (HSM template; skipped if template name not configured)
    if (c.whatsapp_number && biz?.wa_template_reactivation) {
      const msgText = waTplReactivation({ clientName: c.name, businessName: biz.name, bookingUrl })
      await sendWhatsAppTemplate(
        c.whatsapp_number,
        biz.wa_template_reactivation,
        biz.wa_template_language ?? 'en',
        [{ type: 'body', parameters: [{ type: 'text', text: msgText }] }],
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

  const { data: allClientsWithBday } = await supabase
    .from('clients')
    .select('id, name, email, whatsapp_number, viber_user_id, telegram_id, birthday, business_id')
    .not('birthday', 'is', null)

  const bdays = (allClientsWithBday ?? []).filter(
    (c) => typeof c.birthday === 'string' && c.birthday.slice(5) === todayMD
  )

  for (const c of bdays ?? []) {
    if (!c.email && !c.whatsapp_number && !c.viber_user_id && !c.telegram_id) continue
    const year = now.getFullYear()
    if (!await logged(c.business_id, `${c.id}_bday_${year}`, 'birthday')) continue

    const { data: biz } = await supabase.from('businesses').select('name, slug, telegram_bot_token, telegram_chat_id, viber_bot_token, meta_whatsapp_phone_number_id, meta_whatsapp_access_token, wa_template_birthday, wa_template_language').eq('id', c.business_id).single()
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
    // WhatsApp → клиенту (HSM template; skipped if template name not configured)
    if (c.whatsapp_number && biz?.wa_template_birthday) {
      const msgText = waTplBirthday({ clientName: c.name, businessName: biz.name, bookingUrl })
      await sendWhatsAppTemplate(
        c.whatsapp_number,
        biz.wa_template_birthday,
        biz.wa_template_language ?? 'en',
        [{ type: 'body', parameters: [{ type: 'text', text: msgText }] }],
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
