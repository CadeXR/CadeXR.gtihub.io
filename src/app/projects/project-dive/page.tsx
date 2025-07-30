'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'

export default function ProjectDivePage() {
  return (
    <PortfolioPageLayout
      headerImage={{
        src: "/media/ProjectDive.png",
        alt: "Project Dive - Next Generation VR Immersion",
        height: "250px",
        objectFit: "cover"
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-5xl font-bold mb-6 text-center">Project Dive</h1>
        
        {/* Personal Story */}
        <section className="mb-12">
          <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-8 border border-[rgba(255,255,255,0.15)]">
            <h2 className="text-3xl font-bold mb-6 text-[rgba(255,102,0,1)]">The First Generation Nervegear</h2>
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              I am working on the designs that can lead to the first generation of a Nervegear-like device. 
              We prototyped an early version at MIT just this January, and I even gave a talk on the prototype 
              and idea at NYU not a few weeks later.
            </p>
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              I've had conversations with tons of industry professionals I've worked alongside who are interested 
              in seeing a first generation of the device, as well as several large creators in the XR industry 
              I'm already connected with, who would both love to see that prototype and are interested in the 
              project as a whole.
            </p>
            <p className="text-lg text-gray-300">
              The response has been overwhelmingly positive - people are genuinely excited about the possibility 
              of true full-body immersion without the limitations of current VR control schemes. It's not just 
              about making VR more comfortable; it's about making it feel natural and intuitive.
            </p>
          </div>
        </section>

        {/* The Concept */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">The Concept</h2>
          <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-8 border border-[rgba(255,255,255,0.15)]">
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              The basic overview is a device that is intended to allow full immersion inside a VR device, 
              "jacking in" like in The Matrix or Sword Art Online. But instead of waiting 10 years for some 
              sort of outrageously expensive BCI technology or Neuralink chip to somehow be cheap and widespread, 
              the system I am designing uses EKG and EIT kits to detect imperceptible muscle contractions in 
              the legs and arms.
            </p>
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              These contractions are fed through an algorithm that translates these movements into control 
              inputs that are agnostic with all immersive software (like SteamVR). A lot of the design for 
              this device is based around hardware developed at MIT, found in this research paper: 
              <a href="https://hcie.csail.mit.edu/research/eit-kit/eit-kit.html" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,102,0,1)] hover:underline ml-1">EIT-Kit Research Paper</a>.
            </p>
            <p className="text-lg text-gray-300">
              The beauty of this approach is that it leverages existing, proven technology rather than waiting 
              for experimental brain-computer interfaces. EKG and EIT systems are already used in medical 
              applications and are becoming increasingly accessible. By combining these with advanced signal 
              processing algorithms, we can achieve similar results to what people imagine BCI would provide, 
              but with technology that's available today.
            </p>
          </div>
        </section>

        {/* Technical Deep Dive */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-6 border border-[rgba(255,255,255,0.15)]">
              <h3 className="text-xl font-semibold mb-4 text-[rgba(255,102,0,1)]">Bio-Signal Detection</h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                The device uses EKG (Electrocardiogram) and EIT (Electrical Impedance Tomography) systems to 
                detect micro-movements and muscle contractions that are imperceptible to the user.
              </p>
              <p className="text-gray-200 leading-relaxed">
                EKG sensors detect electrical activity in muscles, while EIT systems create a 3D map of 
                electrical conductivity changes in the body. Together, they can sense when you're about to 
                move a muscle, even before you consciously register the movement.
              </p>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-6 border border-[rgba(255,255,255,0.15)]">
              <h3 className="text-xl font-semibold mb-4 text-[rgba(255,102,0,1)]">Signal Processing</h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                Proprietary algorithms analyze the bio-signals in real-time, filtering out noise and 
                identifying patterns that correspond to specific movements.
              </p>
              <p className="text-gray-200 leading-relaxed">
                The system learns your individual movement patterns and can distinguish between intentional 
                movements and involuntary muscle activity, ensuring precise and responsive control.
              </p>
            </div>
          </div>
        </section>

        {/* The Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Feels</h2>
          <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-8 border border-[rgba(255,255,255,0.15)]">
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              The best way to describe how the device would feel is imagine laying down in your bed, and very 
              lightly moving the muscles you use to walk. Every time you engage each leg you take a step. 
              Now imagine this across the body, barely flexing a muscle in your arm to lift it, or grabbing 
              door handles by very lightly contracting the same muscle you use to grip.
            </p>
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              Tying this system with a cheap, basic focus BCI device and eye tracking, I think a fully 
              accessible, completely immersive and futuristic control method is possible.
            </p>
            <p className="text-lg text-gray-300">
              The experience is incredibly natural because you're not learning a new control scheme - you're 
              using the same muscle patterns you've been using your entire life. The device just amplifies 
              these natural movements into the digital realm. It's like having a direct connection between 
              your body and the virtual world.
            </p>
          </div>
        </section>

        {/* Intentional Locomotion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Intentional Locomotion</h2>
          <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-8 border border-[rgba(255,255,255,0.15)]">
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              We originally called this system "Intentional Locomotion" as it's controlling an XR rig entirely 
              out of intent, instead of clunky un-immersive modern control schemes.
            </p>
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              And a future with a device like this could vastly increase retention in the XR space, going 
              from Meta's recent "comfort zone" of 20-40 minutes in VR, to hours of perfectly immersive, 
              comfortable VR.
            </p>
            <p className="text-lg text-gray-300">
              The name "Intentional Locomotion" captures the essence of what makes this system special. 
              Instead of pressing buttons or waving controllers, you're moving through virtual space with 
              pure intent. Your body naturally knows how to walk, reach, grab, and interact with the world. 
              This system just translates those natural movements into the virtual environment.
            </p>
          </div>
        </section>

        {/* Future Vision */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">The Future of VR</h2>
          <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-8 border border-[rgba(255,255,255,0.15)]">
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              Imagine a world where VR isn't just a gaming platform, but a true extension of human experience. 
              Where you can work, socialize, create, and explore in virtual spaces that feel as natural as 
              the physical world.
            </p>
            <p className="text-xl leading-relaxed mb-6 text-gray-200">
              This technology could revolutionize not just gaming, but remote work, education, therapy, 
              and social interaction. The ability to have natural, comfortable VR sessions that last for 
              hours instead of minutes opens up entirely new possibilities for how we interact with digital 
              spaces.
            </p>
            <p className="text-lg text-gray-300">
              The current 20-40 minute "comfort zone" in VR is a major limitation that prevents people from 
              fully embracing virtual reality as a platform for serious work or extended social interaction. 
              By solving this fundamental problem, we can unlock the true potential of VR as a medium for 
              human expression and connection.
            </p>
          </div>
        </section>

        {/* Development Status */}
        <section className="mb-12">
          <div className="bg-[rgba(255,102,0,0.1)] rounded-lg p-6 border border-[rgba(255,102,0,0.3)]">
            <p className="text-lg text-gray-200">
              <strong>Development Status:</strong> After successfully prototyping at MIT in January 2024 and 
              presenting at NYU shortly after, we're currently working on the final design pipeline and 
              sourcing hardware components for the next iteration.
            </p>
          </div>
        </section>
      </div>
    </PortfolioPageLayout>
  )
} 