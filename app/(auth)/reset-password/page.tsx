import type { Metadata } from 'next'
import { updatePassword } from './actions'
import { PasswordInput } from '@/components/ui/password-input'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Set new password</h1>

      {searchParams.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {searchParams.error}
        </div>
      )}

      <form action={updatePassword} className="space-y-4">
        <PasswordInput
          id="password"
          name="password"
          label="New password"
          placeholder="Min. 8 characters"
          required
          autoComplete="new-password"
        />
        <PasswordInput
          id="confirm"
          name="confirm"
          label="Confirm password"
          placeholder="Repeat new password"
          required
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Update password
        </button>
      </form>
    </div>
  )
}
