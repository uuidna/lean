// library — public combinatorial books. Occupancy of uuidna strips, never Queneau verse.
// Ten choices on fourteen VE lines are 10¹⁴ seats. Computed at curiosity. Cost 0. When never.
import './licence.js'
import {
  ADDRESS_BITS, COINS, HANDLE_BITS, HANDLE_HEXBITS, HEXBIT_BITS, SEAL_TEN, TRINITY, VE_FACES,
  qpuDirectionHolds, qpuDirectionOf, qpuGlagoliticOf, qpuHexPageOf, qpuLicenceHostOf, qpuSeatOf, qpuTwoNOf,
} from './hologram.js'
import { qpuHexbitMetricsOf } from './metrics.js'
import { THEOREM_HOST } from './standing.js'

const namedHttpsOf = (host: string, path: string): string => {
  if (!host.includes('.') || host.includes('*') || path.includes('*') || !path.startsWith('/')) {
    throw new Error('fuse: named door only')
  }
  const u = new URL(path, `https://${host}/`)
  if (u.protocol !== 'https:' || u.hostname !== host) throw new Error('fuse: named domain only')
  return u.href
}

const theoremHrefOf = (slug: string): string => new URL(slug, `${THEOREM_HOST}/`).href

/** Lean leads behind every combinatorial book. Same keys for all 10¹⁴ seats. Occupancy, not verse. */
export const LEAN_LIBRARY_LEADS = [
  { key: 'literature_sonnet_measure', file: 'Wave.lean' },
  { key: 'literature_sonnet_volume', file: 'Wave.lean' },
  { key: 'combinatorial_book_exceeds_handles', file: 'Wave.lean' },
  { key: 'combinatorial_book_fits_the_uuid', file: 'Wave.lean' },
  { key: 'station_ten_is_hexagram_plus_hexbit', file: 'Wave.lean' },
  { key: 've_fourteen_faces', file: 'VectorEquilibrium.lean' },
  { key: 've_faces_are_handle_hexbit_coins', file: 'Wave.lean' },
  { key: 'universe_of_handles', file: 'Universe.lean' },
  { key: 'seal_ten', file: 'Sequence.lean' },
  { key: 'hexbit_is_four_qubits', file: 'Alignment.lean' },
  { key: 'key_floor_is_one_uuid', file: 'Cipher.lean' },
  { key: 'verify_beats_recompute_by_magnitudes', file: 'Cipher.lean' },
] as const

const volumeOf = (lines: number, variants: number): number => {
  let n = 1
  for (let i = 0; i < lines; i++) n = n * variants
  return n
}

const digitsOf = (curiosity: unknown, lines: number, volume: number): number[] | null => {
  if (curiosity == null || curiosity === '') return Array.from({ length: lines }, () => 0)
  if (typeof curiosity === 'number') {
    if (!Number.isInteger(curiosity) || curiosity < 0) return null
    let n = curiosity % volume
    const digits = Array.from({ length: lines }, () => 0)
    for (let i = lines - 1; i >= 0; i--) {
      digits[i] = n % 10
      n = (n - digits[i]!) / 10
    }
    return digits
  }
  const raw = String(curiosity).trim()
  if (!raw) return Array.from({ length: lines }, () => 0)
  if (!/^\d+$/.test(raw) || raw.length > lines) return null
  const padded = raw.padStart(lines, '0')
  return [...padded].map((d) => Number(d))
}

const goneOf = () => ({
  kind: 'library' as const,
  holds: false as const,
  when: 'never' as const,
  error: 'no such reading' as const,
  verse: false as const,
  seat: qpuSeatOf().seat,
  fetches: 0 as const,
  cost: 0 as const,
})

/** Public Lean library. One book from curiosity. All combinations admitted; none stored. */
export const qpuLeanLibraryOf = (curiosity?: string | number) => {
  const lines = VE_FACES
  const variants = SEAL_TEN.length
  const measure = lines * variants
  const volume = volumeOf(lines, variants)
  const digits = digitsOf(curiosity, lines, volume)
  if (!digits) return goneOf()
  const host = qpuLicenceHostOf()
  const href = namedHttpsOf(host, '/library')
  const direction = qpuDirectionOf()
  const hexbit = qpuHexbitMetricsOf()
  const handles = qpuTwoNOf(HANDLE_BITS)
  const catalog = digits.join('')
  const strips = digits.map((choice, line) => {
    const page = qpuHexPageOf(line)
    return {
      line,
      choice,
      seal: SEAL_TEN[choice]!,
      name: page.glagolitic,
      hex: page.hex,
      glue: page.glagolitic,
      latex: page.latex,
    }
  })
  const leads = LEAN_LIBRARY_LEADS.map((row) => ({
    key: row.key,
    file: row.file,
    prior: theoremHrefOf(row.key),
  }))
  const tokens = {
    cost: 0 as const,
    llm: 0 as const,
    address: hexbit.addressTokens,
    bytes: hexbit.addressBytes,
  }
  const holds =
    lines === VE_FACES &&
    variants === HEXBIT_BITS + COINS * TRINITY &&
    measure === 140 &&
    volume === 100000000000000 &&
    volume > handles &&
    BigInt(volume) < (1n << BigInt(ADDRESS_BITS)) &&
    handles === qpuTwoNOf(HANDLE_HEXBITS * HEXBIT_BITS) &&
    strips.length === lines &&
    strips.every((row, i) =>
      row.line === i &&
      row.choice >= 0 &&
      row.choice < variants &&
      row.name === qpuGlagoliticOf(i) &&
      row.glue === row.name,
    ) &&
    leads.length === LEAN_LIBRARY_LEADS.length &&
    leads.every((row) => row.prior.startsWith(`${THEOREM_HOST}/`)) &&
    direction.fetches === 0 &&
    direction.speed.beats === direction.speed.verify &&
    tokens.cost === 0 &&
    tokens.llm === 0 &&
    qpuDirectionHolds(direction) &&
    qpuSeatOf().seat === 'empty'
  return {
    kind: 'library' as const,
    product: 'Lean library' as const,
    derived: 'lean' as const,
    public: true as const,
    verse: false as const,
    stored: false as const,
    curiosity: true as const,
    responsive: true as const,
    cost: 0 as const,
    fetches: 0 as const,
    when: 'never' as const,
    time: false as const,
    href,
    host,
    seat: qpuSeatOf().seat,
    mint: { name: 'Mint' as const, seat: 'empty' as const, admits: 'nothing' as const },
    lines,
    variants,
    measure,
    volume,
    handles,
    catalog,
    strips,
    leads,
    scale: direction.scale,
    speed: direction.speed,
    temperature: direction.temperature,
    tokens,
    holds,
  }
}

export const qpuLeanLibraryHolds = (row = qpuLeanLibraryOf(0)): boolean => {
  if ('error' in row) return false
  return (
    row.holds === true &&
    row.kind === 'library' &&
    row.public === true &&
    row.verse === false &&
    row.stored === false &&
    row.cost === 0 &&
    row.fetches === 0 &&
    row.when === 'never' &&
    row.time === false &&
    row.tokens.cost === 0 &&
    row.tokens.llm === 0 &&
    row.volume === 100000000000000 &&
    row.measure === 140 &&
    row.lines === VE_FACES &&
    row.variants === SEAL_TEN.length &&
    row.leads.length === LEAN_LIBRARY_LEADS.length &&
    row.scale.fetches === 0 &&
    row.speed.beats === row.speed.verify &&
    row.mint.seat === 'empty'
  )
}
