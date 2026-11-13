import type { ErrorLogEntry } from '../types'
import { addDays, localDate, FIRST_REDO_DAYS, SECOND_REDO_DAYS } from '../lib/dates'
import { Check, RotateCcw } from '../lib/icons'

interface Props {
  entries: ErrorLogEntry[]
  connected: boolean
  onUpdate: (id: string, patch: Partial<ErrorLogEntry>) => void
}

// Two correct redos in a row retire a miss. The first one is recorded as a marker in the notes,
// so it survives in the Excel file; missing it again clears the marker and starts over.
const PASS_MARK = '[redo 1 ✓]'

function isSecondPass(e: ErrorLogEntry) {
  return e.notes.includes(PASS_MARK)
}

function withoutMark(notes: string) {
  return notes.replace(PASS_MARK, '').trim()
}

export function DueRedos({ entries, connected, onUpdate }: Props) {
  const today = localDate()
  const due = entries
    .filter((e) => !e.resolved && e.redoDate && e.redoDate <= today)
    .sort((a, b) => a.redoDate.localeCompare(b.redoDate))

  if (due.length === 0) return null

  return (
    <section className="rounded-xl border border-violet-200 bg-white p-4 sm:p-5 dark:border-violet-500/30 dark:bg-[#1a1730]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-medium text-slate-900 dark:text-white">
          Redo today <span className="tabular-nums text-violet-600 dark:text-violet-400">{due.length}</span>
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">Solve each one cold, no notes</span>
      </div>
      <ul className="mt-3 divide-y divide-slate-100 dark:divide-white/5">
        {due.map((e) => (
          <li key={e.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5">
            <div className="min-w-0 basis-full wrap-anywhere sm:flex-1">
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                {e.question}
                {e.redoDate < today && (
                  <span className="ml-2 text-xs font-normal text-rose-600 dark:text-rose-400">overdue</span>
                )}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {e.section} · {e.topic} · {e.reason}
                {isSecondPass(e) && ' · final check'}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                disabled={!connected}
                onClick={() =>
                  onUpdate(
                    e.id,
                    isSecondPass(e)
                      ? { resolved: true }
                      : { redoDate: addDays(today, SECOND_REDO_DAYS), notes: `${e.notes} ${PASS_MARK}`.trim() },
                  )
                }
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-40 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Got it
              </button>
              <button
                disabled={!connected}
                onClick={() => onUpdate(e.id, { redoDate: addDays(today, FIRST_REDO_DAYS), notes: withoutMark(e.notes) })}
                className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-40 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} /> Missed again
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
        Got it → comes back once more in {SECOND_REDO_DAYS} days, then it's retired. Missed again → back in {FIRST_REDO_DAYS} days.
      </p>
    </section>
  )
}
