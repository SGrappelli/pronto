import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { sendLowStockAlert } from '@/lib/email'
import { sendTelegramMessage, tplLowStock } from '@/lib/telegram'
import { sendViberMessage, tplLowStock as viberTplLowStock } from '@/lib/viber'
import { sendWhatsAppMessage, tplLowStock as waTplLowStock } from '@/lib/whatsapp'

export async function POST(req: NextRequest) {
  // Verify the caller is an authenticated user who owns the business for this item.
  const sessionClient = createServerClient()
  const { data: { user } } = await sessionClient.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const { itemId } = await req.json()
    if (!itemId) return NextResponse.json({ error: 'missing itemId' }, { status: 400 })

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data: item } = await supabase
      .from('inventory_items')
      .select('id, name, quantity, unit, low_stock_threshold, business_id')
      .eq('id', itemId)
      .single()

    if (!item) return NextResponse.json({ error: 'not found' }, { status: 404 })

    // Confirm the authenticated user owns this business
    const { data: ownership } = await supabase
      .from('businesses')
      .select('id')
      .eq('id', item.business_id)
      .eq('owner_id', user.id)
      .maybeSingle()

    if (!ownership) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 })
    }

    if (item.quantity > item.low_stock_threshold) return NextResponse.json({ skipped: 'stock ok' })

    // Dedup — SELECT first so a failed send remains retryable (INSERT happens after)
    const { data: alreadySent } = await supabase
      .from('notification_log')
      .select('id')
      .eq('business_id', item.business_id)
      .eq('ref_id', `low_stock_${item.id}_${item.quantity}`)
      .eq('type', 'low_stock')
      .eq('channel', 'email')
      .maybeSingle()

    if (alreadySent) return NextResponse.json({ skipped: 'already alerted at this level' })

    // FIX: include owner_id so we can fall back to auth email when businesses.email is null
    const { data: biz } = await supabase
      .from('businesses')
      .select('owner_id, name, email, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id, owner_whatsapp')
      .eq('id', item.business_id)
      .single()

    // ── Telegram → владельцу ─────────────────────────────────────────────────
    if (biz?.telegram_bot_token && biz?.telegram_chat_id) {
      await sendTelegramMessage(
        biz.telegram_bot_token,
        biz.telegram_chat_id,
        tplLowStock({
          itemName: item.name,
          quantity: item.quantity,
          unit: item.unit,
          threshold: item.low_stock_threshold,
        })
      )
    }

    // ── Viber → владельцу ────────────────────────────────────────────────────
    if (biz?.viber_bot_token && biz?.viber_chat_id) {
      await sendViberMessage(
        biz.viber_bot_token,
        biz.viber_chat_id,
        viberTplLowStock({
          itemName: item.name,
          quantity: item.quantity,
          unit: item.unit,
          threshold: item.low_stock_threshold,
        })
      )
    }

    // ── WhatsApp → владельцу ─────────────────────────────────────────────────
    if (biz?.owner_whatsapp) {
      await sendWhatsAppMessage(
        biz.owner_whatsapp,
        waTplLowStock({
          itemName: item.name,
          quantity: item.quantity,
          unit: item.unit,
          threshold: item.low_stock_threshold,
        })
      )
    }

    // ── Email → владельцу ────────────────────────────────────────────────────
    // businesses.email may be NULL — fall back to the owner's Supabase auth email.
    let recipientEmail: string | null = biz?.email ?? null
    if (!recipientEmail && biz?.owner_id) {
      const { data: authData } = await supabase.auth.admin.getUserById(biz.owner_id)
      recipientEmail = authData?.user?.email ?? null
    }

    if (!recipientEmail) {
      return NextResponse.json({ tg: true, email: 'skipped: no email found for owner' })
    }

    await sendLowStockAlert({
      to: recipientEmail,
      businessName: biz!.name,
      items: [{
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        threshold: item.low_stock_threshold,
      }],
    })

    // Record AFTER successful send so a failed send remains retryable
    await supabase.from('notification_log').insert({
      business_id: item.business_id,
      ref_id: `low_stock_${item.id}_${item.quantity}`,
      type: 'low_stock',
      channel: 'email',
    })

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('[email/low-stock]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
