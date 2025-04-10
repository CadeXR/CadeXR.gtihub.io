'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { conthrax } from '@/app/fonts'

export default function BackButton() {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const containerStyle = {
    position: 'fixed' as const,
    top: '1rem',
    left: '1rem',
    zIndex: 50,
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  }

  const updateParticles = useCallback(() => {
    const buttonElement = buttonRef.current
    if (!buttonElement) return

    const bounds = buttonElement.getBoundingClientRect()
    const event = new CustomEvent('windowUpdate', {
      detail: {
        id: 'backbutton',
        bounds: {
          left: bounds.left,
          right: bounds.right,
          top: bounds.top,
          bottom: bounds.bottom,
          isActive
        }
      }
    })
    
    const scene = document.querySelector('canvas[data-scene]')
    scene?.dispatchEvent(event)
  }, [isActive])

  useEffect(() => {
    updateParticles()
  }, [isActive, updateParticles])

  useEffect(() => {
    window.addEventListener('resize', updateParticles)
    return () => window.removeEventListener('resize', updateParticles)
  }, [updateParticles])

  const handleClick = () => {
    // Create and append transition overlay for current scene (attack)
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-grow'
    document.body.appendChild(overlay)

    const scene = document.querySelector('canvas[data-scene]')
    scene?.dispatchEvent(new CustomEvent('startTransition', { 
      detail: { direction: 'shrink' } 
    }))
    
    setTimeout(() => {
      router.push('/home')
      
      // Create fade-out overlay for home scene
      const exitOverlay = document.createElement('div')
      exitOverlay.className = 'scene-transition-shrink'
      document.body.appendChild(exitOverlay)
      
      // Remove both overlays after complete transition
      setTimeout(() => {
        overlay.remove()
        exitOverlay.remove()
      }, 500)
    }, 3500) // Increased to match the slower fade-in animation
  }

  return (
    <div data-frosted-box="backbutton" style={containerStyle}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        className={conthrax.className}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          setIsActive(true)
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          setIsActive(false)
        }}
      >
        ←
      </button>
    </div>
  )
}











