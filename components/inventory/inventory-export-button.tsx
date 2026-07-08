'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function InventoryExportButton() {
  const [loading, setLoading] = useState(false)
  const t = useTranslations('inventory')

  async function handleExport() {
    setLoading(true)
    try {
      const res = await fetch('/api/inventory/export')
      if (!res.ok) return
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const cd = res.headers.get('Content-Disposition') ?? ''
      const match = cd.match(/filename="([^"]+)"/)
      a.download = match ? match[1] : 'products.xlsx'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
      <Download className="w-4 h-4 mr-1" />
      {loading ? '…' : t('export')}
    </Button>
  )
}
