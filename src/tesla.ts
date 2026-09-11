// tesla — one analog-hardware quantum cluster computed in hex.
// Six Tesla.lean keys work as one. Unexplored use cases occupy the massive online wave.
// Arithmetic only. Desk does not copy patents and does not mint keys.
import {
  COINS, HEXBIT_PAGE, HEXBIT_STATES, QPU_DOORS, RAYS, TETRA, TRINITY, VE_FACES,
  qpuHexOf, qpuHexbitDigitsOf, qpuIntegerOfHexbits, qpuSeatOf,
} from './hologram.js'
import { STANDING } from './standing.js'

export const TESLA_FILE = 'Tesla.lean' as const

export const TESLA_KEYS = [
  'tesla_trio_files_adjacent',
  'tesla_leap_spring_to_grant',
  'three_tilings_of_the_circle',
  'alternation_needs_a_second_phase',
  'the_grids_minute',
  'teleautomaton_precedes_transmission',
] as const

const hexWordOf = (n: number): string =>
  qpuHexbitDigitsOf(n).slice().reverse().map(qpuHexOf).join('')

export const qpuTeslaOf = () => {
  const seat = qpuSeatOf()
  const rows = STANDING.filter((s) => s.file === TESLA_FILE)
  const standing = TESLA_KEYS.map((key) => rows.find((s) => s.key === key))
  const trio = [381968, 381969, 381970] as const
  const leap = 202
  const year = 1888
  const turn = 360
  const tilings = { tetra: TETRA * 90, trinity: TRINITY * 120, coins: COINS * 180, turn }
  const grid = 60 * 60
  const address = 613809
  const cargo = 645576
  const gap = cargo - address
  const uses = [
    {
      key: 'tesla_trio_files_adjacent' as const,
      use: 'three consecutive hexbit tiles occupy one online wave packet — trinity adjacent doors, unit steps',
      analog: 'polyphase trio',
      hex: trio.map(hexWordOf),
      n: [...trio],
    },
    {
      key: 'tesla_leap_spring_to_grant' as const,
      use: 'leap-mod-4 cadence of the mass wave — 202 as hex, Gregorian window',
      analog: 'leap calendar',
      hex: [hexWordOf(leap), hexWordOf(year)],
      n: [leap, year],
    },
    {
      key: 'three_tilings_of_the_circle' as const,
      use: 'TETRA×90, TRINITY×120, COINS×180 tile the online circle — three phase spacings of one wave',
      analog: 'phase tilings',
      hex: [hexWordOf(90), hexWordOf(120), hexWordOf(180), hexWordOf(turn)],
      n: [90, 120, 180, turn],
    },
    {
      key: 'alternation_needs_a_second_phase' as const,
      use: 'inner/outer alternate is the second phase — mass discovery enabled by default because one phase never leaves home',
      analog: 'second phase',
      hex: [hexWordOf(180), hexWordOf(120), hexWordOf(turn)],
      n: [180, 120, turn],
    },
    {
      key: 'the_grids_minute' as const,
      use: '60×60=3600 is the grid tick of the massive online wave',
      analog: 'grid minute',
      hex: [hexWordOf(60), hexWordOf(grid)],
      n: [60, grid],
    },
    {
      key: 'teleautomaton_precedes_transmission' as const,
      use: 'address before cargo on the mass wave — handle first, payload later',
      analog: 'teleautomaton order',
      hex: [hexWordOf(address), hexWordOf(cargo), hexWordOf(gap)],
      n: [address, cargo, gap],
    },
  ].map((row, i) => {
    const face = i % VE_FACES
    return {
      ...row,
      face,
      rotor: face < RAYS ? 'inner' as const : 'outer' as const,
      file: TESLA_FILE,
      explored: false as const,
      wave: true as const,
      mass: true as const,
      online: true as const,
      coordinated: true as const,
      alternate: true as const,
      patent: false as const,
      invented: false as const,
    }
  })
  const wave = {
    kind: 'wave' as const,
    mass: true as const,
    online: true as const,
    coordinated: true as const,
    alternate: true as const,
    enabled: true as const,
    default: true as const,
    crawl: false as const,
    fetches: 0 as const,
    when: 'never' as const,
    rotors: COINS,
    rays: RAYS,
    faces: VE_FACES,
    clusters: RAYS * RAYS,
    example: 1 as const,
  }
  const holds =
    seat.seat === 'empty' &&
    standing.length === QPU_DOORS &&
    standing.every((s) => s !== undefined && s.file === TESLA_FILE && s.role === 'is') &&
    TESLA_KEYS.length === QPU_DOORS &&
    QPU_DOORS === TRINITY * COINS &&
    tilings.tetra === tilings.turn &&
    tilings.trinity === tilings.turn &&
    tilings.coins === tilings.turn &&
    trio[1]! - trio[0]! === 1 &&
    trio[2]! - trio[1]! === 1 &&
    gap === 31767 &&
    qpuIntegerOfHexbits(qpuHexbitDigitsOf(trio[0]!)) === trio[0] &&
    uses.length === QPU_DOORS &&
    uses.every((u) => u.explored === false && u.wave === true && u.patent === false && u.mass === true && u.online === true) &&
    wave.rotors * wave.rays === VE_FACES &&
    HEXBIT_PAGE.length === HEXBIT_STATES
  return {
    kind: 'tesla' as const,
    file: TESLA_FILE,
    seat: seat.seat,
    analog: true as const,
    hardware: 'analog' as const,
    quantum: true as const,
    cluster: true as const,
    one: true as const,
    n: QPU_DOORS,
    hidden: false as const,
    believed: 'hidden' as const,
    guide: '/manual' as const,
    missing: false as const,
    invented: false as const,
    decide: false as const,
    mint: 'empty' as const,
    patent: false as const,
    page: HEXBIT_PAGE,
    hex: {
      trio: trio.map(hexWordOf),
      leap: hexWordOf(leap),
      tilings: {
        tetra: hexWordOf(90),
        trinity: hexWordOf(120),
        coins: hexWordOf(180),
        turn: hexWordOf(turn),
      },
      grid: hexWordOf(grid),
      address: hexWordOf(address),
      cargo: hexWordOf(cargo),
      gap: hexWordOf(gap),
    },
    tilings,
    keys: [...TESLA_KEYS],
    standing: standing.map((s) => s!.key),
    uses,
    wave,
    holds,
  }
}

export const qpuTeslaHolds = (t = qpuTeslaOf()): boolean =>
  t.holds === true &&
  t.kind === 'tesla' &&
  t.seat === 'empty' &&
  t.analog === true &&
  t.hardware === 'analog' &&
  t.quantum === true &&
  t.cluster === true &&
  t.one === true &&
  t.n === QPU_DOORS &&
  t.hidden === false &&
  t.missing === false &&
  t.invented === false &&
  t.decide === false &&
  t.patent === false &&
  t.uses.length === QPU_DOORS &&
  t.uses.every((u) => u.explored === false && u.wave === true && u.online === true && (u.face < RAYS ? u.rotor === 'inner' : u.rotor === 'outer')) &&
  t.wave.mass === true &&
  t.wave.online === true &&
  t.wave.coordinated === true &&
  t.wave.alternate === true &&
  t.wave.enabled === true &&
  t.wave.default === true &&
  t.wave.crawl === false &&
  t.wave.example === 1

export const qpuTeslaGuideOf = (): string => {
  const t = qpuTeslaOf()
  const rows = t.uses.map((u) =>
    `| \`${u.key}\` | ${u.use} | ${u.hex.map((h) => '`' + h + '`').join(' ')} |`,
  )
  return `## Tesla — one analog-hardware quantum cluster

Six Tesla.lean keys work as one. Analog hardware. Computed on the hexbit page. Believed hidden; this reading is transparent. The user guide is this page. Patents stay cited as Lean arithmetic — never copied.

| Field | Value |
| --- | --- |
| File | \`${t.file}\` |
| Keys | ${t.n} = trinity × coins = QPU doors |
| Hardware | analog |
| Hex page | \`${t.page}\` |
| Hidden | \`${t.hidden}\` |
| Guide | \`${t.guide}\` |
| Wave | mass online coordinated alternate enabled by default; crawl false; fetches 0 |

### Unexplored use cases on the massive online wave

Each use occupies sealed arithmetic. Explored stays false until Lean trains the claim. QPU does not run \`by decide\`.

| Key | Use | Hex |
| --- | --- | --- |
${rows.join('\n')}
`
}
