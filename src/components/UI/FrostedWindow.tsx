'use client'

import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useEffect, useCallback, useState } from 'react'

interface FrostedWindowProps {
  id?: string
  isOpen: boolean
  onClose: () => void
  defaultPosition: { x: number, y: number }
  onMove?: (position: { x: number, y: number }) => void
  style?: React.CSSProperties
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}

export default function FrostedWindow({ 
  id, 
  isOpen, 
  onClose, 
  children, 
  defaultPosition, 
  onMove,
  style,
  className,
  showCloseButton = true
}: FrostedWindowProps) {
  const [isActive, setIsActive] = useState(false)
  const x = useMotionValue(defaultPosition?.x ?? 0)
  const y = useMotionValue(defaultPosition?.y ?? 0)

  // Set position from props when it changes
  useEffect(() => {
    if (defaultPosition) {
      x.set(defaultPosition.x);
      y.set(defaultPosition.y);
    }
  }, [defaultPosition, x, y]);

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

  useEffect(() => {
    if (isOpen && id) {
      // Log actual dimensions after render
      const windowElement = document.getElementById(id);
      if (windowElement) {
        const rect = windowElement.getBoundingClientRect();
        console.log(`FrostedWindow ${id} actual dimensions:`, {
          width: rect.width,
          height: rect.height,
          position: { x: x.get(), y: y.get() },
          viewport: { width: window.innerWidth, height: window.innerHeight },
          expectedCenter: {
            x: (window.innerWidth - rect.width) / 2,
            y: (window.innerHeight - rect.height) / 2
          }
        });
      }
    }
  }, [isOpen, id, x, y]);

  useEffect(() => {
    // Function to ensure window is within viewport bounds
    const ensureWithinViewport = () => {
      if (!defaultPosition) return;
      
      const safeMargin = typeof window !== 'undefined' && window.innerWidth <= 768 ? 8 : 16;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Get window dimensions from style or use defaults
      const windowWidth = style?.width ? 
        (typeof style.width === 'string' ? parseInt(style.width) : style.width) : 
        300;
      const windowHeight = style?.height ? 
        (typeof style.height === 'string' ? parseInt(style.height) : style.height) : 
        400;
      
      // Calculate safe positions
      let safeX = defaultPosition.x;
      let safeY = defaultPosition.y;
      
      // Ensure window doesn't go off right edge
      if (safeX + windowWidth > viewportWidth - safeMargin) {
        safeX = viewportWidth - windowWidth - safeMargin;
      }
      
      // Ensure window doesn't go off left edge
      if (safeX < safeMargin) {
        safeX = safeMargin;
      }
      
      // Ensure window doesn't go off bottom edge
      if (safeY + windowHeight > viewportHeight - safeMargin) {
        safeY = viewportHeight - windowHeight - safeMargin;
      }
      
      // Ensure window doesn't go off top edge
      if (safeY < safeMargin) {
        safeY = safeMargin;
      }
      
      // Update position if needed
      if (safeX !== defaultPosition.x || safeY !== defaultPosition.y) {
        x.set(safeX);
        y.set(safeY);
      } else {
        x.set(defaultPosition.x);
        y.set(defaultPosition.y);
      }
    };
    
    ensureWithinViewport();
    window.addEventListener('resize', ensureWithinViewport);
    
    return () => window.removeEventListener('resize', ensureWithinViewport);
  }, [defaultPosition, x, y, style]);

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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            color: 'white',
            minWidth: typeof window !== 'undefined' && window.innerWidth <= 768 
              ? '100%' 
              : '300px',
            maxWidth: typeof window !== 'undefined' && window.innerWidth <= 768 
              ? '100%' 
              : '80vw',
            maxHeight: typeof window !== 'undefined' && window.innerWidth <= 768 
              ? '90vh' 
              : '80vh',
            overflowY: 'auto',
            x,
            y,
            zIndex: 50,
            ...style
          }}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          // Removed: drag, dragMomentum, onDragStart, onDragEnd, dragElastic, dragTransition
        >
          <div className="window-header" style={{ position: 'relative' }}>
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '-1rem',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker button
                  border: '1px solid rgba(255, 255, 255, 0.2)', // Subtler border
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Subtle shadow
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(40, 40, 40, 0.8)'; // Darker hover state
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Return to original
                }}
              >
                ×
              </button>
            )}
          </div>
          <div className="window-content">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}




