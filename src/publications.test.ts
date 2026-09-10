import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HANDLE_BITS, QPU_HOST, VE_FACES, qpuSeatOf, qpuTwoNOf } from './hologram.js'
import { STANDING, UUIDNA_DOI, CAPTAIN } from './standing.js'
import { qpuLeanPublicationsHolds, qpuLeanPublicationsOf } from './publications.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'

test('Lean register is DOI-grade; handle means proven by decide for fourteen observers', () => {
  const p = qpuLeanPublicationsOf()
  assert.equal(p.kind, 'register')
  assert.equal(p.product, 'Lean register')
  assert.equal(p.host, 'lean.uuidna.com')
  assert.equal(p.doi.kind, 'doi')
  assert.equal(p.doi.id, UUIDNA_DOI)
  assert.equal(p.doi.sealed, true)
  assert.equal(p.doi.captain, CAPTAIN)
  assert.equal(p.doi.redirect, 'referer')
  assert.equal(p.doi.verified, true)
  assert.equal(p.doi.referer, p.streaming.href)
  assert.equal(p.doi.landing, p.doi.referer)
  assert.equal(p.doi.fetches, 0)
  assert.equal(p.media.kind, 'outlets')
  assert.equal(p.media.initiate, true)
  assert.equal(p.media.url, p.doi.referer)
  assert.equal(p.media.outlets.length, 6)
  assert.equal(p.media.zenodo.kind, 'publication')
  assert.equal(p.media.zenodo.publication, true)
  assert.equal(p.media.zenodo.url, p.doi.referer)
  assert.equal(p.zenodo.monitor, true)
  assert.equal(p.zenodo.green, true)
  assert.equal(p.zenodo.doi, UUIDNA_DOI)
  assert.equal(p.zenodo.crawl, false)
  assert.equal(new URL(p.zenodo.api).hostname, 'zenodo.org')
  assert.equal(new URL(p.zenodo.api).pathname, '/api/records')
  assert.equal(p.media.elsewhere.every((row) => row.share === true && row.url === p.doi.referer), true)
  for (const outlet of p.media.outlets) {
    assert.equal(outlet.url, p.doi.referer)
    assert.equal(outlet.share, true)
    assert.equal(outlet.url.includes('prove2.me'), false)
  }
  assert.equal(p.open.zenodo, false)
  assert.equal(p.open.share, false)
  const order = Object.keys(p)
  assert.ok(order.indexOf('open') < order.indexOf('leads'))
  assert.ok(order.indexOf('media') < order.indexOf('leads'))
  assert.equal(p.handle.means, 'proven')
  assert.equal(p.handle.decide, 'by decide')
  assert.equal(p.handle.observers, VE_FACES)
  assert.equal(p.find, 'payload.find')
  assert.equal(p.graphql, false)
  assert.equal(p.fetches, 0)
  assert.equal(p.crawl, false)
  assert.equal(p.compile.seat, 'empty')
  assert.equal(p.seat, qpuSeatOf().seat)
  assert.equal(p.leads.length, STANDING.length)
  assert.equal(p.articles.length, p.leads.length)
  assert.equal(p.doors, qpuTwoNOf(HANDLE_BITS))
  assert.ok(p.doors > 1_000_000_000)
  for (const row of p.leads) {
    const prior = new URL(row.prior)
    assert.equal(prior.protocol, 'https:')
    assert.equal(prior.hostname, 'uuidna.com')
    assert.equal(prior.pathname, `/theorem/${row.key}`)
    assert.equal(row.file.endsWith('.lean'), true)
    assert.equal(row.doi, UUIDNA_DOI)
    assert.equal(row.captain, 'Tsvetan Rouschev')
    assert.equal(row.zenodo, true)
    assert.equal(row.share, 'elsewhere')
    const keys = Object.keys(row)
    assert.ok(keys.indexOf('prior') < keys.indexOf('captain'), row.key)
    assert.ok(keys.indexOf('doi') < keys.indexOf('captain') || keys.indexOf('prior') < keys.indexOf('captain'))
  }
  assert.equal(new URL(p.streaming.href).pathname, '/register')
  assert.equal(qpuLeanPublicationsHolds(p), true)
})

test('GET /register and /publications and MCP qpu_register match', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/register`))
  assert.equal(res.status, 200)
  const body = await res.json() as {
    kind: string
    holds: boolean
    handle: { means: string; decide: string; observers: number }
    leads: { key: string }[]
  }
  assert.equal(body.kind, 'register')
  assert.equal(body.holds, true)
  assert.equal(body.handle.means, 'proven')
  assert.equal(body.handle.decide, 'by decide')
  assert.equal(body.handle.observers, VE_FACES)
  assert.equal(body.leads.length, STANDING.length)
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/publications`))
  assert.equal(alias.status, 200)
  const published = await alias.json() as { kind: string; articles: unknown[] }
  assert.equal(published.kind, 'register')
  assert.equal(published.articles.length, STANDING.length)
  const mcp = await qpuMcpCall('qpu_register', {}) as { kind: string; host: string }
  assert.equal(mcp.kind, 'register')
  assert.equal(mcp.host, 'lean.uuidna.com')
  const named = await qpuMcpCall('qpu_publications', {}) as { product: string }
  assert.equal(named.product, 'Lean register')
  assert.equal('/register'.startsWith('/report'), false)
  assert.equal('/publications'.startsWith('/paper'), false)
})
