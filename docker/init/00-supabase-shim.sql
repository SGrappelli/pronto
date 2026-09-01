-- Minimal stand-in for the parts of Supabase the existing migrations expect.
-- Runs once, on first boot of the postgres container, BEFORE any migration.
-- Everything here is throwaway: it exists so supabase/migrations/*.sql can be
-- applied unchanged against plain Postgres while we migrate off Supabase.

-- Roles referenced by GRANT/REVOKE statements in the migrations.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN;
  END IF;
END
$$;

-- auth.users is referenced by foreign keys in 001_initial_schema.sql.
-- Only the columns the app actually reads are kept.
CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE IF NOT EXISTS auth.users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- auth.uid() is used by the RLS policies. Those policies are created and
-- enabled, but the app connects as the table owner, which bypasses RLS unless
-- FORCE ROW LEVEL SECURITY is set. Tenant isolation is therefore the
-- application's job from here on (see lib/db.ts).
CREATE OR REPLACE FUNCTION auth.uid() RETURNS UUID
LANGUAGE sql STABLE AS $$
  SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;

GRANT USAGE ON SCHEMA auth TO anon, authenticated;
