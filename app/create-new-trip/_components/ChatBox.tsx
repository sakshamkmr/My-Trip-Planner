'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useUserDetail } from '@/app/provider'
import EmptyBoxState from './EmptyBoxState'

type Message = {
  role: 'user' | 'assistant'
  content: string
  ui?: string
}

type TripInfo = {
  origin: string
  destination: string
  groupSize: string
  budget: string
  duration: string
  hotels: Hotel[]
  itinerary: ItineraryDay[]
}

type Hotel = {
  hotelName: string
  address: string
  pricePerNight: string
  rating: number
  description?: string
}

type Activity = {
  placeName: string
  placeDetails: string
  ticketPricing?: string
  timeToTravel: string
  bestTimeToVisit: string
  placeAddress?: string
  geocoordinates?: {
    longitude: number
    latitude: number
  }
}

type ItineraryDay = {
  day: number
  bestTimeToVisit: string
  activities: Activity[]
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFinal, setIsFinal] = useState(false)
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null)

  const { userDetail } = useUserDetail()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSend = async (isFinalTrip = false) => {
    if (!userInput.trim() && !isFinalTrip) return

    setLoading(true)

    const newUserMessage: Message = {
      role: 'user',
      content: userInput || 'Okay great',
    }

    setMessages(prev => [...prev, newUserMessage])
    setUserInput('')

    try {
      const result = await axios.post('/api/aimodel', {
        messages: [...messages, newUserMessage],
        isFinal: isFinalTrip,
      })

      const aiMessage: Message = {
        role: 'assistant',
        content: result.data.resp,
        ui: result.data.ui,
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.ui === 'final' && !isFinal) {
      setIsFinal(true)
      setUserInput('Okay great')
      onSend(true)
    }
  }, [messages])

  return (
    <div className="flex flex-col h-[85vh] bg-gray-50 border rounded-2xl p-5 shadow-lg">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.length === 0 && 
          <EmptyBoxState onSelectOption={(v:string)=>{setUserInput(v);onSend()}} />
        }
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                  {message.content}
                </div>
              </div>
            )}

            {message.role === 'assistant' && (
              <div className="flex justify-start">
                <div className="max-w-lg bg-white border p-4 rounded-lg shadow-sm">
                  <p>{message.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-lg bg-white border p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!isFinal && (
        <div className="border-t pt-4">
          <div className="relative">
            <Textarea
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Start typing here..."
              className="w-full h-20 resize-none p-4 border rounded-2xl focus-visible:ring-2 focus-visible:ring-primary"
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
              className="absolute bottom-3 right-3"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
