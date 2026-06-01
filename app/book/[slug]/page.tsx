export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/service'
import { notFound } from 'next/navigation'
import { PublicBookingForm } from './booking-form'
import { getTelegramBotInfo } from '@/lib/telegram'
import { getViberBotInfo } from '@/lib/viber'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('businesses')
    .select('name')
    .eq('slug', params.slug)
    .maybeSingle()

  return {
    title: data ? `Book at ${data.name}` : 'Book appointment',
  }
}

export default async function PublicBookingPage({ params }: { params: { slug: string } }) {
  const supabase = createServiceClient()

  const { data: bizRaw } = await supabase
    .from('businesses')
    .select('id, name, type, phone, logo_url, currency, slug, timezone, address, subscription_tier, telegram_bot_token, viber_bot_token, meta_whatsapp_phone_number_id, owner_whatsapp')
    .eq('slug', params.slug)
    .maybeSingle()

  if (!bizRaw) notFound()

  // Destructure tokens server-side only — never passed to the client component
  const { telegram_bot_token, viber_bot_token, subscription_tier, meta_whatsapp_phone_number_id, owner_whatsapp, ...business } = bizRaw
  const whatsappNumber = meta_whatsapp_phone_number_id ? (owner_whatsapp ?? null) : null
  const isFreeTier = !subscription_tier || subscription_tier === 'free'

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
      {/* Header */}
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
          whatsappNumber={whatsappNumber}
        />
      </div>

      {isFreeTier && (
        <div className="pb-6 text-center">
          <a
            href="https://trypronto.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-500 transition-colors"
          >
            Powered by Pronto
          </a>
        </div>
      )}
    </div>
  )
}
