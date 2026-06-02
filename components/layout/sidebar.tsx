'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Users, Package, CalendarDays, BarChart2, Settings, LogOut, Menu, X, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface SidebarProps {
  businessName: string
  subscriptionTier?: string
}

export function Sidebar({ businessName, subscriptionTier }: SidebarProps) {
  const t = useTranslations('sidebar')
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  const isProPlus = subscriptionTier === 'pro' || subscriptionTier === 'agency'

  const nav = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/pos', label: t('pos'), icon: ShoppingCart },
    { href: '/crm', label: t('clients'), icon: Users },
    { href: '/inventory', label: t('inventory'), icon: Package },
    { href: '/booking', label: t('booking'), icon: CalendarDays },
    { href: '/analytics', label: 'Analytics', icon: BarChart2, proOnly: true },
  ]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navLinks = (
    <>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon, proOnly }) => {
          const locked = proOnly && !isProPlus
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'text-[#4ade80]'
                : 'text-white/[0.55] hover:text-white/80'
            )}
            style={
              pathname === href || pathname.startsWith(href + '/')
                ? { backgroundColor: 'rgba(22,163,74,0.15)' }
                : undefined
            }
            onMouseEnter={(e) => {
              if (!(pathname === href || pathname.startsWith(href + '/')))
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              if (!(pathname === href || pathname.startsWith(href + '/')))
                (e.currentTarget as HTMLElement).style.backgroundColor = ''
            }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {locked && (
                <span className="flex items-center gap-1 text-[10px] font-semibold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
                  <Lock className="w-2.5 h-2.5" />Pro
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-0.5">
        <Link href="/settings" onClick={() => setOpen(false)} className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
          pathname.startsWith('/settings')
            ? 'text-[#4ade80]'
            : 'text-white/[0.55] hover:text-white/80'
        )}
        style={
          pathname.startsWith('/settings')
            ? { backgroundColor: 'rgba(22,163,74,0.15)' }
            : undefined
        }
        onMouseEnter={(e) => {
          if (!pathname.startsWith('/settings'))
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)'
        }}
        onMouseLeave={(e) => {
          if (!pathname.startsWith('/settings'))
            (e.currentTarget as HTMLElement).style.backgroundColor = ''
        }}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {t('settings')}
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/[0.55] hover:text-white/80 transition-colors"
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '' }}
        >
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
      <aside className="hidden md:flex w-60 shrink-0 flex-col h-screen sticky top-0 border-r border-white/10" style={{ backgroundColor: '#0d1b2e' }}>
        <div className="px-5 py-5 border-b border-white/10">
          <div className="font-bold text-lg" style={{ color: '#fff' }}>Pronto<span style={{ color: '#16a34a' }}>.</span></div>
          <div className="text-xs text-white/40 truncate mt-0.5">{businessName}</div>
        </div>
        {navLinks}
      </aside>

      {/* Mobile drawer */}
      <aside className={cn(
        'md:hidden fixed inset-y-0 left-0 z-50 w-72 flex flex-col border-r border-white/10',
        'transition-transform duration-200 ease-in-out',
        open ? 'translate-x-0' : '-translate-x-full'
      )} style={{ backgroundColor: '#0d1b2e' }}>
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="font-bold text-lg" style={{ color: '#fff' }}>Pronto<span style={{ color: '#16a34a' }}>.</span></div>
            <div className="text-xs text-white/40 truncate mt-0.5">{businessName}</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '' }}
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
