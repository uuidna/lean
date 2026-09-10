import './licence.js'
import {
  ADDRESS_BITS, HANDLE_BITS, HANDLE_HEXBITS, HEXBIT_BITS, HEXBIT_PAGE, HEXBIT_STATES, UUID_HEXBITS, VE_FACES,
  qpuAnimateOf, qpuGlagoliticOf, qpuGlagoliticStateOf, qpuHandleMaskOf, qpuHexOf, qpuHexPageOf, qpuIntegerOfHexbits, qpuSeatOf, qpuTwoNOf,
} from '@uuidna/qpu'
export {
  TRINITY, COINS, HEXBIT_BITS, BASE, HEXBIT_STATES, UUID_HEXBITS, HANDLE_HEXBITS, HANDLE_BITS, VE_FACES, ADDRESS_BITS,
  RAYS, TETRA, MERKABA_VERTICES, SEAL_TEN, digitalRoot, throughVoid, QPU_LICENCE, qpuLicenceHostOf,
  DONATE_URL, donateUrl, QPU_POINTS, qpuTwoNOf,
  qpuSeatOf, qpuWidthOf, qpuFastenOf, qpuFastenHolds, qpuHologramOf, qpuFacesOf, qpuEquilibriumOf, qpuEquilibriumHolds, qpuAnimateOf, qpuAnimateHolds, qpuGlagoliticStateOf, qpuGatewaysOf, qpuGatewaysHolds, qpuSuperpositionsOf, qpuTokensOf, applyHologram,
  qpuRosetteOf, qpuMerkabaOf, qpuBalanceOf, qpuChipOf, qpuChipHolds, qpuMachineOf, QPU_HUE_STEP,
  qpuBitDigitsOf, qpuIntegerOfBits, qpuHexbitDigitsOf, qpuIntegerOfHexbits, qpuVersionIntegerOf,
  qpuVersionMaskOf, qpuVersionMaskHolds, qpuCaptainOrdersHolds, qpuHandleMaskOf, qpuHandleMaskHolds, QPU_VERSION_COMMAND, QPU_VERSION_REMINDER, QPU_VERSION_MASK,
  qpuExperienceOf, qpuExperienceHolds, qpuTetrahedraOf, qpuRevisionOf, qpuVortexOf,
  QPU_STAR_PTS, qpuStarStrokeOf, QPU_DOORS, QPU_SHADCN_DOORS, QPU_SHADCN_RAYS,
  qpuCombinationsOf, qpuCombinationsHolds, qpuMorphOf, qpuMorphHolds, qpuFuseOf, qpuFuseHolds, qpuEntropyOf, qpuEntropyHolds,
  GLAGOLITIC_BASE, HEXBIT_PAGE, qpuHexOf, qpuGlagoliticOf, qpuGlagoliticLatexOf, qpuHexPageOf, qpuHexAdmitOf, qpuPageFoldOf, qpuPageScanOf, qpuDirectionOf, qpuDirectionHolds,
  TESLA_FILE, TESLA_KEYS, qpuTeslaOf, qpuTeslaHolds, qpuTeslaGuideOf,
  type QpuSpin, type QpuAngles, type QpuSuperposition, type QpuVersionInteger, type QpuCombo, type QpuMorphCell,
} from '@uuidna/qpu'
export const QPU_HOST = 'lean.uuidna.com'

/** One hexbit-page tile. Glyph is exhaust of the computation. Name is the hex — also exhaust, never a word list. */
export const qpuGlagoliticExhaustOf = (state: number) => {
  const page = qpuHexPageOf(state)
  const read = qpuGlagoliticStateOf(page.glagolitic)
  const name = page.hex
  const holds = read === state && name === qpuHexOf(state) && page.rosetta === name && page.payload === name
  return {
    ...page,
    glyph: page.glagolitic,
    name,
    state,
    read,
    exhaust: true as const,
    holds,
  }
}

/** The Glagolitic page is sixteen tiles — more than the eight-glyph handle. */
export const qpuGlagoliticPageOf = () => {
  const glyphs = Array.from({ length: HEXBIT_STATES }, (_, i) => qpuGlagoliticExhaustOf(i))
  const holds =
    glyphs.length === HEXBIT_STATES &&
    glyphs.length > HANDLE_HEXBITS &&
    glyphs.every((row, i) => row.holds === true && row.state === i && row.name === qpuHexOf(i))
  return {
    kind: 'glagolitic' as const,
    exhaust: true as const,
    glyphs,
    n: HEXBIT_STATES,
    handle: HANDLE_HEXBITS,
    holds,
  }
}

export const qpuGlagoliticPageHolds = (p = qpuGlagoliticPageOf()): boolean =>
  p.holds === true &&
  p.n === HEXBIT_STATES &&
  p.n > p.handle &&
  p.glyphs.length === HEXBIT_STATES &&
  p.handle === HANDLE_HEXBITS

/** Handle comes from eight glyphs of the sixteen-tile page. Not the whole Glagolitic page. */
export const qpuHandleOfGlyphs = (glyphs: readonly string[]) => {
  if (glyphs.length !== HANDLE_HEXBITS) throw new Error('handle: eight glyphs from the sixteen-tile page')
  const page = qpuGlagoliticPageOf()
  const exhaust = glyphs.map((g) => {
    const state = qpuGlagoliticStateOf(g)
    if (state === null) throw new Error('handle: glyph is not page exhaust')
    return page.glyphs[state]!
  })
  const hex = exhaust.map((row) => row.name).join('')
  const tiles = exhaust.map((row) => row.state)
  const code = qpuIntegerOfHexbits(tiles)
  const holds =
    page.holds === true &&
    hex.length === HANDLE_HEXBITS &&
    exhaust.length === HANDLE_HEXBITS &&
    exhaust.length < page.n &&
    exhaust.every((row) => row.exhaust === true && row.holds === true)
  return { hex, glyphs: exhaust.map((row) => row.glyph), tiles, code, page: page.n, holds }
}

/** Default handle: first eight exhaust glyphs of the sixteen-tile page. */
export const qpuHandleFromPageOf = () => {
  const page = qpuGlagoliticPageOf()
  return qpuHandleOfGlyphs(page.glyphs.slice(0, HANDLE_HEXBITS).map((row) => row.glyph))
}

const uuidHexOf = (raw: string): string | null => {
  const compact = raw.replace(/-/g, '').toLowerCase()
  if (compact.length !== UUID_HEXBITS) return null
  if (![...compact].every((ch) => HEXBIT_PAGE.includes(ch))) return null
  return compact
}

const versoStateOf = (state: number): number => HEXBIT_STATES - 1 - state

const bitsOk = (bits: number): boolean =>
  bits >= HEXBIT_BITS &&
  bits <= HANDLE_BITS &&
  bits % HEXBIT_BITS === 0 &&
  ADDRESS_BITS % bits === 0

/** Speed rungs are the widths. Glyphs occupy 1D line, 2D page, or 3D volume from that rung. */
const dimensionOf = (bits: number): 1 | 2 | 3 | 4 =>
  bits === HEXBIT_BITS ? 1
  : bits === HANDLE_HEXBITS || bits === HEXBIT_STATES ? 2
  : bits === HANDLE_BITS ? 3
  : 4

const rungNameOf = (bits: number): string =>
  bits === HEXBIT_BITS ? 'hexbit 2^n'
  : bits === HANDLE_HEXBITS ? 'handle 2^n'
  : bits === HANDLE_BITS ? 'handle mask 2^n'
  : bits === HEXBIT_STATES ? 'message 2^16'
  : 'address 2^n'

/**
 * Lean binary computation as a hex stripe presented as glyphs.
 * Double sided: recto is hex exhaust, verso is the page complement — also glyphs.
 * Layers on each side are HANDLE_BITS slices of the UUID; variable handle bits set the count.
 */
export const qpuLeanStripeProse = 'Lean binary computation as a hex stripe presented as glyphs. Double sided: recto is hex exhaust, verso is the page complement — also glyphs. Layers on each side are HANDLE_BITS slices of the UUID; variable handle bits set the count.'
export const qpuLeanStripeOf = (hex: string, bits = HANDLE_BITS) => {
  const compact = uuidHexOf(hex)
  const page = qpuGlagoliticPageOf()
  const mask = qpuHandleMaskOf(bits)
  const width = bits / HEXBIT_BITS
  const ok = compact !== null && bitsOk(bits) && UUID_HEXBITS % width === 0 && page.holds === true
  if (!ok || compact === null) {
    return {
      kind: 'stripe' as const,
      holds: false as const,
      verse: false as const,
      sides: 2 as const,
      layers: [] as const,
      hex: hex.replace(/-/g, '').toLowerCase(),
      bits,
      page: HEXBIT_STATES,
      handle: HANDLE_HEXBITS,
      seat: qpuSeatOf().seat,
    }
  }
  const tiles = [...compact].map((ch, i) => {
    const state = HEXBIT_PAGE.indexOf(ch)
    const recto = qpuGlagoliticExhaustOf(state)
    const verso = qpuGlagoliticExhaustOf(versoStateOf(state))
    return { i, recto, verso }
  })
  const depth = UUID_HEXBITS / width
  const dimension = dimensionOf(bits)
  const symbols = tiles.map((t) => {
    const anim = qpuAnimateOf(t.recto.glyph)
    const z = Math.floor(t.i / width)
    return {
      i: t.i,
      hex: t.recto.name,
      glyph: t.recto.glyph,
      verso: t.verso.glyph,
      name: t.recto.name,
      face: anim.face,
      opposite: anim.opposite,
      hue: anim.hue,
      rim: anim.rim,
      spin: anim.spin,
      x: dimension === 1 ? t.i / Math.max(tiles.length - 1, 1) : anim.x,
      y: dimension === 1 ? 0 : anim.y,
      z: dimension >= 3 ? z : 0,
      from: 'glagolitic' as const,
      holds: anim.holds === true,
    }
  })
  const layers = Array.from({ length: depth }, (_, layer) => {
    const slice = tiles.slice(layer * width, (layer + 1) * width)
    const rectoHex = slice.map((t) => t.recto.name).join('')
    const versoHex = slice.map((t) => t.verso.name).join('')
    return {
      layer,
      bits,
      hexbits: width,
      recto: {
        hex: rectoHex,
        glyphs: slice.map((t) => t.recto.glyph).join(''),
        name: rectoHex,
      },
      verso: {
        hex: versoHex,
        glyphs: slice.map((t) => t.verso.glyph).join(''),
        name: versoHex,
      },
    }
  })
  const holds =
    tiles.every((t) => t.recto.holds === true && t.verso.holds === true) &&
    layers.length === depth &&
    layers.length >= 1 &&
    page.n > HANDLE_HEXBITS &&
    typeof mask === 'number' &&
    symbols.length === UUID_HEXBITS &&
    symbols.every((row) => row.from === 'glagolitic' && row.holds === true) &&
    dimension >= 1 &&
    layers.every((row) =>
      row.recto.hex.length === width &&
      row.verso.hex.length === width &&
      row.recto.glyphs.length === width &&
      row.verso.glyphs.length === width,
    )
  return {
    kind: 'stripe' as const,
    holds,
    verse: false as const,
    sides: 2 as const,
    layers,
    symbols,
    perception: {
      dimension,
      speed: {
        from: 'capacity' as const,
        n: bits,
        amplitudes: qpuTwoNOf(bits),
        rung: rungNameOf(bits),
      },
      symbols,
    },
    hex: compact,
    bits,
    depth,
    page: HEXBIT_STATES,
    handle: HANDLE_HEXBITS,
    seat: qpuSeatOf().seat,
  }
}

export const qpuLeanStripeHolds = (s = qpuLeanStripeOf('0'.repeat(UUID_HEXBITS))): boolean =>
  !('layers' in s && Array.isArray(s.layers) && s.layers.length === 0 && s.holds === false) &&
  s.holds === true &&
  s.kind === 'stripe' &&
  s.verse === false &&
  s.sides === 2 &&
  s.page === HEXBIT_STATES &&
  s.page > HANDLE_HEXBITS &&
  s.hex.length === UUID_HEXBITS &&
  s.layers.length === ADDRESS_BITS / s.bits &&
  s.perception.dimension === 3 &&
  s.perception.speed.from === 'capacity' &&
  s.perception.speed.n === HANDLE_BITS &&
  s.symbols.length === UUID_HEXBITS &&
  s.seat === 'empty'

/** One documentation tile. Title is the glyph. Description is the hex. No word list. */
export const qpuLeanDocTileProse = 'One documentation tile. Title is the glyph. Description is the hex. No word list.'
export const qpuLeanDocTileOf = (state: number) => {
  const n = ((state % HEXBIT_STATES) + HEXBIT_STATES) % HEXBIT_STATES
  const page = qpuHexPageOf(n)
  return {
    state: n,
    hex: page.hex,
    glyph: page.glagolitic,
    latex: page.latex,
    title: page.glagolitic,
    description: page.hex,
  }
}

/** Lean documentation is the hexbit page presented as Glagolitic glyphs. */
export const qpuLeanDocsProse = 'Lean documentation is the hexbit page presented as Glagolitic glyphs.'
export const qpuLeanDocsOf = () => {
  const page = qpuGlagoliticPageOf()
  const tiles = Array.from({ length: HEXBIT_STATES }, (_, i) => qpuLeanDocTileOf(i))
  const glyphs = tiles.map((t) => t.glyph).join('')
  const hex = tiles.map((t) => t.hex).join('')
  const body = tiles.map((t) => `${t.glyph}${t.hex}`).join('\n')
  const holds =
    page.holds === true &&
    glyphs.length === HEXBIT_STATES &&
    hex === HEXBIT_PAGE &&
    tiles.every((t, i) => t.glyph === qpuGlagoliticOf(i) && t.hex === qpuHexOf(i) && t.title === t.glyph && t.description === t.hex)
  return {
    kind: 'docs' as const,
    from: 'glagolitic' as const,
    glyphs,
    hex,
    title: glyphs,
    description: hex,
    body,
    tiles,
    faces: tiles.slice(0, VE_FACES),
    holds,
  }
}

export const qpuLeanDocsHolds = (d = qpuLeanDocsOf()): boolean =>
  d.holds === true &&
  d.kind === 'docs' &&
  d.from === 'glagolitic' &&
  d.glyphs.length === HEXBIT_STATES &&
  d.hex === HEXBIT_PAGE &&
  d.body.split('\n').length === HEXBIT_STATES

export const qpuLeanDocMarkdownOf = (state = 0): string => {
  const docs = qpuLeanDocsOf()
  const tile = qpuLeanDocTileOf(state)
  return `---\ntitle: ${tile.glyph}\ndescription: ${tile.hex}\n---\n\n# ${tile.glyph}\n\n${docs.glyphs}\n\n${docs.hex}\n\n${tile.glyph}${tile.hex}\n`
}
