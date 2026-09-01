import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminAuthClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { db, forBusiness } from '@/lib/db'
import { sendLowStockAlert } from '@/lib/email'
import { sendTelegramMessage, tplLowStock } from '@/lib/telegram'
import { sendViberMessage, tplLowStock as viberTplLowStock } from '@/lib/viber'
import { sendWhatsAppMessage, tplLowStock as waTplLowStock } from '@/lib/whatsapp'

export async function POST(req: NextRequest) {
  // Verify the caller is an authenticated user who owns the business for this item.
  const sessionClient = await createServerClient()
  const { data: { user } } = await sessionClient.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const { itemId } = await req.json()
    if (!itemId) return NextResponse.json({ error: 'missing itemId' }, { status: 400 })

    // Resolve the business from the item itself — nothing else tells us
    // which tenant this row belongs to.
    const item = await db.inventory_items.findUnique({
      where: { id: itemId },
      select: { id: true, name: true, quantity: true, unit: true, low_stock_threshold: true, business_id: true },
    })

    if (!item) return NextResponse.json({ error: 'not found' }, { status: 404 })

    // Confirm the authenticated user owns this business
    const ownership = await db.businesses.findFirst({
      select: { id: true },
      where: { id: item.business_id, owner_id: user.id },
    })

    if (!ownership) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 })
    }

    const tdb = forBusiness(item.business_id)

    // quantity / low_stock_threshold are numeric(10,3) columns — Prisma hands
    // back Decimal, which must be converted before arithmetic or template use.
    const quantity = item.quantity.toNumber()
    const threshold = item.low_stock_threshold.toNumber()

    if (quantity > threshold) return NextResponse.json({ skipped: 'stock ok' })

    // Dedup — SELECT first so a failed send remains retryable (INSERT happens after)
    const alreadySent = await tdb.notification_log.findFirst({
      select: { id: true },
      where: { ref_id: `low_stock_${item.id}_${quantity}`, type: 'low_stock', channel: 'email' },
    })

    if (alreadySent) return NextResponse.json({ skipped: 'already alerted at this level' })

    // FIX: include owner_id so we can fall back to auth email when businesses.email is null
    const biz = await db.businesses.findUnique({
      select: { owner_id: true, name: true, email: true, telegram_bot_token: true, telegram_chat_id: true, viber_bot_token: true, viber_chat_id: true, owner_whatsapp: true },
      where: { id: item.business_id },
    })

    // ── Telegram → владельцу ─────────────────────────────────────────────────
    if (biz?.telegram_bot_token && biz?.telegram_chat_id) {
      await sendTelegramMessage(
        biz.telegram_bot_token,
        biz.telegram_chat_id,
        tplLowStock({
          itemName: item.name,
          quantity,
          unit: item.unit,
          threshold,
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
          quantity,
          unit: item.unit,
          threshold,
        })
      )
    }

    // ── WhatsApp → владельцу ─────────────────────────────────────────────────
    if (biz?.owner_whatsapp) {
      await sendWhatsAppMessage(
        biz.owner_whatsapp,
        waTplLowStock({
          itemName: item.name,
          quantity,
          unit: item.unit,
          threshold,
        })
      )
    }

    // ── Email → владельцу ────────────────────────────────────────────────────
    // businesses.email may be NULL — fall back to the owner's Supabase auth email.
    let recipientEmail: string | null = biz?.email ?? null
    if (!recipientEmail && biz?.owner_id) {
      // auth.admin requires the service-role key — the session client (anon +
      // user cookies) can't call it, so a dedicated admin client is used here.
      const adminAuthClient = createAdminAuthClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      const { data: authData } = await adminAuthClient.auth.admin.getUserById(biz.owner_id)
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
        quantity,
        unit: item.unit,
        threshold,
      }],
    })

    // Record AFTER successful send so a failed send remains retryable
    await tdb.notification_log.create({
      data: { business_id: item.business_id, ref_id: `low_stock_${item.id}_${quantity}`, type: 'low_stock', channel: 'email' },
    })

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('[email/low-stock]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
