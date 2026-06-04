# Project context for Claude Code

## Who I am
I am a non-technical founder. I do not write code myself.
Always give me detailed, step-by-step instructions for any 
manual actions I need to take (server commands, GitHub settings, 
DNS changes, etc). Never assume I know what to do next.

## Repositories
- Private SaaS repo (this repo): github.com/SGrappelli/Pronto-saas
  This is the active development repo. All new features go here.
- Public self-hosted repo: github.com/SGrappelli/pronto
  This is the open-source core. Do NOT touch it unless explicitly asked.

## Stack
- Next.js 14 + Supabase + Tailwind + shadcn/ui
- Hosted on DigitalOcean Frankfurt
- Cloudflare for DNS/SSL (wildcard *.trypronto.app)
- Resend for email (noreply@trypronto.app)
- Deployment: docker compose -f docker-compose.saas.yml up -d

## Pricing tiers (updated 2026-06-04)

| | Free | Starter $19 | Pro $39 | Agency $79 |
|---|---|---|---|---|
| Team members | 1 | 3 | 15 | Unlimited |
| Clients in CRM | 100 | Unlimited | Unlimited | Unlimited |
| Bookings / month | 50 | Unlimited | Unlimited | Unlimited |

**Available from Free:** POS, CRM, Inventory, Online booking page, all notifications (Email + Telegram + WhatsApp + Viber), CSV client import

**From Starter+:** limits removed, no new features vs Free

**From Pro+:** Analytics dashboard ✅ (LIVE), Loyalty program, Custom domain

**Agency only:** Multiple locations, White-label, API access

**Branding:** "Powered by Pronto" badge on public booking page — Free tier only, hidden for Starter+

Constants in `lib/lemonsqueezy.ts` → `PLAN_LIMITS`. Enforcement in `lib/plan-limits.ts`.

## Key features implemented (2026-06-04)

- **brand_color per tenant** — `businesses.brand_color`, migration 028; Settings color picker; public booking page uses CSS vars `--brand` / `--brand-light`
- **Public booking page** — Warm & Premium design; TWO routes: `app/book/[slug]/page.tsx` (slug) + `app/book/page.tsx` (subdomain) — BOTH must have CSS vars set
- **CSV client import** — `app/api/clients/import/route.ts`; modal with RFC 4180 parser; migration 029 adds `UNIQUE(business_id, phone)`

## Database migrations

**Latest SaaS migration: `029_client_phone_unique.sql`. Next: 030.**
**Latest public repo migration: `025_client_phone_unique.sql`. Next: 026.**
(Public repo skipped 021, 022 — intentional gap, don't fill it.)

Every new migration that creates a table MUST include immediately after CREATE TABLE:

```sql
GRANT ALL ON TABLE public.table_name TO anon, authenticated;
```

**Why:** Supabase policy change (May 2026) — without this, new tables are inaccessible
via PostgREST/supabase-js for the `anon` and `authenticated` roles after October 2026.
RLS policies alone are not enough; the role must also have table-level GRANT.

**Pattern:**
```sql
create table public.my_table (
  id uuid primary key default uuid_generate_v4(),
  ...
);

GRANT ALL ON TABLE public.my_table TO anon, authenticated;

alter table public.my_table enable row level security;
create policy "..." on public.my_table ...;
```

## Workflow
- Always push to private SaaS repo (origin = Pronto-saas)
- Always commit with clear messages
- After any server-side change, remind me to run git pull on DigitalOcean

## Staging workflow

Branch strategy:
  develop → staging.trypronto.app  (test here first)
  main    → trypronto.app          (production)

Rules:
- All new features: commit to develop, push saas develop
- After testing on staging: merge develop → main, push saas main
- NEVER push untested code directly to main

Deploy staging (run on server):
  bash scripts/staging-deploy.sh

Deploy production (run on server):
  docker-compose -f docker-compose.saas.yml down
  docker-compose -f docker-compose.saas.yml up -d --build

Infrastructure:
- System nginx routes by hostname: staging.trypronto.app → 3001,
  trypronto.app → 3000
- Staging uses same Supabase database as production
- Staging .env.staging lives only on server, not in git
