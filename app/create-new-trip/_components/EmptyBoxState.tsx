import { Globe2, Users, DollarSign, Calendar } from 'lucide-react'

import {  Plane, Landmark, Compass } from 'lucide-react'

const suggestions = [
  {
    icon: <Globe2 className="h-6 w-6 text-blue-500" />,
    title: 'Create New Trip',
  },
  {
    icon: <Plane className="h-6 w-6 text-green-500" />,
    title: 'Inspire me where to go',
  },
  {
    icon: <Landmark className="h-6 w-6 text-orange-500" />,
    title: 'Discover Hidden gems',
  },
  {
    icon: <Compass className="h-6 w-6 text-yellow-500" />,
    title: 'Adventure Destination',
  },
]


interface EmptyBoxStateProps {
  onSelectOption: (option: string) => void
}

export default function EmptyBoxState({ onSelectOption }: EmptyBoxStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Start planning your <span className="text-primary">new trip</span> using AI
      </h2>
      
      <p className="text-xl text-gray-500 mb-8 max-w-md">
        Tell me where you want to go and I&apos;ll create a perfect itinerary for you
      </p>

      {/* Suggestions */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(suggestion.title)}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl 
                       hover:border-primary hover:bg-primary/5 cursor-pointer 
                       transition-all duration-200 hover:scale-[1.02]"
          >
            {suggestion.icon}
            <h3 className="text-lg font-medium text-gray-900">
              {suggestion.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}
