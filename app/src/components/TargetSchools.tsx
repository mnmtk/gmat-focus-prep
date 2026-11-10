import { targetSchools, ivyNoMba } from '../data/targetSchools'
import { Landmark, Trophy, Clock, Users, ListChecks, ExternalLink, AlertTriangle } from '../lib/icons'
import type { TargetSchool } from '../types'

const timeline = [
  { when: 'Dec 2026', what: 'Sit the GMAT Focus Edition. Compare the score against each program’s class profile before deciding to retake.' },
  { when: 'Jan – Feb 2027', what: 'If retaking, sit again (3-day minimum gap). Lock the 6-school list and rounds. Rewrite the resume around quantified impact. Brief recommenders now — give them 2+ months.' },
  { when: 'Mar – May 2027', what: 'Draft essays. Reuse one strong personal narrative; customize only the "why this school" sections. Attend admissions events. Visit campus where fit matters most (Tuck, Johnson, Yale SOM).' },
  { when: 'Jun – Jul 2027', what: 'Finalize recommender submissions. Mock-interview each format: HBS behavioral, Wharton Team-Based Discussion, Yale/Tuck fit interviews.' },
  { when: 'Aug – Sep 2027', what: 'Submit Round 1 for the 2027–28 cycle. Exact dates publish ~June 2027 — re-check each school’s page; this plan assumes the same month-level pattern as 2026–27.' },
  { when: 'Oct – Dec 2027', what: 'Interviews, then decisions.' },
]

function SchoolCard({ school }: { school: TargetSchool }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <Landmark className="h-4 w-4 flex-shrink-0 text-violet-500" strokeWidth={2} />
          <h3 className="font-display text-base font-medium text-slate-900 dark:text-white">{school.name}</h3>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">{school.city}</span>
      </div>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{school.program}</p>

      <div className="mt-2.5 flex items-start gap-1.5 rounded-md bg-violet-50/70 px-2.5 py-1.5 text-xs text-violet-800 dark:bg-violet-500/10 dark:text-violet-300">
        <Trophy className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />
        <span>{school.profile}</span>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} /> Deadlines — 2026–27 cycle
        </div>
        <p className="mb-1.5 text-xs text-amber-700 dark:text-amber-400">{school.cycleNote}</p>
        <div className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-3">
          {school.deadlines.map((d) => (
            <div key={d.round} className="rounded-md bg-slate-50 px-2 py-1.5 dark:bg-white/5">
              <div className="font-medium text-slate-700 dark:text-slate-200">{d.round}</div>
              <div className="text-slate-500 dark:text-slate-400">{d.due}</div>
              {d.decision && d.decision !== '—' && (
                <div className="text-slate-400 dark:text-slate-500">decision {d.decision}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <Users className="h-3.5 w-3.5" strokeWidth={2} /> What they actually prefer
        </div>
        <ul className="list-disc space-y-0.5 pl-5 text-xs text-slate-600 dark:text-slate-300">
          {school.values.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <ListChecks className="h-3.5 w-3.5" strokeWidth={2} /> Work to do for this one
        </div>
        <ul className="list-disc space-y-0.5 pl-5 text-xs text-slate-600 dark:text-slate-300">
          {school.workToDo.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>

      <a
        href={school.officialLink.href}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:underline dark:text-violet-400"
      >
        {school.officialLink.label} <ExternalLink className="h-3 w-3" strokeWidth={2} />
      </a>
    </div>
  )
}

export function TargetSchools() {
  return (
    <section id="schools" className="scroll-mt-6 rounded-xl border border-violet-100 bg-white p-6 dark:border-white/10 dark:bg-[#1a1730]">
      <div className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">Target Schools</div>
      <h2 className="font-display mt-0.5 text-xl font-medium text-slate-900 dark:text-white">All six Ivy MBA programs</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Of the 8 Ivy League universities, only 6 run a full-time MBA — {ivyNoMba.join(' and ')} don't have one at all.
        Every one of the six is in play here; none are ruled out as reach schools.
      </p>

      <div className="mt-3 flex items-start gap-1.5 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />
        <span>
          Round 1 for the current (2026–27) cycle already closed in September. With a Dec 2026 GMAT, Round 2 of this
          cycle (Jan 5–6, 2027) is technically open but leaves only weeks for six schools' essays and
          recommendations — a real option, but a rushed one. The timeline below targets Round 1 of the next
          cycle (~Sep 2027, Fall 2028 entry) instead, which gives 9 months to do this properly without lowering the bar.
        </span>
      </div>

      <h3 className="font-display mt-5 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Work to be done — master timeline
      </h3>
      <ol className="mt-2 space-y-2.5">
        {timeline.map((t) => (
          <li key={t.when} className="flex gap-3 text-sm">
            <span className="font-display w-28 flex-shrink-0 text-right text-sm font-medium text-violet-600 dark:text-violet-400">
              {t.when}
            </span>
            <span className="text-slate-600 dark:text-slate-300">{t.what}</span>
          </li>
        ))}
      </ol>

      <h3 className="font-display mt-6 text-sm font-semibold text-slate-800 dark:text-slate-100">Per-school breakdown</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {targetSchools.map((s) => (
          <SchoolCard key={s.id} school={s} />
        ))}
      </div>
    </section>
  )
}
