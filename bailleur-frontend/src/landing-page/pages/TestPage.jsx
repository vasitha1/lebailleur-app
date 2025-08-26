// src/landing-page/pages/TestPage.jsx
// Example page demonstrating API integration

import React, { useState } from 'react';
import { Users, Home, CreditCard, RefreshCw } from 'lucide-react';
import { propertiesAPI, tenantsAPI, paymentsAPI } from '../../lib/api';
import useApi from '../../lib/useApi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import { formatCurrency } from '../../lib/utils';

const TestPage = () => {
  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    type: 'Apartments',
    numberOfUnits: ''
  });
  const [propertyMessage, setPropertyMessage] = useState('');

  // Using the useApi hook to fetch data
  const { data: properties, loading: propertiesLoading, error: propertiesError, refetch: refetchProperties } = useApi(
    () => propertiesAPI.getAll(),
    []
  );

  const { data: tenants, loading: tenantsLoading, error: tenantsError } = useApi(
    () => tenantsAPI.getAll(),
    []
  );

  const { data: payments, loading: paymentsLoading, error: paymentsError } = useApi(
    () => paymentsAPI.getAll(),
    []
  );

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    try {
      await propertiesAPI.create({
        name: newProperty.name,
        location: newProperty.location,
        type: newProperty.type,
        numberOfUnits: parseInt(newProperty.numberOfUnits)
      });
      setPropertyMessage('Property created successfully!');
      setNewProperty({ name: '', location: '', type: 'Apartments', numberOfUnits: '' });
      refetchProperties(); // Refresh the properties list
    } catch (err) {
      console.error('Error creating property:', err);
      setPropertyMessage('Error creating property: ' + (err.message || 'Unknown error'));
    }
  };

  const stats = [
    {
      title: 'Total Properties',
      value: properties ? properties.length : 0,
      icon: Home,
      color: 'blue',
      loading: propertiesLoading,
      error: propertiesError
    },
    {
      title: 'Total Tenants',
      value: tenants ? tenants.length : 0,
      icon: Users,
      color: 'green',
      loading: tenantsLoading,
      error: tenantsError
    },
    {
      title: 'Total Payments',
      value: payments ? payments.length : 0,
      icon: CreditCard,
      color: 'purple',
      loading: paymentsLoading,
      error: paymentsError
    },
    {
      title: 'Total Revenue',
      value: payments && payments.length > 0 
        ? formatCurrency(payments.reduce((sum, p) => sum + (p.amount || 0), 0))
        : formatCurrency(0),
      icon: CreditCard,
      color: 'yellow',
      loading: paymentsLoading,
      error: paymentsError
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">API Integration Demo</h1>
        <p className="text-gray-600 mt-1">Demonstrating how to use the API service and useApi hook</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.loading ? 'Loading...' : stat.error ? 'Error' : stat.value}
            icon={stat.icon}
            color={stat.color}
            loading={stat.loading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Property Form */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create Property</h2>
          {propertyMessage && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">
              {propertyMessage}
            </div>
          )}
          <form onSubmit={handlePropertySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
              <input
                type="text"
                value={newProperty.name}
                onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sunshine Apartments"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={newProperty.location}
                onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Douala, Cameroon"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                value={newProperty.type}
                onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Rooms">Rooms</option>
                <option value="Apartments">Apartments</option>
                <option value="Shops">Shops</option>
                <option value="Offices">Offices</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Units</label>
              <input
                type="number"
                value={newProperty.numberOfUnits}
                onChange={(e) => setNewProperty({...newProperty, numberOfUnits: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10"
                required
              />
            </div>
            <Button type="submit">Create Property</Button>
          </form>
        </Card>

        {/* Properties List */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Properties</h2>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={refetchProperties}
              disabled={propertiesLoading}
            >
              <RefreshCw className={`w-4 h-4 ${propertiesLoading ? 'animate-spin' : ''}`} />
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
          {propertiesLoading ? (
            <div className="text-center py-4">Loading properties...</div>
          ) : propertiesError ? (
            <div className="text-center py-4 text-red-500">Error: {propertiesError}</div>
          ) : (
            <div className="space-y-3">
              {properties && properties.length > 0 ? (
                properties.map((property) => (
                  <div key={property.id} className="p-3 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{property.name}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="text-sm text-gray-600">{property.type} • {property.numberOfUnits} units</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No properties found</div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TestPage;