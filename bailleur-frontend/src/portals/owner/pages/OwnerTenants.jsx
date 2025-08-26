import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail, MapPin, CreditCard, AlertCircle, Plus, Search } from 'lucide-react';
import { tenantsAPI } from '../../../lib/api';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const OwnerTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tenants when component mounts
  useEffect(() => {
    fetchTenants();
  }, []);

  // Filter tenants when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTenants(tenants);
    } else {
      const filtered = tenants.filter(tenant => 
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.whatsappNumber.includes(searchTerm)
      );
      setFilteredTenants(filtered);
    }
  }, [searchTerm, tenants]);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const data = await tenantsAPI.getAll();
      setTenants(data);
      setFilteredTenants(data);
    } catch (err) {
      console.error('Error fetching tenants:', err);
      setError('Failed to load tenants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
        <div className="flex space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Tenant</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {filteredTenants.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {searchTerm ? 'No tenants found' : 'No tenants found'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first tenant.'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                  <Badge variant={getStatusBadgeVariant(tenant.status)} className="mt-1">
                    {tenant.status}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tenant.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tenant.whatsappNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tenant.property?.name || 'Unassigned'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {tenant.rentAmount ? `XAF ${tenant.rentAmount.toLocaleString()}` : 'Not set'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <span className="text-sm text-gray-500">
                  Joined {new Date(tenant.createdAt).toLocaleDateString()}
                </span>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerTenants;