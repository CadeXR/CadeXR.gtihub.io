'use client'

interface Props {
  score: number
  isVisible?: boolean
}

export default function ScoreWindow({ score, isVisible = false }: Props) {
  if (!isVisible) return null;
  
  return (
    <div 
      data-frosted-box="score"
      className="
        fixed left-4 top-1/2 transform -translate-y-1/2 
        bg-[rgba(255,255,255,0.1)]
        backdrop-blur-[10px]
        rounded-xl p-6 
        border border-[rgba(255,255,255,0.2)]
        text-white
        min-w-[120px]
        text-center
      "
      style={{ 
        zIndex: 50,
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="text-lg font-semibold mb-2">Score</div>
      <div className="text-3xl font-bold">{score.toLocaleString()}</div>
    </div>
  )
}






