'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const DISMISS_KEY = 'pronto_soft_limit_dismiss'
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

const FREE_LIMITS = { clients: 100, bookings: 50, employees: 1 }

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    return Date.now() - parseInt(raw, 10) < DISMISS_DURATION_MS
  } catch {
    return false
  }
}

export function SoftLimitBanner() {
  const [warning, setWarning] = useState<{ label: string; current: number; limit: number } | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isDismissed()) return

    const supabase = createClient()

    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: biz } = await supabase
        .from('businesses')
        .select('id, subscription_tier')
        .eq('owner_id', user.id)
        .maybeSingle()

      if (!biz || (biz.subscription_tier && biz.subscription_tier !== 'free')) return

      const now = new Date()
      const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString()
      const monthEnd   = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString()

      const [{ count: clientCount }, { count: bookingCount }, { count: employeeCount }] = await Promise.all([
        supabase.from('clients').select('id', { count: 'exact', head: true }).eq('business_id', biz.id),
        supabase.from('appointments').select('id', { count: 'exact', head: true })
          .eq('business_id', biz.id).gte('starts_at', monthStart).lt('starts_at', monthEnd),
        supabase.from('employees').select('id', { count: 'exact', head: true })
          .eq('business_id', biz.id).eq('is_active', true),
      ])

      const checks: { label: string; current: number; limit: number }[] = [
        { label: 'bookings this month', current: bookingCount ?? 0, limit: FREE_LIMITS.bookings },
        { label: 'clients',             current: clientCount ?? 0,  limit: FREE_LIMITS.clients },
        { label: 'team members',        current: employeeCount ?? 0, limit: FREE_LIMITS.employees },
      ]

      // Find the one closest to (or past) 80% threshold
      const hit = checks
        .filter((c) => c.current / c.limit >= 0.8)
        .sort((a, b) => b.current / b.limit - a.current / a.limit)[0]

      if (hit) {
        setWarning(hit)
        setVisible(true)
      }
    }

    check()
  }, [])

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())) } catch { /* */ }
    setVisible(false)
  }

  if (!visible || !warning) return null

  return (
    <div className="flex items-center gap-3 bg-yellow-50 border-b border-yellow-200 px-4 py-2.5">
      <TrendingUp className="w-4 h-4 text-yellow-600 shrink-0" />
      <p className="flex-1 text-sm text-yellow-800">
        You&apos;ve used <strong>{warning.current}/{warning.limit}</strong> {warning.label} on the Free plan.{' '}
        <Link href="/pricing" className="font-semibold text-yellow-900 underline hover:no-underline">
          Upgrade before you hit the limit.
        </Link>
      </p>
      <button
        onClick={dismiss}
        className="shrink-0 p-1 rounded hover:bg-yellow-100 text-yellow-600"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
