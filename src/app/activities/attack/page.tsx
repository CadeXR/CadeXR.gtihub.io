'use client'

import { useState } from 'react'
import AttackScene from '@/components/Background/AttackScene'
import Link from 'next/link'

export default function AttackPage() {
  const [score, setScore] = useState(0)

  return (
    <main className="relative min-h-screen">
      <AttackScene onScoreChange={setScore} />
      
      {/* UI Overlay */}
      <div className="fixed top-0 left-0 w-full p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            href="/activities" 
            className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm 
                     hover:bg-white/20 transition-all duration-300"
          >
            ← Back to Games
          </Link>
          
          <div className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
            Score: {score}
          </div>
        </div>
      </div>

      {/* Controls Help */}
      <div className="fixed bottom-4 left-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
        <h3 className="font-semibold mb-2">Controls</h3>
        <ul className="text-sm space-y-1">
          <li>Move mouse to control particles</li>
          <li>Click to shoot in movement direction</li>
          <li>Destroy red enemies to score points</li>
        </ul>
      </div>
    </main>
  )
}
