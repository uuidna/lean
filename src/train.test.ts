import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QPU_HOST, RAYS } from './hologram.js'
import { qpuLeanTrainHolds, qpuLeanTrainOf } from './train.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'

test('Lean train recognises 2×7 clusters in any prose without storing it', () => {
  const empty = qpuLeanTrainOf()
  assert.equal(empty.kind, 'train')
  assert.equal(empty.stored, false)
  assert.equal(empty.prose, false)
  assert.equal(empty.any, true)
  assert.equal(empty.clusters.length, RAYS * RAYS)
  assert.equal(qpuLeanTrainHolds(empty), true)
  const prose = qpuLeanTrainOf('inner outer seven rays witness theorems axioms zenodo')
  assert.equal(prose.corpus, false)
  assert.ok(prose.tokens > 0)
  assert.equal(prose.clusters.length, RAYS * RAYS)
  assert.equal(qpuLeanTrainHolds(prose), true)
})

test('GET /train /clusters and MCP qpu_train match', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/train`))
  assert.equal(res.status, 200)
  assert.equal((await res.json() as { kind: string }).kind, 'train')
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/clusters?q=seven`))
  assert.equal((await alias.json() as { kind: string; clusters: unknown[] }).kind, 'train')
  const mcp = await qpuMcpCall('qpu_train', { prose: 've faces' }) as { holds: boolean }
  assert.equal(mcp.holds, true)
})
