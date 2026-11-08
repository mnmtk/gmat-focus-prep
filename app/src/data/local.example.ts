// Copy this file to `local.ts` (already gitignored) to point lessons at your own,
// legally-owned study material on disk. Never commit real personal file paths —
// `local.ts` is excluded in .gitignore specifically so this stays untracked.
//
// This file intentionally contains no real paths — it's a template, not your data.

export const localLessonLinks: Record<
  string,
  { label: string; href: string } | { label: string; href: string }[]
> = {
  // 'm2-4': { label: 'open folder', href: 'file:///path/to/your/Manhattan' },
  // 'm3-3': { label: 'open', href: 'file:///path/to/your/PowerScore_CR_Bible.pdf' },
  // 'm3-4': [
  //   { label: 'CR', href: 'file:///path/to/your/06-Critical-Reasoning.pdf' },
  //   { label: 'RC', href: 'file:///path/to/your/07-Reading-Comprehension.pdf' },
  // ],
}

export const localMockTests: { label: string; href: string }[] = [
  // { label: 'Mock Test 1', href: 'file:///path/to/your/mock-test-1.pdf' },
]

export const localBrowseLinks: { label: string; href: string }[] = [
  // { label: 'Open my study folder', href: 'file:///path/to/your/folder' },
]

export const localObsoleteLinks: { label: string; href: string }[] = [
  // { label: 'Old Sentence Correction guide', href: 'file:///path/to/your/sc-guide.pdf' },
]
