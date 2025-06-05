'use client'

import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function Header() {
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [headerText, setHeaderText] = useState('Cade Gilbert - XR Design, XR Software Dev, Game Design, and AI')

  // Use react-responsive for consistent media queries
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmall = useMediaQuery({ maxWidth: 480 });

  // Set header text based on screen size
  useEffect(() => {
    // Use shorter text on smaller screens
    if (isVerySmall) {
      setHeaderText('Cade Gilbert');
    } else if (isMobile) {
      setHeaderText('Cade Gilbert - XR Dev');
    } else {
      setHeaderText('Cade Gilbert - XR Design, XR Software Dev, Game Design, and AI');
    }
  }, [isMobile, isVerySmall]);

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
      const backButtonElement2 = document.querySelector('[data-frosted-box="backbutton"]')
      
      // Try both possible back button selectors
      const actualBackButton = backButtonElement || backButtonElement2
      
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
        if (actualBackButton) {
          const backButtonRect = actualBackButton.getBoundingClientRect()
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

  // Responsive header style
  const getHeaderStyle = (): React.CSSProperties => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const isVeryNarrow = viewportWidth < 360;
    
    return {
      position: 'fixed' as const,
      top: 'var(--spacing-sm)',
      left: `calc(var(--back-button-size) + var(--spacing-sm) * 2)`,
      zIndex: 50,
      padding: isVeryNarrow ? '0.2rem' : (isMobile ? '0.25rem' : '0.5rem'),
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '0.75rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      width: 'fit-content',
      maxWidth: isMobile 
        ? `calc(100vw - var(--back-button-size) - var(--spacing-sm) * 4 - 80px)` 
        : 'none',
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontSize: isVeryNarrow ? '0.8rem' : 'inherit',
    };
  };

  return (
    <div
      data-frosted-box="header"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={getHeaderStyle()}
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












