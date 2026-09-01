import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = (searchParams.get('slug') ?? '').toLowerCase().trim()

  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ available: false })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ available: false })

  // Slug uniqueness is global across every business, so this deliberately uses
  // the unscoped client — forBusiness() would hide the collisions we're looking
  // for. Same reason the Supabase version used the service-role client.
  const ownBusiness = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true },
  })

  // The user's own current slug must not block them from keeping it.
  const count = await db.businesses.count({
    where: { slug, ...(ownBusiness ? { id: { not: ownBusiness.id } } : {}) },
  })

  return NextResponse.json({ available: count === 0 })
}
