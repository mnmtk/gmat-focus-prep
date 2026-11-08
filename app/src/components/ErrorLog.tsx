import { useState } from 'react'
import type { ErrorLogEntry, ErrorReason, ErrorSection } from '../types'
import { Plus, Trash2, FileSpreadsheet } from '../lib/icons'

interface Props {
  entries: ErrorLogEntry[]
  connected: boolean
  onAdd: (entry: Omit<ErrorLogEntry, 'id'>) => void
  onUpdate: (id: string, patch: Partial<ErrorLogEntry>) => void
  onRemove: (id: string) => void
}

const SECTIONS: ErrorSection[] = ['Quant', 'Verbal', 'Data Insights']
const REASONS: ErrorReason[] = ['Content gap', 'Careless error', 'Timing error']

const REASON_STYLE: Record<ErrorReason, string> = {
  'Content gap': 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  'Careless error': 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  'Timing error': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function emptyForm(): Omit<ErrorLogEntry, 'id'> {
  return {
    date: today(),
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

  const counts = REASONS.reduce<Record<ErrorReason, number>>(
    (acc, r) => ({ ...acc, [r]: entries.filter((e) => e.reason === r && !e.resolved).length }),
    { 'Content gap': 0, 'Careless error': 0, 'Timing error': 0 },
  )

  const visible = filter === 'all' ? entries : entries.filter((e) => e.reason === filter)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!connected || !form.question.trim() || !form.topic.trim()) return
    onAdd(form)
    setForm(emptyForm())
  }

  return (
    <section
      id="error-log"
      className="scroll-mt-6 rounded-xl border border-violet-100 bg-white p-6 dark:border-white/10 dark:bg-[#1a1730]"
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
        Tag every miss as content gap, careless error, or timing error — the fix is different for each.
        {connected
          ? " Every submit writes straight to your local .xlsx file — open it in Excel any time, it'll already be there."
          : ' Connect a file above to start logging.'}
      </p>

      <div className="mb-5 flex flex-wrap divide-x divide-slate-200 rounded-lg border border-slate-200 dark:divide-white/10 dark:border-white/10">
        {REASONS.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(filter === r ? 'all' : r)}
            className={`min-w-[140px] flex-1 px-4 py-3 text-left transition-colors ${
              filter === r ? 'bg-violet-50 dark:bg-violet-500/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'
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
        className={`mb-5 rounded-xl border border-dashed border-slate-200 p-4 dark:border-white/10 ${
          connected ? '' : 'pointer-events-none opacity-40'
        }`}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Section
            <select
              value={form.section}
              onChange={(e) => setForm((f) => ({ ...f, section: e.target.value as ErrorSection }))}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            >
              {SECTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Topic
            <input
              type="text"
              placeholder="e.g. Rates & Work"
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Reason
            <select
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value as ErrorReason }))}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            >
              {REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 sm:col-span-2 lg:col-span-2">
            Question / source
            <input
              type="text"
              placeholder="e.g. OG Quant Review #114"
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Redo date
            <input
              type="date"
              value={form.redoDate}
              onChange={(e) => setForm((f) => ({ ...f, redoDate: e.target.value }))}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 sm:col-span-2 lg:col-span-4">
            Notes — why you missed it
            <input
              type="text"
              placeholder="e.g. misread 'least' as 'greatest'"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
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

      {entries.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400 dark:border-white/10 dark:text-slate-500">
          <FileSpreadsheet className="h-6 w-6" strokeWidth={1.5} />
          {connected ? 'No entries yet — log your first miss above.' : 'Connect a file above to start logging.'}
        </div>
      ) : (
        <div className="overflow-x-auto">
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
                    <div className="text-xs text-slate-400 dark:text-slate-500">{e.section}</div>
                  </td>
                  <td className="py-2 pr-3 max-w-[260px]">
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
      )}
    </section>
  )
}
