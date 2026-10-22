-- 037: Data API privileges, written down explicitly
--
-- WHY
--   Supabase stops handing anon / authenticated / service_role their table,
--   sequence and function privileges automatically on 2026-10-30. A project
--   created after that date (and any `supabase db reset`) gets objects in
--   `public` that the Data API cannot touch unless a migration says so. The
--   earlier migrations only did half of that job: 001, 002, 009, 026 and 027
--   grant `anon` and `authenticated` everything on their tables, and nothing
--   anywhere grants `service_role` anything, because it used to come for free.
--   On a fresh project that means every server-side call (online booking, the
--   cron notifications, the Telegram / Viber webhooks, sign-up) fails with
--   "permission denied for table ...".
--
-- WHAT
--   Brings every object the migrations create in `public` to an explicit,
--   minimal list of privileges for exactly these roles: anon, authenticated,
--   service_role. GRANT where a role lacks something it needs, REVOKE where it
--   holds something it does not need. The list below was derived from what the
--   application code actually does (there is no production database to copy it
--   from):
--     * service_role  = the server (lib/supabase/service.ts): the online
--                       booking API, cron, webhooks, sign-up, the public
--                       booking page. SELECT/INSERT/UPDATE/DELETE on the
--                       application tables, nothing on the migration tracker.
--     * authenticated = a logged-in browser or Server Component session
--                       (lib/supabase/client.ts and server.ts): only the
--                       operations the dashboard performs. RLS still decides
--                       which rows.
--     * anon          = a visitor with no login. The public booking page is
--                       rendered on the server with the service role, so anon
--                       needs no table at all; the browser only calls the
--                       get_booked_slots() function.
--   Nobody gets TRUNCATE, REFERENCES, TRIGGER or MAINTAIN on any table.
--
-- UPGRADING AN EXISTING INSTALL
--   Existing installs hold the broad privileges the old GRANT ALL lines and
--   Supabase's automatic defaults gave. This migration narrows them to the
--   list; Row Level Security is untouched. The one visible change: anon can no
--   longer SELECT from services, employees and business_hours directly through
--   the REST API (the public_read_* policies stay, but no longer have a table
--   privilege to act on). The booking page does not use that path.
--   Safe to run again: it issues a GRANT or REVOKE only where a role's real
--   privileges differ from the list (has_*_privilege also sees PUBLIC and role
--   membership), so the second run executes nothing.
--
-- NOT TOUCHED (on purpose)
--   * Default privileges (ALTER DEFAULT PRIVILEGES). A migration that forgets
--     its GRANT must fail on a clean install instead of silently working
--     because of a default. New objects: see "Grants rule" in CONTRIBUTING.md.
--   * Objects some installs have that no migration here creates (for example
--     handle_new_user(), profiles, completions).

DO $grants$
DECLARE
  roles      text[] := ARRAY['anon', 'authenticated', 'service_role'];
  -- MAINTAIN exists from PostgreSQL 17 only; asking about it on older servers is an error.
  maintain   text[] := CASE WHEN current_setting('server_version_num')::int >= 170000
                            THEN ARRAY['MAINTAIN'] ELSE ARRAY[]::text[] END;
  all_privs  text[];
  r          record;
  oid_       oid;
  role_name  text;
  profile    text;
  priv       text;
  want       boolean;
  has_entry  boolean;
  changed    int := 0;
BEGIN
  all_privs := ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER'] || maintain;

  -- ── Schema ───────────────────────────────────────────────────────────────
  FOREACH role_name IN ARRAY roles LOOP
    IF NOT EXISTS (  -- named in the schema ACL, not merely reachable through PUBLIC
      SELECT 1
        FROM pg_namespace n
        CROSS JOIN LATERAL aclexplode(coalesce(n.nspacl, acldefault('n', n.nspowner))) a
       WHERE n.nspname = 'public' AND a.privilege_type = 'USAGE' AND a.grantee = role_name::regrole::oid
    ) THEN
      EXECUTE format('GRANT USAGE ON SCHEMA public TO %I', role_name);
      changed := changed + 1;
    END IF;
  END LOOP;

  -- ── Tables ───────────────────────────────────────────────────────────────
  -- profile letters: S SELECT, I INSERT, U UPDATE, D DELETE; empty = no privilege at all.
  FOR r IN
    SELECT * FROM (VALUES
      --                        anon   authenticated  service_role
      ('appointments',          '',    'SIUD',        'SIUD'),
      ('business_hours',        '',    'SIU',         'SIUD'),
      ('businesses',            '',    'SU',          'SIUD'),
      ('clients',               '',    'SIUD',        'SIUD'),
      ('employees',             '',    'SIUD',        'SIUD'),
      ('inventory_items',       '',    'SIUD',        'SIUD'),
      ('inventory_movements',   '',    'SI',          'SIUD'),
      ('notification_log',      '',    '',            'SIUD'),
      ('schema_migrations',     '',    '',            ''),
      ('services',              '',    'SIUD',        'SIUD'),
      ('transactions',          '',    'SIU',         'SIUD')
    ) AS t(table_name, anon, authenticated, service_role)
  LOOP
    oid_ := to_regclass(format('public.%I', r.table_name));
    IF oid_ IS NULL THEN CONTINUE; END IF;

    FOR i IN 1..3 LOOP
      role_name := roles[i];
      profile := CASE i WHEN 1 THEN r.anon WHEN 2 THEN r.authenticated ELSE r.service_role END;
      FOREACH priv IN ARRAY all_privs LOOP
        want := position(left(priv, 1) IN profile) > 0 AND priv IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE');
        IF want AND NOT has_table_privilege(role_name, oid_, priv) THEN
          EXECUTE format('GRANT %s ON TABLE public.%I TO %I', priv, r.table_name, role_name);
          changed := changed + 1;
        ELSIF NOT want AND has_table_privilege(role_name, oid_, priv) THEN
          EXECUTE format('REVOKE %s ON TABLE public.%I FROM %I', priv, r.table_name, role_name);
          changed := changed + 1;
          IF has_table_privilege(role_name, oid_, priv) THEN
            RAISE EXCEPTION 'cannot remove % on public.% from % (it also comes from PUBLIC or a role membership)',
              priv, r.table_name, role_name;
          END IF;
        END IF;
      END LOOP;
    END LOOP;
  END LOOP;

  -- ── Sequences ────────────────────────────────────────────────────────────
  -- receipt_seq: set_receipt_number() calls nextval() as whoever inserts a transaction
  -- (the dashboard through the logged-in session, the server through the service role).
  FOR r IN
    SELECT * FROM (VALUES
      ('receipt_seq', false, true, true)
    ) AS t(seq_name, anon, authenticated, service_role)
  LOOP
    oid_ := to_regclass(format('public.%I', r.seq_name));
    IF oid_ IS NULL THEN CONTINUE; END IF;

    FOR i IN 1..3 LOOP
      role_name := roles[i];
      FOREACH priv IN ARRAY ARRAY['USAGE', 'SELECT', 'UPDATE'] LOOP
        want := priv = 'USAGE' AND CASE i WHEN 1 THEN r.anon WHEN 2 THEN r.authenticated ELSE r.service_role END;
        IF want AND NOT has_sequence_privilege(role_name, oid_, priv) THEN
          EXECUTE format('GRANT %s ON SEQUENCE public.%I TO %I', priv, r.seq_name, role_name);
          changed := changed + 1;
        ELSIF NOT want AND has_sequence_privilege(role_name, oid_, priv) THEN
          EXECUTE format('REVOKE %s ON SEQUENCE public.%I FROM %I', priv, r.seq_name, role_name);
          changed := changed + 1;
          IF has_sequence_privilege(role_name, oid_, priv) THEN
            RAISE EXCEPTION 'cannot remove % on public.% from % (it also comes from PUBLIC or a role membership)',
              priv, r.seq_name, role_name;
          END IF;
        END IF;
      END LOOP;
    END LOOP;
  END LOOP;

  -- ── Functions ────────────────────────────────────────────────────────────
  -- A function is callable by default through PUBLIC, so "anon may not execute" is a
  -- revoke from PUBLIC as well; roles that keep access are granted explicitly afterwards.
  --   * get_booked_slots(uuid,date,uuid) is public ON PURPOSE: the booking page calls it
  --     from the visitor's browser (anon, or authenticated when the owner looks at it).
  --   * my_business_ids() is evaluated inside every tenant RLS policy, as the logged-in user.
  --   * The four trigger functions are run by the trigger, not called: Postgres checks
  --     EXECUTE only when a trigger is created, so nobody needs it.
  --   * get_booked_slots(uuid,date) (superseded by the 3-argument form in 014) and
  --     get_tx_ids_by_item_name() are not called by the application: closed to everyone
  --     except the owner role.
  FOR r IN
    SELECT * FROM (VALUES
      ('check_slot_availability()',             false, false, false),
      ('get_booked_slots(uuid,date)',           false, false, false),
      ('get_booked_slots(uuid,date,uuid)',      true,  true,  true),
      ('get_tx_ids_by_item_name(uuid,text)',    false, false, false),
      ('my_business_ids()',                     false, true,  false),
      ('set_receipt_number()',                  false, false, false),
      ('set_updated_at()',                      false, false, false),
      ('update_client_stats()',                 false, false, false)
    ) AS t(signature, anon, authenticated, service_role)
  LOOP
    oid_ := to_regprocedure('public.' || r.signature);
    IF oid_ IS NULL THEN CONTINUE; END IF;

    FOR i IN 1..3 LOOP  -- first remove what must not exist ...
      role_name := roles[i];
      want := CASE i WHEN 1 THEN r.anon WHEN 2 THEN r.authenticated ELSE r.service_role END;
      IF NOT want AND has_function_privilege(role_name, oid_, 'EXECUTE') THEN
        EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%s FROM PUBLIC, %I', r.signature, role_name);
        changed := changed + 1;
        IF has_function_privilege(role_name, oid_, 'EXECUTE') THEN
          RAISE EXCEPTION 'cannot remove EXECUTE on public.% from %', r.signature, role_name;
        END IF;
      END IF;
    END LOOP;

    FOR i IN 1..3 LOOP  -- ... then make sure each wanted role has its OWN entry
      role_name := roles[i];
      want := CASE i WHEN 1 THEN r.anon WHEN 2 THEN r.authenticated ELSE r.service_role END;
      -- Not merely "can execute": access that only comes through PUBLIC would vanish the
      -- day someone revokes PUBLIC, so the role must be named in the ACL.
      SELECT EXISTS (
        SELECT 1
          FROM pg_proc p
          CROSS JOIN LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
         WHERE p.oid = oid_ AND a.privilege_type = 'EXECUTE' AND a.grantee = role_name::regrole::oid
      ) INTO has_entry;
      IF want AND NOT has_entry THEN
        EXECUTE format('GRANT EXECUTE ON FUNCTION public.%s TO %I', r.signature, role_name);
        changed := changed + 1;
      END IF;
    END LOOP;
  END LOOP;

  RAISE NOTICE '037_data_api_grants: % GRANT/REVOKE statement(s) executed', changed;
END
$grants$;
