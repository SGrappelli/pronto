import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // SaaS subdomain routing: rewrite openyoga.trypronto.app/book → /book/openyoga
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas' && pathname === '/book') {
    const hostname = request.headers.get('host') ?? ''
    const match = hostname.match(/^([a-z0-9-]+)\.trypronto\.app/)
    const tenantSlug = match?.[1]
    if (tenantSlug && tenantSlug !== 'www') {
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = `/book/${tenantSlug}`
      return NextResponse.rewrite(rewriteUrl)
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Handle Supabase email confirmation code on root path
  const code = searchParams.get('code')
  if (code && pathname === '/') {
    const callbackUrl = request.nextUrl.clone()
    callbackUrl.pathname = '/auth/callback'
    return NextResponse.redirect(callbackUrl)
  }

  const { data: { user } } = await supabase.auth.getUser()

  // Authenticated user on root → dashboard
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

  // Redirect authenticated users away from auth pages
  if (user && (pathname === '/login' || pathname === '/register')) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  // Auto-detect locale from Accept-Language on first visit (no cookie yet)
  if (!request.cookies.get('dashboard_locale')?.value) {
    const acceptLang = request.headers.get('accept-language') ?? ''
    const lang = acceptLang.toLowerCase()
    const detected = lang.startsWith('pt') ? 'pt' : lang.startsWith('es') ? 'es' : null
    if (detected) {
      supabaseResponse.cookies.set('dashboard_locale', detected, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      })
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
