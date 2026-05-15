import { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import { Check, Minus } from 'lucide-react'
import { PricingCards } from './PricingCards'
import styles from '../../(public)/public-layout.module.css'
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
  title: 'Preços do Pronto — Software de Gestão Gratuito',
  description:
    'Comece gratuitamente. Pronto oferece POS, CRM, agendamento e notificações automáticas por WhatsApp, Telegram e Email. Planos a partir de US$ 0 por mês.',
  alternates: {
    canonical: 'https://trypronto.app/pt/precos',
    languages: {
      en: 'https://trypronto.app/pricing',
      es: 'https://trypronto.app/es/precios',
      'pt-BR': 'https://trypronto.app/pt/precos',
      'x-default': 'https://trypronto.app/pricing',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/precos',
    title: 'Preços do Pronto — Software de Gestão Gratuito',
    description:
      'Comece gratuitamente. POS, CRM, agendamento e notificações omnicanal para pequenas empresas de serviço.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preços do Pronto — Software de Gestão Gratuito',
    description:
      'Comece gratuitamente. POS, CRM, agendamento e notificações por WhatsApp, Telegram e Email.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, PWA, Docker',
  url: 'https://trypronto.app',
  offers: [
    {
      '@type': 'Offer',
      name: 'Grátis',
      price: '0',
      priceCurrency: 'USD',
      description: '1 funcionário, 100 clientes, 50 agendamentos/mês. POS, CRM, estoque, Email + Telegram + WhatsApp + Viber.',
    },
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '19',
      priceCurrency: 'USD',
      description: '3 funcionários, clientes e agendamentos ilimitados. Tudo do plano Grátis sem marca Pronto na página de agendamento.',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '39',
      priceCurrency: 'USD',
      description: '15 funcionários, tudo ilimitado. Painel de análises, domínio personalizado, programa de fidelidade.',
    },
    {
      '@type': 'Offer',
      name: 'Agency',
      price: '79',
      priceCurrency: 'USD',
      description: 'Múltiplas unidades, white-label, acesso à API, suporte prioritário.',
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Existe um plano gratuito para sempre?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O plano Grátis é gratuito para sempre, sem cartão de crédito. Inclui 1 funcionário, 100 clientes, 50 agendamentos por mês e todos os canais de notificação: Email, Telegram, WhatsApp e Viber.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso cancelar minha assinatura a qualquer momento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Você pode cancelar a qualquer momento nas configurações da conta. Não há multas nem taxas de cancelamento. Ao cancelar, sua conta retorna automaticamente ao plano Grátis.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que acontece com meus dados se eu fizer downgrade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Seus dados ficam seguros. Se você ultrapassar os limites do plano Grátis após o downgrade, não poderá adicionar novos registros até estar dentro dos limites, mas todos os dados existentes são mantidos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Os planos anuais incluem desconto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Os planos anuais incluem 2 meses grátis — equivalente a 17% de desconto em comparação com o faturamento mensal. O desconto é aplicado automaticamente ao selecionar o faturamento anual.',
      },
    },
    {
      '@type': 'Question',
      name: 'Preciso de um cartão de crédito para começar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O plano Grátis não requer cartão de crédito. Você só precisa inserir dados de pagamento ao fazer upgrade para um plano pago.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto também está disponível para auto-hospedagem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é open-source sob licença MIT e pode ser auto-hospedado gratuitamente sem qualquer limite de clientes, funcionários ou agendamentos. Execute docker compose up -d e o sistema estará funcionando. Veja o repositório GitHub em github.com/SGrappelli/pronto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais canais de notificação estão incluídos no plano Grátis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos os quatro canais estão disponíveis em todos os planos: Email, Telegram, WhatsApp e Viber. Cada negócio conecta suas próprias credenciais nas configurações. A plataforma não cobra pelos serviços de mensageria.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o faturamento para o plano Agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O plano Agency está disponível com faturamento mensal (US$ 79/mês) ou anual (US$ 790/ano, economize US$ 158). Inclui múltiplas unidades, modo white-label, acesso à API e suporte prioritário. Clique em Começar para criar sua conta.',
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'Início', item: 'https://trypronto.app/pt/' },
    { '@type': 'ListItem', position: 3, name: 'Preços', item: 'https://trypronto.app/pt/precos' },
  ],
}

const planColumns = [
  { name: 'Grátis',  highlight: false },
  { name: 'Starter', highlight: false },
  { name: 'Pro',     highlight: true  },
  { name: 'Agency',  highlight: false },
]

type FeatureValue = boolean | string

const comingSoonLabels = new Set([
  'Painel de análises avançado',
  'Programa de fidelidade',
  'Domínio personalizado',
  'Modo white-label',
  'Acesso à API',
  'Suporte dedicado e SLA',
])

const features: { label: string; values: FeatureValue[]; section?: string }[] = [
  // Limites
  { label: 'Funcionários',                          values: ['1', '3', '15', 'Ilimitado'],              section: 'Limites' },
  { label: 'Clientes',                              values: ['100', 'Ilimitado', 'Ilimitado', 'Ilimitado'] },
  { label: 'Agendamentos / mês',                    values: ['50', 'Ilimitado', 'Ilimitado', 'Ilimitado'] },
  // Funcionalidades
  { label: 'POS — Ponto de Venda',                  values: [true, true, true, true],                   section: 'Funcionalidades principais' },
  { label: 'CRM e histórico de clientes',           values: [true, true, true, true] },
  { label: 'Gestão de estoque',                     values: [true, true, true, true] },
  { label: 'Sistema de agendamento',                values: [true, true, true, true] },
  { label: 'Página de agendamento online',          values: [true, true, true, true] },
  { label: 'Painel de análises avançado',           values: [false, false, true, true] },
  { label: 'Programa de fidelidade',                values: [false, false, true, true] },
  { label: 'Domínio personalizado',                 values: [false, false, true, true] },
  { label: 'Múltiplas unidades',                    values: [false, false, false, true] },
  { label: 'Modo white-label',                      values: [false, false, false, true] },
  { label: 'Acesso à API',                          values: [false, false, false, true] },
  { label: 'Suporte dedicado e SLA',                values: [false, false, false, true] },
  // Notificações
  { label: 'Notificações por Email',                values: [true, true, true, true],                   section: 'Notificações' },
  { label: 'Notificações Telegram e WhatsApp',      values: [true, true, true, true] },
  { label: 'Notificações por Viber',                values: [true, true, true, true] },
  { label: 'Confirmação de agendamento automática', values: [true, true, true, true] },
  { label: 'Lembrete de visita (24h e 1h antes)',   values: [true, true, true, true] },
  { label: 'Mensagem de agradecimento pós-visita',  values: [true, true, true, true] },
  { label: 'Reativação de clientes inativos',       values: [true, true, true, true] },
  { label: 'Alerta de estoque mínimo',              values: [true, true, true, true] },
]

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-5 h-5 text-blue-600 mx-auto" />
      : <Minus className="w-4 h-4 text-gray-300 mx-auto" />
  }
  return <span className="text-sm font-medium text-gray-700">{value}</span>
}

export default function PtPrecosPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className={styles.nav}>
        <Link href="/pt/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink href="/pt/precos" className={`${styles.navLink} ${styles.hideMob}`} eventName="pricing_click" eventParams={{ source: '/pt/precos' }}>
            Preços
          </TrackedLink>
          <TrackedLink href="/login" className={`${styles.navLink} ${styles.hideTablet}`} eventName="sign_in_click" eventParams={{ location: 'navbar', language: 'pt' }}>
            Entrar
          </TrackedLink>
          <LangSwitcher />
          <TrackedLink href="/register" className={styles.btnNav} eventName="sign_up_click" eventParams={{ location: 'navbar', language: 'pt' }}>
            Começar grátis
          </TrackedLink>
        </div>
      </nav>

      <main className={styles.main}>
        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h1
                className="text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
              >
                Preços simples e transparentes
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comece gratuitamente. Faça upgrade quando precisar.
              </p>
            </div>

            {/* Toggle + Plan cards (client component) */}
            <PricingCards />

            {/* Feature comparison table */}
            <h2
              className="text-xl font-bold text-gray-900 mb-6 text-center"
              style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
            >
              Comparação completa de funcionalidades
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/3">Funcionalidade</th>
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
                            <span className="ml-2 inline-block bg-amber-100 text-amber-700 text-xs font-medium px-1.5 py-0.5 rounded">
                              Em breve
                            </span>
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
              Preços em dólares americanos (USD).{' '}
              O faturamento é processado com segurança pelo Whop.{' '}
              Os planos anuais incluem 2 meses grátis.{' '}
              Dúvidas?{' '}
              <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                Fale conosco em support@trypronto.app
              </a>
            </p>

            {/* FAQ */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h2
                className="text-2xl font-bold text-gray-900 mb-8 text-center"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
              >
                Perguntas frequentes
              </h2>
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {[
                  {
                    q: 'Existe um plano gratuito para sempre?',
                    a: 'Sim. O plano Grátis é gratuito para sempre, sem cartão de crédito. Inclui 1 funcionário, 100 clientes, 50 agendamentos por mês e todos os canais de notificação: Email, Telegram, WhatsApp e Viber.',
                  },
                  {
                    q: 'Posso cancelar minha assinatura a qualquer momento?',
                    a: 'Sim. Você pode cancelar a qualquer momento nas configurações da conta. Não há multas nem taxas de cancelamento. Ao cancelar, sua conta retorna automaticamente ao plano Grátis.',
                  },
                  {
                    q: 'O que acontece com meus dados se eu fizer downgrade?',
                    a: 'Seus dados ficam seguros. Se você ultrapassar os limites do plano Grátis após o downgrade, não poderá adicionar novos registros até estar dentro dos limites, mas todos os dados existentes são mantidos.',
                  },
                  {
                    q: 'Os planos anuais incluem desconto?',
                    a: 'Sim. Os planos anuais incluem 2 meses grátis — equivalente a 17% de desconto em comparação com o faturamento mensal. O desconto é aplicado automaticamente ao selecionar o faturamento anual.',
                  },
                  {
                    q: 'Preciso de um cartão de crédito para começar?',
                    a: 'Não. O plano Grátis não requer cartão de crédito. Você só precisa inserir dados de pagamento ao fazer upgrade para um plano pago.',
                  },
                  {
                    q: 'O Pronto também está disponível para auto-hospedagem?',
                    a: 'Sim. O Pronto é open-source sob licença MIT e pode ser auto-hospedado gratuitamente sem qualquer limite de clientes, funcionários ou agendamentos. Execute docker compose up -d e o sistema estará funcionando. Veja o repositório GitHub em github.com/SGrappelli/pronto.',
                  },
                  {
                    q: 'Quais canais de notificação estão incluídos no plano Grátis?',
                    a: 'Todos os quatro canais estão disponíveis em todos os planos: Email, Telegram, WhatsApp e Viber. Cada negócio conecta suas próprias credenciais nas configurações. A plataforma não cobra pelos serviços de mensageria.',
                  },
                  {
                    q: 'Como funciona o faturamento para o plano Agency?',
                    a: 'O plano Agency está disponível com faturamento mensal (US$ 79/mês) ou anual (US$ 790/ano, economize US$ 158). Inclui múltiplas unidades, modo white-label, acesso à API e suporte prioritário. Clique em Começar para criar sua conta.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="py-5">
                    <h3
                      className="text-base font-semibold text-gray-900 mb-2"
                      style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif" }}
                    >
                      {q}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center bg-gray-50 rounded-2xl px-8 py-14 border border-gray-200">
              <h2
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
              >
                Comece a gerenciar seu negócio gratuitamente hoje
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                A nuvem leva 5 minutos. Self-hosted é um único comando.
                <br />
                De qualquer forma — zero comissão, para sempre.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <TrackedAnchor
                  href="/register"
                  className="bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
                  eventName="sign_up_click"
                  eventParams={{ location: 'pricing', language: 'pt' }}
                >
                  Começar grátis — sem cartão
                </TrackedAnchor>
                <TrackedAnchor
                  href="https://github.com/SGrappelli/pronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 text-gray-700 font-semibold px-7 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"
                  eventName="github_click"
                  eventParams={{ label: 'cta_button', page: '/pt/precos' }}
                >
                  Self-host no GitHub
                </TrackedAnchor>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Pronto<span>.</span>
        </div>
        <div className={styles.footerCopy}>© 2026 Pronto. Todos os direitos reservados.</div>
        <div className={styles.footerSocial}>
          <TrackedAnchor href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" eventName="social_click" eventParams={{ platform: 'twitter' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </TrackedAnchor>
          <TrackedAnchor href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" eventName="social_click" eventParams={{ platform: 'linkedin' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </TrackedAnchor>
          <TrackedAnchor href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" eventName="social_click" eventParams={{ platform: 'youtube' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </TrackedAnchor>
          <TrackedAnchor href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" eventName="github_click" eventParams={{ label: 'footer_link', page: '/pt/precos' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </TrackedAnchor>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/pt/" style={{ fontSize: '15px' }}>Início</Link>
          <Link href="/pt/precos" style={{ fontSize: '15px' }}>Preços</Link>
          <Link href="/pt/para" style={{ fontSize: '15px' }}>Para negócios</Link>
          <Link href="/pt/docs" style={{ fontSize: '15px' }}>Documentação</Link>
          <Link href="/terms" style={{ fontSize: '15px' }}>Termos</Link>
          <Link href="/privacy" style={{ fontSize: '15px' }}>Privacidade</Link>
          <Link href="/refund" style={{ fontSize: '15px' }}>Reembolsos</Link>
        </div>
      </footer>
    </div>
  )
}
