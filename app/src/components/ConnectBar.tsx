import type { FileStatus } from '../hooks/useLocalDb'
import { FileSpreadsheet, FilePlus, RefreshCw, Unlink, FolderOpen, AlertTriangle } from '../lib/icons'

interface Props {
  status: FileStatus
  fileName: string | null
  onConnectExisting: () => void
  onConnectNew: () => void
  onReconnect: () => void
  onDisconnect: () => void
}

export function ConnectBar({ status, fileName, onConnectExisting, onConnectNew, onReconnect, onDisconnect }: Props) {
  if (status === 'unsupported') {
    return (
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
        <div>
          This browser can't write directly to local files (needs Chrome, Edge, or another Chromium browser). Your
          progress, quiz results, and error log won't save until you open this page in one.
        </div>
      </div>
    )
  }

  if (status === 'connected') {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          <FileSpreadsheet className="h-3.5 w-3.5" strokeWidth={2} /> Saving to {fileName}
        </span>
        <button
          onClick={onDisconnect}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:border-white/15 dark:text-slate-400 dark:hover:bg-white/5"
        >
          <Unlink className="h-3.5 w-3.5" strokeWidth={2} /> Switch file
        </button>
      </div>
    )
  }

  if (status === 'permission-needed') {
    return (
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
        <span>Reconnect to {fileName ?? 'your file'} — the browser needs permission again this session.</span>
        <button
          onClick={onReconnect}
          className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
        >
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} /> Reconnect
        </button>
      </div>
    )
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-violet-200 bg-violet-50/50 p-3.5 dark:border-violet-500/20 dark:bg-violet-500/5">
      <FileSpreadsheet className="h-5 w-5 flex-shrink-0 text-violet-400 dark:text-violet-500" strokeWidth={1.5} />
      <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">
        Connect a local .xlsx file — lesson checks, quiz results, and your error log all save there, live.
      </p>
      <div className="flex flex-shrink-0 gap-2">
        <button
          onClick={onConnectNew}
          disabled={status === 'connecting'}
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700 disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600"
        >
          <FilePlus className="h-3.5 w-3.5" strokeWidth={2} /> New file
        </button>
        <button
          onClick={onConnectExisting}
          disabled={status === 'connecting'}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/5"
        >
          <FolderOpen className="h-3.5 w-3.5" strokeWidth={2} /> Existing file
        </button>
      </div>
    </div>
  )
}
