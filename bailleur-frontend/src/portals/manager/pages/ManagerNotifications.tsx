import React from 'react'
import { Bell, Mail, MessageSquare, Send } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'

const ManagerNotifications: React.FC = () => {
  const automaticReminders = [
    { days: 7, status: 'active', description: '7 days before due date' },
    { days: 3, status: 'active', description: '3 days before due date' },
    { days: 0, status: 'active', description: 'Daily after due date until paid' }
  ]

  const pendingNotifications = [
    { count: 12, description: 'tenants due in 7 days', action: 'Auto-send tomorrow' },
    { count: 5, description: 'tenants due in 3 days', action: 'Auto-send in 4 days' },
    { count: 8, description: 'overdue tenants', action: 'Sending daily reminders' }
  ]

  const notificationHistory = [
    {
      id: 1,
      type: 'Payment Reminder',
      recipients: 5,
      timestamp: '2 hours ago',
      status: 'Sent'
    },
    {
      id: 2,
      type: 'Due Date Alert',
      recipients: 12,
      timestamp: '1 day ago',
      status: 'Sent'
    },
    {
      id: 3,
      type: 'Custom Message',
      recipients: 3,
      timestamp: '2 days ago',
      status: 'Delivered'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-gray-900">🔔 Notification Center</h1>
        <p className="text-body-large text-gray-600 mt-1">Manage automated and manual notifications</p>
      </div>

      {/* Automatic Reminders Schedule */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Automatic Reminders Schedule</h2>
        <div className="space-y-3">
          {automaticReminders.map((reminder, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-green-600">✅</span>
                <span className="text-body-medium text-gray-700">{reminder.description}</span>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Notifications */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Pending Notifications</h2>
        <div className="space-y-3">
          {pendingNotifications.map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-body-medium text-gray-900">
                  • <strong>{notification.count}</strong> {notification.description}
                </p>
                <p className="text-body-small text-gray-500">({notification.action})</p>
              </div>
              <Button size="sm" variant="secondary">View</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Manual Notifications */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Manual Notifications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Button className="h-16 flex-col">
            <Send className="w-6 h-6 mb-1" />
            📨 Send Custom Message
          </Button>
          <Button variant="secondary" className="h-16 flex-col">
            <MessageSquare className="w-6 h-6 mb-1" />
            📋 Select Recipients
          </Button>
          <Button variant="secondary" className="h-16 flex-col">
            <Mail className="w-6 h-6 mb-1" />
            📧 Email Blast
          </Button>
          <Button variant="secondary" className="h-16 flex-col">
            <MessageSquare className="w-6 h-6 mb-1" />
            📱 WhatsApp Bulk Send
          </Button>
        </div>
      </Card>

      {/* Notification History */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Notification History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Recipients</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Timestamp</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {notificationHistory.map((notification) => (
                <tr key={notification.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{notification.type}</td>
                  <td className="py-3 px-4">{notification.recipients} tenants</td>
                  <td className="py-3 px-4 text-gray-600">{notification.timestamp}</td>
                  <td className="py-3 px-4">
                    <Badge variant="success">{notification.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button size="sm" variant="secondary">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default ManagerNotifications
