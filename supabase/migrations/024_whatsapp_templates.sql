-- Migration 024: WhatsApp HSM template names per business
--
-- Meta Cloud API requires pre-approved message templates for all
-- business-initiated outbound WhatsApp messages (Cloud API policy).
-- These columns store the template names registered in Meta Business Manager.
--
-- wa_template_confirmation  — name of the booking-confirmation template
-- wa_template_reminder      — name of the appointment-reminder template (24h and 1h)
-- wa_template_thankyou      — name of the post-visit thank-you template
-- wa_template_reactivation  — name of the re-engagement template (30-day dormant clients)
-- wa_template_birthday      — name of the birthday template
-- wa_template_language      — BCP-47 language code for all templates (default 'en')
--
-- If a column is NULL the WhatsApp notification for that event is silently skipped.

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS wa_template_confirmation  text,
  ADD COLUMN IF NOT EXISTS wa_template_reminder      text,
  ADD COLUMN IF NOT EXISTS wa_template_thankyou      text,
  ADD COLUMN IF NOT EXISTS wa_template_reactivation  text,
  ADD COLUMN IF NOT EXISTS wa_template_birthday      text,
  ADD COLUMN IF NOT EXISTS wa_template_language      text NOT NULL DEFAULT 'en';
