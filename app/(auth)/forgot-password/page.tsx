import type { Metadata } from 'next'
import { requestPasswordReset } from './actions'
import Link from 'next/link'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { sent?: string; email?: string }
}) {
  if (searchParams.sent) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Check your email</h1>
        <p className="text-sm text-gray-600 mb-6">
          We sent a password reset link to <strong>{searchParams.email}</strong>.
          Click it to set a new password.
        </p>
        <Link href="/login" className="text-sm text-blue-600 hover:underline">
          ← Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Reset your password</h1>
      <p className="text-sm text-gray-500 mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form action={requestPasswordReset} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Send reset link
        </button>
      </form>

      <div className="mt-6">
        <Link href="/login" className="text-sm text-blue-600 hover:underline">
          ← Back to sign in
        </Link>
      </div>
    </div>
  )
}
