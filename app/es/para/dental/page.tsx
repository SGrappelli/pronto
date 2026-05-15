import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function EsParaDentalRedirect() {
  redirect('/es/para/clinica-dental')
}
