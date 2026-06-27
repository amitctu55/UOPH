# DevOps Blueprint

## Vision
Create a repeatable, observable, and secure delivery pipeline for UPCHAR using GitHub Actions for CI and ArgoCD for continuous deployment.

## Environment Strategy
- `dev`: developer previews and integration testing
- `staging`: pre-production validation and UAT
- `prod`: production-grade AKS cluster with multi-zone resilience

## GitOps Flow
- Source code and manifests coexist in the monorepo
- Service and platform manifests are versioned alongside code
- ArgoCD app-of-apps bootstraps environment-specific deployments
- Image tags use semantic versioning and build metadata

## CI stages
- lint
- unit test
- integration readiness
- build and containerize
- publish images to ACR
- security scanning (SAST, dependency scan)

## Infrastructure components
- Azure Resource Group(s)
- Azure Kubernetes Service (AKS)
- Azure Container Registry (ACR)
- Azure Database for PostgreSQL Flexible Server
- Azure Redis Cache
- Azure Blob Storage
- Azure Key Vault
- DNS and ingress via Azure Application Gateway / AKS ingress

## Observability
- Prometheus and Grafana for metrics
- Elasticsearch / Logstash / Kibana for logs
- Alerting rules for service health and business KPIs
- Uptime checks for external endpoints

## Secrets and configuration
- Secrets stored in Azure Key Vault
- Kubernetes Secrets reference Key Vault via Azure Key Vault provider
- ConfigMaps hold non-sensitive environment configuration
- RBAC enforced across GitHub, Azure, and AKS
