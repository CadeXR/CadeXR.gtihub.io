'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'
import Link from 'next/link'

interface GameCard {
  title: string
  description: string
  path: string
  status: 'available' | 'coming-soon'
}

const games: GameCard[] = [
  {
    title: 'Hex VR',
    description: 'A VR Esport designed around zero gravity movement for VR.   \n\nMy role: Project Manager/Game Director',
    path: 'https://www.meta.com/en-gb/experiences/hex-vr/7202337956544173/?srsltid=AfmBOooht_Qp_t4-_CTaj1WibBjmEkEM3FUKdZYWf9Rdgm7kzyo6CqQh',
    status: 'available'
  },
  {
    title: 'Battlegrounds',
    description: 'A fantasy multiplayer sandbox game for VR.   \n\nMy role: Game Designer/Community Manager',
    path: 'https://www.meta.com/en-gb/experiences/battlegrounds/24783420087971207/',
    status: 'available'
  },
  {
    title: 'Particle Attack',
    description: 'Shoot particles for a high score! this game was just for fun, and runs right on this website :)',
    path: '/activities/attack',
    status: 'available'
  }
]

export default function ActivitiesPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Games</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div 
              key={game.path}
              className={`
                bg-[rgba(255,102,0,0.3)] rounded-lg p-6 backdrop-blur-sm
                border border-[rgba(255,102,0,0.6)] transition-all duration-300
                ${game.status === 'available' ? 'hover:bg-[rgba(255,102,0,0.4)] cursor-pointer' : 'opacity-50'}
              `}
            >
              {game.status === 'available' ? (
                <Link href={game.path} className="block h-full">
                  <GameCardContent game={game} />
                </Link>
              ) : (
                <GameCardContent game={game} />
              )}
            </div>
          ))}
        </div>
      </div>
    </PortfolioPageLayout>
  )
}

function GameCardContent({ game }: { game: GameCard }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">{game.title}</h2>
      <p className="text-gray-300 mb-4 whitespace-pre-line">{game.description}</p>
      <div className="flex items-center justify-between">
        <span className={`
          text-sm px-3 py-1 rounded-full
          ${game.status === 'available' 
            ? 'bg-[rgba(255,102,0,0.3)] text-[rgba(255,102,0,1)] border border-[rgba(255,102,0,0.6)]' 
            : 'bg-yellow-500/20 text-yellow-300'}
        `}>
          {game.status === 'available' ? 'Play Now' : 'Coming Soon'}
        </span>
      </div>
    </>
  )
}








