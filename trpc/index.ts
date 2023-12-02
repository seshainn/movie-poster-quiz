import { router, publicProcedure } from './trpc'
import { db } from '@/db'

export const appRouter = router({})

export type AppRouter = typeof appRouter
