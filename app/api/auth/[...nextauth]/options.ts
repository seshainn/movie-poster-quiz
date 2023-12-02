import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

import { AuthOptions, ISODateString } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type CustomUser = {
  id?: string | null
  name?: string | null
  email?: string | null
  role?: string | null
  avatar?: string | null
}
export type CustomSession = {
  user?: CustomUser
  expires: ISODateString
}

export const options: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = 'GitHub User'
        if (profile?.email == 'seshu.giri@gmail.com') {
          userRole = 'admin'
        }
        return {
          ...profile,
          role: userRole,
        }
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = 'Google User'
        if (profile?.email == 'seshu.giri@gmail.com') {
          userRole = 'admin'
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'Enter email' },
      },
      async authorize(credentials, req) {
        let userRole = 'Custom User'
        if (credentials?.email == 'seshu.giri@gmail.com') {
          userRole = 'admin'
        }

        const user = {
          id: '',
          name: '',
          email: credentials?.email,
          role: userRole,
        }

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (session?.user) session.user.role = token.role as CustomUser['role']
      return session
    },
  },
}
