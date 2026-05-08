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
]

// Priority map for known routes; everything else gets 0.6
const ROUTE_PRIORITIES: Record<string, number> = {
  '/': 1.0,
  '/es': 0.9,
  '/for/salons': 0.9,
  '/es/para/salones': 0.8,
  '/es/para/barberia': 0.8,
  '/es/para/autoservicio': 0.8,
  '/es/para/clinica-dental': 0.8,
  '/for': 0.8,
  '/pricing': 0.8,
  '/es/precios': 0.8,
  '/es/para': 0.85,
  '/es/para/gimnasio': 0.8,
  '/es/para/spa': 0.8,
  '/for/fitness': 0.8,
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
      changeFrequency: (['/', '/es', '/for', '/for/salons', '/es/para', '/es/para/salones', '/for/barbershops', '/es/para/barberia', '/for/auto-repair', '/es/para/autoservicio', '/es/para/clinica-dental'].includes(route) ? 'weekly' : 'monthly') as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: getPriority(route),
      lastModified: new Date(),
    }))
}
