import DOMPurify from 'isomorphic-dompurify'

/** Strip all HTML tags and trim whitespace. Safe in both Node and browser. */
export function sanitize(s: string): string {
  return DOMPurify.sanitize(s, { ALLOWED_TAGS: [] }).trim()
}

/** Sanitize a name field and enforce max length. */
export function sanitizeName(s: string, max = 100): string {
  return sanitize(s).slice(0, max)
}

/** Sanitize a long-text field (notes, description) and enforce max length. */
export function sanitizeText(s: string, max = 1000): string {
  return sanitize(s).slice(0, max)
}

/** Sanitize a short identifier (SKU, category, tag) and enforce max length. */
export function sanitizeShort(s: string, max = 50): string {
  return sanitize(s).slice(0, max)
}
