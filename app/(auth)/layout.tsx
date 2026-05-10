import { getTranslations } from 'next-intl/server'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('brand')
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-bold no-underline" style={{ color: '#111', letterSpacing: '-0.5px' }}>Pronto<span style={{ color: '#16a34a' }}>.</span></a>
          <p className="text-sm text-gray-500 mt-1">{t('tagline')}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
