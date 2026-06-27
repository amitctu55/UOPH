# System Architecture

## Overview
The UPCHAR platform is designed as a domain-driven, cloud-native healthcare system with a clear separation between frontend applications, backend services, infrastructure, and operations.

### Key design principles
- Domain-bounded services for patient, doctor, hospital, billing, and search
- API Gateway for synchronous request routing and authentication enforcement
- Asynchronous event delivery for notifications, analytics, and workflow decoupling
- Repeatable infrastructure using Terraform and Kubernetes manifests
- Multi-zone resilience for AKS production readiness
- Observability by default with metrics, logs, and tracing

## Monorepo Layout
- `apps/` contains browser-based applications and dashboards
- `mobile/` contains React Native mobile apps
- `services/` contains NestJS microservices with their own modules and contracts
- `infra/` contains Terraform, AKS, Helm, and GitOps manifests
- `docs/` contains architecture, devops, security, and roadmap documentation

## Service Contract Example
Each backend service should provide:
- REST API endpoints and health probe
- OpenAPI/Swagger documentation
- Request validation and structured error handling
- Configuration via environment variables
- Logging and observability hooks

## Security and Compliance
- Central identity service with JWT and refresh tokens
- RBAC enforced at API gateway and service layers
- Audit logging for sensitive workflows
- Data classification and encryption at rest/transit
- HIPAA-inspired privacy and breach minimization controls

## Deployment Flow
1. Code and manifest changes are committed to GitHub.
2. GitHub Actions runs lint, test, build, and container image publish.
3. ArgoCD syncs manifests from GitOps repository branches to AKS environments.
4. Monitoring stack validates service health and alerts on violations.

## Next Steps
- Expand each service scaffold into a working NestJS project
- Add Terraform modules for Azure AKS, PostgreSQL, Redis, Blob Storage, and Key Vault
- Define API gateway routing and auth policies
- Implement initial public website and design system in `apps/public-website`
