import { router, publicProcedure, privateProcedure } from './trpc'
import { db } from '@/db'
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
  uploadImage: privateProcedure
    .input(
      z.object({
        rightans: z.string(),
        url: z.string(),
        wrong1: z.string(),
        wrong2: z.string(),
        wrong3: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const approved = ctx.role === 'admin' ? true : false
      if (ctx?.email) {
        const existingUser = await db.user.findUnique({
          where: {
            email: ctx?.email,
          },
        })
        if (existingUser) {
          await db.movie.create({
            data: {
              id: input.id,
              url: input.url,
              rightans: input.rightans,
              wrong1: input.wrong1,
              wrong2: input.wrong2,
              wrong3: input.wrong3,
              chosen: '',
              approved: approved,
              userId: existingUser.id,
            },
          })
        } else {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message:
              'User not on database. Try after signing out and signing in.',
          })
        }
      } else {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not present on session. Contact Admin.',
        })
      }
      return { success: true }
    }),
  moviesForNewgame: privateProcedure.query(async () => {
    const movies = await db.$queryRaw`
    SELECT id, url, rightans, wrong1, wrong2, wrong3, chosen, RAND() as randomNumber
    FROM Movie
    WHERE approved = true
    ORDER BY randomNumber
    LIMIT 10;`
    return movies
  }),
})

export type AppRouter = typeof appRouter
