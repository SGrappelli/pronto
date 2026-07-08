ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS enabled_modules TEXT[] NOT NULL
DEFAULT ARRAY['bookings','pos','crm','inventory','notifications'];

GRANT ALL ON TABLE public.businesses TO anon, authenticated;
