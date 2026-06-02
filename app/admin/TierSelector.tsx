'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Loader2 } from 'lucide-react'

const TIERS = ['free', 'starter', 'pro', 'agency'] as const
type Tier = typeof TIERS[number]

const TIER_STYLE: Record<Tier, { label: string; bg: string; color: string }> = {
  free:    { label: 'Free',    bg: '#e5e7eb', color: '#374151' },
  starter: { label: 'Starter', bg: '#dbeafe', color: '#1d4ed8' },
  pro:     { label: 'Pro',     bg: '#ede9fe', color: '#6d28d9' },
  agency:  { label: 'Agency',  bg: '#fef3c7', color: '#92400e' },
}

interface Props {
  businessId: string
  initialTier: Tier
  initialNote: string | null
}

export function TierSelector({ businessId, initialTier, initialNote }: Props) {
  const [tier, setTier] = useState<Tier>(initialTier)
  const [note, setNote] = useState(initialNote ?? '')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  async function saveTier(newTier: Tier, newNote: string) {
    setLoading(true)
    setOpen(false)
    try {
      const res = await fetch('/api/admin/set-tier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, tier: newTier, note: newNote }),
      })
      if (!res.ok) throw new Error('Failed')
      setTier(newTier)
      setNote(newNote)
    } catch {
      showToast('Failed to update tier')
    } finally {
      setLoading(false)
    }
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const s = TIER_STYLE[tier] ?? TIER_STYLE.free

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Badge / trigger */}
      <button
        onClick={() => !loading && setOpen(v => !v)}
        title={note || undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px 2px 10px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          background: s.bg,
          color: s.color,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          whiteSpace: 'nowrap',
          opacity: loading ? 0.7 : 1,
          outline: 'none',
        }}
      >
        {note && (
          <span style={{ fontSize: '10px', marginRight: '2px' }} title={note}>📝</span>
        )}
        {s.label}
        {loading
          ? <Loader2 style={{ width: '10px', height: '10px', animation: 'spin 1s linear infinite' }} />
          : <ChevronDown style={{ width: '10px', height: '10px' }} />
        }
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          zIndex: 1000,
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          minWidth: '200px',
          padding: '8px',
        }}>
          {/* Tier options */}
          {TIERS.map(t => {
            const ts = TIER_STYLE[t]
            const isActive = t === tier
            return (
              <button
                key={t}
                onClick={() => {
                  if (!isActive) saveTier(t, note)
                  else setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '7px 10px',
                  border: 'none',
                  borderRadius: '6px',
                  background: isActive ? '#f3f4f6' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: ts.color,
                  textAlign: 'left',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f9fafb' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isActive ? '#f3f4f6' : 'transparent' }}
              >
                <span style={{
                  display: 'inline-block',
                  padding: '1px 8px',
                  borderRadius: '9999px',
                  background: ts.bg,
                  color: ts.color,
                  fontSize: '12px',
                  fontWeight: 600,
                }}>
                  {ts.label}
                </span>
                {isActive && <Check style={{ width: '13px', height: '13px', color: '#6b7280' }} />}
              </button>
            )
          })}

          {/* Divider + Note field */}
          <div style={{ borderTop: '1px solid #f3f4f6', margin: '8px 0 4px' }} />
          <div style={{ padding: '0 4px 4px' }}>
            <label style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="e.g. gifted 1 month pro"
              style={{
                width: '100%',
                fontSize: '12px',
                padding: '5px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#374151',
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') saveTier(tier, note)
                if (e.key === 'Escape') setOpen(false)
              }}
            />
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              <button
                onClick={() => saveTier(tier, note)}
                style={{
                  flex: 1,
                  padding: '5px 0',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Save note
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: '5px 10px',
                  fontSize: '12px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: '#1f2937',
          color: '#fff',
          padding: '10px 18px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
