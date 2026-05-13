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

## Pricing tiers (updated 2026-05-13)

| | Free | Starter $19 | Pro $39 | Agency $79 |
|---|---|---|---|---|
| Team members | 1 | 3 | 15 | Unlimited |
| Clients in CRM | 100 | Unlimited | Unlimited | Unlimited |
| Bookings / month | 50 | Unlimited | Unlimited | Unlimited |

**Available from Free:** POS, CRM, Inventory, Online booking page, all notifications (Email + Telegram + WhatsApp + Viber)

**From Starter+:** limits removed, no new features vs Free

**From Pro+:** Analytics dashboard, Loyalty program, Custom domain

**Agency only:** Multiple locations, White-label, API access

**Branding:** "Powered by Pronto" badge on public booking page — Free tier only, hidden for Starter+

Constants in `lib/lemonsqueezy.ts` → `PLAN_LIMITS`. Enforcement in `lib/plan-limits.ts`.

## Workflow
- Always push to private SaaS repo (origin = Pronto-saas)
- Always commit with clear messages
- After any server-side change, remind me to run git pull on DigitalOcean
