import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MODULES, ModuleKey } from '@/lib/modules'
import { db } from '@/lib/db'

const VALID_MODULES = Object.keys(MODULES) as ModuleKey[]

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as { enabled_modules?: unknown }

  if (!Array.isArray(body.enabled_modules)) {
    return NextResponse.json({ error: 'enabled_modules must be an array' }, { status: 400 })
  }

  const modules = (body.enabled_modules as unknown[]).filter(
    (m): m is string => typeof m === 'string' && (VALID_MODULES as string[]).includes(m)
  )

  // Scoped by owner_id, not by business_id — `businesses` is the tenant table
  // itself, so forBusiness() does not apply to it.
  try {
    await db.businesses.updateMany({
      where: { owner_id: user.id },
      data: { enabled_modules: modules },
    })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
