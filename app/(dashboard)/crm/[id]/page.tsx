import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { getTranslations } from 'next-intl/server'
import { ClientDetailView } from './client-detail-view'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getTelegramBotInfo } from '@/lib/telegram'
import { getBusinessDb } from '@/lib/auth-user'

export default async function ClientDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const t = await getTranslations('clientDetail')

  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { business, db } = ctx

  const client = await db.clients.findUnique({
    where: { id: params.id },
    select: {
      id: true, name: true, phone: true, email: true, birthday: true, notes: true, tags: true,
      total_visits: true, total_spent: true, last_visit_at: true, created_at: true,
      telegram_id: true, viber_user_id: true, whatsapp_number: true,
    },
  })

  if (!client) notFound()

  const telegramInfo = business.telegram_bot_token
    ? await getTelegramBotInfo(business.telegram_bot_token)
    : { ok: false as const }
  const telegramBotUsername = telegramInfo.ok
    ? (telegramInfo as { ok: true; result?: { username: string } }).result?.username ?? null
    : null

  const appointments = await db.appointments.findMany({
    where: { client_id: client.id },
    select: {
      id: true, starts_at: true, ends_at: true, status: true, price: true,
      services: { select: { name: true } },
      employees: { select: { name: true } },
    },
    orderBy: { starts_at: 'desc' },
    take: 20,
  })

  const clientView = {
    id: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
    birthday: client.birthday ? client.birthday.toISOString().slice(0, 10) : null,
    notes: client.notes,
    tags: client.tags,
    total_visits: client.total_visits,
    total_spent: client.total_spent.toNumber(),
    last_visit_at: client.last_visit_at ? client.last_visit_at.toISOString() : null,
    created_at: client.created_at.toISOString(),
    telegram_id: client.telegram_id,
    viber_user_id: client.viber_user_id,
    whatsapp_number: client.whatsapp_number,
  }

  const appointmentsView = appointments.map((a) => ({
    id: a.id,
    starts_at: a.starts_at.toISOString(),
    ends_at: a.ends_at.toISOString(),
    status: a.status,
    price: a.price ? a.price.toNumber() : null,
    services: a.services ? { name: a.services.name } : null,
    employees: a.employees ? { name: a.employees.name } : null,
  }))

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
        client={clientView}
        appointments={appointmentsView}
        currency={business.currency}
        timezone={business.timezone}
        businessId={business.id}
        telegramBotUsername={telegramBotUsername}
      />
    </>
  )
}
