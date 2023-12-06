'use client'
import { Medal } from 'lucide-react'
import React from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Dashboard from '../_components/Dashboard'

const headingFont = localFont({ src: '../../public/fonts/font.woff2' })

const Home = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <>
      <Image
        src='/collage.jpg'
        alt='collage'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-30 dark:bg-dark-100'
      />
      {status != 'loading' &&
        (!session ? (
          <div
            className={`${headingFont.className} flex-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2`}
          >
            <div className='bg-lightOrange dark:bg-lightTeal px-4 py-2 rounded-full flex-center space-x-2 shadow-sm backdrop-blur'>
              <Medal className='w-6 h-6' />
              <p className='uppercase text-md'>Movie Poster Quiz</p>
            </div>

            <div className='px-4 py-2 bg-gradient-to-r from-lightOrange to-darkOrange dark:from-lightTeal dark:to-darkTeal text-2xl rounded-md mt-20 hover:text-darkTeal flex-center space-x-1'>
              <Link href='/login'>Login to play</Link>
              <ArrowRight />
            </div>
          </div>
        ) : (
          <Dashboard />
        ))}
    </>
  )
}

export default Home
