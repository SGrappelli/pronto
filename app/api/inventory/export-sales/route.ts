import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db, forBusiness } from '@/lib/db'
import * as XLSX from 'xlsx'

type Period = 'today' | '7d' | '30d'

function getPeriodStart(period: Period): Date {
  const now = new Date()
  if (period === 'today') {
    const d = new Date(now); d.setHours(0, 0, 0, 0); return d
  }
  if (period === '7d') {
    const d = new Date(now); d.setDate(d.getDate() - 6); d.setHours(0, 0, 0, 0); return d
  }
  const d = new Date(now); d.setDate(d.getDate() - 29); d.setHours(0, 0, 0, 0); return d
}

interface TxItem {
  service_id?: string
  item_id?: string
  name: string
  price: number
  qty: number
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const business = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true, currency: true },
  })

  if (!business) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const fromParam = req.nextUrl.searchParams.get('from')
  const toParam   = req.nextUrl.searchParams.get('to')
  const period    = (req.nextUrl.searchParams.get('period') ?? '7d') as Period

  let startIso: string
  let endIso: string | null = null
  let fileFrom: string
  let fileTo: string

  if (fromParam && toParam) {
    startIso = new Date(fromParam + 'T00:00:00').toISOString()
    const toEnd = new Date(toParam + 'T00:00:00')
    toEnd.setDate(toEnd.getDate() + 1)
    endIso = toEnd.toISOString()
    fileFrom = fromParam
    fileTo   = toParam
  } else {
    startIso = getPeriodStart(period).toISOString()
    fileFrom = startIso.slice(0, 10)
    fileTo   = new Date().toISOString().slice(0, 10)
  }

  const tdb = forBusiness(business.id)

  const txRows = await tdb.transactions.findMany({
    select: {
      id: true, created_at: true, receipt_number: true,
      payment_method: true, items: true, client_id: true,
    },
    where: {
      status: 'completed',
      created_at: { gte: new Date(startIso), ...(endIso ? { lte: new Date(endIso) } : {}) },
    },
    orderBy: { created_at: 'desc' },
  })

  const clientIds = [...new Set(
    txRows.filter((t) => t.client_id).map((t) => t.client_id as string)
  )]

  const clientMap: Record<string, string> = {}
  if (clientIds.length > 0) {
    // The Supabase version filtered on id alone and let RLS keep it in-tenant.
    // tdb re-adds the business_id filter now that RLS no longer applies.
    const clients = await tdb.clients.findMany({
      select: { id: true, name: true },
      where: { id: { in: clientIds } },
    })
    for (const c of clients) clientMap[c.id] = c.name
  }

  interface ExportRow {
    Date: string
    Time: string
    Receipt: string
    Client: string
    Product: string
    Qty: number
    'Unit price': number
    'Line total': number
    'Payment method': string
  }

  const exportRows: ExportRow[] = []

  for (const tx of txRows ?? []) {
    const lines = (tx.items as unknown as TxItem[]).filter((i) => !!i.item_id)
    if (lines.length === 0) continue

    const d = new Date(tx.created_at)
    const date = d.toLocaleDateString('en-GB')
    const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    const clientName = tx.client_id ? (clientMap[tx.client_id] ?? 'Walk-in') : 'Walk-in'
    const receipt = tx.receipt_number ?? tx.id.slice(0, 8).toUpperCase()

    for (const line of lines) {
      exportRows.push({
        'Date':           date,
        'Time':           time,
        'Receipt':        receipt,
        'Client':         clientName,
        'Product':        line.name,
        'Qty':            line.qty,
        'Unit price':     line.price,
        'Line total':     line.price * line.qty,
        'Payment method': tx.payment_method,
      })
    }
  }

  if (exportRows.length > 0) {
    exportRows.push({
      'Date':           '',
      'Time':           '',
      'Receipt':        '',
      'Client':         '',
      'Product':        'TOTAL',
      'Qty':            exportRows.reduce((s, r) => s + r['Qty'], 0),
      'Unit price':     0,
      'Line total':     exportRows.reduce((s, r) => s + r['Line total'], 0),
      'Payment method': '',
    })
  }

  const ws = XLSX.utils.json_to_sheet(exportRows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sales')

  ws['!cols'] = [
    { wch: 12 },
    { wch: 8  },
    { wch: 14 },
    { wch: 22 },
    { wch: 30 },
    { wch: 6  },
    { wch: 12 },
    { wch: 12 },
    { wch: 16 },
  ]

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const filename = `pronto-sales-${fileFrom}-${fileTo}.xlsx`

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
