import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UpgradeBanner } from '@/components/ui/upgrade-banner'
import { CrmImportButton } from '@/components/clients/crm-import-button'
import { formatCurrency, formatInBusinessTimezone } from '@/lib/utils'
import { PLAN_LIMITS } from '@/lib/lemonsqueezy'
import { Plus, Search, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function CRMPage({
  searchParams,
}: {
  searchParams: { q?: string; tag?: string; limit?: string }
}) {
  const supabase = createClient()
  const t = await getTranslations('crm')
  const { data: { user } } = await supabase.auth.getUser()

  const { data: business } = await supabase
    .from('businesses').select('id, currency, timezone, subscription_tier').eq('owner_id', user!.id).maybeSingle()

  if (!business) return null

  // Check client limit for Free plan to conditionally disable Import button
  const plan = business.subscription_tier ?? 'free'
  const clientLimit = PLAN_LIMITS[plan]?.clients ?? 100
  const clientLimitIsFinite = isFinite(clientLimit)
  let clientCountForLimit = 0
  if (clientLimitIsFinite) {
    const { count } = await supabase
      .from('clients')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', business.id)
    clientCountForLimit = count ?? 0
  }
  const importAtLimit = clientLimitIsFinite && clientCountForLimit >= clientLimit

  // ── Clients query — includes trigger-maintained aggregate fields ──────────
  // total_visits, total_spent, last_visit_at are kept in sync by the
  // update_client_stats() trigger (migration 008) on every completed transaction.
  // No separate transactions aggregation query needed.
  let query = supabase.from('clients')
    .select('id, name, phone, email, tags, created_at, total_visits, total_spent, last_visit_at')
    .eq('business_id', business.id)
    .order('name')
    .limit(50)

  if (searchParams.q) {
    query = query.or(`name.ilike.%${searchParams.q}%,phone.ilike.%${searchParams.q}%,email.ilike.%${searchParams.q}%`)
  }
  if (searchParams.tag) {
    query = query.contains('tags', [searchParams.tag])
  }

  const { data: clients } = await query

  return (
    <>
      <Header
        title={t('title')}
        actions={
          <div className="flex gap-2">
            <CrmImportButton atLimit={importAtLimit} />
            <Link href="/crm/new">
              <Button size="sm"><Plus className="w-4 h-4 mr-1" /> {t('addClient')}</Button>
            </Link>
          </div>
        }
      />
      <main className="p-6">
        {searchParams.limit === 'clients' && (
          <div className="mb-4">
            <UpgradeBanner
              title="You've reached the 100-client limit on the Free plan."
              description="Upgrade to Starter to add unlimited clients."
            />
          </div>
        )}
        <div className="mb-4 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <form>
            <input name="q" defaultValue={searchParams.q} type="search"
              placeholder={t('searchPlaceholder')}
              className="w-full max-w-sm pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
          </form>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {clients?.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <div className="text-4xl mb-3">{t('empty.icon')}</div>
              <div className="font-medium">{t('empty.heading')}</div>
              <div className="text-sm mt-1">
                <Link href="/crm/new" className="text-blue-600 hover:underline">{t('empty.action')}</Link>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                  <th className="text-left px-4 py-3 font-medium">{t('table.name')}</th>
                  <th className="text-left px-4 py-3 font-medium">{t('table.contact')}</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">{t('table.tags')}</th>
                  <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">{t('table.visits')}</th>
                  <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">{t('table.spent')}</th>
                  <th className="text-right px-4 py-3 font-medium hidden md:table-cell">{t('table.lastVisit')}</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/crm/${c.id}`} className="font-medium text-gray-900 hover:text-blue-600">{c.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <div className="flex flex-col gap-0.5">
                        {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {c.phone}</span>}
                        {c.email && <span className="flex items-center gap-1 text-xs"><Mail className="w-3 h-3" /> {c.email}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell text-gray-700">
                      {c.total_visits ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell font-medium text-gray-900">
                      {formatCurrency(Number(c.total_spent ?? 0), business.currency)}
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell text-gray-500">
                      {c.last_visit_at
                        ? formatInBusinessTimezone(c.last_visit_at, business.timezone)
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  )
}
