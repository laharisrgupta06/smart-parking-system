export default function DashboardCard({
  title,
  value,
  color = 'text-white',
  icon,
}) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/[0.04]
        p-8
        backdrop-blur-2xl
        transition-all duration-500
        hover:-translate-y-2
        hover:border-cyan-400/40
        hover:bg-white/[0.07]
        hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]
      "
    >

      {/* Glow */}
      <div
        className="
          absolute -right-10 -top-10
          h-40 w-40
          rounded-full
          bg-cyan-400/10
          blur-3xl
          transition-all duration-500
          group-hover:bg-cyan-400/20
        "
      />

      <div className="relative z-10 flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2
            className={`mt-5 text-5xl font-black tracking-tight ${color}`}
          >
            {value}
          </h2>
        </div>

        <div
          className="
            flex h-16 w-16 items-center justify-center
            rounded-2xl
            border border-white/10
            bg-white/5
            text-3xl
            shadow-inner
            transition-all duration-500
            group-hover:scale-110
            group-hover:border-cyan-400/40
            group-hover:bg-cyan-400/10
          "
        >
          {icon}
        </div>

      </div>

    </div>
  )
}