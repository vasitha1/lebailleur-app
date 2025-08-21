import React from 'react';
import { ExternalLink, CheckCircle, Clock, MessageSquare, Users, BarChart3, Download, CreditCard } from 'lucide-react';
import happyLandlordImage from '../assets/black-landlord.jpeg';

const HomePage = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Tenant Management',
      description: 'Register and manage all your tenants from one dashboard. Track payments, contact details, and lease information effortlessly.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Payment Insights',
      description: 'Get real-time insights on total debts, payment trends, and financial analytics. Make informed decisions about your property portfolio.'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'WhatsApp Automation',
      description: 'Automated payment reminders and notifications sent directly via WhatsApp. Stay connected with tenants seamlessly.'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Mobile Money Integration',
      description: 'Accept payments through mobile money platforms. Secure, fast, and convenient for both landlords and tenants.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Smart Reminders',
      description: 'Never miss payment due dates. Automatic WhatsApp reminders for both landlords and tenants before due dates.'
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Data Export',
      description: 'Download CSV reports of tenant lists, payment histories, and financial summaries for your records and analysis.'
    }
  ];

  const managementTypes = [
    { name: 'Rent', color: 'bg-blue-500' },
    { name: 'Electricity', color: 'bg-yellow-500' },
    { name: 'Water', color: 'bg-cyan-500' },
    { name: 'Maintenance', color: 'bg-green-500' },
    { name: 'Security', color: 'bg-purple-500' },
    { name: 'Custom', color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                🎉 FREE for up to 10 tenants
              </div>
              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                Smart Property Management
                <span className="block text-blue-600">for Modern Landlords</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Manage tenants, track payments, automate whatsapp message reminders, and oversee your properties with ease.
              </p>
            </div>

            {/* Pricing Display */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">FREEMIUM PLAN</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">0 XAF</div>
                <p className="text-gray-600 mb-4">for up to 10 tenants + 10 WhatsApp messages/month</p>

              </div>
            </div>

            {/* Payment Types */}
            <div className="space-y-4">
              <p className="text-sm text-gray-500 uppercase tracking-wide">Manage Multiple Payment Types:</p>
              <div className="flex flex-wrap gap-2">
                {managementTypes.map((type, index) => (
                  <span
                    key={index}
                    className={`${type.color} text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500">* Fully customizable by landlord</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
                onClick={() => window.location.href = '/register'}
              >
                Start Free - No Credit Card Required
              </button>

              <a
                href="https://wa.me/+15556311809"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Get Started on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Circular Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full opacity-20"></div>

              {/* Main Dashboard Mockup */}
              <div className="absolute inset-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex flex-col justify-center items-center text-white shadow-2xl transform hover:scale-105 transition-transform duration-500 p-0">
                <img
                  src={happyLandlordImage}
                  alt="Landlord Picture"
                  className="absolute inset-8 rounded-3xl object-cover h-full w-full shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <CreditCard className="w-8 h-8 text-white" />
              </div>

              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>

              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>

              <div className="absolute top-1/4 -right-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-ping">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Manage Properties</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From tenant registration to payment tracking, get complete control over your property portfolio
            with our comprehensive management suite.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-blue-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Portal Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-16 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Built for Both Landlords & Tenants</h2>
            <p className="text-xl opacity-90">Separate portals designed for different user needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Landlord Portal */}
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Landlord Portal</h3>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Register & manage tenants</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Track payment status & debts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Customize payment categories</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Financial insights & reports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>CSV export & bulk operations</span>
                </li>
              </ul>
            </div>

            {/* Tenant Portal */}
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Tenant Portal</h3>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>View payment history & dues</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Mobile money payments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>WhatsApp notifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Payment confirmations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Lease information access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Property Management?</h2>
          <p className="text-xl mb-8 opacity-90">Join landlords who are already saving time and increasing collections</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
              Start Free Trial - Up to 10 Tenants
            </button>
            <a
              href="https://wa.me/+15556311809"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;