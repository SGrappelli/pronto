import Link from 'next/link'

// Rendered for unmatched routes and explicit notFound() calls. Deliberately
// dependency-free (no next-intl, no data fetching) so it renders even when the
// thing that broke is the app's i18n or data layer. It still mounts inside the
// root layout, which is hardened to never throw. (issue #15)
export default function NotFound() {
  return (
    <main
      style={{
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
      }}
    >
      <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>404</p>
      <h1 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Page not found</h1>
      <p style={{ margin: 0, color: '#64748b', maxWidth: '28rem' }}>
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '0.5rem',
          display: 'inline-block',
          borderRadius: '0.5rem',
          background: '#16a34a',
          color: '#fff',
          padding: '0.5rem 1rem',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Go to homepage
      </Link>
    </main>
  )
}
