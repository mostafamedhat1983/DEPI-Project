resource "aws_instance" "main" {
  for_each = { for instance in var.instances : instance.name => instance }
  ami                         = each.value.ami
  instance_type               = each.value.instance_type
  subnet_id                   = var.subnets[each.value.network][each.value.subnet_type]
  vpc_security_group_ids      = [for sg in each.value.security_groups : var.security_groups[sg]]
  associate_public_ip_address = each.value.associate_public_ip_address
  tags = {
    Name = each.key
  }
  key_name = var.key_pair.key_name
}