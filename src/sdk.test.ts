import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as lib from './index.js'

const HOLDS = [
  'qpuChipHolds',
  'qpuFastenHolds',
  'qpuExperienceHolds',
  'qpuVersionMaskHolds',
  'qpuCaptainOrdersHolds',
  'qpuOgHolds',
  'qpuFractalHolds',
  'qpuCompareHolds',
  'qpuPackagesHolds',
  'qpuLiveHolds',
  'qpuSearchHolds',
  'qpuStandingHolds',
  'qpuLeanTheoremsHolds',
  'qpuLeanAxiomsHolds',
  'qpuLeanPublicationsHolds',
] as const

test('package door Holds', () => {
  for (const name of HOLDS) {
    const fn = (lib as Record<string, unknown>)[name]
    assert.equal(typeof fn, 'function', name)
    assert.equal((fn as () => boolean)(), true, name)
  }
})

test('hexbit and handle widths are the quantum computer', () => {
  assert.equal(lib.HEXBIT_BITS, 4)
  assert.equal(lib.HEXBIT_STATES, 16)
  assert.equal(lib.HANDLE_HEXBITS, 8)
  assert.equal(lib.VE_FACES, lib.HANDLE_HEXBITS + lib.HEXBIT_BITS + lib.COINS)
  assert.equal(lib.qpuIntegerOfHexbits(lib.qpuHexbitDigitsOf(32)), 32)
})
