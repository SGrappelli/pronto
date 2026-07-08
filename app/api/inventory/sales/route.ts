import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Period = 'today' | '7d' | '30d'

function getPeriodStart(period: Period): Date {
  const now = new Date()
  if (period === 'today') {
    const d = new Date(now)
    d.setHours(0, 0, 0, 0)
    return d
  }
  if (period === '7d') {
    const d = new Date(now)
    d.setDate(d.getDate() - 6)
    d.setHours(0, 0, 0, 0)
    return d
  }
  // 30d
  const d = new Date(now)
  d.setDate(d.getDate() - 29)
  d.setHours(0, 0, 0, 0)
  return d
}

interface TxItem {
  service_id?: string
  item_id?: string
  name: string
  price: number
  qty: number
}

interface Transaction {
  id: string
  created_at: string
  amount: number
  items: TxItem[]
  receipt_number: string | null
}

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: business } = await supabase
    .from('businesses').select('id, currency').eq('owner_id', user.id).maybeSingle()
  if (!business) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const fromParam = req.nextUrl.searchParams.get('from')
  const toParam = req.nextUrl.searchParams.get('to')
  const period = (req.nextUrl.searchParams.get('period') ?? '7d') as Period

  let startIso: string
  let endIso: string | null = null

  if (fromParam && toParam) {
    startIso = new Date(fromParam + 'T00:00:00').toISOString()
    const toEnd = new Date(toParam + 'T00:00:00')
    toEnd.setDate(toEnd.getDate() + 1)
    endIso = toEnd.toISOString()
  } else {
    startIso = getPeriodStart(period).toISOString()
  }

  let txQuery = supabase
    .from('transactions')
    .select('id, created_at, amount, items, receipt_number')
    .eq('business_id', business.id)
    .eq('status', 'completed')
    .gte('created_at', startIso)
    .order('created_at', { ascending: false })

  if (endIso) txQuery = txQuery.lte('created_at', endIso)

  const { data: rows } = await txQuery

  if (!rows || rows.length === 0) {
    return NextResponse.json({
      currency: business.currency,
      revenue: 0,
      units: 0,
      transactionCount: 0,
      topItems: [],
      recentSales: [],
    })
  }

  const txsWithItems = (rows as unknown as Transaction[]).filter((tx) =>
    Array.isArray(tx.items) && tx.items.some((it) => !!it.item_id)
  )

  let totalRevenue = 0
  let totalUnits = 0
  const itemMap: Record<string, { name: string; qty: number; revenue: number }> = {}

  const recentSales: {
    date: string
    receipt: string
    linesSummary: string
    total: number
  }[] = []

  for (const tx of txsWithItems) {
    const itemLines = tx.items.filter((it) => !!it.item_id)
    let txItemRevenue = 0
    let txItemUnits = 0
    const lineParts: string[] = []

    for (const it of itemLines) {
      const rev = it.price * it.qty
      txItemRevenue += rev
      txItemUnits += it.qty
      totalRevenue += rev
      totalUnits += it.qty
      lineParts.push(`${it.name} ×${it.qty}`)

      const key = it.item_id!
      if (!itemMap[key]) itemMap[key] = { name: it.name, qty: 0, revenue: 0 }
      itemMap[key].qty += it.qty
      itemMap[key].revenue += rev
    }

    if (recentSales.length < 20) {
      recentSales.push({
        date: tx.created_at,
        receipt: tx.receipt_number ?? tx.id.slice(0, 8).toUpperCase(),
        linesSummary: lineParts.join(', '),
        total: txItemRevenue,
      })
    }
  }

  const topItems = Object.entries(itemMap)
    .map(([, v]) => v)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)

  return NextResponse.json({
    currency: business.currency,
    revenue: totalRevenue,
    units: totalUnits,
    transactionCount: txsWithItems.length,
    topItems,
    recentSales,
  })
}
