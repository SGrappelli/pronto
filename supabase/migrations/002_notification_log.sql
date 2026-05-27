-- Notification log — prevents duplicate emails/messages being sent

create table if not exists notification_log (
  id           uuid primary key default gen_random_uuid(),
  business_id  uuid not null references businesses(id) on delete cascade,
  ref_id       text not null,          -- appointment id, client id, item id, etc.
  type         text not null,          -- 'confirm' | 'reminder_24h' | 'reminder_1h' | 'thankyou' | 'reactivation' | 'birthday' | 'low_stock'
  channel      text not null default 'email',
  sent_at      timestamptz not null default now()
);

GRANT ALL ON TABLE public.notification_log TO anon, authenticated;

create unique index notification_log_unique on notification_log (ref_id, type, channel);

-- RLS
alter table notification_log enable row level security;
create policy "business_isolation" on notification_log
  using (business_id in (select my_business_ids()));
