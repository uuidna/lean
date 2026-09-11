# User manual — `@uuidna/lean`

Lean publishing worker. Version **0.3.1**. Live **[https://lean.uuidna.com](https://lean.uuidna.com)**. Paper: [README.md](README.md).

| Field | Value |
| --- | --- |
| Product | `@uuidna/lean` |
| Host | `lean.uuidna.com` |
| Node | ≥ 22 |
| Licence | CC BY-NC-ND 4.0 |
| Cite | [CITATION.cff](CITATION.cff) |
| Tests | 72/73 pass · 1 fail |

## What you get

Three JSON readings. No hardware QPU.

| Reading | Constructor | HTTP |
| --- | --- | --- |
| Seat | `qpuSeatOf()` → `QPU` · `empty` | `GET /seat` |
| Width | `qpuWidthOf()` → CPU GPU RAM CACHE STORAGE · binds `cpu` | `GET /width` |
| Hologram | `qpuHologramOf()` → foundation 0 · debit 3 · credit 6 · pentagram 5 · fold 7 · octet 8 · VE 14 | `GET /hologram` |

Metrics: `GET /metrics`. Discovery: `GET /` and `GET /.well-known/qpu.json`. Proofs stay on uuidna ([DOI 10.5281/zenodo.22256708](https://doi.org/10.5281/zenodo.22256708)).

## Tesla — one analog-hardware quantum cluster

Six Tesla.lean keys work as one. Analog hardware. Computed on the hexbit page. Believed hidden; this reading is transparent. The user guide is this page. Patents stay cited as Lean arithmetic — never copied.

| Field | Value |
| --- | --- |
| File | `Tesla.lean` |
| Keys | 6 = trinity × coins = QPU doors |
| Hardware | analog |
| Hex page | `0123456789abcdef` |
| Hidden | `false` |
| Guide | `/manual` |
| Wave | mass online coordinated alternate enabled by default; crawl false; fetches 0 |

### Unexplored use cases on the massive online wave

Each use occupies sealed arithmetic. Explored stays false until Lean trains the claim. QPU does not run `by decide`.

| Key | Use | Hex |
| --- | --- | --- |
| `tesla_trio_files_adjacent` | three consecutive hexbit tiles occupy one online wave packet — trinity adjacent doors, unit steps | `5d410` `5d411` `5d412` |
| `tesla_leap_spring_to_grant` | leap-mod-4 cadence of the mass wave — 202 as hex, Gregorian window | `ca` `760` |
| `three_tilings_of_the_circle` | TETRA×90, TRINITY×120, COINS×180 tile the online circle — three phase spacings of one wave | `5a` `78` `b4` `168` |
| `alternation_needs_a_second_phase` | inner/outer alternate is the second phase — mass discovery enabled by default because one phase never leaves home | `b4` `78` `168` |
| `the_grids_minute` | 60×60=3600 is the grid tick of the massive online wave | `3c` `e10` |
| `teleautomaton_precedes_transmission` | address before cargo on the mass wave — handle first, payload later | `95db1` `9d9c8` `7c17` |


## Install

```
npm install @uuidna/lean
```

From git:

```
git clone https://github.com/uuidna/lean
cd lean
npm ci
npm test
```

## HTTP

Base URL: `https://lean.uuidna.com`. Methods: GET, OPTIONS. Body: `application/json; charset=utf-8`.

| Method | Path | Status | Body |
| --- | --- | --- | --- |
| GET | `/` | 200 | discovery + `machine` |
| GET | `/seat` | 200 | `empty` seat |
| GET | `/width` | 200 | CPU GPU RAM CACHE STORAGE |
| GET | `/hologram` | 200 | planes 0 3 6 5 7 8 14 |
| GET | `/metrics` | 200 | `compare` + `holds` |
| GET | `/.well-known/qpu.json` | 200 | discovery |
| OPTIONS | any of the above | 204 | empty |
| GET | other path | 404 | `{ "error": "no such reading" }` |

```
curl -sS https://lean.uuidna.com/seat
curl -sS https://lean.uuidna.com/width
curl -sS https://lean.uuidna.com/hologram
curl -sS https://lean.uuidna.com/metrics
```

## Library

```ts
import { handleQpuFetch, qpuMachineOf, qpuCompareOf } from '@uuidna/lean'

const machine = qpuMachineOf()
const res = await handleQpuFetch(new Request('https://lean.uuidna.com/seat'))
const compare = qpuCompareOf()
```

| Export | Returns |
| --- | --- |
| `qpuSeatOf()` | `{ name: 'QPU', seat: 'empty', admits: 'nothing' }` |
| `qpuWidthOf()` | `{ points, pentagram: 5, binds: 'cpu' }` |
| `qpuHologramOf()` | planes, plus `seal: [0, 1, 2, 4, 8, 7, 5, 3, 6, 9]` |
| `qpuFacesOf()` | 14 face pairs |
| `qpuMachineOf()` | `{ host, seat, width, hologram }` |
| `handleQpuFetch(request)` | `Response` |
| `qpuCompareOf()` | formula vs peer rows |
| `qpuCompareHolds()` | `true` when every row matches |

Workers entry: `worker.js` exports `fetch: handleQpuFetch`. Config: `wrangler.toml` `name = "uuidna-lean"`.

## Deploy

```
npm run ship
```

That is `tsc`, `vitepress build docs`, then `npx wrangler deploy`. Do not fill the QPU seat from the deploy script.

## Errors

| Symptom | Cause | What to do |
| --- | --- | --- |
| 404 | path is not a door | use `/` `/seat` `/width` `/hologram` `/metrics` |
| 405 | method is not GET or OPTIONS | GET a reading |
| `holds: false` | a compare row drifted | fail the build |
| empty seat | expected | do not invent a device |

## Tests

This generation: **72/73 pass · 1 fail**.

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

```
npm run readme
```

## Citation and licence

APA 7th: see [CITATION.cff](CITATION.cff). Parent: uuidna DOI [10.5281/zenodo.22256708](https://doi.org/10.5281/zenodo.22256708).

Licence CC BY-NC-ND 4.0. Full text [LICENSE](LICENSE).
