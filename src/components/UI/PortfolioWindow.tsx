'use client'

import { useRouter } from 'next/navigation'
import FrostedWindow from './FrostedWindow'

interface PortfolioWindowProps {
  id?: string
  isOpen: boolean
  onClose: () => void
  defaultPosition: { x: number; y: number }
  onMove?: (position: { x: number; y: number }) => void
  style?: React.CSSProperties
  className?: string
}

const projects = [
  { name: 'Battlegrounds', path: '/cadexr.github.io/projects/battlegrounds' },
  { name: 'FlexVR Wellness - RH25', path: '/cadexr.github.io/projects/flexvr-wellness' },
  { name: 'DeskBuddy - ImmerseGT', path: '/cadexr.github.io/projects/deskbuddy' },
  { name: 'Intentional Locomotion - RH25', path: '/cadexr.github.io/projects/intentional-locomotion' },
  { name: 'Hex VR', path: '/cadexr.github.io/projects/hex-vr' },
  { name: 'Lightless', path: '/cadexr.github.io/projects/lightless' },
  { name: 'PersonifyAI', path: '/cadexr.github.io/projects/personifyai' }
]

const buttonStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '0.75rem',
  cursor: 'pointer',
  marginBottom: '0.75rem',
  transition: 'all 0.2s ease',
  fontSize: '1rem',
  textAlign: 'center' as const,
}

export default function PortfolioWindow({ 
  id = 'portfolio-window',
  isOpen, 
  onClose, 
  defaultPosition,
  onMove,
  style,
  className
}: PortfolioWindowProps) {
  const router = useRouter()
  
  return (
    <FrostedWindow
      id={id}
      isOpen={isOpen}
      onClose={onClose}
      defaultPosition={defaultPosition}
      onMove={onMove}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add this to ensure it's not being overridden
        ...style
      }}
      className={className}
      data-frosted-box="true"
      data-active={isOpen ? "true" : "false"}
    >
      <div style={{ 
        minWidth: '300px',
        backgroundColor: 'transparent' // Add this to ensure child isn't causing issues
      }}>
        <h2 style={{ 
          color: 'white', 
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Portfolio
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {projects.map((project) => (
            <button
              key={project.path}
              onClick={() => {
                const scene = document.querySelector('canvas[data-scene]')
                if (!scene) return
                
                // First trigger the grow transition (particles to white)
                const transitionEvent = new CustomEvent('startTransition', {
                  detail: { direction: 'grow' }
                })
                scene.dispatchEvent(transitionEvent)
                
                // Navigate after transition is complete
                setTimeout(() => {
                  router.push(project.path)
                }, 3000) // Slightly shorter to ensure navigation happens before transition ends
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                width: '100%',
                height: '48px',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>
    </FrostedWindow>
  )
}










