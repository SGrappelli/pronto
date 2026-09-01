-- Migration 037: Set default currency to 'EUR' and timezone to 'Europe/Brussels'
ALTER TABLE public.businesses
  ALTER COLUMN currency SET DEFAULT 'EUR',
  ALTER COLUMN timezone SET DEFAULT 'Europe/Brussels';

UPDATE public.businesses
  SET currency = 'EUR'
  WHERE currency = 'USD' OR currency IS NULL;

UPDATE public.businesses
  SET timezone = 'Europe/Brussels'
  WHERE timezone = 'UTC' OR timezone IS NULL;
