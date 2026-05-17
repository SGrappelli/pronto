-- Performance fix: bare auth.uid() re-evaluates per row.
-- (SELECT auth.uid()) is hoisted to a single init plan by the planner.
-- See: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

-- ----------------------------------------------------------------
-- 1. Policy: owner_access_businesses (public.businesses)
--    Originally created in 001_initial_schema.sql line 175.
-- ----------------------------------------------------------------
drop policy if exists "owner_access_businesses" on public.businesses;

create policy "owner_access_businesses" on public.businesses
  for all using (owner_id = (SELECT auth.uid()));

-- ----------------------------------------------------------------
-- 2. Function: public.my_business_ids()
--    Originally created in 001_initial_schema.sql, patched in 005_security_fixes.sql.
--    Preserves: security definer, stable, set search_path = public.
-- ----------------------------------------------------------------
create or replace function public.my_business_ids()
returns setof uuid
language sql
security definer
stable
set search_path = public
as $$
  select id from public.businesses where owner_id = (SELECT auth.uid())
  union
  select business_id from public.employees where user_id = (SELECT auth.uid()) and is_active = true
$$;
