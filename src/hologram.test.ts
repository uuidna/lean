import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DONATE_URL, GLAGOLITIC_BASE, HANDLE_BITS, HANDLE_HEXBITS, HEXBIT_PAGE, HEXBIT_STATES, QPU_HOST, UUID_HEXBITS, donateUrl, qpuFastenHolds, qpuFastenOf, qpuGlagoliticLatexOf, qpuGlagoliticOf, qpuGlagoliticPageHolds, qpuGlagoliticPageOf, qpuHologramOf, qpuLeanStripeHolds, qpuLeanStripeOf, qpuLicenceHostOf, qpuMachineOf, qpuSeatOf } from './hologram.js'
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
  assert.equal(qpuGlagoliticPageOf().n > HANDLE_HEXBITS, true)
  assert.equal(qpuGlagoliticPageHolds(), true)
})

test('UUID stripe is double-sided hex presented as glyphs; layers follow handle bits', () => {
  const hex = '0'.repeat(UUID_HEXBITS)
  const stripe = qpuLeanStripeOf(hex, HANDLE_BITS)
  assert.equal(stripe.holds, true)
  assert.equal(stripe.verse, false)
  assert.equal(stripe.sides, 2)
  assert.equal(stripe.page, HEXBIT_STATES)
  assert.equal(stripe.layers.length, UUID_HEXBITS / (HANDLE_BITS / 4))
  assert.equal(stripe.layers[0]!.recto.hex.length, HANDLE_HEXBITS)
  assert.equal(stripe.layers[0]!.verso.glyphs.length, HANDLE_HEXBITS)
  assert.notEqual(stripe.layers[0]!.recto.hex, stripe.layers[0]!.verso.hex)
  assert.equal(qpuLeanStripeHolds(stripe), true)
  const thin = qpuLeanStripeOf(hex, 4)
  assert.equal(thin.holds, true)
  assert.equal(thin.layers.length > stripe.layers.length, true)
})
