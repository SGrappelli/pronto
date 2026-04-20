import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Pronto',
  description:
    'Pronto Privacy Policy. GDPR-compliant. We collect only what\'s needed to run your business — no data selling, no ad tracking. Your client data stays yours.',
  keywords: [
    'pronto privacy policy', 'pos software gdpr', 'crm data privacy',
    'business management software privacy', 'trypronto privacy', 'saas gdpr compliance',
  ],
  alternates: { canonical: 'https://trypronto.app/privacy' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/privacy',
    title: 'Privacy Policy — Pronto',
    description: 'GDPR-compliant. We never sell your data. Your client and business data belongs to you.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Pronto',
    description: 'GDPR-compliant. We never sell your data. Your client and business data belongs to you.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const privacyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — Pronto',
  url: 'https://trypronto.app/privacy',
  description: 'GDPR-compliant privacy policy for Pronto business management software.',
  publisher: { '@type': 'Organization', name: 'Pronto', url: 'https://trypronto.app' },
  dateModified: '2026-04-17',
}

export default function PrivacyPage() {
  return (
    <div className="py-14 px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: April 17, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Pronto (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;) is committed to protecting your personal data. This Privacy Policy
              explains what data we collect when you use{' '}
              <span className="font-medium">trypronto.app</span> (&ldquo;Service&rdquo;), how we
              use it, and your rights regarding that data. This policy is compliant with the
              General Data Protection Regulation (GDPR) and other applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Data We Collect</h2>
            <p className="mb-3">We collect the following categories of personal data:</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Account & Identity Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Email address (used for login and communication)</li>
                  <li>Password (hashed; we never store plaintext passwords)</li>
                  <li>Name and business information you provide during onboarding</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Business Data You Input</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Client names, contact details, and appointment history</li>
                  <li>Sales and transaction records</li>
                  <li>Inventory items and employee information</li>
                  <li>Any other data you voluntarily enter into the Service</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Usage & Technical Data</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>IP address and browser/device type</li>
                  <li>Pages visited and actions taken within the Service</li>
                  <li>Error logs and diagnostic data</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Payment Data</h3>
                <p className="text-sm">
                  We do not store payment card data. All payment processing is handled by{' '}
                  <span className="font-medium">Paddle</span>. We receive only order confirmations
                  and subscription status from Paddle.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Data</h2>
            <p className="mb-3">We use the data we collect to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Create and manage your account and provide the Service.</li>
              <li>Process payments and manage your subscription via Paddle.</li>
              <li>Send transactional emails (account confirmation, password reset, invoices).</li>
              <li>Respond to support requests and improve the Service.</li>
              <li>Detect and prevent fraud, abuse, and security incidents.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal data to third parties. We do not use your data for
              advertising profiling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Legal Basis for Processing (GDPR)</h2>
            <p className="mb-3">
              If you are located in the European Economic Area (EEA), our legal basis for
              collecting and using personal data is:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <span className="font-medium">Contract performance</span> — to provide the Service
                you signed up for.
              </li>
              <li>
                <span className="font-medium">Legitimate interests</span> — to improve the Service,
                prevent fraud, and ensure security.
              </li>
              <li>
                <span className="font-medium">Legal obligation</span> — to comply with applicable
                laws and regulations.
              </li>
              <li>
                <span className="font-medium">Consent</span> — for any optional communications or
                features where we ask for it explicitly.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services to operate the platform:</p>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Service</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Data shared</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium">Supabase</td>
                    <td className="px-4 py-3 text-gray-600">Database, authentication, file storage</td>
                    <td className="px-4 py-3 text-gray-600">All account and business data</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">Paddle</td>
                    <td className="px-4 py-3 text-gray-600">Payment processing & billing</td>
                    <td className="px-4 py-3 text-gray-600">Email, subscription details</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Resend / SMTP</td>
                    <td className="px-4 py-3 text-gray-600">Transactional email delivery</td>
                    <td className="px-4 py-3 text-gray-600">Email address</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">Vercel</td>
                    <td className="px-4 py-3 text-gray-600">Hosting & CDN</td>
                    <td className="px-4 py-3 text-gray-600">IP address, request logs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Each provider operates under their own privacy policy and data processing agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to
              provide the Service. If you delete your account, we will delete or anonymize your
              data within 30 days, except where retention is required by law (e.g., financial
              records).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data
              against unauthorized access, alteration, disclosure, or destruction. These include
              encryption in transit (TLS), encryption at rest, access controls, and regular
              security reviews. However, no method of transmission over the internet is completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><span className="font-medium">Access</span> — request a copy of the personal data we hold about you.</li>
              <li><span className="font-medium">Rectification</span> — request correction of inaccurate data.</li>
              <li><span className="font-medium">Erasure</span> — request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
              <li><span className="font-medium">Restriction</span> — request that we limit how we use your data.</li>
              <li><span className="font-medium">Portability</span> — receive your data in a structured, machine-readable format.</li>
              <li><span className="font-medium">Objection</span> — object to processing based on legitimate interests.</li>
              <li><span className="font-medium">Withdraw consent</span> — where processing is based on consent, withdraw it at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                support@trypronto.app
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. We do not use
              tracking or advertising cookies. You can configure your browser to refuse cookies,
              but this may prevent you from logging in to the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children&rsquo;s Privacy</h2>
            <p>
              The Service is not directed to individuals under 16 years of age. We do not
              knowingly collect personal data from children. If we learn that we have collected
              data from a child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by email or by posting a notice in the Service. We encourage you to review
              this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact</h2>
            <p>
              For privacy-related questions or to exercise your rights, please contact us at:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm space-y-1">
              <p className="font-medium text-gray-900">Pronto</p>
              <p>
                Email:{' '}
                <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                  support@trypronto.app
                </a>
              </p>
              <p>Website: trypronto.app</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
