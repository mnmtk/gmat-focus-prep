import { useState } from 'react'
import { rememberCards } from '../data/remember'
import { Brain, Eye, EyeOff, Lightbulb } from '../lib/icons'
import type { RememberCard } from '../types'

function CardView({ card }: { card: RememberCard }) {
  const testCols = card.testColumns ?? card.columns.map((_, i) => i).filter((i) => i > 0)
  const multiGroup = card.groups.length > 1
  const [testing, setTesting] = useState(false)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  function toggleTesting() {
    setTesting((t) => !t)
    setRevealed(new Set())
  }

  function reveal(key: string) {
    setRevealed((prev) => new Set(prev).add(key))
  }

  return (
    <div className="min-w-0 rounded-lg border border-slate-200 p-3 sm:p-4 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-base font-medium text-slate-900 dark:text-white">{card.title}</h3>
        <button
          onClick={toggleTesting}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            testing
              ? 'bg-violet-600 text-white dark:bg-violet-500'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
          }`}
        >
          {testing ? <EyeOff className="h-3.5 w-3.5" strokeWidth={2} /> : <Eye className="h-3.5 w-3.5" strokeWidth={2} />}
          {testing ? 'Show all' : 'Test me'}
        </button>
      </div>

      {card.why && (
        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Lightbulb className="mt-px h-3.5 w-3.5 flex-shrink-0 text-amber-500" strokeWidth={2} />
          {card.why}
        </p>
      )}
      {card.notes && (
        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-slate-600 dark:text-slate-300">
          {card.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
      {testing && (
        <p className="mt-1.5 text-xs text-violet-700 dark:text-violet-300">
          Say the answer out loud, then tap a cell to check.
        </p>
      )}

      <div className={`mt-3 grid grid-cols-1 gap-3 ${multiGroup ? 'lg:grid-cols-2' : ''}`}>
        {card.groups.map((rows, g) => (
          <div key={g} className="min-w-0 overflow-x-auto">
            <table className={`w-full border-collapse text-sm tabular-nums ${card.colWidths ? 'table-fixed' : ''}`}>
              {card.colWidths && (
                <colgroup>
                  {card.colWidths.map((w, i) => (
                    <col key={i} className={w} />
                  ))}
                </colgroup>
              )}
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {card.columns.map((c) => (
                    <th key={c} className="wrap-anywhere pb-1.5 pr-2 font-semibold sm:pr-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((cells, r) => (
                  <tr key={r} className="border-t border-slate-100 dark:border-white/5">
                    {cells.map((cell, c) => {
                      const key = `${g}-${r}-${c}`
                      const hidden = testing && testCols.includes(c) && !revealed.has(key)
                      return (
                        <td
                          key={c}
                          className={`wrap-anywhere py-1.5 pr-2 sm:pr-3 ${c === 0 ? 'font-medium text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}
                        >
                          {hidden ? (
                            <button
                              onClick={() => reveal(key)}
                              aria-label="Reveal answer"
                              className="min-h-8 w-full max-w-16 rounded bg-violet-100 text-violet-400 hover:bg-violet-200 dark:bg-violet-500/15 dark:text-violet-400 dark:hover:bg-violet-500/25"
                            >
                              ?
                            </button>
                          ) : (
                            cell
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Remember() {
  return (
    <section
      id="remember"
      className="scroll-mt-6 rounded-xl border border-violet-100 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-[#1a1730]"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
        <Brain className="h-3.5 w-3.5" strokeWidth={2} /> Remember
      </div>
      <h2 className="font-display mt-0.5 text-xl font-medium text-slate-900 dark:text-white">Facts to know cold</h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Things you should recall instantly, not work out. Use "Test me" for a daily 5-minute drill.
      </p>
      <div className="flex flex-col gap-4">
        {rememberCards.map((card) => (
          <CardView key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}
