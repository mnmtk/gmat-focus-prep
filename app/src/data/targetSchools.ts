import type { TargetSchool } from '../types'

// Of the 8 Ivy League universities, only 6 run a full-time MBA.
// Princeton and Brown have no MBA program at all — not a gap in this list, a fact about the Ivy League.
export const ivyNoMba = ['Princeton', 'Brown']

// Deadlines below are the official 2026–27 cycle dates (Fall 2027 entry), verified Nov 2026.
// Round 1 for this cycle has already closed. Schools publish next year's dates ~June 2027 —
// re-check each school's own admissions page before relying on these for the 2027–28 cycle.
export const targetSchools: TargetSchool[] = [
  {
    id: 'hbs',
    name: 'Harvard Business School',
    program: 'MBA · 2-year, case method',
    city: 'Boston, MA',
    cycleNote: 'R1 closed Sep 9, 2026. R2 is the only live round this cycle — no R3.',
    deadlines: [
      { round: 'Round 1', due: 'Sep 9, 2026 (closed)', decision: 'Dec 10, 2026' },
      { round: 'Round 2', due: 'Jan 5, 2027', decision: 'Mar 25, 2027' },
    ],
    profile: 'Most selective of the six — single-digit admit rate most years.',
    values: [
      'A demonstrated "habit of leadership" — impact you drove, not titles you held',
      'General-management breadth over narrow specialization',
      'A track record of taking smart risks and being candid about what went wrong',
      'Real-time contribution to case-method discussion — vocal, persuasive, builds on others',
    ],
    workToDo: [
      'Line up 2 recommenders who can speak to leadership impact directly, not seniority',
      'Rewrite your resume around quantified outcomes, not job responsibilities',
      'Practice cold-call-style, time-pressured answers — HBS interviews are fast and conversational',
      'Budget for the post-interview reflection essay — due within 24 hours of the interview',
    ],
    officialLink: { label: 'hbs.edu/mba', href: 'https://www.hbs.edu/mba/admissions' },
  },
  {
    id: 'wharton',
    name: 'Wharton (UPenn)',
    program: 'MBA · 2-year, heaviest quant/finance core',
    city: 'Philadelphia, PA',
    cycleNote: 'R1 closed Sep 8, 2026. R2 is next; a deferred/late round follows in spring.',
    deadlines: [
      { round: 'Round 1', due: 'Sep 8, 2026 (closed)', decision: 'Dec 17, 2026' },
      { round: 'Round 2', due: 'Jan 5, 2027', decision: '—' },
      { round: 'Round 3', due: '~Mar 31–Apr 21, 2027 (confirm exact date)', decision: '—' },
    ],
    profile: 'Deepest analytical/quant bench of the six; large, resource-rich cohort.',
    values: [
      'Analytical depth and comfort with quant under pressure',
      'How you perform in a live Team-Based Discussion — a group exercise, not a 1:1 interview',
      'A specific post-MBA goal tied to named Wharton resources (a club, a specific elective, a conference)',
      "What you add to a Learning Team — Wharton's small-group model runs the whole first year",
    ],
    workToDo: [
      'Name 2–3 real Wharton electives/clubs in your essay — vague "I want strategy roles" answers get penalized',
      'Rehearse the Team-Based Discussion format specifically — it is not a normal interview',
      'If your background is non-quant, show supplemental quant work (coursework, a certification, self-study)',
    ],
    officialLink: { label: 'mba.wharton.upenn.edu', href: 'https://mba.wharton.upenn.edu/applying/' },
  },
  {
    id: 'cbs',
    name: 'Columbia Business School',
    program: 'MBA · August or January entry',
    city: 'New York, NY',
    cycleNote: 'R1 closed Sep 9, 2026. R2 and R3 remain open this cycle.',
    deadlines: [
      { round: 'Round 1', due: 'Sep 9, 2026 (closed)', decision: 'Dec 14, 2026' },
      { round: 'Round 2', due: 'Jan 5, 2027', decision: 'Mar 24, 2027' },
      { round: 'Round 3', due: 'Mar 29, 2027', decision: 'May 12, 2027' },
    ],
    profile: 'Only Ivy MBA with a January (accelerated, no-internship) entry option.',
    values: [
      '"Always-on" hustle — proximity to Wall Street/consulting recruiting is the whole pitch',
      'A precise, specific immediate-post-MBA function and company type, not a generic direction',
      'Resourcefulness — thriving without a closed campus "bubble", in a city that doesn’t wait for you',
    ],
    workToDo: [
      'Decide August vs January entry early — January skips the summer internship, which changes your recruiting plan',
      'Write the "why this exact function, this exact industry" essay with precision — CBS essay readers notice vagueness fastest',
      'If you can, have at least one NYC-based conversation (alum, current student) before applying',
    ],
    officialLink: { label: 'business.columbia.edu/mba', href: 'https://www8.gsb.columbia.edu/programs/mba/admissions' },
  },
  {
    id: 'yale-som',
    name: 'Yale School of Management',
    program: 'MBA · integrated core curriculum',
    city: 'New Haven, CT',
    cycleNote: 'R1 closed Sep 15, 2026. R2 and R3 remain open this cycle.',
    deadlines: [
      { round: 'Round 1', due: 'Sep 15, 2026 (closed)', decision: 'Dec 3, 2026' },
      { round: 'Round 2', due: 'Jan 6, 2027', decision: 'Mar 18, 2027' },
      { round: 'Round 3', due: 'Apr 7, 2027', decision: 'May 13, 2027' },
    ],
    profile: 'Mission framed as "leaders for business AND society" — the most cross-sector of the six.',
    values: [
      'Threads of nonprofit, public-sector, or mission-driven work alongside the corporate track',
      'Cross-functional thinking — the core curriculum is organized by business "raw materials," not single-discipline silos',
      'Interview performance — every admit is interviewed by invitation, and it carries real weight',
    ],
    workToDo: [
      'Connect your personal "why MBA" to a broader systems/societal angle, not just career advancement',
      'Surface any genuine social-impact, pro-bono, or civic leadership thread, even from a purely corporate career',
      'Prep specifically for the SOM interview format — behavioral plus a direct "why Yale" probe',
    ],
    officialLink: { label: 'som.yale.edu/mba', href: 'https://som.yale.edu/programs/mba/admissions' },
  },
  {
    id: 'cornell-johnson',
    name: 'Cornell — Johnson',
    program: 'MBA · 2-year, "Immersion" specializations',
    city: 'Ithaca, NY',
    cycleNote: 'R1 closed Sep 17, 2026. R2 and R3 remain open this cycle.',
    deadlines: [
      { round: 'Round 1', due: 'Sep 17, 2026 (closed)', decision: 'Oct 27 – Dec 9, 2026' },
      { round: 'Round 2', due: 'Jan 5, 2027', decision: 'Mar 3 – Mar 26, 2027' },
      { round: 'Round 3', due: 'Apr 6, 2027', decision: 'May 7 – May 21, 2027' },
    ],
    profile: 'Smallest, most tight-knit campus of the group — rural, intensely residential.',
    values: [
      'Genuine fit with a small, collaborative community — this is a fit school as much as a numbers school',
      'Real enthusiasm for the Immersion model — a full semester embedded in one function or industry',
      'Visible peer-to-peer collaboration — team projects, mentoring, group leadership',
    ],
    workToDo: [
      'Name the specific Immersion track you’d take and why — generic answers stand out immediately here',
      'Reach out to current students or alumni before applying — fit-driven schools notice real engagement',
      'Be ready to explain, honestly, why a small residential program over a big-city one suits how you work',
    ],
    officialLink: { label: 'johnson.cornell.edu', href: 'https://www.johnson.cornell.edu/mba/admissions/' },
  },
  {
    id: 'tuck',
    name: 'Dartmouth — Tuck',
    program: 'MBA · smallest class, general management',
    city: 'Hanover, NH',
    cycleNote: 'R1 closed Sep 24, 2026 (some trackers list Sep 30 — confirm on Tuck’s page). R2/R3 remain open.',
    deadlines: [
      { round: 'Round 1', due: 'Sep 24, 2026 (closed)', decision: '—' },
      { round: 'Round 2', due: 'Jan 5, 2027', decision: '~Mar 18, 2027' },
      { round: 'Round 3', due: 'Mar 24, 2027', decision: '~Apr 29, 2027' },
    ],
    profile: '"Small is the new big" — the tightest community and highest alumni loyalty of the six.',
    values: [
      'General-management generalists over narrow specialists',
      'Genuine fit for an isolated, intensely social residential campus — this gets scrutinized hard',
      'Interview performance — conversational and fit-focused, not case-based, and weighted heavily',
    ],
    workToDo: [
      'Visit campus or attend an admissions event if at all possible — Tuck notices who shows up',
      'Prep for a candid, fit-focused interview rather than a case interview',
      'Write honestly about why a small, remote program beats an NYC/Boston one for you specifically',
    ],
    officialLink: { label: 'tuck.dartmouth.edu', href: 'https://www.tuck.dartmouth.edu/admissions' },
  },
]
