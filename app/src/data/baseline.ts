import type { ScoreSnapshot } from '../types'

const localModule = import.meta.glob('./local.ts', { eager: true }) as Record<
  string,
  { localBaseline?: ScoreSnapshot }
>

export const baseline = localModule['./local.ts']?.localBaseline ?? null

export const SCORE_TARGET = 805
export const SECTION_MAX = 90
