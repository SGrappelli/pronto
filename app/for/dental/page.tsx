import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Dental Clinic Software — Appointments, POS & Patient CRM | Pronto',
  description:
    'Free dental clinic management software with appointment scheduling, patient CRM, treatment history and automated reminders via WhatsApp, Telegram & Email. No per-seat fees. Self-hosted or cloud.',
  keywords:
    'dental clinic software, dental appointment scheduling software, dental practice management software, free dental software, dentist booking software, dental office management software, dental CRM, dental clinic software no subscription, self-hosted dental software, dental patient management',
  alternates: { canonical: 'https://trypronto.app/for/dental' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/for/dental',
    title: 'Free Dental Clinic Software — Appointments, POS & Patient CRM | Pronto',
    description:
      'Free dental appointment scheduling, patient CRM and automated reminders. No commission, no per-seat fees. Self-hosted or cloud.',
    images: [{ url: 'https://trypronto.app/og-dental.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Dental Clinic Software — Appointments, POS & Patient CRM | Pronto',
    description:
      'Free dental appointment scheduling, patient CRM and automated reminders. No commission, no per-seat fees. Self-hosted or cloud.',
    images: ['https://trypronto.app/og-dental.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Dental Clinic Software',
  url: 'https://trypronto.app/for/dental',
  description:
    'Free open-source dental clinic management software with appointment scheduling, patient CRM, treatment history, dental supplies inventory and automated reminders via Email, Telegram, WhatsApp and Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Dental Practice Management Software',
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
    'Dental appointment scheduling',
    'Patient CRM with treatment history',
    'Multi-dentist calendar',
    'Dental clinic POS and invoicing',
    'Dental supplies inventory tracking',
    'Automated appointment reminders via WhatsApp and Telegram',
    'Online booking page — no patient account required',
    'Low-stock alerts for dental supplies',
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
      name: 'What is the best free dental clinic management software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto is a free, open-source dental clinic management software that includes appointment scheduling, a multi-dentist calendar, patient CRM with full treatment history, dental supplies inventory and automated reminders via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month — with no per-seat fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can patients book a dental appointment without creating an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The public booking page only requires a name and phone number — no registration, no password, no app to download. Patients pick a time slot and the appointment appears in your calendar instantly. This significantly reduces the friction that causes patients to abandon the booking process.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Pronto reduce no-shows at dental clinics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto automatically sends a booking confirmation immediately after scheduling, a reminder 24 hours before the appointment and another reminder 1 hour before. All messages go via the channel the patient prefers — WhatsApp, Telegram, Viber or Email. Dental no-shows typically drop significantly once automated reminders are in place.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto store patient treatment history?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Each patient record stores their full visit and treatment history — every appointment, procedures performed, payments made, notes and next recommended visit. You can pull up a returning patient\'s complete history in under a second.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Pronto manage multiple dentists and treatment rooms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The appointment calendar shows each dentist as a separate column so you see the full clinic schedule at a glance. Bookings are protected against double-booking at the database level — it is technically impossible to overlap two appointments for the same dentist.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track dental supplies inventory and get low-stock alerts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto tracks stock levels for every supply — gloves, impression materials, composites, anaesthetics and anything else your clinic uses. When any item drops below your minimum quantity, an automatic alert is sent to the clinic manager via Email, Telegram, WhatsApp or Viber.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Pronto cheaper than dedicated dental practice management software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Significantly. Traditional dental practice management software often costs hundreds of dollars per month with additional per-seat licensing fees. Pronto\'s self-hosted version is free forever under MIT license. The cloud version starts at $19/month for the whole clinic — no per-seat fees, no commission on payments.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install Pronto on my own server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run docker compose up -d and the full dental clinic management system starts automatically. No DevOps knowledge required.',
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
    { '@type': 'ListItem', position: 3, name: 'Dental clinics', item: 'https://trypronto.app/for/dental' },
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
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/for/dental'})">Pricing</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','login_click',{label:'nav_signin'})">Sign in</a>
    <select aria-label="Language" onchange="var l=this.value;if(window.gtag)window.gtag('event','language_switch',{to:l});var p=window.location.pathname;var b=p.replace(/^\/(es|pt)/,'').replace(/^$/,'/');window.location.href=l==='en'?b||'/':'/'+l+b;" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/dental'})">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/for">For businesses</a><span>&rsaquo;</span>
  Dental clinics
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Dental clinic software
    </div>
    <h1>Your clinic. <em>Your patients.</em> No per-seat fees.</h1>
    <p class="hero-sub">Free appointment scheduling, patient CRM, treatment history and automated reminders &mdash; for dental clinics and dental practices. Self-hosted or cloud.</p>
    <p class="hero-platforms">Traditional dental software charges per seat, per month, per everything. Pronto charges a flat <strong>$19/month</strong> for the whole clinic &mdash; or <strong>$0</strong> if you self-host.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/dental'})">Start free &mdash; no credit card</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/for/dental'})">Self-host for free &rarr;</a>
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
      <h3>Dental software is expensive and built for accountants, not dentists</h3>
      <p>Legacy dental practice software costs hundreds per month, requires training, and locks your patient data in proprietary formats you can&#39;t export. Meanwhile your front desk is still calling patients manually to confirm appointments and chasing no-shows after the fact. There is a simpler way.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>What dental clinic owners actually deal with</h2>
    <p>Every pain below has a direct fix in Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Dental software costs $200&ndash;500/month in licensing</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Pronto: $19/month flat for the whole clinic, or free self-hosted</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Front desk calling patients to confirm appointments</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Auto-reminders 24h and 1h before &mdash; zero manual effort</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">No-shows with empty chair and no warning</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">No-shows drop significantly once automated reminders are in place</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Running out of gloves or composites mid-session</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Low-stock alert sent before you hit zero &mdash; to any messenger</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">No record of what treatment a returning patient had last time</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Full treatment history per patient &mdash; every visit, every procedure, every note</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">From</div>
        <div class="pain-from-text">Patient data locked in a system you can never export</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Self-hosted: your patient data on your own server, always</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Everything a dental clinic needs, nothing it doesn&#39;t</h2>
    <p>Built for the dentist running the clinic, not for enterprise IT departments.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F9B7;</div>
        <h4>Appointment scheduling</h4>
        <p>Multi-dentist calendar with a column per practitioner. Week view. Drag and drop. Patients book online without an account.</p>
        <div class="feat-detail">Database-level conflict check &mdash; impossible to double-book a dentist&#39;s slot</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>POS and invoicing</h4>
        <p>Invoice patients in 3 clicks &mdash; treatments, materials, taxes. Cash, card, insurance. Print or send a digital receipt.</p>
        <div class="feat-detail">Works fully offline &mdash; no internet needed at the reception desk</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>Patient CRM</h4>
        <p>Every patient&#39;s full history in one place &mdash; visits, treatments, procedures, payments, birthday, notes and next recommended appointment.</p>
        <div class="feat-detail">Find any patient record in under 1 second</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Supplies inventory</h4>
        <p>Track every supply &mdash; gloves, impression materials, composites, anaesthetics. Log incoming stock and consumption per session.</p>
        <div class="feat-detail">Auto alert when any item drops below your set minimum</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>Online booking page</h4>
        <p>Public page patients can find and book from directly &mdash; from Google, your website or a shared link. No login required.</p>
        <div class="feat-detail">Name + phone only &mdash; no registration, no app to download</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Works on any device</h4>
        <p>Install as a PWA on any phone or tablet from the browser. Reception, treatment room or on the go &mdash; same interface everywhere.</p>
        <div class="feat-detail">No App Store, no 30% Apple/Google cut on purchases</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>How your dental clinic runs on Pronto</h2>
    <p>From first booking to loyal patient &mdash; without manual calls or paper.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">Patient books online</div>
      <div class="wf-desc">Booking page linked from your website or Google. Name and phone only &mdash; no account, no friction.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Confirmation sent instantly</div>
      <div class="wf-desc">Auto-confirmation via WhatsApp, Telegram, Email or Viber. Patient record created in CRM immediately.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Reminders go out automatically</div>
      <div class="wf-desc">24 hours and 1 hour before the appointment. No manual calls. No-shows drop significantly.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Treatment logged,<br>invoice sent</div>
      <div class="wf-desc">Log the procedures, close the sale in 3 clicks. Full treatment history saved to patient record permanently.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Automated patient reminders &mdash; on every channel</h2>
    <p>The only open-source dental clinic software with Email, Telegram, WhatsApp and Viber built in &mdash; no plugins, no paid add-ons.</p>
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
        <div class="ev-sub">Sent immediately when a patient books online or when reception adds an appointment manually</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Appointment reminder</div>
        <div class="ev-sub">Automatic reminder 24 hours before and again 1 hour before the scheduled visit</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Post-visit follow-up</div>
        <div class="ev-sub">Sent 2 hours after the appointment &mdash; ask how they&#39;re feeling, keep the relationship warm</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Re-activation message</div>
        <div class="ev-sub">&#x201C;Time for your 6-month check-up&#x201D; &mdash; brings patients back for routine care automatically</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Birthday greeting</div>
        <div class="ev-sub">Auto-sent on the patient&#39;s birthday &mdash; a small personal touch that builds lasting loyalty</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Low stock alert</div>
        <div class="ev-sub">Notifies the clinic manager when any supply drops below the minimum threshold</div>
        <div class="ev-channels">To clinic manager via any channel</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Why dental clinic owners choose Pronto</h2>
    <p>How Pronto compares to traditional dental practice management software.</p>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Feature</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Legacy dental software</div>
      <div class="comp-cell">Generic booking SaaS</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Booking commission</div>
      <div class="comp-cell good">$0 always</div>
      <div class="comp-cell" style="color:#374151">$0 (but $200&ndash;500/mo)</div>
      <div class="comp-cell" style="color:#374151">$0 (subscription fee)</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">You own client data</div>
      <div class="comp-cell good">&#x2713; Always yours</div>
      <div class="comp-cell bad">&#x2717; Proprietary format</div>
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
      <span class="badge">Dental clinics</span>
      <span class="badge">Dental practices</span>
      <span class="badge">Orthodontic clinics</span>
      <span class="badge">Dental studios</span>
      <span class="badge">Multi-chair practices</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Two ways to run Pronto for your dental clinic</h2>
    <p>Self-host for full control, or use our cloud and be running in 5 minutes.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Option 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Deploy on your own VPS. Your data never leaves your server. Free forever. Requires Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 forever</strong> &mdash; no subscription, no limits on patients or dentists</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>MIT license</strong> &mdash; modify, extend, white-label freely</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Any server</strong> &mdash; Linux VPS, Windows, macOS. 1 GB RAM minimum</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/for/dental'})">View on GitHub &rarr;</a>
      <a href="/docs" class="btn-outline">Documentation &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Option 2</div>
      <h3>Cloud &mdash; trypronto.app</h3>
      <p class="path-desc">No server needed. Get your clinic&#39;s subdomain in 5 minutes. We handle everything.</p>
      <div class="trial-banner">
        <div class="trial-big">14 days free</div>
        <div>
          <div class="trial-text">Try any paid plan free for 14 days.</div>
          <div class="trial-note">No credit card required. Cancel anytime.</div>
        </div>
      </div>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Your subdomain</strong> &mdash; smile-dental.trypronto.app or custom domain on Pro+</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>We handle updates</strong> &mdash; backups, uptime monitoring, new features automatically</div></div>
      </div>
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/dental'})">Start free &mdash; no credit card</a>
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
      <div class="plan-limit">1 dentist &middot; 100 patients</div>
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
      <div class="plan-limit">3 dentists &middot; 1 000 patients</div>
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
      <div class="plan-limit">15 dentists &middot; unlimited</div>
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
      <div class="faq-q">What is the best free dental clinic management software?</div>
      <div class="faq-a">Pronto is a free, open-source dental clinic management software that includes appointment scheduling, a multi-dentist calendar, patient CRM with full treatment history, dental supplies inventory and automated reminders via Email, Telegram, WhatsApp and Viber. The self-hosted version is free forever with no limits. The cloud version has a free tier and paid plans starting at $19/month &mdash; with no per-seat fees.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can patients book a dental appointment without creating an account?</div>
      <div class="faq-a">Yes. The public booking page only requires a name and phone number &mdash; no registration, no password, no app to download. Patients pick a time slot and the appointment appears in your calendar instantly. This significantly reduces the friction that causes patients to abandon the booking process.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How does Pronto reduce no-shows at dental clinics?</div>
      <div class="faq-a">Pronto automatically sends a booking confirmation immediately after scheduling, a reminder 24 hours before the appointment and another reminder 1 hour before. All messages go via the channel the patient prefers &mdash; WhatsApp, Telegram, Viber or Email. Dental no-shows typically drop significantly once automated reminders are in place.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Does Pronto store patient treatment history?</div>
      <div class="faq-a">Yes. Each patient record stores their full visit and treatment history &mdash; every appointment, procedures performed, payments made, notes and next recommended visit. You can pull up a returning patient&#39;s complete history in under a second.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can Pronto manage multiple dentists and treatment rooms?</div>
      <div class="faq-a">Yes. The appointment calendar shows each dentist as a separate column so you see the full clinic schedule at a glance. Bookings are protected against double-booking at the database level &mdash; it is technically impossible to overlap two appointments for the same dentist.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I track dental supplies inventory and get low-stock alerts?</div>
      <div class="faq-a">Yes. Pronto tracks stock levels for every supply &mdash; gloves, impression materials, composites, anaesthetics and anything else your clinic uses. When any item drops below your minimum quantity, an automatic alert is sent to the clinic manager via Email, Telegram, WhatsApp or Viber.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Is Pronto cheaper than dedicated dental practice management software?</div>
      <div class="faq-a">Significantly. Traditional dental practice management software often costs hundreds of dollars per month with additional per-seat licensing fees. Pronto&#39;s self-hosted version is free forever under MIT license. The cloud version starts at $19/month for the whole clinic &mdash; no per-seat fees, no commission on payments.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">How do I install Pronto on my own server?</div>
      <div class="faq-a">You need Docker on any Linux VPS, Windows or macOS machine with at least 1 GB RAM. Run <code>docker compose up -d</code> and the full dental clinic management system starts automatically. No DevOps knowledge required. See the <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documentation on GitHub</a> for step-by-step instructions.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Also works great for</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/for/fitness" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🏋️ Fitness clubs</a>
    <a href="/for/spa" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🧖 Massage &amp; spa</a>
    <a href="/for/cafes" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">☕ Cafes</a>
    <a href="/for" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">View all →</a>
  </div>
</section>

<section class="cta-band">
  <h2>Start managing your dental clinic for free</h2>
  <p>Cloud setup takes 5 minutes. Self-hosted is one command. Either way &mdash; no per-seat fees, forever.</p>
  <div>
    <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/for/dental'})">Start free &mdash; cloud</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/for/dental'})">Self-host on GitHub</a>
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
    <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/for/dental'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
  </div>
    <!-- FOOTER — keep in sync with all other pages
       ES standard: /es/ · /es/precios · /es/para · /es/para/salones · legal · GitHub
       EN standard: / · /pricing · /for · /for/salons · legal · GitHub -->
  <div class="footer-links">
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
    <a href="/for">For businesses</a>
    <a href="/for/fitness">Fitness clubs</a>
    <a href="/for/spa">Massage &amp; spa</a>
    <a href="/for/cafes">Cafes</a>
    <a href="/terms">Terms</a>
    <a href="/privacy">Privacy</a>
    <a href="/refund">Refund policy</a>
  </div>
</footer>
`

export default function DentalPage() {
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
