'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'
import axios from 'axios'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUI from './GroupSizeUI'
import BudgetUI from './BudgetUI'
import NumberOfDaysUI from './NumberOfDaysUI'
import FinalUi from './FinalUI'
import { on } from 'events'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';

type Message = {
  role: 'user' | 'assistant'
  content: string
  ui?: string
}
 export type TripInfo = {
  origin: string
  destination: string
  groupSize: string
  budget: string
  duration: string
  hotels: Hotel[]
  itinerary: ItineraryDay[]
}
 export type Hotel = {
  hotelName: string
  hotel_address: string
  pricePerNight: string
  rating: number
  description?: string
}
 export type Activity = {
  placeName: string
  placeDetails: string
  ticketPricing?: string
  time_travel_each_location: string
  best_Time_To_Visit: string
  placeAddress?: string
  geocoordinates?: {
    longitude: number
    latitude: number
  }
}
 export type ItineraryDay = {
  day: number
  day_plan : string
  best_Time_To_Visit_day: string
  activities: Activity[]
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFinal, setIsFinal] = useState(false)
  const [tripDetails, setTripDetails] = useState<TripInfo>();
  const SaveTripDetail=useMutation(api.tripDetail.CreateTripDetail);
  const {userDetail, setUserDetail} = useUserDetail();
  const {tripDetailinfo, settripDetailinfo} = useTripDetail();

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const onSend = async (isFinalTrip = false) => {
    if (!userInput.trim() && !isFinalTrip) return
    setLoading(true)
    setUserInput('')

    const newUserMessage: Message = {
      role: 'user',
      content: userInput ?? '',
    }

    setMessages(prev => [...prev, newUserMessage])
    setUserInput('')
    setLoading(true)

    try {
      const res = await axios.post('/api/aimodel', {
        messages: [...messages, newUserMessage],
        isFinal: isFinal,
      })

      console.log("TRIP PLANNER RESPONSE:", res.data);

      const aiMessage: Message = {
        role: 'assistant',
        content: res?.data?.resp,
        ui: res?.data?.ui,
      }


      !isFinal &&setMessages(prev => [...prev, aiMessage])
      if(isFinal){
        setTripDetails(res?.data?.trip_plan);
        settripDetailinfo(res?.data?.trip_plan);
        const tripId = uuidv4();
        await SaveTripDetail({
          tripId: tripId,
          uid: userDetail?._id,
          tripDetail: res?.data?.trip_plan,
        });
    }
    } 
    
    
    
    catch (e) {
      console.error('AI Error:', e)
    } finally {
      setLoading(false)
    }
  }

  // ✅ FINAL trigger — ONLY ONCE
  useEffect(() => {
  const lastMsg = messages[messages.length - 1];
  if (lastMsg?.ui === 'final') {
    setIsFinal(true);
    setUserInput('Okay,great! Please finalize my trip plan.');
    
  }
}, [messages]);
useEffect(() => {
    if(isFinal && userInput) {
      setUserInput('Okay,great! Please finalize my trip plan.');
      onSend();
    }
  }, [isFinal]);

  const renderGenerativeUI = (ui?: string) => {
    switch (ui) {
      case 'groupSize':
        return <GroupSizeUI onSelectedOption={v => { setUserInput(v); onSend() }} />
      case 'budget':
        return <BudgetUI onSelectOption={v => { setUserInput(v); onSend() }} />
      case 'number_of_days':
        return <NumberOfDaysUI onSelectOption={v => { setUserInput(v); onSend() }} />
      case 'final':
        return <FinalUi viewTrip={tripDetails}
        disabled={!tripDetails}
        />//look into it
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-[85vh] border shadow rounded-2xl p-5 shadow-lg">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 && (
          <EmptyBoxState onSelectOption={v => { setUserInput(v); onSend() }} />
        )}

        {messages.map((m, i) => (
          <div key={i}>
            {m.role === 'user' ? (
              <div className="flex justify-end">
                <div className="bg-primary text-white px-4 py-2 rounded-lg max-w-lg">
                  {m.content}
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-white border p-4 rounded-lg max-w-lg">
                  <p>{m.content}</p>
                  {renderGenerativeUI(m.ui)}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 items-center bg-white p-4 border rounded-lg max-w-lg">
            <Loader2 className="animate-spin h-5 w-5" />
            AI is thinking…
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!isFinal && (
        <div className="border-t pt-4 relative">
          <Textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Start typing here..."
            className="h-20"
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSend()
              }
            }}
          />
          <Button
            onClick={() => onSend()}
            disabled={loading || !userInput.trim()}
            size="icon"
            className="absolute bottom-3 right-3"
          >
            <Send />
          </Button>
        </div>
      )}
    </div>
  )
}
