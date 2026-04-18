import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// ── Tenant cache ─────────────────────────────────────────────────────────────
const tenantCache = new Map<string, { slug: string } | null>()
const tenantCacheTs = new Map<string, number>()
const TENANT_TTL = 60_000 // 1 minute

const BYPASS_SUBDOMAINS = new Set(['www', 'app', 'api', 'mail', 'ftp', 'smtp'])

async function resolveTenant(subdomain: string): Promise<{ slug: string } | null> {
  const now = Date.now()
  const ts = tenantCacheTs.get(subdomain)
  if (ts !== undefined && now - ts < TENANT_TTL && tenantCache.has(subdomain)) {
    return tenantCache.get(subdomain) ?? null
  }

  try {
    const apiUrl =
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/businesses` +
      `?slug=eq.${encodeURIComponent(subdomain)}&select=id%2Cslug&limit=1`

    const res = await fetch(apiUrl, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
      cache: 'no-store',
    })

    const rows: { slug: string }[] = res.ok ? await res.json() : []
    const tenant = rows[0] ?? null
    tenantCache.set(subdomain, tenant)
    tenantCacheTs.set(subdomain, now)
    return tenant
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'trypronto.app'
  const saasMode = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas'

  // ── Subdomain extraction ────────────────────────────────────────────────────
  let subdomain: string | null = null

  if (hostname.endsWith(`.${rootDomain}`)) {
    subdomain = hostname.slice(0, hostname.length - rootDomain.length - 1)
  } else if (/^localhost(:\d+)?$/.test(hostname)) {
    subdomain = process.env.NEXT_PUBLIC_TENANT_SLUG ?? null
  }

  // ── Tenant subdomain routing ────────────────────────────────────────────────
  if (subdomain && !BYPASS_SUBDOMAINS.has(subdomain)) {
    const tenant = await resolveTenant(subdomain)

    if (!tenant) {
      return NextResponse.redirect(new URL(`https://${rootDomain}/not-found`))
    }

    const { pathname } = request.nextUrl

    // Root of subdomain → public booking page (no auth needed)
    if (pathname === '/') {
      const rewritten = request.nextUrl.clone()
      rewritten.pathname = `/book/${tenant.slug}`
      return NextResponse.rewrite(rewritten)
    }

    // All other paths fall through to the auth middleware below.
    // Cross-subdomain cookies (.trypronto.app) allow the session to carry over.
  }

  // ── Auth middleware ─────────────────────────────────────────────────────────
  const cookieDomain =
    saasMode && rootDomain ? `.${rootDomain}` : undefined

  // Pass the current pathname to Server Components (e.g. dashboard layout)
  // so they can redirect to the correct subdomain path.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  let supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // FIX: preserve requestHeaders (including x-pathname) when recreating response
          supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              ...(cookieDomain ? { domain: cookieDomain } : {}),
            })
          )
        },
      },
    }
  )

  const { pathname, searchParams } = request.nextUrl

  // Перехватываем ?code= от Supabase email-подтверждения
  const code = searchParams.get('code')
  if (code && pathname === '/') {
    const callbackUrl = request.nextUrl.clone()
    callbackUrl.pathname = '/auth/callback'
    return NextResponse.redirect(callbackUrl)
  }

  const { data: { user } } = await supabase.auth.getUser()

  // FIX: authenticated user on root → dashboard
  // Must be checked BEFORE the publicPaths early-return, otherwise `/` is always served as-is.
  if (user && pathname === '/') {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  // Protected routes — redirect unauthenticated users to login
  const protectedPaths = ['/dashboard', '/pos', '/crm', '/inventory', '/booking', '/settings']
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Public routes — serve as-is for unauthenticated users
  const publicPaths = ['/', '/pricing', '/terms', '/privacy', '/refund']
  if (publicPaths.includes(pathname)) {
    return supabaseResponse
  }

  // Redirect authenticated users away from auth pages
  if (user && (pathname === '/login' || pathname === '/register')) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
