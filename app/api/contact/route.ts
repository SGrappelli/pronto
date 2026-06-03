import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, message, email, source } = body

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 })
    }

    const token = process.env.CONTACT_BOT_TOKEN
    if (!token) {
      console.error('[contact] CONTACT_BOT_TOKEN is not set')
      return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
    }

    const text =
      `📬 New message from Pronto\n\n` +
      `Name: ${name}\n` +
      `Email: ${email || 'not provided'}\n` +
      `Source: ${source || 'unknown'}\n\n` +
      `Message:\n${message}`

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: 361062024, text }),
      }
    )

    if (!tgRes.ok) {
      const err = await tgRes.text()
      console.error('[contact] Telegram error:', err)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 })
  }
}
