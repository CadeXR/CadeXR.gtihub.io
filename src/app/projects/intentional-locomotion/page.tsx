'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function IntentionalLocomotionPage() {
  return (
    <PortfolioPageLayout
      headerImage={{
        src: "/media/IntentionalLocomotion.png",
        alt: "",
        height: "200px",
        objectFit: "cover"
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Intentional Locomotion - MIT Reality Hack 2025</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            This project explores a new approach to VR movement through IMU-based micro-gesture detection, 
            creating a locomotion system that enables room-scale navigation while lying down. By translating 
            subtle, intentional foot movements into virtual motion, the system offers a more intuitive and 
            fatigue-free VR experience—especially when combined with BCI (Brain-Computer Interface) 
            technology for hands-free interaction.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Role</h2>
          <p className="mb-4">
            I worked as the Project Manager and led Unity development for the prototype, building core systems such as:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
            <li>A custom XR rig and locomotion manager for IMU-driven movement</li>
            <li>A C++ to C# data pipeline bridging Unity with IMU hardware for real-time data processing</li>
            <li>Integration of micro-gesture detection, using data pre-processed by a teammate's algorithm</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
          <p className="mb-4">
            The prototype demonstrated how players can walk, turn, and navigate in VR using only small, 
            deliberate gestures from IMUs mounted on the feet. The concept, referred to as intentional 
            locomotion, addresses a long-standing challenge in VR: the disconnect between physical and 
            virtual embodiment.
          </p>
          <p className="mb-4">
            While most VR systems require full-body motion or rely on artificial joystick movement, 
            this system focuses on subtle physical inputs—reducing fatigue while enhancing control and 
            immersion. Though planned BCI functionality was removed due to hardware failure, the project 
            showed the viability of gesture-based movement on its own.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tools & Technologies Used</h2>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Unity 2022</li>
            <li>Custom IMU-based hardware (x2)</li>
            <li>C# & C++</li>
            <li>Blender</li>
            <li>Muse S BCI (not used in final demo)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Outcome</h2>
          <p className="mb-4">
            Although the project did not win awards at MIT Reality Hack 2025, our team remains proud of 
            the prototype. We believe this system represents a meaningful step toward a future where VR 
            movement is driven by intent rather than physical exertion, opening doors to more accessible 
            and immersive experiences for all users.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://x.com/Cade_XR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[rgba(29,161,242,0.3)] hover:bg-[rgba(29,161,242,0.5)] border border-[rgba(29,161,242,0.6)] rounded-lg transition-all duration-300"
            >
              Cade (Me)
            </a>
            <a 
              href="https://x.com/I3Llamas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[rgba(29,161,242,0.3)] hover:bg-[rgba(29,161,242,0.5)] border border-[rgba(29,161,242,0.6)] rounded-lg transition-all duration-300"
            >
              John
            </a>
            <a 
              href="https://x.com/SpanishPotatoe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[rgba(29,161,242,0.3)] hover:bg-[rgba(29,161,242,0.5)] border border-[rgba(29,161,242,0.6)] rounded-lg transition-all duration-300"
            >
              Dan
            </a>
            <a 
              href="https://x.com/TheGoodAI1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[rgba(29,161,242,0.3)] hover:bg-[rgba(29,161,242,0.5)] border border-[rgba(29,161,242,0.6)] rounded-lg transition-all duration-300"
            >
              Summer
            </a>
            <a 
              href="https://x.com/Ridge_XR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[rgba(29,161,242,0.3)] hover:bg-[rgba(29,161,242,0.5)] border border-[rgba(29,161,242,0.6)] rounded-lg transition-all duration-300"
            >
              Ridge
            </a>
          </div>
        </section>
      </div>
    </PortfolioPageLayout>
  )
}
