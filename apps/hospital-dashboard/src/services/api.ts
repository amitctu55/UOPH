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

// API service functions for Hospital Dashboard
export const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post("/auth/login", credentials),
    register: (userData: any) => api.post("/auth/register", userData),
    logout: () => api.post("/auth/logout"),
  },

  // Hospital endpoints
  hospital: {
    getOverview: () => api.get("/hospital/overview"),
    getFacilities: (params?: any) => api.get("/hospital/facilities", { params }),
    updateFacility: (id: string, data: any) => api.put(`/hospital/facilities/${id}`, data),
  },

  // Staff endpoints
  staff: {
    getAll: (params?: any) => api.get("/staff", { params }),
    getById: (id: string) => api.get(`/staff/${id}`),
    create: (data: any) => api.post("/staff", data),
    update: (id: string, data: any) => api.put(`/staff/${id}`, data),
    delete: (id: string) => api.delete(`/staff/${id}`),
    schedule: (staffId: string, scheduleData: any) =>
      api.post(`/staff/${staffId}/schedule`, scheduleData),
    getSchedule: (staffId: string, params?: any) =>
      api.get(`/staff/${staffId}/schedule`, { params }),
  },

  // Patient endpoints
  patients: {
    getAll: (params?: any) => api.get("/patients", { params }),
    getById: (id: string) => api.get(`/patients/${id}`),
    admit: (patientId: string, admissionData: any) =>
      api.post(`/patients/${patientId}/admit`, admissionData),
    discharge: (patientId: string, dischargeData: any) =>
      api.post(`/patients/${patientId}/discharge`, dischargeData),
    transfer: (patientId: string, transferData: any) =>
      api.post(`/patients/${patientId}/transfer`, transferData),
  },

  // Resource Management endpoints
  resources: {
    getOperatingRooms: (params?: any) => api.get("/resources/or-rooms", { params }),
    getEquipment: (params?: any) => api.get("/resources/equipment", { params }),
    getBeds: (params?: any) => api.get("/resources/beds", { params }),
    allocateResource: (resourceType: string, resourceId: string, allocationData: any) =>
      api.post(`/resources/${resourceType}/${resourceId}/allocate`, allocationData),
    deallocateResource: (resourceType: string, resourceId: string) =>
      api.delete(`/resources/${resourceType}/${resourceId}/allocate`),
  },

  // Finance endpoints
  finance: {
    getRevenue: (params?: any) => api.get("/finance/revenue", { params }),
    getExpenses: (params?: any) => api.get("/finance/expenses", { params }),
    getInsuranceClaims: (params?: any) => api.get("/finance/claims", { params }),
    submitClaim: (claimData: any) => api.post("/finance/claims", claimData),
    getFinancialReports: (params?: any) => api.get("/finance/reports", { params }),
  },

  // Inventory endpoints
  inventory: {
    getSupplies: (params?: any) => api.get("/inventory/supplies", { params }),
    getMedications: (params?: any) => api.get("/inventory/medications", { params }),
    getLowStock: () => api.get("/inventory/low-stock"),
    updateStock: (itemId: string, quantity: number) =>
      api.put(`/inventory/items/${itemId}/stock`, { quantity }),
    createPurchaseOrder: (poData: any) => api.post("/inventory/purchase-orders", poData),
  },

  // Analytics endpoints
  analytics: {
    getOccupancyRate: (params?: any) => api.get("/analytics/occupancy", { params }),
    getPatientSatisfaction: (params?: any) => api.get("/analytics/satisfaction", { params }),
    getReadmissionRate: (params?: any) => api.get("/analytics/readmission", { params }),
    getAverageStay: (params?: any) => api.get("/analytics/average-stay", { params }),
    getEmergencyWaitTimes: (params?: any) => api.get("/analytics/emergency-wait", { params }),
  },

  // Emergency Management endpoints
  emergency: {
    getIncidents: (params?: any) => api.get("/emergency/incidents", { params }),
    createIncident: (incidentData: any) => api.post("/emergency/incidents", incidentData),
    updateIncident: (id: string, incidentData: any) =>
      api.put(`/emergency/incidents/${id}`, incidentData),
    getResources: () => api.get("/emergency/resources"),
    activatePlan: (planId: string) => api.post(`/emergency/plans/${planId}/activate`),
  },

  // Notification endpoints
  notifications: {
    getAll: (params?: any) => api.get("/notifications", { params }),
    markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
    markAllAsRead: () => api.put("/notifications/read-all"),
    delete: (id: string) => api.delete(`/notifications/${id}`),
  },
};
