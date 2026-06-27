# ArgoCD GitOps

This folder contains the ArgoCD app-of-apps setup for UPCHAR environments.

## Intent
Use ArgoCD to deploy Kubernetes manifests and Helm releases from the repository into AKS environments.

## Pattern
- `apps/` contains environment-specific application manifests
- `projects/` defines ArgoCD project boundaries and allowed sources
- `bootstrap/` contains initial self-managed ArgoCD resources

## Recommended steps
1. Install ArgoCD into the target AKS cluster.
2. Push this repository to a GitHub branch accessible by ArgoCD.
3. Create the root application manifest to bootstrap environment apps.
4. Use environment overlays for `dev`, `staging`, and `prod`.
