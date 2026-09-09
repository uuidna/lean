<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { applyHologram } from '../../../src/hologram.ts'
import { qpuOgOf } from '../../../src/og.ts'
import { chromeOf, pageViewOf } from './autoload.ts'
import { data } from '../hologram.data.ts'

const { Layout } = DefaultTheme
const { frontmatter, isDark } = useData()
const route = useRoute()
const isHome = computed(() => frontmatter.value.layout === 'home')
const og = qpuOgOf()
const PageView = computed(() => pageViewOf(route.path))
const chrome = chromeOf()
const root = chrome.root ?? []
const slotted = Object.fromEntries(Object.entries(chrome).filter(([slot]) => slot !== 'root'))

const paint = () => {
  applyHologram()
  if (typeof document === 'undefined') return
  const m = /^\/face\/(\d+)/.exec(route.path)
  const rootEl = document.documentElement
  if (m) rootEl.style.setProperty('--qpu-face', m[1]!)
  else rootEl.style.removeProperty('--qpu-face')
  rootEl.dataset.theme = isDark.value ? 'dark' : 'light'
  rootEl.dataset.heading = data.direction.heading
  rootEl.style.setProperty('--qpu-morph', String(data.direction.temperature.morph))
}

onMounted(paint)
watch(() => route.path, paint)
watch(isDark, paint)
</script>

<template>
  <div class="qpu-engine" data-computer="qpu" data-engine="lean" data-firmware="vitepress">
    <component :is="c.component" v-for="c in root" :key="c.name" v-bind="c.props" />
    <Layout class="qpu-singularity" :data-qpu-home="isHome ? '1' : '0'">
      <template v-for="(items, slot) in slotted" :key="slot" #[slot]>
        <component :is="c.component" v-for="c in items" :key="c.name" v-bind="c.props" />
      </template>
      <template #nav-bar-title-after>
        <span class="qpu-seat-pill">{{ frontmatter.layout === 'home' ? 'empty' : '' }}</span>
      </template>
      <template #home-hero-image>
        <img class="qpu-og-hero" :src="og.path" :alt="og.alt" :width="og.width" :height="og.height" />
      </template>
      <template #home-hero-info-after>
        <p class="qpu-hero-count">Fourteen VE lines. Ten choices. 10¹⁴ books. Empty first.</p>
      </template>
      <template #doc-before>
        <component :is="PageView" v-bind="route.params" />
      </template>
    </Layout>
  </div>
</template>
