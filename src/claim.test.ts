import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QPU_HOST } from './hologram.js'
import { qpuLeanClaimHolds, qpuLeanClaimOf } from './claim.js'
import { handleQpuFetch } from './edge.js'
import { qpuMcpCall } from './mcp-catalog.js'
import { qpuProofsOf } from './proofs.js'

test('Lean claim automates compliance: claimable, bold, and lean', () => {
  const c = qpuLeanClaimOf()
  assert.equal(c.kind, 'claim')
  assert.equal(c.automate, true)
  assert.equal(c.compliance, true)
  assert.equal(c.bold, true)
  assert.equal(c.lean, true)
  assert.equal(c.unverified, 'not-false')
  assert.equal(c.mint.seat, 'empty')
  assert.ok(c.claimable.every((row) => row.claimed === true && row.role === 'is'))
  assert.ok(c.claimable.every((row) => {
    const u = new URL(row.prior.kernel)
    return (
      row.prior.checked === true &&
      row.prior.art === true &&
      row.prior.invented === false &&
      row.prior.holds === true &&
      u.protocol === 'https:' &&
      u.hostname === 'uuidna.com' &&
      u.pathname === `/theorem/${row.key}`
    )
  }))
  assert.ok(c.reserved.every((row) => row.claimed === false && row.prior.holds === true))
  assert.equal(qpuLeanClaimHolds(c), true)
})

test('GET /claim /compliance /green and MCP qpu_claim match; proofs stay green', async () => {
  const res = await handleQpuFetch(new Request(`https://${QPU_HOST}/claim`))
  assert.equal(res.status, 200)
  const body = await res.json() as { kind: string; holds: boolean }
  assert.equal(body.kind, 'claim')
  assert.equal(body.holds, true)
  const alias = await handleQpuFetch(new Request(`https://${QPU_HOST}/compliance`))
  assert.equal((await alias.json() as { kind: string }).kind, 'claim')
  const mcp = await qpuMcpCall('qpu_compliance', {}) as { bold: boolean; lean: boolean }
  assert.equal(mcp.bold, true)
  assert.equal(mcp.lean, true)
  const green = await handleQpuFetch(new Request(`https://${QPU_HOST}/green`))
  const proof = await green.json() as { complete: boolean; green: boolean; concept: { zenodo: boolean } }
  assert.equal(proof.complete, true)
  assert.equal(proof.green, true)
  assert.equal(proof.concept.zenodo, true)
  assert.equal(qpuProofsOf().green, true)
})
