'use client'

import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'

export default function EmailButton() {
  const [isActive, setIsActive] = useState(false)
  
  // Use react-responsive for consistent media queries
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmall = useMediaQuery({ maxWidth: 480 });

  const updateParticleSystem = useCallback(() => {
    const buttonElement = document.querySelector('[data-frosted-box="email-button"]')
    if (!buttonElement) return

    const bounds = buttonElement.getBoundingClientRect()
    const event = new CustomEvent('windowUpdate', {
      detail: {
        id: 'email-button',
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

  const getButtonStyle = (): React.CSSProperties => {
    const size = isVerySmall ? 40 : (isMobile ? 44 : 48);
    
    return {
      position: 'fixed' as const,
      bottom: 'var(--spacing-sm)',
      right: 'var(--spacing-sm)',
      zIndex: 50,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
    };
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open Gmail compose with your email pre-filled
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hex.cadeg@gmail.com', '_blank');
  };

  return (
    <a
      href="mailto:hex.cadeg@gmail.com" // Fallback if JavaScript is disabled
      onClick={handleEmailClick}
      data-frosted-box="email-button"
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
      style={getButtonStyle()}
      role="button"
      aria-label="Email me"
      tabIndex={0}
    >
      <div style={{
        position: 'relative',
        width: isVerySmall ? '24px' : '28px',
        height: isVerySmall ? '24px' : '28px'
      }}>
        <Image
          src="/media/Mail-icon.png"
          alt="Email"
          width={isVerySmall ? 24 : 28}
          height={isVerySmall ? 24 : 28}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </a>
  )
}



