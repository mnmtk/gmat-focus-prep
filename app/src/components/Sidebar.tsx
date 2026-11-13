import type { Module, ProgressState } from '../types'
import { Check } from '../lib/icons'

export type View = 'course' | 'timer' | 'remember' | 'error-log' | 'schools' | 'resources'

interface Props {
  modules: Module[]
  progress: ProgressState
  view: View
  openModuleId: string
  onNavigate: (target: string) => void
}

function moduleCompletion(module: Module, progress: ProgressState) {
  const total = module.lessons.length + (module.quiz ? 1 : 0)
  const doneLessons = module.lessons.filter((l) => progress.lessons[l.id]).length
  const quizDone = module.quiz && progress.quizzes[module.quiz.id]?.passed ? 1 : 0
  return total ? Math.round(((doneLessons + quizDone) / total) * 100) : 0
}

function NavRow({
  target,
  active,
  complete,
  mark,
  title,
  sub,
  onNavigate,
}: {
  target: string
  active: boolean
  complete: boolean
  mark: string
  title: string
  sub?: string
  onNavigate: (target: string) => void
}) {
  return (
    <a
      href={`#${target}`}
      onClick={(e) => {
        e.preventDefault()
        onNavigate(target)
      }}
      aria-current={active ? 'page' : undefined}
      className={`flex items-baseline gap-3 border-l-2 px-3 py-2 transition-colors ${
        active
          ? 'border-violet-600 bg-violet-50/70 dark:border-violet-400 dark:bg-violet-500/10'
          : 'border-transparent hover:bg-violet-50/40 dark:hover:bg-white/5'
      }`}
    >
      <span
        className={`font-display w-6 flex-shrink-0 text-right text-base leading-none font-light tabular-nums ${
          complete
            ? 'text-emerald-500'
            : active
              ? 'text-violet-600 dark:text-violet-400'
              : 'text-slate-300 dark:text-slate-600'
        }`}
      >
        {mark}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span
            className={`block text-[0.85rem] font-medium ${
              complete ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {title}
          </span>
          {complete && <Check className="h-3 w-3 flex-shrink-0 text-emerald-500" strokeWidth={3} />}
        </span>
        {sub && <span className="block text-xs text-slate-400 dark:text-slate-500">{sub}</span>}
      </span>
    </a>
  )
}

const TOOLS: { target: View; title: string }[] = [
  { target: 'timer', title: 'Timer' },
  { target: 'remember', title: 'Remember' },
  { target: 'error-log', title: 'Error Log' },
  { target: 'schools', title: 'Target Schools' },
  { target: 'resources', title: 'Resources' },
]

export function Sidebar({ modules, progress, view, openModuleId, onNavigate }: Props) {
  return (
    <>
      <nav aria-label="Study navigation" className="rounded-xl border border-violet-100 bg-white p-3 dark:border-white/10 dark:bg-[#1a1730] lg:hidden">
        <label htmlFor="course-module" className="sr-only">Jump to course module</label>
        <select
          id="course-module"
          value=""
          onChange={(event) => onNavigate(event.target.value)}
          className="min-h-11 w-full min-w-0 rounded-lg border border-violet-100 bg-white px-2.5 text-sm font-medium text-slate-800 dark:border-white/15 dark:bg-[#1a1730] dark:text-slate-100"
        >
          <option value="" disabled>Jump to course module</option>
          <option value="course">Course overview</option>
          {modules.map((module) => <option key={module.id} value={module.id}>{module.num}. {module.title}</option>)}
        </select>
        <div className="mt-2 grid grid-cols-2 gap-1.5 min-[360px]:grid-cols-3 sm:grid-cols-5">
          {TOOLS.map(({ target, title }) => (
            <a
              key={target}
              href={`#${target}`}
              aria-current={view === target ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(target)
              }}
              className={`flex min-h-11 items-center justify-center rounded-lg px-1.5 text-center text-xs font-medium ${
                view === target
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-violet-50 dark:bg-white/5 dark:text-slate-200'
              }`}
            >
              {title}
            </a>
          ))}
        </div>
      </nav>

      <nav aria-label="Study navigation" className="sticky top-6 hidden max-h-[calc(100dvh-3rem)] flex-col self-start overflow-y-auto lg:flex rounded-xl border border-violet-100 bg-white py-2 dark:border-white/10 dark:bg-[#1a1730]">
        <div className="px-4 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Course
        </div>
        {modules.map((m) => (
          <NavRow
            key={m.id}
            target={m.id}
            active={view === 'course' && openModuleId === m.id}
            complete={moduleCompletion(m, progress) >= 100}
            mark={String(m.num).padStart(2, '0')}
            title={m.title}
            sub={m.dates}
            onNavigate={onNavigate}
          />
        ))}

        <div className="mx-4 my-2 border-t border-slate-100 dark:border-white/10" />
        <div className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Tools
        </div>
        {TOOLS.map((t) => (
          <NavRow
            key={t.target}
            target={t.target}
            active={view === t.target}
            complete={false}
            mark="–"
            title={t.title}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </>
  )
}
