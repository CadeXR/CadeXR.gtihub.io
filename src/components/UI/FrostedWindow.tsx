'use client'

import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useEffect, useCallback, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmall = useMediaQuery({ maxWidth: 480 });
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

  // Calculate window styles based on device size
  const getWindowStyles = () => {
    // Use CSS variables for consistent spacing
    const safeMargin = isVerySmall ? 8 : (isMobile ? 12 : 16);
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // Calculate available space
    const availableWidth = viewportWidth - (safeMargin * 2);
    const availableHeight = viewportHeight - (safeMargin * 2);
    
    // Base styles common to all screen sizes
    const baseStyles: any = {
      padding: isVerySmall ? 'var(--window-padding-sm)' : (isMobile ? 'var(--window-padding-md)' : 'var(--window-padding-lg)'),
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '0.75rem',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      color: 'white',
      overflowY: 'auto',
      x,
      y,
      zIndex: isActive ? 50 : 40,
      // Ensure windows never exceed available space
      maxWidth: `${availableWidth}px`,
      maxHeight: `${availableHeight}px`,
      ...style
    };

    // Mobile-specific styles
    if (isMobile) {
      // For very small screens, use even smaller width
      const widthPercentage = isVerySmall ? 95 : 90;
      const calculatedWidth = Math.min(availableWidth, (viewportWidth * widthPercentage) / 100);
      
      return {
        ...baseStyles,
        width: `${calculatedWidth}px`,
        left: (viewportWidth - calculatedWidth) / 2,
        bottom: safeMargin,
        top: 'auto',
      };
    }

    // Desktop styles
    return {
      ...baseStyles,
      minWidth: Math.min(300, availableWidth),
      top: 0,
      left: 0,
    };
  };

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
          style={getWindowStyles()}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          <div className="window-header" style={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            marginBottom: '1rem'
          }}>
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  padding: 0,
                  marginLeft: 'auto',
                  transition: 'background-color 0.2s ease',
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




