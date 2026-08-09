# Production Setup Guide

Enable ECR publish and EKS deployment for the UPCHAR / MedSphere platform.

**Current CI status (without AWS):** Lint & Test passes. Build & Publish builds the Docker image and runs integration tests, then fails intentionally on `require-aws-for-publish` until the steps below are complete.

---

## Pipeline overview

```
push to main
  → Lint & Test
  → Build & Publish
       1. verify-docker-image   (always)
       2. build-and-push        (when ECR_PUBLISH_ENABLED=true)
       3. integration-tests     (always after docker verify)
  → Deploy to Production        (after successful Build & Publish on main)
  → Deploy to Staging           (develop branch, or Build & Publish from develop)
```

| Workflow | File | Trigger |
|----------|------|---------|
| Build & Publish | `.github/workflows/build-publish.yml` | Push to `main`, tags `v*` |
| Deploy to Production | `.github/workflows/deploy-production.yml` | Successful Build & Publish on `main` |
| Deploy to Staging | `.github/workflows/deploy-staging.yml` | Push to `develop`, or Build & Publish from `develop` |

Image: root `Dockerfile` (API gateway + `upchar-shared`).  
Helm chart: `infra/helm/upsphere-platform/`.

---

## 1. GitHub repository secrets

**Settings → Secrets and variables → Actions → Secrets**

| Secret | Required | Purpose |
|--------|----------|---------|
| `AWS_ACCOUNT_ID` | Yes | ECR registry host and IAM role ARN |
| `AWS_REGION` | Yes | Region for ECR and EKS (e.g. `us-east-1`) |
| `SLACK_WEBHOOK` | No | Slack notifications after deploy |

Example registry URL built by workflows:

```text
${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/upsphere-platform
```

---

## 2. GitHub repository variable

**Settings → Secrets and variables → Actions → Variables**

| Variable | Value | Purpose |
|----------|-------|---------|
| `ECR_PUBLISH_ENABLED` | `true` | Enables the ECR push job |

Until this is set, Build & Publish verifies the image but fails with:

> Set repository variable `ECR_PUBLISH_ENABLED=true` and configure secrets `AWS_ACCOUNT_ID` and `AWS_REGION`

---

## 3. GitHub Environments

**Settings → Environments**

Create:

| Environment | Used by | Suggested protection |
|-------------|---------|----------------------|
| `production` | `deploy-production.yml` | Required reviewers |
| `staging` | `deploy-staging.yml` | Optional |

You can attach the same AWS secrets to each environment, or use repository-level secrets.

---

## 4. AWS prerequisites

Names must match the workflows.

### ECR

```bash
aws ecr create-repository \
  --repository-name upsphere-platform \
  --region "$AWS_REGION"
```

### EKS clusters

| Cluster | Namespace | Workflow |
|---------|-----------|----------|
| `eks-cluster-production` | `production` | Deploy to Production |
| `eks-cluster-staging` | `staging` | Deploy to Staging |

```bash
aws eks update-kubeconfig --name eks-cluster-production --region "$AWS_REGION"
aws eks update-kubeconfig --name eks-cluster-staging --region "$AWS_REGION"
```

### IAM OIDC role for GitHub Actions

Role name used in workflows: **`GitActionsOIDCRole`**

```text
arn:aws:iam::${AWS_ACCOUNT_ID}:role/GitActionsOIDCRole
```

Configure GitHub OIDC trust for this repository, then grant at least:

- ECR: push/pull for `upsphere-platform`
- EKS: `eks:DescribeCluster`, plus Kubernetes RBAC for Helm deploy
- Optional: describe/list for kubeconfig updates

Official pattern: [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

---

## 5. Enable and verify

1. Add secrets `AWS_ACCOUNT_ID`, `AWS_REGION` (and optional `SLACK_WEBHOOK`).
2. Set variable `ECR_PUBLISH_ENABLED=true`.
3. Create Environments `production` and `staging`.
4. Confirm ECR repo, EKS clusters, and OIDC role exist.
5. Push a commit to `main` (or re-run **Build & Publish**).

Expected success path:

1. `verify-docker-image` — green  
2. `build-and-push` — image in ECR  
3. `integration-tests` — green  
4. **Deploy to Production** — Helm upgrade in `production`  
5. Smoke test against `https://api.upchar.com/health` (`continue-on-error: true` until DNS/ingress are live)

Staging smoke URL: `https://staging.upsphere.io/health`.

---

## 6. Local checks (optional)

```bash
# Docker image
docker build -t upsphere-platform:local .

# Integration gate (build + required artifacts)
npm run test:integration

# Smoke against a running endpoint
npm run test:smoke -- --base-url=https://api.upchar.com

# Helm dry-run (with kubeconfig for the target cluster)
helm upgrade --install upsphere ./infra/helm/upsphere-platform \
  --namespace production \
  --create-namespace \
  --values ./infra/helm/upsphere-platform/values-production.yaml \
  --set image.repository="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/upsphere-platform" \
  --set image.tag="<git-sha>" \
  --dry-run
```

---

## 7. Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| `require-aws-for-publish` fails | `ECR_PUBLISH_ENABLED` not set to `true` |
| `Input required and not supplied: aws-region` | Missing `AWS_REGION` secret |
| ECR login / AssumeRole fails | OIDC trust or `GitActionsOIDCRole` misconfigured |
| Helm deploy fails | Cluster name, namespace, or kube RBAC |
| Smoke test fails | Ingress/DNS not pointing at the gateway `/health` yet (non-blocking) |
| Image tag not found | Production uses full commit SHA; ensure Build & Publish pushed that tag |

---

## Related docs

- `docs/DEPLOYMENT_GUIDE.md` — broader infrastructure (legacy Azure sections may still appear)
- `docs/PRODUCTION_CHECKLIST.md` — go-live security and ops checklist
- `infra/helm/upsphere-platform/` — gateway Helm chart and env values
