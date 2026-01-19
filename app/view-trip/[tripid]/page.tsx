"use client"
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { Trip } from '@/app/my-trips/_components/MyTripCardItem';

import { useTripDetail, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex, useQuery } from 'convex/react';
import { useParams } from 'next/dist/client/components/navigation';
import React, { use, useEffect } from 'react'

function ViewTrip() {
    const {tripid}=useParams();
    const {UserDetail,setUserDetail}=useUserDetail();
    const convex = useConvex();
    const [tripData,setTripData]=React.useState<Trip>(); 
    // @ts-ignore
    const { tripDetailinfo,setTripDetailinfo } = useTripDetail();
    useEffect(()=>{
        UserDetail&& GetTrip();
    },[UserDetail])
    
    const GetTrip=async ()=>{
        const result = await convex.query(api.tripDetail.GetTripById,{tripId:tripid+'',uid:UserDetail?.id});
        
    
    console.log(result)
    setTripData(result);
    setTripDetailinfo(result?.tripDetail);
    }
    
  return (
    <div>
        <Itinerary  />
    </div>
  )
}

export default ViewTrip