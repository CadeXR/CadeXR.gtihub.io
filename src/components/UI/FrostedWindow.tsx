'use client'

import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useEffect, useCallback, useState } from 'react'

interface FrostedWindowProps {
  id: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  defaultPosition: { x: number, y: number }
  onMove?: (position: { x: number, y: number }) => void
  style?: React.CSSProperties
  className?: string
}

export default function FrostedWindow({ 
  id, 
  isOpen, 
  onClose, 
  children, 
  defaultPosition, 
  onMove,
  style,
  className
}: FrostedWindowProps) {
  const [isActive, setIsActive] = useState(false)
  const x = useMotionValue(defaultPosition?.x ?? 0)
  const y = useMotionValue(defaultPosition?.y ?? 0)

  // Add debug logging
  useEffect(() => {
    console.log(`FrostedWindow ${id} isOpen:`, isOpen)
    console.log(`FrostedWindow ${id} position:`, defaultPosition)
  }, [id, isOpen, defaultPosition])

  useEffect(() => {
    if (!isOpen) {
      const scene = document.querySelector('canvas[data-scene]')
      if (scene) {
        const event = new CustomEvent('windowUpdate', {
          detail: {
            id,
            bounds: null
          }
        })
        scene.dispatchEvent(event)
      }
    }
  }, [isOpen, id])

  const updateParticleSystem = useCallback(() => {
    if (!isOpen) return

    const windowElement = document.querySelector(`[data-frosted-box="${id}"]`)
    if (!windowElement) {
      console.log(`Window element not found for id: ${id}`)
      return
    }

    const bounds = windowElement.getBoundingClientRect()
    const event = new CustomEvent('windowUpdate', {
      detail: {
        id,
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
  }, [isActive, id, isOpen])

  useEffect(() => {
    const unsubscribeX = x.on("change", updateParticleSystem)
    const unsubscribeY = y.on("change", updateParticleSystem)

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [x, y, updateParticleSystem])

  useEffect(() => {
    updateParticleSystem()
  }, [isActive, updateParticleSystem])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          className={`frosted-window z-50 ${className || ''}`}
          data-frosted-box={id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            minWidth: '300px',
            maxHeight: '80vh',
            overflowY: 'auto',
            x,
            y,
            zIndex: 50,
            ...style
          }}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          drag
          dragMomentum={false}
          onDragStart={() => setIsActive(true)}
          onDragEnd={(event, info) => {
            if (onMove) {
              onMove({
                x: x.get(),
                y: y.get()
              })
            }
          }}
          dragElastic={0}
          dragTransition={{ power: 0, timeConstant: 0 }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              width: '32px',
              height: '32px',
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
            ×
          </button>
          <div className="window-content" style={{ marginTop: '1rem' }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}




