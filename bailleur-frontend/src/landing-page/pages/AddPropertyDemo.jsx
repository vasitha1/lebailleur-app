// src/landing-page/pages/AddPropertyDemo.jsx
// Demo page showing how to use the AddPropertyForm component

import React, { useState } from 'react';
import AddPropertyForm from '../../components/AddPropertyForm';
import Card from '../../components/ui/Card';

const AddPropertyDemo = () => {
  const [properties, setProperties] = useState([]);

  const handlePropertyAdded = (newProperty) => {
    // Add the new property to our local list
    setProperties([...properties, newProperty]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Property Form Demo</h1>
        <p className="text-gray-600 mt-1">Example of using the AddPropertyForm component with API integration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AddPropertyForm onPropertyAdded={handlePropertyAdded} />
        
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Added Properties</h2>
          
          {properties.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No properties added yet</p>
              <p className="text-sm mt-2">Fill out the form to add a property</p>
            </div>
          ) : (
            <div className="space-y-3">
              {properties.map((property) => (
                <div key={property.id} className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="text-sm text-gray-600">
                    {property.type} • {property.numberOfUnits} units
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">How This Works</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            This page demonstrates how to handle form submissions with the API service:
          </p>
          
          <ol className="list-decimal list-inside space-y-2">
            <li>
              The <code className="bg-gray-100 px-1 rounded">AddPropertyForm</code> component 
              collects user input and validates it
            </li>
            <li>
              On form submission, it calls <code className="bg-gray-100 px-1 rounded">
              propertiesAPI.create()</code> to send data to the backend
            </li>
            <li>
              The API service handles authentication tokens and error responses automatically
            </li>
            <li>
              On success, the component notifies the parent through the 
              <code className="bg-gray-100 px-1 rounded">onPropertyAdded</code> callback
            </li>
            <li>
              The parent component updates its state with the new property
            </li>
          </ol>
          
          <p>
            Key features of this implementation:
          </p>
          
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Loading states</strong>: The submit button is disabled and shows 
              "Creating Property..." while the request is in progress
            </li>
            <li>
              <strong>Error handling</strong>: Errors are displayed in a user-friendly message
            </li>
            <li>
              <strong>Success feedback</strong>: Success messages confirm when properties are created
            </li>
            <li>
              <strong>Form reset</strong>: The form is cleared after successful submission
            </li>
            <li>
              <strong>Validation</strong>: Basic client-side validation prevents empty submissions
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AddPropertyDemo;