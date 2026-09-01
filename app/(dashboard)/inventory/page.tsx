import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Plus, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { InventoryTabs } from './inventory-tabs'
import { InventoryImportButton } from '@/components/inventory/inventory-import-button'
import { InventoryExportButton } from '@/components/inventory/inventory-export-button'
import { InventoryMoreMenu } from '@/components/inventory/inventory-more-menu'
import { getBusinessDb } from '@/lib/auth-user'

export default async function InventoryPage(
  props: {
    searchParams: Promise<{ filter?: string; tab?: string }>
  }
) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('inventory')

  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { business, db } = ctx

  const rows = await db.inventory_items.findMany({
    select: {
      id: true, name: true, sku: true, barcode: true, category: true, unit: true,
      quantity: true, low_stock_threshold: true, cost_price: true, sell_price: true,
    },
    orderBy: { name: 'asc' },
  })

  const items = rows.map((i) => ({
    id: i.id,
    name: i.name,
    sku: i.sku,
    barcode: i.barcode,
    category: i.category,
    unit: i.unit,
    quantity: i.quantity.toNumber(),
    low_stock_threshold: i.low_stock_threshold.toNumber(),
    cost_price: i.cost_price ? i.cost_price.toNumber() : null,
    sell_price: i.sell_price ? i.sell_price.toNumber() : null,
  }))

  const lowStockCount = items.filter((i) => i.quantity <= i.low_stock_threshold).length

  return (
    <>
      <Header
        title={t('title')}
        actions={
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <InventoryImportButton />
              <InventoryExportButton />
            </div>
            <InventoryMoreMenu />
            <Link href="/inventory/new">
              <Button size="sm"><Plus className="w-4 h-4 mr-1" /> {t('addItem')}</Button>
            </Link>
          </div>
        }
      />
      <main className="p-6">
        {lowStockCount > 0 && (
          <div className="mb-4 flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-3 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {lowStockCount === 1
              ? t('lowStockAlert', { count: lowStockCount })
              : t('lowStockAlertPlural', { count: lowStockCount })}
          </div>
        )}

        <InventoryTabs
          items={items}
          currency={business.currency}
          initialFilter={searchParams.filter}
          initialTab={searchParams.tab}
        />
      </main>
    </>
  )
}
