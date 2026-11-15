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
    dates: 'Nov 8 – Nov 10',
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
    dates: 'Nov 11 – Nov 17',
    blurb: 'On TTP? Do that day’s TTP Quant chapter instead of the Manhattan reading; the timed OG practice stays the same. Manhattan All the Quant + DI, Units 1–2: two chapters a day, each chapter\'s own problem set, then a timed OG set. About 2 hours a day. DI chapters (3, 8, 10) move to the DI module. Geometry is not on GMAT Focus, so it is not here.',
    lessons: [
      { id: 'm2-1', icon: 'book', tag: 'reading', body: 'Wed 11/11 — Read: skim Ch 1 (How Quant and DI Work), then Ch 2 Math Fundamentals + Ch 4 Fractions and Ratios, and do both chapter problem sets.' },
      { id: 'm2-1p', icon: 'pen', tag: 'drill', body: 'Wed 11/11 — Practise: OG Quant Q23, 46, 51, 59, 64, 85, 123, 179 on the Timer (Daily OG drill). Target: ≥80% correct, ≤2 min/Q.' },
      { id: 'm2-2', icon: 'book', tag: 'reading', body: 'Thu 11/12 — Read: Ch 5 Estimation + Ch 6 Percents (a classic misread trap: what is the percent OF?), and do both chapter problem sets.' },
      { id: 'm2-2p', icon: 'pen', tag: 'drill', body: 'Thu 11/12 — Practise: OG Quant Q114, 125, 127, 130, 132, 155, 156, 178 (all medium/hard percents), timed. Rule: before solving, say out loud "percent of what?"' },
      { id: 'm2-3', icon: 'book', tag: 'reading', body: 'Fri 11/13 — Read: Ch 7 Arithmetic vs. Algebra 101 (test cases, smart numbers, work backwards) + Ch 9 Digits and Decimals, and do both chapter problem sets.' },
      { id: 'm2-3p', icon: 'pen', tag: 'drill', body: 'Fri 11/13 — Practise: OG Quant Q84, 87, 102, 110, 115, 134, 170, 188, timed. Solve the word problems with a smart number or backsolving, not algebra.' },
      { id: 'm2-4', icon: 'book', tag: 'reading', body: 'Sat 11/14 — Read: Ch 11 Linear Equations and Combos + Ch 14 Quadratic Equations, and do both chapter problem sets.' },
      { id: 'm2-4p', icon: 'pen', tag: 'drill', body: 'Sat 11/14 — Practise: OG Quant Q94, 96, 97, 116, 129, 139, 148, 157, timed. Target: ≥80% correct, ≤2 min/Q.' },
      { id: 'm2-5', icon: 'book', tag: 'reading', body: 'Sun 11/15 — Read: Ch 12 Exponents + Ch 13 Roots, and do both chapter problem sets. Memorize the squares and cubes tables in Ch 13.' },
      { id: 'm2-5p', icon: 'pen', tag: 'drill', body: 'Sun 11/15 — Practise: OG Quant Q99, 100, 104, 147, 167, 196, 201, 202, timed.' },
      { id: 'm2-6', icon: 'book', tag: 'reading', body: 'Mon 11/16 — Read: Ch 15 Formulas + Ch 16 Inequalities and Max/Min, and do both chapter problem sets.' },
      { id: 'm2-6p', icon: 'pen', tag: 'drill', body: 'Mon 11/16 — Practise: OG Quant Q98, 106, 117, 120, 126, 142, 174, 198, timed.' },
      { id: 'm2-7', icon: 'timer', tag: 'drill', body: 'Tue 11/17 — Timed Quant section #1: OG Quant Q86, 89, 92, 93, 95, 105, 108, 113, 135, 141, 143, 149, 150, 153, 154, 162, 163, 165, 172, 190, 195 (21 Qs, 45 min, exam conditions, shuffle the order). Compare pace and accuracy to your Quant baseline in the Score Target card. Log every miss.' },
      { id: 'm2-8', icon: 'folder', tag: 'reading', body: 'Ongoing: when a chapter problem set goes badly (<70%), redo it the next morning before the new chapters. OG question numbers above are from the OG Quant Review 2024–25 question index, matched to each day’s main topic; most are medium/hard. OG questions mix topics, so some will need a chapter you have not reached yet (e.g. factoring a quadratic before Sat 11/14). When that happens, try for up to 3 minutes, then log it in the Error Log as Content gap with the redo date set to the day after that chapter. It comes back on the Redo list once you have the tool.' },
    ],
    checkpoint: 'Tue 11/17, after Timed Section #1 (the TTP trial is the test drive): decide whether to buy TTP. Stay on OG + Manhattan if you scored ≥80% on the 21 questions, finished in time, and the Error Log shows more Misread/Careless than Content gap. Buy TTP if accuracy was under 70%, Content gap leads, or its Missions 2/4/8 taught you more than Manhattan did. If you buy, the TTP Quant module replaces the Manhattan reading from 11/18. Either way, Table Analysis / Graphics / Multi-Source practice needs the OG online bank or a course by Dec 2.',
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
    dates: 'Nov 18 – Nov 24',
    blurb: 'On TTP? Do that day’s TTP Quant chapter instead of the Manhattan reading; the timed OG practice stays the same. Manhattan All the Quant + DI, Units 3–4 (Quant chapters only): two chapters a day, same routine as last week. Ends with combinatorics and probability, then a second timed section.',
    lessons: [
      { id: 'm2b-1', icon: 'book', tag: 'reading', body: 'Wed 11/18 — Read: Ch 17 Translations + Ch 22 Rates and Work, and do both chapter problem sets.' },
      { id: 'm2b-1p', icon: 'pen', tag: 'drill', body: 'Wed 11/18 — Practise: OG Quant Q101, 109, 122, 136, 144, 151, 200, 203, timed.' },
      { id: 'm2b-2', icon: 'book', tag: 'reading', body: 'Thu 11/19 — Read: Ch 19 Statistics + Ch 20 Weighted Averages, and do both chapter problem sets.' },
      { id: 'm2b-2p', icon: 'pen', tag: 'drill', body: 'Thu 11/19 — Practise: OG Quant Q91, 111, 121, 160, 161, 193, 194, 199, timed.' },
      { id: 'm2b-3', icon: 'book', tag: 'reading', body: 'Fri 11/20 — Read: Ch 23 Overlapping Sets + Ch 24 Arithmetic vs. Algebra 201, and do both chapter problem sets.' },
      { id: 'm2b-3p', icon: 'pen', tag: 'drill', body: 'Fri 11/20 — Practise: OG Quant Q88, 166, 173, 175, 183, 189, 191, 192, timed.' },
      { id: 'm2b-4', icon: 'book', tag: 'reading', body: 'Sat 11/21 — Read: Ch 25 Consecutive Integers + Ch 27 Divisibility and Primes, and do both chapter problem sets.' },
      { id: 'm2b-4p', icon: 'pen', tag: 'drill', body: 'Sat 11/21 — Practise: OG Quant Q90, 107, 118, 133, 137, 152, 159, 185, timed.' },
      { id: 'm2b-5', icon: 'book', tag: 'reading', body: 'Sun 11/22 — Read: Ch 28 Odds, Evens, Positives, and Negatives and its problem set, then skim Ch 31 Coordinate Plane (the OG Quant Review has no coordinate questions, so it is low priority).' },
      { id: 'm2b-5p', icon: 'pen', tag: 'drill', body: 'Sun 11/22 — Practise: OG Quant Q119, 128, 171, 176, 180, 182, 186, 187, timed.' },
      { id: 'm2b-6', icon: 'book', tag: 'reading', body: 'Mon 11/23 — Read: Ch 29 Combinatorics + Ch 30 Probability, and do both chapter problem sets. Go slowly through "Multiple Groups" and the anagram grid.' },
      { id: 'm2b-6p', icon: 'pen', tag: 'drill', body: 'Mon 11/23 — Practise: OG Quant Q140, 146, 164, 168, 169, 177, 197 + OG DI Q2, 53, 87 (probability in Data Sufficiency form), timed. Then redo any counting misses from your error log without notes.' },
      { id: 'm2b-7', icon: 'timer', tag: 'drill', body: 'Tue 11/24 — Timed Quant section #2: OG Quant Q62, 66, 67, 69, 70, 72, 74, 76, 78, 80, 82, 83, 103, 112, 124, 131, 138, 145, 158, 181, 184 (21 Qs, 45 min, shuffle the order). This uses up the OG medium/hard pool, so Module 6 mocks come from the official practice exams. Compare to Section #1 (11/17) and your Quant baseline. Log every miss.' },
    ],
  },
  {
    id: 'mt',
    num: 4,
    title: 'TTP Quant',
    dates: 'Nov 14 – Nov 24',
    blurb: 'Target Test Prep Quant course (trial now; keep it only if it earns the Nov 17 checkpoint). One or two TTP chapters a day, on the same days as the matching Manhattan topics. Each chapter = a Lessons item and a Tests item. Tasks: 1) all lessons, 2) chapter tests in order, Easy (target 90%) → Medium (70%) → Hard (60%), 3) Review your Mistakes and log them in the Error Log, 4) the GMAT Strategy chapter for the mission. Optional: the visual-learning review and the listed OG problems. Chapter names may differ slightly from TTP’s list; match by topic. Skip Verbal missions until the Verbal module.',
    lessons: [
      { id: 'mt-1', icon: 'course', tag: 'reading', body: 'Sat 11/14 — TTP: Essential GMAT Quant Skills (finish). Remaining chapter tests, then Review your Mistakes and the Strategy chapter.' },
      { id: 'mt-1p', icon: 'pen', tag: 'drill', body: 'Sat 11/14 — TTP Essential GMAT Quant Skills (finish): chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-2', icon: 'course', tag: 'reading', body: 'Sat 11/14 — TTP: Linear and Quadratic Equations. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-2p', icon: 'pen', tag: 'drill', body: 'Sat 11/14 — TTP Linear and Quadratic Equations: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-3', icon: 'course', tag: 'reading', body: 'Sun 11/15 — TTP: Roots and Exponents. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-3p', icon: 'pen', tag: 'drill', body: 'Sun 11/15 — TTP Roots and Exponents: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-4', icon: 'course', tag: 'reading', body: 'Mon 11/16 — TTP: Inequalities and Absolute Value. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-4p', icon: 'pen', tag: 'drill', body: 'Mon 11/16 — TTP Inequalities and Absolute Value: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-5', icon: 'course', tag: 'reading', body: 'Wed 11/18 — TTP: Word Problems. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-5p', icon: 'pen', tag: 'drill', body: 'Wed 11/18 — TTP Word Problems: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-6', icon: 'course', tag: 'reading', body: 'Wed 11/18 — TTP: Rates and Work. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-6p', icon: 'pen', tag: 'drill', body: 'Wed 11/18 — TTP Rates and Work: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-7', icon: 'course', tag: 'reading', body: 'Thu 11/19 — TTP: Statistics. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-7p', icon: 'pen', tag: 'drill', body: 'Thu 11/19 — TTP Statistics: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-8', icon: 'course', tag: 'reading', body: 'Thu 11/19 — TTP: Ratios. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-8p', icon: 'pen', tag: 'drill', body: 'Thu 11/19 — TTP Ratios: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-9', icon: 'course', tag: 'reading', body: 'Fri 11/20 — TTP: Percents. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-9p', icon: 'pen', tag: 'drill', body: 'Fri 11/20 — TTP Percents: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-10', icon: 'course', tag: 'reading', body: 'Fri 11/20 — TTP: Overlapping Sets. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-10p', icon: 'pen', tag: 'drill', body: 'Fri 11/20 — TTP Overlapping Sets: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-11', icon: 'course', tag: 'reading', body: 'Sat 11/21 — TTP: Properties of Numbers. Long chapter: lessons on Sat, tests on Sun if needed.' },
      { id: 'mt-11p', icon: 'pen', tag: 'drill', body: 'Sat 11/21 — TTP Properties of Numbers: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-12', icon: 'course', tag: 'reading', body: 'Sun 11/22 — TTP: Sequences, Functions and Coordinate Geometry (whichever TTP lists). Skim-level: lessons + Easy/Medium tests only.' },
      { id: 'mt-12p', icon: 'pen', tag: 'drill', body: 'Sun 11/22 — TTP Sequences, Functions and Coordinate Geometry (whichever TTP lists): chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-13', icon: 'course', tag: 'reading', body: 'Mon 11/23 — TTP: Combinations and Permutations. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-13p', icon: 'pen', tag: 'drill', body: 'Mon 11/23 — TTP Combinations and Permutations: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-14', icon: 'course', tag: 'reading', body: 'Mon 11/23 — TTP: Probability. Lessons, then the GMAT Strategy chapter.' },
      { id: 'mt-14p', icon: 'pen', tag: 'drill', body: 'Mon 11/23 — TTP Probability: chapter tests Easy (90%) → Medium (70%) → Hard (60%), then Review your Mistakes. Below target? Re-read the weak lessons before moving on.' },
      { id: 'mt-15', icon: 'timer', tag: 'drill', body: 'Tue 11/17 and Tue 11/24 — no new TTP chapter: the timed OG Quant sections from Modules 2–3 run as planned. Afterwards, compare TTP test accuracy with the timed-section result.' },
    ],
  },
  {
    id: 'mf',
    num: 5,
    title: 'Formula Guide',
    dates: 'Nov 13 – Nov 24',
    blurb: 'TTP’s free GMAT Focus Equation Guide (12 pages, free download from targettestprep.com), read alongside the matching Manhattan chapter: 10–15 minutes on the same day. Each item gives the pages, then the formulas to know cold, in short. Anything you cannot write from memory goes on a flashcard.',
    lessons: [
      { id: 'mf-1', icon: 'book', tag: 'reading', body: 'Fri 11/13 — Fractions & percents (pp. 1, 8). Compare two fractions by cross-multiplying. "x% less than y" = (1 − x/100)·y; "x% more" = (1 + x/100)·y. Percent change = (new − old) ÷ old. "What percent of b is a" = a/b × 100.' },
      { id: 'mf-3', icon: 'book', tag: 'reading', body: 'Sat 11/14 — Equations & quadratics (pp. 1–2, with Manhattan Ch 11 + 14 / TTP Linear and Quadratic Equations). Get everything to "= 0" before factoring; never divide by x (you lose x = 0). Factor x² + bx + c with two numbers that multiply to c and add to b. Know (a ± b)² and a² − b² = (a + b)(a − b) both ways; they also give arithmetic shortcuts like 99 × 101.' },
      { id: 'mf-2', icon: 'book', tag: 'reading', body: 'Sun 11/15 — Exponents & roots (pp. 4–6, with Manhattan Ch 12–13 / TTP Roots and Exponents). Same base: multiply → add exponents, divide → subtract. Negative exponent = reciprocal; x^(a/b) = the b-th root of x^a. √(a + b) is NOT √a + √b. Adding equal powers: 3ⁿ + 3ⁿ + 3ⁿ = 3ⁿ⁺¹; otherwise factor out the smallest power. Between 0 and 1, powers shrink and roots grow. Know 2¹–2¹⁰, 3¹–3⁵ and squares to 15².' },
      { id: 'mf-4', icon: 'book', tag: 'reading', body: 'Mon 11/16 — Inequalities & absolute value (p. 6, with Ch 16). |expr| = k → solve expr = k AND expr = −k, then check both. |A| = |B| → A = B or A = −B. |a + b| ≤ |a| + |b|, with equality only when a and b have the same sign (or one is 0).' },
      { id: 'mf-5', icon: 'book', tag: 'reading', body: 'Wed 11/18 — Word problems, rates, work & ratios (pp. 6–8, with Ch 17 + 22). Average speed = total distance ÷ total time, never the average of the speeds. Working together: add the rates. Profit = revenue − cost. Simple interest = P·r·t; compound = P(1 + r/n)^(nt). To join a:b and a:c, scale both so a matches (use the LCM).' },
      { id: 'mf-6', icon: 'book', tag: 'reading', body: 'Thu 11/19 — Statistics (pp. 8–9, with Ch 19–20). Evenly spaced set: mean = median = (first + last) ÷ 2. Count of integers from a to b inclusive = b − a + 1; multiples of k = (last multiple − first multiple) ÷ k + 1. A weighted average sits closer to the bigger group. Adding a constant to every value leaves the SD unchanged; multiplying scales it.' },
      { id: 'mf-7', icon: 'book', tag: 'reading', body: 'Fri 11/20 — Overlapping sets (p. 9, with Ch 23). Two groups: Total = A + B − Both + Neither. Three groups: subtract the "exactly two" counts once and the "all three" count twice. When it gets messy, draw the 2×2 table instead.' },
      { id: 'mf-8', icon: 'book', tag: 'reading', body: 'Sat 11/21 — Number properties (pp. 2–4, with Ch 25 + 27 + 28). Number of factors: add 1 to each prime exponent and multiply. LCM takes the highest power of each prime, GCF the lowest; LCM × GCF = the product of the two numbers. Remainder r: 0 ≤ r < divisor. Trailing zeros = number of 2×5 pairs. A fraction terminates only if its reduced denominator has nothing but 2s and 5s. Units digits of 2, 3, 7, 8 repeat every 4 powers. Consecutive integers share no factor. If pⁿ must divide kᵐ, k needs n ÷ m factors of p, rounded up.' },
      { id: 'mf-9', icon: 'book', tag: 'reading', body: 'Sun 11/22 — Coordinate plane & sequences (pp. 11–12, skim with Ch 31). Slope = rise ÷ run; parallel lines share a slope, perpendicular slopes multiply to −1. Arithmetic sequence: nth term = a₁ + (n − 1)d; sum = number of terms × (first + last) ÷ 2. Geometric: nth term = a₁ · rⁿ⁻¹.' },
      { id: 'mf-10', icon: 'book', tag: 'reading', body: 'Mon 11/23 — Counting & probability (p. 10, with Ch 29–30). Order matters → permutation n!/(n − k)!; it doesn’t → combination n!/(k!(n − k)!). Repeated items: divide by each repeat’s factorial. Seats in a circle: (n − 1)!. P(at least one) = 1 − P(none). AND → multiply, OR → add (subtract the overlap if both can happen).' },
      { id: 'mf-11', icon: 'check', tag: 'maintenance', body: 'Mon 11/16 and Mon 11/23 — the evening before each timed Quant section, flip through all 12 pages in 10 minutes. Write down every formula you could not have produced from memory, and drill only those.' },
    ],
  },
  {
    id: 'm3',
    num: 6,
    title: 'Verbal — CR & RC',
    dates: 'Nov 25 – Dec 1',
    blurb: 'OG Verbal Review 2024–25, day by day. RC questions are 1–140, CR are 141–289, both running easy → medium → hard. Easy sets are warm-ups only; most time goes to medium and hard, and RC Inference questions are called out each day so you can slow down on them.',
    lessons: [
      { id: 'm3-1', icon: 'book', tag: 'reading', body: 'Wed 11/25 — Read: the Verbal Review chapter (3.1 Analyzing Passages, 3.2 Inductive, 3.3 Deductive Reasoning) and 4.3 Tips.' },
      { id: 'm3-1p', icon: 'pen', tag: 'drill', body: 'Wed 11/25 — Practise: RC warm-up Q1–24 (easy). The inference ones (7, 13, 15, 17, 19, 20, 22, 23, 24) should be 100%.' },
      { id: 'm3-2', icon: 'pen', tag: 'drill', body: 'Thu 11/26 — CR warm-up Q141–170 (easy), ≤1.5 min each. Log every miss with its OG concept: Argument Construction, Argument Evaluation, or Evaluation of a Plan.' },
      { id: 'm3-7', icon: 'pen', tag: 'drill', body: 'Fri 11/27 — RC Q45–72 (medium), about 2 min per question including reading. Inference questions here: 46, 53, 55, 58, 59, 60, 61, 62, 65. Rule: point to the line that proves your answer before you click it.' },
      { id: 'm3-8', icon: 'pen', tag: 'drill', body: 'Sat 11/28 — CR Q193–214 (medium) + RC Q73–86 (medium; inference: 74, 75, 78, 82). Target ≥80% correct.' },
      { id: 'm3-9', icon: 'pen', tag: 'drill', body: 'Sun 11/29 — RC Q87–100 (medium; inference: 87, 96) + CR Q215–235 (medium). Target ≥80% correct.' },
      { id: 'm3-10', icon: 'target', tag: 'drill', body: 'Mon 11/30 — Hard RC Q120–140: 12 of these 21 are inference (120, 122–126, 130, 132, 134–136, 139). This is the level your 805 needs. Review every miss against the explanation, not just the answer key.' },
      { id: 'm3-5', icon: 'timer', tag: 'drill', body: 'Tue 12/1 — Timed Verbal section: RC Q101–113 + CR Q236–245 (23 hard Qs, 45 min, no pauses). Compare to your Verbal baseline in the Score Target card. Left over for Module 6: RC Q25–44 and 114–119, CR Q171–192 and 246–289.' },
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
    num: 7,
    title: 'Data Insights',
    dates: 'Dec 2 – Dec 8',
    blurb: 'The DI chapters of Manhattan All the Quant + DI, Graphics Interpretation and Two-Part Analysis get the most practice, then the OG DI Review.',
    lessons: [
      { id: 'm4-1', icon: 'book', tag: 'reading', body: 'Read: Ch 3 Data Sufficiency 101 + Ch 8 Table Analysis, and do the chapter problem sets. Use the "DS answer tree" card in Remember until it is automatic.' },
      { id: 'm4-1p', icon: 'pen', tag: 'drill', body: 'Practise: OG DI Data Sufficiency Q39–56 (medium), timed.' },
      { id: 'm4-2', icon: 'book', tag: 'reading', body: 'Read: Ch 10 Graphics Interpretation + Ch 21 Two-Part Analysis, and do the chapter problem sets.' },
      { id: 'm4-2p', icon: 'pen', tag: 'drill', body: 'Practise: OG DI Two-Part Analysis Q119–136 (medium) and the Graphics Interpretation set in the OG Online Question Bank, timed.' },
      { id: 'm4-5', icon: 'book', tag: 'reading', body: 'Read: Ch 18 Multi-Source Reasoning + Ch 26 Logic Problems, and do the chapter problem sets.' },
      { id: 'm4-5p', icon: 'pen', tag: 'drill', body: 'Practise: OG DI Data Sufficiency Q57–74 (medium; 67–74 are logic/inference) and 3 MSR sets from the Online Question Bank, timed.' },
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
    num: 8,
    title: 'Mocks & Weak Spots',
    dates: 'Dec 9 – Dec 15',
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
    num: 9,
    title: 'Taper — Test Week',
    dates: 'Dec 16+ (adjust to your actual date)',
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

