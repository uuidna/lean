// firmware — VitePress hologram from the QPU config stamp. Payload CMS is the other editor on that stamp. Host is Lean.
import './licence.js'
import { QPU_HOST } from './hologram.js'
import {
  qpuFirmwareOf as qpuInnerFirmwareOf,
  qpuFirmwareHolds as qpuInnerFirmwareHolds,
} from '@uuidna/qpu'
export {
  qpuConfigOf, qpuConfigHolds, qpuPayloadOf, qpuPayloadHolds,
  QPU_ASSETS, QPU_COMPATIBILITY_DATE, QPU_WORKER_ENTRY, QPU_PAYLOAD_PIN, QPU_PAYLOAD_PACKAGES, QPU_PAYLOAD_PLUGINS,
  QPU_SHARED, QPU_EDITORS, QPU_PAYLOAD_API,
} from '@uuidna/qpu'

export const qpuFirmwareOf = () => ({ ...qpuInnerFirmwareOf(), host: QPU_HOST })

export const qpuFirmwareHolds = (fw = qpuFirmwareOf()): boolean =>
  fw.host === QPU_HOST && qpuInnerFirmwareHolds({ ...fw, host: qpuInnerFirmwareOf().host })
