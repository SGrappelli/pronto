alter table public.businesses
  add column if not exists brand_color text default '#2D2926';

GRANT ALL ON TABLE public.businesses TO anon, authenticated;
