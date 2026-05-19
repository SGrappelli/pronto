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
  console.log('[billing/sync] Whop', path, res.status, text.slice(0, 300))
  if (!res.ok) return { ok: false, status: res.status, data: null }
  return { ok: true, status: res.status, data: JSON.parse(text) }
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
    // Fetch all valid memberships for this API key and match by business_id or email
    const result = await whopGet('/memberships?valid=true&per_page=50', apiKey)

    if (!result.ok) {
      return NextResponse.json(
        { error: `Whop API error ${result.status} — check server logs` },
        { status: 502 }
      )
    }

    const memberships: Record<string, unknown>[] = result.data?.data ?? []
    console.log('[billing/sync] total memberships:', memberships.length)

    // 1. Match by metadata.business_id
    let match = memberships.find((m) => {
      const meta = (m.metadata ?? {}) as Record<string, unknown>
      return meta.business_id === biz.id
    })

    // 2. Match by user email
    if (!match) {
      match = memberships.find((m) => {
        const u = (m.user ?? {}) as Record<string, unknown>
        return u.email === user.email
      })
    }

    // 3. If only one membership exists — take it
    if (!match && memberships.length === 1) {
      match = memberships[0]
    }

    if (match) {
      const product = (match.product ?? match.plan ?? {}) as Record<string, unknown>
      const planName = (product.name as string) ?? ''
      const tier = tierFromPlanName(planName)
      const membershipId = match.id as string

      await supabaseAdmin
        .from('businesses')
        .update({ subscription_tier: tier, whop_membership_id: membershipId })
        .eq('id', biz.id)

      console.log('[billing/sync] updated to', tier, membershipId)
      return NextResponse.json({ tier, membershipId })
    }

    return NextResponse.json({ tier: biz.subscription_tier ?? 'free', notFound: true })
  } catch (err) {
    console.error('[billing/sync] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
