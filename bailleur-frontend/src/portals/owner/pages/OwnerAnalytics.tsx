import React from 'react'
import Card from '../../../components/ui/Card'

const OwnerAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-gray-900">📊 Analytics Dashboard</h1>
        <p className="text-body-large text-gray-600 mt-1">Comprehensive property performance analytics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">Occupancy Trends</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Occupancy Rate Chart</p>
          </div>
        </Card>

        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">Revenue Analysis</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue Breakdown Chart</p>
          </div>
        </Card>

        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">Payment Patterns</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Payment Timeline Chart</p>
          </div>
        </Card>

        <Card>
          <h2 className="text-h3 text-gray-900 mb-4">Tenant Retention</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Retention Rate Chart</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default OwnerAnalytics
