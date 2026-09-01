import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { getTranslations } from 'next-intl/server'
import { SettingsTabs } from './settings-tabs'
import { getAuthUser, getBusinessDb } from '@/lib/auth-user'
import { db as rootDb } from '@/lib/db'

export default async function SettingsPage() {
  const t = await getTranslations('settings')
  const user = await getAuthUser()
  if (!user) redirect('/login')

  const ctx = await getBusinessDb()
  if (!ctx) redirect('/onboarding')
  const { business, db } = ctx

  if (business.currency === 'USD' || !business.currency || business.timezone === 'UTC' || !business.timezone) {
    const updatedCurrency = (business.currency === 'USD' || !business.currency) ? 'EUR' : business.currency
    const updatedTimezone = (business.timezone === 'UTC' || !business.timezone) ? 'Europe/Brussels' : business.timezone
    // businesses is the tenant root, not a tenant-scoped table — update it
    // through the bare client, scoped explicitly by id.
    await rootDb.businesses.update({ where: { id: business.id }, data: { currency: updatedCurrency, timezone: updatedTimezone } })
    business.currency = updatedCurrency
    business.timezone = updatedTimezone
  }

  const [services, employees, businessHours] = await Promise.all([
    db.services.findMany({
      select: { id: true, name: true, description: true, price: true, duration_min: true, category: true, is_active: true, capacity: true },
      orderBy: { name: 'asc' },
    }),
    db.employees.findMany({
      select: { id: true, name: true, role: true, email: true, phone: true, is_active: true },
      orderBy: { name: 'asc' },
    }),
    db.business_hours.findMany({
      select: { day_of_week: true, is_open: true, open_time: true, close_time: true, break_start: true, break_end: true },
      orderBy: { day_of_week: 'asc' },
    }),
  ])

  // Same column set as the old .select(...) — SettingsTabs expects
  // plan_expires_at as an ISO string, not a Date.
  const businessProps = {
    id: business.id,
    name: business.name,
    slug: business.slug,
    type: business.type,
    phone: business.phone,
    email: business.email,
    address: business.address,
    timezone: business.timezone,
    currency: business.currency,
    plan: business.plan,
    plan_expires_at: business.plan_expires_at ? business.plan_expires_at.toISOString() : null,
    telegram_bot_token: business.telegram_bot_token,
    telegram_chat_id: business.telegram_chat_id,
    viber_bot_token: business.viber_bot_token,
    viber_chat_id: business.viber_chat_id,
    owner_whatsapp: business.owner_whatsapp,
    email_provider: business.email_provider,
    smtp_host: business.smtp_host,
    smtp_port: business.smtp_port,
    smtp_user: business.smtp_user,
    smtp_pass: business.smtp_pass,
    smtp_from: business.smtp_from,
    resend_api_key: business.resend_api_key,
    meta_whatsapp_phone_number_id: business.meta_whatsapp_phone_number_id,
    meta_whatsapp_access_token: business.meta_whatsapp_access_token,
    wa_template_confirmation: business.wa_template_confirmation,
    wa_template_reminder: business.wa_template_reminder,
    wa_template_thankyou: business.wa_template_thankyou,
    wa_template_reactivation: business.wa_template_reactivation,
    wa_template_birthday: business.wa_template_birthday,
    wa_template_language: business.wa_template_language,
    brand_color: business.brand_color,
    notification_language: business.notification_language,
    logo_url: business.logo_url,
    enabled_modules: business.enabled_modules,
  }

  return (
    <>
      <Header title={t('title')} />
      <SettingsTabs
        business={businessProps}
        services={services.map((s) => ({ ...s, price: s.price.toNumber() }))}
        employees={employees}
        workingHours={businessHours}
        userEmail={user.email ?? ''}
      />
    </>
  )
}
