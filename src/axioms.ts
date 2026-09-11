// axioms — Lean publishing of uuidna axiom files. Wings fuse standing files onto VE.
// Desk wiring. Numbers and addresses. Axiom empty. The kernel is axiom-free; this worker adds none.
import './licence.js'
import {
  HANDLE_HEXBITS, HEXBIT_STATES, QPU_POINTS, TETRA, VE_FACES, qpuFacesOf, qpuHexPageOf, qpuLicenceHostOf, qpuSeatOf,
} from './hologram.js'
import { LEAN_HOST, THEOREM_HOST, qpuStandingFilesOf, standingByFileOf } from './standing.js'

const stemOf = (file: string): string => file.replace(/\.lean$/i, '')

/** Standing axiom files, hologram-wide. Occupancy of the wing, not a new axiom. Tesla.lean is one analog-hardware cluster, not a wing. */
export const leanAxiomFacesOf = (): readonly string[] =>
  qpuStandingFilesOf().filter((f) => f !== 'Tesla.lean').slice(0, VE_FACES)

export const LEAN_AXIOM_FACES = leanAxiomFacesOf()

export const leanAxiomCensusOf = (): readonly { name: string; slug: string }[] =>
  LEAN_AXIOM_FACES.slice(0, HANDLE_HEXBITS).map((slug) => ({
    name: stemOf(slug),
    slug,
  }))

export const LEAN_AXIOM_CENSUS = leanAxiomCensusOf()

export const LEAN_AXIOM_METHODS = QPU_POINTS

export const leanAxiomTracksOf = (): readonly string[] =>
  LEAN_AXIOM_FACES.slice(0, TETRA).map((file) => stemOf(file))

export const LEAN_AXIOM_TRACKS = leanAxiomTracksOf()

export const UNREAL_AXIOM_FACES = LEAN_AXIOM_FACES
export const UNREAL_AXIOM_CENSUS = LEAN_AXIOM_CENSUS
export const UNREAL_AXIOM_METHODS = LEAN_AXIOM_METHODS
export const UNREAL_AXIOM_TRACKS = LEAN_AXIOM_TRACKS

const LEAN = `${LEAN_HOST}/`
const KERNEL = `${THEOREM_HOST}/`
const leanHrefOf = (slug: string): string => new URL(slug, LEAN).href
const theoremHrefOf = (slug: string): string => new URL(slug, KERNEL).href
const glyphNameOf = (i: number): string => qpuHexPageOf(i % HEXBIT_STATES).glagolitic

/** Lean axioms. Axiom empty. Census hrefs stay on uuidna.com. */
export const qpuLeanAxiomsProse = 'Lean axioms. Axiom empty. Census hrefs stay on uuidna.com.'
export const qpuLeanAxiomsOf = () => {
  const host = qpuLicenceHostOf()
  const href = new URL('/axioms', `https://${host}/`).href
  const standingFiles = new Set(qpuStandingFilesOf())
  const lattice = qpuFacesOf()
  const faces = LEAN_AXIOM_FACES.map((name, i) => {
    const page = qpuHexPageOf(i)
    return {
      name,
      glue: page.glagolitic,
      latex: page.latex,
      hex: page.hex,
      rosetta: page.hex,
      payload: page.hex,
      face: lattice[i]!.face,
      opposite: lattice[i]!.opposite,
    }
  })
  const census = LEAN_AXIOM_CENSUS.map((row) => ({
    name: row.name,
    slug: row.slug,
    href: leanHrefOf(row.slug),
  }))
  const methods = LEAN_AXIOM_METHODS.map((name, i) => ({
    name,
    point: QPU_POINTS[i]!,
  }))
  const tracks = LEAN_AXIOM_TRACKS.map((name, i) => ({
    name,
    vertex: i,
  }))
  const axiom = { name: 'Axiom' as const, seat: 'empty' as const, admits: 'nothing' as const }
  const leads = standingByFileOf().map((row) => ({
    file: row.file,
    href: row.href,
    theorems: row.theorems.map((s, i) => ({
      key: s.key,
      title: s.key,
      subtitle: glyphNameOf(i),
      role: s.role,
      claim: s.claim,
      prior: theoremHrefOf(s.key),
    })),
  }))
  const articles = leads
  const holds =
    faces.length === VE_FACES &&
    census.length === HANDLE_HEXBITS &&
    methods.length === QPU_POINTS.length &&
    tracks.length === TETRA &&
    axiom.seat === 'empty' &&
    leads.length === qpuStandingFilesOf().length &&
    articles.length === leads.length &&
    leads.every((row) => {
      const u = new URL(row.href)
      return (
        standingFiles.has(row.file) &&
        row.file.endsWith('.lean') &&
        row.theorems.length > 0 &&
        u.protocol === 'https:' &&
        u.hostname === 'uuidna.com' &&
        u.pathname === `/lean/${row.file}` &&
        row.theorems.every((t) => t.title === t.key && t.subtitle.length === 1 && new URL(t.prior).pathname === `/theorem/${t.key}`)
      )
    }) &&
    faces.every((row, i) => {
      const page = qpuHexPageOf(i)
      return (
        standingFiles.has(row.name) &&
        row.name.endsWith('.lean') &&
        row.glue === page.glagolitic &&
        row.hex === page.hex &&
        row.rosetta === page.hex &&
        row.payload === page.hex &&
        row.latex === page.latex
      )
    }) &&
    census.every((row, i) => {
      const u = new URL(row.href)
      return (
        row.slug === LEAN_AXIOM_FACES[i] &&
        u.protocol === 'https:' &&
        u.hostname === 'uuidna.com' &&
        u.pathname === `/lean/${row.slug}` &&
        standingFiles.has(row.slug)
      )
    }) &&
    methods.every((row, i) => row.name === QPU_POINTS[i] && row.point === QPU_POINTS[i]) &&
    new URL(href).protocol === 'https:' &&
    qpuSeatOf().seat === 'empty'
  return {
    name: 'QPU' as const,
    product: 'Lean axioms',
    kind: 'axioms' as const,
    holds,
    seat: qpuSeatOf().seat,
    axiom,
    editor: qpuSeatOf(),
    firmware: 'vitepress' as const,
    engine: 'Lean axioms',
    streaming: { href },
    faces,
    census,
    methods,
    tracks,
    leads,
    articles,
    chip: qpuSeatOf(),
    faceCount: VE_FACES,
    handle: HANDLE_HEXBITS,
    pentagram: QPU_POINTS.length,
    tetra: TETRA,
  }
}

export const qpuLeanAxiomsHolds = (a = qpuLeanAxiomsOf()): boolean =>
  a.holds === true &&
  a.kind === 'axioms' &&
  a.seat === 'empty' &&
  a.axiom.seat === 'empty' &&
  a.faces.length === VE_FACES &&
  a.census.length === HANDLE_HEXBITS &&
  a.methods[0]!.point === QPU_POINTS[0] &&
  a.tracks.length === TETRA &&
  a.leads.length === a.articles.length &&
  a.leads.length > VE_FACES &&
  a.faces.every((row, i) => {
    const page = qpuHexPageOf(i)
    return row.glue === page.glagolitic && row.hex === page.hex && row.rosetta === page.hex && row.payload === page.hex && row.name.endsWith('.lean')
  }) &&
  new URL(a.streaming.href).pathname === '/axioms'

export const qpuUnrealAxiomsOf = qpuLeanAxiomsOf
export const qpuUnrealAxiomsHolds = qpuLeanAxiomsHolds
