// src/lib/useApi.js
// Custom hook for handling API calls with loading, error, and data states

import { useState, useEffect } from 'react';

// Generic API call function
const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'An error occurred while refetching data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useApi;