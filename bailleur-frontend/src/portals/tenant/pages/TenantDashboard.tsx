import React from 'react'
import { CreditCard, FileText, MessageCircle, Download } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { formatCurrency, formatDate } from '../../../lib/utils'

const TenantDashboard: React.FC = () => {
  const paymentStatus = {
    nextDue: '2024-11-15',
    amount: 50000,
    daysUntilDue: 5,
    status: 'due'
  }

  const paymentOverview = {
    thisMonth: 50000,
    totalPaidThisYear: 450000,
    outstanding: 0
  }

  const recentNotifications = [
    'Payment reminder: Rent due in 5 days',
    'Receipt generated for October payment',
    'Maintenance scheduled for next week'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-gray-900 mb-2">🏠 Welcome back, John Doe!</h1>
        <p className="text-body-large text-gray-600">Unit A101 - Sunshine Apartments</p>
      </div>

      {/* Current Rent Status */}
      <Card className="border-l-4 border-l-yellow-caution">
        <h2 className="text-h3 text-gray-900 mb-4">💰 Current Rent Status</h2>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-body-medium text-gray-700">Next Payment Due: {formatDate(paymentStatus.nextDue)}</p>
              <p className="text-h4 text-gray-900 font-bold">{formatCurrency(paymentStatus.amount)}</p>
            </div>
            <Badge variant="warning">🟡 Due in {paymentStatus.daysUntilDue} days</Badge>
          </div>
          <div className="flex space-x-3">
            <Button>
              <CreditCard className="w-4 h-4 mr-2" />
              💳 Pay Now
            </Button>
            <Button variant="secondary">
              <FileText className="w-4 h-4 mr-2" />
              📄 View Details
            </Button>
          </div>
        </div>
      </Card>

      {/* Payment Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <h3 className="text-body-medium text-gray-500 mb-2">This Month</h3>
          <p className="text-h2 text-gray-900 font-bold">{formatCurrency(paymentOverview.thisMonth)}</p>
          <p className="text-body-small text-gray-500">Due 15th</p>
        </Card>
        
        <Card className="text-center">
          <h3 className="text-body-medium text-gray-500 mb-2">Total Paid</h3>
          <p className="text-h2 text-gray-900 font-bold">{formatCurrency(paymentOverview.totalPaidThisYear)}</p>
          <p className="text-body-small text-gray-500">This Year</p>
        </Card>
        
        <Card className="text-center">
          <h3 className="text-body-medium text-gray-500 mb-2">Outstanding</h3>
          <p className="text-h2 text-green-success font-bold">{formatCurrency(paymentOverview.outstanding)}</p>
          <p className="text-body-small text-gray-500">Current</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">🔔 Recent Notifications</h2>
          <div className="space-y-3">
            {recentNotifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-body-medium text-gray-700">{notification}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-16 flex-col">
              <CreditCard className="w-6 h-6 mb-1" />
              💳 Make Payment
            </Button>
            <Button variant="secondary" className="h-16 flex-col">
              <MessageCircle className="w-6 h-6 mb-1" />
              📧 Contact Manager
            </Button>
            <Button variant="secondary" className="h-16 flex-col">
              <Download className="w-6 h-6 mb-1" />
              📄 Download Receipt
            </Button>
            <Button variant="secondary" className="h-16 flex-col">
              <FileText className="w-6 h-6 mb-1" />
              📋 View Lease
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default TenantDashboard
