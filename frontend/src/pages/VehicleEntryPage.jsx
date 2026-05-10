import { useState } from 'react'
import { supabase } from '../supabase'

export default function VehicleEntryPage() {
  const [ticketInfo, setTicketInfo] = useState(null)
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [ownerName, setOwnerName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data: availableSlot, error: slotError } =
  await supabase
    .from('parkingslots')
    .select('*')
    .eq('slot_status', 'available')
    .limit(1)
    .single()

if (slotError || !availableSlot) {
  alert('No parking slots available')
  return
}

const { data: vehicleData, error: vehicleError } =
  await supabase
    .from('vehicles')
    .insert([
      {
        vehicle_number: vehicleNumber,
        vehicle_type: vehicleType,
        owner_name: ownerName,
      },
    ])
    .select()

if (vehicleError) {
  alert('Error saving vehicle')
  console.log(vehicleError)
  return
}

const { error: updateError } = await supabase
  .from('parkingslots')
  .update({
    slot_status: 'occupied',
  })
  .eq('slot_id', availableSlot.slot_id)

if (updateError) {
  alert('Error updating slot')
  console.log(updateError)
  return
}
const { data: ticketData, error: ticketError } =
  await supabase
    .from('parkingtickets')
    .insert([
      {
        vehicle_id: vehicleData[0].vehicle_id,
        slot_id: availableSlot.slot_id,
        entry_time: new Date(),
        ticket_status: 'active',
        parking_fee: 0,
      },
    ])
    .select()

if (ticketError) {
  console.log(ticketError)
}

setTicketInfo({
  ticketId: ticketData[0].ticket_id,
  slot: availableSlot.slot_number,
  vehicle: vehicleNumber,
  owner: ownerName,
  type: vehicleType,
  time: new Date().toLocaleTimeString(),
})
setVehicleNumber('')
setVehicleType('')
setOwnerName('')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Vehicle Entry
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-2xl max-w-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) =>
            setVehicleNumber(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800"
        />

        <input
          type="text"
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) =>
            setVehicleType(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800"
        />

        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) =>
            setOwnerName(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800"
        />

        <button
          type="submit"
          className="bg-cyan-500 px-6 py-3 rounded-lg font-semibold"
        >
          Assign Parking Slot
        </button>
      </form>
      {ticketInfo && (

<div className="mt-8 bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 max-w-lg shadow-[0_0_30px_rgba(34,211,238,0.15)]">

  <h2 className="text-2xl font-bold text-cyan-400 mb-4">
    🎟 SMARTPARK TICKET
  </h2>

  <div className="space-y-2 text-slate-200">

    <p>
      <span className="font-semibold">
        Ticket ID:
      </span> {ticketInfo.ticketId}
    </p>

    <p>
      <span className="font-semibold">
        Vehicle:
      </span> {ticketInfo.vehicle}
    </p>

    <p>
      <span className="font-semibold">
        Vehicle Type:
      </span> {ticketInfo.type}
    </p>

    <p>
      <span className="font-semibold">
        Owner:
      </span> {ticketInfo.owner}
    </p>

    <p>
      <span className="font-semibold">
        Slot:
      </span> {ticketInfo.slot}
    </p>

    <p>
      <span className="font-semibold">
        Entry Time:
      </span> {ticketInfo.time}
    </p>

  </div>

  <button
    onClick={() => window.print()}
    className="mt-6 bg-cyan-500 px-5 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition"
  >
    Print Ticket
  </button>

</div>

)}
    </div>
  )
}