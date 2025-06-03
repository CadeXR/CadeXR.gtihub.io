'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { conthrax } from '@/app/fonts'
import { useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'

interface NavBarProps {
  onOpenAbout: () => void
  onOpenSocials: () => void
  onOpenPortfolio: () => void
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
  const navRef = useRef<HTMLElement>(null)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const isVerySmall = useMediaQuery({ maxWidth: 480 })

  // Responsive button styles
  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: isMobile ? '0.5rem 0.75rem' : '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    fontSize: isMobile ? '0.75rem' : '1rem',
    transition: 'all 0.2s ease',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  }

  // Responsive games button style
  const gamesButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(147, 51, 234, 0.3)',
    border: '1px solid rgba(147, 51, 234, 0.6)',
  }

  const updateParticles = useCallback(() => {
    const navElement = navRef.current
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

  // Update particles when nav becomes active/inactive
  useEffect(() => {
    updateParticles()
  }, [isActive, updateParticles])

  // Update particles on window resize
  useEffect(() => {
    window.addEventListener('resize', updateParticles)
    return () => window.removeEventListener('resize', updateParticles)
  }, [updateParticles])

  // Calculate navbar width based on screen size
  const getNavbarStyle = () => {
    const safeMargin = isVerySmall ? 8 : 16;
    
    if (!isMobile) {
      // Desktop style
      return {
        position: 'fixed',
        top: 'var(--safe-margin-md)',
        right: 'var(--safe-margin-md)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        padding: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        height: '48px',
        alignItems: 'center',
      } as const;
    } else {
      // Mobile style - calculate width to fit between back button and right edge
      const backButtonWidth = 48; // Width of back button
      const screenWidth = window.innerWidth;
      const availableWidth = screenWidth - backButtonWidth - (safeMargin * 3);
      
      return {
        position: 'fixed',
        top: 'var(--safe-margin-sm)',
        right: 'var(--safe-margin-sm)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'row',
        gap: isVerySmall ? '0.5rem' : '0.75rem',
        padding: isVerySmall ? '0.25rem' : '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        height: '40px',
        alignItems: 'center',
        maxWidth: `${availableWidth}px`,
        overflowX: 'auto',
      } as const;
    }
  }

  return (
    <nav
      ref={navRef}
      data-frosted-box="navbar"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={className}
      style={getNavbarStyle()}
    >
      <button 
        onClick={() => {
          // Create and append transition overlay for current scene (home)
          const overlay = document.createElement('div')
          overlay.className = 'scene-transition-grow'
          document.body.appendChild(overlay)

          const scene = document.querySelector('canvas[data-scene]')
          scene?.dispatchEvent(new CustomEvent('startTransition', { 
            detail: { direction: 'grow' } 
          }))

          setTimeout(() => {
            router.push('/activities')
            
            // Create fade-out overlay for games scene
            const exitOverlay = document.createElement('div')
            exitOverlay.className = 'scene-transition-shrink'
            document.body.appendChild(exitOverlay)
            
            // Remove both overlays after complete transition
            setTimeout(() => {
              overlay.remove()
              exitOverlay.remove()
            }, 500)
          }, 3500)
        }}
        className={conthrax.className}
        style={gamesButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.3)'
        }}
      >
        Games
      </button>
      <button 
        onClick={onOpenAbout}
        className={conthrax.className}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
        }}
      >
        About
      </button>
      <button 
        onClick={onOpenSocials}
        className={conthrax.className}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
        }}
      >
        Links
      </button>
      <button 
        onClick={onOpenPortfolio}
        className={conthrax.className}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
        }}
      >
        Portfolio
      </button>
    </nav>
  )
}


