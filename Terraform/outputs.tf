output "instance_ips" {
  value = module.instances.instance_ips
}

output "private_key_pem" {
  value     = module.key_pair.key_pair.private_key_pem
  sensitive = true
}