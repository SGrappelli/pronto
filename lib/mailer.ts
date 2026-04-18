/**
 * lib/mailer.ts
 *
 * Единый транспортный слой для отправки email.
 * Приоритет выбора провайдера:
 *   1. SMTP  — если задан SMTP_HOST
 *   2. Resend — если задан RESEND_API_KEY
 *   3. Console-log — fallback для локальной разработки (письмо не отправляется)
 */

import nodemailer from 'nodemailer'
import { Resend } from 'resend'

export interface MailMessage {
  from: string        // "Name <email@domain.com>"
  to: string          // адрес получателя
  subject: string
  html: string
}

// ─── SMTP transport ───────────────────────────────────────────────────────────

function createSmtpTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465, // TLS на 465, STARTTLS на остальных
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })
}

// ─── Главная функция отправки ─────────────────────────────────────────────────

export async function sendMail(msg: MailMessage): Promise<{ id?: string; error?: string }> {
  // — SMTP —
  if (process.env.SMTP_HOST) {
    try {
      const transport = createSmtpTransport()
      const info = await transport.sendMail({
        from: msg.from,
        to: msg.to,
        subject: msg.subject,
        html: msg.html,
      })
      return { id: info.messageId }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[mailer/smtp] Error:', message)
      return { error: message }
    }
  }

  // — Resend —
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { data, error } = await resend.emails.send({
        from: msg.from,
        to: msg.to,
        subject: msg.subject,
        html: msg.html,
      })
      if (error) return { error: error.message }
      return { id: data?.id }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[mailer/resend] Error:', message)
      return { error: message }
    }
  }

  // — Fallback: вывод в консоль (для разработки без настроенного провайдера) —
  console.warn('[mailer] No email provider configured. Email NOT sent.')
  console.log('[mailer] Would send:', {
    to: msg.to,
    subject: msg.subject,
  })
  return { id: 'dev-console-fallback' }
}

// ─── Хелперы ──────────────────────────────────────────────────────────────────

/** FROM-адрес из env, с разумным дефолтом.
 *  Если передан businessName — заменяет display name на имя бизнеса:
 *  "Pronto <noreply@...>" → "Ananda <noreply@...>"
 */
export function getFromAddress(businessName?: string): string {
  const base = process.env.RESEND_FROM_EMAIL ?? process.env.SMTP_FROM ?? 'Pronto <noreply@trypronto.app>'
  if (!businessName) return base
  // Заменяем всё до '<' на имя бизнеса, сохраняя email-адрес
  return base.replace(/^[^<]*</, `${businessName} <`)
}
