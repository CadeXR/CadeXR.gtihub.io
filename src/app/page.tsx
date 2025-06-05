'use client'

import Scene from '@/components/Background/Scene'
import FrostedWindow from '@/components/UI/FrostedWindow'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [windowPosition, setWindowPosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 - 150 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 100 : 0 
  })

  // Remove the useEffect that creates and fades out the overlay

  const handleEnter = () => {
    // Direct navigation without transition
    router.push('/home')
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Scene />
      
      <FrostedWindow
        id="Welcome!"
        isOpen={true}
        onClose={() => {}}
        defaultPosition={windowPosition}
        showCloseButton={false}
      >
        <div style={{ minWidth: '300px' }}>
          <h2 
            style={{ 
              color: 'white', 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem',
              textAlign: 'center' 
            }}
          >
            CadeXR
          </h2>
          <button 
            onClick={handleEnter}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              width: '100%',
              height: '48px',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Enter
          </button>
        </div>
      </FrostedWindow>
    </main>
  )
}



















