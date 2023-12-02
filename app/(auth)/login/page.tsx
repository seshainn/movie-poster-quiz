'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { z } from 'zod'

const Login = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const emailSchema = z.string().email()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      emailSchema.parse(email)

      console.log('Valid email:', email)

      signIn('credentials', {
        email: email,
        callbackUrl: '/dashboard',
        redirect: true,
      })

      setError('')
    } catch (validationError) {
      setError('Please enter a valid email address.')
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100'>
      <div className='flex flex-col items-center justify-center bg-white rounded-xl space-y-5 p-8 w-full max-w-lg'>
        <h1 className='text-black text-lg font-medium'>Login Form</h1>
        <div className='w-full'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col'>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  className='w-full bg-slate-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-slate-100 px-5 py-2 focus:outline-none'
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className='text-red-500 text-sm'>{error}</p>}
              </div>
              <button
                type='submit'
                className='w-full rounded-xl bg-color px-4 py-2 text-lg'
              >
                Send OTP to Email
              </button>
            </div>
          </form>
        </div>
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
