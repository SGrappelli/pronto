/**
 * POST /api/book
 * Server-side booking submission with Zod validation and rate limiting.
 * Replaces direct Supabase client calls from booking-form.tsx.
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/service'
import { rateLimit, getIp } from '@/lib/rate-limit'

/** Convert a wall-clock date+time (e.g. "2024-03-15", "14:30") in a named IANA timezone to a UTC Date. */
function parseDateTimeInTz(date: string, time: string, timezone: string): Date {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  // Use noon UTC on the same date as a stable reference to determine the TZ offset,
  // avoiding DST edge cases that only happen near midnight.
  const noonUtc = new Date(Date.UTC(year, month - 1, day, 12, 0))
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
  }).formatToParts(noonUtc)
  const get = (type: string) => parseInt(parts.find((p) => p.type === type)?.value ?? '0')
  const localNoonMs = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'))
  const offsetMs = localNoonMs - noonUtc.getTime()
  // wall_clock = UTC + offset  →  UTC = wall_clock - offset
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - offsetMs)
}

const BookingSchema = z.object({
  businessId: z.string().uuid(),
  serviceId:  z.string().uuid(),
  employeeId: z.string().uuid().nullable().optional(),
  date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  time:       z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  name:       z.string().min(1).max(100),
  phone:      z.string().max(30).optional().nullable(),
  email:      z.string().email().optional().nullable().or(z.literal('')),
})

export async function POST(req: NextRequest) {
  // Rate limit: 20 bookings per IP per hour
  const ip = getIp(req)
  if (!rateLimit(ip, { limit: 20, windowMs: 60 * 60 * 1000 })) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  // Parse + validate input
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = BookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { businessId, serviceId, employeeId, date, time, name, phone, email } = parsed.data

  if (!phone && !email) {
    return NextResponse.json(
      { error: 'contact_required', message: 'At least a phone number or email is required' },
      { status: 400 }
    )
  }

  const supabase = createServiceClient()

  // Verify the business exists and the service belongs to it; also fetch timezone
  const [{ data: service }, { data: biz }] = await Promise.all([
    supabase
      .from('services')
      .select('id, duration_min, price')
      .eq('id', serviceId)
      .eq('business_id', businessId)
      .eq('is_active', true)
      .maybeSingle(),
    supabase
      .from('businesses')
      .select('timezone')
      .eq('id', businessId)
      .maybeSingle(),
  ])

  if (!service) {
    return NextResponse.json({ error: 'service_not_found' }, { status: 404 })
  }

  const timezone = biz?.timezone ?? 'UTC'

  // Upsert client
  let clientId: string | null = null
  let hasTelegram = false
  if (phone || email) {
    const filter = phone ? `phone.eq.${phone}` : `email.eq.${email}`
    const { data: existing } = await supabase
      .from('clients')
      .select('id, name, telegram_id')
      .eq('business_id', businessId)
      .or(filter)
      .maybeSingle()

    if (existing) {
      clientId = existing.id
      hasTelegram = !!existing.telegram_id
      // Keep the client record current — update the name if the booking provides a different one
      if (name && name !== existing.name) {
        await supabase.from('clients').update({ name }).eq('id', existing.id)
      }
    } else {
      const { data: newClient } = await supabase
        .from('clients')
        .insert({
          business_id: businessId,
          name,
          phone: phone || null,
          email: email || null,
        })
        .select('id')
        .single()
      clientId = newClient?.id ?? null
    }
  }

  // Create appointment — parse wall-clock time in the business timezone
  const startsAt = parseDateTimeInTz(date, time, timezone)
  const endsAt   = new Date(startsAt.getTime() + service.duration_min * 60_000)

  const { data: appt, error: apptErr } = await supabase
    .from('appointments')
    .insert({
      business_id: businessId,
      client_id:   clientId,
      employee_id: employeeId ?? null,
      service_id:  serviceId,
      starts_at:   startsAt.toISOString(),
      ends_at:     endsAt.toISOString(),
      price:       service.price,
      status:      'pending',
      source:      'online',
    })
    .select('id')
    .single()

  if (apptErr || !appt) {
    // Trigger 017: the DB raises 'slot_already_booked' when a concurrent
    // request wins the race for the same slot.
    if (apptErr?.message?.includes('slot_already_booked')) {
      return NextResponse.json(
        { error: 'slot_taken', message: 'This time slot was just taken. Please choose another time.' },
        { status: 409 }
      )
    }
    console.error('[api/book] insert error:', apptErr?.message)
    return NextResponse.json({ error: 'booking_failed' }, { status: 500 })
  }

  // Trigger notifications (fire-and-forget — non-blocking)
  fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/email/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appointmentId: appt.id, formEmail: email || null }),
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[api/book] email/confirm failed:', res.status, text)
    }
  }).catch((err) => {
    console.error('[api/book] email/confirm fetch error:', err)
  })

  return NextResponse.json({ appointmentId: appt.id, clientId, hasTelegram })
}
