import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sanitizeName, sanitizeShort } from '@/lib/sanitize'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json()

  const name = sanitizeName(String(body.name ?? ''))
  if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 })

  const { data, error } = await supabase.from('inventory_items').update({
    name,
    sku: body.sku ? sanitizeShort(String(body.sku)) || null : null,
    category: body.category ? sanitizeShort(String(body.category)) || null : null,
    unit: body.unit ? sanitizeShort(String(body.unit), 20) : undefined,
    low_stock_threshold: Number(body.low_stock_threshold) || 5,
    cost_price: body.cost_price ? Number(body.cost_price) : null,
    sell_price: body.sell_price ? Number(body.sell_price) : null,
  }).eq('id', params.id).select().single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'sku_taken', message: 'An item with this SKU already exists.' },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
