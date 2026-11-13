import { useEffect, useState } from 'react'
import { Clock, Pause, Play, RotateCcw, SkipForward } from '../lib/icons'

interface Preset {
  id: string
  label: string
  questions: number
  minutes: number
}

const PRESETS: Preset[] = [
  { id: 'quant', label: 'Quant section', questions: 21, minutes: 45 },
  { id: 'verbal', label: 'Verbal section', questions: 23, minutes: 45 },
  { id: 'di', label: 'Data Insights section', questions: 20, minutes: 45 },
  { id: 'drill', label: 'Daily OG drill', questions: 8, minutes: 16 },
]

const HARD_CAP_S = 180 // bookmark-and-move rule

function fmt(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

type Tone = 'idle' | 'ok' | 'warn' | 'bad'

const TONE: Record<Tone, string> = {
  idle: 'stroke-slate-300 dark:stroke-white/20',
  ok: 'stroke-violet-500',
  warn: 'stroke-amber-500',
  bad: 'stroke-rose-500',
}

function sectionLabels(minutes: number) {
  const parts = minutes % 3 === 0 ? 3 : 4
  return Array.from({ length: parts - 1 }, (_, k) => k + 1).map((i) => ({ at: i / parts, text: `${Math.round((minutes * i) / parts)}m` }))
}

/** Analog dial: the hand and the coloured arc show how much of the dial's time has gone. */
function ClockFace({
  fraction,
  tone,
  marker,
  labels,
}: {
  fraction: number
  tone: Tone
  marker?: number
  labels: { at: number; text: string }[]
}) {
  const f = Math.max(0, Math.min(1, fraction))
  const arcR = 78
  const circ = 2 * Math.PI * arcR
  const point = (at: number, r: number) => {
    const a = at * 2 * Math.PI - Math.PI / 2
    return { x: 100 + r * Math.cos(a), y: 100 + r * Math.sin(a) }
  }
  const hand = point(f, 64)
  return (
    <svg viewBox="0 0 200 200" className="my-3 aspect-square w-44 max-w-full sm:w-52" role="img" aria-hidden="true">
      <circle cx="100" cy="100" r="94" className="fill-white stroke-slate-200 dark:fill-white/5 dark:stroke-white/10" strokeWidth="2" />
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0
        const o = point(i / 60, 90)
        const n = point(i / 60, major ? 82 : 86)
        return (
          <line
            key={i}
            x1={o.x}
            y1={o.y}
            x2={n.x}
            y2={n.y}
            strokeWidth={major ? 2 : 1}
            className="stroke-slate-300 dark:stroke-white/25"
          />
        )
      })}
      <circle
        cx="100"
        cy="100"
        r={arcR}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${f * circ} ${circ}`}
        transform="rotate(-90 100 100)"
        className={`${TONE[tone]} opacity-40`}
      />
      {marker !== undefined && (() => {
        const o = point(marker, 94)
        const n = point(marker, 72)
        return <line x1={o.x} y1={o.y} x2={n.x} y2={n.y} strokeWidth="3" className="stroke-amber-500" />
      })()}
      {labels.map((l) => {
        const p = point(l.at, 62)
        return (
          <text
            key={l.text}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-slate-400 text-[11px] dark:fill-slate-500"
          >
            {l.text}
          </text>
        )
      })}
      <line x1="100" y1="100" x2={hand.x} y2={hand.y} strokeWidth="4" strokeLinecap="round" className={tone === 'idle' ? 'stroke-slate-700 dark:stroke-slate-200' : TONE[tone]} />
      <circle cx="100" cy="100" r="6" className="fill-slate-800 dark:fill-white" />
    </svg>
  )
}

export function Timer({ active, onOpen }: { active: boolean; onOpen: () => void }) {
  const [preset, setPreset] = useState<Preset>(PRESETS[0])
  const [custom, setCustom] = useState({ questions: 10, minutes: 20 })
  // Elapsed time is tracked as banked ms + the run that started at runStart, so the clock
  // stays accurate even if the browser throttles the interval in a background tab.
  const [banked, setBanked] = useState(0)
  const [runStart, setRunStart] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const [laps, setLaps] = useState<number[]>([]) // seconds per finished question

  const running = runStart !== null
  const total = preset.minutes * 60
  // Clamp at time-up so the clock freezes at 0:00 without needing to stop it from an effect.
  const elapsed = Math.min(total, (banked + (running ? now - runStart : 0)) / 1000)
  const remaining = total - elapsed
  const finished = laps.length >= preset.questions || remaining <= 0
  const ticking = running && !finished
  const lapped = laps.reduce((a, b) => a + b, 0)
  const onQuestion = elapsed - lapped
  const target = total / preset.questions
  const started = elapsed > 0
  // Positive = ahead of pace, in questions.
  const paceDelta = laps.length - elapsed / target

  useEffect(() => {
    if (!ticking) return
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [ticking])

  function pause() {
    if (runStart === null) return
    setBanked((b) => b + Date.now() - runStart)
    setRunStart(null)
  }

  function start() {
    if (finished) return
    const t = Date.now()
    setNow(t)
    setRunStart(t)
  }

  function next() {
    if (!started || finished) return
    setLaps((l) => [...l, onQuestion])
    if (laps.length + 1 >= preset.questions) pause()
  }

  function reset() {
    setBanked(0)
    setRunStart(null)
    setLaps([])
  }

  function choose(p: Preset) {
    reset()
    setPreset(p)
  }

  useEffect(() => {
    if (!active) return
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return
      if (e.code === 'Space') {
        e.preventDefault()
        if (ticking) next()
        else start()
      } else if (e.key === 'p' || e.key === 'P') {
        if (ticking) pause()
        else start()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const qState = onQuestion >= HARD_CAP_S ? 'cap' : onQuestion >= target ? 'slow' : 'ok'

  if (!active) {
    if (!started || finished) return null
    return (
      <button
        onClick={onOpen}
        className="fixed right-4 z-20 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg tabular-nums hover:bg-slate-800 dark:bg-violet-500 dark:hover:bg-violet-600"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <Clock className="h-4 w-4" strokeWidth={2} />
        {fmt(remaining)} · Q{Math.min(laps.length + 1, preset.questions)} {fmt(onQuestion)}
        {!ticking && <span className="text-xs opacity-70">paused</span>}
      </button>
    )
  }

  const slowest = laps.length ? Math.max(...laps) : 0

  return (
    <section className="rounded-xl border border-violet-100 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-[#1a1730]">
      <div className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">Timer</div>
      <h2 className="font-display mt-0.5 text-xl font-medium text-slate-900 dark:text-white">Pace every question</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Hit <kbd className="rounded border border-slate-300 px-1 text-xs dark:border-white/20">Space</kbd> each time you
        answer, <kbd className="rounded border border-slate-300 px-1 text-xs dark:border-white/20">P</kbd> to pause. It
        keeps running if you switch pages.
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => choose(p)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              preset.id === p.id
                ? 'bg-violet-600 text-white dark:bg-violet-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
            }`}
          >
            {p.label} <span className="opacity-70">{p.questions}Q · {p.minutes}m</span>
          </button>
        ))}
        <span className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-lg bg-slate-100 py-1 pl-3 pr-1 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">
          Custom
          <input
            type="number"
            min={1}
            value={custom.questions}
            onChange={(e) => setCustom((c) => ({ ...c, questions: Number(e.target.value) }))}
            className="w-12 rounded border border-slate-200 bg-white px-1 text-center dark:border-white/15 dark:bg-white/5"
            aria-label="Custom number of questions"
          />
          Q
          <input
            type="number"
            min={1}
            value={custom.minutes}
            onChange={(e) => setCustom((c) => ({ ...c, minutes: Number(e.target.value) }))}
            className="w-12 rounded border border-slate-200 bg-white px-1 text-center dark:border-white/15 dark:bg-white/5"
            aria-label="Custom minutes"
          />
          m
          <button
            onClick={() =>
              custom.questions > 0 && custom.minutes > 0 && choose({ id: 'custom', label: 'Custom', ...custom })
            }
            className={`rounded-full px-2 py-0.5 font-medium ${
              preset.id === 'custom' ? 'bg-violet-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Use
          </button>
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col items-center text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Section · time left</div>
          <ClockFace
            fraction={elapsed / total}
            tone={remaining <= 0 ? 'bad' : remaining < 300 ? 'warn' : started ? 'ok' : 'idle'}
            labels={sectionLabels(preset.minutes)}
          />
          <div
            className={`font-display text-4xl font-light leading-none sm:text-5xl tabular-nums ${
              remaining <= 0 ? 'text-rose-600' : remaining < 300 ? 'text-amber-600' : 'text-slate-900 dark:text-white'
            }`}
          >
            {fmt(remaining)}
          </div>
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {finished
              ? remaining <= 0
                ? `Time. ${laps.length} of ${preset.questions} answered — on the real test, never leave blanks.`
                : `Done: ${preset.questions} questions with ${fmt(remaining)} to spare.`
              : started
                ? paceDelta >= 0
                  ? `On pace · ${paceDelta.toFixed(1)} Qs ahead`
                  : `Behind pace · ${(-paceDelta).toFixed(1)} Qs behind`
                : `${preset.questions} questions · ${preset.minutes} min`}
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-center text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Question {Math.min(laps.length + 1, preset.questions)} of {preset.questions}
          </div>
          <ClockFace
            fraction={finished ? 0 : Math.min(onQuestion / HARD_CAP_S, 1)}
            tone={finished || !started ? 'idle' : qState === 'cap' ? 'bad' : qState === 'slow' ? 'warn' : 'ok'}
            marker={target < HARD_CAP_S ? target / HARD_CAP_S : undefined}
            labels={[
              { at: 1 / 3, text: '1m' },
              { at: 2 / 3, text: '2m' },
            ]}
          />
          <div className="font-display text-4xl font-light leading-none sm:text-5xl tabular-nums text-slate-900 dark:text-white">
            {fmt(finished ? 0 : onQuestion)}
          </div>
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {qState === 'cap' && !finished ? (
              <strong className="text-rose-700 dark:text-rose-400">3 min — bookmark, best guess, move on</strong>
            ) : qState === 'slow' && !finished ? (
              <span className="text-amber-700 dark:text-amber-400">Past target {fmt(target)} — start wrapping up</span>
            ) : (
              `Target ${fmt(target)} (the notch) · full circle = 3 min cap`
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {ticking ? (
          <button onClick={pause} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white/10 dark:hover:bg-white/15">
            <Pause className="h-4 w-4" strokeWidth={2} /> Pause
          </button>
        ) : (
          <button
            onClick={start}
            disabled={finished}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 dark:bg-violet-500 dark:hover:bg-violet-600"
          >
            <Play className="h-4 w-4" strokeWidth={2} /> {started ? 'Resume' : 'Start'}
          </button>
        )}
        <button
          onClick={next}
          disabled={!ticking}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
        >
          <SkipForward className="h-4 w-4" strokeWidth={2} /> Next question
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} /> Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Per question <span className="font-normal normal-case">— log the red ones as timing errors</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {laps.map((s, i) => (
              <span
                key={i}
                title={s === slowest ? 'Slowest' : undefined}
                className={`rounded px-2 py-1 text-xs tabular-nums ${
                  s >= HARD_CAP_S
                    ? 'bg-rose-50 font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    : s >= target
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                Q{i + 1} {fmt(s)}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
