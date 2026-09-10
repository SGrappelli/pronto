'use client'

// Last-resort boundary: catches errors thrown while rendering the root layout
// itself. By Next.js convention it REPLACES the root layout, so it must render
// its own <html>/<body> and cannot rely on anything the layout provides
// (fonts, next-intl, globals.css). Active in production builds only. (issue #15)
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[global-error]', error)
  }

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          padding: '2rem',
          textAlign: 'center',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          color: '#0f172a',
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Something went wrong</h1>
        <p style={{ margin: 0, color: '#64748b', maxWidth: '28rem' }}>
          An unexpected error occurred. Try again, or head back to the homepage.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              borderRadius: '0.5rem',
              background: '#16a34a',
              color: '#fff',
              padding: '0.5rem 1rem',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          {/*
            Plain <a>, not next/link: global-error replaces the root layout, so
            the Next router context it needs is not guaranteed to be mounted.
            This matches Next's own global-error examples.
          */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              padding: '0.5rem 1rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Go to homepage
          </a>
        </div>
      </body>
    </html>
  )
}
