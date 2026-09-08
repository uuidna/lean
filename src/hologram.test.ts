import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DONATE_URL, QPU_HOST, donateUrl, qpuFastenHolds, qpuFastenOf, qpuLicenceHostOf, qpuMachineOf, qpuSeatOf } from './hologram.js'
import { qpuPeersOf } from './scale.js'

test('lean rebinds the inner QPU host', () => {
  assert.equal(QPU_HOST, 'lean.uuidna.com')
  assert.equal(qpuLicenceHostOf(), QPU_HOST)
  assert.equal(qpuMachineOf().host, QPU_HOST)
  assert.equal(qpuSeatOf().seat, 'empty')
})

test('fasten binds CPU; lean does not re-bench the inner QPU', () => {
  const f = qpuFastenOf()
  assert.equal(f.binds, 'cpu')
  assert.equal(f.concurrency, 1)
  assert.equal(f.isolation, 'none')
  assert.equal(qpuFastenHolds(f), true)
  assert.deepEqual(qpuPeersOf(), ['https://lean.uuidna.com', 'https://qpu.uuidna.com'])
})

test('donate door is the same Revolut wallet as uuidna', () => {
  assert.equal(DONATE_URL, 'https://revolut.me/ceccec')
  assert.equal(
    donateUrl('https://lean.uuidna.com'),
    'https://revolut.me/ceccec?note=https%3A%2F%2Flean.uuidna.com',
  )
})
