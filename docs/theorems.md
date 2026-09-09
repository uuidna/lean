---
title: Lean theorems
description: Fourteen sealed uuidna keys fused from inner QPU uses onto VE faces. Mint empty. This package does not mint keys.
outline: deep
---

# Lean theorems <Badge type="warning" text="mint empty" />

Product `{{ reading.product }}`. Holds `{{ reading.holds }}`. Seat `{{ reading.seat }}`. Mint `{{ reading.mint.seat }}`. Faces fuse inner QPU constructor uses; census hrefs stay on uuidna.com.

## Faces · {{ reading.faceCount }}

<table>
  <thead>
    <tr><th>Face</th><th>Name</th><th>Hex</th><th>LaTeX</th><th>Key</th></tr>
  </thead>
  <tbody>
    <tr v-for="f in reading.faces" :key="f.hex">
      <td>{{ f.face }}↔{{ f.opposite }}</td>
      <td>{{ f.name }}</td>
      <td><code>{{ f.hex }}</code></td>
      <td><code>{{ f.latex }}</code></td>
      <td><code>{{ f.key }}</code></td>
    </tr>
  </tbody>
</table>

## Census · {{ reading.handle }} uuidna.com theorems

<table>
  <thead>
    <tr><th>Tile</th><th>Theorem</th></tr>
  </thead>
  <tbody>
    <tr v-for="c in reading.census" :key="c.slug">
      <td>{{ c.name }}</td>
      <td><a :href="c.href">{{ c.slug }}</a></td>
    </tr>
  </tbody>
</table>

## Methods · {{ reading.pentagram }} BindingPoint names

<table>
  <thead>
    <tr><th>Point</th><th>Name</th></tr>
  </thead>
  <tbody>
    <tr v-for="m in reading.methods" :key="m.point">
      <td>{{ m.point }}</td>
      <td>{{ m.name }}</td>
    </tr>
  </tbody>
</table>

::: info JSON
`curl -sS https://lean.uuidna.com/theorems` · alias [Cited](/cited)
:::
