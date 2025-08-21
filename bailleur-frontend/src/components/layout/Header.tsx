import React from 'react'
import { Bell, User, Home } from 'lucide-react'
import Button from '../ui/Button'

interface HeaderProps {
  title: string
  subtitle?: string
  user?: {
    name: string
    role: string
  }
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, user }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-primary p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            
            {user && (
              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 p-2 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
