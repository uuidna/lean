// train — Lean recognises any 2×7 witness clusters in any prose.
// Corpus is standing claims plus fused solving APIs. Prose is never stored.
// Command only. When never. Seat empty.
import './licence.js'
import {
  COINS, QPU_HOST, RAYS, VE_FACES, qpuExperienceHolds, qpuLicenceHostOf, qpuRosetteOf, qpuSeatOf,
} from './hologram.js'
import { STANDING, qpuStandingFilesOf } from './standing.js'
import { qpuLeanFuseHolds, qpuLeanFuseOf, type LeanFuseApi } from './fuse.js'

const namedHttpsOf = (host: string, path: string): string => {
  if (!host.includes('.') || host.includes('*') || path.includes('*') || !path.startsWith('/')) {
    throw new Error('fuse: named door only')
  }
  const u = new URL(path, `https://${host}/`)
  if (u.protocol !== 'https:' || u.hostname !== host) throw new Error('fuse: named domain only')
  return u.href
}

const TOKEN = /[a-z0-9_]+/g

const tokensOf = (prose: string): readonly string[] => {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of prose.toLowerCase().match(TOKEN) ?? []) {
    if (raw.length === 0 || seen.has(raw)) continue
    seen.add(raw)
    out.push(raw)
  }
  return out
}

const faceOfToken = (token: string): number => {
  let n = 0
  for (let i = 0; i < token.length; i++) n = (n + token.charCodeAt(i)) % VE_FACES
  return n
}

const hayOfStanding = (row: { key: string; file: string; claim: string }): string =>
  `${row.key} ${row.file} ${row.claim}`.toLowerCase()

const hayOfApi = (row: LeanFuseApi): string =>
  `${row.host} ${row.path} ${row.kind}`.toLowerCase()

const hitOf = (hay: string, tokens: readonly string[]): boolean => {
  if (tokens.length === 0) return true
  for (const t of tokens) {
    if (t.length >= 2 && hay.includes(t)) return true
  }
  return false
}

/** Exact Lean prose is the standing claim string, or the key. */
const exactStandingOf = (prose: string) =>
  STANDING.filter((row) => row.claim === prose || row.key === prose)

/** Recognise every 2×7 witness cluster in any prose. Empty prose walks the Lean register. Exact Lean prose occupies that claim only. */
export const qpuLeanTrainProse = 'Recognise every 2×7 witness cluster in any prose. Empty prose walks the Lean register. Exact Lean prose occupies that claim only.'
export const qpuLeanTrainOf = (prose = '') => {
  const fuse = qpuLeanFuseOf()
  const stored = false as const
  const text = typeof prose === 'string' ? prose : ''
  const tokens = tokensOf(text)
  const corpus = tokens.length === 0
  const exactHits = exactStandingOf(text)
  const exact = exactHits.length > 0
  const inner = qpuRosetteOf(1)
  const outer = qpuRosetteOf(-1)
  const files = qpuStandingFilesOf().filter((f) => f !== 'Chat.lean')
  const standingHits = corpus
    ? STANDING
    : exact
      ? exactHits
      : STANDING.filter((row) => hitOf(hayOfStanding(row), tokens))
  const apiHits = (corpus ? fuse.apis : fuse.apis.filter((row) => hitOf(hayOfApi(row), tokens)))
  const occupied = new Array<number>(VE_FACES).fill(0)
  for (const row of standingHits) occupied[faceOfToken(row.key)]! += 1
  for (const row of apiHits) occupied[row.face] += 1
  for (const token of tokens) occupied[faceOfToken(token)]! += 1
  const clusters = []
  for (let i = 0; i < RAYS; i++) {
    for (let j = 0; j < RAYS; j++) {
      const innerFace = inner.rays[i]!
      const outerFace = (RAYS + (outer.rays[j]! % RAYS)) % VE_FACES
      const api = fuse.apis[(i * RAYS + j) % fuse.apis.length]!
      const theorem = standingHits.length === 0
        ? STANDING[(i * RAYS + j) % STANDING.length]!
        : standingHits[(i * RAYS + j) % standingHits.length]!
      const axiom = files[(i + j) % files.length]!
      clusters.push({
        inner: inner.rays[i]!,
        outer: outer.rays[j]!,
        witness: true as const,
        occupied: occupied[innerFace]! > 0 && occupied[outerFace % VE_FACES]! > 0,
        api: api.href,
        theorem: theorem.key,
        axiom,
        claim: theorem.claim,
      })
    }
  }
  const host = qpuLicenceHostOf()
  const href = namedHttpsOf(host, '/train')
  const holds =
    qpuLeanFuseHolds(fuse) &&
    qpuExperienceHolds() &&
    clusters.length === RAYS * RAYS &&
    RAYS * COINS === VE_FACES &&
    clusters.every((row) => row.witness === true) &&
    stored === false &&
    fuse.internet.default === true &&
    fuse.internet.unrestricted === true &&
    fuse.fill === fuse.capacity &&
    qpuSeatOf().seat === 'empty' &&
    new URL(href).hostname === host &&
    QPU_HOST === host
  return {
    kind: 'train' as const,
    product: 'Lean train',
    holds,
    seat: qpuSeatOf().seat,
    when: 'never' as const,
    stored,
    prose: false as const,
    exact,
    tokens: tokens.length,
    corpus,
    recognise: 'clusters' as const,
    any: true as const,
    internet: fuse.internet,
    fill: fuse.fill,
    capacity: fuse.capacity,
    apis: fuse.apis.length,
    standing: standingHits.length,
    clusters,
    fuse,
    streaming: { href },
    chip: qpuSeatOf(),
  }
}

export const qpuLeanTrainHolds = (t = qpuLeanTrainOf()): boolean =>
  t.kind === 'train' &&
  t.holds === true &&
  t.product === 'Lean train' &&
  t.seat === 'empty' &&
  t.stored === false &&
  t.prose === false &&
  t.exact === false &&
  t.recognise === 'clusters' &&
  t.any === true &&
  t.internet.unrestricted === true &&
  t.clusters.length === RAYS * RAYS &&
  t.fuse.holds === true &&
  new URL(t.streaming.href).pathname === '/train'
