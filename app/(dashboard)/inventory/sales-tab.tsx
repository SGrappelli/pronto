'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { ShoppingBag, Download } from 'lucide-react'

type Period = 'today' | '7d' | '30d'
const PERIODS: Period[] = ['today', '7d', '30d']

interface TopItem {
  name: string
  qty: number
  revenue: number
}

interface RecentSale {
  date: string
  receipt: string
  linesSummary: string
  total: number
}

interface SalesData {
  currency: string
  revenue: number
  units: number
  transactionCount: number
  topItems: TopItem[]
  recentSales: RecentSale[]
}

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(n)
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function SalesTab() {
  const t = useTranslations('inventory')

  const [period, setPeriod] = useState<Period>('7d')
  const [data, setData] = useState<SalesData | null>(null)
  const [loading, setLoading] = useState(true)

  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const [activeRange, setActiveRange] = useState<{ from: string; to: string } | null>(null)

  const load = useCallback(async (p: Period, range?: { from: string; to: string }) => {
    setLoading(true)
    try {
      const url = range
        ? `/api/inventory/sales?from=${range.from}&to=${range.to}`
        : `/api/inventory/sales?period=${p}`
      const res = await fetch(url)
      if (res.ok) setData(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeRange) {
      load(period, activeRange)
    } else {
      load(period)
    }
  }, [period, activeRange, load])

  function applyCustomRange() {
    if (!customFrom || !customTo) return
    setActiveRange({ from: customFrom, to: customTo })
  }

  function clearCustomRange() {
    setActiveRange(null)
    setCustomFrom('')
    setCustomTo('')
  }

  const [exportLoading, setExportLoading] = useState(false)

  async function handleExportSales() {
    setExportLoading(true)
    try {
      const url = activeRange
        ? `/api/inventory/export-sales?from=${activeRange.from}&to=${activeRange.to}`
        : `/api/inventory/export-sales?period=${period}`
      const res = await fetch(url)
      if (!res.ok) return
      const blob = await res.blob()
      const objUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objUrl
      const cd = res.headers.get('Content-Disposition') ?? ''
      const match = cd.match(/filename="([^"]+)"/)
      a.download = match ? match[1] : 'sales.xlsx'
      a.click()
      URL.revokeObjectURL(objUrl)
    } finally {
      setExportLoading(false)
    }
  }

  const currency = data?.currency ?? 'USD'
  const hasData = data && (data.revenue > 0 || data.transactionCount > 0)

  return (
    <div className="space-y-5">
      {/* Period switcher */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => { clearCustomRange(); setPeriod(p) }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                period === p && !activeRange
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t(`sales.periods.${p}`)}
            </button>
          ))}
        </div>

        {/* Custom date range */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 hidden sm:inline">{t('sales.customRange')}</span>
          <input
            type="date"
            value={customFrom}
            onChange={(e) => setCustomFrom(e.target.value)}
            className={`border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeRange ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
            placeholder={t('sales.from')}
          />
          <span className="text-gray-400 text-xs">→</span>
          <input
            type="date"
            value={customTo}
            onChange={(e) => setCustomTo(e.target.value)}
            className={`border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeRange ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
            placeholder={t('sales.to')}
          />
          <button
            onClick={applyCustomRange}
            disabled={!customFrom || !customTo}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('sales.apply')}
          </button>
          {activeRange && (
            <button
              onClick={clearCustomRange}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              ✕
            </button>
          )}
        </div>

        {/* Export to Excel */}
        <button
          onClick={handleExportSales}
          disabled={exportLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
        >
          <Download className="w-4 h-4" />
          {exportLoading ? '…' : t('sales.exportExcel')}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 h-20 animate-pulse" />
          ))
        ) : (
          <>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                {t('sales.revenue')}
              </div>
              <div className="text-2xl font-bold text-gray-900">{fmt(data?.revenue ?? 0, currency)}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                {t('sales.unitsSold')}
              </div>
              <div className="text-2xl font-bold text-gray-900">{data?.units ?? 0}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                {t('sales.transactions')}
              </div>
              <div className="text-2xl font-bold text-gray-900">{data?.transactionCount ?? 0}</div>
            </div>
          </>
        )}
      </div>

      {/* Empty state */}
      {!loading && !hasData && (
        <div className="bg-white rounded-xl border border-gray-100 py-16 flex flex-col items-center gap-3 text-gray-400">
          <ShoppingBag className="w-10 h-10 opacity-30" />
          <p className="text-sm">{t('sales.noSales')}</p>
        </div>
      )}

      {/* Top Items */}
      {(loading || (hasData && (data?.topItems?.length ?? 0) > 0)) && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">{t('sales.topItems')}</h2>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-50">
                  <th className="pb-2 font-medium">{t('table.name')}</th>
                  <th className="pb-2 font-medium text-right">{t('sales.unitsSold')}</th>
                  <th className="pb-2 font-medium text-right">{t('sales.revenue')}</th>
                </tr>
              </thead>
              <tbody>
                {data!.topItems.map((item, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 text-gray-900">{item.name}</td>
                    <td className="py-2 text-right text-gray-600">{item.qty}</td>
                    <td className="py-2 text-right font-medium text-gray-900">{fmt(item.revenue, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Recent Sales */}
      {(loading || (hasData && (data?.recentSales?.length ?? 0) > 0)) && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">{t('sales.recentSales')}</h2>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-50">
                    <th className="pb-2 font-medium">{t('sales.colDate')}</th>
                    <th className="pb-2 font-medium hidden sm:table-cell">{t('sales.colReceipt')}</th>
                    <th className="pb-2 font-medium">{t('sales.colItems')}</th>
                    <th className="pb-2 font-medium text-right">{t('sales.colTotal')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data!.recentSales.map((sale, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 text-gray-500 whitespace-nowrap pr-3">{fmtDate(sale.date)}</td>
                      <td className="py-2 text-gray-400 text-xs hidden sm:table-cell pr-3">{sale.receipt}</td>
                      <td className="py-2 text-gray-700 max-w-[180px] truncate">{sale.linesSummary}</td>
                      <td className="py-2 text-right font-medium text-gray-900 whitespace-nowrap">{fmt(sale.total, currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
