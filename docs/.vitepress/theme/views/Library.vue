<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Strip = { line: number; choice: number; seal: number; name: string; hex: string }
type Layer = {
  layer: number
  bits: number
  hexbits: number
  recto: { hex: string; glyphs: string; name: string }
  verso: { hex: string; glyphs: string; name: string }
}
type Stripe = { holds: boolean; sides: number; layers: Layer[]; hex: string; bits: number; page: number }
type Essay = {
  n: string
  uuid: string
  title: string
  subtitle: string
  glyph: string
  topic: string
  catalog: string
  book: string
  verse: boolean
  words: number
  href: string
  stripe: Stripe
  strips: Strip[]
  refs: { face: number; opposite: number; href: string; neighbour: string; rotation: string; rotor: string; ray: number }[]
}
type Lead = { key: string; file: string; prior: string }
type Library = {
  catalog: string
  volume: number
  measure: number
  clusters: string
  books: string
  magnitudes: boolean
  verse: boolean
  cost: number
  fetches: number
  when: string
  page: string
  pageSize: number
  pages: string
  bits: number
  sides: number
  tokens: { llm: number; cost: number; address: number }
  scale: { may: boolean; fused: boolean; fetches: number }
  speed: { beats: number; verify: number }
  strips: Strip[]
  stripe: Stripe
  essays: Essay[]
  leads: Lead[]
  topics: string[]
  holds: boolean
}

const q = ref('')
const page = ref('1')
const reading = ref<Library | null>(null)
const error = ref('')
const open = ref<Essay | null>(null)

const summary = computed(() => {
  const row = reading.value
  if (!row) return ''
  return `${row.clusters} essays · page ${row.page} of ${row.pages}`
})

const openOf = async () => {
  error.value = ''
  const params = new URLSearchParams()
  if (q.value) params.set('q', q.value)
  if (page.value && page.value !== '1') params.set('page', page.value)
  const res = await fetch(`/essays?${params.toString()}`)
  const body = await res.json() as Library & { error?: string }
  if (!res.ok || body.error) {
    error.value = body.error ?? 'no such reading'
    reading.value = null
    open.value = null
    return
  }
  reading.value = body
  open.value = null
}

const turn = (delta: number) => {
  const n = Number(page.value)
  const next = (n === n ? n : 1) + delta
  if (next < 1) return
  page.value = String(next)
  void openOf()
}

onMounted(() => { void openOf() })
</script>

<template>
  <section class="qpu-card qpu-essays" aria-label="Combinatorial essays">
    <header>
      <p v-if="reading">
        {{ summary }}.
        One book {{ reading.volume }}.
        Library {{ reading.books }}.
        Magnitudes {{ reading.magnitudes }}.
        Verse {{ reading.verse }}.
      </p>
      <nav aria-label="Leads">
        <a href="/library">Library</a>
        <a href="/essays">Essays</a>
        <span>{{ reading?.volume ?? 100000000000000 }}</span>
      </nav>
    </header>
    <form @submit.prevent="openOf">
      <label>
        Search
        <input v-model="q" autocomplete="off" placeholder="uuid or catalog" />
      </label>
      <button type="submit">Open</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <ol v-if="reading" class="qpu-essay-list">
      <li v-for="row in reading.essays" :key="row.uuid">
        <button type="button" @click="open = row">
          <strong>{{ row.title }}</strong>
          <span class="qpu-essay-glyphs">{{ row.subtitle }}</span>
          <span>{{ row.topic }}</span>
        </button>
        <p>
          <a :href="row.href">Open Graph</a>
          Book {{ row.book }}. Catalog {{ row.catalog }}.
          Stripe {{ row.stripe.layers.length }} × {{ row.stripe.sides }}.
          Directions {{ row.refs.length }}.
        </p>
      </li>
    </ol>
    <p class="qpu-essay-pager">
      <button type="button" :disabled="page === '1'" @click="turn(-1)">Previous</button>
      <span>page {{ page }}</span>
      <button type="button" @click="turn(1)">Next</button>
    </p>
    <article v-if="open" class="qpu-essay-stripe">
      <h2>{{ open.title }}</h2>
      <p>{{ open.subtitle }} · {{ open.uuid }}</p>
      <ol class="qpu-stripe-layers">
        <li v-for="layer in open.stripe.layers" :key="layer.layer">
          <span>recto {{ layer.recto.hex }} {{ layer.recto.glyphs }}</span>
          <span>verso {{ layer.verso.hex }} {{ layer.verso.glyphs }}</span>
        </li>
      </ol>
      <ol class="qpu-library-strips">
        <li v-for="s in open.strips" :key="s.line">
          <span>{{ s.name }}</span>
          <span>{{ s.hex }}</span>
          <span>{{ s.choice }}</span>
        </li>
      </ol>
      <nav class="qpu-stripe-refs" aria-label="2×7 directions">
        <a v-for="r in open.refs" :key="r.face" :href="r.href">{{ r.rotor }} {{ r.face }}↔{{ r.opposite }}</a>
      </nav>
    </article>
  </section>
</template>
