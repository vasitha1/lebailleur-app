// src/landing-page/pages/FileUploadDemo.jsx
// Demo page showing how to use the FileUpload component

import React from 'react';
import FileUpload from '../../components/FileUpload';
import Card from '../../components/ui/Card';

const FileUploadDemo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">File Upload Demo</h1>
        <p className="text-gray-600 mt-1">Example of using the FileUpload component</p>
      </div>

      <FileUpload />

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Implementation Details</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            This page demonstrates how to handle file uploads in the LeBailleur application:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>File selection with validation (size and type)</li>
              <li>Visual feedback during upload process</li>
              <li>Success and error handling</li>
              <li>File removal capability</li>
              <li>Responsive design for all device sizes</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Backend Integration:</h3>
            <p>
              In a real implementation, you would integrate with your backend API like this:
            </p>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/v1/upload', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${authToken}\`
    },
    body: formData
  });
  
  return response.json();
};`}
            </pre>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Security Considerations:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Validate file types on both frontend and backend</li>
              <li>Limit file sizes to prevent abuse</li>
              <li>Scan uploaded files for malware</li>
              <li>Store files securely with proper access controls</li>
              <li>Use signed URLs for direct uploads to cloud storage</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FileUploadDemo;