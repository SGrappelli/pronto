import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function uses12HourClock(locale: string): boolean {
  const sample = new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(new Date(2000, 0, 1, 13))
  return /am|pm/i.test(sample)
}

export function formatTime(date: string | Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: uses12HourClock(locale),
  }).format(new Date(date))
}

export function formatInBusinessTimezone(
  date: string | Date,
  timezone: string,
  part: 'date' | 'time' = 'date',
  locale = 'en-US'
): string {
  const opts: Intl.DateTimeFormatOptions = { timeZone: timezone }
  if (part === 'date') {
    opts.year = 'numeric'; opts.month = 'short'; opts.day = 'numeric'
  } else {
    opts.hour = '2-digit'; opts.minute = '2-digit'; opts.hour12 = uses12HourClock(locale)
  }
  return new Intl.DateTimeFormat(locale, opts).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getTenantSlug(hostname: string): string | null {
  // salon-maya.trypronto.app → salon-maya
  // localhost:3000 → null (dev mode)
  const parts = hostname.split('.')
  if (parts.length >= 3 && parts[1] === 'trypronto') {
    return parts[0]
  }
  return null
}
