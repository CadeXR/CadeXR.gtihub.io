'use client'
import { useMediaQuery } from 'react-responsive';

export default function AboutContent() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <div className="text-white space-y-6 p-4 max-w-full" style={{ 
      height: 'auto',
      maxHeight: 'none', // Remove any max-height constraint
      overflow: 'visible' // Let the parent container handle scrolling if needed
    }}>
      <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold mb-6`}>About Me</h2>
      
      <section>
        <p className="mb-4 text-sm md:text-base">
          I'm an XR community veteran and UX Designer with a focus on immersive experiences. My passion lies in understanding what drives XR forward—through networking, industry research, and active participation in events where I stay on top of trends and emerging technologies. Across the projects I've contributed to, my work has helped reach over half a million installs on the Meta Quest platform.
        </p>
      </section>

      <section>
        <p className="mb-4 text-sm md:text-base">
          Most recently, I worked as a UX and Gameplay Design contractor at Sinn Studio, creators of the PSVR best-seller <i>Swordsman VR</i>. I joined their new project, <i>Battlegrounds VR</i>, in its early days as one of the founding gameplay designers, spending a year helping to shape its core systems and identity. During my time on the project, <i>Battlegrounds</i> reached nearly 500,000 downloads—fueled by a strong community and an open-ended design philosophy. My work spanned prototyping, gameplay systems design, level design, and community management, all aimed at building an accessible yet competitive multiplayer foundation.
        </p>
      </section>

      <section>
        <p className="mb-4 text-sm md:text-base">
          I also lead Golden Gear Studios, an indie team I founded to pursue bold, experimental ideas in immersive design. We operate entirely as a passion-driven, volunteer collective—united by a shared love for VR and the belief that great gameplay can emerge from genuine collaboration, not just budgets. Our flagship project, <i>Hex VR</i>, is a zero-gravity sports game that blends tactical movement with competitive team play. Despite being in alpha, it has already surpassed 50,000 downloads on the Meta Quest platform, powered purely by word of mouth and community interest.
        </p>
      </section>

      <section>
        <p className="text-sm md:text-base">
          My creative toolkit includes Unity, Unreal Engine, Blender, and DaVinci Resolve—tools I've used both professionally and as a long-time hobbyist. Outside of studio work, I'm an active contributor to the XR prototyping scene, with projects recognized at events like MIT Reality Hack and ImmerseGT. These include explorations in AI-driven interaction, creative hardware workflows, and ambient AR companions—concepts that push the boundaries of how immersive tech can feel personal, intuitive, and genuinely helpful.
        </p>
      </section>

      <section>
        <p className="text-sm md:text-base">
          Above all, I care deeply about building the future of XR through thoughtful design, technical creativity, and a collaborative spirit that brings great ideas to life.
        </p>
      </section>
    </div>
  )
}






