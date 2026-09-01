/**
 * POST /api/book
 * Server-side booking submission with Zod validation and rate limiting.
 * Replaces direct Supabase client calls from booking-form.tsx.
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { db, forBusiness } from '@/lib/db'
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

  // businessId comes from the request body because this is the public booking
  // endpoint — the visitor identifies the business by its booking page. Every
  // query below is scoped to it, and the service lookup verifies the requested
  // service really belongs to that business.
  const tdb = forBusiness(businessId)

  const [service, biz] = await Promise.all([
    tdb.services.findFirst({
      select: { id: true, duration_min: true, price: true },
      where: { id: serviceId, is_active: true },
    }),
    db.businesses.findUnique({
      select: { timezone: true },
      where: { id: businessId },
    }),
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
  const businessHours = await tdb.business_hours.findMany({
    select: {
      day_of_week: true, is_open: true, open_time: true, close_time: true,
      break_start: true, break_end: true,
    },
  })

  const effectiveHours = computeEffectiveHours(businessHours)
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
    const orParts = []
    if (phone) orParts.push({ phone })
    if (email) orParts.push({ email })

    const existing = await tdb.clients.findFirst({
      select: { id: true, name: true, email: true, telegram_id: true, viber_user_id: true },
      where: { OR: orParts },
    })

    if (existing) {
      clientId = existing.id
      hasTelegram = !!existing.telegram_id
      hasViber = !!existing.viber_user_id
      // BUG-10: update both name and email if different from stored value
      const updates: { name?: string; email?: string } = {}
      if (name && name !== existing.name) updates.name = name
      if (email && email !== existing.email) updates.email = email
      if (Object.keys(updates).length > 0) {
        await tdb.clients.update({ where: { id: existing.id }, data: updates })
      }
    } else {
      // BUG-9: fail fast if client creation fails — never book without a valid clientId
      try {
        const newClient = await tdb.clients.create({
          data: {
            business_id: businessId,
            name,
            phone: phone || null,
            email: email || null,
          },
          select: { id: true },
        })
        clientId = newClient.id
      } catch (err) {
        console.error('[api/book] client insert error:', (err as Error).message)
        return NextResponse.json({ error: 'client_creation_failed' }, { status: 500 })
      }
    }
  }

  // Create appointment — parse wall-clock time in the business timezone
  const startsAt = parseDateTimeInTz(date, time, timezone)
  const endsAt   = new Date(startsAt.getTime() + service.duration_min * 60_000)

  // The slot conflict and staff-assignment checks live in database triggers
  // (migrations 017, 032, 034), which RAISE EXCEPTION. Prisma surfaces that as
  // a thrown error whose message still carries the trigger's error code, so
  // the branches below match on the same strings as before.
  let appt: { id: string }
  try {
    appt = await forBusiness(businessId).appointments.create({
      data: {
        business_id: businessId,
        client_id:   clientId,
        employee_id: employeeId ?? null,
        service_id:  serviceId,
        starts_at:   startsAt,
        ends_at:     endsAt,
        price:       service.price,
        status:      'confirmed',
        source:      'online',
      },
      select: { id: true },
    })
  } catch (err) {
    const message = (err as Error).message ?? ''

    // Trigger 034: no active employee exists to assign this booking to —
    // distinct from a real time conflict, so it gets an honest message
    // instead of "slot already booked".
    if (message.includes('no_staff_available')) {
      return NextResponse.json(
        { error: 'no_staff_available', message: 'This business has no staff available to take bookings right now. Please contact them directly.' },
        { status: 409 }
      )
    }

    // Trigger 017: the DB raises 'slot_already_booked' when a concurrent
    // request wins the race for the same slot.
    if (message.includes('slot_already_booked')) {
      return NextResponse.json(
        { error: 'slot_taken', message: 'This time slot was just taken. Please choose another time.' },
        { status: 409 }
      )
    }
    console.error('[api/book] insert error:', message)
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
