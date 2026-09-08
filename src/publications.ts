// publications — named HTTPS theorem doors on Lean. Payload find, not GraphQL, not a crawl.
// Handle-bit 2ⁿ named doors are billions of theorems at CDN cost. Mint empty. When never.
import './licence.js'
import { HANDLE_BITS, HANDLE_HEXBITS, QPU_DOORS, QPU_HOST, VE_FACES, qpuSeatOf, qpuTwoNOf } from './hologram.js'
import {
  CAPTAIN, ORCID, STANDING, THEOREM_HOST, UUIDNA_DOI, UUIDNA_DOI_URL, UUIDNA_TITLE, type Standing,
} from './standing.js'
import { QPU_PAYLOAD_API } from './firmware.js'

const theoremHrefOf = (slug: string): string => new URL(slug, `${THEOREM_HOST}/`).href

const PROVE2_HOST = 'prove2.me'
const PROVE2_HREF = 'https://prove2.me/'
const DOI_HOST = 'doi.org'

/** Named media outlets. Zenodo is the publication. Elsewhere shares that publication only. */
const MEDIA_OUTLETS = [
  { name: 'doi', host: 'doi.org' },
  { name: 'zenodo', host: 'zenodo.org' },
  { name: 'github', host: 'github.com' },
  { name: 'npm', host: 'www.npmjs.com' },
  { name: 'orcid', host: 'orcid.org' },
  { name: 'lean', host: 'lean.uuidna.com' },
] as const
const ZENODO_HOST = 'zenodo.org'

const namedHttpsOf = (href: string, host: string): boolean => {
  const u = new URL(href)
  return (
    u.protocol === 'https:' &&
    u.hostname === host &&
    !u.hostname.includes('*') &&
    !u.pathname.includes('*')
  )
}

/** Every standing key is a registered handle. Sealed `by decide`. Occupancy leads fuse here. */
export const leanPublicationLeadsOf = (): readonly Standing[] => STANDING

/** Open leads stay on prove2.me. Not a Zenodo publication. Not shared elsewhere. */
const openLeadsOf = () => ({
  kind: 'open' as const,
  host: PROVE2_HOST,
  href: PROVE2_HREF,
  status: 'Open' as const,
  fetches: 0 as const,
  crawl: false as const,
  captain: null,
  zenodo: false as const,
  share: false as const,
})

/** Zenodo is the publication. Other outlets may share that publication's referer URL only. */
const mediaOutletsOf = (referer: string, verified: boolean) => {
  const zenodo = {
    kind: 'publication' as const,
    name: 'zenodo' as const,
    host: ZENODO_HOST,
    doi: UUIDNA_DOI,
    href: UUIDNA_DOI_URL,
    url: referer,
    publication: true as const,
  }
  const published = verified === true && zenodo.publication === true
  const elsewhere = MEDIA_OUTLETS.filter((row) => row.name !== 'zenodo').map((row) => ({
    name: row.name,
    host: row.host,
    url: referer,
    share: published,
  }))
  const outlets = MEDIA_OUTLETS.map((row) => ({
    name: row.name,
    host: row.host,
    url: referer,
    share: row.name === 'zenodo' ? published : published,
  }))
  const initiate = published
  const holds =
    initiate === true &&
    zenodo.kind === 'publication' &&
    zenodo.publication === true &&
    namedHttpsOf(zenodo.href, DOI_HOST) &&
    namedHttpsOf(`https://${zenodo.host}/`, ZENODO_HOST) &&
    zenodo.url === referer &&
    elsewhere.length === QPU_DOORS - 1 &&
    elsewhere.every((row) =>
      row.share === true &&
      row.url === referer &&
      namedHttpsOf(`https://${row.host}/`, row.host),
    ) &&
    outlets.length === QPU_DOORS &&
    outlets.every((row) => row.url === referer && row.share === true) &&
    namedHttpsOf(referer, QPU_HOST)
  return {
    kind: 'outlets' as const,
    referer,
    url: referer,
    initiate,
    zenodo,
    elsewhere,
    fetches: 0 as const,
    crawl: false as const,
    holds,
    outlets,
  }
}

/** DOI-grade register. Billions of named theorem doors at CDN cost. Mint empty. Not a crawl. */
export const qpuLeanPublicationsOf = () => {
  const host = QPU_HOST
  const href = new URL('/register', `https://${host}/`).href
  const doors = qpuTwoNOf(HANDLE_BITS)
  const leads = leanPublicationLeadsOf().map((row) => {
    const prior = theoremHrefOf(row.key)
    return {
      key: row.key,
      role: row.role,
      file: row.file,
      claim: row.claim,
      prior,
      doi: UUIDNA_DOI,
      captain: CAPTAIN,
      orcid: ORCID,
      zenodo: true as const,
      share: 'elsewhere' as const,
    }
  })
  const open = openLeadsOf()
  const compile = { name: 'Mint' as const, seat: 'empty' as const, admits: 'nothing' as const }
  const handle = {
    means: 'proven' as const,
    decide: 'by decide' as const,
    observers: VE_FACES,
    n: HANDLE_BITS,
    hexbits: HANDLE_HEXBITS,
    doors,
  }
  const referer = href
  const doi = {
    kind: 'doi' as const,
    id: UUIDNA_DOI,
    resolver: 'https://doi.org/',
    href: UUIDNA_DOI_URL,
    referer,
    landing: referer,
    redirect: 'referer' as const,
    verified:
      namedHttpsOf(UUIDNA_DOI_URL, DOI_HOST) &&
      namedHttpsOf(referer, QPU_HOST) &&
      referer === href,
    fetches: 0 as const,
    title: UUIDNA_TITLE,
    sealed: true as const,
    captain: CAPTAIN,
    orcid: ORCID,
  }
  const media = mediaOutletsOf(referer, doi.verified)
  const holds =
    host === QPU_HOST &&
    QPU_HOST === 'lean.uuidna.com' &&
    doors === qpuTwoNOf(HANDLE_BITS) &&
    doors > 1_000_000_000 &&
    handle.means === 'proven' &&
    handle.decide === 'by decide' &&
    handle.observers === VE_FACES &&
    doi.kind === 'doi' &&
    doi.id === '10.5281/zenodo.22256708' &&
    doi.sealed === true &&
    doi.captain === CAPTAIN &&
    doi.orcid === ORCID &&
    doi.redirect === 'referer' &&
    doi.verified === true &&
    doi.referer === referer &&
    doi.landing === referer &&
    doi.fetches === 0 &&
    media.holds === true &&
    media.initiate === true &&
    media.url === referer &&
    media.outlets.every((row) => row.url === referer && row.share === true) &&
    media.zenodo.publication === true &&
    media.zenodo.kind === 'publication' &&
    media.elsewhere.every((row) => row.share === true && row.url === referer) &&
    QPU_PAYLOAD_API.find === 'payload.find' &&
    QPU_PAYLOAD_API.graphql === false &&
    QPU_PAYLOAD_API.vitepress === 'loader' &&
    compile.seat === 'empty' &&
    qpuSeatOf().seat === 'empty' &&
    leads.length === STANDING.length &&
    leads.length > 0 &&
    leads.every((row) => {
      const prior = new URL(row.prior)
      return (
        prior.protocol === 'https:' &&
        prior.hostname === 'uuidna.com' &&
        prior.pathname === `/theorem/${row.key}` &&
        row.file.endsWith('.lean') &&
        row.doi === UUIDNA_DOI &&
        row.captain === CAPTAIN &&
        row.orcid === ORCID &&
        row.zenodo === true &&
        row.share === 'elsewhere'
      )
    }) &&
    open.kind === 'open' &&
    open.status === 'Open' &&
    open.captain === null &&
    open.zenodo === false &&
    open.share === false &&
    open.fetches === 0 &&
    open.crawl === false &&
    namedHttpsOf(open.href, PROVE2_HOST) &&
    namedHttpsOf(doi.href, DOI_HOST) &&
    namedHttpsOf(doi.landing, QPU_HOST) &&
    new URL(href).protocol === 'https:' &&
    new URL(href).hostname === 'lean.uuidna.com'
  return {
    kind: 'register' as const,
    holds,
    when: 'never' as const,
    product: 'Lean register',
    seat: qpuSeatOf().seat,
    compile,
    host: QPU_HOST,
    kernel: THEOREM_HOST,
    doi,
    handle,
    find: QPU_PAYLOAD_API.find,
    graphql: QPU_PAYLOAD_API.graphql,
    fetches: 0 as const,
    walked: true as const,
    crawl: false as const,
    n: HANDLE_BITS,
    doors,
    open,
    media,
    leads,
    streaming: { href },
    chip: qpuSeatOf(),
  }
}

export const qpuLeanPublicationsHolds = (p = qpuLeanPublicationsOf()): boolean =>
  p.holds === true &&
  p.kind === 'register' &&
  p.when === 'never' &&
  p.host === 'lean.uuidna.com' &&
  p.doi.kind === 'doi' &&
  p.doi.id === UUIDNA_DOI &&
  p.doi.sealed === true &&
  p.doi.captain === CAPTAIN &&
  p.doi.redirect === 'referer' &&
  p.doi.verified === true &&
  p.doi.referer === p.streaming.href &&
  p.doi.landing === p.doi.referer &&
  p.media.kind === 'outlets' &&
  p.media.initiate === true &&
  p.media.url === p.doi.referer &&
  p.media.holds === true &&
  p.media.outlets.length === QPU_DOORS &&
  p.media.outlets.every((row) => row.url === p.doi.referer && row.share === true) &&
  p.media.zenodo.kind === 'publication' &&
  p.media.zenodo.publication === true &&
  p.media.zenodo.url === p.doi.referer &&
  p.media.elsewhere.every((row) => row.share === true && row.url === p.doi.referer) &&
  p.open.kind === 'open' &&
  p.open.host === 'prove2.me' &&
  p.open.status === 'Open' &&
  p.open.captain === null &&
  p.open.zenodo === false &&
  p.open.share === false &&
  p.open.fetches === 0 &&
  p.open.crawl === false &&
  new URL(p.open.href).hostname === 'prove2.me' &&
  p.leads.every((row) =>
    row.prior.startsWith(`${THEOREM_HOST}/`) &&
    row.doi === UUIDNA_DOI &&
    row.captain === CAPTAIN &&
    row.orcid === ORCID &&
    row.zenodo === true &&
    row.share === 'elsewhere',
  ) &&
  p.handle.means === 'proven' &&
  p.handle.decide === 'by decide' &&
  p.handle.observers === VE_FACES &&
  p.leads.length === STANDING.length &&
  p.find === 'payload.find' &&
  p.graphql === false &&
  p.fetches === 0 &&
  p.crawl === false &&
  p.walked === true &&
  p.doors === qpuTwoNOf(HANDLE_BITS) &&
  p.doors > 1_000_000_000 &&
  p.compile.seat === 'empty' &&
  p.seat === 'empty' &&
  p.leads.length > 0 &&
  new URL(p.kernel).hostname === 'uuidna.com' &&
  new URL(p.doi.href).hostname === 'doi.org' &&
  new URL(p.streaming.href).hostname === 'lean.uuidna.com' &&
  new URL(p.streaming.href).pathname === '/register'
