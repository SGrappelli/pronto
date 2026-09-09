-- Migration 036: one business row per owner
--
-- Two signup code paths each create a businesses row and neither guaranteed
-- a single row per owner:
--   * app/(auth)/register/actions.ts  — right after supabase.auth.signUp()
--   * app/auth/callback/route.ts       — after email / OAuth confirmation
-- plus a double-submitted /register form racing itself. When two rows land,
-- app/(dashboard)/layout.tsx still renders (it reads businesses-by-owner
-- with .order(created_at).limit(1)) so the sidebar looks fine, but every
-- other page/route that queries businesses-by-owner with a bare
-- .maybeSingle() gets a "multiple rows" result and renders blank — no error
-- anywhere (issue #5). lib/create-business.ts :: getOrCreateBusiness() now
-- reuses an existing row; this migration is the DB-level backstop.
--
-- Existing self-hosted installs may already have duplicates, possibly with
-- real data, so this does a dedup pass first:
--   1. oldest row per owner (by created_at, then id) = the "primary" — the
--      same row layout.tsx already shows.
--   2. re-point every child row from the non-primary rows onto the primary.
--      * business_hours is pure config (regenerable from Settings): the
--        non-primary rows are dropped, the primary keeps its own.
--      * clients and inventory_items carry a (business_id, X) unique key:
--        rows that would NOT collide with one the primary already has are
--        re-pointed; if any would collide, the migration ABORTS (see 3) —
--        it never deletes real customer/stock data to force the merge.
--   3. a safety-net check: if anything still references a non-primary row
--      after the re-point, RAISE EXCEPTION. The whole DO block is one
--      (sub)transaction, so it rolls back entirely — the constraint is not
--      added and nothing is lost. The operator resolves the overlap by
--      hand and re-runs.
--   4. delete the now-empty non-primary rows.
--   5. add UNIQUE (owner_id).
--
-- The appointments re-point is done with prevent_double_booking disabled:
-- that BEFORE INSERT/UPDATE trigger re-validates the row against the target
-- business's schedule and would spuriously reject an appointment that was
-- already valid on its own (duplicate) business. Disabling it is inside the
-- DO block, so an abort in step 3 rolls the trigger state back too.
--
-- A no-op for installs with no duplicates (the common case).

DO $$
DECLARE
  o          RECORD;
  primary_id uuid;
  others     uuid[];
  leftover   bigint;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.businesses GROUP BY owner_id HAVING count(*) > 1
  ) THEN
    RAISE NOTICE 'migration 036: no owner has duplicate business rows — dedup skipped';
  ELSE
    EXECUTE 'ALTER TABLE public.appointments DISABLE TRIGGER prevent_double_booking';

    FOR o IN
      SELECT owner_id
      FROM public.businesses
      GROUP BY owner_id
      HAVING count(*) > 1
    LOOP
      SELECT id INTO primary_id
      FROM public.businesses
      WHERE owner_id = o.owner_id
      ORDER BY created_at ASC, id ASC
      LIMIT 1;

      SELECT array_agg(id) INTO others
      FROM public.businesses
      WHERE owner_id = o.owner_id AND id <> primary_id;

      -- config: keep the primary's hours, drop the duplicates' outright
      DELETE FROM public.business_hours WHERE business_id = ANY(others);

      -- (business_id, phone) unique: re-point only non-colliding clients
      UPDATE public.clients c
      SET business_id = primary_id
      WHERE c.business_id = ANY(others)
        AND (
          c.phone IS NULL
          OR NOT EXISTS (
            SELECT 1 FROM public.clients p
            WHERE p.business_id = primary_id AND p.phone = c.phone
          )
        );

      -- partial unique on (business_id, sku) and (business_id, barcode):
      -- re-point only non-colliding items
      UPDATE public.inventory_items i
      SET business_id = primary_id
      WHERE i.business_id = ANY(others)
        AND NOT EXISTS (
          SELECT 1 FROM public.inventory_items p
          WHERE p.business_id = primary_id
            AND (
              (i.sku     IS NOT NULL AND i.sku     <> '' AND p.sku     = i.sku)
              OR (i.barcode IS NOT NULL AND i.barcode <> '' AND p.barcode = i.barcode)
            )
        );

      -- plain FK, no per-business unique key: move everything
      UPDATE public.employees           SET business_id = primary_id WHERE business_id = ANY(others);
      UPDATE public.services            SET business_id = primary_id WHERE business_id = ANY(others);
      UPDATE public.appointments        SET business_id = primary_id WHERE business_id = ANY(others);
      UPDATE public.transactions        SET business_id = primary_id WHERE business_id = ANY(others);
      UPDATE public.inventory_movements SET business_id = primary_id WHERE business_id = ANY(others);
      UPDATE public.notification_log    SET business_id = primary_id WHERE business_id = ANY(others);

      -- safety net: nothing may still point at a non-primary row
      SELECT
        (SELECT count(*) FROM public.employees           WHERE business_id = ANY(others))
      + (SELECT count(*) FROM public.services            WHERE business_id = ANY(others))
      + (SELECT count(*) FROM public.clients             WHERE business_id = ANY(others))
      + (SELECT count(*) FROM public.appointments        WHERE business_id = ANY(others))
      + (SELECT count(*) FROM public.transactions        WHERE business_id = ANY(others))
      + (SELECT count(*) FROM public.inventory_items     WHERE business_id = ANY(others))
      + (SELECT count(*) FROM public.inventory_movements WHERE business_id = ANY(others))
      + (SELECT count(*) FROM public.notification_log    WHERE business_id = ANY(others))
      INTO leftover;

      IF leftover > 0 THEN
        RAISE EXCEPTION E'This account has two (or more) business profiles with overlapping data\n(for example, the same client phone number exists in both, or the same\ninventory SKU / barcode). They cannot be merged automatically.\n\nWhat to do: contact support, or open Supabase and decide by hand which\nONE business row to keep for this account and delete the other(s).\nThe rest of the migrations will not run until this is resolved.\n\nAccount (businesses.owner_id): %\nBusiness row to keep by default (the oldest, businesses.id): %\nOther business row(s) for the same account (businesses.id): %\n% overlapping child record(s) are what block the automatic merge.',
          o.owner_id, primary_id, array_to_string(others, ', '), leftover;
      END IF;

      DELETE FROM public.businesses WHERE id = ANY(others);

      RAISE NOTICE 'migration 036: merged % duplicate business row(s) into % for owner %',
        array_length(others, 1), primary_id, o.owner_id;
    END LOOP;

    EXECUTE 'ALTER TABLE public.appointments ENABLE TRIGGER prevent_double_booking';
  END IF;

  -- DB-level backstop
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.businesses'::regclass
      AND conname  = 'businesses_owner_id_key'
  ) THEN
    ALTER TABLE public.businesses
      ADD CONSTRAINT businesses_owner_id_key UNIQUE (owner_id);
  END IF;
END $$;

-- idx_businesses_owner (plain btree, from 001_initial_schema.sql) is now
-- redundant with the UNIQUE constraint's own index on the same column.
DROP INDEX IF EXISTS public.idx_businesses_owner;
