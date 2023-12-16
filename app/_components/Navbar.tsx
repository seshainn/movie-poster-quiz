'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'
import { useTheme } from '@/context/ThemeProvider'
import { signOut, useSession } from 'next-auth/react'

const headingFont = localFont({ src: '../../public/fonts/font.woff2' })

const Navbar = () => {
  const { mode, setMode } = useTheme()
  const [toggleHam, setToggleHam] = useState(false)
  const { data: session, status } = useSession()
  //useSession hook is pretty slow which causes session to not exist during loading time. It is always advisable to use 'loading' status when rendering page.
  return (
    <>
      <div className='w-full h-14 border-b shadow-lg backdrop-blur bg-slate-100 dark:bg-dark-100 flex items-center fixed z-10'>
        <Image
          src='/collage-nav.jpg'
          alt='collage'
          fill
          style={{ objectFit: 'cover' }}
          className='opacity-30'
        />
        {status != 'loading' && (
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
            <h1 className='dark:text-lightTeal text-darkOrange italic font-semibold text-lg max-md:hidden'>
              welcome {session?.user?.email?.split('@')[0]}
            </h1>
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
              <div className='text-md font-semibold mr-15 dark:text-light-700 text-hover max-md:hidden'>
                <Link href='/profile'>Profile</Link>
              </div>
              <div className='text-md font-semibold mr-15 dark:text-light-700 text-hover max-md:hidden'>
                <Link href='/create-question'>Create-Question</Link>
              </div>
              <div className='text-md font-semibold mr-15 dark:text-light-700 text-hover max-md:hidden'>
                <Link href='/newgame'>New game</Link>
              </div>
              {!session ? (
                <div className='btn bg-color text-hover px-4 rounded-md text-black font-semibold hover:text-darkTeal dark:hover:text-darkTeal'>
                  <Link href='/login'>Login</Link>
                </div>
              ) : (
                <div className='btn bg-color text-hover px-4 rounded-md text-black font-semibold hover:text-darkTeal dark:hover:text-darkTeal'>
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: '/',
                        redirect: true,
                      })
                    }
                  >
                    Logout
                  </button>
                </div>
              )}
              <div className='md:hidden'>
                <button
                  type='button'
                  id='hamburger'
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
                  <div className='fixed left-0 top-0 bottom-0 flex flex-col w-full min-h-screen overflow-hidden self-end py-40 pl-12 text-lg dark:text-lightTeal text-darkOrange  uppercase bg-white dark:bg-black'>
                    <h1 className='absolute dark:text-lightTeal text-darkOrange italic font-semibold text-md lowercase top-[25%]'>
                      welcome {session?.user?.email?.split('@')[0]}
                    </h1>

                    <Link
                      href='/profile'
                      className='absolute border-b-2 border-hover top-[35%]'
                      onClick={() => {
                        const hambutton = document.querySelector('#hamburger')
                        if (hambutton) {
                          hambutton.classList.toggle('open-ham')
                          setToggleHam(!toggleHam)
                        }
                      }}
                    >
                      Profile
                    </Link>

                    <Link
                      href='/create-question'
                      className='absolute border-b-2 border-hover top-[45%]'
                      onClick={() => {
                        const hambutton = document.querySelector('#hamburger')
                        if (hambutton) {
                          hambutton.classList.toggle('open-ham')
                          setToggleHam(!toggleHam)
                        }
                      }}
                    >
                      Create Question
                    </Link>
                    <Link
                      href='/newgame'
                      className='absolute border-b-2 border-hover top-[55%]'
                      onClick={() => {
                        const hambutton = document.querySelector('#hamburger')
                        if (hambutton) {
                          hambutton.classList.toggle('open-ham')
                          setToggleHam(!toggleHam)
                        }
                      }}
                    >
                      New game
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
