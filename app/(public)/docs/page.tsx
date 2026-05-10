import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pronto Docs — Self-Hosted Installation Guide',
  description:
    'Step-by-step guide to install Pronto on your own server with Docker. System requirements, environment variables, notification setup, and FAQ.',
  keywords: [
    'self-hosted POS installation',
    'docker compose booking system',
    'open source CRM setup',
    'pronto pos documentation',
    'self-hosted appointment booking docker',
    'install POS on VPS',
    'pronto self-hosted guide',
  ],
  alternates: {
    canonical: 'https://trypronto.app/docs',
    languages: {
      en: 'https://trypronto.app/docs',
      es: 'https://trypronto.app/es/docs',
      pt: 'https://trypronto.app/pt/docs',
      'x-default': 'https://trypronto.app/docs',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/docs',
    title: 'Pronto Docs — Self-Hosted Installation Guide',
    description:
      'Install Pronto on your server in minutes. Docker Compose, environment variables, Telegram and WhatsApp setup, and troubleshooting guide.',
    images: [{ url: 'https://trypronto.app/og-docs.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pronto Docs — Self-Hosted Installation Guide',
    description:
      'Install Pronto on your server in minutes. Docker Compose, environment variables, Telegram and WhatsApp setup, and troubleshooting guide.',
    images: ['https://trypronto.app/og-docs.png'],
  },
}

const techArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Pronto Self-Hosted Installation Guide',
  description:
    'Step-by-step guide to install Pronto POS and CRM on your own server using Docker Compose.',
  url: 'https://trypronto.app/docs',
  author: {
    '@type': 'Organization',
    name: 'Pronto',
    url: 'https://trypronto.app',
  },
  datePublished: '2026-01-01',
  dateModified: '2026-05-01',
  inLanguage: 'en',
  keywords: 'self-hosted POS, docker, installation, open source CRM',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the minimum server requirements to run Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto requires Docker 24+, 1 GB RAM minimum (2 GB recommended), and 5 GB of free disk space. It runs on Linux, macOS, or Windows with WSL2. A $6/month VPS is sufficient for most small businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a Supabase account to self-host Pronto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto uses Supabase for the database and authentication. You can use the free Supabase tier, which supports up to 500 MB of database storage and is more than enough for most small business deployments.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I enable WhatsApp notifications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pronto uses the Meta Cloud API for WhatsApp. You need a Meta Developer account and a verified WhatsApp Business number. Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN in your .env file. Note that business-initiated messages require pre-approved message templates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I run Pronto without a domain name?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pronto works on a plain IP address or localhost for local use. For production with SSL, a domain name is recommended. You can use any reverse proxy (Nginx, Caddy) to add HTTPS.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I update Pronto to a new version?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run git pull origin main, then docker compose down && docker compose up -d --build. Database migrations run automatically on startup — no manual SQL steps are needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a limit on clients or staff in the self-hosted version?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The self-hosted version is completely unlimited — no caps on clients, staff members, locations, or bookings. Set NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted in your .env to enable this mode.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I get help if something is not working?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open an issue on the GitHub repository at github.com/SGrappelli/pronto. The community and maintainers respond to issues there. For paid installation assistance, contact us through the GitHub page.',
      },
    },
  ],
}

export default function DocsPage() {
  return (
    <div className="py-14 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>→</span>
          <span className="text-gray-900">Documentation</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <h1
            className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.5px' }}
          >
            Pronto Documentation
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Everything you need to install, configure, and run Pronto on your own server.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Self-hosted', 'Docker Compose', 'MIT License'].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
          >
            Quick Start
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="font-semibold text-gray-900">Clone the repository</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Clone the public repository and copy the environment file:</p>
              <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto leading-relaxed font-mono"><code>{`git clone https://github.com/SGrappelli/pronto.git\ncd pronto\ncp .env.example .env`}</code></pre>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="font-semibold text-gray-900">Configure environment</h3>
              </div>
              <p className="text-sm text-gray-600">
                Open <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> and fill in the required variables. Minimum required:{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.{' '}
                See the full variable reference below.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="font-semibold text-gray-900">Start the application</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Run the following command. Migrations run automatically on startup:</p>
              <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto font-mono"><code>docker compose up -d</code></pre>
              <p className="text-sm text-gray-500 mt-3">
                Your instance will be available at{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">http://localhost:3000</code>
              </p>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
          >
            System Requirements
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Requirement</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Minimum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {([
                  ['OS', 'Linux, macOS, or Windows (WSL2)'],
                  ['RAM', '1 GB minimum, 2 GB recommended'],
                  ['Disk', '5 GB free space'],
                  ['Docker', 'Docker 24+ with Docker Compose v2'],
                  ['Internet', 'Required for initial setup and notifications'],
                  ['Domain (optional)', 'Any domain or subdomain pointing to your server'],
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

        {/* Environment Variables */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
          >
            Environment Variables
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            Copy <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env.example</code> to{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> and fill in the values below.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Variable</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Required</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {([
                  ['NEXT_PUBLIC_SUPABASE_URL', '✅', 'Your Supabase project URL'],
                  ['NEXT_PUBLIC_SUPABASE_ANON_KEY', '✅', 'Supabase anonymous key'],
                  ['SUPABASE_SERVICE_ROLE_KEY', '✅', 'Supabase service role key (keep secret)'],
                  ['NEXTAUTH_SECRET', '✅', 'Random string for session encryption'],
                  ['NEXTAUTH_URL', '✅', 'Full URL of your instance (e.g. https://yourdomain.com)'],
                  ['NEXT_PUBLIC_DEPLOYMENT_MODE', '✅', 'Set to: selfhosted'],
                  ['RESEND_API_KEY', '⚡', 'Resend API key for email notifications'],
                  ['TELEGRAM_BOT_TOKEN', '⚡', 'Telegram Bot token from @BotFather'],
                  ['WHATSAPP_PHONE_NUMBER_ID', '⚡', 'Meta Cloud API Phone Number ID'],
                  ['WHATSAPP_ACCESS_TOKEN', '⚡', 'Meta Cloud API permanent access token'],
                  ['VIBER_BOT_TOKEN', '⚡', 'Viber Bot token'],
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
            <code className="font-mono text-xs">NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted</code> removes all SaaS billing UI and enables unlimited clients, staff, and locations.
          </p>
        </section>

        {/* Notification Setup */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
          >
            Setting Up Notifications
          </h2>
          <div className="space-y-3">
            {([
              {
                title: 'Email (Resend)',
                steps: [
                  'Create a free account at resend.com',
                  'Add and verify your domain',
                  'Generate an API key',
                  'Set RESEND_API_KEY in your .env file',
                  'Restart: docker compose restart app',
                ],
              },
              {
                title: 'Telegram',
                steps: [
                  'Open Telegram and message @BotFather',
                  'Send /newbot and follow the prompts',
                  'Copy the token you receive',
                  'Set TELEGRAM_BOT_TOKEN in your .env file',
                  'In Pronto → Settings → Notifications, enter your bot token per business',
                ],
              },
              {
                title: 'WhatsApp (Meta Cloud API)',
                steps: [
                  'Go to developers.facebook.com and create an app',
                  'Add the WhatsApp product to your app',
                  'Copy your Phone Number ID and generate a permanent access token',
                  'Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN in .env',
                  'Note: free-form messages only work within the 24-hour customer service window. Business-initiated messages require pre-approved HSM templates in Meta Business Manager.',
                ],
              },
              {
                title: 'Viber',
                steps: [
                  'Go to partners.viber.com and create a bot',
                  'Copy the bot token',
                  'Set VIBER_BOT_TOKEN in your .env file',
                  'Note: Viber bots created after February 2024 require a commercial plan (~€100/month).',
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

        {/* Updating */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
          >
            Updating to a New Version
          </h2>
          <pre className="bg-gray-900 text-green-400 text-sm rounded-lg px-4 py-3 overflow-x-auto font-mono leading-relaxed"><code>{`git pull origin main\ndocker compose down\ndocker compose up -d --build`}</code></pre>
          <p className="text-sm text-gray-500 mt-3">
            Migrations run automatically on startup — no manual SQL required.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-bricolage, 'Bricolage Grotesque'), sans-serif", letterSpacing: '-0.3px' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="border-t border-gray-100">
            {([
              {
                q: 'What are the minimum server requirements to run Pronto?',
                a: 'Pronto requires Docker 24+, 1 GB RAM minimum (2 GB recommended), and 5 GB of free disk space. It runs on Linux, macOS, or Windows with WSL2. A $6/month VPS is sufficient for most small businesses.',
              },
              {
                q: 'Do I need a Supabase account to self-host Pronto?',
                a: 'Yes. Pronto uses Supabase for the database and authentication. You can use the free Supabase tier, which supports up to 500 MB of database storage and is more than enough for most small business deployments.',
              },
              {
                q: 'How do I enable WhatsApp notifications?',
                a: 'Pronto uses the Meta Cloud API for WhatsApp. You need a Meta Developer account and a verified WhatsApp Business number. Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN in your .env file. Note that business-initiated messages require pre-approved message templates.',
              },
              {
                q: 'Can I run Pronto without a domain name?',
                a: 'Yes. Pronto works on a plain IP address or localhost for local use. For production with SSL, a domain name is recommended. You can use any reverse proxy (Nginx, Caddy) to add HTTPS.',
              },
              {
                q: 'How do I update Pronto to a new version?',
                a: 'Run git pull origin main, then docker compose down && docker compose up -d --build. Database migrations run automatically on startup — no manual SQL steps are needed.',
              },
              {
                q: 'Is there a limit on clients or staff in the self-hosted version?',
                a: 'No. The self-hosted version is completely unlimited — no caps on clients, staff members, locations, or bookings. Set NEXT_PUBLIC_DEPLOYMENT_MODE=selfhosted in your .env to enable this mode.',
              },
              {
                q: 'Where can I get help if something is not working?',
                a: 'Open an issue on the GitHub repository at github.com/SGrappelli/pronto. The community and maintainers respond to issues there. For paid installation assistance, contact us through the GitHub page.',
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
            Need a managed version?
          </h2>
          <p className="text-gray-600 mb-7 max-w-lg mx-auto">
            Don&rsquo;t want to manage a server? Pronto is also available as a hosted service at
            trypronto.app — no installation required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Try the cloud version →
            </Link>
            <a
              href="https://github.com/SGrappelli/pronto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
