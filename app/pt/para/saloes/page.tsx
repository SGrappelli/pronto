import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Grátis para Salão de Beleza — Pronto',
  description:
    'Software gratuito para salão de beleza com PDV, agendamento, CRM e lembretes automáticos por WhatsApp e Telegram. Sem comissão. Self-hosted ou na nuvem.',
  keywords:
    'software para salão de beleza, programa para salão de beleza grátis, sistema de agendamento para salão, PDV para salão de beleza, CRM para salão, software para salão de cabelo, software para salão de unhas, gestão de agendamentos salão, lembretes automáticos WhatsApp salão, software salão sem comissão, software código aberto salão beleza',
  alternates: {
    canonical: 'https://trypronto.app/pt/para/saloes',
    languages: {
      en: 'https://trypronto.app/for/salons',
      es: 'https://trypronto.app/es/para/salones',
      'pt-BR': 'https://trypronto.app/pt/para/saloes',
      'x-default': 'https://trypronto.app/for/salons',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/para/saloes',
    title: 'Software Grátis para Salão de Beleza — Pronto',
    description:
      'PDV, agendamento e CRM gratuito para salões de beleza. Clientes agendam sem criar conta. Sem comissão. Self-hosted ou na nuvem.',
    images: [{ url: 'https://trypronto.app/og-salons-pt.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Grátis para Salão de Beleza — Pronto',
    description:
      'PDV, agendamento e CRM gratuito para salões de beleza. Clientes agendam sem criar conta. Sem comissão. Self-hosted ou na nuvem.',
    images: ['https://trypronto.app/og-salons-pt.png'],
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto — Software para Salões de Beleza',
  url: 'https://trypronto.app/pt/para/saloes',
  description:
    'Software gratuito e de código aberto para salões de beleza com PDV, agendamento, CRM de clientes, controle de estoque e notificações omnicanal por Email, Telegram, WhatsApp e Viber.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Software para Salões de Beleza',
  operatingSystem: 'Web, Linux, Windows, macOS',
  inLanguage: 'pt-BR',
  offers: [
    { '@type': 'Offer', name: 'Grátis', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Starter', price: '19', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Agency', price: '79', priceCurrency: 'USD' },
  ],
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  featureList: [
    'Agendamento de horários para salões de beleza',
    'Sistema PDV para salões',
    'CRM de clientes com histórico de visitas',
    'Controle de estoque de produtos',
    'Lembretes automáticos de agendamentos por Telegram e WhatsApp',
    'Página de agendamento online sem cadastro de cliente',
    'Agenda de funcionários',
    'Análise de faturamento',
    'PWA — funciona sem conexão',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qual é o melhor software gratuito para salão de beleza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto é um software gratuito e de código aberto para salões de beleza que inclui PDV, calendário de agendamentos, CRM de clientes, controle de estoque e notificações automáticas por Email, Telegram, WhatsApp e Viber. A versão self-hosted é gratuita para sempre sem limites. A versão na nuvem tem plano gratuito e planos pagos a partir de $19 por mês.',
      },
    },
    {
      '@type': 'Question',
      name: 'Os clientes precisam criar uma conta para agendar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. A página de agendamento só exige nome e número de telefone. Sem cadastro, sem senha e sem aplicativo para baixar. Isso elimina a fricção e aumenta significativamente a taxa de agendamentos em comparação com plataformas que exigem criar uma conta.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto é uma alternativa às plataformas de reservas para salões?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Ao contrário das plataformas de reservas que cobram uma porcentagem de cada agendamento e retêm os dados dos seus clientes no sistema delas, o Pronto não cobra nenhuma comissão. Você é dono da sua base de clientes 100%. Também é possível instalar o sistema completo no seu próprio servidor — sem qualquer dependência de fornecedor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funcionam os lembretes automáticos de agendamentos para salões?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto envia automaticamente uma confirmação de agendamento na hora, um lembrete 24 horas antes da visita, outro lembrete 1 hora antes e uma mensagem de agradecimento 2 horas após o término do atendimento. Todas as mensagens são enviadas pelo canal preferido do cliente: WhatsApp, Telegram, Viber ou Email. Sem nenhuma ação manual da equipe do salão.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso controlar o estoque de produtos e receber alertas de estoque baixo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto controla o estoque de cada produto no seu salão. Quando um produto cai abaixo do mínimo que você define, um alerta é enviado automaticamente ao proprietário do salão por qualquer canal configurado: Email, Telegram, WhatsApp ou Viber.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto funciona para salões de cabelo, unhas e barbearias?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto foi desenvolvido para qualquer negócio de serviços que realiza agendamentos e vende serviços ou produtos. Funciona para salões de cabelo, salões de beleza, salões de unhas, barbearias, estúdios de massagem e spa, estúdios de cílios, estúdios de tatuagem e mais.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como instalo o Pronto no meu próprio servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Você precisa do Docker em qualquer servidor Linux, Windows ou macOS com pelo menos 1 GB de RAM. Execute docker compose up -d e o sistema completo de gestão para salões inicia automaticamente. Não são necessários conhecimentos de administração de servidores.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que acontece com os meus dados se eu cancelar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Com a versão self-hosted, seus dados estão sempre no seu próprio servidor — não há nada para cancelar ou perder. Com a versão na nuvem, você pode exportar todos os dados de clientes e histórico a qualquer momento. Sua base de clientes nunca fica presa como acontece em uma plataforma de marketplace.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Pronto', item: 'https://trypronto.app' },
    { '@type': 'ListItem', position: 2, name: 'Para negócios', item: 'https://trypronto.app/pt/para' },
    { '@type': 'ListItem', position: 3, name: 'Salões de Beleza', item: 'https://trypronto.app/pt/para/saloes' },
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
.hero h1 em{font-style:normal;color:#16a34a}
.hero-sub{font-size:19px;color:#374151;line-height:1.65;margin-bottom:12px;max-width:640px;margin-left:auto;margin-right:auto}
.hero-platforms{font-size:14px;color:#9ca3af;margin-bottom:36px}
.hero-platforms strong{color:#ef4444;font-weight:600}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:44px}
.btn-primary{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline{background:transparent;color:#111;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 22px;border-radius:8px;border:1px solid #d1d5db;cursor:pointer;text-decoration:none;display:inline-block}
.btn-outline:hover{border-color:#111}
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

.problem-banner{background:#fff8f0;border:1px solid #fed7aa;border-radius:14px;padding:28px 32px;margin:0 auto 0;max-width:900px;text-align:center}
.problem-banner h3{font-size:22px;font-weight:700;color:#9a3412;margin-bottom:12px}
.problem-banner p{font-size:16px;color:#7c2d12;line-height:1.7}
.problem-banner strong{font-weight:700}

.cards-wrap{max-width:900px;margin:0 auto}
.pain-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
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

.workflow{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#e2e8f0;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;max-width:900px;margin:0 auto}
.wf-step{background:#fff;padding:28px 20px;text-align:center}
.wf-num{font-family:'Bricolage Grotesque',sans-serif;font-size:40px;font-weight:800;color:#e2e8f0;line-height:1;margin-bottom:12px}
.wf-title{font-size:15px;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.wf-desc{font-size:13px;color:#6b7280;line-height:1.55}

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
.comp-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;background:#fff}
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
.plan-limit{font-size:13px;color:#374151;margin-bottom:16px;padding-top:10px;border-top:1px solid #f3f4f6}
.plan-feats{list-style:none;font-size:13px;display:flex;flex-direction:column;gap:8px;flex:1}
.plan-feats li{color:#374151;display:flex;align-items:flex-start;gap:6px;line-height:1.5}
.plan-feats li::before{content:"✓";color:#16a34a;font-weight:700;flex-shrink:0;margin-top:1px}
.pricing-note{font-size:13px;color:#9ca3af;text-align:center;max-width:900px;margin:0 auto}
.pricing-note a{color:#3b82f6;text-decoration:none}

.two-paths{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:0 auto 0}
.path-card{border-radius:16px;padding:36px;border:1px solid #e2e8f0}
.path-card.self{background:#f8fafc}
.path-card.cloud{background:#f0fdf4;border-color:#bbf7d0}
.path-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:12px}
.path-card h3{font-size:26px;font-weight:800;margin-bottom:10px;color:#0a0a0a;letter-spacing:-0.5px}
.path-desc{font-size:16px;color:#374151;line-height:1.65;margin-bottom:28px}
.code-block{background:#0f172a;border-radius:10px;padding:14px 20px;font-family:'Courier New',monospace;font-size:14px;color:#4ade80;display:inline-block;margin-bottom:20px}
.code-prefix{color:#475569;margin-right:8px}
.path-points{display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
.path-point{display:flex;gap:10px;align-items:flex-start}
.path-point-dot{width:6px;height:6px;border-radius:50%;background:#16a34a;margin-top:7px;flex-shrink:0}
.path-point-text{font-size:15px;color:#374151;line-height:1.6}
.path-point-text strong{color:#111;font-weight:600}

.faq{padding:72px 48px;background:#fff;border-top:1px solid #f0f0f0}
.faq-inner{max-width:760px;margin:0 auto}
.faq h2{font-size:34px;font-weight:700;letter-spacing:-0.5px;margin-bottom:36px;color:#0a0a0a;text-align:center}
.faq-item{border-bottom:1px solid #f0f0f0;padding:22px 0}
.faq-item:last-child{border-bottom:none}
.faq-q{font-size:16px;font-weight:700;color:#111;margin-bottom:10px;font-family:'Bricolage Grotesque',sans-serif}
.faq-a{font-size:14px;color:#374151;line-height:1.75}
.faq-a code{background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:13px}

footer{border-top:1px solid #f0f0f0;background:#fff;padding:48px 48px 32px}
.footer-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;max-width:960px;margin:0 auto 32px}
.footer-col-head{font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#9ca3af;margin-bottom:14px}
.footer-col a{display:block;font-size:14px;color:#6b7280;text-decoration:none;padding:6px 0;min-height:44px;display:flex;align-items:center}
.footer-col a:hover{color:#16a34a}
.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid #f0f0f0;max-width:960px;margin:0 auto}
.footer-copy{font-size:13px;color:#9ca3af}
.footer-social{display:flex;gap:4px;align-items:center}
.footer-social a{color:#9ca3af;display:flex;line-height:1;text-decoration:none;padding:10px;min-width:44px;min-height:44px;align-items:center;justify-content:center}
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

.badge-row{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin-top:16px}
.badge{font-size:13px;border-radius:6px;padding:5px 12px;font-weight:500;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0}

@media(max-width:1024px){
  nav{padding:0 24px}
  .hero{padding:60px 24px 52px}
  .hero h1{font-size:46px}
  .sec{padding:56px 24px}
  .faq{padding:56px 24px}
  footer{padding:48px 24px 32px}
  .breadcrumb{padding:14px 24px}
  .feat-grid,.pain-grid,.notif-grid{grid-template-columns:repeat(2,1fr)}
  .two-paths{grid-template-columns:1fr}
  .plans{grid-template-columns:repeat(2,1fr)}
  .workflow{grid-template-columns:repeat(2,1fr)}
  .comp-row{grid-template-columns:2fr 1fr 1fr 1fr}
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
  footer{padding:40px 16px 28px}
  .footer-grid{grid-template-columns:1fr;gap:28px}
  .footer-bottom{flex-direction:column;align-items:center;gap:16px;text-align:center}
  .breadcrumb{padding:12px 16px}
  .feat-grid,.pain-grid,.notif-grid{grid-template-columns:1fr}
  .plans{grid-template-columns:1fr}
  .workflow{grid-template-columns:1fr}
  .two-paths{grid-template-columns:1fr}
  .comp-row{grid-template-columns:1.5fr 1fr 1fr 1fr}
  .comp-cell{padding:12px 10px;font-size:13px}
  .cta-band{padding:44px 16px}
  .cta-band h2{font-size:26px}
  .path-card{padding:24px}
}
`

const pageContent = `
<nav>
  <a href="/pt/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pt/precos" class="nav-link hide-mob" onclick="window.gtag&&window.gtag('event','pricing_click',{source:'/pt/para/saloes'})">Pre&ccedil;os</a>
    <select aria-label="Language" onchange="var l=this.value;var m={en:'/for/salons',es:'/es/para/salones',pt:'/pt/para/saloes'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es">ES</option><option value="pt" selected>PT</option></select>
    <a href="/login" class="nav-link hide-tablet" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'pt'})">Entrar</a>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'navbar',language:'pt'})">Come&ccedil;ar gr&aacute;tis</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Pronto</a><span>&rsaquo;</span>
  <a href="/pt/para">Para neg&oacute;cios</a><span>&rsaquo;</span>
  Sal&otilde;es de Beleza
</div>

<main>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Software para sal&atilde;o de beleza
    </div>
    <h1>Seu sal&atilde;o. <em>Seus clientes.</em> Sem comiss&atilde;o.</h1>
    <p class="hero-sub">PDV, agendamento, CRM e lembretes autom&aacute;ticos de tratamentos &mdash;
para sal&otilde;es de beleza, sal&otilde;es de cabelo, sal&otilde;es de unhas e barbearias.
Self-hosted ou na nuvem.</p>
    <p class="hero-platforms">A maioria das plataformas de reservas cobra <strong>20&ndash;30%</strong>
de cada agendamento dos seus pr&oacute;prios clientes. O Pronto cobra <strong>$0</strong>.</p>
    <div class="hero-ctas">
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'hero',language:'pt'})">Come&ccedil;ar gr&aacute;tis &mdash; sem cart&atilde;o</a>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/pt/para/saloes'})">Self-host gr&aacute;tis &rarr;</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">$0</div>
        <div class="hero-stat-label">Sem comiss&atilde;o por agendamento</div>
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

<section class="sec sec-warm">
  <div class="cards-wrap">
    <div class="problem-banner">
      <h3>O problema do software para sal&otilde;es que ningu&eacute;m menciona</h3>
      <p>Voc&ecirc; construiu uma base de clientes fi&eacute;is durante anos. Ent&atilde;o
uma plataforma de reservas exige <strong>20&ndash;30% de cada agendamento</strong>
&mdash; de clientes que j&aacute; s&atilde;o seus. E o pior: eles s&atilde;o donos dos dados.
Se voc&ecirc; cancelar a conta, some o hist&oacute;rico de agendamentos, os contatos
de clientes e as avalia&ccedil;&otilde;es.</p>
    </div>
  </div>
  <div style="height:32px"></div>
  <div class="sec-head">
    <h2>O que os donos de sal&atilde;o realmente enfrentam</h2>
    <p>Cada problema abaixo tem uma solu&ccedil;&atilde;o direta no Pronto.</p>
  </div>
  <div class="cards-wrap">
    <div class="pain-grid">
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Plataforma cobra 20&ndash;30% de cada agendamento dos seus clientes</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Os clientes agendam direto com voc&ecirc; &mdash; voc&ecirc; fica com 100%</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Lembretes manuais pelo WhatsApp toda noite</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Lembretes autom&aacute;ticos 24h e 1h antes &mdash; por WhatsApp, Telegram, Email ou Viber</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">O cliente se cadastra na plataforma, n&atilde;o no seu sal&atilde;o</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Os clientes agendam s&oacute; com nome e telefone &mdash; sem app, sem cadastro</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Produtos acabam no meio da semana</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Alerta de estoque baixo no seu celular antes de ficar sem nada</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Sem ideia de quem vem nem quanto gasta</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Hist&oacute;rico completo do cliente &mdash; visitas, gastos, &uacute;ltima vez, anivers&aacute;rio</div>
      </div>
      <div class="pain-card">
        <div class="pain-from-label">Antes</div>
        <div class="pain-from-text">Agendamentos duplos, erros na agenda de papel</div>
        <div class="pain-arrow">&darr;</div>
        <div class="pain-to">Verifica&ccedil;&atilde;o de conflitos a n&iacute;vel de banco de dados &mdash; imposs&iacute;vel agendar duas vezes</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Tudo o que um sal&atilde;o precisa, nada do que n&atilde;o</h2>
    <p>Desenvolvido para quem gerencia o sal&atilde;o, n&atilde;o para equipes de TI.</p>
  </div>
  <div class="cards-wrap">
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4C5;</div>
        <h4>Agendamento de hor&aacute;rios</h4>
        <p>Calend&aacute;rio com drag &amp; drop. Vis&atilde;o semanal. Colunas por funcion&aacute;rio.
Os clientes agendam online sem criar uma conta.</p>
        <div class="feat-detail">Prote&ccedil;&atilde;o contra agendamento duplo a n&iacute;vel de banco de dados</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4B3;</div>
        <h4>Ponto de Venda (PDV)</h4>
        <p>Conclua uma venda em 3 cliques. Dinheiro, cart&atilde;o, transfer&ecirc;ncia.
Aplique descontos. Envie recibos digitais.</p>
        <div class="feat-detail">Funciona completamente sem internet &mdash; sem interrup&ccedil;&otilde;es no caixa</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F464;</div>
        <h4>CRM de Clientes</h4>
        <p>Hist&oacute;rico completo por cliente: visitas, servi&ccedil;os, produtos,
gasto total, notas, anivers&aacute;rio, etiquetas.</p>
        <div class="feat-detail">Busca em toda a sua base de clientes em menos de 1 segundo</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4E6;</div>
        <h4>Controle de Estoque</h4>
        <p>Controle cada produto no seu sal&atilde;o. Registre entradas e sa&iacute;das.
Alertas autom&aacute;ticos de estoque baixo.</p>
        <div class="feat-detail">Alerta enviado por Telegram, WhatsApp, Email ou Viber &mdash; voc&ecirc; escolhe</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F310;</div>
        <h4>P&aacute;gina de agendamento online</h4>
        <p>P&aacute;gina p&uacute;blica onde os clientes podem encontrar voc&ecirc; e agendar
diretamente. Sem marketplace entre voc&ecirc; e seus clientes.</p>
        <div class="feat-detail">S&oacute; nome e telefone &mdash; sem cadastro, sem app para baixar</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon">&#x1F4F1;</div>
        <h4>Funciona em qualquer dispositivo</h4>
        <p>Instale como PWA no celular ou tablet pelo navegador.
Funciona sem conex&atilde;o no computador.</p>
        <div class="feat-detail">Sem App Store, sem comiss&atilde;o de 30% da Apple ou Google</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-green">
  <div class="sec-head">
    <h2>Como o seu sal&atilde;o funciona com o Pronto</h2>
    <p>De um novo cliente at&eacute; um agendamento recorrente &mdash; completamente automatizado.</p>
  </div>
  <div class="workflow">
    <div class="wf-step">
      <div class="wf-num">01</div>
      <div class="wf-title">O cliente descobre sua p&aacute;gina de agendamento</div>
      <div class="wf-desc">Linkada do Instagram, Google ou onde quiser. Sem app,
sem cadastro &mdash; s&oacute; nome e telefone.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">02</div>
      <div class="wf-title">Agendamento confirmado automaticamente</div>
      <div class="wf-desc">Confirma&ccedil;&atilde;o instant&acirc;nea enviada ao cliente por WhatsApp,
Telegram, Email ou Viber.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">03</div>
      <div class="wf-title">Lembretes sem que voc&ecirc; fa&ccedil;a nada</div>
      <div class="wf-desc">24 horas e 1 hora antes do agendamento. Sem mensagens manuais.
Sem clientes que n&atilde;o aparecem.</div>
    </div>
    <div class="wf-step">
      <div class="wf-num">04</div>
      <div class="wf-title">Cobran&ccedil;a e fideliza&ccedil;&atilde;o</div>
      <div class="wf-desc">Conclua a venda no PDV. Mensagem de agradecimento
enviada automaticamente. Cliente salvo no seu CRM para sempre.</div>
    </div>
  </div>
</section>

<section class="sec sec-blue">
  <div class="sec-head">
    <h2>Lembretes autom&aacute;ticos para clientes &mdash; em todos os canais</h2>
    <p>O &uacute;nico software open-source para sal&otilde;es com Email, Telegram,
WhatsApp e Viber integrados &mdash; sem plugins, sem cobran&ccedil;as adicionais.</p>
  </div>
  <div class="channel-row">
    <div class="channel"><span class="dot dot-green"></span>Email</div>
    <div class="channel"><span class="dot dot-blue"></span>Telegram</div>
    <div class="channel"><span class="dot dot-green"></span>WhatsApp</div>
    <div class="channel"><span class="dot dot-purple"></span>Viber</div>
    <div class="channel soon"><span class="dot dot-gray"></span>LINE <span class="badge-soon">Em breve</span></div>
    <div class="channel soon"><span class="dot dot-gray"></span>SMS <span class="badge-soon">Em breve</span></div>
  </div>
  <div class="cards-wrap">
    <div class="notif-grid">
      <div class="notif-card">
        <div class="ev-emoji">&#x2705;</div>
        <div class="ev-text">Agendamento confirmado</div>
        <div class="ev-sub">Enviado na hora quando o cliente agenda online ou quando
voc&ecirc; adiciona um agendamento manualmente</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x23F0;</div>
        <div class="ev-text">Lembrete de agendamento</div>
        <div class="ev-sub">Lembrete autom&aacute;tico 24 horas antes e novamente 1 hora
antes da visita</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F48C;</div>
        <div class="ev-text">Mensagem de agradecimento</div>
        <div class="ev-sub">Enviada 2 horas ap&oacute;s o t&eacute;rmino da visita &mdash; mant&eacute;m
o seu sal&atilde;o na mem&oacute;ria do cliente</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F504;</div>
        <div class="ev-text">Mensagem de reativa&ccedil;&atilde;o</div>
        <div class="ev-sub">&#x201C;N&atilde;o te vimos h&aacute; 30 dias&#x201D; &mdash; recupera clientes
inativos automaticamente</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F382;</div>
        <div class="ev-text">Felicita&ccedil;&atilde;o de anivers&aacute;rio</div>
        <div class="ev-sub">Enviada automaticamente no dia do anivers&aacute;rio do cliente &mdash;
um toque pessoal que n&atilde;o te custa nada</div>
        <div class="ev-channels">WhatsApp &middot; Telegram &middot; Email &middot; Viber</div>
      </div>
      <div class="notif-card">
        <div class="ev-emoji">&#x1F4E6;</div>
        <div class="ev-text">Alerta de estoque baixo</div>
        <div class="ev-sub">Notifica o propriet&aacute;rio quando qualquer produto cai
abaixo do m&iacute;nimo estabelecido</div>
        <div class="ev-channels">Ao dono do neg&oacute;cio por qualquer canal</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-warm">
  <div class="sec-head">
    <h2>Por que donos de sal&atilde;o escolhem o Pronto</h2>
    <p>Como o Pronto se compara &agrave;s plataformas de reservas para sal&otilde;es.</p>
  </div>
  <div class="comp-table">
    <div class="comp-row header">
      <div class="comp-cell">Fun&ccedil;&atilde;o</div>
      <div class="comp-cell">Pronto</div>
      <div class="comp-cell">Plataformas marketplace</div>
      <div class="comp-cell">SaaS de assinatura</div>
    </div>
    <div class="comp-row pronto-row">
      <div class="comp-cell">Comiss&atilde;o por agendamento</div>
      <div class="comp-cell good">$0 sempre</div>
      <div class="comp-cell bad">10&ndash;30% por agendamento</div>
      <div class="comp-cell" style="color:#374151">$0 (assinatura mensal)</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Voc&ecirc; &eacute; dono dos dados dos clientes</div>
      <div class="comp-cell good">&#x2713; Sempre seus</div>
      <div class="comp-cell bad">&#x2717; Ficam na plataforma deles</div>
      <div class="comp-cell bad">&#x2717; Bloqueados no fornecedor</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Cadastro obrigat&oacute;rio para agendar</div>
      <div class="comp-cell good">&#x2717; S&oacute; nome e telefone</div>
      <div class="comp-cell bad">&#x2713; Conta obrigat&oacute;ria</div>
      <div class="comp-cell bad">&#x2713; Conta obrigat&oacute;ria</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">Op&ccedil;&atilde;o self-hosted</div>
      <div class="comp-cell good">&#x2713; Gr&aacute;tis, licen&ccedil;a MIT</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">WhatsApp + Telegram integrados</div>
      <div class="comp-cell good">&#x2713; Todos os canais inclu&iacute;dos</div>
      <div class="comp-cell bad">&#x2717; / Complemento pago</div>
      <div class="comp-cell bad">&#x2717; / Complemento pago</div>
    </div>
    <div class="comp-row">
      <div class="comp-cell">C&oacute;digo aberto</div>
      <div class="comp-cell good">&#x2713; Licen&ccedil;a MIT</div>
      <div class="comp-cell bad">&#x2717;</div>
      <div class="comp-cell bad">&#x2717;</div>
    </div>
  </div>
  <div style="text-align:center;margin-top:24px">
    <div class="badge-row">
      <span class="badge">Sal&otilde;es de beleza</span>
      <span class="badge">Sal&otilde;es de cabelo</span>
      <span class="badge">Sal&otilde;es de unhas</span>
      <span class="badge">Barbearias</span>
      <span class="badge">Massagem e spa</span>
      <span class="badge">Est&uacute;dios de c&iacute;lios</span>
      <span class="badge">Est&uacute;dios de tatuagem</span>
    </div>
  </div>
</section>

<section class="sec sec-white">
  <div class="sec-head">
    <h2>Duas formas de usar o Pronto no seu sal&atilde;o</h2>
    <p>Self-hosted para controle total, ou nossa nuvem para estar pronto em 5 minutos.</p>
  </div>
  <div class="two-paths">
    <div class="path-card self">
      <div class="path-label">Op&ccedil;&atilde;o 1</div>
      <h3>Self-hosted</h3>
      <p class="path-desc">Instale no seu pr&oacute;prio servidor. Seus dados nunca saem da sua m&aacute;quina.
Gr&aacute;tis para sempre. Requer Docker.</p>
      <div class="code-block"><span class="code-prefix">$</span>docker compose up -d</div><br>
      <div class="path-points" style="margin-top:16px">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>$0 para sempre</strong> &mdash; sem assinatura, sem limites de clientes ou funcion&aacute;rios</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Licen&ccedil;a MIT</strong> &mdash; modifique, estenda e personalize livremente</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Qualquer servidor</strong> &mdash; VPS Linux, Windows, macOS. M&iacute;nimo 1 GB de RAM</div></div>
      </div>
      <a href="https://github.com/SGrappelli/pronto" class="btn-outline" style="margin-right:10px" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/pt/para/saloes'})">Ver no GitHub &rarr;</a>
      <a href="/pt/docs" class="btn-outline">Documenta&ccedil;&atilde;o &rarr;</a>
    </div>
    <div class="path-card cloud">
      <div class="path-label">Op&ccedil;&atilde;o 2</div>
      <h3>Nuvem &mdash; trypronto.app</h3>
      <p class="path-desc">Sem servidor pr&oacute;prio. Seu subdom&iacute;nio pronto em 5 minutos.
N&oacute;s gerenciamos atualiza&ccedil;&otilde;es, backups e uptime.</p>
      <div class="path-points">
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>Seu pr&oacute;prio subdom&iacute;nio</strong> &mdash; salon-maya.trypronto.app ou dom&iacute;nio personalizado no Pro+</div></div>
        <div class="path-point"><div class="path-point-dot"></div><div class="path-point-text"><strong>N&oacute;s cuidamos de tudo</strong> &mdash; atualiza&ccedil;&otilde;es, backups e monitoramento de uptime</div></div>
      </div>
      <a href="/register" class="btn-primary" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'pricing',language:'pt'})">Come&ccedil;ar gr&aacute;tis &mdash; sem cart&atilde;o</a>
    </div>
  </div>

  <div style="height:48px"></div>
  <div style="text-align:center;margin-bottom:22px">
    <p style="font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#0a0a0a">Pre&ccedil;os na nuvem</p>
  </div>
  <div class="plans">
    <div class="plan">
      <div class="plan-name">Gr&aacute;tis</div>
      <div class="plan-price">$0</div>
      <span class="plan-trial-free">Gr&aacute;tis para sempre</span>
      <div class="plan-limit">1 funcion&aacute;rio &middot; 100 clientes &middot; 50 agendamentos/m&ecirc;s</div>
      <ul class="plan-feats">
        <li>PDV + CRM + Estoque</li>
        <li>Notifica&ccedil;&otilde;es Email + Telegram + WhatsApp + Viber</li>
        <li>P&aacute;gina de agendamento online</li>
        <li><span style="font-size:11px;color:#9ca3af">&ldquo;Powered by Pronto&rdquo; na p&aacute;gina de agendamento</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$19<span>/m&ecirc;s</span></div>
      <div class="plan-limit">3 funcion&aacute;rios &middot; clientes ilimitados &middot; agendamentos ilimitados</div>
      <ul class="plan-feats">
        <li>Tudo do plano Gr&aacute;tis</li>
        <li>Badge &ldquo;Powered by Pronto&rdquo; removido</li>
      </ul>
    </div>
    <div class="plan featured">
      <div class="plan-popular">Mais popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$39<span>/m&ecirc;s</span></div>
      <div class="plan-limit">15 funcion&aacute;rios &middot; ilimitado</div>
      <ul class="plan-feats">
        <li>Tudo do Starter</li>
        <li>Painel de an&aacute;lises <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
        <li>Dom&iacute;nio personalizado <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
        <li>Programa de fidelidade <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
      </ul>
    </div>
    <div class="plan">
      <div class="plan-name">Agency</div>
      <div class="plan-price">$79<span>/m&ecirc;s</span></div>
      <div class="plan-limit">V&aacute;rias unidades</div>
      <ul class="plan-feats">
        <li>Tudo do Pro</li>
        <li>White-label <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
        <li>Acesso &agrave; API <span class="badge-soon" style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px">Em breve</span></li>
        <li>Suporte priorit&aacute;rio</li>
      </ul>
    </div>
  </div>
  <p class="pricing-note"><a href="/pt/precos">Ver pre&ccedil;os completos &rarr;</a></p>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Perguntas frequentes</h2>
    <div class="faq-item">
      <div class="faq-q">Qual &eacute; o melhor software gratuito para sal&atilde;o de beleza?</div>
      <div class="faq-a">O Pronto &eacute; um software gratuito e de c&oacute;digo aberto para sal&otilde;es de beleza que inclui PDV, calend&aacute;rio de agendamentos, CRM de clientes, controle de estoque e notifica&ccedil;&otilde;es autom&aacute;ticas por Email, Telegram, WhatsApp e Viber. A vers&atilde;o self-hosted &eacute; gratuita para sempre sem limites. A vers&atilde;o na nuvem tem plano gratuito e planos pagos a partir de $19 por m&ecirc;s.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Os clientes precisam criar uma conta para agendar?</div>
      <div class="faq-a">N&atilde;o. A p&aacute;gina de agendamento s&oacute; exige nome e n&uacute;mero de telefone. Sem cadastro, sem senha e sem aplicativo para baixar. Isso elimina a fric&ccedil;&atilde;o e aumenta significativamente a taxa de agendamentos em compara&ccedil;&atilde;o com plataformas que exigem criar uma conta.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O Pronto &eacute; uma alternativa &agrave;s plataformas de reservas para sal&otilde;es?</div>
      <div class="faq-a">Sim. Ao contr&aacute;rio das plataformas de reservas que cobram uma porcentagem de cada agendamento e ret&ecirc;m os dados dos seus clientes no sistema delas, o Pronto n&atilde;o cobra nenhuma comiss&atilde;o. Voc&ecirc; &eacute; dono da sua base de clientes 100%. Tamb&eacute;m &eacute; poss&iacute;vel instalar o sistema completo no seu pr&oacute;prio servidor &mdash; sem qualquer depend&ecirc;ncia de fornecedor.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como funcionam os lembretes autom&aacute;ticos de agendamentos para sal&otilde;es?</div>
      <div class="faq-a">O Pronto envia automaticamente uma confirma&ccedil;&atilde;o de agendamento na hora, um lembrete 24 horas antes da visita, outro lembrete 1 hora antes e uma mensagem de agradecimento 2 horas ap&oacute;s o t&eacute;rmino do atendimento. Todas as mensagens s&atilde;o enviadas pelo canal preferido do cliente: WhatsApp, Telegram, Viber ou Email. Sem nenhuma a&ccedil;&atilde;o manual da equipe do sal&atilde;o.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Posso controlar o estoque de produtos e receber alertas de estoque baixo?</div>
      <div class="faq-a">Sim. O Pronto controla o estoque de cada produto no seu sal&atilde;o. Quando um produto cai abaixo do m&iacute;nimo que voc&ecirc; define, um alerta &eacute; enviado automaticamente ao propriet&aacute;rio do sal&atilde;o por qualquer canal configurado: Email, Telegram, WhatsApp ou Viber.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O Pronto funciona para sal&otilde;es de cabelo, unhas e barbearias?</div>
      <div class="faq-a">Sim. O Pronto foi desenvolvido para qualquer neg&oacute;cio de servi&ccedil;os que realiza agendamentos e vende servi&ccedil;os ou produtos. Funciona para sal&otilde;es de cabelo, sal&otilde;es de beleza, sal&otilde;es de unhas, barbearias, est&uacute;dios de massagem e spa, est&uacute;dios de c&iacute;lios, est&uacute;dios de tatuagem e mais.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Como instalo o Pronto no meu pr&oacute;prio servidor?</div>
      <div class="faq-a">Voc&ecirc; precisa do Docker em qualquer servidor Linux, Windows ou macOS com pelo menos 1 GB de RAM. Execute <code>docker compose up -d</code> e o sistema completo de gest&atilde;o para sal&otilde;es inicia automaticamente. N&atilde;o s&atilde;o necess&aacute;rios conhecimentos de administra&ccedil;&atilde;o de servidores. Consulte a <a href="https://github.com/SGrappelli/pronto" style="color:#3b82f6;text-decoration:none">documenta&ccedil;&atilde;o no GitHub</a> para instru&ccedil;&otilde;es passo a passo.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">O que acontece com os meus dados se eu cancelar?</div>
      <div class="faq-a">Com a vers&atilde;o self-hosted, seus dados est&atilde;o sempre no seu pr&oacute;prio servidor &mdash; n&atilde;o h&aacute; nada para cancelar ou perder. Com a vers&atilde;o na nuvem, voc&ecirc; pode exportar todos os dados de clientes e hist&oacute;rico a qualquer momento. Sua base de clientes nunca fica presa como acontece em uma plataforma de marketplace.</div>
    </div>
  </div>
</section>

<section style="background:#f8fafc;border-top:1px solid #f0f0f0;padding:40px 48px;text-align:center">
  <p style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px">Tamb&eacute;m para</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
    <a href="/pt/para/barbearia" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">✂️ Barbearias</a>
    <a href="/pt/para/spa" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🧖 Spa e Massagem</a>
    <a href="/pt/para/academia" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">🏋️ Academias</a>
    <a href="/pt/para" style="font-size:14px;font-weight:500;padding:8px 18px;border-radius:20px;background:#fff;border:1px solid #e2e8f0;color:#111;text-decoration:none">Ver todos →</a>
  </div>
</section>

<section class="cta-band">
  <h2>Comece a gerenciar o seu sal&atilde;o gr&aacute;tis hoje</h2>
  <p>A nuvem leva 5 minutos. Self-hosted &eacute; um &uacute;nico comando.
De qualquer forma &mdash; sem comiss&atilde;o, para sempre.</p>
  <div>
    <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','sign_up_click',{location:'footer',language:'pt'})">Come&ccedil;ar gr&aacute;tis &mdash; nuvem</a>
    <a href="https://github.com/SGrappelli/pronto" class="btn-cta-outline" onclick="window.gtag&&window.gtag('event','github_click',{label:'cta_button',page:'/pt/para/saloes'})">Self-host no GitHub</a>
  </div>
</section>

</main>

<footer>
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-col-head">Para neg&oacute;cios</div>
      <a href="/pt/para">Todos os neg&oacute;cios</a>
      <a href="/pt/para/barbearia">Barbearias</a>
      <a href="/pt/para/tatuagens">Est&uacute;dios de tatuagem</a>
      <a href="/pt/para/academia">Academias</a>
      <a href="/pt/para/spa">Spa e massagem</a>
      <a href="/pt/para/clinica-dental">Cl&iacute;nicas Dent&aacute;rias</a>
      <a href="/pt/para/cafeteria">Cafeterias</a>
      <a href="/pt/para/auto-repair">Auto Repair</a>
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
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" onclick="window.gtag&&window.gtag('event','social_click',{platform:'twitter',page:'/pt/para/saloes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" onclick="window.gtag&&window.gtag('event','social_click',{platform:'linkedin',page:'/pt/para/saloes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
      <a href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" onclick="window.gtag&&window.gtag('event','social_click',{platform:'youtube',page:'/pt/para/saloes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" onclick="window.gtag&&window.gtag('event','github_click',{label:'footer_link',page:'/pt/para/saloes'})"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

export default function PtParaSaloesPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
