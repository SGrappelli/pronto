import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db, forBusiness } from '@/lib/db'

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json()

  const business = await db.businesses.findFirst({
    where: { owner_id: user.id },
    select: { id: true },
  })

  if (!business) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  // employee_id: empty string or null → unassign; UUID string → assign
  const employee_id: string | null = body.employee_id || null

  // forBusiness() adds the business_id filter, so an appointment belonging to
  // another business is simply not found — Prisma throws P2025 rather than
  // updating it.
  try {
    const data = await forBusiness(business.id).appointments.update({
      where: { id: params.id },
      data: { employee_id },
      select: { id: true, employees: { select: { id: true, name: true } } },
    })
    return NextResponse.json(data)
  } catch (err) {
    const notFound = (err as { code?: string }).code === 'P2025'
    return NextResponse.json(
      { error: notFound ? 'not_found' : (err as Error).message },
      { status: notFound ? 404 : 500 },
    )
  }
}
