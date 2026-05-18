import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Square Appointments — Global y Self-Hosted',
  description:
    'Pronto vs Square Appointments: disponible globalmente vs solo 5 países, WhatsApp nativo, self-hosted, sin dependencia del ecosistema Square.',
  alternates: {
    canonical: 'https://trypronto.app/es/vs/square',
    languages: {
      en: 'https://trypronto.app/vs/square',
      es: 'https://trypronto.app/es/vs/square',
      'pt-BR': 'https://trypronto.app/pt/vs/square',
      'x-default': 'https://trypronto.app/vs/square',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/vs/square',
    title: 'Pronto vs Square Appointments — Global y Self-Hosted',
    description:
      'Disponible globalmente vs solo 5 países. WhatsApp nativo vs solo SMS. Self-hosted vs solo en la nube. Sin dependencia del ecosistema Square.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Square Appointments — Global y Self-Hosted',
    description:
      'Disponible globalmente vs solo 5 países. WhatsApp nativo vs solo SMS. Self-hosted vs solo en la nube. Sin dependencia del ecosistema Square.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Es Pronto una alternativa gratuita a Square Appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Tanto Pronto como Square Appointments ofrecen planes gratuitos. Square Appointments Free está limitado a una ubicación y requiere usar el procesamiento de pagos de Square al 2,6% + $0,15 por transacción. El plan gratuito de Pronto incluye POS, CRM, reservas y notificaciones por email sin requisito de procesador de pagos. Pronto también ofrece una versión self-hosted gratuita sin límites de clientes ni personal.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta Square Appointments por mes en 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Square Appointments tiene tres planes en 2026: Free ($0), Plus ($29/mes por ubicación) y Premium ($69/mes por ubicación). Un negocio con 3 ubicaciones en el plan Plus paga $87/mes en suscripción antes del procesamiento de pagos. Las tarifas de procesamiento del 2,5%-2,6% más $0,15 por transacción aplican en todos los planes. No hay descuento por facturación anual.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Square Appointments cobra comisión por reservas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Square Appointments no cobra comisión por reservas. Sin embargo, las tarifas de procesamiento del 2,5%-2,6% más $0,15 por transacción aplican cuando aceptas pagos con tarjeta a través de Square. No puedes usar un procesador de pagos diferente con Square Appointments — los pagos de Square son obligatorios. Pronto cobra cero comisión y funciona con cualquier terminal de pago.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Está disponible Square Appointments fuera de EE. UU.?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Square Appointments está disponible en EE. UU., Canadá, Australia, Reino Unido y Japón. No está disponible en Brasil, la mayor parte de Latinoamérica, Europa del Este, la mayor parte de Asia, África ni Oriente Medio. Pronto está disponible globalmente — tanto la versión self-hosted como el SaaS en trypronto.app funcionan en cualquier país.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Tiene Pronto notificaciones por WhatsApp como Square Appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Square Appointments envía recordatorios automáticos por email y SMS. WhatsApp y Telegram no están disponibles. Pronto incluye notificaciones nativas por WhatsApp, Telegram, Viber y Email sin costo adicional en todos los planes — confirmación, recordatorio 24h antes, recordatorio 1h antes, mensaje post-visita y reactivación de clientes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Existe una alternativa self-hosted a Square Appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto es la única alternativa open-source y self-hosted a Square Appointments. Instala con un solo comando: docker compose up -d. Tus datos permanecen en tu propio servidor — sin dependencia de la nube, sin vendor lock-in, sin procesador de pagos obligatorio. Pronto tiene licencia MIT.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde tiene ventaja Square Appointments sobre Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Square Appointments está profundamente integrado con el ecosistema Square — Square POS, Square Payroll, Square Marketing y el hardware de Square funcionan juntos de forma perfecta. Para negocios que ya usan Square para pagos, esto es una ventaja real. Square también soporta Apple Pay y Google Pay de forma nativa y ofrece lectores de tarjetas físicos. Pronto no procesa pagos con tarjeta directamente y no se integra con el ecosistema de Square.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo cambiar de Square Appointments a Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Exporta tu lista de clientes de Square Appointments e impórtala en el CRM de Pronto. Como Square Appointments no tiene contratos a largo plazo, puedes cambiar al final de cualquier período de facturación mensual. El SaaS de Pronto en trypronto.app tarda minutos en configurarse, o instálalo en tu propio servidor con un solo comando.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/es/vs/square',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Alternativa open-source y self-hosted a Square Appointments. Disponible globalmente, notificaciones nativas por WhatsApp y Telegram, sin dependencia de procesador de pagos, POS offline.',
  alternateName: [
    'alternativa gratuita a Square Appointments',
    'alternativa open source a Square Appointments',
    'alternativa self-hosted a Square Appointments',
    'alternativa a Square Appointments con WhatsApp',
    'alternativa a Square Appointments fuera de EE. UU.',
    'alternativa a Square Appointments global',
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

.breadcrumb{padding:12px 48px;background:#fafafa;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af}
.breadcrumb a{color:#9ca3af;text-decoration:none}
.breadcrumb a:hover{color:#111}
.breadcrumb span{margin:0 6px}

.hero{padding:64px 48px 56px;text-align:center;border-bottom:1px solid #f0f0f0}
.hero h1{font-size:48px;font-weight:800;line-height:1.08;letter-spacing:-1.5px;color:#0a0a0a;margin-bottom:18px}
.hero p{font-size:17px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 32px}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:28px}
.btn-primary{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline{background:transparent;color:#111;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 22px;border-radius:8px;border:1px solid #d1d5db;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline:hover{border-color:#111}
.hero-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.hero-pill{font-size:13px;font-weight:600;padding:7px 16px;border-radius:20px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}

.verdict{padding:40px 48px;border-bottom:1px solid #f0f0f0}
.verdict-inner{max-width:840px;margin:0 auto;border:2px solid #16a34a;border-radius:16px;padding:32px 36px}
.verdict h2{font-size:20px;font-weight:800;color:#0a0a0a;margin-bottom:24px;text-align:center}
.verdict-cols{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.verdict-col h3{font-size:15px;font-weight:700;color:#0a0a0a;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid #e2e8f0}
.verdict-item{font-size:14px;color:#374151;line-height:1.6;margin-bottom:8px}
.verdict-item.yes{color:#166534}
.verdict-item.no{color:#374151}

.comp-section{padding:60px 48px;border-bottom:1px solid #f0f0f0}
.comp-inner{max-width:960px;margin:0 auto}
.comp-section h2{font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:32px;text-align:center}
.table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{width:100%;min-width:600px;border-collapse:collapse;font-size:14px}
thead th{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:15px;padding:14px 16px;text-align:left;border-bottom:2px solid #e2e8f0}
thead th:first-child{color:#6b7280}
thead th:nth-child(2){color:#16a34a}
thead th:nth-child(3){color:#374151}
tbody tr{border-bottom:1px solid #f0f0f0}
tbody tr:hover{background:#fafafa}
tbody td{padding:13px 16px;color:#374151;vertical-align:middle}
tbody td:first-child{font-weight:500;color:#111}
tbody td.green{color:#166534;font-weight:600}
tbody td.red{color:#dc2626}
.table-note{font-size:12px;color:#9ca3af;margin-top:14px;text-align:right}
.table-hint{display:none;font-size:12px;color:#9ca3af;text-align:center;margin-top:10px}

.pain-section{background:#fff8f0;border-top:1px solid #fed7aa;border-bottom:1px solid #fed7aa;padding:60px 48px}
.pain-inner{max-width:960px;margin:0 auto}
.pain-section h2{font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:32px;text-align:center}
.pain-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.pain-card{background:#fff;border:1px solid #fed7aa;border-radius:16px;padding:28px 24px}
.pain-icon{font-size:28px;margin-bottom:12px;display:block}
.pain-card h3{font-family:'Bricolage Grotesque',sans-serif;font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:8px}
.pain-card p{font-size:14px;color:#6b7280;line-height:1.65}

.wins-section{background:#f8fafc;border-bottom:1px solid #f0f0f0;padding:60px 48px}
.wins-inner{max-width:960px;margin:0 auto}
.wins-section h2{font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:8px;text-align:center}
.wins-note{font-size:14px;color:#6b7280;text-align:center;margin-bottom:32px}
.wins-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.wins-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px 24px}
.wins-card h3{font-family:'Bricolage Grotesque',sans-serif;font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:10px}
.wins-card p{font-size:14px;color:#6b7280;line-height:1.65}

.pricing-section{padding:60px 48px;border-bottom:1px solid #f0f0f0}
.pricing-inner{max-width:840px;margin:0 auto}
.pricing-section h2{font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:32px;text-align:center}
.pricing-cols{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px}
.pricing-card{border-radius:16px;padding:28px 24px}
.pricing-card.pronto{border:2px solid #16a34a;background:#f0fdf4}
.pricing-card.square{border:1px solid #e2e8f0;background:#fff}
.pricing-label{font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#9ca3af;margin-bottom:8px}
.pricing-label.green{color:#16a34a}
.pricing-highlight{font-family:'Bricolage Grotesque',sans-serif;font-size:26px;font-weight:800;color:#0a0a0a;margin-bottom:18px}
.pricing-list{list-style:none;margin-bottom:20px}
.pricing-list li{font-size:14px;color:#374151;line-height:1.6;padding:4px 0}
.pricing-note-small{font-size:11px;color:#9ca3af;margin-top:8px}
.example-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px 28px}
.example-box h3{font-family:'Bricolage Grotesque',sans-serif;font-size:16px;font-weight:700;color:#0a0a0a;margin-bottom:10px}
.example-box p{font-size:14px;color:#374151;line-height:1.7}

.faq-section{padding:60px 48px;border-bottom:1px solid #f0f0f0}
.faq-inner{max-width:720px;margin:0 auto}
.faq-section h2{font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:36px;text-align:center}
.faq-item{border-bottom:1px solid #f0f0f0;padding:20px 0}
.faq-q{font-size:16px;font-weight:700;color:#0a0a0a;margin-bottom:10px}
.faq-a{font-size:15px;color:#374151;line-height:1.7}

.cta{padding:64px 48px;text-align:center;background:#f0fdf4;border-top:1px solid #bbf7d0}
.cta h2{font-size:34px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:12px}
.cta p{font-size:16px;color:#374151;margin-bottom:28px}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

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

@media(max-width:1024px){
  nav{padding:0 24px}
  .breadcrumb{padding:12px 24px}
  .hero,.verdict,.comp-section,.pain-section,.wins-section,.pricing-section,.faq-section,.cta{padding-left:24px;padding-right:24px}
  .hero h1{font-size:38px}
}
@media(max-width:900px){footer{padding:32px 24px}.footer-top{grid-template-columns:1fr 1fr;gap:24px}.hide-tablet{display:none}}
@media(max-width:640px){
  nav{padding:0 16px;height:56px}
  .nav-right{gap:8px}
  .nav-link{font-size:14px}
  .btn-nav{font-size:13px;padding:8px 14px}
  .hide-mob{display:none}
  .hero{padding:40px 16px 36px}
  .hero h1{font-size:28px;letter-spacing:-0.8px}
  .hero p{font-size:15px}
  .verdict{padding:28px 16px}
  .verdict-inner{padding:24px 20px}
  .verdict-cols{grid-template-columns:1fr}
  .comp-section,.pain-section,.wins-section,.pricing-section,.faq-section,.cta{padding:40px 16px}
  .pain-grid{grid-template-columns:1fr}
  .wins-grid{grid-template-columns:1fr}
  .pricing-cols{grid-template-columns:1fr}
  .table-hint{display:block}
  footer{padding:32px 16px}.footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}
}
`

const pageContent = `
<nav>
  <a href="/es/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/es/precios" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/es/vs/square'})">Precios</a>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'es'})">Iniciar sesi&oacute;n</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={en:'/vs/square',pt:'/pt/vs/square'};if(m[this.value])location.href=m[this.value]"><option value="en">EN</option><option value="es" selected>ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'es'})">Empezar gratis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/es/">Inicio</a><span>&rsaquo;</span>
  <a href="/es/vs/">Comparativas</a><span>&rsaquo;</span>
  Pronto vs Square Appointments
</div>

<main>

<section class="hero">
  <h1>Pronto vs Square Appointments &mdash; global, sin dependencia del ecosistema</h1>
  <p>Square Appointments te ata al procesamiento de pagos de Square, cobra por ubicaci&oacute;n y solo est&aacute; disponible en 5 pa&iacute;ses. Pronto funciona globalmente, corre en tu propio servidor, incluye notificaciones por WhatsApp &mdash; y funciona con cualquier terminal de pago que ya tengas.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'es'})">Empezar gratis &mdash; sin tarjeta &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; Disponible globalmente</span>
    <span class="hero-pill">&#10003; Sin dependencia de pago</span>
    <span class="hero-pill">&#10003; Opci&oacute;n self-hosted</span>
  </div>
</section>

<section class="verdict">
  <div class="verdict-inner">
    <h2>Resumen &mdash; &iquest;cu&aacute;l elegir?</h2>
    <div class="verdict-cols">
      <div class="verdict-col">
        <h3>Elige Pronto si&hellip;</h3>
        <div class="verdict-item yes">&#10003; Est&aacute;s fuera de EE. UU., Canad&aacute;, Australia, Reino Unido o Jap&oacute;n</div>
        <div class="verdict-item yes">&#10003; Quieres conservar tu terminal de pago actual</div>
        <div class="verdict-item yes">&#10003; Quieres notificaciones por WhatsApp y Telegram incluidas</div>
        <div class="verdict-item yes">&#10003; Quieres tus datos en tu propio servidor</div>
        <div class="verdict-item yes">&#10003; No quieres precios por ubicaci&oacute;n al expandirte</div>
      </div>
      <div class="verdict-col">
        <h3>Elige Square Appointments si&hellip;</h3>
        <div class="verdict-item no">&rarr; Ya usas Square para pagos y quieres un solo ecosistema</div>
        <div class="verdict-item no">&rarr; Quieres Apple Pay y Google Pay integrados desde el primer d&iacute;a</div>
        <div class="verdict-item no">&rarr; Necesitas hardware de Square (lectores de tarjetas, terminales)</div>
        <div class="verdict-item no">&rarr; Eres un profesional solo en EE. UU./Canad&aacute; en el plan gratuito</div>
      </div>
    </div>
  </div>
</section>

<section class="comp-section">
  <div class="comp-inner">
    <h2>Comparativa funci&oacute;n por funci&oacute;n</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Funci&oacute;n</th>
            <th>Pronto</th>
            <th>Square Appointments</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Plan gratuito</td><td class="green">&#10003; $0</td><td class="green">&#10003; $0 (1 ubicaci&oacute;n, limitado)</td></tr>
          <tr><td>Precio base plan de pago</td><td class="green">$19/mes</td><td class="red">$29/mes por ubicaci&oacute;n</td></tr>
          <tr><td>Precio por ubicaci&oacute;n</td><td class="green">No &mdash; precio &uacute;nico</td><td class="red">S&iacute; &mdash; $29&ndash;69/mes por ubicaci&oacute;n</td></tr>
          <tr><td>Negocio con 3 ubicaciones</td><td class="green">$79/mes (Agency)</td><td class="red">$87&ndash;207/mes</td></tr>
          <tr><td>Comisi&oacute;n por reservas</td><td class="green">0%</td><td class="green">0%</td></tr>
          <tr><td>Contratos</td><td class="green">Ninguno</td><td class="green">Ninguno &mdash; cancela cuando quieras</td></tr>
          <tr><td>Libertad de procesador de pagos</td><td class="green">&#10003; Cualquier terminal</td><td class="red">&#10007; Solo Square (obligatorio)</td></tr>
          <tr><td>Tarifa de procesamiento</td><td class="red">&#10007; (externo)</td><td>2,5%&ndash;2,6% + $0,15/transacci&oacute;n</td></tr>
          <tr><td>Notificaciones WhatsApp</td><td class="green">&#10003; Nativas, incluidas</td><td class="red">&#10007; No disponible</td></tr>
          <tr><td>Notificaciones Telegram</td><td class="green">&#10003; Nativas, incluidas</td><td class="red">&#10007; No disponible</td></tr>
          <tr><td>Recordatorios Email</td><td class="green">&#10003; Incluidos</td><td class="green">&#10003; Incluidos</td></tr>
          <tr><td>Recordatorios SMS</td><td>&#10003; V&iacute;a Viber</td><td class="green">&#10003; Incluidos en planes de pago</td></tr>
          <tr><td>Opci&oacute;n self-hosted</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Solo en la nube</td></tr>
          <tr><td>C&oacute;digo abierto</td><td class="green">&#10003; Licencia MIT</td><td class="red">&#10007; Propietario</td></tr>
          <tr><td>POS offline</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requiere internet</td></tr>
          <tr><td>Cliente reserva sin cuenta</td><td class="green">&#10003; Nombre + tel&eacute;fono</td><td class="green">&#10003; Checkout de invitado</td></tr>
          <tr><td>Disponibilidad geogr&aacute;fica</td><td class="green">&#10003; Global</td><td class="red">&#9888;&#65039; Solo EE. UU., CA, AU, UK, JP</td></tr>
          <tr><td>Apple Pay / Google Pay</td><td class="red">&#10007;</td><td class="green">&#10003; Nativo</td></tr>
          <tr><td>Hardware POS f&iacute;sico</td><td class="red">&#10007;</td><td class="green">&#10003; Hardware Square</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-hint">&#8592; Desliza para ver la comparativa completa &#8594;</div>
    <div class="table-note">Precios basados en informaci&oacute;n p&uacute;blica disponible a mayo de 2026. Verifica las tarifas en squareup.com/appointments/pricing.</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>Lo que dicen los propietarios de negocios sobre Square Appointments</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F512;</span>
        <h3>Atado al ecosistema de pagos de Square</h3>
        <p>Square Appointments solo funciona con Square Payments &mdash; no puedes usar un procesador diferente. Si tus costos de procesamiento son altos, no tienes alternativa dentro de Square Appointments. Pronto acepta efectivo, tarjeta y transferencia bancaria con cualquier terminal de pago, sin procesador obligatorio ni tarifa de procesamiento para Pronto.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4CD;</span>
        <h3>El precio por ubicaci&oacute;n se acumula r&aacute;pido</h3>
        <p>Square Plus cobra $29/mes por ubicaci&oacute;n. Un negocio con 3 ubicaciones paga $87/mes antes de una sola transacci&oacute;n. Un negocio con 5 ubicaciones paga $145/mes solo en suscripci&oacute;n. El plan Agency de Pronto cubre m&uacute;ltiples ubicaciones por $79/mes fijo &mdash; sin cargos por ubicaci&oacute;n.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>Sin WhatsApp ni Telegram</h3>
        <p>Square Appointments env&iacute;a recordatorios por email y SMS. WhatsApp y Telegram no est&aacute;n disponibles. Para los m&aacute;s de 2.000 millones de personas que usan WhatsApp a diario &mdash; especialmente fuera de Norteam&eacute;rica &mdash; esto significa que los clientes reciben recordatorios por un canal que rara vez revisan. Pronto incluye WhatsApp, Telegram, Viber y Email en todos los planes.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F310;</span>
        <h3>Solo disponible en 5 pa&iacute;ses</h3>
        <p>Square Appointments requiere Square Payments para funcionar. Square Payments solo est&aacute; disponible en EE. UU., Canad&aacute;, Australia, Reino Unido y Jap&oacute;n. Los negocios en Espa&ntilde;a, M&eacute;xico, Latinoam&eacute;rica, Europa del Este, Oriente Medio o la mayor parte de Asia no pueden usar Square Appointments. Pronto funciona en cualquier pa&iacute;s &mdash; tanto self-hosted como SaaS.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Donde Square Appointments tiene una ventaja real</h2>
    <p class="wins-note">Un an&aacute;lisis honesto de d&oacute;nde Square Appointments realmente supera a Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>El ecosistema Square es genuinamente potente</h3>
        <p>Si tu negocio ya usa Square POS, Square Payroll, Square Marketing o hardware Square, a&ntilde;adir Square Appointments crea una operaci&oacute;n totalmente integrada &mdash; un solo panel, un solo flujo de pagos, un solo equipo de soporte. Para negocios en EE. UU. construidos sobre Square, esta integraci&oacute;n es dif&iacute;cil de replicar. Pronto no se integra con el ecosistema de Square.</p>
      </div>

      <div class="wins-card">
        <h3>Apple Pay, Google Pay y hardware f&iacute;sico</h3>
        <p>Square Appointments soporta Apple Pay, Google Pay, pagos sin contacto y la gama completa de lectores y terminales de Square. Para negocios que quieren que los pagos en persona sean gestionados por el mismo proveedor que su software de agendamiento, Square lo ofrece de serie. Pronto no procesa pagos con tarjeta directamente.</p>
      </div>

    </div>
  </div>
</section>

<section class="pricing-section">
  <div class="pricing-inner">
    <h2>Lo que realmente pagas por mes</h2>
    <div class="pricing-cols">

      <div class="pricing-card pronto">
        <div class="pricing-label green">Pronto</div>
        <div class="pricing-highlight">Desde $0/mes</div>
        <ul class="pricing-list">
          <li>&#10003; Free: $0/mes &mdash; 1 empleado, 100 clientes</li>
          <li>&#10003; Starter: $19/mes &mdash; 3 empleados, clientes ilimitados</li>
          <li>&#10003; Pro: $39/mes &mdash; 15 empleados, ilimitado</li>
          <li>&#10003; Agency: $79/mes &mdash; m&uacute;ltiples ubicaciones, precio fijo</li>
          <li>&#10003; WhatsApp + Telegram incluidos</li>
          <li>&#10003; 0% de comisi&oacute;n, siempre</li>
          <li>&#10003; Funciona en cualquier pa&iacute;s</li>
          <li>&#10003; Self-hosted: gratis para siempre</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'es'})">Empezar gratis &rarr;</a>
      </div>

      <div class="pricing-card square">
        <div class="pricing-label">Square Appointments</div>
        <div class="pricing-highlight">Desde $0/mes</div>
        <ul class="pricing-list">
          <li>&rarr; Free: $0 &mdash; 1 ubicaci&oacute;n, 1 usuario, funciones limitadas</li>
          <li>&rarr; Plus: $29/mes por ubicaci&oacute;n (hasta 5 empleados)</li>
          <li>&rarr; Premium: $69/mes por ubicaci&oacute;n (empleados ilimitados)</li>
          <li>&rarr; 3 ubicaciones en Plus: $87/mes</li>
          <li>&rarr; Procesamiento: 2,5%&ndash;2,6% + $0,15/transacci&oacute;n (obligatorio)</li>
          <li>&rarr; Solo disponible en EE. UU., Canad&aacute;, Australia, Reino Unido, Jap&oacute;n</li>
          <li>&rarr; Sin descuento por facturaci&oacute;n anual</li>
        </ul>
        <p class="pricing-note-small">Verifica las tarifas en squareup.com/appointments/pricing</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Ejemplo real</h3>
      <p>Un sal&oacute;n con 3 ubicaciones en Square Appointments Plus paga $87/mes en suscripci&oacute;n, m&aacute;s 2,5% + $0,15 en cada transacci&oacute;n con tarjeta. El plan Agency equivalente de Pronto cubre las 3 ubicaciones por $79/mes fijo &mdash; con notificaciones de WhatsApp incluidas y sin procesador de pagos requerido.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Preguntas frecuentes</h2>

    <div class="faq-item">
      <div class="faq-q">&iquest;Es Pronto una alternativa gratuita a Square Appointments?</div>
      <div class="faq-a">S&iacute;. Tanto Pronto como Square Appointments ofrecen planes gratuitos. Square Appointments Free est&aacute; limitado a una ubicaci&oacute;n y requiere usar el procesamiento de pagos de Square al 2,6% + $0,15 por transacci&oacute;n. El plan gratuito de Pronto incluye POS, CRM, reservas y notificaciones por email sin requisito de procesador de pagos. Pronto tambi&eacute;n ofrece una versi&oacute;n self-hosted gratuita sin l&iacute;mites de clientes ni personal.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Cu&aacute;nto cuesta Square Appointments por mes en 2026?</div>
      <div class="faq-a">Square Appointments tiene tres planes en 2026: Free ($0), Plus ($29/mes por ubicaci&oacute;n) y Premium ($69/mes por ubicaci&oacute;n). Un negocio con 3 ubicaciones en el plan Plus paga $87/mes en suscripci&oacute;n antes del procesamiento de pagos. Las tarifas de procesamiento del 2,5%-2,6% m&aacute;s $0,15 por transacci&oacute;n aplican en todos los planes. No hay descuento por facturaci&oacute;n anual.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Square Appointments cobra comisi&oacute;n por reservas?</div>
      <div class="faq-a">No. Square Appointments no cobra comisi&oacute;n por reservas. Sin embargo, las tarifas de procesamiento del 2,5%-2,6% m&aacute;s $0,15 por transacci&oacute;n aplican cuando aceptas pagos con tarjeta a trav&eacute;s de Square. No puedes usar un procesador de pagos diferente con Square Appointments &mdash; los pagos de Square son obligatorios. Pronto cobra cero comisi&oacute;n y funciona con cualquier terminal de pago.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Est&aacute; disponible Square Appointments fuera de EE. UU.?</div>
      <div class="faq-a">Square Appointments est&aacute; disponible en EE. UU., Canad&aacute;, Australia, Reino Unido y Jap&oacute;n. No est&aacute; disponible en Brasil, la mayor parte de Latinoam&eacute;rica, Europa del Este, la mayor parte de Asia, &Aacute;frica ni Oriente Medio. Pronto est&aacute; disponible globalmente &mdash; tanto la versi&oacute;n self-hosted como el SaaS en trypronto.app funcionan en cualquier pa&iacute;s.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Tiene Pronto notificaciones por WhatsApp como Square Appointments?</div>
      <div class="faq-a">Square Appointments env&iacute;a recordatorios autom&aacute;ticos por email y SMS. WhatsApp y Telegram no est&aacute;n disponibles. Pronto incluye notificaciones nativas por WhatsApp, Telegram, Viber y Email sin costo adicional en todos los planes &mdash; confirmaci&oacute;n, recordatorio 24h antes, recordatorio 1h antes, mensaje post-visita y reactivaci&oacute;n de clientes.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Existe una alternativa self-hosted a Square Appointments?</div>
      <div class="faq-a">S&iacute;. Pronto es la &uacute;nica alternativa open-source y self-hosted a Square Appointments. Instala con un solo comando: docker compose up -d. Tus datos permanecen en tu propio servidor &mdash; sin dependencia de la nube, sin vendor lock-in, sin procesador de pagos obligatorio. Pronto tiene licencia MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;D&oacute;nde tiene ventaja Square Appointments sobre Pronto?</div>
      <div class="faq-a">Square Appointments est&aacute; profundamente integrado con el ecosistema Square &mdash; Square POS, Square Payroll, Square Marketing y el hardware de Square funcionan juntos de forma perfecta. Para negocios que ya usan Square para pagos, esto es una ventaja real. Square tambi&eacute;n soporta Apple Pay y Google Pay de forma nativa y ofrece lectores de tarjetas f&iacute;sicos. Pronto no procesa pagos con tarjeta directamente y no se integra con el ecosistema de Square.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Puedo cambiar de Square Appointments a Pronto?</div>
      <div class="faq-a">S&iacute;. Exporta tu lista de clientes de Square Appointments e imp&oacute;rtala en el CRM de Pronto. Como Square Appointments no tiene contratos a largo plazo, puedes cambiar al final de cualquier per&iacute;odo de facturaci&oacute;n mensual. El SaaS de Pronto en trypronto.app tarda minutos en configurarse, o inst&aacute;lalo en tu propio servidor con un solo comando.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>&iquest;Listo para una alternativa global y open-source a Square?</h2>
  <p>Empieza gratis &mdash; sin dependencia del ecosistema, WhatsApp incluido, disponible en cualquier pa&iacute;s.</p>
  <div class="cta-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'es'})">Empezar gratis &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/es/" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Your data, your server.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Producto</div>
      <a href="/es/precios">Precios</a>
      <a href="/es/para/">Para negocios</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Comparar</div>
      <a href="/es/vs/fresha">vs Fresha</a>
      <a href="/es/vs/booksy">vs Booksy</a>
      <a href="/es/vs/mindbody">vs Mindbody</a>
      <a href="/es/vs/vagaro">vs Vagaro</a>
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
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/es/vs/square'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function EsVsSquarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
