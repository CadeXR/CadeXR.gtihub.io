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
  const [isActive, setIsActive] = useState(false);
  const title = id ? id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
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

  // Add CSS for the window header and close button
  const windowHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const windowTitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: 0,
    transition: 'all 0.2s ease',
  };

  // Calculate window styles based on device size
  const getWindowStyles = (): React.CSSProperties => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // Define safe areas to avoid headers and other UI elements
    const headerHeight = isMobile ? 40 : 48; // Height of header
    const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
    const bottomSafeMargin = isMobile ? 8 : 16;
    const sideSafeMargin = isMobile ? 16 : 24; // Increased side margins for mobile
    
    // Calculate available space with safe margins
    const availableWidth = viewportWidth - (2 * sideSafeMargin);
    const availableHeight = viewportHeight - topSafeMargin - bottomSafeMargin;
    
    // Adjust window dimensions based on screen size
    const isVeryNarrow = viewportWidth < 360;
    
    // Default width based on screen size
    let defaultWidth;
    if (isVeryNarrow) {
      defaultWidth = availableWidth; // Full available width for very narrow screens
    } else if (isMobile) {
      defaultWidth = availableWidth; // Full available width for mobile
    } else {
      defaultWidth = Math.min(900, availableWidth * 0.9); // 900px or 90% for desktop
    }
    
    // IMPORTANT: Allow much taller windows
    const maxHeight = isMobile ? 
      availableHeight * 0.85 : // 85% of available height on mobile
      availableHeight * 0.9;  // 90% of available height on desktop
    
    return {
      width: defaultWidth,
      maxWidth: availableWidth,
      height: 'auto', // Allow height to be determined by content
      maxHeight: maxHeight,
      overflow: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '0.75rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      color: 'white',
      position: 'absolute',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
    };
  };

  // Function to center window in viewport
  const centerWindow = useCallback(() => {
    if (!isOpen) return;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Define safe areas
    const headerHeight = isMobile ? 40 : 48;
    const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
    const bottomSafeMargin = isMobile ? 8 : 16;
    const sideSafeMargin = isMobile ? 8 : 16;
    
    // Get window dimensions
    const windowElement = document.getElementById(id || '');
    if (!windowElement) return;
    
    const rect = windowElement.getBoundingClientRect();
    const windowWidth = rect.width;
    const windowHeight = rect.height;
    
    // Center horizontally
    const centerX = Math.max(sideSafeMargin, (viewportWidth - windowWidth) / 2);
    
    // Center vertically with respect to safe areas
    const centerY = Math.max(
      topSafeMargin, 
      (viewportHeight - windowHeight) / 2
    );
    
    // Update position
    x.set(centerX);
    y.set(centerY);
    
    // If window is too large for the viewport, scale it down
    if (windowWidth > viewportWidth - (2 * sideSafeMargin) || 
        windowHeight > viewportHeight - topSafeMargin - bottomSafeMargin) {
      
      // Calculate scale factors
      const widthScale = (viewportWidth - (2 * sideSafeMargin)) / windowWidth;
      const heightScale = (viewportHeight - topSafeMargin - bottomSafeMargin) / windowHeight;
      const scale = Math.min(widthScale, heightScale, 1);
      
      // Apply scaling if needed (scale < 1)
      if (scale < 1 && windowElement.style) {
        windowElement.style.transform = `scale(${scale})`;
        windowElement.style.transformOrigin = 'top left';
        
        // Adjust position to account for scaling
        const scaledWidth = windowWidth * scale;
        const scaledHeight = windowHeight * scale;
        
        // Center the scaled window
        const scaledCenterX = Math.max(sideSafeMargin, (viewportWidth - scaledWidth) / 2);
        const scaledCenterY = Math.max(
          topSafeMargin, 
          (viewportHeight - scaledHeight) / 2
        );
        
        x.set(scaledCenterX);
        y.set(scaledCenterY);
      }
    } else if (windowElement.style) {
      // Reset any scaling if window fits
      windowElement.style.transform = 'none';
    }
  }, [id, isOpen, isMobile, x, y]);

  // Apply safe placement when window opens or resizes
  useEffect(() => {
    if (isOpen) {
      centerWindow();
    }
  }, [isOpen, centerWindow]);

  // Add window resize listener to recenter
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        centerWindow();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, centerWindow]);

  // Initialize position state with centered coordinates
  useEffect(() => {
    if (!defaultPosition || !isOpen) return;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Define safe areas
    const headerHeight = isMobile ? 40 : 48;
    const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
    const bottomSafeMargin = isMobile ? 8 : 16;
    
    // Get window dimensions (estimate if not rendered yet)
    let windowWidth = 400; // Default estimate
    let windowHeight = 400; // Default estimate
    
    // Try to get actual dimensions if window is rendered
    const windowElement = document.getElementById(id || '');
    if (windowElement) {
      const rect = windowElement.getBoundingClientRect();
      windowWidth = rect.width;
      windowHeight = rect.height;
    } else {
      // Estimate from style props
      if (style?.width) {
        if (typeof style.width === 'string') {
          windowWidth = parseInt(style.width);
        } else if (typeof style.width === 'number') {
          windowWidth = style.width;
        }
      }
      
      if (style?.height && style.height !== 'auto') {
        if (typeof style.height === 'string') {
          windowHeight = parseInt(style.height);
        } else if (typeof style.height === 'number') {
          windowHeight = style.height;
        }
      }
    }
    
    // Calculate center position
    const centerX = (viewportWidth - windowWidth) / 2;
    const centerY = (viewportHeight - windowHeight) / 2;
    
    // Ensure center position respects safe areas
    const safeX = Math.max(centerX, 16);
    const safeY = Math.max(centerY, topSafeMargin);
    
    // Set initial position to center
    x.set(safeX);
    y.set(safeY);
    
    // Schedule a check after rendering to ensure window is properly positioned
    setTimeout(() => {
      centerWindow();
    }, 100);
  }, [defaultPosition, isOpen, id, isMobile, style, x, y, centerWindow]);

  // Function to ensure perfect vertical centering
  const ensurePerfectCentering = useCallback(() => {
    if (!isOpen) return;
    
    const windowElement = document.getElementById(id || '');
    if (!windowElement) return;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get window dimensions
    const rect = windowElement.getBoundingClientRect();
    const windowWidth = rect.width;
    const windowHeight = rect.height;
    
    // Define safe areas
    const headerHeight = isMobile ? 40 : 48;
    const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
    const bottomSafeMargin = isMobile ? 8 : 16;
    const sideSafeMargin = isMobile ? 8 : 16;
    
    // Calculate available space
    const availableWidth = viewportWidth - (2 * sideSafeMargin);
    const availableHeight = viewportHeight - topSafeMargin - bottomSafeMargin;
    
    // If window is too large, scale it down
    if (windowWidth > availableWidth || windowHeight > availableHeight) {
      const widthScale = availableWidth / windowWidth;
      const heightScale = availableHeight / windowHeight;
      const scale = Math.min(widthScale, heightScale, 1);
      
      if (scale < 1) {
        windowElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
        windowElement.style.transformOrigin = 'center center';
      }
    } else {
      // Reset transform to just centering
      windowElement.style.transform = 'translate(-50%, -50%)';
    }
    
    // Adjust for header to ensure equidistant from top and bottom
    windowElement.style.marginTop = `${headerHeight / 2}px`;
    
    // Ensure window is centered
    windowElement.style.position = 'fixed';
    windowElement.style.left = '50%';
    windowElement.style.top = '50%';
  }, [id, isOpen, isMobile]);

  // Apply perfect centering when window opens or resizes
  useEffect(() => {
    if (isOpen) {
      // Short delay to ensure the window is rendered
      setTimeout(ensurePerfectCentering, 50);
    }
  }, [isOpen, ensurePerfectCentering]);

  // Add window resize listener to maintain perfect centering
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        ensurePerfectCentering();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, ensurePerfectCentering]);

  // Add a mobile-specific override for window positioning
  useEffect(() => {
    if (!isOpen) return;
    
    // Force mobile windows to be centered and properly sized
    const forceMobileLayout = () => {
      if (!isMobile) return;
      
      const windowElement = document.getElementById(id || '');
      if (!windowElement) return;
      
      // Force mobile-specific styles
      (windowElement as HTMLElement).style.position = 'fixed';
      (windowElement as HTMLElement).style.top = '50%';
      (windowElement as HTMLElement).style.left = '50%';
      (windowElement as HTMLElement).style.transform = 'translate(-50%, -50%)';
      
      // Calculate safe width
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate safe width - use more of the available width
      const safeWidth = isVerySmall ? 
        Math.min(viewportWidth * 0.95, viewportWidth - 10) : 
        Math.min(viewportWidth * 0.94, viewportWidth - 16);
      
      // Force width to be safe
      (windowElement as HTMLElement).style.width = `${safeWidth}px`;
      (windowElement as HTMLElement).style.maxWidth = `${safeWidth}px`;
      (windowElement as HTMLElement).style.minWidth = 'unset';
      
      // CRITICAL: Allow MUCH taller windows on mobile
      // Use a significantly higher percentage of viewport height
      const maxHeight = viewportHeight * 0.95; // Increased to 95% of viewport height
      (windowElement as HTMLElement).style.maxHeight = `${maxHeight}px`;
      (windowElement as HTMLElement).style.height = 'auto';
      (windowElement as HTMLElement).style.overflowY = 'auto';
      
      // Get the content element and ensure it can expand
      const contentElement = windowElement.querySelector('.window-content');
      if (contentElement) {
        (contentElement as HTMLElement).style.height = 'auto';
        (contentElement as HTMLElement).style.maxHeight = 'none';
        (contentElement as HTMLElement).style.overflowY = 'visible';
        
        // Check if content is taller than available space
        const contentHeight = contentElement.scrollHeight;
        if (contentHeight > maxHeight - 60) { // 60px for header and padding
          (contentElement as HTMLElement).style.maxHeight = `${maxHeight - 60}px`;
          (contentElement as HTMLElement).style.overflowY = 'auto';
        }
      }
      
      // Log the dimensions after applying changes
      console.log('Applied mobile layout with dimensions:', {
        windowWidth: safeWidth,
        windowMaxHeight: maxHeight,
        viewportHeight: viewportHeight,
        percentage: Math.round((maxHeight / viewportHeight) * 100) + '%'
      });
    };
    
    // Apply immediately and on resize
    forceMobileLayout();
    window.addEventListener('resize', forceMobileLayout);
    
    // Also apply after a short delay to ensure it works after animations
    setTimeout(forceMobileLayout, 100);
    
    return () => window.removeEventListener('resize', forceMobileLayout);
  }, [isOpen, id, isMobile, isVerySmall]);

  const handleWindowClick = (e: React.MouseEvent) => {
    setIsActive(true);
    // Prevent click from propagating to parent elements
    e.stopPropagation();
  };

  useEffect(() => {
    if (!isOpen) return;
    
    // Get the window element
    const windowElement = document.getElementById(id || '');
    
    if (windowElement) {
      // Define safe areas
      const headerHeight = isMobile ? 40 : 48;
      const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
      const bottomSafeMargin = isMobile ? 8 : 16;
      
      // IMPORTANT: Remove any fixed height constraints
      (windowElement as HTMLElement).style.height = 'auto';
      
      // IMPORTANT: Set a much larger max-height
      const viewportHeight = window.innerHeight;
      const maxWindowHeight = isMobile ? 
        viewportHeight * 0.85 : // 85% of viewport height on mobile
        viewportHeight * 0.9;  // 90% of viewport height on desktop
      
      (windowElement as HTMLElement).style.maxHeight = `${maxWindowHeight}px`;
      
      // Get the content element
      const contentElement = windowElement.querySelector('.window-content');
      if (contentElement) {
        // Remove any fixed height constraints on content
        (contentElement as HTMLElement).style.height = 'auto';
        (contentElement as HTMLElement).style.maxHeight = 'none';
        (contentElement as HTMLElement).style.overflowY = 'visible';
        
        // Only add scrolling if content exceeds the window height
        const contentHeight = contentElement.scrollHeight;
        const windowHeight = windowElement.clientHeight;
        const headerHeight = windowElement.querySelector('.window-header')?.clientHeight || 0;
        
        if (contentHeight > windowHeight - headerHeight - 20) { // 20px buffer
          (contentElement as HTMLElement).style.maxHeight = `${windowHeight - headerHeight - 20}px`;
          (contentElement as HTMLElement).style.overflowY = 'auto';
        }
      }
    }
  }, [isOpen, id, isMobile]);

  useEffect(() => {
    if (!isOpen || !id) return;
    
    // Function to log window dimensions
    const logWindowDimensions = () => {
      const windowElement = document.getElementById(id);
      if (!windowElement) return;
      
      const rect = windowElement.getBoundingClientRect();
      console.log(`Window ${id} dimensions:`, {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        maxHeight: (windowElement as HTMLElement).style.maxHeight,
        computedMaxHeight: window.getComputedStyle(windowElement).maxHeight,
        viewportHeight: window.innerHeight,
        percentage: Math.round((rect.height / window.innerHeight) * 100) + '%'
      });
      
      // Also log content dimensions
      const contentElement = windowElement.querySelector('.window-content');
      if (contentElement) {
        const contentRect = contentElement.getBoundingClientRect();
        console.log(`Content for ${id} dimensions:`, {
          height: Math.round(contentRect.height),
          scrollHeight: contentElement.scrollHeight,
          maxHeight: (contentElement as HTMLElement).style.maxHeight,
          computedMaxHeight: window.getComputedStyle(contentElement).maxHeight,
          overflow: window.getComputedStyle(contentElement).overflowY
        });
      }
    };
    
    // Log immediately after render
    setTimeout(logWindowDimensions, 100);
    
    // Log on resize
    const resizeObserver = new ResizeObserver(() => {
      logWindowDimensions();
    });
    
    const windowElement = document.getElementById(id);
    if (windowElement) {
      resizeObserver.observe(windowElement);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen, id]);

  return (
    <motion.div
      id={id}
      className={`frosted-window perfect-center allow-tall-window ${className || ''}`}
      style={{
        ...getWindowStyles(),
        display: isOpen ? 'flex' : 'none',
        height: 'auto', // Allow height to be determined by content
        minHeight: '100px',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.9,
        display: isOpen ? 'block' : 'none'
      }}
      transition={{ duration: 0.2 }}
      onClick={handleWindowClick}
      data-frosted-box={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
    >
      <div className="window-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '0.5rem' : '0.75rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div className="window-title" style={{
          fontSize: isMobile ? '0.9rem' : '1rem',
          fontWeight: 'bold',
        }}>
          {title || ''}
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        )}
      </div>
      <div 
        className="window-content" 
        style={{ 
          width: '100%', 
          height: 'auto', // Allow height to be determined by content
          overflow: 'visible', // Only show scrollbar when needed
          padding: isMobile ? '0.75rem' : '1rem',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
