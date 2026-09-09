// axioms — Lean publishing of uuidna axiom files. Wings fuse standing files onto VE.
// Desk wiring. Numbers and addresses. Axiom empty. The kernel is axiom-free; this worker adds none.
import './licence.js'
import {
  HANDLE_HEXBITS, QPU_POINTS, TETRA, VE_FACES, qpuFacesOf, qpuHexPageOf, qpuLicenceHostOf, qpuSeatOf,
} from './hologram.js'
import { LEAN_HOST, qpuStandingFilesOf } from './standing.js'

const stemOf = (file: string): string => file.replace(/\.lean$/i, '')

/** Standing axiom files, hologram-wide. Occupancy of the wing, not a new axiom. */
export const leanAxiomFacesOf = (): readonly string[] => qpuStandingFilesOf().slice(0, VE_FACES)

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
const leanHrefOf = (slug: string): string => new URL(slug, LEAN).href

/** Lean axioms. Axiom empty. Census hrefs stay on uuidna.com. */
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
  const holds =
    faces.length === VE_FACES &&
    census.length === HANDLE_HEXBITS &&
    methods.length === QPU_POINTS.length &&
    tracks.length === TETRA &&
    axiom.seat === 'empty' &&
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
  a.faces.every((row, i) => {
    const page = qpuHexPageOf(i)
    return row.glue === page.glagolitic && row.hex === page.hex && row.rosetta === page.hex && row.payload === page.hex && row.name.endsWith('.lean')
  }) &&
  new URL(a.streaming.href).pathname === '/axioms'

export const qpuUnrealAxiomsOf = qpuLeanAxiomsOf
export const qpuUnrealAxiomsHolds = qpuLeanAxiomsHolds
