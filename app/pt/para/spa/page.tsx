import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Grátis para Spa e Massagem — Pronto',
  description:
    'Software gratuito para spas e centros de massagem com agendamento, CRM de clientes, controle de produtos e lembretes por WhatsApp. Sem comissão. Self-hosted ou SaaS.',
  keywords:
    'software para spa gratuito, sistema de agendamento para massagem gratuito, software de gestão para centro de massagem, CRM para spa gratuito, controle de produtos para spa gratuito, alternativa ao Booksy spa, alternativa ao Fresha spa, alternativa ao Mindbody spa, sistema de gestão para spa open source, software para esteticista gratuito, agenda online para massoterapeuta gratuita',
  alternates: {
    canonical: 'https://trypronto.app/pt/para/spa',
    languages: {
      en: 'https://trypronto.app/for/spa',
      es: 'https://trypronto.app/es/para/spa',
      'pt-BR': 'https://trypronto.app/pt/para/spa',
      'x-default': 'https://trypronto.app/for/spa',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/para/spa',
    title: 'Software Grátis para Spa e Massagem — Pronto',
    description:
      'Agendamento, CRM de clientes, controle de produtos e WhatsApp para spas e centros de massagem. Sem comissão. Self-hosted ou SaaS.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Grátis para Spa e Massagem — Pronto',
    description:
      'Agendamento e WhatsApp para spas. Sem comissão. Grátis para sempre na versão self-hosted.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/pt/para/spa',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Software gratuito para spas e centros de massagem com agendamento online de sessões, CRM de clientes com histórico de tratamentos, controle de produtos e óleos, PDV e notificações automáticas por WhatsApp, Telegram e Email.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
  },
  alternateName: [
    'software para spa gratuito',
    'sistema de agendamento para massagem gratuito',
    'software de gestão para centro de massagem',
    'CRM para spa gratuito',
    'controle de produtos para spa gratuito',
    'alternativa ao Booksy spa',
    'alternativa ao Fresha spa',
    'alternativa ao Mindbody spa',
    'sistema de gestão para spa open source',
    'software para esteticista gratuito',
    'agenda online para massoterapeuta gratuita',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qual software gratuito existe para spa e centro de massagem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto é um software gratuito completo para spas e centros de massagem. Inclui agendamento online de sessões, CRM de clientes com histórico de tratamentos, controle de produtos e óleos, PDV e notificações automáticas por WhatsApp e Telegram. A versão self-hosted é gratuita para sempre, sem limites de clientes ou terapeutas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como enviar lembretes automáticos por WhatsApp para clientes do spa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto envia lembretes automáticos por WhatsApp, Telegram e Email. Cada cliente recebe confirmação imediata ao agendar, lembrete 24 horas antes e lembrete 1 hora antes da sessão. Isso reduz faltas e cria uma experiência mais profissional desde o primeiro contato.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como manter o histórico de tratamentos de cada cliente no spa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto mantém o histórico completo de cada cliente: sessões realizadas, terapeuta preferido, tratamentos aplicados, produtos utilizados, preferências anotadas e valores pagos. Na próxima visita, o terapeuta vê tudo em segundos e personaliza o atendimento.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto cobra comissão sobre os agendamentos do spa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O Pronto não cobra nenhuma comissão sobre agendamentos ou vendas. Seus clientes reservam diretamente com você — sem intermediários. Você fica com 100% da receita do spa.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa ao Fresha ou Mindbody para spas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto oferece as mesmas funções essenciais: agendamento, CRM de clientes, controle de produtos e notificações por WhatsApp. A diferença: a versão self-hosted é completamente gratuita e seus dados ficam no seu servidor. Sem comissão por agendamento, sem mensalidade obrigatória.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como cada terapeuta gerencia sua própria agenda no Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada terapeuta tem sua própria agenda dentro do sistema. O gestor do spa vê todos os profissionais em um calendário unificado. Os clientes escolhem o terapeuta de preferência e o tipo de sessão na hora do agendamento online. Horários disponíveis são atualizados em tempo real.',
      },
    },
    {
      '@type': 'Question',
      name: 'Os clientes precisam criar conta para agendar no spa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Os clientes agendam com apenas nome e telefone — sem cadastro, sem aplicativo. Cada spa tem uma página pública de agendamento. Isso elimina o atrito e facilita a captação de novos clientes sem qualquer barreira de entrada.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como instalar o Pronto no spa ou centro de massagem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Há duas opções. SaaS: acesse trypronto.app, registre seu spa em minutos e comece a usar sem configuração. Self-hosted: execute docker compose up -d em qualquer servidor Linux. Seus dados ficam 100% no seu servidor, sem dependência de nuvem de terceiros.',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'Para negócios', item: 'https://trypronto.app/pt/para' },
    { '@type': 'ListItem', position: 3, name: 'Spa & Massagem', item: 'https://trypronto.app/pt/para/spa' },
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
@media(max-width:900px){.hide-tablet{display:none}}

.hero{padding:80px 48px 72px;background:#fff;border-bottom:1px solid #f0f0f0}
.hero-inner{max-width:860px;margin:0 auto;text-align:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px;margin-bottom:28px;letter-spacing:0.2px}
.hero-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#16a34a}
.hero h1{font-size:54px;font-weight:800;line-height:1.06;letter-spacing:-2px;margin-bottom:20px;color:#0a0a0a}
.hero-sub{font-size:19px;color:#374151;line-height:1.65;margin-bottom:32px;max-width:640px;margin-left:auto;margin-right:auto}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}
.btn-primary{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline{background:transparent;color:#111;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 22px;border-radius:8px;border:1px solid #d1d5db;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline:hover{border-color:#111}
.hero-pills{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px}
.hero-pill{background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px}

.sec{padding:72px 48px;border-top:1px solid #f0f0f0}
.sec-white{background:#fff}
.sec-warm{background:#fdf8f0}
.sec-blue{background:#f0f7ff}
.sec-head{text-align:center;margin-bottom:40px}
.sec-head h2{font-size:38px;font-weight:700;letter-spacing:-0.5px;color:#0a0a0a;margin-bottom:14px}
.sec-head p{font-size:17px;color:#374151;line-height:1.65;max-width:620px;margin:0 auto}

.cards-wrap{max-width:900px;margin:0 auto}

.pain-icon-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.pain-icon-card{background:#fff8f0;border:1px solid #fed7aa;border-radius:14px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column}
.pain-icon-card .p-icon{font-size:28px;margin-bottom:12px;line-height:1}
.pain-icon-card h4{font-size:18px;font-weight:700;margin-bottom:8px;color:#9a3412}
.pain-icon-card p{font-size:15px;color:#7c2d12;line-height:1.6;flex:1}

.pain-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.pain-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:22px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column}
.pain-from-label{font-size:10px;color:#ef4444;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.pain-from-text{font-size:14px;color:#6b7280;min-height:42px}
.pain-arrow{font-size:14px;color:#d1d5db;margin:8px 0}
.pain-to{font-size:15px;color:#0a0a0a;font-weight:700}

.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.feat-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column}
.feat-card-icon{font-size:28px;margin-bottom:12px}
.feat-card h4{font-size:18px;font-weight:700;margin-bottom:8px;color:#0a0a0a}
.feat-card p{font-size:15px;color:#374151;line-height:1.6;flex:1}
.feat-card .feat-detail{font-size:13px;color:#9ca3af;margin-top:8px;padding-top:8px;border-top:1px solid #f3f4f6}

.channel-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px;justify-content:center}
.channel{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:8px 18px;font-size:14px;font-weight:500;color:#111;box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.channel.soon{opacity:0.5;border-style:dashed;box-shadow:none}
.dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.dot-green{background:#22c55e}
.dot-blue{background:#3b82f6}
.dot-purple{background:#a855f7}
.dot-gray{background:#9ca3af}
.badge-soon{font-size:10px;font-weight:700;background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:10px;margin-left:2px}

.notif-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.notif-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column}
.notif-card .ev-emoji{font-size:20px;margin-bottom:8px;line-height:1}
.notif-card .ev-text{font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:6px;min-height:1.4em}
.notif-card .ev-sub{font-size:14px;color:#374151;line-height:1.6;flex:1}
.notif-card .ev-channels{font-size:12px;color:#15803d;font-weight:600;margin-top:8px}

.comp-table{max-width:760px;margin:0 auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.07)}
.comp-row{display:grid;grid-template-columns:2fr 1fr 1fr;background:#fff}
.comp-row:not(:last-child){border-bottom:1px solid #f3f4f6}
.comp-row.header{background:#f8fafc;font-size:13px;font-weight:700;color:#374151}
.comp-cell{padding:14px 18px;font-size:14px;color:#374151;display:flex;align-items:center}
.comp-cell:first-child{font-weight:600;color:#0a0a0a}
.comp-row.header .comp-cell:first-child{font-weight:700;color:#374151}
.comp-cell.good{color:#15803d;font-weight:500}
.comp-cell.bad{color:#ef4444}
.comp-row.pronto-row{background:#f0fdf4}
.comp-row.pronto-row .comp-cell:first-child{color:#16a34a}

.plans{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:900px;margin:0 auto 20px}
.plan{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;display:flex;flex-direction:column;box-shadow:0 1px 4px rgba(0,0,0,0.05);position:relative}
.plan.featured{border:2px solid #3b82f6}
.plan-popular{position:absolute;top:16px;right:16px;font-size:11px;font-weight:700;background:#eff6ff;color:#1d4ed8;padding:3px 10px;border-radius:12px;white-space:nowrap}
.plan-name{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:#111}
.plan-price{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;margin-bottom:4px;color:#0a0a0a;line-height:1.1}
.plan-price span{font-size:14px;font-weight:400;font-family:'DM Sans',sans-serif;color:#9ca3af}
.plan-trial-free{font-size:13px;color:#9ca3af;font-weight:500;margin-bottom:12px;display:block}
.plan-desc{font-size:13px;color:#6b7280;margin-bottom:10px}
.plan-limit{font-size:13px;color:#374151;margin-bottom:16px;padding-top:10px;border-top:1px solid #f3f4f6}
.plan-feats{list-style:none;font-size:13px;display:flex;flex-direction:column;gap:8px;flex:1}
.plan-feats li{color:#374151;display:flex;align-items:flex-start;gap:6px;line-height:1.5}
.plan-feats li::before{content:"✓";color:#16a34a;font-weight:700;flex-shrink:0;margin-top:1px}
.plan-cta{display:block;text-align:center;margin-top:20px;padding:10px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;background:#111;color:#fff}
.plan-cta:hover{background:#333}
.plan.featured .plan-cta{background:#3b82f6}
.plan.featured .plan-cta:hover{background:#2563eb}
.pricing-note{font-size:13px;color:#9ca3af;text-align:center;max-width:900px;margin:0 auto}
.pricing-note a{color:#3b82f6;text-decoration:none}

.faq{padding:72px 48px;background:#fff;border-top:1px solid #f0f0f0}
.faq-inner{max-width:760px;margin:0 auto}
.faq h2{font-size:34px;font-weight:700;letter-spacing:-0.5px;margin-bottom:36px;color:#0a0a0a;text-align:center}
.faq-item{border-bottom:1px solid #f0f0f0;padding:22px 0}
.faq-item:last-child{border-bottom:none}
.faq-q{font-size:16px;font-weight:700;color:#111;margin-bottom:10px;font-family:'Bricolage Grotesque',sans-serif}
.faq-a{font-size:14px;color:#374151;line-height:1.75}
.faq-a code{background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:13px}

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

.breadcrumb{padding:14px 48px;background:#fafafa;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af}
.breadcrumb a{color:#9ca3af;text-decoration:none}
.breadcrumb a:hover{color:#111}
.breadcrumb span{margin:0 8px}

.cta-band{background:#0a0a0a;padding:64px 48px;text-align:center}
.cta-band h2{font-size:36px;font-weight:800;color:#fff;letter-spacing:-0.5px;margin-bottom:14px}
.cta-band p{font-size:17px;color:#9ca3af;margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto}
.btn-cta-white{background:#fff;color:#111;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}
.btn-cta-outline{background:transparent;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:12px 26px;border-radius:8px;border:1px solid #374151;cursor:pointer;text-decoration:none;display:inline-block;margin:6px}

@media(max-width:1024px){
  nav{padding:0 24px}
  .hero{padding:60px 24px 52px}
  .hero h1{font-size:42px}
  .sec{padding:56px 24px}
  .faq{padding:56px 24px}
  footer{padding:48px 24px}
  .breadcrumb{padding:14px 24px}
  .feat-grid,.notif-grid{grid-template-columns:repeat(2,1fr)}
  .pain-grid,.pain-icon-grid{grid-template-columns:repeat(2,1fr)}
  .plans{grid-template-columns:repeat(2,1fr)}
  .cta-band{padding:52px 24px}
}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr;gap:24px}}
@media(max-width:640px){
  nav{padding:0 16px;height:56px}
  .nav-right{gap:8px}
  .nav-link{font-size:14px}
  .btn-nav{font-size:13px;padding:8px 14px}
  .hide-mob{display:none}
  .hero{padding:48px 16px 40px}
  .hero h1{font-size:32px;letter-spacing:-1px}
  .hero-sub{font-size:16px}
  .sec{padding:44px 16px}
  .sec-head h2{font-size:28px}
  .sec-head p{font-size:15px}
  .faq{padding:44px 16px}
  footer{padding:32px 16px}
  .footer-top{grid-template-columns:1fr;gap:28px}
  .footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}
  .breadcrumb{padding:12px 16px}
  .feat-grid,.notif-grid{grid-template-columns:1fr}
  .pain-grid,.pain-icon-grid{grid-template-columns:1fr}
  .plans{grid-template-columns:1fr}
  .comp-row{grid-template-columns:1.5fr 1fr 1fr}
  .comp-cell{padding:12px 10px;font-size:13px}
  .cta-band{padding:44px 16px}
  .cta-band h2{font-size:26px}
}
`

const pageContent = `
<nav>
  <a href="/pt/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/para/spa'})">Pre&ccedil;os</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/spa',es:'/es/para/spa',pt:'/pt/para/spa'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/pt/">In&iacute;cio</a><span>&rsaquo;</span>
  <a href="/pt/para">Para neg&oacute;cios</a><span>&rsaquo;</span>
  Spa &amp; Massagem
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Software para spa e massagem
    </div>
    <h1>Software gratuito para spa e massagem com agendamento e WhatsApp</h1>
    <p class="hero-sub">Agendamento de sess&otilde;es, hist&oacute;rico de tratamentos, controle de produtos e lembretes autom&aacute;ticos por WhatsApp &mdash; sem comiss&atilde;o, sem mensalidade obrigat&oacute;ria.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
    </div>
    <div class="hero-pills">
      <span class="hero-pill">&#x2713; Sem comiss&atilde;o</span>
      <span class="hero-pill">&#x2713; Hist&oacute;rico de tratamentos</span>
      <span class="hero-pill">&#x2713; Instala em 1 comando</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Por que spas perdem clientes sem sistema de gest&atilde;o</h2>
  </div>
  <div class="cards-wrap">
    <div class="pain-icon-grid">
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F4CB;</div>
        <h4>Hist&oacute;rico de tratamentos em papel ou mem&oacute;ria</h4>
        <p>Sem registro digital, cada sess&atilde;o come&ccedil;a sem contexto. O terapeuta n&atilde;o sabe quais produtos foram usados, quais t&eacute;cnicas o cliente prefere nem quando foi a &uacute;ltima visita.</p>
      </div>
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F4F1;</div>
        <h4>Clientes ligando para verificar disponibilidade</h4>
        <p>Sem p&aacute;gina de agendamento online, toda reserva passa pelo telefone. A equipe interrompe atendimentos para responder mensagens e confirmar hor&aacute;rios manualmente.</p>
      </div>
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F9F4;</div>
        <h4>Produto esgotado descoberto durante a sess&atilde;o</h4>
        <p>&Oacute;leo essencial, creme ou produto espec&iacute;fico acabando no meio de um tratamento &eacute; constrangedor. Sem controle de estoque, isso acontece com frequ&ecirc;ncia.</p>
      </div>
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F4B8;</div>
        <h4>Plataformas que cobram comiss&atilde;o por cada agendamento</h4>
        <p>Marketplaces de beleza e bem-estar cobram 20&ndash;30% sobre cada reserva feita pelo app. Voc&ecirc; atende, eles ficam com parte significativa da receita.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Como o Pronto eleva a experi&ecirc;ncia do seu spa</h2>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Hist&oacute;rico do cliente em papel ou na mem&oacute;ria do terapeuta</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">CRM digital com hist&oacute;rico completo &mdash; sess&otilde;es, produtos e prefer&ecirc;ncias</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Reservas apenas por telefone ou WhatsApp manual</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">P&aacute;gina p&uacute;blica de agendamento &mdash; cliente marca sozinho, sem atrito</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Produto esgotado descoberto na hora errada</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Alerta autom&aacute;tico de estoque m&iacute;nimo antes de acabar</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Plataforma cobra 20&ndash;30% por cada agendamento</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Reserva direta, 0% de comiss&atilde;o &mdash; voc&ecirc; fica com tudo</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Funcionalidades feitas para spas e centros de massagem</h2>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4C5;</div>
        <h4>Agendamento Online</h4>
        <p>P&aacute;gina p&uacute;blica do seu spa. Clientes escolhem terapeuta, tipo de sess&atilde;o e hor&aacute;rio com apenas nome e telefone &mdash; sem cadastro, sem aplicativo. Disponibilidade em tempo real.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4CB;</div>
        <h4>Hist&oacute;rico de Tratamentos</h4>
        <p>CRM completo por cliente: sess&otilde;es realizadas, terapeuta preferido, produtos e t&eacute;cnicas utilizadas, observa&ccedil;&otilde;es e anivers&aacute;rio. Atendimento personalizado desde a primeira visita.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F2;</div>
        <h4>Lembretes por WhatsApp</h4>
        <p>Confirma&ccedil;&atilde;o imediata, lembrete 24h antes e 1h antes da sess&atilde;o &mdash; por WhatsApp, Telegram e Email. A experi&ecirc;ncia premium come&ccedil;a antes de o cliente entrar pela porta.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F9F4;</div>
        <h4>Controle de Produtos</h4>
        <p>Gerencie &oacute;leos essenciais, cremes, aromaterapia e itens de revenda. Alertas autom&aacute;ticos quando qualquer item atingir o m&iacute;nimo &mdash; nunca seja pego de surpresa.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F5D3;</div>
        <h4>Agenda por Terapeuta</h4>
        <p>Cada profissional tem sua pr&oacute;pria agenda. O gestor v&ecirc; todos em um calend&aacute;rio unificado. Clientes escolhem o terapeuta preferido e o tipo de sess&atilde;o no agendamento online.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>PDV Integrado</h4>
        <p>Registre pagamentos de sess&otilde;es e venda produtos em dinheiro, cart&atilde;o ou transfer&ecirc;ncia em 3 cliques. Emita recibo, aplique desconto. Funciona offline no celular.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>A experi&ecirc;ncia premium come&ccedil;a antes da sess&atilde;o</h2>
  </div>
  <div class="channel-row">
    <div class="channel"><span class="dot dot-green"></span>WhatsApp</div>
    <div class="channel"><span class="dot dot-blue"></span>Telegram</div>
    <div class="channel"><span class="dot dot-purple"></span>Viber</div>
    <div class="channel"><span class="dot dot-green"></span>Email</div>
    <div class="channel soon"><span class="dot dot-gray"></span>LINE <span class="badge-soon">Em breve</span></div>
  </div>
  <div class="cards-wrap">
    <div class="notif-grid">
      <div class="notif-card">
        <div class="ev-emoji">&#x2705;</div>
        <div class="ev-text">Confirma&ccedil;&atilde;o imediata</div>
        <div class="ev-sub">Enviada assim que o cliente agenda &mdash; transmite profissionalismo</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Lembrete 24h antes</div>
        <div class="ev-sub">O cliente se prepara &mdash; chega no hor&aacute;rio, descansado e pronto</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F514;</div>
        <div class="ev-text">Lembrete 1h antes</div>
        <div class="ev-sub">Confirma&ccedil;&atilde;o final &mdash; reduz faltas de &uacute;ltima hora</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">P&oacute;s-sess&atilde;o (2h depois)</div>
        <div class="ev-sub">Agradeça a visita e incentive o pr&oacute;ximo agendamento</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Reativa&ccedil;&atilde;o de clientes</div>
        <div class="ev-sub">&ldquo;Faz 30 dias desde sua &uacute;ltima sess&atilde;o. Que tal renovar?&rdquo; &mdash; autom&aacute;tico</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Anivers&aacute;rio do cliente</div>
        <div class="ev-sub">Oferta especial autom&aacute;tica &mdash; fideliza&ccedil;&atilde;o sem esfor&ccedil;o manual</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Pronto vs outras plataformas para spas</h2>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Funcionalidade</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Plataformas tradicionais</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Pre&ccedil;o base</div>
      <div class="comp-cell good">Gr&aacute;tis</div>
      <div class="comp-cell" style="color:#374151">$30&ndash;150/m&ecirc;s</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Comiss&atilde;o por agendamento</div>
      <div class="comp-cell good">0%</div>
      <div class="comp-cell bad">20&ndash;30%</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Hist&oacute;rico de tratamentos</div>
      <div class="comp-cell good">&#x2713; Inclu&iacute;do</div>
      <div class="comp-cell" style="color:#374151">&#x2713; Geralmente incluso</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Agendamento sem cadastro</div>
      <div class="comp-cell good">&#x2713; Sim</div>
      <div class="comp-cell bad">&#x2717; Exige conta/app</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Seus dados, seu servidor</div>
      <div class="comp-cell good">&#x2713; Self-hosted</div>
      <div class="comp-cell bad">&#x2717; Dados na nuvem deles</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">WhatsApp nativo</div>
      <div class="comp-cell good">&#x2713; Inclu&iacute;do</div>
      <div class="comp-cell bad">&#x2717; Integra&ccedil;&atilde;o paga</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">C&oacute;digo aberto (MIT)</div>
      <div class="comp-cell good">&#x2713; Open-source</div>
      <div class="comp-cell bad">&#x2717; Propriet&aacute;rio</div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Comece gr&aacute;tis, cres&ccedil;a no seu ritmo</h2>
  </div>
  <div class="plans">
    <div class="plan">
      <div class="plan-name">Gr&aacute;tis</div>
      <div class="plan-price">$0<span>/m&ecirc;s</span></div>
      <span class="plan-trial-free">Gr&aacute;tis para sempre</span>
      <div class="plan-desc">Para spas que est&atilde;o come&ccedil;ando</div>
      <div class="plan-limit">1 terapeuta &middot; 100 clientes</div>
      <ul class="plan-feats">
        <li>Agendamento online</li>
        <li>CRM de clientes</li>
        <li>Controle de produtos</li>
        <li>PDV completo</li>
        <li>Notifica&ccedil;&otilde;es por Email</li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/m&ecirc;s</span></div>
      <div class="plan-desc">Para spas em crescimento</div>
      <div class="plan-limit">3 terapeutas &middot; 1.000 clientes</div>
      <ul class="plan-feats">
        <li>Tudo do plano Free</li>
        <li>Notifica&ccedil;&otilde;es por WhatsApp</li>
        <li>Notifica&ccedil;&otilde;es por Telegram</li>
        <li>Link p&uacute;blico de agendamento</li>
      </ul>
    </div>
    <div class="plan featured">
      <div class="plan-popular">Mais popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$39<span>/m&ecirc;s</span></div>
      <div class="plan-desc">Para spas estabelecidos</div>
      <div class="plan-limit">15 terapeutas &middot; ilimitado</div>
      <ul class="plan-feats">
        <li>Tudo do Starter</li>
        <li>Notifica&ccedil;&otilde;es por Viber</li>
        <li>Dom&iacute;nio personalizado</li>
        <li>An&aacute;lises e relat&oacute;rios <span style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
        <li>Programa de fidelidade <span style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Agency</div>
      <div class="plan-price">$79<span>/m&ecirc;s</span></div>
      <div class="plan-desc">Para redes de spas</div>
      <div class="plan-limit">M&uacute;ltiplos locais &middot; ilimitado</div>
      <ul class="plan-feats">
        <li>Tudo do Pro</li>
        <li>M&uacute;ltiplos locais</li>
        <li>White-label</li>
        <li>Acesso &agrave; API <span style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
        <li>Suporte priorit&aacute;rio</li>
      </ul>
    </div>
  </div>
  <p class="pricing-note">Planos pagos cobrados via Whop &middot; Cancele a qualquer momento &middot; <a href="/pt/precos">Ver pre&ccedil;os completos &rarr;</a></p>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>
    <div class="faq-item">
      <div class="faq-q">Qual software gratuito existe para spa e centro de massagem?</div>
      <div class="faq-a">O Pronto &eacute; um software gratuito completo para spas e centros de massagem. Inclui agendamento online de sess&otilde;es, CRM de clientes com hist&oacute;rico de tratamentos, controle de produtos e &oacute;leos, PDV e notifica&ccedil;&otilde;es autom&aacute;ticas por WhatsApp e Telegram. A vers&atilde;o self-hosted &eacute; gratuita para sempre, sem limites de clientes ou terapeutas.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como enviar lembretes autom&aacute;ticos por WhatsApp para clientes do spa?</div>
      <div class="faq-a">O Pronto envia lembretes autom&aacute;ticos por WhatsApp, Telegram e Email. Cada cliente recebe confirma&ccedil;&atilde;o imediata ao agendar, lembrete 24 horas antes e lembrete 1 hora antes da sess&atilde;o. Isso reduz faltas e cria uma experi&ecirc;ncia mais profissional desde o primeiro contato.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como manter o hist&oacute;rico de tratamentos de cada cliente no spa?</div>
      <div class="faq-a">O Pronto mant&eacute;m o hist&oacute;rico completo de cada cliente: sess&otilde;es realizadas, terapeuta preferido, tratamentos aplicados, produtos utilizados, prefer&ecirc;ncias anotadas e valores pagos. Na pr&oacute;xima visita, o terapeuta v&ecirc; tudo em segundos e personaliza o atendimento.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O Pronto cobra comiss&atilde;o sobre os agendamentos do spa?</div>
      <div class="faq-a">N&atilde;o. O Pronto n&atilde;o cobra nenhuma comiss&atilde;o sobre agendamentos ou vendas. Seus clientes reservam diretamente com voc&ecirc; &mdash; sem intermedi&aacute;rios. Voc&ecirc; fica com 100% da receita do spa.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa ao Fresha ou Mindbody para spas?</div>
      <div class="faq-a">Sim. O Pronto oferece as mesmas fun&ccedil;&otilde;es essenciais: agendamento, CRM de clientes, controle de produtos e notifica&ccedil;&otilde;es por WhatsApp. A diferen&ccedil;a: a vers&atilde;o self-hosted &eacute; completamente gratuita e seus dados ficam no seu servidor. Sem comiss&atilde;o por agendamento, sem mensalidade obrigat&oacute;ria.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como cada terapeuta gerencia sua pr&oacute;pria agenda no Pronto?</div>
      <div class="faq-a">Cada terapeuta tem sua pr&oacute;pria agenda dentro do sistema. O gestor do spa v&ecirc; todos os profissionais em um calend&aacute;rio unificado. Os clientes escolhem o terapeuta de prefer&ecirc;ncia e o tipo de sess&atilde;o na hora do agendamento online. Hor&aacute;rios dispon&iacute;veis s&atilde;o atualizados em tempo real.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Os clientes precisam criar conta para agendar no spa?</div>
      <div class="faq-a">N&atilde;o. Os clientes agendam com apenas nome e telefone &mdash; sem cadastro, sem aplicativo. Cada spa tem uma p&aacute;gina p&uacute;blica de agendamento. Isso elimina o atrito e facilita a capta&ccedil;&atilde;o de novos clientes sem qualquer barreira de entrada.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como instalar o Pronto no spa ou centro de massagem?</div>
      <div class="faq-a">H&aacute; duas op&ccedil;&otilde;es. SaaS: acesse trypronto.app, registre seu spa em minutos e comece a usar sem configura&ccedil;&atilde;o. Self-hosted: execute <code>docker compose up -d</code> em qualquer servidor Linux. Seus dados ficam 100% no seu servidor, sem depend&ecirc;ncia de nuvem de terceiros.</div>
    </div>
  </div>
</section>

<section class="cta-band">
  <h2>Pronto para oferecer uma experi&ecirc;ncia ainda mais premium?</h2>
  <p>Instale em 1 comando ou comece gr&aacute;tis no SaaS &mdash; sem cart&atilde;o de cr&eacute;dito.</p>
  <div>
    <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/pt" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Seus dados, seu servidor.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Para neg&oacute;cios</div>
      <a href="/pt/para">Todos os neg&oacute;cios</a>
      <a href="/pt/para/saloes">Sal&otilde;es de beleza</a>
      <a href="/pt/para/academia">Academias</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Comparar</div>
      <a href="/pt/vs/fresha">vs Fresha</a>
      <a href="/pt/vs/booksy">vs Booksy</a>
      <a href="/pt/vs/mindbody">vs Mindbody</a>
      <a href="/pt/vs/square">vs Square</a>
      <a href="/pt/vs/trinks">vs Trinks</a>
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
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/pt/para/spa'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/pt/para/spa'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/pt/para/spa'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/para/spa'})"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtParaSpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div lang="pt-BR" dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
