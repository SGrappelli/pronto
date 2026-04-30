import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Auto Repair Shop Software — Bookings, POS & CRM | Pronto',
  description:
    'Free auto repair shop management software with service order tracking, appointment booking, parts inventory and automated client notifications via WhatsApp, Telegram & Email. Zero commission. Self-hosted or cloud.',
  keywords:
    'auto repair shop software, auto repair management software, auto repair shop POS, car repair shop booking software, auto repair CRM, free auto repair software, mechanic shop software, garage management software, auto shop software no commission, self-hosted auto repair software',
  alternates: { canonical: 'https://trypronto.app/for/auto-repair' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/for/auto-repair',
    title: 'Free Auto Repair Shop Software — Bookings, POS & CRM | Pronto',
    description:
      'Free auto repair shop POS, service order tracking and CRM. Clients book without creating an account. Zero commission. Self-hosted or cloud.',
    images: [{ url: 'https://trypronto.app/og-auto-repair.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Auto Repair Shop Software — Bookings, POS & CRM | Pronto',
    description:
      'Free auto repair shop POS, service order tracking and CRM. Zero commission. Clients book without an account.',
    images: ['https://trypronto.app/og-auto-repair.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Auto Repair Shop Software',
  url: 'https://trypronto.app/for/auto-repair',
  description:
    'Free open-source auto repair shop management software with service order tracking, appointment booking, parts inventory, client CRM and omnichannel notifications via Email, Telegram, WhatsApp and Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Auto Repair Shop Software',
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
    'Auto repair appointment booking',
    'Service order (job card) tracking',
    'Parts and materials inventory',
    'Auto repair shop POS system',
    'Client CRM with vehicle and service history',
    'Automated service status notifications via Telegram and WhatsApp',
    'Online booking page — no client account required',
    'Low-stock alerts for parts',
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
      name: 'What is the best free auto repair shop management software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto is a free, open-source auto repair shop management software that includes service order tracking, appointment booking, parts inventory, client CRM and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can clients book a service appointment without creating an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The public booking page only requires a name and phone number — no registration, no password, no app to download. Clients pick a time slot, describe the issue briefly, and the booking appears in your calendar instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Pronto handle service orders for auto repair shops?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each appointment can be converted into a service order (job card) that tracks the vehicle, the work performed, parts used, labor time and total cost. When the job is complete, the client receives an automatic notification via WhatsApp, Telegram, Viber or Email.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Pronto send clients a message when their car is ready?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto sends automated notifications at key moments: booking confirmation, appointment reminder 24 hours before, and a ready-for-pickup message when the job is marked complete. All messages go via the channel the client prefers — WhatsApp, Telegram, Viber or Email. No manual texting needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track parts inventory and get low-stock alerts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto tracks stock levels for every part and material in your shop. When any item drops below your minimum quantity, an automatic alert is sent to the owner via Email, Telegram, WhatsApp or Viber — before you run out mid-job.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto store vehicle history per client?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Each client record stores their full service history — every visit, every job performed, parts replaced, total spend and notes. You can pull up a returning client\'s vehicle history in under a second.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Pronto an alternative to auto repair shop booking platforms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Unlike marketplace platforms that charge commissions and lock your client data in their ecosystem, Pronto charges zero commission. You own your client and vehicle database completely. You can also self-host the entire system on your own server with no vendor lock-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Pronto on my own server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run docker compose up -d and the full auto repair management system starts automatically. No DevOps knowledge required.',
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
    { '@type': 'ListItem', position: 3, name: 'Auto repair', item: 'https://trypronto.app/for/auto-repair' },
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
.btn-nav{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:10px 22px;border-radius:8px;border:none;cursor:pointer;text-decoration:none}

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
  .nav-right{gap:12px}
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
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link">Pricing</a>
    <a href="/login" class="nav-link">Sign in</a>
    <a href="/register" class="btn-nav">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/for">For businesses</a><span>&rsaquo;</span>
  Auto repair
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Auto repair shop software
    </div>
    <h1>Your shop. <em>Your clients.</em> Zero commission.</h1>
    <p class="hero-sub">Free service order tracking, appointment booking, parts inventory and automated client notifications &mdash; for auto repair shops, garages and mechanic workshops. Self-hosted or cloud.</p>
    <p class="hero-platforms">Clients call to check if their car is ready. Manual texts to remind about appointments. Parts running out mid-job. Pronto fixes all of that &mdash; for <strong>$0</strong>.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary">Start free &mdash; no credit card</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline">Self-host for free &rarr;</a>
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
      <h3>Running a repair shop on phone calls and paper</h3>
      <p>Most auto repair shops still run on paper job cards, phone calls to update clients and a mental map of what&#39;s in stock. It works until it doesn&#39;t &mdash; a missed call, a part you thought you had, a client who never came back because nobody followed up. There&#39;s no excuse for that in 2026.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>What every auto repair shop owner deals with</h2>
    <p>Every pain below has a direct fix in Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Clients calling to book, no online option</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Online booking page &mdash; pick a slot, describe the issue, done</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Clients calling to ask if their car is ready</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Auto notification sent the moment the job is marked complete</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Paper job cards you can&#39;t search or filter</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Digital service orders with full vehicle and job history per client</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Running out of parts mid-job</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Low-stock alert before you hit zero &mdash; sent to your phone</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">No record of what was done to a returning client&#39;s car</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Full vehicle history per client &mdash; every job, every part, every cost</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Clients who never came back after one visit</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Re-activation message sent automatically after 30 days of silence</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Everything an auto repair shop needs, nothing it doesn&#39;t</h2>
    <p>Built for the mechanic running the shop, not for enterprise IT teams.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F527;</div>
        <h4>Service order tracking</h4>
        <p>Turn every booking into a job card. Log the vehicle, work performed, parts used and labor. Mark complete and notify the client instantly.</p>
        <div class="feat-detail">Full job history per vehicle &mdash; every visit, every part ever replaced</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Point of sale</h4>
        <p>Invoice the client in 3 clicks &mdash; parts, labor, taxes. Cash, card, transfer. Print or send a digital receipt.</p>
        <div class="feat-detail">Works fully offline &mdash; no internet needed at the counter</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>Client &amp; vehicle CRM</h4>
        <p>Every client and their car in one place &mdash; make, model, mileage history, jobs performed, total spend, notes.</p>
        <div class="feat-detail">Find any client or vehicle record in under 1 second</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Parts inventory</h4>
        <p>Track every part, fluid and consumable in stock. Log incoming deliveries and usage per job. Never run out mid-repair.</p>
        <div class="feat-detail">Auto alert when any part drops below your minimum threshold</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>Online booking page</h4>
        <p>Clients book a drop-off slot directly from your booking link. No account, no app &mdash; just name, phone and what&#39;s wrong.</p>
        <div class="feat-detail">Share the link on Google Maps, Instagram, WhatsApp &mdash; anywhere</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Works on any device</h4>
        <p>Install as a PWA on any phone or tablet from the browser. Check the job queue from the garage floor.</p>
        <div class="feat-detail">No App Store, no 30% Apple/Google cut on purchases</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>How your auto repair shop runs on Pronto</h2>
    <p>From drop-off to pickup &mdash; without a single manual call or text.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">Client books a drop-off slot</div>
      <div class="wf-desc">Online booking page linked from Google Maps or anywhere. Name, phone, brief description of the issue. No account needed.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Job card created automatically</div>
      <div class="wf-desc">Booking converts to a service order. Log parts, labor and notes as the job progresses.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Client notified when car is ready</div>
      <div class="wf-desc">Mark the job complete &mdash; notification fires automatically via WhatsApp, Telegram, Email or Viber. No phone call needed.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Invoice, payment and<br>follow-up</div>
      <div class="wf-desc">Complete the sale in 3 clicks. Thank-you sent automatically. Client and vehicle added to CRM forever.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Automated client reminders &mdash; on every channel</h2>
    <p>The only open-source auto repair software with Email, Telegram, WhatsApp and Viber built in &mdash; no plugins, no paid add-ons.</p>
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
        <div class="ev-sub">Sent immediately when client books a drop-off slot online or when you add a booking manually</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Drop-off reminder</div>
        <div class="ev-sub">Automatic reminder 24 hours before and again 1 hour before the scheduled drop-off</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Car is ready</div>
        <div class="ev-sub">Sent the moment you mark the job complete &mdash; client knows to come pick up without calling</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Re-activation message</div>
        <div class="ev-sub">&#x201C;Haven&#39;t seen your car in 6 months&#x201D; &mdash; brings clients back for routine maintenance automatically</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Birthday greeting</div>
        <div class="ev-sub">Auto-sent on the client&#39;s birthday &mdash; a personal touch that keeps your shop top of mind</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Low stock alert</div>
        <div class="ev-sub">Notifies the owner when any part or material drops below the minimum threshold you set</div>
        <div class="ev-channels">To business owner via any channel</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Why auto repair shop owners choose Pronto</h2>
    <p>How Pronto compares to typical auto repair management software.</p>
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
      <div class="comp-cell bad">Varies / subscription</div>
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
      <span class="badge">Auto repair shops</span>
      <span class="badge">Mechanic workshops</span>
      <span class="badge">Car garages</span>
      <span class="badge">Tire shops</span>
      <span class="badge">Body shops</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Two ways to run Pronto for your auto repair shop</h2>
    <p>Self-host for full control, or use our cloud and be running in 5 minutes.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Option 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Deploy on your own VPS. Your data never leaves your server. Free forever. Requires Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 forever</strong> &mdash; no subscription, no limits on clients or vehicles</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>MIT license</strong> &mdash; modify, extend, white-label freely</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Any server</strong> &mdash; Linux VPS, Windows, macOS. 1 GB RAM minimum</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px">View on GitHub &rarr;</a>
      <a href="/docs" class="btn-outline">Documentation &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Option 2</div>
      <h3>Cloud &mdash; trypronto.app</h3>
      <p class="path-desc">No server needed. Get your shop&#39;s subdomain in 5 minutes. We handle everything.</p>
      <div class="trial-banner">
        <div class="trial-big">14 days free</div>
        <div>
          <div class="trial-text">Try any paid plan free for 14 days.</div>
          <div class="trial-note">No credit card required. Cancel anytime.</div>
        </div>
      </div>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Your subdomain</strong> &mdash; joes-autorepair.trypronto.app or custom domain on Pro+</div></div>
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
      <div class="plan-limit">1 mechanic &middot; 100 clients</div>
      <ul class="plan-feats">
        <li>POS + CRM + Inventory</li>
        <li>Email notifications</li>
        <li>Online booking page</li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/mo</span></div>
      <div class="plan-trial">14-day free trial</div>
      <div class="plan-limit">3 mechanics &middot; 1 000 clients</div>
      <ul class="plan-feats">
        <li>Telegram &amp; WhatsApp notifications</li>
        <li>Online booking page</li>
      </ul>
    </div>
    <div class="plan featured">
      <div class="plan-popular">Most popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$39<span>/mo</span></div>
      <div class="plan-trial">14-day free trial</div>
      <div class="plan-limit">15 mechanics &middot; unlimited</div>
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
      <div class="plan-trial">14-day free trial</div>
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
      <div class="faq-q">What is the best free auto repair shop management software?</div>
      <div class="faq-a">Pronto is a free, open-source auto repair shop management software that includes service order tracking, appointment booking, parts inventory, client CRM and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can clients book a service appointment without creating an account?</div>
      <div class="faq-a">Yes. The public booking page only requires a name and phone number &mdash; no registration, no password, no app to download. Clients pick a time slot, describe the issue briefly, and the booking appears in your calendar instantly.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How does Pronto handle service orders for auto repair shops?</div>
      <div class="faq-a">Each appointment can be converted into a service order (job card) that tracks the vehicle, the work performed, parts used, labor time and total cost. When the job is complete, the client receives an automatic notification via WhatsApp, Telegram, Viber or Email.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can Pronto send clients a message when their car is ready?</div>
      <div class="faq-a">Yes. Pronto sends automated notifications at key moments: booking confirmation, appointment reminder 24 hours before, and a ready-for-pickup message when the job is marked complete. All messages go via the channel the client prefers &mdash; WhatsApp, Telegram, Viber or Email. No manual texting needed.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I track parts inventory and get low-stock alerts?</div>
      <div class="faq-a">Yes. Pronto tracks stock levels for every part and material in your shop. When any item drops below your minimum quantity, an automatic alert is sent to the owner via Email, Telegram, WhatsApp or Viber &mdash; before you run out mid-job.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Does Pronto store vehicle history per client?</div>
      <div class="faq-a">Yes. Each client record stores their full service history &mdash; every visit, every job performed, parts replaced, total spend and notes. You can pull up a returning client&#39;s vehicle history in under a second.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Is Pronto an alternative to auto repair shop booking platforms?</div>
      <div class="faq-a">Yes. Unlike marketplace platforms that charge commissions and lock your client data in their ecosystem, Pronto charges zero commission. You own your client and vehicle database completely. You can also self-host the entire system on your own server with no vendor lock-in.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do I install Pronto on my own server?</div>
      <div class="faq-a">You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run <code>docker compose up -d</code> and the full auto repair management system starts automatically. No DevOps knowledge required.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Also works great for</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/for/cafes" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">☕ Cafes</a>
    <a href="/for/dental" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🦷 Dental clinics</a>
    <a href="/for/fitness" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🏋️ Fitness clubs</a>
    <a href="/for" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">View all →</a>
  </div>
</section>

<section class="cta-band">
  <h2>Start managing your auto repair shop for free</h2>
  <p>Cloud setup takes 5 minutes. Self-hosted is one command. Either way &mdash; zero commission, forever.</p>
  <div>
    <a href="/register" class="btn-cta-white">Start free &mdash; cloud</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline">Self-host on GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-brand">Pronto<span>.</span></div>
  <div class="footer-copy">&copy; 2026 Pronto. All rights reserved.</div>
    <!-- FOOTER — keep in sync with all other pages
       ES standard: /es/ · /es/precios · /es/para · /es/para/salones · legal · GitHub
       EN standard: / · /pricing · /for · /for/salons · legal · GitHub -->
  <div class="footer-links">
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
    <a href="/for">For businesses</a>
    <a href="/for/cafes">Cafes</a>
    <a href="/for/dental">Dental clinics</a>
    <a href="/for/fitness">Fitness clubs</a>
    <a href="/terms">Terms</a>
    <a href="/privacy">Privacy</a>
    <a href="/refund">Refund policy</a>
    <a href="https://github.com/SGrappelli/pronto">GitHub</a>
  </div>
</footer>
`

export default function AutoRepairPage() {
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
