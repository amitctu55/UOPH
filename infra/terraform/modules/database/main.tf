//-- Database Module - PostgreSQL RDS Instance
//-- Production-ready configuration with high availability

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = false
    }
  }
}

variable "environment" {
  type        = string
  description = "Environment name (dev, staging, prod)"
}

variable "location" {
  type        = string
  description = "Azure region"
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "database_name" {
  type        = string
  description = "Database name"
  default     = "upchardb"
}

variable "admin_username" {
  type        = string
  description = "PostgreSQL admin username"
  sensitive   = true
}

variable "admin_password" {
  type        = string
  description = "PostgreSQL admin password"
  sensitive   = true
}

variable "db_version" {
  type        = string
  description = "PostgreSQL version"
  default     = "15"
}

variable "sku_name" {
  type        = string
  description = "Database SKU"
  default     = "B_Standard_B2s" # For prod: "GP_Standard_D4s_v3"
}

variable "storage_mb" {
  type        = number
  description = "Storage in MB"
  default     = 65536 # 64 GB
}

variable "backup_retention_days" {
  type        = number
  description = "Backup retention in days"
  default     = 30
}

variable "tags" {
  type = map(string)
}

# PostgreSQL Flexible Server
resource "azurerm_postgresql_flexible_server" "database" {
  name                   = "upchar-db-${var.environment}"
  location               = var.location
  resource_group_name    = var.resource_group_name
  version                = var.db_version
  administrator_login    = var.admin_username
  administrator_password = var.admin_password
  
  storage_mb             = var.storage_mb
  sku_name               = var.sku_name
  
  backup_retention_days        = var.backup_retention_days
  geo_redundant_backup_enabled = var.environment == "prod" ? true : false
  
  authentication {
    active_directory_auth_enabled = false # Set to true if using Azure AD
    password_auth_enabled         = true
    tenant_id                     = null
  }

  high_availability {
    mode                      = var.environment == "prod" ? "ZoneRedundant" : "SameZone"
    standby_availability_zone = var.environment == "prod" ? "2" : null
  }

  maintenance_window {
    day_of_week  = "Sunday"
    start_hour   = 3
    start_minute = 0
  }

  tags = var.tags
}

# PostgreSQL Database
resource "azurerm_postgresql_flexible_server_database" "upchar" {
  name              = var.database_name
  server_id         = azurerm_postgresql_flexible_server.database.id
  charset           = "UTF8"
  collation         = "en_US.utf8"
}

# Firewall rule for AKS
resource "azurerm_postgresql_flexible_server_firewall_rule" "aks" {
  name             = "AKS-Access"
  server_id        = azurerm_postgresql_flexible_server.database.id
  start_ip_address = "0.0.0.0" # Replace with AKS subnet IP
  end_ip_address   = "255.255.255.255" # Replace with AKS subnet IP
}

# Firewall rule for local development (remove in production)
resource "azurerm_postgresql_flexible_server_firewall_rule" "dev_access" {
  count            = var.environment == "prod" ? 0 : 1
  name             = "Local-Dev-Access"
  server_id        = azurerm_postgresql_flexible_server.database.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "255.255.255.255"
}

# PostgreSQL Configuration for performance
resource "azurerm_postgresql_flexible_server_configuration" "max_connections" {
  name       = "max_connections"
  server_id  = azurerm_postgresql_flexible_server.database.id
  value      = "500"
}

resource "azurerm_postgresql_flexible_server_configuration" "shared_buffers" {
  name       = "shared_buffers"
  server_id  = azurerm_postgresql_flexible_server.database.id
  value      = "262144" # 2GB
}

resource "azurerm_postgresql_flexible_server_configuration" "effective_cache_size" {
  name       = "effective_cache_size"
  server_id  = azurerm_postgresql_flexible_server.database.id
  value      = "1048576" # 8GB
}

resource "azurerm_postgresql_flexible_server_configuration" "work_mem" {
  name       = "work_mem"
  server_id  = azurerm_postgresql_flexible_server.database.id
  value      = "8192" # 8MB
}

resource "azurerm_postgresql_flexible_server_configuration" "maintenance_work_mem" {
  name       = "maintenance_work_mem"
  server_id  = azurerm_postgresql_flexible_server.database.id
  value      = "524288" # 512MB
}

# Enable PostgreSQL extensions
resource "azurerm_postgresql_flexible_server_configuration" "required_extensions" {
  name       = "azure.extensions"
  server_id  = azurerm_postgresql_flexible_server.database.id
  value      = "UUID-OSSP,PGCRYPTO,PG_TRGM"
}

# Outputs
output "postgres_server_id" {
  value = azurerm_postgresql_flexible_server.database.id
}

output "postgres_fqdn" {
  value = azurerm_postgresql_flexible_server.database.fqdn
}

output "postgres_connection_string" {
  value     = "postgresql://${var.admin_username}:${var.admin_password}@${azurerm_postgresql_flexible_server.database.fqdn}:5432/${var.database_name}"
  sensitive = true
}

output "postgres_host" {
  value = azurerm_postgresql_flexible_server.database.fqdn
}

output "postgres_port" {
  value = 5432
}

output "postgres_database" {
  value = var.database_name
}
