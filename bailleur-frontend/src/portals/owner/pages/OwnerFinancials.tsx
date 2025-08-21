import React from 'react'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import Card from '../../../components/ui/Card'
import StatCard from '../../../components/ui/StatCard'
import { formatCurrency } from '../../../lib/utils'

const OwnerFinancials: React.FC = () => {
  const financialStats = [
    {
      title: 'Total Income',
      value: formatCurrency(2450000),
      icon: DollarSign,
      color: 'green' as const,
      trend: { value: '+15%', isPositive: true }
    },
    {
      title: 'Outstanding',
      value: formatCurrency(180000),
      icon: TrendingDown,
      color: 'red' as const,
      trend: { value: '-5%', isPositive: true }
    },
    {
      title: 'Occupancy Rate',
      value: '90%',
      icon: TrendingUp,
      color: 'blue' as const,
      trend: { value: '+2%', isPositive: true }
    }
  ]

  const monthlyData = [
    { month: 'Nov', expected: 500000, collected: 450000, outstanding: 50000, percentage: 90 },
    { month: 'Oct', expected: 500000, collected: 480000, outstanding: 20000, percentage: 96 },
    { month: 'Sep', expected: 500000, collected: 500000, outstanding: 0, percentage: 100 },
    { month: 'Aug', expected: 500000, collected: 475000, outstanding: 25000, percentage: 95 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-gray-900">📈 Financial Analytics</h1>
          <p className="text-body-large text-gray-600 mt-1">Track your property financial performance</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-primary text-white rounded-button text-sm">This Month</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-button text-sm">This Year</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-button text-sm">Custom</button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financialStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Revenue Breakdown</h2>
        <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <p className="text-gray-500">Interactive Charts: Revenue trends, Payment cycles</p>
        </div>
      </Card>

      {/* Payment Analytics Table */}
      <Card>
        <h2 className="text-h3 text-gray-900 mb-4">Payment Analytics</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Expected</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Collected</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Outstanding</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Collection %</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{data.month}</td>
                  <td className="py-3 px-4">{formatCurrency(data.expected)}</td>
                  <td className="py-3 px-4 text-green-600">{formatCurrency(data.collected)}</td>
                  <td className="py-3 px-4 text-red-600">{formatCurrency(data.outstanding)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-primary h-2 rounded-full" 
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{data.percentage}%</span>
                    </div>
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

export default OwnerFinancials
