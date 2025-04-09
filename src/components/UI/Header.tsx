'use client'

import { useState, useCallback, useEffect } from 'react'

export default function Header() {
  const [isActive, setIsActive] = useState(false)

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

  return (
    <div
      data-frosted-box="header"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        position: 'fixed',
        top: '1rem',
        left: 'calc(1rem + 48px + 2rem)',
        zIndex: 50,
        padding: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: 'fit-content',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        style={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          padding: '0 1rem',
        }}
      >
        Cade Gilbert - XR Design, XR Software Dev, Game Design, and AI
      </div>
    </div>
  )
}


