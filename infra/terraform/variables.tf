variable "prefix" {
  type        = string
  description = "Resource name prefix."
}

variable "location" {
  type        = string
  description = "Azure region for resources."
  default     = "eastus"
}

variable "environment" {
  type        = string
  description = "Deployment environment (dev/staging/prod)."
  default     = "dev"
}

variable "aks_node_count" {
  type        = number
  description = "Initial AKS node count."
  default     = 3
}

variable "aks_node_vm_size" {
  type        = string
  description = "AKS agent VM size."
  default     = "Standard_D4s_v4"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to Azure resources."
  default     = {
    owner = "upchar-team"
  }
}
