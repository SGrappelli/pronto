import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto for Service Businesses — POS, Booking & CRM',
  description:
    'Free POS, CRM and appointment booking for salons, barbershops, auto repair, dental, fitness and any service SMB. Zero commission. Self-hosted or cloud.',
  keywords:
    'service business management software, small business POS, appointment booking software, salon software, barbershop software, auto repair shop software, dental clinic software, fitness club software, cafe POS',
  alternates: {
    canonical: 'https://trypronto.app/for',
    languages: {
      en: 'https://trypronto.app/for/',
      es: 'https://trypronto.app/es/para/',
      'pt-BR': 'https://trypronto.app/pt/para/',
      'x-default': 'https://trypronto.app/for/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/for',
    title: 'Pronto for Service Businesses — POS, Booking & CRM',
    description:
      'Free POS, CRM and appointment booking for any service business. Zero commission. Self-hosted or cloud.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto for Service Businesses — POS, Booking & CRM',
    description:
      'Free POS, CRM and appointment booking for any service business. Zero commission. Self-hosted or cloud.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'For businesses', item: 'https://trypronto.app/for' },
  ],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pronto for service businesses',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Salons & beauty', url: 'https://trypronto.app/for/salons' },
    { '@type': 'ListItem', position: 2, name: 'Barbershops', url: 'https://trypronto.app/for/barbershops' },
    { '@type': 'ListItem', position: 3, name: 'Auto repair shops', url: 'https://trypronto.app/for/auto-repair' },
    { '@type': 'ListItem', position: 4, name: 'Dental clinics', url: 'https://trypronto.app/for/dental' },
    { '@type': 'ListItem', position: 5, name: 'Fitness clubs', url: 'https://trypronto.app/for/fitness' },
    { '@type': 'ListItem', position: 6, name: 'Cafes', url: 'https://trypronto.app/for/cafes' },
    { '@type': 'ListItem', position: 7, name: 'Massage & spa', url: 'https://trypronto.app/for/spa' },
    { '@type': 'ListItem', position: 8, name: 'Tattoo studios', url: 'https://trypronto.app/for/tattoo' },
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
  .hero,.grid-section,.shared,.cta{padding-left:24px;padding-right:24px}
  .breadcrumb{padding:14px 24px}
  .biz-grid{grid-template-columns:repeat(2,1fr)}
  .shared-grid{grid-template-columns:repeat(2,1fr)}
  .hero h1{font-size:40px}
}
@media(max-width:900px){footer{padding:32px 24px}.footer-top{grid-template-columns:1fr 1fr;gap:24px}}
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
  footer{padding:32px 16px}.footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}
}
@media(max-width:400px){
  .biz-grid{grid-template-columns:1fr}
}
`

const pageContent = `
<nav>
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/for'})">Pricing</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'en'})">Sign in</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for',es:'/es/para',pt:'/pt/para'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/for'})">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  For businesses
</div>

<main>

<section class="hero">
  <div class="hero-eyebrow">
    <span class="hero-eyebrow-dot"></span>
    Built for service businesses
  </div>
  <h1>One tool for <em>every service</em> business</h1>
  <p>POS, CRM, appointment booking, inventory and omnichannel notifications &mdash; the same powerful system, tuned for your industry.</p>
  <div class="hero-pills">
    <span class="hero-pill">Zero commission</span>
    <span class="hero-pill">Self-hosted or cloud</span>
    <span class="hero-pill">One command install</span>
    <span class="hero-pill">Email &middot; Telegram &middot; WhatsApp &middot; Viber</span>
    <span class="hero-pill">MIT open source</span>
  </div>
</section>

<section class="grid-section">
  <div class="grid-section-inner">
    <div class="grid-label">Choose your industry</div>
    <div class="biz-grid">

      <a href="/for/salons" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F487;</span>
        <div class="biz-card-title">Salons &amp; beauty</div>
        <div class="biz-card-desc">Hair salons, nail salons, beauty studios, lash &amp; brow bars.</div>
      </a>

      <a href="/for/barbershops" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x2702;&#xFE0F;</span>
        <div class="biz-card-title">Barbershops</div>
        <div class="biz-card-desc">Appointments, walk-ins, multi-barber calendar and grooming product sales.</div>
      </a>

      <a href="/for/auto-repair" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F527;</span>
        <div class="biz-card-title">Auto repair</div>
        <div class="biz-card-desc">Service orders, parts inventory, job tracking and client notifications.</div>
      </a>

      <a href="/for/dental" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F9B7;</span>
        <div class="biz-card-title">Dental clinics</div>
        <div class="biz-card-desc">Patient scheduling, appointment reminders and payment processing.</div>
      </a>

      <a href="/for/fitness" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F3CB;&#xFE0F;</span>
        <div class="biz-card-title">Fitness clubs</div>
        <div class="biz-card-desc">Class bookings, membership tracking, trainer scheduling.</div>
      </a>

      <a href="/for/spa" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F9D6;</span>
        <div class="biz-card-title">Massage &amp; spa</div>
        <div class="biz-card-desc">Treatment bookings, therapist schedules, product and service sales.</div>
      </a>

      <a href="/for/cafes" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x2615;</span>
        <div class="biz-card-title">Cafes</div>
        <div class="biz-card-desc">Fast POS, inventory tracking, table or takeaway orders.</div>
      </a>

      <a href="/for/tattoo" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F3A8;</span>
        <div class="biz-card-title">Tattoo studios</div>
        <div class="biz-card-desc">Session bookings, deposits, client history and artist schedules.</div>
      </a>

    </div>
  </div>
</section>

<section class="shared">
  <div class="shared-inner">
    <h2>Everything above shares the same core</h2>
    <div class="shared-grid">
      <div class="shared-item">
        <div class="shared-title">POS</div>
        <div class="shared-desc">Complete a sale in 3 clicks. Works offline.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">CRM</div>
        <div class="shared-desc">Full client history, tags, notes, birthday.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Booking calendar</div>
        <div class="shared-desc">Drag &amp; drop. No double-bookings. Ever.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Notifications</div>
        <div class="shared-desc">Email &middot; Telegram &middot; WhatsApp &middot; Viber &mdash; automatic.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Inventory</div>
        <div class="shared-desc">Track stock, get low-stock alerts instantly.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Online booking</div>
        <div class="shared-desc">Clients book with name &amp; phone. No account needed.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Self-hosted</div>
        <div class="shared-desc">One command. Your server. Your data. Forever free.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">PWA</div>
        <div class="shared-desc">Install from browser. Works offline at checkout.</div>
      </div>
    </div>
  </div>
</section>

<section class="cta">
  <h2>Not sure which fits?</h2>
  <p>Start with the cloud free tier &mdash; it works for every service business, no setup needed.</p>
  <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/for'})">Start free &mdash; no credit card</a>
  <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/for'})">Self-host on GitHub &rarr;</a>
</section>
<p style="text-align:center;font-size:13px;color:#9ca3af;padding:0 48px 32px;">Looking for a comparison? <a href="/vs/" style="color:#6b7280;text-decoration:underline;">See Pronto vs competitors &rarr;</a></p>

</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Your data, your server.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Product</div>
      <a href="/pricing">Pricing</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Compare</div>
      <a href="/vs/fresha">vs Fresha</a>
      <a href="/vs/booksy">vs Booksy</a>
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
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/for'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function ForPage() {
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
