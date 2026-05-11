import { useState } from 'react'
import { supabase } from '../supabase'

export default function VehicleExitPage() {
  const [ticketId, setTicketId] = useState('')
  const [parkingHours, setParkingHours] = useState('')
  const [receipt, setReceipt] = useState(null)

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

  
      setReceipt({
        ticketId,
        vehicleType: vehicle.vehicle_type,
        hours,
        fee,
        exitTime: exitTime.toLocaleString(),
      })
    

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
      {receipt && (
  <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-white">
    
    <h2 className="text-2xl font-bold mb-4">
      Parking Receipt 🎟
    </h2>

    <div className="space-y-2 text-sm">
      <p>
        <span className="font-semibold">
          Ticket ID:
        </span>{' '}
        {receipt.ticketId}
      </p>

      <p>
        <span className="font-semibold">
          Vehicle Type:
        </span>{' '}
        {receipt.vehicleType}
      </p>

      <p>
        <span className="font-semibold">
          Parking Hours:
        </span>{' '}
        {receipt.hours}
      </p>

      <p>
        <span className="font-semibold">
          Parking Fee:
        </span>{' '}
        ₹{receipt.fee}
      </p>

      <p>
        <span className="font-semibold">
          Exit Time:
        </span>{' '}
        {receipt.exitTime}
      </p>

      <p className="text-emerald-300 font-semibold pt-2">
        Payment Successful ✅
      </p>
    </div>
  </div>
)}
    </div>
  )
}