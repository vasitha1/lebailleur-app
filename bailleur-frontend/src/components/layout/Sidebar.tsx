import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { type LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarItem {
  name: string
  href: string
  icon: LucideIcon
  current?: boolean
  badge?: number
  subItems?: Array<{
    name: string
    href: string
  }>
}

interface SidebarProps {
  navigation: SidebarItem[]
  basePath: string
}

const Sidebar: React.FC<SidebarProps> = ({ navigation, basePath }) => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  return (
    <div className={`flex flex-col bg-white/80 backdrop-blur-lg border-r border-gray-200/50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none"></div>
      
      <div className="relative flex flex-col flex-grow">
        {/* Collapse Toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === `${basePath}${item.href}`
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isExpanded = expandedItems.includes(item.name)
            
            return (
              <div key={item.name}>
                {/* Main Item */}
                <div className="relative group">
                  <Link
                    to={`${basePath}${item.href}`}
                    onClick={() => hasSubItems && toggleExpanded(item.name)}
                    className={`
                      relative flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50/80 hover:text-gray-900'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-between'}
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-500 text-white shadow-lg' 
                          : 'text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-100'
                        }
                      `}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      
                      {!isCollapsed && (
                        <span className="ml-3 transition-opacity duration-200">
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* Badge */}
                    {!isCollapsed && item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full"></div>
                    )}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 bg-red-500 px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Sub Items */}
                {!isCollapsed && hasSubItems && isExpanded && (
                  <div className="ml-11 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.subItems?.map((subItem) => {
                      const isSubActive = location.pathname === `${basePath}${subItem.href}`
                      return (
                        <Link
                          key={subItem.name}
                          to={`${basePath}${subItem.href}`}
                          className={`
                            block px-3 py-2 text-sm rounded-lg transition-all duration-200
                            ${isSubActive
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
                          `}
                        >
                          {subItem.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom Section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200/50">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
              <div className="text-sm text-gray-700 mb-2">
                <strong>Pro Tip:</strong>
              </div>
              <div className="text-xs text-gray-600">
                Use keyboard shortcuts to navigate faster
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar