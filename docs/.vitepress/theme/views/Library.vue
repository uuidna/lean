<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Strip = { line: number; choice: number; seal: number; name: string; hex: string }
type Lead = { key: string; file: string; prior: string }
type Library = {
  catalog: string
  volume: number
  measure: number
  verse: boolean
  cost: number
  fetches: number
  when: string
  tokens: { llm: number; cost: number; address: number }
  scale: { may: boolean; fused: boolean; fetches: number }
  speed: { beats: number; verify: number }
  strips: Strip[]
  leads: Lead[]
  holds: boolean
}

const book = ref('00000000000000')
const reading = ref<Library | null>(null)
const error = ref('')

const openOf = async (catalog: string) => {
  error.value = ''
  const q = encodeURIComponent(catalog)
  const res = await fetch(`/library?book=${q}`)
  const body = await res.json() as Library & { error?: string }
  if (!res.ok || body.error) {
    error.value = body.error ?? 'no such reading'
    reading.value = null
    return
  }
  reading.value = body
  book.value = body.catalog
}

onMounted(() => { void openOf(book.value) })
</script>

<template>
  <section class="qpu-card" aria-label="Open one combinatorial book">
    <form @submit.prevent="openOf(book)">
      <label>
        Catalog
        <input v-model="book" inputmode="numeric" maxlength="14" pattern="[0-9]*" autocomplete="off" />
      </label>
      <button type="submit">Open</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-else-if="reading">
      Catalog {{ reading.catalog }}. Measure {{ reading.measure }}. Volume {{ reading.volume }}.
      Scale fetches {{ reading.scale.fetches }}. Speed {{ reading.speed.beats }}={{ reading.speed.verify }}.
      Tokens {{ reading.tokens.llm }}. When {{ reading.when }}. Verse {{ reading.verse }}.
    </p>
    <ol v-if="reading" class="qpu-library-strips">
      <li v-for="s in reading.strips" :key="s.line">
        <span>{{ s.name }}</span>
        <span>{{ s.hex }}</span>
        <span>{{ s.choice }}</span>
      </li>
    </ol>
  </section>
</template>
