'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function HexVRPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Hex VR</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            Hex VR is a virtual reality experience that combines hexagonal-based 
            gameplay mechanics with immersive VR interactions.
          </p>
        </section>

        {/* Add more sections as content becomes available */}
      </div>
    </PortfolioPageLayout>
  )
}