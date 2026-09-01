import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as XLSX from 'xlsx'
import { db, forBusiness } from '@/lib/db'

export async function GET(_req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const business = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true },
  })

  if (!business) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const items = await forBusiness(business.id).inventory_items.findMany({
    select: {
      name: true, sku: true, barcode: true, category: true, unit: true,
      quantity: true, low_stock_threshold: true, cost_price: true,
      sell_price: true, description: true,
    },
    orderBy: { name: 'asc' },
  })

  const rows = items.map((item) => ({
    'Name':            item.name,
    'SKU':             item.sku ?? '',
    'Barcode':         item.barcode ?? '',
    'Category':        item.category ?? '',
    'Unit':            item.unit,
    'Stock':           item.quantity,
    'Low stock alert': item.low_stock_threshold,
    'Cost price':      item.cost_price?.toNumber() ?? '',
    'Sell price':      item.sell_price?.toNumber() ?? '',
    'Description':     item.description ?? '',
  }))

  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Products')

  ws['!cols'] = [
    { wch: 30 },
    { wch: 15 },
    { wch: 18 },
    { wch: 20 },
    { wch: 8  },
    { wch: 8  },
    { wch: 15 },
    { wch: 12 },
    { wch: 12 },
    { wch: 40 },
  ]

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const filename = `pronto-products-${new Date().toISOString().slice(0, 10)}.xlsx`

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
