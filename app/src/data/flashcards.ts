export const FLASHCARD_CATEGORIES = ['Data Sufficiency', 'Quant', 'Test strategy'] as const
export type FlashcardCategory = typeof FLASHCARD_CATEGORIES[number]

export interface Flashcard {
  id: string
  category: FlashcardCategory
  source?: 'error-log'
  title: string
  tip: string
  example: string
  answer: string
}

export const FLASHCARD_COLUMNS = ['ID', 'Category', 'Title', 'Tip', 'Example', 'Answer', 'From Error Log'] as const

export function decodeFlashcards(rows: unknown[][]): Flashcard[] {
  const ids = new Set<string>()
  return rows.filter(row => row.some(value => value != null && String(value).trim())).map(row => {
    const [id, category, title, tip, example, answer, fromErrorLog] = row.map(value => String(value ?? '').trim())
    if (!id || !title || !tip || !example || !answer || !FLASHCARD_CATEGORIES.includes(category as FlashcardCategory)) {
      throw new Error('Check the Flashcards sheet: each card needs an ID, valid category, title, tip, example and answer.')
    }
    if (ids.has(id)) throw new Error(`Duplicate flashcard ID: ${id}`)
    ids.add(id)
    return { id, category: category as FlashcardCategory, title, tip, example, answer,
      ...(fromErrorLog.toLowerCase() === 'yes' || fromErrorLog.toLowerCase() === 'true' ? { source: 'error-log' as const } : {}),
    }
  })
}

export function encodeFlashcards(cards: Flashcard[]): string[][] {
  return cards.map(card => [card.id, card.category, card.title, card.tip, card.example, card.answer, card.source === 'error-log' ? 'Yes' : 'No'])
}
