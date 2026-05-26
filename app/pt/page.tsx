import type { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import styles from '../landing.module.css'
import { TrackedLink } from '@/components/tracked-link'
import { LangSwitcher } from '@/components/LangSwitcher'
import { TrackedAnchor } from '@/components/tracked-anchor'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Pronto — Software Grátis para Gestão de Negócios',
  description:
    'Software gratuito de POS, CRM e agendamentos para pequenas empresas. Notificações por WhatsApp, Telegram e Email. Self-hosted ou SaaS.',
  keywords: [
    'software para salão de beleza',
    'sistema PDV grátis',
    'software de gestão para negócios',
    'CRM para pequenas empresas',
    'agendamento online sem comissão',
    'software para spa',
    'sistema de agendamento grátis',
    'software para barbearia',
    'gestão de clientes WhatsApp Telegram',
    'software código aberto negócios serviços',
  ],
  alternates: {
    canonical: 'https://trypronto.app/pt/',
    languages: {
      en: 'https://trypronto.app/',
      es: 'https://trypronto.app/es/',
      'pt-BR': 'https://trypronto.app/pt/',
      'x-default': 'https://trypronto.app/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/',
    title: 'Pronto — Software Grátis para Gestão de Negócios',
    description:
      'Software gratuito de POS, CRM e agendamentos para pequenas empresas. Notificações automáticas por WhatsApp, Telegram e Email.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto — Software Grátis para Gestão de Negócios',
    description:
      'Software gratuito de POS, CRM e agendamentos. Notificações por WhatsApp, Telegram e Email. Zero comissão.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pronto',
  url: 'https://trypronto.app/pt/',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Docker, PWA',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Software gratuito de POS, CRM e agendamentos para pequenas empresas de serviço. Notificações automáticas por WhatsApp, Telegram, Viber e Email. Disponível como self-hosted (Docker) ou SaaS em trypronto.app.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
  },
  alternateName: [
    'sistema de agendamento gratuito',
    'software para salão de beleza grátis',
    'PDV open source',
    'CRM para barbearia gratuito',
    'sistema de gestão para clínica',
    'software para academia gratuito',
  ],
  inLanguage: 'pt-BR',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O Pronto é realmente gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A versão self-hosted é completamente gratuita para sempre, sem limites de clientes, funcionários ou agendamentos. A versão SaaS em trypronto.app também oferece um plano gratuito com POS, CRM e agendamentos incluídos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como faço para instalar o Pronto no meu servidor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Execute apenas um comando: docker compose up -d. O Pronto roda em qualquer servidor Linux com Docker. Não é necessário conhecimento de programação. A documentação completa está disponível no GitHub.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais canais de mensagens estão disponíveis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto envia notificações automáticas por WhatsApp, Telegram, Viber e Email. Os eventos incluem confirmação de agendamento, lembrete 24 horas antes, lembrete 1 hora antes, mensagem de agradecimento após a visita e reativação de clientes inativos.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto cobra comissão sobre agendamentos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O Pronto não cobra nenhuma comissão sobre agendamentos ou vendas. Os clientes reservam diretamente com você, sem intermediários. Você fica com 100% da receita.',
      },
    },
    {
      '@type': 'Question',
      name: 'Para quais tipos de negócio o Pronto serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto foi desenvolvido para negócios de serviços: salões de beleza, barbearias, academias, clínicas odontológicas, cafés, spas, centros de massagem e qualquer negócio que trabalhe com atendimentos e agendamentos de clientes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Meus dados ficam seguros?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na versão self-hosted, todos os seus dados ficam no seu próprio servidor — sem nuvem de terceiros. Na versão SaaS, cada negócio tem isolamento completo de dados com Row Level Security no PostgreSQL.',
      },
    },
    {
      '@type': 'Question',
      name: 'O Pronto tem aplicativo para celular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto é um PWA (Progressive Web App) — instale diretamente na tela inicial do celular sem precisar da App Store ou Google Play. O caixa (PDV) funciona offline com sincronização automática ao reconectar.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que está incluído no plano gratuito do SaaS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O plano gratuito inclui PDV completo, CRM de clientes, controle de estoque, agendamento online e notificações por Email. Suporta até 1 funcionário e 100 clientes. Sem cartão de crédito necessário.',
      },
    },
  ],
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pronto',
  url: 'https://trypronto.app',
  logo: 'https://trypronto.app/logo.png',
  sameAs: ['https://github.com/SGrappelli/pronto'],
}

export default function PtPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink href="/pt/precos" className={`${styles.navLink} ${styles.hideMob}`} eventName="pricing_click" eventParams={{ source: '/pt' }}>
            Preços
          </TrackedLink>
          <TrackedLink href="/login" className={`${styles.navLink} ${styles.hideTablet}`} eventName="sign_in_click" eventParams={{ location: 'navbar', language: 'pt' }}>
            Entrar
          </TrackedLink>
          <LangSwitcher />
          <TrackedLink href="/register" className={styles.btnNav} eventName="sign_up_click" eventParams={{ location: 'navbar', language: 'pt' }}>
            Começar grátis
          </TrackedLink>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <h1>Gerencie seu negócio sem pagar 20% de comissão</h1>
              <p className={styles.heroDesc}>
                POS, CRM, agendamento e notificações automáticas por WhatsApp, Telegram e Email —
                tudo em um só lugar. Self-hosted ou SaaS.
              </p>
            </div>
            <div className={styles.heroVideoCol}>
              <div className={styles.browserMockup}>
                <div className={styles.browserBar}>
                  <span className={`${styles.browserDot} ${styles.browserDotRed}`} />
                  <span className={`${styles.browserDot} ${styles.browserDotYellow}`} />
                  <span className={`${styles.browserDot} ${styles.browserDotGreen}`} />
                </div>
                <video
                  src="/demo-booking.mp4"
                  poster="/demo-booking-poster.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={styles.browserVideo}
                />
              </div>
            </div>
          </div>
        </section>

        {/* TUDO EM UM SÓ LUGAR */}
        <section className={`${styles.sec} ${styles.secWhite}`}>
          <div className={styles.secHead}>
            <h2>Tudo em um só lugar</h2>
            <p>
              Funciona da mesma forma no seu próprio servidor ou na nuvem. Sem integrações. Sem
              plugins. Sem taxas por transação.
            </p>
          </div>
          <div className={styles.bizTags}>
            <span className={`${styles.bizTag} ${styles.bt1}`}>Salão de Beleza</span>
            <span className={`${styles.bizTag} ${styles.bt2}`}>Barbearia</span>
            <span className={`${styles.bizTag} ${styles.bt3}`}>Spa &amp; Massagem</span>
            <span className={`${styles.bizTag} ${styles.bt4}`}>Academia</span>
            <span className={`${styles.bizTag} ${styles.bt5}`}>Clínica</span>
            <span className={`${styles.bizTag} ${styles.bt6}`}>Café</span>
            <span className={`${styles.bizTag} ${styles.bt7}`}>Automotivo</span>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.featGrid}>
              <div className={styles.featCard}>
                <h4>PDV / Caixa</h4>
                <p>Registre vendas, aceite pagamentos, aplique descontos e imprima recibos em 3 cliques.</p>
              </div>
              <div className={styles.featCard}>
                <h4>CRM / Clientes</h4>
                <p>Base de clientes, histórico de visitas, tags, anotações e busca instantânea.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Agendamento</h4>
                <p>Calendário com arrastar e soltar, gestão de horários e reserva online sem registro.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Estoque</h4>
                <p>Controle de entradas e saídas, alertas de estoque mínimo e rastreamento de itens.</p>
              </div>
              <div className={styles.featCard}>
                <h4>Notificações</h4>
                <p>Lembretes automáticos por WhatsApp, Telegram, Viber e Email sem custo adicional.</p>
              </div>
              <div className={styles.featCard}>
                <h4>PWA</h4>
                <p>Instale na tela inicial, use o caixa offline. Sem App Store, sem taxa de 30%.</p>
              </div>
            </div>
            <div className={styles.demoWrap}>
              <div className={styles.browserMockup}>
                <div className={styles.browserBar}>
                  <span className={`${styles.browserDot} ${styles.browserDotRed}`} />
                  <span className={`${styles.browserDot} ${styles.browserDotYellow}`} />
                  <span className={`${styles.browserDot} ${styles.browserDotGreen}`} />
                </div>
                <video
                  src="/demo-calendar.mp4"
                  poster="/demo-calendar-poster.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={styles.browserVideo}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEITO PARA NEGÓCIOS DE SERVIÇO */}
        <section className={`${styles.sec} ${styles.secWarm}`}>
          <div className={styles.secHead}>
            <h2>Feito para negócios de serviço</h2>
            <p>Substitui planilhas, lembretes manuais e plataformas caras que retêm seus clientes.</p>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.painGrid}>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>Antes</div>
                <div className={styles.painFromText}>Excel para clientes e vendas</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>CRM + PDV em uma só interface</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>Antes</div>
                <div className={styles.painFromText}>Lembretes enviados manualmente</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>
                  Notificações automáticas por WhatsApp, Telegram e Email
                </div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>Antes</div>
                <div className={styles.painFromText}>A plataforma cobra 20% dos seus agendamentos</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Reserva online direta, 0% de comissão</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>Antes</div>
                <div className={styles.painFromText}>ERPNext e Odoo são complexos demais</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Interface simples — qualquer funcionário aprende em 30 minutos</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>Antes</div>
                <div className={styles.painFromText}>Sem análises — apenas intuição</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Painel de receita, LTV e serviços mais populares</div>
              </div>
              <div className={styles.painCard}>
                <div className={styles.painFromLabel}>Antes</div>
                <div className={styles.painFromText}>Dados dos clientes em plataformas de terceiros</div>
                <div className={styles.painArrow}>↓</div>
                <div className={styles.painTo}>Self-hosted: dados no seu servidor</div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICAÇÕES OMNICHANNEL */}
        <section className={`${styles.sec} ${styles.secBlue}`}>
          <div className={styles.secHead}>
            <h2>Notificações omnichannel</h2>
            <p>
              O principal diferencial no mercado open-source. ERPNext, Dolibarr, OSPOS — nenhum tem
              isso nativamente.
            </p>
          </div>
          <div className={styles.channelRow}>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotGreen}`}></span>WhatsApp
            </div>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotBlue}`}></span>Telegram
            </div>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotPurple}`}></span>Viber
            </div>
            <div className={styles.channel}>
              <span className={`${styles.dot} ${styles.dotGreen}`}></span>Email
            </div>
            <div className={`${styles.channel} ${styles.soon}`}>
              <span className={`${styles.dot} ${styles.dotGray}`}></span>LINE{' '}
              <span className={styles.badgeSoon}>Em breve</span>
            </div>
            <div className={`${styles.channel} ${styles.soon}`}>
              <span className={`${styles.dot} ${styles.dotGray}`}></span>SMS{' '}
              <span className={styles.badgeSoon}>Em breve</span>
            </div>
          </div>
          <div className={styles.cardsWrap}>
            <div className={styles.notifGrid}>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Confirmação de agendamento</div>
                <div className={styles.evSub}>Enviada imediatamente após a reserva</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Lembrete 24h antes</div>
                <div className={styles.evSub}>Reduz no-shows automaticamente</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Lembrete 1h antes</div>
                <div className={styles.evSub}>Lembrete final antes da visita</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Agradecimento pós-visita</div>
                <div className={styles.evSub}>Enviado 2 horas após o término</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Reativação de clientes</div>
                <div className={styles.evSub}>&ldquo;Você não nos visita há 30 dias&rdquo;</div>
              </div>
              <div className={styles.notifCard}>
                <div className={styles.evText}>Aniversário do cliente</div>
                <div className={styles.evSub}>Felicitações automáticas no dia do aniversário</div>
              </div>
            </div>
          </div>
        </section>

        {/* DUAS FORMAS DE USAR O PRONTO */}
        <section className={`${styles.sec} ${styles.secWhite}`}>
          <div className={styles.secHead}>
            <h2>Duas formas de usar o Pronto</h2>
            <p>Escolha o que melhor se adapta ao seu negócio. Mude a qualquer momento.</p>
          </div>
          <div className={styles.twoPaths}>
            {/* SELF-HOSTED */}
            <div className={`${styles.pathCard} ${styles.self}`}>
              <div className={styles.pathLabel}>Open Source · MIT</div>
              <h3>Self-Hosted</h3>
              <p className={styles.pathDesc}>
                Instale no seu servidor com um comando. Seus dados, seu controle.
              </p>
              <div className={styles.shHighlights}>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>17</div>
                  <div className={styles.shHlLabel}>Migrações</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>Docker</div>
                  <div className={styles.shHlLabel}>Compose</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>MIT</div>
                  <div className={styles.shHlLabel}>License</div>
                </div>
                <div className={styles.shHlItem}>
                  <div className={styles.shHlNum}>CI/CD</div>
                  <div className={styles.shHlLabel}>Pipeline</div>
                </div>
              </div>
              <div className={styles.pathPoints}>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Gratuito para sempre</strong> — sem limites de clientes ou funcionários
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Dados 100% no seu servidor</strong> — sem nuvem de terceiros
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Código aberto e auditável</strong> — licença MIT, modifique livremente
                  </div>
                </div>
              </div>
              <div className={styles.codeBlock}>
                <span className={styles.codePrefix}>$</span>docker compose up -d
              </div>
              <br />
              <TrackedAnchor
                href="https://github.com/SGrappelli/pronto"
                className={styles.btnOutline}
                style={{ marginTop: '16px' }}
                target="_blank"
                rel="noopener noreferrer"
                eventName="github_click"
                eventParams={{ label: 'cta_button', page: '/pt' }}
              >
                Ver no GitHub →
              </TrackedAnchor>
              <Link href="/pt/docs" className={styles.btnOutline} style={{ marginTop: '16px' }}>
                Documentação →
              </Link>
            </div>

            {/* CLOUD */}
            <div className={`${styles.pathCard} ${styles.cloud}`}>
              <div className={styles.pathLabel}>SaaS · trypronto.app</div>
              <h3>Cloud SaaS</h3>
              <p className={styles.pathDesc}>
                Sem servidor, sem DevOps. Pronto para usar em minutos.
              </p>
              <div className={styles.trialBanner}>
                <div className={styles.trialText}>Plano gratuito — sem cartão de crédito.</div>
              </div>
              <div className={styles.pathPoints}>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Subdomínio próprio</strong> — seu-negocio.trypronto.app ou domínio
                    personalizado no Pro+
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Atualizações automáticas</strong> — sempre na versão mais recente
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Backups gerenciados</strong> — seus dados sempre seguros
                  </div>
                </div>
                <div className={styles.pathPoint}>
                  <div className={styles.pathPointDot}></div>
                  <div className={styles.pathPointText}>
                    <strong>Suporte prioritário</strong> nos planos pagos
                  </div>
                </div>
              </div>
              <TrackedLink href="/register" className={styles.btnPrimary} eventName="sign_up_click" eventParams={{ location: 'hero', language: 'pt' }}>
                Começar grátis — sem cartão
              </TrackedLink>
            </div>
          </div>

          {/* PREÇOS */}
          <div className={styles.plansWrap}>
            <div className={styles.plansTitle}>Preços simples e transparentes</div>
            <div className={styles.plans}>
              <div className={styles.plan}>
                <div className={styles.planName}>Free</div>
                <div className={styles.planPrice}>R$0</div>
                <span className={styles.planTrialFree}>Grátis para sempre</span>
                <div className={styles.planLimit}>1 funcionário · 100 clientes</div>
                <ul className={styles.planFeats}>
                  <li>PDV completo</li>
                  <li>CRM de clientes</li>
                  <li>Controle de estoque</li>
                  <li>Agendamento online</li>
                  <li>Notificações por Email</li>
                </ul>
                <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>&ldquo;Powered by Pronto&rdquo; na página de reservas</p>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Starter</div>
                <div className={styles.planPrice}>
                  $19<span>/mês</span>
                </div>
                <div className={styles.planLimit}>3 funcionários · 1.000 clientes</div>
                <ul className={styles.planFeats}>
                  <li>Tudo do plano Free</li>
                  <li>Notificações por Telegram</li>
                  <li>Notificações por WhatsApp</li>
                  <li>Agendamento online com link público</li>
                </ul>
              </div>
              <div className={`${styles.plan} ${styles.featured}`}>
                <div className={styles.planPopular}>Mais popular</div>
                <div className={styles.planName}>Pro</div>
                <div className={styles.planPrice}>
                  $39<span>/mês</span>
                </div>
                <div className={styles.planLimit}>15 funcionários · ilimitado</div>
                <ul className={styles.planFeats}>
                  <li>Tudo do Starter</li>
                  <li>Notificações por Viber</li>
                  <li>
                    Domínio personalizado{' '}
                    <span className={styles.badgeSoon}>Em breve</span>
                  </li>
                  <li>
                    Análises e relatórios{' '}
                    <span className={styles.badgeSoon}>Em breve</span>
                  </li>
                  <li>
                    Programa de fidelidade{' '}
                    <span className={styles.badgeSoon}>Em breve</span>
                  </li>
                </ul>
              </div>
              <div className={styles.plan}>
                <div className={styles.planName}>Agency</div>
                <div className={styles.planPrice}>
                  $79<span>/mês</span>
                </div>
                <div className={styles.planLimit}>Múltiplos locais · ilimitado</div>
                <ul className={styles.planFeats}>
                  <li>Tudo do Pro</li>
                  <li>Múltiplos locais</li>
                  <li>
                    White-label{' '}
                    <span className={styles.badgeSoon}>Em breve</span>
                  </li>
                  <li>
                    Acesso à API{' '}
                    <span className={styles.badgeSoon}>Em breve</span>
                  </li>
                  <li>Suporte prioritário</li>
                </ul>
              </div>
            </div>
            <p className={styles.pricingNote}>
              Planos pagos cobrados via Whop · Cancele a qualquer momento
            </p>
            <p className="text-center text-base font-medium mt-3">
              <Link href="/pt/precos" className="text-blue-600 hover:text-blue-800 underline underline-offset-2">Ver preços completos →</Link>
            </p>
            <p className="text-center text-base font-medium text-gray-700 mt-2">Vindo de outra plataforma? <Link href="/pt/vs/" className="text-blue-600 hover:text-blue-800 underline underline-offset-2">Compare aqui →</Link></p>
          </div>
        </section>
      </main>

      {/* PERGUNTAS FREQUENTES */}
      <section className={styles.faq}>
        <div className={styles.faqInner}>
          <h2>Perguntas frequentes</h2>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>O Pronto é realmente gratuito?</div>
            <div className={styles.faqA}>
              Sim. A versão self-hosted é completamente gratuita para sempre, sem limites de
              clientes, funcionários ou agendamentos. A versão SaaS em trypronto.app também oferece
              um plano gratuito com POS, CRM e agendamentos incluídos.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Como faço para instalar o Pronto no meu servidor?</div>
            <div className={styles.faqA}>
              Execute apenas um comando:{' '}
              <code
                style={{
                  background: '#f3f4f6',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                docker compose up -d
              </code>
              . O Pronto roda em qualquer servidor Linux com Docker. Não é necessário conhecimento
              de programação. A documentação completa está disponível no GitHub.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Quais canais de mensagens estão disponíveis?</div>
            <div className={styles.faqA}>
              O Pronto envia notificações automáticas por WhatsApp, Telegram, Viber e Email. Os
              eventos incluem confirmação de agendamento, lembrete 24 horas antes, lembrete 1 hora
              antes, mensagem de agradecimento após a visita e reativação de clientes inativos.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>O Pronto cobra comissão sobre agendamentos?</div>
            <div className={styles.faqA}>
              Não. O Pronto não cobra nenhuma comissão sobre agendamentos ou vendas. Os clientes
              reservam diretamente com você, sem intermediários. Você fica com 100% da receita.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Para quais tipos de negócio o Pronto serve?</div>
            <div className={styles.faqA}>
              O Pronto foi desenvolvido para negócios de serviços: salões de beleza, barbearias,
              academias, clínicas odontológicas, cafés, spas, centros de massagem e qualquer negócio
              que trabalhe com atendimentos e agendamentos de clientes.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>Meus dados ficam seguros?</div>
            <div className={styles.faqA}>
              Na versão self-hosted, todos os seus dados ficam no seu próprio servidor — sem nuvem
              de terceiros. Na versão SaaS, cada negócio tem isolamento completo de dados com Row
              Level Security no PostgreSQL.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>O Pronto tem aplicativo para celular?</div>
            <div className={styles.faqA}>
              Sim. O Pronto é um PWA (Progressive Web App) — instale diretamente na tela inicial do
              celular sem precisar da App Store ou Google Play. O caixa (PDV) funciona offline com
              sincronização automática ao reconectar.
            </div>
          </div>
          <div className={styles.faqItem}>
            <div className={styles.faqQ}>O que está incluído no plano gratuito do SaaS?</div>
            <div className={styles.faqA}>
              O plano gratuito inclui PDV completo, CRM de clientes, controle de estoque,
              agendamento online e notificações por Email. Suporta até 1 funcionário e 100 clientes.
              Sem cartão de crédito necessário.
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footerGridWrap}>
        <div className={styles.footerGrid}>
          <div>
            <Link href="/pt/" style={{fontSize:'22px',fontWeight:800,color:'#111',letterSpacing:'-0.5px',textDecoration:'none'}}>Pronto<span style={{color:'#16a34a'}}>.</span></Link>
            <div style={{fontSize:'13px',color:'#6b7280',marginTop:'6px'}}>Your data, your server.</div>
          </div>
          <div>
            <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase' as const,color:'#9ca3af',marginBottom:'14px'}}>Produto</div>
            <Link href="/pt/precos" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Preços</Link>
            <Link href="/pt/para/" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Para negócios</Link>
            <Link href="/pt/blog" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Blog</Link>
          </div>
          <div>
            <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase' as const,color:'#9ca3af',marginBottom:'14px'}}>Comparar</div>
            <Link href="/pt/vs/" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Comparativos</Link>
            <Link href="/pt/vs/fresha" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Fresha</Link>
            <Link href="/pt/vs/booksy" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Booksy</Link>
            <Link href="/pt/vs/mindbody" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Mindbody</Link>
            <Link href="/pt/vs/vagaro" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Vagaro</Link>
            <Link href="/pt/vs/square" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Square</Link>
            <Link href="/pt/vs/trinks" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>vs Trinks</Link>
          </div>
          <div>
            <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase' as const,color:'#9ca3af',marginBottom:'14px'}}>Legal</div>
            <Link href="/terms" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Termos de Uso</Link>
            <Link href="/privacy" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Política de Privacidade</Link>
            <Link href="/refund" style={{display:'block',fontSize:'14px',color:'#6b7280',textDecoration:'none',marginBottom:'10px'}}>Política de Reembolso</Link>
          </div>
        </div>
        <div className={styles.footerGridBottom}>
          <div style={{fontSize:'13px',color:'#9ca3af'}}>© 2026 Pronto. Todos os direitos reservados.</div>
          <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
            <TrackedAnchor href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" eventName="social_click" eventParams={{ platform: 'twitter' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" eventName="social_click" eventParams={{ platform: 'linkedin' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" eventName="social_click" eventParams={{ platform: 'youtube' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </TrackedAnchor>
            <TrackedAnchor href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" eventName="github_click" eventParams={{ label: 'footer_link' }} style={{color:'#9ca3af',display:'flex',lineHeight:'1',textDecoration:'none'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </TrackedAnchor>
          </div>
        </div>
      </footer>
    </div>
  )
}
