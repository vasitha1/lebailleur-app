import React, { useState } from 'react'
import { Search, Plus, Download, Mail, Phone } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Badge from '../../../components/ui/Badge'
import { formatCurrency, formatDate } from '../../../lib/utils'

const ManagerTenants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const tenants = [
    {
      id: 1,
      name: 'John Smith',
      unit: 'A101',
      contact: '+237 123 456 789',
      rent: 50000,
      status: 'Due',
      dueDate: 'Today',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Jane Doe',
      unit: 'A102',
      contact: '+237 123 456 790',
      rent: 45000,
      status: 'Overdue',
      dueDate: '-3 days',
      priority: 'urgent'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      unit: 'B201',
      contact: '+237 123 456 791',
      rent: 60000,
      status: 'Paid',
      dueDate: '20th',
      priority: 'normal'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-gray-900">👥 Tenant Management</h1>
          <p className="text-body-large text-gray-600 mt-1">Manage tenant relationships and payments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Tenant
        </Button>
      </div>

      {/* Search and Actions */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              📤 Export CSV
            </Button>
            <Button variant="secondary" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              📨 Bulk Notifications
            </Button>
          </div>
        </div>
      </Card>

      {/* Tenant Overview Table */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Tenant Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rent</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Due</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{tenant.name}</td>
                  <td className="py-3 px-4">{tenant.unit}</td>
                  <td className="py-3 px-4 text-sm">{tenant.contact}</td>
                  <td className="py-3 px-4">{formatCurrency(tenant.rent)}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant={
                        tenant.status === 'Paid' ? 'success' : 
                        tenant.status === 'Overdue' ? 'danger' : 'warning'
                      }
                    >
                      {tenant.status === 'Due' ? '⚠️ Due' : 
                       tenant.status === 'Overdue' ? '❌ Over' : 
                       '✅ Paid'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{tenant.dueDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-primary hover:text-blue-dark">📨</button>
                      <button className="text-blue-primary hover:text-blue-dark">📞</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-16 flex-col">
            <Mail className="w-6 h-6 mb-1" />
            Send Payment Reminders
          </Button>
          <Button variant="secondary" className="h-16 flex-col">
            <Download className="w-6 h-6 mb-1" />
            Generate Receipts
          </Button>
          <Button variant="success" className="h-16 flex-col">
            <span className="text-xl mb-1">✓</span>
            Mark as Paid
          </Button>
          <Button variant="secondary" className="h-16 flex-col">
            <span className="text-xl mb-1">💰</span>
            Record Partial Payment
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ManagerTenants
