// standing — uuidna Lean keys this worker stands on. Desk cites; the kernel sealed.
// Keys are uuidna's. This package does not mint them.

export const THEOREM_HOST = 'https://uuidna.com/theorem'
export const UUIDNA_DOI = '10.5281/zenodo.22256708'
export const UUIDNA_DOI_URL = 'https://doi.org/10.5281/zenodo.22256708'
export const UUIDNA_TITLE = 'uuidna — content-addressed identity, honest by construction'
export const LEAN_HOST = 'https://uuidna.com/lean'
export const ORCID = '0009-0000-7312-9778'
export const CAPTAIN = 'Tsvetan Rouschev'
/** This worker's release date. Year for APA is the first four digits. */
export const DATE_RELEASED = '2026-09-07'
export const yearReleasedOf = (): number => {
  const y = Number(DATE_RELEASED.slice(0, 4))
  if (y !== y) throw new Error('DATE_RELEASED: year is not a number')
  return y
}

export const t = (key: string): string => `[\`${key}\`](${THEOREM_HOST}/${key})`

export interface Standing {
  key: string
  file: string
  role: 'is' | 'can' | 'may'
  claim: string
}

/** Claims this QPU paper is licensed to make — each already sealed `by decide` on uuidna. */
export const qpuStandingProse = 'Claims this QPU paper is licensed to make — each already sealed `by decide` on uuidna.'
export const STANDING: readonly Standing[] = [
  { role: 'is', key: 'n_qubit_dimension', file: 'Quantum.lean',
    claim: 'n qubits span 2ⁿ amplitudes — simulation cost, not a speedup and not a device in this seat' },
  { role: 'is', key: 'hexbit_is_four_qubits', file: 'Alignment.lean',
    claim: 'a hexbit is four qubits: 2⁴ = 16; 32 hex × 4 bits = 128; handle 8 × 4 = 32' },
  { role: 'is', key: 'key_floor_is_one_uuid', file: 'Cipher.lean',
    claim: '32 hexbits is one uuid; Grover floor and identifier width are the same number' },
  { role: 'is', key: 'seal_ten', file: 'Sequence.lean',
    claim: 'seal_ten is the permutation 0124875369 of ℤ/9; foundation of the hologram is 0' },
  { role: 'is', key: 'trinity_edit_is_three', file: 'Report.lean',
    claim: 'trinity is 1+1+1 = 3 — debit plane of the hologram' },
  { role: 'is', key: 'five_ws_and_one_h', file: 'Report.lean',
    claim: 'the researcher\'s method is 5 + 1 = 6 — occupancy of the desk, not a live person' },
  { role: 'is', key: 'publish_gate_is_conjunction', file: 'Report.lean',
    claim: 'a report ships only when verified AND trinity-audited AND quorate — any one failing blocks it' },
  { role: 'is', key: 'full_quorum_of_three', file: 'Report.lean',
    claim: '2 + 1 = 3 and 2 > 1 — three independent eyes, occupancy of the quorum, not a committee' },
  { role: 'is', key: 'inverted_pyramid_descends', file: 'Report.lean',
    claim: '[1,2,3,4,5].reverse = [5,4,3,2,1] — the lead descends; occupancy of the shape, not a style guide' },
  { role: 'is', key: 'a_claim_is_verified_or_unverified', file: 'Report.lean',
    claim: 'a claim is one of two: verified or unverified — [true, false].length = 2' },
  { role: 'is', key: 'payload_aligns_where_the_name_does_not', file: 'Hexbit.lean',
    claim: 'credit plane is HEXBIT_BITS + COINS — payload divides where the handle does not' },
  { role: 'is', key: 'pentagram_single_stroke', file: 'Pentagram.lean',
    claim: '{5/2} stepping +2 mod 5 draws [0,2,4,1,3] — the five BindingPoint names in one stroke' },
  { role: 'is', key: 'z7rays_seven', file: 'Rosette.lean',
    claim: 'ℤ/7 has seven rays — fold plane of the hologram is BASE − coins = 7' },
  { role: 'is', key: 'pliska_seven_rays', file: 'Glagolitic.lean',
    claim: 'Pliska rosette turns on seven rays; 1+…+6 = 21, digital root 3' },
  { role: 'is', key: 've_fourteen_faces', file: 'VectorEquilibrium.lean',
    claim: 'fourteen faces: 8 triangles + 6 squares — hologram VE plane' },
  { role: 'is', key: 've_faces_are_handle_hexbit_coins', file: 'Wave.lean',
    claim: 'fourteen faces are also handle + hexbit + coins — 8+4+2=14' },
  { role: 'is', key: 'two_seven_ray_rosettes_are_ve_faces', file: 'Qpu.lean',
    claim: 'two ℤ/7 walks (clockwise and counterclockwise) are fourteen VE faces; both fuse at residue 0' },
  { role: 'is', key: 'merkaba_vertices_are_two_tetrahedra', file: 'Qpu.lean',
    claim: 'eight handle tiles split as two tetrahedra of four vertices — the merkaba' },
  { role: 'is', key: 'qpu_cpu_gpu_self_balance', file: 'Qpu.lean',
    claim: 'CPU and GPU are BindingPoint rotors: equal readings share the width, unequal readings bind the smaller' },
  { role: 'is', key: 'qpu_merkaba_fusion_is_the_chip', file: 'Qpu.lean',
    claim: 'this worker\'s novelty chip is two 7-ray rotors × two tetrahedra fused at void 0 — not a foundry device' },
  { role: 'is', key: 'qpu_inner_and_outer_experience', file: 'Qpu.lean',
    claim: 'inner and outer are one involution; glow 8×3=24 and 8×8=64; vortex 2^i mod 9 and its reverse' },
  { role: 'is', key: 'qpu_serial_blueprint_matches_every_replica', file: 'Qpu.lean',
    claim: 'every replica stamps the same widths: ℤ/7 both ways, 3²=9, 7×2=14, 4×2=8, 32×4=128' },
  { role: 'is', key: 'qpu_live_and_ui_are_ve_faces', file: 'Qpu.lean',
    claim: 'live occupancy and fourteen UI event kinds are VE faces: 7×2 = 8+6 = 8+4+2; k starts at 0' },
  { role: 'is', key: 'qpu_superpositions_are_the_ve_square', file: 'Qpu.lean',
    claim: 'fourteen VE faces span 2¹⁴ amplitudes — sequence dimension, not a 14×14 photography lattice' },
  { role: 'can', key: 'qpu_speed_rungs_are_the_widths', file: 'Qpu.lean',
    claim: 'speed rungs are hexbit 4, handle 8, verify 10 and 20, message 16, logical 48, address 128' },
  { role: 'can', key: 'width_is_the_binding_point_0', file: 'BindingPoint.lean',
    claim: 'a fan-out may run as wide as the smaller point and no wider' },
  { role: 'can', key: 'one_point_can_only_overstate_0', file: 'BindingPoint.lean',
    claim: 'one point never reports a width too narrow — only too wide' },
  { role: 'can', key: 'naming_the_binding_point_is_total', file: 'BindingPoint.lean',
    claim: 'every reading names which point set the width — never a third number' },
  { role: 'can', key: 'the_width_is_never_below_one', file: 'BindingPoint.lean',
    claim: 'width is at least one lane; zero lanes is a halt, not a measurement' },
  { role: 'can', key: 'monitoring_the_points_covers_every_crack_by_architecture', file: 'BindingPoint.lean',
    claim: 'because width is a minimum, some point attains it — cracks are named by architecture' },
  { role: 'can', key: 'the_diagnosis_and_the_prescription_are_the_same_point', file: 'BindingPoint.lean',
    claim: 'the binding point is the point that, raised, widens the machine' },
  { role: 'can', key: 'buying_the_point_that_does_not_bind_buys_nothing', file: 'QuantumCube.lean',
    claim: 'raising a free point leaves the width identical' },
  { role: 'can', key: 'hardware_coverage_is_not_correctness_coverage', file: 'BindingPoint.lean',
    claim: 'five green points cover resource cracks, not wrong answers' },
  { role: 'may', key: 'usable_gap_is_two_to_eighty', file: 'Wave.lean',
    claim: 'usable 2¹²⁸ vs reported 48 logical qubits is 2⁸⁰ in the usable column — uuidna’s sealed gap, not a chip in this worker' },
  { role: 'may', key: 'n_qubit_dimension', file: 'Quantum.lean',
    claim: 'a future attached device is still bounded by 2ⁿ amplitudes on the classical simulator; this seat stays empty until measured' },
  { role: 'may', key: 'grover_quadratic_bound', file: 'Cipher.lean',
    claim: '2ⁿ × 2ⁿ = 2²ⁿ — Grover’s quadratic is an identity on the exponent, not a device in this seat' },
  { role: 'may', key: 'sha256_grover_margin_is_the_address', file: 'Cipher.lean',
    claim: '256 / 2 = 128 — Grover margin of SHA-256 is the identifier width' },
  { role: 'can', key: 'verify_beats_recompute_by_magnitudes', file: 'Cipher.lean',
    claim: '2¹⁰ = 1024 and 2²⁰ = 1048576 — verify magnitudes beat linear recompute; not hardware supremacy' },
  { role: 'is', key: 'tesla_trio_files_adjacent', file: 'Tesla.lean',
    claim: '381969−381968=1 and 381970−381969=1 — three adjacent register steps, not a filing' },
  { role: 'is', key: 'tesla_leap_spring_to_grant', file: 'Tesla.lean',
    claim: '19+30+31+31+29+31+30+1=202 and 1888÷4 with no century — leap window, not a grant' },
  { role: 'is', key: 'three_tilings_of_the_circle', file: 'Tesla.lean',
    claim: '4·90=3·120=2·180=360 — three tilings of the turn, analog phase, not a device' },
  { role: 'is', key: 'alternation_needs_a_second_phase', file: 'Tesla.lean',
    claim: '360/2=180 and 360/3=120 and 360/1≡0 — a second phase, not a commutator' },
  { role: 'is', key: 'the_grids_minute', file: 'Tesla.lean',
    claim: '60·60=3600 and 60=2·30 — the grid minute, not a meter' },
  { role: 'is', key: 'teleautomaton_precedes_transmission', file: 'Tesla.lean',
    claim: '645576−613809=31767 and 1900−1898=2 — address before cargo, not a radio claim' },
  { role: 'is', key: 'clay_gravity_equals_rosette', file: 'Clay.lean',
    claim: 'seven Clay instances share ℤ/7 with the rosette; 7·6=42, pairs 21, 2·64=128 — gravity, not a prize listing' },
  { role: 'is', key: 'two_bit_conjunctions_are_four_of_sixteen', file: 'Clay.lean',
    claim: 'P vs NP instance: 4 conjunctions of 16 two-bit functions — counted, not the conjecture' },
  { role: 'is', key: 'mertens_squared_under_n_on_the_first_twenty', file: 'Clay.lean',
    claim: 'Riemann instance: |M(n)|² ≤ n on the first twenty — a window, not the hypothesis' },
  { role: 'is', key: 'hasse_bound_holds_at_four_primes', file: 'Clay.lean',
    claim: 'BSD instance: Hasse at four primes on y²=x³+1 — counts, not the rank' },
  { role: 'is', key: 'four_simplex_boundary_euler_is_zero', file: 'Clay.lean',
    claim: 'Poincaré instance: 4-simplex boundary Euler 0 — one triangulation, not Perelman' },
  { role: 'is', key: 'levi_civita_nonzero_on_six_of_twentyseven', file: 'Clay.lean',
    claim: 'Yang–Mills instance: 6 of 27 Levi-Civita triples nonzero — algebra, not the mass gap' },
  { role: 'is', key: 'closed_grid_differences_sum_to_zero', file: 'Clay.lean',
    claim: 'Navier–Stokes instance: closed-grid differences sum to zero — the grid, not existence' },
  { role: 'is', key: 'torus_betti_alternates_to_zero', file: 'Clay.lean',
    claim: 'Hodge instance: torus Betti 1−2+1=0 — bookkeeping, not algebraic classes' },
  { role: 'is', key: 'literature_sonnet_measure', file: 'Wave.lean',
    claim: 'fourteen lines times ten choices are 140 beats — sonnet measure, not verse' },
  { role: 'is', key: 'literature_sonnet_volume', file: 'Wave.lean',
    claim: 'ten choices on fourteen lines are 10¹⁴ occupancy seats — the kernel seals the power; the ledger holds no verse' },
  { role: 'is', key: 'combinatorial_book_exceeds_handles', file: 'Wave.lean',
    claim: '10¹⁴ seats exceed 16⁸ handle doors — pigeonhole, not verse' },
  { role: 'is', key: 'combinatorial_book_fits_the_uuid', file: 'Wave.lean',
    claim: '10¹⁴ seats sit inside 2¹²⁸ addresses — the uuid can name what the handle cannot' },
  { role: 'is', key: 'station_ten_is_hexagram_plus_hexbit', file: 'Wave.lean',
    claim: 'six plus four is ten — strip choices, not a syllable count of stored prose' },
  { role: 'is', key: 'universe_of_handles', file: 'Universe.lean',
    claim: '8×4=32 and 16⁸=2³² — handle universe; combinatorial occupancy exceeds it' },
  { role: 'is', key: 'hour_minute_second_sum_to_fifteen', file: 'Chat.lean',
    claim: '12+1+1+1=15 and 12+3=15 — numerals, not a device clock' },
  { role: 'is', key: 'fourteen_times_trinity_is_forty_two', file: 'Chat.lean',
    claim: '14·3=42 and 8+6=14 — faces times trinity, not agents on a topic' },
  { role: 'is', key: 'coins_times_trinity_times_rays_is_forty_two', file: 'Chat.lean',
    claim: '2·3·7=42 and 7·6=42 — coins × trinity × rays, not entanglement bits' },
  { role: 'is', key: 'twelve_hours_hit_two_of_fourteen', file: 'Chat.lean',
    claim: '6i=7h on hours 0..11 and faces 0..13 hits hours 0,6 and faces 0,7' },
  { role: 'is', key: 'twelve_walk_misses_twelve_of_fourteen', file: 'Chat.lean',
    claim: 'the same proportion misses twelve of fourteen faces' },
  { role: 'is', key: 'fourteen_mod_covers_every_residue', file: 'Chat.lean',
    claim: 'k mod 14 over fourteen steps hits every residue — the walk, not a named agent' },
  { role: 'is', key: 'three_trinities_as_nine_never_subtract_to_forty_two', file: 'Chat.lean',
    claim: 'if three trinities means 3²=9 then 9 minus a nat is never 42 — walked e=0..42' },
  { role: 'is', key: 'nanosecond_holds_fourteen_picosecond_ticks_with_remainder', file: 'Chat.lean',
    claim: 'pinned SI ratio 1 ns = 1000 ps, then 1000=71·14+6 — convention plus division, not compute' },
  { role: 'is', key: 'coins_times_fourteen_is_twenty_eight', file: 'Chat.lean',
    claim: '2·14=28 — coins times faces, moon period, not a lunar ephemeris' },
  { role: 'is', key: 'occupancy_weather_prediction_is_the_twelfths_rule', file: 'Chat.lean',
    claim: '1+2+3+3+2+1=12 and half-tide 6 — sailor twelfths, not a live forecast' },
  { role: 'is', key: 'earth_weather_market_navigate_the_same_rings', file: 'Chat.lean',
    claim: '8·45=360, reverse bearing, 3²+4²=5², twelfths 12, 2+2=4, 2·14=28, 14·3=42 — same rings, not GPS or a broker' },
  { role: 'is', key: 'occupancy_fastest_lean_meaning_is_verified_or_unverified', file: 'Chat.lean',
    claim: '[true,false].length=2 and true≠false — a non-Lean question means verified or unverified' },
  { role: 'is', key: 'occupancy_chat_docket', file: 'Chat.lean',
    claim: '12 sealed + 10 flagged = 22 occupancy-chat claims; flagged is UNVERIFIED, not false' },
  { role: 'is', key: 'occupancy_chat_flagged_are_not_the_sealed', file: 'Chat.lean',
    claim: 'ten flagged claims are not the twelve seals — carrying the ten as proved fails the docket' },
]

export const standingOf = (role: Standing['role']): readonly Standing[] =>
  STANDING.filter((s) => s.role === role)

const fileNameOf = (file: string): string => {
  const raw = file.trim()
  if (!raw) return ''
  return raw.endsWith('.lean') ? raw : `${raw}.lean`
}

/** Axiom files this worker cites, sorted by name. */
export const qpuStandingFilesOf = (): string[] =>
  [...new Set(STANDING.map((s) => s.file))].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))

export const standingByFileOf = (file?: string): readonly { file: string; href: string; theorems: readonly Standing[] }[] => {
  const files = file ? [fileNameOf(file)] : qpuStandingFilesOf()
  return files.map((f) => ({
    file: f,
    href: `${LEAN_HOST}/${f}`,
    theorems: STANDING.filter((s) => s.file === f),
  }))
}

export const qpuStandingOf = (opts: { file?: string; role?: Standing['role'] } = {}): {
  files: string[]
  standing: readonly Standing[]
} => {
  let rows: readonly Standing[] = STANDING
  if (opts.file) {
    const f = fileNameOf(opts.file)
    rows = rows.filter((s) => s.file === f)
  }
  if (opts.role) rows = rows.filter((s) => s.role === opts.role)
  const files = [...new Set(rows.map((s) => s.file))].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  return { files, standing: rows }
}

/** Constructor use → sealed keys. Desk cites; the kernel sealed. */
export interface QpuUse {
  id: string
  constructor: string
  keys: readonly string[]
}

export const QPU_USES: readonly QpuUse[] = [
  { id: 'seat', constructor: 'qpuSeatOf', keys: ['n_qubit_dimension', 'hardware_coverage_is_not_correctness_coverage'] },
  { id: 'width', constructor: 'qpuWidthOf', keys: ['width_is_the_binding_point_0', 'naming_the_binding_point_is_total', 'the_width_is_never_below_one', 'one_point_can_only_overstate_0', 'pentagram_single_stroke'] },
  { id: 'hologram', constructor: 'qpuHologramOf', keys: ['seal_ten', 'trinity_edit_is_three', 'payload_aligns_where_the_name_does_not', 'z7rays_seven', 'pliska_seven_rays', 've_fourteen_faces', 've_faces_are_handle_hexbit_coins'] },
  { id: 'chip', constructor: 'qpuChipOf', keys: ['qpu_merkaba_fusion_is_the_chip', 'two_seven_ray_rosettes_are_ve_faces', 'merkaba_vertices_are_two_tetrahedra', 'qpu_cpu_gpu_self_balance'] },
  { id: 'experience', constructor: 'qpuExperienceOf', keys: ['qpu_inner_and_outer_experience'] },
  { id: 'blueprint', constructor: 'qpuBlueprintOf', keys: ['qpu_serial_blueprint_matches_every_replica'] },
  { id: 'live', constructor: 'qpuLiveOf', keys: ['qpu_live_and_ui_are_ve_faces'] },
  { id: 'events', constructor: 'qpuLiveOf', keys: ['qpu_live_and_ui_are_ve_faces'] },
  { id: 'speed', constructor: 'qpuSpeedOf', keys: ['qpu_speed_rungs_are_the_widths', 'n_qubit_dimension', 'verify_beats_recompute_by_magnitudes', 'grover_quadratic_bound', 'usable_gap_is_two_to_eighty', 'hexbit_is_four_qubits', 'sha256_grover_margin_is_the_address'] },
  { id: 'handle', constructor: 'qpuHandleMaskOf', keys: ['hexbit_is_four_qubits', 'key_floor_is_one_uuid', 'n_qubit_dimension'] },
  { id: 'gateways', constructor: 'qpuGatewaysOf', keys: ['ve_fourteen_faces', 'hexbit_is_four_qubits', 'n_qubit_dimension', 'key_floor_is_one_uuid'] },
  { id: 'metrics', constructor: 'qpuCompareOf', keys: ['trinity_edit_is_three', 'payload_aligns_where_the_name_does_not', 've_faces_are_handle_hexbit_coins', 'hexbit_is_four_qubits', 'key_floor_is_one_uuid'] },
  { id: 'superpositions', constructor: 'qpuSuperpositionsOf', keys: ['qpu_superpositions_are_the_ve_square', 've_fourteen_faces'] },
  { id: 'og', constructor: 'qpuOgOf', keys: ['pentagram_single_stroke'] },
  { id: 'fractal', constructor: 'qpuFractalOf', keys: ['pentagram_single_stroke', 'qpu_superpositions_are_the_ve_square'] },
  { id: 'scale', constructor: 'qpuScaleOf', keys: ['width_is_the_binding_point_0'] },
  { id: 'bindings', constructor: 'qpuRecognizeOf', keys: ['hardware_coverage_is_not_correctness_coverage', 'monitoring_the_points_covers_every_crack_by_architecture', 'the_diagnosis_and_the_prescription_are_the_same_point', 'buying_the_point_that_does_not_bind_buys_nothing'] },
  { id: 'theorems', constructor: 'qpuLeanTheoremsOf', keys: [
    'n_qubit_dimension',
    'hardware_coverage_is_not_correctness_coverage',
    'width_is_the_binding_point_0',
    'naming_the_binding_point_is_total',
    'the_width_is_never_below_one',
    'one_point_can_only_overstate_0',
    'pentagram_single_stroke',
    'seal_ten',
    'trinity_edit_is_three',
    'payload_aligns_where_the_name_does_not',
    'z7rays_seven',
    'pliska_seven_rays',
    've_fourteen_faces',
    've_faces_are_handle_hexbit_coins',
    'hour_minute_second_sum_to_fifteen',
    'fourteen_times_trinity_is_forty_two',
    'coins_times_trinity_times_rays_is_forty_two',
    'twelve_hours_hit_two_of_fourteen',
    'twelve_walk_misses_twelve_of_fourteen',
    'fourteen_mod_covers_every_residue',
    'three_trinities_as_nine_never_subtract_to_forty_two',
    'nanosecond_holds_fourteen_picosecond_ticks_with_remainder',
    'coins_times_fourteen_is_twenty_eight',
    'occupancy_weather_prediction_is_the_twelfths_rule',
    'earth_weather_market_navigate_the_same_rings',
    'occupancy_fastest_lean_meaning_is_verified_or_unverified',
    'occupancy_chat_docket',
    'occupancy_chat_flagged_are_not_the_sealed',
  ] },
  { id: 'axioms', constructor: 'qpuLeanAxiomsOf', keys: ['ve_fourteen_faces', 'payload_aligns_where_the_name_does_not', 'merkaba_vertices_are_two_tetrahedra', 'qpu_merkaba_fusion_is_the_chip', 'two_seven_ray_rosettes_are_ve_faces'] },
  { id: 'publications', constructor: 'qpuLeanPublicationsOf', keys: ['n_qubit_dimension', 'key_floor_is_one_uuid', 'verify_beats_recompute_by_magnitudes', 'naming_the_binding_point_is_total', 'a_claim_is_verified_or_unverified', 'publish_gate_is_conjunction'] },
  { id: 'cern', constructor: 'qpuLeanCernOf', keys: ['ve_fourteen_faces', 'payload_aligns_where_the_name_does_not', 'naming_the_binding_point_is_total', 'key_floor_is_one_uuid', 'n_qubit_dimension', 'verify_beats_recompute_by_magnitudes'] },
  { id: 'library', constructor: 'qpuLeanLibraryOf', keys: [
    'literature_sonnet_measure',
    'literature_sonnet_volume',
    'combinatorial_book_exceeds_handles',
    'combinatorial_book_fits_the_uuid',
    'station_ten_is_hexagram_plus_hexbit',
    've_fourteen_faces',
    've_faces_are_handle_hexbit_coins',
    'universe_of_handles',
    'seal_ten',
    'hexbit_is_four_qubits',
    'key_floor_is_one_uuid',
    'verify_beats_recompute_by_magnitudes',
  ] },
  { id: 'stripe', constructor: 'qpuLeanStripeOgOf', keys: [
    've_fourteen_faces',
    'two_seven_ray_rosettes_are_ve_faces',
    'qpu_inner_and_outer_experience',
    'qpu_superpositions_are_the_ve_square',
    'combinatorial_book_fits_the_uuid',
    'hexbit_is_four_qubits',
  ] },
  { id: 'fuse', constructor: 'qpuLeanFuseOf', keys: ['n_qubit_dimension', 've_fourteen_faces', 'qpu_superpositions_are_the_ve_square', 'two_seven_ray_rosettes_are_ve_faces', 'qpu_inner_and_outer_experience', 'verify_beats_recompute_by_magnitudes'] },
  { id: 'train', constructor: 'qpuLeanTrainOf', keys: ['two_seven_ray_rosettes_are_ve_faces', 'z7rays_seven', 'pliska_seven_rays', 'qpu_inner_and_outer_experience', 've_fourteen_faces', 'literature_sonnet_measure', 'a_claim_is_verified_or_unverified'] },
  { id: 'solve', constructor: 'qpuLeanSolveOf', keys: ['clay_gravity_equals_rosette', 'verify_beats_recompute_by_magnitudes', 'n_qubit_dimension', 'buying_the_point_that_does_not_bind_buys_nothing', 'a_claim_is_verified_or_unverified'] },
  { id: 'claim', constructor: 'qpuLeanClaimOf', keys: ['a_claim_is_verified_or_unverified', 'publish_gate_is_conjunction', 'occupancy_fastest_lean_meaning_is_verified_or_unverified', 'occupancy_chat_flagged_are_not_the_sealed'] },
  { id: 'tesla', constructor: 'qpuTeslaOf', keys: [
    'tesla_trio_files_adjacent',
    'tesla_leap_spring_to_grant',
    'three_tilings_of_the_circle',
    'alternation_needs_a_second_phase',
    'the_grids_minute',
    'teleautomaton_precedes_transmission',
  ] },
]

export const qpuUsesOf = (): readonly QpuUse[] => QPU_USES

export const qpuStandingHolds = (): boolean => {
  const unique = [...new Set(STANDING.map((s) => s.key))]
  if (unique.length === 0) return false
  const set = new Set(unique)
  const used = new Set<string>()
  for (const u of QPU_USES) {
    if (!u.id || !u.constructor || u.keys.length === 0) return false
    for (const k of u.keys) {
      if (!set.has(k)) return false
      used.add(k)
    }
  }
  const files = qpuStandingFilesOf()
  if (files.length === 0) return false
  for (const f of files) {
    if (!f.endsWith('.lean')) return false
    if (standingByFileOf(f)[0]!.theorems.length === 0) return false
  }
  return true
}
