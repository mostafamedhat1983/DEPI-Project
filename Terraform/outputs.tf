output "frontend_public_ip" {
  value = module.instances.frontend_public_ip
}

output "backend_public_ip" {
  value = module.instances.backend_public_ip
}

output "db_public_ip" {
  value = module.instances.db_public_ip
}

output "frontend_private_ip" {
  value = module.instances.frontend_private_ip
}

output "backend_private_ip" {
  value = module.instances.backend_private_ip
}

output "db_private_ip" {
  value = module.instances.db_private_ip
}