import { Metadata } from 'next'
import { Check, Minus } from 'lucide-react'
import { PricingCards } from './PricingCards'

export const metadata: Metadata = {
  title: 'Pricing — Pronto',
  description: 'Simple, transparent pricing for every business size.',
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
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
          <a href="mailto:hello@trypronto.app" className="text-blue-600 hover:underline">
            hello@trypronto.app
          </a>
          .
        </p>
      </div>
    </div>
  )
}
