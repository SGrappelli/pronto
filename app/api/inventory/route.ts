import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: business } = await supabase
    .from('businesses').select('id').eq('owner_id', user.id)
    .order('created_at', { ascending: true }).limit(1).maybeSingle()
  if (!business) {
    console.error('[inventory] authenticated owner has no business row:', user.id)
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const body = await request.json()

  const { data: item, error } = await supabase.from('inventory_items').insert({
    business_id: business.id,
    name: (body.name as string)?.trim(),
    sku: (body.sku as string) || null,
    category: (body.category as string) || null,
    unit: (body.unit as string) || 'pcs',
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
