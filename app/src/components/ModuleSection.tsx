import { forwardRef } from 'react'
import type { Module, ProgressState } from '../types'
import { LessonRow } from './LessonRow'
import { QuizBlock } from './QuizBlock'
import { ProgressBar } from './ProgressBar'
import { Lightbulb, MapPin } from '../lib/icons'

interface Props {
  module: Module
  progress: ProgressState
  connected: boolean
  onToggleLesson: (id: string, checked: boolean) => void
  onQuizComplete: (id: string, result: { passed: boolean; score: number }) => void
}

export const ModuleSection = forwardRef<HTMLDivElement, Props>(function ModuleSection(
  { module, progress, connected, onToggleLesson, onQuizComplete },
  ref,
) {
  const total = module.lessons.length + (module.quiz ? 1 : 0)
  const doneLessons = module.lessons.filter((l) => progress.lessons[l.id]).length
  const quizDone = module.quiz && progress.quizzes[module.quiz.id]?.passed ? 1 : 0
  const pct = total ? Math.round(((doneLessons + quizDone) / total) * 100) : 0

  return (
    <section
      ref={ref}
      id={module.id}
      className="scroll-mt-6 rounded-xl border border-violet-100 bg-white p-6 dark:border-white/10 dark:bg-[#1a1730]"
    >
      <div className="mb-1 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-baseline gap-3.5">
          <span className="font-display text-4xl font-light leading-none text-violet-200 tabular-nums dark:text-violet-900">
            {String(module.num).padStart(2, '0')}
          </span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
              Module
            </div>
            <h2 className="font-display mt-0.5 text-xl font-medium text-slate-900 dark:text-white">{module.title}</h2>
          </div>
        </div>
        <div className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">{module.dates}</div>
      </div>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{module.blurb}</p>
      <div className="mb-4">
        <ProgressBar pct={pct} />
      </div>

      <div>
        {module.lessons.map((lesson) => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            checked={!!progress.lessons[lesson.id]}
            disabled={!connected}
            onToggle={(checked) => onToggleLesson(lesson.id, checked)}
          />
        ))}
      </div>

      {module.checkpoint && (
        <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50 px-3.5 py-2.5 text-sm text-slate-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-slate-200">
          <MapPin className="mr-1 inline h-3.5 w-3.5 -translate-y-px" strokeWidth={2} /> <strong>Checkpoint:</strong> {module.checkpoint}
        </div>
      )}

      {module.insights && module.insights.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 dark:border-amber-500/30 dark:bg-amber-500/10">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
            <Lightbulb className="h-3.5 w-3.5" strokeWidth={2} /> Strategy Insights
          </div>
          <ul className="space-y-2">
            {module.insights.map((insight, i) => (
              <li key={i} className="text-sm text-slate-700 dark:text-slate-200">
                {insight.text}
                {insight.source && (
                  <>
                    {' '}
                    <a
                      href={insight.source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-violet-600 hover:underline dark:text-violet-400"
                    >
                      ({insight.source.label})
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {module.quiz && (
        <QuizBlock
          quiz={module.quiz}
          saved={progress.quizzes[module.quiz.id]}
          disabled={!connected}
          onComplete={(result) => onQuizComplete(module.quiz!.id, result)}
        />
      )}
    </section>
  )
})
