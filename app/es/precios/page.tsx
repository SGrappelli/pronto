import { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import { Check, Minus } from 'lucide-react'
import { PricingCards } from './PricingCards'
import styles from '../../(public)/public-layout.module.css'

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
    'Pronto tiene un plan gratuito para siempre y planes de pago desde $19 al mes. Sin comisiones, sin contratos. Self-hosted gratis bajo licencia MIT o prueba la nube 14 días gratis.',
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
      'x-default': 'https://trypronto.app/pricing',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/precios',
    title: 'Precios de Pronto — Desde $0 al mes. Sin comisiones.',
    description:
      'Plan gratuito para siempre en self-hosted. Planes en la nube desde $19 al mes con 14 días de prueba gratis. Sin tarjeta de crédito.',
    images: [{ url: 'https://trypronto.app/og-pricing-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precios de Pronto — Desde $0 al mes. Sin comisiones.',
    description:
      'Plan gratuito para siempre en self-hosted. Planes en la nube desde $19 al mes con 14 días de prueba gratis. Sin tarjeta de crédito.',
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
      name: '¿Hay período de prueba en los planes de pago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Los planes Starter, Pro y Agency incluyen 14 días de prueba gratuita. No se requiere tarjeta de crédito para comenzar. Puedes cancelar en cualquier momento antes de que termine el período de prueba sin cargo alguno.',
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

const features: { label: string; values: FeatureValue[]; section?: string }[] = [
  // Limits
  { label: 'Empleados',                           values: ['1', '3', '10', 'Ilimitado'],    section: 'Límites' },
  { label: 'Clientes',                            values: ['100', '1 000', 'Ilimitado', 'Ilimitado'] },
  { label: 'Transacciones POS / mes',             values: ['20', 'Ilimitado', 'Ilimitado', 'Ilimitado'] },
  { label: 'Citas / mes',                         values: ['10', 'Ilimitado', 'Ilimitado', 'Ilimitado'] },
  // Features
  { label: 'Gestión de inventario',               values: [true, true, true, true],         section: 'Funciones' },
  { label: 'CRM e historial de clientes',         values: [false, true, true, true] },
  { label: 'Página de reservas online',           values: [false, true, true, true] },
  { label: 'Panel de analíticas avanzado',        values: [false, false, true, true] },
  { label: 'Programa de fidelización',            values: [false, false, true, true] },
  { label: 'Dominio personalizado',               values: [false, false, true, true] },
  { label: 'Varias ubicaciones',                  values: [false, false, false, true] },
  { label: 'Modo white-label',                    values: [false, false, false, true] },
  { label: 'Acceso a API',                        values: [false, false, false, true] },
  // Notifications
  { label: 'Notificaciones por Email',            values: [true, true, true, true],         section: 'Notificaciones' },
  { label: 'Notificaciones Telegram y WhatsApp',  values: [false, true, true, true] },
  { label: 'Notificaciones por Viber',            values: [false, false, true, true] },
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
          <Link href="/es/precios" className={`${styles.navLink} ${styles.hideMob}`}>
            Precios
          </Link>
          <Link href="/login" className={styles.navLink}>
            Iniciar sesión
          </Link>
          <Link href="/pricing" className={`${styles.navLink} lang-switcher`}>
            EN
          </Link>
          <Link href="/register" className={styles.btnNav}>
            Empezar gratis
          </Link>
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
                Self-hosted gratis para siempre o prueba la nube 14 días sin tarjeta.
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
              Todos los precios en USD. Facturación mensual.{' '}
              ¿Tienes preguntas?{' '}
              <a href="mailto:hello@trypronto.app" className="text-blue-600 hover:underline">
                Escríbenos
              </a>
              .
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
                    q: '¿Hay período de prueba en los planes de pago?',
                    a: 'Sí. Los planes Starter, Pro y Agency incluyen 14 días de prueba gratuita. No se requiere tarjeta de crédito para comenzar. Puedes cancelar en cualquier momento antes de que termine el período de prueba sin cargo alguno.',
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
                <a
                  href="/register"
                  className="bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
                >
                  Empezar gratis — sin tarjeta
                </a>
                <a
                  href="https://github.com/SGrappelli/pronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 text-gray-700 font-semibold px-7 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm"
                >
                  Self-host en GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Pronto<span>.</span>
        </div>
        <div className={styles.footerCopy}>© 2026 Pronto. Todos los derechos reservados.</div>
        <div className={styles.footerLinks}>
          <Link href="/es/">Inicio</Link>
          <Link href="/terms">Términos</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/refund">Reembolsos</Link>
          <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
