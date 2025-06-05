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
import { useMediaQuery } from 'react-responsive';

const MARGIN = 100; // Increased margin for better spacing
const NAVBAR_WIDTH = 64;
const WALL_MARGIN = '1rem'; // Match the margin used in NavBar/Header components
const SPACING = 16; // Spacing between windows

// Define media query functions at the top level
const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

const getIsVerySmall = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 480;
};

const calculateSafePosition = (desiredX: number, desiredY: number, windowWidth: number, windowHeight: number) => {
  if (typeof window === 'undefined') return { x: MARGIN, y: MARGIN };

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Use functions instead of variables
  const isMobile = getIsMobile();
  const isVerySmall = getIsVerySmall();
  
  // Define safe areas with scaled margins
  const headerHeight = isMobile ? 40 : 48;
  const topSafeMargin = isMobile ? (isVerySmall ? 8 : 12) + headerHeight : 16 + headerHeight;
  const bottomSafeMargin = isMobile ? (isVerySmall ? 8 : 12) : 16;
  const sideSafeMargin = isMobile ? (isVerySmall ? 8 : 16) : 24;

  // Ensure x position stays within margins
  const safeX = Math.min(
    Math.max(sideSafeMargin, desiredX), 
    viewportWidth - windowWidth - sideSafeMargin
  );
  
  // Ensure y position stays within margins and respects header
  const safeY = Math.min(
    Math.max(topSafeMargin, desiredY), 
    viewportHeight - windowHeight - bottomSafeMargin
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

// Define window dimensions more accurately with responsive scaling
const getWindowDimensions = () => {
  if (typeof window === 'undefined') return {
    about: { width: 400, height: 400 },
    portfolio: { width: 350, height: 600 },
    socials: { width: 350, height: 115 }
  };
  
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = getIsMobile();
  const isVerySmall = getIsVerySmall();
  
  // Calculate available space
  const headerHeight = isMobile ? 40 : 48;
  const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
  const bottomSafeMargin = isMobile ? 8 : 16;
  const sideSafeMargin = isMobile ? 8 : 16;
  
  const availableWidth = viewportWidth - (2 * sideSafeMargin);
  const availableHeight = viewportHeight - topSafeMargin - bottomSafeMargin;
  
  // Use percentage-based sizing for better responsiveness
  return {
    about: { 
      width: isMobile ? Math.min(availableWidth * 0.95, 400) : 400,
      height: isMobile ? Math.min(availableHeight * 0.7, 350) : 400 
    },
    portfolio: { 
      width: isMobile ? Math.min(availableWidth * 0.95, 350) : 350, 
      height: isMobile ? Math.min(availableHeight * 0.8, 500) : 600 
    },
    socials: { 
      width: isMobile ? Math.min(availableWidth * 0.95, 350) : 350, 
      height: isMobile ? Math.min(availableHeight * 0.2, 100) : 115 
    }
  };
};

// Initial window dimensions
const WINDOW_DIMENSIONS = getWindowDimensions();

export default function HomePage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isSocialsOpen, setIsSocialsOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  
  // Use react-responsive for consistent media queries
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVerySmall = useMediaQuery({ maxWidth: 480 });
  
  // Center all windows by default with responsive sizing
  const calculateExactCenter = (windowType: 'about' | 'portfolio' | 'socials') => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Define safe areas
    const headerHeight = isMobile ? 40 : 48;
    const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
    const bottomSafeMargin = isMobile ? 8 : 16;
    const sideSafeMargin = isMobile ? 8 : 16;
    
    // Get window dimensions
    const windowWidth = WINDOW_DIMENSIONS[windowType].width;
    const windowHeight = WINDOW_DIMENSIONS[windowType].height;
    
    // Center horizontally
    const centerX = Math.max(sideSafeMargin, (viewportWidth - windowWidth) / 2);
    
    // Center vertically with respect to safe areas
    const centerY = Math.max(
      topSafeMargin, 
      (viewportHeight - windowHeight) / 2
    );
    
    return { x: centerX, y: centerY };
  };
  
  // Individual center positions for each window
  const [aboutPosition, setAboutPosition] = useState(() => calculateExactCenter('about'));
  const [portfolioPosition, setPortfolioPosition] = useState(() => calculateExactCenter('portfolio'));
  const [socialsPosition, setSocialsPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    
    // Position socials window higher up
    const centerPos = calculateExactCenter('socials');
    return { 
      x: centerPos.x, 
      y: isMobile ? centerPos.y : Math.max(60, centerPos.y - 100) // Position higher up on desktop
    };
  });

  // Update positions when screen size changes
  useEffect(() => {
    setAboutPosition(calculateExactCenter('about'));
    setPortfolioPosition(calculateExactCenter('portfolio'));
    setSocialsPosition(calculateExactCenter('socials'));
  }, [isMobile, isVerySmall]);

  // Force center a window after it's opened
  const forceCenter = (windowType: 'about' | 'portfolio' | 'socials') => {
    // Short delay to ensure the window is rendered
    setTimeout(() => {
      const windowId = `${windowType}-window`;
      const windowElement = document.getElementById(windowId);
      
      if (windowElement) {
        const rect = windowElement.getBoundingClientRect();
        
        // Define safe areas
        const headerHeight = isMobile ? 40 : 48;
        const topSafeMargin = isMobile ? 8 + headerHeight : 16 + headerHeight;
        const bottomSafeMargin = isMobile ? 8 : 16;
        const safeMargin = isVerySmall ? 8 : (isMobile ? 12 : 16);
        
        // Calculate center position
        const centerX = Math.max((window.innerWidth - rect.width) / 2, safeMargin);
        const centerY = isMobile 
          ? Math.min(window.innerHeight - rect.height - safeMargin, window.innerHeight - rect.height - bottomSafeMargin)
          : Math.max((window.innerHeight - rect.height) / 2, topSafeMargin);
        
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
            className="frosted-window-about"
            style={{
              width: isMobile ? (isVerySmall ? '94vw' : '92vw') : '400px',
              height: 'auto',
              maxHeight: isMobile ? '70vh' : '80vh',
              overflowY: 'auto',
            }}
          >
            <div className="window-content overflow-y-auto">
              <AboutContent />
            </div>
          </FrostedWindow>

          <FrostedWindow 
            id="socials-window"
            isOpen={isSocialsOpen}
            onClose={() => setIsSocialsOpen(false)}
            defaultPosition={socialsPosition}
            onMove={() => {}} // Disable moving
            style={{
              width: isMobile ? (isVerySmall ? '94vw' : '92vw') : '350px',
              minWidth: isMobile ? 'unset' : '350px',
            }}
          >
            <SocialContent />
          </FrostedWindow>
        </div>
      </div>
    </main>
  )
}
