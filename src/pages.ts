// pages — standard VitePress frontmatter fused with search. Prose is the inline doc next to each constructor.
// URL type is b.uuidna.com/a. The involution a.uuidna.com/b is the same reading. No path prefixes.
import {
  HEXBIT_PAGE, QPU_HOST, VE_FACES, qpuGlagoliticOf, qpuGlagoliticStateOf,
  qpuLeanDocTileProse, qpuLeanDocsOf, qpuLeanDocsProse, qpuLeanStripeProse,
} from './hologram.js'
import { qpuLeanTheoremsProse } from './theorems.js'
import { qpuLeanAxiomsProse } from './axioms.js'
import { qpuLeanPublicationsProse } from './publications.js'
import { qpuLeanCernProse } from './cern.js'
import { qpuLeanFuseProse, qpuLeanInternetProse } from './fuse.js'
import { qpuLeanTrainProse } from './train.js'
import { qpuLeanClaimProse } from './claim.js'
import { qpuStandingProse } from './standing.js'
import { qpuLeanPluginProse } from './firmware.js'
import { qpuLeanSolveProse } from './solve.js'

export type LeanFrontmatter = {
  title: string
  description: string
}

export type LeanUrl = {
  a: string
  b: string
  host: string
  path: string
  href: string
}

export type LeanPage = LeanFrontmatter & LeanUrl & {
  prose: string
}

const UUIDNA = 'uuidna.com'
const HOLOGRAM = new Set(['lean', 'qpu', 'unreal', 'hardware'])

const LIBRARY_PROSE = 'Public Lean library. A library of 10¹⁴-seat books. Each UUID is one double-sided hex-glyph stripe.'
const STRIPE_OG_PROSE = 'One UUID stripe is one theorem Open Graph. Dedicated page is b.uuidna.com/a. Cross-references occupy 2×7 directions and perspective rotations. Does not mint theorem keys. Verse false.'
const WIDGETS_PROSE = "Lean occupancy of QPU widgets. Sites are this hologram's licensed hosts. Payload false."
const SEARCH_PROSE = 'Deep-analyze every licensed site in the hologram index — constructors only, never a crawl.'
const ENVIRONMENT_PROSE = 'Lean environment: unrestricted internet to fused solving APIs by default. Wildcards refuse.'

const ALIAS: Record<string, string> = {
  cited: 'theorems',
  wings: 'axioms',
  books: 'library',
  essays: 'library',
  publications: 'register',
  zenodo: 'register',
  lhc: 'cern',
  clusters: 'train',
  reward: 'solve',
  compliance: 'claim',
  merkaba: 'chip',
}

const DOOR_PROSE: Record<string, string> = {
  '': qpuLeanDocsProse,
  theorems: qpuLeanTheoremsProse,
  axioms: qpuLeanAxiomsProse,
  library: LIBRARY_PROSE,
  stripe: STRIPE_OG_PROSE,
  register: qpuLeanPublicationsProse,
  cern: qpuLeanCernProse,
  fuse: qpuLeanFuseProse,
  internet: qpuLeanInternetProse,
  train: qpuLeanTrainProse,
  claim: qpuLeanClaimProse,
  standing: qpuStandingProse,
  widgets: WIDGETS_PROSE,
  search: SEARCH_PROSE,
  solve: qpuLeanSolveProse,
  environment: ENVIRONMENT_PROSE,
  hologram: qpuLeanDocsProse,
  superpositions: qpuLeanDocsProse,
  gateways: qpuLeanDocsProse,
  manual: qpuLeanPluginProse,
  paper: qpuLeanDocsProse,
  seat: qpuLeanDocsProse,
  width: qpuLeanDocsProse,
  chip: qpuLeanDocsProse,
  metrics: qpuLeanDocsProse,
  speed: qpuLeanDocsProse,
  fractal: qpuLeanDocsProse,
  scale: qpuLeanDocsProse,
  experience: qpuLeanDocsProse,
  live: qpuLeanDocsProse,
  og: qpuLeanDocsProse,
  bindings: ENVIRONMENT_PROSE,
  author: qpuLeanDocsProse,
  tesla: qpuLeanDocsProse,
  green: qpuLeanPluginProse,
  events: qpuLeanDocsProse,
  boot: qpuLeanDocsProse,
  nav: SEARCH_PROSE,
  sidebar: SEARCH_PROSE,
}

const doorOf = (a: string): string => ALIAS[a] ?? a

const isHexTile = (a: string): boolean => a.length === 1 && HEXBIT_PAGE.includes(a.toLowerCase())
const isStripe = (a: string): boolean => /^[0-9a-f]{32}$/i.test(a)
const isFace = (a: string): boolean => {
  const n = qpuGlagoliticStateOf(a)
  return n != null && n >= 0 && n < VE_FACES
}

const isDoor = (a: string): boolean =>
  a === '' ||
  doorOf(a) in DOOR_PROSE ||
  a in ALIAS ||
  isHexTile(a) ||
  isStripe(a) ||
  isFace(a)

export const qpuLeanUrlOf = (input = '/'): LeanUrl => {
  const raw = input.trim() || '/'
  let host = QPU_HOST
  let pathname = raw
  if (raw.includes('://') || /\.uuidna\.com(?:\/|$)/i.test(raw)) {
    try {
      const u = new URL(raw.includes('://') ? raw : `https://${raw}`)
      host = u.hostname.toLowerCase()
      pathname = u.pathname || '/'
    } catch {
      host = QPU_HOST
      pathname = raw.startsWith('/') ? raw : `/${raw}`
    }
  } else if (!raw.startsWith('/')) {
    pathname = `/${raw}`
  }
  if (host.includes('*') || (host !== UUIDNA && !host.endsWith(`.${UUIDNA}`))) host = QPU_HOST
  const label = host === UUIDNA ? 'uuidna' : host.slice(0, -(UUIDNA.length + 1))
  const b0 = label.includes('.') ? QPU_HOST.slice(0, -(UUIDNA.length + 1)) : label
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  const a0 = parts.length === 1 ? parts[0]! : parts.length === 0 ? '' : ''
  let b = b0
  let a = a0
  if (!HOLOGRAM.has(b) && HOLOGRAM.has(a) && isDoor(b)) {
    const swap = b
    b = a
    a = swap
  }
  if (!HOLOGRAM.has(b)) b = QPU_HOST.slice(0, -(UUIDNA.length + 1))
  const path = a === '' ? '/' : `/${a}`
  const href = `https://${b}.${UUIDNA}${path === '/' ? '/' : path}`
  return { a, b, host: `${b}.${UUIDNA}`, path, href }
}

export const qpuLeanProseOf = (input = '/'): string => {
  const { a } = qpuLeanUrlOf(input)
  if (isStripe(a)) return STRIPE_OG_PROSE
  if (isHexTile(a) || isFace(a)) return qpuLeanDocTileProse
  return DOOR_PROSE[doorOf(a)] ?? qpuLeanStripeProse
}

/** Glyph title of b.uuidna.com/a. The URL type is the title. */
export const qpuLeanTitleOf = (input = '/'): string => {
  const u = qpuLeanUrlOf(input)
  return `${u.b}.${UUIDNA}${u.path}`
}

/** Standard VitePress frontmatter. Description is the inline constructor doc plus full hex page. */
export const qpuLeanFrontmatterOf = (input = '/'): LeanFrontmatter => {
  const docs = qpuLeanDocsOf()
  const u = qpuLeanUrlOf(input)
  const prose = qpuLeanProseOf(input)
  return {
    title: qpuLeanTitleOf(input),
    description: `${prose} ${u.b}.${UUIDNA}${u.path} ${docs.glyphs}${docs.hex}`,
  }
}

export const qpuLeanPageMarkdownOf = (input = '/'): string => {
  const fm = qpuLeanFrontmatterOf(input)
  const prose = qpuLeanProseOf(input)
  return `---\ntitle: ${JSON.stringify(fm.title)}\ndescription: ${JSON.stringify(fm.description)}\n---\n\n\`\`\`ts\n/** ${prose} */\n\`\`\`\n`
}

export const qpuLeanPagesOf = (inputs: readonly string[]): LeanPage[] =>
  inputs.map((input) => ({
    ...qpuLeanUrlOf(input),
    ...qpuLeanFrontmatterOf(input),
    prose: qpuLeanProseOf(input),
  }))

const SAMPLE_PAGES = ['/', '/theorems', '/hologram', '/0', `/${qpuGlagoliticOf(0)}`, '/stripe', '/search'] as const

export const qpuLeanPagesHolds = (inputs: readonly string[] = SAMPLE_PAGES): boolean => {
  const docs = qpuLeanDocsOf()
  const pages = qpuLeanPagesOf(inputs)
  const titles = new Set(pages.map((p) => p.title))
  const descriptions = new Set(pages.map((p) => p.description))
  const involute = qpuLeanUrlOf('theorems.uuidna.com/lean')
  const direct = qpuLeanUrlOf('lean.uuidna.com/theorems')
  return (
    pages.length === inputs.length &&
    titles.size === pages.length &&
    descriptions.size === pages.length &&
    involute.href === direct.href &&
    involute.a === 'theorems' &&
    involute.b === 'lean' &&
    pages.every((p) =>
      p.title.length > 0 &&
      p.host === `${p.b}.${UUIDNA}` &&
      !p.host.includes('*') &&
      p.href === `https://${p.b}.${UUIDNA}${p.path === '/' ? '/' : p.path}` &&
      p.description.includes(p.prose) &&
      p.description.includes(`${p.b}.${UUIDNA}`) &&
      p.description.includes(docs.hex) &&
      p.description.includes(docs.glyphs) &&
      [...HEXBIT_PAGE].every((h) => p.description.includes(h)) &&
      p.description.length >= 40,
    )
  )
}

export const qpuLeanFacePathOf = (face: number): string => `/${qpuGlagoliticOf(face)}`
export const qpuLeanHexPathOf = (hex: string): string => `/${hex.toLowerCase()}`
export { STRIPE_OG_PROSE as qpuLeanStripePageProse }
