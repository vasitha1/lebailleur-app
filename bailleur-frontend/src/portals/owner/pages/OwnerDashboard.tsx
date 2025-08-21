import React from 'react'
import { DollarSign, Home, AlertTriangle, TrendingUp } from 'lucide-react'
import StatCard from '../../../components/ui/StatCard'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import { formatCurrency } from '../../../lib/utils'

const OwnerDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(2500000),
      icon: DollarSign,
      color: 'blue' as const,
      trend: { value: '+12%', isPositive: true }
    },
    {
      title: 'Occupied Units',
      value: '45/50',
      icon: Home,
      color: 'green' as const,
      trend: { value: '90%', isPositive: true }
    },
    {
      title: 'Overdue Payments',
      value: '12',
      icon: AlertTriangle,
      color: 'red' as const,
      trend: { value: '-3', isPositive: true }
    },
    {
      title: 'This Month Revenue',
      value: formatCurrency(450000),
      icon: TrendingUp,
      color: 'green' as const,
      trend: { value: '+8%', isPositive: true }
    }
  ]

  const recentAlerts = [
    { message: '5 payments overdue by more than 5 days', type: 'danger' as const },
    { message: 'Manager Sarah added 3 new tenants', type: 'info' as const },
    { message: 'Unit 204 became vacant yesterday', type: 'warning' as const },
  ]

  const tenantStatus = [
    { name: 'John Smith', unit: 'A101', status: 'Paid', amount: 50000, days: 0 },
    { name: 'Jane Doe', unit: 'A102', status: 'Overdue', amount: 45000, days: -3 },
    { name: 'Mike Johnson', unit: 'B201', status: 'Due', amount: 60000, days: 2 },
    { name: 'Sarah Wilson', unit: 'B202', status: 'Paid', amount: 55000, days: 0 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-h1 text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-body-large text-gray-600">Here's your property overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h3 text-gray-900">Revenue Chart</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-primary text-white rounded">Monthly</button>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">Yearly</button>
          </div>
        </div>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Interactive Revenue Chart Placeholder</p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">🔔 Recent Alerts & Notifications</h2>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Badge variant={alert.type}>{alert.type}</Badge>
                <p className="text-body-medium text-gray-700">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Tenant Status Overview */}
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">👥 Tenant Status Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Unit</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {tenantStatus.map((tenant, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2">{tenant.name}</td>
                    <td className="py-2">{tenant.unit}</td>
                    <td className="py-2">
                      <Badge 
                        variant={
                          tenant.status === 'Paid' ? 'success' : 
                          tenant.status === 'Overdue' ? 'danger' : 'warning'
                        }
                      >
                        {tenant.status}
                      </Badge>
                    </td>
                    <td className="py-2">{formatCurrency(tenant.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Manager Activity Feed */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">👨‍💼 Manager Activity Feed</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-primary rounded-full mt-2"></div>
            <div>
              <p className="text-body-medium text-gray-700">Sarah Johnson added new tenant to Unit A105</p>
              <p className="text-body-small text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-success rounded-full mt-2"></div>
            <div>
              <p className="text-body-medium text-gray-700">Mike Davis updated rent amount for Unit B203</p>
              <p className="text-body-small text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-caution rounded-full mt-2"></div>
            <div>
              <p className="text-body-medium text-gray-700">Sarah Johnson sent payment reminder to 5 tenants</p>
              <p className="text-body-small text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default OwnerDashboard
