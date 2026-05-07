'use client'
import { trackEvent } from '@/lib/analytics'

interface TrackedAnchorProps {
  href: string
  eventName: string
  eventParams?: Record<string, string>
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

export function TrackedAnchor({
  href,
  eventName,
  eventParams,
  children,
  className,
  target,
  rel,
  style,
  'aria-label': ariaLabel,
}: TrackedAnchorProps) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      style={style}
      aria-label={ariaLabel}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </a>
  )
}
