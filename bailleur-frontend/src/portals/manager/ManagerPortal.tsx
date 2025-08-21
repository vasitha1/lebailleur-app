import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BarChart3, Users, Bell, CheckSquare, Settings, LogOut } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import ManagerDashboard from './pages/ManagerDashboard'
import ManagerTenants from './pages/ManagerTenants'
import ManagerNotifications from './pages/ManagerNotifications'

const navigation = [
  { name: 'Dashboard', href: '', icon: BarChart3 },
  { name: 'Tenants', href: '/tenants', icon: Users },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Logout', href: '/logout', icon: LogOut },
]

const ManagerPortal: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navigation={navigation} basePath="/manager" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Manager Dashboard" 
          subtitle="Sunshine Apartments"
          user={{ name: "Sarah Johnson", role: "Property Manager" }}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="" element={<ManagerDashboard />} />
            <Route path="/tenants" element={<ManagerTenants />} />
            <Route path="/notifications" element={<ManagerNotifications />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default ManagerPortal
