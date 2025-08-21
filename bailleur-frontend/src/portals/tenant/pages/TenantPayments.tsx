import React, { useState } from 'react'
import { CreditCard, Smartphone, FileText } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import { formatCurrency, formatDate } from '../../../lib/utils'

const TenantPayments: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('full')

  const paymentDetails = {
    unit: 'A101',
    amount: 50000,
    dueDate: '2024-11-15',
    lateFee: 0
  }

  const paymentMethods = [
    { id: 'mtn', name: 'MTN Mobile Money', icon: '📱' },
    { id: 'orange', name: 'Orange Money', icon: '📱' },
    { id: 'express', name: 'Express Union Mobile Money', icon: '📱' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-gray-900 mb-2">💳 Make Payment</h1>
        <p className="text-body-large text-gray-600">Secure payment processing for your rent</p>
      </div>

      {/* Payment Details */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Payment Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Unit:</span>
              <span className="font-medium">{paymentDetails.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Due:</span>
              <span className="font-medium">{formatCurrency(paymentDetails.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Date:</span>
              <span className="font-medium">{formatDate(paymentDetails.dueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Late Fee:</span>
              <span className="font-medium text-green-success">
                {formatCurrency(paymentDetails.lateFee)} (if paid before due date)
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Method Selection */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Select Payment Method</h2>
        <div className="space-y-3">
          <h3 className="text-body-large font-medium text-gray-700 flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            📱 Mobile Money
          </h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-blue-primary focus:ring-blue-primary"
                />
                <span className="mr-2">{method.icon}</span>
                <span className="font-medium">{method.name}</span>
              </label>
            ))}
          </div>
        </div>
      </Card>

      {/* Payment Amount */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Payment Amount</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={formatCurrency(paymentDetails.amount)}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-button bg-gray-50"
            />
            <div className="flex space-x-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentAmount"
                  value="full"
                  checked={paymentAmount === 'full'}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="mr-2 text-blue-primary focus:ring-blue-primary"
                />
                Full Payment ✓
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentAmount"
                  value="partial"
                  checked={paymentAmount === 'partial'}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="mr-2 text-blue-primary focus:ring-blue-primary"
                />
                Partial Payment
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Actions */}
      <div className="flex justify-between">
        <Button variant="secondary">
          <FileText className="w-4 h-4 mr-2" />
          📄 Payment History
        </Button>
        <Button 
          disabled={!paymentMethod}
          className="px-8"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          🔒 Secure Payment
        </Button>
      </div>
    </div>
  )
}

export default TenantPayments
