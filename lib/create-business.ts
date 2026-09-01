import { forBusiness } from '@/lib/db'

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
  businessId: string,
  user: { email?: string | null; user_metadata?: Record<string, unknown> | null }
): Promise<void> {
  try {
    await forBusiness(businessId).employees.create({
      data: {
        business_id: businessId,
        name: deriveOwnerName(user),
        email: user.email ?? null,
        is_active: true,
      },
    })
  } catch (err) {
    // Best-effort, same as before: a failure here must not fail registration.
    console.error('[create-business] failed to auto-create owner employee:', (err as Error).message)
  }
}
