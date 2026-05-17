import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Booksy — Alternativa sem Taxa por Funcionário',
  description:
    'Pronto vs Booksy: plano grátis vs $29.99/mês+$10/funcionário. WhatsApp nativo vs só SMS. Self-hosted vs somente na nuvem. Veja qual é melhor.',
  alternates: {
    canonical: 'https://trypronto.app/pt/vs/booksy',
    languages: {
      en: 'https://trypronto.app/vs/booksy',
      es: 'https://trypronto.app/es/vs/booksy',
      'pt-BR': 'https://trypronto.app/pt/vs/booksy',
      'x-default': 'https://trypronto.app/vs/booksy',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/vs/booksy',
    title: 'Pronto vs Booksy — Alternativa sem Taxa por Funcionário',
    description:
      'Plano grátis vs $29.99/mês+$10/funcionário. WhatsApp nativo vs só SMS. Self-hosted vs somente na nuvem.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Booksy — Alternativa sem Taxa por Funcionário',
    description:
      'Plano grátis vs $29.99/mês+$10/funcionário. WhatsApp nativo vs só SMS. Self-hosted vs somente na nuvem.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa gratuita ao Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto tem um plano gratuito sem mensalidade e sem comissão. O Booksy não oferece um plano gratuito — o Booksy Biz começa em $29.99/mês mais $10/mês por cada funcionário adicional. O Booksy oferece um teste gratuito de 14 dias sem necessidade de cartão de crédito.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Booksy cobra comissão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Booksy não cobra comissão nos agendamentos padrão. Se você ativar o Booksy Boost — seu complemento opcional de visibilidade no marketplace — você paga 30% da primeira visita de cada novo cliente, com um mínimo de $10 e um máximo de $100 por cliente. Sem o Boost, não há comissão. O Pronto cobra zero comissão em qualquer caso.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto custa o Booksy para uma equipe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Booksy Biz começa em $29.99/mês para um usuário. Cada funcionário adicional custa $10/mês. Uma equipe de 3 pessoas paga aproximadamente $50/mês; uma equipe de 10 pessoas paga $119.99/mês para funcionários ilimitados. O plano Starter do Pronto cobre 3 funcionários por $19/mês; o Pro cobre 15 funcionários por $39/mês — sem cobrança por assento.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto tem notificações por WhatsApp como o Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Booksy não oferece notificações nativas por WhatsApp ou Telegram — ele inclui SMS (2.000 gratuitos/mês) e lembretes por e-mail. O Pronto inclui notificações nativas por WhatsApp, Telegram, Viber e E-mail sem custo adicional: confirmação de agendamento, lembrete 24h antes, lembrete 1h antes, mensagem pós-visita e reativação de clientes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Existe uma alternativa self-hosted ao Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é a única alternativa open-source e self-hosted ao Booksy. Instale com um único comando no seu próprio servidor: docker compose up -d. Os dados dos seus clientes ficam no seu servidor — não na nuvem do Booksy. O Pronto tem licença MIT.',
      },
    },
    {
      '@type': 'Question',
      name: 'Os clientes podem agendar sem criar uma conta no Booksy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Com o Pronto, os clientes agendam com apenas nome e telefone — sem necessidade de conta. Com o Booksy, os clientes são incentivados a criar uma conta no Booksy para usar a plataforma completa e receber lembretes. Isso mantém o relacionamento com o cliente dentro do ecossistema do Booksy, não no seu próprio negócio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Onde o Booksy tem vantagem sobre o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Booksy tem mais de 35 milhões de consumidores registrados — o maior marketplace de consumidores focado em beleza nos EUA. Para novas barbearias e salões em grandes cidades, esse marketplace pode realmente encher sua agenda. O Booksy também inclui processamento de pagamentos com cartão integrado e funcionalidades de depósito por não comparecimento. O Pronto não tem marketplace nem processamento de pagamentos integrado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso migrar do Booksy para o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Exporte sua lista de clientes do Booksy e importe para o CRM do Pronto. Você pode usar os dois em paralelo durante a transição. O SaaS do Pronto em trypronto.app leva minutos para configurar, ou instale no seu próprio servidor com um único comando.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/pt/vs/booksy',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Alternativa gratuita e open-source ao Booksy para salões e barbearias. Sem taxa por funcionário, zero comissão, notificações nativas por WhatsApp e Telegram, opção self-hosted.',
  alternateName: [
    'alternativa gratuita ao Booksy',
    'alternativa open source ao Booksy',
    'alternativa self-hosted ao Booksy',
    'alternativa ao Booksy sem taxa por funcionário',
    'alternativa ao Booksy com WhatsApp',
    'alternativa ao Booksy para barbearias',
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
  <a href="/pt/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/vs/booksy'})">Pre&ccedil;os</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={en:'/vs/booksy',es:'/es/vs/booksy'};if(m[this.value])location.href=m[this.value]"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/pt/">In&iacute;cio</a><span>&rsaquo;</span>
  <a href="/pt/vs/">Comparativos</a><span>&rsaquo;</span>
  Pronto vs Booksy
</div>

<main>

<section class="hero">
  <h1>Pronto vs Booksy &mdash; sem taxa por funcion&aacute;rio, self-hosted</h1>
  <p>O Booksy cobra $29.99/m&ecirc;s mais $10 por cada funcion&aacute;rio adicional. Uma barbearia de 3 cadeiras paga ~$50/m&ecirc;s antes do processamento de pagamentos. O plano Starter do Pronto cobre 3 funcion&aacute;rios por $19/m&ecirc;s fixo &mdash; sem cobran&ccedil;a por assento, nunca.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &mdash; sem cart&atilde;o &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; Plano gratuito $0</span>
    <span class="hero-pill">&#10003; Sem taxa por funcion&aacute;rio</span>
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
        <div class="verdict-item yes">&#10003; N&atilde;o quer cobran&ccedil;a por funcion&aacute;rio ao crescer</div>
        <div class="verdict-item yes">&#10003; Quer WhatsApp e Telegram inclu&iacute;dos</div>
        <div class="verdict-item yes">&#10003; Quer seus dados no seu pr&oacute;prio servidor</div>
        <div class="verdict-item yes">&#10003; N&atilde;o precisa de um marketplace de consumidores nos EUA</div>
      </div>
      <div class="verdict-col">
        <h3>Escolha o Booksy se&hellip;</h3>
        <div class="verdict-item no">&rarr; Quer acesso ao marketplace de 35M+ consumidores do Booksy</div>
        <div class="verdict-item no">&rarr; &Eacute; uma nova barbearia em grande cidade dos EUA buscando captar clientes</div>
        <div class="verdict-item no">&rarr; Precisa de processamento de pagamentos integrado e dep&oacute;sito por n&atilde;o comparecimento</div>
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
            <th>Booksy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Mensalidade base</td><td class="green">$0 plano gratuito</td><td class="red">$29.99/m&ecirc;s (sem plano gr&aacute;tis)</td></tr>
          <tr><td>Cobran&ccedil;a por funcion&aacute;rio</td><td class="green">Nenhuma &mdash; pre&ccedil;o fixo</td><td class="red">+$10/m&ecirc;s por funcion&aacute;rio adicional</td></tr>
          <tr><td>Custo mensal equipe de 3</td><td class="green">$19/m&ecirc;s</td><td class="red">~$50/m&ecirc;s</td></tr>
          <tr><td>Comiss&atilde;o por agendamentos</td><td class="green">0% sempre</td><td>0% padr&atilde;o; 30% primeira visita com Boost</td></tr>
          <tr><td>Comiss&atilde;o m&aacute;x. Boost/cliente</td><td class="green">Nenhuma</td><td>$100 por novo cliente</td></tr>
          <tr><td>Op&ccedil;&atilde;o self-hosted</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Somente na nuvem</td></tr>
          <tr><td>C&oacute;digo aberto</td><td class="green">&#10003; Licen&ccedil;a MIT</td><td class="red">&#10007; Propriet&aacute;rio</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es WhatsApp</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es Telegram</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Lembretes SMS</td><td class="green">&#10003; Via Viber</td><td class="green">&#10003; 2.000 gratuitos/m&ecirc;s</td></tr>
          <tr><td>Lembretes Email</td><td class="green">&#10003; Inclu&iacute;dos</td><td class="green">&#10003; Inclu&iacute;dos</td></tr>
          <tr><td>PDV offline</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requer internet</td></tr>
          <tr><td>Agendamento sem cadastro</td><td class="green">&#10003; Nome + telefone</td><td>&#9888;&#65039; Conta Booksy incentivada</td></tr>
          <tr><td>Marketplace de consumidores</td><td class="red">&#10007;</td><td class="green">&#10003; 35M+ consumidores</td></tr>
          <tr><td>Processamento de pagamentos</td><td class="red">&#10007;</td><td class="green">&#10003; 2.49% + $0.15/transa&ccedil;&atilde;o</td></tr>
          <tr><td>Dep&oacute;sito por n&atilde;o comparecimento</td><td class="green">&#10003;</td><td class="green">&#10003; Plano Boost+</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-hint">&#8592; Deslize para comparar &#8594;</div>
    <div class="table-note">Pre&ccedil;os baseados em informa&ccedil;&otilde;es p&uacute;blicas dispon&iacute;veis em maio de 2026. Verifique as tarifas atuais em biz.booksy.com/pricing.</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>O que propriet&aacute;rios de neg&oacute;cios dizem sobre o Booksy</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F4B8;</span>
        <h3>A taxa por funcion&aacute;rio acumula r&aacute;pido</h3>
        <p>O Booksy cobra $10/m&ecirc;s por cada funcion&aacute;rio adicional. Uma barbearia com 4 cadeiras paga $29.99 + $30 = ~$60/m&ecirc;s s&oacute; em mensalidade, antes das taxas de processamento. Um sal&atilde;o de 10 pessoas chega a $119.99/m&ecirc;s para funcion&aacute;rios ilimitados. Com o Pronto, o plano Pro cobre at&eacute; 15 funcion&aacute;rios por $39/m&ecirc;s fixo.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4CA;</span>
        <h3>A comiss&atilde;o do Boost surpreende neg&oacute;cios em crescimento</h3>
        <p>O Booksy Boost &eacute; opcional &mdash; mas se voc&ecirc; ativ&aacute;-lo para maior visibilidade no marketplace, paga 30% da primeira visita de cada novo cliente, at&eacute; $100 por cliente. Com 20 novos clientes por m&ecirc;s via Boost, isso pode chegar a $2.000 em comiss&otilde;es al&eacute;m da mensalidade. O Pronto cobra zero comiss&atilde;o, sempre.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F512;</span>
        <h3>Seus clientes v&ecirc;em a concorr&ecirc;ncia toda vez que voltam a agendar</h3>
        <p>Toda vez que um cliente abre o app do Booksy para reagendar com voc&ecirc;, v&ecirc; outros neg&oacute;cios listados por perto. O marketplace que os trouxe at&eacute; voc&ecirc; tamb&eacute;m mostra alternativas. Com o Pronto, os clientes agendam pela sua pr&oacute;pria p&aacute;gina &mdash; eles s&oacute; v&ecirc;em voc&ecirc;.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>Sem lembretes por WhatsApp ou Telegram</h3>
        <p>O Booksy envia lembretes por SMS e e-mail &mdash; mas WhatsApp e Telegram n&atilde;o est&atilde;o dispon&iacute;veis nativamente. Para neg&oacute;cios fora dos EUA onde o WhatsApp &eacute; o canal de comunica&ccedil;&atilde;o principal, essa &eacute; uma lacuna significativa. O Pronto inclui WhatsApp, Telegram, Viber e E-mail sem custo adicional.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Onde o Booksy tem uma vantagem real</h2>
    <p class="wins-note">Uma an&aacute;lise honesta de onde o Booksy realmente supera o Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>O marketplace &eacute; o maior trunfo do Booksy</h3>
        <p>O Booksy tem mais de 35 milh&otilde;es de consumidores registrados e &eacute; o maior marketplace de consumidores focado em beleza nos EUA. Para uma nova barbearia em Chicago ou Nova York, estar listado no Booksy pode realmente encher sua agenda mais r&aacute;pido que outros canais. O Pronto n&atilde;o tem marketplace &mdash; os clientes te encontram pelos seus pr&oacute;prios canais.</p>
      </div>

      <div class="wins-card">
        <h3>Pagamentos integrados e prote&ccedil;&atilde;o contra n&atilde;o comparecimento</h3>
        <p>O Booksy inclui pagamentos com cart&atilde;o integrados e fun&ccedil;&otilde;es de dep&oacute;sito/n&atilde;o comparecimento. O PDV do Pronto aceita dinheiro, cart&atilde;o e transfer&ecirc;ncia &mdash; mas o Pronto n&atilde;o processa pagamentos com cart&atilde;o diretamente. Voc&ecirc; precisar&aacute; de um terminal de pagamento independente.</p>
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
          <li>&#10003; Free: $0/m&ecirc;s &mdash; 1 funcion&aacute;rio, 100 clientes</li>
          <li>&#10003; Starter: $19/m&ecirc;s &mdash; 3 funcion&aacute;rios, clientes ilimitados</li>
          <li>&#10003; Pro: $39/m&ecirc;s &mdash; 15 funcion&aacute;rios, ilimitado</li>
          <li>&#10003; Agency: $79/m&ecirc;s &mdash; m&uacute;ltiplos locais</li>
          <li>&#10003; 0% de comiss&atilde;o, sempre</li>
          <li>&#10003; Self-hosted: gr&aacute;tis para sempre</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
      </div>

      <div class="pricing-card booksy">
        <div class="pricing-label">Booksy</div>
        <div class="pricing-highlight">A partir de $29.99/m&ecirc;s</div>
        <ul class="pricing-list">
          <li>&rarr; Biz: $29.99/m&ecirc;s para 1 usu&aacute;rio</li>
          <li>&rarr; Cada funcion&aacute;rio adicional: +$10/m&ecirc;s</li>
          <li>&rarr; Complemento Boost: +$49.99/m&ecirc;s</li>
          <li>&rarr; 10+ funcion&aacute;rios: $119.99/m&ecirc;s ilimitado</li>
          <li>&rarr; Comiss&atilde;o Boost: 30% primeira visita, m&aacute;x. $100/cliente</li>
          <li>&rarr; Processamento: 2.49% + $0.15/transa&ccedil;&atilde;o</li>
          <li>&rarr; Sem plano gratuito &mdash; apenas 14 dias de teste</li>
        </ul>
        <p class="pricing-note-small">Verifique as tarifas atuais em biz.booksy.com/pricing</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Exemplo real</h3>
      <p>Uma barbearia de 3 pessoas no Booksy paga: $29.99 + $20 em taxas por funcion&aacute;rios = ~$50/m&ecirc;s, mais 2.49% em cada transa&ccedil;&atilde;o com cart&atilde;o. O plano Starter equivalente do Pronto custa $19/m&ecirc;s fixo &mdash; sem taxa por funcion&aacute;rio, sem taxa por transa&ccedil;&atilde;o, zero comiss&atilde;o.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>

    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa gratuita ao Booksy?</div>
      <div class="faq-a">Sim. O Pronto tem um plano gratuito sem mensalidade e sem comiss&atilde;o. O Booksy n&atilde;o oferece um plano gratuito &mdash; o Booksy Biz come&ccedil;a em $29.99/m&ecirc;s mais $10/m&ecirc;s por cada funcion&aacute;rio adicional. O Booksy oferece um teste gratuito de 14 dias sem necessidade de cart&atilde;o de cr&eacute;dito.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Booksy cobra comiss&atilde;o?</div>
      <div class="faq-a">O Booksy n&atilde;o cobra comiss&atilde;o nos agendamentos padr&atilde;o. Se voc&ecirc; ativar o Booksy Boost &mdash; seu complemento opcional de visibilidade no marketplace &mdash; voc&ecirc; paga 30% da primeira visita de cada novo cliente, com um m&iacute;nimo de $10 e um m&aacute;ximo de $100 por cliente. Sem o Boost, n&atilde;o h&aacute; comiss&atilde;o. O Pronto cobra zero comiss&atilde;o em qualquer caso.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Quanto custa o Booksy para uma equipe?</div>
      <div class="faq-a">O Booksy Biz come&ccedil;a em $29.99/m&ecirc;s para um usu&aacute;rio. Cada funcion&aacute;rio adicional custa $10/m&ecirc;s. Uma equipe de 3 pessoas paga aproximadamente $50/m&ecirc;s; uma equipe de 10 pessoas paga $119.99/m&ecirc;s para funcion&aacute;rios ilimitados. O plano Starter do Pronto cobre 3 funcion&aacute;rios por $19/m&ecirc;s; o Pro cobre 15 funcion&aacute;rios por $39/m&ecirc;s &mdash; sem cobran&ccedil;a por assento.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto tem notifica&ccedil;&otilde;es por WhatsApp como o Booksy?</div>
      <div class="faq-a">O Booksy n&atilde;o oferece notifica&ccedil;&otilde;es nativas por WhatsApp ou Telegram &mdash; ele inclui SMS (2.000 gratuitos/m&ecirc;s) e lembretes por e-mail. O Pronto inclui notifica&ccedil;&otilde;es nativas por WhatsApp, Telegram, Viber e E-mail sem custo adicional: confirma&ccedil;&atilde;o de agendamento, lembrete 24h antes, lembrete 1h antes, mensagem p&oacute;s-visita e reativa&ccedil;&atilde;o de clientes.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Existe uma alternativa self-hosted ao Booksy?</div>
      <div class="faq-a">Sim. O Pronto &eacute; a &uacute;nica alternativa open-source e self-hosted ao Booksy. Instale com um &uacute;nico comando no seu pr&oacute;prio servidor: docker compose up -d. Os dados dos seus clientes ficam no seu servidor &mdash; n&atilde;o na nuvem do Booksy. O Pronto tem licen&ccedil;a MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Os clientes podem agendar sem criar uma conta no Booksy?</div>
      <div class="faq-a">Com o Pronto, os clientes agendam com apenas nome e telefone &mdash; sem necessidade de conta. Com o Booksy, os clientes s&atilde;o incentivados a criar uma conta no Booksy para usar a plataforma completa e receber lembretes. Isso mant&eacute;m o relacionamento com o cliente dentro do ecossistema do Booksy, n&atilde;o no seu pr&oacute;prio neg&oacute;cio.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Onde o Booksy tem vantagem sobre o Pronto?</div>
      <div class="faq-a">O Booksy tem mais de 35 milh&otilde;es de consumidores registrados &mdash; o maior marketplace de consumidores focado em beleza nos EUA. Para novas barbearias e sal&otilde;es em grandes cidades, esse marketplace pode realmente encher sua agenda. O Booksy tamb&eacute;m inclui processamento de pagamentos com cart&atilde;o integrado e funcionalidades de dep&oacute;sito por n&atilde;o comparecimento. O Pronto n&atilde;o tem marketplace nem processamento de pagamentos integrado.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Posso migrar do Booksy para o Pronto?</div>
      <div class="faq-a">Sim. Exporte sua lista de clientes do Booksy e importe para o CRM do Pronto. Voc&ecirc; pode usar os dois em paralelo durante a transi&ccedil;&atilde;o. O SaaS do Pronto em trypronto.app leva minutos para configurar, ou instale no seu pr&oacute;prio servidor com um &uacute;nico comando.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Pronto para parar de pagar taxa por funcion&aacute;rio?</h2>
  <p>Come&ccedil;e gr&aacute;tis &mdash; sem cart&atilde;o, sem comiss&atilde;o, sem cobran&ccedil;a por assento.</p>
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
      <a href="/pt/vs/fresha">vs Fresha</a>
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
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/vs/booksy'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtVsBooksyPage() {
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
