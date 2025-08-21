import React from 'react'
import { Plus, Mail, Settings, Clock } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'

const OwnerManagers: React.FC = () => {
  const managers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      addedDate: '2024-08-15',
      lastActive: '2 hours ago',
      recentActions: 'Added 2 tenants, Updated rent',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Mike Davis',
      email: 'mike@email.com',
      addedDate: '2024-07-20',
      lastActive: '1 day ago',
      recentActions: 'Sent payment reminders',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      email: 'lisa@email.com',
      addedDate: '2024-06-10',
      lastActive: '3 days ago',
      recentActions: 'Updated tenant information',
      status: 'Inactive'
    }
  ]

  const activityLog = [
    {
      manager: 'Sarah Johnson',
      action: 'Added new tenant to Unit A105',
      timestamp: '2 hours ago',
      ip: '192.168.1.100'
    },
    {
      manager: 'Mike Davis',
      action: 'Updated rent amount for Unit B203',
      timestamp: '4 hours ago',
      ip: '192.168.1.101'
    },
    {
      manager: 'Sarah Johnson',
      action: 'Sent payment reminder to 5 tenants',
      timestamp: '1 day ago',
      ip: '192.168.1.100'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-gray-900">👨‍💼 Property Managers</h1>
          <p className="text-body-large text-gray-600 mt-1">Manage your property management team</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <Mail className="w-4 h-4 mr-2" />
            📧 Send Invitation Link
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Invite New Manager
          </Button>
        </div>
      </div>

      {/* Active Managers */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Active Managers (3/5)</h2>
        <div className="space-y-4">
          {managers.map((manager) => (
            <div key={manager.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{manager.name}</h3>
                    <p className="text-body-medium text-gray-600">
                      Email: {manager.email} | Added: {manager.addedDate}
                    </p>
                    <p className="text-body-small text-gray-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      Last Active: {manager.lastActive}
                    </p>
                    <p className="text-body-small text-gray-600 mt-1">
                      Recent Actions: {manager.recentActions}
                    </p>
                  </div>
                </div>
                <Badge variant={manager.status === 'Active' ? 'success' : 'default'}>
                  {manager.status}
                </Badge>
              </div>
              <div className="flex space-x-3 mt-4">
                <Button size="sm" variant="secondary">View Activity</Button>
                <Button size="sm" variant="secondary">Send Message</Button>
                <Button size="sm" variant="secondary">
                  <Settings className="w-3 h-3 mr-1" />
                  ⚙️ Permissions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Manager Activity Log */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Manager Activity Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Manager</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Timestamp</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((log, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{log.manager}</td>
                  <td className="py-3 px-4">{log.action}</td>
                  <td className="py-3 px-4 text-gray-600">{log.timestamp}</td>
                  <td className="py-3 px-4 text-gray-500 font-mono text-sm">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default OwnerManagers
