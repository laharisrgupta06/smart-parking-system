import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import DashboardCard from '../components/DashboardCard'

export default function DashboardPage() {

  const [totalSlots, setTotalSlots] = useState(0)
  const [availableSlots, setAvailableSlots] = useState(0)
  const [occupiedSlots, setOccupiedSlots] = useState(0)
  const [activeTickets, setActiveTickets] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {

    const { count: total } = await supabase
      .from('parkingslots')
      .select('*', { count: 'exact', head: true })

    const { count: available } = await supabase
      .from('parkingslots')
      .select('*', { count: 'exact', head: true })
      .eq('slot_status', 'available')

    const { count: occupied } = await supabase
      .from('parkingslots')
      .select('*', { count: 'exact', head: true })
      .eq('slot_status', 'occupied')

    const { count: active } = await supabase
      .from('parkingtickets')
      .select('*', { count: 'exact', head: true })
      .eq('ticket_status', 'active')

    setTotalSlots(total || 0)
    setAvailableSlots(available || 0)
    setOccupiedSlots(occupied || 0)
    setActiveTickets(active || 0)
  }

  return (
    <div className="space-y-10">

      {/* Heading */}
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          OVERVIEW
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight text-white">
          Dashboard
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
          Live allocation snapshot across floors and active sessions.
          Metrics refresh when vehicles enter or exit.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Slots"
          value={totalSlots}
          icon="🅿️"
        />

        <DashboardCard
          title="Available Slots"
          value={availableSlots}
          color="text-emerald-400"
          icon="✅"
        />

        <DashboardCard
          title="Occupied Slots"
          value={occupiedSlots}
          color="text-rose-400"
          icon="🚗"
        />

        <DashboardCard
          title="Active Tickets"
          value={activeTickets}
          color="text-cyan-400"
          icon="🎫"
        />

      </div>

    </div>
  )
}