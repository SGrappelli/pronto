import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Plus, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { InventoryTabs } from './inventory-tabs'
import { InventoryImportButton } from '@/components/inventory/inventory-import-button'
import { InventoryExportButton } from '@/components/inventory/inventory-export-button'
import { InventoryMoreMenu } from '@/components/inventory/inventory-more-menu'
import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/auth-user'
import { getBusinessForOwner } from '@/lib/business'

export default async function InventoryPage(
  props: {
    searchParams: Promise<{ filter?: string; tab?: string }>
  }
) {
  const searchParams = await props.searchParams;
  const supabase = await createClient()
  const t = await getTranslations('inventory')
  const user = await getAuthUser()

  const business = await getBusinessForOwner(user!.id)

  if (!business) redirect('/onboarding')

  const { data: items } = await supabase.from('inventory_items')
    .select('id, name, sku, barcode, category, unit, quantity, low_stock_threshold, cost_price, sell_price')
    .eq('business_id', business.id).order('name')

  const lowStockCount = items?.filter((i) => i.quantity <= i.low_stock_threshold).length ?? 0

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
          items={items ?? []}
          currency={business.currency}
          initialFilter={searchParams.filter}
          initialTab={searchParams.tab}
        />
      </main>
    </>
  )
}
