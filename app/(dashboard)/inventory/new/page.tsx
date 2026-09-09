import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { NewInventoryForm } from './new-inventory-form'
import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/auth-user'
import { getBusinessForOwner } from '@/lib/business'

export default async function NewInventoryItemPage() {
  const supabase = await createClient()
  const t = await getTranslations('newInventoryItem')
  const user = await getAuthUser()

  const business = await getBusinessForOwner(user!.id)
  if (!business) redirect('/onboarding')

  // Fetch existing categories for the combobox autocomplete
  const { data: categoryRows } = await supabase
    .from('inventory_items')
    .select('category')
    .eq('business_id', business.id)
    .not('category', 'is', null)

  const categories = [...new Set((categoryRows ?? []).map((r) => r.category as string))].sort()

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
