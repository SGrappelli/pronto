import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as XLSX from 'xlsx'

export async function GET(_req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!business) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: items } = await supabase
    .from('inventory_items')
    .select('name,sku,barcode,category,unit,quantity,low_stock_threshold,cost_price,sell_price,description')
    .eq('business_id', business.id)
    .order('name')

  const rows = (items ?? []).map((item) => ({
    'Name':            item.name,
    'SKU':             item.sku ?? '',
    'Barcode':         item.barcode ?? '',
    'Category':        item.category ?? '',
    'Unit':            item.unit,
    'Stock':           item.quantity,
    'Low stock alert': item.low_stock_threshold,
    'Cost price':      item.cost_price ?? '',
    'Sell price':      item.sell_price ?? '',
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
