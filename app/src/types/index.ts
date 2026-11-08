export type LessonTag = 'setup' | 'reading' | 'drill' | 'mock' | 'maintenance'

export interface Lesson {
  id: string
  icon: string
  body: string
  tag: LessonTag
  link?: { label: string; href: string }
  links?: { label: string; href: string }[]
}

export interface QuizQuestion {
  q: string
  opts: string[]
  correct: number
}

export interface Quiz {
  id: string
  title: string
  pass: number
  questions: QuizQuestion[]
}

export interface Module {
  id: string
  num: number
  title: string
  dates: string
  blurb: string
  lessons: Lesson[]
  quiz?: Quiz
  checkpoint?: string
  insights?: { text: string; source?: { label: string; href: string } }[]
}

export interface QuizResult {
  passed: boolean
  score: number
}

export interface ProgressState {
  lessons: Record<string, boolean>
  quizzes: Record<string, QuizResult>
}

export type ErrorSection = 'Quant' | 'Verbal' | 'Data Insights'
export type ErrorReason = 'Content gap' | 'Careless error' | 'Timing error'

export interface ErrorLogEntry {
  id: string
  date: string
  section: ErrorSection
  topic: string
  question: string
  reason: ErrorReason
  notes: string
  redoDate: string
  resolved: boolean
}
