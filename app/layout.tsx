import type { Metadata, Viewport } from 'next'
import { Inter, Syne, DM_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})

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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pronto',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/apple-touch-icon.png',
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
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${syne.variable} ${dmSans.variable}`}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
