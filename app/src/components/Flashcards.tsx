import { useId, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { FLASHCARD_CATEGORIES, type Flashcard, type FlashcardCategory } from '../data/flashcards'

function SourceTag({ card }: { card: Flashcard }) {
  return card.source === 'error-log' ? (
    <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">From error log</span>
  ) : null
}

function FlashcardTile({ card }: { card: Flashcard }) {
  const id = useId()
  const [revealed, setRevealed] = useState(false)

  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        aria-haspopup="dialog"
        className="group flex aspect-square min-w-0 flex-col items-start justify-between rounded-xl border border-outline p-4 text-left transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:p-5 dark:border-white/10 dark:hover:bg-white/5"
      >
        <span className="flex w-full items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-400">
          {card.category}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
        </span>
        <span className="my-3 text-base font-medium leading-snug text-slate-900 dark:text-slate-100">{card.title}</span>
        <span className="min-h-5"><SourceTag card={card} /></span>
      </button>

      <div
        id={id}
        popover="auto"
        role="dialog"
        aria-labelledby={`${id}-title`}
        onToggle={event => { if (event.newState === 'closed') setRevealed(false) }}
        className="fixed inset-0 m-auto aspect-square max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-outline bg-surface p-5 text-slate-800 shadow-2xl backdrop:bg-slate-950/30 sm:p-7 dark:border-white/15 dark:bg-[#1a1730] dark:text-slate-100"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <span>{card.category}</span>
            <SourceTag card={card} />
          </div>
          <button type="button" popoverTarget={id} popoverTargetAction="hide" aria-label="Close flashcard" className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-slate-300 dark:hover:bg-white/10">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <h3 id={`${id}-title`} className="font-display mt-3 text-2xl font-medium leading-tight text-slate-900 dark:text-white">{card.title}</h3>
        <p className="mt-4 text-sm leading-relaxed">{card.tip}</p>
        <div className="mt-5 border-t border-outline pt-4 dark:border-white/10">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Example</p>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{card.example}</p>
        </div>
        <button type="button" onClick={() => setRevealed(value => !value)} aria-expanded={revealed} aria-controls={`${id}-answer`} className="mt-3 min-h-11 rounded-lg py-2 text-sm font-semibold text-violet-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-violet-300">
          {revealed ? 'Hide answer' : 'Reveal answer'}
        </button>
        <p id={`${id}-answer`} hidden={!revealed} className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{card.answer}</p>
      </div>
    </>
  )
}

export function Flashcards({ cards, connected }: { cards: Flashcard[]; connected: boolean }) {
  const [category, setCategory] = useState<FlashcardCategory | 'All'>('All')
  const visible = category === 'All' ? cards : cards.filter(card => card.category === category)

  return (
    <section id="flashcards" className="scroll-mt-6 rounded-xl border border-outline bg-surface p-4 sm:p-6 dark:border-white/10 dark:bg-[#1a1730]">
      <h2 className="font-display text-xl font-medium text-slate-900 dark:text-white">Flashcards</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Pick a card. One tip, one example.</p>
      <div className="my-4 flex flex-wrap gap-2" role="group" aria-label="Filter flashcards">
        {(['All', ...FLASHCARD_CATEGORIES] as const).map(item => (
          <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 rounded-full px-3 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${category === item ? 'bg-violet-600 text-white dark:bg-violet-500' : 'text-slate-700 hover:bg-surface-muted dark:text-slate-300 dark:hover:bg-white/10'}`}>
            {item}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {visible.map(card => <FlashcardTile key={`${category}-${card.id}`} card={card} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-outline p-6 text-sm text-slate-600 dark:border-white/15 dark:text-slate-300">
          {!connected ? 'Connect your workbook above to load flashcards.' : cards.length ? 'No flashcards in this category.' : 'Add cards to the Flashcards sheet, then reconnect to load them.'}
        </p>
      )}
    </section>
  )
}
