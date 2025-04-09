'use client'

import PortfolioPageLayout from '@/components/Layout/PortfolioPageLayout'
import Image from 'next/image'

export default function FlexVRWellnessPage() {
  return (
    <PortfolioPageLayout>
      <div className="text-white">
        <h1 className="text-4xl font-bold mb-8">FlexVR Wellness - MIT Reality Hack 2025</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
          <p className="mb-4">
            FlexVR Wellness is an ecosystem developed to facilitate electro-stimulation therapy over XR environments, 
            aiming to reduce patient stress. The system allows therapists to use AR headsets to communicate with and 
            remotely control therapy sessions in calming VR environments.
          </p>
          <p className="mb-4">
            This system was created in 60 hours at MIT Reality Hack and won the award "Hardware: Creative Inputs/Outputs." 
            It was created by Cade Gilbert, Shane Mckelvey, James Higdon, Peter He, Ty Lindell, and mentored by Rina Kim.
          </p>
          <a 
            href="https://devpost.com/software/flexvr-wellness" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View on Devpost →
          </a>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Understanding The Problem</h2>
          <p className="mb-4">
            When we started working on this project, we had a question we wanted to answer: How can we make a patient's 
            experience, in any field, more comfortable, without making the professional's job harder? We understood that 
            VR scenes could be used to visually stimulate patients in a calmer environment while a professional was at 
            work and decided to build on that idea.
          </p>
          <p className="mb-4">
            For our demo, we used a programmable device called a StimDuino, an open-source Arduino-based board to allow 
            us to fine control electrodes using code, as well as integrating it with a suite of XR devices using OSC 
            and Unity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Patient's Experience</h2>
          <div className="bg-white/10 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">VR Scene</h3>
            <p className="mb-4">
              A scene built in Unity 2022 with distracting colors and visuals, allowing for the patient to be immersed 
              and not focused on the fear that can come from electro-stimulation therapy.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">E-Stim Device</h3>
            <p>
              A small form factor device that can be clipped onto the belt or pants of the patient, with two electrodes 
              running to set positions on the user's arm.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Therapist Experience</h2>
          <div className="bg-white/10 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Workplace Scene</h3>
            <p className="mb-4">
              Built in Unity 2021, featuring patient info, 3D overlay of electrode placement, and heartrate monitor 
              integration. The scene includes a 3D avatar of the patient for enhanced presence.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Snapdragon Spaces Integration</h3>
            <p>
              Utilizing augmented reality, hand tracking, and Dual Render Fusion for an enhanced therapeutic experience.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Future Development</h2>
          <ul className="list-disc list-inside space-y-3">
            <li>Specialized E-Stim controller with mobile phone connectivity</li>
            <li>Enhanced therapist workflow integration</li>
            <li>AI-powered 3D environment generation based on patient preferences</li>
            <li>Improved data visualization and control systems</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            For inquiries about FlexVR Wellness, please contact us at:{' '}
            <a 
              href="mailto:flexvr.wellness@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              flexvr.wellness@gmail.com
            </a>
          </p>
        </section>
      </div>
    </PortfolioPageLayout>
  )
}


