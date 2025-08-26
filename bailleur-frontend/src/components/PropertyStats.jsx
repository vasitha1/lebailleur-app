// src/components/PropertyStats.jsx
// Example component showing how to integrate with a new backend endpoint

import React from 'react';
import { propertiesAPI } from '../lib/api';
import useApi from '../lib/useApi';
import StatCard from './ui/StatCard';
import { Home, Users, DollarSign, TrendingUp } from 'lucide-react';

const PropertyStats = () => {
  // Fetch property statistics using the API service
  const { data: stats, loading, error } = useApi(
    () => propertiesAPI.getStats(),
    []
  );

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <StatCard key={index} loading />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">Error loading statistics: {error}</p>
      </div>
    );
  }

  // Statistics data
  const statsData = [
    {
      title: 'Total Properties',
      value: stats?.totalProperties || 0,
      icon: Home,
      color: 'blue',
      trend: { value: '+12%', isPositive: true }
    },
    {
      title: 'Total Units',
      value: stats?.totalUnits || 0,
      icon: Users,
      color: 'green',
      trend: { value: '+8%', isPositive: true }
    },
    {
      title: 'Occupied Units',
      value: `${stats?.occupiedUnits || 0}/${stats?.totalUnits || 0}`,
      icon: TrendingUp,
      color: 'purple',
      trend: { value: `${stats?.occupancyRate || 0}%`, isPositive: true }
    },
    {
      title: 'Avg. Rent per Unit',
      value: stats?.averageRent ? `XAF ${stats.averageRent.toLocaleString()}` : 'XAF 0',
      icon: DollarSign,
      color: 'yellow',
      trend: { value: '+5%', isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default PropertyStats;