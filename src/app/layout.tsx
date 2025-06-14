'use client'

import './globals.css'
import { conthrax } from './fonts'
import { useEffect } from 'react'
import EmailButton from '@/components/UI/EmailButton'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Function to fix window positioning on mobile
    const fixMobileWindows = () => {
      if (window.innerWidth > 768) return;
      
      // Find all frosted windows
      const windows = document.querySelectorAll('.frosted-window');
      
      // Apply mobile fixes
      windows.forEach(window => {
        window.classList.add('mobile-window-fix');
      });
    };
    
    // Run on mount and resize
    fixMobileWindows();
    window.addEventListener('resize', fixMobileWindows);
    
    // Also run periodically to catch dynamically added windows
    const interval = setInterval(fixMobileWindows, 500);
    
    return () => {
      window.removeEventListener('resize', fixMobileWindows);
      clearInterval(interval);
    };
  }, []);

  return (
    <html lang="en" className={conthrax.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Cade Gilbert - XR Design, XR Software Dev, Game Design, and AI</title>
        <meta name="description" content="Portfolio of Cade Gilbert, showcasing work in XR Design, XR Software Development, Game Design, and AI." />
        <link rel="icon" href="/media/VR_Knight_Transparent.ico" />
        {/* Add canonical URL if needed */}
        <link rel="canonical" href="https://cadedev.com" />
      </head>
      <body>
        {children}
        <EmailButton />
      </body>
    </html>
  )
}




