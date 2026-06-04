'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ImportCsvModal } from './import-csv-modal'
import { Upload } from 'lucide-react'

interface Props {
  /** Pass true when the client limit is already reached on Free plan */
  atLimit?: boolean
}

export function CrmImportButton({ atLimit }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function handleImported(count: number) {
    if (count > 0) router.refresh()
  }

  if (atLimit) {
    return (
      <Button
        size="sm"
        variant="outline"
        disabled
        title="Upgrade to import more clients"
        className="opacity-50 cursor-not-allowed"
      >
        <Upload className="w-4 h-4 mr-1" />
        Import CSV
      </Button>
    )
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
