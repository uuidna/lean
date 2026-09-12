import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QPU_HOST, qpuHologramOf, qpuSeatOf } from './hologram.js'
import {
  apaNameOf, apaParentOf, apaSoftwareOf, citationOf, githubOf, parseTestReceipt,
  readmeOf, repoDirOf, titleOf, wranglerNameOf, zenodoOf,
} from './gen-readme.js'
import { qpuCompareOf } from './metrics.js'
import { DATE_RELEASED, ORCID, UUIDNA_DOI, UUIDNA_TITLE, yearReleasedOf } from './standing.js'
import { QPU_MCP_NAME, QPU_VERSION } from './version.js'

test('TAP receipt parses pass/fail/duration', () => {
  const r = parseTestReceipt('# tests 10\n# pass 10\n# fail 0\n# skipped 0\n# duration_ms 228\n')
  assert.equal(r.tests, 10)
  assert.equal(r.pass, 10)
  assert.equal(r.fail, 0)
  assert.equal(r.durationMs, 228)
})

test('title, wrangler, github, and APA name are derived', () => {
  assert.equal(titleOf(), 'Lean publishing worker')
  assert.equal(wranglerNameOf(), QPU_MCP_NAME)
  assert.equal(githubOf(), 'https://github.com/uuidna/lean')
  assert.equal(repoDirOf(githubOf()), 'lean')
  assert.equal(yearReleasedOf(), Number(DATE_RELEASED.slice(0, 4)))
  assert.throws(() => githubOf({ name: '@uuidna/x', version: '0' }))
  assert.throws(() => titleOf({ name: '@uuidna/x', version: '0', description: '' }))
})

test('APA 7th software reference is author–date', () => {
  const live = `https://${QPU_HOST}`
  const line = apaSoftwareOf(titleOf(), QPU_VERSION, live)
  assert.equal(line, `${apaNameOf()} (${yearReleasedOf()}). ${titleOf()} (Version ${QPU_VERSION}) [Computer software]. ${live}`)
  assert.match(apaParentOf(), new RegExp(UUIDNA_TITLE.replace(/[—–]/g, '.')))
})

test('CITATION.cff is this package, not Unreal', () => {
  const cff = citationOf()
  assert.match(cff, /cff-version: 1\.2\.0/)
  assert.match(cff, new RegExp(`title: "${titleOf()}"`))
  assert.match(cff, new RegExp(`date-released: "${DATE_RELEASED}"`))
  assert.match(cff, /type: software/)
  assert.match(cff, new RegExp(QPU_HOST))
  assert.match(cff, /github\.com\/uuidna\/lean/)
  assert.match(cff, /@uuidna\/lean/)
  assert.doesNotMatch(cff, /preferred-citation/)
  assert.doesNotMatch(cff, /unreal\.uuidna\.com/)
  assert.doesNotMatch(cff, /github\.com\/uuidna\/unreal/)
  assert.doesNotMatch(cff, /quantum supremacy/)
  assert.doesNotMatch(cff, /Qiskit/)
  assert.doesNotMatch(cff, /revolut\.me/)
  assert.doesNotMatch(cff, /^identifiers:/m)
  assert.match(cff, /doi: "10\.5281\/zenodo\.22256708"/)
})

test('README is a standard software page with APA references', () => {
  const h = qpuHologramOf()
  const md = readmeOf({ tests: 10, pass: 10, fail: 0, skipped: 0, durationMs: 12 })
  assert.match(md, new RegExp(`^# ${titleOf()}`, 'm'))
  assert.equal((md.match(/^# /gm) ?? []).length, 1)
  assert.match(md, new RegExp(QPU_HOST))
  assert.match(md, new RegExp('`' + qpuSeatOf().seat + '`'))
  assert.match(md, new RegExp('debit ' + String(h.debit)))
  assert.match(md, new RegExp('VE ' + String(h.veFaces)))
  assert.match(md, /10\/10 pass/)
  assert.match(md, /holds/)
  assert.match(md, /github\.com\/uuidna\/lean/)
  assert.match(md, /npm install @uuidna\/lean/)
  assert.match(md, /## Citation/)
  assert.match(md, new RegExp(apaNameOf().replace(/\./g, '\\.') + ` \\(${yearReleasedOf()}\\)\\.`))
  assert.match(md, /\[Computer software\]/)
  assert.doesNotMatch(md, /github\.com\/uuidna\/unreal/)
  assert.doesNotMatch(md, /Novelty chip/)
  assert.doesNotMatch(md, /Proof of work/)
  assert.doesNotMatch(md, /quantum supremacy/)
  const site = readmeOf({ tests: 10, pass: 10, fail: 0, skipped: 0, durationMs: 12 }, qpuCompareOf(), [], 'site')
  assert.match(site, /\/manual/)
})

// THE SAME STORY AS CITATION.cff, IN ZENODO'S SHAPE. The hand-written file this replaces named another package,
// carried donation links as the creator's affiliation, and requested three quantum-software communities.
test('.zenodo.json is this package, generated, and says nothing CITATION.cff does not', () => {
  const raw = zenodoOf()
  const z = JSON.parse(raw) as {
    title: string; version: string; license: string; upload_type: string; access_right: string
    creators: { name: string; orcid: string; affiliation: string }[]
    keywords: string[]; communities: { identifier: string }[]
    related_identifiers: { identifier: string; relation: string }[]
  }
  assert.equal(z.title, titleOf())
  assert.equal(z.version, QPU_VERSION)
  assert.equal(z.license, 'cc-by-nc-nd-4.0')
  assert.equal(z.upload_type, 'software')
  assert.equal(z.access_right, 'open')
  assert.deepEqual(z.creators, [{ name: 'Rouschev, Tsvetan', orcid: ORCID, affiliation: 'uuidna' }])
  assert.deepEqual(z.communities, [{ identifier: 'uuidna' }])
  assert.ok(z.related_identifiers.some((r) => r.identifier === UUIDNA_DOI && r.relation === 'isDerivedFrom'))
  assert.ok(z.related_identifiers.some((r) => r.identifier === `https://${QPU_HOST}` && r.relation === 'isIdenticalTo'))
  assert.ok(z.related_identifiers.some((r) => r.identifier === 'https://github.com/uuidna/lean'))
  assert.ok(z.related_identifiers.some((r) => r.identifier === 'https://www.npmjs.com/package/@uuidna/lean'))
  assert.ok(z.keywords.includes('lean'))
  for (const banned of [/revolut\.me/, /quantum supremacy/i, /Qiskit/, /Cirq/, /"title": "@uuidna\/qpu/, /unreal\.uuidna\.com/, /captain/i, /coins/i, /qiskit|neasqc|dlr-sc/])
    assert.doesNotMatch(raw, banned)
})
