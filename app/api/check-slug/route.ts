import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { NextResponse } from 'next/server'

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = (searchParams.get('slug') ?? '').toLowerCase().trim()

  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ available: false })
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ available: false })

  const admin = createServiceClient()

  // Find the current user's business so we exclude it from the "taken" check
  // (the user's own current slug should not block them from keeping it)
  const { data: ownBusiness } = await admin
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle()

  let query = admin
    .from('businesses')
    .select('id', { count: 'exact', head: true })
    .eq('slug', slug)

  if (ownBusiness) {
    query = query.neq('id', ownBusiness.id)
  }

  const { count } = await query

  return NextResponse.json({ available: count === 0 })
}
