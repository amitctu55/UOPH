terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }

  required_version = ">= 1.5.0"

  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

module "network" {
  source = "./modules/network"

  prefix              = var.prefix
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name
}

module "aks" {
  source = "./modules/aks"

  prefix              = var.prefix
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name
  vnet_subnet_id      = module.network.aks_subnet_id
  dns_prefix          = "${var.prefix}-aks"
  node_count          = var.aks_node_count
  node_vm_size        = var.aks_node_vm_size
}

resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-rg"
  location = var.location
  tags = merge(var.tags, {
    environment = var.environment
    project     = "upchar"
  })
}
