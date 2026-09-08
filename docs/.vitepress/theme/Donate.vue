<script setup lang="ts">
defineOptions({
  chrome: {
    'aside-outline-after': {},
    'layout-bottom': { bar: true },
  },
})
import { QPU_HOST, donateUrl } from '../../../src/hologram.ts'

defineProps<{ bar?: boolean }>()
const href = donateUrl(`https://${QPU_HOST}`)
</script>

<template>
  <p class="qpu-donate" :class="{ bar }">
    Captain coins
    <a :href="href">{{ href }}</a>
  </p>
</template>
