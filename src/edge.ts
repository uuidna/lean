// edge — THE QPU WORKER. JSON readings and VitePress hologram at https://lean.uuidna.com
//
// Same doors, two readings: Accept text/html → site; otherwise JSON.
// Nav / sidebar / search are computed upon request. Seat stays empty.
import { HEXBIT_PAGE, QPU_HOST, VE_FACES, qpuChipOf, qpuExperienceOf, qpuGatewaysHolds, qpuGatewaysOf, qpuGlagoliticStateOf, qpuHologramOf, qpuLeanDocTileOf, qpuMachineOf, qpuSeatOf, qpuSuperpositionsOf, qpuWidthOf } from './hologram.js'
import { QPU_EVENT_LISTEN, qpuEventOf, qpuEventsHolds, qpuEventsOf } from './events.js'
import { qpuBootOf } from './boot.js'
import { STANDING, standingByFileOf, qpuStandingFilesOf, qpuStandingOf } from './standing.js'
import { qpuLeanTheoremsOf } from './theorems.js'
import { qpuLeanAxiomsOf } from './axioms.js'
import { qpuLeanPublicationsOf } from './publications.js'
import { qpuLeanLibraryOf, qpuLeanStripeOgOf } from './library.js'
import { qpuLeanCernOf } from './cern.js'
import { qpuLeanFuseOf, qpuLeanInternetOf } from './fuse.js'
import { qpuLeanTrainOf } from './train.js'
import { qpuTeslaOf } from './hologram.js'
import { qpuLeanSolveOf } from './solve.js'
import { qpuLeanClaimOf } from './claim.js'
import { qpuWidgetsOf } from './widgets.js'
import { qpuChromeOf, qpuNavOf, qpuSearchOf, qpuSidebarOf } from './chrome.js'
import { qpuCompareHolds, qpuCompareOf } from './metrics.js'
import { qpuDiscoveryOf } from './discovery.js'
import { handleQpuMcpRpc, qpuMcpDiscoveryOf } from './mcp-rpc.js'
import { qpuRobotsTxtOf, qpuRoutesOf, qpuSitemapXmlOf } from './seo.js'
import { qpuProvidersOf, qpuRecognizeOf, qpuSolidsOf } from './bindings/index.js'
import { handleQpuSse, handleQpuWebSocket, qpuPeersOf, qpuScaleOf } from './scale.js'
import { qpuFractalOf } from './fractal.js'
import { qpuOgOf, qpuOgSvgOf } from './og.js'
import type { QpuEnv } from './bindings/env.js'

const cors = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
}

const json = (obj: unknown, status = 200): Response =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...cors },
  })

const text = (body: string, type: string): Response =>
  new Response(body, { status: 200, headers: { 'content-type': type, ...cors } })

export type { QpuEnv } from './bindings/env.js'

export const QPU_JSON_DOORS = ['/seat', '/width', '/hologram', '/chip', '/merkaba', '/metrics', '/bindings', '/.well-known/qpu.json'] as const

const QPU_GET_HINT = '/ /seat /width /hologram /chip /merkaba /metrics /speed /fractal /scale /og /og.svg /live /experience /events /boot /standing /theorems /cited /axioms /wings /register /publications /zenodo /library /books /essays /stripe /cern /lhc /fuse /internet /train /clusters /solve /reward /claim /compliance /green /widgets /tesla /nav /sidebar /search /superpositions /gateways /bindings /environment /mcp /sse /ws /peers /providers /paper /manual /author'

const wantsHtml = (request: Request): boolean =>
  (request.headers.get('accept') || '').includes('text/html')

async function assetsOf(env: QpuEnv | undefined, request: Request): Promise<Response | null> {
  if (!env?.ASSETS) return null
  const asset = await env.ASSETS.fetch(request)
  const headers = new Headers(asset.headers)
  const path = new URL(request.url).pathname
  if (/^\/assets\/.+\.[A-Za-z0-9_-]{6,}\.(js|css|woff2?)$/.test(path))
    headers.set('cache-control', 'public, max-age=31536000, immutable')
  headers.set('access-control-allow-origin', '*')
  return new Response(asset.body, { status: asset.status, headers })
}

export { qpuDiscoveryOf } from './discovery.js'

/** handleQpuFetch(request, env?) → JSON reading or VitePress hologram. Workers-safe. */
export async function handleQpuFetch(request: Request, env?: QpuEnv): Promise<Response> {
  const url = new URL(request.url)
  const host = url.hostname.toLowerCase()
  if (url.protocol === 'http:' || host.startsWith('www.')) {
    const dest = new URL(url)
    dest.protocol = 'https:'
    dest.hostname = host.startsWith('www.') ? host.slice(4) : host
    return Response.redirect(dest.toString(), 301)
  }
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })

  const html = wantsHtml(request)
  const upgrade = (request.headers.get('upgrade') || '').toLowerCase()
  if (upgrade === 'websocket' || url.pathname === '/ws') {
    if (upgrade === 'websocket') return handleQpuWebSocket(request, env)
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json({ may: true, websocket: `${url.origin}/ws`, scale: qpuScaleOf(env) })
  }

  if (url.pathname === '/.well-known/mcp.json') return json(qpuMcpDiscoveryOf(url.origin))
  if (url.pathname === '/mcp') {
    if (request.method === 'GET') {
      if (html) { const a = await assetsOf(env, request); if (a) return a }
      return json(qpuMcpDiscoveryOf(url.origin))
    }
    if (request.method !== 'POST')
      return json({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'POST a JSON-RPC message to /mcp (or GET for discovery)' } }, 405)
    let msg: unknown
    try { msg = await request.json() } catch {
      return json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error' } }, 400)
    }
    if (Array.isArray(msg)) {
      const out = (await Promise.all(msg.map((m) => handleQpuMcpRpc(m as never, env)))).filter(Boolean)
      return json(out)
    }
    const out = await handleQpuMcpRpc(msg as never, env)
    if (out === null) return new Response(null, { status: 202, headers: cors })
    return json(out)
  }

  if (request.method !== 'GET')
    return json({ error: `GET a reading — ${QPU_GET_HINT}` }, 405)

  if (url.pathname === '/og.svg')
    return new Response(qpuOgSvgOf(), {
      status: 200,
      headers: { 'content-type': 'image/svg+xml; charset=utf-8', 'cache-control': 'public, max-age=3600', ...cors },
    })
  if (url.pathname === '/og') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const { svg: _svg, ...og } = qpuOgOf()
    return json(og)
  }

  if (url.pathname === '/sitemap.xml') return text(qpuSitemapXmlOf(), 'application/xml; charset=utf-8')
  if (url.pathname === '/robots.txt') return text(qpuRobotsTxtOf(), 'text/plain; charset=utf-8')

  if (url.pathname === '/.well-known/qpu.json')
    return json({ ...qpuDiscoveryOf(url.origin), environment: qpuRecognizeOf(env) })
  if (url.pathname === '/nav') return json({ nav: qpuNavOf(), direction: qpuChromeOf('/').direction })
  if (url.pathname === '/sidebar') return json({ path: url.searchParams.get('path') || '/', sidebar: qpuSidebarOf(url.searchParams.get('path') || '/') })
  if (url.pathname === '/search') {
    return json(qpuSearchOf(url.searchParams.get('q') || '', {
      site: url.searchParams.get('site') || undefined,
      kind: url.searchParams.get('kind') || undefined,
    }))
  }
  {
    const stripe = /^\/([0-9a-f]{32})\/?$/i.exec(url.pathname)
    if (stripe) {
      if (html) {
        const a = await assetsOf(env, request)
        if (a && a.status === 200) return a
      }
      const reading = qpuLeanStripeOgOf(stripe[1]!.toLowerCase())
      if ('error' in reading) return json(reading, 404)
      return json(reading)
    }
    const hex = /^\/([0-9a-f])\/?$/i.exec(url.pathname)
    if (hex) {
      if (html) { const a = await assetsOf(env, request); if (a) return a }
      const tile = qpuLeanDocTileOf(HEXBIT_PAGE.indexOf(hex[1]!.toLowerCase()))
      return json(tile)
    }
    const face = qpuGlagoliticStateOf(decodeURIComponent(url.pathname.replace(/^\//, '').replace(/\/$/, '')))
    if (face != null && face >= 0 && face < VE_FACES) {
      if (html) { const a = await assetsOf(env, request); if (a) return a }
      return json(qpuSuperpositionsOf()[face])
    }
  }
  if (url.pathname === '/superpositions')
    return json({ veFaces: qpuHologramOf().veFaces, superpositions: qpuSuperpositionsOf() })
  if (url.pathname === '/gateways') {
    const gateways = qpuGatewaysOf()
    return json({ neighbours: gateways.length, gateways, holds: qpuGatewaysHolds(gateways) })
  }
  if (url.pathname === '/sse') return handleQpuSse(env)
  if (url.pathname === '/live') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const { qpuLiveOf } = await import('./live.js')
    const at = Number(url.searchParams.get('at'))
    return json(qpuLiveOf(at === at && at >= 0 ? at : Date.now()))
  }
  if (url.pathname === '/experience') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuExperienceOf())
  }
  if (url.pathname === '/events') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json({ kinds: qpuEventsOf(), listen: QPU_EVENT_LISTEN, holds: qpuEventsHolds(), seat: qpuSeatOf() })
  }
  if (url.pathname === '/boot') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuBootOf())
  }
  if (url.pathname === '/standing') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const file = url.searchParams.get('file') || undefined
    const roleRaw = url.searchParams.get('role')
    const role = roleRaw === 'is' || roleRaw === 'can' || roleRaw === 'may' ? roleRaw : undefined
    if (file || role) return json(qpuStandingOf({ file, role }))
    return json({ files: qpuStandingFilesOf(), byFile: standingByFileOf(), standing: STANDING })
  }
  if (url.pathname === '/theorems' || url.pathname === '/cited') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanTheoremsOf())
  }
  if (url.pathname === '/axioms' || url.pathname === '/wings') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanAxiomsOf())
  }
  if (url.pathname === '/register' || url.pathname === '/publications') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanPublicationsOf())
  }
  if (url.pathname === '/zenodo') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanPublicationsOf().zenodo)
  }
  if (url.pathname === '/fuse') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanFuseOf())
  }
  if (url.pathname === '/internet') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanInternetOf())
  }
  if (url.pathname === '/train' || url.pathname === '/clusters') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanTrainOf(url.searchParams.get('q') || url.searchParams.get('prose') || ''))
  }
  if (url.pathname === '/tesla') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuTeslaOf())
  }
  if (url.pathname === '/solve' || url.pathname === '/reward') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanSolveOf())
  }
  if (url.pathname === '/claim' || url.pathname === '/compliance') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuLeanClaimOf())
  }
  if (url.pathname === '/green') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const { qpuProofsOf } = await import('./proofs.js')
    return json(qpuProofsOf())
  }
  if (url.pathname === '/stripe') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const uuid = url.searchParams.get('uuid')
    return json(qpuLeanStripeOgOf(uuid && uuid !== '' ? uuid : '0'.repeat(32)))
  }
  if (url.pathname === '/library' || url.pathname === '/books' || url.pathname === '/essays') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const book = url.searchParams.get('book')
    const uuid = url.searchParams.get('uuid')
    const q = url.searchParams.get('q')
    const at = url.searchParams.get('at')
    const page = url.searchParams.get('page')
    const bitsRaw = url.searchParams.get('bits')
    const bits = bitsRaw != null && bitsRaw !== '' ? Number(bitsRaw) : undefined
    const curiosity =
      uuid != null && uuid !== '' ? uuid
      : q != null && q !== '' ? q
      : book != null && book !== '' ? book
      : at != null && at !== '' ? Number(at)
      : 0
    const reading = qpuLeanLibraryOf(curiosity === curiosity ? curiosity : book ?? 0, {
      bits: bits === bits ? bits : undefined,
      page: page != null && page !== '' ? page : undefined,
      q: q != null && q !== '' ? q : undefined,
    })
    if ('error' in reading) return json(reading, 404)
    return json(reading)
  }
  if (url.pathname === '/widgets') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const at = Number(url.searchParams.get('at'))
    return json(qpuWidgetsOf(at === at && at >= 0 ? at : Date.now()))
  }
  if (url.pathname === '/cern' || url.pathname === '/lhc') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const raw = url.searchParams.get('face')
    if (raw !== null && raw !== '') {
      const reading = qpuLeanCernOf(Number(raw))
      if ('error' in reading || !reading.holds) return json(reading, 404)
      return json(reading)
    }
    return json(qpuLeanCernOf())
  }
  if (url.pathname === '/scale') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuScaleOf(env))
  }
  if (url.pathname === '/peers') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json({ peers: qpuPeersOf(env), chip: qpuSeatOf() })
  }
  if (url.pathname === '/fractal') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuFractalOf(env))
  }
  if (url.pathname === '/providers')
    return json({ providers: qpuProvidersOf().map((p) => ({ name: p.name, seat: p.seat, bindings: p.bindings.length })) })
  if (url.pathname === '/bindings') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const environment = qpuRecognizeOf(env)
    return json({
      fused: true,
      providers: qpuProvidersOf().map((p) => p.name),
      environment,
      bindings: environment.bindings.filter((b) => !url.searchParams.get('provider') || b.provider === url.searchParams.get('provider')),
    })
  }
  if (url.pathname === '/solids') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuSolidsOf())
  }
  if (url.pathname === '/environment') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuRecognizeOf(env))
  }

  if (url.pathname === '/seat') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuSeatOf())
  }
  if (url.pathname === '/width') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuWidthOf())
  }
  if (url.pathname === '/hologram') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json({ ...qpuHologramOf(), superpositions: qpuSuperpositionsOf(), chip: qpuChipOf() })
  }
  if (url.pathname === '/chip' || url.pathname === '/merkaba') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json(qpuChipOf())
  }
  if (url.pathname === '/metrics') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json({ compare: qpuCompareOf(), holds: qpuCompareHolds() })
  }
  if (url.pathname === '/speed') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const { qpuSpeedOf } = await import('./metrics.js')
    return json({ speed: qpuSpeedOf(), seat: qpuSeatOf() })
  }
  if (url.pathname === '/' || url.pathname === '') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    return json({ ...qpuDiscoveryOf(url.origin), machine: qpuMachineOf(), environment: qpuRecognizeOf(env), chrome: qpuChromeOf('/') })
  }

  if (url.pathname === '/paper' || url.pathname === '/manual' || url.pathname === '/author') {
    if (html) { const a = await assetsOf(env, request); if (a) return a }
    const r = qpuRoutesOf().find((x) => x.path === url.pathname)
    return json({ kind: r?.kind ?? url.pathname.slice(1), title: r?.title, description: r?.description })
  }

  const page = await assetsOf(env, request)
  if (page) return page
  return json({ error: 'no such reading' }, 404)
}
