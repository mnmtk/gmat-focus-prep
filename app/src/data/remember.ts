import type { RememberCard } from '../types'

export const rememberCards: RememberCard[] = [
  {
    id: 'before-you-click',
    title: 'Before you click',
    why: 'Run this on every question. Misreads and blanks cost points you already know how to earn.',
    columns: ['Check', 'Catches'],
    colWidths: ['w-3/5', 'w-2/5'],
    testColumns: [0],
    groups: [
      [
        ['What exactly is asked? Percent of what, the units, "NOT", "must be"', 'Percent-of-what misreads'],
        ['Re-read the last line of the question before choosing', 'Solving for x when they asked for 2x'],
        ['Find your number among the options, then click', 'Solving right, clicking the wrong option'],
        ['3 minutes gone? Bookmark, best guess, move on', 'Blanks from running out of time'],
      ],
    ],
  },
  {
    id: 'fraction-decimal-percent',
    title: 'Fraction ↔ Decimal ↔ Percent',
    why: 'Spot these instantly instead of dividing. "0.125 × 2x" is just x/4; "12.5%" is just 1/8.',
    columns: ['Fraction', 'Decimal', 'Percent'],
    colWidths: ['w-1/2', 'w-1/4', 'w-1/4'],
    groups: [
      [
        ['1/1', '1', '100%'],
        ['1/2 = 2/4 = 3/6 = 4/8 = 5/10', '0.5', '50%'],
        ['3/2', '1.5', '150%'],
      ],
      [
        ['1/4 = 2/8', '0.25', '25%'],
        ['3/4 = 6/8', '0.75', '75%'],
        ['5/4', '1.25', '125%'],
        ['7/4', '1.75', '175%'],
      ],
      [
        ['1/8', '0.125', '12.5%'],
        ['3/8', '0.375', '37.5%'],
        ['5/8', '0.625', '62.5%'],
        ['7/8', '0.875', '87.5%'],
      ],
      [
        ['1/5 = 2/10', '0.2', '20%'],
        ['2/5 = 4/10', '0.4', '40%'],
        ['3/5 = 6/10', '0.6', '60%'],
        ['4/5 = 8/10', '0.8', '80%'],
      ],
      [
        ['1/10', '0.1', '10%'],
        ['3/10', '0.3', '30%'],
        ['7/10', '0.7', '70%'],
        ['9/10', '0.9', '90%'],
      ],
      [
        ['1/3 = 2/6', '0.333…', '≈ 33.3%'],
        ['2/3 = 4/6', '0.667…', '≈ 66.7%'],
        ['4/3', '1.333…', '≈ 133.3%'],
      ],
      [
        ['1/6', '0.1666…', '≈ 16.7%'],
        ['5/6', '0.8333…', '≈ 83.3%'],
        ['1/9', '0.111…', '≈ 11.1%'],
      ],
      [
        ['1/100', '0.01', '1%'],
        ['1/50', '0.02', '2%'],
        ['1/25', '0.04', '4%'],
        ['1/20', '0.05', '5%'],
      ],
    ],
  },
  {
    id: 'ds-decision-tree',
    title: 'Data Sufficiency — answer choice tree',
    why: 'Start with whichever statement looks easier. One statement in, you are already down to 2 or 3 choices: BD if (2) works, ACE if it does not.',
    notes: [
      'Judge each statement alone first — pretend the other one does not exist.',
      'Only combine them when neither works alone (the CE branch).',
      '"Sufficient" means exactly one answer. A definite "No" is sufficient too.',
    ],
    columns: ['(2) alone', '(1) alone', 'Both together', 'Answer'],
    testColumns: [3],
    groups: [
      [
        ['Sufficient', 'Sufficient', '—', 'D — each works'],
        ['Sufficient', 'Not', '—', 'B — (2) only'],
        ['Not', 'Sufficient', '—', 'A — (1) only'],
        ['Not', 'Not', 'Sufficient', 'C — need both'],
        ['Not', 'Not', 'Not', 'E — nothing works'],
      ],
    ],
  },
]
