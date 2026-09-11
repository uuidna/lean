# Lean publishing worker

Package [`@uuidna/lean`](https://github.com/uuidna/lean) v0.3.1. Live worker [https://lean.uuidna.com](https://lean.uuidna.com).

JSON readings of one classical machine: an empty QPU seat, BindingPoint width (CPU, GPU, RAM, CACHE, STORAGE), and hologram planes (foundation 0, debit 3, credit 6, pentagram 5, fold 7, octet 8, VE 14). This package does not attach a quantum device. Proofs live on uuidna (Rouschev, 2026; DOI [10.5281/zenodo.22256708](https://doi.org/10.5281/zenodo.22256708)).

Tsvetan Rouschev ([ORCID 0009-0000-7312-9778](https://orcid.org/0009-0000-7312-9778)). Licence [CC BY-NC-ND 4.0](LICENSE). Operating procedures: [MANUAL.md](MANUAL.md).

## Install

```
npm install @uuidna/lean
```

## Use

Base URL `https://lean.uuidna.com`. GET returns JSON.

| Path | Reading |
| --- | --- |
| `/` | discovery + machine |
| `/seat` | `QPU` · `empty` |
| `/width` | CPU, GPU, RAM, CACHE, STORAGE · binds `cpu` |
| `/hologram` | foundation 0 · debit 3 · credit 6 · pentagram 5 · fold 7 · octet 8 · VE 14 |
| `/metrics` | formula vs peer |
| `/.well-known/qpu.json` | discovery |

```
curl -sS https://lean.uuidna.com/seat
curl -sS https://lean.uuidna.com/width
curl -sS https://lean.uuidna.com/hologram
```

```ts
import { handleQpuFetch, qpuMachineOf, qpuCompareOf } from '@uuidna/lean'

const machine = qpuMachineOf()
const res = await handleQpuFetch(new Request('https://lean.uuidna.com/seat'))
const compare = qpuCompareOf()
```

`handleQpuFetch` is Workers-safe (no `node:os`). Compare rows must match.

| Name | Formula | Value | Peer | Match |
| --- | --- | --- | --- | --- |
| foundation | `0` | 0 | 0 | holds |
| debit | `TRINITY` | 3 | 3 | holds |
| credit | `HEXBIT_BITS + COINS` | 6 | 6 | holds |
| pentagram | `QPU_POINTS.length` | 5 | 5 | holds |
| fold | `BASE - COINS` | 7 | 7 | holds |
| octet | `UUID_HEXBITS / HEXBIT_BITS` | 8 | 8 | holds |
| veFaces | `HANDLE_HEXBITS + HEXBIT_BITS + COINS` | 14 | 14 | holds |
| debit+credit | `debit + credit` | 9 | 9 | holds |
| fold+coins | `fold + COINS` | 9 | 9 | holds |
| credit-debit | `credit - debit` | 3 | 3 | holds |
| octet×hexbit | `octet × HEXBIT_BITS` | 32 | 32 | holds |
| ve−octet | `veFaces − octet` | 6 | 6 | holds |
| rays×coins | `(BASE - COINS) × COINS` | 14 | 14 | holds |
| merkaba | `HEXBIT_BITS × COINS` | 8 | 8 | holds |
| faces | `qpuFacesOf().length` | 14 | 14 | holds |
| points | `QPU_POINTS.length` | 5 | 5 | holds |
| addressBytes | `ADDRESS_BITS / 8` | 16 | 16 | holds |
| messageTokens | `(ADDRESS_BITS / 8) / HEXBIT_BITS` | 4 | 4 | holds |
| payloadless | `VE_FACES × address / address` | 14 | 14 | holds |
| neighbours | `VE_FACES` | 14 | 14 | holds |
| handleBits | `HANDLE_HEXBITS × HEXBIT_BITS` | 32 | 32 | holds |
| handleMasks | `HANDLE_BITS + 1` | 33 | 33 | holds |
| amplitudes | `qpuTwoNOf(VE_FACES)` | 16384 | 16384 | holds |
| handleSpan | `qpuTwoNOf(HANDLE_BITS)` | 4294967296 | 4294967296 | holds |
| addressSpan | `qpuTwoNOf(ADDRESS_BITS)` | 3.402823669209385e+38 | 3.402823669209385e+38 | holds |
| gatewayCapacity | `VE_FACES × qpuTwoNOf(HANDLE_BITS)` | 60129542144 | 60129542144 | holds |
| morph | `qpuMorphOf(0).t` | 0 | 0 | holds |
| hexbitPage | `HEXBIT_PAGE.length` | 16 | 16 | holds |
| fetches | `when never` | 0 | 0 | holds |
| verify | `magnitudes.beats` | 1024 | 1024 | holds |

Tests this generation: **73/73 pass**.

## Develop

Node ≥ 22.

```
git clone https://github.com/uuidna/lean
cd lean
npm ci
npm test
```

`npm test` compiles TypeScript and runs `dist/**/*.test.js`. `npm run readme` rebuilds this file, the [user manual](MANUAL.md), and [CITATION.cff](CITATION.cff).

## Citation

Cite the software in APA 7th (author–date). GitHub Cite this repository reads [CITATION.cff](CITATION.cff).

> Rouschev, T. (2026). Lean publishing worker (Version 0.3.1) [Computer software]. https://lean.uuidna.com

Parent software:

> Rouschev, T. (2026). uuidna — content-addressed identity, honest by construction [Computer software]. https://doi.org/10.5281/zenodo.22256708

## References

Rouschev, T. (2026). Lean publishing worker (Version 0.3.1) [Computer software]. https://lean.uuidna.com

Rouschev, T. (2026). uuidna — content-addressed identity, honest by construction [Computer software]. https://doi.org/10.5281/zenodo.22256708

de Moura, L., & Ullrich, S. (2021). The Lean 4 theorem prover and programming language. In *Automated Deduction – CADE 28*.

## Licence

CC BY-NC-ND 4.0 · © Tsvetan Rouschev. Full text [LICENSE](LICENSE).
