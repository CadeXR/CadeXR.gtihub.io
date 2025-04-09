'use client'

import Scene from '@/components/Background/Scene'
import FrostedWindow from '@/components/UI/FrostedWindow'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [windowPosition, setWindowPosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 - 150 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 100 : 0 
  })

  useEffect(() => {
    // Clean up any existing overlays first
    document.querySelectorAll('.scene-transition-overlay').forEach(el => el.remove())
    
    // Create initial white overlay
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '1'
    document.body.appendChild(overlay)

    // Force reflow
    overlay.getBoundingClientRect()

    // Fade out the white overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '0'
      
      // Remove overlay after animation
      setTimeout(() => {
        overlay.remove()
      }, 3500)
    })
  }, [])

  const handleEnter = () => {
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '0'
    document.body.appendChild(overlay)

    overlay.getBoundingClientRect()
    overlay.style.opacity = '1'
    
    setTimeout(() => {
      router.push('/home')
    }, 3500)
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Scene />
      
      <FrostedWindow
        id="main-window"
        isOpen={true}
        onClose={() => {}}
        defaultPosition={windowPosition}
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


















