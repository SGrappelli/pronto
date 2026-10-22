# Contributing to Pronto

Thank you for your interest in contributing! This document covers everything you need to get started.

---

## Development Setup

### Requirements

- Node.js 20+
- npm 10+
- A free [Supabase](https://supabase.com) project (for the database)
- Git

### Local setup

```bash
# 1. Fork and clone the repo
git clone https://github.com/SGrappelli/pronto.git
cd pronto

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Open .env and fill in your Supabase URL and keys

# 4. Run database migrations
# Option A (recommended): migrations run automatically on first docker compose up
# Option B (local dev without Docker): go to Supabase Dashboard → SQL Editor
# and run each file in supabase/migrations/ in order (001 → 037)

# 5. Start the development server
npm run dev
# App runs at http://localhost:3000
```

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build (checks for TypeScript errors) |
| `npm run lint` | Run ESLint |
| `npm test` | Run the migration checks (Node's built-in test runner; the live-database checks need `DB_GRANTS_TEST_URL`, see below) |
| `npm run start` | Start production server (after build) |

---

## How to Contribute

### Reporting bugs

1. Check if the issue already exists in [Issues](https://github.com/SGrappelli/pronto/issues)
2. If not, open a new issue with:
   - A clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node version, browser)

### Suggesting features

Open an issue with the `enhancement` label. Describe:
- What problem it solves
- Who would benefit
- A rough idea of how it could work

### Submitting a Pull Request

1. **Open an issue first** for anything non-trivial (new features, architecture changes)
2. Fork the repo and create a branch:
   ```bash
   git checkout -b feature/my-feature
   # or
   git checkout -b fix/bug-description
   ```
3. Make your changes
4. Make sure the build passes:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
5. Commit with a clear message:
   ```bash
   git commit -m "feat: add export to CSV in CRM"
   git commit -m "fix: double scrollbar in Settings on mobile"
   ```
6. Push and open a Pull Request against `main`

---

## Code Style

- **TypeScript** — all new code should be typed; avoid `any`
- **Tailwind CSS** — use utility classes; avoid custom CSS unless necessary
- **Server Components by default** — only add `'use client'` when you need interactivity or browser APIs
- **Translations** — all user-facing strings go in `messages/en.json`, referenced via `useTranslations()` or `getTranslations()`
- **No hardcoded URLs** — use `process.env.NEXT_PUBLIC_APP_URL` for the app domain

### File naming

| Type | Convention | Example |
|---|---|---|
| Pages | `page.tsx` | `app/(dashboard)/crm/page.tsx` |
| Client components | `kebab-case.tsx` | `client-detail-view.tsx` |
| Lib utilities | `kebab-case.ts` | `lib/whatsapp.ts` |
| API routes | `route.ts` | `app/api/cron/notify/route.ts` |

---

## Project Architecture

### Dual-mode (selfhosted vs saas)

Pronto runs in two modes controlled by `NEXT_PUBLIC_DEPLOYMENT_MODE`:

- `selfhosted` (default) — billing/plan limits are disabled, all features are available
- `saas` — LemonSqueezy billing is active, plan limits apply

When adding features, make sure they work in both modes. Wrap SaaS-only UI in:
```tsx
{process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'saas' && (
  <BillingBlock />
)}
```

### Porting fixes from the private (SaaS) repo

Some files — `settings-tabs.tsx` above all — mix logic that belongs in both
repos (general settings) with logic that is SaaS-only (billing, Loyalty,
custom domain, module gating). When porting a fix from the private repo,
**copy only the specific lines/sections the fix touches, never the whole
file.** Copying a whole file pulls along any SaaS-only feature that happens
to live in it, even if it's unrelated to the fix you're porting.

This has already happened twice: the retail-module port (`dbd67af`, 2026-07-08)
replaced this repo's `settings-tabs.tsx` with the private repo's version
wholesale "for SaaS parity," which silently added a Loyalty tab and a Custom
Domain tab — neither backed by a migration or API route in this repo, so both
buttons 404'd for every self-hosted user until they were noticed and removed
weeks later (`daee621` for Loyalty, and the Custom Domain removal that
followed the same pattern).

**Checklist for any port touching a mixed file:**
1. Diff only the lines relevant to the fix — don't `cp` or replace the file.
2. After porting, grep the result for SaaS-only terms (`whop`, `lemonsqueezy`,
   `loyalty`, `custom_domain`, `plan_limits`) that weren't part of your fix.
3. Confirm every new UI element that calls an API route has a matching route
   in *this* repo, and every new DB field has a matching migration in
   `supabase/migrations/` here — not just in the private repo.

### Database (Supabase + RLS)

- Every table has Row Level Security enabled
- Users can only access data belonging to their business
- The `my_business_ids()` SQL function returns the current user's business IDs
- Public booking page uses `security definer` RPC functions to bypass RLS safely

#### Grants rule (every migration that creates a table or view)

From 2026-10-30 Supabase no longer gives the `anon`, `authenticated` and `service_role` roles any
privilege on a new table, sequence or function in `public` — not on new projects, not on a fresh
self-hosted install, not after `supabase db reset`. RLS alone is not enough: the role also needs a
`GRANT`. So a migration that creates a table or view must, **in the same file**:

1. **`GRANT` exactly what is needed** — and nothing more:
   - `service_role` — whatever the server code does with it (the booking API, cron, webhooks);
   - `authenticated` — only what a logged-in browser or Server Component session does directly with the
     table. If only API routes (service role) touch it, grant nothing;
   - `anon` — only what a public page reads straight from the browser. The booking page is rendered on
     the server with the service role, so today `anon` has no table at all, only
     `get_booked_slots()`. Every `GRANT` to `anon` carries a `-- anon: <what the public page reads>`
     comment.
2. **Enable RLS** (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`) and add policies that match the grants.
3. **Views** need `WITH (security_invoker = true)` plus a `GRANT`.
4. **Functions:** `REVOKE EXECUTE ... FROM PUBLIC` and grant only the roles that call them.
5. **Never** `ALTER DEFAULT PRIVILEGES ... GRANT` — it hands privileges to objects that do not exist yet.
   Grant per object. (The old `GRANT ALL ON TABLE ... TO anon, authenticated` line is wrong too.)

`supabase/migrations/037_data_api_grants.sql` writes this state down for everything migrations 001–036
create: it grants what is missing and revokes what is not needed, and a second run executes nothing.
Existing installs are narrowed to the same list; nothing is exposed that was not before.

Checks: `npm test` reads every migration from 038 on and fails on a missing `GRANT` / RLS /
`security_invoker`, an `anon` grant without a reason, or default privileges. To check a real database,
migrate a local one and run the live checks (read-only apart from a rolled-back re-run of 037):

```bash
npx supabase start
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres MIGRATE_SSL=false node scripts/migrate.js
DB_GRANTS_TEST_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres npm test
```

To see exactly what each role can do in any database (one `BEGIN READ ONLY` transaction), and to compare
two databases or one database before and after a migration:

```bash
DATABASE_URL=postgresql://... node scripts/db-grants-snapshot.js before.txt   # add MIGRATE_SSL=false for a local DB
# ... apply the migration ...
DATABASE_URL=postgresql://... node scripts/db-grants-snapshot.js after.txt
diff before.txt after.txt
```

### Notifications architecture

| Channel | Direction | Where sent from |
|---|---|---|
| Telegram | → Business owner + Client (if linked via /link) | `lib/telegram.ts` |
| Viber | → Business owner + Client (if linked via /link) | `lib/viber.ts` |
| WhatsApp | → Client | `lib/whatsapp.ts` |
| Email | → Client | `lib/email.ts` + `lib/mailer.ts` |

---

## Questions?

Open an issue or start a discussion. We're happy to help.
