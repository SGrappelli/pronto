import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Concorrentes — Alternativa Gratuita',
  description:
    'Compare Pronto com Fresha, Booksy, Mindbody, Trinks e iSalon. Sem comissão, open-source e self-hosted. Veja qual é o melhor para o seu negócio.',
  alternates: {
    canonical: 'https://trypronto.app/pt/vs/',
    languages: {
      en: 'https://trypronto.app/vs/',
      es: 'https://trypronto.app/es/vs/',
      'pt-BR': 'https://trypronto.app/pt/vs/',
      'x-default': 'https://trypronto.app/vs/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/vs/',
    title: 'Pronto vs Concorrentes — Alternativa Gratuita',
    description:
      'Compare Pronto com Fresha, Booksy, Mindbody, Trinks e iSalon. Sem comissão, open-source, self-hosted.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Concorrentes — Alternativa Gratuita',
    description:
      'Compare Pronto com Fresha, Booksy, Mindbody, Trinks e iSalon. Sem comissão, open-source, self-hosted.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pronto vs Concorrentes',
  description: 'Comparativo do Pronto com os principais softwares de gestão para salões, barbearias e academias',
  url: 'https://trypronto.app/pt/vs/',
  numberOfItems: 7,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto vs Fresha',              url: 'https://trypronto.app/vs/fresha' },
    { '@type': 'ListItem', position: 2, name: 'Pronto vs Booksy',              url: 'https://trypronto.app/vs/booksy' },
    { '@type': 'ListItem', position: 3, name: 'Pronto vs Mindbody',            url: 'https://trypronto.app/vs/mindbody' },
    { '@type': 'ListItem', position: 4, name: 'Pronto vs Vagaro',              url: 'https://trypronto.app/vs/vagaro' },
    { '@type': 'ListItem', position: 5, name: 'Pronto vs Square Appointments', url: 'https://trypronto.app/vs/square' },
    { '@type': 'ListItem', position: 6, name: 'Pronto vs Trinks',              url: 'https://trypronto.app/pt/vs/trinks' },
    { '@type': 'ListItem', position: 7, name: 'Pronto vs iSalon',              url: 'https://trypronto.app/pt/vs/isalon' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qual é a melhor alternativa gratuita ao Fresha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto é uma alternativa gratuita e open-source ao Fresha. Ao contrário do Fresha, o Pronto não cobra comissão por agendamentos, pode ser instalado no seu próprio servidor e inclui notificações por WhatsApp e Telegram sem custo adicional.',
      },
    },
    {
      '@type': 'Question',
      name: 'Existe uma alternativa self-hosted ao Booksy ou Mindbody?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é a única alternativa open-source e self-hosted ao Booksy e Mindbody. Instale com um único comando no seu próprio servidor usando Docker. Os dados dos seus clientes ficam no seu servidor — sem vendor lock-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto cobra comissão como o Fresha ou o Trinks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O Pronto não cobra nenhuma comissão sobre agendamentos ou vendas. Seus clientes reservam diretamente com você. Você fica com 100% da receita — sem taxas de marketplace, sem cobranças por agendamento.',
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

.breadcrumb{padding:12px 48px;background:#fafafa;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af}
.breadcrumb a{color:#9ca3af;text-decoration:none}
.breadcrumb a:hover{color:#111}
.breadcrumb span{margin:0 6px}

.hero{padding:72px 48px 64px;text-align:center;border-bottom:1px solid #f0f0f0}
.hero h1{font-size:52px;font-weight:800;line-height:1.06;letter-spacing:-1.5px;color:#0a0a0a;margin-bottom:18px}
.hero p{font-size:18px;color:#374151;line-height:1.65;max-width:600px;margin:0 auto 32px}
.hero-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:28px}
.hero-pill{font-size:13px;font-weight:600;padding:7px 16px;border-radius:20px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

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
  .breadcrumb{padding:12px 24px}
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
  <a href="/pt/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/vs'})">Pre&ccedil;os</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={en:'/vs/',es:'/es/vs/'};if(m[this.value])location.href=m[this.value]"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/pt/">In&iacute;cio</a><span>&rsaquo;</span> Comparativos
</div>

<main>

<section class="hero">
  <h1>Pronto vs os concorrentes &mdash; voc&ecirc; merece algo melhor</h1>
  <p>Comiss&otilde;es sobre agendamentos. Vendor lock-in. Seus clientes na plataforma deles, n&atilde;o na sua.<br>Compare o Pronto com as ferramentas de gest&atilde;o mais populares.</p>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; 0% de comiss&atilde;o</span>
    <span class="hero-pill">&#10003; Op&ccedil;&atilde;o self-hosted</span>
    <span class="hero-pill">&#10003; Open-source MIT</span>
  </div>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  </div>
</section>

<section class="grid-section">
  <div class="grid-section-inner">
    <div class="grid-label">Escolha um concorrente</div>
    <div class="biz-grid">

      <a href="/vs/fresha" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Fresha</div>
        <div class="biz-card-desc">O Fresha eliminou seu plano gratuito em 2025 e cobra 20% de comiss&atilde;o por cada novo cliente do marketplace. O Pronto come&ccedil;a em $0 e cobra zero comiss&atilde;o.</div>
        <span class="biz-card-link">Ver comparativo completo &rarr;</span>
      </a>

      <a href="/vs/booksy" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Booksy</div>
        <div class="biz-card-desc">O Booksy cobra $29.99/m&ecirc;s mais $10 por cada funcion&aacute;rio adicional. O Pronto tem plano gratuito e n&atilde;o cobra comiss&atilde;o por agendamentos.</div>
        <span class="biz-card-link">Ver comparativo completo &rarr;</span>
      </a>

      <a href="/vs/mindbody" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Mindbody</div>
        <div class="biz-card-desc">O Mindbody come&ccedil;a em $129/m&ecirc;s com pre&ccedil;os complexos por n&iacute;veis. O Pronto come&ccedil;a em $0 com as mesmas fun&ccedil;&otilde;es essenciais que o seu neg&oacute;cio realmente precisa.</div>
        <span class="biz-card-link">Ver comparativo completo &rarr;</span>
      </a>

      <a href="/vs/vagaro" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Vagaro</div>
        <div class="biz-card-desc">O Vagaro cobra por localiza&ccedil;&atilde;o e por funcionalidade. O Pronto tem um pre&ccedil;o simples &mdash; ou nada, se voc&ecirc; hospedar por conta pr&oacute;pria.</div>
        <span class="biz-card-link">Ver comparativo completo &rarr;</span>
      </a>

      <a href="/vs/square" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Square Appointments</div>
        <div class="biz-card-desc">O Square Appointments prende voc&ecirc; no ecossistema Square. O Pronto &eacute; independente, open-source e funciona com qualquer m&eacute;todo de pagamento.</div>
        <span class="biz-card-link">Ver comparativo completo &rarr;</span>
      </a>

      <a href="/pt/vs/trinks" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs Trinks</div>
        <div class="biz-card-desc">O Trinks cobra mensalidade e percentual sobre agendamentos online. O Pronto tem plano gratuito, zero comiss&atilde;o e seus dados ficam no seu servidor.</div>
        <span class="biz-card-link">Ver comparativo completo &rarr;</span>
      </a>

      <a href="/pt/vs/isalon" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <div class="biz-card-title">Pronto vs iSalon</div>
        <div class="biz-card-desc">O iSalon &eacute; um dos sistemas mais usados em sal&otilde;es brasileiros, mas cobra mensalidade sem plano gratuito. O Pronto oferece todas as fun&ccedil;&otilde;es essenciais a partir de $0.</div>
        <span class="biz-card-link">Ver comparativo completo &rarr;</span>
      </a>

    </div>
  </div>
</section>

<section class="switch-section">
  <div class="switch-inner">
    <h2>Por que neg&oacute;cios migram para o Pronto</h2>
    <div class="switch-grid">

      <div class="switch-card">
        <h3>As comiss&otilde;es destroem sua margem</h3>
        <p>Plataformas &ldquo;gratuitas&rdquo; ganham dinheiro cada vez que um cliente agenda. Em 100 agendamentos de R$150 cada, uma comiss&atilde;o de 20% custa R$3.000/m&ecirc;s. O Pronto custa $0&ndash;39.</p>
      </div>

      <div class="switch-card">
        <h3>Seus clientes ficam ref&eacute;ns da plataforma</h3>
        <p>Quando voc&ecirc; sai de uma plataforma marketplace, geralmente perde o acesso &agrave; lista de clientes. Com o Pronto, seus dados s&atilde;o seus &mdash; exporte quando quiser, sem restri&ccedil;&otilde;es.</p>
      </div>

      <div class="switch-card">
        <h3>Uma plataforma, todos os canais</h3>
        <p>WhatsApp, Telegram, Viber e Email &mdash; inclu&iacute;dos, sem custo adicional. A maioria dos concorrentes cobra extra pelas integra&ccedil;&otilde;es de mensagens ou simplesmente n&atilde;o as oferece.</p>
      </div>

    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>

    <div class="faq-item">
      <div class="faq-q">Qual &eacute; a melhor alternativa gratuita ao Fresha?</div>
      <div class="faq-a">O Pronto &eacute; uma alternativa gratuita e open-source ao Fresha. Ao contr&aacute;rio do Fresha, o Pronto n&atilde;o cobra comiss&atilde;o por agendamentos, pode ser instalado no seu pr&oacute;prio servidor e inclui notifica&ccedil;&otilde;es por WhatsApp e Telegram sem custo adicional.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Existe uma alternativa self-hosted ao Booksy ou Mindbody?</div>
      <div class="faq-a">Sim. O Pronto &eacute; a &uacute;nica alternativa open-source e self-hosted ao Booksy e Mindbody. Instale com um &uacute;nico comando no seu pr&oacute;prio servidor usando Docker. Os dados dos seus clientes ficam no seu servidor &mdash; sem vendor lock-in.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto cobra comiss&atilde;o como o Fresha ou o Trinks?</div>
      <div class="faq-a">N&atilde;o. O Pronto n&atilde;o cobra nenhuma comiss&atilde;o sobre agendamentos ou vendas. Seus clientes reservam diretamente com voc&ecirc;. Voc&ecirc; fica com 100% da receita &mdash; sem taxas de marketplace, sem cobran&ccedil;as por agendamento.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Pronto para parar de pagar comiss&atilde;o?</h2>
  <p>Comece gr&aacute;tis &mdash; sem cart&atilde;o de cr&eacute;dito, sem comiss&atilde;o, sem pegadinhas.</p>
  <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
  <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
</section>

</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/pt/" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Your data, your server.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Produto</div>
      <a href="/pt/precos">Pre&ccedil;os</a>
      <a href="/pt/para/">Para neg&oacute;cios</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Comparar</div>
      <a href="/pt/vs/fresha">vs Fresha</a>
      <a href="/pt/vs/booksy">vs Booksy</a>
      <a href="/pt/vs/mindbody">vs Mindbody</a>
      <a href="/pt/vs/vagaro">vs Vagaro</a>
      <a href="/pt/vs/square">vs Square</a>
      <a href="/pt/vs/trinks">vs Trinks</a>
      <a href="/pt/vs/isalon">vs iSalon</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Legal</div>
      <a href="/terms">Termos de Uso</a>
      <a href="/privacy">Pol&iacute;tica de Privacidade</a>
      <a href="/refund">Pol&iacute;tica de Reembolso</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">&copy; 2026 Pronto. Todos os direitos reservados.</div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/vs'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtVsPage() {
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
