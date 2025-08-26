// src/landing-page/pages/PropertyStatsDemo.jsx
// Demo page showing property statistics component

import React from 'react';
import PropertyStats from '../../components/PropertyStats';
import Card from '../../components/ui/Card';

const PropertyStatsDemo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Property Statistics Demo</h1>
        <p className="text-gray-600 mt-1">Example of using the PropertyStats component with API integration</p>
      </div>

      <PropertyStats />

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">How This Works</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            This page demonstrates how to integrate frontend components with backend API endpoints using our 
            standardized approach:
          </p>
          
          <ol className="list-decimal list-inside space-y-2">
            <li>
              The <code className="bg-gray-100 px-1 rounded">PropertyStats</code> component uses the 
              <code className="bg-gray-100 px-1 rounded">propertiesAPI.getStats()</code> function to fetch data
            </li>
            <li>
              It utilizes the <code className="bg-gray-100 px-1 rounded">useApi</code> hook for automatic 
              state management (loading, error, data)
            </li>
            <li>
              The API service handles authentication tokens and error responses automatically
            </li>
            <li>
              The component gracefully handles loading and error states with appropriate UI
            </li>
          </ol>
          
          <p>
            To add a new statistic or modify this component, you would:
          </p>
          
          <ul className="list-disc list-inside space-y-2">
            <li>
              Add or modify endpoints in <code className="bg-gray-100 px-1 rounded">src/lib/api.js</code>
            </li>
            <li>
              Update the component to display new statistics
            </li>
            <li>
              The <code className="bg-gray-100 px-1 rounded">useApi</code> hook will automatically 
              handle the data fetching lifecycle
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PropertyStatsDemo;