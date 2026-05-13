/**
 * lib/lemonsqueezy.ts
 * LemonSqueezy API — создание checkout-ссылок, управление подписками.
 * Docs: https://docs.lemonsqueezy.com/api
 */

const LS_API_URL = 'https://api.lemonsqueezy.com/v1'
const API_KEY    = process.env.LEMONSQUEEZY_API_KEY ?? ''
const STORE_ID   = process.env.LEMONSQUEEZY_STORE_ID ?? ''

// ─── План → вариант продукта (variant ID в LemonSqueezy) ─────────────────────
// Заполни после создания продуктов в LS Dashboard:
// Dashboard → Store → Products → создай 3 продукта (Starter/Pro/Agency)
// → скопируй Variant ID каждого

export const PLAN_VARIANT_IDS: Record<string, string> = {
  starter: process.env.LS_VARIANT_STARTER ?? '',
  pro:     process.env.LS_VARIANT_PRO     ?? '',
  agency:  process.env.LS_VARIANT_AGENCY  ?? '',
}

// ─── Лимиты планов ────────────────────────────────────────────────────────────

export type NotificationChannel = 'email' | 'telegram' | 'whatsapp' | 'viber'

export const PLAN_LIMITS: Record<string, {
  employees: number
  clients: number
  bookings: number           // per month; Infinity = unlimited
  notifications: NotificationChannel[]
  label: string
}> = {
  free: {
    employees:  1,
    clients:    100,
    bookings:   50,
    notifications: ['email', 'telegram', 'whatsapp', 'viber'],
    label:      'Free',
  },
  starter: {
    employees:  3,
    clients:    Infinity,
    bookings:   Infinity,
    notifications: ['email', 'telegram', 'whatsapp', 'viber'],
    label:      'Starter',
  },
  pro: {
    employees:  15,
    clients:    Infinity,
    bookings:   Infinity,
    notifications: ['email', 'telegram', 'whatsapp', 'viber'],
    label:      'Pro',
  },
  agency: {
    employees:  Infinity,
    clients:    Infinity,
    bookings:   Infinity,
    notifications: ['email', 'telegram', 'whatsapp', 'viber'],
    label:      'Agency',
  },
}

// ─── HTTP helper ──────────────────────────────────────────────────────────────

async function lsRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${LS_API_URL}${path}`, {
    ...options,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${API_KEY}`,
      ...(options.headers ?? {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`LemonSqueezy ${res.status}: ${text}`)
  }
  return res.json() as T
}

// ─── Создать checkout URL ─────────────────────────────────────────────────────

export async function createCheckoutUrl(opts: {
  plan: 'starter' | 'pro' | 'agency'
  email: string
  businessId: string        // передаём как custom_data → нужен для webhook
  name?: string
  redirectUrl?: string
}): Promise<string> {
  const variantId = PLAN_VARIANT_IDS[opts.plan]
  if (!variantId) throw new Error(`No variant ID configured for plan: ${opts.plan}`)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_options: { embed: false },
        checkout_data: {
          email: opts.email,
          name: opts.name,
          custom: { business_id: opts.businessId },
        },
        product_options: {
          redirect_url: opts.redirectUrl ?? `${appUrl}/settings?tab=billing&success=1`,
        },
        expires_at: null,
      },
      relationships: {
        store: { data: { type: 'stores', id: STORE_ID } },
        variant: { data: { type: 'variants', id: variantId } },
      },
    },
  }

  const res = await lsRequest<{ data: { attributes: { url: string } } }>('/checkouts', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return res.data.attributes.url
}

// ─── Получить подписку ─────────────────────────────────────────────────────────

export async function getSubscription(subscriptionId: string) {
  return lsRequest<{ data: { attributes: Record<string, unknown> } }>(`/subscriptions/${subscriptionId}`)
}

// ─── Ссылка на Customer Portal (управление подпиской) ────────────────────────

export async function createCustomerPortalUrl(customerId: string): Promise<string> {
  const res = await lsRequest<{ data: { attributes: { url: string } } }>('/customer-portal-sessions', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'customer-portal-sessions',
        relationships: { customer: { data: { type: 'customers', id: customerId } } },
      },
    }),
  })
  return res.data.attributes.url
}

// ─── Маппинг variant_id → plan name ──────────────────────────────────────────

export function variantIdToPlan(variantId: string): string {
  for (const [plan, vid] of Object.entries(PLAN_VARIANT_IDS)) {
    if (vid === variantId) return plan
  }
  return 'free'
}
