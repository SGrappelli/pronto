import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Get-or-create the business row for `data.owner_id`.
 *
 * A given owner must own exactly one business row. Two signup paths can each
 * try to create one for the same owner — app/(auth)/register/actions.ts
 * right after signUp(), and app/auth/callback/route.ts after email / OAuth
 * confirmation — and a double-submitted register form adds a third racer.
 * When more than one row lands, app/(dashboard)/layout.tsx still renders
 * (it reads with .order(created_at).limit(1)) so the sidebar looks fine,
 * while every page that queries businesses-by-owner with a bare
 * .maybeSingle() gets a "multiple rows" result and renders blank, with
 * nothing in the logs (issue #5).
 *
 * So this reuses an existing row if one is already there — both before
 * inserting and again if the insert trips a unique-constraint violation
 * (the owner_id UNIQUE from migration 036, or a racing path that inserted
 * between our check and our insert). Only a slug collision gets the
 * suffix-and-retry treatment.
 *
 * Returns the row's id, or null if creation genuinely failed (caller then
 * redirects to /account-setup-error rather than into a broken session).
 */
export async function getOrCreateBusiness(
  admin: SupabaseClient,
  data: { owner_id: string; name: string; slug: string } & Record<string, unknown>
): Promise<{ id: string; slug: string } | null> {
  const findExisting = async (): Promise<{ id: string; slug: string } | null> => {
    const { data: row } = await admin
      .from('businesses')
      .select('id, slug')
      .eq('owner_id', data.owner_id)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()
    return row ? { id: row.id, slug: row.slug } : null
  }

  const pre = await findExisting()
  if (pre) return pre

  const { data: inserted, error } = await admin
    .from('businesses')
    .insert(data)
    .select('id, slug')
    .single()
  if (!error && inserted) return { id: inserted.id, slug: inserted.slug }

  if (error?.code === '23505') {
    // Unique violation. If it's owner_id, a racing signup path already
    // created the row — hand that one back.
    const raced = await findExisting()
    if (raced) return raced

    // Otherwise it's the slug constraint — retry once with a random suffix.
    const suffix = Math.random().toString(36).slice(2, 6)
    const { data: retried, error: retryError } = await admin
      .from('businesses')
      .insert({ ...data, slug: `${data.slug}-${suffix}` })
      .select('id, slug')
      .single()
    if (!retryError && retried) return { id: retried.id, slug: retried.slug }

    const racedAfterRetry = await findExisting()
    if (racedAfterRetry) return racedAfterRetry
  }

  console.error('[create-business] failed to create business row:', error?.message)
  return null
}

/** Best-effort display name for a newly registered owner, from whatever account data exists at signup time. */
function deriveOwnerName(user: { email?: string | null; user_metadata?: Record<string, unknown> | null }): string {
  const fullName = user.user_metadata?.full_name
  if (typeof fullName === 'string' && fullName.trim()) return fullName.trim()

  const email = user.email
  if (email) {
    const local = email.split('@')[0].replace(/[._-]+/g, ' ').trim()
    if (local) return local.replace(/\b\w/g, (c) => c.toUpperCase())
  }

  return 'Owner'
}

/**
 * Every new business starts with zero rows in `employees`, and nothing in
 * onboarding ever prompts the owner to add one — but the "Anyone" (auto-
 * assign) booking path requires at least one active employee to exist, or
 * every booking attempt fails with a misleading "slot already booked" error
 * (ported from the SaaS repo, where this was found via a real support
 * ticket: a business had 0 employees and every booking attempt failed).
 * Auto-creating the owner as the first active employee at signup closes
 * that gap. Self-hosted has no existing-business backfill to run — every
 * self-hosted install is a single business, so this only matters for new
 * registrations going forward.
 */
export async function insertOwnerAsEmployee(
  admin: SupabaseClient,
  businessId: string,
  user: { email?: string | null; user_metadata?: Record<string, unknown> | null }
): Promise<void> {
  const { error } = await admin.from('employees').insert({
    business_id: businessId,
    name: deriveOwnerName(user),
    email: user.email ?? null,
    is_active: true,
  })
  if (error) console.error('[create-business] failed to auto-create owner employee:', error.message)
}
