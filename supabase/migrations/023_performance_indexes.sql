-- Migration 023: Composite indexes for common query patterns
--
-- Audit findings: several high-frequency queries run without covering indexes,
-- forcing Postgres to scan more rows than necessary.
--
-- All indexes are created with IF NOT EXISTS so re-running is safe.

-- ── 1. Transactions: dashboard revenue, CRM history, POS history ──────────────
-- Used in: DashboardPage (revenue today), CRM page (was aggregation query),
--          POS history page.
-- Pattern: WHERE business_id = ? AND status = 'completed' [AND created_at ...]
CREATE INDEX IF NOT EXISTS idx_transactions_business_status_created
  ON public.transactions(business_id, status, created_at DESC);

-- ── 2. Transactions: client stats trigger ────────────────────────────────────
-- Used in: update_client_stats() trigger (migration 008) — fires on every
--          completed POS sale to recompute total_visits/total_spent.
-- Pattern: WHERE client_id = ? AND status = 'completed'
CREATE INDEX IF NOT EXISTS idx_transactions_client_status
  ON public.transactions(client_id, status);

-- ── 3. Clients: reactivation cron query ──────────────────────────────────────
-- Used in: /api/cron/notify — re-activation window (clients last seen 30 days ago).
-- Partial index: only rows where last_visit_at IS NOT NULL (skips new clients).
-- Pattern: WHERE business_id = ? AND last_visit_at BETWEEN ? AND ?
CREATE INDEX IF NOT EXISTS idx_clients_last_visit
  ON public.clients(business_id, last_visit_at)
  WHERE last_visit_at IS NOT NULL;

-- ── 4. Appointments: SoftLimitBanner + dashboard ─────────────────────────────
-- Used in: layout (monthly booking count for free plan), dashboard (today count),
--          SoftLimitBanner (monthly booking count).
-- Pattern: WHERE business_id = ? AND status IN (...) AND starts_at BETWEEN ? AND ?
CREATE INDEX IF NOT EXISTS idx_appointments_business_status_starts
  ON public.appointments(business_id, status, starts_at);
