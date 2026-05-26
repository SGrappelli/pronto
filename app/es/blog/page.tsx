import type { Metadata } from 'next'
import { getPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog de Pronto — Guías de POS y Gestión para Negocios',
  description:
    'Guías prácticas sobre sistemas POS, gestión de citas y cómo operar un negocio de servicios sin pagar comisiones a plataformas como Fresha o Booksy.',
  alternates: {
    canonical: 'https://trypronto.app/es/blog',
    languages: {
      en: 'https://trypronto.app/blog',
      es: 'https://trypronto.app/es/blog',
      'pt-BR': 'https://trypronto.app/pt/blog',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://trypronto.app/es/blog',
    title: 'Blog de Pronto — Guías de POS y Gestión para Negocios',
    description:
      'Guías prácticas sobre POS, gestión de citas y operación de negocios de servicios sin comisiones.',
    images: [{ url: 'https://trypronto.app/og-image.png' }],
    locale: 'es_ES',
    siteName: 'Pronto',
  },
}

const pageStyles = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;color:#111;background:#fff;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:'Bricolage Grotesque',sans-serif}
nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.96);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid #f0f0f0;padding:0 48px;height:64px;display:flex;align-items:center;justify-content:space-between}
.nav-brand{font-size:22px;font-weight:800;color:#111;text-decoration:none;letter-spacing:-0.5px}
.nav-brand span{color:#16a34a}
.nav-right{display:flex;align-items:center;gap:24px}
.nav-link{font-size:16px;color:#374151;text-decoration:none;font-weight:500}
.nav-link:hover{color:#111}
.btn-nav{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:10px 22px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;white-space:nowrap}
.hide-mob{display:inline}
.blog-hero{padding:72px 48px 60px;background:#fff;border-bottom:1px solid #f0f0f0;text-align:center}
.blog-hero h1{font-size:48px;font-weight:800;line-height:1.08;letter-spacing:-1.5px;margin-bottom:16px;color:#0a0a0a;max-width:700px;margin-left:auto;margin-right:auto}
.blog-hero p{font-size:18px;color:#374151;line-height:1.65;max-width:560px;margin:0 auto}
.blog-main{padding:64px 48px;max-width:1040px;margin:0 auto}
.post-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.post-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:flex;flex-direction:column;text-decoration:none;color:inherit;transition:box-shadow 0.15s}
.post-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.1)}
.post-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#16a34a;background:#f0fdf4;border:1px solid #bbf7d0;padding:3px 10px;border-radius:12px;margin-bottom:14px}
.post-card h2{font-size:19px;font-weight:700;line-height:1.35;color:#0a0a0a;margin-bottom:10px;letter-spacing:-0.3px}
.post-card p{font-size:14px;color:#374151;line-height:1.65;flex:1}
.post-meta{font-size:12px;color:#9ca3af;margin-top:14px;padding-top:14px;border-top:1px solid #f3f4f6}
.post-readmore{font-size:14px;color:#16a34a;font-weight:600;margin-top:12px;display:block}
footer{padding:48px;border-top:1px solid #f0f0f0;background:#fff}
.footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}
.footer-brand{font-size:22px;font-weight:800;color:#111;letter-spacing:-0.5px;text-decoration:none}
.footer-brand span{color:#16a34a}
.footer-tagline{font-size:13px;color:#6b7280;margin-top:6px}
.footer-col-head{font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#9ca3af;margin-bottom:14px}
.footer-col a{display:block;font-size:14px;color:#6b7280;text-decoration:none;margin-bottom:10px;transition:color 0.15s}
.footer-col a:hover{color:#16a34a}
.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid #f0f0f0}
.footer-copy{font-size:13px;color:#9ca3af}
.footer-social{display:flex;gap:16px;align-items:center}
.footer-social a{color:#9ca3af;display:flex;line-height:1;text-decoration:none}
.footer-social a:hover{color:#111}
@media(max-width:1024px){nav{padding:0 24px}.blog-hero{padding:56px 24px 48px}.blog-hero h1{font-size:38px}.blog-main{padding:48px 24px}.post-grid{grid-template-columns:repeat(2,1fr)}.footer-top{grid-template-columns:1fr 1fr;gap:24px}footer{padding:48px 24px}}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr}}
@media(max-width:640px){nav{padding:0 16px;height:56px}.nav-right{gap:8px}.btn-nav{font-size:13px;padding:8px 14px}.hide-mob{display:none}.blog-hero{padding:44px 16px 36px}.blog-hero h1{font-size:30px;letter-spacing:-1px}.blog-main{padding:36px 16px}.post-grid{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr}.footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}footer{padding:32px 16px}}
`

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EsBlogIndexPage() {
  const posts = getPosts('es')

  const cards = posts.map(post => `
    <a href="/es/blog/${post.slug}" class="post-card">
      <span class="post-tag">${post.category}</span>
      <h2>${post.title}</h2>
      <p>${post.description}</p>
      <div class="post-meta">${formatDate(post.date)} &middot; ${post.readingTime} min de lectura</div>
      <span class="post-readmore">Leer m&aacute;s &rarr;</span>
    </a>
  `).join('')

  const pageContent = `
<nav>
  <a href="/es/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/es/precios" class="nav-link hide-mob">Precios</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'es'})">Entrar</a>
    <select aria-label="Idioma" onchange="var l=this.value;var m={en:'/blog',es:'/es/blog',pt:'/pt/blog'};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en">EN</option><option value="es" selected>ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/es/blog'})">Empezar gratis</a>
  </div>
</nav>

<section class="blog-hero">
  <h1>El Blog de Pronto</h1>
  <p>Gu&iacute;as pr&aacute;cticas sobre POS, gesti&oacute;n de citas y c&oacute;mo operar un negocio de servicios sin pagar comisiones a plataformas externas.</p>
</section>

<main class="blog-main">
  <div class="post-grid">
    ${cards}
  </div>
</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/es/" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Tus datos, tu servidor.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Producto</div>
      <a href="/es/precios">Precios</a>
      <a href="/es/para/">Para negocios</a>
      <a href="/es/blog">Blog</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Comparar</div>
      <a href="/es/vs">Comparativas</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Legal</div>
      <a href="/terms">T&eacute;rminos de uso</a>
      <a href="/privacy">Privacidad</a>
      <a href="/refund">Reembolsos</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">&copy; 2026 Pronto. Todos los derechos reservados.</div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto en X"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto en GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
