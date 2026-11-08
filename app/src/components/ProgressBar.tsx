interface Props {
  pct: number
  size?: 'sm' | 'lg'
}

export function ProgressBar({ pct, size = 'sm' }: Props) {
  const height = size === 'lg' ? 'h-2' : 'h-1.5'
  return (
    <div className={`${height} w-full rounded-full bg-violet-100 overflow-hidden dark:bg-white/10`}>
      <div
        className={`${height} rounded-full bg-violet-600 transition-all duration-300 dark:bg-violet-400`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
