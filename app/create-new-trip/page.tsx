    'use client'
import React from 'react'    
import { useState } from 'react'
import ChatBox from './_components/ChatBox'
import { Globe2, MapPin, Plane } from 'lucide-react'    
import { Button } from '@/components/ui/button'
import Itinerary from './_components/Itinerary'
import GlobalMap from './_components/GlobalMap'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";







    function CreateNewTrip() {
        const [activeIndex, setActiveIndex] = useState<number>(1);
    return (
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
        <div>
            <ChatBox/>
        </div>
        <div className="col-span-2 relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl bg-black">

  {/* Map / Itinerary */}
  <div className="h-full w-full">
    {activeIndex === 0 ? <Itinerary /> : <GlobalMap />}
  </div>

  {/* Gradient overlay */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

  {/* Toggle Button with Tooltip */}
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            h-14 w-14 rounded-full
            bg-orange-500 hover:bg-orange-600
            shadow-xl backdrop-blur-md
            transition-all duration-300
            hover:scale-110
          "
        >
          {activeIndex === 0 ? (
            <Plane className="h-6 w-6" />
          ) : (
            <Globe2 className="h-6 w-6" />
          )}
        </Button>
      </TooltipTrigger>

      <TooltipContent side="top" className="text-sm">
        Switch between Map and Trip
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

</div>

    
    </div>
    )
}

    export default CreateNewTrip
