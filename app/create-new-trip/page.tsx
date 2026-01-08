    'use client'
    import React from 'react'
    import { useState } from 'react'
    import ChatBox from './_components/ChatBox'


    import { Globe2, MapPin } from 'lucide-react'
    import { Button } from '@/components/ui/button'




    function CreateNewTrip() {
    return (
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
            <ChatBox/>
        </div>
        <div>
            Map and trip Plan to Display
        </div>
        </div>
    )
    }

    export default CreateNewTrip
