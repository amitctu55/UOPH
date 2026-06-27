# Admin Dashboard

This is the administrator-facing dashboard for the UPCHAR Healthcare Platform. It provides platform administrators with tools to manage the entire healthcare ecosystem, including user management, system configuration, compliance monitoring, and analytics.

## Features

- **User Management**: Create, edit, and deactivate user accounts (patients, doctors, hospital staff, administrators)
- **Role & Permission Management**: Configure role-based access control (RBAC) and permissions
- **System Configuration**: Manage platform-wide settings, integrations, and feature flags
- **Compliance Monitoring**: Track HIPAA, GDPR, and other regulatory compliance metrics
- **Security Administration**: Manage audit logs, security alerts, and access controls
- **Platform Analytics**: Comprehensive usage metrics, performance monitoring, and business intelligence
- **Content Management**: Manage website content, FAQs, and patient education materials
- **Support & Ticketing**: View and respond to user support tickets and feedback
- **Billing Administration**: Oversee payment processing, invoicing, and financial operations
- **Notification Management**: Configure and monitor communication templates and delivery

## Technology Stack

- React 18
- React Router v6
- Zustand (state management)
- React Query (data fetching)
- TypeScript
- CSS Modules

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## API Integration

This dashboard integrates with the following backend services:
- Auth Service: `/api/auth/*`
- User Service: `/api/users/*`
- Role Service: `/api/roles/*`
- Settings Service: `/api/settings/*`
- Audit Service: `/api/audit/*`
- Analytics Service: `/api/analytics/*`
- Support Service: `/api/support/*`
- Notification Service: `/api/notifications/*`
- Billing Service: `/api/billing/*`