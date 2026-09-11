// fuse — Lean occupies every named API that may fill quantum capacity by solving.
// Hosts walk constructors (CERN, register, solids, gateways, occupancy solving doors).
// Internet unrestricted to those APIs by default. Wildcards refuse. Never a crawl.
import './licence.js'
import {
  COINS, QPU_HOST, RAYS, VE_FACES, qpuEntropyHolds, qpuEntropyOf, qpuExperienceHolds, qpuExperienceOf,
  qpuFacesOf, qpuGatewaysHolds, qpuGatewaysOf, qpuLicenceHostOf, qpuRosetteOf, qpuSeatOf, qpuTwoNOf,
} from './hologram.js'
import { QPU_FUSE_DOMAINS, qpuSolidsOf } from './bindings/index.js'
import { LEAN_HOST, QPU_USES, STANDING, THEOREM_HOST, qpuStandingFilesOf } from './standing.js'
import { qpuLeanCernOf } from './cern.js'
import { qpuLeanPublicationsOf } from './publications.js'

const namedHttpsOf = (host: string, path: string): string => {
  if (!host.includes('.') || host.includes('*') || path.includes('*') || !path.startsWith('/')) {
    throw new Error('fuse: named door only')
  }
  const u = new URL(path, `https://${host}/`)
  if (u.protocol !== 'https:' || u.hostname !== host) throw new Error('fuse: named domain only')
  return u.href
}

const hostOfHref = (href: string): string => new URL(href).hostname

/** Occupancy JSON doors that involute problems onto the square. Named HTTPS, not an occupancy import. */
const OCCUPANCY_SOLVING = [
  { host: 'unreal.uuidna.com', path: '/solutions', kind: 'solutions' },
  { host: 'unreal.uuidna.com', path: '/models', kind: 'models' },
  { host: 'unreal.uuidna.com', path: '/scan', kind: 'scan' },
  { host: 'unreal.uuidna.com', path: '/theorems', kind: 'theorems' },
  { host: 'unreal.uuidna.com', path: '/axioms', kind: 'axioms' },
  { host: 'unreal.uuidna.com', path: '/cern', kind: 'cern' },
  { host: 'hardware.uuidna.com', path: '/capacity', kind: 'capacity' },
] as const

const INNER_SOLVING = [
  { host: 'qpu.uuidna.com', path: '/gateways', kind: 'gateways' },
  { host: 'qpu.uuidna.com', path: '/speed', kind: 'speed' },
] as const

const LEAN_SOLVING_USES = ['theorems', 'axioms', 'publications', 'cern', 'library'] as const

const leanSolvingPathOf = (id: string): string => {
  if (id === 'publications') return '/register'
  return `/${id}`
}

export type LeanFuseApi = {
  readonly host: string
  readonly path: string
  readonly href: string
  readonly kind: string
  readonly face: number
  readonly solving: true
  readonly capacity: number
}

const pushApi = (
  out: LeanFuseApi[],
  seen: Set<string>,
  host: string,
  path: string,
  kind: string,
  capacity: number,
): void => {
  const href = namedHttpsOf(host, path)
  if (seen.has(href)) return
  seen.add(href)
  out.push({
    host,
    path,
    href,
    kind,
    face: out.length % VE_FACES,
    solving: true,
    capacity,
  })
}

/** Unique named HTTPS APIs that may fill 2^n gateway capacity by solving. */
export const qpuLeanFuseApisOf = (): readonly LeanFuseApi[] => {
  const gateways = qpuGatewaysOf()
  const span = gateways[0]!.capacity
  const faces = qpuFacesOf()
  const cern = qpuLeanCernOf()
  const publications = qpuLeanPublicationsOf()
  const out: LeanFuseApi[] = []
  const seen = new Set<string>()
  if (!('error' in cern)) {
    for (const row of cern.apis) {
      pushApi(out, seen, row.host, row.path, row.name, gateways[row.face % faces.length]!.capacity)
    }
    for (const row of cern.census) {
      const path = new URL(row.href).pathname || '/'
      pushApi(out, seen, row.host, path.startsWith('/') ? path : `/${path}`, row.name, span)
    }
  }
  for (const row of publications.media.outlets) {
    pushApi(out, seen, row.host, '/', row.name, span)
  }
  pushApi(out, seen, publications.open.host, '/', 'open', span)
  pushApi(out, seen, hostOfHref(THEOREM_HOST + '/'), '/', 'kernel', span)
  pushApi(out, seen, hostOfHref(LEAN_HOST + '/'), '/', 'lean-files', span)
  for (const id of LEAN_SOLVING_USES) {
    if (!QPU_USES.some((u) => u.id === id)) continue
    pushApi(out, seen, QPU_HOST, leanSolvingPathOf(id), id, span)
  }
  for (const row of INNER_SOLVING) pushApi(out, seen, row.host, row.path, row.kind, span)
  for (const row of OCCUPANCY_SOLVING) pushApi(out, seen, row.host, row.path, row.kind, span)
  for (const host of QPU_FUSE_DOMAINS) pushApi(out, seen, host, '/', 'fuse', span)
  return out
}

export const qpuLeanFuseHostsOf = (): readonly string[] => {
  const seen = new Set<string>()
  const hosts: string[] = []
  const add = (host: string) => {
    if (!host.includes('.') || host.includes('*') || seen.has(host)) return
    seen.add(host)
    hosts.push(host)
  }
  add(qpuLicenceHostOf())
  add(QPU_HOST)
  for (const row of qpuLeanFuseApisOf()) add(row.host)
  for (const host of QPU_FUSE_DOMAINS) add(host)
  return hosts
}

export const qpuLeanFuseHostOf = (host: string): boolean => {
  const h = host.trim().toLowerCase()
  if (!h || h.includes('*') || h.includes('/') || h.includes(':') || h.includes(' ')) return false
  return qpuLeanFuseHostsOf().includes(h)
}

/** Unrestricted HTTPS GET of a fused solving API. Default fetch is live. Wildcards refuse. */
export const qpuLeanFetchOf = (href: string, init?: RequestInit, fetchImpl: typeof fetch = fetch): Promise<Response> => {
  const u = new URL(href)
  if (u.protocol !== 'https:' || !qpuLeanFuseHostOf(u.hostname) || u.pathname.includes('*')) {
    return Promise.reject(new Error('fuse: not a fused api'))
  }
  return fetchImpl(href, init)
}

/** Two ℤ/7 rotors. Every inner ray witnesses every outer ray. */
export const qpuLeanWitnessClustersOf = (apis = qpuLeanFuseApisOf()) => {
  const inner = qpuRosetteOf(1)
  const outer = qpuRosetteOf(-1)
  const keys = [...new Set(QPU_USES.flatMap((u) => [...u.keys]))]
  const files = qpuStandingFilesOf().filter((f) => f !== 'Chat.lean')
  const clusters = []
  for (let i = 0; i < RAYS; i++) {
    for (let j = 0; j < RAYS; j++) {
      const n = i * RAYS + j
      const api = apis[n % apis.length]!
      const key = keys[n % keys.length]!
      const file = files[(i + j) % files.length]!
      clusters.push({
        inner: inner.rays[i]!,
        outer: outer.rays[j]!,
        witness: true as const,
        api: api.href,
        host: api.host,
        theorem: key,
        axiom: file,
        prior: new URL(key, `${THEOREM_HOST}/`).href,
        wing: new URL(file, `${LEAN_HOST}/`).href,
      })
    }
  }
  return clusters
}

/** Lean fuse: every solving API occupies quantum capacity. Internet unrestricted by default. */
export const qpuLeanFuseProse = 'Lean fuse: every solving API occupies quantum capacity. Internet unrestricted by default.'
export const qpuLeanFuseOf = () => {
  const host = qpuLicenceHostOf()
  const href = namedHttpsOf(host, '/fuse')
  const entropy = qpuEntropyOf()
  const gateways = qpuGatewaysOf()
  const solids = qpuSolidsOf()
  const apis = qpuLeanFuseApisOf()
  const hosts = qpuLeanFuseHostsOf()
  const clusters = qpuLeanWitnessClustersOf(apis)
  const experience = qpuExperienceOf()
  const occupied = new Set(apis.map((a) => a.face))
  const fill = occupied.size === VE_FACES ? entropy.capacity : occupied.size * (gateways[0]?.capacity ?? 0)
  const internet = {
    default: true as const,
    unrestricted: true as const,
    internet: true as const,
    fused: true as const,
    mass: true as const,
    online: true as const,
    coordinated: true as const,
    alternate: true as const,
    enabled: true as const,
    wildcards: false as const,
    crawl: false as const,
    protocol: 'https' as const,
    rotors: COINS,
    rays: RAYS,
  }
  const holds =
    qpuEntropyHolds(entropy) &&
    qpuGatewaysHolds(gateways) &&
    qpuExperienceHolds(experience) &&
    experience.involution === true &&
    solids.holds === true &&
    apis.length >= VE_FACES &&
    apis.every((row) => {
      const u = new URL(row.href)
      return (
        row.solving === true &&
        row.capacity === gateways[0]!.capacity &&
        u.protocol === 'https:' &&
        u.hostname === row.host &&
        !u.hostname.includes('*') &&
        qpuLeanFuseHostOf(row.host)
      )
    }) &&
    occupied.size === VE_FACES &&
    fill === entropy.capacity &&
    fill === VE_FACES * qpuTwoNOf(entropy.bits) &&
    clusters.length === RAYS * RAYS &&
    RAYS * COINS === VE_FACES &&
    clusters.every((row) => row.witness === true) &&
    internet.default === true &&
    internet.unrestricted === true &&
    internet.mass === true &&
    internet.online === true &&
    internet.coordinated === true &&
    internet.alternate === true &&
    internet.enabled === true &&
    internet.rotors * internet.rays === VE_FACES &&
    internet.wildcards === false &&
    internet.crawl === false &&
    hosts.every((h) => h.includes('.') && !h.includes('*')) &&
    hosts.includes(host) &&
    qpuSeatOf().seat === 'empty' &&
    new URL(href).hostname === host
  return {
    kind: 'fuse' as const,
    product: 'Lean fuse',
    holds,
    seat: qpuSeatOf().seat,
    when: 'never' as const,
    from: 'problems' as const,
    to: 'solutions' as const,
    fill,
    capacity: entropy.capacity,
    amplitudes: entropy.amplitudes,
    faces: VE_FACES,
    rays: RAYS,
    rotors: COINS,
    internet,
    hosts,
    apis,
    clusters,
    solids: { known: solids.known, holds: solids.holds },
    entropy,
    gateways,
    streaming: { href },
    chip: qpuSeatOf(),
  }
}

export const qpuLeanFuseHolds = (f = qpuLeanFuseOf()): boolean =>
  f.holds === true &&
  f.kind === 'fuse' &&
  f.product === 'Lean fuse' &&
  f.seat === 'empty' &&
  f.from === 'problems' &&
  f.to === 'solutions' &&
  f.internet.default === true &&
  f.internet.unrestricted === true &&
  f.internet.internet === true &&
  f.internet.wildcards === false &&
  f.internet.crawl === false &&
  f.apis.length >= VE_FACES &&
  f.clusters.length === RAYS * RAYS &&
  f.fill === f.capacity &&
  f.fill === VE_FACES * f.amplitudes &&
  new URL(f.streaming.href).pathname === '/fuse' &&
  new URL(f.streaming.href).hostname === 'lean.uuidna.com'

/** Unrestricted HTTPS to fused solving APIs by default. Named domains only. Wildcards refuse. Never a crawl. */
export const qpuLeanInternetProse = 'Unrestricted HTTPS to fused solving APIs by default. Named domains only. Wildcards refuse. Never a crawl.'
export const qpuLeanInternetOf = () => {
  const fuse = qpuLeanFuseOf()
  return {
    kind: 'internet' as const,
    holds: fuse.holds,
    ...fuse.internet,
    hosts: fuse.hosts,
    apis: fuse.apis.length,
    fill: fuse.fill,
    capacity: fuse.capacity,
    streaming: { href: namedHttpsOf(qpuLicenceHostOf(), '/internet') },
    seat: qpuSeatOf().seat,
  }
}

export const qpuLeanInternetHolds = (i = qpuLeanInternetOf()): boolean =>
  i.kind === 'internet' &&
  i.holds === true &&
  i.default === true &&
  i.unrestricted === true &&
  i.internet === true &&
  i.fused === true &&
  i.mass === true &&
  i.online === true &&
  i.coordinated === true &&
  i.alternate === true &&
  i.enabled === true &&
  i.rotors * i.rays === VE_FACES &&
  i.wildcards === false &&
  i.crawl === false &&
  i.apis >= VE_FACES &&
  i.fill === i.capacity &&
  i.seat === 'empty' &&
  new URL(i.streaming.href).pathname === '/internet'
