output "cluster_name" {
  value = azurerm_kubernetes_cluster.main.name
}

output "cluster_id" {
  value = azurerm_kubernetes_cluster.main.id
}

output "kube_admin_config" {
  value = azurerm_kubernetes_cluster.main.kube_admin_config_raw
}
