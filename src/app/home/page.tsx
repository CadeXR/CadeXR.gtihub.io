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
import Image from 'next/image'

const MARGIN = 100; // Increased margin for better spacing
const NAVBAR_WIDTH = 64;
const WALL_MARGIN = '1rem'; // Match the margin used in NavBar/Header components
const SPACING = 16; // Spacing between windows

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

// Define spawn node interface
interface SpawnNode {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Define window dimensions more accurately
const WINDOW_DIMENSIONS = {
  about: { 
    width: typeof window !== 'undefined' && window.innerWidth <= 768 ? window.innerWidth : 450, 
    height: 400 
  },
  portfolio: { width: 350, height: 600 },
  socials: { width: 350, height: 115 }
};

// Improved center position calculation with debug logging
const calculateExactCenter = (windowType: 'about' | 'portfolio' | 'socials') => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  
  const windowWidth = WINDOW_DIMENSIONS[windowType].width;
  const windowHeight = WINDOW_DIMENSIONS[windowType].height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate exact center
  const centerX = Math.max(0, (viewportWidth - windowWidth) / 2);
  const centerY = Math.max(0, (viewportHeight - windowHeight) / 2);
  
  console.log(`Centering ${windowType}:`, {
    windowDimensions: { width: windowWidth, height: windowHeight },
    viewport: { width: viewportWidth, height: viewportHeight },
    center: { x: centerX, y: centerY }
  });
  
  return { x: centerX, y: centerY };
};

export default function HomePage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isSocialsOpen, setIsSocialsOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  
  // Individual center positions for each window
  const [aboutPosition, setAboutPosition] = useState(() => calculateExactCenter('about'));
  const [portfolioPosition, setPortfolioPosition] = useState(() => calculateExactCenter('portfolio'));
  const [socialsPosition, setSocialsPosition] = useState(() => calculateExactCenter('socials'));

  // Update positions on window resize - single consolidated handler
  useEffect(() => {
    const handleResize = () => {
      // Update window dimensions for responsive sizing
      if (typeof window !== 'undefined') {
        WINDOW_DIMENSIONS.about.width = window.innerWidth <= 768 ? window.innerWidth : 450;
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // On mobile, position at top with margin
          setAboutPosition({ x: 0, y: MARGIN });
          setSocialsPosition({ x: 0, y: MARGIN });
          setPortfolioPosition({ x: 0, y: MARGIN });
        } else {
          // On desktop, center precisely
          setAboutPosition(calculateExactCenter('about'));
          setPortfolioPosition(calculateExactCenter('portfolio'));
          setSocialsPosition(calculateExactCenter('socials'));
        }
        
        // Log positions for debugging
        console.log('Window positions updated:', {
          about: isMobile ? { x: 0, y: MARGIN } : calculateExactCenter('about'),
          portfolio: isMobile ? { x: 0, y: MARGIN } : calculateExactCenter('portfolio'),
          socials: isMobile ? { x: 0, y: MARGIN } : calculateExactCenter('socials')
        });
      }
    };
    
    // Initial positioning
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        setAboutPosition({ x: 0, y: MARGIN });
        setSocialsPosition({ x: 0, y: MARGIN });
        setPortfolioPosition({ x: 0, y: MARGIN });
      } else {
        setAboutPosition(calculateExactCenter('about'));
        setPortfolioPosition(calculateExactCenter('portfolio'));
        setSocialsPosition(calculateExactCenter('socials'));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setAboutPosition(calculateExactCenter('about'));
    setPortfolioPosition(calculateExactCenter('portfolio'));
    setSocialsPosition(calculateExactCenter('socials'));
  }, []);

  // Force center a window after it's opened
  const forceCenter = (windowType: 'about' | 'portfolio' | 'socials') => {
    // Short delay to ensure the window is rendered
    setTimeout(() => {
      const windowId = `${windowType}-window`;
      const windowElement = document.getElementById(windowId);
      
      if (windowElement) {
        const rect = windowElement.getBoundingClientRect();
        const centerX = (window.innerWidth - rect.width) / 2;
        const centerY = (window.innerHeight - rect.height) / 2;
        
        console.log(`Force centering ${windowType}:`, { centerX, centerY });
        
        switch (windowType) {
          case 'about':
            setAboutPosition({ x: centerX, y: centerY });
            break;
          case 'portfolio':
            setPortfolioPosition({ x: centerX, y: centerY });
            break;
          case 'socials':
            setSocialsPosition({ x: centerX, y: centerY });
            break;
        }
      }
    }, 100);
  };

  // Ensure only one window is open at a time and center it
  const handleOpenAbout = () => {
    setIsAboutOpen(true);
    setIsSocialsOpen(false);
    setIsPortfolioOpen(false);
    forceCenter('about');
  };

  const handleOpenSocials = () => {
    setIsAboutOpen(false);
    setIsSocialsOpen(true);
    setIsPortfolioOpen(false);
    forceCenter('socials');
  };

  const handleOpenPortfolio = () => {
    setIsAboutOpen(false);
    setIsSocialsOpen(false);
    setIsPortfolioOpen(true);
    forceCenter('portfolio');
  };

  const [windowScale, setWindowScale] = useState(1)

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

  // Handle window movement (we'll keep this for reference but disable actual movement)
  const handleWindowMove = (position: { x: number, y: number }, windowType: 'about' | 'socials' | 'portfolio') => {
    const windowDimensions = WINDOW_DIMENSIONS[windowType];
    
    // Apply margin constraints
    const safePosition = calculateSafePosition(
      position.x, 
      position.y, 
      windowDimensions.width, 
      windowDimensions.height
    );

    // Update position based on window type
    switch (windowType) {
      case 'about':
        setAboutPosition(safePosition);
        break;
      case 'socials':
        setSocialsPosition(safePosition);
        break;
      case 'portfolio':
        setPortfolioPosition(safePosition);
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        setAboutPosition({ x: 0, y: MARGIN });
        setSocialsPosition({ x: 0, y: MARGIN });
        setPortfolioPosition({ x: 0, y: MARGIN });
      } else {
        setAboutPosition(calculateExactCenter('about'));
        setPortfolioPosition(calculateExactCenter('portfolio'));
        setSocialsPosition(calculateExactCenter('socials'));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setAboutPosition(calculateExactCenter('about'));
    setPortfolioPosition(calculateExactCenter('portfolio'));
    setSocialsPosition(calculateExactCenter('socials'));
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Scene />
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none" 
        style={{ 
          zIndex: 2,
          position: 'absolute',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div style={{
          position: 'relative',
          width: '400px',
          height: '400px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/media/VR_Knight_Transparent.png`}
            alt="VR Knight"
            fill
            priority
            className="select-none object-contain"
            sizes="400px"
            style={{
              filter: 'brightness(1.2) contrast(1.1)',
            }}
          />
        </div>
      </div>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div className="pointer-events-auto">
          <BackButton />
          <Header />
          <NavBar 
            onOpenAbout={handleOpenAbout}
            onOpenSocials={handleOpenSocials}
            onOpenPortfolio={handleOpenPortfolio}
          />
        </div>
        <div className="pointer-events-auto">
          <PortfolioWindow 
            id="portfolio-window"
            isOpen={isPortfolioOpen}
            onClose={() => setIsPortfolioOpen(false)}
            defaultPosition={portfolioPosition}
            onMove={() => {}} // Disable moving
          />

          <FrostedWindow 
            id="about-window"
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
            defaultPosition={aboutPosition}
            onMove={() => {}} // Disable moving
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
            onMove={() => {}} // Disable moving
            style={{
              width: '350px',
              minWidth: '350px',
            }}
          >
            <SocialContent />
          </FrostedWindow>
        </div>
      </div>
    </main>
  )
}
