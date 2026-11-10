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
    <nav className="sticky top-6 flex flex-col self-start rounded-xl border border-violet-100 bg-white py-2 dark:border-white/10 dark:bg-[#1a1730]">
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
  )
}
