'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, TrendingUp } from 'lucide-react'

const DISMISS_KEY = 'pronto_soft_limit_dismiss'
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

const FREE_LIMITS = { clients: 100, bookings: 50 }

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    return Date.now() - parseInt(raw, 10) < DISMISS_DURATION_MS
  } catch {
    return false
  }
}

interface SoftLimitBannerProps {
  /** subscription_tier from businesses table ('free' | 'starter' | 'pro' | 'agency') */
  plan: string
  /** current total client count for this business */
  clientCount: number
  /** current month appointment count for this business */
  bookingCount: number
}

// All data is passed from the server-side layout — no Supabase calls here.
// This eliminates 3 client-side queries (getUser + businesses + 2 counts)
// that previously ran on every dashboard page load.
export function SoftLimitBanner({ plan, clientCount, bookingCount }: SoftLimitBannerProps) {
  const [warning, setWarning] = useState<{ label: string; current: number; limit: number } | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Paid plans never hit free limits
    if (plan !== 'free') return
    // Respect 7-day dismiss (stored in localStorage — client-only check)
    if (isDismissed()) return

    // Priority: bookings first, then clients
    const hit =
      bookingCount / FREE_LIMITS.bookings >= 0.8
        ? { label: 'bookings this month', current: bookingCount, limit: FREE_LIMITS.bookings }
        : clientCount / FREE_LIMITS.clients >= 0.8
          ? { label: 'clients', current: clientCount, limit: FREE_LIMITS.clients }
          : null

    if (hit) {
      setWarning(hit)
      setVisible(true)
    }
  }, [plan, clientCount, bookingCount])

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
