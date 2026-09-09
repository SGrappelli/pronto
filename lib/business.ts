import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

/**
 * The current owner's business row, or null if they have none yet.
 *
 * Always ordered by created_at with .limit(1): an owner is meant to have
 * exactly one business row (migration 036 enforces it), but if a race in
 * signup ever produced two, a bare .maybeSingle() returns NO row for a
 * "multiple rows" result — every dashboard page then reads that as "no
 * business" and renders blank with nothing logged (issue #5). Pinning to
 * the oldest row matches what app/(dashboard)/layout.tsx already shows.
 *
 * Memoised per server request (React cache()) so the layout and the page
 * it wraps share one query.
 */
export const getBusinessForOwner = cache(async (ownerId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  return data
})
