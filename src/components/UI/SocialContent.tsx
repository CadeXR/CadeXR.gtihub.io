'use client'

const buttonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.2s ease',
  textAlign: 'center' as const,
  textDecoration: 'none',
  flex: '1',
  margin: '0 0.5rem',
};

export default function SocialContent() {
  return (
    <div style={{ 
      minWidth: '300px',
      backgroundColor: 'transparent'
    }}>
      <h2 style={{ 
        color: 'white', 
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Connect with me
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '0 0.5rem'
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
















