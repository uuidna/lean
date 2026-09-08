<script setup lang="ts">
defineOptions({ chrome: { 'nav-bar-content-after': {} } })
import { ref } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { qpuSearchOf, type ChromeHit } from '../../../src/chrome.ts'

const q = ref('')
const hits = ref<ChromeHit[]>([])
const router = useRouter()

const run = () => {
  hits.value = qpuSearchOf(q.value).hits
}

const go = (link: string) => {
  hits.value = []
  q.value = ''
  if (link.startsWith('http')) {
    window.location.assign(link)
    return
  }
  void router.go(withBase(link))
}
</script>

<template>
  <div class="qpu-search">
    <input
      v-model="q"
      type="search"
      aria-label="Search hologram"
      placeholder="face · plane · key"
      @input="run"
    >
    <div v-if="hits.length" class="qpu-search-hits" role="listbox">
      <p v-for="h in hits" :key="h.kind + h.link + h.text">
        <a :href="h.link" @click.prevent="go(h.link)">{{ h.kind }} · {{ h.text }}</a>
      </p>
    </div>
  </div>
</template>
