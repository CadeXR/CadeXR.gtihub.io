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
  { name: 'Project Dive (In Progress)', path: '/projects/project-dive' },
  { name: 'Battlegrounds', path: '/projects/battlegrounds' },
  { name: 'FlexVR Wellness - RH24', path: '/projects/flexvr-wellness' },
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
    // Remove transition overlay and directly navigate
    router.push(path)
  }
  
  return (
    <FrostedWindow
      id={id}
      isOpen={isOpen}
      onClose={onClose}
      defaultPosition={defaultPosition}
      onMove={onMove}
      headerImage={{
        src: "/media/Working.jpg",
        alt: "Working",
        height: "150px",
        objectFit: "cover"
      }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
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















