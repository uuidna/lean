import { qpuFacesOf } from '../../src/hologram.ts'

export default {
  paths() {
    return qpuFacesOf().map((f) => ({
      params: { n: String(f.face), opposite: String(f.opposite) },
    }))
  },
}
