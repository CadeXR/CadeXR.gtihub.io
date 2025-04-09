import './globals.css'
import type { Metadata } from 'next'
import { conthrax } from './fonts'

export const metadata: Metadata = {
  title: 'XR Developer Portfolio',
  description: 'Portfolio showcasing XR development projects and skills',
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




