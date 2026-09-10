import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QPU_HOST, RAYS, TRINITY } from './hologram.js'
import { qpuLeanSolveHolds, qpuLeanSolveOf } from './solve.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'

test('Lean solve automates biggest risk–reward including prize bounty funding', () => {
  const s = qpuLeanSolveOf()
  assert.equal(s.kind, 'solve')
  assert.equal(s.automate, true)
  assert.equal(s.quotes, false)
  assert.equal(s.listing, false)
  assert.equal(s.biggest, 'prize')
  assert.equal(s.selected.key, 'clay_gravity_equals_rosette')
  assert.equal(s.prize.listing, false)
  assert.equal(s.prize.instances, RAYS)
  assert.equal(s.rewards.length, TRINITY)
  assert.ok(s.bounty)
  assert.equal(new URL(s.bounty!.href).hostname, 'inspirehep.net')
  assert.equal(new URL(s.funding.href).hostname, 'revolut.me')
  assert.equal(qpuLeanSolveHolds(s), true)
})

test('GET /solve /reward and MCP qpu_solve match', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/solve`))
  assert.equal(res.status, 200)
  const body = await res.json() as { kind: string; holds: boolean }
  assert.equal(body.kind, 'solve')
  assert.equal(body.holds, true)
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/reward`))
  assert.equal((await alias.json() as { kind: string }).kind, 'solve')
  const mcp = await qpuMcpCall('qpu_solve', {}) as { automate: boolean }
  assert.equal(mcp.automate, true)
})
