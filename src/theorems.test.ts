import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HANDLE_HEXBITS, QPU_HOST, QPU_POINTS, TETRA, VE_FACES, qpuSeatOf } from './hologram.js'
import {
  LEAN_THEOREM_CENSUS, LEAN_THEOREM_FACES, LEAN_THEOREM_METHODS, LEAN_THEOREM_TRACKS,
  qpuLeanTheoremsHolds, qpuLeanTheoremsOf,
} from './theorems.js'
import { STANDING } from './standing.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'

test('Lean theorems fuse inner QPU uses onto fourteen faces and eight uuidna.com tiles', () => {
  const t = qpuLeanTheoremsOf()
  const keys = new Set(STANDING.map((s) => s.key))
  assert.equal(t.product, 'Lean theorems')
  assert.equal(t.kind, 'theorems')
  assert.equal(t.seat, qpuSeatOf().seat)
  assert.equal(t.mint.seat, 'empty')
  assert.equal(t.editor.seat, 'empty')
  assert.equal(t.faces.length, VE_FACES)
  assert.equal(LEAN_THEOREM_FACES.length, VE_FACES)
  assert.ok(t.faces.every((row) => keys.has(row.name)))
  assert.equal(t.census.length, HANDLE_HEXBITS)
  assert.deepEqual(t.census.map((c) => c.slug), LEAN_THEOREM_CENSUS.map((c) => c.slug))
  assert.deepEqual(t.census.map((c) => c.slug), [...LEAN_THEOREM_FACES.slice(0, HANDLE_HEXBITS)])
  for (const row of t.census) {
    const u = new URL(row.href)
    assert.equal(u.protocol, 'https:')
    assert.equal(u.hostname, 'uuidna.com')
    assert.equal(u.pathname, `/theorem/${row.slug}`)
  }
  assert.equal(t.methods.length, QPU_POINTS.length)
  assert.deepEqual(t.methods.map((m) => m.name), [...LEAN_THEOREM_METHODS])
  assert.equal(t.methods[1]!.point, 'GPU')
  assert.equal(t.tracks.length, TETRA)
  assert.deepEqual(t.tracks.map((row) => row.name), [...LEAN_THEOREM_TRACKS])
  assert.equal(new URL(t.streaming.href).hostname, QPU_HOST)
  assert.equal(new URL(t.streaming.href).pathname, '/theorems')
  assert.equal(qpuLeanTheoremsHolds(t), true)
})

test('GET /theorems and /cited and MCP qpu_theorems match; /standing stays the file census', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/theorems`))
  assert.equal(res.status, 200)
  const body = await res.json() as { holds: boolean; product: string; faces: unknown[]; census: { href: string }[]; mint: { seat: string } }
  assert.equal(body.holds, true)
  assert.equal(body.product, 'Lean theorems')
  assert.equal(body.mint.seat, 'empty')
  assert.equal(body.faces.length, VE_FACES)
  assert.equal(new URL(body.census[0]!.href).hostname, 'uuidna.com')
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/cited`))
  assert.equal(alias.status, 200)
  const same = await alias.json() as { kind: string }
  assert.equal(same.kind, 'theorems')
  const standing = await handleQpuFetch(new Request(`https://${QPU_HOST}/standing`))
  assert.equal(standing.status, 200)
  const files = await standing.json() as { files: string[] }
  assert.ok(files.files.includes('Qpu.lean'))
  const mcp = await qpuMcpCall('qpu_theorems', {}) as { kind: string; tracks: unknown[] }
  assert.equal(mcp.kind, 'theorems')
  assert.equal(mcp.tracks.length, TETRA)
  const named = await qpuMcpCall('qpu_cited', {}) as { product: string }
  assert.equal(named.product, 'Lean theorems')
})
