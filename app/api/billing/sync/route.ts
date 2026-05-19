import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { tierFromPlanName } from '@/lib/whop'

async function whopFetch(url: string, apiKey: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
  })
  const text = await res.text()
  console.log('[billing/sync] GET', url, '→', res.status, text.slice(0, 400))
  return { status: res.status, ok: res.ok, body: text }
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

  // Try multiple Whop API URL patterns — logs will show which one works
  const candidates = [
    'https://api.whop.com/api/v2/memberships?valid=true&per_page=10',
    'https://api.whop.com/v2/memberships?valid=true&per_page=10',
    'https://api.whop.com/api/v5/memberships?valid=true&per_page=10',
    'https://api.whop.com/v5/memberships?valid=true&per_page=10',
  ]

  let memberships: Record<string, unknown>[] = []
  let foundUrl = ''

  for (const url of candidates) {
    const { ok, body } = await whopFetch(url, apiKey)
    if (ok) {
      try {
        const json = JSON.parse(body)
        memberships = json.data ?? json.memberships ?? []
        foundUrl = url
        console.log('[billing/sync] working URL:', url, 'memberships:', memberships.length)
      } catch { /* ignore parse errors */ }
      break
    }
  }

  if (!foundUrl) {
    return NextResponse.json(
      { error: 'Whop API unreachable — check server logs for details' },
      { status: 502 }
    )
  }

  try {
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

    // 3. Only one membership — take it
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

      console.log('[billing/sync] updated to', tier)
      return NextResponse.json({ tier, membershipId })
    }

    return NextResponse.json({ tier: biz.subscription_tier ?? 'free', notFound: true })
  } catch (err) {
    console.error('[billing/sync] error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
