-- Function to search transactions by item name (JSONB array search)
-- Used by POS transaction history to filter by product/service name

CREATE OR REPLACE FUNCTION get_tx_ids_by_item_name(
  p_business_id uuid,
  p_query text
) RETURNS TABLE(id uuid) AS $$
  SELECT t.id
  FROM transactions t
  WHERE t.business_id = p_business_id
    AND t.status = 'completed'
    AND EXISTS (
      SELECT 1
      FROM jsonb_array_elements(t.items) AS elem
      WHERE elem->>'name' ILIKE '%' || p_query || '%'
    )
$$ LANGUAGE sql SECURITY DEFINER;
