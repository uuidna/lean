import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HANDLE_HEXBITS, HEXBIT_PAGE, QPU_HOST, QPU_POINTS, TETRA, VE_FACES, qpuGlagoliticOf, qpuSeatOf } from './hologram.js'
import {
  LEAN_AXIOM_CENSUS, LEAN_AXIOM_FACES, LEAN_AXIOM_METHODS, LEAN_AXIOM_TRACKS,
  qpuLeanAxiomsHolds, qpuLeanAxiomsOf,
} from './axioms.js'
import { qpuStandingFilesOf } from './standing.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'

test('Lean axioms fuse standing files onto fourteen wings and eight uuidna.com/lean tiles', () => {
  const a = qpuLeanAxiomsOf()
  const files = qpuStandingFilesOf()
  const wings = files.filter((f) => f !== 'Chat.lean' && f !== 'Tesla.lean')
  assert.equal(a.product, 'Lean axioms')
  assert.equal(a.kind, 'axioms')
  assert.equal(a.seat, qpuSeatOf().seat)
  assert.equal(a.axiom.seat, 'empty')
  assert.equal(a.editor.seat, 'empty')
  assert.equal(a.faces.length, VE_FACES)
  assert.ok(files.includes('Chat.lean'))
  assert.ok(files.includes('Tesla.lean'))
  assert.deepEqual(a.faces.map((row) => row.name), wings.slice(0, VE_FACES))
  assert.equal(a.faces.some((row) => row.name === 'Chat.lean'), false)
  assert.equal(a.faces.some((row) => row.name === 'Tesla.lean'), false)
  assert.ok(a.faces.some((row) => row.name === 'Universe.lean'))
  for (let i = 0; i < VE_FACES; i++) {
    assert.equal(a.faces[i]!.glue, qpuGlagoliticOf(i))
    assert.equal(a.faces[i]!.hex, HEXBIT_PAGE[i])
    assert.equal(a.faces[i]!.name.endsWith('.lean'), true)
  }
  assert.equal(a.census.length, HANDLE_HEXBITS)
  assert.deepEqual(a.census.map((c) => c.slug), LEAN_AXIOM_CENSUS.map((c) => c.slug))
  assert.deepEqual(a.census.map((c) => c.slug), wings.slice(0, HANDLE_HEXBITS))
  for (const row of a.census) {
    const u = new URL(row.href)
    assert.equal(u.protocol, 'https:')
    assert.equal(u.hostname, 'uuidna.com')
    assert.equal(u.pathname, `/lean/${row.slug}`)
  }
  assert.equal(a.methods.length, QPU_POINTS.length)
  assert.deepEqual(a.methods.map((m) => m.name), [...LEAN_AXIOM_METHODS])
  assert.equal(a.methods[1]!.point, 'GPU')
  assert.equal(a.tracks.length, TETRA)
  assert.deepEqual(a.tracks.map((t) => t.name), [...LEAN_AXIOM_TRACKS])
  assert.equal(LEAN_AXIOM_FACES.length, VE_FACES)
  assert.ok(LEAN_AXIOM_FACES.every((f) => f.endsWith('.lean')))
  assert.equal(a.leads.length, files.length)
  assert.equal(a.articles.length, a.leads.length)
  assert.ok(a.leads.length > VE_FACES)
  assert.equal(a.leads.some((row) => row.file === 'Chat.lean' && row.docket === true), true)
  assert.ok(a.leads.some((row) => row.file === 'Tesla.lean'))
  assert.ok(a.leads.every((row) => row.theorems.length > 0))
  assert.equal(new URL(a.streaming.href).hostname, QPU_HOST)
  assert.equal(new URL(a.streaming.href).pathname, '/axioms')
  assert.equal(qpuLeanAxiomsHolds(a), true)
})

test('GET /axioms and /wings and MCP qpu_axioms match; /standing stays the file census', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/axioms`))
  assert.equal(res.status, 200)
  const body = await res.json() as { holds: boolean; product: string; faces: unknown[]; census: { href: string }[]; axiom: { seat: string }; leads: { file: string }[] }
  assert.equal(body.holds, true)
  assert.equal(body.product, 'Lean axioms')
  assert.equal(body.axiom.seat, 'empty')
  assert.equal(body.faces.length, VE_FACES)
  assert.equal(body.leads.length, qpuStandingFilesOf().length)
  assert.ok(body.leads.some((row) => row.file === 'Chat.lean'))
  assert.equal(new URL(body.census[0]!.href).hostname, 'uuidna.com')
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/wings`))
  assert.equal(alias.status, 200)
  const same = await alias.json() as { kind: string }
  assert.equal(same.kind, 'axioms')
  const standing = await handleQpuFetch(new Request(`https://${QPU_HOST}/standing`))
  assert.equal(standing.status, 200)
  const files = await standing.json() as { files: string[] }
  assert.ok(files.files.includes('Qpu.lean'))
  const mcp = await qpuMcpCall('qpu_axioms', {}) as { kind: string; tracks: unknown[] }
  assert.equal(mcp.kind, 'axioms')
  assert.equal(mcp.tracks.length, TETRA)
  const named = await qpuMcpCall('qpu_wings', {}) as { product: string }
  assert.equal(named.product, 'Lean axioms')
})
