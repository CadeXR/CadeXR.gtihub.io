'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type SearchParamsHandlerProps = {
  setIsAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPortfolioOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSocialsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forceCenter: (windowType: 'about' | 'portfolio' | 'socials') => void;
}

export function SearchParamsHandler({ 
  setIsAboutOpen, 
  setIsPortfolioOpen, 
  setIsSocialsOpen, 
  forceCenter 
}: SearchParamsHandlerProps) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const from = searchParams.get('from')
    
    if (from === 'projects') {
      // Coming from a project page, open portfolio
      setIsPortfolioOpen(true)
      setIsAboutOpen(false)
      setTimeout(() => forceCenter('portfolio'), 100)
    } else {
      // Default behavior - open about
      setIsAboutOpen(true)
      setIsPortfolioOpen(false)
      setTimeout(() => forceCenter('about'), 100)
    }
    
    // Always close socials
    setIsSocialsOpen(false)
  }, [searchParams, setIsAboutOpen, setIsPortfolioOpen, setIsSocialsOpen, forceCenter])
  
  return null
}