import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trpc } from '@/app/_trpc/client'
import { useTheme } from '@/context/ThemeProvider'
import { useState } from 'react'

const emailSchema = z.object({
  email: z.string().email(),
})

const Emailform = () => {
  const { setOtpSuccess, setUserEmail } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = trpc.loginWithOtp.useMutation()

  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof emailSchema>
  >({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const { errors } = formState

  const submitEmail = ({ email }: z.infer<typeof emailSchema>) => {
    reset()
    setIsLoading(true)
    mutate(
      { email },
      {
        onSuccess: ({ success }) => {
          if (success) {
            setIsLoading(false)
            setUserEmail(email)
            setOtpSuccess(true)
          }
        },
      }
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitEmail)}>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <input
              type='email'
              placeholder='Enter email'
              {...register('email')}
              className='w-full bg-slate-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-slate-100 px-5 py-2 focus:outline-none'
            />
            <p className='text-red-500 text-sm'>{errors.email?.message}</p>
          </div>
          <button
            type='submit'
            className='w-full flex flex-center rounded-xl bg-color px-4 py-2 text-lg gap-2 md:6'
            disabled={isLoading}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-mail'
            >
              <rect width='20' height='16' x='2' y='4' rx='2' />
              <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
            </svg>
            {isLoading ? 'Sending OTP to email ... ' : 'Send OTP to Email'}
          </button>
        </div>
      </form>
    </>
  )
}

export default Emailform
