'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Physics constants
const GRAVITY = 0.5
const JUMP_POWER = 10
const LOCK_TIME = 1000 // ms
const CHARACTER_SIZE = 21 // px (reduced from 64 to 21, which is approximately 3x smaller)

export default function LittleDudePage() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState<NodeJS.Timeout | null>(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  
  // Initialize window size
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  // Physics update loop
  useEffect(() => {
    if (windowSize.width === 0) return // Skip until window size is known
    
    const updatePhysics = () => {
      if (isLocked) return // Don't update physics while locked
      
      // Apply gravity
      setVelocity(prev => ({ ...prev, y: prev.y + GRAVITY }))
      
      // Update position
      setPosition(prev => ({
        x: prev.x + velocity.x,
        y: prev.y + velocity.y
      }))
      
      // Check collisions
      const newPosition = {
        x: position.x + velocity.x,
        y: position.y + velocity.y
      }
      
      const halfSize = CHARACTER_SIZE / 2
      
      // Check floor collision
      if (newPosition.y + halfSize > windowSize.height) {
        handleCollision('bottom')
      }
      // Check ceiling collision
      else if (newPosition.y - halfSize < 0) {
        handleCollision('top')
      }
      
      // Check right wall collision
      if (newPosition.x + halfSize > windowSize.width) {
        handleCollision('right')
      }
      // Check left wall collision
      else if (newPosition.x - halfSize < 0) {
        handleCollision('left')
      }
    }
    
    const frameId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(frameId)
  }, [position, velocity, isLocked, windowSize])
  
  // Handle collision with a wall
  const handleCollision = (side: 'top' | 'right' | 'bottom' | 'left') => {
    // Stop movement
    setVelocity({ x: 0, y: 0 })
    
    // Position against the wall
    const halfSize = CHARACTER_SIZE / 2
    let newX = position.x
    let newY = position.y
    
    switch (side) {
      case 'bottom':
        newY = windowSize.height - halfSize
        break
      case 'top':
        newY = halfSize
        break
      case 'right':
        newX = windowSize.width - halfSize
        break
      case 'left':
        newX = halfSize
        break
    }
    
    setPosition({ x: newX, y: newY })
    
    // Lock in place
    setIsLocked(true)
    
    // Set timer to jump after lock time
    if (lockTimer) clearTimeout(lockTimer)
    const timer = setTimeout(() => {
      setIsLocked(false)
      
      // Jump in random direction away from wall
      const jumpAngle = getRandomJumpAngle(side)
      setVelocity({
        x: Math.cos(jumpAngle) * JUMP_POWER,
        y: Math.sin(jumpAngle) * JUMP_POWER
      })
    }, LOCK_TIME)
    
    setLockTimer(timer)
  }
  
  // Get random jump angle based on which wall was hit
  const getRandomJumpAngle = (side: 'top' | 'right' | 'bottom' | 'left') => {
    switch (side) {
      case 'bottom':
        // Jump upward (between 45° left and 45° right)
        return -Math.PI/2 + (Math.random() - 0.5) * Math.PI
      case 'top':
        // Jump downward (between 45° left and 45° right)
        return Math.PI/2 + (Math.random() - 0.5) * Math.PI
      case 'right':
        // Jump leftward (between 45° up and 45° down)
        return Math.PI + (Math.random() - 0.5) * Math.PI
      case 'left':
        // Jump rightward (between 45° up and 45° down)
        return (Math.random() - 0.5) * Math.PI
    }
  }
  
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <div 
        ref={canvasRef} 
        className="absolute inset-0"
      >
        <div 
          className="absolute transition-transform duration-100"
          style={{
            transform: `translate(${position.x - CHARACTER_SIZE/2}px, ${position.y - CHARACTER_SIZE/2}px)`,
            width: `${CHARACTER_SIZE}px`,
            height: `${CHARACTER_SIZE}px`,
          }}
        >
          <img
            src="/media/ALittleFuckinDude.png"
            alt="Little Dude"
            width={CHARACTER_SIZE}
            height={CHARACTER_SIZE}
            className={`${isLocked ? 'opacity-50' : 'opacity-100'}`}
          />
        </div>
      </div>
    </main>
  )
}


