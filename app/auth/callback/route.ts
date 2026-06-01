import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { slugify } from '@/lib/utils'
import { NextResponse } from 'next/server'

const isSaas = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas'
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'trypronto.app'

/** Build a tenant-aware redirect URL: subdomain for SaaS, root domain for self-hosted. */
function tenantUrl(slug: string | null, path: string, fallbackOrigin: string): string {
  if (isSaas && slug) return `https://${slug}.${rootDomain}${path}`
  return `${fallbackOrigin}${path}`
}

export async function GET(request: Request) {
  const { searchParams, origin: requestOrigin } = new URL(request.url)
  const origin = process.env.NEXT_PUBLIC_SITE_URL || requestOrigin
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Сброс пароля — сессия установлена, сразу на страницу смены пароля
      if (next === '/reset-password') {
        return NextResponse.redirect(`${origin}/reset-password`)
      }

      // Проверяем — есть ли уже бизнес у пользователя
      const admin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      const { data: existing } = await admin
        .from('businesses')
        .select('id, slug, onboarding_completed')
        .eq('owner_id', data.user.id)
        .maybeSingle()

      if (!existing) {
        // Бизнес не создан — создаём из метаданных пользователя
        const businessName =
          (data.user.user_metadata?.business_name as string) ||
          (data.user.user_metadata?.full_name as string) ||
          (data.user.email?.split('@')[0] ?? 'My Business')

        const baseSlug = slugify(businessName)
        let slug = baseSlug
        let attempt = 0

        while (true) {
          const { data: taken } = await admin
            .from('businesses')
            .select('id')
            .eq('slug', slug)
            .maybeSingle()
          if (!taken) break
          attempt++
          slug = `${baseSlug}-${attempt}`
        }

        const country = request.headers.get('cf-ipcountry') ?? null

        await admin.from('businesses').insert({
          owner_id: data.user.id,
          name: businessName,
          slug,
          country,
        })

        return NextResponse.redirect(tenantUrl(slug, '/onboarding', origin))
      }

      // Бизнес есть, но онбординг не завершён — отправляем на онбординг
      if (!existing.onboarding_completed) {
        return NextResponse.redirect(tenantUrl(existing.slug, '/onboarding', origin))
      }

      return NextResponse.redirect(tenantUrl(existing.slug, next, origin))
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Authentication+failed`)
}
