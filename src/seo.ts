// seo — per-route discoverability. Canonical, OG (property=), JSON-LD, sitemap, robots.
// Desk wiring. Does not mint theorem keys or uuidna handles.
import { ORCID, UUIDNA_DOI_URL, CAPTAIN, DATE_RELEASED } from './standing.js'
import { DONATE_URL, HEXBIT_PAGE, qpuLicenceHostOf, donateUrl, qpuFacesOf, qpuGlagoliticOf, qpuLeanDocsOf } from './hologram.js'
import { qpuOgOf } from './og.js'
import { qpuLeanFrontmatterOf } from './pages.js'

export type HeadTuple = [string, Record<string, string>] | [string, Record<string, string>, string]

export type SeoKind = 'home' | 'reading' | 'paper' | 'manual' | 'author' | 'face' | 'stripe' | 'gone'

export interface SeoRoute {
  path: string
  title: string
  description: string
  kind: SeoKind
  jsonAlternate: boolean
}

export interface QpuSeo {
  route: string
  canonical: string
  title: string
  description: string
  keywords: string[]
  kind: SeoKind
  jsonLd: Record<string, unknown>
  head: HeadTuple[]
}

const originOf = (): string => `https://${qpuLicenceHostOf()}`
const LICENSE = 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
const AUTHOR = CAPTAIN
const KEYWORDS = [...HEXBIT_PAGE]

const xmlEscape = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const routeOf = (path: string): string => {
  const p = path.trim() || '/'
  if (p === '/' || p === '') return '/'
  return p.replace(/\/+$/, '')
}

const person = () => ({
  '@type': 'Person',
  name: AUTHOR,
  identifier: `https://orcid.org/${ORCID}`,
  email: 'ceccec@psg.bg',
  url: `${originOf()}/author`,
  sameAs: [
    `https://orcid.org/${ORCID}`,
    DONATE_URL,
    'https://github.com/ceccec',
  ],
})

const donateAction = (canonical: string) => ({
  '@type': 'DonateAction',
  name: qpuLeanDocsOf().glyphs,
  target: donateUrl(canonical),
  recipient: person(),
})

const revolutHead = (canonical: string): HeadTuple[] => [
  ['link', { rel: 'payment', href: donateUrl(canonical) }],
  ['link', { rel: 'me', href: DONATE_URL }],
  ['meta', { name: 'funding', content: DONATE_URL }],
  ['meta', { name: 'citation_funding_url', content: DONATE_URL }],
  ['meta', { property: 'og:see_also', content: DONATE_URL }],
]

const ogHead = (): HeadTuple[] => {
  const og = qpuOgOf()
  return [
    ['meta', { property: 'og:image', content: og.href }],
    ['meta', { property: 'og:image:width', content: String(og.width) }],
    ['meta', { property: 'og:image:height', content: String(og.height) }],
    ['meta', { property: 'og:image:type', content: og.type }],
    ['meta', { property: 'og:image:alt', content: og.alt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: og.href }],
    ['meta', { name: 'twitter:image:alt', content: og.alt }],
    ['link', { rel: 'image_src', href: og.href }],
  ]
}

const ogImageLd = () => {
  const og = qpuOgOf()
  return {
    '@type': 'ImageObject',
    url: og.href,
    contentUrl: og.href,
    width: og.width,
    height: og.height,
    encodingFormat: og.type,
    caption: og.alt,
  }
}

export const qpuRoutesOf = (): SeoRoute[] => {
  const doors: Omit<SeoRoute, 'title' | 'description'>[] = [
    { path: '/', kind: 'home', jsonAlternate: true },
    { path: '/seat', kind: 'reading', jsonAlternate: true },
    { path: '/width', kind: 'reading', jsonAlternate: true },
    { path: '/hologram', kind: 'reading', jsonAlternate: true },
    { path: '/chip', kind: 'reading', jsonAlternate: true },
    { path: '/merkaba', kind: 'reading', jsonAlternate: true },
    { path: '/metrics', kind: 'reading', jsonAlternate: true },
    { path: '/speed', kind: 'reading', jsonAlternate: true },
    { path: '/fractal', kind: 'reading', jsonAlternate: true },
    { path: '/scale', kind: 'reading', jsonAlternate: true },
    { path: '/experience', kind: 'reading', jsonAlternate: true },
    { path: '/live', kind: 'reading', jsonAlternate: true },
    { path: '/og', kind: 'reading', jsonAlternate: true },
    { path: '/widgets', kind: 'reading', jsonAlternate: true },
    { path: '/bindings', kind: 'reading', jsonAlternate: true },
    { path: '/environment', kind: 'reading', jsonAlternate: true },
    { path: '/paper', kind: 'paper', jsonAlternate: false },
    { path: '/manual', kind: 'manual', jsonAlternate: false },
    { path: '/author', kind: 'author', jsonAlternate: false },
    { path: '/theorems', kind: 'reading', jsonAlternate: true },
    { path: '/cited', kind: 'reading', jsonAlternate: true },
    { path: '/axioms', kind: 'reading', jsonAlternate: true },
    { path: '/wings', kind: 'reading', jsonAlternate: true },
    { path: '/register', kind: 'reading', jsonAlternate: true },
    { path: '/publications', kind: 'reading', jsonAlternate: true },
    { path: '/library', kind: 'reading', jsonAlternate: true },
    { path: '/books', kind: 'reading', jsonAlternate: true },
    { path: '/essays', kind: 'reading', jsonAlternate: true },
    { path: '/stripe', kind: 'reading', jsonAlternate: true },
    { path: '/cern', kind: 'reading', jsonAlternate: true },
    { path: '/lhc', kind: 'reading', jsonAlternate: true },
    { path: '/zenodo', kind: 'reading', jsonAlternate: true },
    { path: '/fuse', kind: 'reading', jsonAlternate: true },
    { path: '/internet', kind: 'reading', jsonAlternate: true },
    { path: '/train', kind: 'reading', jsonAlternate: true },
    { path: '/clusters', kind: 'reading', jsonAlternate: true },
    { path: '/tesla', kind: 'reading', jsonAlternate: true },
    { path: '/solve', kind: 'reading', jsonAlternate: true },
    { path: '/reward', kind: 'reading', jsonAlternate: true },
    { path: '/claim', kind: 'reading', jsonAlternate: true },
    { path: '/compliance', kind: 'reading', jsonAlternate: true },
    { path: '/green', kind: 'reading', jsonAlternate: true },
    { path: '/superpositions', kind: 'reading', jsonAlternate: true },
    { path: '/gateways', kind: 'reading', jsonAlternate: true },
    { path: '/standing', kind: 'reading', jsonAlternate: true },
    { path: '/events', kind: 'reading', jsonAlternate: true },
    { path: '/boot', kind: 'reading', jsonAlternate: true },
    { path: '/nav', kind: 'reading', jsonAlternate: true },
    { path: '/sidebar', kind: 'reading', jsonAlternate: true },
    { path: '/search', kind: 'reading', jsonAlternate: true },
  ]
  for (const f of qpuFacesOf()) {
    doors.push({ path: `/${qpuGlagoliticOf(f.face)}`, kind: 'face', jsonAlternate: false })
  }
  for (const h of HEXBIT_PAGE) {
    doors.push({ path: `/${h}`, kind: 'reading', jsonAlternate: true })
  }
  return doors.map((r) => {
    const fm = qpuLeanFrontmatterOf(r.path)
    return { ...r, title: fm.title, description: fm.description }
  })
}


const jsonLdOf = (r: SeoRoute, canonical: string): Record<string, unknown> => {
  const base = {
    '@context': 'https://schema.org',
    url: canonical,
    inLanguage: qpuLeanDocsOf().hex,
    license: LICENSE,
    author: person(),
    publisher: person(),
    funder: person(),
    isPartOf: { '@type': 'WebSite', name: qpuLeanDocsOf().glyphs, url: `${originOf()}/` },
    isBasedOn: UUIDNA_DOI_URL,
    identifier: [originOf()],
    potentialAction: donateAction(canonical),
    image: ogImageLd(),
  }
  if (r.kind === 'home') {
    return {
      ...base,
      '@type': 'WebSite',
      name: r.title,
      description: r.description,
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: qpuLeanDocsOf().glyphs,
        url: `${originOf()}/`,
        codeRepository: 'https://github.com/uuidna/lean',
        license: LICENSE,
        funding: { '@type': 'Grant', url: DONATE_URL, identifier: DONATE_URL },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    }
  }
  if (r.kind === 'paper') {
    return {
      ...base,
      '@type': 'ScholarlyArticle',
      headline: r.title,
      abstract: r.description,
      keywords: KEYWORDS.join(', '),
    }
  }
  if (r.kind === 'manual') {
    return { ...base, '@type': 'TechArticle', headline: r.title, abstract: r.description }
  }
  if (r.kind === 'author') {
    return { ...base, '@type': 'ProfilePage', mainEntity: person() }
  }
  if (r.kind === 'face') {
    return {
      ...base,
      '@type': 'WebPage',
      name: r.title,
      description: r.description,
      about: { '@type': 'Thing', name: r.title },
    }
  }
  if (r.kind === 'stripe') {
    return {
      ...base,
      '@type': 'WebPage',
      name: r.title,
      description: r.description,
      about: { '@type': 'Thing', name: 'UUID hex-glyph stripe' },
      citation: UUIDNA_DOI_URL,
    }
  }
  return {
    ...base,
    '@type': 'WebPage',
    name: r.title,
    description: r.description,
    potentialAction: r.jsonAlternate
      ? [
          donateAction(canonical),
          {
            '@type': 'ViewAction',
            target: [
              { '@type': 'EntryPoint', urlTemplate: canonical, contentType: 'text/html' },
              { '@type': 'EntryPoint', urlTemplate: canonical, contentType: 'application/json' },
            ],
          },
        ]
      : donateAction(canonical),
  }
}

export type SeoDoc = { title?: string; description?: string }

const titled = (fallback: string, doc?: SeoDoc): string => doc?.title?.trim() || fallback
const described = (fallback: string, doc?: SeoDoc): string => doc?.description?.trim() || fallback

export const qpuSeoOf = (path: string, doc?: SeoDoc): QpuSeo => {
  const route = routeOf(path)
  if (route === '/404' || route.endsWith('/404')) {
    const canonical = `${originOf()}/404`
    const fm = qpuLeanFrontmatterOf('/404')
    const title = titled(fm.title, doc)
    const description = described(fm.description, doc)
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonical,
      funder: person(),
      potentialAction: donateAction(canonical),
      image: ogImageLd(),
    }
    return {
      route: '/404',
      canonical,
      title,
      description,
      keywords: [...KEYWORDS],
      kind: 'gone',
      jsonLd,
      head: [
        ['link', { rel: 'canonical', href: canonical }],
        ['meta', { name: 'robots', content: 'noindex, nofollow' }],
        ['meta', { name: 'description', content: description }],
        ...revolutHead(canonical),
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: qpuLeanDocsOf().glyphs }],
        ['meta', { property: 'og:title', content: title }],
        ['meta', { property: 'og:description', content: description }],
        ['meta', { property: 'og:url', content: canonical }],
        ...ogHead(),
        ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)],
      ],
    }
  }
  const stripe = /^\/([0-9a-f]{32})$/i.exec(route)
  if (stripe) {
    const hex = stripe[1]!.toLowerCase()
    const r: SeoRoute = {
      path: `/${hex}`,
      kind: 'stripe',
      jsonAlternate: true,
      title: titled(qpuLeanFrontmatterOf(`/${hex}`).title, doc),
      description: described(qpuLeanFrontmatterOf(`/${hex}`).description, doc),
    }
    const canonical = `${originOf()}${r.path}`
    const ld = jsonLdOf(r, canonical)
    const head: HeadTuple[] = [
      ['link', { rel: 'canonical', href: canonical }],
      ['link', { rel: 'alternate', href: canonical, hreflang: 'en' }],
      ['link', { rel: 'alternate', href: canonical, hreflang: 'x-default' }],
      ['link', { rel: 'alternate', type: 'application/json', href: canonical }],
      ['link', { rel: 'license', href: LICENSE }],
      ...revolutHead(canonical),
      ['meta', { name: 'description', content: r.description }],
      ['meta', { name: 'keywords', content: KEYWORDS.join(', ') }],
      ['meta', { name: 'author', content: AUTHOR }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:site_name', content: qpuLeanDocsOf().glyphs }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:title', content: r.title }],
      ['meta', { property: 'og:description', content: r.description }],
      ['meta', { property: 'og:url', content: canonical }],
      ...ogHead(),
      ['meta', { name: 'twitter:title', content: r.title }],
      ['meta', { name: 'twitter:description', content: r.description }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(ld)],
    ]
    return {
      route: r.path,
      canonical,
      title: r.title,
      description: r.description,
      keywords: [...KEYWORDS],
      kind: r.kind,
      jsonLd: ld,
      head,
    }
  }
  const r = qpuRoutesOf().find((x) => x.path === route)
  if (!r) {
    return qpuSeoOf('/404')
  }
  const reading: SeoRoute = {
    ...r,
    title: titled(r.title, doc),
    description: described(r.description, doc),
  }
  const canonical = reading.path === '/' ? `${originOf()}/` : `${originOf()}${reading.path}`
  const ld = jsonLdOf(reading, canonical)
  const ogType = reading.kind === 'home' ? 'website' : reading.kind === 'paper' ? 'article' : 'website'
  const head: HeadTuple[] = [
    ['link', { rel: 'canonical', href: canonical }],
    ['link', { rel: 'alternate', href: canonical, hreflang: 'en' }],
    ['link', { rel: 'alternate', href: canonical, hreflang: 'x-default' }],
    ['link', { rel: 'license', href: LICENSE }],
    ...revolutHead(canonical),
    ['meta', { name: 'description', content: reading.description }],
    ['meta', { name: 'keywords', content: KEYWORDS.join(', ') }],
    ['meta', { name: 'author', content: AUTHOR }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:type', content: ogType }],
        ['meta', { property: 'og:site_name', content: qpuLeanDocsOf().glyphs }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:title', content: reading.title }],
    ['meta', { property: 'og:description', content: reading.description }],
    ['meta', { property: 'og:url', content: canonical }],
    ...ogHead(),
    ['meta', { name: 'twitter:title', content: reading.title }],
    ['meta', { name: 'twitter:description', content: reading.description }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(ld)],
  ]
  if (reading.jsonAlternate) {
    head.splice(3, 0, ['link', { rel: 'alternate', type: 'application/json', href: canonical }])
  }
  if (reading.kind === 'paper') {
    head.push(
      ['meta', { name: 'citation_title', content: reading.title }],
      ['meta', { name: 'citation_author', content: AUTHOR }],
      ['meta', { name: 'citation_publication_date', content: DATE_RELEASED }],
    )
  }
  return {
    route: reading.path,
    canonical,
    title: reading.title,
    description: reading.description,
    keywords: [...KEYWORDS],
    kind: reading.kind,
    jsonLd: ld,
    head,
  }
}

export const SEO_OG_REQUIRED = [
  'og:title', 'og:description', 'og:url', 'og:type', 'og:image', 'og:site_name',
  'og:image:width', 'og:image:height', 'og:image:type', 'og:image:alt',
] as const

export const qpuSeoGaps = (seo: QpuSeo): string[] => {
  const missing: string[] = []
  if (!seo.head.some((h) => h[0] === 'link' && h[1].rel === 'canonical')) missing.push('link[rel=canonical]')
  for (const p of SEO_OG_REQUIRED) {
    if (!seo.head.some((h) => h[0] === 'meta' && h[1].property === p)) missing.push(`meta[property=${p}]`)
  }
  for (const h of seo.head) {
    if (h[0] === 'meta' && (h[1].name ?? '').startsWith('og:')) missing.push(`og uses name= (${h[1].name})`)
  }
  if (!seo.head.some((h) => h[0] === 'script' && h[1].type === 'application/ld+json')) missing.push('JSON-LD')
  if (typeof seo.jsonLd['@type'] !== 'string') missing.push('jsonLd.@type')
  if (typeof (seo.jsonLd.image as { url?: string } | undefined)?.url !== 'string') missing.push('jsonLd.image')
  if (!seo.canonical.startsWith(originOf())) missing.push('canonical host')
  if (!seo.title.trim()) missing.push('title')
  if (!seo.description.trim()) missing.push('description')
  if (!seo.head.some((h) => h[0] === 'link' && h[1].rel === 'payment' && (h[1].href ?? '').includes('revolut.me')))
    missing.push('link[rel=payment] revolut')
  if (!seo.head.some((h) => h[0] === 'meta' && h[1].name === 'funding' && (h[1].content ?? '').includes('revolut.me')))
    missing.push('meta[name=funding] revolut')
  if (!JSON.stringify(seo.jsonLd).includes('revolut.me')) missing.push('JSON-LD revolut')
  if (seo.kind !== 'gone' && seo.description.length < 40) missing.push('description short')
  return missing
}

export const qpuSitemapOf = (): { loc: string; path: string }[] =>
  qpuRoutesOf().map((r) => ({
    path: r.path,
    loc: r.path === '/' ? `${originOf()}/` : `${originOf()}${r.path}`,
  }))

export const qpuSitemapXmlOf = (): string => {
  const urls = qpuSitemapOf()
    .map((u) => `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export const qpuRobotsTxtOf = (): string =>
  `User-agent: *\nAllow: /\nSitemap: ${originOf()}/sitemap.xml\n`

export const qpuSeoAuditOf = (): { ok: boolean; pages: number; gaps: { path: string; missing: string[] }[] } => {
  const titles = new Set<string>()
  const descriptions = new Set<string>()
  const gaps: { path: string; missing: string[] }[] = []
  for (const r of qpuRoutesOf()) {
    const seo = qpuSeoOf(r.path)
    const missing = qpuSeoGaps(seo)
    if (titles.has(seo.title)) missing.push('duplicate title')
    if (descriptions.has(seo.description)) missing.push('duplicate description')
    titles.add(seo.title)
    descriptions.add(seo.description)
    if (missing.length) gaps.push({ path: r.path, missing })
  }
  const gone = qpuSeoGaps(qpuSeoOf('/404'))
  if (gone.length) gaps.push({ path: '/404', missing: gone })
  const map = qpuSitemapOf()
  if (map.some((u) => u.path.includes('404'))) gaps.push({ path: '/sitemap.xml', missing: ['404 in sitemap'] })
  if (map.length !== qpuRoutesOf().length) gaps.push({ path: '/sitemap.xml', missing: ['count drift'] })
  if (!qpuRobotsTxtOf().includes(`${originOf()}/sitemap.xml`)) gaps.push({ path: '/robots.txt', missing: ['sitemap line'] })
  return { ok: gaps.length === 0, pages: qpuRoutesOf().length, gaps }
}
