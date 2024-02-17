import { router, publicProcedure, privateProcedure } from './trpc'
import { db } from '@/db'
import { z } from 'zod'
import { cryptoRandomStringAsync } from 'crypto-random-string'
import { sendEmail } from '@/utils/mail'
import { TRPCError } from '@trpc/server'
import lqip from 'lqip-modern'

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
  getUserProfile: privateProcedure.query(async ({ ctx }) => {
    if (ctx?.email) {
      const existingUser = await db.user.findUnique({
        where: {
          email: ctx.email,
        },
      })
      if (existingUser) {
        return { ...existingUser, success: true }
      } else {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User could not be found. Contact Admin.',
        })
      }
    }
  }),
  updateUser: privateProcedure
    .input(z.object({ score: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx?.email) {
        const existingUser = await db.user.findUnique({
          where: {
            email: ctx.email,
          },
        })
        if (!existingUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found for update. Contact Admin',
          })
        }
        await db.user.update({
          where: {
            email: ctx.email,
          },
          data: {
            numberOfGames: {
              increment: 1,
            },
            highestScore: {
              increment:
                input.score > existingUser.highestScore
                  ? input.score - existingUser.highestScore
                  : 0,
            },
          },
        })
      }
      return { success: true }
    }),
  uploadImage: privateProcedure
    .input(
      z.object({
        rightans: z.string(),
        url: z.string(),
        wrong1: z.string(),
        wrong2: z.string(),
        wrong3: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const approved = ctx.role === 'admin' ? true : false
      const imgData = await fetch(input.url)
      const arrayBufferData = await imgData.arrayBuffer()
      const lqipData = await lqip(Buffer.from(arrayBufferData))
      if (ctx?.email) {
        const existingUser = await db.user.findUnique({
          where: {
            email: ctx?.email,
          },
        })
        if (existingUser) {
          await db.movie.create({
            data: {
              url: input.url,
              width: lqipData.metadata.originalWidth,
              height: lqipData.metadata.originalHeight,
              blururl: lqipData.metadata.dataURIBase64,
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
    const movies = await db.movie.aggregateRaw({
      pipeline: [
        {
          $match: {
            approved: true,
          },
        },
        {
          $project: {
            id: 1,
            url: 1,
            blururl: 1,
            rightans: 1,
            wrong1: 1,
            wrong2: 1,
            wrong3: 1,
            chosen: 1,
          },
        },
        {
          $sample: {
            size: 10,
          },
        },
      ],
    })
    return movies
  }),
})

export type AppRouter = typeof appRouter
