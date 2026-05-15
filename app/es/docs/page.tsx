import type { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
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
  title: 'Guía de Instalación de Pronto — Documentación',
  description:
    'Instala Pronto en tu servidor con Docker en minutos. Variables de entorno, configuración de WhatsApp, Telegram y Email, y preguntas frecuentes.',
  keywords: [
    'instalación POS autoalojado',
    'docker compose sistema reservas',
    'instalar CRM código abierto',
    'documentación pronto pos',
    'guía instalación software negocio docker',
    'instalar POS en VPS',
    'pronto self-hosted guía',
  ],
  alternates: {
    canonical: 'https://trypronto.app/es/docs',
    languages: {
      en: 'https://trypronto.app/docs',
      es: 'https://trypronto.app/es/docs',
      pt: 'https://trypronto.app/pt/docs',
      'x-default': 'https://trypronto.app/docs',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/docs',
    title: 'Guía de Instalación de Pronto — Documentación',
    description:
      'Instala Pronto en tu servidor en minutos. Docker Compose, variables de entorno, configuración de Telegram y WhatsApp, y guía de resolución de problemas.',
    images: [{ url: 'https://trypronto.app/og-docs.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guía de Instalación de Pronto — Documentación',
    description:
      'Instala Pronto en tu servidor en minutos. Docker Compose, variables de entorno, configuración de Telegram y WhatsApp, y guía de resolución de problemas.',
    images: ['https://trypronto.app/og-docs.png'],
  },
}

const techArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Guía de Instalación de Pronto Self-Hosted',
  description:
    'Guía paso a paso para instalar Pronto POS y CRM en tu propio servidor usando Docker Compose.',
  url: 'https://trypronto.app/es/docs',
  author: {
    '@type': 'Organization',
    name: 'Pronto',
    url: 'https://trypronto.app',
  },
  datePublished: '2026-01-01',
  dateModified: '2026-05-01',
  inLanguage: 'es',
  keywords: 'POS autoalojado, docker, instalación, CRM código abierto',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuáles son los requisitos mínimos del servidor para ejecutar Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto requiere Docker 24+, 1 GB de RAM mínimo (2 GB recomendado) y 5 GB de espacio libre en disco. Funciona en Linux, macOS o Windows con WSL2. Un VPS de $6/mes es suficiente para la mayoría de pequeños negocios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito una cuenta de Supabase para alojar Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto usa Supabase para la base de datos y la autenticación. Puedes usar el nivel gratuito de Supabase, que admite hasta 500 MB de almacenamiento de base de datos, más que suficiente para la mayoría de implementaciones de pequeños negocios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo activo las notificaciones de WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto usa la Meta Cloud API para WhatsApp. Necesitas una cuenta de Meta Developer y un número de WhatsApp Business verificado. Establece WHATSAPP_PHONE_NUMBER_ID y WHATSAPP_ACCESS_TOKEN en tu archivo .env. Los mensajes iniciados por el negocio requieren plantillas de mensajes aprobadas previamente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo ejecutar Pronto sin un nombre de dominio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto funciona con una dirección IP simple o localhost para uso local. Para producción con SSL, se recomienda un nombre de dominio. Puedes usar cualquier proxy inverso (Nginx, Caddy) para añadir HTTPS.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo actualizo Pronto a una nueva versión?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ejecuta git pull origin main, luego docker compose down && docker compose up -d --build. Las migraciones de base de datos se ejecutan automáticamente al iniciar — no se necesitan pasos SQL manuales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Hay límite de clientes o empleados en la versión self-hosted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La versión self-hosted es completamente ilimitada — sin límites de clientes, empleados, ubicaciones ni reservas. Establece NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted en tu .env para activar este modo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde puedo obtener ayuda si algo no funciona?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Abre un issue en el repositorio de GitHub en github.com/SGrappelli/pronto. La comunidad y los mantenedores responden a los issues allí. Para asistencia de instalación de pago, contacta a través de la página de GitHub.',
      },
    },
  ],
}

export default function EsDocsPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className={styles.nav}>
        <Link href="/es/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink href="/es/precios" className={`${styles.navLink} ${styles.hideMob}`} eventName="pricing_click" eventParams={{ source: '/es/docs' }}>
            Precios
          </TrackedLink>
          <TrackedLink href="/login" className={`${styles.navLink} ${styles.hideTablet}`} eventName="login_click" eventParams={{ label: 'nav_signin' }}>
            Iniciar sesión
          </TrackedLink>
          <LangSwitcher />
          <TrackedLink href="/register" className={styles.btnNav} eventName="cta_click" eventParams={{ label: 'start_free', page: '/es/docs' }}>
            Empezar gratis
          </TrackedLink>
        </div>
      </nav>

      <main className={styles.main}>
        <div className="py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/es/" className="hover:text-gray-900 transition-colors">Inicio</Link>
              <span>→</span>
              <span className="text-gray-900">Documentación</span>
            </nav>

            {/* Hero */}
            <div className="mb-10">
              <h1
                className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
              >
                Documentación de Pronto
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Todo lo que necesitas para instalar, configurar y ejecutar Pronto en tu propio servidor.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Self-hosted', 'Docker Compose', 'Licencia MIT'].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Inicio rápido */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Inicio rápido
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                    <h3 className="font-semibold text-gray-900">Clonar el repositorio</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Clona el repositorio público y copia el archivo de entorno:</p>
                  <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto leading-relaxed font-mono"><code>{`git clone https://github.com/SGrappelli/pronto.git\ncd pronto\ncp .env.example .env`}</code></pre>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                    <h3 className="font-semibold text-gray-900">Configurar el entorno</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Abre <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> y completa las variables requeridas. Mínimo necesario:{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.{' '}
                    Consulta la referencia completa de variables más abajo.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                    <h3 className="font-semibold text-gray-900">Iniciar la aplicación</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Ejecuta el siguiente comando. Las migraciones se ejecutan automáticamente al iniciar:</p>
                  <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto font-mono"><code>docker compose up -d</code></pre>
                  <p className="text-sm text-gray-500 mt-3">
                    Tu instancia estará disponible en{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">http://localhost:3000</code>
                  </p>
                </div>
              </div>
            </section>

            {/* Requisitos del sistema */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Requisitos del sistema
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Requisito</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Mínimo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {([
                      ['Sistema operativo', 'Linux, macOS o Windows (WSL2)'],
                      ['RAM', '1 GB mínimo, 2 GB recomendado'],
                      ['Disco', '5 GB de espacio libre'],
                      ['Docker', 'Docker 24+ con Docker Compose v2'],
                      ['Internet', 'Necesario para configuración inicial y notificaciones'],
                      ['Dominio (opcional)', 'Cualquier dominio o subdominio apuntando a tu servidor'],
                    ] as [string, string][]).map(([req, min]) => (
                      <tr key={req} className="bg-white">
                        <td className="px-5 py-3 text-gray-700 font-medium">{req}</td>
                        <td className="px-5 py-3 text-gray-600">{min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Variables de entorno */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Variables de entorno
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                Copia <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env.example</code> a{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> y completa los valores indicados.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Variable</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Requerida</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {([
                      ['NEXT_PUBLIC_SUPABASE_URL',       '✅', 'URL de tu proyecto Supabase'],
                      ['NEXT_PUBLIC_SUPABASE_ANON_KEY',  '✅', 'Clave anónima de Supabase'],
                      ['SUPABASE_SERVICE_ROLE_KEY',      '✅', 'Clave de rol de servicio (mantener en secreto)'],
                      ['NEXTAUTH_SECRET',                '✅', 'Cadena aleatoria para cifrado de sesión'],
                      ['NEXTAUTH_URL',                   '✅', 'URL completa de tu instancia (ej. https://tudominio.com)'],
                      ['NEXT_PUBLIC_DEPLOYMENT_MODE',    '✅', 'Establecer como: selfhosted'],
                      ['RESEND_API_KEY',                 '⚡', 'Clave API de Resend para notificaciones por email'],
                      ['TELEGRAM_BOT_TOKEN',             '⚡', 'Token del bot de Telegram de @BotFather'],
                      ['WHATSAPP_PHONE_NUMBER_ID',       '⚡', 'ID de número de teléfono de Meta Cloud API'],
                      ['WHATSAPP_ACCESS_TOKEN',          '⚡', 'Token de acceso permanente de Meta Cloud API'],
                      ['VIBER_BOT_TOKEN',                '⚡', 'Token del bot de Viber'],
                    ] as [string, string, string][]).map(([varName, req, desc]) => (
                      <tr key={varName} className="bg-white">
                        <td className="px-5 py-3">
                          <code className="text-xs font-mono text-gray-800">{varName}</code>
                        </td>
                        <td className="px-4 py-3 text-center text-base">{req}</td>
                        <td className="px-5 py-3 text-gray-600 text-sm">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <code className="font-mono text-xs">NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted</code> elimina toda la interfaz de facturación SaaS y habilita clientes, empleados y ubicaciones ilimitados.
              </p>
            </section>

            {/* Configuración de notificaciones */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Configuración de notificaciones
              </h2>
              <div className="space-y-3">
                {([
                  {
                    title: 'Email (Resend)',
                    steps: [
                      'Crea una cuenta gratuita en resend.com',
                      'Añade y verifica tu dominio',
                      'Genera una clave API',
                      'Establece RESEND_API_KEY en tu archivo .env',
                      'Reinicia: docker compose restart app',
                    ],
                  },
                  {
                    title: 'Telegram',
                    steps: [
                      'Abre Telegram y escribe a @BotFather',
                      'Envía /newbot y sigue las instrucciones',
                      'Copia el token que recibes',
                      'Establece TELEGRAM_BOT_TOKEN en tu archivo .env',
                      'En Pronto → Configuración → Notificaciones, introduce el token del bot por negocio',
                    ],
                  },
                  {
                    title: 'WhatsApp (Meta Cloud API)',
                    steps: [
                      'Ve a developers.facebook.com y crea una aplicación',
                      'Añade el producto WhatsApp a tu app',
                      'Copia tu Phone Number ID y genera un token de acceso permanente',
                      'Establece WHATSAPP_PHONE_NUMBER_ID y WHATSAPP_ACCESS_TOKEN en .env',
                      'Nota: los mensajes de texto libre solo funcionan dentro de la ventana de atención al cliente de 24 horas. Los mensajes iniciados por el negocio requieren plantillas HSM aprobadas en Meta Business Manager.',
                    ],
                  },
                  {
                    title: 'Viber',
                    steps: [
                      'Ve a partners.viber.com y crea un bot',
                      'Copia el token del bot',
                      'Establece VIBER_BOT_TOKEN en tu archivo .env',
                      'Nota: los bots de Viber creados después de febrero de 2024 requieren un plan comercial (~€100/mes).',
                    ],
                  },
                ] as { title: string; steps: string[] }[]).map((section) => (
                  <details key={section.title} className="border border-gray-200 rounded-xl overflow-hidden group">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors list-none">
                      <span className="font-semibold text-gray-900 text-sm">{section.title}</span>
                      <span className="text-gray-400 text-lg leading-none select-none">+</span>
                    </summary>
                    <div className="px-5 pb-5 pt-1 bg-white">
                      <ol className="space-y-2 mt-2">
                        {section.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-700">
                            <span className="flex-shrink-0 font-semibold text-gray-400">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Actualización */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Actualizar a una nueva versión
              </h2>
              <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto font-mono leading-relaxed"><code>{`git pull origin main\ndocker compose down\ndocker compose up -d --build`}</code></pre>
              <p className="text-sm text-gray-500 mt-3">
                Las migraciones se ejecutan automáticamente al iniciar — no se requieren pasos SQL manuales.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Preguntas frecuentes
              </h2>
              <div className="border-t border-gray-100">
                {([
                  {
                    q: '¿Cuáles son los requisitos mínimos del servidor para ejecutar Pronto?',
                    a: 'Pronto requiere Docker 24+, 1 GB de RAM mínimo (2 GB recomendado) y 5 GB de espacio libre en disco. Funciona en Linux, macOS o Windows con WSL2. Un VPS de $6/mes es suficiente para la mayoría de pequeños negocios.',
                  },
                  {
                    q: '¿Necesito una cuenta de Supabase para alojar Pronto?',
                    a: 'Sí. Pronto usa Supabase para la base de datos y la autenticación. Puedes usar el nivel gratuito de Supabase, que admite hasta 500 MB de almacenamiento de base de datos, más que suficiente para la mayoría de implementaciones de pequeños negocios.',
                  },
                  {
                    q: '¿Cómo activo las notificaciones de WhatsApp?',
                    a: 'Pronto usa la Meta Cloud API para WhatsApp. Necesitas una cuenta de Meta Developer y un número de WhatsApp Business verificado. Establece WHATSAPP_PHONE_NUMBER_ID y WHATSAPP_ACCESS_TOKEN en tu archivo .env. Los mensajes iniciados por el negocio requieren plantillas de mensajes aprobadas previamente.',
                  },
                  {
                    q: '¿Puedo ejecutar Pronto sin un nombre de dominio?',
                    a: 'Sí. Pronto funciona con una dirección IP simple o localhost para uso local. Para producción con SSL, se recomienda un nombre de dominio. Puedes usar cualquier proxy inverso (Nginx, Caddy) para añadir HTTPS.',
                  },
                  {
                    q: '¿Cómo actualizo Pronto a una nueva versión?',
                    a: 'Ejecuta git pull origin main, luego docker compose down && docker compose up -d --build. Las migraciones de base de datos se ejecutan automáticamente al iniciar — no se necesitan pasos SQL manuales.',
                  },
                  {
                    q: '¿Hay límite de clientes o empleados en la versión self-hosted?',
                    a: 'No. La versión self-hosted es completamente ilimitada — sin límites de clientes, empleados, ubicaciones ni reservas. Establece NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted en tu .env para activar este modo.',
                  },
                  {
                    q: '¿Dónde puedo obtener ayuda si algo no funciona?',
                    a: 'Abre un issue en el repositorio de GitHub en github.com/SGrappelli/pronto. La comunidad y los mantenedores responden a los issues allí. Para asistencia de instalación de pago, contacta a través de la página de GitHub.',
                  },
                ] as { q: string; a: string }[]).map((item) => (
                  <details key={item.q} className="border-b border-gray-100 last:border-0 group">
                    <summary className="flex items-start justify-between py-5 cursor-pointer list-none gap-4">
                      <span
                        className="font-semibold text-gray-900 text-base"
                        style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif" }}
                      >
                        {item.q}
                      </span>
                      <span className="text-gray-400 text-lg leading-none flex-shrink-0 mt-0.5 select-none">+</span>
                    </summary>
                    <p className="text-sm text-gray-600 leading-relaxed pb-5">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl bg-gray-50 border border-gray-200 px-8 py-10 text-center">
              <h2
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                ¿Prefieres una versión administrada?
              </h2>
              <p className="text-gray-600 mb-7 max-w-lg mx-auto">
                ¿No quieres gestionar un servidor? Pronto también está disponible como servicio en la nube en
                trypronto.app — sin instalación.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Probar la versión en la nube →
                </Link>
                <a
                  href="https://github.com/SGrappelli/pronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Ver en GitHub →
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Pronto<span>.</span>
        </div>
        <div className={styles.footerCopy}>© 2026 Pronto. Todos los derechos reservados.</div>
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
          <TrackedAnchor href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" eventName="github_click" eventParams={{ label: 'footer_link', page: '/es/docs' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </TrackedAnchor>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/es/" style={{ fontSize: '15px' }}>Inicio</Link>
          <Link href="/es/precios" style={{ fontSize: '15px' }}>Precios</Link>
          <Link href="/es/para" style={{ fontSize: '15px' }}>Para negocios</Link>
          <Link href="/es/para/salones" style={{ fontSize: '15px' }}>Salones</Link>
          <Link href="/terms" style={{ fontSize: '15px' }}>Términos</Link>
          <Link href="/privacy" style={{ fontSize: '15px' }}>Privacidad</Link>
          <Link href="/refund" style={{ fontSize: '15px' }}>Reembolsos</Link>
        </div>
      </footer>
    </div>
  )
}
