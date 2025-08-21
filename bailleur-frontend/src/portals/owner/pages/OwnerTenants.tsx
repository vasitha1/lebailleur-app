import React, { useState } from 'react'
import { Search, Filter, Plus, Download, Mail } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Badge from '../../../components/ui/Badge'
import { formatCurrency, formatDate } from '../../../lib/utils'

const OwnerTenants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const tenants = [
    {
      id: 1,
      name: 'John Smith',
      unit: 'A101',
      rent: 50000,
      status: 'Paid',
      dueDate: '2024-11-15',
      phone: '+237 123 456 789',
      email: 'john@email.com'
    },
    {
      id: 2,
      name: 'Jane Doe',
      unit: 'A102',
      rent: 45000,
      status: 'Overdue',
      dueDate: '2024-11-01',
      phone: '+237 123 456 790',
      email: 'jane@email.com'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      unit: 'B201',
      rent: 60000,
      status: 'Due',
      dueDate: '2024-11-20',
      phone: '+237 123 456 791',
      email: 'mike@email.com'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      unit: 'B202',
      rent: 55000,
      status: 'Paid',
      dueDate: '2024-11-15',
      phone: '+237 123 456 792',
      email: 'sarah@email.com'
    }
  ]

  const vacantUnits = ['A103', 'B205', 'C304', 'D401']

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || tenant.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-gray-900">👥 Tenants Management</h1>
          <p className="text-body-large text-gray-600 mt-1">Manage all your tenants and vacant units</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Search and Filters */}
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
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-blue-primary"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Due">Due Soon</option>
              <option value="Overdue">Overdue</option>
            </select>
            
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            
            <Button variant="secondary" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Bulk Notify
            </Button>
          </div>
        </div>
      </Card>

      {/* Tenants Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rent</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{tenant.name}</p>
                      <p className="text-sm text-gray-500">{tenant.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{tenant.unit}</td>
                  <td className="py-3 px-4">{formatCurrency(tenant.rent)}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant={
                        tenant.status === 'Paid' ? 'success' : 
                        tenant.status === 'Overdue' ? 'danger' : 'warning'
                      }
                    >
                      {tenant.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{formatDate(tenant.dueDate)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-primary hover:text-blue-dark text-sm">👁️ View</button>
                      <button className="text-blue-primary hover:text-blue-dark text-sm">📨 Message</button>
                      <button className="text-blue-primary hover:text-blue-dark text-sm">📋 Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Vacant Units */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">🏠 Vacant Units</h2>
        <div className="flex flex-wrap gap-3">
          {vacantUnits.map((unit) => (
            <div key={unit} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
              <span className="font-medium text-gray-900">Unit {unit}</span>
              <Button size="sm" variant="secondary" className="ml-3">
                <Plus className="w-3 h-3 mr-1" />
                Add Tenant
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default OwnerTenants
