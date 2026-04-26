export const dynamic = 'force-dynamic'

import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/service'
import { PublicBookingForm } from './[slug]/booking-form'
import { getTelegramBotInfo } from '@/lib/telegram'
import { getViberBotInfo } from '@/lib/viber'

export async function generateMetadata() {
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE !== 'saas') return {}
  const headersList = headers()
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host') ?? ''
  const slug = host.split('.')[0]
  if (!slug) return { title: 'Book appointment' }
  const supabase = createServiceClient()
  const { data } = await supabase.from('businesses').select('name').eq('slug', slug).maybeSingle()
  return { title: data ? `Book at ${data.name}` : 'Book appointment' }
}

export default async function PublicBookingSaasPage() {
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE !== 'saas') notFound()

  const headersList = headers()
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host') ?? ''
  const slug = host.split('.')[0]
  if (!slug) notFound()

  const supabase = createServiceClient()

  const { data: bizRaw } = await supabase
    .from('businesses')
    .select('id, name, type, phone, logo_url, currency, slug, timezone, telegram_bot_token, viber_bot_token')
    .eq('slug', slug)
    .maybeSingle()

  if (!bizRaw) notFound()

  // Destructure tokens server-side only — never passed to the client component
  const { telegram_bot_token, viber_bot_token, ...business } = bizRaw

  const [
    { data: services },
    { data: employees },
    { data: businessHours },
    telegramInfo,
    viberInfo,
  ] = await Promise.all([
    supabase
      .from('services')
      .select('id, name, description, price, duration_min, category, capacity')
      .eq('business_id', business.id)
      .eq('is_active', true)
      .order('name'),
    supabase
      .from('employees')
      .select('id, name')
      .eq('business_id', business.id)
      .eq('is_active', true)
      .order('name'),
    supabase
      .from('business_hours')
      .select('day_of_week, is_open, open_time, close_time')
      .eq('business_id', business.id)
      .order('day_of_week'),
    telegram_bot_token
      ? getTelegramBotInfo(telegram_bot_token)
      : Promise.resolve({ ok: false as const }),
    viber_bot_token
      ? getViberBotInfo(viber_bot_token)
      : Promise.resolve({ ok: false as const }),
  ])

  const telegramBotUsername = telegramInfo.ok ? (telegramInfo as { ok: true; result: { username: string } }).result?.username ?? null : null
  const viberBotUri = viberInfo.ok ? (viberInfo as { ok: true; uri?: string }).uri ?? null : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-5">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {business.logo_url ? (
            <img src={business.logo_url} alt={business.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              {business.name[0]}
            </div>
          )}
          <div>
            <h1 className="font-semibold text-gray-900">{business.name}</h1>
            {business.phone && <p className="text-sm text-gray-500">{business.phone}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <PublicBookingForm
          business={business}
          services={services ?? []}
          employees={employees ?? []}
          workingHours={businessHours ?? []}
          telegramBotUsername={telegramBotUsername}
          viberBotUri={viberBotUri}
        />
      </div>
    </div>
  )
}
