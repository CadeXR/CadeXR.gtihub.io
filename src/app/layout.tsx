import './globals.css'
import type { Metadata } from 'next'
import { conthrax } from './fonts'

export const metadata: Metadata = {
  title: 'Cade Gilbert',
  description: 'XR Design, XR Software Dev, Game Design, and AI',
  icons: {
    icon: '/media/VR_Knight_Transparent.ico',
    shortcut: '/media/VR_Knight_Transparent.ico',
  },
  openGraph: {
    title: 'Cade Gilbert',
    description: 'XR Design, XR Software Dev, Game Design, and AI',
    url: 'https://www.cadedev.com',
    siteName: 'Cade Gilbert',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cade Gilbert',
    description: 'XR Design, XR Software Dev, Game Design, and AI',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={conthrax.className}>
      <body>{children}</body>
    </html>
  )
}






