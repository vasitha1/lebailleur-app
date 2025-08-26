// src/landing-page/pages/RealTimeDemo.jsx
// Demo page showing how to use the RealTimeNotifications component

import React from 'react';
import RealTimeNotifications from '../../components/RealTimeNotifications';
import Card from '../../components/ui/Card';

const RealTimeDemo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Real-Time Notifications Demo</h1>
        <p className="text-gray-600 mt-1">Example of using the RealTimeNotifications component</p>
      </div>

      <RealTimeNotifications />

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Implementation Guide</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            This page demonstrates how to implement real-time notifications in the LeBailleur application:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">WebSocket Integration:</h3>
            <p>
              In a real implementation, you would integrate with your backend WebSocket service like this:
            </p>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`useEffect(() => {
  // Connect to WebSocket server
  const ws = new WebSocket('ws://localhost:3001/notifications');
  
  ws.onopen = () => {
    console.log('Connected to notification service');
    setConnectionStatus('connected');
  };
  
  ws.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    setNotifications(prev => [notification, ...prev]);
  };
  
  ws.onclose = () => {
    console.log('Disconnected from notification service');
    setConnectionStatus('disconnected');
    
    // Attempt to reconnect after 5 seconds
    setTimeout(initializeWebSocket, 5000);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    setConnectionStatus('error');
  };
  
  setWs(ws);
  
  // Cleanup function
  return () => {
    if (ws) {
      ws.close();
    }
  };
}, []);`}
            </pre>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Backend Implementation:</h3>
            <p>
              On the backend, you would need to implement a WebSocket server that can:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Handle client connections and authentication</li>
              <li>Broadcast notifications to relevant users</li>
              <li>Maintain connection state and handle reconnections</li>
              <li>Store notification history for retrieval</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Security Considerations:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Authenticate WebSocket connections with JWT tokens</li>
              <li>Authorize users to receive only relevant notifications</li>
              <li>Encrypt WebSocket connections with WSS in production</li>
              <li>Implement rate limiting to prevent abuse</li>
              <li>Validate and sanitize all incoming messages</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">User Experience Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Visual connection status indicator</li>
              <li>Notification history with timestamps</li>
              <li>Clear all notifications button</li>
              <li>Different notification types with appropriate styling</li>
              <li>Automatic scrolling to new notifications</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RealTimeDemo;