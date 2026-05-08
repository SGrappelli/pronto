import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Gratis para Clínicas Dentales — Pronto',
  description:
    'Software gratuito para clínicas dentales con POS, reservas de citas, historial de pacientes y recordatorios automáticos por WhatsApp, Telegram y Email. Sin comisiones.',
  keywords:
    'software para clínica dental, programa para dentista gratis, sistema de citas para dentista, software gestión consultorio dental, agenda digital para dentistas, recordatorios automáticos citas dentales, software odontología sin comisión, CRM para clínica dental, software dental código abierto, programa reservas dentista',
  alternates: {
    canonical: 'https://trypronto.app/es/para/clinica-dental',
    languages: {
      en: 'https://trypronto.app/for/dental',
      es: 'https://trypronto.app/es/para/clinica-dental',
      'x-default': 'https://trypronto.app/for/dental',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/para/clinica-dental',
    title: 'Software Gratis para Clínicas Dentales — Pronto',
    description:
      'POS, reservas y CRM gratis para clínicas dentales. Los pacientes reservan sin crear cuenta. Sin comisiones. Self-hosted o en la nube.',
    images: [{ url: 'https://trypronto.app/og-dental-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Gratis para Clínicas Dentales — Pronto',
    description:
      'POS, reservas y CRM gratis para clínicas dentales. Los pacientes reservan sin crear cuenta. Sin comisiones. Self-hosted o en la nube.',
    images: ['https://trypronto.app/og-dental-es.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app',
  description:
    'Software gratuito para clínicas dentales con POS, reservas de citas, historial de pacientes y recordatorios automáticos por WhatsApp, Telegram y Email.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Reservas online sin registro de paciente',
    'CRM con historial clínico',
    'Recordatorios automáticos por WhatsApp y Telegram',
    'POS para cobros',
    'Control de inventario de materiales',
    'Self-hosted con Docker',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Pronto es gratuito para clínicas dentales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El plan gratuito incluye POS, CRM, inventario y reservas online con notificaciones por Email. No requiere tarjeta de crédito. Para WhatsApp, Telegram y Viber está disponible desde el plan Starter por $19/mes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los pacientes necesitan crear una cuenta para reservar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Los pacientes reservan cita con solo su nombre y número de teléfono. Sin registro, sin contraseña, sin app que descargar. Esto reduce la fricción y aumenta las reservas confirmadas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo instalar Pronto en mi propio servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto es open source (licencia MIT) y se instala con un solo comando: docker compose up -d. Tus datos quedan en tu servidor, sin depender de ninguna plataforma externa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funcionan los recordatorios automáticos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto envía automáticamente: confirmación de cita tras la reserva, recordatorio 24h antes, recordatorio 1h antes, y mensaje de agradecimiento 2h después de la visita. Todo por WhatsApp, Telegram, Viber o Email según la preferencia del paciente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Hay comisiones por las reservas online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Las reservas van directamente a tu clínica sin intermediarios. Pronto no cobra comisión por paciente ni por reserva. Tu base de pacientes es tuya — no pertenece a ningún marketplace.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Funciona Pronto sin conexión a internet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El módulo de caja registradora (POS) funciona en modo offline. Las transacciones se guardan localmente y se sincronizan automáticamente cuando se recupera la conexión.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo migrar mis datos de otro software dental?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto permite importar clientes desde CSV. Si necesitas migración desde otro sistema, puedes hacerlo manualmente o contratar instalación asistida a través de la página de GitHub.',
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
    { '@type': 'ListItem', position: 3, name: 'Clínicas Dentales', item: 'https://trypronto.app/es/para/clinica-dental' },
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

footer{padding:28px 48px;border-top:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;background:#fff;flex-wrap:wrap;gap:12px}
.footer-brand{font-size:22px;font-weight:800;color:#111;letter-spacing:-0.5px}
.footer-brand span{color:#16a34a}
.footer-copy{font-size:13px;color:#9ca3af}
.footer-links{display:flex;gap:28px}
.footer-links a{font-size:13px;color:#9ca3af;text-decoration:none}
.footer-links a:hover{color:#111}
.footer-social{display:flex;gap:16px;align-items:center}
.footer-social a{color:#9ca3af;display:flex;line-height:1}
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
  .footer-links{flex-wrap:wrap;gap:16px}
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
  <a href="/es/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/es/precios" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/es/para/clinica-dental'})">Precios</a>
    <a href="/for/dental" class="nav-link lang-switcher" onclick="window.gtag&&window.gtag('event','language_switch',{to:'en'})">EN</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','login_click',{label:'nav_signin'})">Iniciar sesi&oacute;n</a>
    <a href="https://app.trypronto.app/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/es/para/clinica-dental'})">Empezar gratis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/es/para">Para negocios</a><span>&rsaquo;</span>
  Cl&iacute;nicas Dentales
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      🦷 Cl&iacute;nicas Dentales
    </div>
    <h1>Software de gesti&oacute;n para cl&iacute;nicas dentales</h1>
    <p class="hero-sub">Reservas online, historial de pacientes, recordatorios autom&aacute;ticos y caja registradora &mdash; todo en una sola herramienta. Sin comisiones. Sin registros para tus pacientes.</p>
    <div class="hero-ctas">
      <a href="https://app.trypronto.app/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/es/para/clinica-dental'})">Empezar gratis</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para/clinica-dental'})">Ver en GitHub &rarr;</a>
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
  <div class="sec-head">
    <h2>&iquest;Por qu&eacute; tu cl&iacute;nica necesita Pronto?</h2>
    <p>Cada problema a continuaci&oacute;n tiene una soluci&oacute;n directa en Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Ficha de pacientes en papel o Excel</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">CRM digital con historial completo de tratamientos y notas cl&iacute;nicas</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Pacientes que no recuerdan su cita &rarr; no-shows</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Recordatorios autom&aacute;ticos 24h y 1h antes por WhatsApp, Telegram o Email</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Llamadas telef&oacute;nicas para reservar</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Reserva online 24/7 &mdash; el paciente solo pone nombre y tel&eacute;fono, sin registro</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Sin control de materiales dentales</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Inventario con alertas de stock m&iacute;nimo autom&aacute;ticas</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">La plataforma cobra comisi&oacute;n por &ldquo;tus&rdquo; pacientes</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Reserva directa, 0% de comisi&oacute;n, base de datos es tuya</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Software dental caro y dif&iacute;cil de configurar</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Instalaci&oacute;n en un comando o SaaS listo en minutos</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Todo lo que necesita tu cl&iacute;nica dental</h2>
    <p>Dise&ntilde;ado para el dentista y su equipo, no para equipos de IT.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4C5;</div>
        <h4>Reservas online sin registro</h4>
        <p>Tus pacientes reservan desde su m&oacute;vil con solo nombre y tel&eacute;fono. Sin crear cuenta, sin contrase&ntilde;as. Menos fricci&oacute;n, m&aacute;s citas confirmadas.</p>
        <div class="feat-detail">Disponible 24/7 &mdash; el paciente reserva cuando quiera</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">🦷</div>
        <h4>Historial cl&iacute;nico por paciente</h4>
        <p>Cada paciente tiene su ficha con historial de visitas, tratamientos, notas y datos de contacto. B&uacute;squeda instant&aacute;nea por nombre o tel&eacute;fono.</p>
        <div class="feat-detail">CRM con historial completo de tratamientos y notas cl&iacute;nicas</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F514;</div>
        <h4>Recordatorios autom&aacute;ticos</h4>
        <p>Confirmaci&oacute;n de cita, recordatorio 24h antes y 1h antes &mdash; enviados autom&aacute;ticamente por WhatsApp, Telegram o Email. Sin trabajo manual.</p>
        <div class="feat-detail">Reduce los no-shows sin esfuerzo del equipo</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Caja registradora (POS)</h4>
        <p>Cobra pagos en efectivo, tarjeta u otros m&eacute;todos. Genera ticket, aplica descuentos. El cobro tarda 3 clics.</p>
        <div class="feat-detail">Funciona sin conexi&oacute;n a internet &mdash; sin interrupciones en caja</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Control de inventario</h4>
        <p>Registra materiales y consumibles. Alerta autom&aacute;tica cuando el stock baja del m&iacute;nimo. Sin sorpresas de &ldquo;nos quedamos sin anestesia&rdquo;.</p>
        <div class="feat-detail">Alerta enviada por Telegram, WhatsApp, Email o Viber &mdash; t&uacute; eliges</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F512;</div>
        <h4>Sin comisiones, datos tuyos</h4>
        <p>Tus pacientes son tuyos. Sin marketplace, sin vendor lock-in. Self-hosted en tu servidor o en la nube &mdash; t&uacute; eliges d&oacute;nde viven los datos.</p>
        <div class="feat-detail">Licencia MIT &mdash; c&oacute;digo abierto para siempre</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Dos formas de usar Pronto en tu cl&iacute;nica</h2>
    <p>Self-hosted para control total, o nuestra nube para estar listo en minutos.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Self-hosted</div>
      <h3>Instala en tu servidor</h3>
      <p class="path-desc">Control total. Tus datos, tu infraestructura. Una sola l&iacute;nea en terminal y listo:</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Gratis para siempre</strong>, c&oacute;digo MIT abierto</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text">Sin l&iacute;mites de pacientes ni empleados</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text">Funciona sin conexi&oacute;n a internet (POS offline)</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para/clinica-dental'})">Ver en GitHub &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Nube</div>
      <div class="plan-popular" style="position:static;display:inline-block;margin-bottom:12px">M&aacute;s popular</div>
      <h3>&Uacute;salo en la nube</h3>
      <p class="path-desc">Sin servidores, sin instalaci&oacute;n. Tu cl&iacute;nica online en minutos.</p>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text">Subdominio propio: <strong>tu-clinica.trypronto.app</strong></div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text">Plan gratuito disponible &mdash; sin tarjeta de cr&eacute;dito</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text">Escala con tu cl&iacute;nica: Free &rarr; Starter &rarr; Pro</div></div>
      </div>
      <a href="https://app.trypronto.app/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/es/para/clinica-dental'})">Empezar gratis &rarr;</a>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Recordatorios que reducen las ausencias</h2>
    <p>Las ausencias cuestan dinero. Pronto env&iacute;a recordatorios autom&aacute;ticos por todos los canales que usan tus pacientes &mdash; sin que t&uacute; tengas que hacer nada.</p>
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
        <div class="ev-text">Confirmaci&oacute;n de cita &mdash; al instante tras la reserva</div>
        <div class="ev-sub">Enviada autom&aacute;ticamente cuando el paciente reserva en l&iacute;nea o cuando t&uacute; agregas una cita manualmente</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4C5;</div>
        <div class="ev-text">Recordatorio 24h antes &mdash; para que el paciente lo tenga en mente</div>
        <div class="ev-sub">Recordatorio autom&aacute;tico un d&iacute;a antes de la cita para reducir olvidos</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F514;</div>
        <div class="ev-text">Recordatorio 1h antes &mdash; para que salga a tiempo de casa</div>
        <div class="ev-sub">Recordatorio de &uacute;ltima hora que minimiza los no-shows el mismo d&iacute;a</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F44B;</div>
        <div class="ev-text">Mensaje de agradecimiento &mdash; 2h despu&eacute;s de la visita</div>
        <div class="ev-sub">Enviado autom&aacute;ticamente 2 horas despu&eacute;s de la cita &mdash; fideliza al paciente sin esfuerzo</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4A4;</div>
        <div class="ev-text">Reactivaci&oacute;n &mdash; &ldquo;No te hemos visto en 3 meses&rdquo;</div>
        <div class="ev-sub">Recupera pacientes inactivos autom&aacute;ticamente con un mensaje personalizado</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x26A0;&#xFE0F;</div>
        <div class="ev-text">Alerta de inventario &mdash; &ldquo;Composite A2: quedan 2 unidades&rdquo;</div>
        <div class="ev-sub">Notifica al propietario cuando cualquier material baja del m&iacute;nimo establecido</div>
        <div class="ev-channels">Al propietario de la cl&iacute;nica por cualquier canal</div>
      </div>
    </div>
  </div>
  <p style="text-align:center;margin-top:24px;font-size:14px;color:#374151">Email &middot; Telegram &middot; WhatsApp &middot; Viber &mdash; el paciente elige su canal preferido en el momento de reservar.</p>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Preguntas frecuentes sobre Pronto para cl&iacute;nicas dentales</h2>
    <div class="faq-item">
      <div class="faq-q">&iquest;Pronto es gratuito para cl&iacute;nicas dentales?</div>
      <div class="faq-a">S&iacute;. El plan gratuito incluye POS, CRM, inventario y reservas online con notificaciones por Email. No requiere tarjeta de cr&eacute;dito. Para WhatsApp, Telegram y Viber est&aacute; disponible desde el plan Starter por $19/mes.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Los pacientes necesitan crear una cuenta para reservar?</div>
      <div class="faq-a">No. Los pacientes reservan cita con solo su nombre y n&uacute;mero de tel&eacute;fono. Sin registro, sin contrase&ntilde;a, sin app que descargar. Esto reduce la fricci&oacute;n y aumenta las reservas confirmadas.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Puedo instalar Pronto en mi propio servidor?</div>
      <div class="faq-a">S&iacute;. Pronto es open source (licencia MIT) y se instala con un solo comando: <code>docker compose up -d</code>. Tus datos quedan en tu servidor, sin depender de ninguna plataforma externa.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;C&oacute;mo funcionan los recordatorios autom&aacute;ticos?</div>
      <div class="faq-a">Pronto env&iacute;a autom&aacute;ticamente: confirmaci&oacute;n de cita tras la reserva, recordatorio 24h antes, recordatorio 1h antes, y mensaje de agradecimiento 2h despu&eacute;s de la visita. Todo por WhatsApp, Telegram, Viber o Email seg&uacute;n la preferencia del paciente.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Hay comisiones por las reservas online?</div>
      <div class="faq-a">No. Las reservas van directamente a tu cl&iacute;nica sin intermediarios. Pronto no cobra comisi&oacute;n por paciente ni por reserva. Tu base de pacientes es tuya &mdash; no pertenece a ning&uacute;n marketplace.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Funciona Pronto sin conexi&oacute;n a internet?</div>
      <div class="faq-a">El m&oacute;dulo de caja registradora (POS) funciona en modo offline. Las transacciones se guardan localmente y se sincronizan autom&aacute;ticamente cuando se recupera la conexi&oacute;n.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">&iquest;Puedo migrar mis datos de otro software dental?</div>
      <div class="faq-a">S&iacute;. Pronto permite importar clientes desde CSV. Si necesitas migraci&oacute;n desde otro sistema, puedes hacerlo manualmente o contratar instalaci&oacute;n asistida a trav&eacute;s de la <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">p&aacute;gina de GitHub</a>.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Tambi&eacute;n para</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/es/para/barberia" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">✂️ Barber&iacute;as</a>
    <a href="/es/para/salones" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">💆 Salones de belleza</a>
    <a href="/es/para/autoservicio" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🔧 Talleres mec&aacute;nicos</a>
    <a href="/es/para/gimnasio" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🏋️ Gimnasios</a>
  </div>
</section>

<section class="cta-band">
  <h2>Empieza hoy &mdash; es gratis</h2>
  <p>Sin tarjeta de cr&eacute;dito. Sin instalaci&oacute;n. Tu cl&iacute;nica online en minutos.</p>
  <div>
    <a href="https://app.trypronto.app/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/es/para/clinica-dental'})">Crear cuenta gratis</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para/clinica-dental'})">Ver en GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-brand">Pronto<span>.</span></div>
  <div class="footer-copy">&copy; 2026 Pronto. Todos los derechos reservados.</div>
  <div class="footer-social">
    <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/es/para/clinica-dental'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
    <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/es/para/clinica-dental'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
    <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/es/para/clinica-dental'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
    <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/es/para/clinica-dental'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
  </div>
  <!-- FOOTER — keep in sync with all other pages -->
  <div class="footer-links">
    <a href="/es/">Inicio</a>
    <a href="/es/precios">Precios</a>
    <a href="/es/para">Para negocios</a>
    <a href="/es/para/salones">Salones</a>
    <a href="/es/para/barberia">Barber&iacute;as</a>
    <a href="/es/para/clinica-dental">Cl&iacute;nicas Dentales</a>
    <a href="/es/para/gimnasio">Gimnasios</a>
    <a href="/terms">T&eacute;rminos</a>
    <a href="/privacy">Privacidad</a>
    <a href="/refund">Reembolsos</a>
    <a href="https://github.com/SGrappelli/pronto" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/es/para/clinica-dental'})">GitHub</a>
  </div>
</footer>
`

export default function EsParaClinicaDentalPage() {
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
