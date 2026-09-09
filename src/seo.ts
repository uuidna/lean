// seo — per-route discoverability. Canonical, OG (property=), JSON-LD, sitemap, robots.
// Desk wiring. Does not mint theorem keys or uuidna handles.
import { ORCID, UUIDNA_DOI_URL, CAPTAIN, DATE_RELEASED } from './standing.js'
import { DONATE_URL, qpuLicenceHostOf, QPU_POINTS, VE_FACES, donateUrl, qpuFacesOf, qpuHologramOf, qpuSeatOf } from './hologram.js'
import { qpuOgOf } from './og.js'

export type HeadTuple = [string, Record<string, string>] | [string, Record<string, string>, string]

export type SeoKind = 'home' | 'reading' | 'paper' | 'manual' | 'author' | 'face' | 'gone'

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
const KEYWORDS = [
  'Lean',
  'QPU',
  'quantum processing unit',
  'BindingPoint',
  'hologram',
  'vector equilibrium',
  'Cloudflare Workers',
  'uuidna',
] as const

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
  name: 'Captain coins',
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
  const h = qpuHologramOf()
  const seat = qpuSeatOf()
  const points = QPU_POINTS.join(' ')
  const routes: SeoRoute[] = [
    {
      path: '/',
      kind: 'home',
      jsonAlternate: true,
      title: 'Lean — theorems and axioms',
      description: `Publishing occupancy of uuidna Lean keys on the inner QPU. Seat ${seat.seat}. Theorems and axioms cite; the kernel sealed. Hologram ${h.veFaces} faces and particle 1.`,
    },
    {
      path: '/seat',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU seat — empty',
      description: `The QPU lane is ${seat.seat} and admits ${seat.admits}. A named hole, not a dispatched chip.`,
    },
    {
      path: '/width',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU width — BindingPoint pentagram',
      description: `Width is the smallest of ${points}. A fan-out runs as wide as the binding point and no wider.`,
    },
    {
      path: '/hologram',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU hologram — fourteen faces',
      description: `Sealed planes foundation ${h.foundation}, debit ${h.debit}, credit ${h.credit}, pentagram ${h.pentagram}, fold ${h.fold}, octet ${h.octet}, VE ${h.veFaces}. Each superposition has a referer and perspective angles.`,
    },
    {
      path: '/chip',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU novelty chip — merkaba fusion',
      description: 'Two counter-rotating 7-ray rosettes fused at void 0. CPU and GPU self-balance. Hardware QPU lane stays empty.',
    },
    {
      path: '/merkaba',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU merkaba — two tetrahedra, two rosettes',
      description: 'Eight handle tiles as two tetrahedra of four vertices. Clockwise and counterclockwise ℤ/7 walks share residue 0.',
    },
    {
      path: '/metrics',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU metrics — formula vs peer',
      description: 'Comparable constructor identities. Every formula column must match its peer column.',
    },
    {
      path: '/speed',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU speed — constructor occupancy vs 2^n',
      description: 'How fast this worker occupies 2^n. Every finite IEEE rung is walked, including 2^48 and 2^128. Seat stays empty.',
    },
    {
      path: '/fractal',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU fractal — fused hologram at every scale',
      description: 'Pentagram stroke, hologram planes, fourteen VE faces and one empty center, every provider folder, every serverless lane. Chip stays empty.',
    },
    {
      path: '/scale',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU scale — all serverless',
      description: 'Multiple workers may scale over MCP, WebSockets, SSE, queues, Durable Objects, functions, Lambda, and every fused fetch/run/send lane.',
    },
    {
      path: '/experience',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU experience — inner and outer rotors',
      description: 'Inner CPU clockwise and outer GPU counterclockwise are one involution. Glow 8×3=24 and 8×8=64. Both fuse at residue 0.',
    },
    {
      path: '/live',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU live — occupancy now',
      description: 'Live metrics movie walks k mod 14. Formula versus peer and every speed rung occupy the same fourteen VE faces.',
    },
    {
      path: '/og',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU hero — Open Graph card',
      description: 'The homepage hero is the Open Graph image: a 1200×630 SVG of the BindingPoint pentagram, the empty seat, and fourteen VE faces.',
    },
    {
      path: '/widgets',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean widgets — UUID streams, payload off',
      description: 'Lean occupies licensed-site chrome widgets. UUID streams only. Payload off. Fourteen Glagolitic glyphs and one empty center. Hardware QPU lane stays empty.',
    },
    {
      path: '/bindings',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU bindings — fused environment',
      description: 'src/bindings folders per provider. Every cloud, hardware point, and ISA has a driver. QPU auto-recognizes the live env. The chip named QPU stays empty.',
    },
    {
      path: '/environment',
      kind: 'reading',
      jsonAlternate: true,
      title: 'QPU environment — always fused',
      description: 'Auto-recognized Worker env, host arch, and hardware points fused into one reading. The QPU chip seat admits nothing.',
    },
    {
      path: '/paper',
      kind: 'paper',
      jsonAlternate: false,
      title: 'Lean publishing paper',
      description: `Software overview for @uuidna/lean. Constructors here; Lean proofs on uuidna. ${h.veFaces} faces and particle 1.`,
    },
    {
      path: '/manual',
      kind: 'manual',
      jsonAlternate: false,
      title: 'Lean user manual',
      description: 'Operate the Lean publishing worker: JSON doors for theorems and axioms, VitePress hologram, install, deploy, errors, citation, licence.',
    },
    {
      path: '/author',
      kind: 'author',
      jsonAlternate: false,
      title: `${AUTHOR} — Lean`,
      description: `Author of @uuidna/lean. ORCID ${ORCID}. Captain coins ${DONATE_URL}. Algebra, proof, and claim stay with the uuidna kernel.`,
    },
    {
      path: '/theorems',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean theorems — mint empty',
      description: 'Fourteen sealed uuidna keys on VE faces, eight live theorem tiles, five cite methods, four axiom tracks. Mint empty. This package does not mint keys.',
    },
    {
      path: '/cited',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean cited — same reading as /theorems',
      description: 'Same Lean theorems reading as /theorems. Fourteen sealed keys, eight uuidna.com tiles. Mint empty. Hardware QPU lane stays empty.',
    },
    {
      path: '/axioms',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean axioms — axiom empty',
      description: 'Fourteen uuidna Lean wings on VE faces, eight live /lean tiles, five audit methods, four kernel tracks. Axiom empty. The kernel is axiom-free.',
    },
    {
      path: '/wings',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean wings — same reading as /axioms',
      description: 'Same Lean axioms reading as /axioms. Fourteen .lean files, eight uuidna.com/lean tiles. Axiom empty. Hardware QPU lane stays empty.',
    },
    {
      path: '/register',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean register — DOI handle proven by decide',
      description: 'DOI-grade Lean register. Handle means proven: every standing key sealed by decide for all fourteen observers. Mint empty. Payload find, not GraphQL.',
    },
    {
      path: '/publications',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean publications — same DOI register as /register',
      description: 'Same Lean register reading as /register. Named uuidna.com theorem doors, Zenodo DOI, fourteen observers. Mint empty. Hardware QPU lane stays empty.',
    },
    {
      path: '/library',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean library — 10¹⁴ combinatorial books',
      description: 'Public library of ten choices on fourteen VE lines. Every combination is a book computed at curiosity. Lean leads sealed by decide. No verse stored. Cost 0. When never.',
    },
    {
      path: '/books',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean books — same reading as /library',
      description: 'Same public combinatorial library as /library. Occupancy of 10¹⁴ seats, never stored prose. Hardware QPU lane stays empty.',
    },
    {
      path: '/cern',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean CERN — named HTTPS APIs, mint empty',
      description: 'Fourteen named CERN HTTPS APIs. Leads are the Lean register fused onto INSPIRE literature. Mint empty. Tokens empty. Email empty.',
    },
    {
      path: '/lhc',
      kind: 'reading',
      jsonAlternate: true,
      title: 'Lean LHC — same reading as /cern',
      description: 'Same Lean CERN reading as /cern. Fourteen named CERN HTTPS APIs. Mint empty. Hardware QPU lane stays empty.',
    },
  ]
  for (const f of qpuFacesOf()) {
    routes.push({
      path: `/face/${f.face}`,
      kind: 'face',
      jsonAlternate: false,
      title: `QPU face ${f.face}↔${f.opposite}`,
      description: `Vector-equilibrium face ${f.face} pairs through the void with ${f.opposite}. Fourteen rim glyphs and one empty center. Perspective angles, not a photography lattice.`,
    })
  }
  return routes
}

const jsonLdOf = (r: SeoRoute, canonical: string): Record<string, unknown> => {
  const h = qpuHologramOf()
  const base = {
    '@context': 'https://schema.org',
    url: canonical,
    inLanguage: 'en',
    license: LICENSE,
    author: person(),
    publisher: person(),
    funder: person(),
    isPartOf: { '@type': 'WebSite', name: 'Lean', url: `${originOf()}/` },
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
        name: '@uuidna/lean',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cloudflare Workers',
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
      about: { '@type': 'Thing', name: `VE face ${r.path.slice('/face/'.length)} of ${h.veFaces}` },
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
    const title = titled('No such reading', doc)
    const description = described('This path is not a QPU door.', doc)
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
        ['meta', { property: 'og:site_name', content: 'Lean' }],
        ['meta', { property: 'og:title', content: title }],
        ['meta', { property: 'og:description', content: description }],
        ['meta', { property: 'og:url', content: canonical }],
        ...ogHead(),
        ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)],
      ],
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
        ['meta', { property: 'og:site_name', content: 'Lean' }],
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
