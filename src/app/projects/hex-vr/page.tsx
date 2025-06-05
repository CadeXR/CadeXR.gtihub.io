'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'
import Image from 'next/image'

export default function HexVRPage() {
  return (
    <PortfolioPageLayout>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Hex VR</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            Hex VR is an indie development project focused on exploring zero-gravity mechanics 
            in virtual reality, with the goal of contributing to the growth of the VR esports space.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Origin Story</h2>
          <p className="mb-4">
            In January 2023, Meta and Ready At Dawn announced the shutdown of servers for their hit VR title, 
            Echo VR. Echo had cultivated a large, passionate community and was a cornerstone of the VR esports scene. 
            In response to the shutdown, a few of us from the community formed a small development team to create 
            a new zero-gravity VR title—one that would give the Echo VR community a new home and ensure it wouldn't 
            be left behind.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Development Progress</h2>
          <p className="mb-4">
            Over the past year, we've released several tech demos as proof-of-concept builds. 
            These demos have collectively earned over 50,000 downloads and have received strong 
            support from the community.
          </p>
          <p className="mb-4">
            The game is currently in an early access state, with a growing and dedicated player base. 
            Our development team operates under the name Golden Gear Studios—a small group of passionate 
            developers working on the project in our free time.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Role</h2>
          <p className="mb-4">
            I serve as the Creative Director, Community Manager, and one of the Programmers on the team, 
            helping to guide the vision and development of the project.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Try Hex VR</h2>
          <p className="mb-4">
            Hex VR is available on Meta Quest. You can download it from the Meta Store:
          </p>
          <a 
            href="https://www.meta.com/en-gb/experiences/hex-vr/7202337956544173/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[rgba(255,102,0,0.3)] hover:bg-[rgba(255,102,0,0.5)] border border-[rgba(255,102,0,0.6)] rounded-lg transition-all duration-300"
          >
            Download on Meta Quest
          </a>
        </section>
      </div>
    </PortfolioPageLayout>
  )
}
