import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { tierFromPlanName } from '@/lib/whop'

const WHOP_API = 'https://api.whop.com/api/v2'

async function whopGet(path: string, apiKey: string) {
  const res = await fetch(`${WHOP_API}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  const text = await res.text()
  console.log('[billing/sync] GET', path, '→', res.status)
  if (!res.ok) return null
  try { return JSON.parse(text) } catch { return null }
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { data: biz } = await supabaseAdmin
    .from('businesses')
    .select('id, subscription_tier, whop_membership_id')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!biz) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

  const apiKey = process.env.WHOP_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Sync unavailable — WHOP_API_KEY not configured' }, { status: 503 })
  }

  try {
    const json = await whopGet('/memberships?valid=true&per_page=50', apiKey)
    if (!json) {
      return NextResponse.json({ error: 'Whop API error — check server logs' }, { status: 502 })
    }

    const memberships: Record<string, unknown>[] = json.data ?? []
    console.log('[billing/sync] memberships found:', memberships.length)

    // Match by metadata.business_id → email only
    // Never use "only one membership" fallback — that can assign another user's subscription
    let match = memberships.find((m) => {
      const meta = (m.metadata ?? {}) as Record<string, unknown>
      return meta.business_id === biz.id
    })
    if (!match) {
      match = memberships.find((m) => m.email === user.email)
    }

    if (!match) {
      // No active subscription — reset tier to free in DB
      await supabaseAdmin
        .from('businesses')
        .update({ subscription_tier: 'free', whop_membership_id: null })
        .eq('id', biz.id)
      console.log('[billing/sync] no match — reset to free for business:', biz.id)
      return NextResponse.json({ tier: 'free', notFound: true })
    }

    const membershipId = match.id as string

    // In Whop API v2, `plan` is a string ID — fetch plan details to get the name
    const planId = typeof match.plan === 'string' ? match.plan : null
    let planName = ''

    if (planId) {
      const planData = await whopGet(`/plans/${planId}`, apiKey)
      planName = planData?.name ?? planData?.internal_name ?? ''
      console.log('[billing/sync] plan:', planId, '→', planName)
    }

    // Fallback: try product field
    if (!planName) {
      const productId = typeof match.product === 'string' ? match.product : null
      if (productId) {
        const productData = await whopGet(`/products/${productId}`, apiKey)
        planName = productData?.name ?? ''
        console.log('[billing/sync] product:', productId, '→', planName)
      }
    }

    const tier = tierFromPlanName(planName)
    console.log('[billing/sync] planName:', planName, '→ tier:', tier)

    await supabaseAdmin
      .from('businesses')
      .update({ subscription_tier: tier, whop_membership_id: membershipId })
      .eq('id', biz.id)

    return NextResponse.json({ tier, membershipId })
  } catch (err) {
    console.error('[billing/sync] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
