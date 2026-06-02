import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'

const VALID_TIERS = ['free', 'starter', 'pro', 'agency'] as const
type Tier = typeof VALID_TIERS[number]

export async function POST(req: NextRequest) {
  // ── Auth check ───────────────────────────────────────────────────────────
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || user?.email !== adminEmail) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── Body validation ───────────────────────────────────────────────────────
  let body: { businessId?: string; tier?: string; note?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { businessId, tier, note } = body

  if (!businessId || typeof businessId !== 'string') {
    return NextResponse.json({ error: 'Missing businessId' }, { status: 400 })
  }
  if (!tier || !(VALID_TIERS as readonly string[]).includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  // ── Update ────────────────────────────────────────────────────────────────
  const svc = createServiceClient()

  // Two separate updates: subscription_tier (typed) + admin_note (untyped, added in migration 027)
  const { error } = await svc
    .from('businesses')
    .update({ subscription_tier: tier as Tier })
    .eq('id', businessId)

  if (!error) {
    // admin_note cast to any because the column is not yet in generated TS types
    await (svc.from('businesses') as any)
      .update({ admin_note: note?.trim() || null })
      .eq('id', businessId)
  }

  if (error) {
    console.error('[admin/set-tier] supabase error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ success: true, tier, note: note?.trim() || null })
}
