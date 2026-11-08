import type { Module, ProgressState } from '../types'
import { Check } from '../lib/icons'

interface Props {
  modules: Module[]
  progress: ProgressState
  activeId: string
}

function moduleCompletion(module: Module, progress: ProgressState) {
  const total = module.lessons.length + (module.quiz ? 1 : 0)
  const doneLessons = module.lessons.filter((l) => progress.lessons[l.id]).length
  const quizDone = module.quiz && progress.quizzes[module.quiz.id]?.passed ? 1 : 0
  return total ? Math.round(((doneLessons + quizDone) / total) * 100) : 0
}

function NavRow({
  href,
  active,
  complete,
  mark,
  title,
  sub,
}: {
  href: string
  active: boolean
  complete: boolean
  mark: string
  title: string
  sub: string
}) {
  return (
    <a
      href={href}
      className={`flex items-baseline gap-3 border-l-2 px-3 py-2.5 transition-colors ${
        active
          ? 'border-violet-600 bg-violet-50/70 dark:border-violet-400 dark:bg-violet-500/10'
          : 'border-transparent hover:bg-violet-50/40 dark:hover:bg-white/5'
      }`}
    >
      <span
        className={`font-display w-7 flex-shrink-0 text-right text-lg leading-none font-light tabular-nums ${
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
              complete ? 'text-slate-400 line-through decoration-slate-300 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {title}
          </span>
          {complete && <Check className="h-3 w-3 flex-shrink-0 text-emerald-500" strokeWidth={3} />}
        </span>
        <span className="block text-xs text-slate-400 dark:text-slate-500">{sub}</span>
      </span>
    </a>
  )
}

export function Sidebar({ modules, progress, activeId }: Props) {
  return (
    <nav className="sticky top-6 flex flex-col gap-0.5 rounded-xl border border-violet-100 bg-white py-2 dark:border-white/10 dark:bg-[#1a1730]">
      {modules.map((m) => (
        <NavRow
          key={m.id}
          href={`#${m.id}`}
          active={activeId === m.id}
          complete={moduleCompletion(m, progress) >= 100}
          mark={String(m.num).padStart(2, '0')}
          title={m.title}
          sub={m.dates}
        />
      ))}
      <NavRow
        href="#error-log"
        active={activeId === 'error-log'}
        complete={false}
        mark="–"
        title="Error Log"
        sub="Track every miss"
      />
      <NavRow href="#m7" active={activeId === 'm7'} complete={false} mark="–" title="Resource Library" sub="Reference" />
    </nav>
  )
}
