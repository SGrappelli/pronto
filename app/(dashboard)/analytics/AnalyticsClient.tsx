'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

type Period = '7d' | '30d' | 'month' | '3m'

interface KPI {
  revenue: number
  bookings: number
  newClients: number
  avgRevPerBooking: number
  prevRevenue: number
  prevBookings: number
  prevNewClients: number
  prevAvgRevPerBooking: number
}

interface DailyRevenue {
  label: string
  revenue: number
}

interface TopService {
  name: string
  bookings: number
  revenue: number
}

interface TopClient {
  name: string
  visits: number
  spent: number
}

interface AnalyticsData {
  kpi: KPI
  chart: DailyRevenue[]
  topServices: TopService[]
  topClients: TopClient[]
  dateRange: string
  currency: string
}

function pct(current: number, prev: number) {
  if (prev === 0) return current > 0 ? 100 : 0
  return Math.round(((current - prev) / prev) * 100)
}

function Delta({ current, prev }: { current: number; prev: number }) {
  const p = pct(current, prev)
  if (p > 0) return (
    <span className="flex items-center gap-0.5 text-green-600 text-xs font-medium">
      <TrendingUp className="w-3 h-3" />+{p}%
    </span>
  )
  if (p < 0) return (
    <span className="flex items-center gap-0.5 text-red-500 text-xs font-medium">
      <TrendingDown className="w-3 h-3" />{p}%
    </span>
  )
  return <span className="flex items-center gap-0.5 text-gray-400 text-xs"><Minus className="w-3 h-3" />0%</span>
}

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)
}

const PERIOD_LABELS: Record<Period, string> = {
  '7d': '7 days',
  '30d': '30 days',
  'month': 'This month',
  '3m': '3 months',
}

export function AnalyticsClient() {
  const [period, setPeriod] = useState<Period>('7d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async (p: Period) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics?period=${p}`)
      if (res.ok) setData(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(period) }, [period, load])

  const currency = data?.currency ?? 'USD'

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        <div className="flex flex-col items-start sm:items-end gap-1">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  period === p
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
          {data?.dateRange && (
            <span className="text-xs text-gray-400 px-1">{data.dateRange}</span>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 h-24 animate-pulse" />
          ))
        ) : data ? (
          <>
            <KPICard title="Total Revenue" value={fmt(data.kpi.revenue, currency)} current={data.kpi.revenue} prev={data.kpi.prevRevenue} />
            <KPICard title="Total Bookings" value={String(data.kpi.bookings)} current={data.kpi.bookings} prev={data.kpi.prevBookings} />
            <KPICard title="New Clients" value={String(data.kpi.newClients)} current={data.kpi.newClients} prev={data.kpi.prevNewClients} />
            <KPICard title="Avg. per Booking" value={fmt(data.kpi.avgRevPerBooking, currency)} current={data.kpi.avgRevPerBooking} prev={data.kpi.prevAvgRevPerBooking} />
          </>
        ) : null}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Revenue</h2>
        {loading ? (
          <div className="h-52 animate-pulse bg-gray-100 rounded-lg" />
        ) : data && data.chart.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.chart} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={50}
                tickFormatter={(v) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(v)}
              />
              <Tooltip
                formatter={(value) => [fmt(Number(value ?? 0), currency), 'Revenue']}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-52 flex items-center justify-center text-gray-400 text-sm">No data for this period</div>
        )}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Services */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Top Services</h2>
          {loading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : data && data.topServices.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-50">
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium text-right">Bookings</th>
                  <th className="pb-2 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.topServices.map((s, i) => (
                  <tr key={i}>
                    <td className="py-2 text-gray-700 truncate max-w-[140px]">{s.name}</td>
                    <td className="py-2 text-right text-gray-500">{s.bookings}</td>
                    <td className="py-2 text-right text-gray-700 font-medium">{fmt(s.revenue, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-sm">No data</p>
          )}
        </div>

        {/* Top Clients */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Top Clients</h2>
          {loading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : data && data.topClients.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-50">
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium text-right">Visits</th>
                  <th className="pb-2 font-medium text-right">Total spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.topClients.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2 text-gray-700 truncate max-w-[140px]">{c.name}</td>
                    <td className="py-2 text-right text-gray-500">{c.visits}</td>
                    <td className="py-2 text-right text-gray-700 font-medium">{fmt(c.spent, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-sm">No data</p>
          )}
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, current, prev }: { title: string; value: string; current: number; prev: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <p className="text-xs text-gray-400 font-medium mb-1">{title}</p>
      <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
      <Delta current={current} prev={prev} />
    </div>
  )
}
