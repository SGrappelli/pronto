import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Cafe Management Software — POS, Orders & CRM | Pronto',
  description:
    'Free cafe management software with fast POS, order tracking, inventory and automated customer messages via WhatsApp, Telegram & Email. Zero commission. Self-hosted or cloud.',
  keywords:
    'cafe management software, cafe POS system free, coffee shop POS software, cafe ordering software, small cafe software, coffee shop management system, cafe CRM, free cafe software, bakery POS software, cafe inventory management, self-hosted cafe software',
  alternates: {
    canonical: 'https://trypronto.app/for/cafes',
    languages: {
      en: 'https://trypronto.app/for/cafes',
      es: 'https://trypronto.app/es/para/cafeteria',
      'pt-BR': 'https://trypronto.app/pt/para/cafeteria',
      'x-default': 'https://trypronto.app/for/cafes',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/for/cafes',
    title: 'Free Cafe Management Software — POS, Orders & CRM | Pronto',
    description:
      'Free cafe POS, order tracking and customer CRM. Fast checkout, inventory alerts, loyalty built in. Zero commission. Self-hosted or cloud.',
    images: [{ url: 'https://trypronto.app/og-cafes.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cafe Management Software — POS, Orders & CRM | Pronto',
    description:
      'Free cafe POS, order tracking and customer CRM. Fast checkout, inventory alerts, loyalty built in. Zero commission. Self-hosted or cloud.',
    images: ['https://trypronto.app/og-cafes.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Cafe Management Software',
  url: 'https://trypronto.app/for/cafes',
  description:
    'Free open-source cafe management software with fast POS, order tracking, customer CRM, ingredient inventory and omnichannel notifications via Email, Telegram, WhatsApp and Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Cafe Management Software',
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
    'Fast cafe POS for dine-in and takeaway',
    'Customer CRM with order history',
    'Ingredient and product inventory tracking',
    'Low-stock alerts for coffee, milk and supplies',
    'Automated customer notifications via Telegram and WhatsApp',
    'Online pre-ordering page — no customer account required',
    'Staff scheduling',
    'Revenue and bestseller analytics',
    'PWA — works offline at the counter',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best free cafe management software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto is a free, open-source cafe management software that includes a fast POS, customer CRM, ingredient inventory tracking, and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto work offline at the cafe counter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto installs as a PWA directly from the browser and works fully offline using IndexedDB. Transactions completed without internet are saved locally and synced automatically when the connection is restored. No internet outage will stop your cafe from taking orders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Pronto replace a traditional cafe POS system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto handles everything a traditional POS does — fast item selection, discounts, multiple payment methods, digital receipts — plus adds a full customer CRM, inventory tracking, and automatic notifications that most POS systems charge extra for. It runs on any tablet or desktop without dedicated hardware.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do low-stock alerts work for cafe ingredients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto tracks every ingredient and supply in your cafe. When coffee beans, milk, cups or any other item drops below the minimum quantity you set, an alert is sent automatically to the cafe owner via Email, Telegram, WhatsApp or Viber. You never run out of a critical ingredient without warning again.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can customers pre-order or book a table without creating an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The public booking page only requires a name and phone number — no registration, no password, no app to download. Customers can place a pre-order or reserve a spot in seconds, directly from your Instagram bio or Google listing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto work for coffee shops, bakeries and small restaurants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto is built for any business that sells products and services at a counter or by appointment. It works for independent coffee shops, cafes, bakeries, juice bars, dessert shops, brunch spots, and any other food and beverage business that needs a fast POS and customer tracking.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Pronto on my own server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run docker compose up -d and the full cafe management system starts automatically. No DevOps knowledge required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my customer data if I cancel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "With the self-hosted version, your data is always on your own server — nothing to cancel or lose. With the cloud version, you can export all customer data and order history at any time. Your regulars database is yours, not the platform's.",
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
    { '@type': 'ListItem', position: 3, name: 'Cafes', item: 'https://trypronto.app/for/cafes' },
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
  footer{padding:48px 24px}
  .breadcrumb{padding:14px 24px}
  .feat-grid,.pain-grid,.notif-grid{grid-template-columns:repeat(2,1fr)}
  .two-paths{grid-template-columns:1fr}
  .plans{grid-template-columns:repeat(2,1fr)}
  .workflow{grid-template-columns:repeat(2,1fr)}
  .comp-row{grid-template-columns:2fr 1fr 1fr 1fr}
  .cta-band{padding:52px 24px}
}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr;gap:24px}}
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
  footer{padding:32px 16px}
  .footer-top{grid-template-columns:1fr;gap:28px}
  .footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}
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
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/cafes',es:'/es/para/cafeteria',pt:'/pt/para/cafeteria'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/for">For businesses</a><span>&rsaquo;</span>
  Cafes
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Cafe management software
    </div>
    <h1>Your cafe. <em>Your regulars.</em> Zero commission.</h1>
    <p class="hero-sub">Fast POS, customer CRM, ingredient inventory and automated order notifications &mdash; for independent coffee shops, cafes, bakeries and juice bars. Self-hosted or cloud.</p>
    <p class="hero-platforms">Traditional POS systems charge <strong>monthly fees plus hardware costs</strong> and lock your customer data in their cloud. Pronto costs <strong>$0</strong> and your data stays yours.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary">Start free &mdash; no credit card</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline">Self-host for free &rarr;</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Commission on orders</div>
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
      <h3>The cafe software trap that eats into your margins</h3>
      <p>You spend years building a loyal base of regulars. Then your POS vendor raises prices, locks you into proprietary hardware, and owns every transaction record you&#39;ve ever made. Switch providers and you start from zero &mdash; no order history, no customer profiles, no insight into what actually sells.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>What independent cafe owners deal with every day</h2>
    <p>Every friction point below has a direct fix in Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">POS vendor raises fees every year</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Free forever on self-hosted &mdash; no surprise price increases</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Running out of oat milk or coffee beans mid-morning rush</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Low-stock alert to your phone before you run out</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">No idea which drinks or dishes actually sell best</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Revenue dashboard showing bestsellers, peak hours and daily totals</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Customer data locked in the POS vendor&#39;s system</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Full customer history on your server &mdash; export anytime, own it forever</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Internet goes down, counter grinds to a halt</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Offline POS via PWA &mdash; takes orders with no internet, syncs when back online</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Expensive proprietary POS hardware required</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Runs on any tablet, laptop or desktop you already own</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Everything a cafe needs at the counter and behind it</h2>
    <p>Fast enough for rush hour, deep enough for the owner who wants real data.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x26A1;</div>
        <h4>Fast counter POS</h4>
        <p>Tap an item, choose size or variant, take payment. A full transaction in under 10 seconds. Cash, card, or transfer.</p>
        <div class="feat-detail">Works offline &mdash; internet outage won&#39;t stop your queue</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Ingredient inventory</h4>
        <p>Track coffee beans, milk, cups, syrups, pastries. Log deliveries and consumption. Get alerted before you run out.</p>
        <div class="feat-detail">Low-stock alert via Telegram, WhatsApp, Email or Viber</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>Customer profiles</h4>
        <p>Every regular has a profile: favourite orders, total spend, visit frequency, birthday, notes from your staff.</p>
        <div class="feat-detail">Recognize your regulars by name, not just by face</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4CA;</div>
        <h4>Sales analytics</h4>
        <p>Daily revenue, bestselling items, busiest hours, average order value. Know your cafe&#39;s numbers without a spreadsheet.</p>
        <div class="feat-detail">Data stays on your server &mdash; no third party sees your sales</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>Online pre-ordering</h4>
        <p>A public page where customers order ahead or book a table. Linked from Instagram or Google. No third-party fees.</p>
        <div class="feat-detail">Name + phone only &mdash; no registration, no app needed</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Runs on any device</h4>
        <p>Install as a PWA on any tablet or phone from the browser. No dedicated POS hardware required.</p>
        <div class="feat-detail">Works on iPad, Android tablet, or any laptop you already have</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>How a busy cafe shift flows in Pronto</h2>
    <p>From the morning rush to closing time &mdash; every part runs smoother.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">Customer orders at the counter</div>
      <div class="wf-desc">Staff completes the sale in under 10 seconds. Customer profile created automatically on first visit.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Inventory updated instantly</div>
      <div class="wf-desc">Every sale deducts from ingredient stock. Pronto tracks what you&#39;re burning through in real time.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Low-stock alert before you run out</div>
      <div class="wf-desc">When oat milk drops to your minimum, an alert goes straight to your phone. No surprises mid-rush.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Regulars come back on their own</div>
      <div class="wf-desc">Birthday messages, re-engagement nudges and loyalty perks go out automatically. No manual effort from your team.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Automated customer messages &mdash; on every channel</h2>
    <p>The only open-source cafe software with Email, Telegram, WhatsApp and Viber built in natively &mdash; no plugins, no paid add-ons.</p>
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
        <div class="ev-text">Order confirmed</div>
        <div class="ev-sub">Sent immediately when a customer pre-orders online or when your team logs a booking manually</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Ready for pickup reminder</div>
        <div class="ev-sub">Notify customers automatically when their pre-order is ready &mdash; no shouting across the room</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Thank you message</div>
        <div class="ev-sub">Sent after a visit to keep your cafe front of mind and invite the customer back</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Win-back message</div>
        <div class="ev-sub">&#x201C;We miss you&#x201D; &mdash; sent automatically after 30 days without a visit from a regular</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Birthday message</div>
        <div class="ev-sub">A personal note on the customer&#39;s birthday &mdash; the kind of touch that turns visitors into regulars</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Low stock alert</div>
        <div class="ev-sub">Sent to the owner the moment any ingredient or product drops below your set minimum</div>
        <div class="ev-channels">To business owner via any channel</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Why cafe owners choose Pronto over traditional POS systems</h2>
    <p>How Pronto compares to the POS software most cafes are currently paying for.</p>
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
      <span class="badge">Coffee shops</span>
      <span class="badge">Independent cafes</span>
      <span class="badge">Bakeries</span>
      <span class="badge">Juice bars</span>
      <span class="badge">Dessert shops</span>
      <span class="badge">Brunch spots</span>
      <span class="badge">Tea rooms</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Two ways to run Pronto in your cafe</h2>
    <p>Self-host on any machine you own, or use our cloud and be serving customers in minutes.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Option 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Deploy on your own machine or VPS. Your data never leaves your premises. Free forever. Requires Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 forever</strong> &mdash; no subscription, no limits on items, customers or staff</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>MIT license</strong> &mdash; modify, extend, white-label freely</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Any server</strong> &mdash; Linux VPS, Windows, macOS. 1 GB RAM minimum</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px">View on GitHub &rarr;</a>
      <a href="/docs" class="btn-outline">Documentation &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Option 2</div>
      <h3>Cloud &mdash; trypronto.app</h3>
      <p class="path-desc">No server needed. Your cafe&#39;s subdomain is ready in 5 minutes. We handle updates, backups, and uptime.</p>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Your subdomain</strong> &mdash; coffee-bloom.trypronto.app or custom domain on Pro+</div></div>
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
      <div class="faq-q">What is the best free cafe management software?</div>
      <div class="faq-a">Pronto is a free, open-source cafe management software that includes a fast POS, customer CRM, ingredient inventory tracking, and automated notifications via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Does Pronto work offline at the cafe counter?</div>
      <div class="faq-a">Yes. Pronto installs as a PWA directly from the browser and works fully offline using IndexedDB. Transactions completed without internet are saved locally and synced automatically when the connection is restored. No internet outage will stop your cafe from taking orders.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can Pronto replace a traditional cafe POS system?</div>
      <div class="faq-a">Yes. Pronto handles everything a traditional POS does &mdash; fast item selection, discounts, multiple payment methods, digital receipts &mdash; plus adds a full customer CRM, inventory tracking, and automatic notifications that most POS systems charge extra for. It runs on any tablet or desktop without dedicated hardware.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do low-stock alerts work for cafe ingredients?</div>
      <div class="faq-a">Pronto tracks every ingredient and supply in your cafe. When coffee beans, milk, cups or any other item drops below the minimum quantity you set, an alert is sent automatically to the cafe owner via Email, Telegram, WhatsApp or Viber. You never run out of a critical ingredient without warning again.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can customers pre-order or book a table without creating an account?</div>
      <div class="faq-a">Yes. The public booking page only requires a name and phone number &mdash; no registration, no password, no app to download. Customers can place a pre-order or reserve a spot in seconds, directly from your Instagram bio or Google listing.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Does Pronto work for coffee shops, bakeries and small restaurants?</div>
      <div class="faq-a">Yes. Pronto is built for any business that sells products and services at a counter or by appointment. It works for independent coffee shops, cafes, bakeries, juice bars, dessert shops, brunch spots, and any other food and beverage business that needs a fast POS and customer tracking.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do I install Pronto on my own server?</div>
      <div class="faq-a">You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run <code>docker compose up -d</code> and the full cafe management system starts automatically. No DevOps knowledge required. See the <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documentation on GitHub</a> for step-by-step instructions.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">What happens to my customer data if I cancel?</div>
      <div class="faq-a">With the self-hosted version, your data is always on your own server &mdash; nothing to cancel or lose. With the cloud version, you can export all customer data and order history at any time. Your regulars database is yours, not the platform&#39;s.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Also works great for</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/for/auto-repair" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🔧 Auto repair</a>
    <a href="/for/dental" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🦷 Dental clinics</a>
    <a href="/for/fitness" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🏋️ Fitness clubs</a>
    <a href="/for" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">View all →</a>
  </div>
</section>

<section class="cta-band">
  <h2>Start managing your cafe for free</h2>
  <p>Cloud setup takes 5 minutes. Self-hosted runs on any machine you already own. Either way &mdash; no monthly POS fees, forever.</p>
  <div>
    <a href="/register" class="btn-cta-white">Start free &mdash; cloud</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline">Self-host on GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Your data, your server.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">For businesses</div>
      <a href="/for">All businesses</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Compare</div>
      <a href="/vs">All comparisons</a>
      <a href="/vs/fresha">vs Fresha</a>
      <a href="/vs/vagaro">vs Vagaro</a>
      <a href="/vs/square">vs Square</a>
      <a href="/vs/booksy">vs Booksy</a>
      <a href="/vs/mindbody">vs Mindbody</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Legal</div>
      <a href="/terms">Terms of Service</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/refund">Refund Policy</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">&copy; 2026 Pronto. All rights reserved.</div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/for/cafes'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/for/cafes'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/for/cafes'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/for/cafes'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function CafesPage() {
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
