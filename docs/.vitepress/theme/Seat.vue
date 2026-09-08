<script setup lang="ts">
defineOptions({ chrome: { 'aside-outline-before': { compact: true } } })
import { qpuSeatOf } from '../../../src/hologram.ts'

defineProps<{ compact?: boolean }>()
const seat = qpuSeatOf()
</script>

<template>
  <p class="qpu-seat">
    <strong>{{ seat.name }}</strong>
    · {{ seat.seat }}
    <template v-if="!compact"> · admits {{ seat.admits }}</template>
  </p>
</template>
