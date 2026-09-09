import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json()

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (!business) {
    console.error('[appointments/[id]] authenticated owner has no business row:', user.id)
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

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
