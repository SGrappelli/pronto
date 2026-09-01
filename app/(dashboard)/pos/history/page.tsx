import { Prisma } from '@/lib/db'
import { Header } from '@/components/layout/header'
import { formatCurrency, formatInBusinessTimezone } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { HistoryFilters } from './history-filters'
import { getBusinessDb } from '@/lib/auth-user'

export default async function TransactionHistoryPage(
  props: {
    searchParams: Promise<{ method?: string; from?: string; to?: string; client?: string }>
  }
) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('transactions')

  const ctx = await getBusinessDb()
  if (!ctx) return null
  const { business, db } = ctx

  const where: Prisma.transactionsWhereInput = { status: 'completed' }

  if (searchParams.method) where.payment_method = searchParams.method
  if (searchParams.from || searchParams.to) {
    where.created_at = {}
    if (searchParams.from) where.created_at.gte = new Date(searchParams.from)
    if (searchParams.to) {
      const toDate = new Date(searchParams.to)
      toDate.setDate(toDate.getDate() + 1)
      where.created_at.lt = new Date(toDate.toISOString().slice(0, 10))
    }
  }

  // ── Client name filter ──────────────────────────────────────────────────────
  if (searchParams.client?.trim()) {
    const q = searchParams.client.trim()

    // Find clients whose name matches the query
    const matched = await db.clients.findMany({
      select: { id: true },
      where: { name: { contains: q, mode: 'insensitive' } },
    })

    const ids = matched.map((c) => c.id)
    const walkInMatch = 'walk-in'.includes(q.toLowerCase()) || q.toLowerCase().includes('walk')

    if (ids.length > 0 && walkInMatch) {
      // Matching clients OR walk-ins
      where.OR = [{ client_id: { in: ids } }, { client_id: null }]
    } else if (ids.length > 0) {
      // Only matching named clients — exclude walk-ins
      where.client_id = { in: ids }
    } else if (walkInMatch) {
      // Only walk-ins
      where.client_id = null
    } else {
      // No matches at all
      where.id = '00000000-0000-0000-0000-000000000000'
    }
  }

  const transactions = await db.transactions.findMany({
    select: {
      id: true, receipt_number: true, amount: true, payment_method: true, status: true,
      items: true, created_at: true,
      clients: { select: { id: true, name: true } },
      employees: { select: { name: true } },
    },
    where,
    orderBy: { created_at: 'desc' },
    take: 100,
  })

  const total = transactions.reduce((sum, tx) => sum + tx.amount.toNumber(), 0)

  const methods = [
    { value: '', label: t('filters.allMethods') },
    { value: 'cash', label: t('filters.cash') },
    { value: 'card', label: t('filters.card') },
    { value: 'transfer', label: t('filters.transfer') },
  ]

  return (
    <>
      <Header title={t('title')} />
      <main className="p-6 space-y-4">
        {/* Filters */}
        <HistoryFilters
          from={searchParams.from ?? ''}
          to={searchParams.to ?? ''}
          method={searchParams.method ?? ''}
          client={searchParams.client ?? ''}
          methods={methods}
        />

        {/* Total */}
        {transactions.length > 0 && (
          <div className="flex justify-end">
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm font-semibold text-green-700">
              {t('total')} {formatCurrency(total, business.currency)}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {transactions.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <div className="text-4xl mb-3">🧾</div>
              <div className="font-medium">{t('empty')}</div>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                  <th className="text-left px-4 py-3 font-medium">{t('table.receipt')}</th>
                  <th className="text-left px-4 py-3 font-medium">{t('table.client')}</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">{t('table.employee')}</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">{t('table.items')}</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">{t('table.method')}</th>
                  <th className="text-right px-4 py-3 font-medium">{t('table.amount')}</th>
                  <th className="text-right px-4 py-3 font-medium hidden md:table-cell">{t('table.date')}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  const items = (Array.isArray(tx.items) ? tx.items : []) as any[]
                  const firstName: string = items[0]?.name ?? ''
                  const extraCount = items.length - 1
                  const client = tx.clients
                  const employee = tx.employees

                  return (
                    <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{tx.receipt_number}</td>
                      <td className="px-4 py-3">
                        {client
                          ? <Link href={`/crm/${client.id}`} className="font-medium text-gray-900 hover:text-blue-600">{client.name}</Link>
                          : <span className="text-gray-400">{t('walkIn')}</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                        {employee?.name ?? t('unassigned')}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {firstName
                          ? <span className="text-gray-900">{firstName}{extraCount > 0 && <span className="text-gray-400 ml-1">{t('moreItems', { count: extraCount })}</span>}</span>
                          : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="capitalize text-gray-600">{tx.payment_method}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatCurrency(tx.amount.toNumber(), business.currency)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500 hidden md:table-cell">
                        <div>{formatInBusinessTimezone(tx.created_at, business.timezone)}</div>
                        <div className="text-xs">{formatInBusinessTimezone(tx.created_at, business.timezone, 'time')}</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  )
}
