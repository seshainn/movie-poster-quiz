import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTheme } from '@/context/ThemeProvider'
import { trpc } from '@/app/_trpc/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const otpSchema = z.object({
  otp: z.string().length(6),
})

const Otpform = () => {
  const { userEmail, setLoginMessage, setOtpSuccess } = useTheme()
  const [userOtp, setUserOtp] = useState('')
  const router = useRouter()

  const { refetch } = trpc.authorizeUser.useQuery(
    { email: userEmail },
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.otp === userOtp && data.otpCreatedAt) {
          const prev = new Date(data.otpCreatedAt)
          const now = new Date()
          const diff = now.getTime() - prev.getTime()
          if (diff <= 900000) {
            signIn('credentials', {
              email: data.email,
              callbackUrl: '/dashboard',
              redirect: true,
            })
          } else {
            console.log('I am Here')
            setLoginMessage('You OTP is expired. Please login again.')
            setOtpSuccess(false)
            router.push('/login')
          }
        } else {
          setError('otp', { type: 'manual', message: 'Incorrect OTP' })
        }
      },
    }
  )

  const { register, handleSubmit, formState, reset, setError } = useForm<
    z.infer<typeof otpSchema>
  >({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  })

  const { errors } = formState

  const submitOtp = ({ otp }: z.infer<typeof otpSchema>) => {
    setUserOtp(otp)
    refetch()
    reset()
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitOtp)}>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <input
              type='otp'
              placeholder='Enter OTP here'
              {...register('otp')}
              className='w-full bg-slate-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-slate-100 px-5 py-2 focus:outline-none'
            />
            <p className='text-red-500 text-sm font-semibold'>
              {errors.otp?.message}
            </p>
          </div>
          <button
            type='submit'
            className='w-full rounded-xl bg-color px-4 py-2 text-lg'
          >
            Submit OTP
          </button>
        </div>
      </form>
    </>
  )
}

export default Otpform
