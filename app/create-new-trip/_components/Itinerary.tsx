"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./ChatBox";
import  { ItineraryDay } from "./ChatBox";

function Itinerary() {
  // @ts-ignore
  const { tripDetailinfo,setTripDetailinfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    if (tripDetailinfo) {
      setTripData(tripDetailinfo);
    }
  }, [tripDetailinfo]);

  const data = tripData
    ? [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tripData.hotels?.map((hotel: any, index: number) => (
                <HotelCardItem key={index} hotel={hotel} />
              ))}
            </div>
          ),
        },
        ...tripData.itinerary.map((dayData: ItineraryDay) => ({
          title: `Day ${dayData.day}`,
          content: (
            <div>
              <p>Best Time : {dayData.best_Time_To_Visit_day}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dayData.activities.map((activity: any, idx: number) => (
                  <PlaceCardItem key={idx} activity={activity} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];

  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData ? (
        <Timeline data={data} tripData={tripData} />
      ) : (
        <div className="relative w-full h-full">
          <h2 className="absolute bottom-20 left-20 flex items-center gap-2 text-3xl text-white">
            <ArrowLeft />
            Build your perfect trip here!
          </h2>

          <Image
            src="/Travel.png"
            alt="Travel"
            width={800}
            height={800}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      )}
    </div>
  );
}

export default Itinerary;
