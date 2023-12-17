'use client'
import { trpc } from '@/app/_trpc/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { User } from '@prisma/client'

const initialUserState: User = {
  id: '',
  email: '',
  numberOfGames: 0,
  highestScore: 0,
  otp: null,
  otpCreatedAt: null,
}

const Page = () => {
  const [userData, setUserData] = useState<User>(initialUserState)
  const [userMessage, setUserMessage] = useState('')

  const { refetch, isLoading, isFetching } = trpc.getUserProfile.useQuery(
    undefined,
    {
      enabled: false,
      onSuccess: (user: User) => {
        setUserData(user)
      },
      onError: (err) => {
        setUserMessage(err.message)
      },
    }
  )
  useEffect(() => {
    const fetchData = async () => {
      await refetch()
    }

    fetchData()
  }, [refetch])

  return (
    <>
      <div className='absolute -z-20 dark:bg-dark-100 w-full h-full'></div>
      <Image
        src='/profile.jpg'
        alt='profile'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-20 dark:opacity-30 -z-10'
      />
      {!isLoading && !isFetching && (
        <div className='flex flex-col text-darkOrange dark:text-lightTeal'>
          <h1 className='text-xl font-bold'>
            {userMessage ? userMessage : userData.email}
          </h1>
          <p className='text-lg mt-10'>
            Number of games played: {userData.numberOfGames}
          </p>
          <p className='text-lg mt-2'>Highest Score: {userData.highestScore}</p>
        </div>
      )}
    </>
  )
}
export default Page
