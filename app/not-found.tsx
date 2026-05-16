'use client'

import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import styles from './landing.module.css'
import { TrackedLink } from '@/components/tracked-link'
import { LangSwitcher } from '@/components/LangSwitcher'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})

const helpfulLinks = [
  { href: '/pricing',         label: 'Pricing' },
  { href: 'https://github.com/SGrappelli/pronto', label: 'GitHub' },
  { href: '/for/salons',      label: 'For salons' },
  { href: '/for/barbershops', label: 'For barbershops' },
  { href: '/for/fitness',     label: 'For fitness' },
]

export default function NotFound() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      {/* NAV — same as homepage */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink
            href="/pricing"
            className={`${styles.navLink} ${styles.hideMob}`}
            eventName="pricing_click"
            eventParams={{ source: '/404' }}
          >
            Pricing
          </TrackedLink>
          <TrackedLink
            href="/login"
            className={styles.navLink}
            eventName="sign_in_click"
            eventParams={{ location: 'navbar', language: 'en' }}
          >
            Sign in
          </TrackedLink>
          <LangSwitcher />
          <TrackedLink
            href="/register"
            className={styles.btnNav}
            eventName="sign_up_click"
            eventParams={{ location: 'navbar', language: 'en' }}
          >
            Start free
          </TrackedLink>
        </div>
      </nav>

      {/* 404 CONTENT */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 220px)',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        {/* Decorative large number */}
        <div
          style={{
            fontSize: 'clamp(100px, 18vw, 180px)',
            fontWeight: 800,
            color: '#e5e7eb',
            lineHeight: 1,
            fontFamily: 'var(--font-bricolage)',
            marginBottom: '4px',
            userSelect: 'none',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: 'clamp(22px, 4vw, 34px)',
            fontWeight: 700,
            color: '#111827',
            fontFamily: 'var(--font-bricolage)',
            margin: '0 0 14px',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            color: '#6b7280',
            fontSize: '17px',
            lineHeight: 1.6,
            maxWidth: '400px',
            fontFamily: 'var(--font-dm-sans)',
            margin: '0 0 40px',
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          {/* Primary */}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '13px 26px',
              borderRadius: '8px',
              background: '#16a34a',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-sans)',
              transition: 'background 0.15s',
            }}
          >
            Go to homepage →
          </Link>

          {/* Secondary — with GA tracking */}
          <Link
            href="/register"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
                ;(window as any).gtag('event', 'sign_up_click', { location: 'hero', language: 'en' })
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '13px 26px',
              borderRadius: '8px',
              border: '1.5px solid #d1d5db',
              color: '#374151',
              fontWeight: 600,
              fontSize: '16px',
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-sans)',
              transition: 'border-color 0.15s',
            }}
          >
            Start free →
          </Link>
        </div>

        {/* Helpful links */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {helpfulLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                color: '#9ca3af',
                fontSize: '14px',
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER — same as homepage */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Pronto<span>.</span>
        </div>
        <div className={styles.footerCopy}>© 2026 Pronto. All rights reserved.</div>
        <div className={styles.footerLinks}>
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/for">For businesses</Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/for/salons">Salons</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund">Refund policy</Link>
        </div>
      </footer>
    </div>
  )
}
