import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { sendMail, getFromAddress } from '@/lib/mailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.WHOP_WEBHOOK_SECRET
  if (!secret) return false
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

function tierFromPlanName(name: string): 'free' | 'starter' | 'pro' | 'agency' {
  const n = name.toLowerCase()
  if (n.includes('agency')) return 'agency'
  if (n.includes('pro')) return 'pro'
  if (n.includes('starter')) return 'starter'
  return 'free'
}

export async function POST(req: NextRequest) {
  let body: string
  let payload: Record<string, unknown>

  try {
    body = await req.text()
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 })
  }

  const signature = req.headers.get('whop-signature') ?? ''
  if (!verifySignature(body, signature)) {
    console.error('[whop webhook] invalid signature')
    return NextResponse.json({ ok: false }, { status: 200 })
  }

  const event = payload.event as string
  const data = (payload.data ?? {}) as Record<string, unknown>
  const membership = (data.membership ?? data) as Record<string, unknown>
  const membershipId = membership.id as string | undefined
  const metadata = (membership.metadata ?? {}) as Record<string, unknown>
  const businessId = metadata.business_id as string | undefined
  const planName = ((membership.plan ?? {}) as Record<string, unknown>).name as string ?? ''

  try {
    if (event === 'membership.activated' || event === 'membership_activated') {
      const tier = tierFromPlanName(planName)

      if (businessId) {
        await supabase
          .from('businesses')
          .update({ subscription_tier: tier, whop_membership_id: membershipId })
          .eq('id', businessId)
      } else if (membershipId) {
        await supabase
          .from('businesses')
          .update({ subscription_tier: tier })
          .eq('whop_membership_id', membershipId)
      }
    }

    if (event === 'membership.deactivated' || event === 'membership_deactivated') {
      if (membershipId) {
        await supabase
          .from('businesses')
          .update({ subscription_tier: 'free' })
          .eq('whop_membership_id', membershipId)
      }
    }

    if (event === 'payment.succeeded' || event === 'payment_succeeded') {
      console.log('[whop webhook] payment succeeded', membershipId)
    }

    if (event === 'payment.failed' || event === 'payment_failed') {
      if (membershipId) {
        const { data: biz } = await supabase
          .from('businesses')
          .select('email, name')
          .eq('whop_membership_id', membershipId)
          .maybeSingle()

        if (biz?.email) {
          await sendMail({
            to: biz.email,
            from: getFromAddress(),
            subject: 'Pronto subscription payment failed',
            html: `<p>Hi,</p><p>Your Pronto subscription payment failed. Please update your payment method at <a href="https://whop.com/pronto-fdee/">whop.com/pronto-fdee</a>.</p><p>— The Pronto team</p>`,
          })
        }
      }
    }
  } catch (err) {
    console.error('[whop webhook] error processing event', event, err)
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
