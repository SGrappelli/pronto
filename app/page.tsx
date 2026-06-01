import type { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import styles from './landing.module.css'
import { TrackedLink } from '@/components/tracked-link'
import { LangSwitcher } from '@/components/LangSwitcher'
import { TrackedAnchor } from '@/components/tracked-anchor'

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
  title: 'Pronto — Free Open Source POS, CRM & Booking for Service Businesses',
  description:
    'Free open-source POS, CRM and booking for salons, barbershops, cafes & auto repair. WhatsApp & Telegram alerts. Zero commission. Self-hosted or cloud.',
  keywords: [
    'open source POS',
    'self-hosted CRM',
    'appointment booking software',
    'salon management software',
    'barbershop software',
    'free POS system',
    'auto repair shop software',
    'small business management',
    'Telegram notifications',
    'WhatsApp booking',
  ],
  alternates: {
    canonical: 'https://trypronto.app/',
    languages: {
      en: 'https://trypronto.app/',
      es: 'https://trypronto.app/es/',
      'pt-BR': 'https://trypronto.app/pt/',
      'x-default': 'https://trypronto.app/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/',
    title: 'Pronto — Free Open Source POS & CRM for Service Businesses',
    description:
      'Self-hosted POS, CRM, Booking and Omnichannel notifications. Zero commission. One command install.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto — Free Open Source POS & CRM for Service Businesses',
    description:
      'Self-hosted POS, CRM, Booking and Omnichannel notifications. Zero commission. One command install.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app',
  description:
    'Free open-source POS, CRM, inventory and appointment booking for service businesses.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Linux, Windows, macOS',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Starter', price: '19', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Agency', price: '79', priceCurrency: 'USD' },
  ],
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Pronto really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The self-hosted version is free forever under MIT license with no limits. The cloud version has a free tier and paid plans from $19/month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto charge commission on bookings?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Zero commission on all bookings and sales.' },
    },
    {
      '@type': 'Question',
      name: 'Do clients need to register to book?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Just name and phone number — no account needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run: docker compose up -d. Requires Docker on any Linux, Windows or macOS machine with 1GB RAM.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which messengers are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Email, Telegram, WhatsApp and Viber. LINE and SMS coming soon.',
      },
    },
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pronto',
  url: 'https://trypronto.app',
  logo: 'https://trypronto.app/logo.png',
  sameAs: ['https://github.com/SGrappelli/pronto'],
}

export default function RootPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink href="/pricing" className={`${styles.navLink} ${styles.hideMob}`} eventName="pricing_click" eventParams={{ source: '/' }}>
            Pricing
          </TrackedLink>
          <TrackedLink href="/login" className={styles.navLink} eventName="sign_in_click" eventParams={{ location: 'navbar', language: 'en' }}>
            Sign in
          </TrackedLink>
          <LangSwitcher />
          <TrackedLink href="/register" className={styles.btnNav} eventName="sign_up_click" eventParams={{ location: 'navbar', language: 'en' }}>
            Start free
          </TrackedLink>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <h1>
                Stop paying
                <br />
                <em>20% commission</em>
                <br />
                on your own clients
              </h1>
              <p className={styles.heroDesc}>
                POS · CRM · Booking · Inventory · Omnichannel notifications — for any service business.
                Self-hosted or cloud, your choice.
              </p>
            </div>
            <div className={styles.heroVideoCol}>
              <div className={styles.browserMockup}>
                <div className={styles.browserBar}>
                  <span className={`${styles.browserDot} ${styles.browserDotRed}`} />
                  <span className={`${styles.browserDot} ${styles.browserDotYellow}`} />
                  <span className={`${styles.browserDot} ${styles.browserDotGreen}`} />
                </div>
                <video
                  src="/demo-booking.mp4"
                  poster="/demo-booking-poster.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={styles.browserVideo}
                />
              </div>
            </div>
          </div>
        </section>

        {/* EVERYTHING IN ONE PLACE */}
        <section className={`${styles.sec} ${styles.secWhite}`}>
          <div className={styles.secHead}>
            <h2>Everything in one place</h2>
            <p>
              Works the same whether you self-host or use our cloud. No integrations needed. No
              plugins. No transaction fees.
            </p>
          </div>
          <div className={styles.bizTags}>
            <span className={`${styles.bizTag} ${styles.bt1}`}>Beauty salons</span>
            <span className={`${styles.bizTag} ${styles.bt2}`}>Barbershops</span>
            <span className={`${styles.bizTag} ${styles.bt3}`}>Auto repair shops</span>
            <span className={`${styles.bizTag} ${styles.bt4}`}>Cafes</span>
            <span className={`${styles.bizTag} ${styles.bt5}`}>Dental clinics</span>
            <span className={`${styles.bizTag} ${styles.bt6}`}>Fitness clubs</span>
            <span className={`${styles.bizTag} ${styles.bt7}`}>Massage &amp; spa</span>
            <span className={`${styles.bizTag} ${styles.bt8}`}>And any other service SMB</span>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.featGrid}>
              <div className={styles.featCard}>
                <h4>POS / Checkout</h4>
                <p>Complete a sale in 3 clicks. Cash, card, transfer. Works fully offline.</p>
              </div>
              <div className={styles.featCard}>
                <h4>CRM</h4>
                <p>Full client history — visits, spending, tags, birthday, notes.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Inventory</h4>
                <p>Track stock levels. Low-stock alerts via all notification channels.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Booking calendar</h4>
                <p>Week view, drag &amp; drop. No double-booking at database level.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Online booking</h4>
                <p>Public page — clients book with just a name &amp; phone. No registration required.</p>
              </div>
              <div className={styles.featCard}>
                <h4>PWA</h4>
                <p>Install on any device directly from the browser. Works offline.</p>
              </div>
            </div>
          </div>
          <div className={styles.demoWrap}>
            <div className={styles.browserMockup}>
              <div className={styles.browserBar}>
                <span className={`${styles.browserDot} ${styles.browserDotRed}`} />
                <span className={`${styles.browserDot} ${styles.browserDotYellow}`} />
                <span className={`${styles.browserDot} ${styles.browserDotGreen}`} />
              </div>
              <video
                src="/demo-calendar.mp4"
                poster="/demo-calendar-poster.png"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className={styles.browserVideo}
              />
            </div>
          </div>
        </section>

        {/* BUILT FOR SERVICE BUSINESSES */}
        <section className={`${styles.sec} ${styles.secWarm}`}>
          <div className={styles.secHead}>
            <h2>Built for service businesses</h2>
            <p>Replacing Excel, manual reminders, and expensive platforms that own your clients.</p>
          </div>
          <div className={styles.cardsWrap}>
          <div className={styles.painGrid}>
            <div className={styles.painCard}>
              <div className={styles.painFromLabel}>From</div>
              <div className={styles.painFromText}>Excel spreadsheets</div>
              <div className={styles.painArrow}>↓</div>
              <div className={styles.painTo}>CRM + POS in one interface</div>
            </div>
            <div className={styles.painCard}>
              <div className={styles.painFromLabel}>From</div>
              <div className={styles.painFromText}>Manual reminders</div>
              <div className={styles.painArrow}>↓</div>
              <div className={styles.painTo}>
                Auto-notifications via Telegram, WhatsApp, Viber, Email
              </div>
            </div>
            <div className={styles.painCard}>
              <div className={styles.painFromLabel}>From</div>
              <div className={styles.painFromText}>Platform takes 20%</div>
              <div className={styles.painArrow}>↓</div>
              <div className={styles.painTo}>Clients book directly — 0% commission</div>
            </div>
            <div className={styles.painCard}>
              <div className={styles.painFromLabel}>From</div>
              <div className={styles.painFromText}>ERPNext too complex</div>
              <div className={styles.painArrow}>↓</div>
              <div className={styles.painTo}>UI anyone can learn in 10 minutes</div>
            </div>
            <div className={styles.painCard}>
              <div className={styles.painFromLabel}>From</div>
              <div className={styles.painFromText}>No analytics</div>
              <div className={styles.painArrow}>↓</div>
              <div className={styles.painTo}>Revenue dashboard, LTV, top services</div>
            </div>
            <div className={styles.painCard}>
              <div className={styles.painFromLabel}>From</div>
              <div className={styles.painFromText}>Client data locked in platform</div>
              <div className={styles.painArrow}>↓</div>
              <div className={styles.painTo}>Self-hosted: data stays on your server</div>
            </div>
          </div>
          </div>
        </section>

        {/* OMNICHANNEL NOTIFICATIONS */}
        <section className={`${styles.sec} ${styles.secBlue}`}>
          <div className={styles.secHead}>
            <h2>Omnichannel notifications</h2>
            <p>
              The only open-source POS with all four channels built in — no plugins, no complex
              setup.
            </p>
          </div>
          <div className={styles.channelRow}>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotGreen}`}></span>Email
            </div>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotBlue}`}></span>Telegram
            </div>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotGreen}`}></span>WhatsApp
            </div>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotPurple}`}></span>Viber
            </div>
            <div className={`${styles.channel} ${styles.soon}`}>
              <span className={`${styles.dot} ${styles.dotGray}`}></span>LINE{' '}
              <span className={styles.badgeSoon}>Coming soon</span>
            </div>
            <div className={`${styles.channel} ${styles.soon}`}>
              <span className={`${styles.dot} ${styles.dotGray}`}></span>SMS{' '}
              <span className={styles.badgeSoon}>Coming soon</span>
            </div>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.notifGrid}>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Booking confirmed</div>
                <div className={styles.evSub}>Sent immediately after booking</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Appointment reminder</div>
                <div className={styles.evSub}>24h and 1h before visit</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Thank you message</div>
                <div className={styles.evSub}>2 hours after visit</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Re-activation</div>
                <div className={styles.evSub}>&ldquo;Haven&rsquo;t seen you in 30 days&rdquo;</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Birthday greeting</div>
                <div className={styles.evSub}>Sent automatically</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Low stock alert</div>
                <div className={styles.evSub}>To business owner</div>
              </div>
            </div>
          </div>
        </section>

        {/* TWO WAYS TO RUN PRONTO */}
        <section className={`${styles.sec} ${styles.secWhite}`}>
          <div className={styles.secHead}>
            <h2>Two ways to run Pronto</h2>
            <p>Pick what fits your business. Switch anytime.</p>
          </div>
          <div className={styles.twoPaths}>
            {/* SELF-HOSTED */}
            <div className={`${styles.pathCard} ${styles.self}`}>
              <div className={styles.pathLabel}>Option 1</div>
              <h3>Self-hosted</h3>
              <p className={styles.pathDesc}>
                Deploy on your own server. Your data never leaves your machine. Free forever.
                Requires Docker.
              </p>
              <div className={styles.shHighlights}>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>$0</div>
                  <div className={styles.shHlLabel}>Forever free</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>0%</div>
                  <div className={styles.shHlLabel}>Commission</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>∞</div>
                  <div className={styles.shHlLabel}>No limits</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>1</div>
                  <div className={styles.shHlLabel}>Command</div>
                </div>
              </div>
              <div className={styles.pathPoints}>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Your data, your server</strong> — client base lives only on your machine
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>MIT license</strong> — modify, extend, white-label freely
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Any infrastructure</strong> — Linux VPS, Windows, macOS. 1 GB RAM
                    minimum
                  </div>
                </div>
              </div>
              <div className={styles.codeBlock}>
                <span className={styles.codePrefix}>$</span>docker compose up -d
              </div>
              <br />
              <TrackedAnchor
                href="https://github.com/SGrappelli/pronto"
                className={styles.btnOutline}
                style={{ marginTop: '16px' }}
                target="_blank"
                rel="noopener noreferrer"
                eventName="github_click"
                eventParams={{ label: 'cta_button', page: '/' }}
              >
                View on GitHub →
              </TrackedAnchor>
              <Link href="/docs" className={styles.btnOutline} style={{ marginTop: '16px' }}>
                Documentation →
              </Link>
            </div>

            {/* CLOUD */}
            <div className={`${styles.pathCard} ${styles.cloud}`}>
              <div className={styles.pathLabel}>Option 2</div>
              <h3>Cloud — trypronto.app</h3>
              <p className={styles.pathDesc}>
                No server needed. Ready in 5 minutes. Your own subdomain. We handle updates,
                backups, and infrastructure.
              </p>
              <div className={styles.trialBanner}>
                <div className={styles.trialText}>Free plan — no credit card required.</div>
              </div>
              <div className={styles.pathPoints}>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Ready in minutes</strong> — register, onboard, get your subdomain
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Your own subdomain</strong> — salon-maya.trypronto.app or custom domain
                    on Pro+
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>We handle everything</strong> — updates, backups, uptime monitoring
                  </div>
                </div>
              </div>
              <TrackedLink href="/register" className={styles.btnPrimary} eventName="sign_up_click" eventParams={{ location: 'hero', language: 'en' }}>
                Start free — no credit card
              </TrackedLink>
              <p style={{ textAlign: 'center', marginTop: '8px' }}>
                <TrackedAnchor
                  href="https://demo.trypronto.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline"
                  eventName="demo_click"
                  eventParams={{ location: 'two_ways', language: 'en' }}
                >
                  or try live demo →
                </TrackedAnchor>
              </p>
            </div>
          </div>

          {/* PRICING TABLE */}
          <div className={styles.plansWrap}>
            <div className={styles.plansTitle}>Cloud pricing</div>
            <div className={styles.plans}>
              <div className={styles.plan}>
                <div className={styles.planName}>Free</div>
                <div className={styles.planPrice}>$0</div>
                <span className={styles.planTrialFree}>Free forever</span>
                <div className={styles.planLimit}>1 employee · 100 clients · 50 bookings/month</div>
                <ul className={styles.planFeats}>
                  <li>POS + CRM + Inventory</li>
                  <li>Email + Telegram + WhatsApp + Viber notifications</li>
                  <li>Online booking page</li>
                </ul>
                <p style={{fontSize:'11px',color:'#9ca3af',marginTop:'8px'}}>&ldquo;Powered by Pronto&rdquo; on booking page</p>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Starter</div>
                <div className={styles.planPrice}>
                  $19<span>/mo</span>
                </div>
                <div className={styles.planLimit}>3 employees · unlimited clients · unlimited bookings</div>
                <ul className={styles.planFeats}>
                  <li>Everything in Free</li>
                  <li>&ldquo;Powered by Pronto&rdquo; badge removed</li>
                </ul>
              </div>
              <div className={`${styles.plan} ${styles.featured}`}>
                <div className={styles.planPopular}>Most popular</div>
                <div className={styles.planName}>Pro</div>
                <div className={styles.planPrice}>
                  $39<span>/mo</span>
                </div>
                <div className={styles.planLimit}>15 employees · unlimited</div>
                <ul className={styles.planFeats}>
                  <li>Everything in Starter</li>
                  <li>
                    Analytics dashboard <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                  <li>
                    Custom domain <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                  <li>
                    Loyalty program <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                </ul>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Agency</div>
                <div className={styles.planPrice}>
                  $79<span>/mo</span>
                </div>
                <div className={styles.planLimit}>Multiple locations</div>
                <ul className={styles.planFeats}>
                  <li>Everything in Pro</li>
                  <li>
                    White-label <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                  <li>
                    API access <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                  <li>Priority support</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-base font-medium mt-3">
              <Link href="/pricing" className="text-blue-600 hover:text-blue-800 underline underline-offset-2">See full pricing →</Link>
            </p>
            <p className="text-center text-base font-medium text-gray-700 mt-2">Switching from another tool? <Link href="/vs/" className="text-blue-600 hover:text-blue-800 underline underline-offset-2">See how we compare →</Link></p>
          </div>
        </section>
      </main>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.faqInner}>
          <h2>Frequently asked questions</h2>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Is Pronto really free?</div>
            <div className={styles.faqA}>
              Yes. The self-hosted version is free forever under MIT license — no limits on clients,
              staff, or features. The cloud version has a free tier and paid plans from $19/month
              with a permanent free plan.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Does Pronto charge commission on bookings?</div>
            <div className={styles.faqA}>
              No. Zero commission on all bookings and sales. Clients book directly with your
              business — no marketplace, no middleman.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Do clients need to create an account to book?</div>
            <div className={styles.faqA}>
              No. The public booking page only requires a name and phone number. No registration, no
              password, no app to download.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>How do I install the self-hosted version?</div>
            <div className={styles.faqA}>
              You need Docker on any Linux VPS, Windows, or macOS machine with at least 1 GB RAM.
              Run{' '}
              <code
                style={{
                  background: '#f3f4f6',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                docker compose up -d
              </code>{' '}
              and the app starts automatically.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Which messaging apps are supported?</div>
            <div className={styles.faqA}>
              Currently Email, Telegram, WhatsApp (via Meta Cloud API), and Viber. LINE and SMS are
              coming soon.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>What types of businesses can use Pronto?</div>
            <div className={styles.faqA}>
              Any service business: beauty salons, barbershops, auto repair shops, cafes, dental
              clinics, fitness clubs, massage and spa — and anything else where clients book
              appointments or pay for services.
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footerGridWrap}>
        <div className={styles.footerGrid}>
          <div>
            <Link href="/" style={{fontSize:'22px',fontWeight:800,color:'#111',letterSpacing:'-0.5px',textDecoration:'none'}}>Pronto<span style={{color:'#16a34a'}}>.</span></Link>
            <div style={{fontSize:'13px',color:'#6b7280',marginTop:'6px'}}>Your data, your server.</div>
          </div>
          <div>
            <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase' as const,color:'#9ca3af',marginBottom:'14px'}}>Product</div>
            <Link href="/pricing" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Pricing</Link>
            <Link href="/for" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>For businesses</Link>
            <Link href="/blog" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Blog</Link>
          </div>
          <div>
            <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase' as const,color:'#9ca3af',marginBottom:'14px'}}>Compare</div>
            <Link href="/vs" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>All comparisons</Link>
            <Link href="/vs/fresha" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Fresha</Link>
            <Link href="/vs/booksy" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Booksy</Link>
            <Link href="/vs/mindbody" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Mindbody</Link>
            <Link href="/vs/vagaro" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Vagaro</Link>
            <Link href="/vs/square" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Square</Link>
          </div>
          <div>
            <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase' as const,color:'#9ca3af',marginBottom:'14px'}}>Legal</div>
            <Link href="/terms" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Terms of Service</Link>
            <Link href="/privacy" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Privacy Policy</Link>
            <Link href="/refund" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Refund Policy</Link>
          </div>
        </div>
        <div className={styles.footerGridBottom}>
          <div style={{fontSize:'13px',color:'#9ca3af'}}>© 2026 Pronto. All rights reserved.</div>
          <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
            <TrackedAnchor href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" eventName="social_click" eventParams={{ platform: 'twitter' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" eventName="social_click" eventParams={{ platform: 'linkedin' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" eventName="social_click" eventParams={{ platform: 'youtube' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" eventName="github_click" eventParams={{ label: 'footer_link' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </TrackedAnchor>
          </div>
        </div>
      </footer>
    </div>
  )
}
