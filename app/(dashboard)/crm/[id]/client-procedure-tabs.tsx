'use client'

import type { ReactNode } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatInBusinessTimezone } from '@/lib/utils'

interface Appointment {
  id: string
  starts_at: string
  ends_at: string
  status: string
  price: number | null
  services: { name: string } | null
  employees: { name: string } | null
}

interface Props {
  general: ReactNode
  appointments: Appointment[]
  currency: string
  timezone: string
}

// Procedures shown as tabs on the client card. A visit belongs to a procedure
// when its service name contains one of the keywords (case-insensitive).
const PROCEDURES = [
  { id: 'epilation', label: 'Электроэпиляция', keywords: ['электроэпил', 'эпиляц', 'epilat', 'electrolysis'] },
  { id: 'manicure', label: 'Маникюр', keywords: ['маникюр', 'manicure'] },
  { id: 'pedicure', label: 'Педикюр', keywords: ['педикюр', 'pedicure'] },
] as const

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-amber-100 text-amber-700',
  paid: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  no_show: 'bg-gray-100 text-gray-500',
}

const DONE_STATUSES = new Set(['completed', 'paid'])

function matches(appointment: Appointment, keywords: readonly string[]) {
  const name = appointment.services?.name?.toLowerCase() ?? ''
  return keywords.some((k) => name.includes(k))
}

const triggerClass =
  'px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 border-transparent text-gray-500 hover:text-gray-800 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 transition-colors'

export function ClientProcedureTabs({ general, appointments, currency, timezone }: Props) {
  const t = useTranslations('clientDetail')

  return (
    <Tabs.Root defaultValue="general">
      <div className="px-6 pt-4">
        <Tabs.List aria-label="Разделы карты клиента" className="flex gap-1 border-b border-gray-200 overflow-x-auto">
          <Tabs.Trigger value="general" className={triggerClass}>Общее</Tabs.Trigger>
          {PROCEDURES.map((p) => (
            <Tabs.Trigger key={p.id} value={p.id} className={triggerClass}>{p.label}</Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      <Tabs.Content value="general" className="focus:outline-none">
        {general}
      </Tabs.Content>

      {PROCEDURES.map((p) => {
        const visits = appointments.filter((a) => matches(a, p.keywords))
        const done = visits.filter((a) => DONE_STATUSES.has(a.status))
        const spent = done.reduce((sum, a) => sum + (a.price ?? 0), 0)
        const last = done[0]

        return (
          <Tabs.Content key={p.id} value={p.id} className="p-6 max-w-4xl space-y-6 focus:outline-none">
            <div className="grid grid-cols-3 gap-4">
              <Card><CardContent className="p-4">
                <div className="text-lg font-bold text-gray-900">{done.length}</div>
                <div className="text-xs text-gray-500">Процедур</div>
              </CardContent></Card>
              <Card><CardContent className="p-4">
                <div className="text-lg font-bold text-gray-900">{last ? formatInBusinessTimezone(last.starts_at, timezone) : '—'}</div>
                <div className="text-xs text-gray-500">Последняя</div>
              </CardContent></Card>
              <Card><CardContent className="p-4">
                <div className="text-lg font-bold text-gray-900">{formatCurrency(spent, currency)}</div>
                <div className="text-xs text-gray-500">Потрачено</div>
              </CardContent></Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">История: {p.label.toLowerCase()}</CardTitle>
              </CardHeader>
              <CardContent>
                {visits.length === 0 ? (
                  <p className="text-sm text-gray-400 py-4 text-center">Записей на эту процедуру пока нет</p>
                ) : (
                  <div className="space-y-3">
                    {visits.map((a) => (
                      <div key={a.id} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{a.services?.name ?? '—'}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {formatInBusinessTimezone(a.starts_at, timezone)} · {formatInBusinessTimezone(a.starts_at, timezone, 'time')}
                            {a.employees?.name && ` · ${a.employees.name}`}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-3 shrink-0">
                          {a.price != null && (
                            <span className="text-sm font-semibold text-gray-900">{formatCurrency(a.price, currency)}</span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[a.status] ?? 'bg-gray-100 text-gray-500'}`}>
                            {t(`status.${a.status}` as any)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-sm text-gray-400 text-center">
              Здесь появятся дополнительные возможности раздела «{p.label}»
            </div>
          </Tabs.Content>
        )
      })}
    </Tabs.Root>
  )
}
