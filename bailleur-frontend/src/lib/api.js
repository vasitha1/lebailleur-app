// src/lib/api.js
// Centralized API service for handling all HTTP requests to the backend

const API_BASE_URL = '/api/v1';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Auth API endpoints
export const authAPI = {
  register: (data) => {
    return fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  login: (data) => {
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  changePassword: (data) => {
    return fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  resetPassword: (data) => {
    return fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  getProfile: () => {
    return fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  switchRole: (role) => {
    return fetch(`${API_BASE_URL}/auth/switch-role`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    }).then(handleResponse);
  }
};

// Properties API endpoints
export const propertiesAPI = {
  create: (data) => {
    return fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  getAll: () => {
    return fetch(`${API_BASE_URL}/properties`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getStats: () => {
    return fetch(`${API_BASE_URL}/properties/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getById: (id) => {
    return fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  update: (id, data) => {
    return fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  delete: (id) => {
    return fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  createUnit: (propertyId, data) => {
    return fetch(`${API_BASE_URL}/properties/${propertyId}/units`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  getUnits: (propertyId) => {
    return fetch(`${API_BASE_URL}/properties/${propertyId}/units`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getVacantUnits: (propertyId) => {
    return fetch(`${API_BASE_URL}/properties/${propertyId}/units/vacant`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  }
};

// Tenants API endpoints
export const tenantsAPI = {
  create: (data) => {
    return fetch(`${API_BASE_URL}/tenants`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  getAll: () => {
    return fetch(`${API_BASE_URL}/tenants`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getStats: () => {
    return fetch(`${API_BASE_URL}/tenants/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getByStatus: (status) => {
    return fetch(`${API_BASE_URL}/tenants/by-status?status=${status}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getById: (id) => {
    return fetch(`${API_BASE_URL}/tenants/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  update: (id, data) => {
    return fetch(`${API_BASE_URL}/tenants/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  delete: (id) => {
    return fetch(`${API_BASE_URL}/tenants/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  }
};

// Payments API endpoints
export const paymentsAPI = {
  create: (data) => {
    return fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  getAll: () => {
    return fetch(`${API_BASE_URL}/payments`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getStats: () => {
    return fetch(`${API_BASE_URL}/payments/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getByStatus: (status) => {
    return fetch(`${API_BASE_URL}/payments/by-status?status=${status}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getByDateRange: (startDate, endDate) => {
    return fetch(`${API_BASE_URL}/payments/by-date-range?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  generateMonthly: () => {
    return fetch(`${API_BASE_URL}/payments/generate-monthly`, {
      method: 'POST',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getById: (id) => {
    return fetch(`${API_BASE_URL}/payments/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  update: (id, data) => {
    return fetch(`${API_BASE_URL}/payments/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  process: (id, data) => {
    return fetch(`${API_BASE_URL}/payments/${id}/process`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  delete: (id) => {
    return fetch(`${API_BASE_URL}/payments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  }
};

// Users API endpoints
export const usersAPI = {
  create: (data) => {
    return fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  getAll: () => {
    return fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getUserProfiles: (email) => {
    return fetch(`${API_BASE_URL}/users/profiles/${email}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getUserContext: (userId, role) => {
    const url = role 
      ? `${API_BASE_URL}/users/context/${userId}?role=${role}`
      : `${API_BASE_URL}/users/context/${userId}`;
    return fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getManagers: () => {
    return fetch(`${API_BASE_URL}/users/managers`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getMyUsers: () => {
    return fetch(`${API_BASE_URL}/users/my-users`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  getById: (id) => {
    return fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  update: (id, data) => {
    return fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  delete: (id) => {
    return fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  assignManager: (managerId) => {
    return fetch(`${API_BASE_URL}/users/assign-manager/${managerId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  }
};

// Generic API helper for custom requests
export const apiHelper = {
  get: (endpoint) => {
    return fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },

  post: (endpoint, data) => {
    return fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  put: (endpoint, data) => {
    return fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  patch: (endpoint, data) => {
    return fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  delete: (endpoint) => {
    return fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse);
  }
};