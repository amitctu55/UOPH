//-- Redis Cache Module for Session & Caching Layer

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "location" {
  type        = string
  description = "Azure region"
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "sku_name" {
  type        = string
  description = "Redis SKU (Basic, Standard, Premium)"
  default     = "Standard"
}

variable "family" {
  type        = string
  description = "Redis family (C for Standard, P for Premium)"
  default     = "C"
}

variable "capacity" {
  type        = number
  description = "Redis capacity (0-6 for C, 1-5 for P)"
  default     = 1
}

variable "tags" {
  type = map(string)
}

# Azure Cache for Redis
resource "azurerm_redis_cache" "cache" {
  name                = "upchar-redis-${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = var.capacity
  family              = var.family
  sku_name            = var.sku_name
  
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"
  
  # High availability for production
  replicas_per_master        = var.environment == "prod" ? 2 : 0
  replicas_per_primary       = var.environment == "prod" ? 2 : 0
  shard_count                = var.environment == "prod" ? 3 : 1
  public_network_access_enabled = false
  
  # Data persistence
  redis_configuration {
    enable_authentication           = true
    maxmemory_policy                = "allkeys-lru"
    notify_keyspace_events          = "Ex"
    storage_account_connection_string = null
    
    # Backup configuration
    rdb_backup_enabled            = var.environment == "prod" ? true : false
    rdb_backup_frequency          = var.environment == "prod" ? "60" : null
    rdb_backup_max_snapshot_count = var.environment == "prod" ? 1 : null
  }
  
  tags = var.tags
}

# Output connection string
output "redis_id" {
  value = azurerm_redis_cache.cache.id
}

output "redis_hostname" {
  value = azurerm_redis_cache.cache.hostname
}

output "redis_port" {
  value = azurerm_redis_cache.cache.port
}

output "redis_ssl_port" {
  value = azurerm_redis_cache.cache.ssl_port
}

output "redis_connection_string" {
  value     = "redis://default:${azurerm_redis_cache.cache.primary_access_key}@${azurerm_redis_cache.cache.hostname}:${azurerm_redis_cache.cache.ssl_port}"
  sensitive = true
}

output "redis_primary_access_key" {
  value     = azurerm_redis_cache.cache.primary_access_key
  sensitive = true
}

output "redis_secondary_access_key" {
  value     = azurerm_redis_cache.cache.secondary_access_key
  sensitive = true
}
