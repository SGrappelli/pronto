import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const TIER_BADGE: Record<string, { label: string; style: string }> = {
  free:    { label: 'Free',    style: 'background:#e5e7eb;color:#374151' },
  starter: { label: 'Starter', style: 'background:#dbeafe;color:#1d4ed8' },
  pro:     { label: 'Pro',     style: 'background:#ede9fe;color:#6d28d9' },
  agency:  { label: 'Agency',  style: 'background:#fef3c7;color:#92400e' },
}

function TierBadge({ tier }: { tier: string }) {
  const b = TIER_BADGE[tier] ?? { label: tier, style: 'background:#e5e7eb;color:#374151' }
  return (
    <span
      style={{
        ...Object.fromEntries(b.style.split(';').map(s => s.split(':') as [string, string])),
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {b.label}
    </span>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  // 1. Auth check — show 404 to anyone who isn't the admin
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || user?.email !== adminEmail) {
    notFound()
  }

  // 2. Fetch data with service role (bypasses RLS, can read auth.users)
  const svc = createServiceClient()

  const [{ data: businesses }, { data: { users } }] = await Promise.all([
    svc
      .from('businesses')
      .select('id, name, slug, type, subscription_tier, owner_id, created_at')
      .order('created_at', { ascending: false }),
    svc.auth.admin.listUsers({ page: 1, perPage: 1000 }),
  ])

  const rows = businesses ?? []

  // Build email lookup from auth.users
  const emailById: Record<string, string> = {}
  for (const u of users ?? []) {
    emailById[u.id] = u.email ?? '—'
  }

  // 3. Compute summary counters
  const total = rows.length
  const byTier = { free: 0, starter: 0, pro: 0, agency: 0 } as Record<string, number>
  for (const b of rows) {
    const t = b.subscription_tier ?? 'free'
    byTier[t] = (byTier[t] ?? 0) + 1
  }

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const thisWeek = rows.filter(b => b.created_at >= weekAgo).length

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '32px 40px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111', margin: 0 }}>
          Pronto Admin
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
          Logged in as {user.email}
        </p>
      </div>

      {/* Summary counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: 'Total', value: total, color: '#111' },
          { label: 'Free', value: byTier.free ?? 0, color: '#374151' },
          { label: 'Starter', value: byTier.starter ?? 0, color: '#1d4ed8' },
          { label: 'Pro', value: byTier.pro ?? 0, color: '#6d28d9' },
          { label: 'Agency', value: byTier.agency ?? 0, color: '#92400e' },
          { label: 'This week', value: thisWeek, color: '#16a34a' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px 24px',
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Business name', 'Owner email', 'Type', 'Tier', 'Created', 'Slug'].map(h => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    fontWeight: 600,
                    color: '#374151',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((b, i) => (
              <tr
                key={b.id}
                style={{
                  borderBottom: i < rows.length - 1 ? '1px solid #f3f4f6' : undefined,
                  background: i % 2 === 0 ? '#fff' : '#fafafa',
                }}
              >
                <td style={{ padding: '12px 16px', color: '#111', fontWeight: 500 }}>
                  <a
                    href={`https://${b.slug}.trypronto.app`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'none' }}
                  >
                    {b.name}
                  </a>
                </td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>
                  {emailById[b.owner_id] ?? '—'}
                </td>
                <td style={{ padding: '12px 16px', color: '#6b7280', textTransform: 'capitalize' }}>
                  {b.type ?? '—'}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <TierBadge tier={b.subscription_tier ?? 'free'} />
                </td>
                <td style={{ padding: '12px 16px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                  {formatDate(b.created_at)}
                </td>
                <td style={{ padding: '12px 16px', color: '#9ca3af', fontFamily: 'monospace', fontSize: '12px' }}>
                  {b.slug}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af' }}>
                  No businesses yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: '16px', fontSize: '12px', color: '#d1d5db', textAlign: 'right' }}>
        {total} {total === 1 ? 'business' : 'businesses'} total
      </p>
    </div>
  )
}
