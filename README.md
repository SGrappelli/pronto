🌍 **English** | [Español](docs/README.es.md) | [Português](docs/README.pt.md)

# Pronto

Open-source business management for service businesses and retail shops.  
Self-hosted via Docker or cloud at [trypronto.app](https://trypronto.app)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com)
[![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)](docker-compose.yml)
[![CI](https://github.com/SGrappelli/pronto/actions/workflows/ci.yml/badge.svg)](https://github.com/SGrappelli/pronto/actions/workflows/ci.yml)

---

## What is Pronto?

Pronto replaces Excel and disconnected apps for small service businesses and retail shops.  
Your clients book directly with you — no marketplace commission, no vendor lock-in.

**Supported business types:**  
Salons · Barbershops · Spas · Dental clinics · Fitness studios ·  
Auto repair shops · Cafes · Tattoo studios · Retail shops & kiosks

---

## Features

### 📅 Booking & Calendar
- Online booking page — clients book with name + phone only, no account required
- Drag-and-drop calendar with staff color coding
- Double-booking prevention (PostgreSQL trigger)
- Zero commission — 100% of revenue goes to you

### 👥 CRM & Clients
- Client cards with visit history, notes, tags, birthday
- CSV import from Fresha, Vagaro, Booksy, Mindbody, Square
- Loyalty points program with POS integration

### 🛒 POS & Checkout
- Fast checkout: services and products in one cart
- Cash, card, transfer payment methods
- Sales history with search by client or product name

### 📦 Inventory & Retail
- Product catalog with barcode, SKU, category, cost/sell price
- Barcode scanner support (USB/Bluetooth keyboard-wedge mode)
- Manual product grid for cashiers without a scanner
- CSV/Excel import — auto-detects columns, supports `.xlsx` and `.csv`
- Excel export for products and sales history
- Low-stock alerts via Telegram, WhatsApp or Email
- Stock movement history per product

### 🔔 Omnichannel Notifications (free, your own credentials)
- Email (Resend / SMTP)
- Telegram Bot
- WhatsApp (Meta Cloud API)
- Viber Bot
- Auto-events: booking confirmation, 24h reminder, 1h reminder, thank-you, reactivation, birthday, low stock

### ⚙️ Modular System

Enable only what you need:

| Preset | Modules enabled |
|---|---|
| **Salon / Barbershop** | Bookings + CRM + POS + Inventory + Notifications |
| **Shop / Kiosk** | POS + Inventory + Notifications (no booking calendar) |
| **Cafe** | POS + CRM + Inventory + Notifications |

Toggle modules in **Settings → Modules** — unused tabs disappear from the sidebar.

### 📊 Analytics
- Revenue dashboard with sparkline charts
- Top services and products
- Client LTV and visit frequency

### 🌐 Multi-language
- Interface available in English, Spanish (LatAm), Portuguese (Brazil)

---

## Quick Start

### Self-hosted (Docker)

**Requirements:** Docker, Docker Compose, a free [Supabase](https://supabase.com) account.

```bash
# 1. Clone the repo
git clone https://github.com/SGrappelli/pronto.git
cd pronto

# 2. Copy environment file and fill in your values
cp .env.example .env

# 3. Disable email confirmation in Supabase (required for self-hosted)
#    Dashboard → Authentication → Providers → Email → uncheck "Confirm email" → Save

# 4. Start — migrations run automatically on first start
docker-compose up -d
```

Open http://localhost:3000

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your **Database connection string** (Session mode, port 5432) from  
   **Project Settings → Database → Connection string** and set it as `DATABASE_URL` in `.env`  
   Migrations are applied automatically when you run `docker-compose up`
3. Create a public storage bucket named **`inventory`** in  
   **Supabase Dashboard → Storage → New bucket** (required for product photos)
4. Copy your project URL and anon/service keys to `.env`
5. **Customize email templates** (optional) — replace Supabase's defaults with Pronto-branded HTML:

   | Template in Supabase | File |
   |---|---|
   | Reset Password | `supabase/email-templates/reset-password.html` |
   | Confirm signup | `supabase/email-templates/confirm-signup.html` |
   | Change Email Address | `supabase/email-templates/email-change.html` |

### Cloud (no setup required)

Start free at [trypronto.app](https://trypronto.app) — no credit card, no commission.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# PostgreSQL connection string (for automatic migrations)
# Supabase Dashboard → Project Settings → Database → Connection string (Session mode)
DATABASE_URL=postgresql://postgres.[ref]:[password]@[host]:5432/postgres

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email notifications (choose one)
RESEND_API_KEY=re_xxxxxxxxxxxx
# or SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_FROM

# Cron (protects /api/cron/notify)
CRON_SECRET=replace-with-random-string
```

Messenger credentials (Telegram, WhatsApp, Viber) are configured per-business in  
**Settings → Notifications** — not in environment variables.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 + Tailwind CSS + shadcn/ui |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) with RLS |
| Auth | Supabase Auth (Email + Google OAuth) |
| Storage | Supabase Storage (product photos) |
| Notifications | Resend/SMTP + Telegram Bot API + Meta WhatsApp Cloud API + Viber Bot API |
| i18n | next-intl — EN / ES / PT |
| Deployment | Docker Compose |

---

## Notifications

### Notification Events

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

### Cron Setup

Call this endpoint every 15 minutes from [cron-job.org](https://cron-job.org) (free):

```
GET https://yourdomain.com/api/cron/notify
Authorization: Bearer YOUR_CRON_SECRET
```

Or use the built-in pg_cron scheduler — edit `supabase/migrations/007_cron_jobs.sql` (replace `YOUR_APP_URL` and `YOUR_CRON_SECRET`), enable **pg_cron** and **pg_net** extensions in Supabase Dashboard, then run the file via SQL Editor.

### Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token
2. In Pronto: **Settings → Notifications** → paste token → click **Connect**
3. Open your bot in Telegram → send `/start`

Owner commands: `/today` — today's appointments · `/help` — command list

Clients link their profile by sending `/link +12345678900` to the bot (their booking phone number).

### Viber Bot

> ⚠️ Since February 2024, new Viber bots require a commercial agreement (~€100/month). This integration works for bots created before February 2024. **For new setups, Telegram is recommended (free).**

1. Sign in to [partners.viber.com](https://partners.viber.com) → copy auth token
2. In Pronto: **Settings → Notifications** → paste token → click **Connect**

Clients link via `/link +12345678900` in the bot.

### WhatsApp (Meta Cloud API)

1. [developers.facebook.com](https://developers.facebook.com) → create a Meta App → add **WhatsApp** product
2. Copy *Phone Number ID* and *Access Token* from **WhatsApp → API Setup**
3. **Recommended:** create a permanent token via Meta Business Manager → System Users → Generate Token with `whatsapp_business_messaging` + `whatsapp_business_management` permissions
4. Paste credentials in **Settings → Notifications → WhatsApp** and save

> ⚠️ Business-initiated messages (reminders, thank-you, birthday) require **pre-approved Message Templates** submitted through Meta Business Manager. Without them, these messages are silently dropped by Meta. Create templates at [business.facebook.com → Account tools → Message templates](https://business.facebook.com).

---

## Deployment

### VPS / Server

```bash
git clone https://github.com/SGrappelli/pronto.git
cd pronto
cp .env.example .env
# Edit .env
docker-compose up -d
```

Point your domain to the server and set up a reverse proxy (Nginx, Caddy, or Cloudflare Tunnel).

### Nginx example

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
│   ├── api/             # All API routes (notifications, cron, inventory, etc.)
│   ├── onboarding/      # First-run setup wizard
│   └── book/[slug]/     # Public booking page (no login required)
├── components/
│   ├── inventory/       # Import modal, barcode scanner UI
│   ├── layout/          # Sidebar, Header
│   └── ui/              # Button, Badge, Card, DatePicker...
├── hooks/
│   └── useBarcodeScanner.ts   # Keyboard-wedge barcode scanner hook
├── lib/
│   ├── modules.ts       # MODULES const — sidebar and feature gating
│   ├── plan-limits.ts   # All unlimited in self-hosted
│   ├── supabase/        # Client, Server helpers, database types
│   ├── email.ts         # Email templates + sending
│   ├── telegram.ts      # Telegram Bot API + templates
│   ├── viber.ts         # Viber Bot API + templates
│   ├── whatsapp.ts      # Meta WhatsApp Cloud API + templates
│   └── utils.ts         # Helpers (formatCurrency, formatDate…)
├── messages/
│   ├── en.json          # English strings
│   ├── es.json          # Spanish strings
│   └── pt.json          # Portuguese strings
├── supabase/
│   └── migrations/      # SQL files — applied automatically on first docker-compose up
├── .env.example
└── docker-compose.yml
```

---

## Adding a New Language

1. Copy `messages/en.json` to `messages/fr.json` (or any locale code)
2. Translate all values
3. Update `i18n/request.ts` to include the new locale

---

## Roadmap

### ✅ Current (v1.0)
- POS + CRM + Booking + Inventory
- Omnichannel notifications (Email, Telegram, WhatsApp, Viber)
- Retail / barcode mode with CSV/Excel import-export
- Modular system (enable only what you need)
- Loyalty program
- Analytics dashboard
- Multi-language: EN / ES / PT
- PWA with offline-capable POS
- Docker one-command install

### 🔜 v1.5 — Q3 2026
- Camera barcode scanning (BarcodeDetector API)
- Label printing
- Batch stock receiving
- Open Food Facts integration (auto-fill product names by barcode)
- LINE messenger

### 🌐 v2.0 — Q4 2026
- Staff payroll & commissions
- Multi-location support
- AI insights
- API access

---

## Professional Services

Need help getting started?

- **Installation & setup** — deploy Pronto on your server, configure all integrations ($100–200)
- **Customization** — custom features, branding, or integrations for your specific business ($150–400)

Contact: [ukv2179@gmail.com](mailto:ukv2179@gmail.com) or open an issue with the `services` label.

---

## Contributing

Pull requests welcome. Please open an issue first to discuss major changes.  
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) — free for personal and commercial use.

---

Have a feature request? [Open an issue](https://github.com/SGrappelli/pronto/issues)
