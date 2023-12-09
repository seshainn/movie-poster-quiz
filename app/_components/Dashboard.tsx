'use client'
import React from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const headingFont = localFont({ src: '../../public/fonts/font.woff2' })

const Dashboard = () => {
  return (
    <>
      <div className='absolute -z-20 dark:bg-dark-100 w-full h-full'></div>
      <Image
        src='/collage.jpg'
        alt='collage'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-30 -z-10'
      />
      <div className={`${headingFont.className} flex-center flex-col`}>
        <div className='px-4 py-2 bg-gradient-to-r from-lightOrange to-darkOrange dark:from-lightTeal dark:to-darkTeal text-2xl rounded-md mt-10 hover:text-darkTeal flex-center space-x-1 font-semibold'>
          <Link href='/'>Resume Game</Link>
          <ArrowRight />
        </div>

        <div className='px-4 py-2 bg-gradient-to-r from-lightOrange to-darkOrange dark:from-lightTeal dark:to-darkTeal text-2xl rounded-md mt-20 hover:text-darkTeal flex-center space-x-1 font-semibold'>
          <Link href='/newgame'>New Game</Link>
          <ArrowRight />
        </div>
      </div>
    </>
  )
}

export default Dashboard
