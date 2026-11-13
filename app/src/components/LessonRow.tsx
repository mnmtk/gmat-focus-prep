import type { Lesson, LessonTag } from '../types'
import { LessonIcon } from '../lib/icons'

const TAG_DOT: Record<LessonTag, string> = {
  setup: 'bg-slate-400 dark:bg-slate-500',
  reading: 'bg-sky-500 dark:bg-sky-400',
  drill: 'bg-amber-500 dark:bg-amber-400',
  mock: 'bg-rose-500 dark:bg-rose-400',
  maintenance: 'bg-slate-300 dark:bg-slate-600',
}

interface Props {
  lesson: Lesson
  checked: boolean
  disabled?: boolean
  onToggle: (checked: boolean) => void
}

export function LessonRow({ lesson, checked, disabled, onToggle }: Props) {
  return (
    <div className={`flex items-start gap-2 py-2.5 sm:gap-3 border-b border-slate-100 last:border-0 dark:border-white/5 ${disabled ? 'opacity-50' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onToggle(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-violet-600 cursor-pointer flex-shrink-0 disabled:cursor-not-allowed"
      />
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-violet-500 dark:text-violet-400">
        <LessonIcon name={lesson.icon} className="h-4 w-4" />
      </span>
      <div className={`min-w-0 flex-1 wrap-anywhere text-sm ${checked ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
        {lesson.body}
        <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          <span className={`h-1.5 w-1.5 rounded-full ${TAG_DOT[lesson.tag]}`} />
          {lesson.tag}
        </span>
        {lesson.link && (
          <a href={lesson.link.href} className="ml-2 text-xs font-medium text-violet-600 hover:underline dark:text-violet-400">
            ({lesson.link.label})
          </a>
        )}
        {lesson.links?.map((l) => (
          <a key={l.href} href={l.href} className="ml-2 text-xs font-medium text-violet-600 hover:underline dark:text-violet-400">
            ({l.label})
          </a>
        ))}
      </div>
    </div>
  )
}
