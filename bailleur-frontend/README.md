# LeBailleur Frontend - API Integration Guide

This document explains how to use the API service and related utilities in the LeBailleur frontend application.

## API Service (`src/lib/api.js`)

The API service is a centralized module that handles all HTTP requests to the backend. It provides a clean, consistent interface for interacting with the backend API.

### Features

- **Centralized API calls**: All API endpoints are defined in one place
- **Authentication handling**: Automatically includes auth tokens in requests
- **Error handling**: Consistent error handling across all API calls
- **Type safety**: Well-defined function signatures for all endpoints

### Usage Examples

```javascript
import { authAPI, propertiesAPI, tenantsAPI, paymentsAPI } from '../lib/api';

// Authentication
const loginResult = await authAPI.login({ whatsappNumber, password });
const registerResult = await authAPI.register(userData);

// Properties
const properties = await propertiesAPI.getAll();
const newProperty = await propertiesAPI.create(propertyData);

// Tenants
const tenants = await tenantsAPI.getAll();
const tenantStats = await tenantsAPI.getStats();

// Payments
const payments = await paymentsAPI.getAll();
const paymentStats = await paymentsAPI.getStats();
```

### Available API Modules

1. **authAPI** - Authentication endpoints
2. **propertiesAPI** - Property management endpoints
3. **tenantsAPI** - Tenant management endpoints
4. **paymentsAPI** - Payment processing endpoints
5. **usersAPI** - User management endpoints

## useApi Hook (`src/lib/useApi.js`)

The `useApi` hook is a custom React hook that simplifies data fetching in functional components. It handles loading states, error states, and data management automatically.

### Features

- **Automatic state management**: Handles loading, error, and data states
- **Automatic cleanup**: Prevents state updates on unmounted components
- **Refetch capability**: Manual refresh of data
- **Dependency tracking**: Re-fetches when dependencies change

### Usage Examples

```javascript
import useApi from '../lib/useApi';
import { propertiesAPI } from '../lib/api';

const MyComponent = () => {
  // Simple data fetching
  const { data, loading, error } = useApi(() => propertiesAPI.getAll(), []);
  
  // With refetch capability
  const { data, loading, error, refetch } = useApi(
    () => propertiesAPI.getAll(), 
    []
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

## Best Practices

### 1. Use the API Service for All Backend Calls

Instead of making direct `fetch` calls, always use the appropriate API service function:

```javascript
// ❌ Don't do this
const response = await fetch('/api/v1/properties', {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` }
});

// ✅ Do this
const properties = await propertiesAPI.getAll();
```

### 2. Handle Loading and Error States

Always provide feedback to users when data is loading or when errors occur:

```javascript
const MyComponent = () => {
  const { data, loading, error } = useApi(() => propertiesAPI.getAll(), []);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <PropertyList properties={data} />;
};
```

### 3. Use the useApi Hook for Data Fetching

For functional components that need to fetch data, use the `useApi` hook:

```javascript
const PropertyDashboard = () => {
  const { data: properties, loading, error, refetch } = useApi(
    () => propertiesAPI.getAll(),
    []
  );
  
  // Component implementation
};
```

### 4. Handle Form Submissions Properly

When submitting forms, handle both success and error cases:

```javascript
const handlePropertySubmit = async (e) => {
  e.preventDefault();
  try {
    await propertiesAPI.create(propertyData);
    setMessage('Property created successfully!');
    refetchProperties(); // Refresh the list
  } catch (err) {
    setMessage('Error: ' + err.message);
  }
};
```

## Adding New API Endpoints

To add a new API endpoint:

1. Add the endpoint function to the appropriate section in `src/lib/api.js`
2. Follow the existing pattern for error handling and response processing
3. Export the function from the module
4. Use the new endpoint in your components with the `useApi` hook or direct calls

Example:
```javascript
// In src/lib/api.js
export const analyticsAPI = {
  getPropertyPerformance: (propertyId) => {
    return fetch(`${API_BASE_URL}/analytics/property/${propertyId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  }
};

// In your component
const { data, loading, error } = useApi(
  () => analyticsAPI.getPropertyPerformance(propertyId),
  [propertyId]
);
```

## Error Handling

The API service automatically handles HTTP errors and converts them to JavaScript errors. Always wrap API calls in try/catch blocks:

```javascript
try {
  const result = await propertiesAPI.create(propertyData);
  // Handle success
} catch (error) {
  // Handle error
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

## Authentication

The API service automatically includes authentication tokens in requests when they are available in localStorage. No additional configuration is needed.

To log out:
```javascript
// Clear auth data from localStorage
localStorage.removeItem('access_token');
localStorage.removeItem('user');
