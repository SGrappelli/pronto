ALTER TABLE inventory_items
ADD COLUMN IF NOT EXISTS barcode TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS photo_url TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS inventory_items_business_barcode_idx
ON inventory_items (business_id, barcode)
WHERE barcode IS NOT NULL;

GRANT ALL ON TABLE public.inventory_items TO anon, authenticated;
