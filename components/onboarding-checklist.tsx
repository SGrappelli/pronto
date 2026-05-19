'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const DISMISSED_KEY = 'pronto_onboarding_dismissed'
const COMPLETE_KEY = 'pronto_onboarding_complete'

interface Props {
  businessId: string
}

interface Steps {
  profileCreated: boolean
  hasService: boolean
  hasClient: boolean
  hasBooking: boolean
  hasNotification: boolean
}

export function OnboardingChecklist({ businessId }: Props) {
  const [visible, setVisible] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const [steps, setSteps] = useState<Steps>({
    profileCreated: true,
    hasService: false,
    hasClient: false,
    hasBooking: false,
    hasNotification: false,
  })

  useEffect(() => {
    if (
      localStorage.getItem(DISMISSED_KEY) === 'true' ||
      localStorage.getItem(COMPLETE_KEY) === 'true'
    ) {
      return
    }

    const supabase = createClient()

    Promise.all([
      supabase.from('services').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
      supabase.from('clients').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
      supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
      supabase
        .from('businesses')
        .select('telegram_bot_token, viber_bot_token, owner_whatsapp, smtp_host')
        .eq('id', businessId)
        .maybeSingle(),
    ]).then(([svc, cli, appt, bizResult]) => {
      const b = bizResult.data
      const newSteps: Steps = {
        profileCreated: true,
        hasService: (svc.count ?? 0) > 0,
        hasClient: (cli.count ?? 0) > 0,
        hasBooking: (appt.count ?? 0) > 0,
        hasNotification: !!(
          b?.telegram_bot_token ||
          b?.owner_whatsapp ||
          b?.viber_bot_token ||
          (b?.smtp_host && b.smtp_host.trim() !== '')
        ),
      }
      setSteps(newSteps)

      const count = Object.values(newSteps).filter(Boolean).length
      if (count === 5) {
        setAllDone(true)
        setVisible(true)
        setTimeout(() => {
          localStorage.setItem(COMPLETE_KEY, 'true')
          setVisible(false)
        }, 2000)
      } else {
        setVisible(true)
      }
    })
  }, [businessId])

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  const completeCount = Object.values(steps).filter(Boolean).length

  const items: Array<{
    key: string
    label: string
    done: boolean
    description: string | null
    action: { label: string; href: string } | null
  }> = [
    {
      key: 'profile',
      label: 'Business profile created',
      done: steps.profileCreated,
      description: null,
      action: null,
    },
    {
      key: 'service',
      label: 'Add your first service',
      done: steps.hasService,
      description: null,
      action: { label: 'Add service', href: '/settings?tab=services' },
    },
    {
      key: 'client',
      label: 'Add your first client',
      done: steps.hasClient,
      description: null,
      action: { label: 'Add client', href: '/crm/new' },
    },
    {
      key: 'booking',
      label: 'Create your first booking',
      done: steps.hasBooking,
      description: null,
      action: { label: 'Open calendar', href: '/booking' },
    },
    {
      key: 'notifications',
      label: 'Connect notifications',
      done: steps.hasNotification,
      description: 'Send automatic reminders to clients',
      action: { label: 'Connect', href: '/settings?tab=notifications' },
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
      <button
        onClick={dismiss}
        className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        aria-label="Dismiss checklist"
      >
        ×
      </button>

      {allDone ? (
        <div className="py-2 text-center">
          <p className="text-lg font-semibold text-gray-900">{"You're all set! 🎉"}</p>
        </div>
      ) : (
        <>
          <h3 className="font-semibold text-gray-900 text-base pr-8">Get started with Pronto</h3>
          <p className="text-sm text-gray-500 mt-0.5">{completeCount} of 5 complete</p>

          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(completeCount / 5) * 100}%`, background: '#16a34a' }}
            />
          </div>

          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.key} className="flex items-start gap-3">
                {item.done ? (
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-sm text-gray-900 ${item.done ? 'opacity-50' : 'font-semibold'}`}>
                      {item.label}
                    </span>
                    {!item.done && item.action && (
                      <Link
                        href={item.action.href}
                        className="shrink-0 text-xs px-2.5 py-1 rounded-md border border-green-600 text-green-700 font-medium hover:bg-green-50 transition-colors"
                      >
                        {item.action.label}
                      </Link>
                    )}
                  </div>
                  {!item.done && item.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
