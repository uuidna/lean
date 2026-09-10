// cern — Lean occupancy of named CERN HTTPS APIs. Leads are the Lean register.
// INSPIRE nine collections plus five CERN open doors occupy VE faces. Full capacity.
// This package does not crawl, does not mint tokens, and does not collect emails.
// Analysis Preservation stays off this hologram: it requires an access token.
// GET /cited stays theorems. Full /cern does not steal /cited. Short /ce cannot be a chrome door.
// GET /leap stays trading. Full /lhc does not steal /leap /live. Short /lh cannot be a chrome door.
// This reading is /cern (alias /lhc). Mint empty. Hardware QPU lane stays empty.
import './licence.js'
import {
  HANDLE_HEXBITS, QPU_POINTS, TETRA, VE_FACES, qpuFacesOf, qpuLicenceHostOf, qpuSeatOf, qpuStarStrokeOf,
  qpuSuperpositionsOf, qpuTwoNOf,
} from './hologram.js'
import { qpuLeanPublicationsOf } from './publications.js'

const namedHttpsOf = (host: string, path: string): string => {
  if (!host.includes('.') || host.includes('*') || path.includes('*') || !path.startsWith('/')) {
    throw new Error('fuse: named door only')
  }
  const u = new URL(path, `https://${host}/`)
  if (u.protocol !== 'https:' || u.hostname !== host) throw new Error('fuse: named domain only')
  return u.href
}

/** INSPIRE REST collections. Read-only GET. Prefix website paths with /api/. */
export const CERN_INSPIRE_COLLECTIONS = [
  'literature',
  'authors',
  'institutions',
  'conferences',
  'seminars',
  'journals',
  'jobs',
  'experiments',
  'data',
] as const

/** CERN-born or CERN-operated open JSON doors. No access token. */
export const CERN_OPEN_APIS = [
  { name: 'opendata', host: 'opendata.cern.ch', path: '/api/records' },
  { name: 'repository', host: 'repository.cern', path: '/api/records' },
  { name: 'zenodo', host: 'zenodo.org', path: '/api/records' },
  { name: 'hepdata', host: 'www.hepdata.net', path: '/search' },
  { name: 'indico', host: 'indico.cern.ch', path: '/export/categ/0.json' },
] as const

/** Eight live CERN tiles. Census hrefs stay on named CERN HTTPS. */
export const CERN_CENSUS = [
  { name: 'home', host: 'home.cern', path: '/' },
  { name: 'opendata', host: 'opendata.cern.ch', path: '/' },
  { name: 'inspire', host: 'inspirehep.net', path: '/' },
  { name: 'repository', host: 'repository.cern', path: '/' },
  { name: 'zenodo', host: 'zenodo.org', path: '/' },
  { name: 'hepdata', host: 'www.hepdata.net', path: '/' },
  { name: 'indico', host: 'indico.cern.ch', path: '/' },
  { name: 'root', host: 'root.cern', path: '/' },
] as const

/** Four LHC experiments occupy tetra tracks. */
export const CERN_EXPERIMENTS = ['ATLAS', 'CMS', 'ALICE', 'LHCb'] as const

export const CERN_METHODS = QPU_POINTS

const QUANTUM_FILE = 'Quantum.lean'
const literatureHref = namedHttpsOf('inspirehep.net', '/api/literature')

const quantumFileFirst = (a: string, b: string): number => {
  if (a === QUANTUM_FILE && b !== QUANTUM_FILE) return -1
  if (b === QUANTUM_FILE && a !== QUANTUM_FILE) return 1
  return a < b ? -1 : a > b ? 1 : 0
}

const apisOf = () => {
  const lattice = qpuFacesOf()
  const inspire = CERN_INSPIRE_COLLECTIONS.map((name, i) => ({
    name,
    host: 'inspirehep.net',
    path: `/api/${name}`,
    href: namedHttpsOf('inspirehep.net', `/api/${name}`),
    lane: 'inspire' as const,
    face: lattice[i]!.face,
    opposite: lattice[i]!.opposite,
    free: true as const,
    keyless: true as const,
    fetches: 0 as const,
  }))
  const open = CERN_OPEN_APIS.map((row, i) => {
    const face = lattice[inspire.length + i]!
    return {
      name: row.name,
      host: row.host,
      path: row.path,
      href: namedHttpsOf(row.host, row.path),
      lane: 'open' as const,
      face: face.face,
      opposite: face.opposite,
      free: true as const,
      keyless: true as const,
      fetches: 0 as const,
    }
  })
  return [...inspire, ...open]
}

const goneOf = (face: number) => ({
  kind: 'cern' as const,
  holds: false,
  when: 'never' as const,
  error: 'no such reading' as const,
  face,
  seat: qpuSeatOf().seat,
  fetches: 0 as const,
})

/** Lean CERN. Leads are the Lean register fused onto INSPIRE literature. Mint empty. */
export const qpuLeanCernProse = 'Lean CERN. Leads are the Lean register fused onto INSPIRE literature. Mint empty.'
export const qpuLeanCernOf = (face?: number) => {
  if (face !== undefined && (!Number.isInteger(face) || face < 0 || face >= VE_FACES)) return goneOf(face)
  const host = qpuLicenceHostOf()
  const href = namedHttpsOf(host, '/cern')
  const publications = qpuLeanPublicationsOf()
  const posted = [...publications.leads].sort((a, b) => {
    const files = quantumFileFirst(a.file, b.file)
    return files !== 0 ? files : a.key < b.key ? -1 : a.key > b.key ? 1 : 0
  })
  const apis = apisOf()
  const census = CERN_CENSUS.map((row) => ({
    name: row.name,
    host: row.host,
    href: namedHttpsOf(row.host, row.path),
  }))
  const methods = CERN_METHODS.map((name, i) => ({
    name,
    point: QPU_POINTS[i]!,
  }))
  const tracks = CERN_EXPERIMENTS.map((name, i) => ({
    name,
    vertex: i,
  }))
  const stroke = qpuStarStrokeOf()
  const tiles = qpuSuperpositionsOf()
  const leads = posted.map((row, i) => {
    const plane = i % VE_FACES
    const tile = tiles[plane]!
    return {
      key: row.key,
      role: row.role,
      claim: row.claim,
      file: row.file,
      prior: row.prior,
      face: plane,
      door: tile.door,
      bend: stroke[i % stroke.length]!,
      inspire: literatureHref,
    }
  })
  const emails = false as const
  const tokens = false as const
  const invented = false as const
  const preservation = { host: 'analysispreservation.cern.ch', token: false as const, occupied: false as const }
  const mint = { name: 'Mint' as const, seat: 'empty' as const, admits: 'nothing' as const }
  const selected = face === undefined ? apis[0]! : apis[face]!
  const dumped = JSON.stringify({ apis, census, methods, tracks })
  const confidential =
    dumped.includes('access_token') === false &&
    dumped.includes('Authorization') === false
  const holds =
    apis.length === VE_FACES &&
    CERN_INSPIRE_COLLECTIONS.length + CERN_OPEN_APIS.length === VE_FACES &&
    census.length === HANDLE_HEXBITS &&
    methods.length === QPU_POINTS.length &&
    tracks.length === TETRA &&
    new Set(apis.map((row) => row.href)).size === VE_FACES &&
    apis.every((row) => {
      const u = new URL(row.href)
      return (
        row.free === true &&
        row.keyless === true &&
        row.fetches === 0 &&
        u.protocol === 'https:' &&
        u.hostname === row.host &&
        !u.hostname.includes('*') &&
        !u.pathname.includes('*')
      )
    }) &&
    census.every((row) => {
      const u = new URL(row.href)
      return u.protocol === 'https:' && u.hostname === row.host && !u.hostname.includes('*')
    }) &&
    publications.holds === true &&
    leads.length === publications.leads.length &&
    leads.length >= VE_FACES &&
    leads[0]!.file === QUANTUM_FILE &&
    leads.every((row) => {
      const prior = new URL(row.prior)
      return (
        row.inspire === literatureHref &&
        prior.protocol === 'https:' &&
        prior.hostname === 'uuidna.com' &&
        prior.pathname === `/theorem/${row.key}` &&
        row.file.endsWith('.lean')
      )
    }) &&
    emails === false &&
    tokens === false &&
    invented === false &&
    mint.seat === 'empty' &&
    preservation.token === false &&
    preservation.occupied === false &&
    confidential === true &&
    qpuSeatOf().seat === 'empty' &&
    new URL(href).hostname === host
  return {
    name: 'QPU' as const,
    product: 'Lean CERN',
    kind: 'cern' as const,
    derived: 'lean' as const,
    source: 'live-api' as const,
    invented,
    holds,
    when: 'never' as const,
    fetches: 0 as const,
    hardware: 'any' as const,
    binds: false as const,
    seat: qpuSeatOf().seat,
    mint,
    emails,
    tokens,
    free: true as const,
    keyless: true as const,
    interact: true as const,
    capacity: qpuTwoNOf(VE_FACES),
    preservation,
    selected,
    apis,
    census,
    methods,
    tracks,
    leads,
    publications,
    faces: VE_FACES,
    handle: HANDLE_HEXBITS,
    tetra: TETRA,
    streaming: { href },
  }
}

export const qpuLeanCernHolds = (c = qpuLeanCernOf()): boolean =>
  !('error' in c) &&
  c.holds === true &&
  c.kind === 'cern' &&
  c.derived === 'lean' &&
  c.product === 'Lean CERN' &&
  c.source === 'live-api' &&
  c.invented === false &&
  c.when === 'never' &&
  c.fetches === 0 &&
  c.hardware === 'any' &&
  c.binds === false &&
  c.seat === 'empty' &&
  c.mint.seat === 'empty' &&
  c.emails === false &&
  c.tokens === false &&
  c.free === true &&
  c.keyless === true &&
  c.interact === true &&
  c.preservation.occupied === false &&
  c.preservation.token === false &&
  c.apis.length === VE_FACES &&
  c.census.length === HANDLE_HEXBITS &&
  c.methods.length === QPU_POINTS.length &&
  c.tracks.length === TETRA &&
  c.tracks.map((row) => row.name).join(' ') === CERN_EXPERIMENTS.join(' ') &&
  c.capacity === qpuTwoNOf(VE_FACES) &&
  c.leads.length === c.publications.leads.length &&
  c.leads[0]!.file === QUANTUM_FILE &&
  c.leads.every((row) => row.inspire.startsWith('https://inspirehep.net/api/literature')) &&
  c.publications.holds === true &&
  c.publications.host === 'lean.uuidna.com' &&
  new URL(c.streaming.href).pathname === '/cern' &&
  new URL(c.streaming.href).hostname === 'lean.uuidna.com'

export const qpuUnrealCernOf = qpuLeanCernOf
export const qpuUnrealCernHolds = qpuLeanCernHolds
