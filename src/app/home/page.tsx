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

// Define window dimensions
const WINDOW_DIMENSIONS = {
  about: { width: 450, height: 400 },
  portfolio: { width: 350, height: 600 },
  socials: { width: 300, height: 300 }
};

const calculateSpawnNodes = () => {
  if (typeof window === 'undefined') return {
    about: { x: 0, y: 0, width: 0, height: 0 },
    portfolio: { x: 0, y: 0, width: 0, height: 0 },
    socials: { x: 0, y: 0, width: 0, height: 0 }
  };

  // Get navbar element for reference
  const navbar = document.querySelector('[data-frosted-box="navbar"]');
  if (!navbar) return null;

  const navbarBounds = navbar.getBoundingClientRect();
  
  // Calculate spawn nodes
  const aboutNode: SpawnNode = {
    x: navbarBounds.right - 284, // 284 pixels left of the navbar's right edge
    y: navbarBounds.top + 100, // 100 pixels below the navbar's top
    ...WINDOW_DIMENSIONS.about
  };

  const portfolioNode: SpawnNode = {
    x: aboutNode.x - 500, // 500 pixels left of the about node
    y: aboutNode.y,
    ...WINDOW_DIMENSIONS.portfolio
  };

  const socialsNode: SpawnNode = {
    x: aboutNode.x - (WINDOW_DIMENSIONS.socials.width / 2),
    y: aboutNode.y + WINDOW_DIMENSIONS.about.height + SPACING + 60, // Reduced from 62 to 60 pixels
    ...WINDOW_DIMENSIONS.socials
  };

  return { about: aboutNode, portfolio: portfolioNode, socials: socialsNode };
};

const calculateInitialPositions = () => {
  const spawnNodes = calculateSpawnNodes();
  if (!spawnNodes) return {
    about: { x: 151, y: 98 },  // Rounded from x: 151.28750610351562, y: 97.5999984741211
    portfolio: { x: 200, y: 200 },
    socials: { x: 364, y: 598 }
  };

  // Calculate window positions based on spawn nodes
  // Note: Subtracting the width to position from top-right corner
  return {
    about: { 
      x: spawnNodes.about.x - WINDOW_DIMENSIONS.about.width, 
      y: spawnNodes.about.y 
    },
    portfolio: { 
      x: spawnNodes.portfolio.x - WINDOW_DIMENSIONS.portfolio.width, 
      y: spawnNodes.portfolio.y 
    },
    socials: { 
      x: spawnNodes.socials.x - WINDOW_DIMENSIONS.socials.width, 
      y: spawnNodes.socials.y 
    }
  };
};

export default function HomePage() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isSocialsOpen, setIsSocialsOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)

  const [windowScale, setWindowScale] = useState(1)
  const [aboutPosition, setAboutPosition] = useState(() => {
    const positions = calculateInitialPositions();
    return positions.about;
  });

  const [portfolioPosition, setPortfolioPosition] = useState(() => {
    const positions = calculateInitialPositions();
    return positions.portfolio;
  });

  const [socialsPosition, setSocialsPosition] = useState(() => {
    const positions = calculateInitialPositions();
    return positions.socials;
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
    const windowDimensions = WINDOW_DIMENSIONS[windowType];
    const spawnNodes = calculateSpawnNodes();
    
    if (!spawnNodes) return;

    // Calculate position relative to spawn node
    const spawnNode = spawnNodes[windowType];
    
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
        const positions = calculateInitialPositions();
        setAboutPosition(positions.about);
        setPortfolioPosition(positions.portfolio);
        setSocialsPosition(positions.socials);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const positions = calculateInitialPositions();
    setAboutPosition(positions.about);
    setPortfolioPosition(positions.portfolio);
    setSocialsPosition(positions.socials);
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


























