import React, { useState } from 'react'
import { Download, Mail, Filter } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { formatCurrency, formatDate } from '../../../lib/utils'

const TenantHistory: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Year')

  const paymentRecords = [
    {
      id: 1,
      date: '2024-10-15',
      amount: 50000,
      method: 'MTN Mobile Money',
      status: 'Paid',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      date: '2024-09-15',
      amount: 50000,
      method: 'Orange Money',
      status: 'Paid',
      transactionId: 'TXN123456788'
    },
    {
      id: 3,
      date: '2024-08-15',
      amount: 50000,
      method: 'MTN Mobile Money',
      status: 'Paid',
      transactionId: 'TXN123456787'
    },
    {
      id: 4,
      date: '2024-07-15',
      amount: 50000,
      method: 'Express Union Mobile Money',
      status: 'Paid',
      transactionId: 'TXN123456786'
    }
  ]

  const [selectedReceipt, setSelectedReceipt] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-gray-900">📄 Payment History & Receipts</h1>
          <p className="text-body-large text-gray-600 mt-1">View and download your payment records</p>
        </div>
        <Button variant="secondary">
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Filter */}
      <Card>
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-body-medium font-medium text-gray-700">Filter:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-blue-primary"
          >
            <option value="This Year">This Year</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Custom">Custom Range</option>
          </select>
        </div>
      </Card>

      {/* Payment Records Table */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Payment Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{formatDate(record.date)}</td>
                  <td className="py-3 px-4 font-medium">{formatCurrency(record.amount)}</td>
                  <td className="py-3 px-4">{record.method}</td>
                  <td className="py-3 px-4">
                    <Badge variant="success">✅ {record.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedReceipt(record.id)}
                    >
                      📄 View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Receipt Details */}
      {selectedReceipt && (
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">Receipt Details</h2>
          {(() => {
            const record = paymentRecords.find(r => r.id === selectedReceipt)
            if (!record) return null
            
            return (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium">{record.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span className="font-medium">Sunshine Apartments</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit:</span>
                      <span className="font-medium">A101</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Date:</span>
                      <span className="font-medium">{formatDate(record.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">{formatCurrency(record.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">{record.method}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    📤 Download PDF
                  </Button>
                  <Button variant="secondary">
                    <Mail className="w-4 h-4 mr-2" />
                    📧 Email Receipt
                  </Button>
                </div>
              </div>
            )
          })()}
        </Card>
      )}
    </div>
  )
}

export default TenantHistory
