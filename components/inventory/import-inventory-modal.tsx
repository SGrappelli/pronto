'use client'

import { useState, useRef, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import { X, Upload, CheckCircle, AlertCircle, Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParsedRow {
  name: string
  sku: string
  barcode: string
  category: string
  unit: string
  quantity: string
  cost_price: string
  sell_price: string
  description: string
}

type Step = 'upload' | 'preview' | 'result'

interface Props {
  open: boolean
  onClose: () => void
  onImported: (count: number) => void
}

// ─── CSV delimiter detection ──────────────────────────────────────────────────

function detectDelimiter(firstLine: string): string {
  const commaCount     = (firstLine.match(/,/g)  ?? []).length
  const semicolonCount = (firstLine.match(/;/g)  ?? []).length
  return semicolonCount > commaCount ? ';' : ','
}

// ─── CSV parser (RFC 4180, no external libraries) ────────────────────────────

function parseCSV(text: string, delimiter = ','): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  let i = 0

  while (i < text.length) {
    const ch   = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i += 2; continue }
      if (ch === '"') { inQuotes = false; i++; continue }
      field += ch; i++; continue
    }

    if (ch === '"') { inQuotes = true; i++; continue }

    if (ch === delimiter) {
      row.push(field.trim()); field = ''; i++; continue
    }

    if (ch === '\r' && next === '\n') {
      row.push(field.trim())
      if (row.some((c) => c !== '')) rows.push(row)
      row = []; field = ''; i += 2; continue
    }

    if (ch === '\n' || ch === '\r') {
      row.push(field.trim())
      if (row.some((c) => c !== '')) rows.push(row)
      row = []; field = ''; i++; continue
    }

    field += ch; i++
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim())
    if (row.some((c) => c !== '')) rows.push(row)
  }

  return rows
}

// ─── File parser — CSV + XLSX/XLS ─────────────────────────────────────────────

async function parseFile(file: File): Promise<string[][]> {
  const ext = file.name.split('.').pop()?.toLowerCase()

  if (ext === 'xlsx' || ext === 'xls') {
    const buffer = await file.arrayBuffer()
    const wb = XLSX.read(buffer, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    return XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: '' })
  }

  // CSV
  const text = await file.text()
  const firstLine = text.split(/\r?\n/)[0] ?? ''
  const delimiter = detectDelimiter(firstLine)
  return parseCSV(text, delimiter)
}

// ─── Column detection ─────────────────────────────────────────────────────────

const COLUMN_KEYWORDS: Record<keyof ParsedRow, string[]> = {
  name:        ['name', 'product', 'item'],
  sku:         ['sku', 'code'],
  barcode:     ['barcode', 'ean', 'upc'],
  category:    ['category', 'group'],
  unit:        ['unit', 'uom'],
  quantity:    ['quantity', 'qty', 'stock'],
  cost_price:  ['cost price', 'cost_price', 'cost'],
  sell_price:  ['sell price', 'sell_price', 'selling price', 'retail price', 'sale price'],
  description: ['description', 'notes'],
}

function detectColumns(headers: string[]): Record<keyof ParsedRow, number> {
  const normalized = headers.map((h) => String(h).toLowerCase().trim())
  const result = {} as Record<keyof ParsedRow, number>
  for (const [field, keywords] of Object.entries(COLUMN_KEYWORDS)) {
    let found = -1
    for (const kw of keywords) {
      const idx = normalized.findIndex((h) => h === kw.toLowerCase())
      if (idx !== -1) { found = idx; break }
    }
    if (found === -1) {
      for (const kw of keywords) {
        const idx = normalized.findIndex((h) => h.includes(kw.toLowerCase()))
        if (idx !== -1) { found = idx; break }
      }
    }
    result[field as keyof ParsedRow] = found
  }
  return result
}

function rowsToParsed(rows: string[][], colMap: Record<keyof ParsedRow, number>): ParsedRow[] {
  return rows.map((row) => {
    const get = (field: keyof ParsedRow) =>
      colMap[field] >= 0 ? String(row[colMap[field]] ?? '') : ''
    return {
      name:        get('name'),
      sku:         get('sku'),
      barcode:     get('barcode'),
      category:    get('category'),
      unit:        get('unit'),
      quantity:    get('quantity'),
      cost_price:  get('cost_price'),
      sell_price:  get('sell_price'),
      description: get('description'),
    }
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ImportInventoryModal({ open, onClose, onImported }: Props) {
  const t = useTranslations('inventory')

  const [step, setStep]                     = useState<Step>('upload')
  const [dragging, setDragging]             = useState(false)
  const [parsedRows, setParsedRows]         = useState<ParsedRow[]>([])
  const [colMap, setColMap]                 = useState<Record<keyof ParsedRow, number> | null>(null)
  const [headers, setHeaders]               = useState<string[]>([])
  const [rowCount, setRowCount]             = useState(0)
  const [loading, setLoading]               = useState(false)
  const [resultImported, setResultImported] = useState(0)
  const [resultSkipped, setResultSkipped]   = useState(0)
  const [importError, setImportError]       = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleClose() {
    setStep('upload')
    setParsedRows([])
    setColMap(null)
    setHeaders([])
    setRowCount(0)
    setLoading(false)
    setImportError(null)
    onClose()
  }

  function downloadTemplate() {
    const headers = [
      ['Name', 'SKU', 'Barcode', 'Category', 'Unit',
       'Quantity', 'Cost price', 'Sell price', 'Description'],
    ]
    const ws = XLSX.utils.aoa_to_sheet(headers)
    ws['!cols'] = [
      { wch: 30 }, { wch: 15 }, { wch: 18 }, { wch: 20 }, { wch: 8 },
      { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 40 },
    ]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Products')
    XLSX.writeFile(wb, 'pronto-products-template.xlsx')
  }

  const processFile = useCallback(async (file: File) => {
    setImportError(null)
    try {
      const matrix = await parseFile(file)
      if (matrix.length < 2) {
        setImportError('File appears empty or could not be parsed.')
        return
      }
      const hdrs     = matrix[0].map(String)
      const dataRows = matrix.slice(1).map((r) => r.map(String))
      const map      = detectColumns(hdrs)

      if (map.name === -1) {
        setImportError('No "name" column found. Please check your file headers.')
        return
      }

      setHeaders(hdrs)
      setColMap(map)
      setRowCount(dataRows.length)
      setParsedRows(rowsToParsed(dataRows, map))
      setStep('preview')
    } catch {
      setImportError('Failed to read file.')
    }
  }, [])

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  async function handleImport() {
    setLoading(true)
    setImportError(null)
    try {
      const res = await fetch('/api/inventory/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: parsedRows }),
      })
      const data = await res.json()

      if (!res.ok) {
        setImportError(data.error ?? 'Import failed. Please try again.')
        setLoading(false)
        return
      }

      setResultImported(data.imported)
      setResultSkipped(data.skipped)
      setStep('result')
      onImported(data.imported)
    } catch {
      setImportError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const preview = parsedRows.slice(0, 5)
  const PREVIEW_FIELDS: (keyof ParsedRow)[] = ['name', 'sku', 'quantity', 'sell_price']

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) handleClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 focus:outline-none">

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Import Products
            </Dialog.Title>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── Step: upload ─────────────────────────────────────────────── */}
          {step === 'upload' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                {t('import.uploadHint')}
              </p>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                  ${dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <Upload className="w-9 h-9 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">{t('import.dropzone')}</p>
                <p className="text-xs text-gray-400 mt-1.5">{t('import.dropzoneFormats')}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>

              {importError && (
                <div className="mt-3 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  {importError}
                </div>
              )}

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">{t('import.orSeparator')}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-xs font-medium text-gray-500 mb-2">{t('import.templateHint')}</p>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 w-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4 shrink-0 text-gray-400" />
                {t('import.downloadTemplate')}
              </button>
              <p className="text-xs text-gray-400 mt-1.5">{t('import.templateSubhint')}</p>
            </div>
          )}

          {/* ── Step: preview ────────────────────────────────────────────── */}
          {step === 'preview' && colMap && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  {t('import.productsFound', { count: rowCount })}
                </span>
                <button
                  onClick={() => { setStep('upload'); setImportError(null) }}
                  className="ml-auto text-xs text-blue-600 hover:underline"
                >
                  Change file
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {(Object.keys(COLUMN_KEYWORDS) as (keyof ParsedRow)[]).map((field) => (
                  <span
                    key={field}
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium
                      ${colMap[field] >= 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-400'}`}
                  >
                    {colMap[field] >= 0 ? '✓' : '—'} {field}
                    {colMap[field] >= 0 && (
                      <span className="opacity-60">← {headers[colMap[field]]}</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {PREVIEW_FIELDS.map((f) => (
                        <th key={f} className="px-3 py-2 text-left font-medium text-gray-500 capitalize">
                          {f.replace('_', ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        {PREVIEW_FIELDS.map((f) => (
                          <td key={f} className="px-3 py-2 text-gray-900 max-w-[120px] truncate">
                            {row[f] || <span className="text-gray-300">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rowCount > 5 && (
                  <div className="px-3 py-2 text-xs text-gray-400 border-t border-gray-100 bg-gray-50">
                    …and {rowCount - 5} more row{rowCount - 5 !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {importError && (
                <div className="mb-3 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  {importError}
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setStep('upload')}>
                  Back
                </Button>
                <Button
                  size="sm"
                  onClick={handleImport}
                  disabled={loading || rowCount === 0}
                >
                  {loading ? t('import.importing') : t('import.importN', { count: rowCount })}
                </Button>
              </div>
            </div>
          )}

          {/* ── Step: result ──────────────────────────────────────────────── */}
          {step === 'result' && (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('import.result')}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold text-green-700">{resultImported}</span>{' '}
                {t('import.imported', { count: resultImported })}
              </p>
              {resultSkipped > 0 && (
                <p className="text-sm text-gray-400 mb-4">
                  {t('import.skipped', { count: resultSkipped })}
                </p>
              )}
              <Button onClick={handleClose} className="mt-2">Done</Button>
            </div>
          )}

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
