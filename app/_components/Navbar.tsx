'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'
import { useTheme } from '@/context/ThemeProvider'

const headingFont = localFont({ src: '../../public/fonts/font.woff2' })

const Navbar = () => {
  const { mode, setMode } = useTheme()
  const [toggleHam, setToggleHam] = useState(false)

  return (
    <>
      <div className='w-full h-14 border-b shadow-lg backdrop-blur bg-slate-100 dark:bg-dark-100 flex items-center relative z-10'>
        <Image
          src='/collage-nav.jpg'
          alt='collage'
          fill
          style={{ objectFit: 'cover' }}
          className='opacity-30'
        />
        <div className='absolute flex-between w-full px-10 z-20'>
          <Link href='/'>
            <div className='flex-center'>
              <div className='border rounded-full bg-mediumOrange dark:bg-lightTeal p-0.5'>
                <Image src='/movie.svg' alt='logo' height={30} width={30} />
              </div>
              <p
                className={`${headingFont.className} text-lg text-neutral-700 dark:text-light-700 text-hover`}
              >
                QuizPosters
              </p>
            </div>
          </Link>
          <div className='space-x-6 flex-between'>
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
            <div className='text-md font-semibold mr-15 dark:text-light-700 text-hover max-sm:hidden'>
              <Link href='/about'>About</Link>
            </div>
            <div className='text-md font-semibold mr-15 dark:text-light-700 text-hover max-sm:hidden'>
              <Link href='/about'>Profile</Link>
            </div>
            <div className='text-md font-semibold mr-15 dark:text-light-700 text-hover max-sm:hidden'>
              <Link href='/about'>Donate</Link>
            </div>
            <div className='text-md font-semibold mr-15 dark:text-light-700 text-hover max-sm:hidden'>
              <Link href='/about'>Create Question</Link>
            </div>
            <div className='sm:hidden'>
              <button
                type='button'
                className='w-[24px] h-[24px] relative z-40' //z-40 means visibility on top of div
                onClick={(e) => {
                  e.currentTarget.classList.toggle('open-ham') //open-ham is a new class added
                  setToggleHam(!toggleHam)
                }}
              >
                <span className='hamburger-top'></span>
                <span className='hamburger-middle translate-y-[7px]'></span>
                <span className='hamburger-bottom translate-y-[14px]'></span>
              </button>
              {toggleHam && (
                <div className='fixed left-0 top-0 bottom-0 flex flex-col w-full min-h-screen overflow-hidden self-end py-40 pl-12 space-y-5 text-lg text-black dark:text-white uppercase bg-white dark:bg-black'>
                  <Link href='/about' className='text-hover'>
                    About
                  </Link>
                  <Link href='/profile' className='text-hover'>
                    Profile
                  </Link>
                  <Link href='/donate' className='text-hover'>
                    Donate
                  </Link>
                  <Link href='/createquestion' className='text-hover'>
                    Create Question
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
