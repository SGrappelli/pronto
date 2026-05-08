import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto para Negocios de Servicios — POS, Reservas y CRM Gratis',
  description:
    'Software gratis de POS, CRM y reservas para salones, barberías, talleres de autos, clínicas dentales, gimnasios, spas, cafeterías y cualquier negocio de servicios. Sin comisiones.',
  keywords:
    'software para negocios de servicios, POS para pequeños negocios, software de reservas gratis, programa para salón de belleza, software para barbería, sistema para taller mecánico, software clínica dental, gestión gimnasio, POS cafetería, software código abierto negocios',
  alternates: {
    canonical: 'https://trypronto.app/es/para',
    languages: {
      en: 'https://trypronto.app/for',
      es: 'https://trypronto.app/es/para',
      'x-default': 'https://trypronto.app/for',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/para',
    title: 'Pronto para Negocios de Servicios — POS, Reservas y CRM Gratis',
    description:
      'POS, CRM y reservas gratis para cualquier negocio de servicios. Sin comisiones. Self-hosted o en la nube.',
    images: [{ url: 'https://trypronto.app/og-image-es.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto para Negocios de Servicios — POS, Reservas y CRM Gratis',
    description:
      'POS, CRM y reservas gratis para cualquier negocio de servicios. Sin comisiones. Self-hosted o en la nube.',
    images: ['https://trypronto.app/og-image-es.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'Inicio', item: 'https://trypronto.app/es/' },
    { '@type': 'ListItem', position: 3, name: 'Para negocios', item: 'https://trypronto.app/es/para' },
  ],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pronto para negocios de servicios',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Salones de belleza', url: 'https://trypronto.app/es/para/salones' },
    { '@type': 'ListItem', position: 2, name: 'Barberías', url: 'https://trypronto.app/es/para/barberia' },
    { '@type': 'ListItem', position: 3, name: 'Talleres de autos', url: 'https://trypronto.app/es/para/autoservicio' },
    { '@type': 'ListItem', position: 4, name: 'Clínicas dentales', url: 'https://trypronto.app/es/para/clinica-dental' },
    { '@type': 'ListItem', position: 5, name: 'Gimnasios', url: 'https://trypronto.app/es/para/gimnasio' },
    { '@type': 'ListItem', position: 6, name: 'Cafeterías', url: 'https://trypronto.app/es/para/cafeteria' },
    { '@type': 'ListItem', position: 7, name: 'Masajes y spa', url: 'https://trypronto.app/es/para/spa' },
    { '@type': 'ListItem', position: 8, name: 'Estudios de tatuajes', url: 'https://trypronto.app/es/para/tatuajes' },
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

.breadcrumb{padding:14px 48px;background:#fafafa;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af}
.breadcrumb a{color:#9ca3af;text-decoration:none}
.breadcrumb a:hover{color:#111}
.breadcrumb span{margin:0 8px}

.hero{padding:72px 48px 64px;text-align:center;border-bottom:1px solid #f0f0f0}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px;margin-bottom:24px}
.hero-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#16a34a}
.hero h1{font-size:52px;font-weight:800;line-height:1.06;letter-spacing:-1.5px;color:#0a0a0a;margin-bottom:18px}
.hero h1 em{font-style:normal;color:#16a34a}
.hero p{font-size:18px;color:#374151;line-height:1.65;max-width:560px;margin:0 auto 36px}
.hero-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:0}
.hero-pill{font-size:13px;font-weight:500;padding:6px 14px;border-radius:20px;border:1px solid #e2e8f0;color:#374151;background:#fafafa}

.grid-section{padding:64px 48px 80px}
.grid-section-inner{max-width:960px;margin:0 auto}
.grid-label{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:24px;text-align:center}

.biz-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}

.biz-card{display:block;text-decoration:none;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px 24px;transition:border-color 0.15s,box-shadow 0.15s;position:relative;overflow:hidden}
.biz-card:hover{border-color:#16a34a;box-shadow:0 4px 20px rgba(22,163,74,0.1)}
.biz-card.coming-soon{cursor:default;opacity:0.55}
.biz-card.coming-soon:hover{border-color:#e2e8f0;box-shadow:none}
.biz-card-emoji{font-size:36px;margin-bottom:14px;display:block;line-height:1}
.biz-card-title{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.biz-card-desc{font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:14px}
.biz-card-tags{display:flex;flex-wrap:wrap;gap:5px}
.biz-tag{font-size:11px;font-weight:500;padding:3px 9px;border-radius:10px;background:#f1f5f9;color:#64748b}
.biz-card-arrow{position:absolute;top:24px;right:20px;font-size:18px;color:#d1d5db;transition:color 0.15s,transform 0.15s}
.biz-card:hover .biz-card-arrow{color:#16a34a;transform:translateX(3px)}
.badge-soon{font-size:10px;font-weight:700;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:8px;display:inline-block;margin-top:10px}

.shared{background:#f8fafc;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;padding:48px 48px}
.shared-inner{max-width:960px;margin:0 auto}
.shared h2{font-size:22px;font-weight:700;color:#0a0a0a;margin-bottom:28px;text-align:center}
.shared-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#e2e8f0;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0}
.shared-item{background:#f8fafc;padding:24px 20px}
.shared-title{font-family:'Bricolage Grotesque',sans-serif;font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.shared-desc{font-size:14px;color:#6b7280;line-height:1.6}

.cta{padding:64px 48px;text-align:center}
.cta h2{font-size:34px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:12px}
.cta p{font-size:16px;color:#374151;margin-bottom:28px}
.btn-primary{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}
.btn-outline{background:transparent;color:#111;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 22px;border-radius:8px;border:1px solid #d1d5db;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}
.btn-outline:hover{border-color:#111}

footer{padding:28px 48px;border-top:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;background:#fff;flex-wrap:wrap;gap:12px}
.footer-brand{font-size:22px;font-weight:800;color:#111;letter-spacing:-0.5px}
.footer-brand span{color:#16a34a}
.footer-copy{font-size:13px;color:#9ca3af}
.footer-links{display:flex;gap:28px}
.footer-links a{font-size:13px;color:#9ca3af;text-decoration:none}
.footer-links a:hover{color:#111}

@media(max-width:1024px){
  nav,footer{padding:0 24px}
  footer{padding:24px}
  .hero,.grid-section,.shared,.cta{padding-left:24px;padding-right:24px}
  .breadcrumb{padding:14px 24px}
  .biz-grid{grid-template-columns:repeat(2,1fr)}
  .shared-grid{grid-template-columns:repeat(2,1fr)}
  .hero h1{font-size:40px}
}
@media(max-width:640px){
  nav{padding:0 16px;height:56px}
  .nav-right{gap:8px}
  .nav-link{font-size:14px}
  .btn-nav{font-size:13px;padding:8px 14px}
  .hide-mob{display:none}
  .hero{padding:48px 16px 40px}
  .hero h1{font-size:32px;letter-spacing:-1px}
  .hero p{font-size:15px}
  .grid-section{padding:44px 16px 56px}
  .shared{padding:40px 16px}
  .cta{padding:44px 16px}
  .cta h2{font-size:26px}
  .breadcrumb{padding:12px 16px}
  .biz-grid{grid-template-columns:1fr 1fr}
  .shared-grid{grid-template-columns:1fr 1fr}
  footer{flex-direction:column;align-items:flex-start;gap:16px;padding:24px 16px}
  .footer-links{flex-wrap:wrap;gap:16px}
}
@media(max-width:400px){
  .biz-grid{grid-template-columns:1fr}
}
`

const pageContent = `
<nav>
  <a href="/es/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/es/precios" class="nav-link hide-mob">Precios</a>
    <a href="/login" class="nav-link">Iniciar sesi&oacute;n</a>
    <a href="/for" class="nav-link lang-switcher">EN</a>
    <a href="/register" class="btn-nav">Empezar gratis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/es/">Inicio</a><span>&rsaquo;</span>
  Para negocios
</div>

<main>

<section class="hero">
  <div class="hero-eyebrow">
    <span class="hero-eyebrow-dot"></span>
    Hecho para negocios de servicios
  </div>
  <h1>Una herramienta para <em>cada negocio</em> de servicios</h1>
  <p>POS, CRM, reservas en l&iacute;nea, inventario y notificaciones omnicanal &mdash; el mismo sistema potente, adaptado a tu sector.</p>
  <div class="hero-pills">
    <span class="hero-pill">Sin comisiones</span>
    <span class="hero-pill">Self-hosted o en la nube</span>
    <span class="hero-pill">Instalaci&oacute;n en un comando</span>
    <span class="hero-pill">Email &middot; Telegram &middot; WhatsApp &middot; Viber</span>
    <span class="hero-pill">C&oacute;digo abierto MIT</span>
  </div>
</section>

<section class="grid-section">
  <div class="grid-section-inner">
    <div class="grid-label">Elige tu sector</div>
    <div class="biz-grid">

      <a href="/es/para/salones" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F487;</span>
        <div class="biz-card-title">Salones de belleza</div>
        <div class="biz-card-desc">Salones de cabello, u&ntilde;as, est&eacute;tica, pesta&ntilde;as y cejas.</div>
      </a>

      <a href="/es/para/barberia" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x2702;&#xFE0F;</span>
        <div class="biz-card-title">Barber&iacute;as</div>
        <div class="biz-card-desc">Walk-ins, citas, agenda para varios barberos y venta de productos.</div>
      </a>

      <a href="/es/para/autoservicio" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F527;</span>
        <div class="biz-card-title">Talleres de autos</div>
        <div class="biz-card-desc">&Oacute;rdenes de servicio, inventario de repuestos, seguimiento de trabajos y notificaciones al cliente.</div>
      </a>

      <a href="/es/para/clinica-dental" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F9B7;</span>
        <div class="biz-card-title">Cl&iacute;nicas dentales</div>
        <div class="biz-card-desc">Agenda de pacientes, recordatorios de citas y cobro de servicios.</div>
      </a>

      <a href="/es/para/gimnasio" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F3CB;&#xFE0F;</span>
        <div class="biz-card-title">Gimnasios</div>
        <div class="biz-card-desc">Reservas de clases, control de membres&iacute;as y agenda de entrenadores.</div>
      </a>

      <a href="/es/para/spa" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F9D6;</span>
        <div class="biz-card-title">Masajes y spa</div>
        <div class="biz-card-desc">Reservas de tratamientos, agenda de terapeutas y venta de productos.</div>
      </a>

      <a href="/es/para/cafeteria" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x2615;</span>
        <div class="biz-card-title">Cafeter&iacute;as</div>
        <div class="biz-card-desc">POS r&aacute;pido, control de inventario y pedidos para consumir o llevar.</div>
      </a>

      <a href="/es/para/tatuajes" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F3A8;</span>
        <div class="biz-card-title">Estudios de tatuajes</div>
        <div class="biz-card-desc">Reservas de sesiones, dep&oacute;sitos, historial de clientes y agenda de artistas.</div>
      </a>

    </div>
  </div>
</section>

<section class="shared">
  <div class="shared-inner">
    <h2>Todo lo anterior comparte el mismo n&uacute;cleo</h2>
    <div class="shared-grid">
      <div class="shared-item">
        <div class="shared-title">POS</div>
        <div class="shared-desc">Completa una venta en 3 clics. Funciona sin internet.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">CRM</div>
        <div class="shared-desc">Historial completo del cliente, etiquetas, notas y cumplea&ntilde;os.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Calendario de citas</div>
        <div class="shared-desc">Drag &amp; drop. Sin reservas dobles. Nunca.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Notificaciones</div>
        <div class="shared-desc">Email &middot; Telegram &middot; WhatsApp &middot; Viber &mdash; autom&aacute;ticas.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Inventario</div>
        <div class="shared-desc">Control de stock y alertas de m&iacute;nimos al instante.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Reservas en l&iacute;nea</div>
        <div class="shared-desc">Los clientes reservan con nombre y tel&eacute;fono. Sin cuenta.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Self-hosted</div>
        <div class="shared-desc">Un comando. Tu servidor. Tus datos. Gratis para siempre.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">PWA</div>
        <div class="shared-desc">Se instala desde el navegador. Funciona sin conexi&oacute;n en caja.</div>
      </div>
    </div>
  </div>
</section>

<section class="cta">
  <h2>&iquest;No sabes cu&aacute;l es el tuyo?</h2>
  <p>Empieza con el plan gratuito en la nube &mdash; funciona para cualquier negocio de servicios, sin configuraci&oacute;n.</p>
  <a href="/register" class="btn-primary">Empezar gratis &mdash; sin tarjeta</a>
  <a href="https://github.com/SGrappelli/pronto" class="btn-outline">Self-host en GitHub &rarr;</a>
</section>

</main>

<footer>
  <div class="footer-brand">Pronto<span>.</span></div>
  <div class="footer-copy">&copy; 2026 Pronto. Todos los derechos reservados.</div>
    <!-- FOOTER — keep in sync with all other pages
       ES standard: /es/ · /es/precios · /es/para · /es/para/salones · legal · GitHub
       EN standard: / · /pricing · /for · /for/salons · legal · GitHub -->
  <div class="footer-links">
    <a href="/es/">Inicio</a>
    <a href="/es/precios">Precios</a>
    <a href="/es/para">Para negocios</a>
    <a href="/es/para/salones">Salones</a>
    <a href="/terms">Términos</a>
    <a href="/privacy">Privacidad</a>
    <a href="/refund">Reembolsos</a>
    <a href="https://github.com/SGrappelli/pronto">GitHub</a>
  </div>
</footer>
`

export default function EsParaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
