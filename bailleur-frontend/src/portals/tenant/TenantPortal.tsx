import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, CreditCard, FileText, MessageCircle, Settings, LogOut } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import TenantDashboard from './pages/TenantDashboard'
import TenantPayments from './pages/TenantPayments'
import TenantHistory from './pages/TenantHistory'

const navigation = [
  { name: 'Dashboard', href: '', icon: Home },
  { name: 'Make Payment', href: '/payment', icon: CreditCard },
  { name: 'Payment History', href: '/history', icon: FileText },
  { name: 'Contact Manager', href: '/contact', icon: MessageCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Logout', href: '/logout', icon: LogOut },
]

const TenantPortal: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navigation={navigation} basePath="/tenant" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Tenant Portal" 
          subtitle="Unit A101 - Sunshine Apartments"
          user={{ name: "John Doe", role: "Tenant" }}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="" element={<TenantDashboard />} />
            <Route path="/payment" element={<TenantPayments />} />
            <Route path="/history" element={<TenantHistory />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default TenantPortal
