import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Period = '7d' | '30d' | 'month' | '3m'

function getPeriodRange(period: Period): { start: Date; end: Date; prevStart: Date; prevEnd: Date } {
  const now = new Date()
  const end = new Date(now)
  let start: Date
  let prevStart: Date
  let prevEnd: Date

  if (period === '7d') {
    start = new Date(now)
    start.setDate(start.getDate() - 6)
    start.setHours(0, 0, 0, 0)
    prevEnd = new Date(start)
    prevStart = new Date(prevEnd)
    prevStart.setDate(prevStart.getDate() - 7)
  } else if (period === '30d') {
    start = new Date(now)
    start.setDate(start.getDate() - 29)
    start.setHours(0, 0, 0, 0)
    prevEnd = new Date(start)
    prevStart = new Date(prevEnd)
    prevStart.setDate(prevStart.getDate() - 30)
  } else if (period === 'month') {
    start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
    prevStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))
    prevEnd = new Date(start)
  } else {
    // 3m
    start = new Date(now)
    start.setDate(start.getDate() - 89)
    start.setHours(0, 0, 0, 0)
    prevEnd = new Date(start)
    prevStart = new Date(prevEnd)
    prevStart.setDate(prevStart.getDate() - 90)
  }

  return { start, end, prevStart, prevEnd }
}

function formatDateRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', opts)}`
}

function groupByWeek(rows: { date: string; label: string; revenue: number }[]): { label: string; revenue: number }[] {
  // Group by ISO week (Mon–Sun). Use the last day of the week as the label
  // so "Jun 2" appears in the week that actually contains Jun 2, not May 27.
  const weekMap: Record<string, { label: string; revenue: number }> = {}
  rows.forEach(({ date, label, revenue }) => {
    // Parse ISO date safely (avoid timezone shift by splitting manually)
    const [y, m, d] = date.split('-').map(Number)
    const dt = new Date(y, m - 1, d)
    // Monday-based week: shift so Monday = 0
    const dow = (dt.getDay() + 6) % 7          // Mon=0 … Sun=6
    const weekStart = new Date(dt)
    weekStart.setDate(dt.getDate() - dow)
    const key = weekStart.toISOString().slice(0, 10)  // stable grouping key

    if (!weekMap[key]) {
      // Use the label of the LAST day that falls in this week (updated as we iterate)
      weekMap[key] = { label, revenue: 0 }
    }
    weekMap[key].revenue += revenue
    // Keep updating label so the last day seen (chronological) wins
    weekMap[key].label = label
  })
  return Object.values(weekMap)
}

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: business } = await supabase
    .from('businesses')
    .select('id, subscription_tier, currency')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!business) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const tier = business.subscription_tier ?? 'free'
  if (tier !== 'pro' && tier !== 'agency') {
    return NextResponse.json({ error: 'Upgrade required' }, { status: 403 })
  }

  const period = (req.nextUrl.searchParams.get('period') ?? '7d') as Period
  const { start, end, prevStart, prevEnd } = getPeriodRange(period)

  const startStr = start.toISOString()
  const endStr = end.toISOString()
  const prevStartStr = prevStart.toISOString()
  const prevEndStr = prevEnd.toISOString()

  // Current period data
  const [
    { data: txCurrent },
    { data: txPrev },
    { count: bookings },
    { count: prevBookings },
    { count: newClients },
    { count: prevNewClients },
    { data: apptServices },
    { data: topClientsData },
  ] = await Promise.all([
    supabase.from('transactions')
      .select('amount, created_at')
      .eq('business_id', business.id)
      .eq('status', 'completed')
      .gte('created_at', startStr)
      .lte('created_at', endStr),
    supabase.from('transactions')
      .select('amount')
      .eq('business_id', business.id)
      .eq('status', 'completed')
      .gte('created_at', prevStartStr)
      .lte('created_at', prevEndStr),
    supabase.from('appointments')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .neq('status', 'cancelled')
      .gte('starts_at', startStr)
      .lte('starts_at', endStr),
    supabase.from('appointments')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .neq('status', 'cancelled')
      .gte('starts_at', prevStartStr)
      .lte('starts_at', prevEndStr),
    supabase.from('clients')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .gte('created_at', startStr)
      .lte('created_at', endStr),
    supabase.from('clients')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .gte('created_at', prevStartStr)
      .lte('created_at', prevEndStr),
    supabase.from('appointments')
      .select('service_id, services(name), transactions(amount)')
      .eq('business_id', business.id)
      .neq('status', 'cancelled')
      .gte('starts_at', startStr)
      .lte('starts_at', endStr),
    supabase.from('transactions')
      .select('client_id, amount, clients(name)')
      .eq('business_id', business.id)
      .eq('status', 'completed')
      .gte('created_at', startStr)
      .lte('created_at', endStr)
      .not('client_id', 'is', null),
  ])

  // KPI calculations
  const revenue = (txCurrent ?? []).reduce((s, t) => s + Number(t.amount), 0)
  const prevRevenue = (txPrev ?? []).reduce((s, t) => s + Number(t.amount), 0)
  const bCount = bookings ?? 0
  const prevBCount = prevBookings ?? 0
  const avgRev = bCount > 0 ? revenue / bCount : 0
  const prevAvgRev = prevBCount > 0 ? prevRevenue / prevBCount : 0

  // Daily revenue chart
  const dailyMap: Record<string, number> = {}
  ;(txCurrent ?? []).forEach(t => {
    const day = t.created_at.slice(0, 10)
    dailyMap[day] = (dailyMap[day] ?? 0) + Number(t.amount)
  })

  // Fill all days in range
  const allDays: { date: string; label: string; revenue: number }[] = []
  const cur = new Date(start)
  cur.setHours(0, 0, 0, 0)
  while (cur <= end) {
    const key = cur.toISOString().slice(0, 10)
    const label = cur.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    allDays.push({ date: key, label, revenue: dailyMap[key] ?? 0 })
    cur.setDate(cur.getDate() + 1)
  }

  const chart = period === '3m'
    ? groupByWeek(allDays)
    : allDays.map(({ label, revenue }) => ({ label, revenue }))

  // Top services
  const serviceMap: Record<string, { bookings: number; revenue: number }> = {}
  ;(apptServices ?? []).forEach((a: any) => {
    const name = a.services?.name ?? 'Unknown'
    if (!serviceMap[name]) serviceMap[name] = { bookings: 0, revenue: 0 }
    serviceMap[name].bookings++
    if (Array.isArray(a.transactions)) {
      a.transactions.forEach((tx: any) => { serviceMap[name].revenue += Number(tx.amount) })
    }
  })
  const topServices = Object.entries(serviceMap)
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5)

  // Top clients
  const clientMap: Record<string, { name: string; visits: number; spent: number }> = {}
  ;(topClientsData ?? []).forEach((t: any) => {
    const id = t.client_id
    const name = t.clients?.name ?? 'Unknown'
    if (!clientMap[id]) clientMap[id] = { name, visits: 0, spent: 0 }
    clientMap[id].visits++
    clientMap[id].spent += Number(t.amount)
  })
  const topClients = Object.values(clientMap)
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 5)

  return NextResponse.json({
    kpi: {
      revenue,
      bookings: bCount,
      newClients: newClients ?? 0,
      avgRevPerBooking: avgRev,
      prevRevenue,
      prevBookings: prevBCount,
      prevNewClients: prevNewClients ?? 0,
      prevAvgRevPerBooking: prevAvgRev,
    },
    chart,
    topServices,
    topClients,
    dateRange: formatDateRange(start, end),
    currency: business.currency ?? 'USD',
  })
}
