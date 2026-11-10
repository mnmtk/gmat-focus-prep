import type { Module } from '../types'

// Optional personal overrides — see local.example.ts. `local.ts` is gitignored, so this
// resolves to {} (no-op) for anyone who hasn't created it, and never ships real paths.
type LocalLink = { label: string; href: string }
type LocalOverrides = {
  localLessonLinks?: Record<string, LocalLink | LocalLink[]>
  localMockTests?: LocalLink[]
  localBrowseLinks?: LocalLink[]
  localObsoleteLinks?: LocalLink[]
}
const localModule = import.meta.glob('./local.ts', { eager: true }) as Record<string, LocalOverrides>
const local = localModule['./local.ts']

export const modulesBase: Module[] = [
  {
    id: 'm1',
    num: 1,
    title: 'Diagnostic & Setup',
    dates: 'Nov 8 – Nov 14',
    blurb: 'Establish your real baseline before committing to a date.',
    checkpoint: 'Once the diagnostic score is in, honestly decide — is December realistic, or is January the safer call?',
    lessons: [
      { id: 'm1-1', icon: 'cart', tag: 'setup', body: 'Buy GMAC Official Guide set (Quant / Verbal / Data Insights Review, 2024–2025) + Manhattan "All the Quant + DI"' },
      { id: 'm1-2', icon: 'course', tag: 'setup', body: 'Pick one paid course — Target Test Prep (recommended) or e-GMAT. Not both.' },
      { id: 'm1-3', icon: 'target', tag: 'mock', body: 'Take GMAC Official Practice Exam 1 (free, mba.com), full timed — your real baseline' },
      { id: 'm1-4', icon: 'book', tag: 'reading', body: 'Manhattan "All the Quant + DI" — read the Introduction / scoring overview only' },
      { id: 'm1-5', icon: 'chart', tag: 'setup', body: 'Set up an error log (Question · Topic · Why Missed · Redo Date) — tag every miss as content gap, careless error, or timing error. The fix is different for each, so the tag matters more than the topic.' },
    ],
    insights: [
      {
        text: 'Section order: start with your strongest section, not the one you feel like doing first. The Focus Edition is section-adaptive within each section, so a clean run on easy early questions in your strongest area banks confidence and score before fatigue sets in — rather than "warming up" on your weakest area while fresh.',
        source: { label: 'e-GMAT — which section should I start with', href: 'https://e-gmat.com/blogs/which-section-should-i-start-my-gmat-test-with-start-with-your-stronger-section/' },
      },
      {
        text: "There are 6 possible section orders (3×2×1) and no single order is universally best — GMAC's own data shows no order reliably outperforms the others. Pick yours during the mocks in Module 1, not on test day, and lock it in once it's been tested at least twice under real timing.",
        source: { label: 'GMAT Club — section order discussion', href: 'https://gmatclub.com/forum/section-order-start-with-your-stronger-section-on-the-gmat-focus-429779.html' },
      },
    ],
    quiz: {
      id: 'q1',
      title: 'Format & Logistics',
      pass: 3,
      questions: [
        { q: 'How many sections does the GMAT Focus Edition have?', opts: ['2', '3', '4', '5'], correct: 1 },
        { q: 'Which section was removed entirely in the Focus Edition?', opts: ['Data Sufficiency', 'Reading Comprehension', 'Analytical Writing Assessment (AWA)', 'Critical Reasoning'], correct: 2 },
        { q: 'What is the GMAT Focus Edition total score range?', opts: ['200–800', '205–805', '0–100', '6–51 per section'], correct: 1 },
      ],
    },
  },
  {
    id: 'm2',
    num: 2,
    title: 'Quant Foundations',
    dates: 'Nov 15 – Nov 21',
    blurb: 'Manhattan All the Quant + DI, Units 1–2: two chapters a day, each chapter\'s own problem set, then a timed OG set. About 2 hours a day. DI chapters (3, 8, 10) move to the DI module. Geometry is not on GMAT Focus, so it is not here.',
    lessons: [
      { id: 'm2-1', icon: 'pen', tag: 'drill', body: 'Sun 11/15 — Skim Ch 1 (How Quant and DI Work), then Ch 2 Math Fundamentals + Ch 4 Fractions and Ratios. Do both problem sets, then OG Quant Q23, 46, 51, 59, 64, 85, 123, 179, timed. Target: ≥80% correct, ≤2 min/Q.' },
      { id: 'm2-2', icon: 'pen', tag: 'drill', body: 'Mon 11/16 — Ch 5 Estimation + Ch 6 Percents (a classic misread trap: what is the percent OF?). Do both problem sets, then OG Quant Q114, 125, 127, 130, 132, 155, 156, 178 (all medium/hard percents), timed. Rule: before solving, say out loud "percent of what?"' },
      { id: 'm2-3', icon: 'pen', tag: 'drill', body: 'Tue 11/17 — Ch 7 Arithmetic vs. Algebra 101 (test cases, smart numbers, work backwards) + Ch 9 Digits and Decimals. Do both problem sets, then OG Quant Q84, 87, 102, 110, 115, 134, 170, 188, solving the word problems with a smart number or backsolving, not algebra.' },
      { id: 'm2-4', icon: 'pen', tag: 'drill', body: 'Wed 11/18 — Ch 11 Linear Equations and Combos + Ch 12 Exponents. Do both problem sets, then OG Quant Q94, 96, 97, 116, 129, 139, 148, 157, timed. Target: ≥80% correct, ≤2 min/Q.' },
      { id: 'm2-5', icon: 'pen', tag: 'drill', body: 'Thu 11/19 — Ch 13 Roots + Ch 14 Quadratic Equations. Memorize the squares and cubes tables in Ch 13. Do both problem sets, then OG Quant Q99, 100, 104, 147, 167, 196, 201, 202, timed.' },
      { id: 'm2-6', icon: 'pen', tag: 'drill', body: 'Fri 11/20 — Ch 15 Formulas + Ch 16 Inequalities and Max/Min. Do both problem sets, then OG Quant Q98, 106, 117, 120, 126, 142, 174, 198, timed.' },
      { id: 'm2-7', icon: 'timer', tag: 'drill', body: 'Sat 11/21 — Timed Quant section #1: OG Quant Q86, 89, 92, 93, 95, 105, 108, 113, 135, 141, 143, 149, 150, 153, 154, 162, 163, 165, 172, 190, 195 (21 Qs, 45 min, exam conditions, shuffle the order). Compare pace and accuracy to your Quant baseline in the Score Target card. Log every miss.' },
      { id: 'm2-8', icon: 'folder', tag: 'reading', body: 'Ongoing: when a chapter problem set goes badly (<70%), redo it the next morning before the new chapters. OG question numbers above are from the OG Quant Review 2024–25 question index, matched to each day’s chapters; most are medium/hard.' },
    ],
    checkpoint: 'Sat 11/21, after Timed Section #1: decide whether to add TTP or e-GMAT. Stay on OG + Manhattan if you scored ≥80% on the 21 questions, finished in time, and the Error Log shows more Misread/Careless than Content gap. Start a trial before 11/22 if accuracy was under 70% or Content gap leads. Either way, Table Analysis / Graphics / Multi-Source practice needs the OG online bank or a course by Dec 6.',
    quiz: {
      id: 'q2',
      title: 'Quant Foundations',
      pass: 5,
      questions: [
        { q: 'A number divisible by both 4 and 6 must also be divisible by:', opts: ['24', '12', '8', '18'], correct: 1 },
        { q: 'A price rises 20% then falls 20%. Compared to the original, the final price is:', opts: ['The same', '4% lower', '4% higher', '20% lower'], correct: 1 },
        { q: 'Data Sufficiency: Statement (1) alone is sufficient; Statement (2) alone is not, and adds nothing new. The answer is:', opts: ['A', 'B', 'C', 'D'], correct: 0 },
        { q: 'If x² = 16, which must be true?', opts: ['x = 4', 'x = -4', 'x = 4 or x = -4', 'x > 0'], correct: 2 },
        { q: 'Quick test for divisibility by 3:', opts: ['Check if the number is even', 'Sum its digits — check if divisible by 3', 'Check the last digit only', 'Divide by 9'], correct: 1 },
      ],
    },
  },
  {
    id: 'm2b',
    num: 3,
    title: 'Quant II — Stories, Stats & Number Properties',
    dates: 'Nov 22 – Nov 28',
    blurb: 'Manhattan All the Quant + DI, Units 3–4 (Quant chapters only): two chapters a day, same routine as last week. Ends with combinatorics and probability, then a second timed section.',
    lessons: [
      { id: 'm2b-1', icon: 'pen', tag: 'drill', body: 'Sun 11/22 — Ch 17 Translations + Ch 22 Rates and Work. Do both problem sets, then OG Quant Q101, 109, 122, 136, 144, 151, 200, 203, timed.' },
      { id: 'm2b-2', icon: 'pen', tag: 'drill', body: 'Mon 11/23 — Ch 19 Statistics + Ch 20 Weighted Averages. Do both problem sets, then OG Quant Q91, 111, 121, 160, 161, 193, 194, 199, timed.' },
      { id: 'm2b-3', icon: 'pen', tag: 'drill', body: 'Tue 11/24 — Ch 23 Overlapping Sets + Ch 24 Arithmetic vs. Algebra 201. Do both problem sets, then OG Quant Q88, 166, 173, 175, 183, 189, 191, 192, timed.' },
      { id: 'm2b-4', icon: 'pen', tag: 'drill', body: 'Wed 11/25 — Ch 25 Consecutive Integers + Ch 27 Divisibility and Primes. Do both problem sets, then OG Quant Q90, 107, 118, 133, 137, 152, 159, 185, timed.' },
      { id: 'm2b-5', icon: 'pen', tag: 'drill', body: 'Thu 11/26 — Ch 28 Odds, Evens, Positives, and Negatives, then skim Ch 31 Coordinate Plane (the OG Quant Review has no coordinate questions, so it is low priority). Then OG Quant Q119, 128, 171, 176, 180, 182, 186, 187, timed.' },
      { id: 'm2b-6', icon: 'pen', tag: 'drill', body: 'Fri 11/27 — Ch 29 Combinatorics + Ch 30 Probability. Go slowly through "Multiple Groups" and the anagram grid, then OG Quant Q140, 146, 164, 168, 169, 177, 197 + OG DI Q2, 53, 87 (probability in Data Sufficiency form). Finish by redoing any counting misses from your error log without notes.' },
      { id: 'm2b-7', icon: 'timer', tag: 'drill', body: 'Sat 11/28 — Timed Quant section #2: OG Quant Q62, 66, 67, 69, 70, 72, 74, 76, 78, 80, 82, 83, 103, 112, 124, 131, 138, 145, 158, 181, 184 (21 Qs, 45 min, shuffle the order). This uses up the OG medium/hard pool, so Module 6 mocks come from the official practice exams. Compare to Section #1 (11/21) and your Quant baseline. Log every miss.' },
    ],
  },
  {
    id: 'm3',
    num: 4,
    title: 'Verbal — CR & RC',
    dates: 'Nov 29 – Dec 5',
    blurb: 'OG Verbal Review 2024–25, day by day. RC questions are 1–140, CR are 141–289, both running easy → medium → hard. Easy sets are warm-ups only; most time goes to medium and hard, and RC Inference questions are called out each day so you can slow down on them.',
    lessons: [
      { id: 'm3-1', icon: 'book', tag: 'drill', body: 'Sun 11/29 — Read the Verbal Review chapter (3.1 Analyzing Passages, 3.2 Inductive, 3.3 Deductive Reasoning) and 4.3 Tips. Then RC warm-up Q1–24 (easy). The inference ones (7, 13, 15, 17, 19, 20, 22, 23, 24) should be 100%.' },
      { id: 'm3-2', icon: 'pen', tag: 'drill', body: 'Mon 11/30 — CR warm-up Q141–170 (easy), ≤1.5 min each. Log every miss with its OG concept: Argument Construction, Argument Evaluation, or Evaluation of a Plan.' },
      { id: 'm3-7', icon: 'pen', tag: 'drill', body: 'Tue 12/1 — RC Q45–72 (medium), about 2 min per question including reading. Inference questions here: 46, 53, 55, 58, 59, 60, 61, 62, 65. Rule: point to the line that proves your answer before you click it.' },
      { id: 'm3-8', icon: 'pen', tag: 'drill', body: 'Wed 12/2 — CR Q193–214 (medium) + RC Q73–86 (medium; inference: 74, 75, 78, 82). Target ≥80% correct.' },
      { id: 'm3-9', icon: 'pen', tag: 'drill', body: 'Thu 12/3 — RC Q87–100 (medium; inference: 87, 96) + CR Q215–235 (medium). Target ≥80% correct.' },
      { id: 'm3-10', icon: 'target', tag: 'drill', body: 'Fri 12/4 — Hard RC Q120–140: 12 of these 21 are inference (120, 122–126, 130, 132, 134–136, 139). This is the level your 805 needs. Review every miss against the explanation, not just the answer key.' },
      { id: 'm3-5', icon: 'timer', tag: 'drill', body: 'Sat 12/5 — Timed Verbal section: RC Q101–113 + CR Q236–245 (23 hard Qs, 45 min, no pauses). Compare to your Verbal baseline in the Score Target card. Left over for Module 6: RC Q25–44 and 114–119, CR Q171–192 and 246–289.' },
      { id: 'm3-3', icon: 'folder', tag: 'reading', body: 'Optional: PowerScore CR Bible, for any CR concept you miss 3+ times this week' },
      { id: 'm3-4', icon: 'folder', tag: 'reading', body: 'Optional: Manhattan CR + RC guides, same rule' },
      { id: 'm3-6', icon: 'redo', tag: 'maintenance', body: 'Maintenance: 20 min/day mixed Quant review' },
    ],
    quiz: {
      id: 'q3',
      title: 'CR & RC Strategy',
      pass: 5,
      questions: [
        { q: 'A Critical Reasoning "assumption" question asks you to find:', opts: ['A summary of the passage', 'An unstated premise the argument depends on', 'The conclusion restated', 'A fact that weakens the argument'], correct: 1 },
        { q: 'In a "strengthen the argument" question, the correct answer should:', opts: ['Introduce an unrelated new topic', 'Make the conclusion less likely', 'Support a gap in the reasoning', 'Simply restate a premise'], correct: 2 },
        { q: 'The best general approach to Focus Edition RC passages is to:', opts: ['Memorize every detail before reading questions', 'Read for structure/main idea first, hunt details as needed', 'Skip the passage, guess from question stems', 'Read the passage three times before any question'], correct: 1 },
        { q: 'A CR "inference" question asks for:', opts: ['Something that must be true given the premises', 'The weakest possible conclusion', 'A new assumption to add', 'The opposite of the conclusion'], correct: 0 },
        { q: 'A classic RC wrong-answer trap is an option that is:', opts: ['True in the real world but not supported by the passage', 'The shortest option', 'Mentioned first in the passage', 'Written in advanced vocabulary'], correct: 0 },
      ],
    },
  },
  {
    id: 'm4',
    num: 5,
    title: 'Data Insights',
    dates: 'Dec 6 – Dec 12',
    blurb: 'The DI chapters of Manhattan All the Quant + DI, Graphics Interpretation and Two-Part Analysis get the most practice, then the OG DI Review.',
    lessons: [
      { id: 'm4-1', icon: 'book', tag: 'reading', body: 'Ch 3 Data Sufficiency 101 + Ch 8 Table Analysis. Do the chapter problem set, then OG DI Data Sufficiency Q39–56 (medium). Use the "DS answer tree" card in Remember until it is automatic.' },
      { id: 'm4-2', icon: 'book', tag: 'reading', body: 'Ch 10 Graphics Interpretation + Ch 21 Two-Part Analysis. Then OG DI Two-Part Analysis Q119–136 (medium) and the Graphics Interpretation set in the OG Online Question Bank, timed.' },
      { id: 'm4-5', icon: 'book', tag: 'reading', body: 'Ch 18 Multi-Source Reasoning + Ch 26 Logic Problems. Then OG DI Data Sufficiency Q57–74 (medium; 67–74 are logic/inference) and 3 MSR sets from the Online Question Bank, timed.' },
      { id: 'm4-3', icon: 'pen', tag: 'drill', body: 'OG Data Insights Review 2024–25: the book itself only has Data Sufficiency (6.4) and Two-Part Analysis (6.7). Table Analysis, Graphics Interpretation and Multi-Source Reasoning are only in its Online Question Bank (6.3), and those are your weakest types, so do them there. Hard sets for the end of the week: DS Q75–110 and TPA Q137–165.' },
      { id: 'm4-4', icon: 'target', tag: 'mock', body: 'Mid-week: GMAC Official Practice Exam 2, full timed — compare to Week 1 baseline' },
    ],
    quiz: {
      id: 'q4',
      title: 'Data Insights',
      pass: 5,
      questions: [
        { q: 'Which DI question type presents data across multiple tabbed sources (emails, tables, charts) you must synthesize?', opts: ['Two-Part Analysis', 'Multi-Source Reasoning', 'Table Analysis', 'Graphics Interpretation'], correct: 1 },
        { q: 'In Table Analysis, you typically:', opts: ['Write an essay about the table', 'Sort/filter a table and judge true/false statements', 'Draw your own chart', 'Memorize all values first'], correct: 1 },
        { q: 'Two-Part Analysis questions require you to:', opts: ['Choose two values/answers that together satisfy given conditions', 'Answer the same question twice', 'Pick two unrelated passages', 'Rank five items'], correct: 0 },
        { q: 'Graphics Interpretation questions test your ability to:', opts: ['Draw a new graph from scratch', 'Read a chart and complete statements via dropdown selections', 'Memorize graph types', 'Skip visuals and estimate'], correct: 1 },
        { q: 'Data Sufficiency tests whether:', opts: ['You can solve the problem fastest', 'The statements give enough info to answer — without needing the actual value', 'The problem has exactly one numeric answer', 'Your grammar is correct'], correct: 1 },
      ],
    },
  },
  {
    id: 'm5',
    num: 6,
    title: 'Mocks & Weak Spots',
    dates: 'Dec 13 – Dec 19',
    blurb: 'No new topics — just timed practice and fixing what the error log says is still weak.',
    lessons: [
      { id: 'm5-1', icon: 'target', tag: 'mock', body: '2 more full-length timed mocks (official paid exams 3 & 4), spaced 3–4 days apart' },
      { id: 'm5-2', icon: 'redo', tag: 'drill', body: 'Redo every missed question across all 3 Official Guide Reviews, from your error log' },
      { id: 'm5-3', icon: 'calendar', tag: 'setup', body: 'If not already booked, lock in your actual test date + center/online slot now' },
      { id: 'm5-4', icon: 'bed', tag: 'setup', body: 'Sleep, logistics, ID/admission ticket check' },
    ],
    insights: [
      {
        text: 'An unanswered question at time-out is scored worse than a wrong guess. If you\'re behind pace deep into a section, guess-and-move beats leaving the last few questions blank — protect the floor first.',
        source: { label: 'GMAT Club — 7 mistakes that keep Focus test-takers below 700', href: 'https://gmatclub.com/forum/7-brutal-mistakes-that-keep-gmat-focus-test-takers-below-700-and-how-455504.html' },
      },
      {
        text: 'Sort every miss in your error log into exactly one bucket: content gap, careless error, or timing error. At the Q75–80 level specifically, the dominant leak is usually careless errors and misreads on questions you already know how to solve — not missing concepts. That means the fix in Module 5 is slowing down and re-reading the question stem, not drilling more new material.',
        source: { label: 'CrackVerbal — improving GMAT Quant score', href: 'https://www.crackverbal.com/resources/how-to-improve-your-gmat-quant-score/' },
      },
      {
        text: "135 minutes of scored time total — don't let a single hard question eat a budget meant for five easier ones. If a question has taken 2x its average allotment, mark your best guess and move; redo it in review, not live.",
        source: { label: 'Test Ninjas — GMAT time management playbook', href: 'https://test-ninjas.com/gmat-time-management-strategies' },
      },
    ],
    quiz: {
      id: 'q5',
      title: 'Exam-Day Readiness',
      pass: 3,
      questions: [
        { q: 'In GMAT Focus Edition, you may choose:', opts: ['To skip any section entirely', 'The order you take the 3 sections in', 'To retake a section immediately if you score low', 'Your own time limit'], correct: 1 },
        { q: 'How many questions can you bookmark and change per section?', opts: ['Unlimited', 'Up to 3', '0 — no changes allowed', '10'], correct: 1 },
        { q: 'A reasonable pace for the Quant section (~45 min, 21 Qs) is roughly:', opts: ['1 minute per question', '~2 minutes per question', '5 minutes per question', "Pacing doesn't matter"], correct: 1 },
      ],
    },
  },
  {
    id: 'm6',
    num: 7,
    title: 'Taper — Test Week',
    dates: 'Dec 20+ (adjust to your actual date)',
    blurb: "Wind down, don't burn out the day before.",
    lessons: [
      { id: 'm6-1', icon: 'id', tag: 'maintenance', body: 'Light review only — flashcards/formula sheets, no new drilling' },
      { id: 'm6-2', icon: 'timer', tag: 'drill', body: '1 short timed section (not a full mock) 2 days before, then rest' },
      { id: 'm6-3', icon: 'check', tag: 'setup', body: 'Confirm test center directions / online proctoring setup the night before' },
    ],
  },
]

// Merge in any local overrides (lesson resource links pointing at your own files on disk).
export const modules: Module[] = modulesBase.map((m) => ({
  ...m,
  lessons: m.lessons.map((lesson) => {
    const override = local?.localLessonLinks?.[lesson.id]
    if (!override) return lesson
    return Array.isArray(override) ? { ...lesson, links: override } : { ...lesson, link: override }
  }),
}))

export const officialLinks = [
  { label: 'mba.com — Official Practice Exams', href: 'https://www.mba.com/exam-prep/gmat-official-practice-exams' },
  { label: 'mba.com — Official Guide Focus Edition', href: 'https://www.mba.com/exam-prep/gmat-official-guide' },
  { label: 'Target Test Prep', href: 'https://www.targettestprep.com/' },
  { label: 'e-GMAT', href: 'https://e-gmat.com/' },
  { label: 'GMAT Club forum (free)', href: 'https://gmatclub.com/forum/' },
]

export const mockTests = local?.localMockTests ?? []
export const browseLinks = local?.localBrowseLinks ?? []
export const obsoleteLinks = local?.localObsoleteLinks ?? []

