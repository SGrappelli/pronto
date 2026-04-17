'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function completeOnboarding(data: {
  bizType: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  slug?: string
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('id, slug')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!business) redirect('/login')

  // Server-side slug validation (defence against bypassed client checks)
  const finalSlug = data.slug ?? business.slug
  if (data.slug) {
    if (!/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(data.slug)) {
      throw new Error('Invalid slug format')
    }
  }

  const { error: updateError } = await supabase
    .from('businesses')
    .update({
      ...(data.bizType ? { type: data.bizType } : {}),
      ...(data.slug ? { slug: data.slug } : {}),
      onboarding_completed: true,
    })
    .eq('id', business.id)

  if (updateError) {
    // Most likely a unique constraint violation on slug
    throw new Error(updateError.message)
  }

  if (data.serviceName && data.servicePrice) {
    await supabase.from('services').insert({
      business_id: business.id,
      name: data.serviceName,
      price: data.servicePrice,
      duration_min: data.serviceDuration || 60,
    })
  }

  const isSaas = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas'
  if (isSaas && finalSlug) {
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'trypronto.app'
    redirect(`https://${finalSlug}.${rootDomain}/dashboard`)
  }

  redirect('/dashboard')
}
