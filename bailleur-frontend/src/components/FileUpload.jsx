// src/components/FileUpload.jsx
// Example component showing how to handle file uploads with the API service

import React, { useState } from 'react';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    // Check file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setUploading(true);
    setError('');
    setUploadResult(null);

    try {
      // Create FormData object for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', 'Property document upload');

      // In a real app, you would have an API endpoint for file uploads
      // For this example, we'll simulate the upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful upload response
      const response = {
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString()
      };

      setUploadResult(response);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload file: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadResult(null);
    setError('');
  };

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-4">File Upload Demo</h2>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your file here, or click to select</p>
          <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
          
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          
          <label 
            htmlFor="file-upload"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Select File
          </label>
        </div>
        
        {file && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <File className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button 
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
        
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
        
        {uploadResult && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-green-700 font-medium">File uploaded successfully!</p>
              <p className="text-green-600 text-sm">
                ID: {uploadResult.id} • {new Date(uploadResult.uploadedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleUpload}
          disabled={uploading || !file}
          className="w-full"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </Button>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">How File Uploads Work</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            This component demonstrates how to handle file uploads in the LeBailleur application:
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Users select a file using the file input</li>
            <li>File validation checks size and type</li>
            <li>File is uploaded to the backend using FormData</li>
            <li>Success or error feedback is provided to the user</li>
          </ol>
          <p className="mt-3">
            In a real implementation, you would replace the simulated upload with an actual 
            API call to your backend endpoint.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;