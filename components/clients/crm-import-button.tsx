'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ImportCsvModal } from './import-csv-modal'
import { Upload } from 'lucide-react'

export function CrmImportButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function handleImported(count: number) {
    if (count > 0) router.refresh()
  }

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Upload className="w-4 h-4 mr-1" />
        Import CSV
      </Button>
      <ImportCsvModal
        open={open}
        onClose={() => setOpen(false)}
        onImported={handleImported}
      />
    </>
  )
}
