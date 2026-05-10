import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function ActiveTicketsPage() {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {

    const { data, error } = await supabase
      .from('parkingtickets')
      .select(`
        *,
        parkingslots (
          slot_number
        )
      `)
      .eq('ticket_status', 'active')

    if (!error) {
      setTickets(data)
    }
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Active Tickets
      </h1>

      <div className="space-y-4">

        {tickets.map((ticket) => (

          <div
            key={ticket.ticket_id}
            className="bg-slate-900 p-5 rounded-2xl"
          >
            <p>Ticket ID: {ticket.ticket_id}</p>
            <p>Vehicle ID: {ticket.vehicle_id}</p>
            <p>
  Slot: {ticket.parkingslots.slot_number}
</p>
            <p>Status: {ticket.ticket_status}</p>
          </div>

        ))}

      </div>
    </div>
  )
}