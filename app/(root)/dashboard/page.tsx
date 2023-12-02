'use client'
import React from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTheme } from '@/context/ThemeProvider'
import Image from 'next/image'

const headingFont = localFont({ src: '../../../public/fonts/font.woff2' })

const Page = () => {
  const { mode, setMode } = useTheme()
  return (
    <>
      <Image
        src='/collage.jpg'
        alt='collage'
        fill
        style={{ objectFit: 'cover' }}
        className='opacity-30 dark:bg-dark-100'
      />
      <div
        className={`${headingFont.className} flex-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2`}
      >
        <div className='px-4 py-2 bg-gradient-to-r from-lightOrange to-darkOrange dark:from-lightTeal dark:to-darkTeal text-2xl rounded-md mt-20 hover:text-darkTeal flex-center space-x-1 font-semibold'>
          <Link href='/login'>Resume Game</Link>
          <ArrowRight />
        </div>

        <div className='px-4 py-2 bg-gradient-to-r from-lightOrange to-darkOrange dark:from-lightTeal dark:to-darkTeal text-2xl rounded-md mt-20 hover:text-darkTeal flex-center space-x-1 font-semibold'>
          <Link href='/login'>New Game</Link>
          <ArrowRight />
        </div>
      </div>
    </>
  )
}

export default Page