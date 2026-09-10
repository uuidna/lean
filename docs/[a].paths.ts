import { HEXBIT_PAGE, UUID_HEXBITS, qpuFacesOf, qpuGlagoliticOf } from '../../src/hologram.ts'
import { LEAN_ESSAY_PAGE } from '../../src/library.ts'

export default {
  paths() {
    const hex = [...HEXBIT_PAGE].map((h) => ({ params: { a: h } }))
    const faces = qpuFacesOf().map((f) => ({ params: { a: qpuGlagoliticOf(f.face) } }))
    const stripes = Array.from({ length: LEAN_ESSAY_PAGE }, (_, i) => ({
      params: { a: i.toString(16).padStart(UUID_HEXBITS, '0') },
    }))
    return [...hex, ...faces, ...stripes]
  },
}
