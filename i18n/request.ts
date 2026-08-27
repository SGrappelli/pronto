import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const SUPPORTED = ['en', 'es', 'it', 'pt', 'nl'] as const
type Locale = (typeof SUPPORTED)[number]

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const cookieVal = cookieStore.get('dashboard_locale')?.value

  let locale: Locale = 'en'
  if (cookieVal && (SUPPORTED as readonly string[]).includes(cookieVal)) {
    locale = cookieVal as Locale
  } else {
    const headersList = await headers()
    const headerLocale = headersList.get('x-dashboard-locale')
    if (headerLocale && (SUPPORTED as readonly string[]).includes(headerLocale)) {
      locale = headerLocale as Locale
    } else {
      const acceptLang = headersList.get('accept-language')?.toLowerCase() ?? ''
      const detected = acceptLang.startsWith('pt')
        ? 'pt'
        : acceptLang.startsWith('es')
        ? 'es'
        : acceptLang.startsWith('it')
        ? 'it'
        : acceptLang.startsWith('nl')
        ? 'nl'
        : null
      if (detected) {
        locale = detected
      }
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
