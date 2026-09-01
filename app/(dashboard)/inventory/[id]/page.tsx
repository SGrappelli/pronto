import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { getTranslations } from 'next-intl/server'
import { InventoryDetailView } from './inventory-detail-view'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getBusinessDb } from '@/lib/auth-user'

export default async function InventoryItemPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const t = await getTranslations('inventoryDetail')

  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { business, db } = ctx

  const item = await db.inventory_items.findUnique({
    where: { id: params.id },
    select: {
      id: true, name: true, sku: true, category: true, unit: true, quantity: true,
      low_stock_threshold: true, cost_price: true, sell_price: true, created_at: true, updated_at: true,
    },
  })

  if (!item) notFound()

  const [movements, categoryRows] = await Promise.all([
    db.inventory_movements.findMany({
      select: { id: true, type: true, quantity: true, note: true, created_at: true },
      where: { item_id: item.id },
      orderBy: { created_at: 'desc' },
      take: 50,
    }),
    db.inventory_items.findMany({
      select: { category: true },
      where: { category: { not: null } },
    }),
  ])

  const categories = [...new Set(categoryRows.map((r) => r.category as string))].sort()

  const itemView = {
    ...item,
    quantity: item.quantity.toNumber(),
    low_stock_threshold: item.low_stock_threshold.toNumber(),
    cost_price: item.cost_price ? item.cost_price.toNumber() : null,
    sell_price: item.sell_price ? item.sell_price.toNumber() : null,
    created_at: item.created_at.toISOString(),
    updated_at: item.updated_at.toISOString(),
  }

  const movementsView = movements.map((m) => ({
    ...m,
    quantity: m.quantity.toNumber(),
    created_at: m.created_at.toISOString(),
  }))

  return (
    <>
      <Header
        title={item.name}
        actions={
          <Link href="/inventory" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ChevronLeft className="w-4 h-4" />{t('backToInventory')}
          </Link>
        }
      />
      <InventoryDetailView
        item={itemView}
        movements={movementsView as any}
        currency={business.currency}
        timezone={business.timezone}
        businessId={business.id}
        categories={categories}
      />
    </>
  )
}
