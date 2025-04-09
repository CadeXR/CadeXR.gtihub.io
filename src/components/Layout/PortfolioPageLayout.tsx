'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FrostedWindow from '../UI/FrostedWindow'
import Scene from '../Background/Scene'
import StyledLink from '../UI/StyledLink'
import SocialContent from '@/components/UI/SocialContent'
import { conthrax } from '@/app/fonts'

interface PortfolioPageLayoutProps {
  children: React.ReactNode
}

const buttonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  width: '80px', // Increased from 48px
  height: '48px',
  borderRadius: '0.75rem',
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default function PortfolioPageLayout({ children }: PortfolioPageLayoutProps) {
  const router = useRouter()
  const [isLinksOpen, setIsLinksOpen] = useState(false)
  const [isContentOpen, setIsContentOpen] = useState(true)
  const [isBackButtonActive, setIsBackButtonActive] = useState(false)
  const [isNavButtonActive, setIsNavButtonActive] = useState(false)

  const updateBackButtonParticles = useCallback(() => {
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
          isActive: isBackButtonActive
        }
      }
    })
    
    const scene = document.querySelector('canvas[data-scene]')
    scene?.dispatchEvent(event)
  }, [isBackButtonActive])

  const updateNavButtonParticles = useCallback(() => {
    const buttonElement = document.querySelector('[data-frosted-box="nav-button"]')
    if (!buttonElement) return

    const bounds = buttonElement.getBoundingClientRect()
    const event = new CustomEvent('windowUpdate', {
      detail: {
        id: 'nav-button',
        bounds: {
          left: bounds.left,
          right: bounds.right,
          top: bounds.top,
          bottom: bounds.bottom,
          isActive: isNavButtonActive
        }
      }
    })
    
    const scene = document.querySelector('canvas[data-scene]')
    scene?.dispatchEvent(event)
  }, [isNavButtonActive])

  useEffect(() => {
    updateBackButtonParticles()
  }, [isBackButtonActive, updateBackButtonParticles])

  useEffect(() => {
    updateNavButtonParticles()
  }, [isNavButtonActive, updateNavButtonParticles])

  const handleBack = () => {
    // Create and append the overlay
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '0'
    document.body.appendChild(overlay)

    // Force reflow
    overlay.getBoundingClientRect()
    overlay.style.opacity = '1'
    
    // First trigger the shrink transition
    const scene = document.querySelector('canvas[data-scene]')
    if (scene) {
      const transitionEvent = new CustomEvent('startTransition', {
        detail: { direction: 'shrink' }
      })
      scene.dispatchEvent(transitionEvent)
    }
    
    // Wait for the screen to go completely white before navigating
    setTimeout(() => {
      router.push('/home')
    }, 1750) // Half of the full transition time to ensure we're at peak white
  }

  // Center all windows by default
  const [contentPosition, setContentPosition] = useState({ 
    x: typeof window !== 'undefined' ? (window.innerWidth - 650) / 2 : 0, // Adjusted for new width
    y: typeof window !== 'undefined' ? (window.innerHeight - 600) / 2 - 100 : 0 // 100px higher
  })
  const [linksPosition, setLinksPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    
    // Position relative to viewport width, similar to the navbar position
    const navbarRight = window.innerWidth - 16; // 1rem from right
    return {
      x: navbarRight - 350 - 16, // Keeping the same X position
      y: 99, // Moved 5px up (was 104)
    };
  })

  useEffect(() => {
    const handleResize = () => {
      // Keep content window centered
      setContentPosition({
        x: (window.innerWidth - 650) / 2, // Increased from 450px
        y: (window.innerHeight - 600) / 2 - 100 // 100px higher
      })
      
      // Keep links window positioned relative to navbar
      setLinksPosition({
        x: (window.innerWidth - 16) - 350 - 16, // Consistent with initial position
        y: 99 // Consistent with initial position
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Clean up any existing overlays first
    document.querySelectorAll('.scene-transition-overlay').forEach(el => el.remove())

    // Create initial white overlay
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '1' // Start fully opaque
    document.body.appendChild(overlay)

    // Force reflow
    overlay.getBoundingClientRect()

    // Fade out the white overlay after a brief delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        overlay.style.opacity = '0'
        
        // Remove overlay after animation completes
        setTimeout(() => {
          overlay.remove()
        }, 3500) // Match the duration in globals.css
      }, 100) // Small delay to ensure the page is ready
    })

    return () => {
      overlay.remove()
    }
  }, [])

  const ContentWithStyledLinks = ({ children }: { children: React.ReactNode }) => {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!contentRef.current) return

      const styleLinks = () => {
        const links = contentRef.current?.getElementsByTagName('a')
        if (!links) return

        Array.from(links).forEach((link: HTMLAnchorElement) => {
          // Skip if link is already styled
          if (link.getAttribute('data-styled')) return
          
          // Create new styled link
          const styledLink = document.createElement('span')
          styledLink.innerHTML = link.innerHTML
          styledLink.style.display = 'inline-block'
          styledLink.style.color = 'white'
          styledLink.style.textDecoration = 'none'
          styledLink.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          styledLink.style.padding = '0.5rem 1rem'
          styledLink.style.borderRadius = '0.5rem'
          styledLink.style.border = '1px solid rgba(255, 255, 255, 0.4)'
          styledLink.style.transition = 'all 0.2s ease'
          styledLink.style.margin = '0.25rem 0'
          
          // Copy link attributes
          const newLink = document.createElement('a')
          newLink.href = link.href
          newLink.target = '_blank'
          newLink.rel = 'noopener noreferrer'
          newLink.setAttribute('data-styled', 'true')
          
          // Add hover effects
          newLink.addEventListener('mouseenter', () => {
            styledLink.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          })
          newLink.addEventListener('mouseleave', () => {
            styledLink.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          })
          
          newLink.appendChild(styledLink)
          link.parentNode?.replaceChild(newLink, link)
        })
      }

      // Initial styling
      styleLinks()

      // Create observer for dynamic content changes
      const observer = new MutationObserver(styleLinks)
      observer.observe(contentRef.current, { 
        childList: true, 
        subtree: true 
      })

      return () => observer.disconnect()
    }, [])

    return (
      <div ref={contentRef}>
        {children}
      </div>
    )
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background Scene - lowest layer */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
      
      {/* Back Button - top left */}
      <div
        data-frosted-box="back-button"
        onMouseEnter={() => setIsBackButtonActive(true)}
        onMouseLeave={() => setIsBackButtonActive(false)}
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
        }}
      >
        <button 
          onClick={handleBack}
          className={conthrax.className}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
        >
          ←
        </button>
      </div>

      {/* Navbar - top right */}
      <nav
        data-frosted-box="nav-button"
        onMouseEnter={() => setIsNavButtonActive(true)}
        onMouseLeave={() => setIsNavButtonActive(false)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
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
        }}
      >
        <button 
          onClick={() => setIsLinksOpen(true)}
          className={conthrax.className}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
        >
          Links
        </button>
      </nav>

      {/* Main Content Window - middle layer */}
      <FrostedWindow
        id="main-content-window"
        isOpen={true}
        onClose={() => {}}
        defaultPosition={contentPosition}
        onMove={(pos) => setContentPosition(pos)}
        className="!fixed !w-[650px] max-w-[650px] z-[50]"
        showCloseButton={false}
        style={{
          width: '650px',
          maxWidth: '650px',
          maxHeight: '80vh',
        }}
      >
        <div 
          className="px-8 py-6 overflow-y-auto text-white [&_*]:text-white w-full max-w-full"
          style={{
            width: '100%',
            maxWidth: '100%',
            maxHeight: 'calc(80vh - 40px)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
            overflowY: 'auto',
            color: 'white',
          }}
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >
          <ContentWithStyledLinks>
            {children}
          </ContentWithStyledLinks>
        </div>
      </FrostedWindow>

      {/* Links Window - highest layer */}
      <FrostedWindow
        id="nav-window"
        isOpen={isLinksOpen}
        onClose={() => setIsLinksOpen(false)}
        defaultPosition={linksPosition}
        onMove={(pos) => setLinksPosition(pos)}
        className="z-[150]"
      >
        <SocialContent />
      </FrostedWindow>
    </main>
  )
}



