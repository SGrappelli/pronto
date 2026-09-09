import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (!business) {
    console.error('[inventory/lookup] authenticated owner has no business row:', user.id)
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const barcode = new URL(req.url).searchParams.get('barcode')?.trim().slice(0, 100) ?? ''
  if (!barcode) return NextResponse.json({ found: false })

  const { data: item } = await supabase
    .from('inventory_items')
    .select('id, name, sku, barcode, description, category, unit, quantity, cost_price, sell_price, low_stock_threshold, photo_url')
    .eq('business_id', business.id)
    .eq('barcode', barcode)
    .maybeSingle()

  if (!item) return NextResponse.json({ found: false })
  return NextResponse.json({ found: true, item })
}
