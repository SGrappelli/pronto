import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Grátis para Oficina Mecânica — Pronto',
  description:
    'Software gratuito para oficinas mecânicas com ordens de serviço, CRM, controle de peças e lembretes por WhatsApp. Sem comissão. Self-hosted ou SaaS.',
  keywords:
    'software para oficina mecânica, sistema de ordem de serviço para oficina, programa para oficina grátis, controle de peças oficina, CRM para oficina mecânica, software gestão oficina, lembretes automáticos WhatsApp oficina, software oficina sem comissão, software código aberto oficina, OS para oficina gratuito',
  alternates: {
    canonical: 'https://trypronto.app/pt/para/auto-repair',
    languages: {
      en: 'https://trypronto.app/for/auto-repair',
      es: 'https://trypronto.app/es/para/auto-repair',
      'pt-BR': 'https://trypronto.app/pt/para/auto-repair',
      'x-default': 'https://trypronto.app/for/auto-repair',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/para/auto-repair',
    title: 'Software Grátis para Oficina Mecânica — Pronto',
    description:
      'Ordens de serviço, CRM de clientes, controle de peças e lembretes por WhatsApp para oficinas mecânicas. Sem comissão. Self-hosted ou SaaS.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Grátis para Oficina Mecânica — Pronto',
    description:
      'OS, CRM e WhatsApp para oficinas mecânicas. Sem comissão. Grátis para sempre na versão self-hosted.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/pt/para/auto-repair',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Software gratuito para oficinas mecânicas com ordens de serviço, histórico de veículos por cliente, controle de peças e estoque, PDV e notificações automáticas por WhatsApp, Telegram e Email.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
  },
  alternateName: [
    'software para oficina mecânica grátis',
    'sistema de ordem de serviço para oficina gratuito',
    'aplicativo para oficina mecânica',
    'controle de peças para oficina gratuito',
    'CRM para oficina mecânica',
    'alternativa ao Oficina Inteligente',
    'alternativa ao AutoManager',
    'alternativa ao Lanlink',
    'sistema de gestão para oficina open source',
    'software OS para oficina gratuito',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qual software gratuito existe para gestão de oficina mecânica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto é um software gratuito completo para oficinas mecânicas. Inclui ordens de serviço, histórico de veículos por cliente, controle de peças e estoque, PDV e notificações automáticas por WhatsApp e Telegram. A versão self-hosted é gratuita para sempre, sem limites de clientes ou mecânicos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como avisar o cliente por WhatsApp quando o carro está pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto envia notificações automáticas por WhatsApp, Telegram e Email. Quando a ordem de serviço é concluída, o cliente recebe um aviso imediato com o valor total. Basta conectar suas credenciais do WhatsApp Business nas configurações — sem custo adicional por mensagem.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como controlar o estoque de peças da oficina com o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto controla entradas e saídas de peças automaticamente. Cada peça usada em uma ordem de serviço baixa o estoque. Alertas automáticos são enviados quando qualquer item atingir o mínimo definido por você — por WhatsApp, Telegram ou Email.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto cobra comissão sobre os serviços da oficina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O Pronto não cobra nenhuma comissão sobre serviços ou vendas. Você recebe 100% da receita da oficina — sem intermediários, sem taxas por ordem de serviço.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa ao Oficina Inteligente ou AutoManager?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto oferece as funções essenciais: ordens de serviço, CRM de clientes com histórico de veículos, controle de peças e notificações. A diferença: a versão self-hosted é completamente gratuita e seus dados ficam no seu servidor. Sem mensalidade obrigatória para funções básicas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o histórico de veículos por cliente no Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada cliente tem um perfil com todos os veículos associados. Para cada veículo, o Pronto registra todas as ordens de serviço, peças trocadas, datas e valores. Na próxima visita, o mecânico vê em segundos o histórico completo do carro.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto funciona no celular para o mecânico consultar durante o serviço?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é um PWA (Progressive Web App) — instale diretamente na tela inicial do celular sem App Store ou Google Play. Funciona offline: registre serviços e peças mesmo sem internet e sincroniza automaticamente ao reconectar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como instalar o Pronto na oficina mecânica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Há duas opções. SaaS: acesse trypronto.app, registre sua oficina em minutos e comece a usar sem configuração. Self-hosted: execute docker compose up -d em qualquer servidor Linux. Seus dados ficam 100% no seu servidor, sem dependência de nuvem de terceiros.',
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
    { '@type': 'ListItem', position: 3, name: 'Oficinas Mecânicas', item: 'https://trypronto.app/pt/para/auto-repair' },
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
.hero h1{font-size:60px;font-weight:800;line-height:1.04;letter-spacing:-2px;margin-bottom:20px;color:#0a0a0a}
.hero-sub{font-size:19px;color:#374151;line-height:1.65;margin-bottom:36px;max-width:640px;margin-left:auto;margin-right:auto}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:28px}
.btn-primary{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline{background:transparent;color:#111;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 22px;border-radius:8px;border:1px solid #d1d5db;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline:hover{border-color:#111}
.hero-pills{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:32px}
.hero-pill{font-size:13px;font-weight:600;color:#166534;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:20px;padding:5px 14px}
.hero-stats{display:flex;gap:36px;justify-content:center;flex-wrap:wrap;padding-top:32px;border-top:1px solid #f3f4f6}
.hero-stat-num{font-family:'Bricolage Grotesque',sans-serif;font-size:30px;font-weight:800;color:#0a0a0a;line-height:1}
.hero-stat-label{font-size:13px;color:#6b7280;margin-top:4px}

.sec{padding:72px 48px;border-top:1px solid #f0f0f0}
.sec-white{background:#fff}
.sec-warm{background:#fdf8f0}
.sec-blue{background:#f0f7ff}
.sec-green{background:#f0fdf4}
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
  .hero h1{font-size:46px}
  .sec{padding:56px 24px}
  .faq{padding:56px 24px}
  footer{padding:24px}
  .breadcrumb{padding:14px 24px}
  .feat-grid,.notif-grid{grid-template-columns:repeat(2,1fr)}
  .pain-grid,.pain-icon-grid{grid-template-columns:repeat(2,1fr)}
  .plans{grid-template-columns:repeat(2,1fr)}
  .cta-band{padding:52px 24px}
}
@media(max-width:640px){
  nav{padding:0 16px;height:56px}
  .nav-right{gap:8px}
  .nav-link{font-size:14px}
  .btn-nav{font-size:13px;padding:8px 14px}
  .hide-mob{display:none}
  .hero{padding:48px 16px 40px}
  .hero h1{font-size:34px;letter-spacing:-1px}
  .hero-sub{font-size:16px}
  .hero-stats{gap:20px}
  .sec{padding:44px 16px}
  .sec-head h2{font-size:28px}
  .sec-head p{font-size:15px}
  .faq{padding:44px 16px}
  footer{flex-direction:column;align-items:flex-start;gap:16px;padding:24px 16px}
  .footer-right{flex-direction:column;align-items:flex-start;gap:12px}
  .footer-links{flex-wrap:wrap;gap:12px;justify-content:flex-start}
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
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/para/auto-repair'})">Pre&ccedil;os</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/auto-repair',es:'/es/para/autoservicio',pt:'/pt/para/auto-repair'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/pt/para">Para neg&oacute;cios</a><span>&rsaquo;</span>
  Oficinas Mec&acirc;nicas
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Software para oficina mec&acirc;nica
    </div>
    <h1>Software gratuito para oficina mec&acirc;nica com OS e WhatsApp</h1>
    <p class="hero-sub">Ordens de servi&ccedil;o, hist&oacute;rico de ve&iacute;culos, controle de pe&ccedil;as e aviso autom&aacute;tico por WhatsApp quando o carro fica pronto &mdash; sem comiss&atilde;o, sem mensalidade obrigat&oacute;ria.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/pt/para/auto-repair'})">Ver no GitHub</a>
    </div>
    <div class="hero-pills">
      <span class="hero-pill">&#x2713; Sem comiss&atilde;o</span>
      <span class="hero-pill">&#x2713; Hist&oacute;rico por ve&iacute;culo</span>
      <span class="hero-pill">&#x2713; Instala em 1 comando</span>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Sem comiss&atilde;o por OS</div>
      </div>
      <div>
        <div class="hero-stat-num">0%</div>
        <div class="hero-stat-label">Taxa de plataforma</div>
      </div>
      <div>
        <div class="hero-stat-num">1 cmd</div>
        <div class="hero-stat-label">Instala&ccedil;&atilde;o self-hosted</div>
      </div>
      <div>
        <div class="hero-stat-num">4</div>
        <div class="hero-stat-label">Canais de notifica&ccedil;&atilde;o</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Por que sua oficina merece um sistema de verdade</h2>
    <p>Cada problema abaixo tem uma solu&ccedil;&atilde;o direta no Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-icon-grid">
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F4CB;</div>
        <h4>Ordens de servi&ccedil;o em papel ou planilha</h4>
        <p>Papel se perde, planilha n&atilde;o avisa ningu&eacute;m. Sem hist&oacute;rico centralizado, cada atendimento come&ccedil;a do zero &mdash; mesmo para clientes antigos.</p>
      </div>
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F4F1;</div>
        <h4>Cliente ligando para saber se o carro ficou pronto</h4>
        <p>Telefone ocupado, mec&acirc;nico interrompido. O cliente fica sem informa&ccedil;&atilde;o e a oficina perde tempo respondendo a mesma pergunta o dia todo.</p>
      </div>
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F529;</div>
        <h4>Pe&ccedil;a faltando na hora errada</h4>
        <p>Descobrir que acabou o &oacute;leo ou o filtro no meio do servi&ccedil;o para produ&ccedil;&atilde;o e gera retrabalho. Sem controle de estoque, isso acontece toda semana.</p>
      </div>
      <div class="pain-icon-card">
        <div class="p-icon">&#x1F4B0;</div>
        <h4>Sem registro de quanto cada OS gerou</h4>
        <p>Sem PDV integrado, fica dif&iacute;cil saber a receita real do dia, quais servi&ccedil;os s&atilde;o mais lucrativos e quais clientes geram mais valor.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Como o Pronto organiza sua oficina</h2>
    <p>Do papel e da liga&ccedil;&atilde;o telefônica ao sistema que trabalha para voc&ecirc;.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">OS em papel que se perde</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Ordens de servi&ccedil;o digitais com hist&oacute;rico completo por ve&iacute;culo</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Cliente ligando toda hora para saber do carro</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">WhatsApp autom&aacute;tico quando o servi&ccedil;o for conclu&iacute;do &mdash; zero liga&ccedil;&otilde;es</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Pe&ccedil;a faltando descoberta na hora do servi&ccedil;o</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Alerta autom&aacute;tico de estoque m&iacute;nimo antes de acabar</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Sem vis&atilde;o da receita real da oficina</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">PDV integrado &mdash; cada OS vira uma transa&ccedil;&atilde;o registrada</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Funcionalidades feitas para oficinas mec&acirc;nicas</h2>
    <p>Desenvolvido para o mec&acirc;nico que tamb&eacute;m gerencia o neg&oacute;cio.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F527;</div>
        <h4>Ordens de Servi&ccedil;o</h4>
        <p>Crie, acompanhe e feche ordens de servi&ccedil;o digitalmente. Registre servi&ccedil;os realizados, pe&ccedil;as utilizadas, mec&acirc;nico respons&aacute;vel e valor total. Hist&oacute;rico permanente por ve&iacute;culo.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F697;</div>
        <h4>Hist&oacute;rico por Ve&iacute;culo</h4>
        <p>Cada cliente tem perfil com todos os ve&iacute;culos. Para cada carro: todas as OS, pe&ccedil;as trocadas, datas e valores. Na pr&oacute;xima visita, veja tudo em segundos.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Aviso por WhatsApp</h4>
        <p>Quando a OS &eacute; conclu&iacute;da, o cliente recebe aviso autom&aacute;tico por WhatsApp, Telegram ou Email com valor e instru&ccedil;&otilde;es para retirada &mdash; sem uma liga&ccedil;&atilde;o sequer.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Controle de Pe&ccedil;as</h4>
        <p>Gerencie estoque de pe&ccedil;as, fluidos e consumíveis. Cada pe&ccedil;a usada numa OS baixa o estoque automaticamente. Alertas de m&iacute;nimo antes de acabar.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>PDV Integrado</h4>
        <p>Registre o pagamento da OS em dinheiro, cart&atilde;o ou transfer&ecirc;ncia em 3 cliques. Emita recibo, aplique desconto e feche o caixa do dia. Funciona offline.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>CRM de Clientes</h4>
        <p>Base completa de clientes com hist&oacute;rico de servi&ccedil;os, ve&iacute;culos, valores gastos e contato. Reative clientes que n&atilde;o aparecem h&aacute; 30 dias com mensagem autom&aacute;tica.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Seus clientes informados &mdash; sem voc&ecirc; precisar ligar</h2>
    <p>O &uacute;nico software open-source para oficinas com WhatsApp, Telegram, Viber e Email integrados &mdash; sem plugins, sem cobran&ccedil;as adicionais.</p>
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
        <div class="ev-text">OS conclu&iacute;da</div>
        <div class="ev-sub">Aviso autom&aacute;tico assim que o servi&ccedil;o for marcado como conclu&iacute;do</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Lembrete de agendamento</div>
        <div class="ev-sub">Lembra o cliente 24h antes da visita agendada</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F514;</div>
        <div class="ev-text">Lembrete 1h antes</div>
        <div class="ev-sub">Confirma&ccedil;&atilde;o final antes do hor&aacute;rio marcado</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Reativa&ccedil;&atilde;o de clientes</div>
        <div class="ev-sub">&#x201C;Seu carro n&atilde;o passa por revis&atilde;o h&aacute; 6 meses&#x201D; &mdash; autom&aacute;tico</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Alerta de estoque m&iacute;nimo</div>
        <div class="ev-sub">Pe&ccedil;a ou fluido no limite &mdash; aviso para o respons&aacute;vel antes de acabar</div>
        <div class="ev-channels">Ao respons&aacute;vel por qualquer canal</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Anivers&aacute;rio do cliente</div>
        <div class="ev-sub">Relacionamento que fideliza &mdash; felicita&ccedil;&otilde;es autom&aacute;ticas</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Pronto vs outros sistemas para oficinas</h2>
    <p>Por que donos de oficina est&atilde;o migrando para o Pronto.</p>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Funcionalidade</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Sistemas tradicionais</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Pre&ccedil;o base</div>
      <div class="comp-cell good">Gr&aacute;tis</div>
      <div class="comp-cell bad">R$150&ndash;500/m&ecirc;s</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Aviso WhatsApp ao cliente</div>
      <div class="comp-cell good">&#x2705; Inclu&iacute;do</div>
      <div class="comp-cell bad">&#x274C; Integra&ccedil;&atilde;o paga</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Hist&oacute;rico por ve&iacute;culo</div>
      <div class="comp-cell good">&#x2705; Inclu&iacute;do</div>
      <div class="comp-cell" style="color:#374151">&#x2705; Geralmente incluso</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Seus dados, seu servidor</div>
      <div class="comp-cell good">&#x2705; Self-hosted</div>
      <div class="comp-cell bad">&#x274C; Dados na nuvem deles</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">C&oacute;digo aberto (MIT)</div>
      <div class="comp-cell good">&#x2705; Open-source</div>
      <div class="comp-cell bad">&#x274C; Propriet&aacute;rio</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">PDV offline</div>
      <div class="comp-cell good">&#x2705; PWA offline</div>
      <div class="comp-cell bad">&#x274C; Requer internet</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Sem mensalidade obrigat&oacute;ria</div>
      <div class="comp-cell good">&#x2705; Plano gr&aacute;tis</div>
      <div class="comp-cell bad">&#x274C; Sempre pago</div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Comece gr&aacute;tis, cres&ccedil;a no seu ritmo</h2>
    <p>Plano gratuito para sempre. Upgrade apenas quando precisar de mais.</p>
  </div>
  <div class="plans">
    <div class="plan">
      <div class="plan-name">Gr&aacute;tis</div>
      <div class="plan-price">$0</div>
      <span class="plan-trial-free">Gr&aacute;tis para sempre</span>
      <p class="plan-desc">Para oficinas que est&atilde;o come&ccedil;ando</p>
      <div class="plan-limit">1 mec&acirc;nico &middot; 100 clientes</div>
      <ul class="plan-feats">
        <li>Ordens de servi&ccedil;o</li>
        <li>CRM de clientes</li>
        <li>Controle de estoque</li>
        <li>Agendamento online</li>
        <li>Notifica&ccedil;&otilde;es por Email</li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/m&ecirc;s</span></div>
      <p class="plan-desc">Para oficinas em crescimento</p>
      <div class="plan-limit">3 mec&acirc;nicos &middot; 1.000 clientes</div>
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
      <p class="plan-desc">Para oficinas estabelecidas</p>
      <div class="plan-limit">15 mec&acirc;nicos &middot; ilimitado</div>
      <ul class="plan-feats">
        <li>Tudo do Starter</li>
        <li>Notifica&ccedil;&otilde;es por Viber</li>
        <li>Dom&iacute;nio personalizado</li>
        <li>An&aacute;lises e relat&oacute;rios <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
        <li>Programa de fidelidade <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Agency</div>
      <div class="plan-price">$79<span>/m&ecirc;s</span></div>
      <p class="plan-desc">Para redes de oficinas</p>
      <div class="plan-limit">M&uacute;ltiplos locais &middot; ilimitado</div>
      <ul class="plan-feats">
        <li>Tudo do Pro</li>
        <li>M&uacute;ltiplos locais</li>
        <li>White-label</li>
        <li>Acesso &agrave; API <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
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
      <div class="faq-q">Qual software gratuito existe para gest&atilde;o de oficina mec&acirc;nica?</div>
      <div class="faq-a">O Pronto &eacute; um software gratuito completo para oficinas mec&acirc;nicas. Inclui ordens de servi&ccedil;o, hist&oacute;rico de ve&iacute;culos por cliente, controle de pe&ccedil;as e estoque, PDV e notifica&ccedil;&otilde;es autom&aacute;ticas por WhatsApp e Telegram. A vers&atilde;o self-hosted &eacute; gratuita para sempre, sem limites de clientes ou mec&acirc;nicos.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como avisar o cliente por WhatsApp quando o carro est&aacute; pronto?</div>
      <div class="faq-a">O Pronto envia notifica&ccedil;&otilde;es autom&aacute;ticas por WhatsApp, Telegram e Email. Quando a ordem de servi&ccedil;o &eacute; conclu&iacute;da, o cliente recebe um aviso imediato com o valor total. Basta conectar suas credenciais do WhatsApp Business nas configura&ccedil;&otilde;es &mdash; sem custo adicional por mensagem.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como controlar o estoque de pe&ccedil;as da oficina com o Pronto?</div>
      <div class="faq-a">O Pronto controla entradas e sa&iacute;das de pe&ccedil;as automaticamente. Cada pe&ccedil;a usada em uma ordem de servi&ccedil;o baixa o estoque. Alertas autom&aacute;ticos s&atilde;o enviados quando qualquer item atingir o m&iacute;nimo definido por voc&ecirc; &mdash; por WhatsApp, Telegram ou Email.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O Pronto cobra comiss&atilde;o sobre os servi&ccedil;os da oficina?</div>
      <div class="faq-a">N&atilde;o. O Pronto n&atilde;o cobra nenhuma comiss&atilde;o sobre servi&ccedil;os ou vendas. Voc&ecirc; recebe 100% da receita da oficina &mdash; sem intermedi&aacute;rios, sem taxas por ordem de servi&ccedil;o.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa ao Oficina Inteligente ou AutoManager?</div>
      <div class="faq-a">Sim. O Pronto oferece as fun&ccedil;&otilde;es essenciais: ordens de servi&ccedil;o, CRM de clientes com hist&oacute;rico de ve&iacute;culos, controle de pe&ccedil;as e notifica&ccedil;&otilde;es. A diferen&ccedil;a: a vers&atilde;o self-hosted &eacute; completamente gratuita e seus dados ficam no seu servidor. Sem mensalidade obrigat&oacute;ria para fun&ccedil;&otilde;es b&aacute;sicas.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como funciona o hist&oacute;rico de ve&iacute;culos por cliente no Pronto?</div>
      <div class="faq-a">Cada cliente tem um perfil com todos os ve&iacute;culos associados. Para cada ve&iacute;culo, o Pronto registra todas as ordens de servi&ccedil;o, pe&ccedil;as trocadas, datas e valores. Na pr&oacute;xima visita, o mec&acirc;nico v&ecirc; em segundos o hist&oacute;rico completo do carro.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O Pronto funciona no celular para o mec&acirc;nico consultar durante o servi&ccedil;o?</div>
      <div class="faq-a">Sim. O Pronto &eacute; um PWA (Progressive Web App) &mdash; instale diretamente na tela inicial do celular sem App Store ou Google Play. Funciona offline: registre servi&ccedil;os e pe&ccedil;as mesmo sem internet e sincroniza automaticamente ao reconectar.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como instalar o Pronto na oficina mec&acirc;nica?</div>
      <div class="faq-a">H&aacute; duas op&ccedil;&otilde;es. SaaS: acesse trypronto.app, registre sua oficina em minutos e comece a usar sem configura&ccedil;&atilde;o. Self-hosted: execute <code>docker compose up -d</code> em qualquer servidor Linux. Seus dados ficam 100% no seu servidor, sem depend&ecirc;ncia de nuvem de terceiros.</div>
    </div>
  </div>
</section>

<section class="cta-band">
  <h2>Pronto para organizar sua oficina de uma vez por todas?</h2>
  <p>Instale em 1 comando ou comece gr&aacute;tis no SaaS &mdash; sem cart&atilde;o de cr&eacute;dito.</p>
  <div>
    <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'pt'})">Come&ccedil;ar gr&aacute;tis &rarr;</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/pt/para/auto-repair'})">Ver no GitHub</a>
  </div>
</section>

</main>

<footer>
  <div>
    <div class="footer-brand">Pronto<span>.</span></div>
    <div class="footer-copy">&copy; 2026 Pronto. Todos os direitos reservados.</div>
  </div>
  <div class="footer-right">
    <div class="footer-links">
      <a href="/pt/">&Iacute;nicio</a>
      <a href="/pt/precos">Pre&ccedil;os</a>
      <a href="/pt/para">Para neg&oacute;cios</a>
      <a href="/pt/para/saloes">Sal&otilde;es de Beleza</a>
      <a href="/pt/para/barbearia">Barbearias</a>
      <a href="/pt/para/academia">Academias</a>
      <a href="/terms">Termos de Uso</a>
      <a href="/privacy">Pol&iacute;tica de Privacidade</a>
      <a href="/refund">Pol&iacute;tica de Reembolso</a>
    </div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/pt/para/auto-repair'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/pt/para/auto-repair'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/pt/para/auto-repair'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/para/auto-repair'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtParaAutoRepairPage() {
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
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
