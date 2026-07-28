module.exports = [
"[project]/apps/admin-dashboard/src/store/useAuthStore.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zustand$29$__ = __turbopack_context__.i("[externals]/zustand [external] (zustand, esm_import, [project]/node_modules/zustand)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zustand$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zustand$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$zustand$29$__["create"])((set, get)=>({
        user: null,
        token: null,
        isLoading: false,
        login: async (email, password)=>{
            set({
                isLoading: true
            });
            try {
                // In a real implementation, this would call the auth service
                // For demo purposes, we'll simulate a successful login
                const mockUser = {
                    id: "admin-123",
                    email: email,
                    firstName: "John",
                    lastName: "Doe",
                    role: "system_admin",
                    permissions: [
                        "read",
                        "write",
                        "delete",
                        "admin"
                    ],
                    status: "active"
                };
                const mockToken = "mock-jwt-token-" + Date.now();
                set({
                    user: mockUser,
                    token: mockToken,
                    isLoading: false
                });
            } catch (error) {
                set({
                    isLoading: false
                });
                throw error;
            }
        },
        logout: ()=>{
            set({
                user: null,
                token: null
            });
        },
        register: async (userData)=>{
            set({
                isLoading: true
            });
            try {
                // In a real implementation, this would call the registration endpoint
                // For demo purposes, we'll simulate a successful registration
                const mockUser = {
                    id: "admin-" + Date.now(),
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: "system_admin",
                    permissions: [
                        "read",
                        "write",
                        "delete",
                        "admin"
                    ],
                    status: "active"
                };
                const mockToken = "mock-jwt-token-" + Date.now();
                set({
                    user: mockUser,
                    token: mockToken,
                    isLoading: false
                });
            } catch (error) {
                set({
                    isLoading: false
                });
                throw error;
            }
        }
    }));
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/admin-dashboard/src/services/api.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "apiService",
    ()=>apiService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import, [project]/node_modules/axios)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Create axios instance with base URL from environment
const api = __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__["default"].create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});
// Request interceptor to add auth token
api.interceptors.request.use((config)=>{
    // Only run in browser environment
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return config;
}, (error)=>{
    return Promise.reject(error);
});
// Response interceptor for error handling
api.interceptors.response.use((response)=>response, (error)=>{
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
        // Redirect to login or handle logout - only in browser
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = api;
const apiService = {
    // Auth endpoints
    auth: {
        login: (credentials)=>api.post("/auth/login", credentials),
        register: (userData)=>api.post("/auth/register", userData),
        logout: ()=>api.post("/auth/logout")
    },
    // User endpoints
    users: {
        getAll: (params)=>api.get("/users", {
                params
            }),
        getById: (id)=>api.get(`/users/${id}`),
        create: (data)=>api.post("/users", data),
        update: (id, data)=>api.put(`/users/${id}`, data),
        delete: (id)=>api.delete(`/users/${id}`),
        deactivate: (id)=>api.patch(`/users/${id}/deactivate`),
        activate: (id)=>api.patch(`/users/${id}/activate`)
    },
    // Role endpoints
    roles: {
        getAll: (params)=>api.get("/roles", {
                params
            }),
        getById: (id)=>api.get(`/roles/${id}`),
        create: (data)=>api.post("/roles", data),
        update: (id, data)=>api.put(`/roles/${id}`, data),
        delete: (id)=>api.delete(`/roles/${id}`),
        assignPermissions: (roleId, permissions)=>api.post(`/roles/${roleId}/permissions`, {
                permissions
            }),
        removePermissions: (roleId, permissions)=>api.delete(`/roles/${roleId}/permissions`, {
                data: {
                    permissions
                }
            })
    },
    // Settings endpoints
    settings: {
        getAll: (params)=>api.get("/settings", {
                params
            }),
        getById: (id)=>api.get(`/settings/${id}`),
        update: (id, data)=>api.put(`/settings/${id}`, data),
        create: (data)=>api.post("/settings", data),
        reset: (id)=>api.post(`/settings/${id}/reset`)
    },
    // Compliance endpoints
    compliance: {
        getReports: (params)=>api.get("/compliance/reports", {
                params
            }),
        getAuditLogs: (params)=>api.get("/compliance/audit-logs", {
                params
            }),
        getHipaaCompliance: ()=>api.get("/compliance/hipaa"),
        getGdprCompliance: ()=>api.get("/compliance/gdpr"),
        runAudit: ()=>api.post("/compliance/audit")
    },
    // Security endpoints
    security: {
        getAlerts: (params)=>api.get("/security/alerts", {
                params
            }),
        getAccessLogs: (params)=>api.get("/security/access-logs", {
                params
            }),
        resolveAlert: (id)=>api.post(`/security/alerts/${id}/resolve`),
        blockIp: (ip)=>api.post("/security/block-ip", {
                ip
            }),
        unblockIp: (ip)=>api.delete(`/security/block-ip/${ip}`),
        getFailedLogins: (params)=>api.get("/security/failed-logins", {
                params
            })
    },
    // Analytics endpoints
    analytics: {
        getOverview: (params)=>api.get("/analytics/overview", {
                params
            }),
        getUsageMetrics: (params)=>api.get("/analytics/usage", {
                params
            }),
        getPerformanceMetrics: (params)=>api.get("/analytics/performance", {
                params
            }),
        getUserGrowth: (params)=>api.get("/analytics/user-growth", {
                params
            }),
        exportReport: (reportType, params)=>api.get(`/analytics/export/${reportType}`, {
                params,
                responseType: "blob"
            })
    },
    // Support endpoints
    support: {
        getTickets: (params)=>api.get("/support/tickets", {
                params
            }),
        getTicketById: (id)=>api.get(`/support/tickets/${id}`),
        createTicket: (data)=>api.post("/support/tickets", data),
        updateTicket: (id, data)=>api.put(`/support/tickets/${id}`, data),
        closeTicket: (id)=>api.post(`/support/tickets/${id}/close`),
        assignTicket: (id, assigneeId)=>api.put(`/support/tickets/${id}/assign`, {
                assigneeId
            }),
        addComment: (id, comment)=>api.post(`/support/tickets/${id}/comments`, {
                comment
            })
    },
    // Billing endpoints
    billing: {
        getInvoices: (params)=>api.get("/billing/invoices", {
                params
            }),
        getInvoiceById: (id)=>api.get(`/billing/invoices/${id}`),
        createInvoice: (data)=>api.post("/billing/invoices", data),
        processPayment: (invoiceId, paymentData)=>api.post(`/billing/invoices/${invoiceId}/pay`, paymentData),
        getPaymentHistory: (params)=>api.get("/billing/payments", {
                params
            }),
        getFinancialReports: (params)=>api.get("/billing/reports", {
                params
            })
    },
    // Content endpoints
    content: {
        getPages: (params)=>api.get("/content/pages", {
                params
            }),
        getPageById: (id)=>api.get(`/content/pages/${id}`),
        createPage: (data)=>api.post("/content/pages", data),
        updatePage: (id, data)=>api.put(`/content/pages/${id}`, data),
        deletePage: (id)=>api.delete(`/content/pages/${id}`),
        getFaqs: (params)=>api.get("/content/faqs", {
                params
            }),
        createFaq: (data)=>api.post("/content/faqs", data),
        updateFaq: (id, data)=>api.put(`/content/faqs/${id}`, data),
        deleteFaq: (id)=>api.delete(`/content/faqs/${id}`)
    },
    // Notification endpoints
    notifications: {
        getTemplates: (params)=>api.get("/notifications/templates", {
                params
            }),
        createTemplate: (data)=>api.post("/notifications/templates", data),
        updateTemplate: (id, data)=>api.put(`/notifications/templates/${id}`, data),
        deleteTemplate: (id)=>api.delete(`/notifications/templates/${id}`),
        getLogs: (params)=>api.get("/notifications/logs", {
                params
            }),
        sendTestNotification: (templateId, recipient)=>api.post(`/notifications/templates/${templateId}/test`, {
                recipient
            })
    },
    // Admin endpoints
    admin: {
        getOverviewStats: ()=>Promise.resolve({
                data: {
                    totalUsers: 1247,
                    activeToday: 89,
                    openTickets: 23,
                    doctors: 45,
                    patients: 892,
                    staff: 180,
                    admins: 12
                }
            }),
        getSystemHealth: ()=>Promise.resolve({
                data: {
                    database: {
                        status: "healthy",
                        connections: 24,
                        maxConnections: 100,
                        queryAvgTime: "45ms"
                    },
                    api: {
                        status: "healthy",
                        requestsPerMin: 342,
                        errorRate: "0.2%"
                    },
                    cache: {
                        status: "healthy",
                        hitRate: "85%",
                        memoryUse: "60%"
                    },
                    storage: {
                        status: "healthy",
                        used: 450,
                        available: 550
                    },
                    uptime: "99.9%",
                    avgResponseTime: "120ms"
                }
            }),
        getRecentActivity: ()=>Promise.resolve({
                data: [
                    {
                        id: "1",
                        type: "user_created",
                        title: "New user registered",
                        description: "John Doe registered as a new patient",
                        icon: "👤",
                        userName: "System",
                        timestamp: new Date(Date.now() - 3600000).toISOString()
                    },
                    {
                        id: "2",
                        type: "appointment_scheduled",
                        title: "Appointment scheduled",
                        description: "Dr. Smith scheduled a follow-up appointment for patient Jane Wilson",
                        icon: "📅",
                        userName: "Dr. Smith",
                        timestamp: new Date(Date.now() - 7200000).toISOString()
                    },
                    {
                        id: "3",
                        type: "prescription_created",
                        title: "New prescription added",
                        description: "Dr. Johnson prescribed Lisinopril 10mg for patient Robert Chen",
                        icon: "💊",
                        userName: "Dr. Johnson",
                        timestamp: new Date(Date.now() - 10800000).toISOString()
                    },
                    {
                        id: "4",
                        type: "bill_generated",
                        title: "Invoice generated",
                        description: "Invoice #INV-2024-001234 generated for patient Sarah Davis",
                        icon: "💰",
                        userName: "Billing System",
                        timestamp: new Date(Date.now() - 14400000).toISOString()
                    },
                    {
                        id: "5",
                        type: "lab_result_uploaded",
                        title: "Lab results uploaded",
                        description: "Blood test results uploaded for patient Michael Rodriguez",
                        icon: "📊",
                        userName: "Lab Technician",
                        timestamp: new Date(Date.now() - 18000000).toISOString()
                    },
                    {
                        id: "6",
                        type: "user_updated",
                        title: "User profile updated",
                        description: "Administrator updated contact information for nurse Emily Chang",
                        icon: "✏️",
                        userName: "Admin",
                        timestamp: new Date(Date.now() - 21600000).toISOString()
                    }
                ]
            }),
        getUserStats: ()=>Promise.resolve({
                data: {
                    doctors: {
                        total: 45,
                        growth: 12
                    },
                    patients: {
                        total: 892,
                        growth: 8
                    },
                    staff: {
                        total: 180,
                        growth: 5
                    },
                    admins: {
                        total: 12,
                        growth: 0
                    }
                }
            }),
        getUsers: (params)=>Promise.resolve({
                data: [
                    {
                        id: "1",
                        name: "Dr. Sarah Johnson",
                        email: "sarah.johnson@example.com",
                        role: "doctor",
                        status: "active",
                        department: "Cardiology",
                        lastLogin: "2 hours ago",
                        lastActive: "2 hours ago"
                    },
                    {
                        id: "2",
                        name: "Mike Rodriguez",
                        email: "mike.rodriguez@example.com",
                        role: "patient",
                        status: "active",
                        patientId: "PAT-789456",
                        lastLogin: "5 minutes ago",
                        lastActive: "5 minutes ago"
                    },
                    {
                        id: "3",
                        name: "Lisa Chen",
                        email: "lisa.chen@example.com",
                        role: "staff",
                        status: "active",
                        department: "Front Desk",
                        lastLogin: "1 hour ago",
                        lastActive: "1 hour ago"
                    },
                    {
                        id: "4",
                        name: "Admin User",
                        email: "admin@example.com",
                        role: "admin",
                        status: "active",
                        department: "Administration",
                        lastLogin: "30 minutes ago",
                        lastActive: "30 minutes ago"
                    },
                    {
                        id: "5",
                        name: "Dr. Michael Lee",
                        email: "michael.lee@example.com",
                        role: "doctor",
                        status: "active",
                        department: "Neurology",
                        lastLogin: "3 hours ago",
                        lastActive: "3 hours ago"
                    }
                ]
            }),
        // System Monitoring Methods
        getSystemMetrics: ()=>Promise.resolve({
                data: {
                    overallHealth: "healthy",
                    cpuUsage: 45,
                    memoryUsage: 62,
                    diskUsage: 45,
                    networkIO: 12.5
                }
            }),
        getSystemAlerts: ()=>Promise.resolve({
                data: [
                    {
                        id: "1",
                        title: "High Memory Usage on Database Server",
                        description: "Memory usage has exceeded 85% threshold on the primary database server",
                        severity: "warning",
                        timestamp: new Date(Date.now() - 1800000).toISOString(),
                        actionRequired: true
                    },
                    {
                        id: "2",
                        title: "SSL Certificate Expiration Warning",
                        description: "SSL certificate for api.example.com expires in 15 days",
                        severity: "info",
                        timestamp: new Date(Date.now() - 7200000).toISOString(),
                        actionRequired: false
                    }
                ]
            }),
        getServicesStatus: ()=>Promise.resolve({
                data: [
                    {
                        id: "1",
                        name: "Database",
                        description: "Primary PostgreSQL database",
                        status: "running",
                        responseTime: 12
                    },
                    {
                        id: "2",
                        name: "API Server",
                        description: "Node.js API server",
                        status: "running",
                        responseTime: 45
                    },
                    {
                        id: "3",
                        name: "Cache Server",
                        description: "Redis cache server",
                        status: "running",
                        responseTime: 5
                    },
                    {
                        id: "4",
                        name: "Message Queue",
                        description: "RabbitMQ message queue",
                        status: "running",
                        responseTime: 8
                    }
                ]
            })
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/admin-dashboard/src/App.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__ = __turbopack_context__.i("[externals]/@tanstack/react-query [external] (@tanstack/react-query, esm_import, [project]/node_modules/@tanstack/react-query)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin-dashboard/src/store/useAuthStore.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin-dashboard/src/services/api.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const queryClient = new __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["QueryClient"]();
// Dashboard Page with real data fetching
function DashboardPage() {
    const { data: overviewStats, isLoading: loadingOverview } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "overviewStats"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getOverviewStats().then((res)=>res.data),
        retry: false
    });
    const { data: systemHealth = {
        database: {},
        api: {},
        cache: {},
        storage: {},
        storageUsed: "45%",
        uptime: "99.9%",
        avgResponseTime: "120ms"
    }, isLoading: loadingHealth } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "systemHealth"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getSystemHealth().then((res)=>res.data),
        retry: false
    });
    const { data: recentActivity = [], isLoading: loadingActivity } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "recentActivity"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getRecentActivity().then((res)=>res.data),
        retry: false
    });
    const { data: userStats = {}, isLoading: loadingUsers } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "userStats"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getUserStats().then((res)=>res.data),
        retry: false
    });
    const isLoading = loadingOverview || loadingHealth || loadingActivity || loadingUsers;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "dashboard-page",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "Admin Dashboard"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "loading",
                    children: "Loading dashboard data..."
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "dashboard-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "Admin Dashboard"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "stats-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "Total Users"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: overviewStats?.totalUsers || 0
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Registered"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "Active Today"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: overviewStats?.activeToday || 0
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Users"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "System Uptime"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: systemHealth?.uptime || "99.9%"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Last 30 days"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "API Response Time"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: systemHealth?.avgResponseTime || "120ms"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Average"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "Storage Used"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: systemHealth?.storageUsed || "45%"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "of Total"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "stat-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "Support Tickets"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-value",
                                children: overviewStats?.openTickets || 0
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-label",
                                children: "Open"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "quick-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "Quick Actions"
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "actions-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "👥"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Manage Users"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "View Analytics"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "💾"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "System Backup"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "🔧"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Run Diagnostics"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "action-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "action-icon",
                                        children: "📋"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Generate Reports"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "dashboard-modules",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "module",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "System Health Overview"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "health-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "Database"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 157,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `status ${systemHealth?.database?.status?.toLowerCase() || "healthy"}`,
                                                    children: systemHealth?.database?.status?.toUpperCase() || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 158,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Connections: ",
                                                            systemHealth?.database?.connections || 0,
                                                            "/",
                                                            systemHealth?.database?.maxConnections || 100
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Query Avg: ",
                                                            systemHealth?.database?.queryAvgTime || "45ms"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "API Server"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 174,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `status ${systemHealth?.api?.status?.toLowerCase() || "healthy"}`,
                                                    children: systemHealth?.api?.status?.toUpperCase() || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 175,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Requests/min: ",
                                                            systemHealth?.api?.requestsPerMin || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Error Rate: ",
                                                            systemHealth?.api?.errorRate || "0.2%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "Cache Server"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `status ${systemHealth?.cache?.status?.toLowerCase() || "healthy"}`,
                                                    children: systemHealth?.cache?.status?.toUpperCase() || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 187,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Hit Rate: ",
                                                            systemHealth?.cache?.hitRate || "85%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Memory Use: ",
                                                            systemHealth?.cache?.memoryUse || "60%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 194,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "health-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "Storage Service"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `status ${systemHealth?.storage?.status?.toLowerCase() || "healthy"}`,
                                                    children: systemHealth?.storage?.status?.toUpperCase() || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "health-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Used: ",
                                                            systemHealth?.storage?.used || "0",
                                                            " GB"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Available: ",
                                                            systemHealth?.storage?.available || "0",
                                                            " GB"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "module",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "User Activity (Last 24 Hours)"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "activity-list",
                                children: recentActivity.slice(0, 8).map((activity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "activity-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "activity-icon",
                                                children: activity.icon || "📝"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "activity-content",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: activity.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: activity.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                        children: activity.userName
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 222,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "activity-meta",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("time", {
                                                        children: new Date(activity.timestamp).toLocaleTimeString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 19
                                                    }, this),
                                                    activity.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `activity-type ${activity.type}`,
                                                        children: activity.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, activity.id, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            !recentActivity || recentActivity.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "no-activity",
                                children: "No recent activity"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "module",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "User Statistics"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "user-stats-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Doctors"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: userStats?.doctors?.total || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 246,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 247,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: userStats?.doctors?.growth !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `change ${userStats?.doctors?.growth >= 0 ? "positive" : "negative"}`,
                                                    children: [
                                                        userStats?.doctors?.growth >= 0 ? "+" : "",
                                                        userStats?.doctors?.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 248,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Patients"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: userStats?.patients?.total || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 263,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 264,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: userStats?.patients?.growth !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `change ${userStats?.patients?.growth >= 0 ? "positive" : "negative"}`,
                                                    children: [
                                                        userStats?.patients?.growth >= 0 ? "+" : "",
                                                        userStats?.patients?.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 265,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Administrators"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 279,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: userStats?.admins?.total || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 280,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 281,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: userStats?.admins?.growth !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `change ${userStats?.admins?.growth >= 0 ? "positive" : "negative"}`,
                                                    children: [
                                                        userStats?.admins?.growth >= 0 ? "+" : "",
                                                        userStats?.admins?.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Staff"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 296,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: userStats?.staff?.total || 0
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 297,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 298,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-change",
                                                children: userStats?.staff?.growth !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `change ${userStats?.staff?.growth >= 0 ? "positive" : "negative"}`,
                                                    children: [
                                                        userStats?.staff?.growth >= 0 ? "+" : "",
                                                        userStats?.staff?.growth,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "change",
                                                    children: "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
function UserManagementPage() {
    const [userType, setUserType] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("all");
    const [searchTerm, setSearchTerm] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [sortBy, setSortBy] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("name");
    const [users, setUsers] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(true);
    const [error, setError] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(null);
    __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useEffect(()=>{
        const loadUsers = async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getUsers({
                    userType,
                    searchTerm,
                    sortBy
                });
                // Map lastLogin to lastActive for display purposes
                const usersWithLastActive = response.data.map((user)=>({
                        ...user,
                        lastActive: user.lastLogin
                    }));
                setUsers(usersWithLastActive);
                setError(null);
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                setError(message || "Failed to load users");
            } finally{
                setLoading(false);
            }
        };
        loadUsers();
    }, [
        userType,
        searchTerm,
        sortBy
    ]);
    const handleSearchChange = (e)=>{
        setSearchTerm(e.target.value);
    };
    const handleFilterChange = (e)=>{
        setUserType(e.target.value);
    };
    const handleSortChange = (e)=>{
        setSortBy(e.target.value);
    };
    const handleStatusChange = (userId, newStatus)=>{
        // Update user status logic would go here
        alert(`Changing status for user ${userId} to ${newStatus}`);
    };
    const handleDeleteUser = (userId)=>{
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            // Delete user logic would go here
            alert(`Deleting user ${userId}`);
        // In reality, you would call the API and then remove from state
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "User Management"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 395,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "loading",
                        children: "Loading users..."
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 396,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 394,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "User Management"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 406,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "error-message",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 408,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 407,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 405,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "User Management"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "user-header",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "search-filter",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search users...",
                                    value: searchTerm,
                                    onChange: handleSearchChange,
                                    className: "search-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 420,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                    value: userType,
                                    onChange: handleFilterChange,
                                    className: "filter-select",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "all",
                                            children: "All Users"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 428,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "doctor",
                                            children: "Doctors"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 429,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "patient",
                                            children: "Patients"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "admin",
                                            children: "Administrators"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 431,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "staff",
                                            children: "Staff Members"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                    value: sortBy,
                                    onChange: handleSortChange,
                                    className: "sort-select",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "name",
                                            children: "Name (A-Z)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 435,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "recent",
                                            children: "Recently Active"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "status",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 437,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "role",
                                            children: "Role"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 438,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: "btn-primary",
                                    onClick: ()=>{
                                        // Add new user
                                        alert("Add new user functionality would go here");
                                    },
                                    children: "Add User"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "user-stats-summary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Total Users:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: users.length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 454,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Active Today:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 457,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: users.filter((u)=>u.isActiveToday).length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 457,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Verified Accounts:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 460,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: users.filter((u)=>u.isVerified).length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 461,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 459,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "stat-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Pending Verification:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 464,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: users.filter((u)=>!u.isVerified && u.requiresVerification).length
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "users-table",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 473,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 474,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                children: "Role"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                children: "Last Active"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 471,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                    children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            className: user.status === "active" ? "active-row" : user.status === "inactive" ? "inactive-row" : "pending-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "user-info",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "user-avatar",
                                                                children: user.name.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "user-name",
                                                                children: user.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: user.email
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `role-badge ${user.role.toLowerCase()}`,
                                                        children: user.role.charAt(0).toUpperCase() + user.role.slice(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `status-badge ${user.status.toLowerCase()}`,
                                                        children: user.status.charAt(0).toUpperCase() + user.status.slice(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 505,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: user.lastActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "last-active",
                                                        children: user.lastActive === "today" ? "Today" : user.lastActive === "yesterday" ? "Yesterday" : user.lastActive
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "last-active",
                                                        children: "Never"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    className: "actions-cell",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "action-buttons",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm",
                                                                onClick: ()=>{
                                                                    // View user details
                                                                    alert(`Viewing details for user ${user.id}`);
                                                                },
                                                                children: "Details"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 525,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-outline",
                                                                onClick: ()=>{
                                                                    // Edit user
                                                                    alert(`Editing user ${user.id}`);
                                                                },
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                value: user.status,
                                                                onChange: (e)=>handleStatusChange(user.id, e.target.value),
                                                                className: "status-select",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "active",
                                                                        children: "Active"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 548,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "inactive",
                                                                        children: "Inactive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 549,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "suspended",
                                                                        children: "Suspended"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 550,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "pending",
                                                                        children: "Pending Verification"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 551,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-danger",
                                                                onClick: ()=>{
                                                                    handleDeleteUser(user.id);
                                                                },
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, user.id, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 483,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 481,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 470,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this),
                    users.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "empty-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "No Users Found"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "No users match your current filters."
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 572,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: ()=>{
                                    // Add new user
                                    alert("Add new user functionality would go here");
                                },
                                children: "Add First User"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 573,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 570,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 415,
        columnNumber: 5
    }, this);
}
// System Monitoring Page
function SystemMonitoringPage() {
    const { data: metrics = {}, isLoading: loadingMetrics } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "systemMetrics"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getSystemMetrics().then((res)=>res.data),
        retry: false
    });
    const { data: alerts = [], isLoading: loadingAlerts } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "systemAlerts"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getSystemAlerts().then((res)=>res.data),
        retry: false
    });
    const { data: services = [], isLoading: loadingServices } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["useQuery"])({
        queryKey: [
            "servicesStatus"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$services$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["apiService"].admin.getServicesStatus().then((res)=>res.data),
        retry: false
    });
    const isLoading = loadingMetrics || loadingAlerts || loadingServices;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "System Monitoring"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 620,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "loading",
                        children: "Loading system data..."
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 622,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 621,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 619,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "System Monitoring"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "monitoring-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "monitoring-stats",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Overall Health"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 635,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `status-health ${metrics?.overallHealth?.toLowerCase() || "healthy"}`,
                                                    children: metrics?.overallHealth?.toUpperCase() || "HEALTHY"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 636,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 634,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "CPU Usage"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 645,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    metrics?.cpuUsage || "0",
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 646,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 644,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Memory Usage"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 649,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    metrics?.memoryUsage || "0",
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 650,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 648,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Disk Usage"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 653,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    metrics?.diskUsage || "0",
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 654,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 652,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Network I/O"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 657,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-value",
                                                children: [
                                                    metrics?.networkIO || "0",
                                                    " MB/s"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 658,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 656,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-outline",
                                onClick: ()=>{
                                    // Refresh metrics
                                    alert("Refreshing system metrics...");
                                },
                                children: "Refresh Data"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 661,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 632,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "monitoring-modules",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "monitoring-module",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: "Service Status"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 674,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "services-list",
                                        children: services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: `service-item ${service.status?.toLowerCase() || "unknown"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "service-info",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                children: service.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 689,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                children: service.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 690,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "service-status",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: `status ${service.status?.toLowerCase() || "unknown"}`,
                                                                children: service.status?.toUpperCase() || "UNKNOWN"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 693,
                                                                columnNumber: 23
                                                            }, this),
                                                            service.responseTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "response-time",
                                                                children: [
                                                                    service.responseTime,
                                                                    "ms"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "service-actions",
                                                        children: [
                                                            service.status !== "running" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm",
                                                                onClick: ()=>{
                                                                    alert(`Restarting service ${service.name}`);
                                                                },
                                                                children: "Restart"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 702,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-outline",
                                                                onClick: ()=>{
                                                                    alert(`View logs for ${service.name}`);
                                                                },
                                                                children: "View Logs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 711,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, service.id, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 684,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 675,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 673,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "monitoring-module",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: "Active Alerts"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 727,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "alerts-list",
                                        children: alerts.length > 0 ? alerts.map((alertItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: `alert-item alert-${alertItem.severity?.toLowerCase() || "info"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "alert-header",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                children: alertItem.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 745,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "alert-severity",
                                                                children: alertItem.severity?.toUpperCase() || "INFO"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 746,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 744,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "alert-body",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                children: alertItem.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 751,
                                                                columnNumber: 25
                                                            }, this),
                                                            alertItem.metadata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "alert-metadata",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                                    children: Object.entries(alertItem.metadata).map(([k, v])=>`${k}: ${v}`).join(", ")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                    lineNumber: 754,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 753,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "alert-footer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                                className: "alert-time",
                                                                children: new Date(alertItem.timestamp).toLocaleString()
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 25
                                                            }, this),
                                                            alertItem.actionRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm",
                                                                onClick: ()=>{
                                                                    alert(`Taking action on alert ${alertItem.id}`);
                                                                },
                                                                children: "Take Action"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 767,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "btn-action btn-sm btn-outline",
                                                                onClick: ()=>{
                                                                    alert(`Acknowledging alert ${alertItem.id}`);
                                                                },
                                                                children: "Acknowledge"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 776,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, alertItem.id, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 740,
                                                columnNumber: 21
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "no-alerts",
                                            children: "No active alerts"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 789,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 728,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 726,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "monitoring-module",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: "Performance Trends"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 795,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "trends-chart",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "chart-placeholder",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                    children: "CPU & Memory Usage (Last 24h)"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 798,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    children: "Chart visualization would go here"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 799,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "chart-controls",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: "btn-outline btn-sm",
                                                            onClick: ()=>{
                                                                alert("Export chart data");
                                                            },
                                                            children: "Export Data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 801,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: "btn-outline btn-sm",
                                                            onClick: ()=>{
                                                                alert("Change time range");
                                                            },
                                                            children: "Time Range"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 809,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 797,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 796,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 794,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 672,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "monitoring-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: ()=>{
                                    alert("Running system diagnostics...");
                                },
                                children: "Run Diagnostics"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 824,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-outline",
                                onClick: ()=>{
                                    alert("Generating system health report...");
                                },
                                children: "Generate Report"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 832,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-outline",
                                onClick: ()=>{
                                    alert("Opening maintenance mode...");
                                },
                                children: "Maintenance Mode"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 840,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 823,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 631,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 629,
        columnNumber: 5
    }, this);
}
// Reports & Analytics Page
function ReportsAnalyticsPage() {
    const [reportType, setReportType] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("usage");
    const [dateRange, setDateRange] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("last7days");
    const [reportData, setReportData] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(null);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(false);
    const generateReport = async ()=>{
        setLoading(true);
        try {
            // Simulate API call
            const reportDataMap = {
                usage: {
                    last7days: {
                        dailyActiveUsers: [
                            120,
                            135,
                            110,
                            142,
                            158,
                            165,
                            140
                        ],
                        pageViews: [
                            2400,
                            2650,
                            2100,
                            2980,
                            3200,
                            3400,
                            2800
                        ],
                        apiCalls: [
                            15000,
                            16500,
                            14000,
                            18200,
                            20500,
                            22000,
                            18500
                        ]
                    },
                    last30days: {
                        weeklyActiveUsers: [
                            850,
                            920,
                            880,
                            950
                        ],
                        monthlyGrowth: 12.5,
                        peakConcurrentUsers: 450
                    }
                },
                performance: {
                    last7days: {
                        avgResponseTime: [
                            120,
                            115,
                            130,
                            110,
                            105,
                            100,
                            115
                        ],
                        errorRate: [
                            0.2,
                            0.1,
                            0.3,
                            0.1,
                            0.0,
                            0.2,
                            0.1
                        ],
                        uptime: [
                            99.8,
                            99.9,
                            99.7,
                            99.9,
                            100.0,
                            99.8,
                            99.9
                        ]
                    },
                    last30days: {
                        avgResponseTime: 115,
                        errorRate: 0.15,
                        uptime: 99.85
                    }
                },
                security: {
                    last7days: {
                        loginAttempts: [
                            450,
                            480,
                            420,
                            520,
                            580,
                            610,
                            550
                        ],
                        failedLogins: [
                            25,
                            30,
                            20,
                            35,
                            40,
                            45,
                            35
                        ],
                        blockedIPs: [
                            5,
                            8,
                            3,
                            12,
                            15,
                            18,
                            10
                        ]
                    },
                    last30days: {
                        totalLoginAttempts: 18500,
                        securityIncidents: 3,
                        dataBreaches: 0
                    }
                },
                financial: {},
                compliance: {}
            };
            // Using any type to bypass TypeScript strictness for this mock data
            const mockData = reportDataMap[reportType]?.[dateRange] || {};
            // Explicitly type the reportData state to avoid TypeScript errors
            setReportData(mockData || null);
        } catch (error) {
            console.error("Error generating report:", error);
            alert("Failed to generate report. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "Reports & Analytics"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 921,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "report-controls",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "control-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        htmlFor: "reportType",
                                        children: "Report Type:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 925,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        id: "reportType",
                                        value: reportType,
                                        onChange: (e)=>setReportType(e.target.value),
                                        className: "form-select",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "usage",
                                                children: "Usage Statistics"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 932,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "performance",
                                                children: "Performance Metrics"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 933,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "security",
                                                children: "Security Reports"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 934,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "financial",
                                                children: "Financial Reports"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 935,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "compliance",
                                                children: "Compliance Reports"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 936,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 926,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 924,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "control-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        htmlFor: "dateRange",
                                        children: "Date Range:"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 940,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        id: "dateRange",
                                        value: dateRange,
                                        onChange: (e)=>setDateRange(e.target.value),
                                        className: "form-select",
                                        children: [
                                            reportType === "usage" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last7days",
                                                        children: "Last 7 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 949,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "ytd",
                                                        children: "Year to Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "performance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last7days",
                                                        children: "Last 7 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 957,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 958,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "security" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last7days",
                                                        children: "Last 7 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 964,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 965,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 966,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "financial" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 971,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 972,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "ytd",
                                                        children: "Year to Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true),
                                            reportType === "compliance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last30days",
                                                        children: "Last 30 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 978,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "last90days",
                                                        children: "Last 90 Days"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "ytd",
                                                        children: "Year to Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 941,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 939,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: generateReport,
                                disabled: loading,
                                children: loading ? "Generating..." : "Generate Report"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 985,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 923,
                        columnNumber: 9
                    }, this),
                    reportData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "report-results",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: [
                                    reportType.charAt(0).toUpperCase() + reportType.slice(1),
                                    " Report -",
                                    dateRange.replace(/([A-Z])/g, " $1").toUpperCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 992,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "report-content",
                                children: [
                                    reportType === "usage" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Daily Active Users"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1000,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.dailyActiveUsers?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1001,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 999,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Page Views"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1006,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.pageViews?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1008,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1007,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1005,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "API Calls"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1012,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.apiCalls?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1014,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1013,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1011,
                                                columnNumber: 19
                                            }, this),
                                            reportData.monthlyGrowth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Monthly Growth"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1019,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                reportData.monthlyGrowth,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1021,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 21
                                            }, this),
                                            reportData.peakConcurrentUsers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Peak Concurrent Users"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: reportData.peakConcurrentUsers
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1029,
                                                                columnNumber: 25
                                                            }, this),
                                                            " users"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1028,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1026,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "performance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Average Response Time (ms)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1038,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.avgResponseTime?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1040,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1039,
                                                        columnNumber: 21
                                                    }, this),
                                                    reportData.avgResponseTime !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "report-summary",
                                                        children: [
                                                            "Average:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    reportData.avgResponseTime.reduce((a, b)=>a + b, 0) / reportData.avgResponseTime.length,
                                                                    "ms"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1045,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1043,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Error Rate (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1056,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.errorRate?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1058,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1057,
                                                        columnNumber: 21
                                                    }, this),
                                                    reportData.errorRate !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "report-summary",
                                                        children: [
                                                            "Average:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    (reportData.errorRate.reduce((a, b)=>a + b, 0) / reportData.errorRate.length).toFixed(2),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1063,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1061,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1055,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "System Uptime (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1076,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.uptime?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1078,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1077,
                                                        columnNumber: 21
                                                    }, this),
                                                    reportData.uptime !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "report-summary",
                                                        children: [
                                                            "Average:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    (reportData.uptime.reduce((a, b)=>a + b, 0) / reportData.uptime.length).toFixed(2),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1083,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1081,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1075,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "security" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Login Attempts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1098,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.loginAttempts?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1100,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1099,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1097,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Failed Login Attempts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.failedLogins?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1106,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1103,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Blocked IP Addresses"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chart-placeholder",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            children: reportData.blockedIPs?.join(", ") || "No data"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1112,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 19
                                            }, this),
                                            reportData.securityIncidents !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Security Incidents"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1117,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: reportData.securityIncidents
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1119,
                                                                columnNumber: 25
                                                            }, this),
                                                            " incidents"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1118,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 21
                                            }, this),
                                            reportData.dataBreaches !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Data Breaches"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1125,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: reportData.dataBreaches
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1127,
                                                                columnNumber: 25
                                                            }, this),
                                                            " breaches"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1126,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1124,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "financial" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Monthly Revenue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1136,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: "$245,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1138,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1137,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1135,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Monthly Expenses"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1142,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: "$198,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1144,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1143,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1141,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Net Income"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1148,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: "$47,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1150,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1149,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1147,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "ROI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1154,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: "12.3%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1156,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1155,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    reportType === "compliance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "HIPAA Compliance Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1164,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: "98.5%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1166,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1165,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1163,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Data Privacy Compliance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1170,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: "Compliant"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1171,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1169,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "report-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: "Audit Trail Completeness"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1176,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: "99.2%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1178,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1177,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1175,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 996,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 991,
                        columnNumber: 11
                    }, this),
                    !reportData && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "report-placeholder",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: 'Select report type and date range, then click "Generate Report" to view results.'
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 1189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1188,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 922,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 920,
        columnNumber: 5
    }, this);
}
// Settings Page for System Admin
function SettingsPage() {
    const [activeTab, setActiveTab] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("general");
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "System Settings"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 1204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "settings-tabs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: `${activeTab === "general" ? "active" : ""}`,
                                onClick: ()=>setActiveTab("general"),
                                children: "General Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: `${activeTab === "security" ? "active" : ""}`,
                                onClick: ()=>setActiveTab("security"),
                                children: "Security Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: `${activeTab === "integrations" ? "active" : ""}`,
                                onClick: ()=>setActiveTab("integrations"),
                                children: "Integrations"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: `${activeTab === "notifications" ? "active" : ""}`,
                                onClick: ()=>setActiveTab("notifications"),
                                children: "Notification Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: `${activeTab === "backup" ? "active" : ""}`,
                                onClick: ()=>setActiveTab("backup"),
                                children: "Backup & Recovery"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1206,
                        columnNumber: 9
                    }, this),
                    activeTab === "general" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "General System Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1241,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                className: "settings-form",
                                onSubmit: (e)=>{
                                    e.preventDefault();
                                    // Save settings logic
                                    alert("General settings saved");
                                    setLoading(true);
                                    setTimeout(()=>setLoading(false), 1000);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                htmlFor: "systemName",
                                                children: "System Name:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "systemName",
                                                defaultValue: "UPCHAR Platform",
                                                className: "form-input"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1254,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1252,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                htmlFor: "organization",
                                                children: "Organization:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1262,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "organization",
                                                defaultValue: "UPCHAR Healthcare Systems",
                                                className: "form-input"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1263,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                htmlFor: "contactEmail",
                                                children: "Contact Email:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1271,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                id: "contactEmail",
                                                defaultValue: "admin@upchar.com",
                                                className: "form-input"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1272,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                htmlFor: "timezone",
                                                children: "System Timezone:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1280,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                id: "timezone",
                                                className: "form-input",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "UTC",
                                                        children: "UTC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1282,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "EST",
                                                        children: "Eastern Standard Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1283,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "PST",
                                                        children: "Pacific Standard Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1284,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "GMT",
                                                        children: "Greenwich Mean Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1285,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1281,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1279,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                htmlFor: "dateFormat",
                                                children: "Date Format:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                id: "dateFormat",
                                                className: "form-input",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "MM/DD/YYYY",
                                                        children: "MM/DD/YYYY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1291,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "DD/MM/YYYY",
                                                        children: "DD/MM/YYYY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1292,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "YYYY-MM-DD",
                                                        children: "YYYY-MM-DD"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1293,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1290,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                htmlFor: "language",
                                                children: "Default Language:"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1297,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                id: "language",
                                                className: "form-input",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "en",
                                                        children: "English"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1299,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "es",
                                                        children: "Spanish"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1300,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "fr",
                                                        children: "French"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1301,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "de",
                                                        children: "German"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1302,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1298,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "btn-primary",
                                                disabled: loading,
                                                children: loading ? "Saving..." : "Save Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1306,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "btn-outline",
                                                children: "Reset to Defaults"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1309,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1305,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1242,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1240,
                        columnNumber: 11
                    }, this),
                    activeTab === "security" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "Security Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1319,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "security-settings",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "setting-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Authentication"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1322,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "passwordPolicy",
                                                        children: "Password Policy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1324,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "passwordPolicy",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "standard",
                                                                children: "Standard (8+ chars)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1326,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "strong",
                                                                children: "Strong (12+ chars, numbers, special)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1327,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "strict",
                                                                children: "Strict (16+ chars, uppercase, lowercase, numbers, special)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1328,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1325,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1323,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "mfaRequirement",
                                                        children: "Multi-Factor Authentication"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1334,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "mfaRequirement",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "optional",
                                                                children: "Optional"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1336,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "requiredForAdmins",
                                                                children: "Required for Admins"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1337,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "requiredForAll",
                                                                children: "Required for All Users"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1338,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1335,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1333,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "sessionTimeout",
                                                        children: "Session Timeout"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1342,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "sessionTimeout",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "15",
                                                                children: "15 minutes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1344,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "30",
                                                                children: "30 minutes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1345,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "60",
                                                                children: "1 hour"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1346,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "240",
                                                                children: "4 hours"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1347,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "1440",
                                                                children: "24 hours"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1348,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1343,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1341,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "loginAttempts",
                                                        children: "Max Login Attempts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1352,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "loginAttempts",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "3",
                                                                children: "3 attempts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1354,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "5",
                                                                children: "5 attempts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1355,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "10",
                                                                children: "10 attempts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1356,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1353,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1351,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1321,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "setting-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Data Protection"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1361,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "dataEncryption",
                                                        children: "Data Encryption at Rest"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1363,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "dataEncryption",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1365,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1366,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1364,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1362,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "dataEncryption",
                                                        children: "Data Encryption in Transit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1370,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "dataEncryption",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1372,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1373,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1371,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1369,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "backupEncryption",
                                                        children: "Backup Encryption"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1377,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "backupEncryption",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1379,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1380,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1378,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1376,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "auditLogging",
                                                        children: "Audit Logging"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1384,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "auditLogging",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1386,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1387,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1385,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1383,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1360,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "setting-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Access Control"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1392,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "ipWhitelisting",
                                                        children: "IP Whitelisting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1394,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "ipWhitelisting",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "none",
                                                                children: "None"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1396,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "adminOnly",
                                                                children: "Admin Only"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1397,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "custom",
                                                                children: "Custom List"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1398,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1395,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1393,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "rateLimiting",
                                                        children: "Rate Limiting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1402,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "rateLimiting",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1404,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1405,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1403,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1401,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "setting-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        htmlFor: "contentFiltering",
                                                        children: "Content Filtering"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1409,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                        id: "contentFiltering",
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "disabled",
                                                                children: "Disabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1411,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                value: "enabled",
                                                                children: "Enabled"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1412,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1410,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1408,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "form-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "btn-primary",
                                                        disabled: loading,
                                                        children: loading ? "Saving..." : "Save Settings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1416,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "btn-outline",
                                                        children: "Reset to Defaults"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1419,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1415,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1320,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1318,
                        columnNumber: 11
                    }, this),
                    activeTab === "integrations" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "Third-Party Integrations"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1430,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "integrations-list",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Electronic Health Records (EHR)"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1433,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1435,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1434,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1439,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Epic Systems"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1438,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1442,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 2:30 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1441,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Records Synced:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1445,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 12,450"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1444,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1437,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Force sync with EHR system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1449,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1457,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Configure EHR integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1465,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1448,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1432,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Medical Billing System"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1478,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1477,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1482,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Medisoft"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1481,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1485,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 1:15 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1484,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Claims Processed:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1488,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 8,920"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1487,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1480,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Force sync with billing system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1492,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1500,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Configure billing integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1508,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1491,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Laboratory Information System (LIS)"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1519,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1521,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1520,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1525,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Cerner Lab"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1524,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1528,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 3:00 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1527,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Test Results:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1531,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 15,680"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1530,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1523,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Force sync with LIS system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1535,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1543,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Configure LIS integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1551,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1534,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1518,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Pharmacy Management System"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1562,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1564,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1563,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1568,
                                                                columnNumber: 21
                                                            }, this),
                                                            " McKesson Pharmacy"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1567,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1571,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Today, 2:45 AM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1570,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Prescriptions Processed:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1574,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 22,150"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1573,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1566,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Force sync with pharmacy system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1578,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1586,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Configure pharmacy integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1594,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1577,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1561,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "integration-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Appointment Scheduling System"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1605,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-status",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "status connected",
                                                    children: "Connected"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1607,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1606,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Provider:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1611,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Zocdoc Healthcare"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1610,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Last Sync:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1614,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Yesterday, 11:30 PM"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1613,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: "Appointments Synced:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 1617,
                                                                columnNumber: 21
                                                            }, this),
                                                            " 5,420"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1616,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1609,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "integration-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Force sync with scheduling system");
                                                        },
                                                        children: "Force Sync"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1621,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("View integration logs");
                                                        },
                                                        children: "View Logs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1629,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-action",
                                                        onClick: ()=>{
                                                            alert("Configure scheduling integration settings");
                                                        },
                                                        children: "Configure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1637,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1620,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1604,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1431,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-primary",
                                onClick: ()=>{
                                    alert("Add new integration");
                                },
                                children: "Add Integration"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1648,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1429,
                        columnNumber: 11
                    }, this),
                    activeTab === "notifications" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "Notification Settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1661,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "notification-preferences",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "preference-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Email Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1664,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailSystemAlerts",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailSystemAlerts",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1667,
                                                            columnNumber: 21
                                                        }, this),
                                                        "System Alerts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1666,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1665,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailSecurityAlerts",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailSecurityAlerts",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1673,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Security Alerts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1672,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1671,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailWeeklyReports",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailWeeklyReports",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1679,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Weekly Reports"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1678,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1677,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailMonthlyReports",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailMonthlyReports",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1685,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Monthly Reports"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1684,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1683,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1663,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "preference-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "In-App Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1691,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "inAppSystemUpdates",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "inAppSystemUpdates",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1694,
                                                            columnNumber: 21
                                                        }, this),
                                                        "System Updates"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1693,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1692,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "inAppMessageAlerts",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "inAppMessageAlerts",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1700,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Message Alerts"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1699,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1698,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "inAppReminders",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "inAppReminders",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1706,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Reminders"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1705,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1704,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1690,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "preference-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Notification Channels"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1712,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "slackIntegration",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "slackIntegration",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1715,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Slack Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1714,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1713,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "emailNotifications",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "emailNotifications",
                                                            checked: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1721,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Email Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1720,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1719,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "smsNotifications",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "smsNotifications",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1727,
                                                            columnNumber: 21
                                                        }, this),
                                                        "SMS Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1726,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1725,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "preference-item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "webhookNotifications",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            id: "webhookNotifications",
                                                            checked: false
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 1733,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Webhook Notifications"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 1732,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1731,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1711,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "form-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "btn-primary",
                                                disabled: loading,
                                                children: loading ? "Saving..." : "Save Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1739,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "btn-outline",
                                                children: "Reset to Defaults"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1742,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1738,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1662,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1660,
                        columnNumber: 11
                    }, this),
                    activeTab === "backup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "settings-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "Backup & Recovery"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1752,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "backup-status",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "backup-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Last Backup"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1755,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Date:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1757,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Today, 2:00 AM"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1756,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Type:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1760,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Full Backup"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1759,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Size:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1763,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 45.2 GB"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1762,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Location:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1766,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Primary Storage"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1765,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1754,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "backup-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Backup Schedule"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1770,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Frequency:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1772,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Daily"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1771,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Time:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1775,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 2:00 AM"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1774,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Retention:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1778,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 30 days"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1777,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1769,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "backup-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Disaster Recovery"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1782,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "RPO:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1784,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 4 hours"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1783,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "RTO:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1787,
                                                        columnNumber: 19
                                                    }, this),
                                                    " 2 hours"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1786,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        children: "Secondary Site:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 1790,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Active"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 1789,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1781,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1753,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "backup-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn-primary",
                                        onClick: ()=>{
                                            alert("Initiate manual backup");
                                        },
                                        children: "Backup Now"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1795,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn-outline",
                                        onClick: ()=>{
                                            alert("Test disaster recovery plan");
                                        },
                                        children: "Test Recovery"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1803,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "btn-outline",
                                        onClick: ()=>{
                                            alert("Modify backup schedule");
                                        },
                                        children: "Modify Schedule"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 1811,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 1794,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 1751,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 1205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 1203,
        columnNumber: 5
    }, this);
}
// Chat Page
function ChatPage() {
    const [conversations, setConversations] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState([]);
    const [messages, setMessages] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState([]);
    const [inputValue, setInputValue] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [selectedConversationId, setSelectedConversationId] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(null);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(false);
    const [typingUsers, setTypingUsers] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState([]);
    const messagesEndRef = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useRef(null);
    // Load messages for a conversation
    const loadMessages = async (conversationId)=>{
        setIsLoading(true);
        try {
            // In a real app, this would call an API
            // For now, we'll simulate with mock data
            const mockMessages = [
                {
                    id: "1",
                    conversationId: conversationId,
                    senderId: "staff1",
                    content: "Patient in room 305 needs immediate attention",
                    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
                },
                {
                    id: "2",
                    conversationId: conversationId,
                    senderId: "user",
                    content: "On my way to check on them now",
                    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString()
                },
                {
                    id: "3",
                    conversationId: conversationId,
                    senderId: "staff1",
                    content: "Thanks, they're experiencing chest pain",
                    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
                }
            ];
            setMessages(mockMessages);
        } catch (error) {
            console.error("Failed to load messages:", error);
        } finally{
            setIsLoading(false);
        }
    };
    __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useEffect(()=>{
        // Load conversations
        const loadConversations = async ()=>{
            setIsLoading(true);
            try {
                // In a real app, this would call an API
                // For now, we'll simulate with mock data
                const mockConversations = [
                    {
                        id: "1",
                        participants: [
                            {
                                id: "staff1",
                                name: "Dr. Smith",
                                role: "physician"
                            }
                        ],
                        lastMessage: "Patient in room 305 needs immediate attention",
                        lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
                        unreadCount: 2
                    },
                    {
                        id: "2",
                        participants: [
                            {
                                id: "staff2",
                                name: "Nurse Johnson",
                                role: "nurse"
                            }
                        ],
                        lastMessage: "Medication administered for patient in ICU",
                        lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
                        unreadCount: 0
                    },
                    {
                        id: "3",
                        participants: [
                            {
                                id: "staff3",
                                name: "Dr. Williams",
                                role: "surgeon"
                            }
                        ],
                        lastMessage: "OR 2 is ready for the 3PM procedure",
                        lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
                        unreadCount: 0
                    }
                ];
                setConversations(mockConversations);
                if (mockConversations.length > 0) {
                    setSelectedConversationId(mockConversations[0].id);
                    loadMessages(mockConversations[0].id);
                }
            } catch (error) {
                console.error("Failed to load conversations:", error);
            } finally{
                setIsLoading(false);
            }
        };
        loadConversations();
    }, []);
    __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useEffect(()=>{
        if (selectedConversationId) {
            loadMessages(selectedConversationId);
        }
    }, [
        selectedConversationId
    ]);
    // Simulate typing indicator (would be replaced with real-time updates)
    __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useEffect(()=>{
        if (selectedConversationId) {
            const typingInterval = setInterval(()=>{
                // Simulate random typing indicators
                if (Math.random() > 0.7) {
                    setTypingUsers([
                        "Someone is typing..."
                    ]);
                } else {
                    setTypingUsers([]);
                }
            }, 3000);
            return ()=>clearInterval(typingInterval);
        }
    }, [
        selectedConversationId
    ]);
    // Scroll to bottom when messages change
    __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useEffect(()=>{
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [
        messages
    ]);
    const sendMessage = async (e)=>{
        e.preventDefault();
        if (!inputValue.trim() || !selectedConversationId) return;
        try {
            // In a real app, this would call an API
            // For now, we'll simulate the message sending
            const newMessage = {
                id: Date.now().toString(),
                conversationId: selectedConversationId,
                senderId: "user",
                content: inputValue,
                timestamp: new Date().toISOString()
            };
            setMessages((prev)=>[
                    ...prev,
                    newMessage
                ]);
            setInputValue("");
            // Scroll to bottom after sending
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({
                    behavior: "smooth"
                });
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please try again.");
        }
    };
    // Handle Enter key press
    const handleKeyPress = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e); // Actually send the message when Enter is pressed
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "Messages"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2001,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "loading",
                        children: "Loading messages..."
                    }, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2003,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2002,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2000,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "Messages"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2011,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "chat-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "chat-sidebar",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    children: "Conversations"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2015,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: "btn-primary",
                                    onClick: ()=>{
                                        // Start new conversation
                                        alert("Start new conversation functionality would go here");
                                    },
                                    children: "New Message"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2016,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "conversations-list",
                                    children: conversations.length > 0 ? conversations.map((conversation)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: `conversation-item ${conversation.id === selectedConversationId ? "active" : ""}`,
                                            onClick: ()=>setSelectedConversationId(conversation.id),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "conversation-avatar",
                                                    children: conversation.participants[0]?.name.charAt(0).toUpperCase() || "?"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2033,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "conversation-info",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                            children: conversation.participants[0]?.name || "Unknown User"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2037,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "conversation-preview",
                                                            children: conversation.lastMessage || "No messages yet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2038,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2036,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "conversation-meta",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                            children: conversation.lastUpdated ? new Date(conversation.lastUpdated).toLocaleTimeString() : ""
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2043,
                                                            columnNumber: 23
                                                        }, this),
                                                        conversation.unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "unread-badge",
                                                            children: conversation.unreadCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2049,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2042,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, conversation.id, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 2028,
                                            columnNumber: 19
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "empty-state",
                                        children: "No conversations yet. Start a new conversation!"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2055,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2025,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2014,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "chat-main",
                            children: !selectedConversationId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "chat-empty",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: "Select a conversation to get started"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2062,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: "Choose a conversation from the list or start a new one."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2063,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2061,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "chat-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "chat-user-info",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chat-user-avatar",
                                                        children: conversations.find((c)=>c.id === selectedConversationId)?.participants[0]?.name.charAt(0).toUpperCase() || "?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2069,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "chat-user-details",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                children: conversations.find((c)=>c.id === selectedConversationId)?.participants[0]?.name || "Unknown User"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2076,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "chat-user-status",
                                                                children: "Online"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2080,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2075,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 2068,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "chat-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-icon",
                                                        onClick: ()=>{
                                                            // Video call
                                                            alert("Start video call");
                                                        },
                                                        children: "📹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2084,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-icon",
                                                        onClick: ()=>{
                                                            // Audio call
                                                            alert("Start audio call");
                                                        },
                                                        children: "📞"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2093,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-icon",
                                                        onClick: ()=>{
                                                            // Contact info
                                                            alert("View contact info");
                                                        },
                                                        children: "ℹ️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2102,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                lineNumber: 2083,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2067,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "chat-window",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "chat-messages",
                                            children: [
                                                (()=>{
                                                    const groupedMessages = messages.reduce((groups, message)=>{
                                                        const date = new Date(message.timestamp).toDateString();
                                                        if (!groups[date]) {
                                                            groups[date] = [];
                                                        }
                                                        groups[date].push(message);
                                                        return groups;
                                                    }, {});
                                                    return Object.keys(groupedMessages).map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "message-date-header",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: new Date(date).toLocaleDateString(undefined, {
                                                                            weekday: "long",
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric"
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 2134,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                    lineNumber: 2133,
                                                                    columnNumber: 27
                                                                }, this),
                                                                groupedMessages[date].map((message, msgIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: `message ${message.senderId === "user" ? "message-sent" : "message-received"}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: "message-content",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                    children: message.content
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                                    lineNumber: 2151,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                                                    className: "message-time",
                                                                                    children: new Date(message.timestamp).toLocaleTimeString([], {
                                                                                        hour: "2-digit",
                                                                                        minute: "2-digit"
                                                                                    })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                                    lineNumber: 2152,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                            lineNumber: 2150,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, `${date}-${msgIndex}`, false, {
                                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                        lineNumber: 2146,
                                                                        columnNumber: 29
                                                                    }, this))
                                                            ]
                                                        }, date, true, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2131,
                                                            columnNumber: 25
                                                        }, this));
                                                })(),
                                                typingUsers.map((user, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "typing-indicator",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "typing-dot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2168,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "typing-dot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2169,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "typing-dot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2170,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: user
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                                lineNumber: 2171,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2167,
                                                        columnNumber: 23
                                                    }, this)),
                                                messages.length === 0 && typingUsers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    ref: messagesEndRef,
                                                    className: "chat-empty",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: "No messages yet. Start the conversation!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                        lineNumber: 2177,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2176,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 2115,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                        onSubmit: sendMessage,
                                        className: "chat-input-form",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "chat-input-wrapper",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "chat-input-actions",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-icon",
                                                            onClick: ()=>{
                                                                // Emoji picker
                                                                alert("Emoji picker would open here");
                                                            },
                                                            children: "😊"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2186,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-icon",
                                                            onClick: ()=>{
                                                                // File attachment
                                                                alert("File picker would open here");
                                                            },
                                                            children: "📎"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                            lineNumber: 2196,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2185,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: inputValue,
                                                    onChange: (e)=>setInputValue(e.target.value),
                                                    onKeyPress: handleKeyPress,
                                                    placeholder: "Type a message...",
                                                    className: "chat-input"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2207,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "btn-primary",
                                                    children: "Send"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                                    lineNumber: 2215,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                            lineNumber: 2184,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2183,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2066,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2059,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2013,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2012,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2010,
        columnNumber: 5
    }, this);
}
// Login Page
function LoginPage(props) {
    const [email, setEmail] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(null);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await props.onLogin(email, password);
        } catch (err) {
            setError(err.message || "Login failed");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "auth-container",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "auth-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    children: "System Administrator Sign In"
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2252,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "email",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2255,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    id: "email",
                                    name: "email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2256,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "password",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "password",
                                    name: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2266,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "error-message",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2278,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "auth-button",
                            children: loading ? "Signing in..." : "Sign In"
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2279,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2253,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "auth-footer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: [
                            "Don't have an account? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "/register",
                                children: "Register"
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2285,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2284,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2283,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2251,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2250,
        columnNumber: 5
    }, this);
}
function RegisterPage() {
    const [email, setEmail] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [firstName, setFirstName] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [lastName, setLastName] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [confirmPassword, setConfirmPassword] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [error, setError] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState("");
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].useState(false);
    const { register } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await register({
                email,
                firstName,
                lastName,
                password
            });
            // On success, redirect to login
            window.location.href = "/login";
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Registration failed");
            } else {
                setError(String(err) || "Registration failed");
            }
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "Register"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "auth-form",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "email",
                                    children: "Email:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2342,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    id: "email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2343,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2341,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "firstName",
                                    children: "First Name:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2353,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "firstName",
                                    value: firstName,
                                    onChange: (e)=>setFirstName(e.target.value),
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2354,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "lastName",
                                    children: "Last Name:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2364,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "lastName",
                                    value: lastName,
                                    onChange: (e)=>setLastName(e.target.value),
                                    required: true,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2365,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2363,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "password",
                                    children: "Password:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    required: true,
                                    minLength: 8,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2376,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "confirmPassword",
                                    children: "Confirm Password:"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2387,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "confirmPassword",
                                    value: confirmPassword,
                                    onChange: (e)=>setConfirmPassword(e.target.value),
                                    required: true,
                                    minLength: 8,
                                    className: "form-input"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2388,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2386,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "error-message",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2398,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "auth-button",
                            children: loading ? "Registering..." : "Register"
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2399,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "auth-footer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: [
                                    "Already have an account? ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/login",
                                        children: "Sign In"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2404,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2403,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2402,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2340,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2337,
        columnNumber: 5
    }, this);
}
function NotFoundPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                children: "Page Not Found"
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2416,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "page-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    children: "The page you're looking for doesn't exist."
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2418,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2417,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2415,
        columnNumber: 5
    }, this);
}
const queryClientInstance = new __TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["QueryClient"]();
function App() {
    const { user, login, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$store$2f$useAuthStore$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["QueryClientProvider"], {
            client: queryClientInstance,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "App",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "page-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            children: "Admin Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2434,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "page-content",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "Please sign in to access the dashboard."
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2436,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                            lineNumber: 2435,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2433,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                lineNumber: 2432,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2431,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$tanstack$2f$react$2d$query__$5b$external$5d$__$2840$tanstack$2f$react$2d$query$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$29$__["QueryClientProvider"], {
        client: queryClientInstance,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "App",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                    className: "app-header",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "header-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "header-logo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "logo-text",
                                    children: "UPCHAR Admin"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                    lineNumber: 2450,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2449,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                                className: "header-nav",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2453,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "User Management"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2456,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "System Monitoring"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2459,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Reports & Analytics"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2462,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2465,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "nav-link",
                                        type: "button",
                                        children: "Chat"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2468,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: logout,
                                        className: "btn-logout",
                                        children: "Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                        lineNumber: 2471,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                                lineNumber: 2452,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2448,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2447,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                    className: "app-main",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(DashboardPage, {}, void 0, false, {
                        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                        lineNumber: 2479,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin-dashboard/src/App.tsx",
                    lineNumber: 2478,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin-dashboard/src/App.tsx",
            lineNumber: 2446,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/admin-dashboard/src/App.tsx",
        lineNumber: 2445,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = App;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/admin-dashboard/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// @ts-nocheck
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$App$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin-dashboard/src/App.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$App$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$App$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2d$dashboard$2f$src$2f$App$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0i-jy3_._.js.map