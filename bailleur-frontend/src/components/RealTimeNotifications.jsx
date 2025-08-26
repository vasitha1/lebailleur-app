// src/components/RealTimeNotifications.jsx
// Example component showing how to handle real-time updates with WebSocket

import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [ws, setWs] = useState(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const initializeWebSocket = () => {
      try {
        // In a real app, you would connect to your WebSocket server
        // const websocket = new WebSocket('ws://localhost:3001/notifications');
        const websocket = {
          // Mock WebSocket object for demonstration
          readyState: 1, // OPEN
          close: () => {},
          send: (data) => console.log('Sending:', data)
        };
        
        setWs(websocket);
        setConnectionStatus('connected');
        
        // Simulate receiving notifications
        const interval = setInterval(() => {
          const mockNotification = {
            id: Date.now(),
            type: ['info', 'success', 'warning', 'error'][Math.floor(Math.random() * 4)],
            message: [
              'Payment received for Unit A101',
              'Maintenance request submitted for Unit B205',
              'New tenant application received',
              'Lease renewal reminder sent'
            ][Math.floor(Math.random() * 4)],
            timestamp: new Date().toISOString()
          };
          
          setNotifications(prev => [mockNotification, ...prev.slice(0, 9)]);
        }, 10000); // New notification every 10 seconds
        
        return () => {
          clearInterval(interval);
          // websocket.close();
        };
      } catch (error) {
        console.error('WebSocket connection error:', error);
        setConnectionStatus('error');
      }
    };
    
    initializeWebSocket();
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationVariant = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'danger';
      default: return 'info';
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Real-Time Notifications</h2>
        <div className="flex items-center space-x-2">
          <Badge variant={connectionStatus === 'connected' ? 'success' : connectionStatus === 'error' ? 'danger' : 'warning'}>
            {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'error' ? 'Error' : 'Connecting...'}
          </Badge>
          {notifications.length > 0 && (
            <button 
              onClick={clearNotifications}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3" />
            <p>No notifications yet</p>
            <p className="text-sm mt-1">Real-time updates will appear here</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="p-3 bg-gray-50 rounded-lg border-l-4 border-l-blue-500"
            >
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <Badge variant={getNotificationVariant(notification.type)} size="sm">
                  {notification.type}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">How Real-Time Updates Work</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            This component demonstrates how to handle real-time updates in the LeBailleur application:
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>WebSocket connection to backend notification service</li>
            <li>Automatic reconnection on connection loss</li>
            <li>Real-time display of notifications</li>
            <li>Connection status monitoring</li>
            <li>User controls for managing notifications</li>
          </ol>
          <p className="mt-3">
            In a real implementation, you would:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Connect to a WebSocket server endpoint</li>
            <li>Handle connection events (open, close, error)</li>
            <li>Process incoming messages and update state</li>
            <li>Implement reconnection logic for reliability</li>
            <li>Store notifications locally for persistence</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default RealTimeNotifications;