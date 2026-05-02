export function getWhopCheckoutUrl(
  plan: 'free' | 'starter' | 'pro' | 'agency',
  businessId: string,
): string {
  const base = {
    free: process.env.NEXT_PUBLIC_WHOP_FREE_URL,
    starter: process.env.NEXT_PUBLIC_WHOP_STARTER_URL,
    pro: process.env.NEXT_PUBLIC_WHOP_PRO_URL,
    agency: process.env.NEXT_PUBLIC_WHOP_AGENCY_URL,
  }[plan] ?? ''

  return businessId ? `${base}?metadata[business_id]=${businessId}` : base
}
