/**
 * POST /api/viber/set-webhook
 *
 * Регистрирует URL вебхука в Viber для конкретного бота.
 * Вызывается из Settings → Notifications когда пользователь нажимает "Connect".
 *
 * Что такое вебхук: это адрес на нашем сервере, куда Viber будет присылать
 * сообщения от пользователей бота. Без него бот не получает входящие сообщения.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { setViberWebhook, getViberBotInfo } from '@/lib/viber'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? ''

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const { data: biz } = await supabase
      .from('businesses')
      .select('id, viber_bot_token')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: true })
      .limit(1)
      .single()

    if (!biz?.viber_bot_token) {
      return NextResponse.json(
        { error: 'No bot token saved. Save it in Settings first.' },
        { status: 400 }
      )
    }

    if (!APP_URL || APP_URL.includes('localhost')) {
      return NextResponse.json(
        { error: 'Viber webhooks require a public HTTPS URL. Set NEXT_PUBLIC_APP_URL to your deployed domain.' },
        { status: 400 }
      )
    }

    // Проверяем токен — получаем info о боте
    const botInfo = await getViberBotInfo(biz.viber_bot_token)
    if (!botInfo.ok) {
      return NextResponse.json(
        { error: 'Invalid bot token. Check it at partners.viber.com.' },
        { status: 400 }
      )
    }

    // Регистрируем вебхук: Viber будет присылать события на этот URL
    const webhookUrl = `${APP_URL}/api/viber/webhook?bid=${biz.id}`
    const result = await setViberWebhook(biz.viber_bot_token, webhookUrl)

    if (!result.ok) {
      return NextResponse.json(
        { error: result.description ?? 'Failed to set webhook' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      ok: true,
      botName: botInfo.name,
      webhookUrl,
    })
  } catch (err) {
    console.error('[viber/set-webhook]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
