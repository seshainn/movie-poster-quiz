'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'
import { useTheme } from '@/context/ThemeProvider'

const headingFont = localFont({ src: '../../public/fonts/font.woff2' })

const Navbar = () => {
  const { mode, setMode } = useTheme()

  return (
    <div className='w-full h-14 border-b shadow-lg backdrop-blur bg-slate-100 dark:bg-dark-100 flex items-center relative'>
      <Image
        src='/collage-nav.jpg'
        alt='collage'
        fill
        objectFit='cover'
        className='opacity-30'
      />
      <div className='absolute flex-between w-full px-10'>
        <Link href='/'>
          <div className='flex-center'>
            <div className='border rounded-full bg-orange-400 dark:bg-mediumTeal p-0.5'>
              <Image src='/movie.svg' alt='logo' height={30} width={30} />
            </div>
            <p
              className={`${headingFont.className} text-lg text-neutral-700 dark:text-light-700 hover:text-darkTeal dark:hover:text-darkTeal`}
            >
              QuizPosters
            </p>
          </div>
        </Link>
        <div className='space-x-4 flex-between'>
          {mode === 'light' ? (
            <div
              onClick={() => {
                setMode('dark')
                localStorage.theme = 'dark'
              }}
            >
              <Image
                src='/sun.svg'
                alt='sun'
                width={20}
                height={20}
                className='active-theme'
              />
            </div>
          ) : (
            <div
              onClick={() => {
                setMode('light')
                localStorage.theme = 'light'
              }}
            >
              <Image src='/moon.svg' alt='moon' width={20} height={20} />
            </div>
          )}
          <div className='text-md font-semibold mr-15 hover:text-darkTeal dark:text-light-700 dark:hover:text-darkTeal'>
            <Link href='/about'>About</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
