import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function CheckEmailPage() {
  const t = await getTranslations('auth.checkEmail')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-7 h-7 text-blue-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{t('heading')}</h1>
        <p className="text-sm text-gray-500 mb-6">{t('body')}</p>
        <p className="text-xs text-gray-400">
          {t('noEmail')}{' '}
          <Link href="/register" className="text-blue-600 hover:underline">{t('registerAgain')}</Link>
        </p>
      </div>
    </div>
  )
}
