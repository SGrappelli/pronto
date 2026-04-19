import Link from 'next/link'
import { LandingNav } from '@/components/landing/landing-nav'

const isSaaS = (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE || 'saas') === 'saas'

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-syne font-bold text-3xl sm:text-4xl text-gray-900 mb-4">{title}</h2>
      <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}

function TransformCard({ from, to }: { from: string; to: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">FROM</div>
      <div className="text-sm text-gray-600 mb-3">{from}</div>
      <div className="text-gray-400 text-xl mb-3">↓</div>
      <div className="text-sm font-semibold text-gray-900">{to}</div>
    </div>
  )
}

function NotificationCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <div className="font-semibold text-gray-900 text-sm">{title}</div>
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      </div>
    </div>
  )
}

export default function RootPage() {
  return (
    <div className="font-dm-sans min-h-screen bg-white">
      <LandingNav />

      {/* ── 1. HERO ── */}
      <section className="pt-32 pb-24 px-6 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            v1.0 — available now
          </div>

          <h1 className="font-syne font-extrabold text-[36px] sm:text-[48px] lg:text-[60px] leading-tight text-gray-900 mb-6">
            Stop paying{' '}
            <span className="text-green-600">20% commission</span>
            <br />
            on your own clients
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            POS · CRM · Booking · Inventory · Omnichannel notifications —
            <br className="hidden sm:block" />
            for any service business. Self-hosted or cloud, your choice.
          </p>
        </div>
      </section>

      {/* ── 2. EVERYTHING IN ONE PLACE ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Everything in one place"
            subtitle="Works the same whether you self-host or use our cloud. No integrations needed."
          />

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              'Beauty salons',
              'Barbershops',
              'Auto repair shops',
              'Cafes',
              'Dental clinics',
              'Fitness clubs',
              'Massage & spa',
              'And any other service SMB',
            ].map((tag) => (
              <span
                key={tag}
                className="bg-white border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon="🛒"
              title="POS / Checkout"
              description="Complete a sale in 3 clicks. Cash, card, transfer. Offline mode."
            />
            <FeatureCard
              icon="👥"
              title="CRM"
              description="Full client history — visits, spending, tags, birthday, notes."
            />
            <FeatureCard
              icon="📦"
              title="Inventory"
              description="Track stock levels. Low-stock alerts via all notification channels."
            />
            <FeatureCard
              icon="📅"
              title="Booking calendar"
              description="Week view, drag & drop. No double-booking at database level."
            />
            <FeatureCard
              icon="🔗"
              title="Online booking"
              description="Public page — clients book with just a name & phone. No registration required."
            />
            <FeatureCard
              icon="📱"
              title="PWA"
              description="Install on any device directly from the browser. Works offline."
            />
          </div>
        </div>
      </section>

      {/* ── 3. BUILT FOR SERVICE BUSINESSES ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Built for service businesses"
            subtitle="Replacing Excel, manual reminders, and expensive platforms that own your clients."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TransformCard from="Excel spreadsheets" to="CRM + POS in one interface" />
            <TransformCard
              from="Manual reminders"
              to="Auto-notifications via Telegram, WhatsApp, Viber, Email"
            />
            <TransformCard
              from="Platform takes 20%"
              to="Clients book directly — 0% commission"
            />
            <TransformCard
              from="ERPNext too complex"
              to="UI anyone can learn in 10 minutes"
            />
            <TransformCard from="No analytics" to="Revenue dashboard, LTV, top services" />
            <TransformCard
              from="Client data locked in platform"
              to="Self-hosted: data stays on your server"
            />
          </div>
        </div>
      </section>

      {/* ── 4. OMNICHANNEL NOTIFICATIONS ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Omnichannel notifications"
            subtitle="The only open-source POS with all four channels built in — no plugins, no complex setup."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full" /> Email
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full" /> Telegram
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full" /> WhatsApp
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full" /> Viber
            </div>
            <div className="relative flex items-center gap-2 border border-dashed border-gray-300 rounded-full px-4 py-2 text-sm text-gray-400 opacity-60">
              LINE
              <span className="absolute -top-2.5 -right-1 bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                Coming soon
              </span>
            </div>
            <div className="relative flex items-center gap-2 border border-dashed border-gray-300 rounded-full px-4 py-2 text-sm text-gray-400 opacity-60">
              SMS
              <span className="absolute -top-2.5 -right-1 bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                Coming soon
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <NotificationCard
              icon="✅"
              title="Booking confirmed"
              description="Sent immediately after booking"
            />
            <NotificationCard
              icon="🔔"
              title="Appointment reminder"
              description="24h and 1h before visit"
            />
            <NotificationCard
              icon="🙏"
              title="Thank you message"
              description="2 hours after visit"
            />
            <NotificationCard
              icon="💤"
              title="Re-activation"
              description="'Haven't seen you in 30 days'"
            />
            <NotificationCard icon="🎂" title="Birthday greeting" description="Sent automatically" />
            <NotificationCard icon="⚠️" title="Low stock alert" description="To business owner" />
          </div>
        </div>
      </section>

      {/* ── 5. OPTION 1 — SELF-HOSTED ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
            OPTION 1
          </div>
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Self-hosted
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Deploy on your own server. Your data never leaves your machine. Free forever. Requires
              Docker.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { num: '$0', label: 'Forever free, no limits' },
                { num: '0%', label: 'Commission on bookings & sales' },
                { num: '∞', label: 'Clients, staff & features — all included' },
                { num: '1', label: 'Command to install' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="font-syne font-extrabold text-3xl text-green-600 mb-1">
                    {num}
                  </div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: 'Your data, your server',
                desc: 'Client base and history live only on your machine. No vendor lock-in.',
              },
              {
                title: 'MIT license',
                desc: 'Open source. Modify, extend, white-label — do whatever you need.',
              },
              {
                title: 'Any infrastructure',
                desc: 'Runs on any Linux VPS, Windows, or macOS. 1 GB RAM minimum.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-xl px-6 py-4 font-mono text-green-400 text-sm mb-8 overflow-x-auto">
            <span className="text-gray-500 select-none">$ </span>docker compose up -d
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/SGrappelli/pronto"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center"
            >
              View on GitHub →
            </a>
            <Link
              href="/docs"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. OPTION 2 — CLOUD (saas only) ── */}
      {isSaaS && (
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
              OPTION 2
            </div>
            <div className="text-center mb-12">
              <h2 className="font-syne font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
                Cloud — trypronto.app
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                No server needed. Ready in 5 minutes. Your own subdomain. We handle updates,
                backups, and infrastructure.
              </p>
            </div>

            <div className="bg-green-600 text-white rounded-2xl p-8 mb-12 text-center">
              <div className="font-syne font-extrabold text-5xl mb-2">14 days free</div>
              <div className="text-lg font-medium mb-1">Try any paid plan free for 14 days.</div>
              <div className="text-green-100 text-sm">No credit card required. Cancel anytime.</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {[
                {
                  title: 'Ready in minutes',
                  desc: 'Register, complete onboarding, get your subdomain. No technical setup.',
                },
                {
                  title: 'Your own subdomain',
                  desc: 'salon-maya.trypronto.app or connect your own domain on Pro+.',
                },
                {
                  title: 'We handle everything',
                  desc: 'Updates, backups, uptime. You focus on your business.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* FREE */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="font-syne font-bold text-lg text-gray-900 mb-1">Free</div>
                <div className="font-syne font-extrabold text-3xl text-gray-900 mb-1">$0</div>
                <div className="text-xs text-gray-500 mb-4">Free forever</div>
                <div className="text-xs text-gray-600 mb-5 pb-4 border-b border-gray-100">
                  1 employee · 100 clients
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li>✓ POS + CRM + Inventory</li>
                  <li>✓ Email notifications</li>
                  <li>✓ Online booking page</li>
                </ul>
              </div>

              {/* STARTER */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="font-syne font-bold text-lg text-gray-900 mb-1">Starter</div>
                <div className="font-syne font-extrabold text-3xl text-gray-900 mb-1">
                  $19
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </div>
                <div className="text-xs text-gray-500 mb-4">14-day free trial</div>
                <div className="text-xs text-gray-600 mb-5 pb-4 border-b border-gray-100">
                  3 employees · 1,000 clients
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li>✓ Everything in Free</li>
                  <li>✓ Telegram & WhatsApp</li>
                  <li>✓ Online booking</li>
                </ul>
              </div>

              {/* PRO — featured */}
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-500 relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Most popular
                </div>
                <div className="font-syne font-bold text-lg text-gray-900 mb-1">Pro</div>
                <div className="font-syne font-extrabold text-3xl text-gray-900 mb-1">
                  $39
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </div>
                <div className="text-xs text-gray-500 mb-4">14-day free trial</div>
                <div className="text-xs text-gray-600 mb-5 pb-4 border-b border-gray-100">
                  15 employees · unlimited
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li>✓ Everything in Starter</li>
                  <li>✓ Viber notifications</li>
                  <li className="flex items-center gap-1.5">
                    ✓ Analytics
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  </li>
                  <li>✓ Custom domain</li>
                  <li className="flex items-center gap-1.5">
                    ✓ Loyalty program
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  </li>
                </ul>
              </div>

              {/* AGENCY */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="font-syne font-bold text-lg text-gray-900 mb-1">Agency</div>
                <div className="font-syne font-extrabold text-3xl text-gray-900 mb-1">
                  $79
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </div>
                <div className="text-xs text-gray-500 mb-4">14-day free trial</div>
                <div className="text-xs text-gray-600 mb-5 pb-4 border-b border-gray-100">
                  Multiple locations
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li>✓ Everything in Pro</li>
                  <li>✓ White-label</li>
                  <li className="flex items-center gap-1.5">
                    ✓ API access
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  </li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>

            <div className="text-center space-y-5">
              <Link
                href="/pricing"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                See full pricing →
              </Link>
              <div>
                <Link
                  href="/register"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  Start free — no credit card
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FOOTER ── */}
      <footer className="bg-white border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-syne font-bold text-xl text-gray-900">Pronto</div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy
            </Link>
            <Link href="/refund" className="hover:text-gray-700 transition-colors">
              Refund policy
            </Link>
            <a
              href="https://github.com/SGrappelli/pronto"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
