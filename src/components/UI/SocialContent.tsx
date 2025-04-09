'use client'

const buttonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  cursor: 'pointer',
  fontSize: '0.75rem',
  transition: 'all 0.2s ease',
  textAlign: 'center' as const,
  textDecoration: 'none',
  whiteSpace: 'nowrap' as const,
};

export default function SocialContent() {
  return (
    <div style={{ 
      width: '100%',
      backgroundColor: 'transparent',
      padding: '0.0rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.0rem'
    }}>
      <h2 style={{ 
        color: 'white', 
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Connect with me
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%'
      }}>
        <a 
          href="https://www.linkedin.com/in/cade-gilbert/"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          }}
        >
          LinkedIn
        </a>

        <a 
          href="https://x.com/Cade_XR"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          }}
        >
          Twitter
        </a>

        <a 
          href="https://www.youtube.com/@CadeXR"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          }}
        >
          YouTube
        </a>
      </div>
    </div>
  )
}

























