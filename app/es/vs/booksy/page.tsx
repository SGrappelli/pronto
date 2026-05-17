import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Booksy — Alternativa sin Cuotas por Empleado',
  description:
    'Pronto vs Booksy: plan gratis vs $29.99/mes+$10 por empleado. WhatsApp nativo vs solo SMS. Self-hosted vs solo en la nube. Descubre cuál es mejor.',
  alternates: {
    canonical: 'https://trypronto.app/es/vs/booksy',
    languages: {
      en: 'https://trypronto.app/vs/booksy',
      es: 'https://trypronto.app/es/vs/booksy',
      'pt-BR': 'https://trypronto.app/pt/vs/booksy',
      'x-default': 'https://trypronto.app/vs/booksy',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/vs/booksy',
    title: 'Pronto vs Booksy — Alternativa sin Cuotas por Empleado',
    description:
      'Plan gratis vs $29.99/mes+$10 por empleado. WhatsApp nativo vs solo SMS. Self-hosted vs solo en la nube.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Booksy — Alternativa sin Cuotas por Empleado',
    description:
      'Plan gratis vs $29.99/mes+$10 por empleado. WhatsApp nativo vs solo SMS. Self-hosted vs solo en la nube.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Es Pronto una alternativa gratuita a Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto tiene un plan gratuito sin cuota mensual y sin comisión. Booksy no ofrece un plan gratuito — Booksy Biz comienza en $29.99/mes más $10/mes por cada miembro adicional del equipo. Booksy ofrece una prueba gratuita de 14 días sin necesidad de tarjeta de crédito.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Booksy cobra comisión?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy no cobra comisión en las reservas estándar. Si activas Booksy Boost — su complemento opcional de visibilidad en el marketplace — pagas el 30% de la primera visita de cada nuevo cliente, con un mínimo de $10 y un máximo de $100 por cliente. Sin Boost, no hay comisión. Pronto cobra cero comisión en cualquier caso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta Booksy para un equipo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy Biz comienza en $29.99/mes para un usuario. Cada miembro adicional del equipo cuesta $10/mes. Un equipo de 3 personas paga aproximadamente $50/mes; un equipo de 10 personas paga $119.99/mes para empleados ilimitados. El plan Starter de Pronto cubre 3 empleados por $19/mes; Pro cubre 15 empleados por $39/mes — sin precio por asiento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pronto tiene notificaciones por WhatsApp como Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy no ofrece notificaciones nativas por WhatsApp ni Telegram — incluye SMS (2.000 gratuitos/mes) y recordatorios por email. Pronto incluye notificaciones nativas por WhatsApp, Telegram, Viber y Email sin coste adicional: confirmación de reserva, recordatorio 24h antes, recordatorio 1h antes, mensaje post-visita y reactivación de clientes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Existe una alternativa self-hosted a Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pronto es la única alternativa open-source y self-hosted a Booksy. Instálalo con un solo comando en tu propio servidor: docker compose up -d. Los datos de tus clientes permanecen en tu servidor — no en la nube de Booksy. Pronto tiene licencia MIT.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los clientes pueden reservar sin crear una cuenta de Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con Pronto, los clientes reservan solo con nombre y teléfono — sin necesidad de cuenta. Con Booksy, se anima a los clientes a crear una cuenta de Booksy para usar la plataforma completa y recibir recordatorios. Esto mantiene la relación con el cliente dentro del ecosistema de Booksy, no en tu propio negocio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué tiene ventaja Booksy sobre Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy tiene más de 35 millones de consumidores registrados — el mayor marketplace de consumidores centrado en belleza en EE.UU. Para nuevas barberías y salones en grandes ciudades, este marketplace puede realmente llenar tu agenda. Booksy también incluye procesamiento de pagos con tarjeta integrado y funciones de depósito por no presentación. Pronto no tiene marketplace ni procesamiento de pagos integrado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo migrar de Booksy a Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Exporta tu lista de clientes desde Booksy e impórtala al CRM de Pronto. Puedes usar ambos en paralelo durante la transición. El SaaS de Pronto en trypronto.app tarda minutos en configurarse, o instálalo en tu propio servidor con un solo comando.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/es/vs/booksy',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Alternativa gratuita y open-source a Booksy para salones y barberías. Sin cuotas por empleado, cero comisión, notificaciones nativas por WhatsApp y Telegram, opción self-hosted.',
  alternateName: [
    'alternativa gratuita a Booksy',
    'alternativa open source a Booksy',
    'alternativa self-hosted a Booksy',
    'alternativa a Booksy sin cuotas por empleado',
    'alternativa a Booksy con WhatsApp',
    'alternativa a Booksy para barberías',
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

.breadcrumb{padding:12px 48px;background:#fafafa;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af}
.breadcrumb a{color:#9ca3af;text-decoration:none}
.breadcrumb a:hover{color:#111}
.breadcrumb span{margin:0 6px}

.hero{padding:64px 48px 56px;text-align:center;border-bottom:1px solid #f0f0f0}
.hero h1{font-size:48px;font-weight:800;line-height:1.08;letter-spacing:-1.5px;color:#0a0a0a;margin-bottom:18px}
.hero p{font-size:17px;color:#374151;line-height:1.65;max-width:620px;margin:0 auto 32px}
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
.pricing-card.booksy{border:1px solid #e2e8f0;background:#fff}
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
@media(max-width:900px){footer{padding:32px 24px}.footer-top{grid-template-columns:1fr 1fr;gap:24px}}
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
    <a href="/es/precios" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/es/vs/booksy'})">Precios</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'es'})">Iniciar sesi&oacute;n</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={en:'/vs/booksy',pt:'/pt/vs/booksy'};if(m[this.value])location.href=m[this.value]"><option value="en">EN</option><option value="es" selected>ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'es'})">Comenzar gratis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/es/">Inicio</a><span>&rsaquo;</span>
  <a href="/es/vs/">Comparativas</a><span>&rsaquo;</span>
  Pronto vs Booksy
</div>

<main>

<section class="hero">
  <h1>Pronto vs Booksy &mdash; sin cuotas por empleado, self-hosted</h1>
  <p>Booksy cobra $29.99/mes m&aacute;s $10 por cada miembro adicional del equipo. Una barber&iacute;a de 3 sillas paga ~$50/mes antes del procesamiento de pagos. El plan Starter de Pronto cubre 3 empleados por $19/mes fijo &mdash; sin cuotas por asiento, nunca.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'es'})">Comenzar gratis &mdash; sin tarjeta &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; Plan gratuito $0</span>
    <span class="hero-pill">&#10003; Sin cuotas por empleado</span>
    <span class="hero-pill">&#10003; Opci&oacute;n self-hosted</span>
  </div>
</section>

<section class="verdict">
  <div class="verdict-inner">
    <h2>Resumen &mdash; &iquest;cu&aacute;l elegir?</h2>
    <div class="verdict-cols">
      <div class="verdict-col">
        <h3>Elige Pronto si&hellip;</h3>
        <div class="verdict-item yes">&#10003; Quieres un plan gratuito sin cuota mensual</div>
        <div class="verdict-item yes">&#10003; No quieres precio por empleado al crecer tu equipo</div>
        <div class="verdict-item yes">&#10003; Quieres WhatsApp y Telegram incluidos</div>
        <div class="verdict-item yes">&#10003; Quieres tus datos en tu propio servidor</div>
        <div class="verdict-item yes">&#10003; No necesitas un marketplace de consumidores en EE.UU.</div>
      </div>
      <div class="verdict-col">
        <h3>Elige Booksy si&hellip;</h3>
        <div class="verdict-item no">&rarr; Quieres acceso al marketplace de 35M+ consumidores de Booksy</div>
        <div class="verdict-item no">&rarr; Eres una nueva barber&iacute;a en una gran ciudad de EE.UU. buscando captar clientes</div>
        <div class="verdict-item no">&rarr; Necesitas procesamiento de pagos integrado y dep&oacute;sitos por no presentaci&oacute;n</div>
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
            <th>Booksy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Cuota mensual base</td><td class="green">$0 plan gratuito</td><td class="red">$29.99/mes (sin plan gratis)</td></tr>
          <tr><td>Precio por empleado</td><td class="green">Ninguno &mdash; precio fijo</td><td class="red">+$10/mes por empleado adicional</td></tr>
          <tr><td>Coste mensual equipo de 3</td><td class="green">$19/mes</td><td class="red">~$50/mes</td></tr>
          <tr><td>Comisi&oacute;n por reservas</td><td class="green">0% siempre</td><td>0% est&aacute;ndar; 30% primera visita con Boost</td></tr>
          <tr><td>Comisi&oacute;n m&aacute;x. Boost/cliente</td><td class="green">Ninguna</td><td>$100 por nuevo cliente</td></tr>
          <tr><td>Opci&oacute;n self-hosted</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Solo en la nube</td></tr>
          <tr><td>C&oacute;digo abierto</td><td class="green">&#10003; Licencia MIT</td><td class="red">&#10007; Propietario</td></tr>
          <tr><td>Notificaciones WhatsApp</td><td class="green">&#10003; Nativas, incluidas</td><td class="red">&#10007; No disponible</td></tr>
          <tr><td>Notificaciones Telegram</td><td class="green">&#10003; Nativas, incluidas</td><td class="red">&#10007; No disponible</td></tr>
          <tr><td>Recordatorios SMS</td><td class="green">&#10003; V&iacute;a Viber</td><td class="green">&#10003; 2.000 gratuitos/mes</td></tr>
          <tr><td>Recordatorios Email</td><td class="green">&#10003; Incluidos</td><td class="green">&#10003; Incluidos</td></tr>
          <tr><td>TPV sin conexi&oacute;n</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requiere internet</td></tr>
          <tr><td>Reserva sin crear cuenta</td><td class="green">&#10003; Nombre + tel&eacute;fono</td><td>&#9888;&#65039; Se recomienda cuenta Booksy</td></tr>
          <tr><td>Marketplace de consumidores</td><td class="red">&#10007;</td><td class="green">&#10003; 35M+ consumidores</td></tr>
          <tr><td>Procesamiento de pagos integrado</td><td class="red">&#10007;</td><td class="green">&#10003; 2.49% + $0.15/transacci&oacute;n</td></tr>
          <tr><td>Dep&oacute;sitos por no presentaci&oacute;n</td><td class="green">&#10003;</td><td class="green">&#10003; Plan Boost+</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-hint">&#8592; Desplaza para comparar &#8594;</div>
    <div class="table-note">Precios basados en informaci&oacute;n p&uacute;blica disponible a mayo de 2026. Verifica las tarifas actuales en biz.booksy.com/pricing.</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>Lo que comentan los propietarios de negocios sobre Booksy</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F4B8;</span>
        <h3>El precio por empleado se acumula r&aacute;pido</h3>
        <p>Booksy cobra $10/mes por cada miembro adicional del equipo. Una barber&iacute;a con 4 sillas paga $29.99 + $30 = ~$60/mes solo en suscripci&oacute;n, antes de las comisiones de pago. Un sal&oacute;n de 10 personas llega a $119.99/mes para empleados ilimitados. Con Pronto, el plan Pro cubre hasta 15 empleados por $39/mes fijo.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4CA;</span>
        <h3>La comisi&oacute;n de Boost sorprende a los negocios en crecimiento</h3>
        <p>Booksy Boost es opcional &mdash; pero si lo activas para mayor visibilidad en el marketplace, pagas el 30% de la primera visita de cada nuevo cliente, hasta $100 por cliente. Con 20 nuevos clientes al mes a trav&eacute;s de Boost, eso puede suponer hasta $2.000 en comisiones sobre tu suscripci&oacute;n. Pronto cobra cero comisi&oacute;n, siempre.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F512;</span>
        <h3>Tus clientes ven a la competencia cada vez que vuelven a reservar</h3>
        <p>Cada vez que un cliente abre la app de Booksy para volver a reservar contigo, ve otros negocios listados cerca. El marketplace que los trajo a ti tambi&eacute;n les muestra alternativas. Con Pronto, los clientes reservan a trav&eacute;s de tu propia p&aacute;gina &mdash; solo te ven a ti.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>Sin recordatorios por WhatsApp ni Telegram</h3>
        <p>Booksy env&iacute;a recordatorios por SMS y email &mdash; pero WhatsApp y Telegram no est&aacute;n disponibles de forma nativa. Para negocios fuera de EE.UU. donde WhatsApp es el canal de comunicaci&oacute;n principal, esto es una limitaci&oacute;n importante. Pronto incluye WhatsApp, Telegram, Viber y Email sin coste adicional.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Donde Booksy tiene una ventaja real</h2>
    <p class="wins-note">Un an&aacute;lisis honesto de donde Booksy realmente supera a Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>El marketplace es el mayor activo de Booksy</h3>
        <p>Booksy tiene m&aacute;s de 35 millones de consumidores registrados y es el mayor marketplace de consumidores centrado en belleza en EE.UU. Para una nueva barber&iacute;a en Chicago o Nueva York, aparecer en Booksy puede realmente llenar tu agenda m&aacute;s r&aacute;pido que otros canales. Pronto no tiene marketplace &mdash; los clientes te encuentran a trav&eacute;s de tus propios canales.</p>
      </div>

      <div class="wins-card">
        <h3>Pagos integrados y protecci&oacute;n contra no presentaci&oacute;n</h3>
        <p>Booksy incluye pagos con tarjeta integrados y funciones de dep&oacute;sito/no presentaci&oacute;n. El TPV de Pronto acepta efectivo, tarjeta y transferencia &mdash; pero Pronto no procesa pagos con tarjeta directamente. Necesitar&aacute;s un terminal de pago independiente.</p>
      </div>

    </div>
  </div>
</section>

<section class="pricing-section">
  <div class="pricing-inner">
    <h2>Lo que pagas realmente cada mes</h2>
    <div class="pricing-cols">

      <div class="pricing-card pronto">
        <div class="pricing-label green">Pronto</div>
        <div class="pricing-highlight">Desde $0/mes</div>
        <ul class="pricing-list">
          <li>&#10003; Free: $0/mes &mdash; 1 empleado, 100 clientes</li>
          <li>&#10003; Starter: $19/mes &mdash; 3 empleados, clientes ilimitados</li>
          <li>&#10003; Pro: $39/mes &mdash; 15 empleados, ilimitado</li>
          <li>&#10003; Agency: $79/mes &mdash; m&uacute;ltiples locales</li>
          <li>&#10003; 0% de comisi&oacute;n, siempre</li>
          <li>&#10003; Self-hosted: gratis para siempre</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'es'})">Comenzar gratis &rarr;</a>
      </div>

      <div class="pricing-card booksy">
        <div class="pricing-label">Booksy</div>
        <div class="pricing-highlight">Desde $29.99/mes</div>
        <ul class="pricing-list">
          <li>&rarr; Biz: $29.99/mes para 1 usuario</li>
          <li>&rarr; Cada empleado adicional: +$10/mes</li>
          <li>&rarr; Complemento Boost: +$49.99/mes</li>
          <li>&rarr; 10+ empleados: $119.99/mes ilimitado</li>
          <li>&rarr; Comisi&oacute;n Boost: 30% primera visita, m&aacute;x. $100/cliente</li>
          <li>&rarr; Procesamiento de pagos: 2.49% + $0.15/transacci&oacute;n</li>
          <li>&rarr; Sin plan gratuito &mdash; solo 14 d&iacute;as de prueba</li>
        </ul>
        <p class="pricing-note-small">Verifica las tarifas actuales en biz.booksy.com/pricing</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Ejemplo real</h3>
      <p>Una barber&iacute;a de 3 personas en Booksy paga: $29.99 + $20 en cuotas por empleados = ~$50/mes, m&aacute;s el 2.49% en cada transacci&oacute;n con tarjeta. El plan Starter equivalente de Pronto cuesta $19/mes fijo &mdash; sin cuotas por empleado, sin comisiones por transacci&oacute;n, cero comisi&oacute;n.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Preguntas frecuentes</h2>

    <div class="faq-item">
      <div class="faq-q">&iquest;Es Pronto una alternativa gratuita a Booksy?</div>
      <div class="faq-a">S&iacute;. Pronto tiene un plan gratuito sin cuota mensual y sin comisi&oacute;n. Booksy no ofrece un plan gratuito &mdash; Booksy Biz comienza en $29.99/mes m&aacute;s $10/mes por cada miembro adicional del equipo. Booksy ofrece una prueba gratuita de 14 d&iacute;as sin necesidad de tarjeta de cr&eacute;dito.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Booksy cobra comisi&oacute;n?</div>
      <div class="faq-a">Booksy no cobra comisi&oacute;n en las reservas est&aacute;ndar. Si activas Booksy Boost &mdash; su complemento opcional de visibilidad en el marketplace &mdash; pagas el 30% de la primera visita de cada nuevo cliente, con un m&iacute;nimo de $10 y un m&aacute;ximo de $100 por cliente. Sin Boost, no hay comisi&oacute;n. Pronto cobra cero comisi&oacute;n en cualquier caso.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Cu&aacute;nto cuesta Booksy para un equipo?</div>
      <div class="faq-a">Booksy Biz comienza en $29.99/mes para un usuario. Cada miembro adicional del equipo cuesta $10/mes. Un equipo de 3 personas paga aproximadamente $50/mes; un equipo de 10 personas paga $119.99/mes para empleados ilimitados. El plan Starter de Pronto cubre 3 empleados por $19/mes; Pro cubre 15 empleados por $39/mes &mdash; sin precio por asiento.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Pronto tiene notificaciones por WhatsApp como Booksy?</div>
      <div class="faq-a">Booksy no ofrece notificaciones nativas por WhatsApp ni Telegram &mdash; incluye SMS (2.000 gratuitos/mes) y recordatorios por email. Pronto incluye notificaciones nativas por WhatsApp, Telegram, Viber y Email sin coste adicional: confirmaci&oacute;n de reserva, recordatorio 24h antes, recordatorio 1h antes, mensaje post-visita y reactivaci&oacute;n de clientes.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Existe una alternativa self-hosted a Booksy?</div>
      <div class="faq-a">S&iacute;. Pronto es la &uacute;nica alternativa open-source y self-hosted a Booksy. Inst&aacute;lalo con un solo comando en tu propio servidor: docker compose up -d. Los datos de tus clientes permanecen en tu servidor &mdash; no en la nube de Booksy. Pronto tiene licencia MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Los clientes pueden reservar sin crear una cuenta de Booksy?</div>
      <div class="faq-a">Con Pronto, los clientes reservan solo con nombre y tel&eacute;fono &mdash; sin necesidad de cuenta. Con Booksy, se anima a los clientes a crear una cuenta de Booksy para usar la plataforma completa y recibir recordatorios. Esto mantiene la relaci&oacute;n con el cliente dentro del ecosistema de Booksy, no en tu propio negocio.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;En qu&eacute; tiene ventaja Booksy sobre Pronto?</div>
      <div class="faq-a">Booksy tiene m&aacute;s de 35 millones de consumidores registrados &mdash; el mayor marketplace de consumidores centrado en belleza en EE.UU. Para nuevas barber&iacute;as y salones en grandes ciudades, este marketplace puede realmente llenar tu agenda. Booksy tambi&eacute;n incluye procesamiento de pagos con tarjeta integrado y funciones de dep&oacute;sito por no presentaci&oacute;n. Pronto no tiene marketplace ni procesamiento de pagos integrado.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">&iquest;Puedo migrar de Booksy a Pronto?</div>
      <div class="faq-a">S&iacute;. Exporta tu lista de clientes desde Booksy e imp&oacute;rtala al CRM de Pronto. Puedes usar ambos en paralelo durante la transici&oacute;n. El SaaS de Pronto en trypronto.app tarda minutos en configurarse, o inst&aacute;lalo en tu propio servidor con un solo comando.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>&iquest;Listo para dejar de pagar cuotas por empleado?</h2>
  <p>Empieza gratis &mdash; sin tarjeta, sin comisiones, sin cargos por asiento.</p>
  <div class="cta-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'es'})">Comenzar gratis &rarr;</a>
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
      <a href="/es/vs/mindbody">vs Mindbody</a>
      <a href="/es/vs/vagaro">vs Vagaro</a>
      <a href="/es/vs/square">vs Square</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Legal</div>
      <a href="/terms">T&eacute;rminos de uso</a>
      <a href="/privacy">Privacidad</a>
      <a href="/refund">Reembolsos</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">&copy; 2026 Pronto. Todos los derechos reservados.</div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/es/vs/booksy'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function EsVsBooksyPage() {
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
