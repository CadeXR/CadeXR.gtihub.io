'use client'

import { useState, useCallback, useEffect } from 'react'

export default function Header() {
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [headerText, setHeaderText] = useState('Cade Gilbert - XR Design, XR Software Dev, Game Design, and AI')

  // Check if we're on mobile and adjust text accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      // Use shorter text on smaller screens
      if (mobile) {
        setHeaderText('Cade Gilbert - XR Dev')
      } else {
        setHeaderText('Cade Gilbert - XR Design, XR Software Dev, Game Design, and AI')
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const updateParticleSystem = useCallback(() => {
    const headerElement = document.querySelector('[data-frosted-box="header"]')
    if (!headerElement) return

    const bounds = headerElement.getBoundingClientRect()
    const event = new CustomEvent('windowUpdate', {
      detail: {
        id: 'header',
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

  // Check for overlap with NavBar
  useEffect(() => {
    const checkOverlap = () => {
      const headerElement = document.querySelector('[data-frosted-box="header"]')
      const navbarElement = document.querySelector('[data-frosted-box="navbar"]')
      const backButtonElement = document.querySelector('[data-frosted-box="back-button"]')
      
      if (headerElement && navbarElement) {
        const headerRect = headerElement.getBoundingClientRect()
        const navbarRect = navbarElement.getBoundingClientRect()
        
        // Check if there's horizontal overlap with navbar
        const navbarOverlap = !(
          headerRect.right < navbarRect.left || 
          headerRect.left > navbarRect.right
        )
        
        // Check if there's enough space between back button and navbar
        let hasEnoughSpace = true
        if (backButtonElement) {
          const backButtonRect = backButtonElement.getBoundingClientRect()
          const availableWidth = navbarRect.left - backButtonRect.right
          const requiredWidth = headerRect.width + 20 // Add some margin
          
          hasEnoughSpace = availableWidth >= requiredWidth
        }
        
        // Hide on very small screens or when overlapping
        const isSmallScreen = window.innerWidth < 640
        
        setIsVisible(!navbarOverlap && hasEnoughSpace && !isSmallScreen)
      }
    }
    
    // Check on mount and when window resizes
    checkOverlap()
    window.addEventListener('resize', checkOverlap)
    
    return () => window.removeEventListener('resize', checkOverlap)
  }, [])

  if (!isVisible) return null

  return (
    <div
      data-frosted-box="header"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        position: 'fixed',
        top: '1rem',
        left: 'calc(1rem + 48px + 1rem)', // Reduced right margin
        zIndex: 50,
        padding: isMobile ? '0.25rem' : '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: 'fit-content',
        maxWidth: isMobile ? 'calc(100vw - 48px - 4rem)' : 'none',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          color: 'white',
          fontSize: isMobile ? '0.875rem' : '1rem',
          fontWeight: 'bold',
          padding: isMobile ? '0 0.5rem' : '0 1rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {headerText}
      </div>
    </div>
  )
}





