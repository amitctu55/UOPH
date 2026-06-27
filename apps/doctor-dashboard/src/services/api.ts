import axios from 'axios';

// Create axios instance with base URL from environment
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Redirect to login or handle logout
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API service functions
export const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
  },

  // Doctor endpoints
  doctors: {
    getProfile: () => api.get('/doctors/profile'),
    updateProfile: (data: any) => api.put('/doctors/profile', data),
    getAvailability: (params?: any) => api.get('/doctors/availability', { params }),
    setAvailability: (data: any) => api.post('/doctors/availability', data),
  },

  // Patient endpoints
  patients: {
    getAll: (params?: any) => api.get('/patients', { params }),
    getById: (id: string) => api.get(`/patients/${id}`),
    search: (query: string) => api.get('/patients/search', { params: { q: query } }),
  },

  // Appointment endpoints
  appointments: {
    getAll: (params?: any) => api.get('/appointments', { params }),
    getById: (id: string) => api.get(`/appointments/${id}`),
    create: (data: any) => api.post('/appointments', data),
    update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
    cancel: (id: string) => api.delete(`/appointments/${id}`),
    checkIn: (id: string) => api.post(`/appointments/${id}/check-in`),
    complete: (id: string) => api.post(`/appointments/${id}/complete`),
  },

  // Medical records endpoints
  medicalRecords: {
    getAll: (params?: any) => api.get('/medical-records', { params }),
    getById: (id: string) => api.get(`/medical-records/${id}`),
    create: (data: any) => api.post('/medical-records', data),
    update: (id: string, data: any) => api.put(`/medical-records/${id}`, data),
    delete: (id: string) => api.delete(`/medical-records/${id}`),
  },

  // Prescription endpoints
  prescriptions: {
    getAll: (params?: any) => api.get('/prescriptions', { params }),
    getById: (id: string) => api.get(`/prescriptions/${id}`),
    create: (data: any) => api.post('/prescriptions', data),
    update: (id: string, data: any) => api.put(`/prescriptions/${id}`, data),
    renew: (id: string) => api.put(`/prescriptions/${id}/renew`),
    cancel: (id: string) => api.delete(`/prescriptions/${id}`),
  },

  // Consultation endpoints
  consultations: {
    getAll: (params?: any) => api.get('/consultations', { params }),
    getById: (id: string) => api.get(`/consultations/${id}`),
    start: (id: string) => api.post(`/consultations/${id}/start`),
    end: (id: string) => api.post(`/consultations/${id}/end`),
    getWaitingRoom: () => api.get('/consultations/waiting-room'),
  },

  // Notification endpoints
  notifications: {
    getAll: (params?: any) => api.get('/notifications', { params }),
    markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
    markAllAsRead: () => api.put('/notifications/read-all'),
    delete: (id: string) => api.delete(`/notifications/${id}`),
  },

  // Chat endpoints
  chat: {
    getConversations: () => api.get('/chat/conversations'),
    getMessages: (conferenceId: string) => api.get(`/chat/conversations/${conferenceId}/messages`),
    sendMessage: (conferenceId: string, content: string) => api.post(`/chat/conversations/${conferenceId}/messages`, { content }),
  },
};