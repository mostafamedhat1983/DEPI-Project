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
  provisioner "file" {
    content     = var.key_pair.public_key
    destination = "/tmp/mykey.pub"
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.key_pair.private_key_path)
      host        = self.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sudo mkdir -p /home/ubuntu/.ssh",
      "sudo cat /tmp/mykey.pub >> /home/ubuntu/.ssh/authorized_keys",
      "sudo chmod 0600 /home/ubuntu/.ssh/authorized_keys",
      "sudo chown ubuntu:ubuntu /home/ubuntu/.ssh/authorized_keys",
      "rm /tmp/mykey.pub"
    ]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = var.key_pair.private_key_pem
      host        = self.public_ip
    }
  }
}