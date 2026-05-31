import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json()

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!business) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  // employee_id: empty string or null → unassign; UUID string → assign
  const employee_id: string | null = body.employee_id || null

  const { data, error } = await supabase
    .from('appointments')
    .update({ employee_id })
    .eq('id', params.id)
    .eq('business_id', business.id)
    .select('id, employees(id, name)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}
