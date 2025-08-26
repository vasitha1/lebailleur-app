import React, { useState } from 'react';
import { Phone, Lock, Home, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authAPI } from '../lib/api';

const Login = () => {
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.whatsappNumber.trim()) {
      setError('WhatsApp number is required');
      return;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await authAPI.login({
        whatsappNumber: formData.whatsappNumber,
        password: formData.password
      });
      
      // Store token and user data
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Redirect based on user role
      switch (result.user.role) {
        case 'owner':
          window.location.href = '/owner';
          break;
        case 'manager':
          window.location.href = '/manager';
          break;
        case 'tenant':
          window.location.href = '/tenant';
          break;
        default:
          window.location.href = '/owner';
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Full screen container without navbar/footer */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          
          {/* Logo Section */}
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Home className="w-12 h-12 text-white" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to your property management account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              {/* WhatsApp Number Input */}
              <div className="relative">
                <Phone className="w-5 h-5 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="tel"
                  name="whatsappNumber"
                  placeholder="WhatsApp Number (+237...)"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all rounded-lg disabled:bg-gray-100"
                />
              </div>

              {/* Password Input with Show/Hide */}
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => window.location.href = '/auth/password-recovery'}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* WhatsApp Login Option */}
            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Phone className="w-5 h-5" />
              <span>Login via WhatsApp</span>
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => window.location.href = '/register'}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-medium underline disabled:opacity-50"
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;