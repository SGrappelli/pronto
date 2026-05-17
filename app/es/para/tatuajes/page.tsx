import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Gratis para Estudios de Tatuajes — Pronto',
  description:
    'Software gratuito para estudios de tatuajes con reservas de citas, CRM de clientes, depósitos, control de inventario y recordatorios por WhatsApp y Telegram. Sin comisiones.',
  keywords:
    'software para estudios de tatuajes gratis, gestión estudio tatuaje, reservas citas tatuaje, software tattoo studio, CRM clientes tatuaje, recordatorios WhatsApp tatuaje, sistema citas tatuador, gestión depósitos tatuaje, control inventario tinta tatuaje, alternativa Booksy tatuaje',
  alternates: {
    canonical: 'https://trypronto.app/es/para/tatuajes',
    languages: {
      en: 'https://trypronto.app/for/tattoo',
      es: 'https://trypronto.app/es/para/tatuajes',
      'pt-BR': 'https://trypronto.app/pt/para/tatuagens',
      'x-default': 'https://trypronto.app/for/tattoo',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/para/tatuajes',
    title: 'Software Gratis para Estudios de Tatuajes — Pronto',
    description:
      'Gestiona tu estudio de tatuajes sin comisiones. Reservas de citas, depósitos, CRM de clientes, control de inventario y recordatorios automáticos por WhatsApp, Telegram y Email. Un solo comando para instalar.',
    images: [{ url: 'https://trypronto.app/og-image-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Gratis para Estudios de Tatuajes — Pronto',
    description:
      'Reservas de citas, depósitos y recordatorios automáticos para tu estudio de tatuajes. Sin comisiones, sin vendor lock-in. Instala con Docker en un solo comando.',
    images: ['https://trypronto.app/og-image-es.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/es/para/tatuajes',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Tattoo Studio Management Software',
  operatingSystem: 'Web, Android, iOS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Reservas de citas sin registro de cliente',
    'Gestión de depósitos vinculados a cada cita',
    'CRM de clientes con historial de sesiones y notas del artista',
    'Caja registradora (POS) con múltiples métodos de pago',
    'Recordatorios automáticos por WhatsApp y Telegram',
    'Instrucciones de cuidados post-tatuaje automáticas',
    'Control de inventario de tinta y suministros',
    'Progressive Web App con modo offline',
    'Instalación con Docker en un solo comando',
    'Código abierto bajo licencia MIT',
  ],
  description:
    'Software gratuito de gestión para estudios de tatuajes. Reservas de citas, depósitos, CRM de clientes, control de inventario y recordatorios automáticos por WhatsApp, Telegram y Email. Sin comisiones.',
  keywords:
    'software estudio tatuaje, gestión tatuadores, reservas citas tatuaje, depósitos tatuaje, Booksy alternativa, Fresha alternativa, software tattoo gratis',
  inLanguage: 'es',
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  codeRepository: 'https://github.com/SGrappelli/pronto',
  author: {
    '@type': 'Organization',
    name: 'Pronto',
    url: 'https://trypronto.app',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es el mejor software gratuito para estudios de tatuajes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto ofrece un plan gratuito completo para estudios de tatuajes con POS, CRM de clientes, reservas de citas, control de inventario y notificaciones por Email — sin límite de tiempo y sin tarjeta de crédito. El plan gratuito incluye 1 artista y hasta 100 clientes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo gestionar los depósitos de las citas con Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto permite registrar el depósito de cada cita en la caja registradora y vincularlo al cliente. Al finalizar la sesión, el depósito se descuenta del total automáticamente. No necesitas hojas de cálculo ni transferencias sin control.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto cobra comisión por las reservas de mi estudio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Pronto no cobra ninguna comisión sobre las reservas ni sobre los pagos. Tus clientes reservan directamente contigo y tú recibes el 100% de cada transacción. No hay plataforma intermediaria.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Funciona con WhatsApp para enviar recordatorios de citas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto envía recordatorios automáticos por WhatsApp, Telegram, Viber y Email. Los mensajes incluyen: confirmación de cita, recordatorio 24 horas antes, recordatorio 1 hora antes de la sesión, instrucciones de cuidados post-tatuaje y recordatorio de reactivación para clientes inactivos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo controlar el inventario de tinta, agujas y materiales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El módulo de inventario permite registrar tinta, agujas, plásticos y cualquier suministro con cantidades mínimas configurables. Cuando el stock de un material llega al mínimo, Pronto envía una alerta automática para que puedas reponer a tiempo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Tiene aplicación móvil para gestionar el estudio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto es una Progressive Web App (PWA) que se instala en la pantalla de inicio de cualquier móvil sin necesidad de App Store ni Google Play. Funciona en Android e iOS y permite gestionar citas y cobros incluso sin conexión a internet.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo instalo Pronto en mi propio servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de RAM. Ejecuta docker compose up -d y el sistema de gestión del estudio arranca automáticamente. No se requieren conocimientos de DevOps. Consulta la documentación en GitHub para instrucciones paso a paso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuántos artistas o empleados puedo añadir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El plan gratuito incluye 1 artista. El plan Starter permite 3 artistas, el plan Pro hasta 15 y el plan Agency admite múltiples ubicaciones con artistas ilimitados. Cada artista tiene su propio acceso y puede gestionar su agenda de citas de forma independiente.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://trypronto.app/es/' },
    { '@type': 'ListItem', position: 2, name: 'Para negocios', item: 'https://trypronto.app/es/para' },
    { '@type': 'ListItem', position: 3, name: 'Estudios de tatuajes', item: 'https://trypronto.app/es/para/tatuajes' },
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
.badge{font-size:13px;border-radius:6px;padding:5px 12px;font-weight:500;background:#f0fdf4;color:#166634;border:1px solid #bbf7d0}

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
  .footer-links{flex-wrap:wrap;gap:12px;justify-content:flex-start}
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
    <a href="/es/precios" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/es/para/tatuajes'})">Precios</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/tattoo',es:'/es/para/tatuajes',pt:'/pt/para/tatuagens'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es" selected>ES</option><option value="pt">PT</option></select>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'es'})">Iniciar sesi&oacute;n</a>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/tatuajes'})">Empezar gratis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/es/">Inicio</a><span>&rsaquo;</span>
  <a href="/es/para">Para negocios</a><span>&rsaquo;</span>
  Estudios de tatuajes
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Software de gesti&oacute;n para estudios de tatuajes
    </div>
    <h1>Gestiona tu estudio de tatuajes gratis. Sin comisiones.</h1>
    <p class="hero-sub">Pronto reemplaza las hojas de c&aacute;lculo y las apps dispersas. Reservas de citas, gesti&oacute;n de dep&oacute;sitos, CRM de clientes, control de tinta y materiales, y recordatorios autom&aacute;ticos por WhatsApp, Telegram y Email &mdash; todo en una sola herramienta que tus clientes encuentran sin registrarse en ninguna plataforma.</p>
    <p class="hero-platforms">Las plataformas de reservas cobran una <strong>comisi&oacute;n por cada cita</strong> de clientes que ya son tuyos. Pronto cobra <strong>$0</strong>.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/tatuajes'})">Empieza gratis</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'hero_cta',page:'/es/para/tatuajes'})">Ver en GitHub &rarr;</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Comisi&oacute;n por reservas</div>
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
      <h3>La trampa del software para estudios de tatuajes que nadie menciona</h3>
      <p>Llevas a&ntilde;os construyendo una clientela fiel. Entonces una plataforma de reservas exige una <strong>comisi&oacute;n por cada cita</strong> &mdash; de clientes que ya son tuyos. Y si cancelas tu cuenta, desaparece el historial de sesiones, los contactos y los dise&ntilde;os de referencia de tus clientes.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>Los problemas que Pronto resuelve</h2>
    <p>Cada problema a continuaci&oacute;n tiene una soluci&oacute;n directa en Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">Problema</div>
        <div class="pain-from-text">Agenda en papel o DMs de Instagram</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Calendario digital con gesti&oacute;n de citas y artistas</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Problema</div>
        <div class="pain-from-text">Gestionar dep&oacute;sitos por transferencia</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">POS con registro de dep&oacute;sito vinculado a cada cita</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Problema</div>
        <div class="pain-from-text">La plataforma cobra comisi&oacute;n por tus clientes</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Reservas directas sin comisi&oacute;n &mdash; 0%</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Problema</div>
        <div class="pain-from-text">Sin historial de trabajos del cliente</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Ficha completa con dise&ntilde;os, referencias y notas</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Problema</div>
        <div class="pain-from-text">Recordar citas manualmente por WhatsApp</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Recordatorios autom&aacute;ticos 24&nbsp;h y 1&nbsp;h antes</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Problema</div>
        <div class="pain-from-text">Control de tinta y materiales en papel</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Alertas autom&aacute;ticas de stock m&iacute;nimo de suministros</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Todo lo que necesita tu estudio de tatuajes</h2>
    <p>Dise&ntilde;ado para el artista que gestiona su propio negocio, no para equipos de IT.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4C5;</div>
        <h4>Reservas de citas</h4>
        <p>Los clientes reservan cita directamente desde tu p&aacute;gina p&uacute;blica &mdash; sin crear cuenta en ninguna plataforma. Solo nombre y tel&eacute;fono. T&uacute; controlas tu agenda sin depender de terceros.</p>
        <div class="feat-detail">Protecci&oacute;n contra doble reserva a nivel de base de datos</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Gesti&oacute;n de dep&oacute;sitos</h4>
        <p>Registra el dep&oacute;sito de cada cita en el POS y vinc&uacute;lalo al cliente. Al finalizar el trabajo, descuenta el dep&oacute;sito del total autom&aacute;ticamente. Sin hojas de c&aacute;lculo ni transferencias sin control.</p>
        <div class="feat-detail">Dep&oacute;sito vinculado a la cita y descontado autom&aacute;ticamente al cobrar</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>CRM de clientes</h4>
        <p>Ficha completa de cada cliente: historial de sesiones, referencias de dise&ntilde;o, notas del artista y datos de contacto. Busca cualquier cliente en menos de un segundo.</p>
        <div class="feat-detail">Busca en toda tu base de clientes en menos de 1 segundo</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F514;</div>
        <h4>Recordatorios autom&aacute;ticos</h4>
        <p>WhatsApp, Telegram, Viber y Email. Confirmaci&oacute;n de cita, recordatorio 24&nbsp;h antes, recordatorio 1&nbsp;h antes, mensaje de cuidados post-tatuaje y reactivaci&oacute;n de clientes inactivos.</p>
        <div class="feat-detail">Telegram, WhatsApp, Viber y Email &mdash; todos incluidos</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Control de inventario</h4>
        <p>Gestiona el stock de tinta, agujas, pl&aacute;sticos y dem&aacute;s suministros con cantidades m&iacute;nimas configurables. Recibe alertas autom&aacute;ticas cuando un material llega al m&iacute;nimo.</p>
        <div class="feat-detail">Alerta enviada por Telegram, WhatsApp, Email o Viber</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F513;</div>
        <h4>Sin vendor lock-in</h4>
        <p>Tus datos en tu servidor. Sin cuotas de plataforma, sin comisiones sobre reservas. Instala con Docker en un solo comando.</p>
        <div class="feat-detail">Licencia MIT &mdash; modifica y adapta libremente</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>C&oacute;mo funciona tu estudio con Pronto</h2>
    <p>Desde un nuevo cliente hasta una sesi&oacute;n recurrente &mdash; completamente automatizado.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">El cliente encuentra tu p&aacute;gina de reservas</div>
      <div class="wf-desc">Enlazada desde Instagram, Google o donde quieras. Solo nombre y tel&eacute;fono &mdash; sin app ni cuenta.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Cita confirmada con dep&oacute;sito</div>
      <div class="wf-desc">Confirmaci&oacute;n instant&aacute;nea por WhatsApp, Telegram, Email o Viber. Dep&oacute;sito registrado en el POS.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Recordatorios sin intervenci&oacute;n</div>
      <div class="wf-desc">24 horas y 1 hora antes de la sesi&oacute;n. Cero mensajes manuales. Menos no-presentaciones.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Cobro y cuidados post-tatuaje</div>
      <div class="wf-desc">Descuenta el dep&oacute;sito en el POS. Instrucciones de cuidados enviadas autom&aacute;ticamente 2 horas despu&eacute;s.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Mensajes autom&aacute;ticos que reducen los no-shows</h2>
    <p>El &uacute;nico software open-source para estudios de tatuajes con Email, Telegram, WhatsApp y Viber integrados &mdash; sin plugins ni cargos adicionales.</p>
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
        <div class="ev-text">Confirmaci&oacute;n de cita</div>
        <div class="ev-sub">Enviada autom&aacute;ticamente al reservar una sesi&oacute;n de tatuaje</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Recordatorio 24 horas</div>
        <div class="ev-sub">&ldquo;Te esperamos ma&ntilde;ana para tu sesi&oacute;n de las 15:00&rdquo;</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F3;</div>
        <div class="ev-text">Recordatorio 1 hora antes</div>
        <div class="ev-sub">Para eliminar las ausencias de &uacute;ltimo momento</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Cuidados post-tatuaje</div>
        <div class="ev-sub">Instrucciones autom&aacute;ticas enviadas 2 horas despu&eacute;s de la sesi&oacute;n</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Reactivaci&oacute;n</div>
        <div class="ev-sub">&ldquo;Llevas 60 d&iacute;as sin visitarnos, &iquest;tienes alg&uacute;n nuevo dise&ntilde;o en mente?&rdquo;</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Alerta de stock m&iacute;nimo</div>
        <div class="ev-sub">Aviso interno cuando la tinta u otros suministros se agotan</div>
        <div class="ev-channels">Al propietario por cualquier canal</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Por qu&eacute; los estudios de tatuajes eligen Pronto</h2>
    <p>Comparativa con las plataformas de reservas para tatuadores m&aacute;s conocidas.</p>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Caracter&iacute;stica</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Booksy</div>
      <div class="comp-cell">Fresha</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Comisi&oacute;n por reservas</div>
      <div class="comp-cell good">$0 siempre</div>
      <div class="comp-cell bad">Cuota mensual</div>
      <div class="comp-cell bad">Comisi&oacute;n por pago online</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Los datos son tuyos</div>
      <div class="comp-cell good">&#x2713; Siempre tuyos</div>
      <div class="comp-cell bad">&#x2717; En su plataforma</div>
      <div class="comp-cell bad">&#x2717; Bloqueados</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Gesti&oacute;n de dep&oacute;sitos</div>
      <div class="comp-cell good">&#x2713; POS integrado</div>
      <div class="comp-cell bad">&#x2717; / Add-on</div>
      <div class="comp-cell bad">&#x2717; / Add-on</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Opci&oacute;n self-hosted</div>
      <div class="comp-cell good">&#x2713; Gratis, lic. MIT</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">WhatsApp + Telegram</div>
      <div class="comp-cell good">&#x2713; Incluidos</div>
      <div class="comp-cell bad">&#x2717; / Add-on de pago</div>
      <div class="comp-cell bad">&#x2717; / Add-on de pago</div>
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
      <span class="badge">Estudios de tatuajes</span>
      <span class="badge">Estudios de piercing</span>
      <span class="badge">Estudios de micropigmentaci&oacute;n</span>
      <span class="badge">Estudios de l&aacute;ser</span>
      <span class="badge">Estudios de pesta&ntilde;as</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Dos formas de usar Pronto en tu estudio</h2>
    <p>Instala en tu servidor para control total, o usa nuestra nube y empieza en minutos.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Opci&oacute;n 1 &middot; Control total &middot; MIT License</div>
      <h3>En tu propio servidor</h3>
      <p class="path-desc">Descarga el c&oacute;digo, ejecuta docker compose up -d y Pronto arranca en tu servidor. Tus datos nunca salen de tu infraestructura.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 para siempre</strong> &mdash; sin suscripci&oacute;n, sin l&iacute;mites de clientes ni artistas</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Licencia MIT</strong> &mdash; modifica, ampl&iacute;a y white-label libremente</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Cualquier servidor</strong> &mdash; VPS Linux, Windows, macOS. 1&nbsp;GB RAM m&iacute;nimo</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para/tatuajes'})">Ver en GitHub &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Opci&oacute;n 2 &middot; Sin instalaci&oacute;n &middot; Desde $0/mes</div>
      <h3>En la nube (trypronto.app)</h3>
      <p class="path-desc">Crea tu cuenta y empieza en minutos. Tu estudio obtiene su propio subdominio: miestudio.trypronto.app. Plan gratuito permanente. Sin tarjeta de cr&eacute;dito.</p>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Tu subdominio</strong> &mdash; miestudio.trypronto.app o dominio propio en Pro+</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Nos encargamos de todo</strong> &mdash; actualizaciones, backups y monitoreo de uptime</div></div>
      </div>
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/tatuajes'})">Empieza gratis</a>
    </div>
  </div>

  <div style="height:48px"></div>
  <div style="text-align:center;margin-bottom:22px">
    <p style="font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#0a0a0a">Planes para estudios de tatuajes de todos los tama&ntilde;os</p>
  </div>
  <div class="plans">
    <div class="plan">
      <div class="plan-name">Free</div>
      <div class="plan-price">$0<span>/mes</span></div>
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
        <li>Todo lo incluido en Free</li>
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
  <p class="pricing-note">Sin tarjeta de cr&eacute;dito para el plan gratuito. <a href="/es/precios">Ver precios completos &rarr;</a></p>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Preguntas frecuentes</h2>
    <div class="faq-item">
      <div class="faq-q">&iquest;Cu&aacute;l es el mejor software gratuito para estudios de tatuajes?</div>
      <div class="faq-a">Pronto ofrece un plan gratuito completo para estudios de tatuajes con POS, CRM de clientes, reservas de citas, control de inventario y notificaciones por Email &mdash; sin l&iacute;mite de tiempo y sin tarjeta de cr&eacute;dito. El plan gratuito incluye 1 artista y hasta 100 clientes.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Puedo gestionar los dep&oacute;sitos de las citas con Pronto?</div>
      <div class="faq-a">S&iacute;. Pronto permite registrar el dep&oacute;sito de cada cita en la caja registradora y vincularlo al cliente. Al finalizar la sesi&oacute;n, el dep&oacute;sito se descuenta del total autom&aacute;ticamente. No necesitas hojas de c&aacute;lculo ni transferencias sin control.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Pronto cobra comisi&oacute;n por las reservas de mi estudio?</div>
      <div class="faq-a">No. Pronto no cobra ninguna comisi&oacute;n sobre las reservas ni sobre los pagos. Tus clientes reservan directamente contigo y t&uacute; recibes el 100% de cada transacci&oacute;n. No hay plataforma intermediaria.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Funciona con WhatsApp para enviar recordatorios de citas?</div>
      <div class="faq-a">S&iacute;. Pronto env&iacute;a recordatorios autom&aacute;ticos por WhatsApp, Telegram, Viber y Email. Los mensajes incluyen: confirmaci&oacute;n de cita, recordatorio 24 horas antes, recordatorio 1 hora antes de la sesi&oacute;n, instrucciones de cuidados post-tatuaje y recordatorio de reactivaci&oacute;n para clientes inactivos.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Puedo controlar el inventario de tinta, agujas y materiales?</div>
      <div class="faq-a">S&iacute;. El m&oacute;dulo de inventario permite registrar tinta, agujas, pl&aacute;sticos y cualquier suministro con cantidades m&iacute;nimas configurables. Cuando el stock de un material llega al m&iacute;nimo, Pronto env&iacute;a una alerta autom&aacute;tica para que puedas reponer a tiempo.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Tiene aplicaci&oacute;n m&oacute;vil para gestionar el estudio?</div>
      <div class="faq-a">Pronto es una Progressive Web App (PWA) que se instala en la pantalla de inicio de cualquier m&oacute;vil sin necesidad de App Store ni Google Play. Funciona en Android e iOS y permite gestionar citas y cobros incluso sin conexi&oacute;n a internet.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;C&oacute;mo instalo Pronto en mi propio servidor?</div>
      <div class="faq-a">Necesitas Docker en cualquier servidor Linux, Windows o macOS con al menos 1 GB de RAM. Ejecuta <code>docker compose up -d</code> y el sistema de gesti&oacute;n del estudio arranca autom&aacute;ticamente. No se requieren conocimientos de DevOps. Consulta la <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documentaci&oacute;n en GitHub</a> para instrucciones paso a paso.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Cu&aacute;ntos artistas o empleados puedo a&ntilde;adir?</div>
      <div class="faq-a">El plan gratuito incluye 1 artista. El plan Starter permite 3 artistas, el plan Pro hasta 15 y el plan Agency admite m&uacute;ltiples ubicaciones con artistas ilimitados. Cada artista tiene su propio acceso y puede gestionar su agenda de citas de forma independiente.</div>
    </div>
  </div>
</section>

<section class="cta-band">
  <h2>Empieza a gestionar tu estudio de tatuajes gratis</h2>
  <p>Sin tarjeta de cr&eacute;dito. Sin comisiones. Tus datos, tu servidor.</p>
  <div>
    <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/para/tatuajes'})">Crear cuenta gratis</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_band',page:'/es/para/tatuajes'})">Ver en GitHub</a>
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
      <a href="/es/para/salones">Salones de belleza</a>
      <a href="/es/para/barberia">Barber&iacute;as</a>
      <a href="/es/para/gimnasio">Gimnasios</a>
      <a href="/es/para/spa">Masajes y spa</a>
      <a href="/es/para/cafeteria">Cafeter&iacute;as</a>
      <a href="/terms">T&eacute;rminos</a>
      <a href="/privacy">Privacidad</a>
      <a href="/refund">Reembolsos</a>
    </div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/es/para/tatuajes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/es/para/tatuajes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/es/para/tatuajes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_social',page:'/es/para/tatuajes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function TatuajesPage() {
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
