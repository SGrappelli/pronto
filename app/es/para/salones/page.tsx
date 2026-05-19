import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Gratis para Salones de Belleza — POS, Reservas y CRM | Pronto',
  description:
    'Software gratuito para salones de belleza con POS, reservas de citas, CRM y recordatorios automáticos por WhatsApp, Telegram y Email. Sin comisiones. Self-hosted o en la nube.',
  keywords:
    'software para salón de belleza, programa para salón de belleza gratis, sistema de reservas para salón, POS para salón de belleza, CRM para salón, software para peluquería, software para salón de uñas, gestión de citas salón, recordatorios automáticos WhatsApp salón, software salón sin comisión, software código abierto salón belleza',
  alternates: {
    canonical: 'https://trypronto.app/es/para/salones',
    languages: {
      en: 'https://trypronto.app/for/salons',
      es: 'https://trypronto.app/es/para/salones',
      'pt-BR': 'https://trypronto.app/pt/para/saloes',
      'x-default': 'https://trypronto.app/for/salons',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/para/salones',
    title: 'Software Gratis para Salones de Belleza — POS, Reservas y CRM | Pronto',
    description:
      'POS, reservas y CRM gratis para salones de belleza. Los clientes reservan sin crear cuenta. Sin comisiones. Self-hosted o en la nube.',
    images: [{ url: 'https://trypronto.app/og-salons-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Gratis para Salones de Belleza — POS, Reservas y CRM | Pronto',
    description:
      'POS, reservas y CRM gratis para salones de belleza. Los clientes reservan sin crear cuenta. Sin comisiones. Self-hosted o en la nube.',
    images: ['https://trypronto.app/og-salons-es.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Software para Salones de Belleza',
  url: 'https://trypronto.app/es/para/salones',
  description:
    'Software gratuito y de código abierto para salones de belleza con POS, reservas de citas, CRM, control de inventario y notificaciones omnicanal por Email, Telegram, WhatsApp y Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Software para Salones de Belleza',
  operatingSystem: 'Web, Linux, Windows, macOS',
  inLanguage: 'es',
  offers: [
    { '@type': 'Offer', name: 'Gratis', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Starter', price: '19', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Agency', price: '79', priceCurrency: 'USD' },
  ],
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  featureList: [
    'Reservas de citas para salones de belleza',
    'Sistema POS para salones',
    'CRM de clientes con historial de visitas',
    'Control de inventario de productos',
    'Recordatorios automáticos de citas por Telegram y WhatsApp',
    'Página de reservas en línea sin registro de cliente',
    'Agenda de empleados',
    'Analíticas de ingresos',
    'PWA — funciona sin conexión',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es el mejor software gratuito para salones de belleza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto es un software gratuito y de código abierto para salones de belleza que incluye POS, calendario de reservas, CRM de clientes, control de inventario y notificaciones automáticas por Email, Telegram, WhatsApp y Viber. La versión self-hosted es gratuita para siempre sin límites. La versión en la nube tiene un plan gratuito y planes de pago desde $19 al mes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los clientes tienen que crear una cuenta para reservar una cita?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La página de reservas solo requiere nombre y número de teléfono. Sin registro, sin contraseña y sin aplicación que descargar. Esto elimina la fricción y aumenta significativamente la tasa de reservas en comparación con plataformas que exigen crear una cuenta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto es una alternativa a las plataformas de reservas para salones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. A diferencia de las plataformas de reservas que cobran un porcentaje de cada cita y retienen los datos de tus clientes en su sistema, Pronto no cobra ninguna comisión. Eres dueño de tu base de clientes al 100%. También puedes instalar el sistema completo en tu propio servidor — sin ningún tipo de dependencia de proveedor.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funcionan los recordatorios automáticos de citas para salones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto envía automáticamente una confirmación de reserva al instante, un recordatorio 24 horas antes de la visita, otro recordatorio 1 hora antes y un mensaje de agradecimiento 2 horas después de que termina la cita. Todos los mensajes se envían por el canal preferido del cliente: WhatsApp, Telegram, Viber o Email. Sin ninguna acción manual del personal del salón.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo controlar el inventario de productos y recibir alertas de stock bajo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto controla el stock de cada producto en tu salón. Cuando un producto baja del mínimo que estableces, se envía automáticamente una alerta al propietario del salón por cualquier canal configurado: Email, Telegram, WhatsApp o Viber.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto funciona para salones de cabello, uñas y barberías?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto está diseñado para cualquier negocio de servicios que toma citas y vende servicios o productos. Funciona para salones de cabello, salones de belleza, salones de uñas, barberías, estudios de masajes y spa, estudios de pestañas, estudios de tatuajes y más.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo instalo Pronto en mi propio servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de RAM. Ejecuta docker compose up -d y el sistema completo de gestión para salones se inicia automáticamente. No se requieren conocimientos de administración de servidores.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa con mis datos si cancelo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con la versión self-hosted, tus datos siempre están en tu propio servidor — no hay nada que cancelar ni perder. Con la versión en la nube, puedes exportar todos los datos de clientes e historial en cualquier momento. Tu base de clientes nunca queda atrapada como ocurre en una plataforma de marketplace.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'Para negocios', item: 'https://trypronto.app/es/para' },
    { '@type': 'ListItem', position: 3, name: 'Salones de belleza', item: 'https://trypronto.app/es/para/salones' },
  ],
}

const pageStyles = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;color:#111;background:#fff;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:'Bricolage Grotesque',sans-serif}

nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.96);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid #f0f0f0;padding:0 48px;height:64px;display:flex;align-items:center;justify-content:space-between}
.nav-brand{font-size:22px;font-weight:800;color:#111;text-decoration:none;letter-spacing:-0.5px}
.nav-brand span{color:#16a34a}
.nav-right{display:flex;align-items:center;gap:24px}
.nav-link{font-size:16px;color:#374151;text-decoration:none;font-weight:500}
.nav-link:hover{color:#111}
.btn-nav{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:10px 22px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;white-space:nowrap}
.hide-mob{display:inline}
.hide-tablet{display:inline}
@media(max-width:900px){.hide-tablet{display:none}}

.hero{padding:80px 48px 72px;background:#fff;border-bottom:1px solid #f0f0f0}
.hero-inner{max-width:860px;margin:0 auto;text-align:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px;margin-bottom:28px;letter-spacing:0.2px}
.hero-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#16a34a}
.hero h1{font-size:60px;font-weight:800;line-height:1.04;letter-spacing:-2px;margin-bottom:20px;color:#0a0a0a}
.hero h1 em{font-style:normal;color:#16a34a}
.hero-sub{font-size:19px;color:#374151;line-height:1.65;margin-bottom:12px;max-width:640px;margin-left:auto;margin-right:auto}
.hero-platforms{font-size:14px;color:#9ca3af;margin-bottom:36px}
.hero-platforms strong{color:#ef4444;font-weight:600}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:44px}
.btn-primary{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline{background:transparent;color:#111;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 22px;border-radius:8px;border:1px solid #d1d5db;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline:hover{border-color:#111}
.hero-stats{display:flex;gap:36px;justify-content:center;flex-wrap:wrap;padding-top:32px;border-top:1px solid #f3f4f6}
.hero-stat-num{font-family:'Bricolage Grotesque',sans-serif;font-size:30px;font-weight:800;color:#0a0a0a;line-height:1}
.hero-stat-label{font-size:13px;color:#6b7280;margin-top:4px}

.sec{padding:72px 48px;border-top:1px solid #f0f0f0}
.sec-white{background:#fff}
.sec-warm{background:#fdf8f0}
.sec-blue{background:#f0f7ff}
.sec-green{background:#f0fdf4}
.sec-head{text-align:center;margin-bottom:40px}
.sec-head h2{font-size:38px;font-weight:700;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:14px}
.sec-head p{font-size:17px;color:#374151;line-height:1.65;max-width:620px;margin:0 auto}

.problem-banner{background:#fff8f0;border:1px solid #fed7aa;border-radius:14px;padding:28px 32px;margin:0 auto 0;max-width:900px;text-align:center}
.problem-banner h3{font-size:22px;font-weight:700;color:#9a3412;margin-bottom:12px}
.problem-banner p{font-size:16px;color:#7c2d12;line-height:1.7}
.problem-banner strong{font-weight:700}

.cards-wrap{max-width:900px;margin:0 auto}
.pain-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.pain-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:22px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column}
.pain-from-label{font-size:10px;color:#ef4444;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.pain-from-text{font-size:14px;color:#6b7280;min-height:42px}
.pain-arrow{font-size:14px;color:#d1d5db;margin:8px 0}
.pain-to{font-size:15px;color:#0a0a0a;font-weight:700}

.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.feat-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column}
.feat-card-icon{font-size:28px;margin-bottom:12px}
.feat-card h4{font-size:18px;font-weight:700;margin-bottom:8px;color:#0a0a0a}
.feat-card p{font-size:15px;color:#374151;line-height:1.6;flex:1}
.feat-card .feat-detail{font-size:13px;color:#9ca3af;margin-top:8px;padding-top:8px;border-top:1px solid #f3f4f6}

.workflow{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#e2e8f0;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;max-width:900px;margin:0 auto}
.wf-step{background:#fff;padding:28px 20px;text-align:center}
.wf-num{font-family:'Bricolage Grotesque',sans-serif;font-size:40px;font-weight:800;color:#e2e8f0;line-height:1;margin-bottom:12px}
.wf-title{font-size:15px;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.wf-desc{font-size:13px;color:#6b7280;line-height:1.55}

.channel-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px;justify-content:center}
.channel{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:8px 18px;font-size:14px;font-weight:500;color:#111;box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.channel.soon{opacity:0.5;border-style:dashed;box-shadow:none}
.dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.dot-green{background:#22c55e}
.dot-blue{background:#3b82f6}
.dot-purple{background:#a855f7}
.dot-gray{background:#9ca3af}
.badge-soon{font-size:10px;font-weight:700;background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:10px;margin-left:2px}

.notif-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.notif-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column}
.notif-card .ev-emoji{font-size:20px;margin-bottom:8px;line-height:1}
.notif-card .ev-text{font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:6px;min-height:1.4em}
.notif-card .ev-sub{font-size:14px;color:#374151;line-height:1.6;flex:1}
.notif-card .ev-channels{font-size:12px;color:#15803d;font-weight:600;margin-top:8px}

.comp-table{max-width:760px;margin:0 auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.07)}
.comp-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;background:#fff}
.comp-row:not(:last-child){border-bottom:1px solid #f3f4f6}
.comp-row.header{background:#f8fafc;font-size:13px;font-weight:700;color:#374151}
.comp-cell{padding:14px 18px;font-size:14px;color:#374151;display:flex;align-items:center}
.comp-cell:first-child{font-weight:600;color:#0a0a0a}
.comp-row.header .comp-cell:first-child{font-weight:700;color:#374151}
.comp-cell.good{color:#15803d;font-weight:500}
.comp-cell.bad{color:#ef4444}
.comp-row.pronto-row{background:#f0fdf4}
.comp-row.pronto-row .comp-cell:first-child{color:#16a34a}

.plans{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:900px;margin:0 auto 20px}
.plan{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;display:flex;flex-direction:column;box-shadow:0 1px 4px rgba(0,0,0,0.05);position:relative}
.plan.featured{border:2px solid #3b82f6}
.plan-popular{position:absolute;top:16px;right:16px;font-size:11px;font-weight:700;background:#eff6ff;color:#1d4ed8;padding:3px 10px;border-radius:12px;white-space:nowrap}
.plan-name{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:#111}
.plan-price{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;margin-bottom:4px;color:#0a0a0a;line-height:1.1}
.plan-price span{font-size:14px;font-weight:400;font-family:'DM Sans',sans-serif;color:#9ca3af}

.plan-trial-free{font-size:13px;color:#9ca3af;font-weight:500;margin-bottom:12px;display:block}
.plan-limit{font-size:13px;color:#374151;margin-bottom:16px;padding-top:10px;border-top:1px solid #f3f4f6}
.plan-feats{list-style:none;font-size:13px;display:flex;flex-direction:column;gap:8px;flex:1}
.plan-feats li{color:#374151;display:flex;align-items:flex-start;gap:6px;line-height:1.5}
.plan-feats li::before{content:"✓";color:#16a34a;font-weight:700;flex-shrink:0;margin-top:1px}
.pricing-note{font-size:13px;color:#9ca3af;text-align:center;max-width:900px;margin:0 auto}
.pricing-note a{color:#3b82f6;text-decoration:none}

.two-paths{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:0 auto 0}
.path-card{border-radius:16px;padding:36px;border:1px solid #e2e8f0}
.path-card.self{background:#f8fafc}
.path-card.cloud{background:#f0fdf4;border-color:#bbf7d0}
.path-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:12px}
.path-card h3{font-size:26px;font-weight:800;margin-bottom:10px;color:#0a0a0a;letter-spacing:-0.5px}
.path-desc{font-size:16px;color:#374151;line-height:1.65;margin-bottom:28px}
.code-block{background:#0f172a;border-radius:10px;padding:14px 20px;font-family:'Courier New',monospace;font-size:14px;color:#4ade80;display:inline-block;margin-bottom:20px}
.code-prefix{color:#475569;margin-right:8px}
.path-points{display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
.path-point{display:flex;gap:10px;align-items:flex-start}
.path-point-dot{width:6px;height:6px;border-radius:50%;background:#16a34a;margin-top:7px;flex-shrink:0}
.path-point-text{font-size:15px;color:#374151;line-height:1.6}
.path-point-text strong{color:#111;font-weight:600}





.faq{padding:72px 48px;background:#fff;border-top:1px solid #f0f0f0}
.faq-inner{max-width:760px;margin:0 auto}
.faq h2{font-size:34px;font-weight:700;letter-spacing:-0.5px;margin-bottom:36px;color:#0a0a0a;text-align:center}
.faq-item{border-bottom:1px solid #f0f0f0;padding:22px 0}
.faq-item:last-child{border-bottom:none}
.faq-q{font-size:16px;font-weight:700;color:#111;margin-bottom:10px;font-family:'Bricolage Grotesque',sans-serif}
.faq-a{font-size:14px;color:#374151;line-height:1.75}
.faq-a code{background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:13px}

footer{padding:48px;border-top:1px solid #f0f0f0;background:#fff}
.footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}
.footer-brand{font-size:22px;font-weight:800;color:#111;letter-spacing:-0.5px;text-decoration:none}
.footer-brand span{color:#16a34a}
.footer-tagline{font-size:13px;color:#6b7280;margin-top:6px}
.footer-col-head{font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#9ca3af;margin-bottom:14px}
.footer-col a{display:block;font-size:14px;color:#6b7280;text-decoration:none;margin-bottom:10px;transition:color 0.15s}
.footer-col a:hover{color:#16a34a}
.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid #f0f0f0}
.footer-copy{font-size:13px;color:#9ca3af}
.footer-social{display:flex;gap:16px;align-items:center}
.footer-social a{color:#9ca3af;display:flex;line-height:1;text-decoration:none}
.footer-social a:hover{color:#111}

.breadcrumb{padding:14px 48px;background:#fafafa;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af}
.breadcrumb a{color:#9ca3af;text-decoration:none}
.breadcrumb a:hover{color:#111}
.breadcrumb span{margin:0 8px}

.cta-band{background:#0a0a0a;padding:64px 48px;text-align:center}
.cta-band h2{font-size:36px;font-weight:800;color:#fff;letter-spacing:-0.5px;margin-bottom:14px}
.cta-band p{font-size:17px;color:#9ca3af;margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto}
.btn-cta-white{background:#fff;color:#111;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}
.btn-cta-outline{background:transparent;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:12px 26px;border-radius:8px;border:1px solid #374151;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}

.badge-row{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin-top:16px}
.badge{font-size:13px;border-radius:6px;padding:5px 12px;font-weight:500;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0}

@media(max-width:1024px){
  nav{padding:0 24px}
  .hero{padding:60px 24px 52px}
  .hero h1{font-size:46px}
  .sec{padding:56px 24px}
  .faq{padding:56px 24px}
  footer{padding:48px 24px}
  .breadcrumb{padding:14px 24px}
  .feat-grid,.pain-grid,.notif-grid{grid-template-columns:repeat(2,1fr)}
  .two-paths{grid-template-columns:1fr}
  .plans{grid-template-columns:repeat(2,1fr)}
  .workflow{grid-template-columns:repeat(2,1fr)}
  .comp-row{grid-template-columns:2fr 1fr 1fr 1fr}
  .cta-band{padding:52px 24px}
}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr;gap:24px}}
@media(max-width:640px){
  nav{padding:0 16px;height:56px}
  .nav-right{gap:8px}
  .nav-link{font-size:14px}
  .btn-nav{font-size:13px;padding:8px 14px}
  .hide-mob{display:none}
  .hero{padding:48px 16px 40px}
  .hero h1{font-size:34px;letter-spacing:-1px}
  .hero-sub{font-size:16px}
  .hero-stats{gap:20px}
  .sec{padding:44px 16px}
  .sec-head h2{font-size:28px}
  .sec-head p{font-size:15px}
  .faq{padding:44px 16px}
  footer{padding:32px 16px}
  .footer-top{grid-template-columns:1fr;gap:28px}
  .footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}
  .breadcrumb{padding:12px 16px}
  .feat-grid,.pain-grid,.notif-grid{grid-template-columns:1fr}
  .plans{grid-template-columns:1fr}
  .workflow{grid-template-columns:1fr}
  .two-paths{grid-template-columns:1fr}
  .comp-row{grid-template-columns:1.5fr 1fr 1fr 1fr}
  .comp-cell{padding:12px 10px;font-size:13px}
  .cta-band{padding:44px 16px}
  .cta-band h2{font-size:26px}


  .path-card{padding:24px}
}
`

const pageContent = `
<nav>
  <a href="/es/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/es/precios" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/es/para/salones'})">Precios</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/salons',es:'/es/para/salones',pt:'/pt/para/saloes'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es" selected>ES</option><option value="pt">PT</option></select>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'es'})">Iniciar sesi&oacute;n</a>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/salones'})">Empezar gratis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/es/para">Para negocios</a><span>&rsaquo;</span>
  Salones de belleza
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Software para salones de belleza
    </div>
    <h1>Tu sal&oacute;n. <em>Tus clientes.</em> Sin comisiones.</h1>
    <p class="hero-sub">POS, reservas de citas, CRM y recordatorios autom&aacute;ticos de tratamientos &mdash;
para salones de belleza, salones de cabello, salones de u&ntilde;as y barber&iacute;as.
Self-hosted o en la nube.</p>
    <p class="hero-platforms">La mayor&iacute;a de las plataformas de reservas cobran <strong>20&ndash;30%</strong>
de cada cita de tus propios clientes. Pronto cobra <strong>$0</strong>.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/salones'})">Empezar gratis &mdash; sin tarjeta</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para/salones'})">Self-host gratis &rarr;</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Sin comisi&oacute;n por reservas</div>
      </div>
      <div>
        <div class="hero-stat-num">0%</div>
        <div class="hero-stat-label">Tarifa de plataforma</div>
      </div>
      <div>
        <div class="hero-stat-num">1 cmd</div>
        <div class="hero-stat-label">Instalaci&oacute;n self-hosted</div>
      </div>
      <div>
        <div class="hero-stat-num">4</div>
        <div class="hero-stat-label">Canales de notificaci&oacute;n</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="cards-wrap">
    <div class="problem-banner">
      <h3>El problema del software para salones que nadie menciona</h3>
      <p>Construiste una base de clientes leales durante a&ntilde;os. Entonces
una plataforma de reservas exige un <strong>20&ndash;30% de cada cita</strong>
&mdash; de clientes que ya son tuyos. Y lo peor: ellos son due&ntilde;os de los datos.
Si cancelas tu cuenta, desaparece el historial de reservas, los contactos
de clientes y las rese&ntilde;as.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>Lo que los due&ntilde;os de salones realmente enfrentan</h2>
    <p>Cada problema a continuaci&oacute;n tiene una soluci&oacute;n directa en Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Los clientes reservan directo contigo &mdash; t&uacute; te quedas con el 100%</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Los clientes reservan directo contigo &mdash; t&uacute; te quedas con el 100%</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Recordatorios manuales por WhatsApp cada noche</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Recordatorios autom&aacute;ticos 24h y 1h antes &mdash; por WhatsApp, Telegram, Email o Viber</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">El cliente se registra en la plataforma, no contigo</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Los clientes reservan con solo nombre y tel&eacute;fono &mdash; sin app, sin cuenta</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Se acaban los productos a mitad de semana</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Alerta de stock bajo en tu tel&eacute;fono antes de quedarte sin nada</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Sin idea de qui&eacute;n viene ni cu&aacute;nto gasta</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Historial completo del cliente &mdash; visitas, gastos, &uacute;ltima vez, cumplea&ntilde;os</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Reservas dobles, errores en el calendario de papel</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Verificaci&oacute;n de conflictos a nivel de base de datos &mdash; imposible hacer doble reserva</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Todo lo que un sal&oacute;n necesita, nada de lo que no</h2>
    <p>Dise&ntilde;ado para la persona que dirige el sal&oacute;n, no para equipos de IT.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4C5;</div>
        <h4>Reservas de citas</h4>
        <p>Calendario con drag &amp; drop. Vista semanal. Columnas por empleado.
Los clientes reservan en l&iacute;nea sin crear una cuenta.</p>
        <div class="feat-detail">Protecci&oacute;n contra doble reserva a nivel de base de datos</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Punto de venta</h4>
        <p>Completa una venta en 3 clics. Efectivo, tarjeta, transferencia.
Aplica descuentos. Env&iacute;a recibos digitales.</p>
        <div class="feat-detail">Funciona completamente sin internet &mdash; sin interrupciones en caja</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>CRM de clientes</h4>
        <p>Historial completo por cliente: visitas, servicios, productos,
gasto total, notas, cumplea&ntilde;os, etiquetas.</p>
        <div class="feat-detail">Busca en toda tu base de clientes en menos de 1 segundo</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Control de inventario</h4>
        <p>Controla cada producto en tu sal&oacute;n. Registra compras y consumos.
Alertas autom&aacute;ticas de stock bajo.</p>
        <div class="feat-detail">Alerta enviada por Telegram, WhatsApp, Email o Viber &mdash; t&uacute; eliges</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>P&aacute;gina de reservas en l&iacute;nea</h4>
        <p>P&aacute;gina p&uacute;blica donde los clientes pueden encontrarte y reservar
directamente. Sin marketplace de por medio.</p>
        <div class="feat-detail">Solo nombre y tel&eacute;fono &mdash; sin registro, sin app que descargar</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Funciona en cualquier dispositivo</h4>
        <p>Instala como PWA en tu tel&eacute;fono o tablet desde el navegador.
Funciona sin conexi&oacute;n en el escritorio.</p>
        <div class="feat-detail">Sin App Store, sin comisi&oacute;n del 30% de Apple o Google</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>C&oacute;mo funciona tu sal&oacute;n con Pronto</h2>
    <p>Desde un nuevo cliente hasta una reserva recurrente &mdash; completamente automatizado.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">El cliente descubre tu p&aacute;gina de reservas</div>
      <div class="wf-desc">Enlazada desde Instagram, Google o donde quieras. Sin app,
sin cuenta &mdash; solo nombre y tel&eacute;fono.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Reserva confirmada autom&aacute;ticamente</div>
      <div class="wf-desc">Confirmaci&oacute;n instant&aacute;nea enviada al cliente por WhatsApp,
Telegram, Email o Viber.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Recordatorios sin que hagas nada</div>
      <div class="wf-desc">24 horas y 1 hora antes de la cita. Sin mensajes manuales.
Sin clientes que no se presentan.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Cobro y fidelizaci&oacute;n</div>
      <div class="wf-desc">Completa la venta en el POS. Mensaje de agradecimiento
enviado autom&aacute;ticamente. Cliente guardado en tu CRM para siempre.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Recordatorios autom&aacute;ticos para clientes &mdash; en todos los canales</h2>
    <p>El &uacute;nico software de c&oacute;digo abierto para salones con Email, Telegram,
WhatsApp y Viber integrados &mdash; sin plugins, sin cargos adicionales.</p>
  </div>
  <div class="channel-row">
    <div class="channel"><span class="dot dot-green"></span>Email</div>
    <div class="channel"><span class="dot dot-blue"></span>Telegram</div>
    <div class="channel"><span class="dot dot-green"></span>WhatsApp</div>
    <div class="channel"><span class="dot dot-purple"></span>Viber</div>
    <div class="channel soon"><span class="dot dot-gray"></span>LINE <span class="badge-soon">Pr&oacute;ximamente</span></div>
    <div class="channel soon"><span class="dot dot-gray"></span>SMS <span class="badge-soon">Pr&oacute;ximamente</span></div>
  </div>
  <div class="cards-wrap">
    <div class="notif-grid">
      <div class="notif-card">
        <div class="ev-emoji">&#x2705;</div>
        <div class="ev-text">Reserva confirmada</div>
        <div class="ev-sub">Enviada al instante cuando el cliente reserva en l&iacute;nea o cuando
t&uacute; agregas una cita manualmente</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Recordatorio de cita</div>
        <div class="ev-sub">Recordatorio autom&aacute;tico 24 horas antes y nuevamente 1 hora
antes de la visita</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Mensaje de agradecimiento</div>
        <div class="ev-sub">Enviado 2 horas despu&eacute;s de que termina la visita &mdash; mantiene
tu sal&oacute;n en la mente del cliente</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Mensaje de reactivaci&oacute;n</div>
        <div class="ev-sub">&#x201C;No te hemos visto en 30 d&iacute;as&#x201D; &mdash; recupera clientes
inactivos autom&aacute;ticamente</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Felicitaci&oacute;n de cumplea&ntilde;os</div>
        <div class="ev-sub">Enviada autom&aacute;ticamente el d&iacute;a del cumplea&ntilde;os del cliente &mdash;
un detalle personal que no te cuesta nada</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Alerta de stock bajo</div>
        <div class="ev-sub">Notifica al propietario cuando cualquier producto baja
del m&iacute;nimo establecido</div>
        <div class="ev-channels">Al propietario del negocio por cualquier canal</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Por qu&eacute; los due&ntilde;os de salones eligen Pronto</h2>
    <p>C&oacute;mo se compara Pronto con las plataformas de reservas para salones.</p>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Funci&oacute;n</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Plataformas marketplace</div>
      <div class="comp-cell">SaaS de suscripci&oacute;n</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Comisi&oacute;n por reservas</div>
      <div class="comp-cell good">$0 siempre</div>
      <div class="comp-cell bad">10&ndash;30% por reserva</div>
      <div class="comp-cell" style="color:#374151">$0 (cuota de suscripci&oacute;n)</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Eres due&ntilde;o de los datos de clientes</div>
      <div class="comp-cell good">&#x2713; Siempre tuyos</div>
      <div class="comp-cell bad">&#x2717; Viven en su plataforma</div>
      <div class="comp-cell bad">&#x2717; Bloqueados en el proveedor</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Registro requerido para reservar</div>
      <div class="comp-cell good">&#x2717; Solo nombre y tel&eacute;fono</div>
      <div class="comp-cell bad">&#x2713; Cuenta obligatoria</div>
      <div class="comp-cell bad">&#x2713; Cuenta obligatoria</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Opci&oacute;n self-hosted</div>
      <div class="comp-cell good">&#x2713; Gratis, licencia MIT</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">WhatsApp + Telegram integrados</div>
      <div class="comp-cell good">&#x2713; Todos los canales incluidos</div>
      <div class="comp-cell bad">&#x2717; / Complemento de pago</div>
      <div class="comp-cell bad">&#x2717; / Complemento de pago</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">C&oacute;digo abierto</div>
      <div class="comp-cell good">&#x2713; Licencia MIT</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
  </div>
  <div style="text-align:center;margin-top:24px">
    <div class="badge-row">
      <span class="badge">Salones de belleza</span>
      <span class="badge">Salones de cabello</span>
      <span class="badge">Salones de u&ntilde;as</span>
      <span class="badge">Barber&iacute;as</span>
      <span class="badge">Masajes y spa</span>
      <span class="badge">Estudios de pesta&ntilde;as</span>
      <span class="badge">Estudios de tatuajes</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Dos formas de usar Pronto en tu sal&oacute;n</h2>
    <p>Self-hosted para control total, o nuestra nube para estar listo en 5 minutos.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Opci&oacute;n 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Instala en tu propio servidor. Tus datos nunca salen de tu m&aacute;quina.
Gratis para siempre. Requiere Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 para siempre</strong> &mdash; sin suscripci&oacute;n, sin l&iacute;mites de clientes ni empleados</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Licencia MIT</strong> &mdash; modifica, extiende y personaliza libremente</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Cualquier servidor</strong> &mdash; VPS Linux, Windows, macOS. M&iacute;nimo 1 GB de RAM</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para/salones'})">Ver en GitHub &rarr;</a>
      <a href="/docs" class="btn-outline">Documentaci&oacute;n &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Opci&oacute;n 2</div>
      <h3>Nube &mdash; trypronto.app</h3>
      <p class="path-desc">Sin servidor propio. Tu subdominio listo en 5 minutos.
Nosotros gestionamos actualizaciones, backups y uptime.</p>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Tu propio subdominio</strong> &mdash; salon-maya.trypronto.app o dominio personalizado en Pro+</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Nos encargamos de todo</strong> &mdash; actualizaciones, backups y monitoreo de uptime</div></div>
      </div>
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/salones'})">Empezar gratis &mdash; sin tarjeta</a>
    </div>
  </div>

  <div style="height:48px"></div>
  <div style="text-align:center;margin-bottom:22px">
    <p style="font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#0a0a0a">Precios en la nube</p>
  </div>
  <div class="plans">
    <div class="plan">
      <div class="plan-name">Gratis</div>
      <div class="plan-price">$0</div>
      <span class="plan-trial-free">Gratis para siempre</span>
      <div class="plan-limit">1 empleado &middot; 100 clientes &middot; 50 reservas/mes</div>
      <ul class="plan-feats">
        <li>POS + CRM + Inventario</li>
        <li>Notificaciones Email + Telegram + WhatsApp + Viber</li>
        <li>P&aacute;gina de reservas en l&iacute;nea</li>
        <li><span style="font-size:11px;color:#9ca3af">&ldquo;Powered by Pronto&rdquo; en la p&aacute;gina de reservas</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/mes</span></div>
      <div class="plan-limit">3 empleados &middot; clientes ilimitados &middot; reservas ilimitadas</div>
      <ul class="plan-feats">
        <li>Todo lo incluido en Gratis</li>
        <li>Badge &ldquo;Powered by Pronto&rdquo; eliminado</li>
      </ul>
    </div>
    <div class="plan featured">
      <div class="plan-popular">M&aacute;s popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$39<span>/mes</span></div>
      <div class="plan-limit">15 empleados &middot; ilimitado</div>
      <ul class="plan-feats">
        <li>Todo lo incluido en Starter</li>
        <li>Panel de an&aacute;lisis <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Pr&oacute;ximamente</span></li>
        <li>Dominio personalizado <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Pr&oacute;ximamente</span></li>
        <li>Programa de fidelizaci&oacute;n <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Pr&oacute;ximamente</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Agency</div>
      <div class="plan-price">$79<span>/mes</span></div>
      <div class="plan-limit">Varias ubicaciones</div>
      <ul class="plan-feats">
        <li>Todo lo incluido en Pro</li>
        <li>White-label <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Pr&oacute;ximamente</span></li>
        <li>Acceso a API <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Pr&oacute;ximamente</span></li>
        <li>Soporte prioritario</li>
      </ul>
    </div>
  </div>
  <p class="pricing-note"><a href="/es/precios">Ver precios completos &rarr;</a></p>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Preguntas frecuentes</h2>
    <div class="faq-item">
      <div class="faq-q">&iquest;Cu&aacute;l es el mejor software gratuito para salones de belleza?</div>
      <div class="faq-a">Pronto es un software gratuito y de c&oacute;digo abierto para salones de belleza que incluye POS, calendario de reservas, CRM de clientes, control de inventario y notificaciones autom&aacute;ticas por Email, Telegram, WhatsApp y Viber. La versi&oacute;n self-hosted es gratuita para siempre sin l&iacute;mites. La versi&oacute;n en la nube tiene un plan gratuito y planes de pago desde $19 al mes.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Los clientes tienen que crear una cuenta para reservar una cita?</div>
      <div class="faq-a">No. La p&aacute;gina de reservas solo requiere nombre y n&uacute;mero de tel&eacute;fono. Sin registro, sin contrase&ntilde;a y sin aplicaci&oacute;n que descargar. Esto elimina la fricci&oacute;n y aumenta significativamente la tasa de reservas en comparaci&oacute;n con plataformas que exigen crear una cuenta.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Pronto es una alternativa a las plataformas de reservas para salones?</div>
      <div class="faq-a">S&iacute;. A diferencia de las plataformas de reservas que cobran un porcentaje de cada cita y retienen los datos de tus clientes en su sistema, Pronto no cobra ninguna comisi&oacute;n. Eres due&ntilde;o de tu base de clientes al 100%. Tambi&eacute;n puedes instalar el sistema completo en tu propio servidor &mdash; sin ning&uacute;n tipo de dependencia de proveedor.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;C&oacute;mo funcionan los recordatorios autom&aacute;ticos de citas para salones?</div>
      <div class="faq-a">Pronto env&iacute;a autom&aacute;ticamente una confirmaci&oacute;n de reserva al instante, un recordatorio 24 horas antes de la visita, otro recordatorio 1 hora antes y un mensaje de agradecimiento 2 horas despu&eacute;s de que termina la cita. Todos los mensajes se env&iacute;an por el canal preferido del cliente: WhatsApp, Telegram, Viber o Email. Sin ninguna acci&oacute;n manual del personal del sal&oacute;n.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Puedo controlar el inventario de productos y recibir alertas de stock bajo?</div>
      <div class="faq-a">S&iacute;. Pronto controla el stock de cada producto en tu sal&oacute;n. Cuando un producto baja del m&iacute;nimo que estableces, se env&iacute;a autom&aacute;ticamente una alerta al propietario del sal&oacute;n por cualquier canal configurado: Email, Telegram, WhatsApp o Viber.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Pronto funciona para salones de cabello, u&ntilde;as y barber&iacute;as?</div>
      <div class="faq-a">S&iacute;. Pronto est&aacute; dise&ntilde;ado para cualquier negocio de servicios que toma citas y vende servicios o productos. Funciona para salones de cabello, salones de belleza, salones de u&ntilde;as, barber&iacute;as, estudios de masajes y spa, estudios de pesta&ntilde;as, estudios de tatuajes y m&aacute;s.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;C&oacute;mo instalo Pronto en mi propio servidor?</div>
      <div class="faq-a">Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de RAM. Ejecuta <code>docker compose up -d</code> y el sistema completo de gesti&oacute;n para salones se inicia autom&aacute;ticamente. No se requieren conocimientos de administraci&oacute;n de servidores. Consulta la <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documentaci&oacute;n en GitHub</a> para instrucciones paso a paso.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Qu&eacute; pasa con mis datos si cancelo?</div>
      <div class="faq-a">Con la versi&oacute;n self-hosted, tus datos siempre est&aacute;n en tu propio servidor &mdash; no hay nada que cancelar ni perder. Con la versi&oacute;n en la nube, puedes exportar todos los datos de clientes e historial en cualquier momento. Tu base de clientes nunca queda atrapada como ocurre en una plataforma de marketplace.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Tambi&eacute;n para</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/es/para/barberia" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">✂️ Barber&iacute;as</a>
    <a href="/es/para/spa" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🧖 Masajes y spa</a>
    <a href="/es/para/tatuajes" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🎨 Estudios de tatuajes</a>
    <a href="/es/para" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">Ver todos →</a>
  </div>
</section>

<section class="cta-band">
  <h2>Empieza a gestionar tu sal&oacute;n gratis hoy</h2>
  <p>La nube tarda 5 minutos. Self-hosted es un solo comando.
De cualquier forma &mdash; sin comisiones, para siempre.</p>
  <div>
    <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/salones'})">Empezar gratis &mdash; nube</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para/salones'})">Self-host en GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/es" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Tus datos, tu servidor.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Para negocios</div>
      <a href="/es/para">Todos los negocios</a>
      <a href="/es/para/barberia">Barber&iacute;as</a>
      <a href="/es/para/spa">Masajes y spa</a>
      <a href="/es/para/tatuajes">Estudios de tatuajes</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Comparar</div>
      <a href="/es/vs/fresha">vs Fresha</a>
      <a href="/es/vs/vagaro">vs Vagaro</a>
      <a href="/es/vs/square">vs Square</a>
      <a href="/es/vs/booksy">vs Booksy</a>
      <a href="/es/vs/mindbody">vs Mindbody</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Legal</div>
      <a href="/terms">T&eacute;rminos de Uso</a>
      <a href="/privacy">Pol&iacute;tica de Privacidad</a>
      <a href="/refund">Pol&iacute;tica de Reembolso</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">&copy; 2026 Pronto. Todos los derechos reservados.</div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/es/para/salones'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/es/para/salones'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/es/para/salones'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/es/para/salones'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function EsParaSalonesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
