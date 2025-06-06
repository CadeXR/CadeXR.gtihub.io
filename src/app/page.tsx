'use client'

import Scene from '@/components/Background/Scene'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  // Automatically redirect to home page after a short delay
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/home')
    }, 0) // 1 second delay for the scene to initialize
    
    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Scene />
      {/* Optional loading indicator */}
      <div className="fixed inset-0 flex items-center justify-center text-white opacity-50">
        <div className="animate-pulse">Loading...</div>
      </div>
    </main>
  )
}



















