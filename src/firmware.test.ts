import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { QPU_HOST } from './hologram.js'
import { QPU_WORKER } from './blueprint.js'
import { handleQpuFetch } from './edge.js'
import { qpuSeoAuditOf } from './seo.js'

const ROOT = join(import.meta.dirname, '..')
const wrangler = readFileSync(join(ROOT, 'wrangler.toml'), 'utf8')
const layout = readFileSync(join(ROOT, 'docs/.vitepress/theme/Layout.vue'), 'utf8')
const theme = readFileSync(join(ROOT, 'docs/.vitepress/theme/index.ts'), 'utf8')
const autoload = readFileSync(join(ROOT, 'docs/.vitepress/theme/autoload.ts'), 'utf8')
const config = readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8')
const css = readFileSync(join(ROOT, 'docs/.vitepress/theme/style.css'), 'utf8')
const loader = readFileSync(join(ROOT, 'docs/.vitepress/hologram.data.ts'), 'utf8')

test('wrangler ASSETS bind the VitePress hologram', () => {
  assert.equal(QPU_HOST, 'lean.uuidna.com')
  assert.equal(QPU_WORKER, 'uuidna-lean')
  assert.match(wrangler, /^name = "uuidna-lean"/m)
  assert.match(wrangler, /run_worker_first = \[/)
  assert.match(wrangler, /"!\/assets\/\*"/)
  assert.match(wrangler, /binding = "ASSETS"/)
  assert.match(wrangler, /QPU_HOST = "lean\.uuidna\.com"/)
})

test('VitePress theme paints hologram firmware; VP tokens bind QPU planes', () => {
  assert.match(layout, /data-firmware="vitepress"/)
  assert.match(layout, /data-engine="lean"/)
  assert.match(layout, /applyHologram/)
  assert.match(css, /--vp-c-brand-1:\s*hsl\(calc\(var\(--qpu-fold\)/)
  assert.match(loader, /defineLoader/)
  assert.match(loader, /qpuHologramOf/)
})

test('theme views autoload by basename; docs read the JSON door', () => {
  assert.match(autoload, /import\.meta\.glob/)
  assert.match(autoload, /pageViewOf/)
  assert.match(autoload, /chromeOf/)
  assert.match(layout, /pageViewOf/)
  assert.match(layout, /chromeOf/)
  assert.match(config, /frontmatter\.reading/)
  assert.match(config, /handleQpuFetch/)
  assert.match(config, /page\.title = doc\.title/)
  assert.match(config, /page\.description = doc\.description/)
  assert.doesNotMatch(theme, /app\.component\(['"]/)
  assert.doesNotMatch(theme, /from ['"]\.\/.+\.vue['"]/)
  assert.doesNotMatch(layout, /from ['"]\.\/.+\.vue['"]/)
  assert.doesNotMatch(layout, /<(Movie|Search|Sidebar|Seat|Donate|Lattice)\b/)
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
    assert.doesNotMatch(text, /<Qpu[A-Z]/, file)
    assert.doesNotMatch(text, /Qpu[A-Z]\w*\.vue/, file)
    if (file.endsWith('.md') && !file.endsWith('author.md')) {
      assert.doesNotMatch(text, /<script setup>[\s\S]*from '\.\.\/src\//, file)
    }
  }
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
