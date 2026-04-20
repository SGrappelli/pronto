import { Metadata } from 'next'
import { Check, Minus } from 'lucide-react'
import { PricingCards } from './PricingCards'

export const metadata: Metadata = {
  title: 'Pricing — Pronto | Free POS, CRM & Booking Software',
  description:
    'Pronto plans from $0/month. Free forever plan included. Starter $19, Pro $39, Agency $79 — 14-day free trial, no credit card required. POS, CRM, booking and omnichannel notifications for service businesses.',
  keywords: [
    'pronto pricing', 'pos software pricing', 'crm software price',
    'appointment booking software cost', 'free pos system price',
    'salon management software pricing', 'service business software plans',
    'small business pos cost', 'open source pos pricing', 'booking software subscription',
  ],
  alternates: { canonical: 'https://trypronto.app/pricing' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pricing',
    title: 'Pricing — Pronto | Free POS, CRM & Booking Software',
    description:
      'Plans from $0/month. Free forever + paid plans with 14-day trial. POS, CRM, booking and notifications for salons, barbershops, cafes and any service SMB.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Pronto | Free POS, CRM & Booking Software',
    description:
      'Plans from $0/month. Free forever + paid plans with 14-day trial. No credit card required.',
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
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', description: '1 employee, 50 clients, POS + email notifications' },
    { '@type': 'Offer', name: 'Starter', price: '19', priceCurrency: 'USD', description: '3 employees, 500 clients, Telegram & WhatsApp' },
    { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD', description: '10 employees, unlimited clients, Viber, custom domain' },
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
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Free plan is free forever with no credit card required. It includes POS, inventory, and email notifications for 1 employee and up to 50 clients.' },
    },
    {
      '@type': 'Question',
      name: 'Is there a free trial?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. All paid plans (Starter, Pro, Agency) include a 14-day free trial. No credit card is required to start.' },
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

// Used only for the feature comparison table header
const planColumns = [
  { name: 'Free',    highlight: false },
  { name: 'Starter', highlight: false },
  { name: 'Pro',     highlight: true  },
  { name: 'Agency',  highlight: false },
]

type FeatureValue = boolean | string

const features: { label: string; values: FeatureValue[]; section?: string }[] = [
  // Limits
  { label: 'Team members',                        values: ['1', '3', '10', 'Unlimited'],  section: 'Limits' },
  { label: 'Clients',                             values: ['50', '500', 'Unlimited', 'Unlimited'] },
  { label: 'POS transactions / month',            values: ['20', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Appointments / month',                values: ['10', 'Unlimited', 'Unlimited', 'Unlimited'] },
  // Features
  { label: 'Inventory management',                values: [true, true, true, true],       section: 'Features' },
  { label: 'CRM & client history',                values: [false, true, true, true] },
  { label: 'Online booking page',                 values: [false, true, true, true] },
  { label: 'Advanced analytics dashboard',        values: [false, false, true, true] },
  { label: 'Loyalty program',                     values: [false, false, true, true] },
  { label: 'Custom domain',                       values: [false, false, true, true] },
  { label: 'Multiple locations',                  values: [false, false, false, true] },
  { label: 'White-label mode',                    values: [false, false, false, true] },
  { label: 'API access',                          values: [false, false, false, true] },
  // Notifications
  { label: 'Email notifications',                 values: [true, true, true, true],       section: 'Notifications' },
  { label: 'Telegram & WhatsApp notifications',   values: [false, true, true, true] },
  { label: 'Viber notifications',                 values: [false, false, true, true] },
  // Support
  { label: 'Email support',                       values: [true, true, true, true],       section: 'Support' },
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

export default function PricingPage() {
  return (
    <div className="py-16 px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}>Simple, transparent pricing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>

        {/* Toggle + Plan cards (client component) */}
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
                    <td className="px-6 py-3.5 text-gray-700">{feature.label}</td>
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
          <span className="font-medium text-gray-700">Paddle</span>.
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
                a: 'Yes. The Free plan is free forever — no credit card required. It includes POS, inventory management, and email notifications for 1 employee and up to 50 clients.',
              },
              {
                q: 'Is there a free trial on paid plans?',
                a: 'Yes. All paid plans (Starter, Pro, Agency) include a 14-day free trial. You can start immediately without entering a credit card.',
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
                a: 'All major credit and debit cards (Visa, Mastercard, Amex) via Paddle, our payment processor.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif" }}>{q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
