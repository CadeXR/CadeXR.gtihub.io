'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function PersonifyAIPage() {
  return (
    <PortfolioPageLayout
      headerImage={{
        src: "/media/PersonifyAI.png",
        alt: "",
        height: "200px",
        objectFit: "cover"
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">PersonifyAI</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            PersonifyAI is a lightweight, local-first tool that allows anyone to run a fully functional 
            AI-powered Discord bot—without writing a single line of code. Designed for ease of use and 
            low system impact, the tool is perfect for users who want a personal AI companion in Discord 
            without diving into bot development or hosting services.
          </p>
          <p className="mb-4">
            The setup is simple: users provide a Discord bot token and an OpenAI API key, and they're 
            ready to go. The bot supports custom prompts, adjustable "wake words," and an optional 
            memory system that gives it short-term conversational context. To stay efficient, memory 
            is automatically cleared every hour to keep RAM and storage usage low.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Role</h2>
          <p className="mb-4">
            This is a solo project, designed and built entirely by me. I handled:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
            <li><span className="font-semibold">Programming:</span> Built the full back end in Python, integrating with the Discord API and OpenAI</li>
            <li><span className="font-semibold">UX & Accessibility:</span> Focused on no-code usability—users just drop in their keys and it runs</li>
            <li><span className="font-semibold">Memory System:</span> Implemented an optional short-term memory loop that resets periodically to optimize performance</li>
            <li><span className="font-semibold">Customization Features:</span> Added adjustable prompt tuning and wake-word controls</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/10 p-3 rounded-lg text-center">Python</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">Discord.py</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">OpenAI API</div>
            <div className="bg-white/10 p-3 rounded-lg text-center">Local storage</div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No-Code Setup</h3>
              <p>Simple configuration with just API keys - no programming required</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Custom Prompts</h3>
              <p>Personalize your AI's personality and behavior</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Wake Word Detection</h3>
              <p>Configure when your AI responds in busy Discord channels</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Efficient Memory</h3>
              <p>Optional context memory with automatic clearing to keep resource usage low</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Status</h2>
          <p className="mb-4">
            Currently in its final development phase. Once the remaining bugs are ironed out, 
            PersonifyAI will be released on my GitHub for public download.
          </p>
          <div className="bg-[rgba(255,102,0,0.3)] border border-[rgba(255,102,0,0.6)] p-4 rounded-lg">
            <p className="font-semibold">🚧 Final Development Phase</p>
          </div>
        </section>
      </div>
    </PortfolioPageLayout>
  )
}
