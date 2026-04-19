🌍 **English** | [Español](docs/README.es.md) | [Português](docs/README.pt.md)

# Pronto — Open Source POS · CRM · Booking for Service Businesses

> Self-hosted business management for salons, barbershops, auto repair shops, cafes, and any service SMB.  
> Your data, your server. Zero commission. One-command install.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](docker-compose.yml)
[![CI](https://github.com/SGrappelli/pronto/actions/workflows/ci.yml/badge.svg)](https://github.com/SGrappelli/pronto/actions/workflows/ci.yml)

---

## Why Pronto

- **Your data, your server** — client records, booking history, and inventory stay on your own machine. No vendor lock-in, no data leaving your infrastructure.
- **Zero commission** — clients book and pay directly with your business. No marketplace middleman taking a cut.
- **One command to install** — `docker compose up -d` and you're running. Migrations apply automatically on first start.
- **Full source code, MIT license** — read it, modify it, white-label it. No hidden SaaS layer, no feature flags, no phone-home.

---

## Features

| Module | What it does |
|---|---|
| **POS / Checkout** | Complete a sale in 3 clicks. Cash, card, transfer. Receipt number auto-generated. |
| **CRM** | Full client history — visits, spending, tags, birthday, notes. |
| **Inventory** | Track stock levels, get low-stock alerts via Telegram & email. |
| **Booking Calendar** | Week-view calendar, new appointments, status tracking, public booking page. |
| **Online Booking** | Clients book without registration via a public link (`/book/your-slug`). Working hours, slot generation, no double-booking. |
| **Telegram Bot** | Owner gets instant notifications: new bookings, reminders, low stock. Commands: `/today`, `/help`. |
| **Viber Bot** | Same notifications as Telegram, delivered via Viber. Clients can link their Viber ID via `/link {phone}`. ⚠️ New bots require a Viber commercial agreement (~€100/month). Works with bots created before Feb 2024. |
| **WhatsApp** | Direct messages to clients via Meta Cloud API — confirmations, reminders, thank-you, re-activation, birthday. |
| **Email Notifications** | Booking confirmation, 24h & 1h reminders, thank-you, re-activation, birthday greetings. |
| **Settings** | Services, employees, working hours, business info, notification channels. |

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) — App Router, Server Actions, Server Components
- **Database**: [Supabase](https://supabase.com) — PostgreSQL + Auth + Row Level Security
- **UI**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix UI)
- **Email**: [Resend](https://resend.com) or any SMTP server
- **Messaging**: Telegram Bot API · Viber Bot API · Meta WhatsApp Cloud API
- **i18n**: [next-intl](https://next-intl-docs.vercel.app) — English by default, easily extendable
- **Deployment**: Docker + Docker Compose

---

## Requirements

- Docker & Docker Compose v2.1+ installed
- Works on Linux, Windows 10/11, macOS, or any VPS
- Minimum: 1 GB RAM, 10 GB storage
- [Get Docker →](https://docs.docker.com/get-docker/)

---

## Quick Start

### Option 1 — Docker (recommended for self-hosting)

**Requirements:** Docker, Docker Compose v2.1+, a free [Supabase](https://supabase.com) account.

```bash
# 1. Clone the repo
git clone https://github.com/SGrappelli/pronto.git
cd pronto

# 2. Copy environment file and fill in your values
cp .env.example .env
# Edit .env — see Configuration section below

# 3. Disable email confirmation in Supabase (required for self-hosted)
# Dashboard → Authentication → Providers → Email → uncheck "Confirm email" → Save

# 4. Start the app — migrations run automatically on first start
docker-compose up -d

# App is running at http://localhost:3000
# On first run, docker-compose starts a one-shot "migrate" service that applies
# all SQL migrations, then starts the app.  No manual SQL steps needed.
```

### Option 2 — Local development

```bash
git clone https://github.com/SGrappelli/pronto.git
cd pronto
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
# App is running at http://localhost:3000
```

---

## Configuration

Copy `.env.example` to `.env` and fill in the required values:

```env
# ── Required ─────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://yourdomain.com   # or http://localhost:3000

# PostgreSQL connection string (for automatic migrations)
# Supabase Dashboard → Project Settings → Database → Connection string (Session mode)
DATABASE_URL=postgresql://postgres.[ref]:[password]@[host]:5432/postgres

# ── Email (choose one) ────────────────────────────────
# Option A: Resend (easiest — free tier: 3 000 emails/month)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=Pronto <noreply@yourdomain.com>

# Option B: Your own SMTP server
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your@gmail.com
# SMTP_PASS=your-app-password
# SMTP_FROM=Pronto <your@gmail.com>

# ── Cron secret (protects /api/cron/notify) ──────────
CRON_SECRET=replace-with-random-string

# ── WhatsApp (optional) ───────────────────────────────
# META_WHATSAPP_PHONE_NUMBER_ID=
# META_WHATSAPP_ACCESS_TOKEN=
```

See `.env.example` for the full list including Telegram, Viber, and all optional settings.

### Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Copy your **Database connection string** (Session mode, port 5432) from  
   **Project Settings → Database → Connection string** and set it as `DATABASE_URL` in `.env`  
   Migrations are applied automatically when you run `docker-compose up`
3. **Customize email templates** — replace Supabase's default emails with Pronto-branded ones:
   - Go to **Authentication → Email Templates** in your Supabase Dashboard
   - For each template below, open the file, copy the HTML, and paste it into the corresponding template in Supabase:

   | Template in Supabase | File |
   |---|---|
   | Reset Password | `supabase/email-templates/reset-password.html` |
   | Confirm signup | `supabase/email-templates/confirm-signup.html` |
   | Change Email Address | `supabase/email-templates/email-change.html` |

4. **Set sender name and reply-to** — in **Authentication → Email Settings**:
   - **Sender name**: `Pronto` (or your own brand name)
   - **Reply-to**: your support email
5. Go to **Authentication → Providers** and enable **Email** (optionally Google OAuth)
6. Copy your project URL and API keys to `.env`

---

## Notification Events

Pronto sends automated notifications through all configured channels.

| Trigger | Who receives it | Channel |
|---|---|---|
| Booking confirmed | Client | Email + WhatsApp |
| Booking confirmed | Business owner | Telegram + Viber |
| 24h before appointment | Client | Email + WhatsApp + Telegram† + Viber† |
| 24h before appointment | Business owner | Telegram + Viber |
| 1h before appointment | Client | Email + WhatsApp + Telegram† + Viber† |
| 1h before appointment | Business owner | Telegram + Viber |
| After visit completed | Client (thank-you + rebook link) | Email + WhatsApp + Telegram† + Viber† |
| 30 days no visit | Client (re-activation) | Email + WhatsApp |
| Birthday | Client | Email + WhatsApp |
| Low stock alert | Business owner | Email + Telegram + Viber |

† Client receives Telegram/Viber notifications only if they have linked their profile via `/link {phone}` in the bot.

**Cron setup** — call this endpoint every 15 minutes from [cron-job.org](https://cron-job.org) (free):
```
GET https://yourdomain.com/api/cron/notify
Authorization: Bearer YOUR_CRON_SECRET
```

Or use the built-in pg_cron scheduler — see [Setting up cron](#setting-up-notifications-cron) below.

---

## Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token
2. In Pronto: **Settings → Notifications** → paste token → click **Connect**
3. Open your bot in Telegram → send `/start`

Available bot commands (owner):
- `/today` — today's appointments
- `/help` — command list

**Clients can link their Telegram profile:**

If a client wants to receive reminders via Telegram, they send one command to the bot:
```
/link +79001234567
```
Replace with the phone number they used when booking. Their Telegram ID will be saved automatically.

Alternatively, fill in the Telegram ID manually in **CRM → client card**.

Owner notifications sent automatically:
- 📅 New booking (with source: internal / online)
- 🔔 Appointment reminders (24h and 1h before)
- ⚠️ Low-stock alerts
- ✅ Visit completion confirmation

---

## Viber Bot

> ⚠️ **Important:** Since February 2024, Viber has moved to a commercial-only model for new chatbots. Creating a new Viber bot now requires a commercial agreement with Viber (~€100/month). This integration works for bots created before February 2024, or if you have an active commercial agreement. **For new setups, Telegram is recommended (free).**

1. Sign in to [partners.viber.com](https://partners.viber.com) with your existing bot account → copy the auth token
2. In Pronto: **Settings → Notifications** → paste the Viber token → click **Connect**
3. Find your bot in Viber and start a conversation — you'll receive a welcome message

The same notifications as Telegram are delivered via Viber (new bookings, reminders, low stock, visit completions).

**Clients can link their Viber profile:**

If a client wants to receive reminders via Viber, they send one command to the bot:
```
/link +79001234567
```
Replace `+79001234567` with the phone number they used when booking. Their Viber ID will be saved automatically.

Alternatively, fill in the Viber ID manually in **CRM → client card → Viber ID**.

---

## WhatsApp (Meta Cloud API)

Unlike Telegram/Viber (which notify the *business owner*), WhatsApp messages go directly to *clients* — confirmations, reminders, thank-you notes, re-activation, and birthday greetings.

**Setup:**

1. Go to [developers.facebook.com](https://developers.facebook.com) → create a Meta App → add the **WhatsApp** product
2. In **WhatsApp → API Setup**, copy the *Phone Number ID* and *Access Token*
3. **Recommended: create a permanent token** — in [Meta Business Manager](https://business.facebook.com) → Settings → Users → System Users → create a user → assign your app → Generate Token with `whatsapp_business_messaging` + `whatsapp_business_management` permissions. This token never expires.
4. Add to your `.env`:
   ```env
   META_WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
   META_WHATSAPP_ACCESS_TOKEN=your-permanent-token
   ```
5. Restart the server — Settings → Notifications will show a green "Connected" badge
6. Add clients' WhatsApp numbers in **CRM → client card → WhatsApp** field — they will receive messages automatically

**Phone number format:** enter with or without `+` — Pronto normalizes it automatically (e.g. `+1 234 567 8900` → `12345678900`).

> ⚠️ **WhatsApp messaging limits:** Free-form text messages (`type: text`) only work within a **24-hour customer service window** that opens after the client messages the business first. Business-initiated messages — reminders, thank-you, re-activation, birthday — require **pre-approved Message Templates (HSM)** submitted through Meta Business Manager. Without approved templates, these messages are silently dropped by Meta and never delivered. For full cron notification support via WhatsApp, create and submit your message templates at [business.facebook.com → Account tools → Message templates](https://business.facebook.com).

---

## Setting up notifications cron

The file `supabase/migrations/007_cron_jobs.sql` sets up an automatic scheduler inside Supabase that calls `/api/cron/notify` every 15 minutes.

**Why this matters:** Without this, reminders and thank-you messages are never sent. The cron is the engine that drives all automated notifications.

### Step 1 — Enable extensions in Supabase Dashboard

1. Go to your [Supabase Dashboard](https://supabase.com) → open your project
2. In the left sidebar click **Database** → then **Extensions**
3. Search for **pg_cron** → enable it
4. Search for **pg_net** → enable it (if not already)

### Step 2 — Edit the migration file

Open `supabase/migrations/007_cron_jobs.sql` and replace two placeholders:

| Placeholder | Replace with |
|---|---|
| `YOUR_APP_URL` | Your deployed app URL, e.g. `https://myapp.com` |
| `YOUR_CRON_SECRET` | The value of `CRON_SECRET` from your `.env` file |

### Step 3 — Run the migration

SQL Editor → paste `007_cron_jobs.sql` → click **Run**.

You should see `SELECT 1` in the results — the cron job is created.

### Step 4 — Verify

```sql
SELECT * FROM cron.job WHERE jobname = 'pronto-notify';
```

### Alternative: external cron (cron-job.org)

1. Create a free account at [cron-job.org](https://cron-job.org)
2. Create a new job:
   - **URL**: `https://yourdomain.com/api/cron/notify`
   - **Schedule**: every 15 minutes
   - **Headers**: add `Authorization: Bearer YOUR_CRON_SECRET` (replace with your `CRON_SECRET` value)
3. No database changes needed

---

## Deployment

### VPS / Server

```bash
# On your server
git clone https://github.com/SGrappelli/pronto.git
cd pronto
cp .env.example .env
# Edit .env
docker-compose up -d
```

Point your domain to the server and set up a reverse proxy (Nginx, Caddy, or Cloudflare Tunnel).

### Nginx config example

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Project Structure

```
pronto/
├── app/
│   ├── (auth)/          # Login, Register, Check email
│   ├── (dashboard)/     # POS, CRM, Inventory, Booking, Settings, Dashboard
│   ├── api/             # Email, Telegram/Viber webhooks, Cron
│   ├── onboarding/      # First-run setup wizard (business name, slug, services)
│   └── book/[slug]/     # Public booking page (no login required)
├── components/
│   ├── layout/          # Sidebar, Header
│   └── ui/              # Button, Badge, Card, DatePicker...
├── lib/
│   ├── supabase/        # Client, Server helpers
│   ├── email.ts         # Email templates + sending
│   ├── mailer.ts        # Resend / SMTP transport
│   ├── telegram.ts      # Telegram Bot API + templates
│   ├── viber.ts         # Viber Bot API + templates
│   ├── whatsapp.ts      # Meta WhatsApp Cloud API + templates
│   └── utils.ts         # Helpers (formatCurrency, formatDate…)
├── messages/
│   └── en.json          # All UI strings (add new languages here)
├── supabase/
│   └── migrations/      # SQL files — applied automatically on first docker-compose up
├── .env.example         # Environment variable template
└── docker-compose.yml
```

---

## Adding a New Language

1. Copy `messages/en.json` to `messages/fr.json` (or any locale)
2. Translate all values
3. Update `i18n/request.ts` to detect and serve the new locale

---

## Professional Services

Need help getting started? I offer:

- **Installation & setup** — I'll deploy Pronto on your server, configure all integrations, and get you running ($100–200)
- **Customization** — custom features, branding, or integrations for your specific business ($150–400)

Contact: [ukv2179@gmail.com](mailto:ukv2179@gmail.com) or open an issue with the `services` label.

**Don't want to self-host?** A managed cloud version is available at [trypronto.app](https://trypronto.app) — no server required, ready in minutes.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

Pull requests are welcome! Please open an issue first to discuss major changes.

---

## License

[MIT](LICENSE) — free to use, modify, and self-host.

---

## Roadmap

### ✅ v1.0 — Available now
- Point of Sale (POS) with offline mode
- Client management (CRM) with full visit history
- Inventory tracking with low-stock alerts
- Appointment booking calendar (drag & drop)
- Online booking page — no client registration required
- Omnichannel notifications: Email · Telegram · WhatsApp · Viber
- PWA — installable on any device without App Store
- Docker one-command install

### 🔜 v1.5 — Q3 2026
- Analytics dashboard (revenue, LTV, top services)
- Loyalty program
- LINE messenger notifications (Japan, Thailand, Taiwan)
- Client PWA (booking history, loyalty card)
- Staff management with payroll & commissions
- AI-powered business insights
- Multi-language interface (ES, RU, PT)

### 🌐 v2.0 — Q4 2026
- Additional messenger channels
- API access for external integrations

---

Have a feature request? [Open an issue](https://github.com/SGrappelli/pronto/issues)
— community feedback shapes the roadmap.
