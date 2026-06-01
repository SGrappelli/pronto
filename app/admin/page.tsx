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

function relativeTime(iso: string | null): string {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return '1 day ago'
  return `${days} days ago`
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

function countryFlag(code: string): string {
  return code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  )
}

function HealthDot({ bookings30d, lastBookingAt }: {
  bookings30d: number
  lastBookingAt: string | null
}) {
  let color: string
  let title: string

  if (bookings30d > 0) {
    color = '#22c55e'
    title = 'Active — bookings in last 30 days'
  } else if (lastBookingAt) {
    const daysSince = (Date.now() - new Date(lastBookingAt).getTime()) / 86400000
    if (daysSince <= 60) {
      color = '#eab308'
      title = 'Recently active — last booking within 60 days'
    } else {
      color = '#ef4444'
      title = 'Dormant — no bookings in 60+ days'
    }
  } else {
    color = '#ef4444'
    title = 'Dormant — no bookings ever'
  }

  return (
    <span
      title={title}
      style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: color,
        marginRight: '8px',
        flexShrink: 0,
      }}
    />
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || user?.email !== adminEmail) {
    notFound()
  }

  const svc = createServiceClient()

  const [
    { data: businesses },
    { data: { users } },
    { data: allAppointments },
    { data: allClients },
  ] = await Promise.all([
    svc
      .from('businesses')
      .select('id, name, slug, type, subscription_tier, owner_id, created_at, country')
      .order('created_at', { ascending: false }),
    svc.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    svc.from('appointments').select('business_id, created_at'),
    svc.from('clients').select('business_id'),
  ])

  const rows = businesses ?? []

  // Build lookups from auth.users
  const emailById: Record<string, string> = {}
  const lastSignInById: Record<string, string> = {}
  for (const u of users ?? []) {
    emailById[u.id] = u.email ?? '—'
    if (u.last_sign_in_at) lastSignInById[u.id] = u.last_sign_in_at
  }

  // Build per-business appointment stats
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const apptCount30d: Record<string, number> = {}
  const apptLastBookingAt: Record<string, string> = {}

  for (const ap of allAppointments ?? []) {
    const id = ap.business_id
    if (ap.created_at >= thirtyDaysAgo) {
      apptCount30d[id] = (apptCount30d[id] ?? 0) + 1
    }
    if (!apptLastBookingAt[id] || ap.created_at > apptLastBookingAt[id]) {
      apptLastBookingAt[id] = ap.created_at
    }
  }

  const clientsCount: Record<string, number> = {}
  for (const cl of allClients ?? []) {
    clientsCount[cl.business_id] = (clientsCount[cl.business_id] ?? 0) + 1
  }

  // Summary counters
  const total = rows.length
  const byTier = { free: 0, starter: 0, pro: 0, agency: 0 } as Record<string, number>
  for (const b of rows) {
    const t = b.subscription_tier ?? 'free'
    byTier[t] = (byTier[t] ?? 0) + 1
  }

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const thisWeek = rows.filter(b => b.created_at >= weekAgo).length
  const activeCount = rows.filter(b => (apptCount30d[b.id] ?? 0) > 0).length

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '32px 40px', maxWidth: '1600px', margin: '0 auto' }}>

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: 'Total',      value: total,               color: '#111' },
          { label: 'Free',       value: byTier.free ?? 0,    color: '#374151' },
          { label: 'Starter',    value: byTier.starter ?? 0, color: '#1d4ed8' },
          { label: 'Pro',        value: byTier.pro ?? 0,     color: '#6d28d9' },
          { label: 'Agency',     value: byTier.agency ?? 0,  color: '#92400e' },
          { label: 'This week',  value: thisWeek,             color: '#16a34a' },
          { label: 'Active 30d', value: activeCount,          color: '#15803d' },
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
              {['Business name', 'Owner email', 'Country', 'Type', 'Tier', 'Created', 'Clients', 'Bookings 30d', 'Last booking', 'Owner last login'].map(h => (
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
            {rows.map((b, i) => {
              const bk30d = apptCount30d[b.id] ?? 0
              const lastBookingAt = apptLastBookingAt[b.id] ?? null
              const clCount = clientsCount[b.id] ?? 0
              const ownerLastLogin = lastSignInById[b.owner_id] ?? null

              return (
                <tr
                  key={b.id}
                  style={{
                    borderBottom: i < rows.length - 1 ? '1px solid #f3f4f6' : undefined,
                    background: i % 2 === 0 ? '#fff' : '#fafafa',
                  }}
                >
                  <td style={{ padding: '12px 16px', color: '#111', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <HealthDot bookings30d={bk30d} lastBookingAt={lastBookingAt} />
                      <a
                        href={`https://${b.slug}.trypronto.app`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#2563eb', textDecoration: 'none' }}
                      >
                        {b.name}
                      </a>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>
                    {emailById[b.owner_id] ?? '—'}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#374151', whiteSpace: 'nowrap' }}>
                    {b.country
                      ? <>{countryFlag(b.country)} {b.country}</>
                      : <span style={{ color: '#9ca3af' }}>—</span>}
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
                  <td style={{ padding: '12px 16px', color: clCount > 0 ? '#374151' : '#9ca3af', fontWeight: clCount > 0 ? 500 : 400 }}>
                    {clCount}
                  </td>
                  <td style={{ padding: '12px 16px', color: bk30d > 0 ? '#15803d' : '#9ca3af', fontWeight: bk30d > 0 ? 600 : 400 }}>
                    {bk30d}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {relativeTime(lastBookingAt)}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {relativeTime(ownerLastLogin)}
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af' }}>
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
