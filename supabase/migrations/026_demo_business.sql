-- Demo business seed for /book/demo (The Style Studio)
-- Uses fixed UUIDs so this migration is idempotent (safe to re-run).

-- ── 1. System placeholder owner (never signs in) ─────────────────────────────
INSERT INTO auth.users (
  id, aud, role, email, encrypted_password,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, is_sso_user, is_anonymous
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'authenticated',
  'authenticated',
  'demo@system.trypronto.app',
  '',
  now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"business_name":"The Style Studio"}',
  false, false, false
)
ON CONFLICT (id) DO NOTHING;

-- ── 2. Demo business ─────────────────────────────────────────────────────────
INSERT INTO public.businesses (
  id, owner_id, name, slug, type,
  subscription_tier, plan,
  timezone, currency
)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'The Style Studio',
  'demo',
  'salon',
  'pro',
  'pro',
  'UTC',
  'USD'
)
ON CONFLICT (slug) DO NOTHING;

-- ── 3. Employees ─────────────────────────────────────────────────────────────
INSERT INTO public.employees (id, business_id, name, role, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000010',
   '00000000-0000-0000-0000-000000000002',
   'Sofia', 'Hair Stylist', true),
  ('00000000-0000-0000-0000-000000000011',
   '00000000-0000-0000-0000-000000000002',
   'Marcus', 'Barber', true),
  ('00000000-0000-0000-0000-000000000012',
   '00000000-0000-0000-0000-000000000002',
   'Emma', 'Nail Technician', true)
ON CONFLICT (id) DO NOTHING;

-- ── 4. Services ──────────────────────────────────────────────────────────────
INSERT INTO public.services (id, business_id, name, price, duration_min, category, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000020',
   '00000000-0000-0000-0000-000000000002',
   'Classic Haircut', 35.00, 30, 'Hair', true),
  ('00000000-0000-0000-0000-000000000021',
   '00000000-0000-0000-0000-000000000002',
   'Hair Color', 85.00, 90, 'Hair', true),
  ('00000000-0000-0000-0000-000000000022',
   '00000000-0000-0000-0000-000000000002',
   'Beard Trim', 25.00, 20, 'Beard', true),
  ('00000000-0000-0000-0000-000000000023',
   '00000000-0000-0000-0000-000000000002',
   'Manicure', 40.00, 45, 'Nails', true),
  ('00000000-0000-0000-0000-000000000024',
   '00000000-0000-0000-0000-000000000002',
   'Blow Dry', 30.00, 30, 'Hair', true),
  ('00000000-0000-0000-0000-000000000025',
   '00000000-0000-0000-0000-000000000002',
   'Haircut + Beard', 55.00, 50, 'Combo', true)
ON CONFLICT (id) DO NOTHING;

-- ── 5. Business hours: Mon–Sat 09:00–19:00, Sunday closed ────────────────────
INSERT INTO public.business_hours
  (business_id, day_of_week, is_open, open_time, close_time)
VALUES
  ('00000000-0000-0000-0000-000000000002', 0, false, '09:00', '19:00'),
  ('00000000-0000-0000-0000-000000000002', 1, true,  '09:00', '19:00'),
  ('00000000-0000-0000-0000-000000000002', 2, true,  '09:00', '19:00'),
  ('00000000-0000-0000-0000-000000000002', 3, true,  '09:00', '19:00'),
  ('00000000-0000-0000-0000-000000000002', 4, true,  '09:00', '19:00'),
  ('00000000-0000-0000-0000-000000000002', 5, true,  '09:00', '19:00'),
  ('00000000-0000-0000-0000-000000000002', 6, true,  '09:00', '19:00')
ON CONFLICT (business_id, day_of_week) DO NOTHING;
