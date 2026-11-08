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
    blurb: 'Core Quant chapters, drilled daily against real question sets.',
    lessons: [
      { id: 'm2-1', icon: 'book', tag: 'reading', body: 'Manhattan "All the Quant + DI" — Fractions/Decimals/Percents → Algebra → Word Problems → Geometry → Number Properties' },
      { id: 'm2-2', icon: 'pen', tag: 'drill', body: 'GMAC Official Guide Quant Review — Problem Solving set (~30 Qs)' },
      { id: 'm2-3', icon: 'pen', tag: 'drill', body: 'GMAC Official Guide Quant Review — Data Sufficiency set (~20 Qs)' },
      { id: 'm2-4', icon: 'folder', tag: 'reading', body: 'Drill against your own Manhattan Quant guides + GMAT Club question sets, if you have them' },
      { id: 'm2-5', icon: 'timer', tag: 'drill', body: 'Weekend: 1 timed Quant-only set (~40 Qs, mixed PS+DS)' },
    ],
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
    id: 'm3',
    num: 3,
    title: 'Verbal — CR & RC',
    dates: 'Nov 22 – Nov 28',
    blurb: 'Sentence Correction is gone from Focus Edition — this module is CR and RC only.',
    lessons: [
      { id: 'm3-1', icon: 'book', tag: 'reading', body: 'GMAC Official Guide Verbal Review — CR section intro + full CR question set' },
      { id: 'm3-2', icon: 'book', tag: 'reading', body: 'GMAC Official Guide Verbal Review — RC section intro + full RC question set' },
      { id: 'm3-3', icon: 'folder', tag: 'reading', body: 'PowerScore CR Bible (strategy layer), if you own a copy' },
      { id: 'm3-4', icon: 'folder', tag: 'reading', body: 'Manhattan CR + RC guides, if you own them' },
      { id: 'm3-5', icon: 'timer', tag: 'drill', body: 'Weekend: 1 timed Verbal-only set, CR+RC only' },
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
    num: 4,
    title: 'Data Insights',
    dates: 'Nov 29 – Dec 5',
    blurb: 'Your existing library has nothing Focus-specific here — this module runs almost entirely on the new books/course.',
    lessons: [
      { id: 'm4-1', icon: 'book', tag: 'reading', body: 'Manhattan "All the Quant + DI" — Statistics → Combinatorics & Probability (if not done)' },
      { id: 'm4-2', icon: 'book', tag: 'reading', body: 'Manhattan "All the Quant + DI" — Data Sufficiency (DI framing) → Multi-Source Reasoning → Table Analysis → Graphics Interpretation → Two-Part Analysis' },
      { id: 'm4-3', icon: 'pen', tag: 'drill', body: 'GMAC Official Guide Data Insights Review — all 5 question-type sets' },
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
    num: 5,
    title: 'Mocks & Weak Spots',
    dates: 'Dec 6 – Dec 12',
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
    num: 6,
    title: 'Taper — Test Week',
    dates: 'Dec 13+ (adjust to your actual date)',
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

