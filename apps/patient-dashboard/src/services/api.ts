import axios from "axios";

// Create axios instance with base URL from environment
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Request interceptor to add auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Redirect to login or handle logout
      window.location.href = "/login";
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
      api.post("/auth/login", credentials),
    register: (userData: any) => api.post("/auth/register", userData),
    logout: () => api.post("/auth/logout"),
    refreshToken: () => api.post("/auth/refresh"),
  },

  // User endpoints
  users: {
    getProfile: () => api.get("/users/profile"),
    updateProfile: (data: any) => api.put("/users/profile", data),
  },

  // Appointment endpoints
  appointments: {
    getUpcoming: (params?: any) => api.get("/appointments/upcoming", { params }),
    getPast: (params?: any) => api.get("/appointments/past", { params }),
    getById: (id: string) => api.get(`/appointments/${id}`),
    create: (data: any) => api.post("/appointments", data),
    update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
    cancel: (id: string) => api.delete(`/appointments/${id}`),
    reschedule: (id: string, data: any) => api.put(`/appointments/${id}/reschedule`, data),
  },

  // Doctor endpoints
  doctors: {
    search: (params?: any) => api.get("/doctors/search", { params }),
    getById: (id: string) => api.get(`/doctors/${id}`),
  },

  // Medical records endpoints
  medicalRecords: {
    getAll: (params?: any) => api.get("/medical-records", { params }),
    getById: (id: string) => api.get(`/medical-records/${id}`),
    upload: (data: any) => api.post("/medical-records/upload", data),
    delete: (id: string) => api.delete(`/medical-records/${id}`),
    share: (id: string, recipientEmail: string) =>
      api.post(`/medical-records/${id}/share`, { recipientEmail }),
  },

  // Pharmacy endpoints
  pharmacy: {
    getMedications: (params?: any) => api.get("/pharmacy/medications", { params }),
    getPrescriptions: (params?: any) => api.get("/pharmacy/prescriptions", { params }),
    renewPrescription: (id: string) => api.put(`/pharmacy/prescriptions/${id}/renew`),
    getDrugInfo: (drugName: string) => api.get(`/pharmacy/drug-info/${drugName}`),
  },

  // Wallet endpoints
  wallet: {
    getBalance: () => api.get("/wallet/balance"),
    getTransactions: (params?: any) => api.get("/wallet/transactions", { params }),
    addFunds: (amount: number) => api.post("/wallet/fund", { amount }),
    makePayment: (paymentData: any) => api.post("/wallet/pay", paymentData),
  },

  // Consultation endpoints
  consultations: {
    getUpcoming: () => api.get("/consultations/upcoming"),
    join: (id: string) => api.post(`/consultations/${id}/join`),
    end: (id: string) => api.post(`/consultations/${id}/end`),
    getWaitingRoom: () => api.get("/consultations/waiting-room"),
  },

  // Notification endpoints
  notifications: {
    getAll: (params?: any) => api.get("/notifications", { params }),
    getUnreadCount: () => api.get("/notifications/unread-count"),
    markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
    markAllAsRead: () => api.put("/notifications/read-all"),
    delete: (id: string) => api.delete(`/notifications/${id}`),
  },

  // Chat endpoints
  chat: {
    getConversations: () => api.get("/chat/conversations"),
    getMessages: (conversationId: string) =>
      api.get(`/chat/conversations/${conversationId}/messages`),
    sendMessage: (conversationId: string, content: string) =>
      api.post(`/chat/conversations/${conversationId}/messages`, { content }),
    markAsRead: (conversationId: string) => api.put(`/chat/conversations/${conversationId}/read`),
  },
};
