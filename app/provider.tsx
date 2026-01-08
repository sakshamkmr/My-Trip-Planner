"use client"
import React, { useState,useEffect, useContext } from 'react'
import Header from './_components/header'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext'



function Provider({
  children,
}: {
  children: React.ReactNode
}) {

  const createUserMutation = useMutation(api.user.CreateNewUser)
  const { user } = useUser()
  const [userDetail,setUserDetail] = useState<any>()

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
    <div>
      <Header />
      {children}
    </div>
    </UserDetailContext.Provider>
  )
}

export default Provider
export const useUserDetail =()=>{
  return useContext(UserDetailContext);
}
