import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

interface UpgradeBannerProps {
  title: string
  description: string
  ctaText?: string
}

export function UpgradeBanner({ title, description, ctaText = 'Upgrade →' }: UpgradeBannerProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
      <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-orange-900">{title}</p>
        <p className="text-sm text-orange-700 mt-0.5">{description}</p>
      </div>
      <Link
        href="/pricing"
        className="shrink-0 text-sm font-semibold text-orange-700 hover:text-orange-900 whitespace-nowrap"
      >
        {ctaText}
      </Link>
    </div>
  )
}
