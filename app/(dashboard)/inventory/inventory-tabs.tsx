'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { InventoryList } from './inventory-list'
import { SalesTab } from './sales-tab'

interface Item {
  id: string
  name: string
  sku: string | null
  barcode: string | null
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
  initialTab?: string
}

type Tab = 'items' | 'sales'

export function InventoryTabs({ items, currency, initialFilter, initialTab }: Props) {
  const t = useTranslations('inventory')
  const [activeTab, setActiveTab] = useState<Tab>(initialTab === 'sales' ? 'sales' : 'items')

  return (
    <>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-gray-200 mb-5">
        {(['items', 'sales'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      {activeTab === 'items' ? (
        <InventoryList items={items} currency={currency} initialFilter={initialFilter} />
      ) : (
        <SalesTab />
      )}
    </>
  )
}
