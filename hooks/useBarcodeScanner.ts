import { useEffect, useRef } from 'react'

export function useBarcodeScanner(onScan: (barcode: string) => void, enabled = true) {
  const buffer = useRef('')
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!enabled) return

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      // Ignore regular inputs unless explicitly marked as barcode input
      if (target.tagName === 'INPUT' && target.dataset.barcodeInput !== 'true') return
      if (target.tagName === 'TEXTAREA') return

      clearTimeout(timer.current)

      if (e.key === 'Enter') {
        if (buffer.current.length > 3) {
          onScan(buffer.current)
        }
        buffer.current = ''
        return
      }

      if (e.key.length === 1) {
        buffer.current += e.key
      }

      // Scanners fire characters in <30ms; human typing is >100ms between keystrokes
      timer.current = setTimeout(() => {
        buffer.current = ''
      }, 100)
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      clearTimeout(timer.current)
    }
  }, [onScan, enabled])
}
