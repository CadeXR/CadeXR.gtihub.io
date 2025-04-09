'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function BattlegroundsPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Battlegrounds</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-300">
            Project description goes here...
          </p>
        </section>

        {/* Add more sections as needed */}
      </div>
    </PortfolioPageLayout>
  )
}