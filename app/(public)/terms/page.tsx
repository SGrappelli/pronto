import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Pronto',
  description:
    'Pronto Terms of Service. Understand your rights, payment terms via Paddle, data ownership, and acceptable use policies for our POS, CRM, and appointment booking platform.',
  keywords: [
    'pronto terms of service', 'pos software terms', 'saas terms of service',
    'business management software terms', 'pronto legal', 'trypronto terms',
  ],
  alternates: { canonical: 'https://trypronto.app/terms' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/terms',
    title: 'Terms of Service — Pronto',
    description: 'Pronto Terms of Service — payment terms, data ownership, acceptable use, and your rights as a subscriber.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — Pronto',
    description: 'Pronto Terms of Service — payment terms, data ownership, acceptable use, and your rights as a subscriber.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const termsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service — Pronto',
  url: 'https://trypronto.app/terms',
  description: 'Terms of Service for Pronto business management software.',
  publisher: { '@type': 'Organization', name: 'Pronto', url: 'https://trypronto.app' },
  dateModified: '2026-04-17',
}

export default function TermsPage() {
  return (
    <div className="py-14 px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: April 17, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Pronto (&ldquo;Service&rdquo;), operated by Pronto
              (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;),
              you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not
              agree, you may not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              Pronto is a cloud-based business management platform for service-oriented small and
              medium businesses. The Service includes point-of-sale (POS), customer relationship
              management (CRM), inventory management, appointment booking, and omnichannel
              notification features accessible at{' '}
              <span className="font-medium">trypronto.app</span> and related subdomains.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Registration</h2>
            <p>
              To use the Service you must create an account and provide accurate, complete
              information. You are responsible for maintaining the confidentiality of your
              credentials and for all activity that occurs under your account. You must notify us
              immediately at{' '}
              <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                support@trypronto.app
              </a>{' '}
              if you suspect unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Responsibilities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1.5">
              <li>Use the Service for any unlawful purpose or in violation of applicable regulations.</li>
              <li>Upload or transmit malicious code, spam, or harmful content.</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure.</li>
              <li>Resell, sublicense, or redistribute the Service without written permission.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
              <li>Collect or harvest user data from the Service without authorization.</li>
            </ul>
            <p className="mt-3">
              You are solely responsible for the data you input into the Service, including client
              information, transaction records, and business data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Payment Terms</h2>
            <p>
              Paid subscriptions are billed through{' '}
              <span className="font-medium">Paddle</span>, our authorized payment processor and
              Merchant of Record. By subscribing to a paid plan, you agree to Paddle&rsquo;s terms
              of service and privacy policy in addition to these Terms.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li>
                <span className="font-medium">Monthly billing:</span> Charged on the same date each
                month. Cancellation stops future charges; no partial refunds are issued for the
                current billing period.
              </li>
              <li>
                <span className="font-medium">Annual billing:</span> Charged once per year at a
                discounted rate. A 14-day refund window applies — see our{' '}
                <a href="/refund" className="text-blue-600 hover:underline">Refund Policy</a>.
              </li>
              <li>
                All prices are in US Dollars (USD) unless otherwise stated. Taxes may be applied by
                Paddle based on your jurisdiction.
              </li>
              <li>
                We reserve the right to change pricing with 30 days&rsquo; notice. Continued use
                after the notice period constitutes acceptance of the new pricing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Free Plan & Trial</h2>
            <p>
              The Free plan is provided as-is without any service level guarantees. We reserve the
              right to modify Free plan limits or discontinue it with 30 days&rsquo; notice.
              Paid plan trials, if offered, are subject to the terms stated at the time of signup.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p>
              The Service, including all software, designs, logos, and content created by us,
              remains our sole property. You retain full ownership of the data you input into
              the Service. We do not claim any intellectual property rights over your data.
            </p>
            <p className="mt-3">
              You grant us a limited, non-exclusive license to process your data solely for the
              purpose of providing the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Data & Privacy</h2>
            <p>
              Your use of the Service is subject to our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>,
              which is incorporated into these Terms by reference. We take reasonable technical and
              organizational measures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Termination</h2>
            <p>
              You may cancel your account at any time from the Settings page. We may suspend or
              terminate your account immediately if you violate these Terms, engage in fraudulent
              activity, or fail to pay applicable fees. Upon termination, your right to use the
              Service ceases. We will retain your data for 30 days after termination, after which
              it may be permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, the Company and its officers,
              employees, agents, and partners shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages — including loss of profits, data, or
              business opportunities — arising from your use of or inability to use the Service,
              even if we have been advised of the possibility of such damages.
            </p>
            <p className="mt-3">
              Our total cumulative liability to you for any claims arising under these Terms shall
              not exceed the greater of (a) the total fees you paid to us in the 12 months
              preceding the claim, or (b) $100 USD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, either express or implied, including but not limited to
              implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the Service will be uninterrupted, error-free,
              or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Governing Law & Disputes</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the
              State of Georgia, United States, without regard to its conflict of law provisions.
              Any disputes arising under these Terms shall be resolved exclusively in the state or
              federal courts located in Georgia, and you consent to personal jurisdiction in those
              courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes
              by email or by posting a notice within the Service. Continued use of the Service
              after changes take effect constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                support@trypronto.app
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
