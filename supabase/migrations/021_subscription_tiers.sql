-- Add Whop subscription tier tracking to businesses table

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS subscription_tier text NOT NULL DEFAULT 'free'
    CHECK (subscription_tier IN ('free', 'starter', 'pro', 'agency')),
  ADD COLUMN IF NOT EXISTS whop_membership_id text;
