import { Header } from '@/components/layout/header'
import { BookingCalendar } from './booking-calendar'
import { getBusinessDb } from '@/lib/auth-user'

export default async function BookingPage() {
  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { business, db } = ctx

  const today = new Date()
  const rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const rangeEnd = new Date(today.getFullYear(), today.getMonth() + 2, 1)

  const [appointments, employees, services, clients, businessHours] = await Promise.all([
    db.appointments.findMany({
      select: {
        id: true, starts_at: true, ends_at: true, status: true, source: true, notes: true,
        clients: { select: { id: true, name: true } },
        employees: { select: { id: true, name: true } },
        services: { select: { id: true, name: true, price: true } },
      },
      where: { starts_at: { gte: rangeStart, lt: rangeEnd } },
      orderBy: { starts_at: 'asc' },
    }),
    db.employees.findMany({
      select: { id: true, name: true },
      where: { is_active: true },
    }),
    db.services.findMany({
      select: { id: true, name: true, duration_min: true, price: true },
      where: { is_active: true },
    }),
    db.clients.findMany({
      select: { id: true, name: true, phone: true },
      orderBy: { name: 'asc' },
      take: 200,
    }),
    db.business_hours.findMany({
      select: { day_of_week: true, is_open: true, open_time: true, close_time: true },
    }),
  ])

  return (
    <>
      <Header title="Booking" />
      <BookingCalendar
        businessId={business.id}
        slug={business.slug}
        timezone={business.timezone}
        appointments={appointments.map((a) => ({
          ...a,
          starts_at: a.starts_at.toISOString(),
          ends_at: a.ends_at.toISOString(),
          services: a.services ? { ...a.services, price: a.services.price.toNumber() } : null,
        }))}
        employees={employees}
        services={services.map((s) => ({ ...s, price: s.price.toNumber() }))}
        clients={clients}
        businessHours={businessHours}
      />
    </>
  )
}
