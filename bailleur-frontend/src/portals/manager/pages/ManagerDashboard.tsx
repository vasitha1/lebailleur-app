import React from 'react'
import { Users, DollarSign, AlertTriangle, Home } from 'lucide-react'
import StatCard from '../../../components/ui/StatCard'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import { formatCurrency } from '../../../lib/utils'

const ManagerDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Tenants',
      value: '47',
      icon: Users,
      color: 'blue' as const
    },
    {
      title: 'Due Today',
      value: formatCurrency(45000),
      icon: DollarSign,
      color: 'yellow' as const
    },
    {
      title: 'Overdue',
      value: '8 tenants',
      icon: AlertTriangle,
      color: 'red' as const
    },
    {
      title: 'Occupied Units',
      value: '45/50',
      icon: Home,
      color: 'green' as const
    }
  ]

  const urgentNotifications = [
    '3 payments due today - requires follow-up',
    '5 payments overdue by 3+ days',
    'Unit 304 lease expires in 7 days'
  ]

  const todaysTasks = [
    { task: 'Follow up with overdue tenants (8)', completed: false },
    { task: 'Collect rent from Unit 201, 305, 412', completed: false },
    { task: 'Send reminder for upcoming due dates (12)', completed: false },
    { task: 'Updated tenant contact information', completed: true }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-gray-900 mb-2">🏢 Manager Dashboard</h1>
        <p className="text-body-large text-gray-600">Sunshine Apartments - Daily Overview</p>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Urgent Notifications */}
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">🔔 Urgent Notifications</h2>
          <div className="space-y-3">
            {urgentNotifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-warning rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-body-medium text-gray-700">{notification}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">📋 Today's Tasks</h2>
          <div className="space-y-3">
            {todaysTasks.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  className="mt-1 rounded border-gray-300 text-blue-primary focus:ring-blue-primary"
                  readOnly
                />
                <p className={`text-body-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                  {item.task}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Tenant Status */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">📊 Quick Tenant Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Unit</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2">John Smith</td>
                <td className="py-2">A101</td>
                <td className="py-2">
                  <Badge variant="warning">⚠️ Due Today</Badge>
                </td>
                <td className="py-2">{formatCurrency(50000)}</td>
                <td className="py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-primary text-sm">📨</button>
                    <button className="text-blue-primary text-sm">📞</button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">Jane Doe</td>
                <td className="py-2">A102</td>
                <td className="py-2">
                  <Badge variant="danger">❌ Overdue</Badge>
                </td>
                <td className="py-2">{formatCurrency(45000)}</td>
                <td className="py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-primary text-sm">📨</button>
                    <button className="text-blue-primary text-sm">📞</button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">Mike Johnson</td>
                <td className="py-2">B201</td>
                <td className="py-2">
                  <Badge variant="success">✅ Paid</Badge>
                </td>
                <td className="py-2">{formatCurrency(60000)}</td>
                <td className="py-2">
                  <button className="text-blue-primary text-sm">👁️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default ManagerDashboard
