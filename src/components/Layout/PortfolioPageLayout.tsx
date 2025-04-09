'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import FrostedWindow from '../UI/FrostedWindow'
import Scene from '../Background/Scene'
import StyledLink from '../UI/StyledLink'
import SocialContent from '@/components/UI/SocialContent'

interface PortfolioPageLayoutProps {
  children: React.ReactNode
}

export default function PortfolioPageLayout({ children }: PortfolioPageLayoutProps) {
  const router = useRouter()
  const [isLinksOpen, setIsLinksOpen] = useState(false)
  const [isContentOpen, setIsContentOpen] = useState(true)
  
  // Center all windows by default
  const [contentPosition, setContentPosition] = useState({ 
    x: typeof window !== 'undefined' ? (window.innerWidth - 450) / 2 : 0,
    y: typeof window !== 'undefined' ? (window.innerHeight - 600) / 2 : 0 
  })
  const [linksPosition, setLinksPosition] = useState({ 
    x: typeof window !== 'undefined' ? (window.innerWidth - 300) / 2 : 0,
    y: typeof window !== 'undefined' ? (window.innerHeight - 300) / 2 : 0 
  })

  useEffect(() => {
    const handleResize = () => {
      // Keep content window centered
      setContentPosition({
        x: (window.innerWidth - 450) / 2,
        y: (window.innerHeight - 600) / 2
      })
      
      // Keep links window centered
      setLinksPosition({
        x: (window.innerWidth - 300) / 2,
        y: (window.innerHeight - 300) / 2
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleBack = () => {
    // Create fade-in overlay
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '0'
    document.body.appendChild(overlay)

    // Force reflow
    overlay.getBoundingClientRect()
    
    // Fade in to white
    overlay.style.opacity = '1'
    
    // Navigate after transition
    setTimeout(() => {
      router.push('/home')
    }, 3500)
  }

  const ContentWithStyledLinks = ({ children }: { children: React.ReactNode }) => {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!contentRef.current) return

      const styleLinks = () => {
        const links = contentRef.current?.getElementsByTagName('a')
        if (!links) return

        Array.from(links).forEach(link => {
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
      
      {/* Left Navbar - using home page styling */}
      <nav
        data-frosted-box="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '1rem',
          transform: 'translateY(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <button 
          onClick={handleBack}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            width: '48px',
            height: '48px',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            fontSize: '1.5rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ←
        </button>

        <button 
          onClick={() => setIsLinksOpen(true)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            width: '48px',
            height: '48px',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
        className="!fixed !w-[450px] max-w-[450px] z-[50]"
        style={{
          width: '450px',
          maxWidth: '450px',
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






















