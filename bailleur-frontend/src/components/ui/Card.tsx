import React from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  interactive?: boolean
  gradient?: boolean
  onMouseEnter?: () => void; 
  onMouseLeave?: () => void; 
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false, interactive = false, gradient = false }) => {
  return (
    <div
      className={`
        relative bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-sm
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''}
        ${interactive ? 'cursor-pointer group' : ''}
        ${gradient ? 'bg-gradient-to-br from-white to-gray-50/50' : ''}
        ${className}
      `}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 rounded-2xl pointer-events-none"></div>
      )}
      <div className="relative p-6">
        {children}
      </div>
    </div>
  )
}

export default Card;