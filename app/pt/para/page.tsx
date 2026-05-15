import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pronto para Negócios de Serviço — Software Gratuito',
  description:
    'Software gratuito para salões de beleza, barbearias, academias, clínicas, cafés e spas. POS, CRM, agendamento e WhatsApp. Sem comissão. Self-hosted ou SaaS.',
  keywords:
    'software para negócios de serviços, PDV para pequenas empresas, software de agendamento grátis, programa para salão de beleza, software para barbearia, sistema para oficina mecânica, software clínica odontológica, gestão academia, PDV cafeteria, software código aberto negócios',
  alternates: {
    canonical: 'https://trypronto.app/pt/para/',
    languages: {
      en: 'https://trypronto.app/for/',
      es: 'https://trypronto.app/es/para/',
      'pt-BR': 'https://trypronto.app/pt/para/',
      'x-default': 'https://trypronto.app/for/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/para/',
    title: 'Pronto para Negócios de Serviço — Software Gratuito',
    description:
      'Software gratuito com POS, CRM, agendamento e notificações por WhatsApp, Telegram e Email. Para salões, barbearias, academias, clínicas e mais.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto para Negócios de Serviço — Software Gratuito',
    description:
      'POS, CRM, agendamento e WhatsApp. Sem comissão. Para salões, barbearias, academias, clínicas e mais.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'Início', item: 'https://trypronto.app/pt/' },
    { '@type': 'ListItem', position: 3, name: 'Para negócios', item: 'https://trypronto.app/pt/para/' },
  ],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pronto para Negócios de Serviço',
  description: 'Software gratuito de gestão para diferentes tipos de negócios de serviço',
  url: 'https://trypronto.app/pt/para/',
  numberOfItems: 8,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Salões de Beleza', url: 'https://trypronto.app/pt/para/saloes' },
    { '@type': 'ListItem', position: 2, name: 'Barbearias', url: 'https://trypronto.app/pt/para/barbearia' },
    { '@type': 'ListItem', position: 3, name: 'Academias e Centros Fitness', url: 'https://trypronto.app/pt/para/academia' },
    { '@type': 'ListItem', position: 4, name: 'Spa e Massagem', url: 'https://trypronto.app/pt/para/spa' },
    { '@type': 'ListItem', position: 5, name: 'Clínicas Odontológicas', url: 'https://trypronto.app/pt/para/clinica-dental' },
    { '@type': 'ListItem', position: 6, name: 'Cafés e Lanchonetes', url: 'https://trypronto.app/pt/para/cafeteria' },
    { '@type': 'ListItem', position: 7, name: 'Estúdios de Tatuagem', url: 'https://trypronto.app/pt/para/tatuagens' },
    { '@type': 'ListItem', position: 8, name: 'Oficinas Mecânicas', url: 'https://trypronto.app/pt/para/auto-repair' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O Pronto funciona para qualquer tipo de negócio de serviço?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto foi desenvolvido para qualquer negócio que trabalhe com atendimentos e agendamentos: salões de beleza, barbearias, academias, clínicas odontológicas, spas, cafés, estúdios de tatuagem e oficinas mecânicas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Preciso pagar para usar o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. A versão self-hosted é completamente gratuita para sempre. A versão SaaS em trypronto.app também tem plano gratuito com POS, CRM e agendamento incluídos. Planos pagos a partir de $19/mês adicionam WhatsApp, Telegram e mais.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto cobra comissão sobre os meus agendamentos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Os clientes reservam diretamente com você. O Pronto não fica entre você e seus clientes e não cobra nenhuma comissão sobre agendamentos ou vendas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais notificações automáticas o Pronto envia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto envia confirmação de agendamento, lembrete 24 horas antes, lembrete 1 hora antes, mensagem de agradecimento pós-visita e reativação de clientes inativos — por WhatsApp, Telegram, Viber e Email.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como os clientes fazem agendamentos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada negócio tem uma página pública de agendamento. Os clientes reservam com apenas nome e telefone — sem cadastro ou aplicativo necessário. Zero comissão para o negócio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso instalar o Pronto no meu próprio servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é open-source (licença MIT) e roda em qualquer servidor Linux com Docker: docker compose up -d. Seus dados ficam 100% no seu servidor, sem dependência de nuvem de terceiros.',
      },
    },
  ],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pronto',
  url: 'https://trypronto.app',
  logo: 'https://trypronto.app/logo.png',
  sameAs: ['https://github.com/SGrappelli/pronto'],
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
@media(max-width:900px){.hide-tablet{display:none}}

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
.grid-label{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;text-align:center}
.grid-sublabel{font-size:14px;color:#6b7280;line-height:1.6;text-align:center;margin-bottom:28px;max-width:580px;margin-left:auto;margin-right:auto}

.biz-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}

.biz-card{display:block;text-decoration:none;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px 24px;transition:border-color 0.15s,box-shadow 0.15s;position:relative;overflow:hidden}
.biz-card:hover{border-color:#16a34a;box-shadow:0 4px 20px rgba(22,163,74,0.1)}
.biz-card-emoji{font-size:36px;margin-bottom:14px;display:block;line-height:1}
.biz-card-title{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.biz-card-desc{font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:10px}
.biz-card-cta{font-size:12px;font-weight:600;color:#16a34a;display:block}
.biz-card-arrow{position:absolute;top:24px;right:20px;font-size:18px;color:#d1d5db;transition:color 0.15s,transform 0.15s}
.biz-card:hover .biz-card-arrow{color:#16a34a;transform:translateX(3px)}

.shared{background:#f8fafc;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;padding:48px 48px}
.shared-inner{max-width:960px;margin:0 auto}
.shared h2{font-size:22px;font-weight:700;color:#0a0a0a;margin-bottom:28px;text-align:center}
.shared-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#e2e8f0;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0}
.shared-item{background:#f8fafc;padding:24px 20px}
.shared-title{font-family:'Bricolage Grotesque',sans-serif;font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.shared-desc{font-size:14px;color:#6b7280;line-height:1.6}

.faq{padding:64px 48px;border-top:1px solid #f0f0f0}
.faq-inner{max-width:760px;margin:0 auto}
.faq h2{font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:36px;text-align:center}
.faq-item{border-bottom:1px solid #f0f0f0;padding:20px 0}
.faq-item:last-child{border-bottom:none}
.faq-q{font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:10px;font-family:'Bricolage Grotesque',sans-serif}
.faq-a{font-size:15px;color:#6b7280;line-height:1.7}
.faq-a code{background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:13px;font-family:monospace}

.cta{padding:64px 48px;text-align:center}
.cta h2{font-size:34px;font-weight:800;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:12px}
.cta p{font-size:16px;color:#374151;margin-bottom:28px}
.btn-primary{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}
.btn-outline{background:transparent;color:#111;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 22px;border-radius:8px;border:1px solid #d1d5db;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}
.btn-outline:hover{border-color:#111}

footer{padding:28px 48px;border-top:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;background:#fff}
.footer-brand{font-size:22px;font-weight:800;color:#111;letter-spacing:-0.5px}
.footer-brand span{color:#16a34a}
.footer-copy{font-size:13px;color:#9ca3af;margin-top:2px}
.footer-right{display:flex;align-items:center;gap:20px}
.footer-links{display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end}
.footer-links a{font-size:13px;color:#9ca3af;text-decoration:none}
.footer-links a:hover{color:#111}
.footer-social{display:flex;gap:10px;align-items:center;flex-shrink:0}
.footer-social a{color:#9ca3af;display:flex;align-items:center;line-height:1}
.footer-social a:hover{color:#111}

@media(max-width:1024px){
  nav,footer{padding:0 24px}
  footer{padding:24px}
  .hero,.grid-section,.shared,.faq,.cta{padding-left:24px;padding-right:24px}
  .breadcrumb{padding:14px 24px}
  .biz-grid{grid-template-columns:repeat(2,1fr)}
  .shared-grid{grid-template-columns:repeat(2,1fr)}
  .hero h1{font-size:40px}
}
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
  .faq{padding:44px 16px}
  .cta{padding:44px 16px}
  .cta h2{font-size:26px}
  .breadcrumb{padding:12px 16px}
  .biz-grid{grid-template-columns:1fr 1fr}
  .shared-grid{grid-template-columns:1fr 1fr}
  footer{flex-direction:column;align-items:flex-start;gap:16px;padding:24px 16px}
  .footer-right{flex-direction:column;align-items:flex-start;gap:12px}
  .footer-links{flex-wrap:wrap;gap:12px}
}
@media(max-width:400px){
  .biz-grid{grid-template-columns:1fr}
}
`

const pageContent = `
<nav>
  <a href="/pt/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/para'})">Pre&ccedil;os</a>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','login_click',{label:'nav_signin'})">Entrar</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for',es:'/es/para',pt:'/pt/para'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/pt/para'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/pt/">&Iacute;nicio</a><span>&rsaquo;</span>
  Para neg&oacute;cios
</div>

<main>

<section class="hero">
  <div class="hero-eyebrow">
    <span class="hero-eyebrow-dot"></span>
    Feito para neg&oacute;cios de servi&ccedil;o
  </div>
  <h1>Software gratuito para neg&oacute;cios de servi&ccedil;o</h1>
  <p>POS, CRM, agendamento online e notifica&ccedil;&otilde;es autom&aacute;ticas por WhatsApp, Telegram e Email &mdash; sem comiss&atilde;o, sem taxas ocultas.</p>
  <div class="hero-pills">
    <span class="hero-pill">Zero comiss&atilde;o</span>
    <span class="hero-pill">Self-hosted ou SaaS</span>
    <span class="hero-pill">Instala&ccedil;&atilde;o em 1 comando</span>
    <span class="hero-pill">Email &middot; Telegram &middot; WhatsApp &middot; Viber</span>
    <span class="hero-pill">C&oacute;digo aberto MIT</span>
  </div>
</section>

<section class="grid-section">
  <div class="grid-section-inner">
    <div class="grid-label">Escolha o seu tipo de neg&oacute;cio</div>
    <p class="grid-sublabel">Conte&uacute;do adaptado para cada segmento &mdash; funcionalidades, exemplos e casos de uso espec&iacute;ficos para o seu neg&oacute;cio.</p>
    <div class="biz-grid">

      <a href="/pt/para/saloes" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F487;</span>
        <div class="biz-card-title">Sal&otilde;es de Beleza</div>
        <div class="biz-card-desc">Software completo para sal&otilde;es &mdash; agendamento, CRM de clientes, controle de estoque de produtos e PDV. Notifica&ccedil;&otilde;es autom&aacute;ticas por WhatsApp reduzem no-shows.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

      <a href="/pt/para/barbearia" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x2702;&#xFE0F;</span>
        <div class="biz-card-title">Barbearias</div>
        <div class="biz-card-desc">Gest&atilde;o de agenda, fila de espera, fideliza&ccedil;&atilde;o de clientes e controle de caixa para barbearias de qualquer porte.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

      <a href="/pt/para/academia" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F3CB;&#xFE0F;</span>
        <div class="biz-card-title">Academias e Fitness</div>
        <div class="biz-card-desc">Controle de matr&iacute;culas, reserva de aulas, lembretes autom&aacute;ticos e an&aacute;lise de reten&ccedil;&atilde;o de alunos.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

      <a href="/pt/para/spa" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F9D6;</span>
        <div class="biz-card-title">Spa &amp; Massagem</div>
        <div class="biz-card-desc">Agendamento de sess&otilde;es, gest&atilde;o de terapeutas, controle de produtos e lembretes personalizados para clientes.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

      <a href="/pt/para/clinica-dental" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F9B7;</span>
        <div class="biz-card-title">Cl&iacute;nicas Odontol&oacute;gicas</div>
        <div class="biz-card-desc">Prontu&aacute;rio de pacientes, agendamento de consultas, controle de materiais e lembretes autom&aacute;ticos de retorno.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

      <a href="/pt/para/cafeteria" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x2615;</span>
        <div class="biz-card-title">Caf&eacute;s e Lanchonetes</div>
        <div class="biz-card-desc">PDV r&aacute;pido, controle de estoque, programa de fidelidade e gest&atilde;o de pedidos para cafeterias e lanchonetes.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

      <a href="/pt/para/tatuagens" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F3A8;</span>
        <div class="biz-card-title">Est&uacute;dios de Tatuagem</div>
        <div class="biz-card-desc">Gest&atilde;o de agenda de tatuadores, galeria de trabalhos, dep&oacute;sitos e lembretes autom&aacute;ticos para clientes.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

      <a href="/pt/para/auto-repair" class="biz-card">
        <span class="biz-card-arrow">&rarr;</span>
        <span class="biz-card-emoji">&#x1F527;</span>
        <div class="biz-card-title">Oficinas Mec&acirc;nicas</div>
        <div class="biz-card-desc">Ordens de servi&ccedil;o, controle de pe&ccedil;as, hist&oacute;rico de ve&iacute;culos por cliente e notifica&ccedil;&otilde;es de prontid&atilde;o por WhatsApp.</div>
        <span class="biz-card-cta">Ver funcionalidades &rarr;</span>
      </a>

    </div>
  </div>
</section>

<section class="shared">
  <div class="shared-inner">
    <h2>O que todos os tipos de neg&oacute;cio recebem</h2>
    <div class="shared-grid">
      <div class="shared-item">
        <div class="shared-title">PDV Completo</div>
        <div class="shared-desc">Registre vendas, aceite m&uacute;ltiplos m&eacute;todos de pagamento e emita recibos &mdash; em 3 cliques.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">CRM de Clientes</div>
        <div class="shared-desc">Hist&oacute;rico completo de cada cliente, tags, notas e busca instant&acirc;nea. Conhe&ccedil;a seus melhores clientes.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Agendamento Online</div>
        <div class="shared-desc">P&aacute;gina p&uacute;blica de reservas. Clientes agendam com nome e telefone &mdash; sem cadastro, sem aplicativo.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Controle de Estoque</div>
        <div class="shared-desc">Entradas, sa&iacute;das, alertas de estoque m&iacute;nimo. Nunca fique sem os produtos certos no momento errado.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Notifica&ccedil;&otilde;es Autom&aacute;ticas</div>
        <div class="shared-desc">WhatsApp, Telegram, Viber e Email &mdash; confirma&ccedil;&atilde;o, lembretes e reativa&ccedil;&atilde;o sem nenhuma a&ccedil;&atilde;o manual.</div>
      </div>
      <div class="shared-item">
        <div class="shared-title">Zero Comiss&atilde;o</div>
        <div class="shared-desc">Seus clientes reservam diretamente com voc&ecirc;. Sem intermedi&aacute;rios, sem taxas sobre agendamentos.</div>
      </div>
    </div>
  </div>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>

    <div class="faq-item">
      <div class="faq-q">O Pronto funciona para qualquer tipo de neg&oacute;cio de servi&ccedil;o?</div>
      <div class="faq-a">Sim. O Pronto foi desenvolvido para qualquer neg&oacute;cio que trabalhe com atendimentos e agendamentos: sal&otilde;es de beleza, barbearias, academias, cl&iacute;nicas odontol&oacute;gicas, spas, caf&eacute;s, est&uacute;dios de tatuagem e oficinas mec&acirc;nicas.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Preciso pagar para usar o Pronto?</div>
      <div class="faq-a">N&atilde;o. A vers&atilde;o self-hosted &eacute; completamente gratuita para sempre. A vers&atilde;o SaaS em trypronto.app tamb&eacute;m tem plano gratuito com POS, CRM e agendamento inclu&iacute;dos. Planos pagos a partir de $19/m&ecirc;s adicionam WhatsApp, Telegram e mais.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">O Pronto cobra comiss&atilde;o sobre os meus agendamentos?</div>
      <div class="faq-a">N&atilde;o. Os clientes reservam diretamente com voc&ecirc;. O Pronto n&atilde;o fica entre voc&ecirc; e seus clientes e n&atilde;o cobra nenhuma comiss&atilde;o sobre agendamentos ou vendas.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Quais notifica&ccedil;&otilde;es autom&aacute;ticas o Pronto envia?</div>
      <div class="faq-a">O Pronto envia confirma&ccedil;&atilde;o de agendamento, lembrete 24 horas antes, lembrete 1 hora antes, mensagem de agradecimento p&oacute;s-visita e reativa&ccedil;&atilde;o de clientes inativos &mdash; por WhatsApp, Telegram, Viber e Email.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Como os clientes fazem agendamentos?</div>
      <div class="faq-a">Cada neg&oacute;cio tem uma p&aacute;gina p&uacute;blica de agendamento. Os clientes reservam com apenas nome e telefone &mdash; sem cadastro ou aplicativo necess&aacute;rio. Zero comiss&atilde;o para o neg&oacute;cio.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">Posso instalar o Pronto no meu pr&oacute;prio servidor?</div>
      <div class="faq-a">Sim. O Pronto &eacute; open-source (licen&ccedil;a MIT) e roda em qualquer servidor Linux com Docker: <code>docker compose up -d</code>. Seus dados ficam 100% no seu servidor, sem depend&ecirc;ncia de nuvem de terceiros.</div>
    </div>

  </div>
</section>

<section class="cta">
  <h2>Pronto para come&ccedil;ar?</h2>
  <p>Instale em 1 comando ou comece gr&aacute;tis no SaaS.</p>
  <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','cta_click',{label:'start_free',page:'/pt/para'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
  <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/pt/para'})">Ver no GitHub &rarr;</a>
</section>

</main>

<footer>
  <div>
    <div class="footer-brand">Pronto<span>.</span></div>
    <div class="footer-copy">&copy; 2025 Pronto. Todos os direitos reservados.</div>
  </div>
  <div class="footer-right">
    <div class="footer-links">
      <a href="/pt/">&Iacute;nicio</a>
      <a href="/pt/precos">Pre&ccedil;os</a>
      <a href="/pt/docs">Documenta&ccedil;&atilde;o</a>
      <a href="/pt/para/saloes">Sal&otilde;es</a>
      <a href="/pt/para/barbearia">Barbearias</a>
      <a href="/terms">Termos de Uso</a>
      <a href="/privacy">Pol&iacute;tica de Privacidade</a>
      <a href="/refund">Pol&iacute;tica de Reembolso</a>
    </div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/pt/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/pt/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/pt/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/para'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtParaPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
