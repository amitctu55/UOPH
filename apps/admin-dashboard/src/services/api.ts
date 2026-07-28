import axios from "axios";

// Create axios instance with base URL from environment
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Request interceptor to add auth token
api.interceptors.request.use(
  config => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      // Redirect to login or handle logout - only in browser
      if (typeof window !== 'undefined') {
        window.location.href = "/login";
      }
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

  // Admin endpoints
  admin: {
    getOverviewStats: () =>
      Promise.resolve({
        data: {
          totalUsers: 1247,
          activeToday: 89,
          openTickets: 23,
          doctors: 45,
          patients: 892,
          staff: 180,
          admins: 12,
        },
      }),
    getSystemHealth: () =>
      Promise.resolve({
        data: {
          database: {
            status: "healthy",
            connections: 24,
            maxConnections: 100,
            queryAvgTime: "45ms",
          },
          api: {
            status: "healthy",
            requestsPerMin: 342,
            errorRate: "0.2%",
          },
          cache: {
            status: "healthy",
            hitRate: "85%",
            memoryUse: "60%",
          },
          storage: {
            status: "healthy",
            used: 450,
            available: 550,
          },
          uptime: "99.9%",
          avgResponseTime: "120ms",
        },
      }),
    getRecentActivity: () =>
      Promise.resolve({
        data: [
          {
            id: "1",
            type: "user_created",
            title: "New user registered",
            description: "John Doe registered as a new patient",
            icon: "👤",
            userName: "System",
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          },
          {
            id: "2",
            type: "appointment_scheduled",
            title: "Appointment scheduled",
            description: "Dr. Smith scheduled a follow-up appointment for patient Jane Wilson",
            icon: "📅",
            userName: "Dr. Smith",
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          },
          {
            id: "3",
            type: "prescription_created",
            title: "New prescription added",
            description: "Dr. Johnson prescribed Lisinopril 10mg for patient Robert Chen",
            icon: "💊",
            userName: "Dr. Johnson",
            timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
          },
          {
            id: "4",
            type: "bill_generated",
            title: "Invoice generated",
            description: "Invoice #INV-2024-001234 generated for patient Sarah Davis",
            icon: "💰",
            userName: "Billing System",
            timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
          },
          {
            id: "5",
            type: "lab_result_uploaded",
            title: "Lab results uploaded",
            description: "Blood test results uploaded for patient Michael Rodriguez",
            icon: "📊",
            userName: "Lab Technician",
            timestamp: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
          },
          {
            id: "6",
            type: "user_updated",
            title: "User profile updated",
            description: "Administrator updated contact information for nurse Emily Chang",
            icon: "✏️",
            userName: "Admin",
            timestamp: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
          },
        ],
      }),
    getUserStats: () =>
      Promise.resolve({
        data: {
          doctors: { total: 45, growth: 12 },
          patients: { total: 892, growth: 8 },
          staff: { total: 180, growth: 5 },
          admins: { total: 12, growth: 0 },
        },
      }),
    getUsers: (params?: any) =>
      Promise.resolve({
        data: [
          {
            id: "1",
            name: "Dr. Sarah Johnson",
            email: "sarah.johnson@example.com",
            role: "doctor",
            status: "active",
            department: "Cardiology",
            lastLogin: "2 hours ago",
            lastActive: "2 hours ago",
          },
          {
            id: "2",
            name: "Mike Rodriguez",
            email: "mike.rodriguez@example.com",
            role: "patient",
            status: "active",
            patientId: "PAT-789456",
            lastLogin: "5 minutes ago",
            lastActive: "5 minutes ago",
          },
          {
            id: "3",
            name: "Lisa Chen",
            email: "lisa.chen@example.com",
            role: "staff",
            status: "active",
            department: "Front Desk",
            lastLogin: "1 hour ago",
            lastActive: "1 hour ago",
          },
          {
            id: "4",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
            status: "active",
            department: "Administration",
            lastLogin: "30 minutes ago",
            lastActive: "30 minutes ago",
          },
          {
            id: "5",
            name: "Dr. Michael Lee",
            email: "michael.lee@example.com",
            role: "doctor",
            status: "active",
            department: "Neurology",
            lastLogin: "3 hours ago",
            lastActive: "3 hours ago",
          },
        ],
      }),

    // System Monitoring Methods
    getSystemMetrics: () =>
      Promise.resolve({
        data: {
          overallHealth: "healthy",
          cpuUsage: 45,
          memoryUsage: 62,
          diskUsage: 45,
          networkIO: 12.5,
        },
      }),
    getSystemAlerts: () =>
      Promise.resolve({
        data: [
          {
            id: "1",
            title: "High Memory Usage on Database Server",
            description: "Memory usage has exceeded 85% threshold on the primary database server",
            severity: "warning",
            timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
            actionRequired: true,
          },
          {
            id: "2",
            title: "SSL Certificate Expiration Warning",
            description: "SSL certificate for api.example.com expires in 15 days",
            severity: "info",
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            actionRequired: false,
          },
        ],
      }),
    getServicesStatus: () =>
      Promise.resolve({
        data: [
          {
            id: "1",
            name: "Database",
            description: "Primary PostgreSQL database",
            status: "running",
            responseTime: 12,
          },
          {
            id: "2",
            name: "API Server",
            description: "Node.js API server",
            status: "running",
            responseTime: 45,
          },
          {
            id: "3",
            name: "Cache Server",
            description: "Redis cache server",
            status: "running",
            responseTime: 5,
          },
          {
            id: "4",
            name: "Message Queue",
            description: "RabbitMQ message queue",
            status: "running",
            responseTime: 8,
          },
        ],
      }),
  },
};
