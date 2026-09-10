// proofs — constructor census of the prototype (concept) and occupancy (work).
// Numbers and addresses. Desk does not mint theorem keys.
import { BASE, COINS, qpuChipOf, qpuHologramOf, qpuSeatOf, qpuSuperpositionsOf, qpuTwoNOf, qpuWidthOf } from './hologram.js'
import { qpuCompareHolds, qpuCompareOf } from './metrics.js'
import { QPU_TOOLS } from './mcp-catalog.js'
import { qpuProvidersOf, qpuRecognizeOf } from './bindings/index.js'
import { STANDING } from './standing.js'
import { qpuRoutesOf } from './seo.js'
import { qpuLeanClaimOf } from './claim.js'
import { qpuLeanPublicationsOf } from './publications.js'

export interface QpuReceipt {
  tests: number
  pass: number
  fail: number
  skipped?: number
  durationMs?: number
}

export const qpuProofsOf = (receipt?: QpuReceipt) => {
  const seat = qpuSeatOf()
  const width = qpuWidthOf()
  const h = qpuHologramOf()
  const chip = qpuChipOf()
  const compare = qpuCompareOf()
  const env = qpuRecognizeOf()
  const claim = qpuLeanClaimOf()
  const publications = qpuLeanPublicationsOf()
  const providers = qpuProvidersOf()
  let bindings = 0
  for (const p of providers) bindings = bindings + p.bindings.length
  const superpositions = qpuSuperpositionsOf()
  const concept = {
    seat: seat.seat,
    admits: seat.admits,
    points: width.pentagram,
    foundation: h.foundation,
    debit: h.debit,
    credit: h.credit,
    fold: h.fold,
    octet: h.octet,
    veFaces: h.veFaces,
    superpositions: superpositions.length,
    amplitudes: qpuTwoNOf(h.veFaces),
    providers: providers.length,
    bindings,
    tools: QPU_TOOLS.length,
    standing: STANDING.length,
    routes: qpuRoutesOf().length,
    fused: env.fused,
    chip: env.chip.seat,
    novelty: chip.novelty,
    claimed: chip.claimed,
    chipHolds: chip.holds,
    rotors: chip.merkaba.rotors,
    rays: chip.merkaba.rays,
    vertices: chip.merkaba.vertices,
    gravity: STANDING.some((s) => s.key === 'clay_gravity_equals_rosette' && s.file === 'Clay.lean'),
    bold: claim.bold,
    lean: claim.lean,
    compliance: claim.holds,
    zenodo: publications.zenodo.monitor,
    green: claim.holds === true && publications.zenodo.green === true && publications.doi.verified === true && env.internet === true,
  }
  const holds = qpuCompareHolds(compare)
  const testsOk = receipt
    ? receipt.fail === 0 && receipt.pass === receipt.tests && receipt.tests > 0
    : true
  const work = {
    compareRows: compare.length,
    compareHolds: holds,
    tests: receipt?.tests ?? 0,
    pass: receipt?.pass ?? 0,
    fail: receipt?.fail ?? 0,
    durationMs: receipt?.durationMs ?? 0,
    debitCredit: h.debit + h.credit,
    foldCoins: h.fold + COINS,
    base: BASE,
  }
  const conceptOk =
    concept.seat === 'empty' &&
    concept.fused === true &&
    concept.chip === 'empty' &&
    concept.claimed === true &&
    concept.chipHolds === true &&
    concept.rotors * concept.rays === concept.veFaces &&
    concept.superpositions === concept.veFaces &&
    concept.amplitudes === qpuTwoNOf(concept.veFaces) &&
    concept.gravity === true &&
    concept.bold === true &&
    concept.lean === true &&
    concept.compliance === true &&
    concept.zenodo === true &&
    concept.green === true
  const workOk = holds && work.debitCredit === BASE && work.foldCoins === BASE && testsOk
  return { concept, work, complete: conceptOk && workOk, green: conceptOk && workOk }
}
