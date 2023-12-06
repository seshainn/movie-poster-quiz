import { router, publicProcedure } from './trpc'
import { db } from '@/db'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { cryptoRandomStringAsync } from 'crypto-random-string'
import { sendEmail } from '@/utils/mail'
import { TRPCError } from '@trpc/server'

export const appRouter = router({
  loginWithOtp: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      const newOtp = await cryptoRandomStringAsync({
        length: 6,
        characters: '0123456789',
      })
      try {
        await sendEmail(input.email, 'OTP for login to MoviePosters ', newOtp)
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
      const existingUser = await db.user.findUnique({
        where: { email: input.email },
      })
      if (existingUser) {
        await db.user.update({
          where: { email: input.email },
          data: {
            otp: newOtp,
            otpCreatedAt: new Date(),
          },
        })
      } else {
        await db.user.create({
          data: {
            email: input.email,
            numberOfGames: 0,
            highestScore: 0,
            otp: newOtp,
            otpCreatedAt: new Date(),
          },
        })
      }
      return { success: true }
    }),
  authorizeUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const existingUser = await db.user.findUnique({
        where: {
          email: input.email,
        },
      })

      return { ...existingUser, success: true }
    }),
  uploadImage: publicProcedure
    .input(z.instanceof(FormData))
    .mutation(async ({ input }) => {
      console.log('inside uploadImage procedure ', input)
    }),
})

export type AppRouter = typeof appRouter
