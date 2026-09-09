import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { NewClientForm } from './new-client-form'
import { getAuthUser } from '@/lib/auth-user'
import { getBusinessForOwner } from '@/lib/business'

export default async function NewClientPage() {
  const t = await getTranslations('newClient')
  const user = await getAuthUser()
  if (!user) redirect('/login')

  const business = await getBusinessForOwner(user.id)
  if (!business) redirect('/onboarding')

  return (
    <>
      <Header
        title={t('title')}
        actions={
          <Link href="/crm" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ChevronLeft className="w-4 h-4" />{t('backToClients')}
          </Link>
        }
      />
      <main className="p-6 max-w-lg">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <NewClientForm businessId={business.id} />
        </div>
      </main>
    </>
  )
}
