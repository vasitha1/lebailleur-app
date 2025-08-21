import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BarChart3, Home, Users, DollarSign, TrendingUp, UserCheck, Settings, LogOut } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import OwnerDashboard from './pages/OwnerDashboard'
import OwnerProperties from './pages/OwnerProperties'
import OwnerTenants from './pages/OwnerTenants'
import OwnerFinancials from './pages/OwnerFinancials'
import OwnerAnalytics from './pages/OwnerAnalytics'
import OwnerManagers from './pages/OwnerManagers'

const navigation = [
  { name: 'Dashboard', href: '', icon: BarChart3 },
  { name: 'Properties', href: '/properties', icon: Home },
  { name: 'Tenants', href: '/tenants', icon: Users },
  { name: 'Financials', href: '/financials', icon: DollarSign },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Managers', href: '/managers', icon: UserCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Logout', href: '/logout', icon: LogOut },
]

const OwnerPortal: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navigation={navigation} basePath="/owner" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="LeBailleur Owner Portal" 
          subtitle="Sunshine Apartments"
          user={{ name: "John Doe", role: "Property Owner" }}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="" element={<OwnerDashboard />} />
            <Route path="/properties" element={<OwnerProperties />} />
            <Route path="/tenants" element={<OwnerTenants />} />
            <Route path="/financials" element={<OwnerFinancials />} />
            <Route path="/analytics" element={<OwnerAnalytics />} />
            <Route path="/managers" element={<OwnerManagers />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default OwnerPortal
