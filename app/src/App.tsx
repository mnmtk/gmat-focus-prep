import { useEffect, useState } from 'react'
import { modules } from './data/curriculum'
import { useLocalDb } from './hooks/useLocalDb'
import { Sidebar, type View } from './components/Sidebar'
import { ModuleSection } from './components/ModuleSection'
import { ResourceAppendix } from './components/ResourceAppendix'
import { TargetSchools } from './components/TargetSchools'
import { ScoreTarget } from './components/ScoreTarget'
import { Remember } from './components/Remember'
import { ErrorLog } from './components/ErrorLog'
import { DueRedos } from './components/DueRedos'
import { Timer } from './components/Timer'
import { ConnectBar } from './components/ConnectBar'
import { ProgressBar } from './components/ProgressBar'
import type { Module, ProgressState } from './types'
import logo from './assets/logo.png'

const VIEWS: View[] = ['course', 'timer', 'remember', 'error-log', 'schools', 'resources']

function parseHash(): { view: View; moduleId?: string } {
  const h = window.location.hash.slice(1)
  if ((VIEWS as string[]).includes(h)) return { view: h as View }
  if (modules.some((m) => m.id === h)) return { view: 'course', moduleId: h }
  return { view: 'course' }
}

function moduleDone(m: Module, progress: ProgressState) {
  const lessonsDone = m.lessons.every((l) => progress.lessons[l.id])
  const quizDone = !m.quiz || progress.quizzes[m.quiz.id]?.passed
  return lessonsDone && quizDone
}

function App() {
  const db = useLocalDb()
  const progress = { lessons: db.lessons, quizzes: db.quizzes }
  const connected = db.status === 'connected'

  const [view, setView] = useState<View>(() => parseHash().view)
  // undefined = follow the first unfinished module; '' = all collapsed
  const [openOverride, setOpenOverride] = useState<string | undefined>(() => parseHash().moduleId)
  const openId = openOverride ?? modules.find((m) => !moduleDone(m, progress))?.id ?? ''

  useEffect(() => {
    const onHash = () => {
      const next = parseHash()
      setView(next.view)
      if (next.moduleId) setOpenOverride(next.moduleId)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function navigate(target: View | string) {
    if ((VIEWS as string[]).includes(target)) {
      setView(target as View)
    } else {
      setView('course')
      setOpenOverride(target)
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
    window.history.replaceState(null, '', `#${target}`)
    if ((VIEWS as string[]).includes(target)) window.scrollTo({ top: 0 })
  }

  const totals = modules.reduce(
    (acc, m) => {
      const total = m.lessons.length + (m.quiz ? 1 : 0)
      const doneLessons = m.lessons.filter((l) => db.lessons[l.id]).length
      const quizDone = m.quiz && db.quizzes[m.quiz.id]?.passed ? 1 : 0
      return { done: acc.done + doneLessons + quizDone, total: acc.total + total }
    },
    { done: 0, total: 0 },
  )
  const overallPct = totals.total ? Math.round((totals.done / totals.total) * 100) : 0

  return (
    <div className="min-h-screen bg-[#F6F5FC] font-sans antialiased dark:bg-[#131124]">
      <header className="border-b border-violet-100 bg-white dark:border-white/10 dark:bg-[#1a1730]">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-9 w-9 flex-shrink-0" />
              <h1 className="font-display text-[1.6rem] font-medium tracking-tight text-slate-900 dark:text-white">
                GMAT Focus Edition — December 2026 Sprint
              </h1>
            </div>
            <div className="w-full max-w-xs">
              <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-600 dark:text-slate-300">Course progress</span>
                <span>
                  {overallPct}% · {totals.done}/{totals.total}
                </span>
              </div>
              <ProgressBar pct={overallPct} />
            </div>
          </div>

          <ConnectBar
            status={db.status}
            fileName={db.fileName}
            onConnectExisting={db.connectExisting}
            onConnectNew={db.connectNew}
            onReconnect={db.reconnect}
            onDisconnect={db.disconnect}
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <Sidebar modules={modules} progress={progress} view={view} openModuleId={openId} onNavigate={navigate} />

        <main className="flex min-w-0 flex-col gap-4">
          {view === 'course' && (
            <>
              <DueRedos entries={db.errors} connected={connected} onUpdate={db.updateError} />
              <ScoreTarget />
              {modules.map((m) => (
                <ModuleSection
                  key={m.id}
                  module={m}
                  progress={progress}
                  connected={connected}
                  open={openId === m.id}
                  onToggleOpen={() => setOpenOverride(openId === m.id ? '' : m.id)}
                  onToggleLesson={db.toggleLesson}
                  onQuizComplete={db.recordQuiz}
                />
              ))}
            </>
          )}
          {/* Always mounted so a running timer survives page switches; shows a mini clock elsewhere. */}
          <Timer active={view === 'timer'} onOpen={() => navigate('timer')} />
          {view === 'remember' && <Remember />}
          {view === 'error-log' && (
            <ErrorLog
              entries={db.errors}
              connected={connected}
              onAdd={db.addError}
              onUpdate={db.updateError}
              onRemove={db.removeError}
            />
          )}
          {view === 'schools' && <TargetSchools />}
          {view === 'resources' && <ResourceAppendix />}
        </main>
      </div>
    </div>
  )
}

export default App
