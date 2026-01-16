"use client"
import { Button } from '@/components/ui/button'
import { Clock, ExternalLinkIcon, Ticket, Timer } from 'lucide-react'
import Link from 'next/dist/client/link'
import React, { act, useEffect } from 'react'
import Image from 'next/image'
import { Activity } from './ChatBox'
import axios from 'axios'

type props ={
    activity: Activity
}

function PlaceCardItem({activity}:props) {
    const [photoURL, setPhotoURL] = React.useState<string>()
    useEffect(()=>{
        activity && GetGooglePlaceDetails();
    },[activity])


        const GetGooglePlaceDetails = async () => {
            const result = await axios.post('/api/google-place-detail', {
                placeName : activity?.placeName + ":" + activity?.placeAddress
            });
            if(result?.data?.error) {
                return;
            }

    
        setPhotoURL(result?.data)
    }
  return (
    <div  className="mt-4 p-4 border rounded-2xl shadow-sm hover:shadow-md transition">
        <Image src = {photoURL?photoURL:"/placeholder.jpg"} alt="place-image" width={400} height={200} className="rounded-xl object-cover w-full h-[180px]" />
        <h2 className='font-semibold text-lg'>{activity?.placeName} </h2>
        <p className='text-gray-500 line-clamp-2'>{activity?.placeDetails}</p>
        <h2 className='flex gap-2 text-blue-500 line-clamp-1'><Ticket/>{activity?.ticketPricing}</h2>
        <p className='flex text-orange-500 gap-2'><Clock/>{activity?.best_Time_To_Visit}</p>
        <p className='flex text-gray-500 gap-2'><Timer/>{activity?.time_travel_each_location}</p>
        <Link href = {'https://www.google.com/maps/search/?api=1&query='+activity?.placeName} target='_blank' className='w-full'>
        <Button size={'sm'} variant ='outline' className='w-full mt-2'>View Details<ExternalLinkIcon/></Button>
        </Link>
    </div>  
  )
}

export default PlaceCardItem