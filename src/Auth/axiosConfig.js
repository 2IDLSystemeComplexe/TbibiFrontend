// axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create();

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
