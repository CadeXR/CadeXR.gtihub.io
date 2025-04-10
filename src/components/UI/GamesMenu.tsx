'use client'

import { conthrax } from '@/app/fonts'
import { useRouter } from 'next/navigation'

const buttonBaseStyle = {
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '1rem',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  fontSize: '1rem',
  transition: 'all 0.2s ease',
  marginBottom: '0.5rem',
  textAlign: 'left' as const,
}

const gameDescriptionStyle = {
  fontSize: '0.85rem',
  opacity: 0.8,
  marginTop: '0.25rem',
}

const roleStyle = {
  fontSize: '0.8rem',
  color: 'rgba(147, 51, 234, 0.9)',
  marginTop: '0.25rem',
}

export default function GamesMenu() {
  const router = useRouter()

  return (
    <div 
      data-frosted-box="games-menu"
      className="
        fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        bg-[rgba(255,255,255,0.1)]
        backdrop-blur-[10px]
        rounded-xl p-8
        border border-[rgba(255,255,255,0.2)]
        text-white
        min-w-[400px]
        max-w-[600px]
      "
      style={{ 
        zIndex: 50,
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <h1 className={`${conthrax.className} text-2xl mb-2`}>Games</h1>
      <p className="text-gray-300 mb-6">
        Game projects I have helped make, either as director or as a designer
      </p>

      <button 
        onClick={() => window.open('https://www.meta.com/en-gb/experiences/hex-vr/7202337956544173/?srsltid=AfmBOooht_Qp_t4-_CTaj1WibBjmEkEM3FUKdZYWf9Rdgm7kzyo6CqQh', '_blank')}
        className={conthrax.className}
        style={buttonBaseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
        }}
      >
        <div>Hex VR</div>
        <div style={gameDescriptionStyle}>
          A VR Esport designed around zero gravity movement for VR
        </div>
        <div style={roleStyle}>Role: Project Manager/Game Director</div>
      </button>

      <button 
        className={conthrax.className}
        style={buttonBaseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
        }}
      >
        <div>Battlegrounds</div>
        <div style={gameDescriptionStyle}>
          A fantasy multiplayer sandbox game for VR
        </div>
        <div style={roleStyle}>Role: Game Designer/Community Manager</div>
      </button>

      <button 
        onClick={() => {
          const overlay = document.createElement('div')
          overlay.className = 'scene-transition-grow'
          document.body.appendChild(overlay)

          const scene = document.querySelector('canvas[data-scene]')
          scene?.dispatchEvent(new CustomEvent('startTransition', { 
            detail: { direction: 'grow' } 
          }))

          setTimeout(() => {
            router.push('/activities')
            
            const exitOverlay = document.createElement('div')
            exitOverlay.className = 'scene-transition-shrink'
            document.body.appendChild(exitOverlay)
            
            setTimeout(() => {
              overlay.remove()
              exitOverlay.remove()
            }, 500)
          }, 3500)
        }}
        className={conthrax.className}
        style={{
          ...buttonBaseStyle,
          backgroundColor: 'rgba(147, 51, 234, 0.3)',
          border: '1px solid rgba(147, 51, 234, 0.6)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.3)'
        }}
      >
        <div>Particle Attack</div>
        <div style={gameDescriptionStyle}>
          Shoot particles for a high score! (this game was just for fun, and runs right on this website)
        </div>
      </button>
    </div>
  )
}