'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTripDetail } from '@/app/provider'
import axios from 'axios'
import { ArrowRight, Calendar, DollarSign, Users } from 'lucide-react'
import { TripInfo } from '@/app/create-new-trip/_components/ChatBox'

interface Props {
  trip: {
    _id: string
    tripId: any
    tripDetail: TripInfo
  }
}

export type Trip = Props['trip']

export default function MyTripCardItem({ trip }: Props) {
  const [photoURL, setPhotoURL] = useState('')
  
  const getGooglePlaceDetail = async () => {
    if (!trip.tripDetail.itinerary?.[0]?.activities?.[0]) return
    
    const placeName = `${trip.tripDetail.destination} ${trip.tripDetail.itinerary[0].activities[0].placeName}`
    
    try {
      const result = await axios.post('/api/google-place-detail', { placeName })
      
      if (result.data.places?.[0]?.photos?.[0]) {
        const placeRefName = result.data.places[0].photos[0].name
        const photoRefURL = `https://places.googleapis.com/v1/${placeRefName}?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&maxHeightPx=400&maxWidthPx=400`
        setPhotoURL(photoRefURL)
      }
    } catch (error) {
      console.error('Google place error:', error)
    }
  }

  useEffect(() => {
    getGooglePlaceDetail()
  }, [trip])

  return (
    <Link 
      href={`/view-trip/${trip.tripId}`}
      className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border hover:border-primary/50 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
        <Image
          src={photoURL || '/placeholder.jpg'}
          alt={trip.tripDetail.destination}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {trip.tripDetail.origin} 
          <span className="text-primary">
            {' '}→{' '}
          </span>
          {trip.tripDetail.destination}
        </h3>
        
        <p className="text-xl font-semibold text-gray-700">
          {trip.tripDetail.duration} trip with {trip.tripDetail.budget} budget
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString()}
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  )
}
