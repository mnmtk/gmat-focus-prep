import { useCallback, useEffect, useRef, useState } from 'react'
import type { ErrorLogEntry, QuizResult } from '../types'
import {
  createNewFile,
  emptyLocalDb,
  isFileSystemAccessSupported,
  pickExistingFile,
  readLocalDb,
  verifyPermission,
  writeLocalDb,
  type LocalDbState,
} from '../lib/localDb'
import { clearFileHandle, loadFileHandle, saveFileHandle } from '../lib/fileHandleStore'

export type FileStatus = 'unsupported' | 'disconnected' | 'connecting' | 'permission-needed' | 'connected'

function newId() {
  return `e${Date.now()}${Math.random().toString(36).slice(2, 7)}`
}

export function useLocalDb() {
  const [data, setData] = useState<LocalDbState>(emptyLocalDb)
  const [status, setStatus] = useState<FileStatus>(isFileSystemAccessSupported() ? 'disconnected' : 'unsupported')
  const [fileName, setFileName] = useState<string | null>(null)
  const handleRef = useRef<FileSystemFileHandle | null>(null)

  useEffect(() => {
    if (!isFileSystemAccessSupported()) return
    ;(async () => {
      const handle = await loadFileHandle()
      if (!handle) return
      handleRef.current = handle
      setFileName(handle.name)
      const ok = await verifyPermission(handle, false)
      if (!ok) {
        setStatus('permission-needed')
        return
      }
      setData(await readLocalDb(handle))
      setStatus('connected')
    })()
  }, [])

  const persist = useCallback(async (next: LocalDbState) => {
    const handle = handleRef.current
    if (!handle) return
    await writeLocalDb(handle, next)
  }, [])

  const connectToHandle = useCallback(async (handle: FileSystemFileHandle) => {
    handleRef.current = handle
    setFileName(handle.name)
    await saveFileHandle(handle)
    const ok = await verifyPermission(handle, true)
    if (!ok) {
      setStatus('permission-needed')
      return
    }
    setData(await readLocalDb(handle))
    setStatus('connected')
  }, [])

  const connectExisting = useCallback(async () => {
    setStatus('connecting')
    const handle = await pickExistingFile()
    if (!handle) {
      setStatus(handleRef.current ? 'connected' : 'disconnected')
      return
    }
    await connectToHandle(handle)
  }, [connectToHandle])

  const connectNew = useCallback(async () => {
    setStatus('connecting')
    const handle = await createNewFile()
    if (!handle) {
      setStatus(handleRef.current ? 'connected' : 'disconnected')
      return
    }
    await connectToHandle(handle)
  }, [connectToHandle])

  const reconnect = useCallback(async () => {
    const handle = handleRef.current
    if (!handle) return
    const ok = await verifyPermission(handle, true)
    if (!ok) {
      setStatus('permission-needed')
      return
    }
    setData(await readLocalDb(handle))
    setStatus('connected')
  }, [])

  const disconnect = useCallback(async () => {
    handleRef.current = null
    setFileName(null)
    setData(emptyLocalDb())
    setStatus('disconnected')
    await clearFileHandle()
  }, [])

  const toggleLesson = useCallback(
    (id: string, checked: boolean) => {
      setData((prev) => {
        const next = { ...prev, lessons: { ...prev.lessons, [id]: checked } }
        void persist(next)
        return next
      })
    },
    [persist],
  )

  const recordQuiz = useCallback(
    (id: string, result: QuizResult) => {
      setData((prev) => {
        const next = { ...prev, quizzes: { ...prev.quizzes, [id]: result } }
        void persist(next)
        return next
      })
    },
    [persist],
  )

  const addError = useCallback(
    (entry: Omit<ErrorLogEntry, 'id'>) => {
      setData((prev) => {
        const next = { ...prev, errors: [{ ...entry, id: newId() }, ...prev.errors] }
        void persist(next)
        return next
      })
    },
    [persist],
  )

  const updateError = useCallback(
    (id: string, patch: Partial<ErrorLogEntry>) => {
      setData((prev) => {
        const next = { ...prev, errors: prev.errors.map((e) => (e.id === id ? { ...e, ...patch } : e)) }
        void persist(next)
        return next
      })
    },
    [persist],
  )

  const removeError = useCallback(
    (id: string) => {
      setData((prev) => {
        const next = { ...prev, errors: prev.errors.filter((e) => e.id !== id) }
        void persist(next)
        return next
      })
    },
    [persist],
  )

  return {
    status,
    fileName,
    connectExisting,
    connectNew,
    reconnect,
    disconnect,
    lessons: data.lessons,
    quizzes: data.quizzes,
    errors: data.errors,
    toggleLesson,
    recordQuiz,
    addError,
    updateError,
    removeError,
  }
}
