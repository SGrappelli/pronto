-- Add unique constraint on (business_id, phone) to support CSV import
-- with ON CONFLICT (business_id, phone) DO NOTHING dedup logic.
-- Only applies when phone is NOT NULL — partial unique index style kept
-- via standard UNIQUE constraint (NULLs are always distinct in Postgres).

ALTER TABLE public.clients
  ADD CONSTRAINT clients_business_phone_unique UNIQUE (business_id, phone);
