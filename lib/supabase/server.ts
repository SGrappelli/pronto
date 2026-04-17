import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './database.types'

// In SaaS mode, cookies must be shared across *.trypronto.app subdomains
// so that a user authenticated on trypronto.app can access their subdomain dashboard.
function cookieDomain(): string | undefined {
  if (
    process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas' &&
    process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  }
  return undefined
}

export function createClient() {
  const cookieStore = cookies()
  const domain = cookieDomain()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, { ...options, ...(domain ? { domain } : {}) })
            )
          } catch {
            // Server Component — cookies set by middleware
          }
        },
      },
    }
  )
}
