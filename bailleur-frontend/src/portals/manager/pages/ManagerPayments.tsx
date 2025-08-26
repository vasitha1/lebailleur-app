import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, Filter, AlertCircle, CreditCard } from 'lucide-react';
import { paymentsAPI } from '../../../lib/api';
import { formatCurrency } from '../../../lib/utils';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import StatCard from '../../../components/ui/StatCard';

interface Payment {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  tenant?: {
    name: string;
    whatsappNumber: string;
  };
  property?: {
    name: string;
  };
}

const ManagerPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  // Fetch payments when component mounts
  useEffect(() => {
    fetchPayments();
  }, []);

  // Filter payments when filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter(payment => payment.status === filter);
      setFilteredPayments(filtered);
    }
  }, [filter, payments]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentsAPI.getAll();
      setPayments(data);
      setFilteredPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to load payments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'default';
    }
  };

  const statsData = [
    {
      title: 'Total Collected',
      value: formatCurrency(payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)),
      icon: DollarSign,
      color: 'green' as const,
      trend: { value: '+12%', isPositive: true }
    },
    {
      title: 'Pending Payments',
      value: formatCurrency(payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)),
      icon: Calendar,
      color: 'yellow' as const,
      trend: { value: '5', isPositive: false }
    },
    {
      title: 'Overdue Payments',
      value: formatCurrency(payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)),
      icon: AlertCircle,
      color: 'red' as const,
      trend: { value: '2', isPositive: false }
    },
    {
      title: 'This Month',
      value: formatCurrency(payments.filter(p => {
        const paymentDate = new Date(p.dueDate);
        const now = new Date();
        return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
      }).reduce((sum, p) => sum + p.amount, 0)),
      icon: TrendingUp,
      color: 'blue' as const,
      trend: { value: '+8%', isPositive: true }
    }
  ];

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
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Tenant</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Property</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>No payments found</p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{payment.tenant?.name || 'Unknown Tenant'}</p>
                        <p className="text-sm text-gray-500">{payment.tenant?.whatsappNumber || ''}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-900">{payment.property?.name || 'Unknown Property'}</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusBadgeVariant(payment.status)}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ManagerPayments;