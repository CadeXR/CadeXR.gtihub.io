'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, Vector3 } from 'three'

interface Trail {
  points: Vector3[]
  life: number
  maxLife: number
  velocity: Vector3
}

export default function FlowingTrails() {
  const maxTrails = 50
  const trailLength = 20
  const trails = useRef<Trail[]>([])
  
  // Initialize trails
  useMemo(() => {
    trails.current = []
    for (let i = 0; i < maxTrails; i++) {
      const points = []
      for (let j = 0; j < trailLength; j++) {
        points.push(new Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ))
      }
      
      trails.current.push({
        points,
        life: Math.random(),
        maxLife: 1 + Math.random(),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        )
      })
    }
  }, [])

  useFrame((state, delta) => {
    trails.current.forEach(trail => {
      // Update trail position
      const head = trail.points[0].clone()
      head.add(trail.velocity)
      
      // Update points
      for (let i = trail.points.length - 1; i > 0; i--) {
        trail.points[i].copy(trail.points[i - 1])
      }
      trail.points[0].copy(head)

      // Update life
      trail.life += delta * 0.3
      if (trail.life >= trail.maxLife) {
        trail.life = 0
        // Reset position
        trail.points.forEach(point => {
          point.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          )
        })
      }
    })
  })

  return (
    <group>
      {trails.current.map((trail, i) => (
        <line key={i}>
          <bufferGeometry attach="geometry">
            <float32BufferAttribute 
              attach="attributes-position"
              count={trail.points.length}
              array={Float32Array.from(trail.points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            attach="material"
            color={new Color(0x4f46e5).lerp(new Color(0x8b5cf6), trail.life / trail.maxLife)}
            linewidth={1}
            opacity={1 - (trail.life / trail.maxLife) * 0.5}
            transparent
          />
        </line>
      ))}
    </group>
  )
}



