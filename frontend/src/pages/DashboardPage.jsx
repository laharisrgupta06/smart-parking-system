import { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard.jsx'
import { supabase } from '../supabase'


export default function DashboardPage() {

  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    occupied: 0,
    tickets: 0,
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {

    const { data: slots } = await supabase
      .from('parkingslots')
      .select('*')

    const { data: activeTickets } = await supabase
      .from('parkingtickets')
      .select('*')
      .eq('ticket_status', 'active')

      const total = slots?.length || 0

      const available =
        slots?.filter(
          (slot) => slot.slot_status === 'available'
        ).length || 0
      
      const occupied =
        slots?.filter(
          (slot) => slot.slot_status === 'occupied'
        ).length || 0

    setStats({
      total,
      available,
      occupied,
      tickets: activeTickets?.length || 0,
    })
  }
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400/90">Overview</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Live allocation snapshot across floors and active sessions. Metrics refresh when vehicles enter or exit.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Slots"
          value={stats.total}
          subtitle="Across all configured floors"
          accent="cyan"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          }
        />
        <DashboardCard
          title="Available Slots"
          value={stats.available}
          subtitle="Ready for assignment"
          accent="emerald"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
        />
        <DashboardCard
          title="Occupied Slots"
          value={stats.occupied}
          subtitle="Currently in use"
          accent="teal"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
          }
        />
        <DashboardCard
          title="Active Tickets"
          value={stats.tickets}
          subtitle="Open parking sessions"
          accent="sky"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-9h.008v.008H12V9Zm0 3h.008v.008H12V12Zm0 3h.008v.008H12V15Zm0 3h.008v.008H12V18ZM4.5 3.75h15A1.5 1.5 0 0 1 21 5.25v13.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5Z" />
            </svg>
          }
        />
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-slate-200">Quick pulse</h2>
        <p className="mt-2 text-sm text-slate-400">
          Occupancy is at <span className="font-medium text-cyan-300">{Math.round((stats.occupied / stats.total) * 100)}%</span>.
          Peak window typically runs 09:00–11:00 and 17:00–19:00 local time.
        </p>
      </div>
    </div>
  )
}
