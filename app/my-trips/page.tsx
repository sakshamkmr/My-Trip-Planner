'use client'

import { useState, useEffect } from 'react'
import { useConvex, useQuery } from 'convex/react'
import { ChevronLeft   } from 'lucide-react'
import Link from 'next/link'

import MyTripCardItem from './_components/MyTripCardItem'

import { useUserDetail } from '../provider'
import { api } from '@/convex/_generated/api'
import { TripInfo } from '../create-new-trip/_components/ChatBox'
import { Button } from '@/components/ui/button'
type Trip = {
  _id: string
  tripId: any
  tripDetail: TripInfo
}

export default function MyTrips() {
  const [myTrips, setMyTrips] = useState<Trip[]>([])
  const convex = useConvex()
  const userDetail = useUserDetail()

  const getUserTrips = async () => {
    if (!userDetail?.id) return
    
    const result = await convex.query(
      api.tripDetail.GetUserTrips,
      { uid: userDetail?.id }
    )
    setMyTrips(result)
    console.log('User trips:', result)
    
  }

  useEffect(() => {
    getUserTrips()
  }, [userDetail])

  if (myTrips.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 md:px-24 lg:px-48">
          <div className="flex flex-col items-center justify-center text-center p-20 border-2 border-dashed border-gray-300 rounded-3xl bg-white/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You don't have any trip plans created
            </h2>
            <Link 
              href="/create-new-trip"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              <Button>Create New Trip</Button>
              
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4 md:px-24 lg:px-48">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          My Trips
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {myTrips.map((trip, index) => (
            <MyTripCardItem key={index} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  )
}
