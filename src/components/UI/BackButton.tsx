'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { conthrax } from '@/app/fonts'
import { useMediaQuery } from 'react-responsive'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const isVerySmall = useMediaQuery({ maxWidth: 480 })
  
  // Don't show back button on homepage
  if (pathname === '/' || pathname === '/home' || pathname === '/home/') {
    return null
  }

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--spacing-sm)',
    left: 'var(--spacing-sm)',
    zIndex: 50,
    padding: isVerySmall ? '0.25rem' : '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    height: 'var(--back-button-size)',
    width: 'var(--back-button-size)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    width: isVerySmall ? '32px' : '40px',
    height: isVerySmall ? '32px' : '40px',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    fontSize: isVerySmall ? '1rem' : '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  }

  // Update particle system when button state changes
  const updateParticleSystem = useCallback(() => {
    const buttonElement = document.querySelector('[data-frosted-box="backbutton"]')
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
    updateParticleSystem()
  }, [isActive, updateParticleSystem])

  useEffect(() => {
    window.addEventListener('resize', updateParticleSystem)
    return () => window.removeEventListener('resize', updateParticleSystem)
  }, [updateParticleSystem])

  const handleClick = () => {
    // Direct navigation without any transition
    if (pathname === '/home/') {
      router.push('/')
    } else {
      router.push('/home/')
    }
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

























