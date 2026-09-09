import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QPU_HOST, VE_FACES, qpuSeatOf } from './hologram.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'
import { QPU_WIDGETS, qpuUuidStreamHolds, qpuWidgetsHolds, qpuWidgetsOf } from './widgets.js'

test('Lean widgets share uuid streams; payload stays off', () => {
  const w = qpuWidgetsOf(0)
  assert.equal(w.kind, 'widgets')
  assert.equal(w.derived, 'lean')
  assert.equal(w.payload, false)
  assert.equal(w.finds, false)
  assert.equal(w.graphql, false)
  assert.equal(w.sse, '/sse')
  assert.equal(w.widgets.length, QPU_WIDGETS.length)
  assert.equal(w.stream.glyphs.length, VE_FACES)
  assert.equal(w.stream.center.from, 'glagolitic')
  assert.equal(w.seat, qpuSeatOf().seat)
  assert.ok(w.sites.every((site) => site.host.includes('.') && !site.host.includes('*')))
  assert.equal(qpuUuidStreamHolds(w.stream), true)
  assert.equal(qpuWidgetsHolds(w), true)
})

test('GET /widgets and MCP qpu_widgets are the uuid stream', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/widgets`))
  assert.equal(res.status, 200)
  const body = await res.json() as { payload: boolean; derived: string; stream: { uuids: string[] } }
  assert.equal(body.payload, false)
  assert.equal(body.derived, 'lean')
  assert.equal(body.stream.uuids.length, VE_FACES)
  const mcp = await qpuMcpCall('qpu_widgets', {}) as { payload: boolean; finds: boolean }
  assert.equal(mcp.payload, false)
  assert.equal(mcp.finds, false)
  const sse = await handleQpuFetch(new Request(`https://${QPU_HOST}/sse`))
  assert.match(sse.headers.get('content-type') ?? '', /text\/event-stream/)
  assert.match(await sse.text(), /event: stream/)
})
