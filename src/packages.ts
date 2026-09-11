// packages — Lean stamp. One runtime dep: the inner QPU. Auditor lives on this occupancy.
import { qpuPackagesHolds as packagesHolds, qpuPackagesOf as packagesOf, qpuPkgStampOf } from './packages-inner.js'

export { QPU_DEV_PACKAGES, qpuPkgOf, type QpuPkg } from './packages-inner.js'

export const QPU_RUNTIME_PACKAGES = ['@uuidna/qpu'] as const

export const QPU_PKG_STAMP = qpuPkgStampOf('@uuidna/lean', '0.3.1', {
  '@uuidna/qpu': 'file:../qpu',
})

export const qpuPackagesOf = (pkg = QPU_PKG_STAMP) => packagesOf(pkg, QPU_RUNTIME_PACKAGES)

export const qpuPackagesHolds = (pkg = QPU_PKG_STAMP): boolean => packagesHolds(pkg, QPU_RUNTIME_PACKAGES)
