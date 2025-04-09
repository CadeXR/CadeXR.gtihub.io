'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function IntentionalLocomotionPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Intentional Locomotion - MIT Reality Hack 2025</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            Intentional Locomotion is a VR movement system developed at MIT Reality Hack 2025, 
            focusing on natural and intuitive movement in virtual environments.
          </p>
        </section>

        {/* Add more sections as content becomes available */}
      </div>
    </PortfolioPageLayout>
  )
}