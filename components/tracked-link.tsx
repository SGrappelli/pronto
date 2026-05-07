'use client'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

interface TrackedLinkProps {
  href: string
  eventName: string
  eventParams?: Record<string, string>
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  style?: React.CSSProperties
}

export function TrackedLink({
  href,
  eventName,
  eventParams,
  children,
  className,
  target,
  rel,
  style,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      style={style}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  )
}
