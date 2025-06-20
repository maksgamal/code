import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import TanstackClientProvider from '@/components/providers/tanstack-client-provider'
import ClerkClientProvider from '@/components/providers/clerk-client-provider'
import { SupabaseProvider } from '@/utils/supabase/context'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'LeadFuel - B2B Lead Generation Platform',
  description: 'Advanced lead generation and prospecting platform for sales teams, recruiters, and growth agencies.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TanstackClientProvider>
            <SupabaseProvider>
              {children}
            </SupabaseProvider>
          </TanstackClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}