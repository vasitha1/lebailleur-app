import React from 'react';
import { ExternalLink } from 'lucide-react';

const OnboardingPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Getting Started with Le Bailleur</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Follow these simple steps to set up your property management system
        </p>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Us on WhatsApp</h3>
              <p className="text-gray-600 mb-4">Start by messaging us on WhatsApp to begin your onboarding process.</p>
              <a
                href="https://wa.me/+15556311809"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Message Us</span>
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Property Setup</h3>
              <p className="text-gray-600">We'll help you add your properties and configure your management preferences.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Tenant Integration</h3>
              <p className="text-gray-600">Add your tenants and set up automated communication workflows.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Go Live!</h3>
              <p className="text-gray-600">Start managing your properties with automated rent reminders and seamless communication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;