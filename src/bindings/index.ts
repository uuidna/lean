import '../licence.js'
import {
  PROVIDERS, qpuProvidersOf, qpuProviderOf, qpuBindingsOf, qpuDrive, qpuRecognizeOf as qpuInnerRecognizeOf, qpuFusedEnvOf,
  qpuHostOf, qpuKeyOf, providerOf, mockEnvFrom, present, qpuSolidsOf, qpuSolidsHolds,
  type ProviderName, type BindingSpec, type DriverReading, type DriverResult, type ProviderModule, type QpuEnv,
} from '@uuidna/qpu'
import { qpuLeanFuseHostsOf } from '../fuse.js'

export {
  PROVIDERS, qpuProvidersOf, qpuProviderOf, qpuBindingsOf, qpuDrive, qpuFusedEnvOf,
  qpuHostOf, qpuKeyOf, providerOf, mockEnvFrom, present, qpuSolidsOf, qpuSolidsHolds,
}

export type { ProviderName, BindingSpec, DriverReading, DriverResult, ProviderModule, QpuEnv }

/** Lean environment: unrestricted internet to fused solving APIs by default. Wildcards refuse. */
export const qpuRecognizeOf = (env?: QpuEnv) => {
  const inner = qpuInnerRecognizeOf(env) as {
    fused: boolean
    chip: { seat: string }
    bindings: { provider?: string }[]
  }
  return Object.assign({}, inner as object, {
    sandbox: false as const,
    internet: true as const,
    unrestricted: true as const,
    default: true as const,
    fuse: {
      protocol: 'https' as const,
      domains: [...qpuLeanFuseHostsOf()],
      wildcards: false as const,
      unrestricted: true as const,
    },
  }) as typeof inner & {
    sandbox: false
    internet: true
    unrestricted: true
    default: true
    fuse: {
      protocol: 'https'
      domains: string[]
      wildcards: false
      unrestricted: true
    }
  }
}
