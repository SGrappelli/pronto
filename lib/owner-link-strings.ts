/**
 * lib/owner-link-strings.ts
 *
 * The two bot replies that belong to the one-time owner link (lib/owner-chat-link.ts), en / es / pt:
 *  - startBare:        a bare /start (or one with a parameter we do not know) — sent to whoever pressed Start,
 *                      most likely a client; it changes nothing;
 *  - ownerLinkExpired: an own_ link that expired, was already used or is not ours.
 * Language = businesses.notification_language (en | es | pt, anything else is English). A self-hosted install has no
 * separate owner language, so both replies use it.
 *
 * {settingsPath} is "Settings → Notifications" in the language of the reply, built from the real section names in
 * messages/<lang>.json (sidebar.settings + settings.tabs.notifications) — never typed by hand.
 */

export type BotLocale = 'en' | 'es' | 'pt'

export function resolveBotLocale(lang: string | null | undefined): BotLocale {
  return lang === 'es' || lang === 'pt' ? lang : 'en'
}

export const botStrings: Record<BotLocale, { startBare: string; ownerLinkExpired: string }> = {
  en: {
    startBare: 'Hi! This bot sends booking notifications from {business}. To get reminders, use the link from your booking confirmation. Business owner? Connect this chat in Pronto: {settingsPath}.',
    ownerLinkExpired: 'This link has expired or was already used. Get a new one in Pronto: {settingsPath}.',
  },
  es: {
    startBare: '¡Hola! Este bot envía notificaciones de citas de {business}. Para recibir recordatorios, usa el enlace de tu confirmación de cita. ¿Eres el dueño? Conecta este chat en Pronto: {settingsPath}.',
    ownerLinkExpired: 'Este enlace caducó o ya se usó. Obtén uno nuevo en Pronto: {settingsPath}.',
  },
  pt: {
    startBare: 'Olá! Este bot envia notificações de agendamentos de {business}. Para receber lembretes, use o link da confirmação do seu agendamento. É o dono do negócio? Conecte este chat no Pronto: {settingsPath}.',
    ownerLinkExpired: 'Este link expirou ou já foi usado. Gere um novo no Pronto: {settingsPath}.',
  },
}

/** Replace {placeholder} tokens; unknown tokens stay as they are. */
export function fillBotText(template: string, params: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => (key in params ? params[key] : `{${key}}`))
}

/** Telegram parse_mode HTML: & < > in a value that is put into a message. */
export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function settingsNotificationsPathFrom(messages: Record<string, unknown>): string {
  const sidebar = (messages.sidebar ?? {}) as Record<string, string>
  const tabs = ((messages.settings ?? {}) as { tabs?: Record<string, string> }).tabs ?? {}
  return `${sidebar.settings} → ${tabs.notifications}`
}

export async function settingsNotificationsPath(locale: BotLocale): Promise<string> {
  const messages =
    locale === 'es' ? (await import('@/messages/es.json')).default
    : locale === 'pt' ? (await import('@/messages/pt.json')).default
    : (await import('@/messages/en.json')).default
  return settingsNotificationsPathFrom(messages as unknown as Record<string, unknown>)
}
