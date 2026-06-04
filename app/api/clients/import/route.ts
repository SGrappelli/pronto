import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface ImportRow {
  name?: string
  phone?: string
  email?: string
  notes?: string
}

/** Simple sanitizer: strip leading/trailing whitespace and enforce max length. */
function clean(s: string, max: number): string {
  return String(s).trim().slice(0, max)
}

export async function POST(req: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Get business ──────────────────────────────────────────────────────────
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (!business) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 })
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: { clients?: ImportRow[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const rawRows: ImportRow[] = Array.isArray(body?.clients) ? body.clients : []

  // ── Sanitize rows ─────────────────────────────────────────────────────────
  const sanitized = rawRows.map((row) => ({
    name:  clean(row.name  ?? '', 100),
    phone: clean(row.phone ?? '', 50),
    email: clean(row.email ?? '', 50),
    notes: clean(row.notes ?? '', 1000),
  }))

  // Skip rows where name is empty after sanitization
  const validRows = sanitized.filter((r) => r.name.length > 0)

  if (validRows.length === 0) {
    return NextResponse.json({ imported: 0, skipped: rawRows.length, errors: [] })
  }

  // ── Bulk upsert with ON CONFLICT DO NOTHING ───────────────────────────────
  // Rows without a phone get inserted as new clients (no dedup key).
  // Rows with a phone dedup against (business_id, phone).

  const withPhone    = validRows.filter((r) => r.phone.length > 0)
  const withoutPhone = validRows.filter((r) => r.phone.length === 0)

  let imported = 0
  let skipped  = rawRows.length - validRows.length // rows dropped due to empty name

  // Rows with phone — upsert with conflict target
  if (withPhone.length > 0) {
    const rows = withPhone.map((r) => ({
      business_id: business.id,
      name:        r.name,
      phone:       r.phone || null,
      email:       r.email || null,
      notes:       r.notes || null,
      tags:        [] as string[],
    }))

    const { data, error } = await supabase
      .from('clients')
      .upsert(rows, {
        onConflict: 'business_id,phone',
        ignoreDuplicates: true,
      })
      .select('id')

    if (error) {
      console.error('[import] upsert error (with phone):', error.message)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    imported += data?.length ?? 0
    skipped  += withPhone.length - (data?.length ?? 0)
  }

  // Rows without phone — plain insert (no dedup possible)
  if (withoutPhone.length > 0) {
    const rows = withoutPhone.map((r) => ({
      business_id: business.id,
      name:        r.name,
      phone:       null,
      email:       r.email || null,
      notes:       r.notes || null,
      tags:        [] as string[],
    }))

    const { data, error } = await supabase
      .from('clients')
      .insert(rows)
      .select('id')

    if (error) {
      console.error('[import] insert error (no phone):', error.message)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    imported += data?.length ?? 0
  }

  return NextResponse.json({ imported, skipped, errors: [] })
}
