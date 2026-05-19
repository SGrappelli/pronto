import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { tierFromPlanName } from '@/app/api/webhooks/whop/route'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(req: NextRequest) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
    // Search by metadata.business_id (set in checkout URL)
    const res = await fetch(
      `https://api.whop.com/api/v5/memberships?metadata[business_id]=${biz.id}&valid=true`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    )

    if (!res.ok) {
      console.error('[billing/sync] Whop API error:', res.status, await res.text())
      return NextResponse.json({ error: 'Whop API error' }, { status: 502 })
    }

    const json = await res.json()
    const memberships: Record<string, unknown>[] = json.data ?? []

    if (memberships.length > 0) {
      const mem = memberships[0]
      const product = (mem.product ?? mem.plan ?? {}) as Record<string, unknown>
      const planName = (product.name as string) ?? ''
      const tier = tierFromPlanName(planName)
      const membershipId = mem.id as string

      await supabaseAdmin
        .from('businesses')
        .update({ subscription_tier: tier, whop_membership_id: membershipId })
        .eq('id', biz.id)

      return NextResponse.json({ tier, membershipId })
    }

    // Fallback: search by user email
    const emailRes = await fetch(
      `https://api.whop.com/api/v5/memberships?user_email=${encodeURIComponent(user.email ?? '')}&valid=true`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    )

    if (emailRes.ok) {
      const emailJson = await emailRes.json()
      const emailMemberships: Record<string, unknown>[] = emailJson.data ?? []

      if (emailMemberships.length > 0) {
        const mem = emailMemberships[0]
        const product = (mem.product ?? mem.plan ?? {}) as Record<string, unknown>
        const planName = (product.name as string) ?? ''
        const tier = tierFromPlanName(planName)
        const membershipId = mem.id as string

        await supabaseAdmin
          .from('businesses')
          .update({ subscription_tier: tier, whop_membership_id: membershipId })
          .eq('id', biz.id)

        return NextResponse.json({ tier, membershipId })
      }
    }

    return NextResponse.json({ tier: biz.subscription_tier ?? 'free', notFound: true })
  } catch (err) {
    console.error('[billing/sync] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
