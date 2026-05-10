import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Gratis para Talleres Mecánicos — Órdenes de Servicio, POS y CRM | Pronto',
  description:
    'Software gratuito para talleres mecánicos y autoservicios con órdenes de servicio, inventario de repuestos, CRM de clientes y recordatorios automáticos por WhatsApp y Telegram. Sin comisiones. Self-hosted o en la nube.',
  keywords:
    'software para taller mecánico, programa para taller automotriz gratis, sistema de órdenes de servicio taller, POS para taller mecánico, CRM para taller automotriz, software gestión taller mecánico, control de repuestos taller, recordatorios WhatsApp taller, software taller sin comisión, sistema gestión autoservicio, software código abierto taller mecánico',
  alternates: {
    canonical: 'https://trypronto.app/es/para/autoservicio',
    languages: {
      en: 'https://trypronto.app/for/auto-repair',
      es: 'https://trypronto.app/es/para/autoservicio',
      'x-default': 'https://trypronto.app/for/auto-repair',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/para/autoservicio',
    title: 'Software Gratis para Talleres Mecánicos — Órdenes de Servicio, POS y CRM | Pronto',
    description:
      'Órdenes de servicio, inventario de repuestos y CRM gratis para talleres mecánicos. Los clientes reciben notificaciones automáticas. Sin comisiones. Self-hosted o en la nube.',
    images: [{ url: 'https://trypronto.app/og-auto-repair-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Gratis para Talleres Mecánicos — Órdenes de Servicio, POS y CRM | Pronto',
    description:
      'Órdenes de servicio, inventario de repuestos y CRM gratis para talleres mecánicos. Los clientes reciben notificaciones automáticas. Sin comisiones. Self-hosted o en la nube.',
    images: ['https://trypronto.app/og-auto-repair-es.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Software para Talleres Mecánicos',
  url: 'https://trypronto.app/es/para/autoservicio',
  description:
    'Software gratuito y de código abierto para talleres mecánicos con órdenes de servicio, CRM de clientes, inventario de repuestos y notificaciones omnicanal por Email, Telegram, WhatsApp y Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Software para Talleres Mecánicos',
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
    'Órdenes de servicio para talleres mecánicos',
    'Sistema POS para talleres automotrices',
    'CRM de clientes con historial de servicios',
    'Inventario de repuestos con alertas de stock bajo',
    'Notificaciones automáticas al cliente por Telegram y WhatsApp',
    'Seguimiento de estado de reparación en tiempo real',
    'Agenda de mecánicos y técnicos',
    'Analíticas de ingresos por servicio',
    'PWA — funciona sin conexión',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es el mejor software gratuito para talleres mecánicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto es un software gratuito y de código abierto para talleres mecánicos que incluye órdenes de servicio, POS, CRM de clientes con historial de reparaciones, inventario de repuestos y notificaciones automáticas por Email, Telegram, WhatsApp y Viber. La versión self-hosted es gratuita para siempre sin límites. La versión en la nube tiene un plan gratuito y planes de pago desde $19 al mes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se notifica al cliente cuando su auto está listo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto envía notificaciones automáticas al cliente en cada etapa: confirmación cuando entra el vehículo, actualización de estado durante la reparación y aviso inmediato cuando el auto está listo para recoger. Todos los mensajes se envían por WhatsApp, Telegram, Viber o Email según la preferencia del cliente. Sin llamadas manuales ni mensajes escritos a mano.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto puede gestionar el inventario de repuestos del taller?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto controla el stock de cada repuesto, aceite, filtro y consumible en tu taller. Cuando cualquier artículo baja del mínimo que estableces, se envía automáticamente una alerta al dueño del taller por Email, Telegram, WhatsApp o Viber. Nunca te quedas sin un repuesto crítico en medio de un trabajo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto funciona para talleres mecánicos, de chapa y pintura y eléctricos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto está diseñado para cualquier taller automotriz que gestiona órdenes de trabajo, inventario de piezas y relaciones con clientes. Funciona para talleres mecánicos generales, talleres de chapa y pintura, talleres eléctricos, talleres de llantas, centros de diagnóstico y cualquier otro servicio automotriz.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funcionan las órdenes de servicio en Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada vehículo que entra al taller genera una orden de servicio con los datos del cliente, descripción del problema, repuestos utilizados, mano de obra y costo total. El estado de la orden (recibido, en proceso, listo, entregado) se actualiza desde el panel y el cliente recibe una notificación automática en cada cambio de estado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los clientes necesitan crear una cuenta para agendar una cita en el taller?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La página de reservas solo requiere nombre y número de teléfono. Sin registro, sin contraseña y sin aplicación que descargar. El cliente agenda una cita de revisión o diagnóstico en menos de un minuto directamente desde el enlace que compartes en WhatsApp, Instagram o Google Maps.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo instalo Pronto en mi propio servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de RAM. Ejecuta docker compose up -d y el sistema completo de gestión para talleres se inicia automáticamente. No se requieren conocimientos de administración de servidores.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa con los datos de mis clientes si cancelo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con la versión self-hosted, tus datos siempre están en tu propio servidor — no hay nada que cancelar ni perder. Con la versión en la nube, puedes exportar todos los datos de clientes, historial de reparaciones y órdenes de servicio en cualquier momento. Tu base de clientes es tuya, no de la plataforma.',
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
    { '@type': 'ListItem', position: 3, name: 'Talleres mecánicos', item: 'https://trypronto.app/es/para/autoservicio' },
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
.plan-trial{font-size:12px;color:#166534;font-weight:700;background:#dcfce7;padding:4px 10px;border-radius:8px;display:inline-block;margin-bottom:12px}
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
.trial-banner{background:#fff;border:1px solid #bbf7d0;border-radius:12px;padding:20px 26px;margin-bottom:26px;display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.trial-big{font-family:'Bricolage Grotesque',sans-serif;font-size:40px;font-weight:800;color:#16a34a;white-space:nowrap;line-height:1.1}
.trial-text{font-size:15px;color:#166534;font-weight:500;margin-bottom:4px}
.trial-note{font-size:13px;color:#16a34a;opacity:0.75}

.faq{padding:72px 48px;background:#fff;border-top:1px solid #f0f0f0}
.faq-inner{max-width:760px;margin:0 auto}
.faq h2{font-size:34px;font-weight:700;letter-spacing:-0.5px;margin-bottom:36px;color:#0a0a0a;text-align:center}
.faq-item{border-bottom:1px solid #f0f0f0;padding:22px 0}
.faq-item:last-child{border-bottom:none}
.faq-q{font-size:16px;font-weight:700;color:#111;margin-bottom:10px;font-family:'Bricolage Grotesque',sans-serif}
.faq-a{font-size:14px;color:#374151;line-height:1.75}
.faq-a code{background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:13px}

footer{padding:28px 48px;border-top:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;background:#fff}
.footer-brand{font-size:22px;font-weight:800;color:#111;letter-spacing:-0.5px}
.footer-brand span{color:#16a34a}
.footer-copy{font-size:13px;color:#9ca3af;margin-top:2px}
.footer-right{display:flex;align-items:center;gap:20px}
.footer-links{display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end}
.footer-links a{font-size:13px;color:#9ca3af;text-decoration:none}
.footer-links a:hover{color:#111}
.footer-social{display:flex;gap:10px;align-items:center;flex-shrink:0}
.footer-social a{color:#9ca3af;display:flex;align-items:center;line-height:1}
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
  footer{padding:24px}
  .breadcrumb{padding:14px 24px}
  .feat-grid,.pain-grid,.notif-grid{grid-template-columns:repeat(2,1fr)}
  .two-paths{grid-template-columns:1fr}
  .plans{grid-template-columns:repeat(2,1fr)}
  .workflow{grid-template-columns:repeat(2,1fr)}
  .comp-row{grid-template-columns:2fr 1fr 1fr 1fr}
  .cta-band{padding:52px 24px}
}
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
  footer{flex-direction:column;align-items:flex-start;gap:16px;padding:24px 16px}
  .footer-right{flex-direction:column;align-items:flex-start;gap:12px}
  .footer-links{flex-wrap:wrap;gap:12px}
  .breadcrumb{padding:12px 16px}
  .feat-grid,.pain-grid,.notif-grid{grid-template-columns:1fr}
  .plans{grid-template-columns:1fr}
  .workflow{grid-template-columns:1fr}
  .two-paths{grid-template-columns:1fr}
  .comp-row{grid-template-columns:1.5fr 1fr 1fr 1fr}
  .comp-cell{padding:12px 10px;font-size:13px}
  .cta-band{padding:44px 16px}
  .cta-band h2{font-size:26px}
  .trial-banner{flex-direction:column;gap:10px;padding:16px 20px}
  .trial-big{font-size:32px}
  .path-card{padding:24px}
}
`

const pageContent = `
<nav>
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/es/precios" class="nav-link hide-mob">Precios</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/auto-repair',es:'/es/para/autoservicio',pt:'/pt/para/autoservicio'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es" selected>ES</option><option value="pt">PT</option></select>
    <a href="/login" class="nav-link hide-tablet">Iniciar sesi&oacute;n</a>
    <a href="/register" class="btn-nav">Empezar gratis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/es/para">Para negocios</a><span>&rsaquo;</span>
  Talleres mec&aacute;nicos
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Software para talleres mec&aacute;nicos
    </div>
    <h1>Tu taller. <em>Tus clientes.</em> Sin comisiones.</h1>
    <p class="hero-sub">&Oacute;rdenes de servicio, inventario de repuestos, CRM y notificaciones autom&aacute;ticas al cliente &mdash; para talleres mec&aacute;nicos, de chapa y pintura, el&eacute;ctricos y cualquier servicio automotriz. Self-hosted o en la nube.</p>
    <p class="hero-platforms">Tus clientes te son fieles a ti, no a una plataforma. Gestiona tu taller con <strong>$0 de comisi&oacute;n</strong> y mant&eacute;n todos los datos en tu poder.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary">Empezar gratis &mdash; sin tarjeta</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline">Self-host gratis &rarr;</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Sin comisi&oacute;n por servicios</div>
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
      <h3>El problema que destruye la reputaci&oacute;n de los talleres mec&aacute;nicos</h3>
      <p>El cliente deja su auto y desaparece en el vac&iacute;o. Sin actualizaciones, sin saber cu&aacute;ndo estar&aacute; listo, sin forma de rastrear el progreso. Llama tres veces al d&iacute;a, se frustra, no vuelve. Y t&uacute; pierdes un cliente fiel por falta de comunicaci&oacute;n, no por falta de calidad en el trabajo.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>Lo que los due&ntilde;os de talleres enfrentan cada semana</h2>
    <p>Cada problema a continuaci&oacute;n tiene una soluci&oacute;n directa en Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">El cliente llama tres veces para saber si su auto est&aacute; listo</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Notificaci&oacute;n autom&aacute;tica cuando el auto est&aacute; listo &mdash; el cliente no necesita llamar</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">&Oacute;rdenes de servicio en papel que se pierden o se confunden</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Cada veh&iacute;culo tiene su orden digital con historial completo</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Sin control de repuestos &mdash; descubres que no tienes la pieza cuando ya tienes el auto desarmado</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Alerta de stock bajo antes de que el repuesto se agote</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">No sabes cu&aacute;nto gener&oacute; cada mec&aacute;nico ni qu&eacute; servicios son m&aacute;s rentables</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Panel de ingresos por mec&aacute;nico, por servicio y por per&iacute;odo</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">El cliente no recuerda cu&aacute;ndo fue el &uacute;ltimo servicio ni qu&eacute; se le hizo al auto</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Historial completo por veh&iacute;culo y cliente &mdash; accesible en segundos</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Dos veh&iacute;culos agendados a la misma hora con el mismo mec&aacute;nico</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Verificaci&oacute;n de conflictos en base de datos &mdash; imposible hacer doble reserva</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Todo lo que un taller mec&aacute;nico necesita, nada de lo que no</h2>
    <p>Dise&ntilde;ado para el mec&aacute;nico que tambi&eacute;n administra su negocio.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F527;</div>
        <h4>&Oacute;rdenes de servicio</h4>
        <p>Cada veh&iacute;culo que entra genera una orden con datos del cliente, descripci&oacute;n del problema, repuestos y mano de obra. Estado actualizable en tiempo real.</p>
        <div class="feat-detail">El cliente recibe notificaci&oacute;n autom&aacute;tica en cada cambio de estado</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Punto de venta</h4>
        <p>Cobra servicios, repuestos y mano de obra en 3 clics. Efectivo, tarjeta, transferencia. Genera recibo detallado al instante.</p>
        <div class="feat-detail">Funciona sin internet &mdash; sin interrupciones en caja</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>CRM de clientes y veh&iacute;culos</h4>
        <p>Cada cliente tiene un perfil con todos sus veh&iacute;culos, historial de servicios, repuestos usados, gasto total y notas del mec&aacute;nico.</p>
        <div class="feat-detail">Encuentra cualquier cliente o veh&iacute;culo en menos de 1 segundo</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Inventario de repuestos</h4>
        <p>Controla aceites, filtros, frenos, buj&iacute;as y todo lo que tienes en el taller. Alertas autom&aacute;ticas antes de quedarte sin stock.</p>
        <div class="feat-detail">Alerta por Telegram, WhatsApp, Email o Viber</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>Reservas de diagn&oacute;stico en l&iacute;nea</h4>
        <p>P&aacute;gina p&uacute;blica donde los clientes agendan una cita de revisi&oacute;n directamente &mdash; sin marketplace, sin comisi&oacute;n.</p>
        <div class="feat-detail">Solo nombre y tel&eacute;fono &mdash; sin registro, sin app</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Funciona en cualquier dispositivo</h4>
        <p>Instala como PWA en la tablet de recepci&oacute;n o en tu tel&eacute;fono directamente desde el navegador. Sin hardware dedicado.</p>
        <div class="feat-detail">Funciona sin conexi&oacute;n &mdash; sin interrupciones en el taller</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>C&oacute;mo fluye un trabajo en el taller con Pronto</h2>
    <p>Desde que entra el veh&iacute;culo hasta que el cliente lo recoge &mdash; sin llamadas manuales ni papeles perdidos.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">El veh&iacute;culo entra al taller</div>
      <div class="wf-desc">Se crea la orden de servicio con los datos del cliente, el veh&iacute;culo y el problema reportado. Confirmaci&oacute;n enviada al cliente al instante.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">El trabajo avanza, el cliente lo sabe</div>
      <div class="wf-desc">Cada cambio de estado (en diagn&oacute;stico, en reparaci&oacute;n, esperando repuesto) dispara una notificaci&oacute;n autom&aacute;tica por WhatsApp, Telegram o Email.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Auto listo &mdash; cliente notificado sin llamadas</div>
      <div class="wf-desc">Cuando marcas la orden como lista, el cliente recibe un aviso inmediato. Sin llamadas, sin esperas innecesarias.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Cobro, entrega y cliente en tu CRM para siempre</div>
      <div class="wf-desc">Completa el pago en el POS. Recibo enviado autom&aacute;ticamente. Todo el historial del veh&iacute;culo guardado permanentemente.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Notificaciones autom&aacute;ticas al cliente &mdash; en todos los canales</h2>
    <p>El &uacute;nico software de c&oacute;digo abierto para talleres con Email, Telegram, WhatsApp y Viber integrados &mdash; sin plugins, sin costos adicionales.</p>
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
        <div class="ev-text">Veh&iacute;culo recibido</div>
        <div class="ev-sub">Enviada al instante cuando el veh&iacute;culo entra al taller y se crea la orden de servicio</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Actualizaci&oacute;n de estado</div>
        <div class="ev-sub">Notificaci&oacute;n autom&aacute;tica cada vez que el estado de la orden cambia &mdash; sin llamadas manuales</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F697;</div>
        <div class="ev-text">Auto listo para recoger</div>
        <div class="ev-sub">Enviada al instante cuando marcas la orden como completada &mdash; el cliente llega cuando t&uacute; dices</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Recordatorio de mantenimiento</div>
        <div class="ev-sub">&ldquo;Han pasado 6 meses desde tu &uacute;ltimo servicio&rdquo; &mdash; recupera clientes antes de que vayan a la competencia</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Felicitaci&oacute;n de cumplea&ntilde;os</div>
        <div class="ev-sub">Enviada autom&aacute;ticamente el d&iacute;a del cumplea&ntilde;os del cliente &mdash; un detalle que fideliza sin esfuerzo</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Alerta de stock bajo</div>
        <div class="ev-sub">Notifica al due&ntilde;o cuando cualquier repuesto o consumible baja del m&iacute;nimo establecido</div>
        <div class="ev-channels">Al propietario por cualquier canal</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Por qu&eacute; los talleres mec&aacute;nicos eligen Pronto</h2>
    <p>C&oacute;mo se compara Pronto con el software t&iacute;pico para talleres automotrices.</p>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Funci&oacute;n</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Software tradicional</div>
      <div class="comp-cell">SaaS de suscripci&oacute;n</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Comisi&oacute;n por servicios</div>
      <div class="comp-cell good">$0 siempre</div>
      <div class="comp-cell" style="color:#374151">Cuota mensual fija</div>
      <div class="comp-cell" style="color:#374151">$0 (cuota mensual)</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Eres due&ntilde;o de los datos</div>
      <div class="comp-cell good">&#x2713; Siempre tuyos</div>
      <div class="comp-cell bad">&#x2717; Bloqueados en el proveedor</div>
      <div class="comp-cell bad">&#x2717; Bloqueados en el proveedor</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Notificaciones al cliente incluidas</div>
      <div class="comp-cell good">&#x2713; WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      <div class="comp-cell bad">&#x2717; / Complemento de pago</div>
      <div class="comp-cell bad">&#x2717; / Complemento de pago</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Opci&oacute;n self-hosted</div>
      <div class="comp-cell good">&#x2713; Gratis, licencia MIT</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Inventario de repuestos incluido</div>
      <div class="comp-cell good">&#x2713; Con alertas autom&aacute;ticas</div>
      <div class="comp-cell" style="color:#374151">&#x2713; / M&oacute;dulo de pago</div>
      <div class="comp-cell" style="color:#374151">&#x2713; / Plan superior</div>
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
      <span class="badge">Talleres mec&aacute;nicos</span>
      <span class="badge">Talleres de chapa y pintura</span>
      <span class="badge">Talleres el&eacute;ctricos</span>
      <span class="badge">Centros de diagn&oacute;stico</span>
      <span class="badge">Talleres de llantas</span>
      <span class="badge">Servicios de cambio de aceite</span>
      <span class="badge">Autoservicios</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Dos formas de usar Pronto en tu taller</h2>
    <p>Self-hosted para control total de tus datos, o nuestra nube para estar listo en 5 minutos.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Opci&oacute;n 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Instala en tu propio servidor o computadora. Tus datos nunca salen de tu taller. Gratis para siempre. Requiere Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 para siempre</strong> &mdash; sin suscripci&oacute;n, sin l&iacute;mites de clientes ni mec&aacute;nicos</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Licencia MIT</strong> &mdash; modifica, extiende y personaliza libremente</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Cualquier servidor</strong> &mdash; VPS Linux, Windows, macOS. M&iacute;nimo 1 GB de RAM</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px">Ver en GitHub &rarr;</a>
      <a href="/docs" class="btn-outline">Documentaci&oacute;n &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Opci&oacute;n 2</div>
      <h3>Nube &mdash; trypronto.app</h3>
      <p class="path-desc">Sin servidor propio. Tu subdominio listo en 5 minutos. Nosotros gestionamos actualizaciones, backups y uptime.</p>
      <div class="trial-banner">
        <div class="trial-big">14 d&iacute;as gratis</div>
        <div>
          <div class="trial-text">Prueba cualquier plan de pago gratis durante 14 d&iacute;as.</div>
          <div class="trial-note">Sin tarjeta de cr&eacute;dito. Cancela cuando quieras.</div>
        </div>
      </div>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Tu propio subdominio</strong> &mdash; taller-garcia.trypronto.app o dominio personalizado en Pro+</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Nos encargamos de todo</strong> &mdash; actualizaciones, backups y monitoreo de uptime</div></div>
      </div>
      <a href="/register" class="btn-primary">Empezar gratis &mdash; sin tarjeta</a>
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
      <div class="plan-limit">1 mec&aacute;nico &middot; 100 clientes</div>
      <ul class="plan-feats">
        <li>POS + CRM + Inventario</li>
        <li>Notificaciones por Email</li>
        <li>Reservas en l&iacute;nea</li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/mes</span></div>
      <div class="plan-trial">14 d&iacute;as de prueba gratis</div>
      <div class="plan-limit">3 mec&aacute;nicos &middot; 1 000 clientes</div>
      <ul class="plan-feats">
        <li>Telegram y WhatsApp</li>
        <li>Reservas en l&iacute;nea ilimitadas</li>
      </ul>
    </div>
    <div class="plan featured">
      <div class="plan-popular">M&aacute;s popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$39<span>/mes</span></div>
      <div class="plan-trial">14 d&iacute;as de prueba gratis</div>
      <div class="plan-limit">15 mec&aacute;nicos &middot; ilimitado</div>
      <ul class="plan-feats">
        <li>Notificaciones por Viber</li>
        <li>Anal&iacute;ticas <span class="badge-soon">Pr&oacute;ximamente</span></li>
        <li>Dominio personalizado</li>
        <li>Programa de fidelizaci&oacute;n <span class="badge-soon">Pr&oacute;ximamente</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Agency</div>
      <div class="plan-price">$79<span>/mes</span></div>
      <div class="plan-trial">14 d&iacute;as de prueba gratis</div>
      <div class="plan-limit">Varias ubicaciones</div>
      <ul class="plan-feats">
        <li>White-label</li>
        <li>Acceso a API <span class="badge-soon">Pr&oacute;ximamente</span></li>
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
      <div class="faq-q">&iquest;Cu&aacute;l es el mejor software gratuito para talleres mec&aacute;nicos?</div>
      <div class="faq-a">Pronto es un software gratuito y de c&oacute;digo abierto para talleres mec&aacute;nicos que incluye &oacute;rdenes de servicio, POS, CRM de clientes con historial de reparaciones, inventario de repuestos y notificaciones autom&aacute;ticas por Email, Telegram, WhatsApp y Viber. La versi&oacute;n self-hosted es gratuita para siempre sin l&iacute;mites. La versi&oacute;n en la nube tiene un plan gratuito y planes de pago desde $19 al mes.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;C&oacute;mo se notifica al cliente cuando su auto est&aacute; listo?</div>
      <div class="faq-a">Pronto env&iacute;a notificaciones autom&aacute;ticas al cliente en cada etapa: confirmaci&oacute;n cuando entra el veh&iacute;culo, actualizaci&oacute;n de estado durante la reparaci&oacute;n y aviso inmediato cuando el auto est&aacute; listo para recoger. Todos los mensajes se env&iacute;an por WhatsApp, Telegram, Viber o Email seg&uacute;n la preferencia del cliente. Sin llamadas manuales ni mensajes escritos a mano.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Pronto puede gestionar el inventario de repuestos del taller?</div>
      <div class="faq-a">S&iacute;. Pronto controla el stock de cada repuesto, aceite, filtro y consumible en tu taller. Cuando cualquier art&iacute;culo baja del m&iacute;nimo que estableces, se env&iacute;a autom&aacute;ticamente una alerta al due&ntilde;o del taller por Email, Telegram, WhatsApp o Viber. Nunca te quedas sin un repuesto cr&iacute;tico en medio de un trabajo.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Pronto funciona para talleres mec&aacute;nicos, de chapa y pintura y el&eacute;ctricos?</div>
      <div class="faq-a">S&iacute;. Pronto est&aacute; dise&ntilde;ado para cualquier taller automotriz que gestiona &oacute;rdenes de trabajo, inventario de piezas y relaciones con clientes. Funciona para talleres mec&aacute;nicos generales, talleres de chapa y pintura, talleres el&eacute;ctricos, talleres de llantas, centros de diagn&oacute;stico y cualquier otro servicio automotriz.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;C&oacute;mo funcionan las &oacute;rdenes de servicio en Pronto?</div>
      <div class="faq-a">Cada veh&iacute;culo que entra al taller genera una orden de servicio con los datos del cliente, descripci&oacute;n del problema, repuestos utilizados, mano de obra y costo total. El estado de la orden (recibido, en proceso, listo, entregado) se actualiza desde el panel y el cliente recibe una notificaci&oacute;n autom&aacute;tica en cada cambio de estado.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Los clientes necesitan crear una cuenta para agendar una cita en el taller?</div>
      <div class="faq-a">No. La p&aacute;gina de reservas solo requiere nombre y n&uacute;mero de tel&eacute;fono. Sin registro, sin contrase&ntilde;a y sin aplicaci&oacute;n que descargar. El cliente agenda una cita de revisi&oacute;n o diagn&oacute;stico en menos de un minuto directamente desde el enlace que compartes en WhatsApp, Instagram o Google Maps.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;C&oacute;mo instalo Pronto en mi propio servidor?</div>
      <div class="faq-a">Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de RAM. Ejecuta <code>docker compose up -d</code> y el sistema completo de gesti&oacute;n para talleres se inicia autom&aacute;ticamente. No se requieren conocimientos de administraci&oacute;n de servidores. Consulta la <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documentaci&oacute;n en GitHub</a> para instrucciones paso a paso.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Qu&eacute; pasa con los datos de mis clientes si cancelo?</div>
      <div class="faq-a">Con la versi&oacute;n self-hosted, tus datos siempre est&aacute;n en tu propio servidor &mdash; no hay nada que cancelar ni perder. Con la versi&oacute;n en la nube, puedes exportar todos los datos de clientes, historial de reparaciones y &oacute;rdenes de servicio en cualquier momento. Tu base de clientes es tuya, no de la plataforma.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Tambi&eacute;n para</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/es/para/cafeteria" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">&#x2615; Cafeter&iacute;as</a>
    <a href="/es/para/dental" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">&#x1F9B7; Cl&iacute;nicas dentales</a>
    <a href="/es/para/gimnasio" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">&#x1F3CB;&#xFE0F; Gimnasios</a>
    <a href="/es/para" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">Ver todos &rarr;</a>
  </div>
</section>

<section class="cta-band">
  <h2>Empieza a gestionar tu taller mec&aacute;nico gratis hoy</h2>
  <p>La nube tarda 5 minutos. Self-hosted es un solo comando. De cualquier forma &mdash; sin comisiones por servicio, para siempre.</p>
  <div>
    <a href="/register" class="btn-cta-white">Empezar gratis &mdash; nube</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline">Self-host en GitHub</a>
  </div>
</section>

</main>

<footer>
  <div>
    <div class="footer-brand">Pronto<span>.</span></div>
    <div class="footer-copy">&copy; 2026 Pronto. Todos los derechos reservados.</div>
  </div>
  <div class="footer-right">
    <div class="footer-links">
      <a href="/es/">Inicio</a>
      <a href="/es/para">Para negocios</a>
      <a href="/es/para/gimnasio">Gimnasios</a>
      <a href="/es/para/clinica-dental">Cl&iacute;nicas Dentales</a>
      <a href="/terms">T&eacute;rminos</a>
      <a href="/privacy">Privacidad</a>
      <a href="/refund">Reembolsos</a>
    </div>
    <div class="footer-social">
      <a href="https://x.com/trypronto" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://linkedin.com/company/trypronto" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function AutoservicioPage() {
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
