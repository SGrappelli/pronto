'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-syne font-bold text-xl text-gray-900">
          Pronto
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/pricing"
            className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Start free
          </Link>
        </div>
      </div>
    </nav>
  )
}
