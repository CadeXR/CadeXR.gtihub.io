'use client'

import Scene from '@/components/Background/Scene'
import FrostedWindow from '@/components/UI/FrostedWindow'
import NavBar from '@/components/UI/NavBar'
import Header from '@/components/UI/Header'
import BackButton from '@/components/UI/BackButton'
import PortfolioWindow from '@/components/UI/PortfolioWindow'
import AboutContent from '@/components/UI/AboutContent'
import SocialContent from '@/components/UI/SocialContent'
import { useState, useEffect } from 'react'

const MARGIN = 100; // Increased margin for better spacing
const NAVBAR_WIDTH = 64;

const calculateSafePosition = (desiredX: number, desiredY: number, windowWidth: number, windowHeight: number) => {
  if (typeof window === 'undefined') return { x: MARGIN, y: MARGIN };

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Ensure x position stays within margins
  const safeX = Math.min(
    Math.max(MARGIN, desiredX), 
    viewportWidth - windowWidth - MARGIN
  );
  
  // Ensure y position stays within margins
  const safeY = Math.min(
    Math.max(MARGIN, desiredY), 
    viewportHeight - windowHeight - MARGIN
  );

  return { x: safeX, y: safeY };
};

export default function HomePage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isSocialsOpen, setIsSocialsOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)

  const [windowScale, setWindowScale] = useState(1)
  const [aboutPosition, setAboutPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: 0, y: MARGIN };
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      return { x: 0, y: MARGIN };
    }
    
    // Position on the right side with proper margin
    // We want the right edge of the window to be MARGIN pixels from the right edge of the screen
    return {
      x: window.innerWidth - (33.333 * window.innerWidth / 100) - MARGIN,
      y: MARGIN
    };
  });
  const [socialsPosition, setSocialsPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: MARGIN, y: MARGIN };

    // Center horizontally and position at bottom with margin
    const width = 350; // Updated from 300 to 350
    return {
      x: (window.innerWidth - width) / 2,
      y: window.innerHeight - MARGIN - 300
    };
  });
  const [portfolioPosition, setPortfolioPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: MARGIN, y: MARGIN };
    
    // Position next to navbar with proper margin
    return {
      x: NAVBAR_WIDTH + MARGIN,
      y: MARGIN
    };
  });

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
    const windowWidth = 300 * windowScale;
    const windowHeight = 200 * windowScale;

    // Apply margin constraints
    position = calculateSafePosition(position.x, position.y, windowWidth, windowHeight);

    let otherWindows = [];
    if (windowType !== 'about' && isAboutOpen) otherWindows.push({ position: aboutPosition });
    if (windowType !== 'socials' && isSocialsOpen) otherWindows.push({ position: socialsPosition });
    if (windowType !== 'portfolio' && isPortfolioOpen) otherWindows.push({ position: portfolioPosition });

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

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;

      // About window
      if (isMobile) {
        setAboutPosition({ x: 0, y: MARGIN });
      } else {
        setAboutPosition({
          x: window.innerWidth - (33.333 * window.innerWidth / 100) - MARGIN,
          y: MARGIN
        });
      }

      // Socials window - center bottom
      const width = 350; // Updated from 300 to 350
      setSocialsPosition({
        x: (window.innerWidth - width) / 2,
        y: window.innerHeight - MARGIN - 300
      });

      // Portfolio window - next to navbar
      setPortfolioPosition({
        x: NAVBAR_WIDTH + MARGIN,
        y: MARGIN
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Scene />
      <div className="fixed inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <BackButton />
          <Header />
          <NavBar 
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenSocials={() => setIsSocialsOpen(true)}
            onOpenPortfolio={() => setIsPortfolioOpen(true)}
          />
        </div>
        <div className="pointer-events-auto">
          <PortfolioWindow 
            id="portfolio-window"
            isOpen={isPortfolioOpen}
            onClose={() => setIsPortfolioOpen(false)}
            defaultPosition={portfolioPosition}
            onMove={(pos) => handleWindowMove(pos, 'portfolio')}
          />

          <FrostedWindow 
            id="about-window"
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
            defaultPosition={aboutPosition}
            onMove={(pos) => handleWindowMove(pos, 'about')}
            className="md:max-w-[33.333vw] w-screen"
            style={{
              height: typeof window !== 'undefined' && window.innerWidth <= 768 
                ? '100vh' 
                : 'auto',
              maxHeight: '80vh',
              width: typeof window !== 'undefined' && window.innerWidth <= 768
                ? '100%'
                : '33.333vw',
            }}
          >
            <AboutContent />
          </FrostedWindow>

          <FrostedWindow 
            id="socials-window"
            isOpen={isSocialsOpen}
            onClose={() => setIsSocialsOpen(false)}
            defaultPosition={socialsPosition}
            onMove={(pos) => handleWindowMove(pos, 'socials')}
            style={{
              width: '350px',  // Increased from 300px to 350px
              minWidth: '350px', // Increased from 300px to 350px
            }}
          >
            <SocialContent />
          </FrostedWindow>
        </div>
      </div>
    </main>
  )
}


























