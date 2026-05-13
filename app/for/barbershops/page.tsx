import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Barbershop Management Software — Booking, POS & CRM | Pronto',
  description:
    'Free barbershop management software with appointment booking, walk-in support, POS, CRM and automated client reminders via WhatsApp, Telegram & Email. Zero commission. Self-hosted or cloud.',
  keywords:
    'barbershop management software, barbershop booking software, barbershop POS system, barber shop scheduling software, barbershop CRM, free barbershop software, barber appointment booking, barbershop software no commission, self-hosted barbershop software',
  alternates: { canonical: 'https://trypronto.app/for/barbershops' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/for/barbershops',
    title: 'Free Barbershop Management Software — Booking, POS & CRM | Pronto',
    description:
      'Free barbershop management software with appointment booking, walk-in support, POS, CRM and automated client reminders via WhatsApp, Telegram & Email. Zero commission. Self-hosted or cloud.',
    images: [{ url: 'https://trypronto.app/og-barbershops.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Barbershop Management Software — Booking, POS & CRM | Pronto',
    description:
      'Free barbershop management software with appointment booking, walk-in support, POS, CRM and automated client reminders via WhatsApp, Telegram & Email. Zero commission. Self-hosted or cloud.',
    images: ['https://trypronto.app/og-barbershops.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Barbershop Management Software',
  url: 'https://trypronto.app/for/barbershops',
  description:
    'Free open-source barbershop management software with appointment booking, walk-in support, POS, CRM, grooming product inventory and omnichannel client notifications via Email, Telegram, WhatsApp and Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Barbershop Management Software',
  operatingSystem: 'Web, Linux, Windows, macOS',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Starter', price: '19', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Agency', price: '79', priceCurrency: 'USD' },
  ],
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  featureList: [
    'Barbershop appointment booking',
    'Walk-in client support',
    'Multi-barber scheduling calendar',
    'Barbershop POS system',
    'Client CRM with visit history',
    'Grooming product inventory tracking',
    'Automated appointment reminders via Telegram and WhatsApp',
    'Online booking page — no client account required',
    'Revenue analytics',
    'PWA — works offline',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best free barbershop management software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto is a free, open-source barbershop management software that includes appointment booking, walk-in support, a multi-barber calendar, POS, client CRM, grooming product inventory and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can barbershop clients book without creating an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account needed. The public booking page only requires a name and phone number — no registration, no password, no app to download. This removes friction and increases booking conversion significantly compared to platforms that require clients to sign up.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto support both walk-ins and appointments for barbershops?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Barbers can manage both pre-booked appointments via the online booking page and walk-in clients added manually at the chair. The calendar shows all barbers side by side so you always know who is free and what is coming next.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Pronto an alternative to barbershop booking platforms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Unlike marketplace booking platforms that charge 15–30% per appointment and lock your client data in their ecosystem, Pronto charges zero commission. You own your client database completely. If you stop using Pronto, your data is yours. You can also self-host the entire system on your own server with no vendor lock-in of any kind.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do automated appointment reminders work for barbershops?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto automatically sends a booking confirmation immediately after an appointment is made, a reminder 24 hours before the visit, another reminder 1 hour before, and a thank-you message 2 hours after the visit ends. All messages go via the channel each client prefers: WhatsApp, Telegram, Viber or Email. No manual action required from barbers or the front desk.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track grooming product inventory in my barbershop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto tracks stock levels for every product — pomades, beard oils, shampoos, waxes, and anything else you sell or use. When a product drops below your minimum quantity, an automatic alert is sent to the owner via Email, Telegram, WhatsApp or Viber.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto work for multi-barber shops?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The booking calendar shows each barber as a separate column. Clients can request a specific barber or book with whoever is available first. Appointments are protected against double-booking at the database level — it is technically impossible to overbook a slot.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Pronto on my own server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run docker compose up -d and the full barbershop management system starts automatically. No DevOps knowledge required.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'For businesses', item: 'https://trypronto.app/for' },
    { '@type': 'ListItem', position: 3, name: 'Barbershops', item: 'https://trypronto.app/for/barbershops' },
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


  .path-card{padding:24px}
}
`

const pageContent = `
<nav>
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/for/barbershops'})">Pricing</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','login_click',{label:'nav_signin'})">Sign in</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/barbershops',es:'/es/para/barberia',pt:'/pt/para/barbearia'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/barbershops'})">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/for">For businesses</a><span>&rsaquo;</span>
  Barbershops
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Barbershop management software
    </div>
    <h1>Your chairs. <em>Your clients.</em> Zero commission.</h1>
    <p class="hero-sub">Free appointment booking, walk-in support, POS, CRM and automated client reminders &mdash; for barbershops and barber studios. Self-hosted or cloud.</p>
    <p class="hero-platforms">Most booking platforms charge <strong>15&ndash;30%</strong> per booking from your own regulars. Pronto charges <strong>$0</strong>.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/barbershops'})">Start free &mdash; no credit card</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/for/barbershops'})">Self-host for free &rarr;</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Commission on bookings</div>
      </div>
      <div>
        <div class="hero-stat-num">0%</div>
        <div class="hero-stat-label">Platform fee</div>
      </div>
      <div>
        <div class="hero-stat-num">1 cmd</div>
        <div class="hero-stat-label">Self-hosted install</div>
      </div>
      <div>
        <div class="hero-stat-num">4</div>
        <div class="hero-stat-label">Notification channels</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="cards-wrap">
    <div class="problem-banner">
      <h3>The barbershop booking trap</h3>
      <p>Your regulars have been coming to you for years. Then a booking platform claims <strong>15&ndash;30%</strong> of every cut &mdash; from clients who already know your name. On top of that, they own the data. The day you leave, your booking history and client contacts leave with them.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>What every barbershop owner deals with</h2>
    <p>Every pain below has a direct fix in Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Booking platform takes 20% per haircut</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Clients book directly &mdash; you keep 100%</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Clients texting to book, no system at all</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Online booking page &mdash; name &amp; phone, no account needed</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">No-shows with no warning</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Auto-reminders 24h and 1h before &mdash; via WhatsApp, Telegram, Email or Viber</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Paper calendar for multiple barbers</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Digital calendar with a column per barber &mdash; no conflicts, ever</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Running out of pomade or product mid-week</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Low-stock alert sent to your phone before you run out</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">No idea who your best clients are</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Full client history &mdash; visits, spend, last seen, preferred barber</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Everything a barbershop needs, nothing it doesn&#39;t</h2>
    <p>Built for the person running the shop, not for enterprise IT teams.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4C5;</div>
        <h4>Multi-barber calendar</h4>
        <p>Each barber gets their own column. See the whole shop at a glance. Drag and drop to reschedule. Walk-ins added in seconds.</p>
        <div class="feat-detail">Conflict protection at database level &mdash; double-booking is impossible</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Point of sale</h4>
        <p>Complete a sale in 3 clicks &mdash; haircut, beard trim, product. Cash, card, transfer. Digital or printed receipt.</p>
        <div class="feat-detail">Works fully offline &mdash; no internet needed at checkout</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>Client CRM</h4>
        <p>Every regular in one place &mdash; visits, services, preferred barber, total spend, birthday, notes.</p>
        <div class="feat-detail">Find any client across your entire base in under 1 second</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Product inventory</h4>
        <p>Track pomades, beard oils, shampoos and any retail product. Log sales, restock entries and write-offs.</p>
        <div class="feat-detail">Auto alert when any item drops below your set minimum</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>Online booking page</h4>
        <p>Public page your clients can find and book from directly. Choose a specific barber or any available one.</p>
        <div class="feat-detail">Name + phone only &mdash; no registration, no app to download</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Works on any device</h4>
        <p>Install as a PWA on your phone or tablet from the browser. Manage bookings from the chair, not just the desk.</p>
        <div class="feat-detail">No App Store, no 30% Apple/Google cut on purchases</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>How your barbershop runs on Pronto</h2>
    <p>From a new client to a loyal regular &mdash; automated from the first cut.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">Client finds your booking page</div>
      <div class="wf-desc">Linked from Instagram, Google Maps or anywhere. Name &amp; phone only &mdash; no signup, no app.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Confirmation sent instantly</div>
      <div class="wf-desc">Auto-confirmation via WhatsApp, Telegram, Email or Viber &mdash; the channel they use.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Reminders go out without you</div>
      <div class="wf-desc">24 hours and 1 hour before. No-shows drop. No manual messages needed.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Checkout and<br>re-engage</div>
      <div class="wf-desc">Close the sale in 3 clicks. Thank-you sent automatically. Client added to CRM forever.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Automated client reminders &mdash; on every channel</h2>
    <p>The only open-source barbershop software with Email, Telegram, WhatsApp and Viber built in &mdash; no plugins, no paid add-ons.</p>
  </div>
  <div class="channel-row">
    <div class="channel"><span class="dot dot-green"></span>Email</div>
    <div class="channel"><span class="dot dot-blue"></span>Telegram</div>
    <div class="channel"><span class="dot dot-green"></span>WhatsApp</div>
    <div class="channel"><span class="dot dot-purple"></span>Viber</div>
    <div class="channel soon"><span class="dot dot-gray"></span>LINE <span class="badge-soon">Coming soon</span></div>
    <div class="channel soon"><span class="dot dot-gray"></span>SMS <span class="badge-soon">Coming soon</span></div>
  </div>
  <div class="cards-wrap">
    <div class="notif-grid">
      <div class="notif-card">
        <div class="ev-emoji">&#x2705;</div>
        <div class="ev-text">Booking confirmed</div>
        <div class="ev-sub">Sent immediately when a client books online or when you add a walk-in manually</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Appointment reminder</div>
        <div class="ev-sub">Automatic reminder 24 hours before and again 1 hour before the visit</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Thank you message</div>
        <div class="ev-sub">Sent 2 hours after the visit ends &mdash; keeps your shop front of mind for the next cut</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Re-activation message</div>
        <div class="ev-sub">&#x201C;Haven&#39;t seen you in 30 days&#x201D; &mdash; brings regulars back before they drift to a competitor</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Birthday greeting</div>
        <div class="ev-sub">Auto-sent on the client&#39;s birthday &mdash; a personal touch from the barber that costs nothing</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Low stock alert</div>
        <div class="ev-sub">Notifies the owner when any product drops below minimum threshold</div>
        <div class="ev-channels">To business owner via any channel</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Why barbershop owners choose Pronto</h2>
    <p>How Pronto compares to typical barbershop booking platforms.</p>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Feature</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Marketplace platforms</div>
      <div class="comp-cell">Subscription SaaS</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Booking commission</div>
      <div class="comp-cell good">$0 always</div>
      <div class="comp-cell bad">15&ndash;30% per booking</div>
      <div class="comp-cell" style="color:#374151">$0 (subscription fee)</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">You own client data</div>
      <div class="comp-cell good">&#x2713; Always yours</div>
      <div class="comp-cell bad">&#x2717; Lives in their platform</div>
      <div class="comp-cell bad">&#x2717; Locked to vendor</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Client registration required</div>
      <div class="comp-cell good">&#x2717; Name + phone only</div>
      <div class="comp-cell bad">&#x2713; Account required</div>
      <div class="comp-cell bad">&#x2713; Account required</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Self-hosted option</div>
      <div class="comp-cell good">&#x2713; Free, MIT license</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">WhatsApp + Telegram built-in</div>
      <div class="comp-cell good">&#x2713; All channels included</div>
      <div class="comp-cell bad">&#x2717; / Paid add-on</div>
      <div class="comp-cell bad">&#x2717; / Paid add-on</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Open source</div>
      <div class="comp-cell good">&#x2713; MIT license</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
  </div>
  <div style="text-align:center;margin-top:24px">
    <div class="badge-row">
      <span class="badge">Barbershops</span>
      <span class="badge">Barber studios</span>
      <span class="badge">Men&#39;s grooming salons</span>
      <span class="badge">Hair salons</span>
      <span class="badge">Beard bars</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Two ways to run Pronto for your barbershop</h2>
    <p>Self-host for full control, or use our cloud and be running in 5 minutes.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Option 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Deploy on your own VPS. Your data never leaves your server. Free forever. Requires Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 forever</strong> &mdash; no subscription, no limits on clients or barbers</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>MIT license</strong> &mdash; modify, extend, white-label freely</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Any server</strong> &mdash; Linux VPS, Windows, macOS. 1 GB RAM minimum</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/for/barbershops'})">View on GitHub &rarr;</a>
      <a href="/docs" class="btn-outline">Documentation &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Option 2</div>
      <h3>Cloud &mdash; trypronto.app</h3>
      <p class="path-desc">No server needed. Get your barbershop&#39;s subdomain in 5 minutes. We handle everything.</p>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Your subdomain</strong> &mdash; kings-barbershop.trypronto.app or custom domain on Pro+</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>We handle updates</strong> &mdash; backups, uptime monitoring, new features automatically</div></div>
      </div>
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/barbershops'})">Start free &mdash; no credit card</a>
    </div>
  </div>

  <div style="height:48px"></div>
  <div style="text-align:center;margin-bottom:22px">
    <p style="font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#0a0a0a">Cloud pricing</p>
  </div>
  <div class="plans">
    <div class="plan">
      <div class="plan-name">Free</div>
      <div class="plan-price">$0</div>
      <span class="plan-trial-free">Free forever</span>
      <div class="plan-limit">1 barber &middot; 100 clients</div>
      <ul class="plan-feats">
        <li>POS + CRM + Inventory</li>
        <li>Email notifications</li>
        <li>Online booking page</li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/mo</span></div>
      <div class="plan-limit">3 barbers &middot; 1 000 clients</div>
      <ul class="plan-feats">
        <li>Telegram &amp; WhatsApp notifications</li>
        <li>Online booking page</li>
      </ul>
    </div>
    <div class="plan featured">
      <div class="plan-popular">Most popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$39<span>/mo</span></div>
      <div class="plan-limit">15 barbers &middot; unlimited</div>
      <ul class="plan-feats">
        <li>Viber notifications</li>
        <li>Analytics <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Soon</span></li>
        <li>Custom domain</li>
        <li>Loyalty program <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Soon</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Agency</div>
      <div class="plan-price">$79<span>/mo</span></div>
      <div class="plan-limit">Multiple locations</div>
      <ul class="plan-feats">
        <li>White-label</li>
        <li>API access <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Soon</span></li>
        <li>Priority support</li>
      </ul>
    </div>
  </div>
  <p class="pricing-note"><a href="/pricing">See full pricing &rarr;</a></p>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Frequently asked questions</h2>
    <div class="faq-item">
      <div class="faq-q">What is the best free barbershop management software?</div>
      <div class="faq-a">Pronto is a free, open-source barbershop management software that includes appointment booking, walk-in support, a multi-barber calendar, POS, client CRM, grooming product inventory and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can barbershop clients book without creating an account?</div>
      <div class="faq-a">No account needed. The public booking page only requires a name and phone number &mdash; no registration, no password, no app to download. This removes friction and increases booking conversion significantly compared to platforms that require clients to sign up.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Does Pronto support both walk-ins and appointments?</div>
      <div class="faq-a">Yes. Barbers can manage pre-booked appointments from the online booking page alongside walk-in clients added manually at any time. The calendar shows all barbers side by side so you always know who is free and what is coming up next.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Is Pronto an alternative to barbershop booking platforms?</div>
      <div class="faq-a">Yes. Unlike marketplace booking platforms that charge 15&ndash;30% per appointment and lock your client data into their ecosystem, Pronto charges zero commission. You own your client database completely. If you ever stop using Pronto, your data is yours to keep. You can also self-host the entire system on your own server with no vendor lock-in of any kind.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do automated appointment reminders work for barbershops?</div>
      <div class="faq-a">Pronto automatically sends a booking confirmation immediately after an appointment is made, a reminder 24 hours before the visit, another reminder 1 hour before, and a thank-you message 2 hours after the visit ends. All messages go via the channel each client prefers: WhatsApp, Telegram, Viber or Email. No manual action required from barbers or the front desk.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I track grooming product inventory in my barbershop?</div>
      <div class="faq-a">Yes. Pronto tracks stock levels for every product &mdash; pomades, beard oils, shampoos, waxes, and anything else you sell or use. When a product drops below your minimum quantity, an automatic alert is sent to the owner via Email, Telegram, WhatsApp or Viber.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Does Pronto work for multi-barber shops?</div>
      <div class="faq-a">Yes. The booking calendar shows each barber as a separate column. Clients can request a specific barber or book with whoever is available first. Appointments are protected against double-booking at the database level &mdash; it is technically impossible to overbook a slot.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do I install Pronto on my own server?</div>
      <div class="faq-a">You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run <code>docker compose up -d</code> and the full barbershop management system starts automatically. No DevOps knowledge required. See the <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documentation on GitHub</a> for step-by-step instructions.</div>
    </div>
  </div>
</section>

<section class="cta-band">
  <h2>Start managing your barbershop for free</h2>
  <p>Cloud setup takes 5 minutes. Self-hosted is one command. Either way &mdash; zero commission, forever.</p>
  <div>
    <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/barbershops'})">Start free &mdash; cloud</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/for/barbershops'})">Self-host on GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-brand">Pronto<span>.</span></div>
  <div class="footer-copy">&copy; 2026 Pronto. All rights reserved.</div>
  <div class="footer-social">
    <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
    <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
    <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
    <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/for/barbershops'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
  </div>
    <!-- FOOTER — keep in sync with all other pages
       ES standard: /es/ · /es/precios · /es/para · /es/para/salones · legal · GitHub
       EN standard: / · /pricing · /for · /for/salons · legal · GitHub -->
  <div class="footer-links">
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
    <a href="/for">For businesses</a>
    <a href="/for/salons">Salons</a>
    <a href="/for/cafes">Cafes</a>
    <a href="/terms">Terms</a>
    <a href="/privacy">Privacy</a>
    <a href="/refund">Refund policy</a>
  </div>
</footer>
`

export default function BarbershopsPage() {
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
