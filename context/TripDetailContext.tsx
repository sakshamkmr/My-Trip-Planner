import { TripInfo } from '@/app/create-new-trip/_components/ChatBox'
import React, { createContext, useContext } from 'react'

export type TripDetailContextType = {
  tripDetailInfo: TripInfo | null
  setTripDetailInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>
}

export const TripDetailContext =
  createContext<TripDetailContextType | undefined>(undefined)

export const useTripDetail = () => {
  const context = useContext(TripDetailContext)
  if (!context) {
    throw new Error('useTripDetail must be used inside TripDetailProvider')
  }
  return context
}
