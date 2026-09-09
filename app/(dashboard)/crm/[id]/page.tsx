import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { getTranslations } from 'next-intl/server'
import { ClientDetailView } from './client-detail-view'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getTelegramBotInfo } from '@/lib/telegram'
import { getAuthUser } from '@/lib/auth-user'
import { getBusinessForOwner } from '@/lib/business'

export default async function ClientDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  const t = await getTranslations('clientDetail')
  const user = await getAuthUser()

  const business = await getBusinessForOwner(user!.id)
  if (!business) redirect('/onboarding')

  const { data: client } = await supabase
    .from('clients')
    .select('id, name, phone, email, birthday, notes, tags, total_visits, total_spent, last_visit_at, created_at, telegram_id, viber_user_id, whatsapp_number')
    .eq('id', params.id)
    .eq('business_id', business.id)
    .maybeSingle()

  if (!client) notFound()

  const telegramInfo = business.telegram_bot_token
    ? await getTelegramBotInfo(business.telegram_bot_token)
    : { ok: false as const }
  const telegramBotUsername = telegramInfo.ok
    ? (telegramInfo as { ok: true; result?: { username: string } }).result?.username ?? null
    : null

  const { data: appointments } = await supabase
    .from('appointments')
    .select('id, starts_at, ends_at, status, price, services(name), employees(name)')
    .eq('client_id', client.id)
    .eq('business_id', business.id)
    .order('starts_at', { ascending: false })
    .limit(20)

  return (
    <>
      <Header
        title={client.name}
        actions={
          <Link href="/crm" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ChevronLeft className="w-4 h-4" />{t('backToClients')}
          </Link>
        }
      />
      <ClientDetailView
        client={client}
        appointments={appointments ?? []}
        currency={business.currency}
        timezone={business.timezone}
        businessId={business.id}
        telegramBotUsername={telegramBotUsername}
      />
    </>
  )
}
