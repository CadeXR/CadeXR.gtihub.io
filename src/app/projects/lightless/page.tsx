'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function LightlessPage() {
  return (
    <PortfolioPageLayout
      headerImage={{
        src: "/media/Lightless.png",
        alt: "Lightless",
        height: "200px",
        objectFit: "cover"
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Lightless</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            Lightless is an atmospheric VR horror game in development for the Meta Quest platform. 
            Inspired by the Weeping Angels from Doctor Who, the game blends survival horror with 
            strategic co-op gameplay in a dark sci-fi setting.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Concept</h2>
          <p className="mb-4">
            Set in a universe where the stars have gone out, you and up to three friends play as 
            scavengers eking out a living by draining energy from derelict spaceships and stations. 
            But you're not alone. Lurking in the shadows are the Lightless—predatory, energy-feeding 
            creatures that can only move when they're not being watched. As you drain more energy, 
            the lights aboard these ships grow dimmer—and the Lightless grow bolder.
          </p>
          <p className="mb-4">
            The core tension of Lightless revolves around managing visibility, coordinating movement, 
            and making difficult choices as the environment becomes more hostile. Every action—every 
            light switch flipped, every unit of energy harvested—brings you closer to your goal, but 
            also closer to being hunted.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Role</h2>
          <p className="mb-4">
            This is a solo-developed passion project, and I'm handling all aspects of its creation, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Design & Narrative</h3>
              <p>Crafting the game's world, mechanics, and lore</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Programming</h3>
              <p>Developing the core systems in Unity 2022, including multiplayer logic, AI behavior, and environmental interactions</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Art Direction</h3>
              <p>Establishing the tone and visual atmosphere through lighting and environmental design</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Platform Targeting</h3>
              <p>Optimizing the game for Meta Quest VR hardware</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/10 px-4 py-2 rounded-lg">Unity 2022</span>
            <span className="bg-white/10 px-4 py-2 rounded-lg">Meta XR SDK</span>
            <span className="bg-white/10 px-4 py-2 rounded-lg">C#</span>
            <span className="bg-white/10 px-4 py-2 rounded-lg">VR multiplayer frameworks (custom setup)</span>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Status</h2>
          <p className="mb-4">
            The project is currently in development with no set release date. As a long-term passion 
            project, Lightless represents my interest in building deeply immersive, emotionally driven 
            multiplayer experiences in VR.
          </p>
          <div className="bg-[rgba(255,102,0,0.3)] border border-[rgba(255,102,0,0.6)] p-4 rounded-lg">
            <p className="font-semibold">🚧 In Development</p>
          </div>
        </section>
      </div>
    </PortfolioPageLayout>
  )
}

