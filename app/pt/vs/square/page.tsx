import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto vs Square Appointments — Global e Self-Hosted',
  description:
    'Pronto vs Square Appointments: disponível globalmente vs só 5 países, WhatsApp nativo, self-hosted, sem dependência do ecossistema Square.',
  alternates: {
    canonical: 'https://trypronto.app/pt/vs/square',
    languages: {
      en: 'https://trypronto.app/vs/square',
      es: 'https://trypronto.app/es/vs/square',
      'pt-BR': 'https://trypronto.app/pt/vs/square',
      'x-default': 'https://trypronto.app/vs/square',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/vs/square',
    title: 'Pronto vs Square Appointments — Global e Self-Hosted',
    description:
      'Disponível globalmente vs só 5 países. WhatsApp nativo vs só SMS. Self-hosted vs somente na nuvem. Sem dependência do ecossistema Square.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto vs Square Appointments — Global e Self-Hosted',
    description:
      'Disponível globalmente vs só 5 países. WhatsApp nativo vs só SMS. Self-hosted vs somente na nuvem. Sem dependência do ecossistema Square.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa gratuita ao Square Appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Tanto o Pronto quanto o Square Appointments oferecem planos gratuitos. O Square Appointments Free está limitado a uma localização e exige usar o processamento de pagamentos do Square a 2,6% + $0,15 por transação. O plano gratuito do Pronto inclui POS, CRM, agendamentos e notificações por e-mail sem requisito de processador de pagamentos. O Pronto também oferece uma versão self-hosted gratuita sem limites de clientes ou funcionários.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto custa o Square Appointments por mês em 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Square Appointments tem três planos em 2026: Free ($0), Plus ($29/mês por localização) e Premium ($69/mês por localização). Um negócio com 3 localizações no plano Plus paga $87/mês em assinatura antes do processamento de pagamentos. As taxas de processamento de 2,5%-2,6% mais $0,15 por transação se aplicam em todos os planos. Não há desconto por faturamento anual.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Square Appointments cobra comissão por agendamentos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O Square Appointments não cobra comissão por agendamentos. No entanto, as taxas de processamento de 2,5%-2,6% mais $0,15 por transação se aplicam quando você aceita pagamentos com cartão pelo Square. Você não pode usar um processador de pagamentos diferente com o Square Appointments — os pagamentos Square são obrigatórios. O Pronto cobra zero comissão e funciona com qualquer terminal de pagamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Square Appointments está disponível fora dos EUA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Square Appointments está disponível nos EUA, Canadá, Austrália, Reino Unido e Japão. Não está disponível no Brasil, na maior parte da América Latina, na Europa Oriental, na maior parte da Ásia, na África ou no Oriente Médio. O Pronto está disponível globalmente — tanto a versão self-hosted quanto o SaaS em trypronto.app funcionam em qualquer país.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto tem notificações por WhatsApp como o Square Appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Square Appointments envia lembretes automáticos por e-mail e SMS. WhatsApp e Telegram não estão disponíveis. O Pronto inclui notificações nativas por WhatsApp, Telegram, Viber e E-mail sem custo adicional em todos os planos — confirmação, lembrete 24h antes, lembrete 1h antes, mensagem pós-visita e reativação de clientes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Existe uma alternativa self-hosted ao Square Appointments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é a única alternativa open-source e self-hosted ao Square Appointments. Instale com um único comando: docker compose up -d. Seus dados ficam no seu próprio servidor — sem dependência da nuvem, sem vendor lock-in, sem processador de pagamentos obrigatório. O Pronto tem licença MIT.',
      },
    },
    {
      '@type': 'Question',
      name: 'Onde o Square Appointments tem vantagem sobre o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Square Appointments está profundamente integrado ao ecossistema Square — Square POS, Square Payroll, Square Marketing e o hardware Square funcionam juntos de forma perfeita. Para negócios que já usam Square para pagamentos, isso é uma vantagem real. O Square também suporta Apple Pay e Google Pay nativamente e oferece leitores de cartão físicos. O Pronto não processa pagamentos com cartão diretamente e não se integra ao ecossistema do Square.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso migrar do Square Appointments para o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Exporte sua lista de clientes do Square Appointments e importe para o CRM do Pronto. Como o Square Appointments não tem contratos de longo prazo, você pode migrar ao final de qualquer período de faturamento mensal. O SaaS do Pronto em trypronto.app leva minutos para configurar, ou instale no seu próprio servidor com um único comando.',
      },
    },
  ],
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/pt/vs/square',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Alternativa open-source e self-hosted ao Square Appointments. Disponível globalmente, notificações nativas por WhatsApp e Telegram, sem dependência de processador de pagamentos, POS offline.',
  alternateName: [
    'alternativa gratuita ao Square Appointments',
    'alternativa open source ao Square Appointments',
    'alternativa self-hosted ao Square Appointments',
    'alternativa ao Square Appointments com WhatsApp',
    'alternativa ao Square Appointments no Brasil',
    'alternativa ao Square Appointments global',
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
.hero p{font-size:17px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 32px}
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
.pricing-card.square{border:1px solid #e2e8f0;background:#fff}
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
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/vs/square'})">Pre&ccedil;os</a>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <select aria-label="Language" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;" onchange="var m={en:'/vs/square',es:'/es/vs/square'};if(m[this.value])location.href=m[this.value]"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/pt/">In&iacute;cio</a><span>&rsaquo;</span>
  <a href="/pt/vs/">Comparativos</a><span>&rsaquo;</span>
  Pronto vs Square Appointments
</div>

<main>

<section class="hero">
  <h1>Pronto vs Square Appointments &mdash; global, sem depend&ecirc;ncia do ecossistema</h1>
  <p>O Square Appointments n&atilde;o est&aacute; dispon&iacute;vel no Brasil &mdash; e exige usar o processamento de pagamentos do Square, cobra por localiza&ccedil;&atilde;o, e s&oacute; funciona em 5 pa&iacute;ses. O Pronto funciona globalmente, roda no seu pr&oacute;prio servidor, inclui notifica&ccedil;&otilde;es por WhatsApp &mdash; e funciona com qualquer terminal de pagamento que voc&ecirc; j&aacute; tem.</p>
  <div class="hero-btns">
    <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &mdash; sem cart&atilde;o &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  </div>
  <div class="hero-pills">
    <span class="hero-pill">&#10003; Dispon&iacute;vel globalmente</span>
    <span class="hero-pill">&#10003; Sem depend&ecirc;ncia de pagamento</span>
    <span class="hero-pill">&#10003; Op&ccedil;&atilde;o self-hosted</span>
  </div>
</section>

<section class="verdict">
  <div class="verdict-inner">
    <h2>Resumo &mdash; qual escolher?</h2>
    <div class="verdict-cols">
      <div class="verdict-col">
        <h3>Escolha o Pronto se&hellip;</h3>
        <div class="verdict-item yes">&#10003; Voc&ecirc; est&aacute; no Brasil ou fora dos EUA, Canad&aacute;, Austr&aacute;lia, Reino Unido ou Jap&atilde;o</div>
        <div class="verdict-item yes">&#10003; Quer manter seu terminal de pagamento atual</div>
        <div class="verdict-item yes">&#10003; Quer WhatsApp e Telegram inclu&iacute;dos</div>
        <div class="verdict-item yes">&#10003; Quer seus dados no seu pr&oacute;prio servidor</div>
        <div class="verdict-item yes">&#10003; N&atilde;o quer pre&ccedil;os por localiza&ccedil;&atilde;o ao expandir</div>
      </div>
      <div class="verdict-col">
        <h3>Escolha o Square Appointments se&hellip;</h3>
        <div class="verdict-item no">&rarr; J&aacute; usa Square para pagamentos e quer um s&oacute; ecossistema</div>
        <div class="verdict-item no">&rarr; Quer Apple Pay e Google Pay integrados desde o primeiro dia</div>
        <div class="verdict-item no">&rarr; Precisa de hardware Square (leitores de cart&atilde;o, terminais)</div>
        <div class="verdict-item no">&rarr; &Eacute; profissional solo nos EUA/Canad&aacute; no plano gratuito</div>
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
            <th>Square Appointments</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Plano gratuito</td><td class="green">&#10003; $0</td><td class="green">&#10003; $0 (1 localiza&ccedil;&atilde;o, limitado)</td></tr>
          <tr><td>Pre&ccedil;o base plano pago</td><td class="green">$19/m&ecirc;s</td><td class="red">$29/m&ecirc;s por localiza&ccedil;&atilde;o</td></tr>
          <tr><td>Pre&ccedil;o por localiza&ccedil;&atilde;o</td><td class="green">N&atilde;o &mdash; pre&ccedil;o &uacute;nico</td><td class="red">Sim &mdash; $29&ndash;69/m&ecirc;s por localiza&ccedil;&atilde;o</td></tr>
          <tr><td>Neg&oacute;cio com 3 localiza&ccedil;&otilde;es</td><td class="green">$79/m&ecirc;s (Agency)</td><td class="red">$87&ndash;207/m&ecirc;s</td></tr>
          <tr><td>Comiss&atilde;o por agendamentos</td><td class="green">0%</td><td class="green">0%</td></tr>
          <tr><td>Contratos</td><td class="green">Nenhum</td><td class="green">Nenhum &mdash; cancele quando quiser</td></tr>
          <tr><td>Liberdade de processador de pagamentos</td><td class="green">&#10003; Qualquer terminal</td><td class="red">&#10007; Somente Square (obrigat&oacute;rio)</td></tr>
          <tr><td>Taxa de processamento</td><td class="red">&#10007; (externo)</td><td>2,5%&ndash;2,6% + $0,15/transa&ccedil;&atilde;o</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es WhatsApp</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Notifica&ccedil;&otilde;es Telegram</td><td class="green">&#10003; Nativas, inclu&iacute;das</td><td class="red">&#10007; N&atilde;o dispon&iacute;vel</td></tr>
          <tr><td>Lembretes Email</td><td class="green">&#10003; Inclu&iacute;dos</td><td class="green">&#10003; Inclu&iacute;dos</td></tr>
          <tr><td>Lembretes SMS</td><td>&#10003; Via Viber</td><td class="green">&#10003; Inclu&iacute;dos nos planos pagos</td></tr>
          <tr><td>Op&ccedil;&atilde;o self-hosted</td><td class="green">&#10003; Docker, MIT</td><td class="red">&#10007; Somente na nuvem</td></tr>
          <tr><td>C&oacute;digo aberto</td><td class="green">&#10003; Licen&ccedil;a MIT</td><td class="red">&#10007; Propriet&aacute;rio</td></tr>
          <tr><td>PDV offline</td><td class="green">&#10003; PWA offline</td><td class="red">&#10007; Requer internet</td></tr>
          <tr><td>Cliente reserva sem conta</td><td class="green">&#10003; Nome + telefone</td><td class="green">&#10003; Checkout de convidado</td></tr>
          <tr><td>Disponibilidade geogr&aacute;fica</td><td class="green">&#10003; Global</td><td class="red">&#9888;&#65039; Somente EUA, CA, AU, UK, JP</td></tr>
          <tr><td>Apple Pay / Google Pay</td><td class="red">&#10007;</td><td class="green">&#10003; Nativo</td></tr>
          <tr><td>Hardware POS f&iacute;sico</td><td class="red">&#10007;</td><td class="green">&#10003; Hardware Square</td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-hint">&#8592; Deslize para comparar &#8594;</div>
    <div class="table-note">Pre&ccedil;os baseados em informa&ccedil;&otilde;es p&uacute;blicas em maio de 2026. Verifique as tarifas em squareup.com/appointments/pricing.</div>
  </div>
</section>

<section class="pain-section">
  <div class="pain-inner">
    <h2>O que propriet&aacute;rios de neg&oacute;cios dizem sobre o Square Appointments</h2>
    <div class="pain-grid">

      <div class="pain-card">
        <span class="pain-icon">&#x1F512;</span>
        <h3>Preso ao ecossistema de pagamentos do Square</h3>
        <p>O Square Appointments s&oacute; funciona com o Square Payments &mdash; voc&ecirc; n&atilde;o pode usar um processador diferente. Se seus custos de processamento est&atilde;o altos, n&atilde;o h&aacute; alternativa dentro do Square Appointments. O Pronto aceita dinheiro, cart&atilde;o e transfer&ecirc;ncia banc&aacute;ria com qualquer terminal de pagamento, sem processador obrigat&oacute;rio.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4CD;</span>
        <h3>Pre&ccedil;o por localiza&ccedil;&atilde;o acumula r&aacute;pido</h3>
        <p>O Square Plus cobra $29/m&ecirc;s por localiza&ccedil;&atilde;o. Um neg&oacute;cio com 3 localiza&ccedil;&otilde;es paga $87/m&ecirc;s antes de uma &uacute;nica transa&ccedil;&atilde;o. Um neg&oacute;cio com 5 localiza&ccedil;&otilde;es paga $145/m&ecirc;s s&oacute; de assinatura. O plano Agency do Pronto cobre m&uacute;ltiplas localiza&ccedil;&otilde;es por $79/m&ecirc;s fixo &mdash; sem cobran&ccedil;as por localiza&ccedil;&atilde;o.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F4E8;</span>
        <h3>Sem WhatsApp ou Telegram</h3>
        <p>O Square Appointments envia lembretes por e-mail e SMS. WhatsApp e Telegram n&atilde;o est&atilde;o dispon&iacute;veis. Para os mais de 2 bilh&otilde;es de pessoas que usam WhatsApp diariamente &mdash; especialmente no Brasil &mdash; isso significa que os clientes recebem lembretes por um canal que raramente verificam. O Pronto inclui WhatsApp, Telegram, Viber e E-mail em todos os planos.</p>
      </div>

      <div class="pain-card">
        <span class="pain-icon">&#x1F310;</span>
        <h3>N&atilde;o dispon&iacute;vel no Brasil</h3>
        <p>O Square Appointments requer o Square Payments para funcionar. O Square Payments s&oacute; est&aacute; dispon&iacute;vel nos EUA, Canad&aacute;, Austr&aacute;lia, Reino Unido e Jap&atilde;o. Neg&oacute;cios no Brasil, na Am&eacute;rica Latina, na Europa Oriental, no Oriente M&eacute;dio ou na maior parte da &Aacute;sia n&atilde;o podem usar o Square Appointments. O Pronto funciona em qualquer pa&iacute;s &mdash; tanto self-hosted quanto SaaS.</p>
      </div>

    </div>
  </div>
</section>

<section class="wins-section">
  <div class="wins-inner">
    <h2>Onde o Square Appointments tem uma vantagem real</h2>
    <p class="wins-note">Uma an&aacute;lise honesta de onde o Square Appointments realmente supera o Pronto.</p>
    <div class="wins-grid">

      <div class="wins-card">
        <h3>O ecossistema Square &eacute; genuinamente poderoso</h3>
        <p>Se o seu neg&oacute;cio j&aacute; usa Square POS, Square Payroll, Square Marketing ou hardware Square, adicionar o Square Appointments cria uma opera&ccedil;&atilde;o totalmente integrada &mdash; um painel, um fluxo de pagamentos, um suporte. Para neg&oacute;cios nos EUA constru&iacute;dos sobre Square, essa integra&ccedil;&atilde;o &eacute; dif&iacute;cil de replicar. O Pronto n&atilde;o se integra ao ecossistema do Square.</p>
      </div>

      <div class="wins-card">
        <h3>Apple Pay, Google Pay e hardware f&iacute;sico</h3>
        <p>O Square Appointments suporta Apple Pay, Google Pay, pagamentos por aproxima&ccedil;&atilde;o e a gama completa de leitores e terminais Square. Para neg&oacute;cios que querem pagamentos presenciais gerenciados pelo mesmo fornecedor do software de agendamento, o Square entrega isso pronto para uso. O Pronto n&atilde;o processa pagamentos com cart&atilde;o diretamente.</p>
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
          <li>&#10003; Agency: $79/m&ecirc;s &mdash; m&uacute;ltiplos locais, pre&ccedil;o fixo</li>
          <li>&#10003; WhatsApp + Telegram inclu&iacute;dos</li>
          <li>&#10003; 0% de comiss&atilde;o, sempre</li>
          <li>&#10003; Funciona em qualquer pa&iacute;s</li>
          <li>&#10003; Self-hosted: gr&aacute;tis para sempre</li>
        </ul>
        <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
      </div>

      <div class="pricing-card square">
        <div class="pricing-label">Square Appointments</div>
        <div class="pricing-highlight">A partir de $0/m&ecirc;s</div>
        <ul class="pricing-list">
          <li>&rarr; Free: $0 &mdash; 1 localiza&ccedil;&atilde;o, 1 usu&aacute;rio, fun&ccedil;&otilde;es limitadas</li>
          <li>&rarr; Plus: $29/m&ecirc;s por localiza&ccedil;&atilde;o (at&eacute; 5 funcion&aacute;rios)</li>
          <li>&rarr; Premium: $69/m&ecirc;s por localiza&ccedil;&atilde;o (funcion&aacute;rios ilimitados)</li>
          <li>&rarr; 3 localiza&ccedil;&otilde;es no Plus: $87/m&ecirc;s</li>
          <li>&rarr; Processamento: 2,5%&ndash;2,6% + $0,15/transa&ccedil;&atilde;o (obrigat&oacute;rio)</li>
          <li>&rarr; Somente nos EUA, Canad&aacute;, Austr&aacute;lia, Reino Unido, Jap&atilde;o</li>
          <li>&rarr; Sem desconto por faturamento anual</li>
        </ul>
        <p class="pricing-note-small">Verifique as tarifas em squareup.com/appointments/pricing</p>
      </div>

    </div>
    <div class="example-box">
      <h3>Exemplo real</h3>
      <p>Um sal&atilde;o com 3 localiza&ccedil;&otilde;es no Square Appointments Plus paga $87/m&ecirc;s de assinatura, mais 2,5% + $0,15 em cada transa&ccedil;&atilde;o com cart&atilde;o. O plano Agency equivalente do Pronto cobre as 3 localiza&ccedil;&otilde;es por $79/m&ecirc;s fixo &mdash; com notifica&ccedil;&otilde;es de WhatsApp inclu&iacute;das e sem processador de pagamentos necess&aacute;rio.</p>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>

    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa gratuita ao Square Appointments?</div>
      <div class="faq-a">Sim. Tanto o Pronto quanto o Square Appointments oferecem planos gratuitos. O Square Appointments Free est&aacute; limitado a uma localiza&ccedil;&atilde;o e exige usar o processamento de pagamentos do Square a 2,6% + $0,15 por transa&ccedil;&atilde;o. O plano gratuito do Pronto inclui POS, CRM, agendamentos e notifica&ccedil;&otilde;es por e-mail sem requisito de processador de pagamentos. O Pronto tamb&eacute;m oferece uma vers&atilde;o self-hosted gratuita sem limites de clientes ou funcion&aacute;rios.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Quanto custa o Square Appointments por m&ecirc;s em 2026?</div>
      <div class="faq-a">O Square Appointments tem tr&ecirc;s planos em 2026: Free ($0), Plus ($29/m&ecirc;s por localiza&ccedil;&atilde;o) e Premium ($69/m&ecirc;s por localiza&ccedil;&atilde;o). Um neg&oacute;cio com 3 localiza&ccedil;&otilde;es no plano Plus paga $87/m&ecirc;s em assinatura antes do processamento de pagamentos. As taxas de processamento de 2,5%-2,6% mais $0,15 por transa&ccedil;&atilde;o se aplicam em todos os planos. N&atilde;o h&aacute; desconto por faturamento anual.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Square Appointments cobra comiss&atilde;o por agendamentos?</div>
      <div class="faq-a">N&atilde;o. O Square Appointments n&atilde;o cobra comiss&atilde;o por agendamentos. No entanto, as taxas de processamento de 2,5%-2,6% mais $0,15 por transa&ccedil;&atilde;o se aplicam quando voc&ecirc; aceita pagamentos com cart&atilde;o pelo Square. Voc&ecirc; n&atilde;o pode usar um processador de pagamentos diferente com o Square Appointments &mdash; os pagamentos Square s&atilde;o obrigat&oacute;rios. O Pronto cobra zero comiss&atilde;o e funciona com qualquer terminal de pagamento.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Square Appointments est&aacute; dispon&iacute;vel fora dos EUA?</div>
      <div class="faq-a">O Square Appointments est&aacute; dispon&iacute;vel nos EUA, Canad&aacute;, Austr&aacute;lia, Reino Unido e Jap&atilde;o. N&atilde;o est&aacute; dispon&iacute;vel no Brasil, na maior parte da Am&eacute;rica Latina, na Europa Oriental, na maior parte da &Aacute;sia, na &Aacute;frica ou no Oriente M&eacute;dio. O Pronto est&aacute; dispon&iacute;vel globalmente &mdash; tanto a vers&atilde;o self-hosted quanto o SaaS em trypronto.app funcionam em qualquer pa&iacute;s.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto tem notifica&ccedil;&otilde;es por WhatsApp como o Square Appointments?</div>
      <div class="faq-a">O Square Appointments envia lembretes autom&aacute;ticos por e-mail e SMS. WhatsApp e Telegram n&atilde;o est&atilde;o dispon&iacute;veis. O Pronto inclui notifica&ccedil;&otilde;es nativas por WhatsApp, Telegram, Viber e E-mail sem custo adicional em todos os planos &mdash; confirma&ccedil;&atilde;o, lembrete 24h antes, lembrete 1h antes, mensagem p&oacute;s-visita e reativa&ccedil;&atilde;o de clientes.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Existe uma alternativa self-hosted ao Square Appointments?</div>
      <div class="faq-a">Sim. O Pronto &eacute; a &uacute;nica alternativa open-source e self-hosted ao Square Appointments. Instale com um &uacute;nico comando: docker compose up -d. Seus dados ficam no seu pr&oacute;prio servidor &mdash; sem depend&ecirc;ncia da nuvem, sem vendor lock-in, sem processador de pagamentos obrigat&oacute;rio. O Pronto tem licen&ccedil;a MIT.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Onde o Square Appointments tem vantagem sobre o Pronto?</div>
      <div class="faq-a">O Square Appointments est&aacute; profundamente integrado ao ecossistema Square &mdash; Square POS, Square Payroll, Square Marketing e o hardware Square funcionam juntos de forma perfeita. Para neg&oacute;cios que j&aacute; usam Square para pagamentos, isso &eacute; uma vantagem real. O Square tamb&eacute;m suporta Apple Pay e Google Pay nativamente e oferece leitores de cart&atilde;o f&iacute;sicos. O Pronto n&atilde;o processa pagamentos com cart&atilde;o diretamente e n&atilde;o se integra ao ecossistema do Square.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Posso migrar do Square Appointments para o Pronto?</div>
      <div class="faq-a">Sim. Exporte sua lista de clientes do Square Appointments e importe para o CRM do Pronto. Como o Square Appointments n&atilde;o tem contratos de longo prazo, voc&ecirc; pode migrar ao final de qualquer per&iacute;odo de faturamento mensal. O SaaS do Pronto em trypronto.app leva minutos para configurar, ou instale no seu pr&oacute;prio servidor com um &uacute;nico comando.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Pronto para uma alternativa global e open-source ao Square?</h2>
  <p>Come&ccedil;e gr&aacute;tis &mdash; sem depend&ecirc;ncia de ecossistema, WhatsApp inclu&iacute;do, dispon&iacute;vel em qualquer pa&iacute;s.</p>
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
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/vs/square'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtVsSquarePage() {
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
