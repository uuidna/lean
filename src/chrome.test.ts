import { test } from 'node:test'
import assert from 'node:assert/strict'
import { VE_FACES, qpuGlagoliticOf } from './hologram.js'
import { qpuChromeOf, qpuNavOf, qpuSearchHolds, qpuSearchOf, qpuSidebarMapOf, qpuSidebarOf, qpuSitesOf } from './chrome.js'
import { qpuLeanDocsProse } from './hologram.js'
import { qpuLeanTheoremsProse } from './theorems.js'
import { qpuLeanUrlOf } from './pages.js'

test('nav is computed from the hologram, not typed', () => {
  const nav = qpuNavOf()
  const faces = nav.find((g) => g.text.endsWith('faces'))
  assert.ok(faces)
  assert.equal(faces!.items.length, VE_FACES)
  assert.equal(faces!.items[0]!.link, `/${qpuGlagoliticOf(0)}`)
})

test('sidebar upon request: a face lists referer, door, and angles', () => {
  const side = qpuSidebarOf(`/${qpuGlagoliticOf(7)}`)
  assert.ok(side[0]!.items.some((i) => i.text.includes('referer')))
  assert.ok(side[0]!.items.some((i) => i.text.includes('hue')))
  assert.equal(side[1]!.items.length, VE_FACES)
  const home = qpuSidebarOf('/')
  assert.ok(home.length >= 1)
  assert.ok(home[0]!.items.some((i) => i.link === '/seat'))
})

test('search hits frontmatter, faces, standing, and hologram', () => {
  const theorems = qpuSearchOf(qpuLeanTheoremsProse)
  assert.ok(theorems.hits.some((h) => h.link === qpuLeanUrlOf('/theorems').href))
  const docs = qpuSearchOf(qpuLeanDocsProse)
  assert.ok(docs.hits.some((h) => h.link === qpuLeanUrlOf('/hologram').href))
  const face = qpuSearchOf('face 7')
  assert.ok(face.hits.some((h) => h.link.includes(qpuGlagoliticOf(7))))
  const door = qpuSearchOf('lean.uuidna.com/hologram')
  assert.ok(door.hits.some((h) => h.link === qpuLeanUrlOf('/hologram').href))
  assert.equal(qpuSearchHolds(), true)
  assert.ok(qpuSitesOf().every((s) => s.host.endsWith('.uuidna.com') && !s.host.includes('*')))
  assert.ok(qpuSitesOf().some((s) => s.host === 'lean.uuidna.com'))
  assert.ok(Object.keys(qpuSidebarMapOf()).includes('/hologram'))
  assert.ok(qpuChromeOf('/hologram', 'seat').nav.length > 0)
})
