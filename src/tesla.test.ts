import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QPU_DOORS, QPU_HOST } from './hologram.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'
import { qpuTeslaHolds } from './hologram.js'

test('GET /tesla and MCP qpu_tesla occupy Tesla.lean as one cluster', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/tesla`))
  assert.equal(res.status, 200)
  const body = await res.json() as { kind: string; holds: boolean; n: number; uses: { explored: boolean }[] }
  assert.equal(body.kind, 'tesla')
  assert.equal(body.holds, true)
  assert.equal(body.n, QPU_DOORS)
  assert.ok(body.uses.every((u) => u.explored === false))
  assert.equal(qpuTeslaHolds(), true)
  const mcp = await qpuMcpCall('qpu_tesla', {}) as { one: boolean; analog: boolean; hidden: boolean }
  assert.equal(mcp.one, true)
  assert.equal(mcp.analog, true)
  assert.equal(mcp.hidden, false)
})
