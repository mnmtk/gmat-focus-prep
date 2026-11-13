import { useState } from 'react'
import { browseLinks, mockTests, obsoleteLinks, officialLinks } from '../data/curriculum'
import { Ban } from '../lib/icons'

function LinkGrid({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target={l.href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-violet-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
        >
          {l.label}
        </a>
      ))}
    </div>
  )
}

export function ResourceAppendix() {
  const [open, setOpen] = useState(false)

  return (
    <section id="m7" className="scroll-mt-6 rounded-xl border border-violet-100 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-[#1a1730]">
      <div className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">Appendix</div>
      <h2 className="font-display mt-0.5 text-xl font-medium text-slate-900 dark:text-white">Resource Library</h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Reference only — not scored toward course progress.</p>

      <h3 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Official downloads to buy</h3>
      <LinkGrid links={officialLinks} />

      {mockTests.length > 0 && (
        <>
          <h3 className="mb-2 mt-5 text-sm font-semibold text-slate-800 dark:text-slate-100">
            Full-length practice tests <span className="text-xs font-normal text-slate-400">(old format — timing/stamina only)</span>
          </h3>
          <LinkGrid links={mockTests} />
        </>
      )}

      {browseLinks.length > 0 && (
        <>
          <h3 className="mb-2 mt-5 text-sm font-semibold text-slate-800 dark:text-slate-100">Browse everything</h3>
          <LinkGrid links={browseLinks} />
        </>
      )}

      {obsoleteLinks.length > 0 && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/30 dark:bg-rose-500/10">
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-sm font-semibold text-rose-700 dark:text-rose-300"
          >
            {open ? '▾' : '▸'} <Ban className="inline h-3.5 w-3.5 -translate-y-px" strokeWidth={2} /> Obsolete — Sentence Correction &amp; AWA (not on Focus Edition)
          </button>
          {open && (
            <div className="mt-3">
              <LinkGrid links={obsoleteLinks} />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
