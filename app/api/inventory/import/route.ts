import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const clean = (s: string, max = 500) => s?.trim().slice(0, max) ?? ''

interface ImportRow {
  name?: string
  sku?: string
  barcode?: string
  category?: string
  unit?: string
  quantity?: string
  cost_price?: string
  sell_price?: string
  description?: string
}

function parseNum(val: string | undefined): number | null {
  if (!val) return null
  const n = parseFloat(String(val).replace(',', '.'))
  return isNaN(n) ? null : n
}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!business) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 })
  }

  let body: { rows?: ImportRow[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const rawRows: ImportRow[] = Array.isArray(body?.rows) ? body.rows : []

  const sanitized = rawRows
    .map((row) => ({
      name:        clean(String(row.name ?? ''), 200),
      sku:         row.sku     ? clean(String(row.sku),     50) : '',
      barcode:     row.barcode ? clean(String(row.barcode), 100) : '',
      category:    row.category ? clean(String(row.category), 100) : '',
      unit:        row.unit    ? clean(String(row.unit), 20) : 'pcs',
      quantity:    String(row.quantity ?? '0'),
      cost_price:  String(row.cost_price ?? ''),
      sell_price:  String(row.sell_price ?? ''),
      description: row.description ? clean(String(row.description), 1000) : '',
    }))
    .filter((r) => r.name.length > 0)

  const skippedEmpty = rawRows.length - sanitized.length

  if (sanitized.length === 0) {
    return NextResponse.json({ imported: 0, skipped: rawRows.length, errors: [] })
  }

  const { data: existing } = await supabase
    .from('inventory_items')
    .select('barcode, sku, name')
    .eq('business_id', business.id)

  const existingBarcodes = new Set(
    (existing ?? []).filter((e) => e.barcode).map((e) => e.barcode as string)
  )
  const existingSkus = new Set(
    (existing ?? []).filter((e) => e.sku).map((e) => e.sku as string)
  )
  const existingNames = new Set(
    (existing ?? [])
      .filter((e) => !e.barcode && !e.sku)
      .map((e) => (e.name as string).toLowerCase().trim())
  )

  let skippedDupes = 0
  const toInsert: typeof sanitized = []

  for (const row of sanitized) {
    if (row.barcode && existingBarcodes.has(row.barcode)) {
      skippedDupes++
      continue
    }
    if (!row.barcode && row.sku && existingSkus.has(row.sku)) {
      skippedDupes++
      continue
    }
    if (!row.barcode && !row.sku && existingNames.has(row.name.toLowerCase().trim())) {
      skippedDupes++
      continue
    }
    if (row.barcode) existingBarcodes.add(row.barcode)
    if (row.sku)     existingSkus.add(row.sku)
    if (!row.barcode && !row.sku) existingNames.add(row.name.toLowerCase().trim())
    toInsert.push(row)
  }

  if (toInsert.length === 0) {
    return NextResponse.json({ imported: 0, skipped: skippedEmpty + skippedDupes, errors: [] })
  }

  const rows = toInsert.map((r) => ({
    business_id:         business.id,
    name:                r.name,
    sku:                 r.sku  || null,
    barcode:             r.barcode || null,
    category:            r.category || null,
    unit:                r.unit || 'pcs',
    quantity:            parseNum(r.quantity) ?? 0,
    cost_price:          parseNum(r.cost_price),
    sell_price:          parseNum(r.sell_price),
    description:         r.description || null,
    low_stock_threshold: 5,
  }))

  const { data: inserted, error: insertError } = await supabase
    .from('inventory_items')
    .insert(rows)
    .select('id')

  if (insertError) {
    console.error('[inventory/import] insert error:', insertError.message)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  const imported = inserted?.length ?? 0
  const skipped  = skippedEmpty + skippedDupes + (toInsert.length - imported)

  return NextResponse.json({ imported, skipped, errors: [] })
}
