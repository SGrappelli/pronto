import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db, forBusiness } from '@/lib/db'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const business = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true },
  })
  if (!business) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const body = await request.json()

  try {
    const item = await forBusiness(business.id).inventory_items.create({
      data: {
        // Prisma's create type requires business_id; forBusiness() checks it
        // matches and rejects the write if it does not.
        business_id: business.id,
        name: (body.name as string)?.trim(),
        sku: (body.sku as string) || null,
        category: (body.category as string) || null,
        unit: (body.unit as string) || 'pcs',
        quantity: Number(body.quantity) || 0,
        cost_price: body.cost_price ? Number(body.cost_price) : null,
        sell_price: body.sell_price ? Number(body.sell_price) : null,
        low_stock_threshold: Number(body.low_stock_threshold) || 5,
      },
      select: { id: true },
    })
    return NextResponse.json({ id: item.id }, { status: 201 })
  } catch (err) {
    // P2002 is Prisma's unique-violation code — the old Postgres 23505.
    if ((err as { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'sku_taken', message: 'An item with this SKU already exists.' },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
