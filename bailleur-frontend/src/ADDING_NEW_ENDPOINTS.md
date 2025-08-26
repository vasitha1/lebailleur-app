# Adding New API Endpoints

This guide explains how to add new API endpoints to the LeBailleur frontend application.

## Step 1: Add the Endpoint to the API Service

1. Open `src/lib/api.js`
2. Find the appropriate section for your endpoint (or create a new one)
3. Add your new endpoint function following the existing pattern:

```javascript
// Example for a new "analytics" endpoint
export const analyticsAPI = {
  getPropertyPerformance: (propertyId) => {
    return apiHelper.get(`analytics/property/${propertyId}`);
  },
  
  getTenantSatisfaction: (tenantId) => {
    return apiHelper.get(`analytics/tenant/${tenantId}/satisfaction`);
  }
};
```

## Step 2: Use the Endpoint in a Component

You can use the new endpoint in two ways:

### Option 1: Using the useApi Hook (Recommended for data fetching)

```javascript
import { analyticsAPI } from '../lib/api';
import useApi from '../lib/useApi';

const PropertyPerformance = ({ propertyId }) => {
  const { data, loading, error } = useApi(
    () => analyticsAPI.getPropertyPerformance(propertyId),
    [propertyId]
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>Performance: {data.performanceScore}</div>;
};
```

### Option 2: Direct API Call (For form submissions or one-time calls)

```javascript
import { analyticsAPI } from '../lib/api';

const handlePerformanceRequest = async (propertyId) => {
  try {
    const result = await analyticsAPI.getPropertyPerformance(propertyId);
    console.log('Performance data:', result);
  } catch (error) {
    console.error('Error fetching performance:', error);
  }
};
```

## Step 3: Add Error Handling

Always handle potential errors in your components:

```javascript
const { data, loading, error } = useApi(
  () => analyticsAPI.getPropertyPerformance(propertyId),
  [propertyId]
);

// In your JSX:
if (error) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-700">Error loading data: {error}</p>
      <button 
        onClick={() => refetch()}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
}
```

## Step 4: Add Loading States

Provide visual feedback when data is loading:

```javascript
const { data, loading, error } = useApi(
  () => analyticsAPI.getPropertyPerformance(propertyId),
  [propertyId]
);

// In your JSX:
if (loading) {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

## Example: Complete Implementation

Here's a complete example of adding a new endpoint for property analytics:

### 1. Add to `src/lib/api.js`:

```javascript
// Add to the existing file
export const analyticsAPI = {
  getPropertyPerformance: (propertyId) => {
    return apiHelper.get(`analytics/property/${propertyId}`);
  },
  
  getTenantSatisfaction: (tenantId) => {
    return apiHelper.get(`analytics/tenant/${tenantId}/satisfaction`);
  }
};
```

### 2. Create a component to use the endpoint:

```javascript
// src/components/PropertyPerformance.jsx
import React from 'react';
import { analyticsAPI } from '../lib/api';
import useApi from '../lib/useApi';
import Card from './ui/Card';

const PropertyPerformance = ({ propertyId }) => {
  const { data, loading, error } = useApi(
    () => analyticsAPI.getPropertyPerformance(propertyId),
    [propertyId]
  );
  
  if (loading) return <div>Loading performance data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  
  return (
    <Card>
      <h3>Property Performance</h3>
      <p>Occupancy Rate: {data.occupancyRate}%</p>
      <p>Average Rent: XAF {data.averageRent}</p>
      <p>Satisfaction Score: {data.satisfactionScore}/10</p>
    </Card>
  );
};

export default PropertyPerformance;
```

### 3. Use the component in a page:

```javascript
// src/pages/PropertyDetails.jsx
import React from 'react';
import PropertyPerformance from '../components/PropertyPerformance';

const PropertyDetails = () => {
  const propertyId = '123';
  
  return (
    <div>
      <h1>Property Details</h1>
      <PropertyPerformance propertyId={propertyId} />
    </div>
  );
};

export default PropertyDetails;
```

## Best Practices

1. **Consistent Naming**: Use consistent naming for API functions (get, create, update, delete)
2. **Error Handling**: Always handle potential errors in your components
3. **Loading States**: Provide visual feedback when data is loading
4. **Documentation**: Comment your API functions with JSDoc
5. **Type Safety**: Use TypeScript interfaces for API responses when possible

## Testing New Endpoints

To test your new endpoints:

1. Start the development server: `npm run dev`
2. Use browser dev tools to monitor network requests
3. Check the console for any errors
4. Verify that authentication tokens are being sent correctly
5. Test error cases (invalid IDs, server errors, etc.)

If you encounter issues, check:
- The backend API is running and accessible
- The endpoint URL is correct
- Authentication tokens are being sent (check request headers)
- CORS configuration if making cross-origin requests