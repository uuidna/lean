// theorems — Lean publishing of uuidna keys. Faces fuse inner QPU uses onto VE.
// Desk wiring. Numbers and addresses. Mint empty. This package does not mint keys.
import './licence.js'
import {
  HANDLE_HEXBITS, QPU_POINTS, TETRA, VE_FACES, qpuFacesOf, qpuHexPageOf, qpuLicenceHostOf, qpuSeatOf,
} from './hologram.js'
import { QPU_USES, STANDING, THEOREM_HOST } from './standing.js'
import { qpuLeanPublicationsOf } from './publications.js'

const stemOf = (file: string): string => file.replace(/\.lean$/i, '')

const fileOfKey = (key: string): string => STANDING.find((s) => s.key === key)?.file ?? ''

/** Unique inner-QPU standing keys, hologram-wide. Skips this worker's own uses. */
export const leanTheoremFacesOf = (): readonly string[] => {
  const seen = new Set<string>()
  const keys: string[] = []
  for (const u of QPU_USES) {
    if (u.id === 'theorems' || u.id === 'axioms' || u.id === 'publications' || u.id === 'cern' || u.id === 'library') continue
    for (const k of u.keys) {
      if (seen.has(k)) continue
      seen.add(k)
      keys.push(k)
      if (keys.length === VE_FACES) return keys
    }
  }
  return keys
}

export const LEAN_THEOREM_FACES = leanTheoremFacesOf()

export const leanTheoremCensusOf = (): readonly { name: string; slug: string }[] =>
  LEAN_THEOREM_FACES.slice(0, HANDLE_HEXBITS).map((slug) => ({
    name: stemOf(fileOfKey(slug)) || slug,
    slug,
  }))

export const LEAN_THEOREM_CENSUS = leanTheoremCensusOf()

export const LEAN_THEOREM_METHODS = QPU_POINTS

export const leanTheoremTracksOf = (): readonly string[] => {
  const seen = new Set<string>()
  const tracks: string[] = []
  for (const key of LEAN_THEOREM_FACES) {
    const name = stemOf(fileOfKey(key))
    if (!name || seen.has(name)) continue
    seen.add(name)
    tracks.push(name)
    if (tracks.length === TETRA) return tracks
  }
  return tracks
}

export const LEAN_THEOREM_TRACKS = leanTheoremTracksOf()

export const UNREAL_THEOREM_FACES = LEAN_THEOREM_FACES
export const UNREAL_THEOREM_CENSUS = LEAN_THEOREM_CENSUS
export const UNREAL_THEOREM_METHODS = LEAN_THEOREM_METHODS
export const UNREAL_THEOREM_TRACKS = LEAN_THEOREM_TRACKS

const KERNEL = `${THEOREM_HOST}/`
const theoremHrefOf = (slug: string): string => new URL(slug, KERNEL).href

/** Lean theorems. Mint empty. Census hrefs stay on uuidna.com. */
export const qpuLeanTheoremsProse = 'Lean theorems. Mint empty. Census hrefs stay on uuidna.com.'
export const qpuLeanTheoremsOf = () => {
  const host = qpuLicenceHostOf()
  const href = new URL('/theorems', `https://${host}/`).href
  const lattice = qpuFacesOf()
  const faces = LEAN_THEOREM_FACES.map((key, i) => {
    const tile = lattice[i]!
      const page = qpuHexPageOf(i)
      const axiom = stemOf(fileOfKey(key)) || key
      const claim = STANDING.find((s) => s.key === key)?.claim ?? ''
      return {
        name: page.glagolitic,
        title: key,
        subtitle: page.glagolitic,
        claim,
      latex: page.latex,
      hex: page.hex,
      rosetta: page.rosetta,
      payload: page.payload,
      glue: page.glagolitic,
      key,
      axiom,
      face: tile.face,
      opposite: tile.opposite,
    }
  })
  const census = LEAN_THEOREM_CENSUS.map((row) => ({
    name: row.name,
    slug: row.slug,
    href: theoremHrefOf(row.slug),
  }))
  const methods = LEAN_THEOREM_METHODS.map((name, i) => ({
    name,
    point: QPU_POINTS[i]!,
  }))
  const tracks = LEAN_THEOREM_TRACKS.map((name, i) => ({
    name,
    vertex: i,
  }))
  const mint = { name: 'Mint' as const, seat: 'empty' as const, admits: 'nothing' as const }
  const publications = qpuLeanPublicationsOf()
  const leads = publications.leads
  const articles = publications.leads
  const standingKeys = new Set(STANDING.map((s) => s.key))
  const holds =
    faces.length === VE_FACES &&
    census.length === HANDLE_HEXBITS &&
    methods.length === QPU_POINTS.length &&
    tracks.length === TETRA &&
    mint.seat === 'empty' &&
    publications.holds === true &&
    publications.doors > 1_000_000_000 &&
    leads.length === publications.leads.length &&
    articles.length === leads.length &&
    leads.length === STANDING.length &&
    leads.every((row) => standingKeys.has(row.key) && row.file.endsWith('.lean')) &&
    faces.every((row, i) => {
      const page = qpuHexPageOf(i)
      return (
        standingKeys.has(row.key) &&
        row.title === row.key &&
        row.claim === (STANDING.find((s) => s.key === row.key)?.claim ?? '') &&
        row.subtitle === page.glagolitic &&
        row.name === page.glagolitic &&
        row.glue === page.glagolitic &&
        row.hex === page.hex &&
        row.rosetta === page.hex &&
        row.payload === page.hex &&
        row.latex === page.latex &&
        row.axiom === (stemOf(fileOfKey(row.key)) || row.key)
      )
    }) &&
    census.every((row, i) => {
      const u = new URL(row.href)
      return (
        row.slug === LEAN_THEOREM_FACES[i] &&
        u.protocol === 'https:' &&
        u.hostname === 'uuidna.com' &&
        u.pathname === `/theorem/${row.slug}` &&
        standingKeys.has(row.slug)
      )
    }) &&
    methods.every((row, i) => row.name === QPU_POINTS[i] && row.point === QPU_POINTS[i]) &&
    new URL(href).protocol === 'https:' &&
    qpuSeatOf().seat === 'empty'
  return {
    name: 'QPU' as const,
    product: 'Lean theorems',
    kind: 'theorems' as const,
    holds,
    seat: qpuSeatOf().seat,
    mint,
    editor: qpuSeatOf(),
    firmware: 'vitepress' as const,
    engine: 'Lean theorems',
    streaming: { href },
    faces,
    census,
    methods,
    tracks,
    leads,
    articles,
    publications,
    chip: qpuSeatOf(),
    faceCount: VE_FACES,
    handle: HANDLE_HEXBITS,
    pentagram: QPU_POINTS.length,
    tetra: TETRA,
  }
}

export const qpuLeanTheoremsHolds = (t = qpuLeanTheoremsOf()): boolean =>
  t.holds === true &&
  t.kind === 'theorems' &&
  t.seat === 'empty' &&
  t.mint.seat === 'empty' &&
  t.faces.length === VE_FACES &&
  t.census.length === HANDLE_HEXBITS &&
  t.methods[0]!.point === QPU_POINTS[0] &&
  t.tracks.length === TETRA &&
  t.publications.holds === true &&
  t.publications.doors > 1_000_000_000 &&
  t.publications.host === 'lean.uuidna.com' &&
  t.leads.length === t.publications.leads.length &&
  t.articles.length === t.leads.length &&
  t.leads.length > VE_FACES &&
  t.faces.every((row, i) => {
    const page = qpuHexPageOf(i)
    return row.title === row.key && row.claim === (STANDING.find((s) => s.key === row.key)?.claim ?? '') && row.subtitle === page.glagolitic && row.name === page.glagolitic && row.hex === page.hex && row.rosetta === page.hex && row.payload === page.hex && row.glue === row.name
  }) &&
  new URL(t.streaming.href).pathname === '/theorems'

export const qpuUnrealTheoremsOf = qpuLeanTheoremsOf
export const qpuUnrealTheoremsHolds = qpuLeanTheoremsHolds
