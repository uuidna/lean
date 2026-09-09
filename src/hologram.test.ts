import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DONATE_URL, GLAGOLITIC_BASE, HEXBIT_PAGE, HEXBIT_STATES, QPU_HOST, donateUrl, qpuFastenHolds, qpuFastenOf, qpuGlagoliticLatexOf, qpuGlagoliticOf, qpuHologramOf, qpuLicenceHostOf, qpuMachineOf, qpuSeatOf } from './hologram.js'
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

test('Glagolitic is the hexbit page — sixteen glyphs, also hex', () => {
  assert.equal(HEXBIT_PAGE.length, HEXBIT_STATES)
  assert.equal(qpuGlagoliticOf(0), String.fromCodePoint(GLAGOLITIC_BASE))
  assert.equal(qpuGlagoliticOf(HEXBIT_STATES - 1), String.fromCodePoint(GLAGOLITIC_BASE + HEXBIT_STATES - 1))
  assert.equal(qpuGlagoliticLatexOf(10), '\\mathtt{a}')
  assert.equal(qpuGlagoliticOf(10).length, 1)
  assert.equal(HEXBIT_PAGE[10], 'a')
})
