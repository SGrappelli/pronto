import { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import { Check, Minus } from 'lucide-react'
import { PricingCards } from './PricingCards'
import styles from '../(public)/public-layout.module.css'
import { TrackedLink } from '@/components/tracked-link'
import { TrackedAnchor } from '@/components/tracked-anchor'
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

export const metadata: Metadata = {
  title: 'Pricing — Pronto | Free POS, CRM & Booking Software',
  description:
    'Pronto plans from $0/month. Free plan available — no credit card required. Starter $19, Pro $39, Agency $79. POS, CRM, booking and omnichannel notifications for service businesses.',
  keywords: [
    'pronto pricing', 'pos software pricing', 'crm software price',
    'appointment booking software cost', 'free pos system price',
    'salon management software pricing', 'service business software plans',
    'small business pos cost', 'open source pos pricing', 'booking software subscription',
  ],
  alternates: {
    canonical: 'https://trypronto.app/pricing',
    languages: {
      en: 'https://trypronto.app/pricing',
      es: 'https://trypronto.app/es/precios',
      'pt-BR': 'https://trypronto.app/pt/precos',
      'x-default': 'https://trypronto.app/pricing',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pricing',
    title: 'Pricing — Pronto | Free POS, CRM & Booking Software',
    description:
      'Plans from $0/month. Free plan available — no credit card required. POS, CRM, booking and notifications for salons, barbershops, cafes and any service SMB.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Pronto | Free POS, CRM & Booking Software',
    description:
      'Plans from $0/month. Free plan available — no credit card required.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app',
  description: 'Free open-source POS, CRM, inventory and appointment booking for service businesses.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', description: '1 employee, 100 clients, 50 bookings/month, POS + all notifications' },
    { '@type': 'Offer', name: 'Starter', price: '19', priceCurrency: 'USD', description: '3 employees, unlimited clients, unlimited bookings' },
    { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD', description: '15 employees, analytics, loyalty program, custom domain' },
    { '@type': 'Offer', name: 'Agency', price: '79', priceCurrency: 'USD', description: 'Unlimited employees, multiple locations, white-label, API' },
  ],
}

const pricingFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is there a free plan?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Free plan is free forever with no credit card required. It includes POS, CRM, inventory, online booking page, and all notification channels for 1 employee, up to 100 clients, and 50 bookings per month.' },
    },
    {
      '@type': 'Question',
      name: 'How much does Pronto cost?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pronto starts free forever. Paid plans are: Starter $19/month, Pro $39/month, Agency $79/month. Annual billing includes a 2-month discount.' },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel anytime?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can cancel your subscription at any time from Settings → Billing. No cancellation fees.' },
    },
  ],
}

const planColumns = [
  { name: 'Free',    highlight: false },
  { name: 'Starter', highlight: false },
  { name: 'Pro',     highlight: true  },
  { name: 'Agency',  highlight: false },
]

type FeatureValue = boolean | string

const comingSoonLabels = new Set([
  'Analytics dashboard',
  'Loyalty program',
  'Custom domain',
  'Multiple locations',
  'White-label mode',
  'API access',
  'Dedicated support & SLA',
])

const features: { label: string; values: FeatureValue[]; section?: string }[] = [
  { label: 'Team members',                        values: ['1', '3', '15', 'Unlimited'],   section: 'Limits' },
  { label: 'Clients in CRM',                      values: ['100', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Bookings / month',                    values: ['50', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'POS',                                 values: [true, true, true, true],        section: 'Features' },
  { label: 'CRM & client history',                values: [true, true, true, true] },
  { label: 'Inventory management',                values: [true, true, true, true] },
  { label: 'Online booking page',                 values: [true, true, true, true] },
  { label: 'Analytics dashboard',                 values: [false, false, true, true] },
  { label: 'Loyalty program',                     values: [false, false, true, true] },
  { label: 'Custom domain',                       values: [false, false, true, true] },
  { label: 'Multiple locations',                  values: [false, false, false, true] },
  { label: 'White-label mode',                    values: [false, false, false, true] },
  { label: 'API access',                          values: [false, false, false, true] },
  { label: 'Email notifications',                 values: [true, true, true, true],        section: 'Notifications' },
  { label: 'Telegram notifications',              values: [true, true, true, true] },
  { label: 'WhatsApp notifications',              values: [true, true, true, true] },
  { label: 'Viber notifications',                 values: [true, true, true, true] },
  { label: '"Powered by Pronto" badge',           values: [true, false, false, false],     section: 'Branding' },
  { label: 'Email support',                       values: [true, true, true, true],        section: 'Support' },
  { label: 'Priority support',                    values: [false, false, true, true] },
  { label: 'Dedicated support & SLA',             values: [false, false, false, true] },
]

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-5 h-5 text-blue-600 mx-auto" />
      : <Minus className="w-4 h-4 text-gray-300 mx-auto" />
  }
  return <span className="text-sm font-medium text-gray-700">{value}</span>
}

const linkStyle = { display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' } as const
const headStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#9ca3af', marginBottom: '14px' }

export default function PricingPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink
            href="/pricing"
            className={`${styles.navLink} ${styles.hideMob}`}
            eventName="pricing_click"
            eventParams={{ source: '/pricing' }}
          >
            Pricing
          </TrackedLink>
          <TrackedLink
            href="/login"
            className={`${styles.navLink} ${styles.hideTablet}`}
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

      <main className={styles.main}>
        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}>Simple, transparent pricing</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Free plan forever. No credit card required to start.
              </p>
            </div>

            <PricingCards />

            {/* Feature comparison table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/3">Feature</th>
                    {planColumns.map((plan) => (
                      <th
                        key={plan.name}
                        className={`px-4 py-4 font-semibold text-center ${
                          plan.highlight ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <>
                      {feature.section && (
                        <tr key={`section-${feature.section}`} className="bg-gray-100 border-t border-gray-200">
                          <td colSpan={5} className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {feature.section}
                          </td>
                        </tr>
                      )}
                      <tr
                        key={feature.label}
                        className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                      >
                        <td className="px-6 py-3.5 text-gray-700">
                          {feature.label}
                          {comingSoonLabels.has(feature.label) && (
                            <span className="ml-2 inline-block bg-amber-100 text-amber-700 text-xs font-medium px-1.5 py-0.5 rounded">Coming soon</span>
                          )}
                        </td>
                        {feature.values.map((val, j) => (
                          <td key={j} className="px-4 py-3.5 text-center">
                            <FeatureCell value={val} />
                          </td>
                        ))}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
              Prices shown in USD. Billing is handled securely by{' '}
              <span className="font-medium text-gray-700">Whop</span>.
              {' '}Annual plans include a 2-month discount. Questions? Contact us at{' '}
              <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                support@trypronto.app
              </a>
              .
            </p>

            {/* FAQ */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}>
                Frequently asked questions
              </h2>
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {[
                  {
                    q: 'Is there a free plan?',
                    a: 'Yes. The Free plan is free forever — no credit card required. It includes POS, CRM, inventory, online booking page, and all notification channels (Email, Telegram, WhatsApp, Viber) for 1 employee, up to 100 clients, and 50 bookings per month.',
                  },
                  {
                    q: 'How much does Pronto cost?',
                    a: 'Pronto starts free forever. Paid plans are: Starter $19/month, Pro $39/month, Agency $79/month. Annual billing includes a 2-month discount.',
                  },
                  {
                    q: 'Can I upgrade or downgrade my plan?',
                    a: 'Yes, you can change your plan at any time from Settings → Billing. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
                  },
                  {
                    q: 'Can I cancel anytime?',
                    a: 'Yes. Cancel anytime from Settings → Billing — no cancellation fees. You keep access until the end of the paid period.',
                  },
                  {
                    q: 'What payment methods are accepted?',
                    a: 'All major credit and debit cards (Visa, Mastercard, Amex) via Whop, our payment processor.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="py-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif" }}>{q}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footerGridWrap}>
        <div className={styles.footerGrid}>
          <div>
            <Link href="/" style={{ fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.5px', textDecoration: 'none' }}>
              Pronto<span style={{ color: '#16a34a' }}>.</span>
            </Link>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>Your data, your server.</div>
          </div>
          <div>
            <div style={headStyle}>Product</div>
            <Link href="/pricing" style={linkStyle}>Pricing</Link>
            <Link href="/for" style={linkStyle}>For businesses</Link>
          </div>
          <div>
            <div style={headStyle}>Compare</div>
            <Link href="/vs" style={linkStyle}>All comparisons</Link>
            <Link href="/vs/fresha" style={linkStyle}>vs Fresha</Link>
            <Link href="/vs/booksy" style={linkStyle}>vs Booksy</Link>
            <Link href="/vs/mindbody" style={linkStyle}>vs Mindbody</Link>
            <Link href="/vs/vagaro" style={linkStyle}>vs Vagaro</Link>
            <Link href="/vs/square" style={linkStyle}>vs Square</Link>
          </div>
          <div>
            <div style={headStyle}>Legal</div>
            <Link href="/terms" style={linkStyle}>Terms of Service</Link>
            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
            <Link href="/refund" style={linkStyle}>Refund Policy</Link>
          </div>
        </div>
        <div className={styles.footerGridBottom}>
          <div style={{ fontSize: '13px', color: '#9ca3af' }}>© 2026 Pronto. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <TrackedAnchor href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" eventName="social_click" eventParams={{ platform: 'twitter' }} style={{ color: '#9ca3af', display: 'flex', lineHeight: '1', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" eventName="social_click" eventParams={{ platform: 'linkedin' }} style={{ color: '#9ca3af', display: 'flex', lineHeight: '1', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" eventName="social_click" eventParams={{ platform: 'youtube' }} style={{ color: '#9ca3af', display: 'flex', lineHeight: '1', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" eventName="github_click" eventParams={{ label: 'footer_link', page: '/pricing' }} style={{ color: '#9ca3af', display: 'flex', lineHeight: '1', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </TrackedAnchor>
          </div>
        </div>
      </footer>
    </div>
  )
}
