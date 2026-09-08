import { QPU_LICENCE, qpuLicenceApplyOf, qpuLicenceCertificateOf } from '@uuidna/qpu'

if (QPU_LICENCE.engine === 'qpu') {
  qpuLicenceApplyOf(qpuLicenceCertificateOf({
    subject: 'lean.uuidna.com',
    engine: 'lean',
  }))
}
