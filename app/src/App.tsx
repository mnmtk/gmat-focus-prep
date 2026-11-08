import { modules } from './data/curriculum'
import { useLocalDb } from './hooks/useLocalDb'
import { useActiveSection } from './hooks/useActiveSection'
import { Sidebar } from './components/Sidebar'
import { ModuleSection } from './components/ModuleSection'
import { ResourceAppendix } from './components/ResourceAppendix'
import { ErrorLog } from './components/ErrorLog'
import { ConnectBar } from './components/ConnectBar'
import { ProgressBar } from './components/ProgressBar'
import { AlertTriangle } from './lib/icons'
import logo from './assets/logo.png'

function App() {
  const db = useLocalDb()
  const progress = { lessons: db.lessons, quizzes: db.quizzes }
  const connected = db.status === 'connected'
  const activeId = useActiveSection([...modules.map((m) => m.id), 'error-log', 'm7'])

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
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-9 w-9 flex-shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                <span>Self-paced course</span>
                <span>·</span>
                <span>6 modules</span>
                <span>·</span>
                <span>10–15 hrs/week</span>
              </div>
              <h1 className="font-display mt-0.5 text-[1.9rem] font-medium tracking-tight text-slate-900 dark:text-white">
                GMAT Focus Edition — December 2026 Sprint
              </h1>
            </div>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Built from your existing library + the official GMAC/Manhattan Prep materials you're buying
          </p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30">
            <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} /> Focus Edition (2024+): no AWA, no Sentence Correction, new Data Insights section
          </div>

          <div className="mt-5 max-w-xl">
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-600 dark:text-slate-300">Course progress</span>
              <span>{overallPct}% · {totals.done}/{totals.total} units</span>
            </div>
            <ProgressBar pct={overallPct} size="lg" />
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

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <Sidebar modules={modules} progress={progress} activeId={activeId} />

        <main className="flex flex-col gap-5">
          {modules.map((m) => (
            <ModuleSection
              key={m.id}
              module={m}
              progress={progress}
              connected={connected}
              onToggleLesson={db.toggleLesson}
              onQuizComplete={db.recordQuiz}
            />
          ))}
          <ErrorLog
            entries={db.errors}
            connected={connected}
            onAdd={db.addError}
            onUpdate={db.updateError}
            onRemove={db.removeError}
          />
          <ResourceAppendix />
        </main>
      </div>
    </div>
  )
}

export default App
