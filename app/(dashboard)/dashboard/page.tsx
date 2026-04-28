import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatInBusinessTimezone } from '@/lib/utils'
import { Users, Package, CalendarDays, TrendingUp, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

export default async function DashboardPage() {
  const supabase = createClient()
  const t = await getTranslations('dashboard')
  const { data: { user } } = await supabase.auth.getUser()

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name, currency, timezone, onboarding_completed')
    .eq('owner_id', user!.id)
    .maybeSingle()

  if (!business) return null

  // Новые пользователи — направляем на онбординг
  if (!business.onboarding_completed) redirect('/onboarding')

  const todayStr = new Date().toISOString().slice(0, 10)

  const [
    { count: clientCount },
    { count: apptTodayCount },
    { data: recentTransactions },
    { data: upcomingAppointments },
    { data: todayRevenue },
    { data: inventoryItems },
  ] = await Promise.all([
    supabase.from('clients').select('id', { count: 'exact', head: true }).eq('business_id', business.id),
    supabase.from('appointments').select('id', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .gte('starts_at', new Date().toISOString().slice(0, 10))
      .lt('starts_at', new Date(Date.now() + 86400000).toISOString().slice(0, 10)),
    supabase.from('transactions').select('id, amount, payment_method, created_at, clients(name)')
      .eq('business_id', business.id).eq('status', 'completed')
      .order('created_at', { ascending: false }).limit(5),
    supabase.from('appointments')
      .select('id, starts_at, status, clients(name), services(name)')
      .eq('business_id', business.id)
      .gte('starts_at', new Date().toISOString())
      .in('status', ['pending', 'confirmed'])
      .order('starts_at', { ascending: true }).limit(5),
    supabase.from('transactions').select('amount')
      .eq('business_id', business.id).eq('status', 'completed')
      .gte('created_at', todayStr),
    supabase.from('inventory_items')
      .select('quantity, low_stock_threshold')
      .eq('business_id', business.id),
  ])

  const revenueToday = todayRevenue?.reduce((sum, tx) => sum + tx.amount, 0) ?? 0
  const lowStock = (inventoryItems ?? []).filter(
    (item) => Number(item.quantity) <= Number(item.low_stock_threshold)
  ).length

  const stats = [
    { label: t('stats.revenueToday'), value: formatCurrency(revenueToday, business.currency), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', href: '/pos/history' },
    { label: t('stats.appointmentsToday'), value: String(apptTodayCount ?? 0), icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50', href: '/booking' },
    { label: t('stats.totalClients'), value: String(clientCount ?? 0), icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', href: '/crm' },
    { label: t('stats.lowStock'), value: lowStock > 0 ? String(lowStock) : t('stats.lowStockOk'), icon: Package, color: lowStock > 0 ? 'text-orange-600' : 'text-green-600', bg: lowStock > 0 ? 'bg-orange-50' : 'bg-green-50', href: '/inventory' },
  ]

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${s.bg}`}>
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
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
              {upcomingAppointments?.length === 0 ? (
                <div className="text-sm text-gray-500 py-4 text-center">
                  {t('upcomingAppointments.empty')}{' '}
                  <Link href="/booking" className="text-blue-600 hover:underline">{t('upcomingAppointments.addOne')}</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments?.map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {(a.clients as { name: string } | null)?.name ?? t('upcomingAppointments.walkIn')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(a.services as { name: string } | null)?.name} · {formatInBusinessTimezone(a.starts_at, business.timezone)}
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
              {recentTransactions?.length === 0 ? (
                <div className="text-sm text-gray-500 py-4 text-center">
                  {t('recentSales.empty')}{' '}
                  <Link href="/pos" className="text-blue-600 hover:underline">{t('recentSales.makeFirst')}</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTransactions?.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {(tx.clients as { name: string } | null)?.name ?? t('recentSales.walkIn')}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {tx.payment_method} · {formatInBusinessTimezone(tx.created_at, business.timezone)}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(tx.amount, business.currency)}
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
