'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatInBusinessTimezone, uses12HourClock } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { ChevronLeft, ChevronRight, ExternalLink, CreditCard, AlertCircle, Palette } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { sanitizeText } from '@/lib/sanitize'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

interface Appointment {
  id: string; starts_at: string; ends_at: string; status: string; source: string | null; notes: string | null
  clients: { id: string; name: string } | null
  employees: { id: string; name: string } | null
  services: { id: string; name: string; price: number } | null
}

/** Get year/month/day/hour of a UTC ISO timestamp in the given IANA timezone. */
function apptTzParts(iso: string, tz: string): { year: number; month: number; day: number; hour: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hour12: false,
  }).formatToParts(new Date(iso))
  const get = (type: string) => parseInt(parts.find((p) => p.type === type)?.value ?? '0')
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour') % 24 }
}

/** Convert a wall-clock date+time in the business timezone to a UTC Date. */
function wallclockToUtc(year: number, month: number, day: number, hour: number, minute: number, tz: string): Date {
  const noonUtc = new Date(Date.UTC(year, month - 1, day, 12, 0))
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
  }).formatToParts(noonUtc)
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? '0')
  const localNoonMs = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'))
  const offsetMs = localNoonMs - noonUtc.getTime()
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - offsetMs)
}

const EMPLOYEE_PALETTE = [
  { bg: '#bbf7d0', text: '#14532d' },
  { bg: '#bae6fd', text: '#0c4a6e' },
  { bg: '#ddd6fe', text: '#3b0764' },
  { bg: '#fecdd3', text: '#881337' },
  { bg: '#fde68a', text: '#713f12' },
  { bg: '#99f6e4', text: '#134e4a' },
]

const NO_EMPLOYEE_COLOR = { bg: '#f1f5f9', text: '#475569' }

function getEmployeeColor(employeeId: string | null | undefined) {
  if (!employeeId) return NO_EMPLOYEE_COLOR
  let hash = 0
  for (let i = 0; i < employeeId.length; i++) {
    hash = (hash * 31 + employeeId.charCodeAt(i)) >>> 0
  }
  return EMPLOYEE_PALETTE[hash % EMPLOYEE_PALETTE.length]
}

const STATUS_STRIPE: Record<string, string> = {
  pending:   '#94a3b8',
  confirmed: '#16a34a',
  completed: '#3b82f6',
  paid:      '#eab308',
  cancelled: '#ef4444',
  no_show:   '#f97316',
}

function getStatusStripe(status: string): string {
  return STATUS_STRIPE[status.toLowerCase()] ?? STATUS_STRIPE.pending
}

const SOURCE_BADGE: Record<string, { label: string; pill: string }> = {
  online:   { label: 'Online',   pill: 'bg-blue-100 text-blue-700' },
  manual:   { label: 'Manual',   pill: 'bg-gray-100 text-gray-500' },
  telegram: { label: 'Telegram', pill: 'bg-sky-100 text-sky-700' },
  viber:    { label: 'Viber',    pill: 'bg-purple-100 text-purple-700' },
}
interface Employee { id: string; name: string }
interface Service { id: string; name: string; duration_min: number; price: number }
interface Client { id: string; name: string; phone: string | null }

interface BusinessHour { day_of_week: number; is_open: boolean; open_time: string; close_time: string }

interface Props {
  businessId: string; slug: string; timezone: string
  appointments: Appointment[]; employees: Employee[]; services: Service[]; clients: Client[]
  businessHours: BusinessHour[]
  plan: string
  monthlyBookingCount: number
  bookingLimit: number
}

// ─── Draggable appointment card ────────────────────────────────────────────────
function DraggableAppt({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.35 : 1, touchAction: 'none' }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

// ─── Droppable time-slot cell ──────────────────────────────────────────────────
function DroppableCell({
  id, children, onClick, className,
}: {
  id: string; children: React.ReactNode; onClick: () => void; className: string
}) {
  const { isOver, setNodeRef } = useDroppable({ id })
  return (
    <td
      ref={setNodeRef}
      className={`${className}${isOver ? ' bg-blue-50' : ''}`}
      onClick={onClick}
    >
      {children}
    </td>
  )
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  confirmed: 'bg-blue-100 border-blue-300 text-blue-800',
  completed: 'bg-amber-100 border-amber-300 text-amber-800',
  paid: 'bg-green-100 border-green-300 text-green-800',
  cancelled: 'bg-gray-100 border-gray-300 text-gray-500',
  no_show: 'bg-red-50 border-red-200 text-red-600',
}

function getMonday(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day))
  d.setHours(0, 0, 0, 0)
  return d
}

export function BookingCalendar({ businessId, slug, timezone, appointments: initial, employees, services, clients: initialClients, businessHours, plan, monthlyBookingCount: initialBookingCount, bookingLimit }: Props) {
  const supabase = createClient()
  const router = useRouter()
  const t = useTranslations('booking')
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const [origin, setOrigin] = useState('')
  useEffect(() => { setOrigin(window.location.origin) }, [])
  const bookingUrl = useMemo(() => {
    if (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas') {
      const baseDomain = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://trypronto.app')
        .replace(/^https?:\/\//, '').replace(/\/$/, '')
      return `https://${slug}.${baseDomain}/book`
    }
    return `${origin}/book/${slug}`
  }, [slug, origin])
  const [appointments, setAppointments] = useState(initial)
  const [clientsList, setClientsList] = useState<Client[]>(initialClients)

  // Dynamic hour range: derived from business hours + actual appointment times
  const HOURS = useMemo(() => {
    const openDays = businessHours.filter((h) => h.is_open && h.open_time && h.close_time)
    let minHour = openDays.length > 0
      ? Math.min(...openDays.map((h) => parseInt(h.open_time.split(':')[0])))
      : 8
    let maxHour = openDays.length > 0
      ? Math.max(...openDays.map((h) => parseInt(h.close_time.split(':')[0])))
      : 20
    // Expand to cover any appointment that falls outside the business-hours window
    for (const appt of appointments) {
      const { hour: h } = apptTzParts(appt.starts_at, timezone)
      if (h < minHour) minHour = h
      if (h > maxHour) maxHour = h
    }
    return Array.from({ length: maxHour - minHour + 1 }, (_, i) => i + minHour)
  }, [businessHours, appointments, timezone])
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [bookingCount, setBookingCount] = useState(initialBookingCount)
  const bookingLimitReached = plan === 'free' && bookingCount >= bookingLimit
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  const is12h = uses12HourClock(locale)

  // hour/minute always stored in 24h internally; period only used when is12h
  const [form, setForm] = useState({ client_id: '', employee_id: '', service_id: '', date: '', hour: '', minute: '00', period: 'AM' as 'AM' | 'PM', notes: '' })

  async function openForm(prefill?: Partial<typeof form>) {
    const { data } = await supabase
      .from('clients')
      .select('id, name, phone')
      .eq('business_id', businessId)
      .order('name')
      .limit(200)
    if (data) setClientsList(data as Client[])
    if (prefill) setForm((f) => ({ ...f, ...prefill }))
    setFormError(null)
    setShowForm(true)
  }

  const hours24 = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const hours12 = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
  const formTime = form.hour ? `${form.hour}:${form.minute}` : ''

  function to12hDisplay(h24: string): string {
    const n = parseInt(h24)
    if (n === 0 || n === 12) return '12'
    return String(n > 12 ? n - 12 : n).padStart(2, '0')
  }

  function to24h(h12: string, period: 'AM' | 'PM'): string {
    const n = parseInt(h12)
    if (period === 'AM') return n === 12 ? '00' : String(n).padStart(2, '0')
    return n === 12 ? '12' : String(n + 12).padStart(2, '0')
  }

  function setHour12(h12: string) {
    setForm((f) => ({ ...f, hour: to24h(h12, f.period) }))
  }

  function setPeriod(period: 'AM' | 'PM') {
    setForm((f) => ({ ...f, period, hour: f.hour ? to24h(to12hDisplay(f.hour), period) : '' }))
  }

  const [saving, setSaving] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [draggedAppt, setDraggedAppt] = useState<Appointment | null>(null)
  const [assignError, setAssignError] = useState<string | null>(null)
  const [showLegend, setShowLegend] = useState(false)
  const legendRef = useRef<HTMLDivElement>(null)

  // day_of_week: 0=Sun, 1=Mon … 6=Sat (JS getDay() convention)
  function isDayClosed(date: Date) {
    if (businessHours.length === 0) return false
    const dow = date.getDay()
    const rule = businessHours.find((h) => h.day_of_week === dow)
    return rule ? !rule.is_open : false
  }

  function isOutsideWorkingHours(date: string, time: string): boolean {
    if (!date || !time || businessHours.length === 0) return false
    const dow = new Date(date + 'T00:00:00').getDay()
    const rule = businessHours.find((h) => h.day_of_week === dow)
    if (!rule || !rule.is_open || !rule.open_time || !rule.close_time) return false
    const [hh, mm] = time.split(':').map(Number)
    const [oh, om] = rule.open_time.split(':').map(Number)
    const [ch, cm] = rule.close_time.split(':').map(Number)
    const timeMin = hh * 60 + mm
    return timeMin < oh * 60 + om || timeMin >= ch * 60 + cm
  }

  // Require 5px movement before treating pointer-down as a drag (preserves click)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragStart(event: DragStartEvent) {
    const appt = appointments.find((a) => a.id === event.active.id)
    setDraggedAppt(appt ?? null)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setDraggedAppt(null)
    const { active, over } = event
    if (!over) return

    const apptId = active.id as string
    const [dayIndexStr, hourStr] = (over.id as string).split('-')
    const dayIndex = parseInt(dayIndexStr)
    const hour = parseInt(hourStr)

    const appt = appointments.find((a) => a.id === apptId)
    if (!appt) return

    // Skip if dropped on the same slot (compare in business timezone)
    const p = apptTzParts(appt.starts_at, timezone)
    const sameDay = weekDates[dayIndex]
    if (
      p.hour === hour &&
      p.year === sameDay.getFullYear() &&
      p.month === sameDay.getMonth() + 1 &&
      p.day === sameDay.getDate()
    ) return

    // Build the new UTC timestamp from the business-timezone wall-clock time
    const newStartsAt = wallclockToUtc(
      sameDay.getFullYear(), sameDay.getMonth() + 1, sameDay.getDate(),
      hour, 0, timezone
    )

    // Prevent dropping in the past or on a closed day
    if (newStartsAt < new Date()) return
    if (isDayClosed(newStartsAt)) return

    const duration = new Date(appt.ends_at).getTime() - new Date(appt.starts_at).getTime()
    const newEndsAt = new Date(newStartsAt.getTime() + duration)

    // Optimistic update
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === apptId
          ? { ...a, starts_at: newStartsAt.toISOString(), ends_at: newEndsAt.toISOString() }
          : a
      )
    )

    await supabase.from('appointments').update({
      starts_at: newStartsAt.toISOString(),
      ends_at: newEndsAt.toISOString(),
    }).eq('id', apptId)
  }

  const days = t.raw('calendar.days') as string[]

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  async function loadWeek(start: Date) {
    const end = new Date(start); end.setDate(start.getDate() + 7)
    const { data } = await supabase.from('appointments')
      .select('id, starts_at, ends_at, status, source, notes, clients(id, name), employees(id, name), services(id, name, price)')
      .eq('business_id', businessId).gte('starts_at', start.toISOString()).lt('starts_at', end.toISOString()).order('starts_at')
    setAppointments((data as Appointment[]) ?? [])
  }

  async function navigate(delta: number) {
    const next = new Date(weekStart); next.setDate(next.getDate() + delta * 7)
    setWeekStart(next); await loadWeek(next)
  }

  function getApptForCell(dayIndex: number, hour: number) {
    const day = weekDates[dayIndex]
    return appointments.filter((a) => {
      const p = apptTzParts(a.starts_at, timezone)
      return p.year === day.getFullYear() && p.month === day.getMonth() + 1 && p.day === day.getDate() && p.hour === hour
    })
  }

  async function saveAppointment() {
    if (!form.service_id || !form.date || !formTime) return
    const [fYear, fMonth, fDay] = form.date.split('-').map(Number)
    const [fHour, fMin] = formTime.split(':').map(Number)
    const startsAt = wallclockToUtc(fYear, fMonth, fDay, fHour, fMin, timezone)
    setSaving(true)
    setFormError(null)
    const service = services.find((s) => s.id === form.service_id)!
    const endsAt = new Date(startsAt.getTime() + service.duration_min * 60000)

    const { data, error } = await supabase.from('appointments').insert({
      business_id: businessId, client_id: form.client_id || null, employee_id: form.employee_id || null,
      service_id: form.service_id, starts_at: startsAt.toISOString(), ends_at: endsAt.toISOString(),
      notes: form.notes ? sanitizeText(form.notes) || null : null, price: service.price, status: 'confirmed', source: 'manual',
    }).select('id, starts_at, ends_at, status, source, notes, clients(id, name), employees(id, name), services(id, name, price)').single()

    if (!error && data) {
      setAppointments((prev) => [...prev, data as Appointment])
      setBookingCount((n) => n + 1)
      setShowForm(false)
      setFormError(null)
      setForm({ client_id: '', employee_id: '', service_id: '', date: '', hour: '', minute: '00', period: 'AM', notes: '' })
      router.refresh()
      fetch('/api/email/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId: data.id }),
      }).catch(() => {/* non-critical */})
    } else if (error) {
      if (error.message?.includes('slot_already_booked')) {
        setFormError('This time slot is already booked for the selected employee. Please choose a different time.')
      } else {
        setFormError('Failed to save the appointment. Please try again.')
      }
    }
    setSaving(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('appointments').update({ status }).eq('id', id)
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a))
    setSelectedAppt((a) => a?.id === id ? { ...a, status } : a)
    router.refresh()
  }

  async function deleteAppointment(id: string) {
    await supabase.from('appointments').delete().eq('id', id)
    setAppointments((prev) => prev.filter((a) => a.id !== id))
    setSelectedAppt(null)
    setConfirmDelete(false)
    router.refresh()
  }

  async function assignEmployee(apptId: string, employeeId: string) {
    setAssignError(null)
    const res = await fetch(`/api/appointments/${apptId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employee_id: employeeId || null }),
    })
    if (!res.ok) {
      setAssignError('Failed to update employee. Please try again.')
      return
    }
    const updated = await res.json()
    const newEmployee = updated.employees ?? null
    setAppointments((prev) =>
      prev.map((a) => a.id === apptId ? { ...a, employees: newEmployee } : a)
    )
    setSelectedAppt((a) => a?.id === apptId ? { ...a, employees: newEmployee } : a)
    router.refresh()
  }

  useEffect(() => {
    if (!showLegend) return
    function handleClick(e: MouseEvent) {
      if (legendRef.current && !legendRef.current.contains(e.target as Node)) {
        setShowLegend(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowLegend(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [showLegend])

  return (
    <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-6 gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-gray-100"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm font-medium text-gray-700 w-40 text-center">
            {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
            {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <button onClick={() => navigate(1)} className="p-1.5 rounded-lg hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => { const m = getMonday(new Date()); setWeekStart(m); loadWeek(m) }}
            className="text-xs px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600">
            {t('calendar.today')}
          </button>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
            <ExternalLink className="w-3 h-3" /> {t('calendar.publicPage')}
          </a>
          {/* Legend button */}
          <div className="relative" ref={legendRef}>
            <button
              onClick={() => setShowLegend((v) => !v)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              title="Color legend"
            >
              <Palette className="w-4 h-4" />
            </button>
            {showLegend && (
              <div className="absolute right-0 top-8 z-30 w-56 bg-white rounded-xl border border-gray-200 shadow-lg p-3">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Team colors</div>
                {employees.length === 0 ? (
                  <p className="text-xs text-gray-400">No team members yet</p>
                ) : (
                  <div className="space-y-1.5 mb-3">
                    {employees.map((emp) => {
                      const c = getEmployeeColor(emp.id)
                      return (
                        <div key={emp.id} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.bg, border: '1px solid rgba(0,0,0,0.1)' }} />
                          <span className="text-xs text-gray-700 truncate">{emp.name}</span>
                        </div>
                      )
                    })}
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: NO_EMPLOYEE_COLOR.bg, border: '1px solid rgba(0,0,0,0.1)' }} />
                      <span className="text-xs text-gray-500 truncate">Unassigned</span>
                    </div>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-2 mt-1">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Appointment status</div>
                  <div className="space-y-1.5">
                    {Object.entries(STATUS_STRIPE).map(([status, color]) => (
                      <div key={status} className="flex items-center gap-2">
                        <span className="w-1 h-4 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-xs text-gray-700 capitalize">{status.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Button size="sm" onClick={() => openForm()}>{t('newAppointment')}</Button>
        </div>
      </div>

      {/* Calendar grid */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="bg-white rounded-xl border border-gray-200 overflow-auto flex-1">
          <table className="w-full text-xs border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 w-14 border-b border-r border-gray-100 py-2 text-gray-400 font-normal bg-white" />
                {weekDates.map((d, i) => {
                  const isToday = d.toDateString() === new Date().toDateString()
                  return (
                    <th key={i} className={`sticky top-0 z-10 border-b border-r border-gray-100 py-2 font-medium text-center ${isToday ? 'bg-blue-50 text-blue-700' : 'text-gray-600 bg-white'}`}>
                      <div>{days[i]}</div>
                      <div className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>{d.getDate()}</div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour} className="h-14">
                  <td className="border-r border-b border-gray-100 text-right pr-2 text-gray-400 text-xs align-top pt-1 w-14">{hour}:00</td>
                  {weekDates.map((_, di) => {
                    const cellAppts = getApptForCell(di, hour)
                    return (
                      <DroppableCell
                        key={di}
                        id={`${di}-${hour}`}
                        className="border-r border-b border-gray-100 align-top p-0.5 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          if (cellAppts.length === 0) {
                            const d = weekDates[di]
                            const yyyy = d.getFullYear()
                            const mm = String(d.getMonth() + 1).padStart(2, '0')
                            const dd = String(d.getDate()).padStart(2, '0')
                            const hh = String(hour).padStart(2, '0')
                            openForm({ date: `${yyyy}-${mm}-${dd}`, hour: hh, minute: '00', period: parseInt(hh) < 12 ? 'AM' : 'PM' })
                          }
                        }}
                      >
                        {cellAppts.map((a) => {
                          const empColor = getEmployeeColor(a.employees?.id)
                          const stripe = getStatusStripe(a.status)
                          return (
                            <DraggableAppt key={a.id} id={a.id}>
                              <div
                                onClick={(e) => { e.stopPropagation(); setSelectedAppt(a) }}
                                className="rounded px-1 py-0.5 mb-0.5 cursor-grab active:cursor-grabbing text-xs"
                                style={{ backgroundColor: empColor.bg, color: empColor.text, borderLeft: `5px solid ${stripe}`, borderTop: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
                              >
                                <div className="font-semibold truncate">{a.clients?.name ?? (a.source === 'online' ? 'Online' : t('walkIn'))}</div>
                                <div className="truncate">{a.services?.name} · {formatInBusinessTimezone(a.starts_at, timezone, 'time')}</div>
                                {a.employees?.name && (
                                  <div className="truncate text-[10px] opacity-70">{a.employees.name}</div>
                                )}
                                {a.source && SOURCE_BADGE[a.source] && (
                                  <span className={`inline-block mt-0.5 text-[9px] leading-tight px-1 rounded font-medium ${SOURCE_BADGE[a.source].pill}`}>
                                    {SOURCE_BADGE[a.source].label}
                                  </span>
                                )}
                              </div>
                            </DraggableAppt>
                          )
                        })}
                      </DroppableCell>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drag overlay — shown while dragging */}
        <DragOverlay>
          {draggedAppt && (() => {
            const empColor = getEmployeeColor(draggedAppt.employees?.id)
            const stripe = getStatusStripe(draggedAppt.status)
            return (
              <div className="rounded px-2 py-1 text-xs shadow-lg w-28"
                style={{ backgroundColor: empColor.bg, color: empColor.text, borderLeft: `5px solid ${stripe}`, borderTop: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <div className="font-semibold truncate">{draggedAppt.clients?.name ?? (draggedAppt.source === 'online' ? 'Online' : t('walkIn'))}</div>
                <div className="truncate">{draggedAppt.services?.name}</div>
                {draggedAppt.employees?.name && (
                  <div className="truncate opacity-70">{draggedAppt.employees.name}</div>
                )}
              </div>
            )
          })()}
        </DragOverlay>
      </DndContext>

      {/* New appointment modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-base font-semibold mb-4">{t('form.heading')}</h2>
            {bookingLimitReached ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-orange-900">You&apos;ve used all {bookingLimit} bookings this month on the Free plan.</p>
                    <p className="text-sm text-orange-700 mt-0.5">Upgrade to Starter for unlimited bookings.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowForm(false)}>Close</Button>
                  <Link href="/pricing" className="flex-1">
                    <Button className="w-full">Upgrade →</Button>
                  </Link>
                </div>
              </div>
            ) : (
            <>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-medium">{t('form.serviceLabel')}</label>
                <select value={form.service_id} onChange={(e) => setForm((f) => ({ ...f, service_id: e.target.value }))}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">{t('form.servicePlaceholder')}</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}{s.duration_min > 0 ? ` — ${s.duration_min} min` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">{t('form.datetimeLabel')}</label>
                <div className="flex gap-2 mt-1">
                  <DatePicker
                    value={form.date}
                    onChange={(v) => setForm((f) => ({ ...f, date: v }))}
                    className="flex-1"
                  />
                  {is12h ? (
                    <>
                      <select
                        value={form.hour ? to12hDisplay(form.hour) : ''}
                        onChange={(e) => setHour12(e.target.value)}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">hh</option>
                        {hours12.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                      <select
                        value={form.minute}
                        onChange={(e) => setForm((f) => ({ ...f, minute: e.target.value }))}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select
                        value={form.period}
                        onChange={(e) => setPeriod(e.target.value as 'AM' | 'PM')}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <select
                        value={form.hour}
                        onChange={(e) => setForm((f) => ({ ...f, hour: e.target.value }))}
                        className="w-20 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">hh</option>
                        {hours24.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                      <select
                        value={form.minute}
                        onChange={(e) => setForm((f) => ({ ...f, minute: e.target.value }))}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </>
                  )}
                </div>
                {isOutsideWorkingHours(form.date, formTime) && (
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
                    ⚠ This time is outside your business hours
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">{t('form.clientLabel')}</label>
                <select value={form.client_id} onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">{t('walkIn')}</option>
                  {clientsList.map((c) => <option key={c.id} value={c.id}>{c.name}{c.phone ? ` · ${c.phone}` : ''}</option>)}
                </select>
              </div>
              {employees.length > 0 && (
                <div>
                  <label className="text-xs text-gray-500 font-medium">{t('form.employeeLabel')}</label>
                  <select value={form.employee_id} onChange={(e) => setForm((f) => ({ ...f, employee_id: e.target.value }))}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">{t('form.anyEmployee')}</option>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-500 font-medium">{t('form.notesLabel')}</label>
                <textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={2} placeholder={t('form.notesPlaceholder')}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
            </div>
            {formError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {formError}
              </div>
            )}
            <div className="flex gap-2 mt-5">
              <Button variant="outline" className="flex-1" onClick={() => setShowForm(false)}>{t('form.cancel')}</Button>
              <Button className="flex-1" onClick={saveAppointment} disabled={saving || !form.service_id || !form.date || !form.hour}>
                {saving ? t('form.saving') : t('form.save')}
              </Button>
            </div>
            </>
            )}
          </div>
        </div>
      )}

      {/* Appointment detail modal */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-base font-semibold mb-1">{selectedAppt.clients?.name ?? (selectedAppt.source === 'online' ? 'Online booking' : t('walkIn'))}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedAppt.services?.name} · {formatInBusinessTimezone(selectedAppt.starts_at, timezone, 'time')} – {formatInBusinessTimezone(selectedAppt.ends_at, timezone, 'time')}
            </p>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {selectedAppt.source && SOURCE_BADGE[selectedAppt.source] && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SOURCE_BADGE[selectedAppt.source].pill}`}>
                  {SOURCE_BADGE[selectedAppt.source].label}
                </span>
              )}
            </div>
            {employees.length > 0 && (
              <div className="mb-4">
                <label className="text-xs text-gray-400 uppercase font-medium">{t('detail.employeeLabel')}</label>
                <select
                  value={selectedAppt.employees?.id ?? ''}
                  onChange={(e) => assignEmployee(selectedAppt.id, e.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
                {assignError && (
                  <p className="mt-1 text-xs text-red-600">{assignError}</p>
                )}
              </div>
            )}
            {selectedAppt.notes && <p className="text-sm text-gray-600 mb-4 italic">{'"'}{selectedAppt.notes}{'"'}</p>}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2 uppercase font-medium">{t('detail.statusLabel')}</div>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'confirmed', 'completed', 'paid', 'cancelled', 'no_show'] as const).map((s) => (
                  <button key={s} onClick={() => updateStatus(selectedAppt.id, s)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors capitalize ${
                      selectedAppt.status === s ? statusColors[s] : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}>
                    {t(`status.${s}`)}
                  </button>
                ))}
              </div>
            </div>
            {selectedAppt.status !== 'paid' && selectedAppt.status !== 'cancelled' && (
              <Button
                className="w-full mb-2 gap-2"
                onClick={() => {
                  const params = new URLSearchParams({ bookingId: selectedAppt.id })
                  if (selectedAppt.clients?.id) params.set('clientId', selectedAppt.clients.id)
                  if (selectedAppt.services?.id) params.set('serviceId', selectedAppt.services.id)
                  if (selectedAppt.employees?.id) params.set('staffId', selectedAppt.employees.id)
                  router.push(`/pos?${params.toString()}`)
                }}
              >
                <CreditCard className="w-4 h-4" />
                {t('detail.chargeButton')}
              </Button>
            )}
            {confirmDelete ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 mb-2">
                <p className="text-sm text-red-700 font-medium mb-2">Delete this appointment?</p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white h-8 text-sm"
                    onClick={() => deleteAppointment(selectedAppt.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-8 text-sm"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full mb-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={() => setConfirmDelete(true)}
              >
                Delete appointment
              </Button>
            )}
            <Button variant="outline" className="w-full" onClick={() => { setSelectedAppt(null); setConfirmDelete(false); setAssignError(null) }}>{t('detail.close')}</Button>
          </div>
        </div>
      )}
    </div>
  )
}
