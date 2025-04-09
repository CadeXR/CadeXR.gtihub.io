'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'

export default function BackButton() {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)

  const updateParticleSystem = useCallback(() => {
    const buttonElement = document.querySelector('[data-frosted-box="back-button"]')
    if (!buttonElement) return

    const bounds = buttonElement.getBoundingClientRect()
    const event = new CustomEvent('windowUpdate', {
      detail: {
        id: 'back-button',
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

  const handleBack = useCallback(() => {
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '0'
    document.body.appendChild(overlay)

    overlay.getBoundingClientRect()
    overlay.style.opacity = '1'
    
    const scene = document.querySelector('canvas[data-scene]')
    if (scene) {
      const transitionEvent = new CustomEvent('startTransition', {
        detail: { direction: 'shrink' }
      })
      scene.dispatchEvent(transitionEvent)
    }
    
    setTimeout(() => {
      router.push('/')
    }, 1750)
  }, [router])

  return (
    <div
      data-frosted-box="back-button"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 50,
        padding: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button 
        onClick={handleBack}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          width: '100%',
          height: '100%',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          fontSize: '1.25rem',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ←
      </button>
    </div>
  )
}


