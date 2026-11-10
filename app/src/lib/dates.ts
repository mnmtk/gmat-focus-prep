// Local-calendar dates as YYYY-MM-DD. toISOString() uses UTC, which rolls over to
// tomorrow late in the evening in timezones ahead of UTC.
export function localDate(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return localDate(new Date(y, m - 1, d + days))
}

/** First redo comes this many days after the miss; the second check this many days after a correct redo. */
export const FIRST_REDO_DAYS = 3
export const SECOND_REDO_DAYS = 10
