'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DOMPurify from 'isomorphic-dompurify'
import { db, forBusiness } from '@/lib/db'

function sanitize(s: string): string {
  return DOMPurify.sanitize(s, { ALLOWED_TAGS: [] }).trim()
}

export async function completeOnboarding(data: {
  bizType: string
  bizName?: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  slug?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const business = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true, slug: true },
  })

  if (!business) redirect('/login')

  // Sanitize and validate text fields
  const bizName = data.bizName ? sanitize(data.bizName).slice(0, 100) : undefined
  // serviceName can be empty — the user may have clicked "Skip" on the
  // first-service step. See the `if (serviceName && data.servicePrice)`
  // guard below: an empty name (or a name without a price) simply means
  // no service gets created, which is the intended Skip behaviour.
  const serviceName = sanitize(data.serviceName).slice(0, 100)

  // Server-side slug validation (defence against bypassed client checks)
  const finalSlug = data.slug ?? business.slug
  if (data.slug) {
    if (!/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(data.slug)) {
      throw new Error('Invalid slug format')
    }
  }

  try {
    await db.businesses.update({
      where: { id: business.id },
      data: {
        ...(data.bizType ? { type: data.bizType } : {}),
        ...(bizName ? { name: bizName } : {}),
        ...(data.slug ? { slug: data.slug } : {}),
        onboarding_completed: true,
      },
    })
  } catch (err) {
    // P2002 is Prisma's unique-violation code — most likely the slug.
    if ((err as { code?: string }).code === 'P2002') {
      throw new Error('That slug is already taken.')
    }
    throw err
  }

  if (serviceName && data.servicePrice) {
    await forBusiness(business.id).services.create({
      data: {
        business_id: business.id,
        name: serviceName,
        price: data.servicePrice,
        duration_min: data.serviceDuration || 60,
      },
    })
  }

  // If NEXT_PUBLIC_ROOT_DOMAIN is set we're running in SaaS mode → go to subdomain
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN
  if (rootDomain && finalSlug) {
    redirect(`https://${finalSlug}.${rootDomain}/dashboard`)
  }

  redirect('/dashboard')
}
