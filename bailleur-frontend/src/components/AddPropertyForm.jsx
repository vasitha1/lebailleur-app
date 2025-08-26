// src/components/AddPropertyForm.jsx
// Example component showing how to handle form submissions with the API service

import React, { useState } from 'react';
import { propertiesAPI } from '../lib/api';
import Card from './ui/Card';
import Button from './ui/Button';

const AddPropertyForm = ({ onPropertyAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Apartments',
    numberOfUnits: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.location.trim() || !formData.numberOfUnits) {
      setMessage('Please fill in all required fields');
      setMessageType('error');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setMessageType('');
    
    try {
      // Submit form data to the API
      const newProperty = await propertiesAPI.create({
        name: formData.name.trim(),
        location: formData.location.trim(),
        type: formData.type,
        numberOfUnits: parseInt(formData.numberOfUnits)
      });
      
      setMessage('Property created successfully!');
      setMessageType('success');
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        type: 'Apartments',
        numberOfUnits: ''
      });
      
      // Notify parent component that a property was added
      if (onPropertyAdded) {
        onPropertyAdded(newProperty);
      }
    } catch (error) {
      console.error('Error creating property:', error);
      setMessage('Error creating property: ' + (error.message || 'Unknown error'));
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Property</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          messageType === 'success' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Sunshine Apartments"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Douala, Cameroon"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="Rooms">Rooms</option>
            <option value="Apartments">Apartments</option>
            <option value="Shops">Shops</option>
            <option value="Offices">Offices</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Units *
          </label>
          <input
            type="number"
            name="numberOfUnits"
            value={formData.numberOfUnits}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10"
            min="1"
            required
            disabled={loading}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating Property...' : 'Create Property'}
        </Button>
      </form>
    </Card>
  );
};

export default AddPropertyForm;