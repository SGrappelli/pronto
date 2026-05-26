import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Booksy — Free Alternative, No Per-Staff Fees',
  description:
    'Pronto vs Booksy: $0 free plan vs $29.99/mo plus $10/staff. Native WhatsApp vs SMS only. Self-hosted vs cloud. See which fits your business.',
  alternates: {
    canonical: 'https://trypronto.app/vs/booksy',
    languages: {
      en: 'https://trypronto.app/vs/booksy',
      es: 'https://trypronto.app/es/vs/booksy',
      'pt-BR': 'https://trypronto.app/pt/vs/booksy',
      'x-default': 'https://trypronto.app/vs/booksy',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/vs/booksy',
    title: 'Pronto vs Booksy — Free Alternative, No Per-Staff Fees',
    description:
      '$0 free plan vs $29.99/mo+$10/staff. Native WhatsApp vs SMS only. Self-hosted vs cloud-only. Compare Pronto and Booksy.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Booksy — Free Alternative, No Per-Staff Fees',
    description:
      '$0 free plan vs $29.99/mo+$10/staff. Native WhatsApp vs SMS only. Self-hosted vs cloud-only. Compare Pronto and Booksy.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Pronto a free alternative to Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto has a free plan with no monthly fee and no commission. Booksy does not offer a free plan — Booksy Biz starts at $29.99/month plus $10/month for each additional staff member. Booksy offers a 14-day free trial with no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Booksy charge commission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy does not charge commission on standard bookings. If you enable Booksy Boost — their optional marketplace visibility add-on — you pay 30% of each new client\'s first visit, with a minimum of $10 and a maximum of $100 per client. Without Boost, there is no commission. Pronto charges zero commission in any case.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Booksy cost for a team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy Biz starts at $29.99/month for one user. Each additional staff member costs $10/month. A 3-person team pays approximately $50/month; a 10-person team pays $119.99/month for unlimited staff. Pronto\'s Starter plan covers 3 staff for $19/month; Pro covers 15 staff for $39/month — no per-seat pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto have WhatsApp notifications like Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy does not offer native WhatsApp or Telegram notifications — it includes SMS (2,000 free/month) and email reminders. Pronto includes native WhatsApp, Telegram, Viber and Email notifications at no extra cost: booking confirmation, 24h reminder, 1h reminder, post-visit message and client reactivation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a self-hosted alternative to Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto is the only open-source, self-hosted alternative to Booksy. Install it with one command on your own server: docker compose up -d. Your client data stays on your server — not in Booksy\'s cloud. Pronto is licensed under MIT.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can clients book without creating a Booksy account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With Pronto, clients book with just a name and phone number — no account required. With Booksy, clients are encouraged to create a Booksy account to use the full platform and receive reminders. This keeps the client relationship within Booksy\'s ecosystem rather than your own business.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where does Booksy have an advantage over Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Booksy has 35M+ registered consumers — the largest beauty-focused consumer marketplace in the US. For new barbershops and salons in major cities, this marketplace can genuinely fill your calendar. Booksy also includes built-in card payment processing and no-show deposit features. Pronto does not have a marketplace or built-in card processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I switch from Booksy to Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Export your client list from Booksy and import it into Pronto\'s CRM. You can run both in parallel during the transition. The Pronto SaaS at trypronto.app takes minutes to set up, or self-host on your own server with one command.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/vs/booksy',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Free open-source alternative to Booksy for salons and barbershops. No per-staff fees, zero commission, native WhatsApp and Telegram notifications, self-hosted option.',
  alternateName: [
    'free Booksy alternative',
    'open source Booksy alternative',
    'self-hosted Booksy alternative',
    'Booksy alternative no per-staff fees',
    'Booksy alternative with WhatsApp',
    'Booksy alternative for barbershops',
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
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/vs/booksy'})">Pricing</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'en'})">Sign in</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={es:'/es/vs/booksy',pt:'/pt/vs/booksy'};if(m[this.value])location.href=m[this.value]"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'en'})">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Home</a><span>&rsaquo;</span>
  <a href="/vs">Compare</a><span>&rsaquo;</span>
  Pronto vs Booksy
</div>

<main>

<section class="hero">
  <h1>Pronto vs Booksy &mdash; no per-staff fees, self-hosted</h1>
  <p>Booksy charges $29.99/month plus $10 for every additional staff member. A 3-chair barbershop pays ~$50/month before payment processing. Pronto&rsquo;s Starter covers 3 staff for $19/month flat &mdash; no per-seat fees, ever.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'en'})">Start free &mdash; no credit card &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; $0 free plan</span>
    <span class="hero-pill">&#10003; No per-staff fees</span>
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
        <div class="verdict-item yes">&#10003; You don&rsquo;t want per-staff pricing as your team grows</div>
        <div class="verdict-item yes">&#10003; You want WhatsApp and Telegram notifications included</div>
        <div class="verdict-item yes">&#10003; You want your data on your own server</div>
        <div class="verdict-item yes">&#10003; You don&rsquo;t need a US consumer marketplace</div>
      </div>
      <div class="verdict-col">
        <h3>Choose Booksy if&hellip;</h3>
        <div class="verdict-item no">&rarr; You want access to Booksy&rsquo;s 35M+ consumer marketplace</div>
        <div class="verdict-item no">&rarr; You&rsquo;re a new barbershop in a major US city needing client discovery</div>
        <div class="verdict-item no">&rarr; You want built-in payment processing and no-show deposit features</div>
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
            <th>Booksy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Base monthly fee</td><td class="green">$0 free plan</td><td class="red">$29.99/month (no free plan)</td></tr>
          <tr><td>Per-staff pricing</td><td class="green">None &mdash; fixed price</td><td class="red">+$10/month per additional staff</td></tr>
          <tr><td>3-person team monthly cost</td><td class="green">$19/month</td><td class="red">~$50/month</td></tr>
          <tr><td>Commission on bookings</td><td class="green">0% always</td><td>0% standard; 30% first visit w/Boost</td></tr>
          <tr><td>Max Boost commission/client</td><td class="green">None</td><td>$100 per new client</td></tr>
          <tr><td>Self-hosted option</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Cloud only</td></tr>
          <tr><td>Open source</td><td class="green">&#10003; MIT license</td><td class="red">&#10007; Proprietary</td></tr>
          <tr><td>WhatsApp notifications</td><td class="green">&#10003; Native, included</td><td class="red">&#10007; Not available</td></tr>
          <tr><td>Telegram notifications</td><td class="green">&#10003; Native, included</td><td class="red">&#10007; Not available</td></tr>
          <tr><td>SMS reminders</td><td class="green">&#10003; Via Viber</td><td class="green">&#10003; 2,000 free/month</td></tr>
          <tr><td>Email reminders</td><td class="green">&#10003; Included</td><td class="green">&#10003; Included</td></tr>
          <tr><td>Offline POS</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requires internet</td></tr>
          <tr><td>Client books without account</td><td class="green">&#10003; Name + phone</td><td>&#9888;&#65039; Booksy account encouraged</td></tr>
          <tr><td>Consumer marketplace</td><td class="red">&#10007;</td><td class="green">&#10003; 35M+ consumers</td></tr>
          <tr><td>Built-in payment processing</td><td class="red">&#10007;</td><td class="green">&#10003; 2.49% + $0.15/transaction</td></tr>
          <tr><td>No-show deposits</td><td class="green">&#10003;</td><td class="green">&#10003; Boost+ plan</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-hint">&#8592; Scroll to compare &#8594;</div>
    <div class="table-note">Prices based on publicly available information as of May 2026. Verify current rates at biz.booksy.com/pricing.</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>What business owners say about Booksy</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F4B8;</span>
        <h3>Per-staff pricing adds up fast</h3>
        <p>Booksy charges $10/month for each additional staff member. A barbershop with 4 chairs pays $29.99 + $30 = ~$60/month on subscription alone, before payment processing fees. A 10-person salon hits $119.99/month for unlimited staff. With Pronto, the Pro plan covers up to 15 staff for $39/month flat.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4CA;</span>
        <h3>Boost commission surprises growing businesses</h3>
        <p>Booksy Boost is optional &mdash; but if you enable it for more marketplace visibility, you pay 30% of each new client&rsquo;s first visit, up to $100 per client. At 20 new clients a month through Boost, that&rsquo;s up to $2,000 in commissions on top of your subscription. Pronto charges zero commission, always.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F512;</span>
        <h3>Your clients see your competitors every time they rebook</h3>
        <p>Every time a client opens the Booksy app to rebook with you, they see other businesses listed nearby. The marketplace that brought them to you is also showing them alternatives. With Pronto, clients book through your own page &mdash; they only ever see you.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>No WhatsApp or Telegram reminders</h3>
        <p>Booksy sends SMS and email reminders &mdash; but WhatsApp and Telegram are not available natively. For businesses outside the US where WhatsApp is the primary communication channel, this is a meaningful gap. Pronto includes WhatsApp, Telegram, Viber and Email at no extra cost.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Where Booksy has a real advantage</h2>
    <p class="wins-note">An honest look at where Booksy genuinely beats Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>The marketplace is Booksy&rsquo;s strongest asset</h3>
        <p>Booksy has 35M+ registered consumers and is the largest beauty-focused consumer marketplace in the US. For a new barbershop in Chicago or New York, being listed on Booksy can genuinely fill your calendar faster than other channels. Pronto does not have a marketplace &mdash; clients find you through your own channels.</p>
      </div>

      <div class="wins-card">
        <h3>Built-in payments and no-show protection</h3>
        <p>Booksy includes integrated card payments and deposit/no-show features. Pronto&rsquo;s POS accepts cash, card and bank transfer &mdash; but Pronto does not process card payments directly. You will need a separate terminal.</p>
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
          <li>&#10003; 0% commission, always</li>
          <li>&#10003; Self-hosted: free forever</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'en'})">Start free &rarr;</a>
      </div>

      <div class="pricing-card booksy">
        <div class="pricing-label">Booksy</div>
        <div class="pricing-highlight">From $29.99/month</div>
        <ul class="pricing-list">
          <li>&rarr; Biz: $29.99/month for 1 user</li>
          <li>&rarr; Each additional staff: +$10/month</li>
          <li>&rarr; Boost add-on: +$49.99/month</li>
          <li>&rarr; 10+ staff: $119.99/month unlimited</li>
          <li>&rarr; Boost commission: 30% first visit, max $100/client</li>
          <li>&rarr; Payment processing: 2.49% + $0.15/transaction</li>
          <li>&rarr; No free plan &mdash; 14-day trial only</li>
        </ul>
        <p class="pricing-note-small">Verify current rates at biz.booksy.com/pricing</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Real-world example</h3>
      <p>A 3-person barbershop on Booksy pays: $29.99 + $20 in staff fees = ~$50/month, plus 2.49% on every card transaction. The equivalent Pronto Starter plan costs $19/month flat &mdash; no per-staff fees, no transaction fees, zero commission.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Frequently asked questions</h2>

    <div class="faq-item">
      <div class="faq-q">Is Pronto a free alternative to Booksy?</div>
      <div class="faq-a">Yes. Pronto has a free plan with no monthly fee and no commission. Booksy does not offer a free plan &mdash; Booksy Biz starts at $29.99/month plus $10/month for each additional staff member. Booksy offers a 14-day free trial with no credit card required.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Does Booksy charge commission?</div>
      <div class="faq-a">Booksy does not charge commission on standard bookings. If you enable Booksy Boost &mdash; their optional marketplace visibility add-on &mdash; you pay 30% of each new client&rsquo;s first visit, with a minimum of $10 and a maximum of $100 per client. Without Boost, there is no commission. Pronto charges zero commission in any case.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">How much does Booksy cost for a team?</div>
      <div class="faq-a">Booksy Biz starts at $29.99/month for one user. Each additional staff member costs $10/month. A 3-person team pays approximately $50/month; a 10-person team pays $119.99/month for unlimited staff. Pronto&rsquo;s Starter plan covers 3 staff for $19/month; Pro covers 15 staff for $39/month &mdash; no per-seat pricing.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Does Pronto have WhatsApp notifications like Booksy?</div>
      <div class="faq-a">Booksy does not offer native WhatsApp or Telegram notifications &mdash; it includes SMS (2,000 free/month) and email reminders. Pronto includes native WhatsApp, Telegram, Viber and Email notifications at no extra cost: booking confirmation, 24h reminder, 1h reminder, post-visit message and client reactivation.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Is there a self-hosted alternative to Booksy?</div>
      <div class="faq-a">Yes. Pronto is the only open-source, self-hosted alternative to Booksy. Install it with one command on your own server: docker compose up -d. Your client data stays on your server &mdash; not in Booksy&rsquo;s cloud. Pronto is licensed under MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Can clients book without creating a Booksy account?</div>
      <div class="faq-a">With Pronto, clients book with just a name and phone number &mdash; no account required. With Booksy, clients are encouraged to create a Booksy account to use the full platform and receive reminders. This keeps the client relationship within Booksy&rsquo;s ecosystem rather than your own business.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Where does Booksy have an advantage over Pronto?</div>
      <div class="faq-a">Booksy has 35M+ registered consumers &mdash; the largest beauty-focused consumer marketplace in the US. For new barbershops and salons in major cities, this marketplace can genuinely fill your calendar. Booksy also includes built-in card payment processing and no-show deposit features. Pronto does not have a marketplace or built-in card processing.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Can I switch from Booksy to Pronto?</div>
      <div class="faq-a">Yes. Export your client list from Booksy and import it into Pronto&rsquo;s CRM. You can run both in parallel during the transition. The Pronto SaaS at trypronto.app takes minutes to set up, or self-host on your own server with one command.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Ready to stop paying per-seat fees?</h2>
  <p>Start free &mdash; no credit card, no commission, no per-staff pricing.</p>
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
      <a href="/blog">Blog</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Compare</div>
      <a href="/vs/fresha">vs Fresha</a>
      <a href="/vs/mindbody">vs Mindbody</a>
      <a href="/vs/vagaro">vs Vagaro</a>
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
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/vs/booksy'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function VsBooksyPage() {
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
