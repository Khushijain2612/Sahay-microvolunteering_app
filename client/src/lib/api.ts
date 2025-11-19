// Use your deployed backend URL from Render
const API_BASE_URL = 'https://sahay-microwolunteering-app-4.onrender.com/api/';
// Helper function for API calls
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const getAuthHeaders = (token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Generic request method
const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('API Request:', url, options); // For debugging
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  return handleResponse(response);
};

export const apiClient = {
  // Generic request method
  request,
  
  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // FIXED: Register method without broken comment
  async register(userData: any) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async getProfile(token: string) {
    return request('/auth/me', {
      headers: getAuthHeaders(token),
    });
  },

  // Opportunities endpoints
  async getOpportunities() {
    return request('/opportunities');
  },

  async getOpportunityById(id: string) {
    return request(`/opportunities/${id}`);
  },

  async createOpportunity(opportunityData: any, token: string) {
    return request('/opportunities', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(opportunityData),
    });
  },
};

// Utility function to get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};