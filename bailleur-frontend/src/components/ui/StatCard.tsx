import React, { useState } from 'react'
import Card from './Card'
import { ExternalLink, MoreHorizontal, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ComponentType<{ className?: string }>
  trend?: {
    value: string
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
  subtitle?: string
  loading?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'blue',
  subtitle,
  loading = false
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    blue: {
      icon: 'from-blue-500 to-blue-600 text-white',
      bg: 'from-blue-50 to-blue-100/50',
      trend: 'text-blue-600'
    },
    green: {
      icon: 'from-green-500 to-green-600 text-white',
      bg: 'from-green-50 to-green-100/50',
      trend: 'text-green-600'
    },
    red: {
      icon: 'from-red-500 to-red-600 text-white',
      bg: 'from-red-50 to-red-100/50',
      trend: 'text-red-600'
    },
    yellow: {
      icon: 'from-yellow-500 to-yellow-600 text-white',
      bg: 'from-yellow-50 to-yellow-100/50',
      trend: 'text-yellow-600'
    },
    purple: {
      icon: 'from-purple-500 to-purple-600 text-white',
      bg: 'from-purple-50 to-purple-100/50',
      trend: 'text-purple-600'
    },
    gray: {
      icon: 'from-gray-500 to-gray-600 text-white',
      bg: 'from-gray-50 to-gray-100/50',
      trend: 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
        </div>
      </Card>
    )
  }
  
  return (
    <Card 
      hover 
      interactive
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <p className="text-2xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:scale-105">
            {value}
          </p>
          
          {subtitle && (
            <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
          )}
          
          {trend && (
            <div className={`flex items-center text-sm font-medium transition-all duration-300 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {trend.value}
              <span className="ml-1 text-gray-500 text-xs">vs last period</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`
            relative p-3 rounded-xl bg-gradient-to-br transition-all duration-300
            ${colorClasses[color].icon}
            ${isHovered ? 'scale-110 shadow-lg' : 'shadow-md'}
          `}>
            <Icon className="w-6 h-6" />
            
            {/* Subtle animation ring */}
            <div className={`
              absolute inset-0 rounded-xl bg-gradient-to-br opacity-20 transition-all duration-300
              ${colorClasses[color].bg}
              ${isHovered ? 'scale-125 opacity-30' : ''}
            `}></div>
          </div>
        )}
      </div>
      
      {/* Quick action overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-end p-4">
        <ExternalLink className="w-4 h-4 text-gray-600" />
      </div>
    </Card>
  )
}

export default StatCard
