output "instance_ips" {
  value = {
    for instance in var.instances : instance.name => aws_instance.main[instance.name].public_ip
  }
}