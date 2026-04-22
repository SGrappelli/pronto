import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatInBusinessTimezone } from '@/lib/utils'
import { Plus, Search, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function CRMPage({
  searchParams,
}: {
  searchParams: { q?: string; tag?: string }
}) {
  const supabase = createClient()
  const t = await getTranslations('crm')
  const { data: { user } } = await supabase.auth.getUser()

  const { data: business } = await supabase
    .from('businesses').select('id, currency, timezone').eq('owner_id', user!.id).maybeSingle()

  if (!business) return null

  let query = supabase.from('clients')
    .select('id, name, phone, email, tags, created_at')
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

  // Compute visits, spent, last visit, and last service name live from transactions
  const clientIds = (clients ?? []).map((c) => c.id)
  const statsMap: Record<string, { total_visits: number; total_spent: number; last_visit_at: string | null; lastService: string | null }> = {}
  if (clientIds.length > 0) {
    const { data: txs } = await supabase
      .from('transactions')
      .select('client_id, amount, created_at, items')
      .eq('business_id', business.id)
      .eq('status', 'completed')
      .in('client_id', clientIds)
      .order('created_at', { ascending: false })
      .limit(500)
    for (const tx of txs ?? []) {
      if (!tx.client_id) continue
      if (!statsMap[tx.client_id]) {
        statsMap[tx.client_id] = { total_visits: 0, total_spent: 0, last_visit_at: null, lastService: null }
      }
      statsMap[tx.client_id].total_visits++
      statsMap[tx.client_id].total_spent += tx.amount
      if (!statsMap[tx.client_id].last_visit_at) statsMap[tx.client_id].last_visit_at = tx.created_at
      if (!statsMap[tx.client_id].lastService) {
        const items = Array.isArray(tx.items) ? tx.items : []
        const name = (items[0] as any)?.name
        if (name) statsMap[tx.client_id].lastService = name
      }
    }
  }

  return (
    <>
      <Header
        title={t('title')}
        actions={
          <Link href="/crm/new">
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> {t('addClient')}</Button>
          </Link>
        }
      />
      <main className="p-6">
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
                  <th className="text-left px-4 py-3 font-medium hidden xl:table-cell">{t('table.lastService')}</th>
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
                    <td className="px-4 py-3 hidden xl:table-cell text-gray-600 text-sm">
                      {statsMap[c.id]?.lastService ?? <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell text-gray-700">{statsMap[c.id]?.total_visits ?? 0}</td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell font-medium text-gray-900">
                      {formatCurrency(statsMap[c.id]?.total_spent ?? 0, business.currency)}
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell text-gray-500">
                      {statsMap[c.id]?.last_visit_at ? formatInBusinessTimezone(statsMap[c.id]!.last_visit_at!, business.timezone) : '—'}
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
