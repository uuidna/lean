import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ADDRESS_BITS, HANDLE_BITS, QPU_HOST, SEAL_TEN, VE_FACES, qpuSeatOf, qpuTwoNOf } from './hologram.js'
import { LEAN_LIBRARY_LEADS, qpuLeanLibraryHolds, qpuLeanLibraryOf } from './library.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'

test('Lean library admits 10¹⁴ books without verse, at no time', () => {
  const lib = qpuLeanLibraryOf(0)
  assert.equal('error' in lib, false)
  if ('error' in lib) return
  assert.equal(lib.product, 'Lean library')
  assert.equal(lib.verse, false)
  assert.equal(lib.stored, false)
  assert.equal(lib.public, true)
  assert.equal(lib.cost, 0)
  assert.equal(lib.fetches, 0)
  assert.equal(lib.when, 'never')
  assert.equal(lib.time, false)
  assert.equal(lib.tokens.llm, 0)
  assert.equal(lib.tokens.cost, 0)
  assert.equal(lib.lines, VE_FACES)
  assert.equal(lib.variants, SEAL_TEN.length)
  assert.equal(lib.measure, 140)
  assert.equal(lib.volume, 10 ** 14)
  assert.equal(lib.volume > qpuTwoNOf(HANDLE_BITS), true)
  assert.equal(BigInt(lib.volume) < (1n << BigInt(ADDRESS_BITS)), true)
  assert.equal(lib.catalog, '00000000000000')
  assert.equal(lib.strips.length, VE_FACES)
  assert.equal(lib.leads.length, LEAN_LIBRARY_LEADS.length)
  assert.equal(lib.seat, qpuSeatOf().seat)
  assert.equal(lib.scale.fetches, 0)
  assert.equal(lib.speed.beats, lib.speed.verify)
  assert.equal(qpuLeanLibraryHolds(lib), true)
})

test('curiosity computes one book; a foreign catalog is no such reading', () => {
  const lib = qpuLeanLibraryOf('31415926535897')
  assert.equal('error' in lib, false)
  if ('error' in lib) return
  assert.equal(lib.catalog, '31415926535897')
  assert.equal(lib.strips[0]!.choice, 3)
  assert.equal(lib.strips[13]!.choice, 7)
  const gone = qpuLeanLibraryOf('abc')
  assert.equal('error' in gone, true)
  if (!('error' in gone)) return
  assert.equal(gone.error, 'no such reading')
  assert.equal(gone.holds, false)
})

test('GET /library /books and MCP qpu_library are the combinatorial book', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/library?book=00000000000000`))
  assert.equal(res.status, 200)
  const body = await res.json() as { verse: boolean; volume: number; leads: { key: string }[] }
  assert.equal(body.verse, false)
  assert.equal(body.volume, 10 ** 14)
  assert.ok(body.leads.some((row) => row.key === 'literature_sonnet_volume'))
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/books`))
  assert.equal(alias.status, 200)
  const mcp = await qpuMcpCall('qpu_library', { book: '0' }) as { verse: boolean; cost: number }
  assert.equal(mcp.verse, false)
  assert.equal(mcp.cost, 0)
  const bad = await handleQpuFetch(new Request(`https://${QPU_HOST}/library?book=not-a-book`))
  assert.equal(bad.status, 404)
})
