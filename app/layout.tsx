import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import enMessages from '../messages/en.json'
import './globals.css'

// English fallback used only when the request-scoped next-intl config is
// unavailable (see RootLayout below).
const FALLBACK_MESSAGES = enMessages as Awaited<ReturnType<typeof getMessages>>

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pronto — Business Management for Service SMBs',
  description:
    'Self-hosted POS, CRM, Inventory & Omnichannel Notifications. Your data, your server. Zero commission. One command install.',
  keywords: [
    'open source POS',
    'self-hosted CRM',
    'appointment booking',
    'Telegram notifications',
    'salon management software',
    'small business management',
  ],
  // PWA
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pronto',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    images: [{ url: 'https://trypronto.app/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://trypronto.app/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // getLocale() / getMessages() read the request-scoped next-intl config. While
  // Next renders an error page (a not-found, or an exception bubbling to the
  // root) that scope can be missing and these throw — which would take the
  // error page down with it, leaving Next to emit a bare "Internal Server
  // Error". Degrade to English so the layout always renders. (issue #15)
  let locale = 'en'
  let messages = FALLBACK_MESSAGES
  try {
    locale = await getLocale()
    messages = await getMessages()
  } catch (err) {
    console.error('[RootLayout] next-intl request config unavailable, falling back to en:', err)
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
