'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { formatCurrency, formatInBusinessTimezone } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { sanitizeShort } from '@/lib/sanitize'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-react'
import { UnitSelect } from '../unit-select'
import { CategoryCombobox } from '../category-combobox'

interface Movement {
  id: string
  type: 'in' | 'out' | 'adjustment'
  quantity: number
  note: string | null
  created_at: string
}

interface Item {
  id: string
  name: string
  sku: string | null
  category: string | null
  unit: string
  quantity: number
  low_stock_threshold: number
  cost_price: number | null
  sell_price: number | null
}

interface Props {
  item: Item
  movements: Movement[]
  currency: string
  timezone: string
  businessId: string
  categories: string[]
}

export function InventoryDetailView({ item: initial, movements: initialMovements, currency, timezone, businessId, categories }: Props) {
  const supabase = createClient()
  const router = useRouter()
  const t = useTranslations('inventoryDetail')
  const [item, setItem] = useState(initial)
  const [movements, setMovements] = useState(initialMovements)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: initial.name,
    sku: initial.sku ?? '',
    category: initial.category ?? '',
    unit: initial.unit,
    low_stock_threshold: String(initial.low_stock_threshold),
    cost_price: String(initial.cost_price ?? ''),
    sell_price: String(initial.sell_price ?? ''),
  })
  const [saving, setSaving] = useState(false)
  const [skuError, setSkuError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [movForm, setMovForm] = useState({ type: 'in' as 'in' | 'out' | 'adjustment', quantity: '', note: '' })
  const [movSaving, setMovSaving] = useState(false)

  const isLow = item.quantity <= item.low_stock_threshold

  async function saveItem() {
    setSaving(true)
    setSkuError('')
    const res = await fetch(`/api/inventory/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        sku: form.sku,
        category: form.category,
        unit: form.unit,
        low_stock_threshold: form.low_stock_threshold,
        cost_price: form.cost_price,
        sell_price: form.sell_price,
      }),
    })
    if (res.status === 409) {
      const json = await res.json()
      if (json.error === 'sku_taken') setSkuError(json.message)
      setSaving(false)
      return
    }
    if (res.ok) {
      const data = await res.json()
      setItem({ ...item, ...data })
      setEditing(false)
      router.refresh()
    }
    setSaving(false)
  }

  async function deleteItem() {
    await supabase.from('inventory_items').delete().eq('id', item.id)
    window.location.href = '/inventory'
  }

  async function addMovement() {
    if (!movForm.quantity) return
    setMovSaving(true)

    const qty = Number(movForm.quantity)
    const { data: mov } = await supabase.from('inventory_movements').insert({
      business_id: businessId,
      item_id: item.id,
      type: movForm.type,
      quantity: qty,
      note: movForm.note ? sanitizeShort(movForm.note, 500) || null : null,
    }).select().single()

    if (mov) {
      const newQty = movForm.type === 'adjustment'
        ? qty
        : movForm.type === 'in'
          ? item.quantity + qty
          : Math.max(0, item.quantity - qty)

      // Persist new quantity to DB
      await supabase.from('inventory_items').update({ quantity: newQty }).eq('id', item.id)

      setMovements((prev) => [mov as Movement, ...prev])
      setItem((i) => ({ ...i, quantity: newQty }))
      setMovForm({ type: 'in', quantity: '', note: '' })

      // Fire low-stock alert if quantity dropped below threshold
      if (newQty <= item.low_stock_threshold) {
        fetch('/api/email/low-stock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId: item.id }),
        }).catch(() => {/* non-critical */})
      }
    }
    setMovSaving(false)
    router.refresh()
  }

  const movTypeLabel: Record<string, string> = {
    in: t('movements.typeIn'),
    out: t('movements.typeOut'),
    adjustment: t('movements.typeAdjustment'),
  }

  const movTypeColor: Record<string, string> = {
    in: 'text-green-600',
    out: 'text-red-500',
    adjustment: 'text-blue-500',
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Item info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                {item.name}
                {isLow
                  ? <Badge variant="warning">Low stock</Badge>
                  : <Badge variant="success">OK</Badge>}
              </span>
              <div className="flex items-center gap-1">
                {!editing && (
                  <button onClick={() => setEditing(true)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                )}
                {confirmDelete ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">{t('deleteConfirm')}</span>
                    <button onClick={deleteItem} className="text-xs px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      {t('deleteButton')}
                    </button>
                    <button onClick={() => setConfirmDelete(false)} className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
                      {t('cancelButton')}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(true)} className="p-1.5 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.name')}</label>
                  <input type="text" value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.sku')}</label>
                  <input type="text" value={form.sku}
                    onChange={(e) => { setForm((f) => ({ ...f, sku: e.target.value })); skuError && setSkuError('') }}
                    className={`w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      skuError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'
                    }`} />
                  {skuError && <p className="mt-1 text-xs text-red-500">{skuError}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.category')}</label>
                  <div className="mt-1">
                    <CategoryCombobox
                      value={form.category}
                      onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                      categories={categories}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.unit')}</label>
                  <div className="mt-1">
                    <UnitSelect
                      value={form.unit}
                      onChange={(v) => setForm((f) => ({ ...f, unit: v }))}
                    />
                  </div>
                </div>

                {([
                  { key: 'cost_price', label: t('fields.costPrice'), type: 'number' },
                  { key: 'sell_price', label: t('fields.sellPrice'), type: 'number' },
                  { key: 'low_stock_threshold', label: t('fields.lowStockThreshold'), type: 'number' },
                ] as { key: keyof typeof form; label: string; type: string }[]).map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="text-xs font-medium text-gray-500">{label}</label>
                    <input type={type} value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" onClick={() => setEditing(false)}>{t('cancelButton')}</Button>
                  <Button size="sm" onClick={saveItem} disabled={saving}>{saving ? '…' : t('saveButton')}</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-400">{t('stock.current')}</span>
                  <span className={`text-2xl font-bold ${isLow ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.quantity} <span className="text-sm font-normal text-gray-500">{item.unit}</span>
                  </span>
                </div>
                {[
                  { label: t('fields.sku'), value: item.sku },
                  { label: t('fields.category'), value: item.category },
                  { label: t('fields.costPrice'), value: item.cost_price != null ? formatCurrency(item.cost_price, currency) : null },
                  { label: t('fields.sellPrice'), value: item.sell_price != null ? formatCurrency(item.sell_price, currency) : null },
                  { label: t('fields.lowStockThreshold'), value: `${item.low_stock_threshold} ${item.unit}` },
                ].filter((r) => r.value).map((row) => (
                  <div key={row.label} className="flex gap-2 justify-between">
                    <span className="text-gray-400">{row.label}</span>
                    <span className="text-gray-700 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add movement */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t('stock.addMovement')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500">{t('stock.type')}</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(['in', 'out', 'adjustment'] as const).map((tp) => (
                    <button key={tp} onClick={() => setMovForm((f) => ({ ...f, type: tp }))}
                      className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                        movForm.type === tp ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}>
                      {tp === 'in' ? t('stock.typeIn') : tp === 'out' ? t('stock.typeOut') : t('stock.typeAdjustment')}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">{t('stock.quantity')}</label>
                <input type="number" min={0} value={movForm.quantity}
                  onChange={(e) => setMovForm((f) => ({ ...f, quantity: e.target.value }))}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">{t('stock.note')}</label>
                <input type="text" value={movForm.note}
                  onChange={(e) => setMovForm((f) => ({ ...f, note: e.target.value }))}
                  placeholder={t('stock.notePlaceholder')}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <Button className="w-full" onClick={addMovement} disabled={movSaving || !movForm.quantity}>
                {movSaving ? t('stock.saving') : t('stock.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movement history */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t('movements.heading')}</CardTitle>
        </CardHeader>
        <CardContent>
          {movements.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">{t('movements.empty')}</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase">
                  <th className="text-left py-2 font-medium">{t('movements.table.date')}</th>
                  <th className="text-left py-2 font-medium">{t('movements.table.type')}</th>
                  <th className="text-right py-2 font-medium">{t('movements.table.quantity')}</th>
                  <th className="text-left py-2 font-medium hidden sm:table-cell">{t('movements.table.note')}</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((m) => (
                  <tr key={m.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 pr-4 text-gray-500">
                      <div>{formatInBusinessTimezone(m.created_at, timezone)}</div>
                      <div className="text-xs">{formatInBusinessTimezone(m.created_at, timezone, 'time')}</div>
                    </td>
                    <td className="py-2 pr-4">
                      <span className={`font-medium capitalize ${movTypeColor[m.type]}`}>
                        {movTypeLabel[m.type]}
                      </span>
                    </td>
                    <td className={`py-2 text-right font-semibold ${movTypeColor[m.type]}`}>
                      {m.type === 'out' ? '−' : m.type === 'in' ? '+' : '='}{m.quantity} {item.unit}
                    </td>
                    <td className="py-2 pl-4 text-gray-500 hidden sm:table-cell">{m.note ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
