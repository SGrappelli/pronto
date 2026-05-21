import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://trypronto.app'

// Filesystem path segments that disqualify a page (route groups with these names)
const EXCLUDED_FS_SEGMENTS = ['(dashboard)', 'api']

// URL route prefixes to exclude
const EXCLUDED_ROUTE_PREFIXES = [
  '/api', '/dashboard', '/settings', '/admin',
  '/check-email', '/offline', '/onboarding',
  '/forgot-password', '/reset-password',
  '/book',           // subdomain booking page — returns 404 on main domain
  '/es/para/dental',      // legacy redirect slug — canonical is /es/para/clinica-dental
  '/es/para/auto-repair', // legacy redirect slug — canonical is /es/para/autoservicio
]

// Priority map for known routes; everything else gets 0.6
const LANGUAGE_ALTERNATES: Record<string, Record<string, string>> = {
  '/': {
    en: 'https://trypronto.app/',
    es: 'https://trypronto.app/es/',
    'pt-BR': 'https://trypronto.app/pt/',
  },
  '/es': {
    en: 'https://trypronto.app/',
    es: 'https://trypronto.app/es/',
    'pt-BR': 'https://trypronto.app/pt/',
  },
  '/pt': {
    en: 'https://trypronto.app/',
    es: 'https://trypronto.app/es/',
    'pt-BR': 'https://trypronto.app/pt/',
  },
  '/vs': {
    en: 'https://trypronto.app/vs/',
    es: 'https://trypronto.app/es/vs/',
    'pt-BR': 'https://trypronto.app/pt/vs/',
  },
  '/es/vs': {
    en: 'https://trypronto.app/vs/',
    es: 'https://trypronto.app/es/vs/',
    'pt-BR': 'https://trypronto.app/pt/vs/',
  },
  '/pt/vs': {
    en: 'https://trypronto.app/vs/',
    es: 'https://trypronto.app/es/vs/',
    'pt-BR': 'https://trypronto.app/pt/vs/',
  },
  '/vs/fresha': {
    en: 'https://trypronto.app/vs/fresha',
    es: 'https://trypronto.app/es/vs/fresha',
    'pt-BR': 'https://trypronto.app/pt/vs/fresha',
  },
  '/es/vs/fresha': {
    en: 'https://trypronto.app/vs/fresha',
    es: 'https://trypronto.app/es/vs/fresha',
    'pt-BR': 'https://trypronto.app/pt/vs/fresha',
  },
  '/pt/vs/fresha': {
    en: 'https://trypronto.app/vs/fresha',
    es: 'https://trypronto.app/es/vs/fresha',
    'pt-BR': 'https://trypronto.app/pt/vs/fresha',
  },
  '/vs/booksy': {
    en: 'https://trypronto.app/vs/booksy',
    es: 'https://trypronto.app/es/vs/booksy',
    'pt-BR': 'https://trypronto.app/pt/vs/booksy',
  },
  '/es/vs/booksy': {
    en: 'https://trypronto.app/vs/booksy',
    es: 'https://trypronto.app/es/vs/booksy',
    'pt-BR': 'https://trypronto.app/pt/vs/booksy',
  },
  '/pt/vs/booksy': {
    en: 'https://trypronto.app/vs/booksy',
    es: 'https://trypronto.app/es/vs/booksy',
    'pt-BR': 'https://trypronto.app/pt/vs/booksy',
  },
  '/vs/mindbody': {
    en: 'https://trypronto.app/vs/mindbody',
    es: 'https://trypronto.app/es/vs/mindbody',
    'pt-BR': 'https://trypronto.app/pt/vs/mindbody',
  },
  '/es/vs/mindbody': {
    en: 'https://trypronto.app/vs/mindbody',
    es: 'https://trypronto.app/es/vs/mindbody',
    'pt-BR': 'https://trypronto.app/pt/vs/mindbody',
  },
  '/pt/vs/mindbody': {
    en: 'https://trypronto.app/vs/mindbody',
    es: 'https://trypronto.app/es/vs/mindbody',
    'pt-BR': 'https://trypronto.app/pt/vs/mindbody',
  },
  '/vs/vagaro': {
    en: 'https://trypronto.app/vs/vagaro',
    es: 'https://trypronto.app/es/vs/vagaro',
    'pt-BR': 'https://trypronto.app/pt/vs/vagaro',
  },
  '/es/vs/vagaro': {
    en: 'https://trypronto.app/vs/vagaro',
    es: 'https://trypronto.app/es/vs/vagaro',
    'pt-BR': 'https://trypronto.app/pt/vs/vagaro',
  },
  '/pt/vs/vagaro': {
    en: 'https://trypronto.app/vs/vagaro',
    es: 'https://trypronto.app/es/vs/vagaro',
    'pt-BR': 'https://trypronto.app/pt/vs/vagaro',
  },
  '/vs/square': {
    en: 'https://trypronto.app/vs/square',
    es: 'https://trypronto.app/es/vs/square',
    'pt-BR': 'https://trypronto.app/pt/vs/square',
  },
  '/es/vs/square': {
    en: 'https://trypronto.app/vs/square',
    es: 'https://trypronto.app/es/vs/square',
    'pt-BR': 'https://trypronto.app/pt/vs/square',
  },
  '/pt/vs/square': {
    en: 'https://trypronto.app/vs/square',
    es: 'https://trypronto.app/es/vs/square',
    'pt-BR': 'https://trypronto.app/pt/vs/square',
  },
  '/for': {
    en: 'https://trypronto.app/for/',
    es: 'https://trypronto.app/es/para/',
    'pt-BR': 'https://trypronto.app/pt/para/',
  },
  '/es/para': {
    en: 'https://trypronto.app/for/',
    es: 'https://trypronto.app/es/para/',
    'pt-BR': 'https://trypronto.app/pt/para/',
  },
  '/pt/para': {
    en: 'https://trypronto.app/for/',
    es: 'https://trypronto.app/es/para/',
    'pt-BR': 'https://trypronto.app/pt/para/',
  },
  '/for/salons': {
    en: 'https://trypronto.app/for/salons',
    es: 'https://trypronto.app/es/para/salones',
    'pt-BR': 'https://trypronto.app/pt/para/saloes',
  },
  '/es/para/salones': {
    en: 'https://trypronto.app/for/salons',
    es: 'https://trypronto.app/es/para/salones',
    'pt-BR': 'https://trypronto.app/pt/para/saloes',
  },
  '/pt/para/saloes': {
    en: 'https://trypronto.app/for/salons',
    es: 'https://trypronto.app/es/para/salones',
    'pt-BR': 'https://trypronto.app/pt/para/saloes',
  },
  '/for/barbershops': {
    en: 'https://trypronto.app/for/barbershops',
    es: 'https://trypronto.app/es/para/barberia',
    'pt-BR': 'https://trypronto.app/pt/para/barbearia',
  },
  '/es/para/barberia': {
    en: 'https://trypronto.app/for/barbershops',
    es: 'https://trypronto.app/es/para/barberia',
    'pt-BR': 'https://trypronto.app/pt/para/barbearia',
  },
  '/pt/para/barbearia': {
    en: 'https://trypronto.app/for/barbershops',
    es: 'https://trypronto.app/es/para/barberia',
    'pt-BR': 'https://trypronto.app/pt/para/barbearia',
  },
  '/for/auto-repair': {
    en: 'https://trypronto.app/for/auto-repair',
    es: 'https://trypronto.app/es/para/autoservicio',
    'pt-BR': 'https://trypronto.app/pt/para/auto-repair',
  },
  '/es/para/autoservicio': {
    en: 'https://trypronto.app/for/auto-repair',
    es: 'https://trypronto.app/es/para/autoservicio',
    'pt-BR': 'https://trypronto.app/pt/para/auto-repair',
  },
  '/pt/para/auto-repair': {
    en: 'https://trypronto.app/for/auto-repair',
    es: 'https://trypronto.app/es/para/autoservicio',
    'pt-BR': 'https://trypronto.app/pt/para/auto-repair',
  },
  '/for/dental': {
    en: 'https://trypronto.app/for/dental',
    es: 'https://trypronto.app/es/para/clinica-dental',
    'pt-BR': 'https://trypronto.app/pt/para/clinica-dental',
  },
  '/es/para/clinica-dental': {
    en: 'https://trypronto.app/for/dental',
    es: 'https://trypronto.app/es/para/clinica-dental',
    'pt-BR': 'https://trypronto.app/pt/para/clinica-dental',
  },
  '/pt/para/clinica-dental': {
    en: 'https://trypronto.app/for/dental',
    es: 'https://trypronto.app/es/para/clinica-dental',
    'pt-BR': 'https://trypronto.app/pt/para/clinica-dental',
  },
  '/for/fitness': {
    en: 'https://trypronto.app/for/fitness',
    es: 'https://trypronto.app/es/para/gimnasio',
    'pt-BR': 'https://trypronto.app/pt/para/academia',
  },
  '/es/para/gimnasio': {
    en: 'https://trypronto.app/for/fitness',
    es: 'https://trypronto.app/es/para/gimnasio',
    'pt-BR': 'https://trypronto.app/pt/para/academia',
  },
  '/pt/para/academia': {
    en: 'https://trypronto.app/for/fitness',
    es: 'https://trypronto.app/es/para/gimnasio',
    'pt-BR': 'https://trypronto.app/pt/para/academia',
  },
  '/for/spa': {
    en: 'https://trypronto.app/for/spa',
    es: 'https://trypronto.app/es/para/spa',
    'pt-BR': 'https://trypronto.app/pt/para/spa',
  },
  '/es/para/spa': {
    en: 'https://trypronto.app/for/spa',
    es: 'https://trypronto.app/es/para/spa',
    'pt-BR': 'https://trypronto.app/pt/para/spa',
  },
  '/pt/para/spa': {
    en: 'https://trypronto.app/for/spa',
    es: 'https://trypronto.app/es/para/spa',
    'pt-BR': 'https://trypronto.app/pt/para/spa',
  },
  '/for/tattoo': {
    en: 'https://trypronto.app/for/tattoo',
    es: 'https://trypronto.app/es/para/tatuajes',
    'pt-BR': 'https://trypronto.app/pt/para/tatuagens',
  },
  '/es/para/tatuajes': {
    en: 'https://trypronto.app/for/tattoo',
    es: 'https://trypronto.app/es/para/tatuajes',
    'pt-BR': 'https://trypronto.app/pt/para/tatuagens',
  },
  '/pt/para/tatuagens': {
    en: 'https://trypronto.app/for/tattoo',
    es: 'https://trypronto.app/es/para/tatuajes',
    'pt-BR': 'https://trypronto.app/pt/para/tatuagens',
  },
  '/for/cafes': {
    en: 'https://trypronto.app/for/cafes',
    es: 'https://trypronto.app/es/para/cafeteria',
    'pt-BR': 'https://trypronto.app/pt/para/cafeteria',
  },
  '/es/para/cafeteria': {
    en: 'https://trypronto.app/for/cafes',
    es: 'https://trypronto.app/es/para/cafeteria',
    'pt-BR': 'https://trypronto.app/pt/para/cafeteria',
  },
  '/pt/para/cafeteria': {
    en: 'https://trypronto.app/for/cafes',
    es: 'https://trypronto.app/es/para/cafeteria',
    'pt-BR': 'https://trypronto.app/pt/para/cafeteria',
  },
  '/pricing': {
    en: 'https://trypronto.app/pricing',
    es: 'https://trypronto.app/es/precios',
    'pt-BR': 'https://trypronto.app/pt/precos',
  },
  '/es/precios': {
    en: 'https://trypronto.app/pricing',
    es: 'https://trypronto.app/es/precios',
    'pt-BR': 'https://trypronto.app/pt/precos',
  },
  '/pt/precos': {
    en: 'https://trypronto.app/pricing',
    es: 'https://trypronto.app/es/precios',
    'pt-BR': 'https://trypronto.app/pt/precos',
  },
}

const ROUTE_PRIORITIES: Record<string, number> = {
  '/': 1.0,
  '/es': 0.9,
  '/pt': 0.9,
  '/pt/para': 0.8,
  '/for/salons': 0.9,
  '/es/para/salones': 0.8,
  '/pt/para/saloes': 0.8,
  '/es/para/barberia': 0.8,
  '/pt/para/barbearia': 0.7,
  '/pt/para/auto-repair': 0.7,
  '/es/para/autoservicio': 0.8,
  '/es/para/clinica-dental': 0.8,
  '/pt/para/clinica-dental': 0.7,
  '/pt/para/academia': 0.7,
  '/pt/para/spa': 0.7,
  '/pt/para/cafeteria': 0.7,
  '/es/para/cafeteria': 0.8,
  '/pt/para/tatuagens': 0.7,
  '/es/para/tatuajes': 0.8,
  '/for': 0.8,
  '/vs': 0.8,
  '/es/vs': 0.8,
  '/pt/vs': 0.8,
  '/vs/fresha': 0.8,
  '/es/vs/fresha': 0.8,
  '/pt/vs/fresha': 0.8,
  '/vs/booksy': 0.8,
  '/es/vs/booksy': 0.8,
  '/pt/vs/booksy': 0.8,
  '/vs/mindbody': 0.8,
  '/es/vs/mindbody': 0.8,
  '/pt/vs/mindbody': 0.8,
  '/vs/vagaro': 0.8,
  '/es/vs/vagaro': 0.8,
  '/pt/vs/vagaro': 0.8,
  '/vs/square': 0.8,
  '/es/vs/square': 0.8,
  '/pt/vs/square': 0.8,
  '/pt/vs/trinks': 0.8,
  '/pricing': 0.8,
  '/es/precios': 0.8,
  '/pt/precos': 0.9,
  '/es/para': 0.85,
  '/es/para/gimnasio': 0.8,
  '/es/para/spa': 0.8,
  '/for/fitness': 0.8,
  '/docs': 0.8,
  '/es/docs': 0.8,
  '/pt/docs': 0.8,
  '/register': 0.7,
  '/login': 0.5,
}

function walkPages(dir: string): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkPages(full))
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      results.push(full)
    }
  }
  return results
}

function fileToRoute(filePath: string, appDir: string): string | null {
  const rel = path.relative(appDir, path.dirname(filePath))
  const segments = rel === '.' ? [] : rel.split(path.sep)

  const routeSegments: string[] = []
  for (const seg of segments) {
    // Skip route groups: (public), (auth), (dashboard), etc.
    if (seg.startsWith('(') && seg.endsWith(')')) continue
    // Skip dynamic segments — can't enumerate these
    if (seg.startsWith('[')) return null
    routeSegments.push(seg)
  }

  return '/' + routeSegments.join('/')
}

function isExcludedByPath(filePath: string): boolean {
  const parts = filePath.split(path.sep)
  return EXCLUDED_FS_SEGMENTS.some(seg => parts.includes(seg))
}

function isExcludedByRoute(route: string): boolean {
  return EXCLUDED_ROUTE_PREFIXES.some(
    prefix => route === prefix || route.startsWith(prefix + '/')
  )
}

// Detects `robots: { index: false }` or `robots: 'noindex'` in file content
function hasNoIndex(filePath: string): boolean {
  try {
    const src = fs.readFileSync(filePath, 'utf-8')
    // Match: robots: 'noindex' | robots: "noindex" | index: false (inside robots block)
    return /robots\s*:\s*['"]noindex['"]/i.test(src) ||
      /robots\s*:\s*\{[^}]*index\s*:\s*false/.test(src)
  } catch {
    return false
  }
}

function getPriority(route: string): number {
  return ROUTE_PRIORITIES[route] ?? 0.6
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'app')

  return walkPages(appDir)
    .filter(f => !isExcludedByPath(f))
    .map(f => ({ file: f, route: fileToRoute(f, appDir) }))
    .filter((item): item is { file: string; route: string } => item.route !== null)
    .filter(({ route }) => !isExcludedByRoute(route))
    .filter(({ file }) => !hasNoIndex(file))
    .map(({ route }) => ({
      url: `${BASE_URL}${route}`,
      changeFrequency: (['/', '/es', '/pt', '/for', '/for/salons', '/es/para', '/pt/para', '/es/para/salones', '/for/barbershops', '/es/para/barberia', '/for/auto-repair', '/es/para/autoservicio', '/es/para/clinica-dental', '/pt/para/clinica-dental', '/es/para/gimnasio', '/pt/para/academia', '/pt/para/saloes', '/pt/para/barbearia', '/pt/para/auto-repair', '/pt/para/spa', '/for/spa', '/es/para/spa', '/for/cafes', '/es/para/cafeteria', '/pt/para/cafeteria', '/for/tattoo', '/es/para/tatuajes', '/pt/para/tatuagens', '/docs', '/es/docs', '/pt/docs'].includes(route) ? 'weekly' : 'monthly') as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: getPriority(route),
      lastModified: new Date(),
      ...(LANGUAGE_ALTERNATES[route] ? { alternates: { languages: LANGUAGE_ALTERNATES[route] } } : {}),
    }))
}
