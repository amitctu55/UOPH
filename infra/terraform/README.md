# Terraform Infrastructure

This folder holds the Terraform modules and environment configuration for UPCHAR Azure infrastructure.

## Structure
- `main.tf`: root entrypoint for Terraform module composition
- `variables.tf`: shared environment and resource variables
- `outputs.tf`: exposed outputs for downstream use
- `modules/`: reusable modules for AKS, ACR, PostgreSQL, Redis, Blob Storage, Key Vault, and networking

## Usage
1. Install Terraform 1.5+.
2. Configure Azure CLI and subscription context.
3. Copy `terraform.tfvars.example` to `terraform.tfvars` and update values.
4. Run `terraform init`, `terraform plan`, `terraform apply`.

## Notes
- Production use should separate state per environment.
- Use remote backend like Azure Storage for Terraform state.
- Do not commit secrets or service principal credentials.
