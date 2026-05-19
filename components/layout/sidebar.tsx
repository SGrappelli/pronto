'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Users, Package, CalendarDays, Settings, LogOut, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface SidebarProps {
  businessName: string
}

export function Sidebar({ businessName }: SidebarProps) {
  const t = useTranslations('sidebar')
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  const nav = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/pos', label: t('pos'), icon: ShoppingCart },
    { href: '/crm', label: t('clients'), icon: Users },
    { href: '/inventory', label: t('inventory'), icon: Package },
    { href: '/booking', label: t('booking'), icon: CalendarDays },
  ]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navLinks = (
    <>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname === href || pathname.startsWith(href + '/')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          )}>
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100 space-y-0.5">
        <Link href="/settings" onClick={() => setOpen(false)} className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
          pathname.startsWith('/settings')
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}>
          <Settings className="w-4 h-4 shrink-0" />
          {t('settings')}
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <LogOut className="w-4 h-4 shrink-0" />
          {t('signOut')}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3">
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="font-bold text-base" style={{ color: '#111' }}>
          Pronto<span style={{ color: '#16a34a' }}>.</span>
        </div>
        <div className="text-sm text-gray-500 truncate flex-1">{businessName}</div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 bg-white border-r border-gray-200 flex-col h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="font-bold text-lg" style={{ color: '#111' }}>Pronto<span style={{ color: '#16a34a' }}>.</span></div>
          <div className="text-xs text-gray-500 truncate mt-0.5">{businessName}</div>
        </div>
        {navLinks}
      </aside>

      {/* Mobile drawer */}
      <aside className={cn(
        'md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col',
        'transition-transform duration-200 ease-in-out',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="font-bold text-lg" style={{ color: '#111' }}>Pronto<span style={{ color: '#16a34a' }}>.</span></div>
            <div className="text-xs text-gray-500 truncate mt-0.5">{businessName}</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {navLinks}
      </aside>
    </>
  )
}
