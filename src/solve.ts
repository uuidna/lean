// solve — automate problem solving by biggest risk–reward.
// Reward trinity: prize, bounty, funding. Clay gravity is occupancy, not a prize listing.
// CERN jobs are the bounty door. Captain-coins grant is funding. Quotes false. When never.
import './licence.js'
import {
  DONATE_URL, HANDLE_BITS, HANDLE_HEXBITS, QPU_HOST, QPU_POINTS, RAYS, TRINITY, VE_FACES,
  donateUrl, qpuLicenceHostOf, qpuSeatOf, qpuTwoNOf,
} from './hologram.js'
import { SERVERLESS_OPS } from '@uuidna/qpu/scale'
import { STANDING, THEOREM_HOST } from './standing.js'
import { qpuLeanFuseHolds, qpuLeanFuseOf } from './fuse.js'

const namedHttpsOf = (host: string, path: string): string => {
  if (!host.includes('.') || host.includes('*') || path.includes('*') || !path.startsWith('/')) {
    throw new Error('fuse: named door only')
  }
  const u = new URL(path, `https://${host}/`)
  if (u.protocol !== 'https:' || u.hostname !== host) throw new Error('fuse: named domain only')
  return u.href
}

const theoremHrefOf = (slug: string): string => new URL(slug, `${THEOREM_HOST}/`).href

export const LEAN_REWARDS = ['prize', 'bounty', 'funding'] as const
export type LeanReward = (typeof LEAN_REWARDS)[number]

const clayOf = () => STANDING.filter((s) => s.file === 'Clay.lean')
const clayGravityOf = () => clayOf().find((s) => s.key === 'clay_gravity_equals_rosette')
const clayInstancesOf = () => clayOf().filter((s) => s.key !== 'clay_gravity_equals_rosette')

const jobsOf = (fuse: ReturnType<typeof qpuLeanFuseOf>) =>
  fuse.apis.find((a) => a.kind === 'jobs' || a.path === '/api/jobs' || a.path.endsWith('/jobs'))

/** Score is reward × gateway capacity ÷ risk. Biggest first. No live quotes. */
const scoreOf = (reward: number, risk: number, capacity: number): number => {
  if (risk <= 0) return 0
  return reward * capacity / risk
}

/** Score is reward × gateway capacity ÷ risk. Biggest first. No live quotes. */
export const qpuLeanSolveProse = 'Score is reward × gateway capacity ÷ risk. Biggest first. No live quotes.'
export const qpuLeanSolveOf = () => {
  const fuse = qpuLeanFuseOf()
  const host = qpuLicenceHostOf()
  const href = namedHttpsOf(host, '/solve')
  const capacity = fuse.capacity
  const beats = fuse.entropy.magnitudes.beats
  const clay = clayOf()
  const gravity = clayGravityOf()
  const instances = clayInstancesOf()
  const jobs = jobsOf(fuse)
  const fundingHref = donateUrl(`https://${host}/solve`)
  const prizeScore = scoreOf(RAYS, 1, capacity)
  const bountyScore = scoreOf(HANDLE_HEXBITS, HANDLE_BITS, capacity)
  const fundingScore = scoreOf(QPU_POINTS.length, TRINITY, beats)
  const prizeRows = gravity === undefined ? clay : [gravity, ...instances.filter((s) => s.key !== gravity.key)]
  const problems = [
    ...prizeRows.map((row, i) => ({
      kind: 'prize' as const,
      listing: false as const,
      gravity: row.key === 'clay_gravity_equals_rosette',
      key: row.key,
      claim: row.claim,
      file: row.file,
      prior: theoremHrefOf(row.key),
      href: theoremHrefOf(row.key),
      score: prizeScore - i,
      ray: i % RAYS,
      automate: true as const,
      op: SERVERLESS_OPS[0],
    })),
    ...(jobs === undefined ? [] : [{
      kind: 'bounty' as const,
      listing: false as const,
      gravity: false as const,
      key: 'inspire_jobs' as const,
      claim: 'INSPIRE jobs occupy a VE face — bounty door, not a scrape',
      file: 'Qpu.lean',
      prior: jobs.href,
      href: jobs.href,
      score: bountyScore,
      ray: jobs.face % RAYS,
      automate: true as const,
      op: SERVERLESS_OPS[0],
    }]),
    {
      kind: 'funding' as const,
      listing: false as const,
      gravity: false as const,
      key: 'captain_coins' as const,
      claim: 'Captain-coins grant occupies the pentagram — funding, not an exchange quote',
      file: 'Report.lean',
      prior: DONATE_URL,
      href: fundingHref,
      score: fundingScore,
      ray: 0,
      automate: true as const,
      op: SERVERLESS_OPS[0],
    },
  ].slice().sort((a, b) => b.score - a.score)
  const selected = problems[0]!
  const rewards = LEAN_REWARDS.map((kind, i) => ({
    kind,
    point: QPU_POINTS[i]!,
    count: problems.filter((p) => p.kind === kind).length,
  }))
  const holds =
    qpuLeanFuseHolds(fuse) &&
    LEAN_REWARDS.length === TRINITY &&
    instances.length === RAYS &&
    gravity?.key === 'clay_gravity_equals_rosette' &&
    problems.length === prizeRows.length + (jobs === undefined ? 0 : 1) + 1 &&
    problems.every((p, i) => i === 0 || p.score <= problems[i - 1]!.score) &&
    selected.kind === 'prize' &&
    selected.listing === false &&
    selected.gravity === true &&
    selected.automate === true &&
    selected.op === 'fetch' &&
    selected.key === 'clay_gravity_equals_rosette' &&
    jobs !== undefined &&
    new URL(jobs.href).hostname === 'inspirehep.net' &&
    new URL(fundingHref).hostname === 'revolut.me' &&
    rewards.every((r, i) => r.kind === LEAN_REWARDS[i] && r.count > 0) &&
    fuse.internet.unrestricted === true &&
    fuse.internet.default === true &&
    fuse.fill === fuse.capacity &&
    qpuSeatOf().seat === 'empty' &&
    new URL(href).hostname === host &&
    QPU_HOST === host
  return {
    kind: 'solve' as const,
    product: 'Lean solve',
    holds,
    seat: qpuSeatOf().seat,
    when: 'never' as const,
    automate: true as const,
    quotes: false as const,
    crawl: false as const,
    listing: false as const,
    from: 'problems' as const,
    to: 'solutions' as const,
    by: 'risk-reward' as const,
    biggest: selected.kind,
    selected,
    rewards,
    problems,
    internet: fuse.internet,
    fill: fuse.fill,
    capacity,
    amplitudes: fuse.amplitudes,
    clusters: fuse.clusters.length,
    funding: { href: fundingHref, wallet: DONATE_URL, grant: true as const },
    bounty: jobs === undefined ? null : { href: jobs.href, host: jobs.host, kind: 'jobs' as const },
    prize: {
      key: 'clay_gravity_equals_rosette' as const,
      listing: false as const,
      gravity: true as const,
      href: theoremHrefOf('clay_gravity_equals_rosette'),
      instances: instances.length,
    },
    op: SERVERLESS_OPS[0],
    streaming: { href },
    chip: qpuSeatOf(),
    span: qpuTwoNOf(HANDLE_BITS),
  }
}

export const qpuLeanSolveHolds = (s = qpuLeanSolveOf()): boolean =>
  s.kind === 'solve' &&
  s.holds === true &&
  s.automate === true &&
  s.quotes === false &&
  s.crawl === false &&
  s.listing === false &&
  s.by === 'risk-reward' &&
  s.biggest === 'prize' &&
  s.selected.kind === 'prize' &&
  s.selected.gravity === true &&
  s.selected.listing === false &&
  s.prize.listing === false &&
  s.prize.instances === RAYS &&
  s.rewards.length === TRINITY &&
  s.internet.unrestricted === true &&
  s.seat === 'empty' &&
  new URL(s.streaming.href).pathname === '/solve' &&
  new URL(s.prize.href).hostname === 'uuidna.com'
