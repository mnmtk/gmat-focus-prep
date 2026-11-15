import type { ErrorLogEntry, ErrorReason, ErrorSection, ProgressState, QuizResult } from '../types'
import { decodeFlashcards, encodeFlashcards, FLASHCARD_COLUMNS, type Flashcard } from '../data/flashcards'

export interface LocalDbState extends ProgressState {
  errors: ErrorLogEntry[]
  flashcards: Flashcard[]
}

export function emptyLocalDb(): LocalDbState {
  return { lessons: {}, quizzes: {}, errors: [], flashcards: [] }
}

const SHEET = {
  ERRORS: 'Error Log',
  LESSONS: 'Lesson Progress',
  QUIZZES: 'Quiz Results',
  FLASHCARDS: 'Flashcards',
} as const

const ERROR_COLUMNS = ['Date', 'Section', 'Topic', 'Question', 'Reason', 'Notes', 'Redo Date', 'Resolved'] as const
const SECTIONS: ErrorSection[] = ['Quant', 'Verbal', 'Data Insights']
const REASONS: ErrorReason[] = ['Content gap', 'Misread', 'Careless error', 'Timing error']

function newId() {
  return `e${Date.now()}${Math.random().toString(36).slice(2, 7)}`
}

export function isFileSystemAccessSupported() {
  return typeof window !== 'undefined' && 'showOpenFilePicker' in window
}

export async function pickExistingFile(): Promise<FileSystemFileHandle | null> {
  try {
    const [handle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Excel file',
          accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
        },
      ],
      excludeAcceptAllOption: false,
      multiple: false,
    })
    return handle
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return null
    throw err
  }
}

export async function createNewFile(suggestedName = 'gmat-prep-data.xlsx'): Promise<FileSystemFileHandle | null> {
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName,
      types: [
        {
          description: 'Excel file',
          accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
        },
      ],
    })
    return handle
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return null
    throw err
  }
}

export async function verifyPermission(handle: FileSystemFileHandle, requestIfNeeded: boolean): Promise<boolean> {
  const opts = { mode: 'readwrite' as const }
  if ((await handle.queryPermission(opts)) === 'granted') return true
  if (!requestIfNeeded) return false
  return (await handle.requestPermission(opts)) === 'granted'
}

export async function readLocalDb(handle: FileSystemFileHandle): Promise<LocalDbState> {
  const file = await handle.getFile()
  if (file.size === 0) return emptyLocalDb()

  const XLSX = await import('xlsx')
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array' })

  const errors = readErrorSheet(XLSX, workbook)
  const lessons = readLessonSheet(XLSX, workbook)
  const quizzes = readQuizSheet(XLSX, workbook)
  const sheet = workbook.Sheets[SHEET.FLASHCARDS]
  const rows = sheet ? XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: '' }) : []
  if (rows.length && !FLASHCARD_COLUMNS.every((column, index) => rows[0][index] === column)) {
    throw new Error(`Check the Flashcards headers. Expected ${FLASHCARD_COLUMNS.join(', ')}.`)
  }
  const flashcards = decodeFlashcards(rows.slice(1))
  return { errors, lessons, quizzes, flashcards }
}

// Narrow typing for the dynamically imported xlsx module without pulling its types into the main bundle.
type XlsxModule = typeof import('xlsx')

function readErrorSheet(XLSX: XlsxModule, workbook: ReturnType<XlsxModule['read']>): ErrorLogEntry[] {
  const sheet = workbook.Sheets[SHEET.ERRORS]
  if (!sheet) return []
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)
  return rows
    .map((row): ErrorLogEntry | null => {
      const question = String(row['Question'] ?? '').trim()
      if (!question) return null
      const section = SECTIONS.includes(row['Section'] as ErrorSection) ? (row['Section'] as ErrorSection) : 'Quant'
      const reason = REASONS.includes(row['Reason'] as ErrorReason) ? (row['Reason'] as ErrorReason) : 'Content gap'
      return {
        id: newId(),
        date: String(row['Date'] ?? ''),
        section,
        topic: String(row['Topic'] ?? ''),
        question,
        reason,
        notes: String(row['Notes'] ?? ''),
        redoDate: String(row['Redo Date'] ?? ''),
        resolved: String(row['Resolved'] ?? '').toLowerCase() === 'yes',
      }
    })
    .filter((e): e is ErrorLogEntry => e !== null)
}

function readLessonSheet(XLSX: XlsxModule, workbook: ReturnType<XlsxModule['read']>): Record<string, boolean> {
  const sheet = workbook.Sheets[SHEET.LESSONS]
  if (!sheet) return {}
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)
  const lessons: Record<string, boolean> = {}
  for (const row of rows) {
    const id = String(row['Lesson ID'] ?? '').trim()
    if (!id) continue
    lessons[id] = String(row['Completed'] ?? '').toLowerCase() === 'yes'
  }
  return lessons
}

function readQuizSheet(XLSX: XlsxModule, workbook: ReturnType<XlsxModule['read']>): Record<string, QuizResult> {
  const sheet = workbook.Sheets[SHEET.QUIZZES]
  if (!sheet) return {}
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)
  const quizzes: Record<string, QuizResult> = {}
  for (const row of rows) {
    const id = String(row['Quiz ID'] ?? '').trim()
    if (!id) continue
    quizzes[id] = {
      passed: String(row['Passed'] ?? '').toLowerCase() === 'yes',
      score: Number(row['Score'] ?? 0),
    }
  }
  return quizzes
}

export async function writeLocalDb(handle: FileSystemFileHandle, state: LocalDbState) {
  const XLSX = await import('xlsx')
  const file = await handle.getFile()
  const workbook = file.size === 0
    ? XLSX.utils.book_new()
    : XLSX.read(await file.arrayBuffer(), { type: 'array' })

  function saveSheet(name: string, sheet: ReturnType<XlsxModule['utils']['json_to_sheet']>) {
    if (workbook.SheetNames.includes(name)) workbook.Sheets[name] = sheet
    else XLSX.utils.book_append_sheet(workbook, sheet, name)
  }

  const errorRows = state.errors.map((e) => ({
    Date: e.date,
    Section: e.section,
    Topic: e.topic,
    Question: e.question,
    Reason: e.reason,
    Notes: e.notes,
    'Redo Date': e.redoDate,
    Resolved: e.resolved ? 'Yes' : 'No',
  }))
  const errorSheet = XLSX.utils.json_to_sheet(errorRows, { header: [...ERROR_COLUMNS] })
  errorSheet['!cols'] = [{ wch: 11 }, { wch: 13 }, { wch: 22 }, { wch: 40 }, { wch: 15 }, { wch: 30 }, { wch: 11 }, { wch: 9 }]
  saveSheet(SHEET.ERRORS, errorSheet)

  const lessonRows = Object.entries(state.lessons).map(([id, done]) => ({
    'Lesson ID': id,
    Completed: done ? 'Yes' : 'No',
  }))
  const lessonSheet = XLSX.utils.json_to_sheet(lessonRows, { header: ['Lesson ID', 'Completed'] })
  lessonSheet['!cols'] = [{ wch: 14 }, { wch: 11 }]
  saveSheet(SHEET.LESSONS, lessonSheet)

  const quizRows = Object.entries(state.quizzes).map(([id, r]) => ({
    'Quiz ID': id,
    Passed: r.passed ? 'Yes' : 'No',
    Score: r.score,
  }))
  const quizSheet = XLSX.utils.json_to_sheet(quizRows, { header: ['Quiz ID', 'Passed', 'Score'] })
  quizSheet['!cols'] = [{ wch: 10 }, { wch: 8 }, { wch: 7 }]
  saveSheet(SHEET.QUIZZES, quizSheet)

  // Flashcards are edited in the workbook. Preserve their sheet and formatting
  // when saving progress; create the tab for new/older workbooks if missing.
  if (!workbook.Sheets[SHEET.FLASHCARDS]) {
    saveSheet(SHEET.FLASHCARDS, XLSX.utils.aoa_to_sheet([[...FLASHCARD_COLUMNS], ...encodeFlashcards(state.flashcards)]))
  }

  const out = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer
  const writable = await handle.createWritable()
  try {
    await writable.write(out)
    await writable.close()
  } catch (error) {
    await writable.abort().catch(() => {})
    throw error
  }
}
