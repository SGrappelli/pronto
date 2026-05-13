import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Tattoo Studio Management Software — Booking, Deposits & CRM | Pronto',
  description:
    'Free tattoo studio management software with appointment booking, deposit tracking, client CRM and automated reminders via WhatsApp, Telegram & Email. Zero commission. Self-hosted or cloud.',
  keywords:
    'tattoo studio management software, tattoo shop booking software, tattoo artist scheduling software, tattoo studio POS, tattoo client management, free tattoo shop software, tattoo appointment software, piercing studio software, tattoo CRM, tattoo studio software no commission, self-hosted tattoo software',
  alternates: { canonical: 'https://trypronto.app/for/tattoo' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/for/tattoo',
    title: 'Free Tattoo Studio Management Software — Booking, Deposits & CRM | Pronto',
    description:
      'Free tattoo studio booking, deposit tracking and client CRM. Clients book without creating an account. Zero commission. Self-hosted or cloud.',
    images: [{ url: 'https://trypronto.app/og-tattoo.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tattoo Studio Management Software — Booking, Deposits & CRM | Pronto',
    description:
      'Free tattoo studio booking, deposit tracking and client CRM. Clients book without creating an account. Zero commission. Self-hosted or cloud.',
    images: ['https://trypronto.app/og-tattoo.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Tattoo Studio Management Software',
  url: 'https://trypronto.app/for/tattoo',
  description:
    'Free open-source tattoo studio management software with appointment booking, deposit tracking, client CRM, supply inventory and omnichannel notifications via Email, Telegram, WhatsApp and Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Tattoo Studio Management Software',
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
    'Tattoo appointment and session booking',
    'Deposit tracking and payment recording',
    'Client CRM with tattoo history and reference images notes',
    'Supply and ink inventory tracking',
    'Automated appointment reminders via Telegram and WhatsApp',
    'Online booking page — no client account required',
    'Multi-artist scheduling and calendar',
    'Revenue analytics per artist',
    'PWA — works offline',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best free tattoo studio management software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto is a free, open-source tattoo studio management software that includes session booking, deposit tracking, a client CRM with full tattoo history, supply inventory, and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can tattoo clients book a session without creating an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account required. The public booking page only needs a name and phone number — no registration, no password, no app to download. Clients request a session in under a minute directly from your Instagram bio, Google listing, or any link you share.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Pronto track deposits for tattoo appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Pronto records deposits as part of each booking through the POS. You can log the deposit amount when the appointment is created, track the remaining balance, and complete the final payment at checkout after the session. All payment history is attached to the client's profile permanently.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do automated reminders work for tattoo appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto automatically sends a booking confirmation when the appointment is created, a reminder 24 hours before the session, another reminder 1 hour before, and a thank-you message 2 hours after the session ends. All messages are sent via the channel the client uses: WhatsApp, Telegram, Viber or Email. No manual follow-up needed from your artists.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track tattoo supply inventory and get low-stock alerts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto tracks every supply in your studio — inks, needles, gloves, transfer paper, aftercare products. When any item drops below the minimum quantity you set, an alert is automatically sent to the studio owner via Email, Telegram, WhatsApp or Viber. You never run a session short on supplies again.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto work for tattoo studios, piercing studios and permanent makeup artists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto is designed for any studio that works by appointment, takes deposits, and builds long-term client relationships. It works for tattoo studios, piercing studios, permanent makeup artists, microblading studios, scarification studios, and any other body art business.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Pronto on my own server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run docker compose up -d and the full tattoo studio management system starts automatically. No DevOps knowledge required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my client data if I cancel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "With the self-hosted version, your data is always on your own server — nothing to cancel or lose. With the cloud version, you can export all client data, tattoo history and payment records at any time. Your client base is yours, not the platform's.",
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
    { '@type': 'ListItem', position: 3, name: 'Tattoo studios', item: 'https://trypronto.app/for/tattoo' },
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
    <a href="/pricing" class="nav-link hide-mob">Pricing</a>
    <a href="/login" class="nav-link">Sign in</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/tattoo',es:'/es/para/tatuajes',pt:'/pt/para/tatuagens'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/for">For businesses</a><span>&rsaquo;</span>
  Tattoo studios
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Tattoo studio management software
    </div>
    <h1>Your studio. <em>Your clients.</em> Zero commission.</h1>
    <p class="hero-sub">Session booking, deposit tracking, client CRM and automated reminders &mdash; for tattoo studios, piercing studios and permanent makeup artists. Self-hosted or cloud.</p>
    <p class="hero-platforms">Generic booking platforms charge <strong>20&ndash;30% commission</strong> on every session booked through your own clients. Pronto charges <strong>$0</strong>.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary">Start free &mdash; no credit card</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline">Self-host for free &rarr;</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Commission on sessions</div>
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
      <h3>The booking platform problem tattoo artists know too well</h3>
      <p>You spent years perfecting your craft and growing a loyal clientele. Then a booking platform inserts itself between you and your clients &mdash; pocketing <strong>20&ndash;30% of every session</strong> while showing your clients competing artists in the same feed. Cancel your account and your entire booking history, client notes, and reference records disappear overnight.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>What tattoo studio owners actually deal with</h2>
    <p>Every frustration below has a direct fix built into Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Booking platform takes 20&ndash;30% per session</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Clients book directly with you &mdash; zero commission, always</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Chasing clients for deposit confirmations over Instagram DMs</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Deposit recorded at booking, auto-reminder sent 24h before &mdash; no chasing</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Client no-shows with no deposit on record</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Confirmation and reminders sent automatically &mdash; no-shows drop significantly</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Running out of a specific ink colour mid-session</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Low-stock alert before you hit zero &mdash; sent to your phone automatically</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">No record of what each client has, their skin notes, or style preferences</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Full client profile &mdash; tattoo history, preferences, spend, birthday, artist notes</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Two artists accidentally booked for the same slot</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Database-level conflict check &mdash; impossible to double-book any artist</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Everything a tattoo studio needs, nothing it doesn&#39;t</h2>
    <p>Built for artists and studio owners &mdash; not for software administrators.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4C5;</div>
        <h4>Session booking calendar</h4>
        <p>Multi-artist week view with drag-and-drop. Clients request sessions online without creating an account or downloading an app.</p>
        <div class="feat-detail">Conflict protection at database level &mdash; no double-bookings possible</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Deposits and payments</h4>
        <p>Record deposits at booking, track outstanding balances, complete final payment at checkout. Full payment history per client.</p>
        <div class="feat-detail">Cash, card, transfer &mdash; all payment methods supported</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>Client profiles</h4>
        <p>Every client has a full record: sessions completed, tattoo placements, artist notes, skin type, reference image notes, total spend, birthday.</p>
        <div class="feat-detail">Search your entire client base in under 1 second</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Supply inventory</h4>
        <p>Track inks, needles, gloves, transfer paper, aftercare products. Get alerted before any critical supply runs out.</p>
        <div class="feat-detail">Low-stock alert via Telegram, WhatsApp, Email or Viber</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>Online booking page</h4>
        <p>A public page where clients can browse your artists and request a session directly. No marketplace showing them competing studios.</p>
        <div class="feat-detail">Name + phone only &mdash; no registration, no app required</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Works on any device</h4>
        <p>Install as a PWA on any phone or tablet from the browser. Manage the studio from the floor, not a front desk.</p>
        <div class="feat-detail">No App Store, no 30% platform cut on purchases</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>How a tattoo studio booking flows in Pronto</h2>
    <p>From first enquiry to repeat client &mdash; every step handled automatically.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">Client finds your booking page</div>
      <div class="wf-desc">Linked from Instagram bio, Google, or a QR code at your station. They pick an artist, request a slot &mdash; name and phone, done.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Deposit confirmed, booking locked</div>
      <div class="wf-desc">Booking confirmation sent instantly via WhatsApp, Telegram, Email or Viber. Deposit logged in the client&#39;s profile.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Reminders go out without you</div>
      <div class="wf-desc">24 hours and 1 hour before the session. No chasing. No no-shows from clients who simply forgot.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Session complete, client stays in your CRM forever</div>
      <div class="wf-desc">Final payment completed at the POS. Thank-you sent automatically. Full session record saved &mdash; tattoo details, artist notes, spend.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Automated client messages &mdash; across every channel</h2>
    <p>The only open-source tattoo studio software with Email, Telegram, WhatsApp and Viber built in natively &mdash; no plugins, no paid add-ons.</p>
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
        <div class="ev-text">Session booking confirmed</div>
        <div class="ev-sub">Sent immediately when a client requests a session online or when you add a booking manually</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Appointment reminder</div>
        <div class="ev-sub">Sent 24 hours before and again 1 hour before the session &mdash; the single biggest reducer of no-shows</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Post-session thank you</div>
        <div class="ev-sub">Sent 2 hours after the session ends &mdash; includes aftercare reminder, keeps your studio top of mind</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Re-engagement message</div>
        <div class="ev-sub">&#x201C;Ready for your next piece?&#x201D; &mdash; sent automatically after 30 days of inactivity from a past client</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Birthday message</div>
        <div class="ev-sub">Auto-sent on the client&#39;s birthday &mdash; a personal touch that keeps loyal clients coming back</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Low stock alert</div>
        <div class="ev-sub">Sent to the studio owner the moment any supply drops below your set minimum</div>
        <div class="ev-channels">To studio owner via any channel</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Why tattoo artists choose Pronto over booking platforms</h2>
    <p>How Pronto compares to the platforms that profit from your clientele.</p>
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
      <div class="comp-cell bad">10&ndash;30% per booking</div>
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
      <span class="badge">Tattoo studios</span>
      <span class="badge">Piercing studios</span>
      <span class="badge">Permanent makeup</span>
      <span class="badge">Microblading</span>
      <span class="badge">Scarification studios</span>
      <span class="badge">Body art studios</span>
      <span class="badge">Flash tattoo artists</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Two ways to run Pronto for your tattoo studio</h2>
    <p>Self-host for complete ownership of your data, or use our cloud and be running in 5 minutes.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Option 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Deploy on your own server. Your client data never leaves your machine. Free forever. Requires Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 forever</strong> &mdash; no subscription, no limits on clients or artists</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>MIT license</strong> &mdash; modify, extend, white-label freely</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Any server</strong> &mdash; Linux VPS, Windows, macOS. 1 GB RAM minimum</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px">View on GitHub &rarr;</a>
      <a href="/docs" class="btn-outline">Documentation &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Option 2</div>
      <h3>Cloud &mdash; trypronto.app</h3>
      <p class="path-desc">No server needed. Get your studio&#39;s subdomain in 5 minutes. We handle updates, backups, and uptime.</p>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Your subdomain</strong> &mdash; inkhouse-studio.trypronto.app or custom domain on Pro+</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>We handle updates</strong> &mdash; backups, uptime monitoring, new features automatically</div></div>
      </div>
      <a href="/register" class="btn-primary">Start free &mdash; no credit card</a>
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
      <div class="plan-limit">1 employee &middot; 100 clients &middot; 50 bookings/month</div>
      <ul class="plan-feats">
        <li>POS + CRM + Inventory</li>
        <li>Email + Telegram + WhatsApp + Viber notifications</li>
        <li>Online booking page</li>
        <li><span style="font-size:11px;color:#9ca3af">&ldquo;Powered by Pronto&rdquo; on booking page</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/mo</span></div>
      <div class="plan-limit">3 employees &middot; unlimited clients &middot; unlimited bookings</div>
      <ul class="plan-feats">
        <li>Everything in Free</li>
        <li>&ldquo;Powered by Pronto&rdquo; badge removed</li>
      </ul>
    </div>
    <div class="plan featured">
      <div class="plan-popular">Most popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$39<span>/mo</span></div>
      <div class="plan-limit">15 employees &middot; unlimited</div>
      <ul class="plan-feats">
        <li>Everything in Starter</li>
        <li>Analytics dashboard <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Coming soon</span></li>
        <li>Custom domain <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Coming soon</span></li>
        <li>Loyalty program <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Coming soon</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Agency</div>
      <div class="plan-price">$79<span>/mo</span></div>
      <div class="plan-limit">Multiple locations</div>
      <ul class="plan-feats">
        <li>Everything in Pro</li>
        <li>White-label <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Coming soon</span></li>
        <li>API access <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Coming soon</span></li>
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
      <div class="faq-q">What is the best free tattoo studio management software?</div>
      <div class="faq-a">Pronto is a free, open-source tattoo studio management software that includes session booking, deposit tracking, a client CRM with full tattoo history, supply inventory, and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can tattoo clients book a session without creating an account?</div>
      <div class="faq-a">No account required. The public booking page only needs a name and phone number &mdash; no registration, no password, no app to download. Clients request a session in under a minute directly from your Instagram bio, Google listing, or any link you share.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can Pronto track deposits for tattoo appointments?</div>
      <div class="faq-a">Yes. Pronto records deposits as part of each booking through the POS. You can log the deposit amount when the appointment is created, track the remaining balance, and complete the final payment at checkout after the session. All payment history is attached to the client&#39;s profile permanently.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do automated reminders work for tattoo appointments?</div>
      <div class="faq-a">Pronto automatically sends a booking confirmation when the appointment is created, a reminder 24 hours before the session, another reminder 1 hour before, and a thank-you message 2 hours after the session ends. All messages are sent via the channel the client uses: WhatsApp, Telegram, Viber or Email. No manual follow-up needed from your artists.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I track tattoo supply inventory and get low-stock alerts?</div>
      <div class="faq-a">Yes. Pronto tracks every supply in your studio &mdash; inks, needles, gloves, transfer paper, aftercare products. When any item drops below the minimum quantity you set, an alert is automatically sent to the studio owner via Email, Telegram, WhatsApp or Viber. You never run a session short on supplies again.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Does Pronto work for tattoo studios, piercing studios and permanent makeup artists?</div>
      <div class="faq-a">Yes. Pronto is designed for any studio that works by appointment, takes deposits, and builds long-term client relationships. It works for tattoo studios, piercing studios, permanent makeup artists, microblading studios, scarification studios, and any other body art business.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do I install Pronto on my own server?</div>
      <div class="faq-a">You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run <code>docker compose up -d</code> and the full tattoo studio management system starts automatically. No DevOps knowledge required. See the <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documentation on GitHub</a> for step-by-step instructions.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">What happens to my client data if I cancel?</div>
      <div class="faq-a">With the self-hosted version, your data is always on your own server &mdash; nothing to cancel or lose. With the cloud version, you can export all client data, tattoo history and payment records at any time. Your client base is yours, not the platform&#39;s.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Also works great for</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/for/salons" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">💇 Salons &amp; beauty</a>
    <a href="/for/barbershops" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">✂️ Barbershops</a>
    <a href="/for/spa" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🧖 Massage &amp; spa</a>
    <a href="/for" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">View all →</a>
  </div>
</section>

<section class="cta-band">
  <h2>Start managing your tattoo studio for free</h2>
  <p>Cloud setup takes 5 minutes. Self-hosted is one command. Either way &mdash; zero commission on every session, forever.</p>
  <div>
    <a href="/register" class="btn-cta-white">Start free &mdash; cloud</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline">Self-host on GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-brand">Pronto<span>.</span></div>
  <div class="footer-copy">&copy; 2026 Pronto. All rights reserved.</div>
  <div class="footer-social">
    <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
    <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
    <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
    <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
  </div>
    <!-- FOOTER — keep in sync with all other pages
       ES standard: /es/ · /es/precios · /es/para · /es/para/salones · legal · GitHub
       EN standard: / · /pricing · /for · /for/salons · legal · GitHub -->
  <div class="footer-links">
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
    <a href="/for">For businesses</a>
    <a href="/for/salons">Salons</a>
    <a href="/for/barbershops">Barbershops</a>
    <a href="/for/spa">Massage &amp; spa</a>
    <a href="/terms">Terms</a>
    <a href="/privacy">Privacy</a>
    <a href="/refund">Refund policy</a>
  </div>
</footer>
`

export default function TattooPage() {
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
