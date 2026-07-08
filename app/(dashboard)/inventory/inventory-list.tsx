'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Item {
  id: string
  name: string
  sku: string | null
  category: string | null
  unit: string
  quantity: number
  low_stock_threshold: number
  cost_price: number | null
  sell_price: number | null
}

interface Props {
  items: Item[]
  currency: string
  initialFilter?: string
}

export function InventoryList({ items, currency, initialFilter }: Props) {
  const t = useTranslations('inventory')
  const [query, setQuery] = useState(initialFilter ?? '')

  const filtered = query.trim()
    ? items.filter((i) => {
        const q = query.toLowerCase()
        return (
          i.name.toLowerCase().includes(q) ||
          (i.sku ?? '').toLowerCase().includes(q)
        )
      })
    : items

  return (
    <>
      {/* Search */}
      <div className="mb-4 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or SKU…"
          className="w-full max-w-sm pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            {query ? (
              <>
                <div className="text-4xl mb-3">🔍</div>
                <div className="font-medium">No items match {'"'}{query}{'"'}</div>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3">{t('empty.icon')}</div>
                <div className="font-medium">{t('empty.heading')}</div>
                <div className="text-sm mt-1">
                  <Link href="/inventory/new" className="text-blue-600 hover:underline">{t('empty.action')}</Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                <th className="text-left px-4 py-3 font-medium">{t('table.name')}</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">{t('table.category')}</th>
                <th className="text-right px-4 py-3 font-medium">{t('table.stock')}</th>
                <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">{t('table.cost')}</th>
                <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">{t('table.sellPrice')}</th>
                <th className="text-center px-4 py-3 font-medium">{t('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isLow = item.quantity <= item.low_stock_threshold
                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/inventory/${item.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {item.name}
                      </Link>
                      {item.sku && <div className="text-xs text-gray-400">{item.sku}</div>}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500">{item.category ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-medium">
                      <span className={isLow ? 'text-red-600' : 'text-gray-900'}>
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell text-gray-500">
                      {item.cost_price != null ? formatCurrency(item.cost_price, currency) : '—'}
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell text-gray-700">
                      {item.sell_price != null ? formatCurrency(item.sell_price, currency) : '—'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isLow
                        ? <Badge variant="warning">{t('status.lowStock')}</Badge>
                        : <Badge variant="success">{t('status.ok')}</Badge>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
