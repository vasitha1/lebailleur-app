import React, { useState } from 'react';
import { Home, User, Info, ExternalLink, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navigation = ({ currentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'HOME', icon: <Home className="w-4 h-4" /> },
    { path: '/onboarding', label: 'ONBOARDING', icon: <User className="w-4 h-4" /> },
    { path: '/about', label: 'ABOUT', icon: <Info className="w-4 h-4" /> }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="#/" className="flex items-center space-x-3">
            <div className="w-[520px] h-[20px] rounded-lg flex items-center justify-center">
              <img
                src={logo}
                alt="Le Bailleur Logo"
                className="w-[120px] h-[120px] object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <a
                key={item.path}
                href={`#${item.path}`}
                className={`text-sm font-medium tracking-wide transition-all duration-300 ${currentPath === item.path
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {item.label}
              </a>
            ))}

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-600">3</span>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-4 pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map(item => (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 py-2 transition-all duration-300 ${currentPath === item.path
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium tracking-wide">{item.label}</span>
                </a>
              ))}
              <a
                href="https://wa.me/+15556311809"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 mt-4"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">Get Started</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;