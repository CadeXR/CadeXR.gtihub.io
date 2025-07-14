'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function ResumePage() {
  return (
    <PortfolioPageLayout
      headerImage={{
        src: "/media/MountainClouds.png",
        alt: "Cade Gilbert Resume",
        height: "200px",
        objectFit: "cover"
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Resume</h1>
        
        <section className="mb-12">
          <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-6 border border-[rgba(255,255,255,0.2)]">
            <h2 className="text-2xl font-semibold mb-4">Cade Gilbert - Resume</h2>
            <p className="text-lg leading-relaxed mb-6 text-gray-300">
              Download or view my resume to learn more about my experience in XR development, 
              game design, and community management.
            </p>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-6">Access Resume</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href={`${process.env.NEXT_PUBLIC_BASE_PATH}/media/CadeGilbertResume-July.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[rgba(255,102,0,0.3)] hover:bg-[rgba(255,102,0,0.5)] border border-[rgba(255,102,0,0.6)] rounded-lg transition-all duration-300 text-xl font-semibold"
            >
              📄 Open in New Tab
            </a>
            <a 
              href={`${process.env.NEXT_PUBLIC_BASE_PATH}/media/CadeGilbertResume-July.pdf`}
              download="CadeGilbert-Resume.pdf"
              className="inline-block px-8 py-4 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.4)] rounded-lg transition-all duration-300 text-xl font-semibold"
            >
              ⬇️ Download PDF
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About This Resume</h2>
          <p className="mb-4 text-gray-300">
            This resume highlights my experience in XR development, game design, and project management. 
            It includes details about my work on VR games like Hex VR and Battlegrounds, as well as my 
            open source contributions to the XR community.
          </p>
          <p className="text-gray-300">
            Feel free to reach out if you have any questions about my experience or would like to discuss 
            potential opportunities.
          </p>
        </section>
      </div>
    </PortfolioPageLayout>
  )
} 