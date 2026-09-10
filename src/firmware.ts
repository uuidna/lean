// firmware — VitePress hologram from the QPU config stamp. Payload CMS is the other editor on that stamp. Host is Lean.
import './licence.js'
import { QPU_HOST } from './hologram.js'
import {
  qpuFirmwareOf as qpuInnerFirmwareOf,
  qpuFirmwareHolds as qpuInnerFirmwareHolds,
  qpuHologramConsoleOf, qpuHologramPluginHolds, qpuHologramPluginOf,
} from '@uuidna/qpu'
export {
  qpuConfigOf, qpuConfigHolds, qpuPayloadOf, qpuPayloadHolds,
  QPU_ASSETS, QPU_COMPATIBILITY_DATE, QPU_WORKER_ENTRY, QPU_PAYLOAD_PIN, QPU_PAYLOAD_PACKAGES, QPU_PAYLOAD_PLUGINS,
  QPU_SHARED, QPU_EDITORS, QPU_PAYLOAD_API,
  qpuHologramCiOf, qpuHologramConsoleOf, qpuHologramPluginOf, qpuHologramPluginHolds,
  qpuReplicaPluginOf,
} from '@uuidna/qpu'

/** Lean occupies the hologram plugin. Namesake script. Mounted at will. */
export const qpuLeanPluginProse = 'Lean occupies the hologram plugin. Namesake script. Mounted at will.'
export const qpuLeanPluginOf = (mounted = false) => qpuHologramPluginOf(mounted, 'lean')

export const qpuLeanPluginHolds = (p = qpuLeanPluginOf()): boolean =>
  p.script === 'lean' &&
  qpuHologramPluginHolds({ ...p, script: 'qpu' })

export const qpuFirmwareOf = () => ({
  ...qpuInnerFirmwareOf(),
  host: QPU_HOST,
  console: qpuHologramConsoleOf('lean'),
  plugin: qpuLeanPluginOf(),
})

export const qpuFirmwareHolds = (fw = qpuFirmwareOf()): boolean => {
  const inner = qpuInnerFirmwareOf()
  return (
    fw.host === QPU_HOST &&
    fw.console.script === 'lean' &&
    qpuLeanPluginHolds(fw.plugin) &&
    qpuInnerFirmwareHolds({ ...fw, host: inner.host, console: inner.console, plugin: inner.plugin })
  )
}
