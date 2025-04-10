'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  trail: Array<{ x: number, y: number }>
  isFollowing: boolean
  followingWindowId: string | null
  isOrbiting: boolean
  orbitAngle: number
  orbitRadius: number
  transitionProgress: number
  edgeIndex: number  // Remove optional flag
}

interface OrbitalParticle {
  x: number
  y: number
  angle: number
  speed: number
  size: number
  trail: Array<{ x: number, y: number }>
}

interface BoxBounds {
  left: number
  right: number
  top: number
  bottom: number
  id: string
  isActive: boolean
}

export default function Scene() {
  // Refined constants for smoother behavior
  const PARTICLE_SIZE = {
    NORMAL: 4,
    LARGE: 4,
    TRANSITION: 4  
  }
  const PARTICLE_COUNT = 100
  const BASE_VELOCITY = 3
  const MAX_VELOCITY = 3
  const ORBIT_SPEED = 40
  const FOLLOW_DISTANCE = 100
  const ORBIT_DISTANCE = 100
  const REPULSION_RADIUS = 80
  const REPULSION_STRENGTH = 1
  const TRAIL_LENGTH = 100
  const TRAIL_OPACITY = 0.4
  const TRANSITION_DURATION = 3500
  const ORBIT_RADIUS_MIN = 30
  const ORBIT_RADIUS_MAX = 60
  const EDGE_FOLLOW_DISTANCE = 20 // Distance from window edge to maintain
  const EDGE_DISTANCE = 20
  // Add new constant for shoot-off velocity
  const SHOOT_OFF_VELOCITY = 3
  // Add new constants
  const ORBITAL_PARTICLE_COUNT = 25
  const ORBITAL_PARTICLE_SIZE = 1.5  // Reduced from 3 to 1.5 for smaller particles
  const BASE_ORBITAL_SPEED = .007
  const ORBIT_RADIUS = 190  // This is the single number you'll change to control the orbit radius

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameIdRef = useRef<number>()
  const boxBoundsRef = useRef<Map<string, BoxBounds>>(new Map())
  const fadeOpacityRef = useRef(1)
  const isTransitioningRef = useRef(false)
  const transitionStartTimeRef = useRef(0)
  const transitionDirectionRef = useRef<'in' | 'out'>('in')
  const mousePositionRef = useRef({ x: 0, y: 0 })
  // Add new constant for independent particles
  const INDEPENDENT_PARTICLE_COUNT = 150
  // Add new ref for independent particles
  const independentParticlesRef = useRef<Particle[]>([])
  // Add new ref for orbital particles
  const orbitalParticlesRef = useRef<OrbitalParticle[]>([])
  // Add new state for orbit radius
  const [orbitRadius, setOrbitRadius] = useState(ORBIT_RADIUS)

  // Helper function for finding closest point on rectangle
  const findClosestPointOnRect = (px: number, py: number, rectX: number, rectY: number, rectW: number, rectH: number) => {
    const closestX = Math.max(rectX, Math.min(px, rectX + rectW))
    const closestY = Math.max(rectY, Math.min(py, rectY + rectH))
    return { x: closestX, y: closestY }
  }

  // Initialize or reset particles
  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * MAX_VELOCITY,
        vy: Math.sin(angle) * MAX_VELOCITY,
        size: PARTICLE_SIZE.NORMAL,
        trail: [], // Initialize empty trail array
        isFollowing: false,
        followingWindowId: null,
        isOrbiting: false,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: ORBIT_RADIUS_MIN + Math.random() * (ORBIT_RADIUS_MAX - ORBIT_RADIUS_MIN),
        transitionProgress: 0,
        edgeIndex: Math.floor(Math.random() * 4) // Initialize with random edge
      }
    })
  }, [])

  // Add new initialization function for independent particles
  const initializeIndependentParticles = useCallback((canvas: HTMLCanvasElement) => {
    independentParticlesRef.current = Array.from({ length: INDEPENDENT_PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * (BASE_VELOCITY * 0.5),
        vy: Math.sin(angle) * (BASE_VELOCITY * 0.5),
        size: PARTICLE_SIZE.NORMAL * 0.75,
        trail: [],
        isFollowing: false,
        followingWindowId: null,
        isOrbiting: false,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: ORBIT_RADIUS_MIN + Math.random() * (ORBIT_RADIUS_MAX - ORBIT_RADIUS_MIN),
        transitionProgress: 0,
        edgeIndex: Math.floor(Math.random() * 4)
      }
    })
  }, [])

  // Add initialization function for orbital particles
  const initializeOrbitalParticles = useCallback((canvas: HTMLCanvasElement) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    orbitalParticlesRef.current = Array.from({ length: ORBITAL_PARTICLE_COUNT }, (_, index) => {
      const angle = (Math.PI * 2 * index) / ORBITAL_PARTICLE_COUNT
      const speed = BASE_ORBITAL_SPEED * (0.8 + Math.random() * 0.4)
      
      return {
        x: centerX + Math.cos(angle) * ORBIT_RADIUS,
        y: centerY + Math.sin(angle) * ORBIT_RADIUS,
        angle,
        speed,
        size: ORBITAL_PARTICLE_SIZE,
        trail: []
      }
    })
  }, [])

  // Update particle positions
  const updateParticles = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Handle transition effect
    if (isTransitioningRef.current) {
      const elapsed = performance.now() - transitionStartTimeRef.current
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1)

      if (progress >= 1) {
        isTransitioningRef.current = false
      }

      // Apply transition effect to particles - only change size, not opacity
      particlesRef.current.forEach(particle => {
        if (transitionDirectionRef.current === 'in') {
          // Transition in: particles grow
          particle.size = PARTICLE_SIZE.NORMAL + (PARTICLE_SIZE.TRANSITION - PARTICLE_SIZE.NORMAL) * progress
        } else {
          // Transition out: particles shrink
          particle.size = PARTICLE_SIZE.TRANSITION - (PARTICLE_SIZE.TRANSITION - PARTICLE_SIZE.NORMAL) * progress
        }
      })
    }

    const activeWindows = Array.from(boxBoundsRef.current.values()).filter(window => window.isActive)

    particlesRef.current.forEach(particle => {
      // Add mouse avoidance before any other movement
      const dx = particle.x - mousePositionRef.current.x
      const dy = particle.y - mousePositionRef.current.y
      const distanceToMouse = Math.sqrt(dx * dx + dy * dy)
      
      if (distanceToMouse < 20) {
        // Calculate normalized direction vector away from mouse
        const dirX = dx / distanceToMouse
        const dirY = dy / distanceToMouse
        
        // Move particle away from mouse
        particle.x = mousePositionRef.current.x + dirX * 20
        particle.y = mousePositionRef.current.y + dirY * 20
      }

      if (activeWindows.length > 0) {
        const window = activeWindows[0]
        
        // Initialize edge following if not already set
        if (!particle.isOrbiting) {
          particle.isOrbiting = true
          particle.edgeIndex = Math.floor(Math.random() * 4)
        }

        // Calculate target position based on edge
        let targetX, targetY
        const padding = EDGE_DISTANCE
        const width = window.right - window.left
        const height = window.bottom - window.top
        
        // Simple linear progress along edges
        const progress = (particle.orbitAngle / (Math.PI * 2)) % 1

        switch (particle.edgeIndex) {
          case 0: // Top edge
            targetX = window.left + width * progress
            targetY = window.top + padding
            break
          case 1: // Right edge
            targetX = window.right - padding
            targetY = window.top + height * progress
            break
          case 2: // Bottom edge
            targetX = window.right - width * progress
            targetY = window.bottom - padding
            break
          case 3: // Left edge
            targetX = window.left + padding
            targetY = window.bottom - height * progress
            break
          default:
            targetX = particle.x
            targetY = particle.y
        }

        // Move directly towards target
        const dx = targetX - particle.x
        const dy = targetY - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0) {
          particle.vx = (dx / dist) * BASE_VELOCITY
          particle.vy = (dy / dist) * BASE_VELOCITY
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Update orbit angle for continuous movement
        particle.orbitAngle += 0.02

        // Change edges when reaching corners
        if (progress >= 0.98) {
          particle.edgeIndex = (particle.edgeIndex + 1) % 4
        }

      } else {
        // Shoot off in random direction when losing focus
        if (particle.isOrbiting) {
          const shootOffAngle = Math.random() * Math.PI * 2
          particle.vx = Math.cos(shootOffAngle) * SHOOT_OFF_VELOCITY
          particle.vy = Math.sin(shootOffAngle) * SHOOT_OFF_VELOCITY
          particle.isOrbiting = false
        }

        // Simple linear movement
        particle.x += particle.vx
        particle.y += particle.vy

        // Basic edge bouncing
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1
        }
      }

      // Update trail
      particle.trail.push({ x: particle.x, y: particle.y })
      if (particle.trail.length > TRAIL_LENGTH) {
        particle.trail.shift()
      }
    })

    // Draw particles
    ctx.fillStyle = '#ffffff'
    particlesRef.current.forEach(particle => {
      // Draw trail with constant opacity
      if (particle.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y)
        particle.trail.forEach((point, index) => {
          if (index === 0) return
          ctx.lineTo(point.x, point.y)
        })
        ctx.strokeStyle = `rgba(255, 255, 255, ${TRAIL_OPACITY})`
        ctx.stroke()
      }

      // Draw particle with full opacity
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.68)'
      ctx.fill()
    })

    // Add orbital particle updates after your existing particle updates
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    orbitalParticlesRef.current.forEach(particle => {
      // Update angle with slower speed for visibility
      particle.angle += particle.speed

      // Calculate new position using viewport center
      particle.x = centerX + Math.cos(particle.angle) * ORBIT_RADIUS
      particle.y = centerY + Math.sin(particle.angle) * ORBIT_RADIUS

      // Update trail
      particle.trail.push({ x: particle.x, y: particle.y })
      if (particle.trail.length > TRAIL_LENGTH) {
        particle.trail.shift()
      }

      // Draw trail
      if (particle.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y)
        particle.trail.forEach((point, index) => {
          if (index > 0) {
            ctx.lineTo(point.x, point.y)
          }
        })
        ctx.strokeStyle = `rgba(255, 255, 255, ${TRAIL_OPACITY})`
        ctx.stroke()
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fill()
    })
  }, [])

  // Add new update function for independent particles
  const updateIndependentParticles = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    independentParticlesRef.current.forEach(particle => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off canvas edges with padding
      const padding = 10 // Add some padding to keep particles fully visible
      
      if (particle.x <= padding) {
        particle.x = padding
        particle.vx = Math.abs(particle.vx) // Ensure positive velocity (moving right)
      } else if (particle.x >= canvas.width - padding) {
        particle.x = canvas.width - padding
        particle.vx = -Math.abs(particle.vx) // Ensure negative velocity (moving left)
      }

      if (particle.y <= padding) {
        particle.y = padding
        particle.vy = Math.abs(particle.vy) // Ensure positive velocity (moving down)
      } else if (particle.y >= canvas.height - padding) {
        particle.y = canvas.height - padding
        particle.vy = -Math.abs(particle.vy) // Ensure negative velocity (moving up)
      }

      // Add slight randomness to velocity after bouncing
      if (particle.x <= padding || particle.x >= canvas.width - padding) {
        particle.vy += (Math.random() - 0.5) * 0.5 // Add small random vertical adjustment
      }
      if (particle.y <= padding || particle.y >= canvas.height - padding) {
        particle.vx += (Math.random() - 0.5) * 0.5 // Add small random horizontal adjustment
      }

      // Update trail
      particle.trail.push({ x: particle.x, y: particle.y })
      if (particle.trail.length > TRAIL_LENGTH) {
        particle.trail.shift()
      }

      // Draw trail
      if (particle.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y)
        particle.trail.forEach((point, index) => {
          if (index === 0) return
          ctx.lineTo(point.x, point.y)
        })
        ctx.strokeStyle = `rgba(255, 255, 255, ${TRAIL_OPACITY * 0.5})`
        ctx.stroke()
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
    })
  }, [])

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas with black background
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw both particle systems
    updateIndependentParticles(canvas)
    updateParticles(canvas)

    animationFrameIdRef.current = requestAnimationFrame(animate)
  }, [updateParticles, updateIndependentParticles])

  // Handle transitions
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleTransition = (event: CustomEvent) => {
      const direction = event.detail.direction
      isTransitioningRef.current = true
      transitionStartTimeRef.current = performance.now()
      transitionDirectionRef.current = direction === 'grow' ? 'in' : 'out'

      // Remove any existing transition overlays
      document.querySelectorAll('.scene-transition-grow, .scene-transition-shrink')
        .forEach(el => el.remove())

      // Create and append transition overlay
      const overlay = document.createElement('div')
      overlay.className = `scene-transition-${direction}`
      document.body.appendChild(overlay)

      // Remove overlay after animation
      setTimeout(() => {
        overlay.remove()
      }, TRANSITION_DURATION)
    }

    canvas.addEventListener('startTransition', handleTransition as EventListener)
    return () => {
      canvas.removeEventListener('startTransition', handleTransition as EventListener)
      // Clean up any remaining overlays
      document.querySelectorAll('.scene-transition-grow, .scene-transition-shrink')
        .forEach(el => el.remove())
    }
  }, [])

  // Handle window updates
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleWindowUpdate = (event: CustomEvent) => {
      const { bounds, id } = event.detail
      
      if (bounds) {
        boxBoundsRef.current.set(id || 'default', {
          ...bounds,
          id: id || 'default',
          isActive: bounds.isActive
        })
      } else {
        boxBoundsRef.current.delete(id || 'default')
      }
    }

    canvas.addEventListener('windowUpdate', handleWindowUpdate as EventListener)
    return () => {
      canvas.removeEventListener('windowUpdate', handleWindowUpdate as EventListener)
    }
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Initialize all particle systems
      initializeParticles(canvas)
      initializeIndependentParticles(canvas)
      initializeOrbitalParticles(canvas)
    }
    updateCanvasSize()

    // Start animation
    animationFrameIdRef.current = requestAnimationFrame(animate)

    // Handle resize
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [animate, initializeParticles, initializeIndependentParticles, initializeOrbitalParticles])

  // Add method to dynamically update orbit radius
  const updateOrbitRadius = useCallback((newRadius: number) => {
    setOrbitRadius(newRadius)
  }, [])

  // Add debug logging
  useEffect(() => {
    console.log('Scene mounted')
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('Canvas not found')
      return
    }
    console.log('Canvas dimensions:', canvas.width, canvas.height)
    
    // Check if context is available
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Could not get 2D context')
      return
    }

    // Set initial background to ensure it's not white
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Add this useEffect after your other useEffects
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    initializeOrbitalParticles(canvas)
  }, [initializeOrbitalParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ 
        backgroundColor: 'black',
        zIndex: 1 
      }}
      data-scene
    />
  )
}





























