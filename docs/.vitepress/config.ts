// docs/.vitepress/config.ts — nav and sidebar computed from the hologram constructors.
import { defineConfig } from 'vitepress'
import { DONATE_URL, QPU_HOST, donateUrl, qpuHologramOf, qpuSeatOf } from '../../src/hologram.ts'
import { qpuNavOf, qpuSidebarMapOf } from '../../src/chrome.ts'
import { qpuSeoOf } from '../../src/seo.ts'
import { qpuOgDocOf } from '../../src/og.ts'
import { handleQpuFetch } from '../../src/edge.ts'

const ORIGIN = `https://${QPU_HOST}`
const h = qpuHologramOf()
const seat = qpuSeatOf()

const nav = qpuNavOf().map((g) => ({
  text: g.text,
  items: g.items.map((it) => ({ text: it.text, link: it.link })),
}))

const sidebar = qpuSidebarMapOf()

export default defineConfig({
  lang: 'en-US',
  title: 'Lean',
  titleTemplate: ':title · Lean',
  description: `Lean publishing worker. Seat ${seat.seat}. ${h.veFaces} fused theorem faces and particle 1. Captain coins ${DONATE_URL}.`,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  sitemap: { hostname: ORIGIN },
  head: [
    ['link', { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'payment', href: donateUrl(ORIGIN) }],
    ['link', { rel: 'me', href: DONATE_URL }],
    ['meta', { name: 'funding', content: DONATE_URL }],
    ['meta', { name: 'citation_funding_url', content: DONATE_URL }],
    ['meta', { property: 'og:see_also', content: DONATE_URL }],
    ['meta', { name: 'theme-color', content: '#6b46e5' }],
  ],
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: true,
    headers: { level: [2, 3, 4, 5, 6] },
  },
  themeConfig: {
    siteTitle: 'Lean',
    logo: '/icon.svg',
    nav,
    sidebar,
    search: false,
    outline: { level: 'deep', label: 'On this plane' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/uuidna/lean', ariaLabel: 'lean source' },
      { icon: 'github', link: 'https://github.com/uuidna/uuidna', ariaLabel: 'uuidna ledger' },
    ],
    editLink: {
      pattern: 'https://github.com/uuidna/lean/edit/main/docs/:path',
      text: 'Edit this plane',
    },
    lastUpdated: { text: 'Measured' },
    docFooter: { prev: 'Previous plane', next: 'Next plane' },
    footer: {
      message: 'CC BY-NC-ND 4.0 · proofs on uuidna',
      copyright: `© Tsvetan Rouschev · ${donateUrl(ORIGIN)}`,
    },
    externalLinkIcon: true,
    returnToTopLabel: 'Foundation 0',
    darkModeSwitchTitle: 'Fold to dark',
    lightModeSwitchTitle: 'Fold to light',
    sidebarMenuLabel: 'Hologram',
    skipToContentLabel: 'Skip to reading',
  },
  async transformPageData(page) {
    page.frontmatter = page.frontmatter ?? {}
    const route = '/' + page.relativePath.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')
    const path = route === '' ? '/' : route
    page.frontmatter.qpuPath = path
    const params = page.params as Record<string, string> | undefined
    const door = params?.n != null ? `/face/${params.n}` : path
    const res = await handleQpuFetch(new Request(`https://${QPU_HOST}${door}?at=0`, {
      headers: { accept: 'application/json' },
    }))
    if (res.ok && (res.headers.get('content-type') ?? '').includes('json')) {
      const body = await res.json() as { error?: string }
      if (!body.error) page.frontmatter.reading = body
    }
    const doc = qpuOgDocOf({
      title: page.frontmatter.title ?? page.title,
      description: page.frontmatter.description ?? page.description,
      hero: page.frontmatter.hero,
      params,
    })
    if (doc.title) {
      page.title = doc.title
      page.frontmatter.title = doc.title
    }
    if (doc.description) {
      page.description = doc.description
      page.frontmatter.description = doc.description
    }
    const seo = qpuSeoOf(path, doc)
    page.frontmatter.head = [...(page.frontmatter.head ?? []), ...seo.head]
  },
})
