/**
 * POST /api/book
 * Server-side booking submission with Zod validation and rate limiting.
 * Replaces direct Supabase client calls from booking-form.tsx.
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { createServiceClient } from '@/lib/supabase/service'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { computeEffectiveHours, checkSlotWithinHours, dayOfWeekFromDateString } from '@/lib/booking-availability'

function sanitize(s: string): string {
  return DOMPurify.sanitize(s, { ALLOWED_TAGS: [] }).trim()
}

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
  // Rate limit: 5 booking attempts per IP per 10 minutes
  const ip = getIp(req)
  if (!rateLimit(ip, { limit: 20, windowMs: 10 * 60 * 1000 })) {
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

  const { businessId, serviceId, employeeId, date, time, phone, email } = parsed.data
  const name = sanitize(parsed.data.name)

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

  // Server-side availability check — the client (booking-form.tsx) already
  // restricts the slot picker to open hours / outside break, but that's UI
  // convenience only. Nothing before this point stopped a direct POST from
  // requesting a time the business is actually closed for, so repeat the
  // same check here using the same shared logic (lib/booking-availability.ts)
  // the client uses to build effectiveHours in the first place.
  const { data: businessHours } = await supabase
    .from('business_hours')
    .select('day_of_week, is_open, open_time, close_time, break_start, break_end')
    .eq('business_id', businessId)

  const effectiveHours = computeEffectiveHours(businessHours ?? [])
  const dow = dayOfWeekFromDateString(date)
  const dayHours = effectiveHours.find((h) => h.day_of_week === dow)
  const slotCheck = checkSlotWithinHours(dayHours, time, service.duration_min)

  if (!slotCheck.ok) {
    const messages: Record<typeof slotCheck.reason, string> = {
      closed: 'This business is closed at the selected date. Please choose another day.',
      outside_hours: 'This time is outside business hours. Please choose another time.',
      break: 'This time falls during a break. Please choose another time.',
    }
    return NextResponse.json(
      { error: 'outside_availability', reason: slotCheck.reason, message: messages[slotCheck.reason] },
      { status: 400 }
    )
  }

  // Upsert client
  let clientId: string | null = null
  let hasTelegram = false
  let hasViber = false
  if (phone || email) {
    // BUG-8: search by all provided fields combined — avoids duplicate clients when
    // both phone and email are submitted but each matches a different existing record.
    // Matched via separate parameterized .eq() calls, never a hand-built PostgREST
    // .or() filter string — comma/parenthesis characters in a submitted phone/email
    // are structural in that syntax, so a raw filter string built from user input
    // could be extended into an unrelated OR clause and match a client this
    // booking has no business touching.
    type ClientMatch = { id: string; name: string; email: string | null; telegram_id: string | null; viber_user_id: string | null }
    let existing: ClientMatch | null = null
    if (phone) {
      const { data } = await supabase
        .from('clients')
        .select('id, name, email, telegram_id, viber_user_id')
        .eq('business_id', businessId)
        .eq('phone', phone)
        .maybeSingle()
      existing = data
    }
    if (!existing && email) {
      const { data } = await supabase
        .from('clients')
        .select('id, name, email, telegram_id, viber_user_id')
        .eq('business_id', businessId)
        .eq('email', email)
        .maybeSingle()
      existing = data
    }

    if (existing) {
      clientId = existing.id
      hasTelegram = !!existing.telegram_id
      hasViber = !!existing.viber_user_id
      // BUG-10: update both name and email if different from stored value
      const updates: { name?: string; email?: string } = {}
      if (name && name !== existing.name) updates.name = name
      if (email && email !== existing.email) updates.email = email
      if (Object.keys(updates).length > 0) {
        await supabase.from('clients').update(updates).eq('id', existing.id)
      }
    } else {
      // BUG-9: fail fast if client creation fails — never book without a valid clientId
      const { data: newClient, error: insertErr } = await supabase
        .from('clients')
        .insert({
          business_id: businessId,
          name,
          phone: phone || null,
          email: email || null,
        })
        .select('id')
        .single()
      if (insertErr || !newClient) {
        console.error('[api/book] client insert error:', insertErr?.message)
        return NextResponse.json({ error: 'client_creation_failed' }, { status: 500 })
      }
      clientId = newClient.id
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
      status:      'confirmed',
      source:      'online',
    })
    .select('id')
    .single()

  if (apptErr || !appt) {
    // Trigger 034: no active employee exists to assign this booking to —
    // distinct from a real time conflict, so it gets an honest message
    // instead of "slot already booked".
    if (apptErr?.message?.includes('no_staff_available')) {
      return NextResponse.json(
        { error: 'no_staff_available', message: 'This business has no staff available to take bookings right now. Please contact them directly.' },
        { status: 409 }
      )
    }

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
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET ?? ''}`,
    },
    body: JSON.stringify({ appointmentId: appt.id, formEmail: email || null }),
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[api/book] email/confirm failed:', res.status, text)
    }
  }).catch((err) => {
    console.error('[api/book] email/confirm fetch error:', err)
  })

  return NextResponse.json({ appointmentId: appt.id, clientId, hasTelegram, hasViber })
}
