import { useState } from 'react'

export default function AdminPanelPage() {
  const [floorName, setFloorName] = useState('')
  const [slotFloor, setSlotFloor] = useState('')
  const [slotCount, setSlotCount] = useState('')

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400/90">Configuration</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">Admin Panel</h1>
        <p className="mt-2 text-sm text-slate-400">Manage structure capacity and review revenue at a glance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-100">Add Parking Floors</h2>
          <p className="mt-1 text-sm text-slate-500">Create a new deck or level in the parking structure.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="space-y-2">
              <label htmlFor="floorName" className="text-sm font-medium text-slate-300">
                Floor name
              </label>
              <input
                id="floorName"
                value={floorName}
                onChange={(e) => setFloorName(e.target.value)}
                placeholder="e.g. Floor 3 · Premium"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
            >
              Add Floor
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-100">Add Parking Slots</h2>
          <p className="mt-1 text-sm text-slate-500">Batch-create bays on an existing floor.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="space-y-2">
              <label htmlFor="slotFloor" className="text-sm font-medium text-slate-300">
                Target floor
              </label>
              <input
                id="slotFloor"
                value={slotFloor}
                onChange={(e) => setSlotFloor(e.target.value)}
                placeholder="e.g. Floor 2 · East"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="slotCount" className="text-sm font-medium text-slate-300">
                Number of slots
              </label>
              <input
                id="slotCount"
                type="number"
                min={1}
                value={slotCount}
                onChange={(e) => setSlotCount(e.target.value)}
                placeholder="12"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl border border-teal-500/40 bg-teal-500/10 px-4 py-2.5 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
            >
              Add Slots
            </button>
          </form>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-cyan-950/20 p-6 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
        <h2 className="text-lg font-semibold text-slate-100">Revenue Summary</h2>
        <p className="mt-1 text-sm text-slate-500">Rolling totals for the current billing period.</p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Today</dt>
            <dd className="mt-2 text-2xl font-semibold tabular-nums text-slate-50">₹ 42,180</dd>
            <p className="mt-1 text-xs text-emerald-400/90">+8.2% vs yesterday</p>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">This week</dt>
            <dd className="mt-2 text-2xl font-semibold tabular-nums text-slate-50">₹ 286,400</dd>
            <p className="mt-1 text-xs text-slate-500">May 4–May 10</p>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">This month</dt>
            <dd className="mt-2 text-2xl font-semibold tabular-nums text-slate-50">₹ 1.02M</dd>
            <p className="mt-1 text-xs text-slate-500">On track vs forecast</p>
          </div>
        </dl>
      </section>
    </div>
  )
}
