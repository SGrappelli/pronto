import { SupabaseClient } from '@supabase/supabase-js'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

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
 * The check-then-insert here is NOT atomic on its own: two racers can both
 * pass the pre-check and both attempt the INSERT. Once migration 036's
 * UNIQUE (owner_id) is in place the loser then gets a 23505 — which the
 * user must never see. So on ANY unique violation we re-read the owner's
 * row (retrying a few times: the winner's INSERT may have committed
 * microseconds ago and not be visible yet on this pooled connection) and
 * hand that back. Only the slug UNIQUE additionally gets a suffix retry.
 *
 * We deliberately do NOT use INSERT ... ON CONFLICT (owner_id) DO NOTHING:
 * an install that runs this build before applying migration 036 has no
 * such constraint yet, and the ON CONFLICT clause would itself error.
 * Plain INSERT + recover-by-reselect works with or without the constraint.
 *
 * Returns the row's id, or null if creation genuinely failed (caller then
 * shows a retry prompt rather than dropping into a broken session).
 */
export async function getOrCreateBusiness(
  admin: SupabaseClient,
  data: { owner_id: string; name: string; slug: string } & Record<string, unknown>
): Promise<{ id: string; slug: string } | null> {
  const findExisting = async (retry = false): Promise<{ id: string; slug: string } | null> => {
    const attempts = retry ? 4 : 1
    for (let i = 0; i < attempts; i++) {
      const { data: row } = await admin
        .from('businesses')
        .select('id, slug')
        .eq('owner_id', data.owner_id)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()
      if (row) return { id: row.id, slug: row.slug }
      if (i < attempts - 1) await sleep(100 * (i + 1))
    }
    return null
  }

  // Fast path: the row already exists (e.g. the confirmation callback firing
  // after /register already created it).
  const pre = await findExisting()
  if (pre) return pre

  const tryInsert = (row: Record<string, unknown>) =>
    admin.from('businesses').insert(row).select('id, slug').single()

  let { data: inserted, error } = await tryInsert(data)
  if (!error && inserted) return { id: inserted.id, slug: inserted.slug }

  if (error?.code === '23505') {
    // A racing signup path already created this owner's row — use theirs.
    const raced = await findExisting(true)
    if (raced) return raced

    // No row for this owner → the collision was on the slug. Retry once
    // with a random suffix.
    const suffix = Math.random().toString(36).slice(2, 6)
    ;({ data: inserted, error } = await tryInsert({ ...data, slug: `${data.slug}-${suffix}` }))
    if (!error && inserted) return { id: inserted.id, slug: inserted.slug }

    if (error?.code === '23505') {
      const racedAfterRetry = await findExisting(true)
      if (racedAfterRetry) return racedAfterRetry
    }
  }

  console.error('[create-business] could not get-or-create business for owner', data.owner_id, '-', error?.message)
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
