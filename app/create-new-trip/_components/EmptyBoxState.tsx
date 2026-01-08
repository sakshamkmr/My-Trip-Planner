import { Globe2, Users, DollarSign, Calendar } from 'lucide-react'

const suggestions = [
  {
    icon: <Globe2 className="h-6 w-6 text-blue-400" />,
    title: 'Create new trip'
  },
  {
    icon: <Users className="h-6 w-6 text-green-400" />,
    title: 'Who are you traveling with?'
  },
  {
    icon: <DollarSign className="h-6 w-6 text-yellow-400" />,
    title: 'What is your budget?'
  },
  {
    icon: <Calendar className="h-6 w-6 text-purple-400" />,
    title: 'How many days?'
  }
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
