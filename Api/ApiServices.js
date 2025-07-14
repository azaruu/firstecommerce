import axios from 'axios';

// Create axios instance
export const api = axios.create({
  baseURL: 'https://localhost:7251/api', // Change based on backend port
  headers: {
    'Content-Type': 'application/json',
   
  },
   withCredentials: true,
});

// Request interceptor to add Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional Response Interceptor (for handling global errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized, please login again.');
      // Optional: redirect to login or handle logout
    }
    return Promise.reject(error);
  }
);
