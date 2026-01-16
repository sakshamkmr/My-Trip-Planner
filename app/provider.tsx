"use client"
import React, { useState,useEffect, useContext } from 'react'
import Header from './_components/header'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext'
import { TripDetailContext, TripDetailContextType } from '@/context/TripDetailContext'
import { TripInfo } from './create-new-trip/_components/ChatBox'



function Provider({
  children,
}: {
  children: React.ReactNode
}) {

  const createUserMutation = useMutation(api.user.CreateNewUser)
  const { user } = useUser()
  const [userDetail,setUserDetail] = useState<any>()
  const [tripDetailinfo,settripDetailinfo] = useState<TripInfo | null>(null);

  useEffect(() => {
    if (user) {
      saveUserToDB()
    }
  }, [user])

  const saveUserToDB = async () => {
    if (!user) return

    const result = await createUserMutation({
      email: user.primaryEmailAddress?.emailAddress ?? '',
      imageUrl: user.imageUrl,
      name: user.fullName ?? '',
    })
    setUserDetail(result)
  }

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <TripDetailContext.Provider value={{tripDetailinfo,settripDetailinfo}}>
    <div>
      <Header />
      {children}
    </div>
    </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider
export const useUserDetail =()=>{
  return useContext(UserDetailContext);
}
export const useTripDetail =():TripDetailContextType|undefined=>{
  return useContext(TripDetailContext);
}