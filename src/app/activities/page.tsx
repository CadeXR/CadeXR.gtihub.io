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
    title: 'Particle Attack',
    description: 'Control a swarm of particles to defend against incoming threats.',
    path: '/activities/attack',
    status: 'available'
  },
  {
    title: 'Maze Runner',
    description: 'Navigate through procedurally generated mazes.',
    path: '/activities/maze',
    status: 'coming-soon'
  },
  {
    title: 'Pattern Match',
    description: 'Test your memory and pattern recognition skills.',
    path: '/activities/pattern',
    status: 'coming-soon'
  }
]

export default function ActivitiesPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Interactive Activities</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div 
              key={game.path}
              className={`
                bg-white/10 rounded-lg p-6 backdrop-blur-sm
                border border-white/20 transition-all duration-300
                ${game.status === 'available' ? 'hover:bg-white/20 cursor-pointer' : 'opacity-50'}
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
      <p className="text-gray-300 mb-4">{game.description}</p>
      <div className="flex items-center justify-between">
        <span className={`
          text-sm px-3 py-1 rounded-full
          ${game.status === 'available' 
            ? 'bg-green-500/20 text-green-300' 
            : 'bg-yellow-500/20 text-yellow-300'}
        `}>
          {game.status === 'available' ? 'Play Now' : 'Coming Soon'}
        </span>
      </div>
    </>
  )
}