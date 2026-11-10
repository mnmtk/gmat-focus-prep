import { baseline, SCORE_TARGET, SECTION_MAX } from '../data/baseline'
import { ProgressBar } from './ProgressBar'
import { Target, Gauge } from '../lib/icons'

const SECTION_MIN = 60
const TOTAL_MIN = 205
const TOTAL_MAX = 805

function sectionPct(score: number) {
  return Math.round(((score - SECTION_MIN) / (SECTION_MAX - SECTION_MIN)) * 100)
}

function SectionRow({ label, score, percentile }: { label: string; score: number; percentile: number }) {
  const gap = SECTION_MAX - score
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="text-slate-500 dark:text-slate-400">
          <span className="font-display font-medium text-slate-800 dark:text-slate-100">{score}</span>/{SECTION_MAX} ·{' '}
          {percentile}th pct · <span className="text-violet-600 dark:text-violet-400">{gap > 0 ? `+${gap} to max` : 'maxed'}</span>
        </span>
      </div>
      <ProgressBar pct={sectionPct(score)} />
    </div>
  )
}

export function ScoreTarget() {
  if (!baseline) {
    return (
      <section className="rounded-xl border border-violet-100 bg-white p-6 dark:border-white/10 dark:bg-[#1a1730]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
          <Target className="h-3.5 w-3.5" strokeWidth={2} /> Score Target
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Add your most recent GMAT™ Official Practice Exam score as <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-white/10">localBaseline</code> in{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-white/10">src/data/local.ts</code> to see baseline-vs-target here.
        </p>
      </section>
    )
  }

  const totalPct = Math.round(((baseline.total - TOTAL_MIN) / (TOTAL_MAX - TOTAL_MIN)) * 100)
  const totalGap = SCORE_TARGET - baseline.total

  return (
    <section className="rounded-xl border border-violet-100 bg-white p-6 dark:border-white/10 dark:bg-[#1a1730]">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
        <Target className="h-3.5 w-3.5" strokeWidth={2} /> Score Target
      </div>

      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-3xl font-medium text-slate-900 dark:text-white">{baseline.total}</span>
        <span className="text-slate-400 dark:text-slate-500">→</span>
        <span className="font-display text-3xl font-medium text-violet-600 dark:text-violet-400">{SCORE_TARGET}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          baseline ({baseline.totalPercentile}th pct, {baseline.date}) → target · +{totalGap} points to close
        </span>
      </div>
      <div className="mt-2">
        <ProgressBar pct={totalPct} size="lg" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SectionRow label="Quant" score={baseline.quant} percentile={baseline.quantPercentile} />
        <SectionRow label="Verbal" score={baseline.verbal} percentile={baseline.verbalPercentile} />
        <SectionRow label="Data Insights" score={baseline.di} percentile={baseline.diPercentile} />
      </div>

      {baseline.note && (
        <div className="mt-4 flex items-start gap-1.5 rounded-md bg-violet-50/70 px-3 py-2 text-xs text-violet-800 dark:bg-violet-500/10 dark:text-violet-300">
          <Gauge className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />
          <span>{baseline.note}</span>
        </div>
      )}
    </section>
  )
}
