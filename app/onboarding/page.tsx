import { redirect } from 'next/navigation'
import { OnboardingWizard } from './OnboardingWizard'
import { getBusinessDb } from '@/lib/auth-user'

export default async function OnboardingPage() {
  const ctx = await getBusinessDb()
  if (!ctx) redirect('/login')
  const { business } = ctx

  // Guard: already onboarded → go straight to dashboard
  if (business.onboarding_completed) {
    const isSaas = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas'
    if (isSaas && business.slug) {
      const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'trypronto.app'
      redirect(`https://${business.slug}.${rootDomain}/dashboard`)
    }
    redirect('/dashboard')
  }

  const isSaas = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas'

  return (
    <OnboardingWizard
      initialSlug={business.slug ?? ''}
      initialName={business.name ?? ''}
      isSaas={isSaas}
      rootDomain={process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'trypronto.app'}
    />
  )
}
