import { Header } from '@/components/layout/header'
import { POSTerminal } from './pos-terminal'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { History } from 'lucide-react'
import { formatInBusinessTimezone } from '@/lib/utils'
import { getBusinessDb } from '@/lib/auth-user'

interface SearchParams {
  bookingId?: string
  clientId?: string
  serviceId?: string
  staffId?: string
}

export default async function POSPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;

  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { business, db } = ctx

  const [servicesRaw, employees, clients] = await Promise.all([
    db.services.findMany({
      select: { id: true, name: true, price: true, duration_min: true, category: true },
      where: { is_active: true },
      orderBy: { name: 'asc' },
    }),
    db.employees.findMany({
      select: { id: true, name: true },
      where: { is_active: true },
      orderBy: { name: 'asc' },
    }),
    db.clients.findMany({
      select: { id: true, name: true, phone: true },
      orderBy: { name: 'asc' },
      take: 200,
    }),
  ])

  const services = servicesRaw.map((s) => ({ ...s, price: s.price.toNumber() }))

  // ── Booking context: prefill POS from an appointment ──────────────────────
  let bookingContext: {
    bookingId: string
    clientId: string
    serviceId: string
    staffId: string
    label: string
  } | undefined

  if (searchParams.bookingId) {
    const appt = await db.appointments.findFirst({
      where: { id: searchParams.bookingId },
      select: {
        id: true, starts_at: true,
        clients: { select: { name: true } },
        services: { select: { name: true } },
        employees: { select: { id: true, name: true } },
      },
    })

    if (appt) {
      const clientName = appt.clients?.name ?? 'Walk-in'
      const serviceName = appt.services?.name ?? ''
      const tz = business.timezone ?? 'UTC'
      bookingContext = {
        bookingId: appt.id,
        clientId: searchParams.clientId ?? '',
        serviceId: searchParams.serviceId ?? '',
        staffId: searchParams.staffId ?? appt.employees?.id ?? '',
        label: `${clientName} — ${serviceName} — ${formatInBusinessTimezone(appt.starts_at, tz, 'time')}`,
      }
    }
  }

  const t = await getTranslations('pos')

  return (
    <>
      <Header
        title={t('title')}
        actions={
          <Link href="/pos/history" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            <History className="w-4 h-4" /> {t('salesHistory')}
          </Link>
        }
      />
      <POSTerminal
        businessId={business.id}
        currency={business.currency}
        services={services}
        employees={employees}
        clients={clients}
        bookingContext={bookingContext}
      />
    </>
  )
}
