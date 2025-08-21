import React from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full h-11 px-3 py-2 border border-gray-300 rounded-button text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-blue-primary',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          error && 'border-red-warning focus:ring-red-warning focus:border-red-warning',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-warning">{error}</p>
      )}
    </div>
  )
}

export default Input
