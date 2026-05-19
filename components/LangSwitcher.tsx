'use client'
import { usePathname, useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

// Maps any lang-variant path to its EN canonical path
const TO_EN: Record<string, string> = {
  '/': '/', '/es': '/', '/es/': '/', '/pt': '/', '/pt/': '/',
  '/pricing': '/pricing', '/es/precios': '/pricing', '/pt/precos': '/pricing',
  '/for': '/for', '/es/para': '/for', '/pt/para': '/for',
  '/for/salons': '/for/salons', '/es/para/salones': '/for/salons', '/pt/para/saloes': '/for/salons',
  '/for/barbershops': '/for/barbershops', '/es/para/barberia': '/for/barbershops', '/pt/para/barbearia': '/for/barbershops',
  '/for/fitness': '/for/fitness', '/es/para/gimnasio': '/for/fitness', '/pt/para/academia': '/for/fitness',
  '/for/spa': '/for/spa', '/es/para/spa': '/for/spa', '/pt/para/spa': '/for/spa',
  '/for/dental': '/for/dental', '/es/para/clinica-dental': '/for/dental', '/pt/para/clinica-dental': '/for/dental',
  '/for/cafes': '/for/cafes', '/es/para/cafeteria': '/for/cafes', '/pt/para/cafeteria': '/for/cafes',
  '/for/tattoo': '/for/tattoo', '/es/para/tatuajes': '/for/tattoo', '/pt/para/tatuagens': '/for/tattoo',
  '/for/auto-repair': '/for/auto-repair', '/es/para/autoservicio': '/for/auto-repair', '/pt/para/auto-repair': '/for/auto-repair',
  '/docs': '/docs', '/es/docs': '/docs', '/pt/docs': '/docs',
}

const BY_LANG: Record<string, Record<string, string>> = {
  en: {
    '/': '/', '/pricing': '/pricing', '/for': '/for',
    '/for/salons': '/for/salons', '/for/barbershops': '/for/barbershops',
    '/for/fitness': '/for/fitness', '/for/spa': '/for/spa',
    '/for/dental': '/for/dental', '/for/cafes': '/for/cafes', '/for/tattoo': '/for/tattoo', '/for/auto-repair': '/for/auto-repair',
    '/docs': '/docs',
  },
  es: {
    '/': '/es/', '/pricing': '/es/precios', '/for': '/es/para',
    '/for/salons': '/es/para/salones', '/for/barbershops': '/es/para/barberia',
    '/for/fitness': '/es/para/gimnasio', '/for/spa': '/es/para/spa',
    '/for/dental': '/es/para/clinica-dental', '/for/cafes': '/es/para/cafeteria', '/for/tattoo': '/es/para/tatuajes', '/for/auto-repair': '/es/para/autoservicio',
    '/docs': '/es/docs',
  },
  pt: {
    '/': '/pt/', '/pricing': '/pt/precos', '/for': '/pt/para',
    '/for/salons': '/pt/para/saloes', '/for/barbershops': '/pt/para/barbearia',
    '/for/fitness': '/pt/para/academia', '/for/spa': '/pt/para/spa',
    '/for/dental': '/pt/para/clinica-dental', '/for/cafes': '/pt/para/cafeteria', '/for/tattoo': '/pt/para/tatuagens', '/for/auto-repair': '/pt/para/auto-repair',
    '/docs': '/pt/docs',
  },
}

export function LangSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const current = pathname.startsWith('/pt') ? 'pt'
                : pathname.startsWith('/es') ? 'es'
                : 'en'

  function getTargetPath(lang: string): string {
    const normalized = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
    const enPath = TO_EN[normalized] ?? TO_EN[pathname] ?? '/'
    return BY_LANG[lang]?.[enPath] ?? (lang === 'en' ? '/' : `/${lang}/`)
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
