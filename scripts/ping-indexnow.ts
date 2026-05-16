import { parseStringPromise } from 'xml2js'

async function pingIndexNow() {
  const key = 'a14b5fcc996f4ec594e540ef29fc3091'
  const host = 'trypronto.app'
  const keyLocation = `https://${host}/${key}.txt`

  // Fetch sitemap
  const sitemapRes = await fetch('https://trypronto.app/sitemap.xml')
  const sitemapXml = await sitemapRes.text()

  // Parse URLs
  const parsed = await parseStringPromise(sitemapXml)
  const urls: string[] = parsed.urlset.url.map((u: any) => u.loc[0])

  console.log(`Submitting ${urls.length} URLs to IndexNow...`)

  // Submit
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
  })

  console.log(`IndexNow response: ${res.status} ${res.statusText}`)

  // 200 = OK (some engines), 202 = Accepted (IndexNow batch standard)
  if (res.status === 200 || res.status === 202) {
    console.log(`✅ Successfully submitted ${urls.length} URLs`)
  } else {
    const text = await res.text()
    console.error('❌ Submission failed:', text)
    process.exit(1)
  }
}

pingIndexNow().catch(console.error)
