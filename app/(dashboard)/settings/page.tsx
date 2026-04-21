import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { SettingsTabs } from './settings-tabs'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name, slug, type, phone, email, address, timezone, currency, plan, plan_expires_at, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id, owner_whatsapp, ls_customer_id, email_provider, smtp_host, smtp_port, smtp_user, smtp_pass, smtp_from, resend_api_key, meta_whatsapp_phone_number_id, meta_whatsapp_access_token')
    .eq('owner_id', user!.id)
    .maybeSingle()

  const [
    { data: services },
    { data: employees },
    { data: businessHours },
  ] = await Promise.all([
    supabase
      .from('services')
      .select('id, name, description, price, duration_min, category, is_active, capacity')
      .eq('business_id', business!.id)
      .order('name'),
    supabase
      .from('employees')
      .select('id, name, role, email, phone, is_active')
      .eq('business_id', business!.id)
      .order('name'),
    supabase
      .from('business_hours')
      .select('day_of_week, is_open, open_time, close_time')
      .eq('business_id', business!.id)
      .order('day_of_week'),
  ])

  return (
    <>
      <Header title="Settings" />
      <SettingsTabs
        business={business!}
        services={services ?? []}
        employees={employees ?? []}
        workingHours={businessHours ?? []}
        userEmail={user!.email ?? ''}
      />
    </>
  )
}
