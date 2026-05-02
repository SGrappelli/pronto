'use client'

import { useState } from 'react'

const paidPlans = [
  {
    name: 'Starter',
    href: 'https://whop.com/pronto-fdee/pronto-starter/',
    monthlyPrice: 19,
    annualTotal: 190,
    annualMonthly: 15.83,
    annualSave: 38,
    description: 'For solo operators and small shops.',
    highlight: false,
    popularBadge: undefined as string | undefined,
    cta: 'Get started',
  },
  {
    name: 'Pro',
    href: 'https://whop.com/pronto-fdee/pronto-pro/',
    monthlyPrice: 39,
    annualTotal: 390,
    annualMonthly: 32.50,
    annualSave: 78,
    description: 'For growing teams with advanced needs.',
    highlight: true,
    popularBadge: 'Most popular',
    cta: 'Get started',
  },
  {
    name: 'Agency',
    href: 'https://whop.com/pronto-fdee/pronto-agency/',
    monthlyPrice: 79,
    annualTotal: 790,
    annualMonthly: 65.83,
    annualSave: 158,
    description: 'For agencies managing multiple locations.',
    highlight: false,
    popularBadge: undefined as string | undefined,
    cta: 'Contact us',
  },
]

export function PricingCards() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className={`text-sm font-medium ${!annual ? 'text-gray-900' : 'text-gray-400'}`}>
          Monthly
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
            annual ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              annual ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${annual ? 'text-gray-900' : 'text-gray-400'}`}>
          Annual
        </span>
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
          2 months free
        </span>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Free plan — unchanged regardless of billing period */}
        <div className="relative rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Free</h2>
            <p className="text-sm text-gray-500 mt-1">Perfect for trying Pronto out.</p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-gray-900">$0</span>
            <span className="text-sm text-gray-500 ml-1">forever</span>
          </div>
          <a
            href="/register"
            className="mt-auto w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Get started free
          </a>
        </div>

        {/* Paid plans */}
        {paidPlans.map((plan) => {
          const showBadge = annual || !!plan.popularBadge
          const badgeText = annual ? 'Save 17%' : plan.popularBadge

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.highlight
                  ? 'border-blue-600 shadow-lg ring-2 ring-blue-600'
                  : 'border-gray-200 shadow-sm'
              }`}
            >
              {showBadge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                    annual ? 'bg-green-500' : 'bg-blue-600'
                  }`}
                >
                  {badgeText}
                </span>
              )}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                {annual ? (
                  <>
                    <div>
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${plan.annualMonthly.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/mo</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      billed ${plan.annualTotal}/year · save ${plan.annualSave}
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold text-gray-900">${plan.monthlyPrice}</span>
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                  </>
                )}
              </div>
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          )
        })}
      </div>
    </>
  )
}
