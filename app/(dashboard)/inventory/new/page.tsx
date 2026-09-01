import { Header } from '@/components/layout/header'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { NewInventoryForm } from './new-inventory-form'
import { getBusinessDb } from '@/lib/auth-user'

export default async function NewInventoryItemPage() {
  const t = await getTranslations('newInventoryItem')

  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { db } = ctx

  // Fetch existing categories for the combobox autocomplete
  const categoryRows = await db.inventory_items.findMany({
    where: { category: { not: null } },
    select: { category: true },
  })

  const categories = [...new Set(categoryRows.map((r) => r.category as string))].sort()

  return (
    <>
      <Header
        title={t('title')}
        actions={
          <Link href="/inventory" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ChevronLeft className="w-4 h-4" />{t('backToInventory')}
          </Link>
        }
      />
      <main className="p-6 max-w-lg">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <NewInventoryForm categories={categories} />
        </div>
      </main>
    </>
  )
}
