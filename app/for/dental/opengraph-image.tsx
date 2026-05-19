import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ background: '#16a34a', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'white', fontSize: 72, fontWeight: 700 }}>Pronto</div>
      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 36, marginTop: 24 }}>For Dental Clinics</div>
    </div>
  )
}
