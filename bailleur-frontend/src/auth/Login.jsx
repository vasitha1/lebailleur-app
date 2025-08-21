import React, { useState } from 'react';
import { Phone, Lock, Home, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkIsFirstLoginAfterRegister = () => {
    // Implement your logic here
    return false; // placeholder
  };

  const getInvitationTokenFromStorage = () => {
    // Implement your logic here
    return null; // placeholder
  };

  const getRoleFromInvitationToken = (token) => {
    // Implement your logic here
    return 'manager'; // placeholder
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    
    const isFirstLoginAfterRegister = checkIsFirstLoginAfterRegister();
    const invitationToken = getInvitationTokenFromStorage();

    if (isFirstLoginAfterRegister) {
      window.location.href = '/owner';
    } else if (invitationToken) {
      const role = getRoleFromInvitationToken(invitationToken);
      if (role === 'manager') {
        window.location.href = '/manager';
      } else if (role === 'tenant') {
        window.location.href = '/tenant';
      }
    } else {
      window.location.href = '/owner';
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all rounded-lg"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-[1.02]"
            >
              Sign In
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
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
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
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
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