import { useState } from 'react'
import { supabase } from '../supabase'

export default function VehicleExitPage() {
  const [ticketId, setTicketId] = useState('')
  const [parkingHours, setParkingHours] = useState('')

  const handleExit = async (e) => {
    e.preventDefault()

    const { data: ticket, error: ticketError } =
    await supabase
      .from('parkingtickets')
      .select('*')
      .eq('ticket_id', ticketId)
      .eq('ticket_status', 'active')
      .single()

    if (ticketError || !ticket) {
      alert('Ticket not found')
      return
    }

    const exitTime = new Date()

const hours = Number(parkingHours)

let fee = 0

const { data: vehicle } = await supabase
  .from('vehicles')
  .select('*')
  .eq('vehicle_id', ticket.vehicle_id)
  .single()

if (vehicle.vehicle_type === 'bike') {
  fee = 30 + ((hours - 1) * 10)
}

if (
  vehicle.vehicle_type === 'car' ||
  vehicle.vehicle_type === 'suv'
) {
  fee = 50 + ((hours - 1) * 15)
}

    await supabase
      .from('parkingtickets')
      .update({
        exit_time: exitTime,
        parking_fee: fee,
        ticket_status: 'completed',
      })
      .eq('ticket_id', ticketId)

    await supabase
      .from('parkingslots')
      .update({
        slot_status: 'available',
      })
      .eq('slot_id', ticket.slot_id)

    alert(
      `Vehicle Exit Complete 🚗\nFee: ₹${fee}`
    )

    setTicketId('')
    setParkingHours('')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Vehicle Exit
      </h1>

      <form
        onSubmit={handleExit}
        className="bg-slate-900 p-6 rounded-2xl max-w-lg space-y-4"
      >
        <input
          type="number"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) =>
            setTicketId(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800"
        />
        <input
  type="number"
  placeholder="Parking Hours"
  value={parkingHours}
  onChange={(e) =>
    setParkingHours(e.target.value)
  }
  className="w-full p-3 rounded-lg bg-slate-800"
/>

        <button
          type="submit"
          className="bg-red-500 px-6 py-3 rounded-lg font-semibold"
        >
          Process Exit
        </button>
      </form>
    </div>
  )
}