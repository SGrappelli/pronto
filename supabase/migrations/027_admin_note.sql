-- Add admin_note column to businesses for manual tier change notes
alter table public.businesses
  add column if not exists admin_note text;
