'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function PersonifyAIPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">PersonifyAI</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            PersonifyAI is a platform that brings artificial intelligence to life 
            through personalized avatar interactions and natural language processing.
          </p>
        </section>

        {/* Add more sections as content becomes available */}
      </div>
    </PortfolioPageLayout>
  )
}