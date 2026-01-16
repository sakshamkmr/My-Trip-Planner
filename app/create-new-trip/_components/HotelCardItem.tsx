"use client"
import React, { useEffect } from 'react'
import { Hotel } from './ChatBox'

type Props = {
  hotel: Hotel
}
import Image from 'next/image'
import { Star, Wallet } from 'lucide-react'
import Link from 'next/link'
import { div } from 'motion/react-m'
import axios from 'axios'


function HotelCardItem({hotel}: Props) {
    const [photoURL, setPhotoURL] = React.useState<string>()
    useEffect(()=>{
        hotel && GetGooglePlaceDetails();
    },[hotel])


        const GetGooglePlaceDetails = async () => {
            const result = await axios.post('/api/google-place-detail', {
                placeName : hotel?.hotelName
            });
            if(result?.data?.error) {
                return;
            }

    
        setPhotoURL(result?.data)
    }
  return (
    <div
     
      className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
    >
      <Image
        src={photoURL?photoURL:"/placeholder.jpg"}
        alt="place-image"
        width={400}
        height={220}
        className="rounded-xl object-cover w-full h-[180px]"
      />

      <h2 className="font-semibold text-lg leading-snug">
        {hotel?.hotelName}
      </h2>

      <p className="text-gray-500 text-sm leading-snug">
        {hotel?.hotel_address}
      </p>

      <div className="flex items-center justify-between mt-1">
        <p className="flex items-center gap-1 text-green-600 font-medium text-sm">
          <Wallet className="h-4 w-4" />
          INR {hotel?.pricePerNight}
        </p>

        <p className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
          <Star className="h-4 w-4 fill-yellow-400" />
          {hotel?.rating}
        </p>
      </div>

      <p className="text-gray-500 text-sm line-clamp-2">
        {hotel?.description}
      </p>

      <Link href = {'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName} target='_blank' className='w-full'>
      <button
        className="mt-2 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        View
      </button>
      </Link>
    </div>
  )
}

export default HotelCardItem