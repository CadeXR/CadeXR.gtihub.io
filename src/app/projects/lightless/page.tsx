'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function LightlessPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Lightless</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            Lightless is an atmospheric game project exploring themes of darkness 
            and light through innovative gameplay mechanics.
          </p>
        </section>

        {/* Add more sections as content becomes available */}
      </div>
    </PortfolioPageLayout>
  )
}