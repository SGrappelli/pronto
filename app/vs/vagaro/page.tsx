import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Vagaro — Free Open-Source Alternative',
  description:
    'Pronto vs Vagaro: $0 free plan vs $30+/mo, native WhatsApp vs paid add-on, self-hosted vs cloud-only. No per-calendar fees. Compare now.',
  alternates: {
    canonical: 'https://trypronto.app/vs/vagaro',
    languages: {
      en: 'https://trypronto.app/vs/vagaro',
      es: 'https://trypronto.app/es/vs/vagaro',
      'pt-BR': 'https://trypronto.app/pt/vs/vagaro',
      'x-default': 'https://trypronto.app/vs/vagaro',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/vs/vagaro',
    title: 'Pronto vs Vagaro — Free Open-Source Alternative',
    description:
      '$0 free plan vs $30+/mo. Native WhatsApp vs paid add-on. Self-hosted vs cloud-only. No per-calendar fees.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Vagaro — Free Open-Source Alternative',
    description:
      '$0 free plan vs $30+/mo. Native WhatsApp vs paid add-on. Self-hosted vs cloud-only. No per-calendar fees.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Pronto a free alternative to Vagaro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto has a free plan with no monthly fee. Vagaro does not offer a free plan — its base plan starts at $30/month for one bookable calendar and scales to $85/month for seven or more staff. Vagaro offers a 30-day free trial with no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Vagaro cost per month in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vagaro pricing in 2026 is based on the number of bookable calendars: approximately $30/month for 1 staff, $50/month for 3 staff, and $85/month for 7 or more staff. Add-ons such as text marketing, intake forms, check-in app, and website builder each cost an extra $10-20/month. A business using several add-ons can easily pay $100-200/month total.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vagaro charge commission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Vagaro does not charge commission on bookings. The marketplace listing is included in all plans at no extra cost. Payment processing fees of approximately 2.75% per transaction apply when accepting card payments through Vagaro. Pronto also charges zero commission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto have WhatsApp notifications like Vagaro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto includes native WhatsApp, Telegram, Viber and Email notifications at no extra cost. Vagaro does not offer native WhatsApp or Telegram notifications. Vagaro\'s text marketing feature is a paid add-on at approximately $10/month extra, and covers SMS only — not WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a self-hosted alternative to Vagaro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto is the only open-source, self-hosted alternative to Vagaro. Install with one command: docker compose up -d. Your client data stays on your own server — no vendor lock-in, no cloud dependency. Pronto is licensed under MIT.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vagaro require long-term contracts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Vagaro operates on a month-to-month basis with no long-term contracts required. You can cancel at any time. Pronto SaaS also has no contracts — cancel anytime. The Pronto self-hosted version is free forever with no subscription of any kind.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where does Vagaro have an advantage over Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vagaro is used by over 220,000 businesses and includes a marketplace listing in all plans. It offers built-in card payment processing, payroll management, a branded mobile app option, and physical POS hardware. For US-based businesses that want an all-in-one tool with payments and payroll included, Vagaro covers more ground out of the box. Pronto does not process card payments directly and does not have a consumer marketplace.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I switch from Vagaro to Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Export your client list from Vagaro and import it into Pronto\'s CRM. Since Vagaro has no long-term contracts, you can switch at the end of any monthly billing cycle. Pronto SaaS at trypronto.app takes minutes to set up, or self-host on your own server with one command.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/vs/vagaro',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Free open-source alternative to Vagaro for salons, spas and wellness businesses. No per-calendar fees, zero commission, native WhatsApp and Telegram, self-hosted option.',
  alternateName: [
    'free Vagaro alternative',
    'open source Vagaro alternative',
    'self-hosted Vagaro alternative',
    'Vagaro alternative with WhatsApp',
    'Vagaro alternative no monthly fee',
    'Vagaro alternative for salons',
    'cheap Vagaro alternative',
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
table{width:100%;min-width:580px;border-collapse:collapse;font-size:14px}
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
.pricing-card.vagaro{border:1px solid #e2e8f0;background:#fff}
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
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/vs/vagaro'})">Pricing</a>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'en'})">Sign in</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={es:'/es/vs/vagaro',pt:'/pt/vs/vagaro'};if(m[this.value])location.href=m[this.value]"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'en'})">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Home</a><span>&rsaquo;</span>
  <a href="/vs">Compare</a><span>&rsaquo;</span>
  Pronto vs Vagaro
</div>

<main>

<section class="hero">
  <h1>Pronto vs Vagaro &mdash; free plan, self-hosted, no add-on creep</h1>
  <p>Vagaro starts at $30/month and scales with every staff member you add. Add text marketing, forms, and a website and you&rsquo;re paying $100&ndash;200/month before card processing. Pronto starts at $0 &mdash; and WhatsApp reminders are included in every plan.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'en'})">Start free &mdash; no credit card &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; $0 free plan</span>
    <span class="hero-pill">&#10003; WhatsApp included</span>
    <span class="hero-pill">&#10003; Self-hosted option</span>
  </div>
</section>

<section class="verdict">
  <div class="verdict-inner">
    <h2>TL;DR &mdash; which one should you choose?</h2>
    <div class="verdict-cols">
      <div class="verdict-col">
        <h3>Choose Pronto if&hellip;</h3>
        <div class="verdict-item yes">&#10003; You want a free plan with no monthly fee</div>
        <div class="verdict-item yes">&#10003; You want WhatsApp and Telegram notifications &mdash; not just SMS</div>
        <div class="verdict-item yes">&#10003; You want a fixed price that doesn&rsquo;t scale with staff count</div>
        <div class="verdict-item yes">&#10003; You want your data on your own server</div>
        <div class="verdict-item yes">&#10003; You want to avoid add-on costs stacking up</div>
      </div>
      <div class="verdict-col">
        <h3>Choose Vagaro if&hellip;</h3>
        <div class="verdict-item no">&rarr; You want built-in card payment processing and payroll</div>
        <div class="verdict-item no">&rarr; You want a branded mobile app for your business</div>
        <div class="verdict-item no">&rarr; You want POS hardware from a single vendor</div>
        <div class="verdict-item no">&rarr; You need Vagaro&rsquo;s marketplace for client discovery</div>
      </div>
    </div>
  </div>
</section>

<section class="comp-section">
  <div class="comp-inner">
    <h2>Feature by feature comparison</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Pronto</th>
            <th>Vagaro</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Base monthly fee</td><td class="green">$0 free plan</td><td class="red">$30/mo (1 staff) &ndash; $85/mo (7+)</td></tr>
          <tr><td>3-person team monthly cost</td><td class="green">$19/month</td><td class="red">~$50/month</td></tr>
          <tr><td>Per-staff/calendar pricing</td><td class="green">No &mdash; fixed plan</td><td class="red">Yes &mdash; price increases per calendar</td></tr>
          <tr><td>Commission on bookings</td><td class="green">0%</td><td class="green">0%</td></tr>
          <tr><td>Contracts</td><td class="green">None</td><td class="green">None &mdash; month-to-month</td></tr>
          <tr><td>WhatsApp notifications</td><td class="green">&#10003; Native, included</td><td class="red">&#10007; Not available</td></tr>
          <tr><td>Telegram notifications</td><td class="green">&#10003; Native, included</td><td class="red">&#10007; Not available</td></tr>
          <tr><td>SMS / text reminders</td><td>&#10003; Via Viber</td><td>&#10003; Paid add-on (~$10/mo)</td></tr>
          <tr><td>Email reminders</td><td class="green">&#10003; Included</td><td class="green">&#10003; Included</td></tr>
          <tr><td>Self-hosted option</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Cloud only</td></tr>
          <tr><td>Open source</td><td class="green">&#10003; MIT license</td><td class="red">&#10007; Proprietary</td></tr>
          <tr><td>Offline POS</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requires internet</td></tr>
          <tr><td>Client books without account</td><td class="green">&#10003; Name + phone</td><td>&#9888;&#65039; Vagaro account encouraged</td></tr>
          <tr><td>Built-in card processing</td><td class="red">&#10007; (external)</td><td class="green">&#10003; ~2.75%/transaction</td></tr>
          <tr><td>Payroll management</td><td class="red">&#10007;</td><td>&#10003; Paid add-on</td></tr>
          <tr><td>Branded mobile app</td><td class="red">&#10007;</td><td>&#10003; Paid add-on</td></tr>
          <tr><td>Online forms / intake</td><td class="red">&#10007;</td><td>&#10003; Paid add-on (~$10/mo)</td></tr>
          <tr><td>Marketplace listing</td><td class="red">&#10007;</td><td class="green">&#10003; Included in all plans</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-hint">&#8592; Scroll to see full comparison &#8594;</div>
    <div class="table-note">Prices based on publicly available information as of May 2026. Verify current rates at vagaro.com/pricing.</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>What business owners say about Vagaro</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F4B8;</span>
        <h3>Add-ons stack up quickly</h3>
        <p>Vagaro&rsquo;s base plan is affordable, but most businesses need more than the basics. Adding text marketing ($10), intake forms ($10), a check-in app ($10), and cloud storage ($10) adds $40/month before you&rsquo;ve touched payroll or a branded app. A 3-person team with common add-ons can easily hit $90&ndash;130/month. Pronto includes WhatsApp and Telegram notifications in every plan &mdash; no add-on required.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>No WhatsApp or Telegram</h3>
        <p>Vagaro&rsquo;s text reminders are SMS-only and require a paid add-on. WhatsApp and Telegram are not available. For businesses outside the US &mdash; or any business where clients prefer WhatsApp over SMS &mdash; this is a real limitation. Pronto includes native WhatsApp, Telegram, Viber and Email automation from the free plan up.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4CA;</span>
        <h3>Pricing scales with every staff member</h3>
        <p>Each additional bookable calendar on Vagaro increases your monthly bill. A 7-person team hits $85/month just on the subscription &mdash; before any add-ons or payment processing fees. Pronto&rsquo;s Pro plan covers up to 15 staff for $39/month flat, regardless of team size.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x2601;&#65039;</span>
        <h3>Your data is in their cloud</h3>
        <p>Vagaro is cloud-only &mdash; there is no self-hosted option. If Vagaro changes pricing, experiences downtime, or is acquired, your client history stays in their system. Pronto&rsquo;s self-hosted version runs on your own server forever, for free. You own your data completely.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Where Vagaro has a real advantage</h2>
    <p class="wins-note">An honest look at where Vagaro genuinely beats Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>All-in-one with payments and payroll</h3>
        <p>Vagaro includes built-in card payment processing, a payroll add-on, and physical POS hardware &mdash; all from a single vendor. For US-based businesses that want everything under one roof, this simplifies accounting significantly. Pronto&rsquo;s POS accepts cash, card and transfer but does not process card payments directly.</p>
      </div>

      <div class="wins-card">
        <h3>220,000+ businesses and marketplace listing</h3>
        <p>Vagaro has over 220,000 businesses on its platform and includes a consumer marketplace listing in every plan. New businesses can benefit from organic discovery. Pronto does not have a marketplace &mdash; clients find you through your own channels.</p>
      </div>

    </div>
  </div>
</section>

<section class="pricing-section">
  <div class="pricing-inner">
    <h2>What you actually pay per month</h2>
    <div class="pricing-cols">

      <div class="pricing-card pronto">
        <div class="pricing-label green">Pronto</div>
        <div class="pricing-highlight">Starting at $0/month</div>
        <ul class="pricing-list">
          <li>&#10003; Free: $0/month &mdash; 1 staff, 100 clients</li>
          <li>&#10003; Starter: $19/month &mdash; 3 staff, unlimited clients</li>
          <li>&#10003; Pro: $39/month &mdash; 15 staff, unlimited</li>
          <li>&#10003; Agency: $79/month &mdash; multiple locations</li>
          <li>&#10003; WhatsApp + Telegram included on all plans</li>
          <li>&#10003; 0% commission, always</li>
          <li>&#10003; Self-hosted: free forever</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'en'})">Start free &rarr;</a>
      </div>

      <div class="pricing-card vagaro">
        <div class="pricing-label">Vagaro</div>
        <div class="pricing-highlight">From $30/month</div>
        <ul class="pricing-list">
          <li>&rarr; 1 staff: $30/month</li>
          <li>&rarr; 3 staff: ~$50/month</li>
          <li>&rarr; 7+ staff: $85/month</li>
          <li>&rarr; Text marketing: +$10/month (SMS only, no WhatsApp)</li>
          <li>&rarr; Intake forms: +$10/month</li>
          <li>&rarr; Check-in app: +$10/month</li>
          <li>&rarr; Payment processing: ~2.75%/transaction</li>
          <li>&rarr; No free plan &mdash; 30-day free trial</li>
        </ul>
        <p class="pricing-note-small">Verify current rates at vagaro.com/pricing</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Real-world example</h3>
      <p>A 3-person salon on Vagaro pays ~$50/month for 3 calendars, plus ~$10 for text reminders = $60/month before card processing. The equivalent Pronto Starter plan costs $19/month &mdash; with WhatsApp, Telegram, Viber and Email notifications included.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Frequently asked questions</h2>

    <div class="faq-item">
      <div class="faq-q">Is Pronto a free alternative to Vagaro?</div>
      <div class="faq-a">Yes. Pronto has a free plan with no monthly fee. Vagaro does not offer a free plan &mdash; its base plan starts at $30/month for one bookable calendar and scales to $85/month for seven or more staff. Vagaro offers a 30-day free trial with no credit card required.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">How much does Vagaro cost per month in 2026?</div>
      <div class="faq-a">Vagaro pricing in 2026 is based on the number of bookable calendars: approximately $30/month for 1 staff, $50/month for 3 staff, and $85/month for 7 or more staff. Add-ons such as text marketing, intake forms, check-in app, and website builder each cost an extra $10&ndash;20/month. A business using several add-ons can easily pay $100&ndash;200/month total.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Does Vagaro charge commission?</div>
      <div class="faq-a">No. Vagaro does not charge commission on bookings. The marketplace listing is included in all plans at no extra cost. Payment processing fees of approximately 2.75% per transaction apply when accepting card payments through Vagaro. Pronto also charges zero commission.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Does Pronto have WhatsApp notifications like Vagaro?</div>
      <div class="faq-a">Pronto includes native WhatsApp, Telegram, Viber and Email notifications at no extra cost. Vagaro does not offer native WhatsApp or Telegram notifications. Vagaro&rsquo;s text marketing feature is a paid add-on at approximately $10/month extra, and covers SMS only &mdash; not WhatsApp.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Is there a self-hosted alternative to Vagaro?</div>
      <div class="faq-a">Yes. Pronto is the only open-source, self-hosted alternative to Vagaro. Install with one command: docker compose up -d. Your client data stays on your own server &mdash; no vendor lock-in, no cloud dependency. Pronto is licensed under MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Does Vagaro require long-term contracts?</div>
      <div class="faq-a">No. Vagaro operates on a month-to-month basis with no long-term contracts required. You can cancel at any time. Pronto SaaS also has no contracts &mdash; cancel anytime. The Pronto self-hosted version is free forever with no subscription of any kind.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Where does Vagaro have an advantage over Pronto?</div>
      <div class="faq-a">Vagaro is used by over 220,000 businesses and includes a marketplace listing in all plans. It offers built-in card payment processing, payroll management, a branded mobile app option, and physical POS hardware. For US-based businesses that want an all-in-one tool with payments and payroll included, Vagaro covers more ground out of the box. Pronto does not process card payments directly and does not have a consumer marketplace.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Can I switch from Vagaro to Pronto?</div>
      <div class="faq-a">Yes. Export your client list from Vagaro and import it into Pronto&rsquo;s CRM. Since Vagaro has no long-term contracts, you can switch at the end of any monthly billing cycle. Pronto SaaS at trypronto.app takes minutes to set up, or self-host on your own server with one command.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Ready for a free alternative to Vagaro?</h2>
  <p>Start free &mdash; WhatsApp included, no add-ons, no per-staff fees.</p>
  <div class="cta-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'en'})">Start free &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-top">
    <div>
      <div class="footer-brand">Pronto<span>.</span></div>
      <div class="footer-tagline">Your data, your server.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Product</div>
      <a href="/pricing">Pricing</a>
      <a href="/for">For businesses</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Compare</div>
      <a href="/vs/fresha">vs Fresha</a>
      <a href="/vs/booksy">vs Booksy</a>
      <a href="/vs/mindbody">vs Mindbody</a>
      <a href="/vs/square">vs Square</a>
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
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/vs/vagaro'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function VsVagaroPage() {
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
