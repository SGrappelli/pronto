'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Check, Loader2, CheckCircle2, AlertCircle, Zap, Building2, Users, Eye, EyeOff, X, RefreshCw } from 'lucide-react'
import { UpgradeBanner } from '@/components/ui/upgrade-banner'
import { useTranslations } from 'next-intl'
import { getWhopCheckoutUrl } from '@/lib/whop'
import { sanitizeName, sanitizeText, sanitizeShort } from '@/lib/sanitize'

interface Business {
  id: string; name: string; slug: string; type: string | null; phone: string | null
  email: string | null; address: string | null; timezone: string; currency: string; plan: string
  plan_expires_at: string | null
  telegram_bot_token: string | null; viber_bot_token: string | null
  owner_whatsapp: string | null
  ls_customer_id: string | null
  subscription_tier: string | null
  whop_membership_id: string | null
  email_provider: string | null
  smtp_host: string | null; smtp_port: number | null; smtp_user: string | null
  smtp_pass: string | null; smtp_from: string | null
  resend_api_key: string | null
  meta_whatsapp_phone_number_id: string | null
  meta_whatsapp_access_token: string | null
}
interface Service { id: string; name: string; description: string | null; price: number; duration_min: number; category: string | null; is_active: boolean; capacity: number }
interface Employee { id: string; name: string; role: string; email: string | null; phone: string | null; is_active: boolean }
interface DayHours { day_of_week: number; is_open: boolean; open_time: string; close_time: string }

// Default schedule: Mon–Fri open 09:00–19:00, Sat–Sun closed
const DEFAULT_HOURS: DayHours[] = [0, 1, 2, 3, 4, 5, 6].map((dow) => ({
  day_of_week: dow,
  is_open: dow >= 1 && dow <= 5,
  open_time: '09:00',
  close_time: '19:00',
}))

// 30-min time options for the selects: 00:00, 00:30, 01:00 … 23:30
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})

interface Props { business: Business & { telegram_chat_id?: string | null; viber_chat_id?: string | null }; services: Service[]; employees: Employee[]; workingHours: DayHours[]; userEmail: string }
type Tab = 'general' | 'services' | 'employees' | 'notifications' | 'billing' | 'account'

export function SettingsTabs({ business: initial, services: initServices, employees: initEmployees, workingHours: initHours, userEmail }: Props) {
  const supabase = createClient()
  const router = useRouter()
  const t = useTranslations('settings')
  const searchParams = useSearchParams()
  const initialTab = (['general', 'services', 'employees', 'notifications', 'billing'].includes(searchParams.get('tab') ?? '')
    ? searchParams.get('tab')
    : 'general') as Tab
  const [tab, setTab] = useState<Tab>(initialTab)
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [webhookMsg, setWebhookMsg] = useState('')
  const [viberWebhookStatus, setViberWebhookStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [viberWebhookMsg, setViberWebhookMsg] = useState('')
  const [waStatus, setWaStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [waMsg, setWaMsg] = useState('')
  const [biz, setBiz] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slugError, setSlugError] = useState('')
  const [services, setServices] = useState(initServices)
  const [svcForm, setSvcForm] = useState<Partial<Service>>({})
  const [confirmDeleteSvcId, setConfirmDeleteSvcId] = useState<string | null>(null)
  const [confirmDeleteEmpId, setConfirmDeleteEmpId] = useState<string | null>(null)
  const [editingSvc, setEditingSvc] = useState<string | null>(null)
  const [employees, setEmployees] = useState(initEmployees)
  const [empForm, setEmpForm] = useState<Partial<Employee>>({})
  const [editingEmp, setEditingEmp] = useState<string | null>(null)
  const [empLimitBanner, setEmpLimitBanner] = useState(false)

  const EMPLOYEE_LIMITS: Record<string, number> = { free: 1, starter: 3, pro: 15, agency: Infinity }
  const empLimit = EMPLOYEE_LIMITS[biz.subscription_tier ?? 'free'] ?? 1

  // Working hours state — merge DB rows with defaults (in case some days are missing)
  const [hours, setHours] = useState<DayHours[]>(() => {
    return DEFAULT_HOURS.map((def) => {
      const fromDb = initHours.find((h) => h.day_of_week === def.day_of_week)
      return fromDb ?? def
    })
  })
  const [savingHours, setSavingHours] = useState(false)
  const [origin, setOrigin] = useState('')
  useEffect(() => { setOrigin(window.location.origin) }, [])

  const bookingUrl = useMemo(() => {
    if (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas') {
      const baseDomain = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://trypronto.app')
        .replace(/^https?:\/\//, '').replace(/\/$/, '')
      return `https://${biz.slug}.${baseDomain}/book`
    }
    return `${origin}/book/${biz.slug}`
  }, [biz.slug, origin])

  const [savedHours, setSavedHours] = useState(false)

  async function saveWorkingHours() {
    setSavingHours(true)
    const rows = hours.map((h) => ({
      business_id: biz.id,
      day_of_week: h.day_of_week,
      is_open: h.is_open,
      open_time: h.open_time,
      close_time: h.close_time,
    }))
    await supabase.from('business_hours').upsert(rows, { onConflict: 'business_id,day_of_week' })
    setSavingHours(false)
    setSavedHours(true)
    setTimeout(() => setSavedHours(false), 2000)
  }

  function updateDay(dow: number, patch: Partial<DayHours>) {
    setHours((prev) => prev.map((h) => h.day_of_week === dow ? { ...h, ...patch } : h))
  }

  // Account / password change state
  const [pwForm, setPwForm] = useState({ newPassword: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [pwStatus, setPwStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [pwMsg, setPwMsg] = useState('')

  async function changePassword() {
    if (pwForm.newPassword.length < 8) { setPwStatus('error'); setPwMsg('Password must be at least 8 characters'); return }
    if (pwForm.newPassword !== pwForm.confirm) { setPwStatus('error'); setPwMsg('Passwords do not match'); return }
    setPwStatus('loading'); setPwMsg('')
    const { error } = await supabase.auth.updateUser({ password: pwForm.newPassword })
    if (error) { setPwStatus('error'); setPwMsg(error.message) }
    else { setPwStatus('ok'); setPwMsg('Password updated successfully'); setPwForm({ newPassword: '', confirm: '' }) }
  }

  // Account / email change state
  const [newEmail, setNewEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [emailMsg, setEmailMsg] = useState('')

  async function changeEmail() {
    if (!newEmail.includes('@')) { setEmailStatus('error'); setEmailMsg('Enter a valid email address'); return }
    setEmailStatus('loading'); setEmailMsg('')
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) { setEmailStatus('error'); setEmailMsg(error.message) }
    else {
      setEmailStatus('ok')
      setEmailMsg(`Confirmation sent to ${newEmail}. Click the link in the email to complete the change.`)
      setNewEmail('')
    }
  }

  async function saveBusiness() {
    if (slugError) return
    setSaving(true)
    const cleanSlug = biz.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || initial.slug
    const bizName = sanitizeName(biz.name || '')
    const bizAddress = biz.address ? sanitizeShort(biz.address, 200) || null : null
    setBiz((b) => ({ ...b, slug: cleanSlug }))
    await supabase.from('businesses').update({
      name: bizName, slug: cleanSlug, type: biz.type, phone: biz.phone, email: biz.email, address: bizAddress,
      timezone: biz.timezone, currency: biz.currency,
      telegram_bot_token: biz.telegram_bot_token, viber_bot_token: biz.viber_bot_token,
      owner_whatsapp: biz.owner_whatsapp,
      email_provider: biz.email_provider,
      smtp_host: biz.smtp_host, smtp_port: biz.smtp_port, smtp_user: biz.smtp_user,
      smtp_pass: biz.smtp_pass, smtp_from: biz.smtp_from,
      resend_api_key: biz.resend_api_key,
      meta_whatsapp_phone_number_id: biz.meta_whatsapp_phone_number_id,
      meta_whatsapp_access_token: biz.meta_whatsapp_access_token,
    }).eq('id', biz.id)
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  async function saveService() {
    if (!svcForm.name || svcForm.price == null) return
    const svcName = sanitizeName(svcForm.name)
    if (!svcName) return
    const svcDescription = svcForm.description ? sanitizeText(svcForm.description) || null : null
    const svcCategory = svcForm.category ? sanitizeShort(svcForm.category) || null : null
    const sanitizedForm = { ...svcForm, name: svcName, description: svcDescription, category: svcCategory }
    if (editingSvc) {
      await supabase.from('services').update(sanitizedForm).eq('id', editingSvc)
      setServices((prev) => prev.map((s) => s.id === editingSvc ? { ...s, ...sanitizedForm } as Service : s))
    } else {
      const { data } = await supabase.from('services').insert({
        business_id: biz.id, name: svcName, description: svcDescription,
        price: svcForm.price!, duration_min: svcForm.duration_min ?? 60, category: svcCategory,
        capacity: svcForm.capacity ?? 1,
      }).select().single()
      if (data) setServices((prev) => [...prev, data as Service])
    }
    setSvcForm({}); setEditingSvc(null)
    router.refresh()
  }

  async function deleteService(id: string) {
    await supabase.from('services').delete().eq('id', id)
    setServices((prev) => prev.filter((s) => s.id !== id))
    setConfirmDeleteSvcId(null)
    router.refresh()
  }

  async function saveEmployee() {
    if (!empForm.name) return
    const empName = sanitizeName(empForm.name)
    if (!empName) return
    const sanitizedEmp = { ...empForm, name: empName }
    if (editingEmp) {
      await supabase.from('employees').update(sanitizedEmp).eq('id', editingEmp)
      setEmployees((prev) => prev.map((e) => e.id === editingEmp ? { ...e, ...sanitizedEmp } as Employee : e))
    } else {
      const activeCount = employees.filter((e) => e.is_active).length
      if (activeCount >= empLimit) {
        setEmpLimitBanner(true)
        return
      }
      const { data } = await supabase.from('employees').insert({
        business_id: biz.id, name: empName, role: empForm.role ?? 'employee',
        email: empForm.email ?? null, phone: empForm.phone ?? null,
      }).select().single()
      if (data) setEmployees((prev) => [...prev, data as Employee])
    }
    setEmpForm({}); setEditingEmp(null)
    setEmpLimitBanner(false)
    router.refresh()
  }

  async function connectWhatsApp() {
    setWaStatus('loading')
    setWaMsg('')
    const { error } = await supabase.from('businesses').update({
      meta_whatsapp_phone_number_id: biz.meta_whatsapp_phone_number_id,
      meta_whatsapp_access_token: biz.meta_whatsapp_access_token,
    }).eq('id', biz.id)
    if (error) {
      setWaStatus('error')
      setWaMsg(error.message)
    } else {
      setWaStatus('ok')
      setWaMsg('WhatsApp credentials saved successfully.')
      router.refresh()
    }
  }

  async function connectViber() {
    setViberWebhookStatus('loading')
    setViberWebhookMsg('')
    await supabase.from('businesses').update({ viber_bot_token: biz.viber_bot_token }).eq('id', biz.id)
    const res = await fetch('/api/viber/set-webhook', { method: 'POST' })
    const json = await res.json()
    if (json.ok) {
      setViberWebhookStatus('ok')
      setViberWebhookMsg(`Connected! Bot: ${json.botName}. Now open your Viber bot and start a conversation.`)
    } else {
      setViberWebhookStatus('error')
      setViberWebhookMsg(json.error ?? 'Unknown error')
    }
  }

  async function connectTelegram() {
    setWebhookStatus('loading')
    setWebhookMsg('')
    // Сначала сохраняем токен
    await supabase.from('businesses').update({ telegram_bot_token: biz.telegram_bot_token }).eq('id', biz.id)
    // Регистрируем вебхук
    const res = await fetch('/api/telegram/set-webhook', { method: 'POST' })
    const json = await res.json()
    if (json.ok) {
      setWebhookStatus('ok')
      setWebhookMsg(`Connected! Bot: @${json.botUsername}. Now open your bot in Telegram and send /start.`)
    } else {
      setWebhookStatus('error')
      setWebhookMsg(json.error ?? 'Unknown error')
    }
  }

  async function deleteEmployee(id: string) {
    await supabase.from('employees').delete().eq('id', id)
    setEmployees((prev) => prev.filter((e) => e.id !== id))
    setConfirmDeleteEmpId(null)
    router.refresh()
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'general', label: t('tabs.general') },
    { key: 'services', label: t('tabs.services') },
    { key: 'employees', label: t('tabs.employees') },
    { key: 'notifications', label: t('tabs.notifications') },
    { key: 'billing', label: t('tabs.billing') },
    { key: 'account', label: t('tabs.account') },
  ]

  const generalFields: { key: keyof Business; label: string; type: string }[] = [
    { key: 'name', label: t('general.fields.name'), type: 'text' },
    { key: 'phone', label: t('general.fields.phone'), type: 'tel' },
    { key: 'email', label: t('general.fields.email'), type: 'email' },
    { key: 'address', label: t('general.fields.address'), type: 'text' },
  ]

  const CURRENCIES: { value: string; label: string }[] = [
    { value: 'USD', label: '🇺🇸 USD — US Dollar' },
    { value: 'EUR', label: '🇪🇺 EUR — Euro' },
    { value: 'GBP', label: '🇬🇧 GBP — British Pound' },
    { value: 'AED', label: '🇦🇪 AED — UAE Dirham' },
    { value: 'SAR', label: '🇸🇦 SAR — Saudi Riyal' },
    { value: 'TRY', label: '🇹🇷 TRY — Turkish Lira' },
    { value: 'UAH', label: '🇺🇦 UAH — Ukrainian Hryvnia' },
    { value: 'RUB', label: '🇷🇺 RUB — Russian Ruble' },
    { value: 'KZT', label: '🇰🇿 KZT — Kazakhstani Tenge' },
    { value: 'GEL', label: '🇬🇪 GEL — Georgian Lari' },
    { value: 'BRL', label: '🇧🇷 BRL — Brazilian Real' },
    { value: 'MXN', label: '🇲🇽 MXN — Mexican Peso' },
    { value: 'INR', label: '🇮🇳 INR — Indian Rupee' },
    { value: 'THB', label: '🇹🇭 THB — Thai Baht' },
    { value: 'JPY', label: '🇯🇵 JPY — Japanese Yen' },
    { value: 'CNY', label: '🇨🇳 CNY — Chinese Yuan' },
    { value: 'PLN', label: '🇵🇱 PLN — Polish Złoty' },
    { value: 'RON', label: '🇷🇴 RON — Romanian Leu' },
    { value: 'ARS', label: '🇦🇷 ARS — Argentine Peso' },
    { value: 'other', label: '✏️ Other (enter manually)' },
  ]

  const isKnownCurrency = CURRENCIES.some((c) => c.value !== 'other' && c.value === biz.currency)
  const currencySelectValue = isKnownCurrency ? biz.currency : (biz.currency ? 'other' : 'USD')

  const TIMEZONES: { value: string; label: string }[] = [
    { value: 'UTC',                    label: '(UTC+0) UTC' },
    { value: 'Europe/London',          label: '(UTC+0) London' },
    { value: 'Europe/Paris',           label: '(UTC+1) Paris' },
    { value: 'Europe/Berlin',          label: '(UTC+1) Berlin' },
    { value: 'Europe/Rome',            label: '(UTC+1) Rome' },
    { value: 'Europe/Madrid',          label: '(UTC+1) Madrid' },
    { value: 'Europe/Amsterdam',       label: '(UTC+1) Amsterdam' },
    { value: 'Europe/Brussels',        label: '(UTC+1) Brussels' },
    { value: 'Europe/Vienna',          label: '(UTC+1) Vienna' },
    { value: 'Europe/Warsaw',          label: '(UTC+1) Warsaw' },
    { value: 'Europe/Prague',          label: '(UTC+1) Prague' },
    { value: 'Europe/Budapest',        label: '(UTC+1) Budapest' },
    { value: 'Europe/Bucharest',       label: '(UTC+2) Bucharest' },
    { value: 'Europe/Sofia',           label: '(UTC+2) Sofia' },
    { value: 'Europe/Athens',          label: '(UTC+2) Athens' },
    { value: 'Europe/Kiev',            label: '(UTC+2) Kyiv' },
    { value: 'Europe/Minsk',           label: '(UTC+3) Minsk' },
    { value: 'Europe/Moscow',          label: '(UTC+3) Moscow' },
    { value: 'Europe/Istanbul',        label: '(UTC+3) Istanbul' },
    { value: 'Asia/Dubai',             label: '(UTC+4) Dubai' },
    { value: 'Asia/Karachi',           label: '(UTC+5) Karachi' },
    { value: 'Asia/Kolkata',           label: '(UTC+5:30) Kolkata' },
    { value: 'Asia/Dhaka',             label: '(UTC+6) Dhaka' },
    { value: 'Asia/Bangkok',           label: '(UTC+7) Bangkok' },
    { value: 'Asia/Singapore',         label: '(UTC+8) Singapore' },
    { value: 'Asia/Shanghai',          label: '(UTC+8) Shanghai' },
    { value: 'Asia/Tokyo',             label: '(UTC+9) Tokyo' },
    { value: 'Asia/Seoul',             label: '(UTC+9) Seoul' },
    { value: 'Australia/Sydney',       label: '(UTC+10) Sydney' },
    { value: 'Australia/Melbourne',    label: '(UTC+10) Melbourne' },
    { value: 'Pacific/Auckland',       label: '(UTC+12) Auckland' },
    { value: 'America/New_York',       label: '(UTC-5) New York' },
    { value: 'America/Toronto',        label: '(UTC-5) Toronto' },
    { value: 'America/Chicago',        label: '(UTC-6) Chicago' },
    { value: 'America/Mexico_City',    label: '(UTC-6) Mexico City' },
    { value: 'America/Denver',         label: '(UTC-7) Denver' },
    { value: 'America/Los_Angeles',    label: '(UTC-8) Los Angeles' },
    { value: 'America/Vancouver',      label: '(UTC-8) Vancouver' },
    { value: 'America/Anchorage',      label: '(UTC-9) Anchorage' },
    { value: 'Pacific/Honolulu',       label: '(UTC-10) Honolulu' },
    { value: 'America/Bogota',         label: '(UTC-5) Bogota' },
    { value: 'America/Lima',           label: '(UTC-5) Lima' },
    { value: 'America/Sao_Paulo',      label: '(UTC-3) São Paulo' },
    { value: 'America/Buenos_Aires',   label: '(UTC-3) Buenos Aires' },
  ]

  const triggers = [
    t('notifications.triggers.confirmation'),
    t('notifications.triggers.reminder24h'),
    t('notifications.triggers.reminder1h'),
    t('notifications.triggers.thankYou'),
    t('notifications.triggers.reactivation'),
    t('notifications.triggers.birthday'),
    t('notifications.triggers.lowStock'),
  ]

  return (
    <div className="p-3 sm:p-6 max-w-3xl">
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
        {tabs.map((tb) => (
          <button key={tb.key} onClick={() => setTab(tb.key)}
            className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === tb.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {tb.label}
          </button>
        ))}
      </div>

      {/* General */}
      {tab === 'general' && (
        <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">{t('general.heading')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {generalFields.map(({ key, label, type }) => (
              <div key={key}>
                <label className="text-xs font-medium text-gray-500">{label}</label>
                <input type={type} value={(biz[key] as string) ?? ''}
                  onChange={(e) => setBiz((b) => ({ ...b, [key]: e.target.value }))}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-gray-500">{t('general.fields.timezone')}</label>
              <select value={biz.timezone ?? 'UTC'} onChange={(e) => setBiz((b) => ({ ...b, timezone: e.target.value }))}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">{t('general.fields.currency')}</label>
              <select value={currencySelectValue}
                onChange={(e) => {
                  if (e.target.value !== 'other') setBiz((b) => ({ ...b, currency: e.target.value }))
                  else setBiz((b) => ({ ...b, currency: '' }))
                }}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {currencySelectValue === 'other' && (
                <input
                  type="text"
                  value={biz.currency ?? ''}
                  onChange={(e) => setBiz((b) => ({ ...b, currency: e.target.value.toUpperCase() }))}
                  placeholder="e.g. SGD"
                  maxLength={10}
                  className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
          <div className="pt-2">
            <label className="text-xs font-medium text-gray-500">{t('general.typeLabel')}</label>
            <select value={biz.type ?? ''} onChange={(e) => setBiz((b) => ({ ...b, type: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">{t('general.typeDefault')}</option>
              {(['salon', 'barbershop', 'auto_repair', 'cafe', 'dental', 'fitness', 'massage', 'other'] as const).map((tp) => (
                <option key={tp} value={tp}>{t(`general.types.${tp}`)}</option>
              ))}
            </select>
          </div>
          <div className="pt-2">
            <label className="text-xs font-medium text-gray-500">{t('general.fields.slug')}</label>
            <input type="text" value={biz.slug ?? ''}
              onChange={(e) => {
                const converted = e.target.value.toLowerCase().replace(/ /g, '-')
                setBiz((b) => ({ ...b, slug: converted }))
                setSlugError(/[^a-z0-9-]/.test(converted) ? t('general.slugError') : '')
              }}
              className={`w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${slugError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'}`} />
            {slugError
              ? <p className="text-xs text-red-500 mt-1">{slugError}</p>
              : <p className="text-xs text-gray-400 mt-1">{t('general.slugHint')}</p>}
          </div>
          <div className="pt-2">
            <div className="text-xs font-medium text-gray-500 mb-1">{t('general.bookingUrlLabel')}</div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-blue-600 select-all">
              {bookingUrl}
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={saveBusiness} disabled={saving || !!slugError}>
              {saving ? t('general.saving') : saved ? <><Check className="w-4 h-4 mr-1" />{t('general.saved')}</> : t('general.saveButton')}
            </Button>
            <Badge variant="outline">{t('general.planLabel')} {biz.plan}</Badge>
          </div>
        </div>

        {/* Working Hours card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">{t('workingHours.heading')}</h2>
          <div className="space-y-2">
            {/* Display Mon→Sun (1,2,3,4,5,6,0) */}
            {[1, 2, 3, 4, 5, 6, 0].map((dow) => {
              const day = hours.find((h) => h.day_of_week === dow)!
              const dayName = (t.raw('workingHours.dayNames') as string[])[dow]
              return (
                <div key={dow} className="flex items-center gap-3">
                  {/* Toggle */}
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      checked={day.is_open}
                      onChange={(e) => updateDay(dow, { is_open: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-9 h-5 rounded-full transition-colors relative ${day.is_open ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${day.is_open ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                  </label>
                  {/* Day name */}
                  <span className={`w-10 text-sm font-medium ${day.is_open ? 'text-gray-900' : 'text-gray-400'}`}>
                    {dayName}
                  </span>
                  {/* Time range */}
                  {day.is_open ? (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs text-gray-400">{t('workingHours.from')}</span>
                      <select
                        value={day.open_time}
                        onChange={(e) => updateDay(dow, { open_time: e.target.value })}
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {TIME_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <span className="text-xs text-gray-400">{t('workingHours.to')}</span>
                      <select
                        value={day.close_time}
                        onChange={(e) => updateDay(dow, { close_time: e.target.value })}
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {TIME_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-300 flex-1">{t('workingHours.closed')}</span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-5">
            <Button onClick={saveWorkingHours} disabled={savingHours}>
              {savingHours ? t('workingHours.saving') : savedHours ? <><Check className="w-4 h-4 mr-1" />{t('workingHours.saved')}</> : t('workingHours.saveButton')}
            </Button>
          </div>
        </div>
        </div>
      )}

      {/* Services */}
      {tab === 'services' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {services.length === 0 ? (
              <div className="py-10 text-center text-gray-500 text-sm">{t('services.empty')}</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                    <th className="text-left px-4 py-3 font-medium">{t('services.table.name')}</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">{t('services.table.category')}</th>
                    <th className="text-right px-4 py-3 font-medium">{t('services.table.price')}</th>
                    <th className="text-right px-4 py-3 font-medium">{t('services.table.duration')}</th>
                    <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">Capacity</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{s.category ?? '—'}</td>
                      <td className="px-4 py-3 text-right">{biz.currency} {s.price}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{s.duration_min} min</td>
                      <td className="px-4 py-3 text-right text-gray-500 hidden sm:table-cell">
                        {(s.capacity ?? 1) > 1 ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2 py-0.5">
                            <Users className="w-3 h-3" />{s.capacity}
                          </span>
                        ) : '1'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {confirmDeleteSvcId === s.id ? (
                          <div className="flex justify-end items-center gap-2">
                            <span className="text-xs text-gray-500">{t('services.deleteConfirm')}</span>
                            <button onClick={() => deleteService(s.id)} className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">{t('services.deleteYes')}</button>
                            <button onClick={() => setConfirmDeleteSvcId(null)} className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">{t('services.deleteNo')}</button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-1">
                            <button onClick={() => { setSvcForm(s); setEditingSvc(s.id) }} className="p-1.5 hover:bg-gray-100 rounded"><Pencil className="w-3.5 h-3.5 text-gray-500" /></button>
                            <button onClick={() => setConfirmDeleteSvcId(s.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{editingSvc ? t('services.editHeading') : t('services.addHeading')}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {([
                { key: 'name', label: t('services.fields.name'), type: 'text' },
                { key: 'category', label: t('services.fields.category'), type: 'text' },
                { key: 'price', label: t('services.fields.price'), type: 'number' },
                { key: 'duration_min', label: t('services.fields.duration'), type: 'number' },
              ] as { key: keyof Service; label: string; type: string }[]).map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-gray-500">{label}</label>
                  <input type={type} value={(svcForm[key] as string | number) ?? ''}
                    onChange={(e) => setSvcForm((f) => ({ ...f, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-500">Capacity</label>
                <input type="number" min={1} value={(svcForm.capacity as number) ?? 1}
                  onChange={(e) => setSvcForm((f) => ({ ...f, capacity: Math.max(1, Number(e.target.value)) }))}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-gray-400 mt-1">Max clients per slot (1 = individual, &gt;1 = group class)</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {editingSvc && <Button variant="outline" onClick={() => { setSvcForm({}); setEditingSvc(null) }}>{t('services.cancelButton')}</Button>}
              <Button onClick={saveService} disabled={!svcForm.name}>
                <Plus className="w-4 h-4 mr-1" />{editingSvc ? t('services.updateButton') : t('services.addButton')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Employees */}
      {tab === 'employees' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {employees.length === 0 ? (
              <div className="py-10 text-center text-gray-500 text-sm">{t('employees.empty')}</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                    <th className="text-left px-4 py-3 font-medium">{t('employees.table.name')}</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">{t('employees.table.role')}</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">{t('employees.table.contact')}</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">{t('employees.table.phone')}</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">{e.name}</td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell capitalize">{e.role}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{e.email ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{e.phone ?? '—'}</td>
                      <td className="px-4 py-3 text-right">
                        {confirmDeleteEmpId === e.id ? (
                          <div className="flex justify-end items-center gap-2">
                            <span className="text-xs text-gray-500">{t('employees.deleteConfirm')}</span>
                            <button onClick={() => deleteEmployee(e.id)} className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">{t('employees.deleteYes')}</button>
                            <button onClick={() => setConfirmDeleteEmpId(null)} className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">{t('employees.deleteNo')}</button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-1">
                            <button onClick={() => { setEmpForm(e); setEditingEmp(e.id) }} className="p-1.5 hover:bg-gray-100 rounded"><Pencil className="w-3.5 h-3.5 text-gray-500" /></button>
                            <button onClick={() => setConfirmDeleteEmpId(e.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{editingEmp ? t('employees.editHeading') : t('employees.addHeading')}</h3>
            {empLimitBanner && !editingEmp && (
              <div className="mb-4">
                <UpgradeBanner
                  title={`Free plan includes ${empLimit} team member${empLimit === 1 ? '' : 's'}.`}
                  description="Upgrade to Starter to add up to 3 team members."
                />
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-3">
              {([
                { key: 'name', label: t('employees.fields.name'), type: 'text' },
                { key: 'role', label: t('employees.fields.role'), type: 'text' },
                { key: 'email', label: t('employees.fields.email'), type: 'email' },
                { key: 'phone', label: t('employees.fields.phone'), type: 'tel' },
              ] as { key: keyof Employee; label: string; type: string }[]).map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-gray-500">{label}</label>
                  <input type={type} value={(empForm[key] as string) ?? ''}
                    onChange={(e) => setEmpForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              {editingEmp && <Button variant="outline" onClick={() => { setEmpForm({}); setEditingEmp(null) }}>{t('employees.cancelButton')}</Button>}
              <Button onClick={saveEmployee} disabled={!empForm.name}>
                <Plus className="w-4 h-4 mr-1" />{editingEmp ? t('employees.updateButton') : t('employees.addButton')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === 'notifications' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <h2 className="font-semibold text-gray-900">{t('notifications.heading')}</h2>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-900">{t('notifications.email.label')}</span>
                {(biz.email_provider === 'smtp' && biz.smtp_host && biz.smtp_user && biz.smtp_pass && biz.smtp_from) ||
                 (biz.email_provider === 'resend' && biz.resend_api_key)
                  ? <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />{t('notifications.email.connected')}</Badge>
                  : <Badge variant="secondary">{t('notifications.email.notSet')}</Badge>}
              </div>

              {/* Provider radio */}
              <div className="flex flex-col gap-2 mb-4">
                {(['smtp', 'resend'] as const).map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="email_provider" value={p}
                      checked={biz.email_provider === p}
                      onChange={() => setBiz((b) => ({ ...b, email_provider: p }))}
                      className="accent-blue-600" />
                    <span className="text-sm text-gray-700">
                      {p === 'smtp' ? t('notifications.email.smtpOption') : t('notifications.email.resendOption')}
                    </span>
                  </label>
                ))}
              </div>

              {/* SMTP fields */}
              {biz.email_provider === 'smtp' && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500">{t('notifications.email.smtpHost')}</label>
                    <input type="text" value={biz.smtp_host ?? ''}
                      onChange={(e) => setBiz((b) => ({ ...b, smtp_host: e.target.value || null }))}
                      placeholder={t('notifications.email.smtpHostPlaceholder')}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">{t('notifications.email.smtpPort')}</label>
                    <input type="number" value={biz.smtp_port ?? 587}
                      onChange={(e) => setBiz((b) => ({ ...b, smtp_port: parseInt(e.target.value) || 587 }))}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">{t('notifications.email.smtpUser')}</label>
                    <input type="text" value={biz.smtp_user ?? ''}
                      onChange={(e) => setBiz((b) => ({ ...b, smtp_user: e.target.value || null }))}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">{t('notifications.email.smtpPass')}</label>
                    <input type="password" value={biz.smtp_pass ?? ''}
                      onChange={(e) => setBiz((b) => ({ ...b, smtp_pass: e.target.value || null }))}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <p className="text-xs text-gray-400 mt-1">{t('notifications.email.smtpPassHint')}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-gray-500">{t('notifications.email.smtpFrom')}</label>
                    <input type="email" value={biz.smtp_from ?? ''}
                      onChange={(e) => setBiz((b) => ({ ...b, smtp_from: e.target.value || null }))}
                      placeholder={t('notifications.email.smtpFromPlaceholder')}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}

              {/* Resend fields */}
              {biz.email_provider === 'resend' && (
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('notifications.email.resendApiKey')}</label>
                  <input type="password" value={biz.resend_api_key ?? ''}
                    onChange={(e) => setBiz((b) => ({ ...b, resend_api_key: e.target.value || null }))}
                    placeholder={t('notifications.email.resendApiKeyPlaceholder')}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <p className="text-xs text-gray-400 mt-1">
                    <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('notifications.email.resendSignup')}</a>
                  </p>
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Telegram */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{t('notifications.telegram.label')}</span>
                {biz.telegram_chat_id
                  ? <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />{t('notifications.telegram.connected')}</Badge>
                  : <Badge variant="secondary">{t('notifications.telegram.notSet')}</Badge>}
              </div>

              {/* Инструкция по шагам */}
              <ol className="text-xs text-gray-500 space-y-1 mb-3 list-decimal list-inside">
                <li>Open <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@BotFather</a> in Telegram → <code className="bg-gray-100 px-1 rounded">/newbot</code> → copy the token</li>
                <li>Paste the token below and click <strong>Connect</strong></li>
                <li>Open your new bot in Telegram from your business account and send <code className="bg-gray-100 px-1 rounded">/start</code> — this registers the chat to receive notifications</li>
              </ol>

              <div className="flex gap-2">
                <input type="text" value={biz.telegram_bot_token ?? ''}
                  onChange={(e) => setBiz((b) => ({ ...b, telegram_bot_token: e.target.value }))}
                  placeholder={t('notifications.telegram.placeholder')}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Button onClick={connectTelegram} disabled={webhookStatus === 'loading' || !biz.telegram_bot_token} variant="outline">
                  {webhookStatus === 'loading'
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : t('notifications.telegram.connectButton')}
                </Button>
              </div>

              {webhookStatus === 'ok' && (
                <div className="mt-2 flex items-start gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />{webhookMsg}
                </div>
              )}
              {webhookStatus === 'error' && (
                <div className="mt-2 flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />{webhookMsg}
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Viber */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{t('notifications.viber.label')}</span>
                {initial.viber_chat_id
                  ? <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />{t('notifications.viber.connected')}</Badge>
                  : <Badge variant="secondary">{t('notifications.viber.notSet')}</Badge>}
              </div>

              <ol className="text-xs text-gray-500 space-y-1 mb-3 list-decimal list-inside">
                <li>Go to <a href="https://developers.viber.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">developers.viber.com</a> → create a bot → copy the token</li>
                <li>Paste the token below and click <strong>Connect</strong></li>
                <li>Open your bot in Viber from your business account and send <code className="bg-gray-100 px-1 rounded">/start</code> — this registers the chat to receive notifications</li>
              </ol>

              <div className="flex gap-2">
                <input type="text" value={biz.viber_bot_token ?? ''}
                  onChange={(e) => setBiz((b) => ({ ...b, viber_bot_token: e.target.value }))}
                  placeholder={t('notifications.viber.placeholder')}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Button onClick={connectViber} disabled={viberWebhookStatus === 'loading' || !biz.viber_bot_token} variant="outline">
                  {viberWebhookStatus === 'loading'
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : t('notifications.viber.connectButton')}
                </Button>
              </div>

              {viberWebhookStatus === 'ok' && (
                <div className="mt-2 flex items-start gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />{viberWebhookMsg}
                </div>
              )}
              {viberWebhookStatus === 'error' && (
                <div className="mt-2 flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />{viberWebhookMsg}
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* WhatsApp */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{t('notifications.whatsapp.label')}</span>
                {biz.meta_whatsapp_phone_number_id && biz.meta_whatsapp_access_token
                  ? <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />{t('notifications.whatsapp.connected')}</Badge>
                  : <Badge variant="secondary">{t('notifications.whatsapp.notSet')}</Badge>}
              </div>
              <p className="text-xs text-gray-500 mb-3">{t('notifications.whatsapp.description')}</p>
              <ol className="text-xs text-gray-500 space-y-1 mb-3 list-decimal list-inside">
                <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">developers.facebook.com</a> → create a Meta App → add the <strong>WhatsApp</strong> product</li>
                <li>In <strong>WhatsApp → API Setup</strong> copy the <em>Phone Number ID</em> and a <strong>permanent access token</strong> (create via System User in Meta Business Manager — recommended)</li>
                <li>Paste both below and click <strong>{t('notifications.whatsapp.saveButton')}</strong></li>
                <li>Add a client&apos;s WhatsApp number in CRM → client page — they will receive notifications automatically</li>
              </ol>
              <div className="space-y-2 mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  value={biz.meta_whatsapp_phone_number_id ?? ''}
                  onChange={(e) => setBiz((b) => ({ ...b, meta_whatsapp_phone_number_id: e.target.value || null }))}
                  placeholder={t('notifications.whatsapp.phoneNumberIdPlaceholder')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  autoComplete="new-password"
                  value={biz.meta_whatsapp_access_token ?? ''}
                  onChange={(e) => setBiz((b) => ({ ...b, meta_whatsapp_access_token: e.target.value || null }))}
                  placeholder={t('notifications.whatsapp.accessTokenPlaceholder')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                onClick={connectWhatsApp}
                disabled={waStatus === 'loading' || !biz.meta_whatsapp_phone_number_id || !biz.meta_whatsapp_access_token}
                variant="outline"
              >
                {waStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : t('notifications.whatsapp.saveButton')}
              </Button>
              {waStatus === 'ok' && (
                <div className="mt-2 flex items-start gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />{waMsg}
                </div>
              )}
              {waStatus === 'error' && (
                <div className="mt-2 flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />{waMsg}
                </div>
              )}
            </div>

            {/* WhatsApp номер владельца для алертов */}
            {!!(biz.meta_whatsapp_phone_number_id && biz.meta_whatsapp_access_token) && (
              <div>
                <label className="text-xs font-medium text-gray-500">{t('notifications.ownerWhatsapp.label')}</label>
                <p className="text-xs text-gray-400 mb-2">{t('notifications.ownerWhatsapp.description')}</p>
                <input
                  type="tel"
                  value={biz.owner_whatsapp ?? ''}
                  onChange={(e) => setBiz((b) => ({ ...b, owner_whatsapp: e.target.value || null }))}
                  placeholder={t('notifications.ownerWhatsapp.placeholder')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <Button onClick={saveBusiness} disabled={saving}>
              {saving ? t('notifications.saving') : saved ? t('notifications.saved') : t('notifications.save')}
            </Button>
          </div>
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('notifications.triggersHeading')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {triggers.map((tr) => (
                <li key={tr} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{tr}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Billing */}
      {tab === 'billing' && (
        <BillingTab
          businessId={biz.id}
          currentTier={(biz.subscription_tier ?? 'free') as PlanTier}
          onTierUpdate={(tier) => setBiz((b) => ({ ...b, subscription_tier: tier }))}
        />
      )}

      {/* Account */}
      {tab === 'account' && (
        <div className="space-y-4">
          {/* Email */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">{t('account.heading')}</h2>
            <div className="space-y-3 max-w-sm">
              <div>
                <label className="text-xs font-medium text-gray-500">{t('account.currentEmailLabel')}</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <span className="text-sm text-gray-700 flex-1">{userEmail}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">{t('account.newEmailLabel')}</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => { setNewEmail(e.target.value); setEmailStatus('idle') }}
                  placeholder={t('account.newEmailPlaceholder')}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {emailStatus === 'ok' && (
                <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> {emailMsg}
                </div>
              )}
              {emailStatus === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {emailMsg}
                </div>
              )}

              <Button
                onClick={changeEmail}
                variant="outline"
                disabled={emailStatus === 'loading' || !newEmail}
              >
                {emailStatus === 'loading'
                  ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('account.saving')}</>
                  : t('account.changeEmailButton')}
              </Button>
              <p className="text-xs text-gray-400">{t('account.emailHint')}</p>
            </div>
          </div>

          {/* Change password */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('account.passwordHeading')}</h3>
            <div className="space-y-3 max-w-sm">
              <div>
                <label className="text-xs font-medium text-gray-500">{t('account.newPasswordLabel')}</label>
                <div className="relative mt-1">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={pwForm.newPassword}
                    onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
                    placeholder="Min. 8 characters"
                    className="w-full border border-gray-200 rounded-lg pl-3 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">{t('account.confirmPasswordLabel')}</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pwForm.confirm}
                  onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                  placeholder={t('account.confirmPasswordPlaceholder')}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {pwStatus === 'ok' && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> {pwMsg}
                </div>
              )}
              {pwStatus === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {pwMsg}
                </div>
              )}

              <Button
                onClick={changePassword}
                disabled={pwStatus === 'loading' || !pwForm.newPassword || !pwForm.confirm}
              >
                {pwStatus === 'loading'
                  ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('account.saving')}</>
                  : t('account.changePasswordButton')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Billing tab ──────────────────────────────────────────────────────────────

type PlanTier = 'free' | 'starter' | 'pro' | 'agency'

const PLANS: { tier: PlanTier; name: string; price: string; features: string[] }[] = [

  {
    tier: 'free',
    name: 'Free',
    price: '$0',
    features: ['1 employee', '100 clients', '50 bookings/month', 'POS · CRM · Inventory', 'All notifications'],
  },
  {
    tier: 'starter',
    name: 'Starter',
    price: '$19/mo',
    features: ['3 employees', 'Unlimited clients', 'Unlimited bookings'],
  },
  {
    tier: 'pro',
    name: 'Pro',
    price: '$39/mo',
    features: ['15 employees', 'Unlimited clients', 'Analytics', 'Loyalty program', 'Custom domain'],
  },
  {
    tier: 'agency',
    name: 'Agency',
    price: '$79/mo',
    features: ['Unlimited employees', 'Multiple locations', 'White-label', 'API access'],
  },
]

const TIER_ORDER: PlanTier[] = ['free', 'starter', 'pro', 'agency']

function BillingTab({ businessId, currentTier, onTierUpdate }: { businessId: string; currentTier: PlanTier; onTierUpdate: (tier: PlanTier) => void }) {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'ok' | 'error' | 'not_found'>('idle')
  const [syncedTier, setSyncedTier] = useState<string>('')
  // Local copy of tier so UI updates immediately without waiting for parent re-render
  const [displayTier, setDisplayTier] = useState<PlanTier>(currentTier)

  async function syncPlan() {
    setSyncStatus('loading')
    try {
      const res = await fetch('/api/billing/sync', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) {
        setSyncStatus('error')
        return
      }
      if (json.notFound) {
        setDisplayTier('free')
        onTierUpdate('free')
        setSyncStatus('not_found')
        return
      }
      const newTier = json.tier as PlanTier
      setDisplayTier(newTier)
      setSyncedTier(json.tier)
      setSyncStatus('ok')
      onTierUpdate(newTier)
    } catch {
      setSyncStatus('error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLANS.map((plan) => {
          const isCurrent = plan.tier === displayTier
          const isUpgrade = TIER_ORDER.indexOf(plan.tier) > TIER_ORDER.indexOf(displayTier)
          const checkoutUrl = getWhopCheckoutUrl(plan.tier, businessId)

          return (
            <div
              key={plan.tier}
              className={`rounded-xl border p-5 flex flex-col gap-3 ${
                isCurrent ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{plan.name}</span>
                  {isCurrent && (
                    <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                      Current plan
                    </span>
                  )}
                </div>
                <div className="text-2xl font-extrabold text-gray-900">{plan.price}</div>
              </div>
              <ul className="space-y-1.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <div className="w-full text-center text-sm text-gray-400 py-2">Current plan</div>
              ) : (
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center text-sm font-semibold py-2 rounded-lg transition-colors ${
                    isUpgrade
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isUpgrade ? 'Upgrade' : 'Downgrade'}
                </a>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400">
        To cancel your subscription, manage it directly at{' '}
        <a
          href="https://whop.com/pronto-fdee/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          whop.com
        </a>
        .
      </p>

      {/* Plan sync */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Plan not updating after purchase?</p>
            <p className="text-xs text-gray-500 mt-0.5">Sync your subscription status from Whop.</p>
          </div>
          <button
            onClick={syncPlan}
            disabled={syncStatus === 'loading'}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {syncStatus === 'loading' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            Sync plan
          </button>
        </div>
        {syncStatus === 'ok' && (
          <div className="mt-2 flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            Plan updated to <strong className="capitalize">{syncedTier}</strong>!
          </div>
        )}
        {syncStatus === 'not_found' && (
          <div className="mt-2 text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
            No active Whop membership found for this account. Make sure you purchased using the same email address.
          </div>
        )}
        {syncStatus === 'error' && (
          <div className="mt-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            Sync failed. Please contact support at support@trypronto.app.
          </div>
        )}
      </div>
    </div>
  )
}
