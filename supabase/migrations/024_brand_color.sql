-- Brand color per tenant: used on the public booking page
-- to match the business's visual identity.
alter table public.businesses
  add column if not exists brand_color text default '#2D2926';
