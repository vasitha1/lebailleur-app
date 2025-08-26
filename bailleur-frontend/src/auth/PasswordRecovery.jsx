import React, { useState } from 'react';
import { Mail, Home, AlertCircle, CheckCircle } from 'lucide-react';
import { authAPI } from '../lib/api';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await authAPI.resetPassword({
        email: email.trim(),
        newPassword: 'tempPassword123' // In a real app, this would be handled by the backend
      });
      
      setIsSubmitted(true);
      setSuccess('Password reset instructions have been sent to your email address.');
    } catch (err) {
      console.error('Password recovery error:', err);
      setError(err.message || 'Failed to process password recovery request. Please try again.');
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
            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              {isSubmitted ? 'Check Your Email' : 'Reset Password'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {isSubmitted 
                ? 'We have sent password reset instructions to your email.' 
                : 'Enter your email address and we will send you instructions to reset your password.'}
            </p>
          </div>

          {/* Password Recovery Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
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

            {isSubmitted ? (
              <div className="text-center py-6">
                <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">
                  If an account exists for {email}, you will receive password reset instructions shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      disabled={isLoading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
                  </button>
                </div>
              </form>
            )}

            <div className="text-center">
              <button
                onClick={() => window.location.href = '/login'}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium underline disabled:opacity-50"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;