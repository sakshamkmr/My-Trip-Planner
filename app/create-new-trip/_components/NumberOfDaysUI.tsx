
import React, { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type NumberOfDaysUIProps = {
  onSelectOption: (value: string) => void
}

export default function NumberOfDaysUI({ onSelectOption }: NumberOfDaysUIProps) {
  const [days, setDays] = useState(4)

  const increment = () => {
    if (days < 30) setDays(prev => prev + 1)
  }

  const decrement = () => {
    if (days > 1) setDays(prev => prev - 1)
  }

  return (
    <div className="mt-4 bg-gray-50 border rounded-2xl p-6 text-center">
      <h2 className="text-lg font-semibold mb-4">
        How many days do you want to travel?
      </h2>

      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={decrement}
          className="h-12 w-12 rounded-full border flex items-center justify-center 
                     hover:bg-gray-100 transition"
        >
          <Minus className="h-5 w-5" />
        </button>

        <span className="text-3xl font-bold">
          {days} Days
        </span>

        <button
          onClick={increment}
          className="h-12 w-12 rounded-full border flex items-center justify-center 
                     hover:bg-gray-100 transition"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <Button
        onClick={() => onSelectOption(`${days} Days`)}
        className="bg-primary text-white px-8 py-2 rounded-xl"
      >
        Confirm
      </Button>
    </div>
  )
}
