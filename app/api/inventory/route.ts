import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sanitizeName, sanitizeShort } from '@/lib/sanitize'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: business } = await supabase
    .from('businesses').select('id').eq('owner_id', user.id).maybeSingle()
  if (!business) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const body = await request.json()

  const name = sanitizeName(String(body.name ?? ''))
  if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 })

  const { data: item, error } = await supabase.from('inventory_items').insert({
    business_id: business.id,
    name,
    sku: body.sku ? sanitizeShort(String(body.sku)) || null : null,
    category: body.category ? sanitizeShort(String(body.category)) || null : null,
    unit: body.unit ? sanitizeShort(String(body.unit), 20) || 'pcs' : 'pcs',
    quantity: Number(body.quantity) || 0,
    cost_price: body.cost_price ? Number(body.cost_price) : null,
    sell_price: body.sell_price ? Number(body.sell_price) : null,
    low_stock_threshold: Number(body.low_stock_threshold) || 5,
  }).select('id').single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'sku_taken', message: 'An item with this SKU already exists.' },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ id: item.id }, { status: 201 })
}
