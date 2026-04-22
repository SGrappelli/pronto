import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { POSTerminal } from './pos-terminal'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { History } from 'lucide-react'
import { formatInBusinessTimezone } from '@/lib/utils'

interface SearchParams {
  bookingId?: string
  clientId?: string
  serviceId?: string
  staffId?: string
}

export default async function POSPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: business } = await supabase
    .from('businesses')
    .select('id, currency, timezone')
    .eq('owner_id', user!.id)
    .maybeSingle()

  if (!business) return null

  const [{ data: services }, { data: employees }, { data: clients }] = await Promise.all([
    supabase
      .from('services')
      .select('id, name, price, duration_min, category')
      .eq('business_id', business.id)
      .eq('is_active', true)
      .order('name'),
    supabase
      .from('employees')
      .select('id, name')
      .eq('business_id', business.id)
      .eq('is_active', true)
      .order('name'),
    supabase
      .from('clients')
      .select('id, name, phone')
      .eq('business_id', business.id)
      .order('name')
      .limit(200),
  ])

  // ── Booking context: prefill POS from an appointment ──────────────────────
  let bookingContext: {
    bookingId: string
    clientId: string
    serviceId: string
    staffId: string
    label: string
  } | undefined

  if (searchParams.bookingId) {
    const { data: appt } = await supabase
      .from('appointments')
      .select('id, starts_at, clients(name), services(name), employees(id, name)')
      .eq('id', searchParams.bookingId)
      .eq('business_id', business.id) // security: only own business
      .maybeSingle()

    if (appt) {
      const clientName = (appt.clients as { name: string } | null)?.name ?? 'Walk-in'
      const serviceName = (appt.services as { name: string } | null)?.name ?? ''
      const tz = business.timezone ?? 'UTC'
      bookingContext = {
        bookingId: appt.id,
        clientId: searchParams.clientId ?? '',
        serviceId: searchParams.serviceId ?? '',
        staffId: searchParams.staffId ?? (appt.employees as { id: string; name: string } | null)?.id ?? '',
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
            <History className="w-4 h-4" /> Sales history
          </Link>
        }
      />
      <POSTerminal
        businessId={business.id}
        currency={business.currency}
        services={services ?? []}
        employees={employees ?? []}
        clients={clients ?? []}
        bookingContext={bookingContext}
      />
    </>
  )
}
