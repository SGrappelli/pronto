'use client'

import { useState, useEffect, useRef } from 'react'
import { completeOnboarding } from './actions'
import { CheckCircle2, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

type Tab = 0 | 1 | 2
type SlugStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid'

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-/, '')
}

interface Props {
  initialSlug: string
  isSaas: boolean
  rootDomain: string
}

export function OnboardingWizard({ initialSlug, isSaas, rootDomain }: Props) {
  const t = useTranslations('onboarding')
  const [step, setStep] = useState<Tab>(0)
  const [bizType, setBizType] = useState('')
  const [service, setService] = useState({ name: '', price: '', duration_min: '60' })
  const [slug, setSlug] = useState(initialSlug)
  const [slugStatus, setSlugStatus] = useState<SlugStatus>(
    isSaas ? (SLUG_RE.test(initialSlug) ? 'checking' : 'idle') : 'idle'
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Business types where duration doesn't apply (retail/product-based)
  const noDuration = ['cafe']
  const showDuration = !noDuration.includes(bizType)

  const businessTypes = [
    { value: 'salon', label: t('businessTypes.salon') },
    { value: 'barbershop', label: t('businessTypes.barbershop') },
    { value: 'auto_repair', label: t('businessTypes.auto_repair') },
    { value: 'cafe', label: t('businessTypes.cafe') },
    { value: 'dental', label: t('businessTypes.dental') },
    { value: 'fitness', label: t('businessTypes.fitness') },
    { value: 'massage', label: t('businessTypes.massage') },
    { value: 'other', label: t('businessTypes.other') },
  ]

  const steps = [
    t('steps.businessType'),
    t('steps.firstService'),
    t('steps.notifications'),
  ]

  // Debounced slug availability check
  useEffect(() => {
    if (!isSaas) return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!slug) {
      setSlugStatus('idle')
      return
    }

    if (!SLUG_RE.test(slug)) {
      setSlugStatus('invalid')
      return
    }

    setSlugStatus('checking')
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-slug?slug=${encodeURIComponent(slug)}`)
        const data = await res.json()
        setSlugStatus(data.available ? 'available' : 'taken')
      } catch {
        setSlugStatus('idle')
      }
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [slug, isSaas])

  // Run initial check on mount for the pre-filled slug
  useEffect(() => {
    if (!isSaas || !initialSlug) return
    // Trigger the effect above by keeping slug === initialSlug (already set)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const canContinueStep0 =
    !!bizType && (!isSaas || slugStatus === 'available')

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(normalizeSlug(e.target.value))
  }

  async function finish() {
    setSaving(true)
    setError('')
    try {
      await completeOnboarding({
        bizType,
        serviceName: service.name,
        servicePrice: Number(service.price),
        serviceDuration: showDuration ? (Number(service.duration_min) || 60) : 0,
        ...(isSaas ? { slug } : {}),
      })
    } catch {
      setError(t('step2.error'))
      setSaving(false)
    }
  }

  function slugStatusText() {
    switch (slugStatus) {
      case 'checking': return t('step0.slugChecking')
      case 'available': return t('step0.slugAvailable')
      case 'taken': return t('step0.slugTaken')
      case 'invalid': return t('step0.slugInvalid')
      default: return ''
    }
  }

  function slugStatusColor() {
    switch (slugStatus) {
      case 'available': return 'text-green-600'
      case 'taken':
      case 'invalid': return 'text-red-500'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-blue-600 mb-1">{t('logo')}</div>
          <p className="text-sm text-gray-500">{t('intro')}</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i < step ? 'bg-green-500 text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* ── Step 0: Business type (+ URL in SaaS) ─────────────────────── */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('step0.heading')}</h2>
              <p className="text-sm text-gray-500 mb-6">{t('step0.subheading')}</p>
              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map((bt) => (
                  <button key={bt.value} onClick={() => setBizType(bt.value)}
                    className={`p-4 rounded-xl border text-sm text-left transition-colors ${
                      bizType === bt.value ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                    {bt.label}
                  </button>
                ))}
              </div>

              {/* Slug field — SaaS only */}
              {isSaas && (
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <label className="text-xs font-medium text-gray-500 block mb-1">
                    {t('step0.slugLabel')}
                  </label>
                  <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <span className="px-3 py-2.5 bg-gray-50 text-sm text-gray-400 border-r border-gray-200 select-none whitespace-nowrap">
                      {rootDomain}/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={handleSlugChange}
                      maxLength={30}
                      placeholder="my-business"
                      className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
                    />
                    {slugStatus === 'checking' && (
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin mr-3 flex-shrink-0" />
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <p className={`text-xs ${slugStatusColor()}`}>
                      {slugStatusText() || t('step0.slugHint')}
                    </p>
                  </div>
                  {slug && SLUG_RE.test(slug) && (
                    <p className="mt-2 text-xs text-gray-400">
                      {t('step0.slugPreview')}{' '}
                      <span className="font-medium text-gray-600">
                        {slug}.{rootDomain}
                      </span>
                    </p>
                  )}
                </div>
              )}

              <Button
                className="w-full mt-6"
                onClick={() => setStep(1)}
                disabled={!canContinueStep0}
              >
                {t('step0.continue')}
              </Button>
            </div>
          )}

          {/* ── Step 1: First service ──────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('step1.heading')}</h2>
              <p className="text-sm text-gray-500 mb-6">{t('step1.subheading')}</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('step1.serviceNameLabel')}</label>
                  <input type="text" value={service.name} onChange={(e) => setService((s) => ({ ...s, name: e.target.value }))}
                    placeholder={t('step1.serviceNamePlaceholder')}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className={showDuration ? 'grid grid-cols-2 gap-3' : ''}>
                  <div>
                    <label className="text-xs font-medium text-gray-500">{t('step1.priceLabel')}</label>
                    <input type="number" min={0} value={service.price} onChange={(e) => setService((s) => ({ ...s, price: e.target.value }))}
                      placeholder="0"
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  {showDuration && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t('step1.durationLabel')}</label>
                      <input type="number" min={5} value={service.duration_min} onChange={(e) => setService((s) => ({ ...s, duration_min: e.target.value }))}
                        className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(0)}>{t('step1.back')}</Button>
                <Button variant="ghost" onClick={() => setStep(2)}>{t('step1.skip')}</Button>
                <Button className="flex-1" onClick={() => setStep(2)} disabled={!service.name || !service.price}>{t('step1.continue')}</Button>
              </div>
            </div>
          )}

          {/* ── Step 2: Notifications ──────────────────────────────────────── */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('step2.heading')}</h2>
              <p className="text-sm text-gray-500 mb-6">{t('step2.subheading')}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t('step2.emailChannel')}</div>
                    <div className="text-xs text-gray-500">{t('step2.emailChannelSub')}</div>
                  </div>
                  <span className="ml-auto text-xs text-green-600 font-medium">{t('step2.emailChannelStatus')}</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl">📱</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t('step2.messengerChannel')}</div>
                    <div className="text-xs text-gray-500">{t('step2.messengerChannelSub')}</div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{t('step2.messengerChannelStatus')}</span>
                </div>
              </div>
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
              )}
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} disabled={saving}>{t('step2.back')}</Button>
                <Button className="flex-1" onClick={finish} disabled={saving}>
                  {saving ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />{t('step2.settingUp')}</span> : t('step2.submit')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
