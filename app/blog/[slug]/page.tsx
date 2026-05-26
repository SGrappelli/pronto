import { getPosts, getPost } from '@/lib/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return getPosts('en').map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost('en', params.slug)
  if (!post) return {}

  const rawTitle = post.title + ' | Pronto'
  const title = rawTitle.length > 60 ? post.title.substring(0, 50) + '… | Pronto' : rawTitle
  const canonical = `https://trypronto.app/blog/${post.slug}`

  const languages: Record<string, string> = {
    en: canonical,
  }
  if (post.translations?.es) languages.es = `https://trypronto.app/es/blog/${post.translations.es}`
  if (post.translations?.pt) languages['pt-BR'] = `https://trypronto.app/pt/blog/${post.translations.pt}`

  return {
    title,
    description: post.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description: post.description,
      images: [{ url: 'https://trypronto.app/og-image.png' }],
      locale: 'en_US',
      siteName: 'Pronto',
      publishedTime: post.date,
    },
  }
}

const articleStyles = `
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
.breadcrumb{padding:14px 48px;background:#fafafa;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af}
.breadcrumb a{color:#9ca3af;text-decoration:none}
.breadcrumb a:hover{color:#111}
.breadcrumb span{margin:0 8px}
.article-wrap{max-width:720px;margin:0 auto;padding:64px 48px}
.article-h1{font-size:42px;font-weight:800;line-height:1.1;letter-spacing:-1px;color:#0a0a0a;margin-bottom:20px}
.article-meta{display:flex;gap:14px;align-items:center;font-size:13px;color:#9ca3af;margin-bottom:40px;flex-wrap:wrap}
.article-meta .tag{font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#16a34a;background:#f0fdf4;border:1px solid #bbf7d0;padding:3px 10px;border-radius:12px}
.article-body{font-size:17px;line-height:1.8;color:#1a1a1a}
.article-body h2{font-family:'Bricolage Grotesque',sans-serif;font-size:26px;font-weight:700;color:#0a0a0a;margin:40px 0 16px;letter-spacing:-0.3px}
.article-body h3{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:#0a0a0a;margin:28px 0 10px}
.article-body p{margin-bottom:20px}
.article-body code{background:#f3f4f6;padding:2px 7px;border-radius:4px;font-size:15px;font-family:'Courier New',monospace}
.article-body details{border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-top:40px;background:#fafafa}
.article-body summary{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;cursor:pointer;color:#0a0a0a;list-style:none;padding:4px 0}
.article-body summary::-webkit-details-marker{display:none}
.article-body details[open] summary{margin-bottom:16px}
.article-body details h3{font-size:16px;font-weight:700;color:#0a0a0a;margin:20px 0 8px}
.article-body details p{font-size:15px;line-height:1.7;color:#374151;margin-bottom:16px}
.article-cta{background:#0a0a0a;border-radius:16px;padding:48px;text-align:center;margin:56px 0 0}
.article-cta h2{font-family:'Bricolage Grotesque',sans-serif;font-size:28px;font-weight:800;color:#fff;margin-bottom:12px;letter-spacing:-0.5px}
.article-cta p{font-size:16px;color:#9ca3af;margin-bottom:28px}
.btn-cta-white{background:#fff;color:#111;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:inline-block}
footer{padding:48px;border-top:1px solid #f0f0f0;background:#fff;margin-top:0}
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
@media(max-width:1024px){nav{padding:0 24px}.breadcrumb{padding:14px 24px}.article-wrap{padding:48px 24px}.article-h1{font-size:34px}.footer-top{grid-template-columns:1fr 1fr;gap:24px}footer{padding:48px 24px}}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr}}
@media(max-width:640px){nav{padding:0 16px;height:56px}.nav-right{gap:8px}.btn-nav{font-size:13px;padding:8px 14px}.hide-mob{display:none}.breadcrumb{padding:12px 16px}.article-wrap{padding:36px 16px}.article-h1{font-size:26px;letter-spacing:-0.5px}.article-body{font-size:16px}.article-cta{padding:32px 20px}.article-cta h2{font-size:22px}.footer-top{grid-template-columns:1fr}.footer-bottom{flex-direction:column;align-items:flex-start;gap:16px}footer{padding:32px 16px}}
`

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost('en', params.slug)
  if (!post) notFound()

  const canonical = `https://trypronto.app/blog/${post.slug}`

  const hreflangLinks = [
    `<link rel="alternate" hreflang="en" href="${canonical}" />`,
  ]
  if (post.translations?.es) {
    hreflangLinks.push(`<link rel="alternate" hreflang="es" href="https://trypronto.app/es/blog/${post.translations.es}" />`)
  }
  if (post.translations?.pt) {
    hreflangLinks.push(`<link rel="alternate" hreflang="pt-BR" href="https://trypronto.app/pt/blog/${post.translations.pt}" />`)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Pronto', url: 'https://trypronto.app' },
    publisher: {
      '@type': 'Organization',
      name: 'Pronto',
      url: 'https://trypronto.app',
      logo: { '@type': 'ImageObject', url: 'https://trypronto.app/og-image.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  }

  const enHref = `/blog/${post.slug}`
  const esHref = post.translations?.es ? `/es/blog/${post.translations.es}` : '/es/blog'
  const ptHref = post.translations?.pt ? `/pt/blog/${post.translations.pt}` : '/pt/blog'
  const langSwitcherMap = `{en:'${enHref}',es:'${esHref}',pt:'${ptHref}'}`

  const pageContent = `
<nav>
  <a href="/" class="nav-brand">Pronto<span>.</span></a>
  <div class="nav-right">
    <a href="/pricing" class="nav-link hide-mob">Pricing</a>
    <a href="/login" class="nav-link" onclick="window.gtag&&window.gtag('event','sign_in_click',{location:'navbar',language:'en'})">Sign in</a>
    <select aria-label="Language" onchange="var l=this.value;var m=${langSwitcherMap};if(window.gtag)window.gtag('event','language_switch',{to:l});window.location.href=m[l]||'/';" style="font-size:0.85rem;font-family:inherit;font-weight:500;border:1px solid #d1d5db;border-radius:6px;padding:4px 6px;background:transparent;cursor:pointer;color:inherit;appearance:none;-webkit-appearance:none;min-width:52px;"><option value="en" selected>EN</option><option value="es">ES</option><option value="pt">PT</option></select>
    <a href="/register" class="btn-nav" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'start_free',page:'/blog/${post.slug}'})">Start free</a>
  </div>
</nav>

<div class="breadcrumb">
  <a href="/">Home</a><span>&rsaquo;</span>
  <a href="/blog">Blog</a><span>&rsaquo;</span>
  ${post.title}
</div>

<main>
  <div class="article-wrap">
    <h1 class="article-h1">${post.title}</h1>
    <div class="article-meta">
      <span class="tag">${post.category}</span>
      <span>${formatDate(post.date)}</span>
      <span>${post.readingTime} min read</span>
    </div>
    <div class="article-body">
      ${post.body}
    </div>
    <div class="article-cta">
      <h2>Run your business without paying commissions</h2>
      <p>Free plan forever. No credit card. No booking fee on any plan.</p>
      <a href="/register" class="btn-cta-white" onclick="window.gtag&&window.gtag('event','sign_up_click',{label:'article_cta',page:'/blog/${post.slug}'})">Try Pronto free &rarr;</a>
    </div>
  </div>
</main>

<footer>
  <div class="footer-top">
    <div>
      <a href="/" class="footer-brand">Pronto<span>.</span></a>
      <div class="footer-tagline">Your data, your server.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Product</div>
      <a href="/pricing">Pricing</a>
      <a href="/for">For businesses</a>
      <a href="/blog">Blog</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Compare</div>
      <a href="/vs">All comparisons</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-head">Legal</div>
      <a href="/terms">Terms of Service</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/refund">Refund Policy</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">&copy; 2026 Pronto. All rights reserved.</div>
    <div class="footer-social">
      <a href="https://x.com/prontopos" target="_blank" rel="noopener noreferrer" aria-label="Pronto on X"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
      <a href="https://github.com/SGrappelli/pronto" target="_blank" rel="noopener noreferrer" aria-label="Pronto on GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
    </div>
  </div>
</footer>
`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{ __html: articleStyles }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </>
  )
}
