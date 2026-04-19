import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './landing.module.css'

export const metadata: Metadata = {
  title: 'Pronto — Free Open Source POS, CRM & Booking for Service Businesses',
  description:
    'Pronto is a free, open-source POS, CRM, and appointment booking system for salons, barbershops, auto repair shops, cafes and any service SMB. Self-hosted or cloud. Zero commission. One command install.',
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
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/',
    title: 'Pronto — Free Open Source POS & CRM for Service Businesses',
    description:
      'Self-hosted POS, CRM, Booking and Omnichannel notifications. Zero commission. One command install.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto — Free Open Source POS & CRM for Service Businesses',
    description:
      'Self-hosted POS, CRM, Booking and Omnichannel notifications. Zero commission. One command install.',
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

export default function RootPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <Link href="/pricing" className={`${styles.navLink} ${styles.hideMob}`}>
            Pricing
          </Link>
          <Link href="/login" className={styles.navLink}>
            Sign in
          </Link>
          <Link href="/register" className={styles.btnNav}>
            Start free
          </Link>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className={styles.hero}>
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
        </section>

        {/* EVERYTHING IN ONE PLACE */}
        <section className={`${styles.sec} ${styles.secGray}`}>
          <div className={styles.secHead}>
            <h2>Everything in one place</h2>
            <p>
              Works the same whether you self-host or use our cloud. No integrations needed. No
              plugins. No transaction fees.
            </p>
          </div>
          <div className={styles.bizTags}>
            <span className={styles.bizTag}>Beauty salons</span>
            <span className={styles.bizTag}>Barbershops</span>
            <span className={styles.bizTag}>Auto repair shops</span>
            <span className={styles.bizTag}>Cafes</span>
            <span className={styles.bizTag}>Dental clinics</span>
            <span className={styles.bizTag}>Fitness clubs</span>
            <span className={styles.bizTag}>Massage &amp; spa</span>
            <span className={styles.bizTag}>And any other service SMB</span>
          </div>
          <div className={styles.featGrid}>
            <div className={styles.featCard}>
              <div className={styles.featIcon}>🛒</div>
              <h4>POS / Checkout</h4>
              <p>Complete a sale in 3 clicks. Cash, card, transfer. Works fully offline.</p>
            </div>
            <div className={styles.featCard}>
              <div className={styles.featIcon}>👥</div>
              <h4>CRM</h4>
              <p>Full client history — visits, spending, tags, birthday, notes.</p>
            </div>
            <div className={styles.featCard}>
              <div className={styles.featIcon}>📦</div>
              <h4>Inventory</h4>
              <p>Track stock levels. Low-stock alerts via all notification channels.</p>
            </div>
            <div className={styles.featCard}>
              <div className={styles.featIcon}>📅</div>
              <h4>Booking calendar</h4>
              <p>Week view, drag &amp; drop. No double-booking at database level.</p>
            </div>
            <div className={styles.featCard}>
              <div className={styles.featIcon}>🔗</div>
              <h4>Online booking</h4>
              <p>Public page — clients book with just a name &amp; phone. No registration required.</p>
            </div>
            <div className={styles.featCard}>
              <div className={styles.featIcon}>📱</div>
              <h4>PWA</h4>
              <p>Install on any device directly from the browser. Works offline.</p>
            </div>
          </div>
        </section>

        {/* BUILT FOR SERVICE BUSINESSES */}
        <section className={`${styles.sec} ${styles.secWhite}`}>
          <div className={styles.secHead}>
            <h2>Built for service businesses</h2>
            <p>Replacing Excel, manual reminders, and expensive platforms that own your clients.</p>
          </div>
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
        </section>

        {/* OMNICHANNEL NOTIFICATIONS */}
        <section className={`${styles.sec} ${styles.secGray}`}>
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
          <div className={styles.eventsGrid}>
            <div className={styles.eventItem}>
              <div className={styles.evIcon}>✅</div>
              <div className={styles.evText}>Booking confirmed</div>
              <div className={styles.evSub}>Sent immediately after booking</div>
            </div>
            <div className={styles.eventItem}>
              <div className={styles.evIcon}>🔔</div>
              <div className={styles.evText}>Appointment reminder</div>
              <div className={styles.evSub}>24h and 1h before visit</div>
            </div>
            <div className={styles.eventItem}>
              <div className={styles.evIcon}>🙏</div>
              <div className={styles.evText}>Thank you message</div>
              <div className={styles.evSub}>2 hours after visit</div>
            </div>
            <div className={styles.eventItem}>
              <div className={styles.evIcon}>💤</div>
              <div className={styles.evText}>Re-activation</div>
              <div className={styles.evSub}>&ldquo;Haven&rsquo;t seen you in 30 days&rdquo;</div>
            </div>
            <div className={styles.eventItem}>
              <div className={styles.evIcon}>🎂</div>
              <div className={styles.evText}>Birthday greeting</div>
              <div className={styles.evSub}>Sent automatically</div>
            </div>
            <div className={styles.eventItem}>
              <div className={styles.evIcon}>⚠️</div>
              <div className={styles.evText}>Low stock alert</div>
              <div className={styles.evSub}>To business owner</div>
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
              <a
                href="https://github.com/SGrappelli/pronto"
                className={styles.btnOutline}
                style={{ marginTop: '16px' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
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
                <div className={styles.trialBig}>14 days free</div>
                <div>
                  <div className={styles.trialText}>Try any paid plan free for 14 days.</div>
                  <div className={styles.trialNote}>No credit card required. Cancel anytime.</div>
                </div>
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
              <Link href="/register" className={styles.btnPrimary}>
                Start free — no credit card
              </Link>
            </div>
          </div>

          {/* PRICING TABLE */}
          <div className={styles.plansWrap}>
            <div className={styles.plansTitle}>Cloud pricing</div>
            <div className={styles.plans}>
              <div className={styles.plan}>
                <div className={styles.planName}>Free</div>
                <div className={styles.planPrice}>$0</div>
                <div className={styles.planTrial}>Free forever</div>
                <div className={styles.planLimit}>1 employee · 100 clients</div>
                <ul className={styles.planFeats}>
                  <li>POS + CRM + Inventory</li>
                  <li>Email notifications</li>
                  <li>Online booking page</li>
                </ul>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Starter</div>
                <div className={styles.planPrice}>
                  $19<span>/mo</span>
                </div>
                <div className={styles.planTrial}>14-day free trial</div>
                <div className={styles.planLimit}>3 employees · 1 000 clients</div>
                <ul className={styles.planFeats}>
                  <li>+ Telegram &amp; WhatsApp</li>
                  <li>+ Online booking</li>
                </ul>
              </div>
              <div className={`${styles.plan} ${styles.featured}`}>
                <div className={styles.planPopular}>Most popular</div>
                <div className={styles.planName}>Pro</div>
                <div className={styles.planPrice}>
                  $39<span>/mo</span>
                </div>
                <div className={styles.planTrial}>14-day free trial</div>
                <div className={styles.planLimit}>15 employees · unlimited</div>
                <ul className={styles.planFeats}>
                  <li>+ Viber notifications</li>
                  <li>
                    + Analytics <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                  <li>+ Custom domain</li>
                  <li>
                    + Loyalty program <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                </ul>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Agency</div>
                <div className={styles.planPrice}>
                  $79<span>/mo</span>
                </div>
                <div className={styles.planTrial}>14-day free trial</div>
                <div className={styles.planLimit}>Multiple locations</div>
                <ul className={styles.planFeats}>
                  <li>+ White-label</li>
                  <li>
                    + API access <span className={styles.badgeSoon}>Coming soon</span>
                  </li>
                  <li>+ Priority support</li>
                </ul>
              </div>
            </div>
            <p className={styles.pricingNote}>
              <Link href="/pricing">See full pricing →</Link>
            </p>
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
              with a 14-day free trial.
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

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Pronto<span>.</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund">Refund policy</Link>
          <a
            href="https://github.com/SGrappelli/pronto"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
