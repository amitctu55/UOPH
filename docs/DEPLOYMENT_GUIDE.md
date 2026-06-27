# UPCHAR Healthcare Platform - Deployment Guide

**Last Updated:** 2026-06-22  
**Version:** 1.0  
**Environment:** Production

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Infrastructure Setup](#infrastructure-setup)
3. [Azure Configuration](#azure-configuration)
4. [Terraform Deployment](#terraform-deployment)
5. [Kubernetes Setup](#kubernetes-setup)
6. [Database Initialization](#database-initialization)
7. [Application Deployment](#application-deployment)
8. [Monitoring Setup](#monitoring-setup)
9. [Post-Deployment Validation](#post-deployment-validation)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools
- Terraform >= 1.5
- Azure CLI >= 2.50
- kubectl >= 1.25
- Helm >= 3.12
- Docker >= 23.0
- Node.js >= 18.0
- Git

### Azure Subscription Requirements
- Valid Azure subscription with sufficient quota
- Owner or Contributor role for resource deployment
- Service Principal with appropriate permissions

### Install Required Tools

```bash
# macOS (using Homebrew)
brew install terraform azure-cli kubectl helm docker node

# Ubuntu/Debian
sudo apt-get install -y terraform azure-cli kubectl helm docker.io nodejs npm

# Windows (using Chocolatey)
choco install terraform azure-cli kubectl helm docker-desktop nodejs
```

### Verify Installation

```bash
terraform version
az --version
kubectl version --client
helm version
docker --version
node --version
```

---

## Infrastructure Setup

### 1. Clone Repository

```bash
git clone https://github.com/upchar/upchar-platform.git
cd upchar-platform
```

### 2. Azure Login

```bash
az login
az account set --subscription "<subscription-id>"
```

### 3. Create Resource Group

```bash
az group create \
  --name upchar-rg-prod \
  --location "East US 2"
```

### 4. Create Storage Account for Terraform State

```bash
# Create storage account
az storage account create \
  --resource-group upchar-rg-prod \
  --name upchartfstate \
  --sku Standard_LRS \
  --encryption-services blob

# Create blob container
az storage container create \
  --name terraform-state \
  --account-name upchartfstate \
  --account-key <account-key>

# Get storage account key
az storage account keys list \
  --resource-group upchar-rg-prod \
  --account-name upchartfstate \
  --query '[0].value' -o tsv
```

### 5. Configure Terraform Backend

Create `infra/terraform/backend.tfvars`:

```hcl
resource_group_name  = "upchar-rg-prod"
storage_account_name = "upchartfstate"
container_name       = "terraform-state"
key                  = "prod/terraform.tfstate"
```

---

## Azure Configuration

### 1. Create Container Registry

```bash
az acr create \
  --resource-group upchar-rg-prod \
  --name upcharacr \
  --sku Premium \
  --admin-enabled true
```

### 2. Create Key Vault

```bash
az keyvault create \
  --resource-group upchar-rg-prod \
  --name upchar-kv-prod \
  --enable-purge-protection
```

### 3. Store Secrets

```bash
# Database credentials
az keyvault secret set \
  --vault-name upchar-kv-prod \
  --name db-admin-username \
  --value "<username>"

az keyvault secret set \
  --vault-name upchar-kv-prod \
  --name db-admin-password \
  --value "<strong-password>"

# JWT secret
az keyvault secret set \
  --vault-name upchar-kv-prod \
  --name jwt-secret \
  --value "$(openssl rand -base64 32)"

# OAuth credentials
az keyvault secret set \
  --vault-name upchar-kv-prod \
  --name google-client-id \
  --value "<google-client-id>"

az keyvault secret set \
  --vault-name upchar-kv-prod \
  --name google-client-secret \
  --value "<google-client-secret>"
```

---

## Terraform Deployment

### 1. Prepare Terraform Variables

Create `infra/terraform/terraform.tfvars`:

```hcl
environment             = "prod"
location                = "East US 2"
resource_group_name     = "upchar-rg-prod"
aks_cluster_name        = "upchar-aks-prod"
aks_node_count          = 3
aks_vm_size             = "Standard_D4s_v3"
database_version        = "15"
database_sku            = "Standard_D4s_v3"
database_storage_mb     = 1048576  # 1TB
backup_retention_days   = 30
redis_capacity          = 2
redis_sku               = "Standard"
tags = {
  Environment = "production"
  Project     = "UPCHAR"
  ManagedBy   = "Terraform"
  CostCenter  = "Healthcare"
}
```

### 2. Initialize Terraform

```bash
cd infra/terraform

terraform init \
  -backend-config="backend.tfvars"
```

### 3. Plan Deployment

```bash
terraform plan \
  -var-file="terraform.tfvars" \
  -out=tfplan
```

Review the plan carefully before applying.

### 4. Apply Terraform Configuration

```bash
terraform apply tfplan
```

### 5. Save Outputs

```bash
terraform output -json > outputs.json
```

**Expected Outputs:**
- AKS cluster endpoint
- Container Registry URL
- Database connection string
- Redis connection string
- Key Vault URL

---

## Kubernetes Setup

### 1. Get AKS Credentials

```bash
az aks get-credentials \
  --resource-group upchar-rg-prod \
  --name upchar-aks-prod \
  --overwrite-existing
```

### 2. Verify Cluster Access

```bash
kubectl cluster-info
kubectl get nodes
```

### 3. Create Namespaces

```bash
kubectl create namespace production
kubectl create namespace monitoring
kubectl create namespace ingress-nginx
```

### 4. Install Ingress Controller

```bash
# Add Helm repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Install NGINX Ingress Controller
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --set controller.service.type=LoadBalancer \
  --set controller.metrics.enabled=true
```

### 5. Configure RBAC

```bash
kubectl apply -f infra/aks/rbac/
```

### 6. Create Network Policies

```bash
kubectl apply -f infra/aks/network-policies/
```

### 7. Set Resource Quotas

```bash
kubectl apply -f infra/aks/resource-quotas/
```

---

## Database Initialization

### 1. Get Database Connection Info

```bash
# From Terraform outputs
DB_HOST=$(terraform output -raw postgres_host)
DB_PORT=$(terraform output -raw postgres_port)
DB_USER=$(terraform output -raw postgres_user)
DB_PASSWORD=$(terraform output -raw postgres_password)
DB_NAME=$(terraform output -raw postgres_database)
```

### 2. Connect to Database

```bash
psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
```

### 3. Run Schema Migration

```bash
# From project root
psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME" < infra/database/schema.sql
```

### 4. Create Application User

```sql
-- Create read-only user for applications
CREATE USER upchar_app WITH PASSWORD '<strong-password>';
GRANT CONNECT ON DATABASE upchardb TO upchar_app;
GRANT USAGE ON SCHEMA public TO upchar_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO upchar_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO upchar_app;

-- Store password in Key Vault
az keyvault secret set \
  --vault-name upchar-kv-prod \
  --name db-app-password \
  --value "<strong-password>"
```

### 5. Verify Database

```bash
psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME" \
  -c "SELECT version();"
```

---

## Application Deployment

### 1. Build Docker Images

```bash
# Set environment variables
export ACR_URL="upcharacr.azurecr.io"
export VERSION="1.0.0"

# Build and push all services
docker build -t $ACR_URL/upchar-auth:$VERSION services/auth/
docker push $ACR_URL/upchar-auth:$VERSION

docker build -t $ACR_URL/upchar-gateway:$VERSION services/gateway/
docker push $ACR_URL/upchar-gateway:$VERSION

docker build -t $ACR_URL/upchar-appointment:$VERSION services/appointment/
docker push $ACR_URL/upchar-appointment:$VERSION

# ... repeat for all services
```

### 2. Create Kubernetes Secrets

```bash
# Create secret for image pull
kubectl create secret docker-registry acr-secret \
  --docker-server=$ACR_URL \
  --docker-username=<acr-username> \
  --docker-password=<acr-password> \
  -n production

# Create database credentials secret
kubectl create secret generic database-credentials \
  --from-literal=url="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME" \
  -n production

# Create Redis credentials secret
REDIS_PASSWORD=$(terraform output -raw redis_primary_access_key)
kubectl create secret generic redis-credentials \
  --from-literal=url="redis://:$REDIS_PASSWORD@upchar-redis-prod.redis.cache.windows.net:6379" \
  -n production

# Create JWT secret
JWT_SECRET=$(az keyvault secret show --vault-name upchar-kv-prod --name jwt-secret -q)
kubectl create secret generic jwt-secret \
  --from-literal=secret="$JWT_SECRET" \
  -n production
```

### 3. Deploy Services with Helm

```bash
# Update Helm values
cat > infra/helm/values-prod.yaml <<EOF
environment: production
replicaCount: 3

image:
  repository: upcharacr.azurecr.io/upchar
  tag: "1.0.0"
  pullPolicy: IfNotPresent

imagePullSecrets:
  - name: acr-secret

resources:
  limits:
    cpu: "500m"
    memory: "512Mi"
  requests:
    cpu: "250m"
    memory: "256Mi"

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

database:
  host: $(terraform output -raw postgres_host)
  port: 5432
  name: upchardb

redis:
  host: upchar-redis-prod.redis.cache.windows.net
  port: 6379

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: api.upchar.com
      paths:
        - path: /
          pathType: Prefix
EOF

# Deploy using Helm
helm install upchar-platform ./infra/helm/upchar-platform \
  --namespace production \
  --values infra/helm/values-prod.yaml \
  --wait --timeout 10m
```

### 4. Deploy ArgoCD for GitOps

```bash
# Create ArgoCD namespace
kubectl create namespace argocd

# Install ArgoCD
helm repo add argo https://argoproj.github.io/argo-helm
helm install argocd argo/argo-cd \
  --namespace argocd \
  --set server.service.type=LoadBalancer

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d

# Apply ArgoCD Application manifests
kubectl apply -f infra/argocd/app-of-apps.yaml
```

### 5. Verify Deployment

```bash
# Check service status
kubectl get svc -n production

# Check pod status
kubectl get pods -n production

# Check deployment status
kubectl get deployments -n production

# Verify endpoints are responding
kubectl port-forward -n production svc/upchar-gateway 8080:80
curl http://localhost:8080/health
```

---

## Monitoring Setup

### 1. Install Prometheus

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus \
  --namespace monitoring \
  --set prometheus.prometheusSpec.retention=30d \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=100Gi
```

### 2. Install Grafana

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm install grafana grafana/grafana \
  --namespace monitoring \
  --set adminPassword=$(openssl rand -base64 12) \
  --set persistence.enabled=true \
  --set persistence.size=10Gi
```

### 3. Install ELK Stack for Logging

```bash
helm repo add elastic https://helm.elastic.co
helm install elasticsearch elastic/elasticsearch \
  --namespace monitoring \
  --set replicas=3 \
  --set volumeClaimTemplate.resources.requests.storage=50Gi

helm install kibana elastic/kibana \
  --namespace monitoring

helm install filebeat elastic/filebeat \
  --namespace monitoring \
  --set logstashHost=logstash
```

### 4. Configure Application Monitoring

Create `infra/monitoring/prometheus-configmap.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 30s
      evaluation_interval: 30s
    
    scrape_configs:
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
```

Deploy:
```bash
kubectl apply -f infra/monitoring/prometheus-configmap.yaml
```

---

## Post-Deployment Validation

### 1. Health Checks

```bash
# Check all pods
kubectl get pods -n production -w

# Check pod logs
kubectl logs -n production deployment/upchar-gateway

# Check service endpoints
kubectl get endpoints -n production
```

### 2. Run Integration Tests

```bash
npm run test:integration -- --base-url="https://api.upchar.com"
```

### 3. Verify Database

```bash
psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME" -c "
  SELECT 
    tablename 
  FROM pg_tables 
  WHERE schemaname = 'public' 
  ORDER BY tablename;
"
```

### 4. Test API Endpoints

```bash
# Authentication
curl -X POST https://api.upchar.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@upchar.com","password":"password"}'

# Health check
curl https://api.upchar.com/health

# Gateway status
curl https://api.upchar.com/gateway/status
```

### 5. Monitoring Verification

```bash
# Access Grafana
kubectl port-forward -n monitoring svc/grafana 3000:80

# Access Prometheus
kubectl port-forward -n monitoring svc/prometheus 9090:9090

# Access Kibana
kubectl port-forward -n monitoring svc/kibana 5601:5601
```

---

## Troubleshooting

### Common Issues

#### 1. Pod Crashes with ImagePullBackOff

```bash
# Check image availability
az acr repository list --name upcharacr

# Verify credentials
kubectl describe secret acr-secret -n production

# Re-create secret if needed
kubectl delete secret acr-secret -n production
kubectl create secret docker-registry acr-secret \
  --docker-server=$ACR_URL \
  --docker-username=<username> \
  --docker-password=<password> \
  -n production
```

#### 2. Database Connection Failed

```bash
# Verify network connectivity
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  sh -c "nc -zv $DB_HOST $DB_PORT"

# Check firewall rules
az postgres flexible-server firewall-rule list \
  --resource-group upchar-rg-prod \
  --name upchar-db-prod
```

#### 3. Insufficient Storage

```bash
# Check PVC status
kubectl get pvc -n production

# Expand PVC
kubectl patch pvc postgres-data \
  -p '{"spec":{"resources":{"requests":{"storage":"500Gi"}}}}' \
  -n production
```

#### 4. High Memory Usage

```bash
# Check resource usage
kubectl top nodes
kubectl top pods -n production

# Adjust resource limits
kubectl set resources deployment/upchar-gateway \
  --limits=cpu=1000m,memory=1Gi \
  --requests=cpu=500m,memory=512Mi \
  -n production
```

### Logs and Debugging

```bash
# Get detailed pod information
kubectl describe pod <pod-name> -n production

# Stream pod logs
kubectl logs -f deployment/upchar-gateway -n production

# Get previous logs (for crashed pods)
kubectl logs --previous deployment/upchar-gateway -n production

# Execute commands in pod
kubectl exec -it deployment/upchar-gateway -n production -- /bin/sh
```

---

## Rollback Procedures

### Helm Rollback

```bash
# List release history
helm history upchar-platform -n production

# Rollback to previous release
helm rollback upchar-platform 1 -n production

# Rollback to specific revision
helm rollback upchar-platform 5 -n production
```

### Kubernetes Rollback

```bash
# View rollout history
kubectl rollout history deployment/upchar-gateway -n production

# Rollback to previous version
kubectl rollout undo deployment/upchar-gateway -n production

# Rollback to specific revision
kubectl rollout undo deployment/upchar-gateway --to-revision=3 -n production
```

---

## Maintenance

### Backup Database

```bash
# Manual backup
az postgres flexible-server backup create \
  --resource-group upchar-rg-prod \
  --server-name upchar-db-prod \
  --backup-name "backup-$(date +%Y%m%d-%H%M%S)"

# List backups
az postgres flexible-server backup list \
  --resource-group upchar-rg-prod \
  --server-name upchar-db-prod
```

### Update Applications

```bash
# Trigger new deployment
kubectl rollout restart deployment/upchar-gateway -n production

# Monitor rollout
kubectl rollout status deployment/upchar-gateway -n production
```

---

**Next Steps:**
- Configure custom domain and SSL certificates
- Set up backup and disaster recovery procedures
- Configure alerting and notifications
- Implement security scanning and compliance checks
- Schedule regular security updates and patches

For questions or issues, contact the DevOps team or open an issue on the project repository.
