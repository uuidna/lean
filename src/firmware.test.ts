import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { QPU_HOST } from './hologram.js'
import { QPU_WORKER } from './blueprint.js'
import { handleQpuFetch } from './edge.js'
import { qpuSeoAuditOf } from './seo.js'
import { qpuLeanPageMarkdownOf } from './pages.js'

const ROOT = join(import.meta.dirname, '..')
const wrangler = readFileSync(join(ROOT, 'wrangler.toml'), 'utf8')
const config = readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8')
const theme = readFileSync(join(ROOT, 'docs/.vitepress/theme/index.ts'), 'utf8')

test('wrangler ASSETS bind the VitePress hologram', () => {
  assert.equal(QPU_HOST, 'lean.uuidna.com')
  assert.equal(QPU_WORKER, 'uuidna-lean')
  assert.match(wrangler, /^name = "uuidna-lean"/m)
  assert.match(wrangler, /run_worker_first = \[/)
  assert.match(wrangler, /"!\/assets\/\*"/)
  assert.match(wrangler, /binding = "ASSETS"/)
  assert.match(wrangler, /QPU_HOST = "lean\.uuidna\.com"/)
})

test('VitePress uses documented local search fused with constructor frontmatter', () => {
  assert.match(config, /search:\s*\{\s*provider:\s*'local'/)
  assert.match(config, /qpuLeanFrontmatterOf/)
  assert.doesNotMatch(config, /frontmatter\.reading/)
  assert.doesNotMatch(config, /handleQpuFetch/)
  assert.match(theme, /vitepress\/theme/)
  assert.doesNotMatch(theme, /Layout/)
  assert.equal(existsSync(join(ROOT, 'docs/.vitepress/theme/Search.vue')), false)
})

test('docs markdown is frontmatter plus the inline constructor doc', () => {
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name === 'dist' || e.name === 'cache' || e.name === '.temp') return []
        return walk(p)
      }
      return /\.(md|vue|ts|css)$/.test(e.name) ? [p] : []
    })
  for (const file of walk(join(ROOT, 'docs'))) {
    const text = readFileSync(file, 'utf8')
    if (file.endsWith('.md')) {
      assert.doesNotMatch(text, /<Lattice\b/, file)
      assert.doesNotMatch(text, /\{\{\s*reading/, file)
      assert.match(text, /^---\n/, file)
      assert.match(text, /```ts\n\/\*\*/, file)
    }
  }
  assert.ok(qpuLeanPageMarkdownOf('/theorems').includes('```ts'))
})

test('edge fuses HTML to ASSETS and JSON when Accept is not html', async () => {
  const env = {
    ASSETS: {
      fetch: async () => new Response('<html data-firmware="vitepress">hologram</html>', {
        headers: { 'content-type': 'text/html' },
      }),
    },
  }
  const html = await handleQpuFetch(new Request(`https://${QPU_HOST}/`, { headers: { accept: 'text/html' } }), env)
  assert.equal(html.status, 200)
  assert.match(await html.text(), /data-firmware="vitepress"/)
  const json = await handleQpuFetch(new Request(`https://${QPU_HOST}/`))
  assert.match(json.headers.get('content-type') ?? '', /json/)
  const body = await json.json() as { host: string; machine: { seat: { seat: string } } }
  assert.equal(body.host, QPU_HOST)
  assert.equal(body.machine.seat.seat, 'empty')
})

test('SEO audit stays clean beside the VitePress hologram', () => {
  const audit = qpuSeoAuditOf()
  assert.equal(audit.ok, true, JSON.stringify(audit.gaps))
})

test('namesake console involutes hologram ci', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
    scripts: Record<string, string>
    bin?: Record<string, string>
  }
  assert.equal(pkg.bin?.lean, './dist/mcp.js')
  assert.equal(pkg.scripts.lean, 'node dist/mcp.js')
  assert.equal(pkg.scripts.ci, 'npm run docs:build && npm test')
})
