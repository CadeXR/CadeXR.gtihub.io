'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function DeskBuddyPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">DeskBuddy - ImmerseGT</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            DeskBuddy is a VR productivity companion developed during ImmerseGT hackathon, 
            designed to enhance the work-from-home experience through virtual reality.
          </p>
        </section>

        {/* Add more sections as content becomes available */}
      </div>
    </PortfolioPageLayout>
  )
}