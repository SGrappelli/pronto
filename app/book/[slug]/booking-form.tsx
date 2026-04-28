'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency, uses12HourClock } from '@/lib/utils'
import { CheckCircle2, ChevronRight, Loader2, UserCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { useTranslations } from 'next-intl'

interface Service { id: string; name: string; description: string | null; price: number; duration_min: number; category: string | null; capacity: number }
interface Employee { id: string; name: string }
interface Business { id: string; name: string; currency: string; slug: string; timezone: string | null }
interface DayHours { day_of_week: number; is_open: boolean; open_time: string; close_time: string }

interface Props {
  business: Business
  services: Service[]
  employees: Employee[]
  workingHours: DayHours[]
  telegramBotUsername: string | null
  viberBotUri: string | null
}

// 'employee' step is inserted between 'service' and 'datetime' when there are
// multiple active employees. With 0 or 1 employee the step is skipped entirely.
type Step = 'service' | 'employee' | 'datetime' | 'contact' | 'done'

// Default schedule used as fallback when migration 009 isn't applied yet
const DEFAULT_HOURS: DayHours[] = [0, 1, 2, 3, 4, 5, 6].map((dow) => ({
  day_of_week: dow,
  is_open: dow >= 1 && dow <= 5,
  open_time: '09:00',
  close_time: '20:00',
}))

/** Generate time slots from open_time to close_time with step = durationMin */
function generateSlots(openTime: string, closeTime: string, durationMin: number): string[] {
  const [oh, om] = openTime.split(':').map(Number)
  const [ch, cm] = closeTime.split(':').map(Number)
  const start = oh * 60 + om
  const end = ch * 60 + cm
  const slots: string[] = []
  let cur = start
  while (cur + durationMin <= end) {
    slots.push(`${String(Math.floor(cur / 60)).padStart(2, '0')}:${String(cur % 60).padStart(2, '0')}`)
    cur += durationMin
  }
  return slots
}

export function PublicBookingForm({ business, services, employees, workingHours, telegramBotUsername, viberBotUri }: Props) {
  const supabase = createClient()
  const t = useTranslations('publicBooking')

  // Whether to show the employee selection step
  const hasEmployeeStep = employees.length > 1

  const [step, setStep] = useState<Step>('service')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  // '' means "no preference"; a uuid means a specific employee was picked
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [contact, setContact] = useState({ name: '', phone: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [slotTakenError, setSlotTakenError] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [clientId, setClientId] = useState<string | null>(null)
  const [clientHasTelegram, setClientHasTelegram] = useState(false)

  // Slot state
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [slotSpotsLeft, setSlotSpotsLeft] = useState<Record<string, number>>({})
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [dayClosed, setDayClosed] = useState(false)

  const effectiveHours: DayHours[] = [0, 1, 2, 3, 4, 5, 6].map((dow) => {
    const fromDb = workingHours.find((h) => h.day_of_week === dow)
    return fromDb ?? DEFAULT_HOURS.find((h) => h.day_of_week === dow)!
  })

  const closedWeekdays = effectiveHours.filter((h) => !h.is_open).map((h) => h.day_of_week)
  const today = new Date().toISOString().slice(0, 10)

  // Reload slots whenever date, service, or selected employee changes
  useEffect(() => {
    if (!date || !selectedService) {
      setAvailableSlots([])
      setDayClosed(false)
      return
    }
    loadSlots(date, selectedService, selectedEmployee)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedService, selectedEmployee])

  async function loadSlots(selectedDate: string, svc: Service, employeeId: string) {
    setLoadingSlots(true)
    setDayClosed(false)
    setAvailableSlots([])
    setTime('')

    const dow = new Date(selectedDate + 'T00:00:00').getDay()
    const dayHours = effectiveHours.find((h) => h.day_of_week === dow)

    if (!dayHours || !dayHours.is_open) {
      setDayClosed(true)
      setLoadingSlots(false)
      return
    }

    let slots = generateSlots(dayHours.open_time, dayHours.close_time, svc.duration_min)

    if (selectedDate === today) {
      const now = new Date()
      const nowMin = now.getHours() * 60 + now.getMinutes() + 30
      slots = slots.filter((slot) => {
        const [sh, sm] = slot.split(':').map(Number)
        return sh * 60 + sm > nowMin
      })
    }

    const capacity = svc.capacity ?? 1
    const spotsMap: Record<string, number> = {}

    try {
      const { data: booked } = await supabase.rpc('get_booked_slots', {
        p_business_id: business.id,
        p_date: selectedDate,
        p_employee_id: employeeId || null,
      })

      slots = slots.filter((slot) => {
        const [sh, sm] = slot.split(':').map(Number)
        const slotStartMin = sh * 60 + sm
        const slotEndMin = slotStartMin + svc.duration_min

        const bookedCount = (booked ?? []).filter(({ starts_at, ends_at }: { starts_at: string; ends_at: string }) => {
          // Convert UTC timestamps to business-local minutes so the overlap check
          // is in the same coordinate system as the slot grid (which is in business hours).
          const toBusinessMin = (iso: string) => {
            const tz = business.timezone ?? 'UTC'
            const parts = new Intl.DateTimeFormat('en-US', {
              timeZone: tz,
              hour: '2-digit', minute: '2-digit', hour12: false,
            }).formatToParts(new Date(iso))
            const h = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0')
            const m = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0')
            return (h % 24) * 60 + m
          }
          const bStartMin = toBusinessMin(starts_at)
          const bEndMin   = toBusinessMin(ends_at)
          return slotStartMin < bEndMin && slotEndMin > bStartMin
        }).length

        const spotsLeft = capacity - bookedCount
        if (spotsLeft > 0) {
          spotsMap[slot] = spotsLeft
          return true
        }
        return false
      })
    } catch {
      // Non-critical — show all slots if RPC fails
      slots.forEach((slot) => { spotsMap[slot] = capacity })
    }

    setAvailableSlots(slots)
    setSlotSpotsLeft(spotsMap)
    setLoadingSlots(false)
  }

  async function submit() {
    if (!selectedService || !date || !time || !contact.name) return
    if (!contact.phone && !contact.email) {
      setBookingError('Please enter at least a phone number or email so we can confirm your booking.')
      return
    }
    if (contact.phone && !/^[\d\s\+\-\(\)\.]{7,}$/.test(contact.phone)) {
      setBookingError('Please enter a valid phone number (digits only, e.g. +1 234 567 8900).')
      return
    }
    if (contact.email && !contact.email.includes('@')) {
      setBookingError('Please enter a valid email address (e.g. name@example.com).')
      return
    }
    setSaving(true)
    setSlotTakenError(false)
    setBookingError(null)

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId:  business.id,
          serviceId:   selectedService.id,
          employeeId:  selectedEmployee || null,
          date,
          time,
          name:  contact.name,
          phone: contact.phone || null,
          email: contact.email || null,
        }),
      })

      if (res.status === 409) {
        // Another user grabbed this slot between the availability check and the insert.
        // Go back to the time picker, refresh slots so the taken slot disappears,
        // and show an inline explanation.
        setSaving(false)
        setSlotTakenError(true)
        setTime('')
        setStep('datetime')
        if (selectedService) loadSlots(date, selectedService, selectedEmployee)
        return
      }

      if (res.status === 429) {
        setSaving(false)
        setBookingError('Too many booking attempts. Please wait a few minutes and try again.')
        return
      }

      if (!res.ok) throw new Error(await res.text())

      const data = await res.json()
      setClientId(data.clientId ?? null)
      setClientHasTelegram(data.hasTelegram ?? false)
      setStep('done')
      setSaving(false)
    } catch {
      setSaving(false)
      setBookingError('Something went wrong. Please try again or contact the business directly.')
    }
  }

  function handleSelectService(s: Service) {
    setSelectedService(s)
    setStep(hasEmployeeStep ? 'employee' : 'datetime')
  }

  function handleSelectEmployee(employeeId: string) {
    setSelectedEmployee(employeeId)
    setStep('datetime')
  }

  function handleBackFromEmployee() {
    setStep('service')
  }

  function handleBackFromDatetime() {
    setStep(hasEmployeeStep ? 'employee' : 'service')
  }

  function resetAll() {
    setStep('service')
    setSelectedService(null)
    setSelectedEmployee('')
    setDate('')
    setTime('')
    setContact({ name: '', phone: '', email: '' })
    setAvailableSlots([])
    setClientId(null)
    setClientHasTelegram(false)
    setBookingError(null)
  }

  // ─── Derived display helpers ──────────────────────────────────────────────
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  const is12h = uses12HourClock(locale)

  function formatSlot(slot: string): string {
    const [h, m] = slot.split(':').map(Number)
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: is12h,
    }).format(new Date(2000, 0, 1, h, m))
  }

  const selectedEmployeeObj = employees.find((e) => e.id === selectedEmployee) ?? null

  // ─── Done screen ──────────────────────────────────────────────────────────
  if (step === 'done') {
    const telegramLink = telegramBotUsername && clientId
      ? `https://t.me/${telegramBotUsername}?start=client_${clientId}`
      : null
    const viberLink = viberBotUri && clientId
      ? `viber://pa?chatURI=${viberBotUri}&context=client_${clientId}`
      : null

    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('success.heading')}</h2>
        <p className="text-sm text-gray-500 mb-1">
          {selectedService?.name} · {date} at {time ? formatSlot(time) : ''}
          {selectedEmployeeObj && ` · ${selectedEmployeeObj.name}`}
        </p>
        <p className="text-sm text-gray-500 mb-6">{t('success.body')}</p>

        {/* Messenger opt-in — hidden if client already has Telegram connected */}
        {!clientHasTelegram && (telegramLink || viberLink) && (
          <div className="border border-gray-100 rounded-xl p-4 mb-6 bg-gray-50 text-left">
            <p className="text-sm font-medium text-gray-700 mb-1">{t('success.optInHeading')}</p>
            <p className="text-xs text-gray-500 mb-3">{t('success.optInSub')}</p>
            <div className="flex flex-col gap-2">
              {telegramLink && (
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#229ED9] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#1a8fc7] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
                  {t('success.telegramButton')}
                </a>
              )}
              {viberLink && (
                <a
                  href={viberLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#7360F2] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#6350e0] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.983.02C8.764.02 3.14 1.016.824 7.236c-.9 2.38-.9 4.944-.9 6.764v.02c0 2.62.44 5.04 1.72 6.72C2.9 22.22 4.74 23 7.4 23h.12c.6 0 1.2-.08 1.68-.28.08-.04.12-.12.12-.2v-2.16c0-.12-.08-.2-.2-.2-.04 0-.12 0-.16.04-.64.28-1.28.36-1.96.36-1.88 0-3.04-.6-3.72-1.84-.6-1.12-.76-2.6-.76-4.36v-.02c0-1.6.04-3.88.72-5.84 1.84-5.08 6.56-5.76 8.76-5.76h.04c2.2 0 6.92.68 8.76 5.76.68 1.96.72 4.24.72 5.84v.02c0 1.76-.16 3.24-.76 4.36-.68 1.24-1.84 1.84-3.72 1.84-.68 0-1.32-.08-1.96-.36-.04-.04-.12-.04-.16-.04-.12 0-.2.08-.2.2v2.16c0 .08.04.16.12.2.48.2 1.08.28 1.68.28h.12c2.66 0 4.5-.78 5.76-2.26 1.28-1.68 1.72-4.1 1.72-6.72v-.02c0-1.82 0-4.38-.9-6.76C20.86 1.016 15.224.02 12.004.02h-.02z"/></svg>
                  {t('success.viberButton')}
                </a>
              )}
            </div>
          </div>
        )}

        <Button variant="outline" onClick={resetAll}>
          {t('success.bookAnother')}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* ── Step 1: Service ───────────────────────────────────────────────── */}
      {step === 'service' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">{t('selectService.heading')}</h2>
          {services.length === 0 ? (
            <p className="text-sm text-gray-500">{t('selectService.empty')}</p>
          ) : (
            <div className="space-y-2">
              {services.map((s) => (
                <button key={s.id} onClick={() => handleSelectService(s)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-700">{s.name}</div>
                      {s.description && <div className="text-xs text-gray-500 mt-0.5">{s.description}</div>}
                      <div className="text-xs text-gray-400 mt-1">{t('selectService.minutes', { duration: s.duration_min })}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="font-semibold text-blue-600">{formatCurrency(s.price, business.currency)}</div>
                      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1 group-hover:text-blue-400" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Step 2: Employee (only when 2+ active employees) ─────────────── */}
      {step === 'employee' && selectedService && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <button onClick={handleBackFromEmployee}
            className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
            {t('selectEmployee.back')}
          </button>
          <h2 className="font-semibold text-gray-900 mb-1">{t('selectEmployee.heading')}</h2>
          <p className="text-sm text-gray-500 mb-4">{selectedService.name}</p>

          <div className="space-y-2">
            {/* No preference option */}
            <button
              onClick={() => handleSelectEmployee('')}
              className="w-full text-left p-4 rounded-xl border border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all group flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <UserCircle2 className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-700">
                  {t('selectEmployee.anyone')}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0" />
            </button>

            {/* Individual employees */}
            {employees.map((e) => (
              <button key={e.id}
                onClick={() => handleSelectEmployee(e.id)}
                className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm shrink-0">
                    {e.name[0].toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-900 group-hover:text-blue-700">{e.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3: Date & Time ───────────────────────────────────────────── */}
      {step === 'datetime' && selectedService && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <button onClick={handleBackFromDatetime}
            className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
            {t('datetime.back')}
          </button>
          {slotTakenError && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              ⚠ This time was just booked by someone else. Please choose a different time.
            </div>
          )}
          <h2 className="font-semibold text-gray-900 mb-1">{t('datetime.heading')}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {selectedService.name} · {selectedService.duration_min} min
            {selectedEmployeeObj && (
              <span className="ml-1 text-blue-600">· {selectedEmployeeObj.name}</span>
            )}
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500">{t('datetime.dateLabel')}</label>
              <DatePicker
                value={date}
                onChange={(v) => { setDate(v); setSlotTakenError(false) }}
                className="mt-1"
                minDate={today}
                disabledWeekdays={closedWeekdays}
              />
            </div>

            {date && (
              <div>
                <label className="text-xs font-medium text-gray-500">{t('datetime.timeLabel')}</label>
                {loadingSlots ? (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading available times…
                  </div>
                ) : dayClosed ? (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-500">
                    This day is outside working hours. Please choose another date.
                  </div>
                ) : (
                  <>
                    {availableSlots.length === 0 ? (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-500">
                        No available times for this day. Please choose another date.
                      </div>
                    ) : (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {availableSlots.map((ts) => {
                        const isGroup = (selectedService?.capacity ?? 1) > 1
                        const spotsLeft = slotSpotsLeft[ts] ?? selectedService?.capacity ?? 1
                        const isPartial = isGroup && spotsLeft < (selectedService?.capacity ?? 1)
                        return (
                        <button key={ts} onClick={() => { setTime(ts); setSlotTakenError(false) }}
                          className={`py-2 rounded-lg text-sm border transition-colors ${
                            time === ts
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                          }`}>
                          <div>{formatSlot(ts)}</div>
                          {isPartial && (
                            <div className={`text-xs mt-0.5 ${time === ts ? 'text-blue-100' : 'text-amber-600'}`}>
                              {spotsLeft} spots left
                            </div>
                          )}
                        </button>
                        )
                      })}
                    </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <Button className="w-full mt-6" onClick={() => setStep('contact')} disabled={!date || !time}>
            {t('datetime.continue')}
          </Button>
        </div>
      )}

      {/* ── Step 4: Contact ───────────────────────────────────────────────── */}
      {step === 'contact' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <button onClick={() => setStep('datetime')} className="text-xs text-gray-400 hover:text-gray-600 mb-4">
            {t('contact.back')}
          </button>
          <h2 className="font-semibold text-gray-900 mb-4">{t('contact.heading')}</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500">{t('contact.nameLabel')}</label>
              <input type="text" value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                placeholder={t('contact.namePlaceholder')}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">{t('contact.phoneLabel')}</label>
              <input type="tel" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                placeholder={t('contact.phonePlaceholder')}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">{t('contact.emailLabel')}</label>
              <input type="email" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                placeholder={t('contact.emailPlaceholder')}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          {bookingError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {bookingError}
            </div>
          )}
          <Button className="w-full mt-4" onClick={submit} disabled={!contact.name || saving}>
            {saving ? t('contact.booking') : t('contact.confirm', { price: formatCurrency(selectedService?.price ?? 0, business.currency) })}
          </Button>
          <p className="text-xs text-gray-400 text-center mt-3">{t('contact.noRegistration')}</p>
        </div>
      )}

    </div>
  )
}
