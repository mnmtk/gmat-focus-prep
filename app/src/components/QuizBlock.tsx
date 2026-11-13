import { useEffect, useState } from 'react'
import type { Quiz, QuizResult } from '../types'
import { FlaskConical, CheckCircle2, XCircle } from '../lib/icons'

interface Props {
  quiz: Quiz
  saved?: QuizResult
  disabled?: boolean
  onComplete: (result: QuizResult) => void
}

export function QuizBlock({ quiz, saved, disabled, onComplete }: Props) {
  const [answers, setAnswers] = useState<number[]>(() => Array(quiz.questions.length).fill(-1))
  const [submitted, setSubmitted] = useState(!!saved)
  const [result, setResult] = useState<QuizResult | undefined>(saved)

  // `saved` arrives asynchronously once the connected file finishes loading — sync local state when it changes.
  useEffect(() => {
    setSubmitted(!!saved)
    setResult(saved)
    if (!saved) setAnswers(Array(quiz.questions.length).fill(-1))
  }, [saved, quiz.questions.length])

  function pick(qi: number, oi: number) {
    if (submitted || disabled) return
    setAnswers((prev) => prev.map((v, i) => (i === qi ? oi : v)))
  }

  function submit() {
    if (answers.some((a) => a === -1)) {
      alert('Answer every question first.')
      return
    }
    let score = 0
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++
    })
    const passed = score >= quiz.pass
    const res = { passed, score }
    setResult(res)
    setSubmitted(true)
    onComplete(res)
  }

  function retake() {
    setAnswers(Array(quiz.questions.length).fill(-1))
    setSubmitted(false)
    setResult(undefined)
  }

  return (
    <div className="mt-6 border-t border-dashed border-slate-200 pt-5 dark:border-white/10">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100">
        <FlaskConical className="h-4 w-4 text-violet-500 dark:text-violet-400" strokeWidth={2} /> Checkpoint Quiz — {quiz.title}
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        {quiz.questions.length} questions · pass at {quiz.pass}/{quiz.questions.length}
      </p>

      <div className="space-y-4">
        {quiz.questions.map((q, qi) => (
          <div key={qi}>
            <p className="mb-1.5 text-sm font-medium text-slate-800 dark:text-slate-100">
              {qi + 1}. {q.q}
            </p>
            <div className="space-y-1">
              {q.opts.map((opt, oi) => {
                let cls = 'text-slate-600 dark:text-slate-300'
                if (submitted) {
                  if (oi === q.correct) cls = 'text-emerald-600 font-semibold dark:text-emerald-400'
                  else if (oi === answers[qi]) cls = 'text-rose-600 font-semibold dark:text-rose-400'
                }
                return (
                  <label key={oi} className={`flex items-start gap-2 text-sm cursor-pointer py-0.5 ${cls}`}>
                    <input
                      type="radio"
                      name={`${quiz.id}-q${qi}`}
                      checked={answers[qi] === oi}
                      onChange={() => pick(qi, oi)}
                      disabled={submitted || disabled}
                      className="mt-0.5 accent-violet-600 disabled:cursor-not-allowed"
                    />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!submitted && (
          <button
            onClick={submit}
            disabled={disabled}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600"
          >
            Submit Quiz
          </button>
        )}
        {submitted && (
          <button
            onClick={retake}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Retake
          </button>
        )}
      </div>

      {result && (
        <div
          className={`mt-3 rounded-lg px-3 py-2 text-sm font-semibold ${
            result.passed
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
          }`}
        >
          <span className="inline-flex items-center gap-1.5">
            {result.passed ? <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> : <XCircle className="h-4 w-4" strokeWidth={2} />}
            {result.passed ? 'Passed' : 'Not yet'}
          </span>{' '}
          — {result.score}/{quiz.questions.length} (need {quiz.pass}/{quiz.questions.length})
        </div>
      )}
    </div>
  )
}
