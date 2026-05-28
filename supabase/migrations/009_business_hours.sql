-- Миграция 009: Рабочие часы бизнеса
--
-- Добавляет таблицу business_hours — расписание работы по дням недели.
-- day_of_week: 0=Вс, 1=Пн, 2=Вт, 3=Ср, 4=Чт, 5=Пт, 6=Сб (JS-конвенция Date.getDay())
-- Дефолт: Пн–Пт 09:00–19:00 открыты, Сб–Вс закрыты.
--
-- Также добавляет публичные политики RLS для публичной страницы бронирования
-- и RPC-функцию get_booked_slots (security definer = обходит RLS, но не раскрывает
-- личные данные — возвращает только starts_at / ends_at занятых слотов).

-- ─── Таблица ─────────────────────────────────────────────────────────────────
create table public.business_hours (
  id          uuid primary key default uuid_generate_v4(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  is_open     boolean not null default true,
  open_time   text not null default '09:00',  -- формат HH:MM
  close_time  text not null default '19:00',  -- формат HH:MM
  unique (business_id, day_of_week)
);

GRANT ALL ON TABLE public.business_hours TO anon, authenticated;

create index idx_business_hours_business on public.business_hours(business_id);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
alter table public.business_hours enable row level security;

-- Владелец/сотрудник управляют своими часами
create policy "tenant_access_business_hours" on public.business_hours
  for all using (business_id in (select public.my_business_ids()));

-- Публичное чтение для виджета бронирования (страница /book/[slug])
create policy "public_read_business_hours" on public.business_hours
  for select using (true);

-- ─── Публичные политики чтения для /book/[slug] ───────────────────────────────
-- Без них анонимный Supabase-клиент получает пустые данные из-за RLS.
-- Политики безопасны: данные и так публичны (бизнес сам публикует страницу).

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'businesses'
      and policyname = 'public_read_businesses_for_booking'
  ) then
    execute $p$
      create policy "public_read_businesses_for_booking" on public.businesses
        for select using (true)
    $p$;
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'services'
      and policyname = 'public_read_services_for_booking'
  ) then
    execute $p$
      create policy "public_read_services_for_booking" on public.services
        for select using (is_active = true)
    $p$;
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'employees'
      and policyname = 'public_read_employees_for_booking'
  ) then
    execute $p$
      create policy "public_read_employees_for_booking" on public.employees
        for select using (is_active = true)
    $p$;
  end if;
end;
$$;

-- ─── RPC: занятые слоты (security definer = обходит RLS) ─────────────────────
-- Возвращает только starts_at/ends_at занятых записей — никаких личных данных.
-- Учитывает часовой пояс бизнеса при сравнении даты.
create or replace function public.get_booked_slots(
  p_business_id uuid,
  p_date        date
)
returns table (starts_at timestamptz, ends_at timestamptz)
language sql
security definer
stable
set search_path = public
as $$
  select a.starts_at, a.ends_at
  from public.appointments a
  join public.businesses b on b.id = a.business_id
  where a.business_id = p_business_id
    and (a.starts_at at time zone coalesce(b.timezone, 'UTC'))::date = p_date
    and a.status not in ('cancelled', 'no_show')
$$;

-- ─── Дефолтное расписание для уже существующих бизнесов ──────────────────────
insert into public.business_hours (business_id, day_of_week, is_open, open_time, close_time)
select
  b.id,
  d.dow,
  case when d.dow in (0, 6) then false else true end as is_open,
  '09:00' as open_time,
  '19:00' as close_time
from public.businesses b
cross join (values (0),(1),(2),(3),(4),(5),(6)) as d(dow)
on conflict (business_id, day_of_week) do nothing;
