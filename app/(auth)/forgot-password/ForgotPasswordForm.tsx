'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { requestPasswordReset } from './actions'

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await requestPasswordReset(formData)
      setSent(true)
    })
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Check your email</h1>
        <p className="text-sm text-gray-600 mb-6">
          We sent a password reset link to <strong>{email}</strong>.
          Click it to set a new password.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          No email? Check your spam folder or{' '}
          <button
            onClick={() => setSent(false)}
            className="text-blue-600 hover:underline"
          >
            try again
          </button>
          .
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

      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            'Send reset link'
          )}
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
