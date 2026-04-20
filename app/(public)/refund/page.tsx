import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy — Pronto',
  description:
    'Pronto Refund Policy. Annual plans: full refund within 14 days. Monthly plans: cancel anytime, no future charges. Simple, transparent, and fair.',
  keywords: [
    'pronto refund policy', 'pos software refund', 'saas refund policy',
    'business software money back', 'trypronto refund', 'cancel subscription pronto',
  ],
  alternates: { canonical: 'https://trypronto.app/refund' },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/refund',
    title: 'Refund Policy — Pronto',
    description: 'Annual plans: 14-day full refund. Monthly plans: cancel anytime. No hidden fees.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'en_US',
    siteName: 'Pronto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refund Policy — Pronto',
    description: 'Annual plans: 14-day full refund. Monthly plans: cancel anytime. No hidden fees.',
    images: ['https://trypronto.app/og-image.png'],
  },
}

const refundJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Refund Policy — Pronto',
  url: 'https://trypronto.app/refund',
  description: 'Refund policy for Pronto subscription plans.',
  publisher: { '@type': 'Organization', name: 'Pronto', url: 'https://trypronto.app' },
  dateModified: '2026-04-17',
}

const refundFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I get a refund for my Pronto subscription?',
      acceptedAnswer: { '@type': 'Answer', text: 'Annual plans are eligible for a full refund within 14 days of purchase. Monthly plans are non-refundable once the billing period begins, but you can cancel anytime to prevent future charges.' },
    },
    {
      '@type': 'Question',
      name: 'How do I cancel my Pronto subscription?',
      acceptedAnswer: { '@type': 'Answer', text: 'Go to Settings → Billing in your Pronto account and cancel anytime. You keep access until the end of the paid period.' },
    },
    {
      '@type': 'Question',
      name: 'How do I request a refund from Pronto?',
      acceptedAnswer: { '@type': 'Answer', text: 'Email support@trypronto.app with subject "Refund Request", include your account email and the charge date. We process refunds within 3 business days through Paddle.' },
    },
  ],
}

export default function RefundPage() {
  return (
    <div className="py-14 px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(refundJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(refundFaqJsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: April 17, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
            <p>
              We want you to be fully satisfied with Pronto. This Refund Policy describes under
              which conditions you can request a refund, and how to do so. All billing is processed
              by <span className="font-medium">Paddle</span>, our Merchant of Record.
            </p>
          </section>

          {/* Summary cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <h3 className="font-semibold text-green-800 mb-2">Annual Plans</h3>
              <p className="text-sm text-green-700">
                Eligible for a full refund within <span className="font-semibold">14 days</span> of
                the initial purchase or renewal date.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-800 mb-2">Monthly Plans</h3>
              <p className="text-sm text-gray-600">
                Charges are final once the billing period begins.{' '}
                <span className="font-semibold">No refunds</span> are issued for the current month.
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Annual Plan Refunds</h2>
            <p>
              If you purchased or renewed an annual subscription and are not satisfied, you may
              request a full refund within <strong>14 calendar days</strong> of the charge date.
              After this window, annual subscriptions are non-refundable.
            </p>
            <p className="mt-3">
              Refunds are credited back to the original payment method. Processing time depends on
              your bank or card issuer, typically 5–10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Monthly Plan Refunds</h2>
            <p>
              Monthly subscriptions are billed at the start of each billing cycle. Once a monthly
              billing period begins, the charge is non-refundable. You may cancel at any time to
              prevent future charges — you will retain access until the end of the paid period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Exceptions</h2>
            <p className="mb-3">We may issue refunds outside of this policy at our sole discretion in cases such as:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Duplicate charges caused by a technical error on our end.</li>
              <li>Charges made after a cancellation that was confirmed by us.</li>
              <li>Situations where applicable consumer protection law requires a refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Free Plan</h2>
            <p>
              The Free plan involves no payment, so no refunds are applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Request a Refund</h2>
            <p className="mb-3">To request a refund:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Email us at{' '}
                <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                  support@trypronto.app
                </a>{' '}
                with the subject line <strong>&ldquo;Refund Request&rdquo;</strong>.
              </li>
              <li>
                Include the email address associated with your account and the approximate date
                of the charge.
              </li>
              <li>
                We will confirm eligibility and initiate the refund through Paddle within
                3 business days.
              </li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              Refund requests submitted after the eligible window will not be approved except
              in exceptional circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Cancellation</h2>
            <p>
              You can cancel your subscription at any time from{' '}
              <span className="font-medium">Settings &rarr; Billing</span> in your Pronto account.
              Cancellation stops future charges but does not trigger a refund for the current
              billing period (unless the annual 14-day window applies).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
            <p>
              If you have questions about our refund policy or need assistance, please reach out:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm space-y-1">
              <p className="font-medium text-gray-900">Pronto Support</p>
              <p>
                Email:{' '}
                <a href="mailto:support@trypronto.app" className="text-blue-600 hover:underline">
                  support@trypronto.app
                </a>
              </p>
              <p>
                See also our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/pricing" className="text-blue-600 hover:underline">Pricing</Link>.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
