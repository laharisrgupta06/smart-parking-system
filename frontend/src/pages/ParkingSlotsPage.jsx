import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function ParkingSlotsPage() {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    fetchSlots()
  }, [])

  async function fetchSlots() {
    const { data, error } = await supabase
      .from('parkingslots')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setSlots(data)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Parking Slots
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {slots.map((slot) => (
          <div
            key={slot.slot_id}
            className={`p-6 rounded-2xl text-center font-bold text-lg ${
              slot.slot_status === 'available'
                ? 'bg-green-600'
                : 'bg-red-600'
            }`}
          >
            {slot.slot_number}
            <p className="text-sm mt-2">
              {slot.slot_status}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}