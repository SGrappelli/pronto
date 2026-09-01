import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db, forBusiness } from '@/lib/db'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const business = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true },
  })
  if (!business) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const barcode = new URL(req.url).searchParams.get('barcode')?.trim().slice(0, 100) ?? ''
  if (!barcode) return NextResponse.json({ found: false })

  const item = await forBusiness(business.id).inventory_items.findFirst({
    select: {
      id: true, name: true, sku: true, barcode: true, description: true,
      category: true, unit: true, quantity: true, cost_price: true,
      sell_price: true, low_stock_threshold: true, photo_url: true,
    },
    where: { barcode },
  })

  if (!item) return NextResponse.json({ found: false })
  return NextResponse.json({ found: true, item })
}
