# Security Baseline

## Core security principles
- Least privilege access for all identities and services
- Defense in depth across network, app, and data layers
- Auditability and traceability for sensitive operations
- Privacy-by-design for patient health data

## Identity and access
- Central authentication service with JWT and refresh tokens
- Role-based access control (RBAC) for patient, doctor, hospital, admin scopes
- MFA-ready flows and OAuth support
- Token rotation and revocation strategies

## Data protection
- Encryption in transit using TLS for all APIs and ingress
- Encryption at rest for PostgreSQL, Redis, Blob Storage, and Key Vault secrets
- Secure file upload validation for medical records
- Audit logging for access to PHI-like resources

## Application hardening
- CSRF protection on browser forms where session cookies are used
- Content security policy and secure HTTP headers
- Parameterized database access to prevent SQL injection
- Input validation across all service endpoints

## Compliance guardrails
- GDPR-ready consent and data retention patterns
- HIPAA-inspired privacy and breach minimization controls
- Data classification for sensitive personal and healthcare records
- Secure SDLC practices including dependency scanning and infrastructure review
