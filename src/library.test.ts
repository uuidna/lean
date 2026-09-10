import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ADDRESS_BITS, HANDLE_BITS, HANDLE_HEXBITS, HEXBIT_STATES, QPU_HOST, UUID_HEXBITS, SEAL_TEN, VE_FACES, qpuSeatOf, qpuTwoNOf } from './hologram.js'
import { LEAN_ESSAY_PAGE, LEAN_LIBRARY_LEADS, qpuLeanEssaysHolds, qpuLeanLibraryHolds, qpuLeanLibraryOf, qpuLeanStripeOgHolds } from './library.js'
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
  assert.equal(lib.essays.length, LEAN_ESSAY_PAGE)
  assert.equal(lib.pageSize, HANDLE_HEXBITS + HEXBIT_STATES)
  assert.equal(lib.sides, 2)
  assert.equal(lib.pageTiles, HEXBIT_STATES)
  assert.equal(lib.magnitudes, true)
  assert.equal(BigInt(lib.clusters), 1n << BigInt(ADDRESS_BITS))
  assert.equal(lib.essays[0]!.uuid.length, UUID_HEXBITS)
  assert.equal(lib.essays[0]!.verse, false)
  assert.equal(lib.essays[0]!.words, 0)
  assert.equal(lib.essays[0]!.stripe.sides, 2)
  assert.equal(lib.essays[0]!.refs.length, VE_FACES)
  assert.ok(lib.essays[0]!.href.endsWith(`/${lib.essays[0]!.uuid}`))
  assert.equal(qpuLeanStripeOgHolds(), true)
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

test('GET /library /books /essays and MCP qpu_library are the combinatorial book', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/library?book=00000000000000`))
  assert.equal(res.status, 200)
  const body = await res.json() as {
    verse: boolean
    volume: number
    clusters: string
    magnitudes: boolean
    essays: { uuid: string; verse: boolean }[]
    leads: { key: string }[]
  }
  assert.equal(body.verse, false)
  assert.equal(body.volume, 10 ** 14)
  assert.equal(body.magnitudes, true)
  assert.equal(body.essays.length, LEAN_ESSAY_PAGE)
  assert.equal(body.essays[0]!.verse, false)
  assert.ok(body.leads.some((row) => row.key === 'literature_sonnet_volume'))
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/books`))
  assert.equal(alias.status, 200)
  const essays = await handleQpuFetch(new Request(`https://${QPU_HOST}/essays?page=1`))
  assert.equal(essays.status, 200)
  const desk = await essays.json() as { essays: unknown[]; pageSize: number }
  assert.equal(desk.pageSize, LEAN_ESSAY_PAGE)
  assert.equal(desk.essays.length, LEAN_ESSAY_PAGE)
  const mcp = await qpuMcpCall('qpu_library', { book: '0' }) as { verse: boolean; cost: number }
  assert.equal(mcp.verse, false)
  assert.equal(mcp.cost, 0)
  const named = await qpuMcpCall('qpu_essays', { page: '1' }) as { magnitudes: boolean; verse: boolean }
  assert.equal(named.verse, false)
  assert.equal(named.magnitudes, true)
  assert.equal(qpuLeanEssaysHolds(), true)
  const uuid = '0'.repeat(UUID_HEXBITS)
  const striped = qpuLeanLibraryOf(uuid)
  assert.equal('error' in striped, false)
  if ('error' in striped) return
  assert.equal(striped.stripe.hex, uuid)
  assert.equal(striped.stripe.holds, true)
  const page = await handleQpuFetch(new Request(`https://${QPU_HOST}/${uuid}`))
  assert.equal(page.status, 200)
  const og = await page.json() as {
    kind: string
    theorem: boolean
    verse: boolean
    requisites: boolean
    refs: { face: number; opposite: number; rotor: string }[]
    og: { width: number; height: number; image: string }
    href: string
  }
  assert.equal(og.kind, 'og')
  assert.equal(og.theorem, true)
  assert.equal(og.verse, false)
  assert.equal(og.requisites, true)
  assert.equal(og.refs.length, VE_FACES)
  assert.equal(og.og.width, 1200)
  assert.equal(og.og.height, 630)
  assert.equal(new URL(og.href).pathname, `/${uuid}`)
  assert.equal(og.refs.filter((r) => r.rotor === 'inner').length, 7)
  assert.equal(og.refs.filter((r) => r.rotor === 'outer').length, 7)
  const mcpStripe = await qpuMcpCall('qpu_stripe', { uuid }) as { holds: boolean; refs: unknown[] }
  assert.equal(mcpStripe.holds, true)
  assert.equal(mcpStripe.refs.length, VE_FACES)
  const bad = await handleQpuFetch(new Request(`https://${QPU_HOST}/library?book=not-a-book`))
  assert.equal(bad.status, 404)
})
