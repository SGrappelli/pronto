'use client'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  page: string
}

/**
 * Zero-render client component: attaches a single delegated click listener
 * to the document. Works with both JSX and dangerouslySetInnerHTML pages,
 * keeping the parent page as a Server Component so metadata exports stay intact.
 */
export function AnalyticsListener({ page }: Props) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      const cls = anchor.className ?? ''
      const ariaLabel = anchor.getAttribute('aria-label') ?? ''

      // ── CTA "Start free" / "Empezar gratis" ─────────────────────────────────
      if (href === '/register') {
        trackEvent('cta_click', { label: 'start_free', page })
        return
      }

      // ── Sign in / Iniciar sesión ─────────────────────────────────────────────
      if (href === '/login') {
        trackEvent('login_click', { label: 'nav_signin' })
        return
      }

      // ── Pricing / Precios nav link ───────────────────────────────────────────
      if (href === '/pricing' || href === '/es/precios') {
        // Only fire pricing_click for nav-level links (not footer)
        const inFooter = !!anchor.closest('footer, .footer-links, [class*="footerLinks"]')
        if (!inFooter) {
          trackEvent('pricing_click', { source: page })
          return
        }
      }

      // ── Language switcher ────────────────────────────────────────────────────
      if (cls.includes('lang-switcher')) {
        const to = href.startsWith('/es') ? 'es' : 'en'
        trackEvent('language_switch', { to })
        return
      }

      // ── GitHub ───────────────────────────────────────────────────────────────
      if (href.includes('github.com')) {
        let label = 'footer_link'
        if (
          cls.includes('btn-outline') ||
          cls.includes('btnOutline') ||
          cls.includes('btn-nav') ||
          cls.includes('btnNav')
        ) {
          label = 'cta_button'
        } else if (ariaLabel.toLowerCase().includes('github')) {
          // Social icon in footer-social area
          label = 'footer_link'
        }
        trackEvent('github_click', { label, page })
        return
      }

      // ── Social icons in footer ───────────────────────────────────────────────
      if (href.includes('x.com') || href.includes('twitter.com')) {
        trackEvent('social_click', { platform: 'twitter' })
        return
      }
      if (href.includes('linkedin.com')) {
        trackEvent('social_click', { platform: 'linkedin' })
        return
      }
      if (href.includes('youtube.com')) {
        trackEvent('social_click', { platform: 'youtube' })
        return
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [page])

  return null
}
