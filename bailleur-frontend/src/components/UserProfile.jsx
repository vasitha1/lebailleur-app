// src/components/UserProfile.jsx
// Demonstration component showing how to use the useApi hook

import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import useApi from '../lib/useApi';
import { authAPI } from '../lib/api';
import Card from './ui/Card';

const UserProfile = () => {
  // Using the useApi hook to fetch user profile data
  const { data: user, loading, error, refetch } = useApi(
    () => authAPI.getProfile(),
    [] // Empty dependencies array means it will only fetch once on mount
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="animate-pulse bg-gray-200 rounded-full w-16 h-16"></div>
          <div className="flex-1 space-y-2">
            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center py-4">
          <p className="text-red-500">Error loading profile: {error}</p>
          <button 
            onClick={refetch}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User Name'}</h2>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">{user?.email || 'user@example.com'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{user?.whatsappNumber || '+237 XXX XXX XXX'}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;