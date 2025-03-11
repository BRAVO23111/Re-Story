import axios from "axios";

// frontend/src/config/config.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('API Base URL:', BASE_URL); // Debug log

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;