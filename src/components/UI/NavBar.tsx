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
  const [buttonsToShow, setButtonsToShow] = useState<number>(3) // Default show all buttons
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const isVerySmall = useMediaQuery({ maxWidth: 480 })

  // Responsive button styles
  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: isVerySmall ? '0.4rem 0.6rem' : (isMobile ? '0.5rem 0.75rem' : '0.75rem 1.5rem'),
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    fontSize: isVerySmall ? '0.7rem' : (isMobile ? '0.75rem' : '1rem'),
    transition: 'all 0.2s ease',
    height: isVerySmall ? '28px' : (isMobile ? '32px' : '36px'),
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

  // Add this useEffect to handle overlap detection and button scaling
  useEffect(() => {
    const checkOverlap = () => {
      const backButtonElement = document.querySelector('[data-frosted-box="back-button"]')
      const navbarElement = navRef.current
      
      if (!backButtonElement || !navbarElement) return
      
      const backButtonRect = backButtonElement.getBoundingClientRect()
      const navbarRect = navbarElement.getBoundingClientRect()
      
      // Calculate available width
      const screenWidth = window.innerWidth
      const safeMargin = isVerySmall ? 8 : 16
      
      // Check if there's enough space between back button and right edge
      const availableWidth = screenWidth - backButtonRect.right - (safeMargin * 2)
      
      // Get all buttons
      const buttons = navbarElement.querySelectorAll('button')
      const buttonCount = buttons.length
      
      // Calculate how many buttons can fit
      // Start with all buttons
      let buttonsToFit = buttonCount
      
      // If space is tight, reduce buttons one by one
      if (availableWidth < navbarRect.width) {
        // Calculate average button width (including gap)
        const avgButtonWidth = navbarRect.width / buttonCount
        
        // Calculate how many buttons can fit
        buttonsToFit = Math.floor(availableWidth / avgButtonWidth)
        
        // Ensure at least one button is shown
        buttonsToFit = Math.max(1, buttonsToFit)
      }
      
      // Update state if needed
      if (buttonsToFit !== buttonsToShow) {
        setButtonsToShow(buttonsToFit)
      }
    }
    
    // Check on mount and when window resizes
    checkOverlap()
    window.addEventListener('resize', checkOverlap)
    
    return () => window.removeEventListener('resize', checkOverlap)
  }, [isVerySmall, buttonsToShow])

  // Calculate navbar width based on screen size
  const getNavbarStyle = () => {
    if (!isMobile) {
      // Desktop style - align with back button height
      return {
        position: 'fixed' as const,
        top: 'var(--spacing-sm)',  // Same top position as back button
        right: 'var(--spacing-md)',
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
        height: 'var(--back-button-size)',  // Match back button height
        alignItems: 'center',
      } as const;
    } else {
      // Mobile style - calculate width to fit between back button and right edge
      const backButtonWidth = isVerySmall ? 40 : 48; // Width of back button
      const safeMargin = isVerySmall ? 8 : 16;
      const screenWidth = window.innerWidth;
      const availableWidth = screenWidth - backButtonWidth - (safeMargin * 3);
      
      return {
        position: 'fixed' as const,
        top: 'var(--spacing-sm)',  // Same top position as back button
        right: 'var(--spacing-sm)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'row',
        gap: isVerySmall ? '0.4rem' : '0.75rem',
        padding: isVerySmall ? '0.25rem' : '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        height: 'var(--back-button-size)',  // Match back button height
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
      {/* Games button */}
      <button 
        onClick={() => {
          // Remove transition overlay and directly navigate
          router.push('/activities')
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
      
      {/* About button */}
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
      
      {/* Links button */}
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
      
      {/* Portfolio button */}
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
        {isMobile ? 'Work' : 'Portfolio'}
      </button>
    </nav>
  )
}


