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
      // profile is returned by GitHub/Google from which we are then returning User. Role is created and added to user. The User, we are then using to populate role on JWT and session in the callbacks. This part of code is executed when the corresponding button is clicked on nextauth login form or when signIn() is executed on custom login form.
      profile(profile) {
        let userRole = 'GitHub User'
        if (profile?.email == process.env.NEXT_AUTH_ADMIN) {
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
        if (profile?.email == process.env.NEXT_AUTH_ADMIN) {
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
      //This part of code is executed when signIn("credentials", {}) is executed on custom login form. The email object inside credentials object has no purpose here as we are using custom login form. The user created and returned in the authorize() function is later used to add role to session and JWT. If null is returned by authorize(), it is error.
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'Enter email' },
      },
      async authorize(credentials, req) {
        let userRole = 'Custom User'
        if (credentials?.email == process.env.NEXT_AUTH_ADMIN) {
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
  //callbacks are executed at the end of all above logic. Here user.role is used to add role field in JWT and session.
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
