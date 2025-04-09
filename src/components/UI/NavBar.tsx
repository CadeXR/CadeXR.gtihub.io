'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface NavBarProps {
  onOpenAbout?: () => void
  onOpenSocials?: () => void
  onOpenPortfolio?: () => void
  className?: string
}

export default function NavBar({ 
  onOpenAbout, 
  onOpenSocials, 
  onOpenPortfolio,
  className 
}: NavBarProps) {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)

  const handleBack = () => {
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '0'
    document.body.appendChild(overlay)

    overlay.getBoundingClientRect()
    overlay.style.opacity = '1'
    
    setTimeout(() => {
      router.push('/')
    }, 3500)
  }

  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    width: '48px',
    height: '48px',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const updateParticleSystem = useCallback(() => {
    const navElement = document.querySelector('nav')
    if (!navElement) return

    const bounds = navElement.getBoundingClientRect()
    const event = new CustomEvent('windowUpdate', {
      detail: {
        id: 'navbar',
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

  return (
    <nav
      data-frosted-box="navbar"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={className}
      style={{
        position: 'fixed',
        top: '50%',
        left: '1rem',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <button 
        onClick={handleBack}
        style={{
          ...buttonStyle,
          fontSize: '1.5rem',
        }}
      >
        ←
      </button>

      <button 
        onClick={() => {
          console.log('Portfolio button clicked')
          onOpenPortfolio?.()
        }}
        style={buttonStyle}
      >
        Work
      </button>

      <button 
        onClick={() => {
          console.log('About button clicked')
          onOpenAbout?.()
        }}
        style={buttonStyle}
      >
        About
      </button>

      <button 
        onClick={() => {
          console.log('Socials button clicked')
          onOpenSocials?.()
        }}
        style={buttonStyle}
      >
        Links
      </button>
    </nav>
  )
}


