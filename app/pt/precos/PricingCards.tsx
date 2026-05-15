'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const freeFeatures = [
  { text: 'POS + CRM + Estoque', comingSoon: false },
  { text: 'Email + Telegram + WhatsApp + Viber', comingSoon: false },
  { text: 'Página de agendamento online', comingSoon: false },
]

const paidPlans = [
  {
    name: 'Starter',
    monthlyPrice: 19,
    annualTotal: 190,
    annualMonthly: 15.83,
    annualSave: 38,
    limits: '3 funcionários · clientes ilimitados · agendamentos ilimitados',
    description: 'Para operadores individuais e pequenos negócios.',
    highlight: false,
    popularBadge: undefined as string | undefined,
    cta: 'Começar',
    href: '/register',
    features: [
      { text: 'Tudo do plano Grátis', comingSoon: false },
      { text: 'Sem marca "Powered by Pronto"', comingSoon: false },
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 39,
    annualTotal: 390,
    annualMonthly: 32.50,
    annualSave: 78,
    limits: '15 funcionários · tudo ilimitado',
    description: 'Para equipes em crescimento com necessidades avançadas.',
    highlight: true,
    popularBadge: 'Mais popular',
    cta: 'Começar',
    href: '/register',
    features: [
      { text: 'Tudo do Starter', comingSoon: false },
      { text: 'Painel de análises avançado', comingSoon: true },
      { text: 'Domínio personalizado', comingSoon: true },
      { text: 'Programa de fidelidade', comingSoon: true },
    ],
  },
  {
    name: 'Agency',
    monthlyPrice: 79,
    annualTotal: 790,
    annualMonthly: 65.83,
    annualSave: 158,
    limits: 'Múltiplas unidades',
    description: 'Para agências que gerenciam várias unidades.',
    highlight: false,
    popularBadge: undefined as string | undefined,
    cta: 'Começar',
    href: '/register',
    features: [
      { text: 'Tudo do Pro', comingSoon: false },
      { text: 'Modo white-label', comingSoon: true },
      { text: 'Acesso à API', comingSoon: true },
      { text: 'Suporte dedicado e SLA', comingSoon: true },
    ],
  },
]

export function PricingCards() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className={`text-sm font-medium ${!annual ? 'text-gray-900' : 'text-gray-400'}`}>
          Mensal
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
            annual ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={annual}
          aria-label="Mudar para faturamento anual"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              annual ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${annual ? 'text-gray-900' : 'text-gray-400'}`}>
          Anual
        </span>
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
          2 meses grátis
        </span>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Free plan */}
        <div className="relative rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Grátis</h2>
            <p className="text-sm text-gray-500 mt-1">Para sempre. Sem cartão de crédito.</p>
          </div>
          <div className="mb-3">
            <span className="text-4xl font-extrabold text-gray-900">$0</span>
            <span className="text-sm text-gray-500 ml-1">/mês</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">1 funcionário · 100 clientes · 50 agendamentos/mês</p>
          <ul className="space-y-2 mb-6 flex-1">
            {freeFeatures.map((f) => (
              <li key={f.text} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{f.text}</span>
              </li>
            ))}
            <li className="text-xs text-gray-400 pl-6 italic">
              &ldquo;Powered by Pronto&rdquo; na página de agendamento
            </li>
          </ul>
          <a
            href="/register"
            className="mt-auto w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => trackEvent('sign_up_click', { location: 'pricing', language: 'pt' })}
          >
            Começar grátis
          </a>
        </div>

        {/* Paid plans */}
        {paidPlans.map((plan) => {
          const showBadge = annual || !!plan.popularBadge
          const badgeText = annual
            ? `Economize $${plan.annualSave}`
            : plan.popularBadge

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
              <div className="mb-3">
                {annual ? (
                  <>
                    <div>
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${plan.annualMonthly.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/mês</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      cobrado ${plan.annualTotal}/ano · economize ${plan.annualSave}
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold text-gray-900">${plan.monthlyPrice}</span>
                    <span className="text-sm text-gray-500 ml-1">/mês</span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-4">{plan.limits}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {f.text}
                      {f.comingSoon && (
                        <span className="ml-1.5 inline-block bg-amber-100 text-amber-700 text-xs font-medium px-1.5 py-0.5 rounded">
                          Em breve
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`mt-auto w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => trackEvent('sign_up_click', { location: 'pricing', language: 'pt' })}
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
