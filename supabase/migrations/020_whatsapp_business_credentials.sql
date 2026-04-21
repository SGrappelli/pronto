ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS meta_whatsapp_phone_number_id TEXT,
  ADD COLUMN IF NOT EXISTS meta_whatsapp_access_token TEXT;
