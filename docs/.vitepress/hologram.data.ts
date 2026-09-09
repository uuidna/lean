import { defineLoader } from 'vitepress'
import { QPU_HOST, qpuChipOf, qpuDirectionOf, qpuHologramOf, qpuMachineOf, qpuSeatOf, qpuSuperpositionsOf, qpuTokensOf, qpuWidthOf } from '../../src/hologram.ts'

export interface HologramData {
  host: string
  seat: ReturnType<typeof qpuSeatOf>
  width: ReturnType<typeof qpuWidthOf>
  hologram: ReturnType<typeof qpuHologramOf>
  machine: ReturnType<typeof qpuMachineOf>
  chip: ReturnType<typeof qpuChipOf>
  tokens: Record<string, string>
  cells: number
  superpositions: ReturnType<typeof qpuSuperpositionsOf>
  direction: ReturnType<typeof qpuDirectionOf>
}

declare const data: HologramData
export { data }

export default defineLoader({
  watch: ['../../src/hologram.ts'],
  load(): HologramData {
    const superpositions = qpuSuperpositionsOf()
    return {
      host: QPU_HOST,
      seat: qpuSeatOf(),
      width: qpuWidthOf(),
      hologram: qpuHologramOf(),
      machine: qpuMachineOf(),
      chip: qpuChipOf(),
      tokens: qpuTokensOf(),
      cells: superpositions.length,
      superpositions,
      direction: qpuDirectionOf(),
    }
  },
})
