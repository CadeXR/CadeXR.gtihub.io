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
            Desk Buddy is a personalized, holographic assistant designed to live on your desk through augmented reality. 
            Inspired by nostalgic digital companions like Clippy and Bonzi Buddy (but without the malware), 
            Desk Buddy offers a friendly presence that can assist with simple tasks, provide ideas, and keep you 
            company during your workday.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="mb-4">
            Built using Snap Spectacles and the Snap Lens platform, Desk Buddy is projected into your real-world space, 
            allowing you to place him anywhere on your desk. The assistant is powered by Google Gemini, giving it a 
            dynamic personality and the ability to respond to your needs in real-time. The virtual environment 
            Desk Buddy inhabits was partially generated using Meshy, adding to its unique charm.
          </p>
          <p className="mb-4">
            One of the key challenges we addressed was integrating a personalized AI response system that operates 
            in near real-time on the Spectacles. To achieve this, we developed an external server that communicates 
            with the Spectacles and built a system capable of detecting user intent—determining whether you're 
            addressing Desk Buddy or not.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Role</h2>
          <p className="mb-4">
            I contributed to the project by:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
            <li>Rigging the Desk Buddy avatar and designing its environment.</li>
            <li>Developing aspects of the AI logic for personality-based prompting.</li>
            <li>Assisting in the overall design and user experience of the application.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-3 rounded-lg text-center">Snap Spectacles & Snap Lens Studio</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">Google Gemini API</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">Blender</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">Meshy</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">Mixamo</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">Python</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">TypeScript</div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Outcome</h2>
          <p className="mb-4">
            Desk Buddy was awarded the Intelligent Immersion Track Winner at ImmerseGT 2025, recognizing its 
            innovative approach to creating a personalized, AR-based assistant that enhances user interaction 
            and productivity.
          </p>
          <div className="bg-[rgba(255,102,0,0.3)] border border-[rgba(255,102,0,0.6)] p-4 rounded-lg">
            <p className="font-semibold">Intelligent Immersion Track Winner - ImmerseGT 2025</p>
          </div>
        </section>
      </div>
    </PortfolioPageLayout>
  )
}
