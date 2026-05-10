'use client'
import { usePathname, useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export function LangSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const current = pathname.startsWith('/pt') ? 'pt'
                : pathname.startsWith('/es') ? 'es'
                : 'en'

  function getTargetPath(lang: string): string {
    let base = pathname
    if (base.startsWith('/pt')) base = base.replace(/^\/pt/, '') || '/'
    if (base.startsWith('/es')) base = base.replace(/^\/es/, '') || '/'
    if (lang === 'en') return base || '/'
    return '/' + lang + (base === '/' ? '/' : base)
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value
    trackEvent('language_switch', { to: lang })
    router.push(getTargetPath(lang))
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      aria-label="Language"
      style={{
        fontSize: '0.85rem',
        fontFamily: 'inherit',
        fontWeight: 500,
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        padding: '4px 6px',
        background: 'transparent',
        cursor: 'pointer',
        color: 'inherit',
        appearance: 'none',
        WebkitAppearance: 'none',
        minWidth: '52px',
      }}
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
      <option value="pt">PT</option>
    </select>
  )
}
