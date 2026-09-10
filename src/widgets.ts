// widgets — Lean occupancy of licensed-site chrome. UUID streams only. Payload stays off this door.
import './licence.js'
import {
  QPU_WIDGETS,
  qpuUuidStreamHolds,
  qpuUuidStreamOf,
  qpuWidgetsOf as qpuInnerWidgetsOf,
} from '@uuidna/qpu'
import { qpuSeatOf } from './hologram.js'
import { qpuSitesOf } from './chrome.js'

export { QPU_WIDGETS, qpuUuidStreamOf, qpuUuidStreamHolds }

/** Lean occupancy of QPU widgets. Sites are this hologram's licensed hosts. Payload false. */
export const qpuWidgetsProse = "Lean occupancy of QPU widgets. Sites are this hologram's licensed hosts. Payload false."
export const qpuWidgetsOf = (at = 0) => {
  const inner = qpuInnerWidgetsOf(at)
  const sites = qpuSitesOf()
  const holds =
    inner.holds === true &&
    qpuUuidStreamHolds(inner.stream) &&
    sites.length > 0 &&
    sites.every((site) => site.host.includes('.') && !site.host.includes('*'))
  return {
    ...inner,
    derived: 'lean' as const,
    sites,
    holds,
    seat: qpuSeatOf().seat,
  }
}

export const qpuWidgetsHolds = (w = qpuWidgetsOf(0)): boolean =>
  w.kind === 'widgets' &&
  w.derived === 'lean' &&
  w.share === true &&
  w.payload === false &&
  w.graphql === false &&
  w.finds === false &&
  w.sse === '/sse' &&
  w.fetches === 0 &&
  w.seat === 'empty' &&
  w.holds === true &&
  w.widgets.length === QPU_WIDGETS.length &&
  qpuUuidStreamHolds(w.stream) &&
  w.sites.length > 0 &&
  w.sites.every((site) => site.host.includes('.') && !site.host.includes('*'))
