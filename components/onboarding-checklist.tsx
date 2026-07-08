'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const DISMISSED_KEY = 'pronto_onboarding_dismissed'
const COMPLETE_KEY = 'pronto_onboarding_complete'

interface Props {
  businessId: string
  enabledModules: string[]
}

interface Steps {
  profileCreated: boolean
  modulesConfigured: boolean
  hasService: boolean
  hasClient: boolean
  hasBooking: boolean
  hasNotification: boolean
}

interface RetailSteps {
  profileCreated: boolean
  hasProduct: boolean
}

export function OnboardingChecklist({ businessId, enabledModules }: Props) {
  const t = useTranslations('onboarding.checklist')
  const isRetail = !enabledModules.includes('bookings')
  const [visible, setVisible] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const [steps, setSteps] = useState<Steps>({
    profileCreated: true,
    modulesConfigured: true,
    hasService: false,
    hasClient: false,
    hasBooking: false,
    hasNotification: false,
  })
  const [retailSteps, setRetailSteps] = useState<RetailSteps>({
    profileCreated: true,
    hasProduct: false,
  })

  useEffect(() => {
    if (
      localStorage.getItem(DISMISSED_KEY) === 'true' ||
      localStorage.getItem(COMPLETE_KEY) === 'true'
    ) {
      return
    }

    const supabase = createClient()

    if (isRetail) {
      supabase
        .from('inventory_items')
        .select('id', { count: 'exact', head: true })
        .eq('business_id', businessId)
        .then(({ count }) => {
          const newSteps: RetailSteps = {
            profileCreated: true,
            hasProduct: (count ?? 0) > 0,
          }
          setRetailSteps(newSteps)

          const done = Object.values(newSteps).filter(Boolean).length
          if (done === 2) {
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
      return
    }

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
        modulesConfigured: true,
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
      if (count === 6) {
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
  }, [businessId, isRetail])

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  type ChecklistItem = {
    key: string
    label: string
    done: boolean
    description: string | null
    action: { label: string; href: string } | null
  }

  const items: ChecklistItem[] = isRetail
    ? [
        {
          key: 'profile',
          label: t('step1'),
          done: retailSteps.profileCreated,
          description: null,
          action: null,
        },
        {
          key: 'product',
          label: t('stepProduct'),
          done: retailSteps.hasProduct,
          description: null,
          action: { label: t('addProduct'), href: '/inventory/new' },
        },
      ]
    : [
        {
          key: 'profile',
          label: t('step1'),
          done: steps.profileCreated,
          description: null,
          action: null,
        },
        {
          key: 'modules',
          label: t('stepModules'),
          done: steps.modulesConfigured,
          description: null,
          action: { label: t('configure'), href: '/settings?tab=modules' },
        },
        {
          key: 'service',
          label: t('step2'),
          done: steps.hasService,
          description: null,
          action: { label: t('addService'), href: '/settings?tab=services' },
        },
        {
          key: 'client',
          label: t('step3'),
          done: steps.hasClient,
          description: null,
          action: { label: t('addClient'), href: '/crm/new' },
        },
        {
          key: 'booking',
          label: t('step4'),
          done: steps.hasBooking,
          description: null,
          action: { label: t('openCalendar'), href: '/booking' },
        },
        {
          key: 'notifications',
          label: t('step5'),
          done: steps.hasNotification,
          description: t('step5sub'),
          action: { label: t('connect'), href: '/settings?tab=notifications' },
        },
      ]

  const completeCount = items.filter((i) => i.done).length
  const totalCount = items.length

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
          <p className="text-lg font-semibold text-gray-900">{t('allDone')}</p>
        </div>
      ) : (
        <>
          <h3 className="font-semibold text-gray-900 text-base pr-8">{t('title')}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{t('progress', { done: completeCount, total: totalCount })}</p>

          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(completeCount / totalCount) * 100}%`, background: '#16a34a' }}
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
