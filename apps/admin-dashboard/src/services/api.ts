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
  },

  // User endpoints
  users: {
    getAll: (params?: any) => api.get("/users", { params }),
    getById: (id: string) => api.get(`/users/${id}`),
    create: (data: any) => api.post("/users", data),
    update: (id: string, data: any) => api.put(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
    deactivate: (id: string) => api.patch(`/users/${id}/deactivate`),
    activate: (id: string) => api.patch(`/users/${id}/activate`),
  },

  // Role endpoints
  roles: {
    getAll: (params?: any) => api.get("/roles", { params }),
    getById: (id: string) => api.get(`/roles/${id}`),
    create: (data: any) => api.post("/roles", data),
    update: (id: string, data: any) => api.put(`/roles/${id}`, data),
    delete: (id: string) => api.delete(`/roles/${id}`),
    assignPermissions: (roleId: string, permissions: string[]) =>
      api.post(`/roles/${roleId}/permissions`, { permissions }),
    removePermissions: (roleId: string, permissions: string[]) =>
      api.delete(`/roles/${roleId}/permissions`, { data: { permissions } }),
  },

  // Settings endpoints
  settings: {
    getAll: (params?: any) => api.get("/settings", { params }),
    getById: (id: string) => api.get(`/settings/${id}`),
    update: (id: string, data: any) => api.put(`/settings/${id}`, data),
    create: (data: any) => api.post("/settings", data),
    reset: (id: string) => api.post(`/settings/${id}/reset`),
  },

  // Compliance endpoints
  compliance: {
    getReports: (params?: any) => api.get("/compliance/reports", { params }),
    getAuditLogs: (params?: any) => api.get("/compliance/audit-logs", { params }),
    getHipaaCompliance: () => api.get("/compliance/hipaa"),
    getGdprCompliance: () => api.get("/compliance/gdpr"),
    runAudit: () => api.post("/compliance/audit"),
  },

  // Security endpoints
  security: {
    getAlerts: (params?: any) => api.get("/security/alerts", { params }),
    getAccessLogs: (params?: any) => api.get("/security/access-logs", { params }),
    resolveAlert: (id: string) => api.post(`/security/alerts/${id}/resolve`),
    blockIp: (ip: string) => api.post("/security/block-ip", { ip }),
    unblockIp: (ip: string) => api.delete(`/security/block-ip/${ip}`),
    getFailedLogins: (params?: any) => api.get("/security/failed-logins", { params }),
  },

  // Analytics endpoints
  analytics: {
    getOverview: (params?: any) => api.get("/analytics/overview", { params }),
    getUsageMetrics: (params?: any) => api.get("/analytics/usage", { params }),
    getPerformanceMetrics: (params?: any) => api.get("/analytics/performance", { params }),
    getUserGrowth: (params?: any) => api.get("/analytics/user-growth", { params }),
    exportReport: (reportType: string, params?: any) =>
      api.get(`/analytics/export/${reportType}`, { params, responseType: "blob" }),
  },

  // Support endpoints
  support: {
    getTickets: (params?: any) => api.get("/support/tickets", { params }),
    getTicketById: (id: string) => api.get(`/support/tickets/${id}`),
    createTicket: (data: any) => api.post("/support/tickets", data),
    updateTicket: (id: string, data: any) => api.put(`/support/tickets/${id}`, data),
    closeTicket: (id: string) => api.post(`/support/tickets/${id}/close`),
    assignTicket: (id: string, assigneeId: string) =>
      api.put(`/support/tickets/${id}/assign`, { assigneeId }),
    addComment: (id: string, comment: string) =>
      api.post(`/support/tickets/${id}/comments`, { comment }),
  },

  // Billing endpoints
  billing: {
    getInvoices: (params?: any) => api.get("/billing/invoices", { params }),
    getInvoiceById: (id: string) => api.get(`/billing/invoices/${id}`),
    createInvoice: (data: any) => api.post("/billing/invoices", data),
    processPayment: (invoiceId: string, paymentData: any) =>
      api.post(`/billing/invoices/${invoiceId}/pay`, paymentData),
    getPaymentHistory: (params?: any) => api.get("/billing/payments", { params }),
    getFinancialReports: (params?: any) => api.get("/billing/reports", { params }),
  },

  // Content endpoints
  content: {
    getPages: (params?: any) => api.get("/content/pages", { params }),
    getPageById: (id: string) => api.get(`/content/pages/${id}`),
    createPage: (data: any) => api.post("/content/pages", data),
    updatePage: (id: string, data: any) => api.put(`/content/pages/${id}`, data),
    deletePage: (id: string) => api.delete(`/content/pages/${id}`),
    getFaqs: (params?: any) => api.get("/content/faqs", { params }),
    createFaq: (data: any) => api.post("/content/faqs", data),
    updateFaq: (id: string, data: any) => api.put(`/content/faqs/${id}`, data),
    deleteFaq: (id: string) => api.delete(`/content/faqs/${id}`),
  },

  // Notification endpoints
  notifications: {
    getTemplates: (params?: any) => api.get("/notifications/templates", { params }),
    createTemplate: (data: any) => api.post("/notifications/templates", data),
    updateTemplate: (id: string, data: any) => api.put(`/notifications/templates/${id}`, data),
    deleteTemplate: (id: string) => api.delete(`/notifications/templates/${id}`),
    getLogs: (params?: any) => api.get("/notifications/logs", { params }),
    sendTestNotification: (templateId: string, recipient: string) =>
      api.post(`/notifications/templates/${templateId}/test`, { recipient }),
  },
};
