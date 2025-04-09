'use client'

import { useRouter } from 'next/navigation'
import FrostedWindow from './FrostedWindow'
import { conthrax } from '@/app/fonts'

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
  { name: 'Battlegrounds', path: '/projects/battlegrounds' },
  { name: 'FlexVR Wellness - RH25', path: '/projects/flexvr-wellness' },
  { name: 'DeskBuddy - ImmerseGT', path: '/projects/deskbuddy' },
  { name: 'Intentional Locomotion - RH25', path: '/projects/intentional-locomotion' },
  { name: 'Hex VR', path: '/projects/hex-vr' },
  { name: 'Lightless', path: '/projects/lightless' },
  { name: 'PersonifyAI', path: '/projects/personifyai' }
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
  
  const handleProjectClick = (path: string) => {
    // Create and append the overlay
    const overlay = document.createElement('div')
    overlay.className = 'scene-transition-overlay'
    overlay.style.opacity = '0'
    document.body.appendChild(overlay)

    // Force reflow
    overlay.getBoundingClientRect()
    
    // Fade to white
    overlay.style.opacity = '1'
    
    // First trigger the grow transition (particles to white)
    const scene = document.querySelector('canvas[data-scene]')
    if (scene) {
      const transitionEvent = new CustomEvent('startTransition', {
        detail: { direction: 'grow' }
      })
      scene.dispatchEvent(transitionEvent)
    }
    
    // Navigate after transition starts
    setTimeout(() => {
      router.push(path)
    }, 1500) // Shorter delay to ensure smooth transition
  }
  
  return (
    <FrostedWindow
      id={id}
      isOpen={isOpen}
      onClose={onClose}
      defaultPosition={defaultPosition}
      onMove={onMove}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        ...style
      }}
      className={className}
    >
      <div style={{ 
        minWidth: '300px',
        backgroundColor: 'transparent'
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
              onClick={() => handleProjectClick(project.path)}
              style={buttonStyle}
              className={conthrax.className}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
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













