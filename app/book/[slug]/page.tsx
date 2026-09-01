export const dynamic = 'force-dynamic'

import { db, forBusiness } from '@/lib/db'
import { notFound } from 'next/navigation'
import { PublicBookingForm } from './booking-form'
import { getTelegramBotInfo } from '@/lib/telegram'
import { getViberBotInfo } from '@/lib/viber'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const data = await db.businesses.findUnique({
    select: { name: true },
    where: { slug: params.slug },
  })

  return {
    title: data ? `Book at ${data.name}` : 'Book appointment',
  }
}

export default async function PublicBookingPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  // Public page: the business is identified by its slug, not by a session.
  // Everything below is scoped to whatever business that slug resolves to.
  const business = await db.businesses.findUnique({
    select: {
      id: true, name: true, type: true, phone: true, logo_url: true,
      currency: true, slug: true, timezone: true, address: true, brand_color: true,
    },
    where: { slug: params.slug },
  })

  if (!business) notFound()

  // Tokens fetched server-side only — never serialised to the client
  const bizTokens = await db.businesses.findUnique({
    select: { telegram_bot_token: true, viber_bot_token: true },
    where: { id: business.id },
  })

  const tdb = forBusiness(business.id)

  const [rawServices, employees, businessHours, telegramInfo, viberInfo] = await Promise.all([
    tdb.services.findMany({
      select: {
        id: true, name: true, description: true, price: true,
        duration_min: true, category: true, capacity: true,
      },
      where: { is_active: true },
      orderBy: { name: 'asc' },
    }),
    tdb.employees.findMany({
      select: { id: true, name: true },
      where: { is_active: true },
      orderBy: { name: 'asc' },
    }),
    tdb.business_hours.findMany({
      select: {
        day_of_week: true, is_open: true, open_time: true, close_time: true,
        break_start: true, break_end: true,
      },
      orderBy: { day_of_week: 'asc' },
    }),
    bizTokens?.telegram_bot_token
      ? getTelegramBotInfo(bizTokens.telegram_bot_token)
      : Promise.resolve({ ok: false as const }),
    bizTokens?.viber_bot_token
      ? getViberBotInfo(bizTokens.viber_bot_token)
      : Promise.resolve({ ok: false as const }),
  ])

  // price is a Prisma.Decimal; the client form expects a plain number.
  const services = rawServices.map((s) => ({ ...s, price: s.price.toNumber() }))

  const telegramBotUsername = telegramInfo.ok ? (telegramInfo as { ok: true; result: { username: string } }).result?.username ?? null : null
  const viberBotUri = viberInfo.ok ? (viberInfo as { ok: true; uri?: string }).uri ?? null : null

  const brandColor = business.brand_color || '#2D2926'

  return (
    <div
      style={{
        '--brand': brandColor,
        '--brand-light': `${brandColor}18`,
      } as React.CSSProperties}
    >
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '0.5px solid #E8E0D8', padding: '14px 16px' }}>
        <div style={{ maxWidth: 448, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          {business.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={business.logo_url} alt={business.name} style={{ width: 38, height: 38, borderRadius: 10, objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 500, fontSize: 16 }}>
              {business.name[0]}
            </div>
          )}
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#2D2926' }}>{business.name}</div>
            <div style={{ fontSize: 12, color: '#9A8E85' }}>Book an appointment</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ background: '#FBF8F5', minHeight: 'calc(100vh - 67px)', padding: '20px 16px' }}>
        <div style={{ maxWidth: 448, margin: '0 auto' }}>
          <PublicBookingForm
            business={business}
            services={services}
            employees={employees}
            workingHours={businessHours}
            telegramBotUsername={telegramBotUsername}
            viberBotUri={viberBotUri}
          />
        </div>
      </div>
    </div>
  )
}
