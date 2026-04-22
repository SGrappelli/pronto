'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DatePicker } from '@/components/ui/date-picker'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface Props {
  businessId: string
}

function validatePhone(phone: string): string | null {
  if (!phone) return null
  if (!/^[\d\s+\-()]+$/.test(phone)) return 'Please enter a valid phone number (digits only)'
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) return 'Please enter a valid phone number (digits only)'
  return null
}

function validateBirthday(birthday: string): string | null {
  if (!birthday) return null
  const d = new Date(birthday + 'T00:00:00')
  if (isNaN(d.getTime()) || d.getFullYear() < 1900 || d > new Date()) return 'Please enter a valid date'
  return null
}

export function NewClientForm({ businessId }: Props) {
  const supabase = createClient()
  const t = useTranslations('newClient')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    whatsapp_number: '',
    birthday: '',
    tags: '',
    notes: '',
  })
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string; birthday?: string }>({})

  function blurPhone() {
    const e = validatePhone(form.phone)
    setErrors((prev) => ({ ...prev, phone: e ?? undefined }))
  }

  function blurBirthday() {
    const e = validateBirthday(form.birthday)
    setErrors((prev) => ({ ...prev, birthday: e ?? undefined }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return

    const phoneErr = validatePhone(form.phone)
    const bdErr = validateBirthday(form.birthday)
    if (phoneErr || bdErr) {
      setErrors({ phone: phoneErr ?? undefined, birthday: bdErr ?? undefined })
      return
    }

    setSaving(true)
    const tags = form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : []

    const { data: client } = await supabase.from('clients').insert({
      business_id: businessId,
      name: form.name.trim(),
      phone: form.phone || null,
      email: form.email || null,
      whatsapp_number: form.whatsapp_number || null,
      birthday: form.birthday || null,
      notes: form.notes || null,
      tags,
    }).select('id').single()

    setSaving(false)
    // Hard navigate to bypass Next.js router cache so /crm list always shows fresh data
    window.location.href = client ? `/crm/${client.id}` : '/crm'
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fields.name')}</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder={t('fields.namePlaceholder')}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fields.phone')}</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          onBlur={blurPhone}
          placeholder={t('fields.phonePlaceholder')}
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fields.email')}</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder={t('fields.emailPlaceholder')}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fields.whatsapp')}</label>
        <input
          type="tel"
          value={form.whatsapp_number}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp_number: e.target.value }))}
          placeholder={t('fields.whatsappPlaceholder')}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fields.birthday')}</label>
        <div
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) blurBirthday()
          }}
        >
          <DatePicker
            value={form.birthday}
            onChange={(v) => {
              setForm((f) => ({ ...f, birthday: v }))
              setErrors((prev) => ({ ...prev, birthday: undefined }))
            }}
          />
        </div>
        {errors.birthday && <p className="text-xs text-red-500 mt-1">{errors.birthday}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fields.tags')}</label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          placeholder={t('fields.tagsPlaceholder')}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fields.notes')}</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          rows={3}
          placeholder={t('fields.notesPlaceholder')}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Link
          href="/crm"
          className="flex-1 text-center border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {t('cancelButton')}
        </Link>
        <button
          type="submit"
          disabled={saving || !form.name.trim()}
          className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? '…' : t('submitButton')}
        </button>
      </div>
    </form>
  )
}
