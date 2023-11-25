import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import localFont from 'next/font/local'

const headingFont = localFont({ src: '../../public/fonts/font.woff2' })

const Footer = () => {
  return (
    <div className={`${headingFont.className} fixed w-full bottom-0 p-1`}>
      <div className='md:max-w-screen-2xl mx-auto flex-between w-full'>
        <Link href='/'>
          <div className='flex-center'>
            <Image src='/twitter.svg' alt='logo' height={20} width={20} />
            <p className='text-sm text-neutral-700 dark:text-neutral-300'>
              seshualiasgiri
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Footer
