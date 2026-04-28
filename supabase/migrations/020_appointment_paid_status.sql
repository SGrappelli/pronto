-- Migration 020: Add 'paid' to allowed appointment statuses
--
-- Problem: appointments.status has a CHECK constraint that only allows
-- ('pending','confirmed','completed','cancelled','no_show').
-- Setting status = 'paid' from the POS terminal was silently rejected
-- by the database, so appointments stayed 'completed' after checkout.
--
-- Fix: drop the existing status check and recreate it with 'paid' added.

-- Drop any existing CHECK constraint on appointments.status
DO $$
DECLARE
    r record;
BEGIN
    FOR r IN
        SELECT conname
        FROM pg_constraint
        WHERE conrelid = 'public.appointments'::regclass
          AND contype = 'c'
          AND pg_get_constraintdef(oid) LIKE '%status%'
    LOOP
        EXECUTE 'ALTER TABLE public.appointments DROP CONSTRAINT ' || quote_ident(r.conname);
    END LOOP;
END $$;

-- Recreate with 'paid' included
ALTER TABLE public.appointments
  ADD CONSTRAINT appointments_status_check
  CHECK (status IN ('pending', 'confirmed', 'completed', 'paid', 'cancelled', 'no_show'));
