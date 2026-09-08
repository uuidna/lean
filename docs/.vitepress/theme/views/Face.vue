<script setup lang="ts">
import { computed } from 'vue'
import { qpuSuperpositionsOf } from '../../../../src/hologram.ts'

const props = defineProps<{ face?: number | string; n?: number | string }>()
const idx = computed(() => {
  const x = Number(props.n ?? props.face)
  return x === x ? x : 0
})
const row = computed(() => qpuSuperpositionsOf()[idx.value] ?? qpuSuperpositionsOf()[0]!)
</script>

<template>
  <div class="qpu-reflections">
    <p>{{ row.face }}↔{{ row.opposite }} · {{ row.reflections.length }} reflections</p>
    <div class="qpu-strip">
      <span class="qpu-strip-label">value</span>
      <button
        v-for="r in row.reflections"
        :id="`k-${r.k}`"
        :key="'v' + r.k"
        type="button"
        class="qpu-cell"
        :class="{ pair: r.k === 0 }"
        :style="{ '--cell': r.value, '--paired': r.paired }"
        :title="`k=${r.k} value ${r.value}`"
      >
        {{ r.value }}
      </button>
    </div>
    <div class="qpu-strip">
      <span class="qpu-strip-label">paired</span>
      <button
        v-for="r in row.reflections"
        :key="'p' + r.k"
        type="button"
        class="qpu-cell"
        :style="{ '--cell': r.paired, '--paired': r.value }"
        :title="`k=${r.k} paired ${r.paired}`"
      >
        {{ r.paired }}
      </button>
    </div>
  </div>
</template>
