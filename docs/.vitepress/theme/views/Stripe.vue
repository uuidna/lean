<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ uuid?: string }>()

type RefRow = {
  face: number
  opposite: number
  referer: string
  door: number
  rotor: string
  ray: number
  href: string
  neighbour: string
  rotation: string
  involute: string
  angles: { hue: number; dash: number; slot: number; reflection: number }
}
type Layer = {
  layer: number
  recto: { hex: string; glyphs: string }
  verso: { hex: string; glyphs: string }
}
type StripeOg = {
  title: string
  subtitle: string
  uuid: string
  href: string
  verse: boolean
  holds: boolean
  refs: RefRow[]
  stripe: { layers: Layer[]; sides: number }
  og: { image: string; width: number; height: number; type: string }
  leads: { key: string; prior: string }[]
}

const reading = ref<StripeOg | null>(null)
const error = ref('')

const openOf = async (hex: string) => {
  error.value = ''
  const res = await fetch(`/stripe/${hex}`)
  const body = await res.json() as StripeOg & { error?: string }
  if (!res.ok || body.error) {
    error.value = body.error ?? 'no such reading'
    reading.value = null
    return
  }
  reading.value = body
}

onMounted(() => {
  const hex = (props.uuid ?? '0'.repeat(32)).toLowerCase()
  void openOf(hex)
})
</script>

<template>
  <section class="qpu-card qpu-stripe-og" aria-label="Theorem Open Graph stripe">
    <p v-if="error">{{ error }}</p>
    <article v-else-if="reading">
      <h2>{{ reading.title }}</h2>
      <p>{{ reading.subtitle }} · verse {{ reading.verse }} · holds {{ reading.holds }}</p>
      <p>
        <img :src="reading.og.image" :width="reading.og.width" :height="reading.og.height" alt="" />
      </p>
      <ol class="qpu-stripe-layers">
        <li v-for="layer in reading.stripe.layers" :key="layer.layer">
          <span>recto {{ layer.recto.hex }} {{ layer.recto.glyphs }}</span>
          <span>verso {{ layer.verso.hex }} {{ layer.verso.glyphs }}</span>
        </li>
      </ol>
      <nav aria-label="2×7 directions and rotations">
        <ul>
          <li v-for="row in reading.refs" :key="row.face">
            <a :href="row.href">{{ row.rotor }} ray {{ row.ray }} face {{ row.face }}</a>
            ·
            <a :href="row.neighbour">opposite {{ row.opposite }}</a>
            ·
            <a :href="row.rotation">rotation</a>
            · hue {{ row.angles.hue }}° dash {{ row.angles.dash }}° slot {{ row.angles.slot }}° reflection {{ row.angles.reflection }}°
          </li>
        </ul>
      </nav>
      <p>
        <a v-for="lead in reading.leads" :key="lead.key" :href="lead.prior">{{ lead.key }}</a>
      </p>
    </article>
  </section>
</template>
