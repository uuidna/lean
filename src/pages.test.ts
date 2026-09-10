import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HEXBIT_PAGE, qpuGlagoliticOf, qpuLeanDocsOf, qpuLeanDocsProse, qpuLeanDocTileProse, qpuLeanStripeProse } from './hologram.js'
import { qpuLeanTheoremsProse } from './theorems.js'
import { qpuLeanAxiomsProse } from './axioms.js'
import { qpuLeanLibraryProse, qpuLeanStripeOgProse } from './library.js'
import { qpuWidgetsProse } from './widgets.js'
import { qpuSearchProse } from './chrome.js'
import { qpuRoutesOf } from './seo.js'
import {
  qpuLeanFrontmatterOf, qpuLeanPageMarkdownOf, qpuLeanPagesHolds, qpuLeanProseOf, qpuLeanUrlOf,
} from './pages.js'

test('frontmatter is the inline constructor doc fused with b.uuidna.com/a', () => {
  const docs = qpuLeanDocsOf()
  const theorems = qpuLeanFrontmatterOf('/theorems')
  assert.equal(qpuLeanProseOf('/theorems'), qpuLeanTheoremsProse)
  assert.ok(theorems.description.startsWith(qpuLeanTheoremsProse))
  assert.ok(theorems.description.includes('lean.uuidna.com/theorems'))
  assert.ok(theorems.description.includes(docs.hex))
  assert.ok(theorems.description.includes(docs.glyphs))
  assert.equal(qpuLeanProseOf('/axioms'), qpuLeanAxiomsProse)
  assert.equal(qpuLeanProseOf('/library'), qpuLeanLibraryProse)
  assert.equal(qpuLeanProseOf('/stripe'), qpuLeanStripeOgProse)
  assert.equal(qpuLeanProseOf('/widgets'), qpuWidgetsProse)
  assert.equal(qpuLeanProseOf('/search'), qpuSearchProse)
  assert.equal(qpuLeanProseOf('/hologram'), qpuLeanDocsProse)
  assert.equal(qpuLeanProseOf('/a'), qpuLeanDocTileProse)
  assert.equal(qpuLeanProseOf(`/${qpuGlagoliticOf(7)}`), qpuLeanDocTileProse)
  assert.equal(qpuLeanProseOf('/404'), qpuLeanStripeProse)
  const swapped = qpuLeanUrlOf('theorems.uuidna.com/lean')
  const direct = qpuLeanUrlOf('lean.uuidna.com/theorems')
  assert.equal(swapped.href, direct.href)
  assert.equal(swapped.a, 'theorems')
  assert.equal(swapped.b, 'lean')
  const md = qpuLeanPageMarkdownOf('/theorems')
  assert.match(md, /^---\n/)
  assert.ok(md.includes(`/** ${qpuLeanTheoremsProse} */`))
  assert.equal(qpuLeanPagesHolds(), true)
  const routes = qpuRoutesOf().map((r) => r.path)
  assert.equal(qpuLeanPagesHolds(routes), true)
  assert.ok([...HEXBIT_PAGE].every((h) => routes.includes(`/${h}`)))
  assert.ok(routes.includes('/superpositions'))
  assert.ok(routes.includes('/search'))
  assert.equal(routes.some((p) => p.startsWith('/hex/')), false)
  assert.equal(routes.some((p) => p.startsWith('/face/')), false)
})
