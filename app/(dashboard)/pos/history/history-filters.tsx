'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/ui/date-picker'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
  from: string
  to: string
  method: string
  client: string
  methods: { value: string; label: string }[]
}

export function HistoryFilters({ from, to, method, client, methods }: Props) {
  const router = useRouter()
  const t = useTranslations('transactions')
  const [fromVal, setFromVal] = useState(from)
  const [toVal, setToVal] = useState(to)
  const [methodVal, setMethodVal] = useState(method)
  const [clientVal, setClientVal] = useState(client)

  function apply() {
    const params = new URLSearchParams()
    if (fromVal) params.set('from', fromVal)
    if (toVal) params.set('to', toVal)
    if (methodVal) params.set('method', methodVal)
    if (clientVal.trim()) params.set('client', clientVal.trim())
    router.push(`/pos/history?${params.toString()}`)
  }

  function clear() {
    setFromVal('')
    setToVal('')
    setMethodVal('')
    setClientVal('')
    router.push('/pos/history')
  }

  const hasFilters = fromVal || toVal || methodVal || clientVal.trim()

  return (
    <div className="flex flex-wrap gap-3 items-end bg-white rounded-xl border border-gray-200 p-4">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t('filters.client')}</label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={clientVal}
            onChange={(e) => setClientVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && apply()}
            placeholder={t('filters.clientPlaceholder')}
            className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t('filters.from')}</label>
        <DatePicker value={fromVal} onChange={setFromVal} className="w-36" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t('filters.to')}</label>
        <DatePicker value={toVal} onChange={setToVal} className="w-36" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{t('table.method')}</label>
        <select
          value={methodVal}
          onChange={(e) => setMethodVal(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {methods.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>
      <button
        onClick={apply}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        {t('filters.apply')}
      </button>
      {hasFilters && (
        <button
          onClick={clear}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
        >
          {t('filters.clear')}
        </button>
      )}
    </div>
  )
}
