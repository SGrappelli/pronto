'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'
const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash2, CalendarDays, DollarSign, Clock, UserCheck } from 'lucide-react'
import { DatePicker } from '@/components/ui/date-picker'

interface Appointment {
  id: string
  starts_at: string
  ends_at: string
  status: string
  price: number | null
  services: { name: string } | null
  employees: { name: string } | null
}

interface Client {
  id: string
  name: string
  phone: string | null
  email: string | null
  birthday: string | null
  notes: string | null
  tags: string[]
  total_visits: number
  total_spent: number
  last_visit_at: string | null
  created_at: string
  telegram_id: string | null
  viber_user_id: string | null
  whatsapp_number: string | null
}

interface Props {
  client: Client
  appointments: Appointment[]
  currency: string
  businessId: string
  telegramBotUsername: string | null
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  no_show: 'bg-gray-100 text-gray-500',
}

export function ClientDetailView({ client: initial, appointments, currency, businessId, telegramBotUsername }: Props) {
  const supabase = createClient()
  const router = useRouter()
  const t = useTranslations('clientDetail')
  const [client, setClient] = useState(initial)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: initial.name,
    phone: initial.phone ?? '',
    email: initial.email ?? '',
    birthday: initial.birthday ?? '',
    notes: initial.notes ?? '',
    tags: initial.tags.join(', '),
    whatsapp_number: initial.whatsapp_number ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const telegramInviteLink = telegramBotUsername
    ? `https://t.me/${telegramBotUsername}?start=client_${initial.id}`
    : null

  function copyTelegramLink() {
    if (!telegramInviteLink) return
    navigator.clipboard.writeText(telegramInviteLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  async function save() {
    setSaving(true)
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    const { data } = await supabase.from('clients').update({
      name: form.name,
      phone: form.phone || null,
      email: form.email || null,
      birthday: form.birthday || null,
      notes: form.notes || null,
      tags,
      whatsapp_number: form.whatsapp_number || null,
    }).eq('id', client.id).select().single()

    if (data) setClient({ ...client, ...data })
    setSaving(false)
    setEditing(false)
    router.refresh()
  }

  async function deleteClient() {
    await supabase.from('clients').delete().eq('id', client.id)
    router.refresh()
    router.push('/crm')
  }

  const stats = [
    { label: t('stats.totalVisits'), value: String(client.total_visits), icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t('stats.totalSpent'), value: formatCurrency(client.total_spent, currency), icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: t('stats.lastVisit'), value: client.last_visit_at ? formatDate(client.last_visit_at) : t('stats.never'), icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: t('stats.clientSince'), value: formatDate(client.created_at), icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-lg font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Client info card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              {client.name}
              <div className="flex items-center gap-2">
                {!editing && (
                  <button onClick={() => setEditing(true)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                )}
                {confirmDelete ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">{t('deleteConfirm')}</span>
                    <button onClick={deleteClient} className="text-xs px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      {t('deleteButton')}
                    </button>
                    <button onClick={() => setConfirmDelete(false)} className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">
                      {t('cancelButton')}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(true)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editing ? (
              <div className="space-y-3">
                {([
                  { key: 'name', label: t('fields.name'), type: 'text' },
                  { key: 'phone', label: t('fields.phone'), type: 'tel' },
                  { key: 'email', label: t('fields.email'), type: 'email' },
                ] as { key: keyof typeof form; label: string; type: string }[]).map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="text-xs font-medium text-gray-500">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.birthday')}</label>
                  <DatePicker
                    value={form.birthday}
                    onChange={(v) => setForm((f) => ({ ...f, birthday: v }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.whatsappNumber')}</label>
                  <input
                    type="tel"
                    value={form.whatsapp_number}
                    onChange={(e) => setForm((f) => ({ ...f, whatsapp_number: e.target.value }))}
                    placeholder="+79001234567"
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.tags')}</label>
                  <input type="text" value={form.tags}
                    onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                    placeholder={t('fields.tagsPlaceholder')}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">{t('fields.notes')}</label>
                  <textarea value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    rows={3} placeholder={t('fields.notesPlaceholder')}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" onClick={() => setEditing(false)}>{t('cancelButton')}</Button>
                  <Button size="sm" onClick={save} disabled={saving || !form.name}>
                    {saving ? '…' : t('saveButton')}
                  </Button>
                </div>

                {/* Messenger connection status — read-only, set via bot /link command */}
                <div className="pt-3 border-t border-gray-100 space-y-1.5">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t('fields.messengers')}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Telegram</span>
                    {client.telegram_id
                      ? <span className="text-green-600 font-medium">{t('fields.connected')}</span>
                      : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{t('fields.notConnected')}</span>
                          <button
                            type="button"
                            onClick={copyTelegramLink}
                            disabled={!telegramInviteLink}
                            title={telegramInviteLink ? 'Share this link with the client to connect Telegram notifications' : 'Connect Telegram bot in Settings first'}
                            className="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {copied ? '✓ Copied' : 'Copy link'}
                          </button>
                        </div>
                      )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Viber</span>
                    {client.viber_user_id
                      ? <span className="text-green-600 font-medium">{t('fields.connected')}</span>
                      : <span className="text-gray-400">{t('fields.notConnected')}</span>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                {client.phone && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-16 shrink-0">{t('fields.phone')}</span>
                    <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">{client.phone}</a>
                  </div>
                )}
                {client.email && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-16 shrink-0">{t('fields.email')}</span>
                    <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">{client.email}</a>
                  </div>
                )}
                {client.birthday && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-16 shrink-0">{t('fields.birthday')}</span>
                    <span className="text-gray-700">{formatDate(client.birthday)}</span>
                  </div>
                )}
                {client.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap pt-1">
                    {client.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
                {client.whatsapp_number && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-16 shrink-0">{t('fields.whatsappNumber')}</span>
                    <a href={`https://wa.me/${client.whatsapp_number.replace(/^\+/, '').replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                      {client.whatsapp_number}
                    </a>
                  </div>
                )}

                {/* Messenger connection status */}
                <div className="pt-2 border-t border-gray-100 space-y-1.5">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t('fields.messengers')}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Telegram</span>
                    {client.telegram_id
                      ? <span className="text-green-600 font-medium">{t('fields.connected')}</span>
                      : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{t('fields.notConnected')}</span>
                          <button
                            type="button"
                            onClick={copyTelegramLink}
                            disabled={!telegramInviteLink}
                            title={telegramInviteLink ? 'Share this link with the client to connect Telegram notifications' : 'Connect Telegram bot in Settings first'}
                            className="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {copied ? '✓ Copied' : 'Copy link'}
                          </button>
                        </div>
                      )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Viber</span>
                    {client.viber_user_id
                      ? <span className="text-green-600 font-medium">{t('fields.connected')}</span>
                      : <span className="text-gray-400">{t('fields.notConnected')}</span>}
                  </div>
                </div>

                {client.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-gray-600 text-xs leading-relaxed">
                    {client.notes}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visit history */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t('appointments.heading')}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">{t('appointments.empty')}</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((a) => (
                  <div key={a.id} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {a.services?.name ?? '—'}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {formatDate(a.starts_at)} · {formatTime(a.starts_at, locale)}
                        {a.employees?.name && ` · ${a.employees.name}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-3 shrink-0">
                      {a.price != null && (
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(a.price, currency)}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[a.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {t(`status.${a.status}` as any)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
