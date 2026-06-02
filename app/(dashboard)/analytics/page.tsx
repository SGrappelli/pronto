import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BarChart2 } from 'lucide-react'
import { AnalyticsClient } from './AnalyticsClient'

export default async function AnalyticsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: business } = await supabase
    .from('businesses')
    .select('subscription_tier')
    .eq('owner_id', user!.id)
    .maybeSingle()

  const tier = business?.subscription_tier ?? 'free'
  const isProPlus = tier === 'pro' || tier === 'agency'

  if (!isProPlus) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">
              <BarChart2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Analytics — Pro feature</h1>
          <p className="text-gray-500 text-sm mb-6">
            Track revenue, top services, and client growth.
            Available on Pro and Agency plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/settings?tab=billing"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              Upgrade to Pro →
            </Link>
            <Link
              href="https://trypronto.app/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              See all plan features →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <AnalyticsClient />
}
