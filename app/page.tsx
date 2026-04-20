import Link from 'next/link'

export default function RootPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-3">Pronto</h1>
        <p className="text-lg text-gray-600 mb-10">
          Self-hosted business management for service SMBs
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/pricing" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Sign in
          </Link>
        </div>
        <div className="mt-10 flex justify-center gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          <Link href="/refund" className="hover:text-blue-600 transition-colors">Refund Policy</Link>
        </div>
      </div>
    </div>
  )
}
