import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COINS, QPU_HOST, RAYS, VE_FACES } from './hologram.js'
import { qpuLeanFuseHolds, qpuLeanFuseOf, qpuLeanInternetHolds, qpuLeanInternetOf } from './fuse.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'

test('Lean fuse occupies solving APIs onto quantum capacity with 2×7 witnesses', () => {
  const f = qpuLeanFuseOf()
  assert.equal(f.kind, 'fuse')
  assert.equal(f.from, 'problems')
  assert.equal(f.to, 'solutions')
  assert.equal(f.internet.unrestricted, true)
  assert.equal(f.internet.default, true)
  assert.equal(f.internet.wildcards, false)
  assert.equal(f.fill, f.capacity)
  assert.equal(f.clusters.length, RAYS * RAYS)
  assert.equal(RAYS * COINS, VE_FACES)
  assert.ok(f.apis.length >= VE_FACES)
  assert.equal(qpuLeanFuseHolds(f), true)
  assert.equal(qpuLeanInternetHolds(), true)
  assert.equal(qpuLeanInternetOf().unrestricted, true)
})

test('GET /fuse /internet and MCP qpu_fuse match', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/fuse`))
  assert.equal(res.status, 200)
  const body = await res.json() as { kind: string; holds: boolean }
  assert.equal(body.kind, 'fuse')
  assert.equal(body.holds, true)
  const net = await handleQpuFetch(new Request(`https://${QPU_HOST}/internet`))
  assert.equal((await net.json() as { kind: string }).kind, 'internet')
  const mcp = await qpuMcpCall('qpu_fuse', {}) as { holds: boolean; clusters: unknown[] }
  assert.equal(mcp.holds, true)
  assert.equal(mcp.clusters.length, RAYS * RAYS)
})
