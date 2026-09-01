import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatInBusinessTimezone } from '@/lib/utils'
import { Users, Package, CalendarDays, TrendingUp, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { OnboardingChecklist } from '@/components/onboarding-checklist'
import { getBusinessDb } from '@/lib/auth-user'

const STATUS_STRIPE: Record<string, string> = {
  pending:   '#94a3b8',
  confirmed: '#16a34a',
  completed: '#3b82f6',
  paid:      '#eab308',
  cancelled: '#ef4444',
  no_show:   '#f97316',
}

export default async function DashboardPage() {
  const t = await getTranslations('dashboard')

  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { business, db } = ctx

  if (!business.onboarding_completed) redirect('/onboarding')

  const todayStr = new Date().toISOString().slice(0, 10)
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  const sevenDaysAgo = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10)

  const [
    clientCount,
    apptToday,
    recentTransactions,
    upcomingAppointments,
    todayRevenue,
    inventoryItems,
    sparklineRaw,
  ] = await Promise.all([
    db.clients.count(),
    db.appointments.findMany({
      select: { id: true, status: true },
      where: { starts_at: { gte: new Date(todayStr), lt: new Date(tomorrowStr) } },
    }),
    db.transactions.findMany({
      select: { id: true, amount: true, payment_method: true, created_at: true, clients: { select: { name: true } } },
      where: { status: 'completed' },
      orderBy: { created_at: 'desc' },
      take: 5,
    }),
    db.appointments.findMany({
      select: { id: true, starts_at: true, status: true, clients: { select: { name: true } }, services: { select: { name: true } } },
      where: { starts_at: { gte: new Date() }, status: { in: ['pending', 'confirmed'] } },
      orderBy: { starts_at: 'asc' },
      take: 5,
    }),
    db.transactions.findMany({
      select: { amount: true },
      where: { status: 'completed', created_at: { gte: new Date(todayStr) } },
    }),
    db.inventory_items.findMany({
      select: { quantity: true, low_stock_threshold: true },
    }),
    db.transactions.findMany({
      select: { amount: true, created_at: true },
      where: { status: 'completed', created_at: { gte: new Date(sevenDaysAgo) } },
    }),
  ])

  const revenueToday = todayRevenue.reduce((sum, tx) => sum + tx.amount.toNumber(), 0)
  const lowStock = inventoryItems.filter(
    (item) => item.quantity.toNumber() <= item.low_stock_threshold.toNumber()
  ).length

  // Sparkline: sum revenue per day for last 7 days
  const sparklineDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    return d.toISOString().slice(0, 10)
  })
  const sparklineByDay: Record<string, number> = {}
  for (const day of sparklineDays) sparklineByDay[day] = 0
  for (const tx of sparklineRaw) {
    const day = tx.created_at.toISOString().slice(0, 10)
    if (day in sparklineByDay) sparklineByDay[day] += tx.amount.toNumber()
  }
  const sparklineValues = sparklineDays.map((d) => sparklineByDay[d])
  const sparklineMax = Math.max(...sparklineValues, 1)

  // Bookings today breakdown by status
  const apptTodayCount = apptToday.length
  const statusBreakdown: Record<string, number> = {}
  for (const a of apptToday) {
    statusBreakdown[a.status] = (statusBreakdown[a.status] ?? 0) + 1
  }
  const breakdownParts = (['confirmed', 'pending', 'completed'] as const)
    .filter((s) => (statusBreakdown[s] ?? 0) > 0)
    .map((s) => `${statusBreakdown[s]} ${s}`)

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-amber-100 text-amber-700',
    paid: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    no_show: 'bg-gray-100 text-gray-600',
  }

  return (
    <>
      <Header title={t('title')} />
      <main className="p-6 space-y-6">
        <OnboardingChecklist businessId={business.id} enabledModules={business.enabled_modules ?? ['bookings', 'pos', 'crm', 'inventory', 'notifications']} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue card — custom render for sparkline */}
          <Link href="/pos/history">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-green-50">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(revenueToday, business.currency)}</div>
                <div className="text-sm text-gray-500 mt-0.5">{t('stats.revenueToday')}</div>
                {/* Sparkline */}
                <div className="flex items-end gap-[2px] mt-2 h-6">
                  {sparklineValues.map((val, i) => {
                    const isToday = i === 6
                    const barH = Math.max(4, Math.round((val / sparklineMax) * 24))
                    return (
                      <div
                        key={i}
                        style={{
                          width: 6,
                          height: barH,
                          backgroundColor: isToday ? '#16a34a' : '#86efac',
                          borderRadius: 2,
                          flexShrink: 0,
                        }}
                      />
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Bookings today card — custom render for breakdown */}
          <Link href="/booking">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <CalendarDays className="w-4 h-4 text-blue-600" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{apptTodayCount}</div>
                <div className="text-sm text-gray-500 mt-0.5">{t('stats.appointmentsToday')}</div>
                {breakdownParts.length > 0 && (
                  <div className="mt-1 text-gray-400 truncate" style={{ fontSize: 11 }}>
                    {breakdownParts.join(' · ')}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>

          {/* Clients card */}
          <Link href="/crm">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-purple-50">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{String(clientCount ?? 0)}</div>
                <div className="text-sm text-gray-500 mt-0.5">{t('stats.totalClients')}</div>
              </CardContent>
            </Card>
          </Link>

          {/* Low stock card */}
          <Link href="/inventory">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${lowStock > 0 ? 'bg-orange-50' : 'bg-green-50'}`}>
                    <Package className={`w-4 h-4 ${lowStock > 0 ? 'text-orange-600' : 'text-green-600'}`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{lowStock > 0 ? String(lowStock) : t('stats.lowStockOk')}</div>
                <div className="text-sm text-gray-500 mt-0.5">{t('stats.lowStock')}</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                {t('upcomingAppointments.heading')}
                <Link href="/booking" className="text-sm font-normal text-blue-600 hover:underline">{t('upcomingAppointments.viewAll')}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length === 0 ? (
                <div className="text-sm text-gray-500 py-4 text-center">
                  {t('upcomingAppointments.empty')}{' '}
                  <Link href="/booking" className="text-blue-600 hover:underline">{t('upcomingAppointments.addOne')}</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 pl-3 relative">
                      {/* Status stripe */}
                      <span
                        className="absolute left-0 top-1 bottom-1"
                        style={{ width: 3, borderRadius: 2, backgroundColor: STATUS_STRIPE[a.status] ?? STATUS_STRIPE.pending }}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {a.clients?.name ?? t('upcomingAppointments.walkIn')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {a.services?.name} · {formatInBusinessTimezone(a.starts_at, business.timezone)}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[a.status]}`}>
                        {t(`appointmentStatus.${a.status}` as any)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                {t('recentSales.heading')}
                <Link href="/pos/history" className="text-sm font-normal text-blue-600 hover:underline">{t('recentSales.viewAll')}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length === 0 ? (
                <div className="text-sm text-gray-500 py-4 text-center">
                  {t('recentSales.empty')}{' '}
                  <Link href="/pos" className="text-blue-600 hover:underline">{t('recentSales.makeFirst')}</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {tx.clients?.name ?? t('recentSales.walkIn')}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {tx.payment_method} · {formatInBusinessTimezone(tx.created_at, business.timezone)}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(tx.amount.toNumber(), business.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
