'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { conthrax } from '@/app/fonts'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()
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
    // First transition: fade to white
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-grow'  // Start transparent and grow to white
    document.body.appendChild(overlay)

    const scene = document.querySelector('canvas[data-scene]')
    scene?.dispatchEvent(new CustomEvent('startTransition', { 
      detail: { direction: 'grow' } 
    }))

    // Wait for fade to white to complete, then navigate
    setTimeout(() => {
      // If we're on /home/, go to root ('/'), otherwise go to /home/
      if (pathname === '/home/') {  // Updated to match exact path
        router.push('/')  // This will go to the landing page
      } else {
        router.push('/home/')  // Updated to include trailing slash
      }
      
      // After navigation, fade from white
      const exitOverlay = document.createElement('div')
      exitOverlay.className = 'scene-transition-shrink'  // Start white and fade out
      document.body.appendChild(exitOverlay)
      
      // Remove overlays after transition completes
      setTimeout(() => {
        overlay.remove()
        exitOverlay.remove()
      }, 500)
    }, 3500)  // Match this with your CSS transition duration
  }

  return (
    <div data-frosted-box="backbutton" style={containerStyle}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          setIsActive(true)
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          setIsActive(false)
        }}
        className={conthrax.className}
        style={buttonStyle}
      >
        ←
      </button>
    </div>
  )
}

















