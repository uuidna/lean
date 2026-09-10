// docs/.vitepress/config.ts — documented VitePress options. Frontmatter fused with local search.
import { defineConfig } from 'vitepress'
import { DONATE_URL, QPU_HOST, donateUrl, qpuLeanDocsOf } from '../../src/hologram.ts'
import { qpuNavOf, qpuSidebarMapOf } from '../../src/chrome.ts'
import { qpuSeoOf } from '../../src/seo.ts'
import { qpuLeanFrontmatterOf } from '../../src/pages.ts'

const ORIGIN = `https://${QPU_HOST}`
const docs = qpuLeanDocsOf()
const home = qpuLeanFrontmatterOf('/')

const nav = qpuNavOf().map((g) => ({
  text: g.text,
  items: g.items.map((it) => ({ text: it.text, link: it.link })),
}))

const sidebar = qpuSidebarMapOf()

export default defineConfig({
  lang: 'en-US',
  title: docs.glyphs,
  titleTemplate: ':title',
  description: home.description,
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
  ],
  themeConfig: {
    siteTitle: docs.glyphs,
    logo: '/icon.svg',
    nav,
    sidebar,
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/uuidna/lean', ariaLabel: 'lean source' },
      { icon: 'github', link: 'https://github.com/uuidna/uuidna', ariaLabel: 'uuidna ledger' },
    ],
    editLink: {
      pattern: 'https://github.com/uuidna/lean/edit/main/docs/:path',
    },
    externalLinkIcon: true,
  },
  transformPageData(page) {
    page.frontmatter = page.frontmatter ?? {}
    const route = '/' + page.relativePath.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')
    const path = route === '' ? '/' : route
    const params = page.params as Record<string, string> | undefined
    const door = params?.a != null ? `/${params.a}` : path
    const fm = qpuLeanFrontmatterOf(door)
    page.title = fm.title
    page.description = fm.description
    page.frontmatter.title = fm.title
    page.frontmatter.description = fm.description
    const seo = qpuSeoOf(door)
    page.frontmatter.head = [...(page.frontmatter.head ?? []), ...seo.head]
  },
})
