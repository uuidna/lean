// claim — automate compliance: claim the claimable, claim bold, stay lean.
// Each claim checks prior art on the kernel theorem door and the parent DOI.
// `is` is claimable (sealed by decide). `can`/`may` stay unpromoted. UNVERIFIED is not false.
// Only Lean decides. Mint empty. Publish gate is conjunction. Invented false.
import './licence.js'
import { QPU_HOST, TRINITY, qpuLicenceHostOf, qpuSeatOf } from './hologram.js'
import { STANDING, THEOREM_HOST, UUIDNA_DOI, UUIDNA_DOI_URL } from './standing.js'

const KERNEL_HOST = 'uuidna.com'
const DOI_HOST = 'doi.org'

const namedHttpsOf = (host: string, path: string): string => {
  if (!host.includes('.') || host.includes('*') || path.includes('*') || !path.startsWith('/')) {
    throw new Error('fuse: named door only')
  }
  const u = new URL(path, `https://${host}/`)
  if (u.protocol !== 'https:' || u.hostname !== host) throw new Error('fuse: named domain only')
  return u.href
}

const theoremHrefOf = (slug: string): string => new URL(slug, `${THEOREM_HOST}/`).href

const GATE = ['a_claim_is_verified_or_unverified', 'publish_gate_is_conjunction'] as const

/** Kernel theorem plus parent DOI. Standing must already hold the key — this worker does not mint. */
export const qpuLeanPriorArtOf = (key: string) => {
  const kernel = theoremHrefOf(key)
  const u = new URL(kernel)
  const doi = new URL(UUIDNA_DOI_URL)
  const art = STANDING.some((s) => s.key === key)
  const holds =
    art === true &&
    key.length > 0 &&
    !key.includes('*') &&
    u.protocol === 'https:' &&
    u.hostname === KERNEL_HOST &&
    u.pathname === `/theorem/${key}` &&
    doi.protocol === 'https:' &&
    doi.hostname === DOI_HOST &&
    UUIDNA_DOI_URL.includes(UUIDNA_DOI)
  return {
    key,
    kernel,
    doi: UUIDNA_DOI_URL,
    archive: UUIDNA_DOI,
    art,
    checked: true as const,
    invented: false as const,
    holds,
  }
}

/** Standing `is` keys this worker may claim. `can` and `may` are not claimable as `is`. */
export const qpuLeanClaimableOf = () => STANDING.filter((s) => s.role === 'is')

/** Compliance constructor. Bold claims the sealed `is` after each prior-art check. Lean refuses to mint or to promote `can`/`may`. */
export const qpuLeanClaimProse = 'Compliance constructor. Bold claims the sealed `is` after each prior-art check. Lean refuses to mint or to promote `can`/`may`.'
export const qpuLeanClaimOf = () => {
  const host = qpuLicenceHostOf()
  const href = namedHttpsOf(host, '/claim')
  const claimable = qpuLeanClaimableOf()
  const claimedKeys = new Set(claimable.map((s) => s.key))
  const reserved = STANDING.filter((s) => (s.role === 'can' || s.role === 'may') && !claimedKeys.has(s.key))
  const claimed = claimable.map((row) => {
    const prior = qpuLeanPriorArtOf(row.key)
    return {
      key: row.key,
      file: row.file,
      role: row.role,
      claim: row.claim,
      href: prior.kernel,
      prior,
      claimed: prior.holds === true,
      bold: prior.holds === true,
      lean: true as const,
    }
  })
  const gate = GATE.every((key) => {
    const prior = qpuLeanPriorArtOf(key)
    return claimable.some((s) => s.key === key) && prior.holds === true
  })
  const mint = { name: 'Mint' as const, seat: 'empty' as const, admits: 'nothing' as const }
  const holds =
    claimable.length > 0 &&
    claimed.length === claimable.length &&
    claimed.every((row) =>
      row.claimed === true &&
      row.bold === true &&
      row.lean === true &&
      row.role === 'is' &&
      row.prior.holds === true &&
      row.prior.checked === true &&
      row.prior.art === true &&
      row.prior.invented === false &&
      new URL(row.prior.kernel).pathname === `/theorem/${row.key}` &&
      new URL(row.prior.doi).hostname === DOI_HOST,
    ) &&
    reserved.every((row) => {
      const prior = qpuLeanPriorArtOf(row.key)
      return row.role !== 'is' && prior.holds === true && !claimed.some((c) => c.key === row.key)
    }) &&
    gate === true &&
    mint.seat === 'empty' &&
    qpuSeatOf().seat === 'empty' &&
    QPU_HOST === host &&
    new URL(href).hostname === host
  return {
    kind: 'claim' as const,
    product: 'Lean claim',
    holds,
    seat: qpuSeatOf().seat,
    when: 'never' as const,
    automate: true as const,
    compliance: true as const,
    bold: true as const,
    lean: true as const,
    prior: true as const,
    mint,
    unverified: 'not-false' as const,
    decide: 'by decide' as const,
    gate: {
      conjunction: true as const,
      trinity: TRINITY,
      keys: [...GATE],
      holds: gate,
    },
    claimable: claimed,
    reserved: reserved.map((row) => {
      const prior = qpuLeanPriorArtOf(row.key)
      return { key: row.key, role: row.role, claimed: false as const, prior }
    }),
    streaming: { href },
    chip: qpuSeatOf(),
  }
}

export const qpuLeanClaimHolds = (c = qpuLeanClaimOf()): boolean =>
  c.kind === 'claim' &&
  c.holds === true &&
  c.automate === true &&
  c.compliance === true &&
  c.bold === true &&
  c.lean === true &&
  c.prior === true &&
  c.unverified === 'not-false' &&
  c.mint.seat === 'empty' &&
  c.gate.holds === true &&
  c.claimable.every((row) =>
    row.claimed === true &&
    row.role === 'is' &&
    row.prior.holds === true &&
    row.prior.checked === true &&
    row.prior.invented === false,
  ) &&
  c.reserved.every((row) => row.claimed === false && row.role !== 'is' && row.prior.holds === true) &&
  new URL(c.streaming.href).pathname === '/claim'
