import './globals.css'
import type { Metadata } from 'next'

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
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  )
}

