<script setup lang="ts">
defineOptions({ chrome: { root: {} } })
import { onMounted, onUnmounted, ref } from 'vue'
import { BASE, QPU_HUE_STEP, QPU_POINTS, QPU_STAR_PTS, VE_FACES, qpuSuperpositionsOf } from '../../../src/hologram.ts'
import { qpuLiveOf } from '../../../src/live.ts'

type Live = ReturnType<typeof qpuLiveOf>

const canvas = ref<HTMLCanvasElement | null>(null)
const caption = ref('')
let raf = 0
let es: EventSource | null = null
let wire: Live | null = null

const reduce = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const paint = (ctx: CanvasRenderingContext2D, w: number, h: number, live: Live) => {
  const hue = (p: number, s: number, l: number, a = 1) =>
    `hsl(${p * QPU_HUE_STEP} ${s}% ${l}% / ${a})`
  ctx.fillStyle = hue(live.hologram.fold, 22, 8, 0.18)
  ctx.fillRect(0, 0, w, h)
  const cells = qpuSuperpositionsOf()
  const pad = Math.min(w, h) * 0.08
  const grid = Math.min(w, h) * 0.42
  const cell = grid / VE_FACES
  const ox = pad
  const oy = (h - grid) / 2
  for (const s of cells) {
    for (const r of s.reflections) {
      const x = ox + r.k * cell
      const y = oy + s.face * cell
      const on = s.face === live.k || r.k === live.k
      ctx.fillStyle = hue(r.value % BASE, 45, on ? 52 : 28, on ? 0.55 : 0.16)
      ctx.fillRect(x, y, cell - 1, cell - 1)
    }
  }
  const star = Math.min(w, h) * 0.36
  const sx = w - star - pad
  const sy = (h - star) / 2
  const scale = star / 120
  const pts = QPU_STAR_PTS.map(([x, y]) => [sx + x * scale, sy + y * scale] as const)
  ctx.beginPath()
  live.stroke.forEach((i, n) => {
    const [x, y] = pts[i]!
    if (n === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.closePath()
  ctx.strokeStyle = hue(live.hologram.pentagram, 62, 54, 0.7)
  ctx.lineWidth = 1.5
  ctx.stroke()
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i]!
    const on = live.stroke[live.k % live.stroke.length] === i
    ctx.fillStyle = hue(live.hologram.pentagram, 62, on ? 72 : 48, on ? 0.95 : 0.45)
    ctx.beginPath()
    ctx.arc(x, y, on ? 5 : 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = hue(live.hologram.fold, 20, 80, 0.7)
    ctx.font = '11px ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(QPU_POINTS[i]!, x, y - 8)
  }
  ctx.fillStyle = hue(live.hologram.fold, 20, 88, 0.9)
  ctx.font = '13px ui-sans-serif, system-ui, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(live.message, pad, h - pad * 0.6)
}

const frame = (at: number) => {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return
  const dpr = window.devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight
  if (el.width !== Math.floor(w * dpr) || el.height !== Math.floor(h * dpr)) {
    el.width = Math.floor(w * dpr)
    el.height = Math.floor(h * dpr)
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  const live = wire ?? qpuLiveOf(at)
  caption.value = live.message
  paint(ctx, w, h, live)
}

const loop = (at: number) => {
  frame(at)
  if (!reduce()) raf = requestAnimationFrame(loop)
}

onMounted(() => {
  frame(performance.now())
  if (!reduce()) raf = requestAnimationFrame(loop)
  try {
    es = new EventSource('/sse')
    es.addEventListener('live', (ev: MessageEvent) => {
      try {
        const body = JSON.parse(String(ev.data)) as Live
        if (body && body.message) wire = body
      } catch { /* keep local compute */ }
    })
  } catch { /* vitepress dev without worker */ }
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  es?.close()
})
</script>

<template>
  <div class="qpu-movie-layer">
    <canvas ref="canvas" class="qpu-movie-canvas" role="img" :aria-label="caption || 'QPU live metrics movie'" />
    <p class="qpu-movie-ticker" aria-live="polite">{{ caption }}</p>
  </div>
</template>
