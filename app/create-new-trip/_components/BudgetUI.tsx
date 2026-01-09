import React from 'react'
import { Star } from 'lucide-react'

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵',
    color: 'bg-green-100 text-green-600',
    stars: 2,
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '🪙',
    color: 'bg-yellow-100 text-yellow-600',
    stars: 4,
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about cost",
    icon: '💎',
    color: 'bg-purple-100 text-purple-600',
    stars: 5,
  },
]

interface BudgetUIProps {
  onSelectOption: (option: string) => void
}

export default function BudgetUI({ onSelectOption }: BudgetUIProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {SelectBudgetOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => onSelectOption(option.title)}
          className="flex flex-col items-center p-4 border rounded-xl
                     hover:border-primary hover:bg-primary/5 cursor-pointer
                     transition-all duration-200 bg-white shadow-sm"
        >
          <div className={`p-3 ${option.color} rounded-xl mb-3`}>
            <span className="text-2xl">{option.icon}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            {option.title}
          </h3>

          <p className="text-sm text-gray-600 text-center mt-1 mb-3">
            {option.desc}
          </p>

          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i <= option.stars
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
