'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function BattlegroundsPage() {
  return (
    <PortfolioPageLayout
      headerImage={{
        src: "/media/Battlegrounds.png",
        alt: "Battlegrounds VR",
        height: "200px",
        objectFit: "cover"
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Battlegrounds VR</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            Battlegrounds VR is a free-to-play fantasy sandbox game set in a sprawling medieval world, 
            where players can engage in real-time PvP sword fighting, explore open environments, and 
            interact with a wide range of objects and systems. The game emphasizes player freedom, 
            emergent gameplay, and social interaction—encouraging players to team up, go rogue, or 
            create their own experiences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Contribution</h2>
          <p className="mb-4">
            I joined the project in its early days as one of the founding gameplay designers, spending 
            11 months helping shape the core systems and identity of the game. During my time on the 
            project, Battlegrounds VR reached nearly 500,000 downloads, fueled by strong community 
            engagement and an open-ended design philosophy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
          <p className="mb-4">
            My work included prototyping features, building levels and maps, writing design documentation, 
            and helping define mechanics that supported the sandbox-style gameplay. I also served as the 
            Community Manager, launching and growing the game's Discord server to over 10,000 active users, 
            creating a strong player hub that supported the game's growth and player-driven culture.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Play Battlegrounds VR</h2>
          <p className="mb-4">
            Battlegrounds VR is available for free on Meta Quest:
          </p>
          <a 
            href="https://www.meta.com/en-gb/experiences/battlegrounds/24783420087971207/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[rgba(255,102,0,0.3)] hover:bg-[rgba(255,102,0,0.5)] border border-[rgba(255,102,0,0.6)] rounded-lg transition-all duration-300"
          >
            Download on Meta Quest
          </a>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Achievements</h2>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Helped grow the game to nearly 500,000 downloads</li>
            <li>Built and managed a Discord community of 10,000+ active users</li>
            <li>Designed core gameplay systems that emphasized player freedom</li>
            <li>Created maps and environments that encouraged exploration and emergent gameplay</li>
          </ul>
        </section>
      </div>
    </PortfolioPageLayout>
  )
}
