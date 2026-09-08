<script setup lang="ts">
defineOptions({ chrome: { 'home-features-after': { mini: true } } })
import { useRouter, withBase } from 'vitepress'
import { qpuSuperpositionsOf } from '../../../src/hologram.ts'

defineProps<{ mini?: boolean }>()

const rows = qpuSuperpositionsOf()
const router = useRouter()
const go = (face: number, k: number) => void router.go(withBase(`/face/${face}#k-${k}`))
</script>

<template>
  <div class="qpu-lattice" :class="{ mini }" role="img" aria-label="Fourteen superpositions, fourteen reflections each">
    <template v-for="s in rows" :key="s.face">
      <button
        v-for="r in s.reflections"
        :key="`${s.face}-${r.k}`"
        type="button"
        class="qpu-cell"
        :class="{ pair: r.value === s.opposite && r.k === 0 }"
        :style="{ '--cell': r.value, '--paired': r.paired }"
        :title="`${s.face}↔${s.opposite} k=${r.k} → ${r.value}|${r.paired}`"
        @click="go(s.face, r.k)"
      >
        {{ r.value }}
      </button>
    </template>
  </div>
</template>
