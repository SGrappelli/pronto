import { cache } from 'react'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { db, forBusiness } from '@/lib/db'

export type AuthUser = { id: string; email: string | null }

// middleware.ts already calls supabase.auth.getUser() once per request (to decide
// redirects) and forwards the validated id/email via x-user-id/x-user-email —
// same mechanism as x-pathname. Reading those headers here avoids every
// dashboard page repeating that round-trip to the Supabase auth server.
// requestHeaders.set() in middleware.ts always overwrites these, so a client
// can't spoof them by sending its own X-User-Id.
//
// Falls back to a real getUser() call if the headers are absent — e.g. a
// request that reaches a Server Component without going through middleware.ts.
export const getAuthUser = cache(async (): Promise<AuthUser | null> => {
  const headersList = await headers()

  if (headersList.has('x-user-id')) {
    const id = headersList.get('x-user-id')
    if (!id) return null
    return { id, email: headersList.get('x-user-email') || null }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user ? { id: user.id, email: user.email ?? null } : null
})

// Every dashboard page needs the same two things: who is asking, and which
// business they own. `cache` dedupes both across one request, so a page and
// its children can call this freely without re-querying.
export const getBusiness = cache(async () => {
  const user = await getAuthUser()
  if (!user) return null
  return db.businesses.findFirst({ where: { owner_id: user.id } })
})

/**
 * The tenant-scoped Prisma client for the signed-in user's business, plus the
 * business row itself (pages need its currency, timezone, name, …).
 *
 * Returns null when there is no session or the user owns no business — the
 * caller decides whether that is a redirect or an empty state, same as the
 * `if (!business) return null` the Supabase version used.
 *
 *   const ctx = await getBusinessDb()
 *   if (!ctx) return null
 *   const clients = await ctx.db.clients.findMany({ orderBy: { name: 'asc' } })
 */
export const getBusinessDb = cache(async () => {
  const business = await getBusiness()
  if (!business) return null
  return { business, db: forBusiness(business.id) }
})
