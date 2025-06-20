"use client"

import { useUser } from '@clerk/nextjs'
import { Hero } from '@/components/ui/animated-hero'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      redirect('/dashboard')
    }
  }, [isSignedIn, isLoaded])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <Hero />
}