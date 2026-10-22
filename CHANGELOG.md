# Changelog

All notable changes to Pronto (self-hosted) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-10-22

### Security

- **Anyone who pressed Start in your salon's Telegram or Viber bot could take over the owner's
  notifications.** In 1.2.0 and earlier, `/start` sent to the bot — with no parameter or with anything
  other than a client's own link — connected the sender's chat as the *owner's* chat, replacing the real
  one. From then on the new chat received every owner notification (new bookings with client names,
  services and times, reminders, low-stock alerts, visit completions, `/today`), and the real owner
  stopped receiving them. For Viber the same happened with `/start`, and also to whoever opened an
  unconnected bot first. The bot's address is not secret (a client gets it in the booking confirmation),
  so any client could do it.
- **Fixed: the owner's chat is now connected only by a one-time link from Settings → Notifications.**
  After you press **Connect** the page shows a button (your bot's name for Telegram, **Open in Viber** for
  Viber). It opens the bot with a signed token that expires after 15 minutes and works once; **Get a new
  link** appears when it expires. A bare `/start`, `/start@YourBot`, `/start` with any other text, a client
  link, or an expired, used or foreign token no longer connects anything — the bot just explains itself
  (and tells whoever wrote that the owner connects the chat in Settings). Clients still link themselves
  with their own link or `/link +<phone>`; that is unchanged.

### What you need to do

- **Nothing.** Chats that are already connected keep working exactly as before — nothing is reset, there
  is no migration and no new setting. `docker compose up -d --build` is enough.
- The token is signed with `TELEGRAM_WEBHOOK_SECRET` (already required for Telegram). A Viber-only install
  without it uses a key derived from `SUPABASE_SERVICE_ROLE_KEY`, so no new variable is needed.
- Moving the notifications to another phone or account: Settings → Notifications → **Connect**, then use
  the new button. The link replaces the connected chat. If you ever suspect a stranger's chat is the
  connected one, do the same — it takes over from them.

### Changed

- Step 3 of the Telegram and Viber instructions in Settings → Notifications, the READMEs (EN/ES/PT) and
  the bot's replies describe the new way to connect. The Italian interface shows the English wording for
  the new texts until they are translated.

### Added

- `npm run test:unit` (Vitest, a new dev dependency; also run by CI): the owner-link token, both webhooks
  and the link route are covered by tests (`tests/unit/`). `npm test` still runs the migration checks.

## [1.2.0] - 2026-10-22

### Security

- **Breaking for custom integrations: migration `037_data_api_grants.sql` takes every table privilege
  away from the `anon` role.** Until now `anon` (a visitor with no login, i.e. anyone holding your public
  anon key) had table privileges on every table, including `services`, `employees` and `business_hours`.
  Row Level Security still limited the rows, but those three tables had public read policies, so anyone
  could read them straight through the REST API — including the **email and phone number of every active
  employee**. That is now closed: `anon` has no table privilege at all.
- The same migration writes the privileges of all three Supabase API roles (`anon`, `authenticated`,
  `service_role`) down explicitly, as the minimal list the application needs, and removes what it does not
  need (`TRUNCATE`, `REFERENCES`, `TRIGGER` and `MAINTAIN` for everyone, trigger functions and two unused
  functions from `anon`/`authenticated`). Row Level Security is unchanged.

### Fixed

- **Fresh installs after 2026-10-30.** Supabase stops granting privileges on new tables automatically on
  that date. The old migrations granted `anon`/`authenticated` everything and `service_role` nothing, so
  on a new project the server (online booking, cron, Telegram/Viber webhooks, sign-up) failed with
  `permission denied for table ...`. Migration 037 grants `service_role` what it needs.

### Added

- `npm test`: a check that every new migration (038 and later) enables Row Level Security and grants
  privileges explicitly, plus live-database checks of the privilege list (see "Grants rule" in
  `CONTRIBUTING.md`).
- `scripts/db-grants-snapshot.js`: a read-only snapshot of who can do what in `public`, to compare two
  databases or one database before and after a migration.

### Who is affected

- **The built-in booking page (`/book/<slug>`) is not affected.** It is rendered on the server with the
  service role; the visitor's browser only calls the `get_booked_slots` function, which stays available to
  `anon`.
- **Your own widgets, scripts or integrations that read tables with the public anon key will now get
  `permission denied`** (HTTP 401/403, code `42501`). You have two options:
  1. *Recommended:* make the call on your server with the service-role key (never put that key in a
     browser), and return only what the page needs.
  2. Give `anon` the privilege back, on purpose and as narrowly as possible, in **your own new migration**
     (`038_…sql` or later, so it survives updates). Keep the existing policy in mind: it limits rows, not
     columns. For `employees`, grant only the columns a public page needs so email and phone stay private:

     ```sql
     -- anon: my website widget lists active services and staff names
     grant select on table public.services to anon;
     grant select (id, business_id, name, role, avatar_url) on table public.employees to anon;
     grant select on table public.business_hours to anon;
     ```

     A widget that has to read `employees` this way must name the columns (`?select=id,name,role`);
     `select=*` is refused when only some columns are granted.

### Upgrading

- **Docker (recommended):** `git pull`, then `docker compose up -d --build`. The `migrate` service applies
  `037_data_api_grants.sql` by itself before the app starts. Running it a second time changes nothing.
- **Manual install:** open the Supabase Dashboard → SQL Editor and run the contents of
  `supabase/migrations/037_data_api_grants.sql` once, after 036.
- Check afterwards: Supabase Dashboard → Advisors → Security Advisor, and open your booking page.
