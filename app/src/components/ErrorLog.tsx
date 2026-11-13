import { useState } from 'react'
import type { ErrorLogEntry, ErrorReason, ErrorSection } from '../types'
import { Plus, Trash2, FileSpreadsheet } from '../lib/icons'
import { addDays, localDate, FIRST_REDO_DAYS } from '../lib/dates'

interface Props {
  entries: ErrorLogEntry[]
  connected: boolean
  onAdd: (entry: Omit<ErrorLogEntry, 'id'>) => void
  onUpdate: (id: string, patch: Partial<ErrorLogEntry>) => void
  onRemove: (id: string) => void
}

const SECTIONS: ErrorSection[] = ['Quant', 'Verbal', 'Data Insights']
const REASONS: ErrorReason[] = ['Content gap', 'Misread', 'Careless error', 'Timing error']

const REASON_STYLE: Record<ErrorReason, string> = {
  'Content gap': 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  Misread: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  'Careless error': 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  'Timing error': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
}

const SECTION_STYLE: Record<ErrorSection, string> = {
  Quant: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Verbal: 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
  'Data Insights': 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
}

function emptyForm(): Omit<ErrorLogEntry, 'id'> {
  return {
    date: localDate(),
    section: 'Quant',
    topic: '',
    question: '',
    reason: 'Content gap',
    notes: '',
    redoDate: '',
    resolved: false,
  }
}

export function ErrorLog({ entries, connected, onAdd, onUpdate, onRemove }: Props) {
  const [form, setForm] = useState(emptyForm)
  const [filter, setFilter] = useState<ErrorReason | 'all'>('all')
  const [sectionFilter, setSectionFilter] = useState<ErrorSection | 'all'>('all')

  const inSection = sectionFilter === 'all' ? entries : entries.filter((e) => e.section === sectionFilter)

  const counts = REASONS.reduce<Record<ErrorReason, number>>(
    (acc, r) => ({ ...acc, [r]: inSection.filter((e) => e.reason === r && !e.resolved).length }),
    { 'Content gap': 0, Misread: 0, 'Careless error': 0, 'Timing error': 0 },
  )

  const visible = filter === 'all' ? inSection : inSection.filter((e) => e.reason === filter)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!connected || !form.question.trim() || !form.topic.trim()) return
    onAdd({ ...form, redoDate: form.redoDate || addDays(form.date, FIRST_REDO_DAYS) })
    setForm((f) => ({ ...emptyForm(), date: f.date, section: f.section }))
  }

  return (
    <section
      id="error-log"
      className="@container scroll-mt-6 rounded-xl border border-violet-100 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-[#1a1730]"
    >
      <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
            Error Log
          </div>
          <h2 className="font-display mt-0.5 text-xl font-medium text-slate-900 dark:text-white">Every miss, bucketed</h2>
        </div>
      </div>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Tag every miss as content gap, misread, careless error, or timing error — the fix is different for each.
        {connected
          ? " Every submit writes straight to your local .xlsx file — open it in Excel any time, it'll already be there."
          : ' Connect a file above to start logging.'}
      </p>

      <div className="mb-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by section">
        {(['all', ...SECTIONS] as const).map((s) => {
          const n = s === 'all' ? entries.length : entries.filter((e) => e.section === s).length
          return (
            <button
              key={s}
              role="tab"
              aria-selected={sectionFilter === s}
              onClick={() => setSectionFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                sectionFilter === s
                  ? 'bg-violet-600 text-white dark:bg-violet-500'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
              }`}
            >
              {s === 'all' ? 'All sections' : s} <span className="tabular-nums opacity-70">{n}</span>
            </button>
          )
        })}
      </div>

      <div className="mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 @min-[36rem]:grid-cols-4 dark:border-white/10 dark:bg-white/10">
        {REASONS.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(filter === r ? 'all' : r)}
            className={`min-w-0 px-3 py-3 text-left transition-colors sm:px-4 ${
              filter === r ? 'bg-violet-50 dark:bg-[#302647]' : 'bg-white hover:bg-slate-50 dark:bg-[#1a1730] dark:hover:bg-[#221f39]'
            }`}
          >
            <span className="font-display block text-2xl font-light leading-none text-slate-900 tabular-nums dark:text-white">
              {counts[r]}
            </span>
            <span className="mt-1 block text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {r} <span className="normal-case">open</span>
            </span>
          </button>
        ))}
      </div>

      <form
        onSubmit={submit}
        className={`mb-5 rounded-xl border border-dashed border-slate-200 p-3 sm:p-4 dark:border-white/10 ${
          connected ? '' : 'pointer-events-none opacity-40'
        }`}
      >
        <div className="grid grid-cols-1 gap-3 @min-[24rem]:grid-cols-2 @min-[42rem]:grid-cols-4">
          <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="min-h-10 w-full min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-base sm:text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Section
            <select
              value={form.section}
              onChange={(e) => setForm((f) => ({ ...f, section: e.target.value as ErrorSection }))}
              className="min-h-10 w-full min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-base sm:text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            >
              {SECTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Topic
            <input
              type="text"
              placeholder="e.g. Rates & Work"
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              className="min-h-10 w-full min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-base sm:text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Reason
            <select
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value as ErrorReason }))}
              className="min-h-10 w-full min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-base sm:text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            >
              {REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 @min-[24rem]:col-span-2">
            Question / source
            <input
              type="text"
              placeholder="e.g. OG Quant Review #114"
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="min-h-10 w-full min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-base sm:text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Redo date <span className="font-normal text-slate-400">(blank = in {FIRST_REDO_DAYS} days)</span>
            <input
              type="date"
              value={form.redoDate}
              onChange={(e) => setForm((f) => ({ ...f, redoDate: e.target.value }))}
              className="min-h-10 w-full min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-base sm:text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 col-span-full">
            Notes — why you missed it
            <input
              type="text"
              placeholder="e.g. misread 'least' as 'greatest'"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="min-h-10 w-full min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-base sm:text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!connected}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} /> Add entry
        </button>
      </form>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400 dark:border-white/10 dark:text-slate-500">
          <FileSpreadsheet className="h-6 w-6" strokeWidth={1.5} />
          {entries.length ? 'No entries match these filters.' : connected ? 'No entries yet — log your first miss above.' : 'Connect a file above to start logging.'}
        </div>
      ) : (
        <>
          <ul className="grid gap-2 @min-[42rem]:hidden">
            {visible.map((entry) => (
              <li
                key={entry.id}
                className={`min-w-0 rounded-lg border border-slate-200 p-3 text-sm dark:border-white/10 ${entry.resolved ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-wrap gap-1.5">
                  <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${SECTION_STYLE[entry.section]}`}>{entry.section}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${REASON_STYLE[entry.reason]}`}>{entry.reason}</span>
                </div>
                <p className="mt-2 wrap-anywhere font-medium text-slate-800 dark:text-slate-100">{entry.question}</p>
                <p className="wrap-anywhere text-xs text-slate-500 dark:text-slate-400">{entry.topic}</p>
                {entry.notes && <p className="mt-1 wrap-anywhere text-xs text-slate-500 dark:text-slate-400">{entry.notes}</p>}
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>Logged {entry.date}</span>
                  {entry.redoDate && <span>Redo {entry.redoDate}</span>}
                </div>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-x-2">
                  <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={entry.resolved}
                      onChange={(event) => onUpdate(entry.id, { resolved: event.target.checked })}
                      className="h-4 w-4 accent-violet-600"
                    />
                    Done
                  </label>
                  <button
                    type="button"
                    onClick={() => onRemove(entry.id)}
                    aria-label="Delete entry"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-x-auto @min-[42rem]:block">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:border-white/10 dark:text-slate-500">
                  <th className="py-2 pr-3">Date</th>
                  <th className="py-2 pr-3">Section / Topic</th>
                  <th className="py-2 pr-3">Question</th>
                  <th className="py-2 pr-3">Reason</th>
                  <th className="py-2 pr-3">Redo</th>
                  <th className="py-2 pr-3">Done</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {visible.map((e) => (
                  <tr
                    key={e.id}
                    className={`border-b border-slate-100 last:border-0 dark:border-white/5 ${
                      e.resolved ? 'opacity-50' : ''
                    }`}
                  >
                    <td className="py-2 pr-3 whitespace-nowrap text-slate-500 dark:text-slate-400">{e.date}</td>
                    <td className="py-2 pr-3">
                      <div className="font-medium text-slate-800 dark:text-slate-100">{e.topic}</div>
                      <span className={`mt-0.5 inline-block rounded px-1.5 py-px text-[11px] font-medium ${SECTION_STYLE[e.section]}`}>
                        {e.section}
                      </span>
                    </td>
                    <td className="max-w-[260px] wrap-anywhere py-2 pr-3">
                      <div className="text-slate-700 dark:text-slate-200">{e.question}</div>
                      {e.notes && <div className="text-xs text-slate-400 dark:text-slate-500">{e.notes}</div>}
                    </td>
                    <td className="py-2 pr-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${REASON_STYLE[e.reason]}`}>
                        {e.reason}
                      </span>
                    </td>
                    <td className="py-2 pr-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                      {e.redoDate || '—'}
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        type="checkbox"
                        aria-label="Done"
                        checked={e.resolved}
                        onChange={(ev) => onUpdate(e.id, { resolved: ev.target.checked })}
                        className="h-4 w-4 accent-violet-600 cursor-pointer"
                      />
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => onRemove(e.id)}
                        aria-label="Delete entry"
                        className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}
