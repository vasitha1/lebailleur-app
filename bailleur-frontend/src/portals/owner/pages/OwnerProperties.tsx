import React from 'react'
import { Plus, MapPin, Users, DollarSign } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { formatCurrency } from '../../../lib/utils'

const OwnerProperties: React.FC = () => {
  const properties = [
    {
      id: 1,
      name: 'Sunshine Apartments',
      address: '123 Main Street, Douala',
      totalUnits: 50,
      occupiedUnits: 45,
      monthlyRevenue: 2250000,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Garden View Complex',
      address: '456 Garden Road, Yaoundé',
      totalUnits: 30,
      occupiedUnits: 28,
      monthlyRevenue: 1400000,
      status: 'Active'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-gray-900">🏠 Properties</h1>
          <p className="text-body-large text-gray-600 mt-1">Manage your property portfolio</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card key={property.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-h3 text-gray-900">{property.name}</h3>
                <p className="text-body-medium text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.address}
                </p>
              </div>
              <Badge variant="success">{property.status}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="bg-blue-50 p-3 rounded-lg mb-2">
                  <Users className="w-6 h-6 text-blue-primary mx-auto" />
                </div>
                <p className="text-body-small text-gray-500">Occupancy</p>
                <p className="font-semibold">{property.occupiedUnits}/{property.totalUnits}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-50 p-3 rounded-lg mb-2">
                  <DollarSign className="w-6 h-6 text-green-success mx-auto" />
                </div>
                <p className="text-body-small text-gray-500">Monthly Revenue</p>
                <p className="font-semibold">{formatCurrency(property.monthlyRevenue)}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-50 p-3 rounded-lg mb-2">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-body-small text-gray-500">Occupancy Rate</p>
                <p className="font-semibold">{Math.round((property.occupiedUnits / property.totalUnits) * 100)}%</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">View Details</Button>
              <Button size="sm" variant="secondary">Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default OwnerProperties
