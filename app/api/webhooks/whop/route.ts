import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { sendMail, getFromAddress } from '@/lib/mailer'
import { tierFromPlanName } from '@/lib/whop'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.WHOP_WEBHOOK_SECRET
  if (!secret || !signature) return false
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
  if (expected.length !== signature.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
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

  // Whop v5 uses "action", older versions used "event"
  const event = (payload.action ?? payload.event) as string
  const data = (payload.data ?? {}) as Record<string, unknown>

  // Membership data lives directly in `data` (not nested under data.membership)
  const membership = (data.membership ?? data) as Record<string, unknown>
  const membershipId = membership.id as string | undefined
  const metadata = (membership.metadata ?? {}) as Record<string, unknown>
  const businessId = metadata.business_id as string | undefined

  // Whop v5: plan name is at membership.product.name (not membership.plan.name)
  const product = (membership.product ?? membership.plan ?? {}) as Record<string, unknown>
  const planName = (product.name as string) ?? ''

  // User email for fallback lookup
  const membershipUser = (membership.user ?? {}) as Record<string, unknown>
  const userEmail = membershipUser.email as string | undefined

  console.log('[whop webhook] event:', event, 'businessId:', businessId, 'membershipId:', membershipId, 'plan:', planName)

  try {
    // membership.went_valid = new purchase or reactivation (Whop v5)
    // membership.activated / membership_activated = legacy names kept for compatibility
    const isActivation = (
      event === 'membership.went_valid' ||
      event === 'membership.activated' ||
      event === 'membership_activated'
    )

    if (isActivation) {
      const tier = tierFromPlanName(planName)

      if (businessId) {
        // Primary path: metadata.business_id from checkout URL
        const { error } = await supabase
          .from('businesses')
          .update({ subscription_tier: tier, whop_membership_id: membershipId })
          .eq('id', businessId)
        if (error) console.error('[whop webhook] DB update error (businessId):', error)
        else console.log('[whop webhook] upgraded', businessId, '->', tier)
      } else if (membershipId) {
        // Secondary path: match by existing whop_membership_id
        const { error } = await supabase
          .from('businesses')
          .update({ subscription_tier: tier })
          .eq('whop_membership_id', membershipId)
        if (error) console.error('[whop webhook] DB update error (membershipId):', error)
      } else if (userEmail) {
        // Fallback: match business by owner email
        const { data: owner } = await supabase.auth.admin.listUsers()
        const matchedUser = owner?.users?.find((u) => u.email === userEmail)
        if (matchedUser) {
          const { error } = await supabase
            .from('businesses')
            .update({ subscription_tier: tier, whop_membership_id: membershipId })
            .eq('owner_id', matchedUser.id)
          if (error) console.error('[whop webhook] DB update error (email fallback):', error)
          else console.log('[whop webhook] upgraded by email', userEmail, '->', tier)
        }
      }
    }

    // membership.went_invalid = cancellation or expiry (Whop v5)
    const isDeactivation = (
      event === 'membership.went_invalid' ||
      event === 'membership.deactivated' ||
      event === 'membership_deactivated'
    )

    if (isDeactivation) {
      if (membershipId) {
        await supabase
          .from('businesses')
          .update({ subscription_tier: 'free' })
          .eq('whop_membership_id', membershipId)
      } else if (businessId) {
        await supabase
          .from('businesses')
          .update({ subscription_tier: 'free' })
          .eq('id', businessId)
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
