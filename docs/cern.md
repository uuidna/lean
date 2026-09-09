---
title: Lean CERN
description: Fourteen named CERN HTTPS APIs. Leads are the Lean register fused onto INSPIRE literature. Mint empty. Tokens empty. Email empty.
outline: deep
---

# Lean CERN <Badge type="warning" text="mint empty" />

Product `{{ reading.product }}`. Holds `{{ reading.holds }}`. Seat `{{ reading.seat }}`. Mint `{{ reading.mint.seat }}`. Fourteen named CERN HTTPS APIs. Leads are the Lean register fused onto INSPIRE.

## APIs · {{ reading.apis.length }}

<table>
  <thead>
    <tr><th>Face</th><th>Name</th><th>Host</th></tr>
  </thead>
  <tbody>
    <tr v-for="row in reading.apis" :key="row.href">
      <td>{{ row.face }}</td>
      <td>{{ row.name }}</td>
      <td><a :href="row.href"><code>{{ row.host }}</code></a></td>
    </tr>
  </tbody>
</table>

::: info JSON
`curl -sS https://lean.uuidna.com/cern` · alias [LHC](/lhc)
:::
