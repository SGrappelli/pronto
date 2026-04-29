import type { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import styles from '../landing.module.css'

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
  title: 'Pronto — Software Gratis de POS, CRM y Reservas para Negocios de Servicios',
  description:
    'Pronto es un software gratuito y de código abierto para negocios de servicios: POS, CRM, reservas en línea e inventario. Sin comisiones. Instala en tu servidor o usa la nube.',
  keywords: [
    'software para salón de belleza',
    'sistema POS gratis',
    'software de gestión para negocios',
    'CRM para pequeños negocios',
    'reservas en línea sin comisión',
    'software para spa',
    'sistema de citas gratis',
    'software para barbería',
    'gestión de clientes WhatsApp Telegram',
    'software código abierto negocios servicios',
  ],
  alternates: {
    canonical: 'https://trypronto.app/es/',
    languages: {
      en: 'https://trypronto.app/',
      es: 'https://trypronto.app/es/',
      'x-default': 'https://trypronto.app/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/',
    title: 'Pronto — Software Gratis de POS, CRM y Reservas para Negocios de Servicios',
    description:
      'POS, CRM, reservas y notificaciones omnicanal para cualquier negocio de servicios. Sin comisiones. Una sola instalación.',
    images: [{ url: 'https://trypronto.app/og-image-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto — Software Gratis de POS, CRM y Reservas para Negocios de Servicios',
    description:
      'POS, CRM, reservas y notificaciones omnicanal para cualquier negocio de servicios. Sin comisiones. Una sola instalación.',
    images: ['https://trypronto.app/og-image-es.png'],
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/es/',
  description:
    'Software gratuito y de código abierto para negocios de servicios: POS, CRM, reservas en línea, inventario y notificaciones automáticas por WhatsApp, Telegram, Viber y Email.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Linux, Windows, macOS',
  offers: [
    { '@type': 'Offer', name: 'Gratis', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Starter', price: '19', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Agency', price: '79', priceCurrency: 'USD' },
  ],
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  inLanguage: 'es',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Pronto es realmente gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La versión self-hosted es gratuita para siempre bajo licencia MIT, sin límites de clientes, empleados ni funciones. La versión en la nube tiene un plan gratuito y planes de pago desde $19 al mes con 14 días de prueba gratis.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto cobra comisión por las reservas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Cero comisión en todas las reservas y ventas. Tus clientes reservan directamente contigo, sin marketplace ni intermediarios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los clientes necesitan crear una cuenta para reservar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La página de reservas solo pide nombre y teléfono. Sin registro, sin contraseña, sin aplicación que descargar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo instalo Pronto en mi propio servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de RAM. Ejecuta: docker compose up -d y la aplicación se inicia automáticamente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué canales de mensajería están disponibles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Email, Telegram, WhatsApp y Viber. LINE y SMS próximamente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Para qué tipo de negocios sirve Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para cualquier negocio de servicios: salones de belleza, barberías, talleres de autos, cafeterías, clínicas dentales, gimnasios, spas, estudios de tatuajes y cualquier otro negocio donde los clientes reserven citas o paguen por servicios.',
      },
    },
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pronto',
  url: 'https://trypronto.app',
  logo: 'https://trypronto.app/logo.png',
  sameAs: ['https://github.com/SGrappelli/pronto'],
}

export default function EsPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <Link href="/" className={`${styles.navLink} lang-switcher`}>
            EN
          </Link>
          <Link href="/es/precios" className={styles.navLink}>
            Precios
          </Link>
          <Link href="/login" className={styles.navLink}>
            Iniciar sesión
          </Link>
          <Link href="/register" className={styles.btnNav}>
            Empezar gratis
          </Link>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <h1>
            Deja de pagar
            <br />
            <em>20% de comisión</em>
            <br />
            por tus propios clientes
          </h1>
          <p className={styles.heroDesc}>
            POS · CRM · Reservas · Inventario · Notificaciones omnicanal — para cualquier negocio
            de servicios. En tu servidor o en la nube, tú eliges.
          </p>
        </section>

        {/* TODO EN UN SOLO LUGAR */}
        <section className={`${styles.sec} ${styles.secWhite}`}>
          <div className={styles.secHead}>
            <h2>Todo en un solo lugar</h2>
            <p>
              Funciona igual tanto si lo instalas tú mismo como si usas nuestra nube. Sin
              integraciones. Sin plugins. Sin comisiones por transacción.
            </p>
          </div>
          <div className={styles.bizTags}>
            <span className={`${styles.bizTag} ${styles.bt1}`}>Salones de belleza</span>
            <span className={`${styles.bizTag} ${styles.bt2}`}>Barberías</span>
            <span className={`${styles.bizTag} ${styles.bt3}`}>Talleres de autos</span>
            <span className={`${styles.bizTag} ${styles.bt4}`}>Cafeterías</span>
            <span className={`${styles.bizTag} ${styles.bt5}`}>Clínicas dentales</span>
            <span className={`${styles.bizTag} ${styles.bt6}`}>Gimnasios</span>
            <span className={`${styles.bizTag} ${styles.bt7}`}>Masajes y spa</span>
            <span className={`${styles.bizTag} ${styles.bt8}`}>Y cualquier otro negocio de servicios</span>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.featGrid}>
              <div className={styles.featCard}>
                <h4>POS / Caja</h4>
                <p>Completa una venta en 3 clics. Efectivo, tarjeta, transferencia. Funciona sin internet.</p>
              </div>
              <div className={styles.featCard}>
                <h4>CRM</h4>
                <p>Historial completo del cliente: visitas, gastos, etiquetas, cumpleaños, notas.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Inventario</h4>
                <p>Control de stock, entradas, bajas y alerta automática de mínimos.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Calendario de citas</h4>
                <p>Vista semanal con drag &amp; drop. Sin reservas dobles a nivel de base de datos.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Reservas en línea</h4>
                <p>Página pública: el cliente reserva con solo su nombre y teléfono. Sin registro.</p>
              </div>
              <div className={styles.featCard}>
                <h4>PWA</h4>
                <p>Se instala en cualquier dispositivo desde el navegador. Funciona sin conexión.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DISEÑADO PARA NEGOCIOS DE SERVICIOS */}
        <section className={`${styles.sec} ${styles.secWarm}`}>
          <div className={styles.secHead}>
            <h2>Diseñado para negocios de servicios</h2>
            <p>Reemplaza Excel, recordatorios manuales y plataformas costosas que se quedan con tus clientes.</p>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.painGrid}>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>De</div>
                <div className={styles.painFromText}>Hojas de Excel para clientes y ventas</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>CRM + POS en una sola pantalla</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>De</div>
                <div className={styles.painFromText}>Recordatorios manuales por WhatsApp</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>
                  Notificaciones automáticas por Telegram, WhatsApp, Viber y Email
                </div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>De</div>
                <div className={styles.painFromText}>La plataforma se queda con el 20%</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Los clientes reservan directo contigo — 0% de comisión</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>De</div>
                <div className={styles.painFromText}>ERPNext demasiado complicado</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Interfaz que cualquiera aprende en 10 minutos</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>De</div>
                <div className={styles.painFromText}>Sin datos reales de tu negocio</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Panel de ingresos, LTV y servicios más vendidos</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>De</div>
                <div className={styles.painFromText}>Datos de clientes atrapados en otra plataforma</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Self-hosted: los datos viven en tu propio servidor</div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICACIONES OMNICANAL */}
        <section className={`${styles.sec} ${styles.secBlue}`}>
          <div className={styles.secHead}>
            <h2>Notificaciones omnicanal</h2>
            <p>
              El único POS de código abierto con los cuatro canales integrados — sin plugins, sin
              configuración complicada.
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
              <span className={styles.badgeSoon}>Próximamente</span>
            </div>
            <div className={`${styles.channel} ${styles.soon}`}>
              <span className={`${styles.dot} ${styles.dotGray}`}></span>SMS{' '}
              <span className={styles.badgeSoon}>Próximamente</span>
            </div>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.notifGrid}>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Reserva confirmada</div>
                <div className={styles.evSub}>Enviada al instante después de cada reserva</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Recordatorio de cita</div>
                <div className={styles.evSub}>24 horas y 1 hora antes de la visita</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Mensaje de agradecimiento</div>
                <div className={styles.evSub}>2 horas después de finalizada la visita</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Reactivación de clientes</div>
                <div className={styles.evSub}>&ldquo;No te hemos visto en 30 días&rdquo;</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Felicitación de cumpleaños</div>
                <div className={styles.evSub}>Enviada automáticamente</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Alerta de stock bajo</div>
                <div className={styles.evSub}>Al propietario del negocio</div>
              </div>
            </div>
          </div>
        </section>

        {/* DOS FORMAS DE USAR PRONTO */}
        <section className={`${styles.sec} ${styles.secWhite}`}>
          <div className={styles.secHead}>
            <h2>Dos formas de usar Pronto</h2>
            <p>Elige la que mejor se adapte a tu negocio. Cambia cuando quieras.</p>
          </div>
          <div className={styles.twoPaths}>
            {/* SELF-HOSTED */}
            <div className={`${styles.pathCard} ${styles.self}`}>
              <div className={styles.pathLabel}>Opción 1</div>
              <h3>Self-hosted</h3>
              <p className={styles.pathDesc}>
                Instala en tu propio servidor. Tus datos nunca salen de tu máquina. Gratis para
                siempre. Requiere Docker.
              </p>
              <div className={styles.shHighlights}>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>$0</div>
                  <div className={styles.shHlLabel}>Gratis siempre</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>0%</div>
                  <div className={styles.shHlLabel}>Comisión</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>∞</div>
                  <div className={styles.shHlLabel}>Sin límites</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>1</div>
                  <div className={styles.shHlLabel}>Comando</div>
                </div>
              </div>
              <div className={styles.pathPoints}>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Tus datos, tu servidor</strong> — la base de clientes vive solo en tu
                    máquina
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Licencia MIT</strong> — modifica, extiende y personaliza libremente
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Cualquier infraestructura</strong> — VPS Linux, Windows, macOS. Mínimo
                    1 GB de RAM
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
                Ver en GitHub →
              </a>
              <Link href="/docs" className={styles.btnOutline} style={{ marginTop: '16px' }}>
                Documentación →
              </Link>
            </div>

            {/* CLOUD */}
            <div className={`${styles.pathCard} ${styles.cloud}`}>
              <div className={styles.pathLabel}>Opción 2</div>
              <h3>Nube — trypronto.app</h3>
              <p className={styles.pathDesc}>
                Sin servidor propio. Listo en 5 minutos. Tu subdominio personalizado. Nosotros nos
                encargamos de las actualizaciones, copias de seguridad e infraestructura.
              </p>
              <div className={styles.trialBanner}>
                <div className={styles.trialBig}>14 días gratis</div>
                <div>
                  <div className={styles.trialText}>
                    Prueba cualquier plan de pago gratis durante 14 días.
                  </div>
                  <div className={styles.trialNote}>
                    Sin tarjeta de crédito. Cancela cuando quieras.
                  </div>
                </div>
              </div>
              <div className={styles.pathPoints}>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Listo en minutos</strong> — regístrate, configura y obtén tu subdominio
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Tu propio subdominio</strong> — salon-maya.trypronto.app o dominio
                    personalizado en Pro+
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Nos encargamos de todo</strong> — actualizaciones, backups y monitoreo
                    de uptime
                  </div>
                </div>
              </div>
              <Link href="/register" className={styles.btnPrimary}>
                Empezar gratis — sin tarjeta
              </Link>
            </div>
          </div>

          {/* PRECIOS */}
          <div className={styles.plansWrap}>
            <div className={styles.plansTitle}>Precios en la nube</div>
            <div className={styles.plans}>
              <div className={styles.plan}>
                <div className={styles.planName}>Gratis</div>
                <div className={styles.planPrice}>$0</div>
                <span className={styles.planTrialFree}>Gratis para siempre</span>
                <div className={styles.planLimit}>1 empleado · 100 clientes</div>
                <ul className={styles.planFeats}>
                  <li>POS + CRM + Inventario</li>
                  <li>Notificaciones por Email</li>
                  <li>Página de reservas en línea</li>
                </ul>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Starter</div>
                <div className={styles.planPrice}>
                  $19<span>/mes</span>
                </div>
                <div className={styles.planTrial}>14 días de prueba gratis</div>
                <div className={styles.planLimit}>3 empleados · 1 000 clientes</div>
                <ul className={styles.planFeats}>
                  <li>+ Telegram y WhatsApp</li>
                  <li>+ Reservas en línea</li>
                </ul>
              </div>
              <div className={`${styles.plan} ${styles.featured}`}>
                <div className={styles.planPopular}>Más popular</div>
                <div className={styles.planName}>Pro</div>
                <div className={styles.planPrice}>
                  $39<span>/mes</span>
                </div>
                <div className={styles.planTrial}>14 días de prueba gratis</div>
                <div className={styles.planLimit}>15 empleados · ilimitado</div>
                <ul className={styles.planFeats}>
                  <li>+ Notificaciones por Viber</li>
                  <li>
                    + Analíticas <span className={styles.badgeSoon}>Próximamente</span>
                  </li>
                  <li>+ Dominio personalizado</li>
                  <li>
                    + Programa de fidelización{' '}
                    <span className={styles.badgeSoon}>Próximamente</span>
                  </li>
                </ul>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Agency</div>
                <div className={styles.planPrice}>
                  $79<span>/mes</span>
                </div>
                <div className={styles.planTrial}>14 días de prueba gratis</div>
                <div className={styles.planLimit}>Varias ubicaciones</div>
                <ul className={styles.planFeats}>
                  <li>+ White-label</li>
                  <li>
                    + Acceso a API <span className={styles.badgeSoon}>Próximamente</span>
                  </li>
                  <li>+ Soporte prioritario</li>
                </ul>
              </div>
            </div>
            <p className={styles.pricingNote}>
              <Link href="/es/precios">Ver precios completos →</Link>
            </p>
          </div>
        </section>
      </main>

      {/* PREGUNTAS FRECUENTES */}
      <section className={styles.faq}>
        <div className={styles.faqInner}>
          <h2>Preguntas frecuentes</h2>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>¿Pronto es realmente gratuito?</div>
            <div className={styles.faqA}>
              Sí. La versión self-hosted es gratuita para siempre bajo licencia MIT, sin límites de
              clientes, empleados ni funciones. La versión en la nube tiene un plan gratuito y
              planes de pago desde $19 al mes con 14 días de prueba gratis.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>¿Pronto cobra comisión por las reservas?</div>
            <div className={styles.faqA}>
              No. Cero comisión en todas las reservas y ventas. Tus clientes reservan directamente
              contigo, sin marketplace ni intermediarios.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>¿Los clientes necesitan crear una cuenta para reservar?</div>
            <div className={styles.faqA}>
              No. La página de reservas solo pide nombre y teléfono. Sin registro, sin contraseña,
              sin aplicación que descargar.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>¿Cómo instalo Pronto en mi propio servidor?</div>
            <div className={styles.faqA}>
              Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de
              RAM. Ejecuta{' '}
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
              y la aplicación se inicia automáticamente.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>¿Qué canales de mensajería están disponibles?</div>
            <div className={styles.faqA}>
              Email, Telegram, WhatsApp y Viber. LINE y SMS próximamente.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>¿Para qué tipo de negocios sirve Pronto?</div>
            <div className={styles.faqA}>
              Para cualquier negocio de servicios: salones de belleza, barberías, talleres de
              autos, cafeterías, clínicas dentales, gimnasios, spas, estudios de tatuajes y
              cualquier otro negocio donde los clientes reserven citas o paguen por servicios.
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Pronto<span>.</span>
        </div>
        <div className={styles.footerCopy}>© 2026 Pronto. Todos los derechos reservados.</div>
        <div className={styles.footerLinks}>
          <Link href="/es/precios">Precios</Link>
          <Link href="/terms">Términos</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/refund">Reembolsos</Link>
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
