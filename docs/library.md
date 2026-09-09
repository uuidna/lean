---
title: Lean library
description: Public combinatorial books. Ten choices on fourteen VE lines are 10¹⁴ seats. Lean leads sealed by decide. No verse stored. Cost 0. When never.
outline: deep
---

# Lean library <Badge type="tip" text="10¹⁴ books" />

Public library. Product `{{ reading.product }}`. Holds `{{ reading.holds }}`. Verse `{{ reading.verse }}`. Stored `{{ reading.stored }}`. Cost `{{ reading.cost }}`. Fetches `{{ reading.fetches }}`. When `{{ reading.when }}`. Time `{{ reading.time }}`.

Fourteen lines times ten choices is the sonnet measure. The power is the combinatorial book. Every combination is a book computed at curiosity. The ledger holds no verse.

Scale may `{{ reading.scale.may }}` fused `{{ reading.scale.fused }}` fetches `{{ reading.scale.fetches }}`. Speed beats `{{ reading.speed.beats }}` verify `{{ reading.speed.verify }}`. Tokens llm `{{ reading.tokens.llm }}` address `{{ reading.tokens.address }}`.

Catalog `{{ reading.catalog }}`. Volume `{{ reading.volume }}`. Measure `{{ reading.measure }}`.

<Library />

## Leads behind every combination

The same Lean keys occupy all 10¹⁴ seats. Selecting a book does not mint a fifteenth face and does not copy prose.

<table>
  <thead>
    <tr><th>Key</th><th>Wing</th></tr>
  </thead>
  <tbody>
    <tr v-for="row in reading.leads" :key="row.key">
      <th scope="row"><a :href="row.prior"><code>{{ row.key }}</code></a></th>
      <td><code>{{ row.file }}</code></td>
    </tr>
  </tbody>
</table>

## Strips · {{ reading.lines }} × {{ reading.variants }}

<table>
  <caption>One book. Glagolitic names the line. Choice is the strip.</caption>
  <thead>
    <tr><th>Line</th><th>Name</th><th>Choice</th><th>Seal</th></tr>
  </thead>
  <tbody>
    <tr v-for="s in reading.strips" :key="s.line">
      <td>{{ s.line }}</td>
      <th scope="row">{{ s.name }}</th>
      <td>{{ s.choice }}</td>
      <td>{{ s.seal }}</td>
    </tr>
  </tbody>
</table>

::: info JSON
`curl -sS 'https://lean.uuidna.com/library?book=00000000000000'` · alias [Books](/books)
:::
