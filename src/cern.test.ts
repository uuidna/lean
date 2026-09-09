import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HANDLE_HEXBITS, QPU_HOST, QPU_POINTS, TETRA, VE_FACES, qpuSeatOf, qpuTwoNOf } from './hologram.js'
import {
  CERN_CENSUS, CERN_EXPERIMENTS, CERN_INSPIRE_COLLECTIONS, CERN_OPEN_APIS,
  qpuLeanCernHolds, qpuLeanCernOf,
} from './cern.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'
import { qpuSidebarOf } from './chrome.js'

test('Lean CERN fuses the Lean register onto fourteen named CERN APIs', () => {
  const c = qpuLeanCernOf()
  assert.equal('error' in c, false)
  if ('error' in c) return
  assert.equal(c.product, 'Lean CERN')
  assert.equal(c.kind, 'cern')
  assert.equal(c.derived, 'lean')
  assert.equal(c.source, 'live-api')
  assert.equal(c.invented, false)
  assert.equal(c.mint.seat, 'empty')
  assert.equal(c.emails, false)
  assert.equal(c.tokens, false)
  assert.equal(c.free, true)
  assert.equal(c.keyless, true)
  assert.equal(c.interact, true)
  assert.equal(c.fetches, 0)
  assert.equal(c.when, 'never')
  assert.equal(c.seat, qpuSeatOf().seat)
  assert.equal(c.apis.length, VE_FACES)
  assert.equal(CERN_INSPIRE_COLLECTIONS.length + CERN_OPEN_APIS.length, VE_FACES)
  assert.equal(c.census.length, HANDLE_HEXBITS)
  assert.equal(CERN_CENSUS.length, HANDLE_HEXBITS)
  assert.equal(c.methods.length, QPU_POINTS.length)
  assert.equal(c.tracks.length, TETRA)
  assert.deepEqual(c.tracks.map((row) => row.name), [...CERN_EXPERIMENTS])
  assert.equal(c.capacity, qpuTwoNOf(VE_FACES))
  assert.equal(c.leads[0]!.file, 'Quantum.lean')
  assert.equal(c.preservation.occupied, false)
  assert.equal(c.preservation.token, false)
  assert.equal(new URL(c.streaming.href).hostname, QPU_HOST)
  assert.equal(new URL(c.streaming.href).pathname, '/cern')
  assert.equal(new URL(c.leads[0]!.inspire).hostname, 'inspirehep.net')
  assert.equal(new URL(c.census[0]!.href).hostname, 'home.cern')
  assert.equal(qpuLeanCernHolds(c), true)
  const gone = qpuLeanCernOf(VE_FACES)
  assert.equal(gone.holds, false)
  assert.equal('error' in gone && gone.error, 'no such reading')
})

test('GET /cern and /lhc and MCP qpu_cern match; chrome does not steal /cited', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/cern`))
  assert.equal(res.status, 200)
  const body = await res.json() as { kind: string; holds: boolean; derived: string; apis: unknown[] }
  assert.equal(body.kind, 'cern')
  assert.equal(body.holds, true)
  assert.equal(body.derived, 'lean')
  assert.equal(body.apis.length, VE_FACES)
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/lhc`))
  assert.equal(alias.status, 200)
  assert.equal((await alias.json() as { kind: string }).kind, 'cern')
  const mcp = await qpuMcpCall('qpu_cern', {}) as { product: string; tokens: boolean }
  assert.equal(mcp.product, 'Lean CERN')
  assert.equal(mcp.tokens, false)
  const named = await qpuMcpCall('qpu_lhc', {}) as { kind: string }
  assert.equal(named.kind, 'cern')
  const face = await handleQpuFetch(new Request(`https://${QPU_HOST}/cern?face=3`))
  assert.equal(face.status, 200)
  const picked = await face.json() as { selected: { face: number }; holds: boolean }
  assert.equal(picked.selected.face, 3)
  assert.equal(picked.holds, true)
  const missing = await handleQpuFetch(new Request(`https://${QPU_HOST}/cern?face=99`))
  assert.equal(missing.status, 404)
  assert.equal('/cited'.startsWith('/cern'), false)
  assert.equal('/cern'.startsWith('/cited'), false)
  assert.equal(qpuSidebarOf('/cern')[0]!.items.length > 0, true)
})
