import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Fresha — Alternativa Gratuita sem Comissão',
  description:
    'Pronto vs Fresha: plano grátis vs $19.95/mês, 0% comissão vs 20% de taxa de marketplace. Self-hosted vs somente na nuvem. Veja qual é melhor.',
  alternates: {
    canonical: 'https://trypronto.app/pt/vs/fresha',
    languages: {
      en: 'https://trypronto.app/vs/fresha',
      es: 'https://trypronto.app/es/vs/fresha',
      'pt-BR': 'https://trypronto.app/pt/vs/fresha',
      'x-default': 'https://trypronto.app/vs/fresha',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/vs/fresha',
    title: 'Pronto vs Fresha — Alternativa Gratuita sem Comissão',
    description:
      'Plano grátis vs $19.95/mês. 0% comissão vs 20% de taxa de marketplace. Self-hosted vs somente na nuvem.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Fresha — Alternativa Gratuita sem Comissão',
    description:
      'Plano grátis vs $19.95/mês. 0% comissão vs 20% de taxa de marketplace. Self-hosted vs somente na nuvem.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa gratuita ao Fresha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto tem um plano gratuito sem mensalidade e sem comissão por agendamentos. O Fresha eliminou seu plano gratuito em 2025 — o plano Individual atual custa aproximadamente $19.95/mês, mais uma comissão de 20% por cada novo cliente que agendar pelo marketplace do Fresha.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Fresha cobra comissão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Fresha cobra uma taxa única de 20% por cada novo cliente que agendar pelo marketplace, com um mínimo de $6 por cliente. Isso é cobrado além da mensalidade. O Pronto cobra zero comissão em qualquer agendamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Os clientes podem agendar sem criar uma conta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Com o Pronto, sim — os clientes agendam com apenas nome e telefone, sem necessidade de conta. Com o Fresha, os clientes precisam criar uma conta Fresha para concluir um agendamento online. Isso adiciona atrito e significa que o Fresha controla o relacionamento com o cliente, não o seu negócio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Existe uma alternativa self-hosted ao Fresha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é a única alternativa open-source e self-hosted ao Fresha. Instale com um único comando no seu próprio servidor: docker compose up -d. Os dados dos seus clientes ficam no seu servidor — não na nuvem do Fresha. O Pronto tem licença MIT.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto tem notificações por WhatsApp como o Fresha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto inclui notificações nativas por WhatsApp, Telegram, Viber e Email sem custo adicional — confirmação, lembrete 24h antes, lembrete 1h antes, mensagem pós-visita e reativação. O Fresha não oferece notificações nativas por WhatsApp nem Telegram.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto custa o Fresha por mês em 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em 2026, o plano Individual do Fresha custa aproximadamente $19.95/mês. O plano Team custa aproximadamente $14.95/mês por membro da equipe — uma equipe de 5 pessoas paga cerca de $75/mês só em mensalidade, antes da taxa de 20% por novos clientes do marketplace e as taxas de processamento de pagamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso migrar do Fresha para o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Exporte sua lista de clientes do Fresha e importe para o CRM do Pronto. Você pode usar os dois em paralelo durante a transição. O SaaS do Pronto em trypronto.app leva minutos para configurar, ou instale no seu próprio servidor com um único comando.',
      },
    },
    {
      '@type': 'Question',
      name: 'Onde o Fresha tem vantagem sobre o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Fresha tem um grande marketplace de consumidores com mais de 130.000 negócios e milhões de clientes ativos buscando serviços de beleza e bem-estar. Se você é um negócio novo que precisa captar clientes através de um marketplace, o Fresha pode trazer agendamentos orgânicos. O Pronto não tem marketplace — os clientes te encontram pelos seus próprios canais.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/pt/vs/fresha',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Alternativa gratuita e open-source ao Fresha para salões, barbearias, spas e academias. Sem comissão, opção self-hosted, notificações nativas por WhatsApp e Telegram.',
  alternateName: [
    'alternativa gratuita ao Fresha',
    'alternativa open source ao Fresha',
    'alternativa self-hosted ao Fresha',
    'alternativa ao Fresha sem comissão',
    'alternativa ao Fresha com WhatsApp',
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
table{width:100%;border-collapse:collapse;font-size:14px}
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
.pricing-card.fresha{border:1px solid #e2e8f0;background:#fff}
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
  footer{padding:32px 16px}.footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}
}
`

const pageContent = `
<nav>
  <a href="/pt/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/vs/fresha'})">Pre&ccedil;os</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={en:'/vs/fresha',es:'/es/vs/fresha'};if(m[this.value])location.href=m[this.value]"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/pt/">In&iacute;cio</a><span>&rsaquo;</span>
  <a href="/pt/vs/">Comparativos</a><span>&rsaquo;</span>
  Pronto vs Fresha
</div>

<main>

<section class="hero">
  <h1>Pronto vs Fresha &mdash; zero comiss&atilde;o, self-hosted</h1>
  <p>O Fresha eliminou seu plano gratuito em 2025 e cobra 20% sobre novos clientes do marketplace al&eacute;m da mensalidade. O Pronto come&ccedil;a em $0 e cobra zero comiss&atilde;o &mdash; sempre.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &mdash; sem cart&atilde;o &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; Plano gratuito $0</span>
    <span class="hero-pill">&#10003; 0% de comiss&atilde;o</span>
    <span class="hero-pill">&#10003; Op&ccedil;&atilde;o self-hosted</span>
  </div>
</section>

<section class="verdict">
  <div class="verdict-inner">
    <h2>Resumo &mdash; qual escolher?</h2>
    <div class="verdict-cols">
      <div class="verdict-col">
        <h3>Escolha o Pronto se&hellip;</h3>
        <div class="verdict-item yes">&#10003; Quer um plano gratuito sem mensalidade</div>
        <div class="verdict-item yes">&#10003; Quer zero comiss&atilde;o em todos os agendamentos</div>
        <div class="verdict-item yes">&#10003; Quer WhatsApp e Telegram inclu&iacute;dos</div>
        <div class="verdict-item yes">&#10003; Quer seus dados no seu pr&oacute;prio servidor</div>
        <div class="verdict-item yes">&#10003; N&atilde;o precisa de um marketplace de consumidores</div>
      </div>
      <div class="verdict-col">
        <h3>Escolha o Fresha se&hellip;</h3>
        <div class="verdict-item no">&rarr; Quer acesso ao marketplace do Fresha com 130.000+ neg&oacute;cios</div>
        <div class="verdict-item no">&rarr; Precisa de processamento de pagamentos com cart&atilde;o integrado</div>
        <div class="verdict-item no">&rarr; Busca uma plataforma mais consolidada com mais integra&ccedil;&otilde;es</div>
      </div>
    </div>
  </div>
</section>

<section class="comp-section">
  <div class="comp-inner">
    <h2>Comparativo fun&ccedil;&atilde;o por fun&ccedil;&atilde;o</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Fun&ccedil;&atilde;o</th>
            <th>Pronto</th>
            <th>Fresha</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Mensalidade</td><td class="green">$0 plano gratuito</td><td>A partir de $19.95/m&ecirc;s (sem gr&aacute;tis)</td></tr>
          <tr><td>Comiss&atilde;o por agendamentos</td><td class="green">0%</td><td class="red">20% por novos clientes marketplace</td></tr>
          <tr><td>Comiss&atilde;o m&iacute;nima por cliente</td><td class="green">Nenhuma</td><td class="red">M&iacute;nimo $6 por cliente</td></tr>
          <tr><td>Op&ccedil;&atilde;o self-hosted</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Somente na nuvem</td></tr>
          <tr><td>C&oacute;digo aberto</td><td class="green">&#10003; Licen&ccedil;a MIT</td><td class="red">&#10007; Propriet&aacute;rio</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es WhatsApp</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es Telegram</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es Email</td><td class="green">&#10003; Inclu&iacute;das</td><td>&#10003; Inclu&iacute;das (limite depois pago)</td></tr>
          <tr><td>Agendamento sem cadastro</td><td class="green">&#10003; Nome + telefone</td><td class="red">&#10007; Exige conta Fresha</td></tr>
          <tr><td>PDV offline</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requer internet</td></tr>
          <tr><td>Marketplace de consumidores</td><td class="red">&#10007;</td><td class="green">&#10003; 130.000+ neg&oacute;cios</td></tr>
          <tr><td>Processamento de pagamentos</td><td class="red">&#10007;</td><td class="green">&#10003; 2.19% + $0.20/transa&ccedil;&atilde;o</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-note">Pre&ccedil;os baseados em informa&ccedil;&otilde;es p&uacute;blicas dispon&iacute;veis em maio de 2026. Verifique as tarifas atuais em fresha.com/pricing.</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>O que propriet&aacute;rios de neg&oacute;cios dizem sobre o Fresha</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F4B8;</span>
        <h3>A taxa de 20% surpreende muitos neg&oacute;cios</h3>
        <p>A comiss&atilde;o de marketplace do Fresha se aplica a cada novo cliente &mdash; m&iacute;nimo $6 por cada um. Um sal&atilde;o que capta 20 novos clientes por m&ecirc;s pelo marketplace paga $120 ou mais em taxas, al&eacute;m da mensalidade.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F512;</span>
        <h3>Os clientes pertencem ao Fresha, n&atilde;o a voc&ecirc;</h3>
        <p>O Fresha exige que os clientes criem uma conta Fresha para agendar. Seus clientes v&ecirc;em outros neg&oacute;cios na plataforma toda vez que abrem o app. Quando voc&ecirc; sai do Fresha, suas avalia&ccedil;&otilde;es do marketplace e visibilidade ficam com eles.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>Sem lembretes por WhatsApp ou Telegram</h3>
        <p>O Fresha envia lembretes por SMS e email &mdash; mas WhatsApp e Telegram n&atilde;o est&atilde;o dispon&iacute;veis nativamente. Para neg&oacute;cios no Brasil onde WhatsApp &eacute; o canal principal de comunica&ccedil;&atilde;o, essa &eacute; uma limita&ccedil;&atilde;o significativa.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x2601;&#xFE0F;</span>
        <h3>Seus dados ficam na nuvem deles</h3>
        <p>N&atilde;o existe op&ccedil;&atilde;o self-hosted nem facilidade de exporta&ccedil;&atilde;o. Se o Fresha mudar seus pre&ccedil;os, encerrar as atividades ou for adquirido, o hist&oacute;rico dos seus clientes fica em risco. O Pronto permite que voc&ecirc; seja dono completo dos seus dados.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Onde o Fresha tem uma vantagem real</h2>
    <p class="wins-note">Uma an&aacute;lise honesta de onde o Fresha realmente supera o Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>O marketplace &eacute; real</h3>
        <p>O Fresha tem mais de 130.000 neg&oacute;cios e milh&otilde;es de consumidores ativos buscando servi&ccedil;os de beleza e bem-estar. Se voc&ecirc; &eacute; um neg&oacute;cio novo que precisa de descoberta org&acirc;nica de clientes, o marketplace do Fresha pode trazer agendamentos reais. O Pronto n&atilde;o oferece marketplace.</p>
      </div>

      <div class="wins-card">
        <h3>Processamento de pagamentos integrado</h3>
        <p>O Fresha inclui pagamentos com cart&atilde;o integrados desde o in&iacute;cio. O PDV do Pronto aceita dinheiro, cart&atilde;o e transfer&ecirc;ncia &mdash; mas o Pronto n&atilde;o processa pagamentos com cart&atilde;o diretamente. Voc&ecirc; precisar&aacute; de um terminal de pagamento independente.</p>
      </div>

    </div>
  </div>
</section>

<section class="pricing-section">
  <div class="pricing-inner">
    <h2>O que voc&ecirc; realmente paga por m&ecirc;s</h2>
    <div class="pricing-cols">

      <div class="pricing-card pronto">
        <div class="pricing-label green">Pronto</div>
        <div class="pricing-highlight">A partir de $0/m&ecirc;s</div>
        <ul class="pricing-list">
          <li>&#10003; Plano Free: $0/m&ecirc;s &mdash; 1 funcion&aacute;rio, 100 clientes</li>
          <li>&#10003; Starter: $19/m&ecirc;s &mdash; 3 funcion&aacute;rios, clientes ilimitados</li>
          <li>&#10003; Pro: $39/m&ecirc;s &mdash; 15 funcion&aacute;rios, ilimitado</li>
          <li>&#10003; Agency: $79/m&ecirc;s &mdash; m&uacute;ltiplos locais</li>
          <li>&#10003; 0% de comiss&atilde;o em todos os agendamentos</li>
          <li>&#10003; Self-hosted: gr&aacute;tis para sempre</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
      </div>

      <div class="pricing-card fresha">
        <div class="pricing-label">Fresha</div>
        <div class="pricing-highlight">A partir de $19.95/m&ecirc;s</div>
        <ul class="pricing-list">
          <li>&rarr; Individual: ~$19.95/m&ecirc;s</li>
          <li>&rarr; Team: ~$14.95/m&ecirc;s por membro da equipe</li>
          <li>&rarr; 5 funcion&aacute;rios = ~$75/m&ecirc;s s&oacute; em mensalidade</li>
          <li>&rarr; + 20% por cada novo cliente do marketplace (m&iacute;n. $6)</li>
          <li>&rarr; + Processamento: 2.19% + $0.20/transa&ccedil;&atilde;o</li>
          <li>&rarr; Sem plano gratuito &mdash; apenas 7 dias de teste</li>
        </ul>
        <p class="pricing-note-small">Verifique as tarifas atuais em fresha.com/pricing</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Exemplo real</h3>
      <p>Um sal&atilde;o de 3 pessoas que capta 15 novos clientes por m&ecirc;s pelo marketplace do Fresha paga: ~$45/m&ecirc;s em mensalidade + ~$90 em taxas por novos clientes = $135+/m&ecirc;s antes das taxas de processamento. O plano Starter equivalente do Pronto custa $19/m&ecirc;s com zero comiss&atilde;o.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>

    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa gratuita ao Fresha?</div>
      <div class="faq-a">Sim. O Pronto tem um plano gratuito sem mensalidade e sem comiss&atilde;o por agendamentos. O Fresha eliminou seu plano gratuito em 2025 &mdash; o plano Individual atual custa aproximadamente $19.95/m&ecirc;s, mais uma comiss&atilde;o de 20% por cada novo cliente que agendar pelo marketplace do Fresha.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Fresha cobra comiss&atilde;o?</div>
      <div class="faq-a">Sim. O Fresha cobra uma taxa &uacute;nica de 20% por cada novo cliente que agendar pelo marketplace, com um m&iacute;nimo de $6 por cliente. Isso &eacute; cobrado al&eacute;m da mensalidade. O Pronto cobra zero comiss&atilde;o em qualquer agendamento.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Os clientes podem agendar sem criar uma conta?</div>
      <div class="faq-a">Com o Pronto, sim &mdash; os clientes agendam com apenas nome e telefone, sem necessidade de conta. Com o Fresha, os clientes precisam criar uma conta Fresha para concluir um agendamento online. Isso adiciona atrito e significa que o Fresha controla o relacionamento com o cliente, n&atilde;o o seu neg&oacute;cio.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Existe uma alternativa self-hosted ao Fresha?</div>
      <div class="faq-a">Sim. O Pronto &eacute; a &uacute;nica alternativa open-source e self-hosted ao Fresha. Instale com um &uacute;nico comando no seu pr&oacute;prio servidor: docker compose up -d. Os dados dos seus clientes ficam no seu servidor &mdash; n&atilde;o na nuvem do Fresha. O Pronto tem licen&ccedil;a MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto tem notifica&ccedil;&otilde;es por WhatsApp como o Fresha?</div>
      <div class="faq-a">Sim. O Pronto inclui notifica&ccedil;&otilde;es nativas por WhatsApp, Telegram, Viber e Email sem custo adicional &mdash; confirma&ccedil;&atilde;o, lembrete 24h antes, lembrete 1h antes, mensagem p&oacute;s-visita e reativa&ccedil;&atilde;o. O Fresha n&atilde;o oferece notifica&ccedil;&otilde;es nativas por WhatsApp nem Telegram.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Quanto custa o Fresha por m&ecirc;s em 2026?</div>
      <div class="faq-a">Em 2026, o plano Individual do Fresha custa aproximadamente $19.95/m&ecirc;s. O plano Team custa aproximadamente $14.95/m&ecirc;s por membro da equipe &mdash; uma equipe de 5 pessoas paga cerca de $75/m&ecirc;s s&oacute; em mensalidade, antes da taxa de 20% por novos clientes do marketplace e as taxas de processamento de pagamento.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Posso migrar do Fresha para o Pronto?</div>
      <div class="faq-a">Sim. Exporte sua lista de clientes do Fresha e importe para o CRM do Pronto. Voc&ecirc; pode usar os dois em paralelo durante a transi&ccedil;&atilde;o. O SaaS do Pronto em trypronto.app leva minutos para configurar, ou instale no seu pr&oacute;prio servidor com um &uacute;nico comando.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Onde o Fresha tem vantagem sobre o Pronto?</div>
      <div class="faq-a">O Fresha tem um grande marketplace de consumidores com mais de 130.000 neg&oacute;cios e milh&otilde;es de clientes ativos buscando servi&ccedil;os de beleza e bem-estar. Se voc&ecirc; &eacute; um neg&oacute;cio novo que precisa captar clientes atrav&eacute;s de um marketplace, o Fresha pode trazer agendamentos org&acirc;nicos. O Pronto n&atilde;o tem marketplace &mdash; os clientes te encontram pelos seus pr&oacute;prios canais.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Pronto para parar de pagar as taxas do Fresha?</h2>
  <p>Comece gr&aacute;tis &mdash; sem cart&atilde;o de cr&eacute;dito, sem comiss&atilde;o, sem pegadinhas.</p>
  <div class="cta-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  </div>
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
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/vs/fresha'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtVsFreshaPage() {
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
