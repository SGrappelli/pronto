-- Migration 036: Add 'nl' to notification_language check constraint on businesses
ALTER TABLE public.businesses
  DROP CONSTRAINT IF EXISTS businesses_notification_language_check;

ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_notification_language_check
  CHECK (notification_language IN ('en', 'es', 'pt', 'nl'));
