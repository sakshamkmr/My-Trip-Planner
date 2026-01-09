import React from 'react'

type GroupSizeUIProps = {
  onSelectedOption: (option: string) => void
}

export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole travels in exploration',
    icon: '✈️',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travels in tandem',
    icon: '🥂',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏡',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '⛺',
    people: '5 to 10 People',
  },
]

function GroupSizeUI({ onSelectedOption }: GroupSizeUIProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
      {SelectTravelesList.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectedOption(`${item.title}:${item.people}`)}
          className="border p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <h2 className="text-xl">{item.icon}</h2>
          <h2 className="font-medium">{item.title}</h2>
        </div>
      ))}

      <h2 className="col-span-full mt-4 text-gray-600">
        Select the option that best describes your group size.
      </h2>
    </div>
  )
}

export default GroupSizeUI
