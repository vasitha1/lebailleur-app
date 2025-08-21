import React from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'purple'
  className?: string
  pulse?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className = '',
  pulse = false,
  size = 'md'
}) => {
  const variants = {
    success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300/50',
    warning: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300/50',
    danger: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300/50',
    info: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300/50',
    purple: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300/50',
    default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300/50'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  
  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium border backdrop-blur-sm transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  )
}


export default Badge
