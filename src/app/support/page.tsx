'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function SupportPage() {
  return (
    <PortfolioPageLayout
      headerImage={{
        src: "/media/MountainClouds.png",
        alt: "Support Open Source Development",
        height: "100px",
        objectFit: "cover"
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Support My Open Source Work</h1>
        
        <section className="mb-12">
          <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-6 border border-[rgba(255,255,255,0.2)]">
            <p className="text-lg leading-relaxed mb-6">
              Hi! If you've reached this page, that's because you were curious about one of my open source apps.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              I distribute my open source applications for free, allowing other developers like myself to have access to constantly updating tools that can further along their projects in the XR space. I make these as tools for myself internally, and over time build them up into fully-fledged applications that are scalable. These take a lot of time, and I want to keep making these tools. If you feel like supporting me, and allowing me to continue to make tools like these, I would appreciate it if you donated to my Ko-fi! Even the smallest donations help me spend time making these tools!
            </p>
            
            <p className="text-lg leading-relaxed mb-8 font-semibold">
              Thank you so much! - CadeXR
            </p>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-6">Support My Work</h2>
          <p className="mb-6 text-gray-300">
            Your support helps me continue developing free tools for the XR community
          </p>
          <a 
            href="https://ko-fi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[rgba(255,102,0,0.3)] hover:bg-[rgba(255,102,0,0.5)] border border-[rgba(255,102,0,0.6)] rounded-lg transition-all duration-300 text-xl font-semibold"
          >
            ☕ Support on Ko-fi
          </a>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Open Source Philosophy</h2>
          <p className="mb-4 text-gray-300">
            I believe in the power of open source software to drive innovation and collaboration in the XR space. 
            By keeping my tools free and accessible, I hope to lower the barrier to entry for developers and 
            creators who want to build amazing experiences in virtual and augmented reality.
          </p>
          <p className="text-gray-300">
            Every contribution, no matter how small, helps me continue this mission and ensures that these 
            tools remain available to everyone in the community.
          </p>
        </section>
      </div>
    </PortfolioPageLayout>
  )
} 