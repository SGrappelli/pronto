import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Competitors — Free Alternative Comparison',
  description:
    'Compare Pronto with Fresha, Booksy, Mindbody, Vagaro and Square. Self-hosted, open-source, zero commission. See which is right for your business.',
  alternates: {
    canonical: 'https://trypronto.app/vs/',
    languages: {
      en: 'https://trypronto.app/vs/',
      es: 'https://trypronto.app/es/vs/',
      'pt-BR': 'https://trypronto.app/pt/vs/',
      'x-default': 'https://trypronto.app/vs/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/vs/',
    title: 'Pronto vs Competitors — Free Alternative Comparison',
    description:
      'Compare Pronto with Fresha, Booksy, Mindbody, Vagaro and Square. Zero commission, open-source, self-hosted.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Competitors — Free Alternative Comparison',
    description:
      'Compare Pronto with Fresha, Booksy, Mindbody, Vagaro and Square. Zero commission, open-source, self-hosted.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pronto vs Competitors',
  description: 'Compare Pronto with popular salon, barbershop and fitness management software',
  numberOfItems: 5,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto vs Fresha',               url: 'https://trypronto.app/vs/fresha' },
    { '@type': 'ListItem', position: 2, name: 'Pronto vs Booksy',               url: 'https://trypronto.app/vs/booksy' },
    { '@type': 'ListItem', position: 3, name: 'Pronto vs Mindbody',             url: 'https://trypronto.app/vs/mindbody' },
    { '@type': 'ListItem', position: 4, name: 'Pronto vs Vagaro',               url: 'https://trypronto.app/vs/vagaro' },
    { '@type': 'ListItem', position: 5, name: 'Pronto vs Square Appointments',  url: 'https://trypronto.app/vs/square' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best free alternative to Fresha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto is a free open-source alternative to Fresha. Unlike Fresha, Pronto charges zero commission on bookings, can be self-hosted on your own server, and includes WhatsApp and Telegram notifications at no extra cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a self-hosted alternative to Booksy or Mindbody?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto is the only open-source, self-hosted alternative to Booksy and Mindbody. Install it with one command on your own server using Docker. Your client data stays on your server — no vendor lock-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pronto charge commission like Fresha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Pronto charges zero commission on bookings or sales. Clients book directly with you. You keep 100% of your revenue — no marketplace fees, no per-booking charges.',
      },
    },
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

.hero{padding:72px 48px 64px;text-align:center;border-bottom:1px solid #f0f0f0}
.hero h1{font-size:52px;font-weight:800;line-height:1.06;letter-spacing:-1.5px;color:#0a0a0a;margin-bottom:18px}
.hero p{font-size:18px;color:#374151;line-height:1.65;max-width:600px;margin:0 auto 32px}
.hero-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.hero-pill{font-size:13px;font-weight:600;padding:7px 16px;border-radius:20px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}

.grid-section{padding:64px 48px 80px}
.grid-section-inner{max-width:960px;margin:0 auto}
.grid-label{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:24px;text-align:center}

.biz-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}

.biz-card{display:block;text-decoration:none;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px 24px;transition:border-color 0.15s,box-shadow 0.15s;position:relative;overflow:hidden}
.biz-card:hover{border-color:#16a34a;box-shadow:0 4px 20px rgba(22,163,74,0.1)}
.biz-card-title{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:#0a0a0a;margin-bottom:10px}
.biz-card-desc{font-size:14px;color:#6b7280;line-height:1.6;margin-bottom:16px}
.biz-card-link{font-size:14px;font-weight:600;color:#16a34a}
.biz-card-arrow{position:absolute;top:24px;right:20px;font-size:18px;color:#d1d5db;transition:color 0.15s,transform 0.15s}
.biz-card:hover .biz-card-arrow{color:#16a34a;transform:translateX(3px)}

.switch-section{background:#f8fafc;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;padding:64px 48px}
.switch-inner{max-width:960px;margin:0 auto}
.switch-section h2{font-size:32px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:40px;text-align:center}
.switch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.switch-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px 24px}
.switch-card h3{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:#0a0a0a;margin-bottom:10px}
.switch-card p{font-size:14px;color:#6b7280;line-height:1.65}

.faq-section{padding:64px 48px}
.faq-inner{max-width:720px;margin:0 auto}
.faq-section h2{font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:36px;text-align:center}
.faq-item{border-bottom:1px solid #f0f0f0;padding:20px 0}
.faq-q{font-size:16px;font-weight:700;color:#0a0a0a;margin-bottom:10px}
.faq-a{font-size:15px;color:#374151;line-height:1.7}

.cta{padding:64px 48px;text-align:center;background:#f0fdf4;border-top:1px solid #bbf7d0}
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
  .hero,.grid-section,.switch-section,.faq-section,.cta{padding-left:24px;padding-right:24px}
  .biz-grid{grid-template-columns:repeat(2,1fr)}
  .switch-grid{grid-template-columns:repeat(2,1fr)}
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
  .switch-section{padding:44px 16px}
  .faq-section{padding:44px 16px}
  .cta{padding:44px 16px}
  .cta h2{font-size:26px}
  .biz-grid{grid-template-columns:1fr}
  .switch-grid{grid-template-columns:1fr}
  footer{padding:32px 16px}.footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}
}
`

const pageContent = `
<nav>
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/vs'})">Pricing</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'en'})">Sign in</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={es:'/es/vs/',pt:'/pt/vs/'};if(m[this.value])location.href=m[this.value]"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'en'})">Start free</a>
  </div>
</nav>

<main>

<section class="hero">
  <h1>Pronto vs the rest &mdash; you deserve better</h1>
  <p>Commission fees. Vendor lock-in. Clients on their platform, not yours.<br>Compare Pronto with the most popular booking and management tools.</p>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; 0% commission</span>
    <span class="hero-pill">&#10003; Self-hosted option</span>
    <span class="hero-pill">&#10003; Open-source MIT</span>
  </div>
</section>

<section class="grid-section">
  <div class="grid-section-inner">
    <div class="grid-label">Choose a competitor</div>
    <div class="biz-grid">

      <a href="/vs/fresha" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Fresha</div>
        <div class="biz-card-desc">Fresha is free but charges up to 20% commission on online bookings. Pronto charges zero commission &mdash; your clients, your revenue.</div>
        <span class="biz-card-link">See full comparison &rarr;</span>
      </a>

      <a href="/vs/booksy" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Booksy</div>
        <div class="biz-card-desc">Booksy charges a monthly subscription plus takes a cut of marketplace bookings. Pronto has a free plan and charges no commission.</div>
        <span class="biz-card-link">See full comparison &rarr;</span>
      </a>

      <a href="/vs/mindbody" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Mindbody</div>
        <div class="biz-card-desc">Mindbody starts at $129/month with complex pricing tiers. Pronto starts at $0 with the same core features your business actually needs.</div>
        <span class="biz-card-link">See full comparison &rarr;</span>
      </a>

      <a href="/vs/vagaro" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Vagaro</div>
        <div class="biz-card-desc">Vagaro charges per location and per feature. Pronto has one simple price &mdash; or nothing, if you self-host.</div>
        <span class="biz-card-link">See full comparison &rarr;</span>
      </a>

      <a href="/vs/square" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Square Appointments</div>
        <div class="biz-card-desc">Square Appointments ties you into the Square ecosystem. Pronto is independent, open-source and works with any payment method.</div>
        <span class="biz-card-link">See full comparison &rarr;</span>
      </a>

    </div>
  </div>
</section>

<section class="switch-section">
  <div class="switch-inner">
    <h2>Why businesses switch to Pronto</h2>
    <div class="switch-grid">

      <div class="switch-card">
        <h3>Commission eats your margin</h3>
        <p>Platforms that are &ldquo;free&rdquo; make money every time a client books. On 100 bookings at $50 each, a 20% commission costs you $1,000/month. Pronto costs $0&ndash;39.</p>
      </div>

      <div class="switch-card">
        <h3>Your clients are held hostage</h3>
        <p>When you leave a marketplace platform, you often lose access to your client list. With Pronto, your data is yours &mdash; export it any time, no questions asked.</p>
      </div>

      <div class="switch-card">
        <h3>One platform, all channels</h3>
        <p>WhatsApp, Telegram, Viber and Email &mdash; built in, at no extra cost. Most competitors charge for messaging integrations or don&rsquo;t offer them at all.</p>
      </div>

    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Frequently asked questions</h2>

    <div class="faq-item">
      <div class="faq-q">What is the best free alternative to Fresha?</div>
      <div class="faq-a">Pronto is a free open-source alternative to Fresha. Unlike Fresha, Pronto charges zero commission on bookings, can be self-hosted on your own server, and includes WhatsApp and Telegram notifications at no extra cost.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Is there a self-hosted alternative to Booksy or Mindbody?</div>
      <div class="faq-a">Yes. Pronto is the only open-source, self-hosted alternative to Booksy and Mindbody. Install it with one command on your own server using Docker. Your client data stays on your server &mdash; no vendor lock-in.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Does Pronto charge commission like Fresha?</div>
      <div class="faq-a">No. Pronto charges zero commission on bookings or sales. Clients book directly with you. You keep 100% of your revenue &mdash; no marketplace fees, no per-booking charges.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Ready to stop paying commission?</h2>
  <p>Start free &mdash; no credit card required. Or self-host forever with one command.</p>
  <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'en'})">Start free &rarr;</a>
  <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
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
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/vs'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function VsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
