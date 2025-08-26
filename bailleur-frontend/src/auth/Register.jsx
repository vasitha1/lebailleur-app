import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Building, MapPin, Home, Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../lib/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: '',
    email: '',
    password: '',
    propertyName: '',
    propertyLocation: '',
    propertyType: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!formData.whatsappNumber.trim()) {
      setError('WhatsApp number is required');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // WhatsApp number validation (basic format check)
    const phoneRegex = /^\+?[1-9]\d{8,14}$/;
    if (!phoneRegex.test(formData.whatsappNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid WhatsApp number');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authAPI.register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsappNumber: formData.whatsappNumber.replace(/\s/g, ''),
        password: formData.password,
        propertyName: formData.propertyName.trim() || null,
        propertyLocation: formData.propertyLocation.trim() || null,
        propertyType: formData.propertyType || null,
        role: 'owner' // Default role for public registration
      });

      setSuccess('Account created successfully! Welcome to LeBailleur!');

      // Store token and user data
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('user', JSON.stringify(result.user));

      // Redirect to owner dashboard
      setTimeout(() => {
        window.location.href = '/owner';
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  // Handle Enter key press on form fields
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">

          {/* Logo Section */}
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Home className="w-12 h-12 text-white" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-sm text-gray-600">Start managing your properties today</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="space-y-6">

              {/* Error/Success Messages */}
              {error && (
                <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-green-700 text-sm">{success}</span>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Personal Information</h3>

                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-5 h-5 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="whatsappNumber"
                    placeholder="WhatsApp Number (e.g. +237698827753)"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password (min. 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    minLength="6"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Property Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Property Information (Optional)</h3>

                <div className="relative">
                  <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="propertyName"
                    placeholder="Property Name"
                    value={formData.propertyName}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="propertyLocation"
                    placeholder="Property Location"
                    value={formData.propertyLocation}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <Home className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select property type</option>
                    <option value="Rooms">Rooms</option>
                    <option value="Apartments">Apartments</option>
                    <option value="Shops">Shops</option>
                    <option value="Offices">Offices</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-medium underline disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;