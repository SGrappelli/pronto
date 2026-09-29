import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/appointments/[id]/confirm
//
// Fires the booking-confirmation email/Telegram/Viber/WhatsApp fan-out
// (/api/email/confirm) for a manually-created dashboard booking.
//
// /api/email/confirm is internal-only (server-to-server, guarded by
// INTERNAL_API_SECRET) — a browser can't call it directly with that header
// without shipping the secret to the client bundle. This route sits in
// between: it authenticates the dashboard session, checks the appointment
// actually belongs to the caller's business, and only then relays the call
// server-side with the real secret attached.
export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (!business) {
    console.error('[appointments/[id]/confirm] authenticated owner has no business row:', user.id)
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const { data: appt } = await supabase
    .from('appointments')
    .select('id')
    .eq('id', params.id)
    .eq('business_id', business.id)
    .maybeSingle()

  if (!appt) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  try {
    const res = await fetch(`${appUrl}/api/email/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.INTERNAL_API_SECRET ?? ''}`,
      },
      body: JSON.stringify({ appointmentId: appt.id }),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[appointments/[id]/confirm] email/confirm failed:', res.status, text)
      return NextResponse.json({ error: 'confirm_failed' }, { status: 502 })
    }
  } catch (err) {
    console.error('[appointments/[id]/confirm] email/confirm fetch error:', err)
    return NextResponse.json({ error: 'confirm_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
