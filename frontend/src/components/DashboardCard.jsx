const accentStyles = {
  cyan: {
    glow: 'from-cyan-500/30 to-teal-600/20',
    box: 'from-cyan-500/20 to-teal-600/10 text-cyan-300 ring-cyan-500/20',
  },
  teal: {
    glow: 'from-teal-500/30 to-emerald-600/20',
    box: 'from-teal-500/20 to-emerald-600/10 text-teal-300 ring-teal-500/20',
  },
  emerald: {
    glow: 'from-emerald-500/30 to-cyan-600/20',
    box: 'from-emerald-500/20 to-cyan-600/10 text-emerald-300 ring-emerald-500/20',
  },
  sky: {
    glow: 'from-sky-500/30 to-cyan-600/20',
    box: 'from-sky-500/20 to-cyan-600/10 text-sky-300 ring-sky-500/20',
  },
}

export default function DashboardCard({ title, value, subtitle, icon, accent = 'cyan' }) {
  const a = accentStyles[accent] ?? accentStyles.cyan

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]`}>
      <div
        className={[
          'pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition-opacity group-hover:opacity-60',
          a.glow,
        ].join(' ')}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 tabular-nums">{value}</p>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        <div
          className={[
            'flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ring-inset',
            a.box,
          ].join(' ')}
        >
          <span className="[&_svg]:size-6">{icon}</span>
        </div>
      </div>
    </div>
  )
}
