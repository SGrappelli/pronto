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
  title: 'Precios de Pronto — Software Gratis de Gestión para Negocios de Servicios',
  description:
    'Pronto tiene un plan gratuito para siempre y planes de pago desde $19 al mes. Sin comisiones, sin contratos. Plan gratuito disponible — sin tarjeta de crédito.',
  keywords: [
    'precios software gestión negocios',
    'software POS precio',
    'CRM gratis para negocios',
    'software reservas precio',
    'sistema gestión salón precio',
    'software para barbería precio',
    'POS gratis código abierto',
    'alternativa gratuita software gestión',
    'Pronto precios planes',
  ],
  alternates: {
    canonical: 'https://trypronto.app/es/precios',
    languages: {
      en: 'https://trypronto.app/pricing',
      es: 'https://trypronto.app/es/precios',
      'pt-BR': 'https://trypronto.app/pt/precos',
      'x-default': 'https://trypronto.app/pricing',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/precios',
    title: 'Precios de Pronto — Desde $0 al mes. Sin comisiones.',
    description:
      'Plan gratuito para siempre. Planes en la nube desde $19 al mes. Sin tarjeta de crédito.',
    images: [{ url: 'https://trypronto.app/og-pricing-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precios de Pronto — Desde $0 al mes. Sin comisiones.',
    description:
      'Plan gratuito para siempre. Planes en la nube desde $19 al mes. Sin tarjeta de crédito.',
    images: ['https://trypronto.app/og-pricing-es.png'],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Pronto tiene un plan gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El plan Gratis no tiene fecha de vencimiento — incluye POS, CRM, inventario, página de reservas en línea y notificaciones por Email para 1 empleado y hasta 100 clientes. Además, la versión self-hosted es completamente gratuita sin ningún límite bajo licencia MIT.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Tiene Pronto un plan gratuito permanente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La versión en la nube tiene un plan gratuito permanente: 50 reservas al mes, 100 clientes, 1 empleado. Los planes de pago empiezan en $19 al mes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto cobra comisión por reservas o ventas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Pronto nunca cobra comisión por tus reservas ni por tus ventas. Ni en el plan gratuito ni en los de pago. Tus clientes reservan directamente contigo y tú recibes el 100% de tus ingresos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre self-hosted y la nube?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con self-hosted instalas Pronto en tu propio servidor con un solo comando (docker compose up -d). Es gratis para siempre, sin límites, y tus datos nunca salen de tu máquina. Con la nube en trypronto.app no necesitas servidor: estás listo en 5 minutos y nosotros nos encargamos de las actualizaciones, copias de seguridad y el uptime.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo cambiar de plan en cualquier momento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Puedes subir o bajar de plan en cualquier momento desde la configuración de tu cuenta. Los cambios se aplican de inmediato. Si bajas de plan, el crédito proporcional se aplica al siguiente ciclo de facturación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa con mis datos si cancelo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puedes exportar todos tus datos de clientes e historial en cualquier momento, incluso después de cancelar. Con self-hosted, tus datos siempre están en tu propio servidor — no hay nada que cancelar ni perder.',
      },
    },
    {
      '@type': 'Question',
      name: '¿WhatsApp, Telegram y Viber están incluidos en el precio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. No hay costo adicional por los canales de notificación. Telegram y WhatsApp están incluidos desde el plan Starter. Viber está incluido en el plan Pro. Cada negocio conecta sus propias credenciales — Pronto no cobra por el uso de mensajería.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El plan Agency permite manejar varios negocios o sucursales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El plan Agency está diseñado para agencias, franquicias y negocios con varias ubicaciones. Incluye gestión multimarca, white-label, acceso a API y soporte prioritario.',
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'Inicio', item: 'https://trypronto.app/es/' },
    { '@type': 'ListItem', position: 3, name: 'Precios', item: 'https://trypronto.app/es/precios' },
  ],
}

const planColumns = [
  { name: 'Gratis',   highlight: false },
  { name: 'Starter',  highlight: false },
  { name: 'Pro',      highlight: true  },
  { name: 'Agency',   highlight: false },
]

type FeatureValue = boolean | string

const comingSoonLabels = new Set([
  'Panel de analíticas avanzado',
  'Programa de fidelización',
  'Dominio personalizado',
  'Varias ubicaciones',
  'Modo white-label',
  'Acceso a API',
  'Soporte dedicado y SLA',
])

const features: { label: string; values: FeatureValue[]; section?: string }[] = [
  // Limits
  { label: 'Empleados',                           values: ['1', '3', '15', 'Ilimitado'],    section: 'Límites' },
  { label: 'Clientes en CRM',                     values: ['100', 'Ilimitado', 'Ilimitado', 'Ilimitado'] },
  { label: 'Reservas / mes',                      values: ['50', 'Ilimitado', 'Ilimitado', 'Ilimitado'] },
  // Features
  { label: 'POS',                                 values: [true, true, true, true],         section: 'Funciones' },
  { label: 'CRM e historial de clientes',         values: [true, true, true, true] },
  { label: 'Gestión de inventario',               values: [true, true, true, true] },
  { label: 'Página de reservas online',           values: [true, true, true, true] },
  { label: 'Panel de analíticas avanzado',        values: [false, false, true, true] },
  { label: 'Programa de fidelización',            values: [false, false, true, true] },
  { label: 'Dominio personalizado',               values: [false, false, true, true] },
  { label: 'Varias ubicaciones',                  values: [false, false, false, true] },
  { label: 'Modo white-label',                    values: [false, false, false, true] },
  { label: 'Acceso a API',                        values: [false, false, false, true] },
  // Notifications
  { label: 'Notificaciones por Email',            values: [true, true, true, true],         section: 'Notificaciones' },
  { label: 'Notificaciones por Telegram',         values: [true, true, true, true] },
  { label: 'Notificaciones por WhatsApp',         values: [true, true, true, true] },
  { label: 'Notificaciones por Viber',            values: [true, true, true, true] },
  // Branding
  { label: 'Badge «Powered by Pronto»',           values: [true, false, false, false],      section: 'Marca' },
  // Support
  { label: 'Soporte por Email',                   values: [true, true, true, true],         section: 'Soporte' },
  { label: 'Soporte prioritario',                 values: [false, false, true, true] },
  { label: 'Soporte dedicado y SLA',              values: [false, false, false, true] },
]

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-5 h-5 text-blue-600 mx-auto" />
      : <Minus className="w-4 h-4 text-gray-300 mx-auto" />
  }
  return <span className="text-sm font-medium text-gray-700">{value}</span>
}

export default function EsPreciosPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className={styles.nav}>
        <Link href="/es/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink href="/es/precios" className={`${styles.navLink} ${styles.hideMob}`} eventName="pricing_click" eventParams={{ source: '/es/precios' }}>
            Precios
          </TrackedLink>
          <TrackedLink href="/login" className={`${styles.navLink} ${styles.hideTablet}`} eventName="sign_in_click" eventParams={{ location: 'navbar', language: 'es' }}>
            Iniciar sesión
          </TrackedLink>
          <LangSwitcher />
          <TrackedLink href="/register" className={styles.btnNav} eventName="sign_up_click" eventParams={{ location: 'navbar', language: 'es' }}>
            Empezar gratis
          </TrackedLink>
        </div>
      </nav>

      <main className={styles.main}>
        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
                Precios simples y transparentes
              </p>
              <h1
                className="text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
              >
                Empieza gratis. Crece cuando quieras.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sin comisiones. Sin contratos. Sin sorpresas.
                <br />
                Self-hosted gratis para siempre o empieza con el plan gratuito en la nube. Sin tarjeta.
              </p>
            </div>

            {/* Toggle + Plan cards (client component) */}
            <PricingCards />

            {/* Feature comparison table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/3">Función</th>
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
                            <span className="ml-2 inline-block bg-amber-100 text-amber-700 text-xs font-medium px-1.5 py-0.5 rounded">Próximamente</span>
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
              Todos los precios en USD. Facturación mensual.{' '}
              ¿Tienes preguntas?{' '}
              <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                Escríbenos
              </a>
              .
            </p>
            <p className="text-center text-sm font-medium text-green-600 mt-4">
              ¿Vienes de otra plataforma?{' '}
              <Link href="/es/vs/" className="underline-offset-2 hover:underline hover:text-green-700">
                Compara Pronto con la competencia →
              </Link>
            </p>

            {/* FAQ */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h2
                className="text-2xl font-bold text-gray-900 mb-8 text-center"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
              >
                Preguntas frecuentes sobre los precios
              </h2>
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {[
                  {
                    q: '¿Pronto tiene un plan gratuito?',
                    a: 'Sí. El plan Gratis no tiene fecha de vencimiento — incluye POS, CRM, inventario, página de reservas en línea y notificaciones por Email para 1 empleado y hasta 100 clientes. Además, la versión self-hosted es completamente gratuita sin ningún límite bajo licencia MIT.',
                  },
                  {
                    q: '¿Tiene Pronto un plan gratuito permanente?',
                    a: 'Sí. La versión en la nube tiene un plan gratuito permanente: 50 reservas al mes, 100 clientes, 1 empleado. Los planes de pago empiezan en $19 al mes.',
                  },
                  {
                    q: '¿Pronto cobra comisión por reservas o ventas?',
                    a: 'No. Pronto nunca cobra comisión por tus reservas ni por tus ventas. Ni en el plan gratuito ni en los de pago. Tus clientes reservan directamente contigo y tú recibes el 100% de tus ingresos.',
                  },
                  {
                    q: '¿Cuál es la diferencia entre self-hosted y la nube?',
                    a: 'Con self-hosted instalas Pronto en tu propio servidor con un solo comando (docker compose up -d). Es gratis para siempre, sin límites, y tus datos nunca salen de tu máquina. Con la nube en trypronto.app no necesitas servidor: estás listo en 5 minutos y nosotros nos encargamos de las actualizaciones, copias de seguridad y el uptime.',
                  },
                  {
                    q: '¿Puedo cambiar de plan en cualquier momento?',
                    a: 'Sí. Puedes subir o bajar de plan en cualquier momento desde la configuración de tu cuenta. Los cambios se aplican de inmediato. Si bajas de plan, el crédito proporcional se aplica al siguiente ciclo de facturación.',
                  },
                  {
                    q: '¿Qué pasa con mis datos si cancelo?',
                    a: 'Puedes exportar todos tus datos de clientes e historial en cualquier momento, incluso después de cancelar. Con self-hosted, tus datos siempre están en tu propio servidor — no hay nada que cancelar ni perder.',
                  },
                  {
                    q: '¿WhatsApp, Telegram y Viber están incluidos en el precio?',
                    a: 'Sí. No hay costo adicional por los canales de notificación. Telegram y WhatsApp están incluidos desde el plan Starter. Viber está incluido en el plan Pro. Cada negocio conecta sus propias credenciales — Pronto no cobra por el uso de mensajería.',
                  },
                  {
                    q: '¿El plan Agency permite manejar varios negocios o sucursales?',
                    a: 'Sí. El plan Agency está diseñado para agencias, franquicias y negocios con varias ubicaciones. Incluye gestión multimarca, white-label, acceso a API y soporte prioritario.',
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
                Empieza a gestionar tu negocio gratis hoy
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                La nube tarda 5 minutos. Self-hosted es un solo comando.
                <br />
                De cualquier forma — cero comisión, para siempre.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <TrackedAnchor
                  href="/register"
                  className="bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
                  eventName="sign_up_click"
                  eventParams={{ location: 'pricing', language: 'es' }}
                >
                  Empezar gratis — sin tarjeta
                </TrackedAnchor>
                <TrackedAnchor
                  href="https://github.com/SGrappelli/pronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 text-gray-700 font-semibold px-7 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"
                  eventName="github_click"
                  eventParams={{ label: 'cta_button', page: '/es/precios' }}
                >
                  Self-host en GitHub
                </TrackedAnchor>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ padding: '48px', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>
              Pronto<span style={{ color: '#16a34a' }}>.</span>
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>Your data, your server.</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#9ca3af', marginBottom: '14px' }}>Producto</div>
            <Link href="/es/precios" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>Precios</Link>
            <Link href="/es/para" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>Para negocios</Link>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#9ca3af', marginBottom: '14px' }}>Comparar</div>
            <Link href="/es/vs/fresha" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>vs Fresha</Link>
            <Link href="/es/vs/booksy" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>vs Booksy</Link>
            <Link href="/es/vs/mindbody" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>vs Mindbody</Link>
            <Link href="/es/vs/vagaro" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>vs Vagaro</Link>
            <Link href="/es/vs/square" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>vs Square</Link>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#9ca3af', marginBottom: '14px' }}>Legal</div>
            <Link href="/terms" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>Términos de Servicio</Link>
            <Link href="/privacy" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>Política de Privacidad</Link>
            <Link href="/refund" style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px' }}>Política de Reembolso</Link>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '13px', color: '#9ca3af' }}>© 2026 Pronto. Todos los derechos reservados.</div>
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
            <TrackedAnchor href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" eventName="github_click" eventParams={{ label: 'footer_link', page: '/es/precios' }} style={{ color: '#9ca3af', display: 'flex', lineHeight: '1', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </TrackedAnchor>
          </div>
        </div>
      </footer>
    </div>
  )
}
