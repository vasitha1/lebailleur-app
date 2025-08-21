import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Building, MapPin, Home, Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

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

  // Configure API URL - Fixed the try-catch block
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

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
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.whatsappNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid WhatsApp number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Submitting registration:', {
        name: formData.name,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber
      });

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          password: formData.password,
          propertyName: formData.propertyName || null,
          propertyLocation: formData.propertyLocation || null,
          propertyType: formData.propertyType || null,
          role: 'owner' // Default role for public registration
        })
      });

      const responseData = await response.json();
      console.log('Registration response:', responseData);

      if (response.ok && responseData.access_token) {
        // Store token and user data (Note: localStorage won't work in Claude artifacts)
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('access_token', responseData.access_token);
          localStorage.setItem('user', JSON.stringify(responseData.user));
        }

        setSuccess('Account created successfully! Redirecting to dashboard...');

        // Redirect to owner dashboard after successful registration
        setTimeout(() => {
          window.location.href = '/owner';
        }, 2000);
      } else {
        const errorMessage = responseData.message || 'Registration failed';
        if (response.status === 409) {
          setError('An account with this email or WhatsApp number already exists');
        } else if (response.status === 400) {
          setError(errorMessage || 'Invalid data provided. Please check your input.');
        } else if (response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(errorMessage);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Unable to connect to server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
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

            {/* Error/Success Messages */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-green-700 text-sm">{success}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Submit Buttons */}
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
                  onClick={() => window.location.href = '/login'}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-medium underline disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  Sign in here
                </button>
              </p>
            </div> 
            {/*Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Personal Information</h3>

                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Sulem Yong Vasitha Felsimbom"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-5 h-5 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="whatsappNumber"
                    placeholder="+237698827753"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="sulemfelsi@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    placeholder="LeBailleur"
                    value={formData.propertyName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="propertyLocation"
                    placeholder="Mbankolo"
                    value={formData.propertyLocation}
                    onChange={handleChange}
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

              

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => window.location.href = '/login'}
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