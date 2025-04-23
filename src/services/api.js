// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const doctorApi = {
  getProfile: () => api.get('/doctor/profile'),
  getAppointments: () => api.get('/doctor/appointments'),
  updateAvailability: (availability) => api.put('/doctor/availability', availability),
  createPrescription: (prescription) => api.post('/doctor/prescriptions', prescription),
};

export const adminApi = {
  getUsers: () => api.get('/admin/users'),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (userId, userData) => api.put(`/admin/users/${userId}`, userData),
  getSystemStats: () => api.get('/admin/stats'),
};