'use client'

import { useEffect, useRef, useCallback } from 'react'
import BackButton from '@/components/UI/BackButton'

interface Props {
  onScoreChange?: (score: number) => void
}

interface AttackParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  isProjectile?: boolean
  orbitAngle: number
  orbitSpeed: number
  orbitTransition: number  // Required property
}

interface Enemy {
  x: number
  y: number
  size: number
  vy: number
  trail: { x: number, y: number }[] // Add trail
}

interface BackgroundParticle {
  x: number
  y: number
  speed: number
  trail: { x: number, y: number }[]
}

export default function AttackScene({ onScoreChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<AttackParticle[]>([])
  const enemiesRef = useRef<Enemy[]>([])
  const projectilesRef = useRef<AttackParticle[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const lastMousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameIdRef = useRef<number>()
  const scoreRef = useRef(0)
  const mouseVelocityRef = useRef({ x: 0, y: 0 })
  const lastTimeRef = useRef(Date.now())
  const currentAngleRef = useRef(0) // Initial angle (up)
  const targetAngleRef = useRef(0) // Target angle to rotate towards
  const angularVelocityRef = useRef(0) // Current rotation speed
  const rotationDirectionRef = useRef(1) // 1 for clockwise, -1 for counter-clockwise
  const centerPositionRef = useRef({ x: 0, y: 0 })
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([])

  // Constants
  const PARTICLE_COUNT = 50
  const PARTICLE_SIZE = 6  // Doubled from 3 to 6
  const FOLLOW_DISTANCE = 50
  const ENEMY_SIZE = 15
  const ENEMY_SPAWN_RATE = 1000 // ms
  const PROJECTILE_SPEED = 8
  const EXPLOSION_PARTICLE_COUNT = 15
  const ORBIT_RADIUS = 20
  const BASE_ORBIT_SPEED = 0.05
  const ARROW_LENGTH = 120  // 6x larger than original 20
  const ANGLE_INTERPOLATION_SPEED = 0.15 // Controls how quickly the arrow rotates
  const MIN_SHOOT_VELOCITY = 0.5 // Reduced to be more sensitive to slow movement
  const ORBIT_TRANSITION_SPEED = 0.002  // 10x slower (changed from 0.02)
  const ORBIT_ATTRACTION_STRENGTH = 0.01  // 10x gentler (changed from 0.1)
  const ROTATION_SPEED = 0.1 // Radians per frame - adjust for faster/slower rotation
  const MAX_ANGULAR_VELOCITY = 0.004 // Reduced for smoother rotation
  const ANGULAR_ACCELERATION = 0.000008 // Reduced for gentler acceleration
  const ANGULAR_DECELERATION = 0.000015 // Adjusted for smoother stops
  const MIN_ANGLE_DIFFERENCE = 0.001 // Minimum angle difference to continue rotating
  const SMOOTHING_FACTOR = 0.3 // Adjust for desired smoothing (0 = no smoothing, 1 = max smoothing)
  const ROTATION_SMOOTHING = 0.15 // Base rotation smoothing factor
  const MIN_VELOCITY = 0.1 // Minimum velocity to trigger direction change
  const VELOCITY_SMOOTHING = 0.3 // How quickly velocity updates
  const MAX_VELOCITY = 10 // Maximum expected velocity for normalization
  const ENEMY_COLOR = '#ff6600' // Orange
  const ENEMY_TRAIL_LENGTH = 2500 // Increased from 50 to 2500
  const BACKGROUND_PARTICLE_COUNT = 200 // Increased from 50 to 200
  const BACKGROUND_PARTICLE_SPEED = 2
  const BACKGROUND_PARTICLE_SIZE = 2

  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: PARTICLE_SIZE,
      orbitAngle: (Math.PI * 2 * index) / PARTICLE_COUNT, // Distribute particles evenly
      orbitSpeed: BASE_ORBIT_SPEED * (0.8 + Math.random() * 0.4), // Slightly random speeds
      orbitTransition: 1  // Initial particles start in full orbit
    }))
  }, [])

  const spawnEnemy = useCallback((canvas: HTMLCanvasElement) => {
    const enemy: Enemy = {
      x: Math.random() * canvas.width,
      y: 0,
      size: ENEMY_SIZE,
      vy: 1 + Math.random() * 0.5, // Random downward velocity
      trail: []
    }
    enemiesRef.current.push(enemy)
  }, [])

  const createExplosion = useCallback((x: number, y: number) => {
    const explosionParticles: AttackParticle[] = []
    for (let i = 0; i < EXPLOSION_PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / EXPLOSION_PARTICLE_COUNT
      const speed = 2 + Math.random() * 2
      explosionParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: PARTICLE_SIZE * 0.8,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: BASE_ORBIT_SPEED,
        orbitTransition: 0  // Start with no orbit
      })
    }
    return explosionParticles
  }, [])

  const shootProjectile = useCallback(() => {
    const projectile: AttackParticle = {
      x: centerPositionRef.current.x,
      y: centerPositionRef.current.y,
      vx: Math.cos(currentAngleRef.current) * PROJECTILE_SPEED,
      vy: Math.sin(currentAngleRef.current) * PROJECTILE_SPEED,
      size: PARTICLE_SIZE,
      isProjectile: true,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitSpeed: BASE_ORBIT_SPEED,
      orbitTransition: 0  // Added the missing property
    }
    projectilesRef.current.push(projectile)
  }, [])

  const initializeBackgroundParticles = useCallback((canvas: HTMLCanvasElement) => {
    backgroundParticlesRef.current = Array.from({ length: BACKGROUND_PARTICLE_COUNT }, () => ({
      // Distribute particles across entire screen width and height
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: BACKGROUND_PARTICLE_SPEED * (0.5 + Math.random()),
      trail: []
    }))
  }, [])

  const updateScene = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Calculate delta time
    const currentTime = Date.now()
    const deltaTime = currentTime - lastTimeRef.current
    lastTimeRef.current = currentTime

    // Clear canvas
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate mouse velocity with smoothing
    const dx = mousePositionRef.current.x - lastMousePositionRef.current.x
    const dy = mousePositionRef.current.y - lastMousePositionRef.current.y

    // Update velocity with smoothing
    mouseVelocityRef.current.x = mouseVelocityRef.current.x * (1 - VELOCITY_SMOOTHING) + dx * VELOCITY_SMOOTHING
    mouseVelocityRef.current.y = mouseVelocityRef.current.y * (1 - VELOCITY_SMOOTHING) + dy * VELOCITY_SMOOTHING

    // Calculate velocity magnitude
    const velocityMagnitude = Math.sqrt(
      mouseVelocityRef.current.x * mouseVelocityRef.current.x + 
      mouseVelocityRef.current.y * mouseVelocityRef.current.y
    )

    // Normalize velocity to 0-1 range
    const normalizedVelocity = Math.min(velocityMagnitude / MAX_VELOCITY, 1)

    if (velocityMagnitude > MIN_VELOCITY) {
      const targetAngle = Math.atan2(mouseVelocityRef.current.y, mouseVelocityRef.current.x)
      
      // Smoothly interpolate to the target angle
      let angleDiff = targetAngle - currentAngleRef.current

      // Ensure we rotate the shortest direction
      if (angleDiff > Math.PI) angleDiff -= Math.PI * 2
      if (angleDiff < -Math.PI) angleDiff += Math.PI * 2

      // Adjust rotation speed based on velocity
      const velocityBasedSmoothing = ROTATION_SMOOTHING * normalizedVelocity
      currentAngleRef.current += angleDiff * velocityBasedSmoothing
    }

    // Normalize current angle
    if (currentAngleRef.current > Math.PI) currentAngleRef.current -= Math.PI * 2
    if (currentAngleRef.current < -Math.PI) currentAngleRef.current += Math.PI * 2

    // Update last position
    lastMousePositionRef.current = {
      x: mousePositionRef.current.x,
      y: mousePositionRef.current.y
    }

    // Update center position
    centerPositionRef.current = {
      x: mousePositionRef.current.x,
      y: mousePositionRef.current.y
    }

    // Calculate arrow length based on velocity
    const currentArrowLength = ARROW_LENGTH * (0.3 + 0.7 * normalizedVelocity)

    // Draw direction arrow with velocity-based length
    ctx.beginPath()
    ctx.moveTo(centerPositionRef.current.x, centerPositionRef.current.y)
    ctx.lineTo(
      centerPositionRef.current.x + Math.cos(currentAngleRef.current) * currentArrowLength,
      centerPositionRef.current.y + Math.sin(currentAngleRef.current) * currentArrowLength
    )
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 6
    ctx.stroke()

    // Inner sharp line
    ctx.beginPath()
    ctx.moveTo(centerPositionRef.current.x, centerPositionRef.current.y)
    ctx.lineTo(
      centerPositionRef.current.x + Math.cos(currentAngleRef.current) * currentArrowLength,
      centerPositionRef.current.y + Math.sin(currentAngleRef.current) * currentArrowLength
    )
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()

    // Add velocity-based arrowhead
    const arrowheadSize = 10 * (0.5 + 0.5 * normalizedVelocity)
    const arrowEndX = centerPositionRef.current.x + Math.cos(currentAngleRef.current) * currentArrowLength
    const arrowEndY = centerPositionRef.current.y + Math.sin(currentAngleRef.current) * currentArrowLength
    
    // Arrowhead glow
    ctx.beginPath()
    ctx.moveTo(
      arrowEndX - Math.cos(currentAngleRef.current + Math.PI * 0.8) * (arrowheadSize + 2),
      arrowEndY - Math.sin(currentAngleRef.current + Math.PI * 0.8) * (arrowheadSize + 2)
    )
    ctx.lineTo(arrowEndX, arrowEndY)
    ctx.lineTo(
      arrowEndX - Math.cos(currentAngleRef.current - Math.PI * 0.8) * (arrowheadSize + 2),
      arrowEndY - Math.sin(currentAngleRef.current - Math.PI * 0.8) * (arrowheadSize + 2)
    )
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 4
    ctx.stroke()

    // Sharp arrowhead
    ctx.beginPath()
    ctx.moveTo(
      arrowEndX - Math.cos(currentAngleRef.current + Math.PI * 0.8) * arrowheadSize,
      arrowEndY - Math.sin(currentAngleRef.current + Math.PI * 0.8) * arrowheadSize
    )
    ctx.lineTo(arrowEndX, arrowEndY)
    ctx.lineTo(
      arrowEndX - Math.cos(currentAngleRef.current - Math.PI * 0.8) * arrowheadSize,
      arrowEndY - Math.sin(currentAngleRef.current - Math.PI * 0.8) * arrowheadSize
    )
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Gradually increase orbit transition
      if (particle.orbitTransition < 1) {
        particle.orbitTransition += ORBIT_TRANSITION_SPEED
        
        // Mix between free movement and orbit based on transition
        const targetX = mousePositionRef.current.x + Math.cos(particle.orbitAngle) * ORBIT_RADIUS
        const targetY = mousePositionRef.current.y + Math.sin(particle.orbitAngle) * ORBIT_RADIUS

        const dx = targetX - particle.x
        const dy = targetY - particle.y
        
        // Stronger pull when closer to full orbit
        const pullStrength = ORBIT_ATTRACTION_STRENGTH * particle.orbitTransition
        particle.vx = particle.vx * (1 - pullStrength) + dx * pullStrength
        particle.vy = particle.vy * (1 - pullStrength) + dy * pullStrength

        // Apply velocity with some damping
        particle.x += particle.vx
        particle.y += particle.vy
      } else {
        // Fully orbiting particles snap exactly to their orbital position
        particle.orbitAngle += particle.orbitSpeed
        particle.x = mousePositionRef.current.x + Math.cos(particle.orbitAngle) * ORBIT_RADIUS
        particle.y = mousePositionRef.current.y + Math.sin(particle.orbitAngle) * ORBIT_RADIUS
      }

      // Update orbit angle
      if (particle.orbitTransition < 1) {
        particle.orbitAngle += particle.orbitSpeed * particle.orbitTransition
      }

      // Optional: Add slight glow effect based on transition
      const glowSize = particle.size * (1 + 0.5 * particle.orbitTransition)
      
      // Draw particle with transition-based effects
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
      const opacity = 0.3 + 0.7 * particle.orbitTransition
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fill()
    })

    // Update and draw background particles
    backgroundParticlesRef.current.forEach(particle => {
      // Update position
      particle.x += particle.speed
      particle.y += particle.speed

      // Add current position to trail
      particle.trail.push({ x: particle.x, y: particle.y })
      if (particle.trail.length > 15) {
        particle.trail.shift()
      }

      // Reset position when particle goes off screen
      if (particle.x > canvas.width || particle.y > canvas.height) {
        // Reset to random position along top or left edge
        if (Math.random() < 0.5) {
          particle.x = Math.random() * canvas.width
          particle.y = 0
        } else {
          particle.x = 0
          particle.y = Math.random() * canvas.height
        }
        particle.trail = []
      }

      // Draw trail
      if (particle.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y)
        particle.trail.forEach((point, index) => {
          if (index === 0) return
          ctx.lineTo(point.x, point.y)
        })
        ctx.strokeStyle = 'rgba(147, 51, 234, 0.15)' // Faint purple
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, BACKGROUND_PARTICLE_SIZE, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(147, 51, 234, 0.3)' // Slightly more visible purple
      ctx.fill()
    })

    // Update and draw enemies with longer trails
    enemiesRef.current = enemiesRef.current.filter(enemy => {
      // Update position
      enemy.y += enemy.vy

      // Update trail
      enemy.trail.push({ x: enemy.x, y: enemy.y })
      if (enemy.trail.length > ENEMY_TRAIL_LENGTH) {
        enemy.trail.shift()
      }

      // Draw trail with enhanced gradient opacity
      if (enemy.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(enemy.trail[0].x, enemy.trail[0].y)
        
        // Create longer gradient trail effect with better fade
        enemy.trail.forEach((point, index) => {
          if (index === 0) return
          
          // Adjust opacity curve for longer trail
          const opacity = (index / enemy.trail.length) * 0.8 // Increased max opacity
          ctx.strokeStyle = `rgba(255, 102, 0, ${opacity})`
          ctx.lineWidth = 2 // Slightly thicker line
          ctx.beginPath()
          ctx.moveTo(enemy.trail[index - 1].x, enemy.trail[index - 1].y)
          ctx.lineTo(point.x, point.y)
          ctx.stroke()
        })
      }

      // Draw enemy with enhanced glow
      ctx.beginPath()
      ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2)
      ctx.fillStyle = ENEMY_COLOR
      ctx.fill()

      // Add stronger glow effect
      const gradient = ctx.createRadialGradient(
        enemy.x, enemy.y, enemy.size,
        enemy.x, enemy.y, enemy.size * 3 // Increased glow radius
      )
      gradient.addColorStop(0, 'rgba(255, 102, 0, 0.4)')
      gradient.addColorStop(1, 'rgba(255, 102, 0, 0)')
      
      ctx.beginPath()
      ctx.arc(enemy.x, enemy.y, enemy.size * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      return enemy.y < canvas.height + enemy.size
    })

    // Update and draw projectiles
    projectilesRef.current = projectilesRef.current.filter(projectile => {
      projectile.x += projectile.vx
      projectile.y += projectile.vy

      // Check collision with enemies
      enemiesRef.current = enemiesRef.current.filter(enemy => {
        const dx = projectile.x - enemy.x
        const dy = projectile.y - enemy.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < enemy.size + projectile.size) {
          // Create explosion
          const explosion = createExplosion(enemy.x, enemy.y)
          particlesRef.current.push(...explosion)
          
          // Update score
          scoreRef.current += 100
          onScoreChange?.(scoreRef.current)
          
          return false
        }
        return true
      })

      ctx.beginPath()
      ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.fill()

      return (
        projectile.x > 0 &&
        projectile.x < canvas.width &&
        projectile.y > 0 &&
        projectile.y < canvas.height
      )
    })
  }, [createExplosion])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    updateScene(canvas)
    animationFrameIdRef.current = requestAnimationFrame(animate)
  }, [updateScene])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeParticles(canvas)
      initializeBackgroundParticles(canvas)
    }
    updateCanvasSize()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    // Click handler
    const handleClick = () => {
      shootProjectile()
    }

    // Spawn enemies periodically
    const enemySpawnInterval = setInterval(() => {
      spawnEnemy(canvas)
    }, ENEMY_SPAWN_RATE)

    // Start animation
    animationFrameIdRef.current = requestAnimationFrame(animate)

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      clearInterval(enemySpawnInterval)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [animate, initializeParticles, spawnEnemy, shootProjectile, initializeBackgroundParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    // Initialize last position to prevent initial jump
    lastMousePositionRef.current = mousePositionRef.current

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <BackButton />
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
    </>
  )
}



























