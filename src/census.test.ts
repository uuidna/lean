import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { LEAN_HOST, STANDING } from './standing.js'

// THE CENSUS IS DECIDED BY THE KERNEL TREE, NOT BY THE DESK. Every STANDING row claims "already sealed by decide on
// uuidna". This guard reads the wing it names — the sibling checkout ../uuidna/lean when present, else the published
// file at uuidna.com/lean/<File>.lean — and refuses any key that has no `theorem <key>` line there. A row this guard
// cannot verify is not standing; it is prose.
const SIBLING = resolve(process.cwd(), '..', 'uuidna', 'lean')
const local = existsSync(SIBLING) && readdirSync(SIBLING).some((f) => f.endsWith('.lean'))

const wingOf = async (file: string): Promise<string | null> => {
  if (local) {
    const p = join(SIBLING, file)
    return existsSync(p) ? readFileSync(p, 'utf8') : null
  }
  const res = await fetch(`${LEAN_HOST}/${file}`)
  return res.ok ? await res.text() : null
}

test(`every standing key is a theorem in the wing it names (${local ? 'sibling ../uuidna/lean' : LEAN_HOST})`, async () => {
  const files = [...new Set(STANDING.map((s) => s.file))]
  const wings = new Map<string, string | null>()
  for (const f of files) wings.set(f, await wingOf(f))
  const phantom: string[] = []
  for (const s of STANDING) {
    const text = wings.get(s.file)
    const sealed = text !== null && text !== undefined && new RegExp(`^theorem ${s.key}\\b`, 'm').test(text)
    if (!sealed) phantom.push(`${s.key} (${s.file}${text == null ? ' ABSENT' : ''})`)
  }
  assert.deepEqual(phantom, [], `phantom standing:\n${phantom.join('\n')}`)
})
