'use client'

import { useState } from 'react'
import FrostedWindow from './FrostedWindow'

/**
 * Example component demonstrating FrostedWindow with header image support
 */
export default function FrostedWindowExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenWithImage, setIsOpenWithImage] = useState(false)

  return (
    <div style={{ padding: '2rem' }}>
      <h1>FrostedWindow Examples</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Open Window (No Header Image)
        </button>
        
        <button 
          onClick={() => setIsOpenWithImage(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Open Window (With Header Image)
        </button>
      </div>

      {/* Example 1: Basic window without header image */}
      <FrostedWindow
        id="example-window"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultPosition={{ x: 100, y: 100 }}
        style={{
          width: '400px',
          height: 'auto',
        }}
      >
        <div>
          <h2>Basic Window</h2>
          <p>This is a basic FrostedWindow without a header image.</p>
          <p>The window has the standard frosted glass appearance with a title bar.</p>
        </div>
      </FrostedWindow>

      {/* Example 2: Window with header image */}
      <FrostedWindow
        id="example-window-with-image"
        isOpen={isOpenWithImage}
        onClose={() => setIsOpenWithImage(false)}
        defaultPosition={{ x: 100, y: 100 }}
        headerImage={{
          src: "/media/VR_Knight_Transparent.png",
          alt: "VR Knight Header Image",
          height: "200px",
          objectFit: "contain"
        }}
        style={{
          width: '500px',
          height: 'auto',
        }}
      >
        <div>
          <h2>Window with Header Image</h2>
          <p>This FrostedWindow includes a header image at the top.</p>
          <p>The image is displayed above the title bar and has rounded top corners.</p>
          <p>You can customize the image height, object-fit, and other properties.</p>
        </div>
      </FrostedWindow>
    </div>
  )
} 