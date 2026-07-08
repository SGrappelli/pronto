'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ImportInventoryModal } from './import-inventory-modal'
import { Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
  atLimit?: boolean
}

export function InventoryImportButton({ atLimit }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations('inventory')

  function handleImported(count: number) {
    if (count > 0) router.refresh()
  }

  if (atLimit) {
    return (
      <Button
        size="sm"
        variant="outline"
        disabled
        title={t('import.limitReached')}
        className="opacity-50 cursor-not-allowed"
      >
        <Upload className="w-4 h-4 mr-1" />
        {t('importCsv')}
      </Button>
    )
  }

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Upload className="w-4 h-4 mr-1" />
        {t('importCsv')}
      </Button>
      <ImportInventoryModal
        open={open}
        onClose={() => setOpen(false)}
        onImported={handleImported}
      />
    </>
  )
}
