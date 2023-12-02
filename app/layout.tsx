import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import Providers from './_components/Providers'
import AuthProvider from './_components/AuthProvider'

export const metadata: Metadata = {
  title: 'Movie Poster Quiz',
  description:
    'Test your hollywood knowledge by guessing the movie name of the poster.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <ThemeProvider>
        <body>
          <AuthProvider>
            <Providers>{children}</Providers>
          </AuthProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
