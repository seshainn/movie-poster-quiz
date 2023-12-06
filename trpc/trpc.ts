import { options, CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { initTRPC, TRPCError } from '@trpc/server'
import { getServerSession } from 'next-auth'

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  const session = await getServerSession(options)
  const admin = false
  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  } else {
    return opts.next({
      ctx: {
        role: (session.user as CustomUser)?.role,
      },
    })
  }
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
