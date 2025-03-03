resource "aws_instance" "db" {
  ami             = var.instance_ami
  instance_type   = var.instance_type
  subnet_id       = var.subnet_id
  vpc_security_group_ids = [var.security_group_ids.allow_ssh, var.security_group_ids.db]
  tags = {
    Name = var.instance_names.db
  }
}

resource "aws_instance" "backend" {
  ami             = var.instance_ami
  instance_type   = var.instance_type
  subnet_id       = var.subnet_id
  vpc_security_group_ids = [var.security_group_ids.allow_ssh, var.security_group_ids.backend]
  depends_on = [aws_instance.db]
  tags = {
    Name = var.instance_names.backend
  }
}

resource "aws_instance" "frontend" {
  ami             = var.instance_ami
  instance_type   = var.instance_type
  subnet_id       = var.subnet_id
  vpc_security_group_ids = [var.security_group_ids.allow_ssh, var.security_group_ids.frontend]
  depends_on = [aws_instance.backend]
  tags = {
    Name = var.instance_names.frontend
  }
}