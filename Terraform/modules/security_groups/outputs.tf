output "security_groups" {
  value = { for sg in var.security_groups : sg.name => aws_security_group.main[sg.name].id }
}