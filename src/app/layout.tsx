import './globals.css'
import type { Metadata } from 'next'
import { conthrax } from './fonts'

export const metadata: Metadata = {
  title: 'Cade Gilbert',
  description: 'XR Design, XR Software Dev, Game Design, and AI',
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





