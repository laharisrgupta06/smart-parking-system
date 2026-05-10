export default function SlotCard({ label, available, floor }) {
  const isFree = available

  return (
    <div
      className={[
        'relative flex min-h-[100px] flex-col justify-between rounded-xl border p-4 shadow-lg transition-all duration-200',
        isFree
          ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/80 to-slate-900/90 shadow-emerald-950/30 hover:border-emerald-400/50'
          : 'border-red-500/40 bg-gradient-to-br from-red-950/70 to-slate-900/90 shadow-red-950/30 hover:border-red-400/50',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-lg font-semibold tracking-tight text-slate-50">{label}</span>
        <span
          className={[
            'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            isFree ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300',
          ].join(' ')}
        >
          {isFree ? 'Free' : 'Taken'}
        </span>
      </div>
      {floor ? <p className="text-xs text-slate-500">{floor}</p> : null}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
        <span
          className={[
            'inline-block size-2 rounded-full',
            isFree ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]',
          ].join(' ')}
        />
        {isFree ? 'Available for assignment' : 'Occupied'}
      </div>
    </div>
  )
}
