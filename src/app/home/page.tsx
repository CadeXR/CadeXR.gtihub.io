'use client'

import Scene from '@/components/Background/Scene'
import FrostedWindow from '@/components/UI/FrostedWindow'
import NavBar from '@/components/UI/NavBar'
import PortfolioWindow from '@/components/UI/PortfolioWindow'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isSocialsOpen, setIsSocialsOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)

  const [windowScale, setWindowScale] = useState(1)
  const [aboutPosition, setAboutPosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth - 650 : 0,
    y: typeof window !== 'undefined' ? 100 : 0
  })
  const [socialsPosition, setSocialsPosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 - 150 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 + 100 : 0 
  })
  const [portfolioPosition, setPortfolioPosition] = useState({ 
    x: typeof window !== 'undefined' ? 96 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 200 : 0 
  })

  useEffect(() => {
    console.log('Window states:', {
      about: isAboutOpen,
      socials: isSocialsOpen,
      portfolio: isPortfolioOpen
    })
    
    // Add debug logging for positions
    console.log('Window positions:', {
      portfolio: portfolioPosition,
      about: aboutPosition,
      socials: socialsPosition
    })
  }, [isAboutOpen, isSocialsOpen, isPortfolioOpen, portfolioPosition, aboutPosition, socialsPosition])

  useEffect(() => {
    // Clean up any existing overlays first
    document.querySelectorAll('.scene-transition-overlay').forEach(el => el.remove())

    // Create initial white overlay
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '1'
    document.body.appendChild(overlay)

    // Force reflow
    overlay.getBoundingClientRect()

    // Fade out the white overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '0'
      
      // Remove overlay after animation
      const timeoutId = setTimeout(() => {
        overlay.remove()
      }, 3500)

      // Cleanup function
      return () => {
        clearTimeout(timeoutId)
        overlay.remove()
      }
    })
  }, [])

  const handleWindowMove = (position: { x: number, y: number }, windowType: 'about' | 'socials' | 'portfolio') => {
    const windowWidth = 300 * windowScale
    const windowHeight = 200 * windowScale

    let otherWindows = []
    if (windowType !== 'about' && isAboutOpen) otherWindows.push({ position: aboutPosition })
    if (windowType !== 'socials' && isSocialsOpen) otherWindows.push({ position: socialsPosition })
    if (windowType !== 'portfolio' && isPortfolioOpen) otherWindows.push({ position: portfolioPosition })

    for (const otherWindow of otherWindows) {
      const currentRect = {
        left: position.x,
        right: position.x + windowWidth,
        top: position.y,
        bottom: position.y + windowHeight
      }

      const otherRect = {
        left: otherWindow.position.x,
        right: otherWindow.position.x + windowWidth,
        top: otherWindow.position.y,
        bottom: otherWindow.position.y + windowHeight
      }

      if (!(currentRect.right < otherRect.left || 
          currentRect.left > otherRect.right || 
          currentRect.bottom < otherRect.top || 
          currentRect.top > otherRect.bottom)) {
        position.y = otherRect.bottom + 20
      }
    }

    position.x = Math.max(0, Math.min(position.x, window.innerWidth - windowWidth))
    position.y = Math.max(0, Math.min(position.y, window.innerHeight - windowHeight))

    switch (windowType) {
      case 'about':
        setAboutPosition(position)
        break
      case 'socials':
        setSocialsPosition(position)
        break
      case 'portfolio':
        setPortfolioPosition(position)
        break
    }
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Scene />
      <div className="fixed inset-0 pointer-events-none">
        <NavBar 
          onOpenAbout={() => {
            console.log('Opening About window')
            setIsAboutOpen(true)
          }}
          onOpenSocials={() => {
            console.log('Opening Socials window')
            setIsSocialsOpen(true)
          }}
          onOpenPortfolio={() => {
            console.log('Opening Portfolio window')
            setIsPortfolioOpen(true)
          }}
          className="pointer-events-auto"
        />

        <div className="pointer-events-auto">
          <PortfolioWindow 
            id="portfolio-window"
            isOpen={isPortfolioOpen}
            onClose={() => {
              console.log('Closing Portfolio window')
              setIsPortfolioOpen(false)
            }}
            defaultPosition={portfolioPosition}
            onMove={(pos) => handleWindowMove(pos, 'portfolio')}
          />

          <FrostedWindow 
            id="about-window"
            isOpen={isAboutOpen}
            onClose={() => {
              console.log('Closing About window')
              setIsAboutOpen(false)
            }}
            defaultPosition={aboutPosition}
            onMove={(pos) => handleWindowMove(pos, 'about')}
          >
            <div>About Content</div>
          </FrostedWindow>

          <FrostedWindow 
            id="socials-window"
            isOpen={isSocialsOpen}
            onClose={() => {
              console.log('Closing Socials window')
              setIsSocialsOpen(false)
            }}
            defaultPosition={socialsPosition}
            onMove={(pos) => handleWindowMove(pos, 'socials')}
          >
            <div>Socials Content</div>
          </FrostedWindow>
        </div>
      </div>
    </main>
  )
}


























