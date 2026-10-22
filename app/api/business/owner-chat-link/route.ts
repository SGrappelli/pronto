/**
 * POST /api/business/owner-chat-link   { channel: 'telegram' | 'viber' }
 *
 * Issues the one-time deep link Settings → Notifications opens to bind the OWNER's Telegram / Viber chat
 * (lib/owner-chat-link.ts): `https://t.me/<bot>?start=own_…` or `viber://pa?chatURI=<bot>&context=own_…`.
 * Owner only. The token is valid for 15 minutes and works once; asking again issues a new one.
 * Errors are stable machine codes — the page shows its own text.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getTelegramBotInfo } from '@/lib/telegram'
import { getViberBotInfo } from '@/lib/viber'
import { createOwnerLinkToken, OWNER_LINK_TTL_SECONDS, type OwnerChatChannel } from '@/lib/owner-chat-link'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    let channel: unknown
    try {
      channel = ((await req.json()) as { channel?: unknown } | null)?.channel
    } catch {
      return NextResponse.json({ error: 'invalid_channel', code: 'invalid_channel' }, { status: 400 })
    }
    if (channel !== 'telegram' && channel !== 'viber') {
      return NextResponse.json({ error: 'invalid_channel', code: 'invalid_channel' }, { status: 400 })
    }
    const ch: OwnerChatChannel = channel

    const { data: biz } = await supabase
      .from('businesses')
      .select('id, telegram_bot_token, telegram_chat_id, viber_bot_token, viber_chat_id')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()
    if (!biz) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

    const botToken = ch === 'telegram' ? biz.telegram_bot_token : biz.viber_bot_token
    if (!botToken) return NextResponse.json({ error: 'No bot token saved yet.', code: 'no_token' }, { status: 400 })

    const currentChatId = (ch === 'telegram' ? biz.telegram_chat_id : biz.viber_chat_id) || null

    let issued: { token: string; expiresAt: number }
    try {
      issued = createOwnerLinkToken({ channel: ch, businessId: biz.id, currentChatId })
    } catch (err) {
      console.error('[owner-chat-link]', err)
      return NextResponse.json({ error: 'server_misconfigured', code: 'server_misconfigured' }, { status: 500 })
    }

    if (ch === 'telegram') {
      const info = await getTelegramBotInfo(botToken)
      const username = info.ok ? info.result?.username : undefined
      if (!username) return NextResponse.json({ error: 'Invalid bot token.', code: 'invalid_token' }, { status: 400 })
      return NextResponse.json({ ok: true, url: `https://t.me/${username}?start=${issued.token}`, expiresAt: issued.expiresAt, expiresIn: OWNER_LINK_TTL_SECONDS, botName: `@${username}` })
    }

    const info = await getViberBotInfo(botToken)
    if (!info.ok || !info.uri) return NextResponse.json({ error: 'Invalid bot token.', code: 'invalid_token' }, { status: 400 })
    return NextResponse.json({ ok: true, url: `viber://pa?chatURI=${info.uri}&context=${issued.token}`, expiresAt: issued.expiresAt, expiresIn: OWNER_LINK_TTL_SECONDS, botName: info.name ?? '' })
  } catch (err) {
    console.error('[owner-chat-link]', err)
    return NextResponse.json({ error: 'internal', code: 'internal' }, { status: 500 })
  }
}
