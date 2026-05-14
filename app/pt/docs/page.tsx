import type { Metadata } from 'next'
import Link from 'next/link'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import styles from '../../(public)/public-layout.module.css'
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
  title: 'Guia de Instalação do Pronto — Documentação',
  description:
    'Instale o Pronto no seu servidor com Docker em minutos. Variáveis de ambiente, configuração de WhatsApp, Telegram e Email, e perguntas frequentes.',
  keywords: [
    'instalação POS auto-hospedado',
    'docker compose sistema agendamento',
    'instalar CRM código aberto',
    'documentação pronto pos',
    'guia instalação software negócio docker',
    'instalar POS em VPS',
    'pronto self-hosted guia',
  ],
  alternates: {
    canonical: 'https://trypronto.app/pt/docs',
    languages: {
      en: 'https://trypronto.app/docs',
      es: 'https://trypronto.app/es/docs',
      pt: 'https://trypronto.app/pt/docs',
      'x-default': 'https://trypronto.app/docs',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/pt/docs',
    title: 'Guia de Instalação do Pronto — Documentação',
    description:
      'Instale o Pronto no seu servidor em minutos. Docker Compose, variáveis de ambiente, configuração de Telegram e WhatsApp, e guia de resolução de problemas.',
    images: [{ url: 'https://trypronto.app/og-docs.png' }],
    locale: 'pt_BR',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guia de Instalação do Pronto — Documentação',
    description:
      'Instale o Pronto no seu servidor em minutos. Docker Compose, variáveis de ambiente, configuração de Telegram e WhatsApp, e guia de resolução de problemas.',
    images: ['https://trypronto.app/og-docs.png'],
  },
}

const techArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Guia de Instalação do Pronto Self-Hosted',
  description:
    'Guia passo a passo para instalar o Pronto POS e CRM no seu próprio servidor usando Docker Compose.',
  url: 'https://trypronto.app/pt/docs',
  author: {
    '@type': 'Organization',
    name: 'Pronto',
    url: 'https://trypronto.app',
  },
  datePublished: '2026-01-01',
  dateModified: '2026-05-01',
  inLanguage: 'pt',
  keywords: 'POS auto-hospedado, docker, instalação, CRM código aberto',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quais são os requisitos mínimos do servidor para executar o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto requer Docker 24+, 1 GB de RAM mínimo (2 GB recomendado) e 5 GB de espaço livre em disco. Funciona em Linux, macOS ou Windows com WSL2. Um VPS de $6/mês é suficiente para a maioria dos pequenos negócios.',
      },
    },
    {
      '@type': 'Question',
      name: 'Preciso de uma conta Supabase para hospedar o Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto usa o Supabase para banco de dados e autenticação. Você pode usar o nível gratuito do Supabase, que suporta até 500 MB de armazenamento de banco de dados, mais que suficiente para a maioria das implantações de pequenos negócios.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como ativo as notificações do WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Pronto usa a Meta Cloud API para WhatsApp. Você precisa de uma conta Meta Developer e um número WhatsApp Business verificado. Defina WHATSAPP_PHONE_NUMBER_ID e WHATSAPP_ACCESS_TOKEN no seu arquivo .env. Mensagens iniciadas pelo negócio exigem templates de mensagens aprovados previamente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso executar o Pronto sem um nome de domínio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Pronto funciona com um endereço IP simples ou localhost para uso local. Para produção com SSL, recomenda-se um nome de domínio. Você pode usar qualquer proxy reverso (Nginx, Caddy) para adicionar HTTPS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como atualizo o Pronto para uma nova versão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Execute git pull origin main, depois docker compose down && docker compose up -d --build. As migrações de banco de dados são executadas automaticamente na inicialização — nenhuma etapa SQL manual é necessária.',
      },
    },
    {
      '@type': 'Question',
      name: 'Há limite de clientes ou funcionários na versão self-hosted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. A versão self-hosted é completamente ilimitada — sem limites de clientes, funcionários, locais ou agendamentos. Defina NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted no seu .env para ativar este modo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Onde posso obter ajuda se algo não funcionar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Abra uma issue no repositório do GitHub em github.com/SGrappelli/pronto. A comunidade e os mantenedores respondem às issues lá. Para assistência de instalação paga, entre em contato pela página do GitHub.',
      },
    },
  ],
}

export default function PtDocsPage() {
  return (
    <div className={`${styles.page} ${bricolage.variable} ${dmSans.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className={styles.nav}>
        <Link href="/pt/" className={styles.navBrand}>
          Pronto<span>.</span>
        </Link>
        <div className={styles.navRight}>
          <TrackedLink href="/pt/precos" className={`${styles.navLink} ${styles.hideMob}`} eventName="pricing_click" eventParams={{ source: '/pt/docs' }}>
            Preços
          </TrackedLink>
          <TrackedLink href="/login" className={`${styles.navLink} ${styles.hideTablet}`} eventName="login_click" eventParams={{ label: 'nav_signin' }}>
            Entrar
          </TrackedLink>
          <LangSwitcher />
          <TrackedLink href="/register" className={styles.btnNav} eventName="cta_click" eventParams={{ label: 'start_free', page: '/pt/docs' }}>
            Começar grátis
          </TrackedLink>
        </div>
      </nav>

      <main className={styles.main}>
        <div className="py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/pt/" className="hover:text-gray-900 transition-colors">Início</Link>
              <span>→</span>
              <span className="text-gray-900">Documentação</span>
            </nav>

            {/* Hero */}
            <div className="mb-10">
              <h1
                className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
              >
                Documentação do Pronto
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Tudo o que você precisa para instalar, configurar e executar o Pronto no seu próprio servidor.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Self-hosted', 'Docker Compose', 'Licença MIT'].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Início rápido */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Início rápido
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                    <h3 className="font-semibold text-gray-900">Clonar o repositório</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Clone o repositório público e copie o arquivo de ambiente:</p>
                  <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto leading-relaxed font-mono"><code>{`git clone https://github.com/SGrappelli/pronto.git\ncd pronto\ncp .env.example .env`}</code></pre>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                    <h3 className="font-semibold text-gray-900">Configurar o ambiente</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Abra o{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code>{' '}
                    e preencha as variáveis obrigatórias. Mínimo necessário:{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.{' '}
                    Consulte a referência completa de variáveis abaixo.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                    <h3 className="font-semibold text-gray-900">Iniciar a aplicação</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Execute o seguinte comando. As migrações são executadas automaticamente na inicialização:</p>
                  <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto font-mono"><code>docker compose up -d</code></pre>
                  <p className="text-sm text-gray-500 mt-3">
                    Sua instância estará disponível em{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">http://localhost:3000</code>
                  </p>
                </div>
              </div>
            </section>

            {/* Requisitos do sistema */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Requisitos do sistema
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Requisito</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Mínimo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {([
                      ['Sistema operacional', 'Linux, macOS ou Windows (WSL2)'],
                      ['RAM', '1 GB mínimo, 2 GB recomendado'],
                      ['Disco', '5 GB de espaço livre'],
                      ['Docker', 'Docker 24+ com Docker Compose v2'],
                      ['Internet', 'Necessário para configuração inicial e notificações'],
                      ['Domínio (opcional)', 'Qualquer domínio ou subdomínio apontando para seu servidor'],
                    ] as [string, string][]).map(([req, min]) => (
                      <tr key={req} className="bg-white">
                        <td className="px-5 py-3 text-gray-700 font-medium">{req}</td>
                        <td className="px-5 py-3 text-gray-600">{min}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Variáveis de ambiente */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Variáveis de ambiente
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                Copie{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env.example</code>{' '}
                para{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code>{' '}
                e preencha os valores indicados.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Variável</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Obrigatória</th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {([
                      ['NEXT_PUBLIC_SUPABASE_URL',       '✅', 'URL do seu projeto Supabase'],
                      ['NEXT_PUBLIC_SUPABASE_ANON_KEY',  '✅', 'Chave anônima do Supabase'],
                      ['SUPABASE_SERVICE_ROLE_KEY',      '✅', 'Chave de função de serviço (manter em segredo)'],
                      ['NEXTAUTH_SECRET',                '✅', 'String aleatória para criptografia de sessão'],
                      ['NEXTAUTH_URL',                   '✅', 'URL completa da sua instância (ex. https://seudominio.com)'],
                      ['NEXT_PUBLIC_DEPLOYMENT_MODE',    '✅', 'Definir como: selfhosted'],
                      ['RESEND_API_KEY',                 '⚡', 'Chave API do Resend para notificações por e-mail'],
                      ['TELEGRAM_BOT_TOKEN',             '⚡', 'Token do bot do Telegram do @BotFather'],
                      ['WHATSAPP_PHONE_NUMBER_ID',       '⚡', 'ID do número de telefone da Meta Cloud API'],
                      ['WHATSAPP_ACCESS_TOKEN',          '⚡', 'Token de acesso permanente da Meta Cloud API'],
                      ['VIBER_BOT_TOKEN',                '⚡', 'Token do bot do Viber'],
                    ] as [string, string, string][]).map(([varName, req, desc]) => (
                      <tr key={varName} className="bg-white">
                        <td className="px-5 py-3">
                          <code className="text-xs font-mono text-gray-800">{varName}</code>
                        </td>
                        <td className="px-4 py-3 text-center text-base">{req}</td>
                        <td className="px-5 py-3 text-gray-600 text-sm">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <code className="font-mono text-xs">NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted</code> remove toda a interface de cobrança SaaS e habilita clientes, funcionários e locais ilimitados.
              </p>
            </section>

            {/* Configuração de notificações */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Configuração de notificações
              </h2>
              <div className="space-y-3">
                {([
                  {
                    title: 'E-mail (Resend)',
                    steps: [
                      'Crie uma conta gratuita em resend.com',
                      'Adicione e verifique seu domínio',
                      'Gere uma chave API',
                      'Defina RESEND_API_KEY no seu arquivo .env',
                      'Reinicie: docker compose restart app',
                    ],
                  },
                  {
                    title: 'Telegram',
                    steps: [
                      'Abra o Telegram e escreva para @BotFather',
                      'Envie /newbot e siga as instruções',
                      'Copie o token recebido',
                      'Defina TELEGRAM_BOT_TOKEN no seu arquivo .env',
                      'No Pronto → Configurações → Notificações, insira o token do bot por negócio',
                    ],
                  },
                  {
                    title: 'WhatsApp (Meta Cloud API)',
                    steps: [
                      'Acesse developers.facebook.com e crie um aplicativo',
                      'Adicione o produto WhatsApp ao seu app',
                      'Copie seu Phone Number ID e gere um token de acesso permanente',
                      'Defina WHATSAPP_PHONE_NUMBER_ID e WHATSAPP_ACCESS_TOKEN no .env',
                      'Nota: mensagens de texto livre funcionam apenas dentro da janela de atendimento ao cliente de 24 horas. Mensagens iniciadas pelo negócio exigem templates HSM aprovados no Meta Business Manager.',
                    ],
                  },
                  {
                    title: 'Viber',
                    steps: [
                      'Acesse partners.viber.com e crie um bot',
                      'Copie o token do bot',
                      'Defina VIBER_BOT_TOKEN no seu arquivo .env',
                      'Nota: bots do Viber criados após fevereiro de 2024 exigem um plano comercial (~€100/mês).',
                    ],
                  },
                ] as { title: string; steps: string[] }[]).map((section) => (
                  <details key={section.title} className="border border-gray-200 rounded-xl overflow-hidden group">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors list-none">
                      <span className="font-semibold text-gray-900 text-sm">{section.title}</span>
                      <span className="text-gray-400 text-lg leading-none select-none">+</span>
                    </summary>
                    <div className="px-5 pb-5 pt-1 bg-white">
                      <ol className="space-y-2 mt-2">
                        {section.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-700">
                            <span className="flex-shrink-0 font-semibold text-gray-400">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Atualização */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Atualizar para uma nova versão
              </h2>
              <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto font-mono leading-relaxed"><code>{`git pull origin main\ndocker compose down\ndocker compose up -d --build`}</code></pre>
              <p className="text-sm text-gray-500 mt-3">
                As migrações são executadas automaticamente na inicialização — nenhuma etapa SQL manual é necessária.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-14">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Perguntas frequentes
              </h2>
              <div className="border-t border-gray-100">
                {([
                  {
                    q: 'Quais são os requisitos mínimos do servidor para executar o Pronto?',
                    a: 'O Pronto requer Docker 24+, 1 GB de RAM mínimo (2 GB recomendado) e 5 GB de espaço livre em disco. Funciona em Linux, macOS ou Windows com WSL2. Um VPS de $6/mês é suficiente para a maioria dos pequenos negócios.',
                  },
                  {
                    q: 'Preciso de uma conta Supabase para hospedar o Pronto?',
                    a: 'Sim. O Pronto usa o Supabase para banco de dados e autenticação. Você pode usar o nível gratuito do Supabase, que suporta até 500 MB de armazenamento de banco de dados, mais que suficiente para a maioria das implantações de pequenos negócios.',
                  },
                  {
                    q: 'Como ativo as notificações do WhatsApp?',
                    a: 'O Pronto usa a Meta Cloud API para WhatsApp. Você precisa de uma conta Meta Developer e um número WhatsApp Business verificado. Defina WHATSAPP_PHONE_NUMBER_ID e WHATSAPP_ACCESS_TOKEN no seu arquivo .env. Mensagens iniciadas pelo negócio exigem templates de mensagens aprovados previamente.',
                  },
                  {
                    q: 'Posso executar o Pronto sem um nome de domínio?',
                    a: 'Sim. O Pronto funciona com um endereço IP simples ou localhost para uso local. Para produção com SSL, recomenda-se um nome de domínio. Você pode usar qualquer proxy reverso (Nginx, Caddy) para adicionar HTTPS.',
                  },
                  {
                    q: 'Como atualizo o Pronto para uma nova versão?',
                    a: 'Execute git pull origin main, depois docker compose down && docker compose up -d --build. As migrações de banco de dados são executadas automaticamente na inicialização — nenhuma etapa SQL manual é necessária.',
                  },
                  {
                    q: 'Há limite de clientes ou funcionários na versão self-hosted?',
                    a: 'Não. A versão self-hosted é completamente ilimitada — sem limites de clientes, funcionários, locais ou agendamentos. Defina NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted no seu .env para ativar este modo.',
                  },
                  {
                    q: 'Onde posso obter ajuda se algo não funcionar?',
                    a: 'Abra uma issue no repositório do GitHub em github.com/SGrappelli/pronto. A comunidade e os mantenedores respondem às issues lá. Para assistência de instalação paga, entre em contato pela página do GitHub.',
                  },
                ] as { q: string; a: string }[]).map((item) => (
                  <details key={item.q} className="border-b border-gray-100 last:border-0 group">
                    <summary className="flex items-start justify-between py-5 cursor-pointer list-none gap-4">
                      <span
                        className="font-semibold text-gray-900 text-base"
                        style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif" }}
                      >
                        {item.q}
                      </span>
                      <span className="text-gray-400 text-lg leading-none flex-shrink-0 mt-0.5 select-none">+</span>
                    </summary>
                    <p className="text-sm text-gray-600 leading-relaxed pb-5">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl bg-gray-50 border border-gray-200 px-8 py-10 text-center">
              <h2
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
              >
                Prefere uma versão gerenciada?
              </h2>
              <p className="text-gray-600 mb-7 max-w-lg mx-auto">
                Não quer gerenciar um servidor? O Pronto também está disponível como serviço em nuvem em
                trypronto.app — sem instalação.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Experimentar a versão em nuvem →
                </Link>
                <a
                  href="https://github.com/SGrappelli/pronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Ver no GitHub →
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          Pronto<span>.</span>
        </div>
        <div className={styles.footerCopy}>© 2026 Pronto. Todos os direitos reservados.</div>
        <div className={styles.footerSocial}>
          <TrackedAnchor href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X" eventName="social_click" eventParams={{ platform: 'twitter' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </TrackedAnchor>
          <TrackedAnchor href="https://www.linkedin.com/in/konstantinumnov/" target="_blank" rel="noopener noreferrer" aria-label="Pronto on LinkedIn" eventName="social_click" eventParams={{ platform: 'linkedin' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </TrackedAnchor>
          <TrackedAnchor href="https://www.youtube.com/@trypronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on YouTube" eventName="social_click" eventParams={{ platform: 'youtube' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </TrackedAnchor>
          <TrackedAnchor href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub" eventName="github_click" eventParams={{ label: 'footer_link', page: '/pt/docs' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </TrackedAnchor>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/pt/" style={{ fontSize: '15px' }}>Início</Link>
          <Link href="/pt/precos" style={{ fontSize: '15px' }}>Preços</Link>
          <Link href="/pt/para" style={{ fontSize: '15px' }}>Para negócios</Link>
          <Link href="/terms" style={{ fontSize: '15px' }}>Termos</Link>
          <Link href="/privacy" style={{ fontSize: '15px' }}>Privacidade</Link>
          <Link href="/refund" style={{ fontSize: '15px' }}>Reembolsos</Link>
        </div>
      </footer>
    </div>
  )
}
