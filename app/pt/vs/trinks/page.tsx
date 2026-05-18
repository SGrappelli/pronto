import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Trinks — Alternativa Gratuita com WhatsApp',
  description:
    'Pronto vs Trinks: plano grátis vs R$89/mês, WhatsApp nativo vs só SMS, self-hosted vs somente na nuvem. Compare os sistemas para salão e barbearia.',
  alternates: {
    canonical: 'https://trypronto.app/pt/vs/trinks',
    languages: {
      'pt-BR': 'https://trypronto.app/pt/vs/trinks',
      'x-default': 'https://trypronto.app/pt/vs/trinks',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/vs/trinks',
    title: 'Pronto vs Trinks — Alternativa Gratuita com WhatsApp',
    description:
      'Plano grátis vs R$89/mês. WhatsApp nativo vs só SMS. Self-hosted vs somente na nuvem. Compare os sistemas para salão e barbearia.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Trinks — Alternativa Gratuita com WhatsApp',
    description:
      'Plano grátis vs R$89/mês. WhatsApp nativo vs só SMS. Self-hosted vs somente na nuvem. Compare os sistemas para salão e barbearia.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa gratuita ao Trinks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto tem um plano gratuito sem mensalidade. O Trinks não oferece plano gratuito permanente — o plano mensal começa em R$89/mês e o plano anual a partir de R$65/mês. O Trinks oferece 5 dias de teste gratuito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto custa o Trinks por mês em 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em 2026, o Trinks cobra a partir de R$89/mês no plano mensal. O plano anual sai a partir de R$65/mês. Os valores variam conforme o número de profissionais cadastrados e as funcionalidades contratadas. O Trinks oferece 5 dias de teste gratuito sem cartão de crédito.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto envia lembretes por WhatsApp como o Trinks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Trinks envia lembretes por SMS e email — mas não possui WhatsApp nativo. O Pronto inclui notificações nativas por WhatsApp, Telegram, Viber e Email sem custo adicional em todos os planos: confirmação imediata, lembrete 24h antes, lembrete 1h antes, mensagem pós-visita e reativação de clientes inativos.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa ao Trinks para salões e barbearias?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto oferece agendamento online, CRM de clientes, controle de estoque e PDV — as funções essenciais do Trinks. As diferenças: o Pronto tem plano gratuito, inclui WhatsApp nativo em todos os planos e oferece versão self-hosted gratuita para sempre. O Trinks tem vantagem em emissão de Nota Fiscal, marketplace de descoberta de clientes e app nativo para clientes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Existe uma alternativa self-hosted ao Trinks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é a única alternativa open-source e self-hosted ao Trinks. Instale com um único comando no seu próprio servidor: docker compose up -d. Seus dados ficam 100% no seu servidor — sem dependência de nuvem de terceiros. O Pronto tem licença MIT.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto emite Nota Fiscal como o Trinks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O Pronto não emite Nota Fiscal de Serviço ou Produto (NF-e). O Trinks possui integração nativa para emissão de notas fiscais — uma funcionalidade importante para negócios que precisam de faturamento formal. Se a emissão de NF-e é essencial para o seu negócio, avalie essa necessidade antes de escolher o Pronto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Onde o Trinks tem vantagem sobre o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Trinks tem vantagem em três áreas: emissão de Nota Fiscal (NF-e) integrada, marketplace próprio para descoberta de novos clientes, e app nativo para iOS e Android. Também possui cálculo automático de comissões por profissional e mapa de calor de horários de pico. Para negócios que precisam de NF-e ou querem captar clientes pelo marketplace Trinks, essas funcionalidades são difíceis de substituir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como migrar do Trinks para o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Exporte sua lista de clientes do Trinks e importe para o CRM do Pronto. O Pronto SaaS em trypronto.app leva minutos para configurar, ou instale no seu próprio servidor com um único comando. Você pode usar os dois sistemas em paralelo durante a transição.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/pt/vs/trinks',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Alternativa gratuita e open-source ao Trinks para salões e barbearias brasileiras. Plano grátis, WhatsApp nativo, self-hosted, sem mensalidade obrigatória.',
  alternateName: [
    'alternativa gratuita ao Trinks',
    'alternativa open source ao Trinks',
    'alternativa self-hosted ao Trinks',
    'sistema para salão grátis alternativa Trinks',
    'alternativa ao Trinks com WhatsApp',
    'sistema para barbearia grátis alternativa Trinks',
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
.lang-badge{font-size:13px;font-weight:600;color:#6b7280;padding:4px 8px;border:1px solid #d1d5db;border-radius:6px}
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
.pricing-card.trinks{border:1px solid #e2e8f0;background:#fff}
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
  <a href="/pt/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/vs/trinks'})">Pre&ccedil;os</a>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <span class="lang-badge">PT</span>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/pt/">In&iacute;cio</a><span>&rsaquo;</span>
  <a href="/pt/vs/">Comparativos</a><span>&rsaquo;</span>
  Pronto vs Trinks
</div>

<main>

<section class="hero">
  <h1>Pronto vs Trinks &mdash; plano gr&aacute;tis e WhatsApp nativo</h1>
  <p>O Trinks come&ccedil;a em R$89/m&ecirc;s e n&atilde;o tem WhatsApp nativo &mdash; apenas SMS e email. O Pronto tem plano gratuito, inclui WhatsApp, Telegram e Viber em todos os planos e roda no seu pr&oacute;prio servidor. Sem mensalidade obrigat&oacute;ria.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &mdash; sem cart&atilde;o &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; Plano gr&aacute;tis $0</span>
    <span class="hero-pill">&#10003; WhatsApp inclu&iacute;do</span>
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
        <div class="verdict-item yes">&#10003; Quer WhatsApp e Telegram inclu&iacute;dos em todos os planos</div>
        <div class="verdict-item yes">&#10003; Quer seus dados no seu pr&oacute;prio servidor</div>
        <div class="verdict-item yes">&#10003; N&atilde;o precisa emitir Nota Fiscal pelo sistema</div>
        <div class="verdict-item yes">&#10003; Quer uma solu&ccedil;&atilde;o que funcione fora do Brasil tamb&eacute;m</div>
      </div>
      <div class="verdict-col">
        <h3>Escolha o Trinks se&hellip;</h3>
        <div class="verdict-item no">&rarr; Precisa emitir Nota Fiscal de Servi&ccedil;o e Produto (NF-e)</div>
        <div class="verdict-item no">&rarr; Quer captar novos clientes pelo marketplace Trinks</div>
        <div class="verdict-item no">&rarr; Precisa de app nativo para iOS e Android para seus clientes</div>
        <div class="verdict-item no">&rarr; Quer c&aacute;lculo autom&aacute;tico de comiss&otilde;es por profissional</div>
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
            <th>Trinks</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Plano gratuito</td><td class="green">&#10003; $0</td><td class="red">&#10007; Sem plano gr&aacute;tis</td></tr>
          <tr><td>Mensalidade inicial</td><td class="green">$0 (gratuito)</td><td class="red">A partir de R$89/m&ecirc;s</td></tr>
          <tr><td>Plano anual</td><td class="green">Dispon&iacute;vel</td><td>A partir de R$65/m&ecirc;s</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es WhatsApp</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es Telegram</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es SMS</td><td>&#10003; Via Viber</td><td class="green">&#10003; Inclu&iacute;das</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es Email</td><td class="green">&#10003; Inclu&iacute;das</td><td class="green">&#10003; Inclu&iacute;das</td></tr>
          <tr><td>Self-hosted</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Somente na nuvem</td></tr>
          <tr><td>C&oacute;digo aberto</td><td class="green">&#10003; Licen&ccedil;a MIT</td><td class="red">&#10007; Propriet&aacute;rio</td></tr>
          <tr><td>PDV offline</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requer internet</td></tr>
          <tr><td>Agendamento sem cadastro</td><td class="green">&#10003; Nome + telefone</td><td>&#9888;&#65039; Conta Trinks incentivada</td></tr>
          <tr><td>Emiss&atilde;o de Nota Fiscal (NF-e)</td><td class="red">&#10007;</td><td class="green">&#10003; Integrada</td></tr>
          <tr><td>Marketplace de clientes</td><td class="red">&#10007;</td><td class="green">&#10003; Trinks Marketplace</td></tr>
          <tr><td>App nativo para clientes</td><td>&#9888;&#65039; PWA</td><td class="green">&#10003; iOS e Android</td></tr>
          <tr><td>Comiss&atilde;o autom&aacute;tica</td><td class="red">&#10007;</td><td class="green">&#10003; Por profissional</td></tr>
          <tr><td>Mapa de calor de hor&aacute;rios</td><td class="red">&#10007;</td><td class="green">&#10003; Inclu&iacute;do</td></tr>
          <tr><td>Disponibilidade</td><td class="green">&#10003; Global</td><td>&#9888;&#65039; Brasil apenas</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-hint">&#8592; Deslize para ver a compara&ccedil;&atilde;o completa &#8594;</div>
    <div class="table-note">Pre&ccedil;os baseados em informa&ccedil;&otilde;es p&uacute;blicas dispon&iacute;veis em maio de 2026. Verifique as tarifas atuais em negocios.trinks.com/planos/</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>O que os donos de sal&atilde;o dizem sobre o Trinks</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F4B3;</span>
        <h3>Sem plano gratuito</h3>
        <p>O Trinks n&atilde;o oferece plano permanente gratuito. O teste dura apenas 5 dias &mdash; depois &eacute; preciso assinar a partir de R$89/m&ecirc;s. Para sal&otilde;es que est&atilde;o come&ccedil;ando ou para profissionais aut&ocirc;nomos, isso representa um custo fixo desde o primeiro dia. O Pronto tem plano gratuito sem limite de tempo, com PDV, CRM, estoque e agendamento online inclu&iacute;dos.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>Sem WhatsApp nativo</h3>
        <p>O Trinks envia lembretes por SMS e email &mdash; mas WhatsApp n&atilde;o est&aacute; dispon&iacute;vel nativamente. No Brasil, WhatsApp &eacute; o canal de comunica&ccedil;&atilde;o principal: mais de 95% dos smartphones brasileiros t&ecirc;m WhatsApp instalado. Lembretes por SMS t&ecirc;m taxa de abertura muito menor que WhatsApp. O Pronto inclui WhatsApp nativo em todos os planos, do gratuito ao Agency.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x2601;&#xFE0F;</span>
        <h3>Somente na nuvem</h3>
        <p>O Trinks &eacute; uma plataforma 100% em nuvem &mdash; n&atilde;o existe op&ccedil;&atilde;o self-hosted. Seus dados de clientes, hist&oacute;rico de atendimentos e relat&oacute;rios ficam nos servidores da Trinks. O Pronto oferece vers&atilde;o self-hosted gratuita para sempre: seus dados ficam no seu servidor, com total controle e sem depend&ecirc;ncia de terceiros.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4C8;</span>
        <h3>Custo cresce com o n&uacute;mero de profissionais</h3>
        <p>Os planos do Trinks escalam conforme o n&uacute;mero de profissionais cadastrados. Um sal&atilde;o com 5 ou mais profissionais pode pagar significativamente mais que o plano de entrada. O plano Pro do Pronto cobre at&eacute; 15 profissionais por $39/m&ecirc;s fixo &mdash; sem cobran&ccedil;a adicional por assento.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Onde o Trinks tem uma vantagem real</h2>
    <p class="wins-note">Uma an&aacute;lise honesta de onde o Trinks realmente supera o Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>Nota Fiscal integrada</h3>
        <p>O Trinks emite Nota Fiscal de Servi&ccedil;o e Produto (NF-e) diretamente pelo sistema &mdash; uma funcionalidade cr&iacute;tica para neg&oacute;cios brasileiros que precisam de faturamento formal. O Pronto n&atilde;o possui integra&ccedil;&atilde;o com emiss&atilde;o de NF-e. Se a sua opera&ccedil;&atilde;o exige emiss&atilde;o de notas fiscais pelo sistema de gest&atilde;o, avalie essa necessidade antes de migrar para o Pronto.</p>
      </div>

      <div class="wins-card">
        <h3>Marketplace e app nativo para clientes</h3>
        <p>O Trinks tem um marketplace onde clientes brasileiros buscam e encontram sal&otilde;es e barbearias &mdash; &uacute;til para neg&oacute;cios que querem captar novos clientes organicamente. O Trinks tamb&eacute;m oferece app nativo para iOS e Android para os clientes agendarem. O Pronto n&atilde;o tem marketplace e usa PWA (instal&aacute;vel, mas n&atilde;o uma app nativa de loja).</p>
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
          <li>&#10003; Gratuito: $0/m&ecirc;s &mdash; 1 funcion&aacute;rio, 100 clientes</li>
          <li>&#10003; Starter: $19/m&ecirc;s &mdash; 3 funcion&aacute;rios, clientes ilimitados</li>
          <li>&#10003; Pro: $39/m&ecirc;s &mdash; 15 funcion&aacute;rios, ilimitado</li>
          <li>&#10003; Agency: $79/m&ecirc;s &mdash; m&uacute;ltiplos locais</li>
          <li>&#10003; WhatsApp + Telegram inclu&iacute;dos</li>
          <li>&#10003; 0% de comiss&atilde;o</li>
          <li>&#10003; Self-hosted: gr&aacute;tis para sempre</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
      </div>

      <div class="pricing-card trinks">
        <div class="pricing-label">Trinks</div>
        <div class="pricing-highlight">A partir de R$89/m&ecirc;s</div>
        <ul class="pricing-list">
          <li>&rarr; Plano mensal: a partir de R$89/m&ecirc;s</li>
          <li>&rarr; Plano anual: a partir de R$65/m&ecirc;s</li>
          <li>&rarr; Valor varia pelo n&uacute;mero de profissionais</li>
          <li>&rarr; Sem plano gratuito &mdash; apenas 5 dias de teste</li>
          <li>&rarr; Lembretes: SMS e email (sem WhatsApp)</li>
          <li>&rarr; Emiss&atilde;o de NF-e: inclu&iacute;da</li>
        </ul>
        <p class="pricing-note-small">Verifique os valores atuais em negocios.trinks.com/planos/</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Exemplo real</h3>
      <p>Um sal&atilde;o com 3 profissionais paga a partir de R$89/m&ecirc;s no Trinks &mdash; sem WhatsApp e sem vers&atilde;o self-hosted. O plano Starter do Pronto cobre 3 funcion&aacute;rios por $19/m&ecirc;s com WhatsApp, Telegram e Viber inclu&iacute;dos. A vers&atilde;o self-hosted do Pronto &eacute; gratuita para sempre.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>

    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa gratuita ao Trinks?</div>
      <div class="faq-a">Sim. O Pronto tem um plano gratuito sem mensalidade. O Trinks n&atilde;o oferece plano gratuito permanente &mdash; o plano mensal come&ccedil;a em R$89/m&ecirc;s e o plano anual a partir de R$65/m&ecirc;s. O Trinks oferece 5 dias de teste gratuito.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Quanto custa o Trinks por m&ecirc;s em 2026?</div>
      <div class="faq-a">Em 2026, o Trinks cobra a partir de R$89/m&ecirc;s no plano mensal. O plano anual sai a partir de R$65/m&ecirc;s. Os valores variam conforme o n&uacute;mero de profissionais cadastrados e as funcionalidades contratadas. O Trinks oferece 5 dias de teste gratuito sem cart&atilde;o de cr&eacute;dito.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto envia lembretes por WhatsApp como o Trinks?</div>
      <div class="faq-a">O Trinks envia lembretes por SMS e email &mdash; mas n&atilde;o possui WhatsApp nativo. O Pronto inclui notifica&ccedil;&otilde;es nativas por WhatsApp, Telegram, Viber e Email sem custo adicional em todos os planos: confirma&ccedil;&atilde;o imediata, lembrete 24h antes, lembrete 1h antes, mensagem p&oacute;s-visita e reativa&ccedil;&atilde;o de clientes inativos.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa ao Trinks para sal&otilde;es e barbearias?</div>
      <div class="faq-a">Sim. O Pronto oferece agendamento online, CRM de clientes, controle de estoque e PDV &mdash; as fun&ccedil;&otilde;es essenciais do Trinks. As diferen&ccedil;as: o Pronto tem plano gratuito, inclui WhatsApp nativo em todos os planos e oferece vers&atilde;o self-hosted gratuita para sempre. O Trinks tem vantagem em emiss&atilde;o de Nota Fiscal, marketplace de descoberta de clientes e app nativo para clientes.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Existe uma alternativa self-hosted ao Trinks?</div>
      <div class="faq-a">Sim. O Pronto &eacute; a &uacute;nica alternativa open-source e self-hosted ao Trinks. Instale com um &uacute;nico comando no seu pr&oacute;prio servidor: docker compose up -d. Seus dados ficam 100% no seu servidor &mdash; sem depend&ecirc;ncia de nuvem de terceiros. O Pronto tem licen&ccedil;a MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto emite Nota Fiscal como o Trinks?</div>
      <div class="faq-a">N&atilde;o. O Pronto n&atilde;o emite Nota Fiscal de Servi&ccedil;o ou Produto (NF-e). O Trinks possui integra&ccedil;&atilde;o nativa para emiss&atilde;o de notas fiscais &mdash; uma funcionalidade importante para neg&oacute;cios que precisam de faturamento formal. Se a emiss&atilde;o de NF-e &eacute; essencial para o seu neg&oacute;cio, avalie essa necessidade antes de escolher o Pronto.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Onde o Trinks tem vantagem sobre o Pronto?</div>
      <div class="faq-a">O Trinks tem vantagem em tr&ecirc;s &aacute;reas: emiss&atilde;o de Nota Fiscal (NF-e) integrada, marketplace pr&oacute;prio para descoberta de novos clientes, e app nativo para iOS e Android. Tamb&eacute;m possui c&aacute;lculo autom&aacute;tico de comiss&otilde;es por profissional e mapa de calor de hor&aacute;rios de pico. Para neg&oacute;cios que precisam de NF-e ou querem captar clientes pelo marketplace Trinks, essas funcionalidades s&atilde;o dif&iacute;ceis de substituir.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Como migrar do Trinks para o Pronto?</div>
      <div class="faq-a">Exporte sua lista de clientes do Trinks e importe para o CRM do Pronto. O Pronto SaaS em trypronto.app leva minutos para configurar, ou instale no seu pr&oacute;prio servidor com um &uacute;nico comando. Voc&ecirc; pode usar os dois sistemas em paralelo durante a transi&ccedil;&atilde;o.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Pronto para testar uma alternativa gratuita ao Trinks?</h2>
  <p>Come&ccedil;e gr&aacute;tis &mdash; WhatsApp inclu&iacute;do, sem mensalidade, sem cart&atilde;o de cr&eacute;dito.</p>
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
      <a href="/pt/vs/booksy">vs Booksy</a>
      <a href="/pt/vs/mindbody">vs Mindbody</a>
      <a href="/pt/vs/vagaro">vs Vagaro</a>
      <a href="/pt/vs/square">vs Square</a>
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
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/vs/trinks'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtVsTrinksPage() {
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
