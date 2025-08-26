// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './landing-page/components/Navigation';
import Footer from './landing-page/components/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import PasswordRecovery from './auth/PasswordRecovery';
import OwnerPortal from './portals/owner/OwnerPortal';
import ManagerPortal from './portals/manager/ManagerPortal';
import TenantPortal from './portals/tenant/TenantPortal';
import landingRoutes from './landing-page/landingRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {landingRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  <Navigation />
                  <main className="flex-grow">
                    {route.element}
                  </main>
                  <Footer />
                </>
              }
            />
          ))}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/password-recovery" element={<PasswordRecovery />} />
          <Route path="/owner/*" element={<OwnerPortal />} />
          <Route path="/manager/*" element={<ManagerPortal />} />
          <Route path="/tenant/*" element={<TenantPortal />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                <a
                  href="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;