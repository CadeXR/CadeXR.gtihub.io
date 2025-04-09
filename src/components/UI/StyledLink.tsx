'use client'

interface StyledLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function StyledLink({ href, children, className = '' }: StyledLinkProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
      style={{ 
        color: 'white', 
        textDecoration: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit', // This will inherit the Conthrax font
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
      }}
    >
      {children}
    </a>
  )
}
