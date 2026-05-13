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
.hide-tablet{display:inline}
@media(max-width:900px){.hide-tablet{display:none}}

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
  .footer-right{flex-direction:column;align-items:flex-start;gap:12px}
  .footer-links{flex-wrap:wrap;gap:12px}
}
@media(max-width:400px){
  .biz-grid{grid-template-columns:1fr}
}
`

const pageContent = `
<nav>
  <a href="/es/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/es/precios" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/es/para'})">Precios</a>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','login_click',{label:'nav_signin'})">Iniciar sesi&oacute;n</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for',es:'/es/para',pt:'/pt/para'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es" selected>ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/es/para'})">Empezar gratis</a>
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
  <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/es/para'})">Empezar gratis &mdash; sin tarjeta</a>
  <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/es/para'})">Self-host en GitHub &rarr;</a>
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
      <a href="/es/precios">Precios</a>
      <a href="/es/para">Para negocios</a>
      <a href="/es/docs">Documentaci&oacute;n</a>
      <a href="/es/para/salones">Salones</a>
      <a href="/es/para/barberia">Barber&iacute;as</a>
      <a href="/es/para/clinica-dental">Cl&iacute;nicas Dentales</a>
      <a href="/terms">T&eacute;rminos</a>
      <a href="/privacy">Privacidad</a>
      <a href="/refund">Reembolsos</a>
    </div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/es/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/es/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/es/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/es/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
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
