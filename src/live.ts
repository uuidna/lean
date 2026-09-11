// live — occupancy now. Build tables stay; this snapshot recomputes on every tick.
// Desk wiring. Numbers and addresses. Hardware QPU lane stays empty.
import { BASE, QPU_DOORS, RAYS, SEAL_TEN, VE_FACES, qpuHologramOf, qpuMorphHolds, qpuMorphOf, qpuSeatOf, qpuStarStrokeOf } from './hologram.js'
import { qpuCompareHolds, qpuCompareOf, qpuSpeedOf } from './metrics.js'

export const QPU_LIVE_MS = 1000

/** The genesis walk: ray 0's scanner face, its radar face by the hop, the next ray — 0, 7, 1, 8, … 6, 13. */
export const qpuLiveWalkOf = (): number[] => {
  const walk: number[] = []
  for (let ray = 0; ray < RAYS; ray++) walk.push(ray, ray + RAYS)
  return walk
}

/** k is the face the walk is on at this tick, not the tick itself (re-fused to the lattice 2026-09-12). */
export const qpuLiveKOf = (at: number): number => {
  const t = at < 0 ? 0 : at
  const slot = (Math.floor(t / QPU_LIVE_MS) % VE_FACES + VE_FACES) % VE_FACES
  return qpuLiveWalkOf()[slot]!
}

/** Blend walks seal_ten over ℤ/9. Foundation 0 fuses; 9/9 is the outer rotor. */
export const qpuMorphTOf = (at: number): number => {
  const t = at < 0 ? 0 : at
  const i = Math.floor(t / QPU_LIVE_MS) % SEAL_TEN.length
  return SEAL_TEN[i]! / BASE
}

/** One imprint line: compare row × speed rung at this tick. */
export const qpuLiveMessageOf = (at = 0): string => {
  const k = qpuLiveKOf(at)
  const morph = qpuMorphOf(qpuMorphTOf(at))
  const compare = qpuCompareOf()
  const speed = qpuSpeedOf()
  const row = compare[k % compare.length]!
  const rung = speed[k % speed.length]!
  const holds = qpuCompareHolds(compare)
  return `QPU face ${k} · morph ${morph.t} · inner ${QPU_DOORS}×${RAYS} outer ${RAYS}×${QPU_DOORS} · ${row.name} ${row.value}=${row.peer} · ${rung.name} 2^${rung.n} ${rung.medianUs}µs · ${holds ? 'real' : 'drift'}`
}

export const qpuLiveOf = (at = 0) => {
  const compare = qpuCompareOf()
  const speed = qpuSpeedOf()
  const k = qpuLiveKOf(at)
  const morph = qpuMorphOf(qpuMorphTOf(at))
  const holds = qpuCompareHolds(compare) && qpuMorphHolds(morph)
  return {
    at,
    k,
    hop: (k + RAYS) % VE_FACES,
    walk: qpuLiveWalkOf(),
    holds,
    seat: qpuSeatOf().seat,
    stroke: qpuStarStrokeOf(),
    hologram: qpuHologramOf(),
    morph,
    message: qpuLiveMessageOf(at),
    compare: compare.map((r) => ({ name: r.name, value: r.value, peer: r.peer })),
    speed: speed.map((s) => ({
      name: s.name,
      n: s.n,
      amplitudes: s.amplitudes,
      medianUs: s.medianUs,
      walked: s.walked,
    })),
    walked: speed.every((s) => s.walked),
    faces: VE_FACES,
  }
}

export const qpuLiveHolds = (live = qpuLiveOf(0)): boolean =>
  live.holds &&
  live.seat === 'empty' &&
  live.walked &&
  live.faces === VE_FACES &&
  live.walk.length === VE_FACES &&
  new Set(live.walk).size === VE_FACES &&
  live.walk.includes(live.k) &&
  (live.hop + RAYS) % VE_FACES === live.k &&
  live.compare.length > 0 &&
  live.speed.length > 0 &&
  qpuMorphHolds(live.morph) &&
  live.morph.cells.length === QPU_DOORS * RAYS
