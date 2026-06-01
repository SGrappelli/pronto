-- Add country column to businesses (2-letter ISO code captured at registration)
alter table public.businesses
  add column if not exists country text;
