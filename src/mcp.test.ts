import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleQpuMcpRpc } from './mcp-rpc.js'
import { QPU_TOOLS, qpuMcpCall, qpuMcpToolNames } from './mcp-catalog.js'
import { mockCloudflareEnv } from './bindings/cloudflare/mock.js'
import { CLOUDFLARE_BINDINGS } from './bindings/cloudflare/kinds.js'
import { qpuSeoAuditOf, qpuSeoOf, qpuSitemapOf, qpuRoutesOf } from './seo.js'
import { VE_FACES } from './hologram.js'
import { QPU_MCP_NAME, QPU_VERSION } from './version.js'

test('MCP tools/list includes every catalog tool', async () => {
  const names = qpuMcpToolNames()
  assert.ok(names.includes('qpu_seat'))
  assert.ok(names.includes('qpu_gateways'))
  assert.ok(names.includes('qpu_live'))
  assert.ok(names.includes('qpu_proofs'))
  assert.ok(names.includes('qpu_bindings'))
  const listed = await handleQpuMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as {
    result: { tools: { name: string }[] }
  }
  assert.equal(listed.result.tools.length, QPU_TOOLS.length)
})

test('MCP initialize ping and tools/call', async () => {
  const init = await handleQpuMcpRpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} }) as {
    result: { protocolVersion: string; serverInfo: { name: string; version: string } }
  }
  assert.equal(init.result.serverInfo.name, QPU_MCP_NAME)
  assert.equal(init.result.serverInfo.version, QPU_VERSION)
  const ping = await handleQpuMcpRpc({ jsonrpc: '2.0', id: 2, method: 'ping' }) as { result: object }
  assert.deepEqual(ping.result, {})
  const seat = await handleQpuMcpRpc({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: { name: 'qpu_seat', arguments: {} },
  }) as { result: { content: { text: string }[] } }
  assert.match(seat.result.content[0]!.text, /"empty"/)
  const proofs = await qpuMcpCall('qpu_proofs', {}) as { complete: boolean; concept: { seat: string } }
  assert.equal(proofs.concept.seat, 'empty')
  assert.equal(proofs.complete, true)
})

test('qpu_drive on mock env covers every Cloudflare kind', async () => {
  const env = mockCloudflareEnv()
  const names = await qpuMcpCall('qpu_providers', {}) as { name: string; seat: string }[]
  assert.deepEqual(names.map((p) => p.name), ['cloudflare', 'google', 'aws', 'azure', 'ibm', 'oracle', 'hardware', 'arch'])
  const environment = await qpuMcpCall('qpu_environment', {}, env) as { fused: boolean; chip: { seat: string } }
  assert.equal(environment.fused, true)
  assert.equal(environment.chip.seat, 'empty')
  const rows = await qpuMcpCall('qpu_bindings', { provider: 'cloudflare' }, env) as { bound: boolean }[]
  assert.equal(rows.length, CLOUDFLARE_BINDINGS.length)
  assert.ok(rows.every((r) => r.bound))
  for (const b of CLOUDFLARE_BINDINGS) {
    const out = await qpuMcpCall('qpu_drive', { provider: 'cloudflare', kind: b.kind, op: 'probe' }, env) as {
      ok: boolean
      kind: string
    }
    assert.equal(out.ok, true, b.kind)
    assert.equal(out.kind, b.kind)
  }
})

test('SEO audit is clean and sitemap has every face', () => {
  const audit = qpuSeoAuditOf()
  assert.equal(audit.ok, true, JSON.stringify(audit.gaps))
  assert.ok(audit.pages >= 8 + VE_FACES)
  const home = qpuSeoOf('/')
  assert.ok(home.head.some((h) => h[0] === 'meta' && h[1].property === 'og:url' && h[1].content === 'https://lean.uuidna.com/'))
  assert.ok(home.head.some((h) => h[0] === 'link' && h[1].rel === 'payment' && (h[1].href ?? '').includes('revolut.me')))
  assert.ok(home.head.some((h) => h[0] === 'meta' && h[1].name === 'funding' && h[1].content === 'https://revolut.me/ceccec'))
  assert.ok(JSON.stringify(home.jsonLd).includes('revolut.me'))
  const gone = qpuSeoOf('/404')
  assert.equal(gone.kind, 'gone')
  assert.ok(gone.head.some((h) => h[0] === 'link' && h[1].rel === 'payment' && (h[1].href ?? '').includes('revolut.me')))
  assert.ok(JSON.stringify(gone.jsonLd).includes('revolut.me'))
  assert.ok(gone.head.some((h) => h[1].content === 'noindex, nofollow'))
  assert.equal(qpuRoutesOf().filter((r) => r.kind === 'face').length, VE_FACES)
})
