-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ========================
-- BUSINESSES (tenants)
-- ========================
create table public.businesses (
  id            uuid primary key default uuid_generate_v4(),
  owner_id      uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  slug          text not null unique,
  type          text,                        -- salon, auto_repair, cafe, dental, fitness, other
  phone         text,
  email         text,
  address       text,
  timezone      text not null default 'UTC',
  currency      text not null default 'USD',
  logo_url      text,
  plan          text not null default 'free' check (plan in ('free','starter','pro','agency')),
  plan_expires_at timestamptz,
  telegram_bot_token text,
  viber_bot_token    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ========================
-- EMPLOYEES
-- ========================
create table public.employees (
  id            uuid primary key default uuid_generate_v4(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  user_id       uuid references auth.users(id) on delete set null,
  name          text not null,
  role          text not null default 'employee',
  phone         text,
  email         text,
  avatar_url    text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ========================
-- SERVICES
-- ========================
create table public.services (
  id            uuid primary key default uuid_generate_v4(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  name          text not null,
  description   text,
  price         numeric(10,2) not null default 0,
  duration_min  integer not null default 60,
  category      text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ========================
-- CLIENTS
-- ========================
create table public.clients (
  id            uuid primary key default uuid_generate_v4(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  name          text not null,
  phone         text,
  email         text,
  notes         text,
  tags          text[] not null default '{}',
  telegram_id   text,
  viber_id      text,
  birthday      date,
  total_visits  integer not null default 0,
  total_spent   numeric(10,2) not null default 0,
  last_visit_at timestamptz,
  created_at    timestamptz not null default now()
);

-- ========================
-- APPOINTMENTS
-- ========================
create table public.appointments (
  id            uuid primary key default uuid_generate_v4(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  client_id     uuid references public.clients(id) on delete set null,
  employee_id   uuid references public.employees(id) on delete set null,
  service_id    uuid references public.services(id) on delete set null,
  starts_at     timestamptz not null,
  ends_at       timestamptz not null,
  status        text not null default 'pending'
                  check (status in ('pending','confirmed','completed','cancelled','no_show')),
  price         numeric(10,2),
  notes         text,
  source        text not null default 'manual'
                  check (source in ('manual','online','telegram','viber')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ========================
-- TRANSACTIONS (POS)
-- ========================
create table public.transactions (
  id              uuid primary key default uuid_generate_v4(),
  business_id     uuid not null references public.businesses(id) on delete cascade,
  appointment_id  uuid references public.appointments(id) on delete set null,
  client_id       uuid references public.clients(id) on delete set null,
  employee_id     uuid references public.employees(id) on delete set null,
  amount          numeric(10,2) not null,
  payment_method  text not null default 'cash'
                    check (payment_method in ('cash','card','transfer','online')),
  status          text not null default 'completed'
                    check (status in ('pending','completed','refunded')),
  items           jsonb not null default '[]',
  receipt_number  text unique,
  created_at      timestamptz not null default now()
);

-- ========================
-- INVENTORY
-- ========================
create table public.inventory_items (
  id                  uuid primary key default uuid_generate_v4(),
  business_id         uuid not null references public.businesses(id) on delete cascade,
  name                text not null,
  sku                 text,
  category            text,
  unit                text not null default 'pcs',
  quantity            numeric(10,3) not null default 0,
  low_stock_threshold numeric(10,3) not null default 5,
  cost_price          numeric(10,2),
  sell_price          numeric(10,2),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.inventory_movements (
  id          uuid primary key default uuid_generate_v4(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  item_id     uuid not null references public.inventory_items(id) on delete cascade,
  type        text not null check (type in ('in','out','adjustment')),
  quantity    numeric(10,3) not null,
  note        text,
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ========================
-- TABLE GRANTS
-- ========================
-- Required for PostgREST/supabase-js access (Supabase policy change, May 2026)
GRANT ALL ON TABLE public.businesses TO anon, authenticated;
GRANT ALL ON TABLE public.employees TO anon, authenticated;
GRANT ALL ON TABLE public.services TO anon, authenticated;
GRANT ALL ON TABLE public.clients TO anon, authenticated;
GRANT ALL ON TABLE public.appointments TO anon, authenticated;
GRANT ALL ON TABLE public.transactions TO anon, authenticated;
GRANT ALL ON TABLE public.inventory_items TO anon, authenticated;
GRANT ALL ON TABLE public.inventory_movements TO anon, authenticated;

-- ========================
-- INDEXES
-- ========================
create index idx_businesses_owner on public.businesses(owner_id);
create index idx_businesses_slug on public.businesses(slug);
create index idx_employees_business on public.employees(business_id);
create index idx_services_business on public.services(business_id);
create index idx_clients_business on public.clients(business_id);
create index idx_clients_phone on public.clients(business_id, phone);
create index idx_appointments_business on public.appointments(business_id);
create index idx_appointments_starts_at on public.appointments(business_id, starts_at);
create index idx_transactions_business on public.transactions(business_id);
create index idx_inventory_items_business on public.inventory_items(business_id);

-- ========================
-- ROW LEVEL SECURITY
-- ========================
alter table public.businesses enable row level security;
alter table public.employees enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.transactions enable row level security;
alter table public.inventory_items enable row level security;
alter table public.inventory_movements enable row level security;

-- Businesses: owner sees their own
create policy "owner_access_businesses" on public.businesses
  for all using (owner_id = auth.uid());

-- Helper: current user's business IDs
create or replace function public.my_business_ids()
returns setof uuid language sql security definer stable as $$
  select id from public.businesses where owner_id = auth.uid()
  union
  select business_id from public.employees where user_id = auth.uid() and is_active = true
$$;

-- Generic policy for all tenant tables
create policy "tenant_access_employees" on public.employees
  for all using (business_id in (select public.my_business_ids()));

create policy "tenant_access_services" on public.services
  for all using (business_id in (select public.my_business_ids()));

create policy "tenant_access_clients" on public.clients
  for all using (business_id in (select public.my_business_ids()));

create policy "tenant_access_appointments" on public.appointments
  for all using (business_id in (select public.my_business_ids()));

create policy "tenant_access_transactions" on public.transactions
  for all using (business_id in (select public.my_business_ids()));

create policy "tenant_access_inventory_items" on public.inventory_items
  for all using (business_id in (select public.my_business_ids()));

create policy "tenant_access_inventory_movements" on public.inventory_movements
  for all using (business_id in (select public.my_business_ids()));

-- ========================
-- AUTO updated_at TRIGGER
-- ========================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_businesses_updated_at before update on public.businesses
  for each row execute procedure public.set_updated_at();

create trigger trg_appointments_updated_at before update on public.appointments
  for each row execute procedure public.set_updated_at();

create trigger trg_inventory_items_updated_at before update on public.inventory_items
  for each row execute procedure public.set_updated_at();

-- Auto-increment receipt number
create sequence public.receipt_seq start 1000;

create or replace function public.set_receipt_number()
returns trigger language plpgsql as $$
begin
  if new.receipt_number is null then
    new.receipt_number = 'REC-' || lpad(nextval('public.receipt_seq')::text, 6, '0');
  end if;
  return new;
end;
$$;

create trigger trg_transactions_receipt before insert on public.transactions
  for each row execute procedure public.set_receipt_number();
