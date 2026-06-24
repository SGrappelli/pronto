import { NextResponse } from 'next/server'

const SUPPORTED = ['en', 'es', 'pt'] as const

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const locale: string = body.locale ?? ''
  if (!(SUPPORTED as readonly string[]).includes(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }
  const response = NextResponse.json({ ok: true })
  response.cookies.set('dashboard_locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}
