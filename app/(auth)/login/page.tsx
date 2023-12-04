'use client'

import { signIn } from 'next-auth/react'
import Otpform from './otp'
import Emailform from './email'

import { useTheme } from '@/context/ThemeProvider'

const Login = () => {
  const { otpSuccess, loginMessage } = useTheme()

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100'>
      <div className='flex flex-col items-center justify-center bg-white rounded-xl space-y-5 p-8 w-full max-w-lg'>
        <h1 className='text-black text-xl font-medium'>{loginMessage}</h1>
        <div className='w-full'>{otpSuccess ? <Otpform /> : <Emailform />}</div>
        <div className='w-full flex-between'>
          <div className='w-1/2 border-2 border-slate-200'></div>
          <div className='text-slate-400 flex-center px-3'>
            <p>or</p>
          </div>
          <div className='w-1/2 border-2 border-slate-200'></div>
        </div>
        <button
          type='submit'
          className='rounded-xl bg-color px-2 py-2 text-lg w-full mt-10'
          onClick={async () => {
            await signIn('github', {
              callbackUrl: '/dashboard',
              redirect: true,
            })
          }}
        >
          Login with GITHUB
        </button>
        <div className='w-full border-2 border-slate-200'></div>
        <button
          type='submit'
          className='rounded-xl bg-color px-2 py-2 text-lg w-full mt-10'
          onClick={async () => {
            await signIn('google', {
              callbackUrl: '/dashboard',
              redirect: true,
            })
          }}
        >
          Login with GOOGLE
        </button>
      </div>
    </div>
  )
}

export default Login
