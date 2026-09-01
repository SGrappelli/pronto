import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db, forBusiness } from '@/lib/db'

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json()

  // The Supabase version filtered on id alone and let RLS supply the tenant
  // check. RLS no longer applies, so the business lookup and forBusiness()
  // scope below are what stop one business from editing another's item.
  const business = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true },
  })
  if (!business) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  try {
    const data = await forBusiness(business.id).inventory_items.update({
      where: { id: params.id },
      data: {
        name: body.name,
        sku: (body.sku as string) || null,
        category: (body.category as string) || null,
        unit: body.unit,
        low_stock_threshold: Number(body.low_stock_threshold) || 5,
        cost_price: body.cost_price ? Number(body.cost_price) : null,
        sell_price: body.sell_price ? Number(body.sell_price) : null,
      },
    })
    return NextResponse.json(data)
  } catch (err) {
    const code = (err as { code?: string }).code
    // P2002 is Prisma's unique-violation code — the old Postgres 23505.
    if (code === 'P2002') {
      return NextResponse.json(
        { error: 'sku_taken', message: 'An item with this SKU already exists.' },
        { status: 409 },
      )
    }
    if (code === 'P2025') return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
