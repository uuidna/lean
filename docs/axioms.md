---
title: Lean axioms
description: Fourteen uuidna Lean wings fused from standing files onto VE faces. Axiom empty. The kernel is axiom-free.
outline: deep
---

# Lean axioms <Badge type="warning" text="axiom empty" />

Product `{{ reading.product }}`. Holds `{{ reading.holds }}`. Seat `{{ reading.seat }}`. Axiom `{{ reading.axiom.seat }}`. Wings fuse `qpuStandingFilesOf()` onto VE faces; census hrefs stay on uuidna.com.

## Wings · {{ reading.faceCount }}

<table>
  <thead>
    <tr><th>Face</th><th>File</th></tr>
  </thead>
  <tbody>
    <tr v-for="f in reading.faces" :key="f.name">
      <td>{{ f.face }}↔{{ f.opposite }}</td>
      <td><code>{{ f.name }}</code></td>
    </tr>
  </tbody>
</table>

## Census · {{ reading.handle }} uuidna.com/lean tiles

<table>
  <thead>
    <tr><th>Tile</th><th>Wing</th></tr>
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
`curl -sS https://lean.uuidna.com/axioms` · alias [Wings](/wings)
:::
