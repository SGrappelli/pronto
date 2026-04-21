import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f9fafb' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            {/* Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                background: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>

            {/* Heading */}
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#111827',
                margin: '0 0 8px',
              }}
            >
              You&apos;re offline
            </h1>

            {/* Message */}
            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px' }}>
              Check your internet connection. If you already opened the POS terminal this session,
              you can still complete sales — they will sync automatically when you reconnect.
            </p>

            {/* Action */}
            <a
              href="/pos"
              style={{
                display: 'inline-block',
                background: '#2563eb',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Open POS Terminal
            </a>

            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '16px' }}>
              Pronto — Your data, your server.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
