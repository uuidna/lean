// library — public combinatorial books. Occupancy of uuidna strips, never Queneau verse.
// One book is 10¹⁴ seats (fourteen VE lines × ten choices). The library of those books is the UUID address.
// Unique clusters are magnitudes bigger than one combinatorial sonnet. Cost 0. When never.
import './licence.js'
import {
  ADDRESS_BITS, COINS, HANDLE_BITS, HANDLE_HEXBITS, HEXBIT_BITS, HEXBIT_PAGE, HEXBIT_STATES, RAYS, SEAL_TEN, TRINITY,
  UUID_HEXBITS, VE_FACES,
  qpuDirectionHolds, qpuDirectionOf, qpuExperienceHolds, qpuExperienceOf, qpuGlagoliticOf, qpuHexPageOf, qpuLicenceHostOf,
  qpuRosetteOf, qpuSeatOf, qpuSuperpositionsOf, qpuTwoNOf,
  qpuLeanStripeOf, qpuLeanStripeHolds,
} from './hologram.js'
import { OG_HEIGHT, OG_PATH, OG_TYPE, OG_WIDTH, qpuOgDocOf, qpuOgHrefOf, qpuOgOf } from './og.js'
import { qpuHexbitMetricsOf } from './metrics.js'
import { THEOREM_HOST, qpuStandingFilesOf } from './standing.js'
import { SEO_OG_REQUIRED, qpuSeoOf } from './seo.js'
import { qpuLeanFrontmatterOf } from './pages.js'

const namedHttpsOf = (host: string, path: string): string => {
  if (!host.includes('.') || host.includes('*') || path.includes('*') || !path.startsWith('/')) {
    throw new Error('fuse: named door only')
  }
  const u = new URL(path, `https://${host}/`)
  if (u.protocol !== 'https:' || u.hostname !== host) throw new Error('fuse: named domain only')
  return u.href
}

const theoremHrefOf = (slug: string): string => new URL(slug, `${THEOREM_HOST}/`).href

/** Lean leads behind every combinatorial book. Same keys for all seats. Occupancy, not verse. */
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

/** Page width of the essays desk: handle octet plus the sixteen-tile Glagolitic page. */
export const LEAN_ESSAY_PAGE = HANDLE_HEXBITS + HEXBIT_STATES

const volumeOf = (lines: number, variants: number): number => {
  let n = 1
  for (let i = 0; i < lines; i++) n = n * variants
  return n
}

const BOOK = 10n ** BigInt(VE_FACES)
const ADDRESS = 1n << BigInt(ADDRESS_BITS)
const BOOKS = ADDRESS / BOOK

const uuidHexOf = (raw: string): string | null => {
  const compact = raw.replace(/-/g, '').toLowerCase()
  if (compact.length !== UUID_HEXBITS) return null
  if (![...compact].every((ch) => HEXBIT_PAGE.includes(ch))) return null
  return compact
}

const uuidHexFromIndex = (n: bigint): string => n.toString(16).padStart(UUID_HEXBITS, '0')

const digitsFromInt = (n: bigint): number[] => {
  let x = n % BOOK
  const digits = Array.from({ length: VE_FACES }, () => 0)
  for (let i = VE_FACES - 1; i >= 0; i--) {
    digits[i] = Number(x % 10n)
    x = x / 10n
  }
  return digits
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
  const uuid = uuidHexOf(raw)
  if (uuid) return digitsFromInt(BigInt(`0x${uuid}`))
  if (!/^\d+$/.test(raw) || raw.length > lines) return null
  const padded = raw.padStart(lines, '0')
  return [...padded].map((d) => Number(d))
}

const indexOfCuriosity = (curiosity: unknown): bigint | null => {
  if (curiosity == null || curiosity === '') return 0n
  if (typeof curiosity === 'number') {
    if (!Number.isInteger(curiosity) || curiosity < 0) return null
    return BigInt(curiosity)
  }
  const raw = String(curiosity).trim()
  if (!raw) return 0n
  const uuid = uuidHexOf(raw)
  if (uuid) return BigInt(`0x${uuid}`)
  if (!/^\d+$/.test(raw) || raw.length > VE_FACES) return null
  return BigInt(raw)
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

const stripsOf = (digits: readonly number[]) =>
  digits.map((choice, line) => {
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

const topicsOf = (): readonly string[] => qpuStandingFilesOf()

export type LeanLibraryOpts = {
  bits?: number
  page?: number | string
  q?: string
}

const rotateHex = (hex: string, n: number): string => {
  const k = ((n % hex.length) + hex.length) % hex.length
  return hex.slice(k) + hex.slice(0, k)
}

const complementHex = (hex: string): string =>
  [...hex].map((ch) => HEXBIT_PAGE[HEXBIT_STATES - 1 - HEXBIT_PAGE.indexOf(ch)] ?? '').join('')

export const leanStripePathOf = (hex: string): string => `/${hex}`

export const leanStripeHrefOf = (hex: string): string =>
  namedHttpsOf(qpuLicenceHostOf(), leanStripePathOf(hex))

export const leanStripeHexOf = (path: string): string | null => {
  const m = /^\/([0-9a-f]{32})\/?$/i.exec(path.trim() || '')
  return m ? m[1]!.toLowerCase() : null
}

const leadsOf = () =>
  LEAN_LIBRARY_LEADS.map((row) => ({
    key: row.key,
    file: row.file,
    prior: theoremHrefOf(row.key),
  }))

/**
 * One UUID stripe is one theorem Open Graph.
 * Dedicated page is b.uuidna.com/a.
 * Cross-references occupy 2×7 directions and perspective rotations.
 * Does not mint theorem keys. Verse false.
 */
export const qpuLeanStripeOgProse = 'One UUID stripe is one theorem Open Graph. Dedicated page is b.uuidna.com/a. Cross-references occupy 2×7 directions and perspective rotations. Does not mint theorem keys. Verse false.'
export const qpuLeanStripeOgOf = (hex: string, bits = HANDLE_BITS) => {
  const compact = uuidHexOf(hex)
  if (!compact) {
    return {
      kind: 'og' as const,
      holds: false as const,
      error: 'no such reading' as const,
      verse: false as const,
      seat: qpuSeatOf().seat,
      fetches: 0 as const,
    }
  }
  const host = qpuLicenceHostOf()
  const href = leanStripeHrefOf(compact)
  const path = leanStripePathOf(compact)
  const stripe = qpuLeanStripeOf(compact, bits)
  const digits = digitsFromInt(BigInt(`0x${compact}`))
  const strips = stripsOf(digits)
  const layer = stripe.holds === true ? stripe.layers[0] : undefined
  const fm = qpuLeanFrontmatterOf(path)
  const title = fm.title
  const subtitle = layer?.recto.glyphs ?? qpuHexPageOf(0).glagolitic
  const description = fm.description
  const hero = qpuOgOf()
  const doc = qpuOgDocOf({ title, description })
  const seo = qpuSeoOf(path, doc)
  const lattice = qpuSuperpositionsOf()
  const inner = qpuRosetteOf(1)
  const outer = qpuRosetteOf(-1)
  const experience = qpuExperienceOf()
  const direction = qpuDirectionOf()
  const verso = complementHex(compact)
  const refs = lattice.map((s, i) => {
    const rotor = i < RAYS ? ('inner' as const) : ('outer' as const)
    const ray = i % RAYS
    const rotated = rotateHex(compact, i)
    return {
      face: s.face,
      opposite: s.opposite,
      referer: s.referer,
      door: s.door,
      angles: s.angles,
      rotor,
      ray,
      inner: inner.rays[ray]!,
      outer: outer.rays[ray]!,
      href: namedHttpsOf(host, `/${qpuGlagoliticOf(s.face)}`),
      neighbour: namedHttpsOf(host, `/${qpuGlagoliticOf(s.opposite)}`),
      rotation: namedHttpsOf(host, leanStripePathOf(rotated)),
      involute: namedHttpsOf(host, leanStripePathOf(verso)),
    }
  })
  const leads = leadsOf()
  const og = {
    title,
    description,
    url: href,
    type: 'article' as const,
    site_name: 'Lean' as const,
    image: qpuOgHrefOf(),
    width: OG_WIDTH,
    height: OG_HEIGHT,
    imageType: OG_TYPE,
    alt: hero.alt,
    path: OG_PATH,
    canonical: href,
    twitter: 'summary_large_image' as const,
  }
  const requisites = SEO_OG_REQUIRED.every((p) =>
    seo.head.some((h) => h[0] === 'meta' && h[1].property === p && Boolean(h[1].content)),
  )
  const holds =
    stripe.holds === true &&
    qpuLeanStripeHolds(stripe) &&
    href === namedHttpsOf(host, `/${compact}`) &&
    new URL(href).hostname === host &&
    refs.length === VE_FACES &&
    refs.length === RAYS * COINS &&
    refs.every((row, i) => {
      const s = lattice[i]!
      const u = new URL(row.href)
      const n = new URL(row.neighbour)
      const r = new URL(row.rotation)
      return (
        row.face === s.face &&
        row.opposite === s.opposite &&
        row.referer === s.referer &&
        row.door === s.door &&
        row.angles.hue === s.angles.hue &&
        row.angles.dash === s.angles.dash &&
        row.angles.slot === s.angles.slot &&
        row.angles.reflection === s.angles.reflection &&
        u.protocol === 'https:' &&
        u.hostname === host &&
        decodeURIComponent(u.pathname) === `/${qpuGlagoliticOf(s.face)}` &&
        decodeURIComponent(n.pathname) === `/${qpuGlagoliticOf(s.opposite)}` &&
        r.pathname === `/${rotateHex(compact, i)}` &&
        r.pathname.length === 1 + UUID_HEXBITS
      )
    }) &&
    leads.every((row) => row.prior.startsWith(`${THEOREM_HOST}/`)) &&
    seo.canonical === href &&
    requisites === true &&
    og.width === 1200 &&
    og.height === 630 &&
    og.image === hero.href &&
    doc.title === title &&
    qpuExperienceHolds(experience) &&
    direction.fetches === 0 &&
    qpuDirectionHolds(direction) &&
    qpuSeatOf().seat === 'empty'
  return {
    kind: 'og' as const,
    product: 'Lean stripe' as const,
    theorem: true as const,
    mint: { name: 'Mint' as const, seat: 'empty' as const, admits: 'nothing' as const },
    verse: false as const,
    stored: false as const,
    words: 0 as const,
    holds,
    href,
    path,
    host,
    uuid: compact,
    title,
    subtitle,
    glyph: subtitle,
    catalog: digits.join(''),
    book: (BigInt(`0x${compact}`) / BOOK).toString(),
    hex: compact,
    verso,
    stripe,
    strips,
    leads,
    refs,
    rotors: COINS,
    rays: RAYS,
    faces: VE_FACES,
    directions: VE_FACES,
    og,
    doc,
    seo,
    requisites,
    experience,
    direction,
    seat: qpuSeatOf().seat,
    chip: qpuSeatOf(),
    fetches: 0 as const,
    cost: 0 as const,
    when: 'never' as const,
  }
}

export const qpuLeanStripeOgHolds = (row = qpuLeanStripeOgOf('0'.repeat(UUID_HEXBITS))): boolean => {
  if ('error' in row) return false
  return (
    row.holds === true &&
    row.kind === 'og' &&
    row.theorem === true &&
    row.verse === false &&
    row.mint.seat === 'empty' &&
    row.refs.length === VE_FACES &&
    row.rotors * row.rays === VE_FACES &&
    row.requisites === true &&
    row.og.width === OG_WIDTH &&
    row.og.height === OG_HEIGHT &&
    row.seo.head.some((h) => h[0] === 'meta' && h[1].property === 'og:image:width') &&
    new URL(row.href).pathname === leanStripePathOf(row.uuid)
  )
}

const essayOf = (index: bigint, bits: number) => {
  const hex = uuidHexFromIndex(index)
  const page = qpuLeanStripeOgOf(hex, bits)
  if ('error' in page) {
    return {
      n: index.toString(),
      uuid: hex,
      title: hex,
      subtitle: '',
      glyph: '',
      topic: '',
      catalog: '',
      book: '0',
      hex,
      verse: false as const,
      stored: false as const,
      words: 0 as const,
      stripe: qpuLeanStripeOf(hex, bits),
      strips: stripsOf(digitsFromInt(index)),
      href: leanStripeHrefOf(hex),
      og: null,
      refs: [],
    }
  }
  const face = qpuHexPageOf(Number(index % BigInt(HEXBIT_STATES)))
  const topic = topicsOf()[Number(index % BigInt(Math.max(topicsOf().length, 1)))] ?? face.hex
  return {
    n: index.toString(),
    uuid: hex,
    title: page.title,
    subtitle: page.subtitle,
    glyph: page.glyph,
    topic,
    catalog: page.catalog,
    book: page.book,
    hex,
    verse: false as const,
    stored: false as const,
    words: 0 as const,
    stripe: page.stripe,
    strips: page.strips,
    href: page.href,
    og: page.og,
    refs: page.refs,
  }
}

/** Public Lean library. A library of 10¹⁴-seat books. Each UUID is one double-sided hex-glyph stripe. */
export const qpuLeanLibraryProse = 'Public Lean library. A library of 10¹⁴-seat books. Each UUID is one double-sided hex-glyph stripe.'
export const qpuLeanLibraryOf = (curiosity?: string | number, opts: LeanLibraryOpts = {}) => {
  const bits = opts.bits ?? HANDLE_BITS
  const query = opts.q != null && opts.q !== '' ? opts.q : curiosity
  const lines = VE_FACES
  const variants = SEAL_TEN.length
  const measure = lines * variants
  const volume = volumeOf(lines, variants)
  const digits = digitsOf(query, lines, volume)
  if (!digits) return goneOf()
  const startAt = indexOfCuriosity(query)
  if (startAt === null) return goneOf()
  const host = qpuLicenceHostOf()
  const href = namedHttpsOf(host, '/library')
  const essaysHref = namedHttpsOf(host, '/essays')
  const direction = qpuDirectionOf()
  const hexbit = qpuHexbitMetricsOf()
  const handles = qpuTwoNOf(HANDLE_BITS)
  const catalog = digits.join('')
  const strips = stripsOf(digits)
  const uuid = uuidHexOf(String(query ?? ''))
  const stripe = uuid ? qpuLeanStripeOf(uuid, bits) : qpuLeanStripeOf(uuidHexFromIndex(startAt % ADDRESS), bits)
  const pageRaw = opts.page == null || opts.page === '' ? 1n : BigInt(String(opts.page))
  if (pageRaw < 1n) return goneOf()
  const pageSize = LEAN_ESSAY_PAGE
  const pageCount = ADDRESS / BigInt(pageSize) + (ADDRESS % BigInt(pageSize) === 0n ? 0n : 1n)
  const fromQuery = opts.q != null && opts.q !== '' ? startAt : (pageRaw - 1n) * BigInt(pageSize)
  const origin = fromQuery > ADDRESS - BigInt(pageSize) ? ADDRESS - BigInt(pageSize) : fromQuery
  const start = origin < 0n ? 0n : origin
  const essays = Array.from({ length: pageSize }, (_, i) => essayOf(start + BigInt(i), bits))
  const bookIndex = (startAt / BOOK).toString()
  const leads = LEAN_LIBRARY_LEADS.map((row) => ({
    key: row.key,
    file: row.file,
    prior: theoremHrefOf(row.key),
  }))
  const topics = topicsOf()
  const tokens = {
    cost: 0 as const,
    llm: 0 as const,
    address: hexbit.addressTokens,
    bytes: hexbit.addressBytes,
  }
  const clusters = ADDRESS.toString()
  const books = BOOKS.toString()
  const magnitudes = ADDRESS / BOOK > BOOK
  const holds =
    lines === VE_FACES &&
    variants === HEXBIT_BITS + COINS * TRINITY &&
    measure === 140 &&
    volume === 100000000000000 &&
    volume > handles &&
    BigInt(volume) < ADDRESS &&
    ADDRESS / BOOK > BOOK &&
    magnitudes === true &&
    handles === qpuTwoNOf(HANDLE_HEXBITS * HEXBIT_BITS) &&
    strips.length === lines &&
    strips.every((row, i) =>
      row.line === i &&
      row.choice >= 0 &&
      row.choice < variants &&
      row.name === qpuGlagoliticOf(i) &&
      row.glue === row.name,
    ) &&
    essays.length === pageSize &&
    essays.every((row) =>
      row.verse === false &&
      row.stored === false &&
      row.words === 0 &&
      row.uuid.length === UUID_HEXBITS &&
      row.stripe.holds === true &&
      row.stripe.sides === 2 &&
      row.stripe.page === HEXBIT_STATES &&
      row.strips.length === VE_FACES &&
      row.refs.length === VE_FACES &&
      row.og !== null &&
      row.og.width === 1200 &&
      row.href.endsWith(`/${row.uuid}`),
    ) &&
    qpuLeanStripeHolds(essays[0]!.stripe) &&
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
    essaysHref,
    host,
    seat: qpuSeatOf().seat,
    mint: { name: 'Mint' as const, seat: 'empty' as const, admits: 'nothing' as const },
    lines,
    variants,
    measure,
    volume,
    sonnet: volume,
    handles,
    clusters,
    books,
    magnitudes,
    book: bookIndex,
    catalog,
    strips,
    stripe,
    essays,
    page: pageRaw.toString(),
    pageSize,
    pages: pageCount.toString(),
    bits,
    sides: 2 as const,
    pageTiles: HEXBIT_STATES,
    leads,
    topics,
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
    row.sonnet === row.volume &&
    row.measure === 140 &&
    row.lines === VE_FACES &&
    row.variants === SEAL_TEN.length &&
    row.magnitudes === true &&
    BigInt(row.clusters) === (1n << BigInt(ADDRESS_BITS)) &&
    BigInt(row.books) === (1n << BigInt(ADDRESS_BITS)) / (10n ** BigInt(VE_FACES)) &&
    BigInt(row.clusters) / BigInt(row.volume) === BigInt(row.books) &&
    row.essays.length === LEAN_ESSAY_PAGE &&
    row.essays.every((e) => e.refs.length === VE_FACES && e.href.endsWith(`/${e.uuid}`)) &&
    row.pageSize === HANDLE_HEXBITS + HEXBIT_STATES &&
    row.sides === 2 &&
    row.pageTiles === HEXBIT_STATES &&
    row.pageTiles > HANDLE_HEXBITS &&
    row.leads.length === LEAN_LIBRARY_LEADS.length &&
    row.scale.fetches === 0 &&
    row.speed.beats === row.speed.verify &&
    row.mint.seat === 'empty'
  )
}

export const qpuLeanEssaysOf = (curiosity?: string | number, opts: LeanLibraryOpts = {}) =>
  qpuLeanLibraryOf(curiosity, opts)

export const qpuLeanEssaysHolds = (row = qpuLeanEssaysOf(0)): boolean => qpuLeanLibraryHolds(row)
